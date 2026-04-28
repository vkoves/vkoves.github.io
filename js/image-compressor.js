(function () {
  'use strict';

  const { createApp } = Vue;

  // ── Utilities ─────────────────────────────────────────────────────────────

  /**
   * Formats a byte count as a human-readable string (B, KB, MB, or GB).
   * MB values are rounded to the nearest whole number.
   * @param {number} n - bytes
   * @returns {string}
   */
  function formatBytes(n) {
    const BYTES_PER_UNIT = 1024;
    const KB = BYTES_PER_UNIT;
    const MB = KB * BYTES_PER_UNIT;
    const GB = MB * BYTES_PER_UNIT;
    if (n < KB) return `${n} B`;
    if (n < MB) return `${(n / KB).toFixed(1)} KB`;
    if (n < GB) return `${Math.round(n / MB)} MB`;
    return `${(n / GB).toFixed(2)} GB`;
  }

  /**
   * Reads a File as a base64 data URL.
   * @param {File} file
   * @returns {Promise<string>}
   */
  function readAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Loads a URL into an HTMLImageElement, resolving once decoded.
   * @param {string} src
   * @returns {Promise<HTMLImageElement>}
   */
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload  = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * Converts a base64 data URL to a Blob.
   * @param {string} dataUrl
   * @returns {Blob}
   */
  function dataUrlToBlob(dataUrl) {
    const [header, b64] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const raw  = atob(b64);
    const buf  = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) buf[i] = raw.charCodeAt(i);
    return new Blob([buf], { type: mime });
  }

  /**
   * Returns the file extension for a given MIME type.
   * @param {string} mime
   * @returns {string}
   */
  function formatToExt(mime) {
    return { 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png' }[mime] || 'jpg';
  }

  /**
   * Replaces the extension of a filename with the given extension.
   * @param {string} filename
   * @param {string} ext
   * @returns {string}
   */
  function replaceExtension(filename, ext) {
    return filename.replace(/\.[^.]+$/, '') + '.' + ext;
  }

  /**
   * Truncates a filename to max characters, preserving the extension.
   * @param {string} name
   * @param {number} [max=32]
   * @returns {string}
   */
  function truncateName(name, max = 32) {
    if (name.length <= max) return name;
    const ext = name.match(/\.[^.]+$/)?.[0] ?? '';
    return name.slice(0, max - ext.length - 1) + '…' + ext;
  }

  /**
   * Creates a temporary anchor element to trigger a file download, then cleans up.
   * @param {Blob} blob
   * @param {string} filename
   */
  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  // ── App ───────────────────────────────────────────────────────────────────

  createApp({
    data() {
      return {
        // Settings
        format:       'image/jpeg',
        quality:      80,
        preserveExif: true,

        // Drop zone
        isDragOver: false,

        // Pending files and preview strip
        pendingFiles:     [],
        previewUrls:      [], // object URLs for up to 4 pending files; revoked when files change
        previewFileCount: 0,  // total pending count, kept after convertAll for the overflow badge

        // Conversion progress
        fileIdCounter:    0,
        conversionTotal:  0,
        conversionDone:   0,

        // Result rows — each: { id, file, thumbUrl, status, compressedText, savingsText, increased, blob, name }
        resultRows: [],

        // Running summary totals (accumulate across batches)
        summaryOrigBytes: 0,
        summaryCompBytes: 0,
        summaryFileCount: 0,
        summaryMinBytes:  Infinity,
        summaryMaxBytes:  0,

        showFilesTable: false,
        zipping:        false,

        // Sample preview
        sampleData:    [], // { file, origUrl, compUrl, origSize, compSize, settingsLabel, savingsText, increased }
        sampleUrls:    [], // object URLs revoked on re-run
        sampleRunning: false,

        // Comparison modal
        modalVisible: false,
        modalIndex:   0,
      };
    },

    computed: {
      showQuality() { return this.format !== 'image/png'; },

      exifNote() {
        return this.format !== 'image/jpeg'
          ? 'EXIF can only be preserved in JPEG → JPEG conversions.'
          : '';
      },

      showPreview() { return this.previewUrls.length > 0; },

      previewThumbs() {
        const overflow = this.previewFileCount > 4 ? this.previewFileCount - 3 : 0;
        return this.previewUrls.map((url, i) => ({
          url,
          isOverflow:    overflow > 0 && i === 3,
          overflowCount: overflow,
        }));
      },

      isProcessing() { return this.conversionDone < this.conversionTotal; },

      convertDisabled() { return this.isProcessing || this.pendingFiles.length === 0; },

      convertLabel() {
        return this.isProcessing
          ? `Compressing… ${this.conversionDone}/${this.conversionTotal}`
          : 'Convert';
      },

      sampleBtnLabel() {
        if (this.sampleRunning) return 'Processing…';
        return this.sampleData.length > 0 ? 'Re-run preview' : 'Preview first 4 images';
      },

      summaryData() {
        if (this.summaryFileCount === 0) return null;
        const saved = (1 - this.summaryCompBytes / this.summaryOrigBytes) * 100;
        return {
          orig:    formatBytes(this.summaryOrigBytes),
          comp:    formatBytes(this.summaryCompBytes),
          savings: saved >= 0 ? `${saved.toFixed(1)}% smaller` : `${Math.abs(saved).toFixed(1)}% larger`,
          avg:     formatBytes(this.summaryCompBytes / this.summaryFileCount),
          max:     formatBytes(this.summaryMaxBytes),
          min:     formatBytes(this.summaryMinBytes),
        };
      },

      modalItem() { return this.sampleData[this.modalIndex] || null; },

      modalSavingsText() {
        if (!this.modalItem) return '';
        const f = 1 - this.modalItem.compSize / this.modalItem.origSize;
        return f >= 0
          ? `(${(f * 100).toFixed(1)}% smaller)`
          : `(${(Math.abs(f) * 100).toFixed(1)}% larger)`;
      },
    },

    mounted() {
      document.addEventListener('keydown', this.onKeydown);
    },

    beforeUnmount() {
      document.removeEventListener('keydown', this.onKeydown);
    },

    methods: {
      // Expose utilities to the template
      formatBytes,
      truncateName,

      // ── Drop zone ──────────────────────────────────────────────────────────

      onDragLeave(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) this.isDragOver = false;
      },

      onDrop(e) {
        this.isDragOver = false;
        const images = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
        this.stageFiles(images);
      },

      onDropZoneKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.$refs.fileInput.click();
        }
      },

      onFileInputChange(e) {
        this.stageFiles(Array.from(e.target.files));
        e.target.value = '';
      },

      // ── Staging & preview ─────────────────────────────────────────────────

      /** Appends files to the pending queue and refreshes the preview strip. */
      stageFiles(files) {
        if (!files.length) return;
        const newFiles = this.pendingFiles.concat(files);
        this.previewUrls.forEach((u) => URL.revokeObjectURL(u));
        this.previewUrls      = newFiles.slice(0, 4).map((f) => URL.createObjectURL(f));
        this.previewFileCount = newFiles.length;
        this.pendingFiles     = newFiles;
      },

      /** Empties the pending queue and hides the preview strip. */
      clearPending() {
        this.previewUrls.forEach((u) => URL.revokeObjectURL(u));
        this.previewUrls      = [];
        this.previewFileCount = 0;
        this.pendingFiles     = [];
      },

      // ── Conversion ────────────────────────────────────────────────────────

      /** Moves all pending files into the processing queue and starts compression. */
      convertAll() {
        if (!this.pendingFiles.length) return;
        const toProcess   = this.pendingFiles.slice();
        this.pendingFiles = []; // clear queue; previewUrls kept so the strip stays visible

        this.conversionTotal += toProcess.length;

        toProcess.forEach((file) => {
          const id = ++this.fileIdCounter;
          this.resultRows.push({
            id,
            file,
            thumbUrl:       URL.createObjectURL(file),
            status:         'processing',
            compressedText: 'Processing…',
            savingsText:    '—',
            increased:      false,
            blob:           null,
            name:           null,
          });
          this.processFile(id, file);
        });
      },

      /**
       * Compresses a single file and updates its result row on completion.
       * @param {number} id
       * @param {File} file
       */
      async processFile(id, file) {
        const row = this.resultRows.find((r) => r.id === id);
        try {
          const blob          = await this.compressFileToBlob(file);
          const name          = replaceExtension(file.name, formatToExt(this.format));
          const compSize      = blob.size;
          const savedFraction = 1 - compSize / file.size;

          if (row) {
            row.status         = 'done';
            row.blob           = blob;
            row.name           = name;
            row.compressedText = formatBytes(compSize);
            row.savingsText    = savedFraction >= 0
              ? `-${(savedFraction * 100).toFixed(1)}%`
              : `+${(Math.abs(savedFraction) * 100).toFixed(1)}%`;
            row.increased = savedFraction < 0;
          }

          this.summaryOrigBytes += file.size;
          this.summaryCompBytes += compSize;
          this.summaryFileCount++;
          this.summaryMinBytes = Math.min(this.summaryMinBytes, compSize);
          this.summaryMaxBytes = Math.max(this.summaryMaxBytes, compSize);
        } catch (err) {
          if (row) {
            row.status         = 'error';
            row.compressedText = 'Error';
            row.savingsText    = err.message || 'Unknown error';
          }
        } finally {
          this.conversionDone++;
          if (this.conversionDone === this.conversionTotal) {
            this.conversionTotal = 0;
            this.conversionDone  = 0;
          }
        }
      },

      // ── Sample preview ────────────────────────────────────────────────────

      /**
       * Compresses up to the first 4 pending files at the current settings and
       * populates the sample comparison list.
       */
      async runSamplePreview() {
        const files = this.pendingFiles.slice(0, 4);
        if (!files.length) return;

        this.sampleRunning = true;
        this.sampleUrls.forEach((u) => URL.revokeObjectURL(u));
        this.sampleUrls = [];
        this.sampleData = [];

        const settingsLabel = this.format === 'image/png'
          ? 'PNG (lossless)'
          : `${this.quality}%, ${formatToExt(this.format).toUpperCase()}`;

        for (const file of files) {
          const blob          = await this.compressFileToBlob(file);
          const origUrl       = URL.createObjectURL(file);
          const compUrl       = URL.createObjectURL(blob);
          const savedFraction = 1 - blob.size / file.size;
          this.sampleUrls.push(origUrl, compUrl);
          this.sampleData.push({
            file,
            origUrl,
            compUrl,
            origSize:     file.size,
            compSize:     blob.size,
            settingsLabel,
            savingsText:  savedFraction >= 0
              ? `-${(savedFraction * 100).toFixed(1)}%`
              : `+${(Math.abs(savedFraction) * 100).toFixed(1)}%`,
            increased:    savedFraction < 0,
          });
        }

        this.sampleRunning = false;
      },

      // ── Modal ─────────────────────────────────────────────────────────────

      /** @param {number} index */
      openModal(index) {
        this.modalIndex   = index;
        this.modalVisible = true;
        document.body.style.overflow = 'hidden';
      },

      closeModal() {
        this.modalVisible = false;
        document.body.style.overflow = '';
      },

      /** @param {number} dir - +1 or -1 */
      navigateModal(dir) {
        this.modalIndex = (this.modalIndex + dir + this.sampleData.length) % this.sampleData.length;
      },

      onKeydown(e) {
        if (!this.modalVisible) return;
        if (e.key === 'Escape')     this.closeModal();
        if (e.key === 'ArrowLeft')  this.navigateModal(-1);
        if (e.key === 'ArrowRight') this.navigateModal(1);
      },

      // ── Downloads ─────────────────────────────────────────────────────────

      /** @param {{ blob: Blob, name: string }} row */
      downloadSingle(row) {
        if (row.blob) triggerDownload(row.blob, row.name);
      },

      /** Bundles all completed files into a ZIP and triggers a download. */
      async downloadAll() {
        const ready = this.resultRows.filter((r) => r.status === 'done' && r.blob);
        if (!ready.length) return;

        if (!window.JSZip) {
          let delay = 0;
          ready.forEach((r) => {
            setTimeout(() => triggerDownload(r.blob, r.name), delay);
            delay += 200;
          });
          return;
        }

        this.zipping = true;
        try {
          const zip = new JSZip();
          ready.forEach((r) => zip.file(r.name, r.blob));
          const zipBlob = await zip.generateAsync({ type: 'blob' });
          triggerDownload(zipBlob, 'compressed-images.zip');
        } finally {
          this.zipping = false;
        }
      },

      // ── Core compression ──────────────────────────────────────────────────

      /**
       * Compresses a File to a Blob using the current settings.
       * Handles EXIF extraction and re-injection for JPEG to JPEG conversions,
       * resetting the orientation tag since the canvas already applies it.
       * @param {File} file
       * @returns {Promise<Blob>}
       */
      async compressFileToBlob(file) {
        const dataUrl = await readAsDataUrl(file);

        let exifObj = null;
        if (this.preserveExif && file.type === 'image/jpeg' && this.format === 'image/jpeg' && window.piexif) {
          try {
            exifObj = piexif.load(dataUrl);
            // Browser auto-applies EXIF orientation when drawing to canvas, so
            // reset tag to 1 (normal) to prevent viewers from rotating the output again.
            if (exifObj['0th']) exifObj['0th'][piexif.ImageIFD.Orientation] = 1;
          } catch (_) { /* no EXIF */ }
        }

        const img    = await loadImage(dataUrl);
        const canvas = document.createElement('canvas');
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d').drawImage(img, 0, 0);

        const qualityArg  = this.format === 'image/png' ? undefined : this.quality / 100;
        let outputDataUrl = canvas.toDataURL(this.format, qualityArg);

        if (exifObj && window.piexif) {
          try { outputDataUrl = piexif.insert(piexif.dump(exifObj), outputDataUrl); } catch (_) {}
        }

        return dataUrlToBlob(outputDataUrl);
      },
    },
  }).mount('#app');

})();
