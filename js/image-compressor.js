(function () {
  'use strict';

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
   * Escapes a string for safe insertion into HTML.
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
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

  // ── ComparisonModal ────────────────────────────────────────────────────────

  /** Manages the side-by-side original/compressed image comparison modal. */
  class ComparisonModal {
    constructor() {
      this._modal    = document.getElementById('comparison-modal');
      this._backdrop = document.getElementById('modal-backdrop');
      this._closeBtn = document.getElementById('modal-close');
      this._title    = document.getElementById('modal-title');
      this._filename = document.getElementById('modal-filename');
      this._origImg  = document.getElementById('modal-orig-img');
      this._compImg  = document.getElementById('modal-comp-img');
      this._origSize = document.getElementById('modal-orig-size');
      this._compSize = document.getElementById('modal-comp-size');
      this._settings = document.getElementById('modal-settings');
      this._prevBtn  = document.getElementById('modal-prev');
      this._nextBtn  = document.getElementById('modal-next');

      /** @type {Array<{file: File, origUrl: string, compUrl: string, origSize: number, compSize: number, settingsLabel: string}>} */
      this._data  = [];
      this._index = 0;

      this._closeBtn.addEventListener('click', () => this.close());
      this._backdrop.addEventListener('click', () => this.close());
      this._prevBtn.addEventListener('click',  () => this._navigate(-1));
      this._nextBtn.addEventListener('click',  () => this._navigate(1));
      document.addEventListener('keydown', (e) => {
        if (this._modal.hidden) return;
        if (e.key === 'Escape')     this.close();
        if (e.key === 'ArrowLeft')  this._navigate(-1);
        if (e.key === 'ArrowRight') this._navigate(1);
      });
    }

    /**
     * Opens the modal at the given index into the provided data array.
     * @param {number} index
     * @param {Array} data
     */
    open(index, data) {
      this._data  = data;
      this._index = index;
      this._render();
      this._modal.hidden = false;
      document.body.style.overflow = 'hidden';
      this._closeBtn.focus();
    }

    /** Closes the modal and restores page scrolling. */
    close() {
      this._modal.hidden = true;
      document.body.style.overflow = '';
    }

    /** @param {number} dir - +1 or -1 */
    _navigate(dir) {
      this._index = (this._index + dir + this._data.length) % this._data.length;
      this._render();
    }

    /** Populates modal content from the current index. */
    _render() {
      const item  = this._data[this._index];
      const count = this._data.length;

      const savedFraction = 1 - item.compSize / item.origSize;
      const savingsText   = savedFraction >= 0
        ? `(${(savedFraction * 100).toFixed(1)}% smaller)`
        : `(${(Math.abs(savedFraction) * 100).toFixed(1)}% larger)`;

      this._title.textContent    = `Image ${this._index + 1} of ${count} Preview`;
      this._filename.textContent = item.file.name;
      this._origImg.src          = item.origUrl;
      this._compImg.src          = item.compUrl;
      this._origSize.textContent = formatBytes(item.origSize);
      this._compSize.textContent = `${formatBytes(item.compSize)} ${savingsText}`;
      this._settings.textContent = item.settingsLabel;

      this._prevBtn.disabled = count <= 1;
      this._nextBtn.disabled = count <= 1;
    }
  }

  // ── SamplePreview ─────────────────────────────────────────────────────────

  /** Manages the "preview first 4 images" sample comparison section and list. */
  class SamplePreview {
    /**
     * @param {ComparisonModal} modal
     * @param {function(): void} onRunRequested - called when the user clicks the preview button
     */
    constructor(modal, onRunRequested) {
      this._modal   = modal;
      this._section = document.getElementById('sample-section');
      this._btn     = document.getElementById('sample-btn');
      this._list    = document.getElementById('sample-list');

      /** @type {Array<{file: File, origUrl: string, compUrl: string, origSize: number, compSize: number, settingsLabel: string}>} */
      this._data = [];
      this._urls = []; // object URLs revoked on re-run

      this._btn.addEventListener('click', onRunRequested);
    }

    /** Shows or hides the whole sample section, clearing the list when hiding. */
    setVisible(visible) {
      this._section.hidden = !visible;
      if (!visible) {
        this._list.hidden    = true;
        this._list.innerHTML = '';
      }
    }

    /**
     * Compresses up to 4 files at the given settings and renders the comparison list.
     * @param {File[]} files
     * @param {{ format: string, quality: number }} state
     * @param {function(File): Promise<Blob>} compressFn
     */
    async run(files, state, compressFn) {
      if (!files.length) return;

      this._btn.disabled    = true;
      this._btn.textContent = 'Processing…';

      this._urls.forEach((u) => URL.revokeObjectURL(u));
      this._urls = [];
      this._data = [];

      const settingsLabel = state.format === 'image/png'
        ? 'PNG (lossless)'
        : `${Math.round(state.quality * 100)}%, ${formatToExt(state.format).toUpperCase()}`;

      for (const file of files) {
        const blob    = await compressFn(file);
        const origUrl = URL.createObjectURL(file);
        const compUrl = URL.createObjectURL(blob);
        this._urls.push(origUrl, compUrl);
        this._data.push({ file, origUrl, compUrl, origSize: file.size, compSize: blob.size, settingsLabel });
      }

      this._render();
      this._list.hidden     = false;
      this._btn.disabled    = false;
      this._btn.textContent = 'Re-run preview';
    }

    /** Renders the sample comparison list from the current data. */
    _render() {
      this._list.innerHTML = '';
      this._data.forEach((item, i) => {
        const savedFraction = 1 - item.compSize / item.origSize;
        const savingsText   = savedFraction >= 0
          ? `-${(savedFraction * 100).toFixed(1)}%`
          : `+${(Math.abs(savedFraction) * 100).toFixed(1)}%`;

        const li = document.createElement('li');
        li.className = 'sample-item';
        li.innerHTML = `
          <span class="sample-item__name" title="${escapeHtml(item.file.name)}">${escapeHtml(truncateName(item.file.name))}</span>
          <span class="sample-item__sizes">${formatBytes(item.origSize)} &rarr; ${formatBytes(item.compSize)}</span>
          <span class="sample-item__savings${savedFraction < 0 ? ' -increased' : ''}">${savingsText}</span>
          <button type="button" class="sample-item__view btn">View</button>
        `;
        li.querySelector('.sample-item__view').addEventListener('click', () =>
          this._modal.open(i, this._data)
        );
        this._list.appendChild(li);
      });
    }
  }

  // ── ResultsPanel ──────────────────────────────────────────────────────────

  /** Manages the results summary panel, individual file table, and downloads. */
  class ResultsPanel {
    constructor() {
      this._section        = document.getElementById('results-section');
      this._summaryOrigEl  = document.getElementById('summary-original');
      this._summaryCompEl  = document.getElementById('summary-compressed');
      this._savingsEl      = document.getElementById('summary-savings');
      this._statsDetailEl  = document.getElementById('results-stats-detail');
      this._avgEl          = document.getElementById('summary-avg');
      this._maxEl          = document.getElementById('summary-max');
      this._minEl          = document.getElementById('summary-min');
      this._toggleBtn      = document.getElementById('toggle-files-btn');
      this._filesTable     = document.getElementById('files-table');
      this._list           = document.getElementById('results-list');
      this._downloadAllBtn = document.getElementById('download-all-btn');

      // id -> { blob: Blob, name: string } — only populated for successful conversions
      this._entries = new Map();

      // Running totals across all batches
      this._origBytes  = 0;
      this._compBytes  = 0;
      this._fileCount  = 0;
      this._minBytes   = Infinity;
      this._maxBytes   = 0;

      this._toggleBtn.addEventListener('click',      () => this._toggleTable());
      this._downloadAllBtn.addEventListener('click', () => this._downloadAll());
    }

    /**
     * Appends a result row in "Processing…" state for the given file.
     * @param {number} id
     * @param {File} file
     */
    addRow(id, file) {
      const thumbUrl = URL.createObjectURL(file);
      const li       = document.createElement('li');
      li.id        = `result-${id}`;
      li.className = 'result-item';
      li.innerHTML = `
        <span class="result-item__thumb">
          <img src="${escapeHtml(thumbUrl)}" alt="" class="result-item__thumb-img">
        </span>
        <span class="result-item__name" title="${escapeHtml(file.name)}">${escapeHtml(truncateName(file.name))}</span>
        <span class="result-item__original">${formatBytes(file.size)}</span>
        <span class="result-item__compressed">Processing…</span>
        <span class="result-item__savings">—</span>
        <span class="result-item__actions">
          <button type="button" class="result-item__download btn" data-id="${id}" disabled>Download</button>
        </span>
      `;
      this._list.appendChild(li);
    }

    /**
     * Marks a result row as successfully compressed, stores the blob, and enables download.
     * @param {number} id
     * @param {number} origSize - original file size in bytes
     * @param {Blob} blob - compressed output
     * @param {string} name - output filename
     */
    updateRowDone(id, origSize, blob, name) {
      this._entries.set(id, { blob, name });

      const compSize = blob.size;
      const row      = document.getElementById(`result-${id}`);
      if (row) {
        const savedFraction = 1 - compSize / origSize;
        const savingsText   = savedFraction >= 0
          ? `-${(savedFraction * 100).toFixed(1)}%`
          : `+${(Math.abs(savedFraction) * 100).toFixed(1)}%`;

        row.querySelector('.result-item__compressed').textContent = formatBytes(compSize);
        const savingsEl = row.querySelector('.result-item__savings');
        savingsEl.textContent = savingsText;
        savingsEl.classList.toggle('-increased', savedFraction < 0);

        const btn = row.querySelector('.result-item__download');
        btn.disabled = false;
        btn.addEventListener('click', () => this._downloadSingle(id));
      }

      this._origBytes += origSize;
      this._compBytes += compSize;
      this._fileCount++;
      this._minBytes = Math.min(this._minBytes, compSize);
      this._maxBytes = Math.max(this._maxBytes, compSize);
      this._updateSummary();
      this._section.hidden = false;
    }

    /**
     * Marks a result row as failed and reveals the results section.
     * @param {number} id
     * @param {string} message
     */
    updateRowError(id, message) {
      const row = document.getElementById(`result-${id}`);
      if (row) {
        row.classList.add('-error');
        row.querySelector('.result-item__compressed').textContent = 'Error';
        row.querySelector('.result-item__savings').textContent    = message;
      }
      this._section.hidden = false;
    }

    /** Refreshes the summary panel from the running totals. */
    _updateSummary() {
      this._summaryOrigEl.textContent = formatBytes(this._origBytes);
      this._summaryCompEl.textContent = formatBytes(this._compBytes);

      const saved = (1 - this._compBytes / this._origBytes) * 100;
      this._savingsEl.textContent = saved >= 0
        ? `${saved.toFixed(1)}% smaller`
        : `${Math.abs(saved).toFixed(1)}% larger`;

      this._avgEl.textContent = formatBytes(this._compBytes / this._fileCount);
      this._maxEl.textContent = formatBytes(this._maxBytes);
      this._minEl.textContent = formatBytes(this._minBytes);
      this._statsDetailEl.hidden = false;
    }

    /** Toggles the individual files table open/closed. */
    _toggleTable() {
      const expanded          = !this._filesTable.hidden;
      this._filesTable.hidden = expanded;
      this._toggleBtn.innerHTML = expanded
        ? '&#9656; View Individual Files'
        : '&#9662; Hide Individual Files';
    }

    /** @param {number} id */
    _downloadSingle(id) {
      const entry = this._entries.get(id);
      if (entry) triggerDownload(entry.blob, entry.name);
    }

    /** Bundles all successfully compressed files into a ZIP and triggers a download. */
    async _downloadAll() {
      const ready = [...this._entries.values()];
      if (!ready.length) return;

      if (!window.JSZip) {
        let delay = 0;
        ready.forEach((e) => {
          setTimeout(() => triggerDownload(e.blob, e.name), delay);
          delay += 200;
        });
        return;
      }

      this._downloadAllBtn.disabled    = true;
      this._downloadAllBtn.textContent = 'Zipping…';

      try {
        const zip = new JSZip();
        ready.forEach((e) => zip.file(e.name, e.blob));
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        triggerDownload(zipBlob, 'compressed-images.zip');
      } finally {
        this._downloadAllBtn.disabled    = false;
        this._downloadAllBtn.textContent = 'Download All';
      }
    }
  }

  // ── ImageCompressorApp ────────────────────────────────────────────────────

  /** Top-level controller: manages drop zone, preview strip, settings, and conversion queue. */
  class ImageCompressorApp {
    constructor() {
      this._state = { format: 'image/jpeg', quality: 0.80, preserveExif: true };

      this._pendingFiles    = [];
      this._previewUrls     = [];
      this._fileIdCounter   = 0;
      this._conversionTotal = 0;
      this._conversionDone  = 0;

      this._modal   = new ComparisonModal();
      this._results = new ResultsPanel();
      this._sample  = new SamplePreview(this._modal, () =>
        this._sample.run(
          this._pendingFiles.slice(0, 4),
          this._state,
          (file) => this._compressFileToBlob(file)
        )
      );

      // Drop zone
      this._dropZone    = document.getElementById('drop-zone');
      this._fileInput   = document.getElementById('file-input');

      // Settings
      this._formatSelect   = document.getElementById('output-format');
      this._qualitySlider  = document.getElementById('quality-slider');
      this._qualityValue   = document.getElementById('quality-value');
      this._qualitySetting = document.getElementById('quality-setting');
      this._exifNote       = document.getElementById('exif-note');
      this._preserveExifEl = document.getElementById('preserve-exif');

      // Preview strip
      this._previewSection = document.getElementById('preview-section');
      this._previewThumbs  = document.getElementById('preview-thumbnails');
      this._previewCount   = document.getElementById('preview-count');
      this._clearBtn       = document.getElementById('clear-btn');

      // Convert button
      this._convertBtn      = document.getElementById('convert-btn');
      this._convertBtnLabel = document.getElementById('convert-btn-label');

      this._bindEvents();
    }

    _bindEvents() {
      // Drop zone
      this._dropZone.addEventListener('click', () => this._fileInput.click());
      this._fileInput.addEventListener('change', () => {
        this._stageFiles(Array.from(this._fileInput.files));
        this._fileInput.value = '';
      });
      this._dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this._dropZone.classList.add('-drag-over');
      });
      this._dropZone.addEventListener('dragleave', (e) => {
        if (!this._dropZone.contains(e.relatedTarget))
          this._dropZone.classList.remove('-drag-over');
      });
      this._dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        this._dropZone.classList.remove('-drag-over');
        const images = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
        this._stageFiles(images);
      });
      this._dropZone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this._fileInput.click();
        }
      });

      // Settings
      this._formatSelect.addEventListener('change', () => {
        this._state.format = this._formatSelect.value;
        this._qualitySetting.hidden = this._state.format === 'image/png';
        this._updateExifNote();
      });
      this._qualitySlider.addEventListener('input', () => {
        this._state.quality          = this._qualitySlider.value / 100;
        this._qualityValue.textContent = this._qualitySlider.value;
      });
      this._preserveExifEl.addEventListener('change', () => {
        this._state.preserveExif = this._preserveExifEl.checked;
      });

      // Preview strip
      this._clearBtn.addEventListener('click', () => this._clearPending());

      // Convert button
      this._convertBtn.addEventListener('click', () => this._convertAll());
    }

    /** Shows a note when EXIF preservation is unavailable for the selected format. */
    _updateExifNote() {
      this._exifNote.textContent = this._state.format !== 'image/jpeg'
        ? 'EXIF can only be preserved in JPEG → JPEG conversions.'
        : '';
    }

    /** Appends files to the pending queue and refreshes the preview strip. */
    _stageFiles(files) {
      if (!files.length) return;
      this._pendingFiles = this._pendingFiles.concat(files);
      this._updatePreview();
    }

    /** Empties the pending queue and hides the preview strip. */
    _clearPending() {
      this._pendingFiles = [];
      this._updatePreview();
    }

    /**
     * Rebuilds the thumbnail strip from pendingFiles.
     * Shows up to 4 thumbnails; if more than 4 files are pending the 4th slot
     * becomes an overflow badge showing the hidden count.
     */
    _updatePreview() {
      this._previewUrls.forEach((u) => URL.revokeObjectURL(u));
      this._previewUrls       = [];
      this._previewThumbs.innerHTML = '';

      const total    = this._pendingFiles.length;
      const hasFiles = total > 0;

      this._sample.setVisible(hasFiles);
      this._previewSection.hidden = !hasFiles;
      this._updateConvertBtn();

      if (!hasFiles) return;

      this._previewCount.textContent = `${total} image${total === 1 ? '' : 's'} selected`;

      const slotCount = Math.min(total, 4);
      const overflow  = total > 4 ? total - 3 : 0;

      for (let i = 0; i < slotCount; i++) {
        const file       = this._pendingFiles[i];
        const isOverflow = overflow > 0 && i === 3;

        const url = URL.createObjectURL(file);
        this._previewUrls.push(url);

        const thumb = document.createElement('div');
        thumb.className = 'preview-thumb' + (isOverflow ? ' -overflow' : '');

        const img = document.createElement('img');
        img.src = url;
        img.alt = file.name;
        thumb.appendChild(img);

        if (isOverflow) {
          const badge = document.createElement('span');
          badge.className   = 'preview-thumb__badge';
          badge.textContent = `+${overflow}`;
          thumb.appendChild(badge);
        }

        this._previewThumbs.appendChild(thumb);
      }
    }

    /** Syncs the convert button label, spinner, and disabled state with conversion progress. */
    _updateConvertBtn() {
      const isProcessing            = this._conversionDone < this._conversionTotal;
      this._convertBtn.disabled     = isProcessing || this._pendingFiles.length === 0;
      this._convertBtn.classList.toggle('-loading', isProcessing);
      this._convertBtnLabel.textContent = isProcessing
        ? `Compressing… ${this._conversionDone}/${this._conversionTotal}`
        : 'Convert';
    }

    /** Moves all pending files into the processing queue and starts compression. */
    _convertAll() {
      if (!this._pendingFiles.length) return;

      const toProcess    = this._pendingFiles.slice();
      this._pendingFiles = []; // clear without hiding the preview strip

      this._conversionTotal += toProcess.length;
      this._updateConvertBtn();

      toProcess.forEach((file) => {
        const id = ++this._fileIdCounter;
        this._results.addRow(id, file);
        this._processFile(id, file);
      });
    }

    /**
     * Compresses a single file and updates its result row on completion.
     * @param {number} id
     * @param {File} file
     */
    async _processFile(id, file) {
      try {
        const blob = await this._compressFileToBlob(file);
        const name = replaceExtension(file.name, formatToExt(this._state.format));
        this._results.updateRowDone(id, file.size, blob, name);
      } catch (err) {
        this._results.updateRowError(id, err.message || 'Unknown error');
      } finally {
        this._conversionDone++;
        if (this._conversionDone === this._conversionTotal) {
          this._conversionTotal = 0;
          this._conversionDone  = 0;
        }
        this._updateConvertBtn();
      }
    }

    /**
     * Compresses a File to a Blob using the current state settings.
     * Handles EXIF extraction and re-injection for JPEG → JPEG conversions,
     * resetting the orientation tag since the canvas already applies it.
     * @param {File} file
     * @returns {Promise<Blob>}
     */
    async _compressFileToBlob(file) {
      const dataUrl = await readAsDataUrl(file);

      let exifObj = null;
      if (this._state.preserveExif && file.type === 'image/jpeg' && this._state.format === 'image/jpeg' && window.piexif) {
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

      const qualityArg   = this._state.format === 'image/png' ? undefined : this._state.quality;
      let outputDataUrl  = canvas.toDataURL(this._state.format, qualityArg);

      if (exifObj && window.piexif) {
        try { outputDataUrl = piexif.insert(piexif.dump(exifObj), outputDataUrl); } catch (_) {}
      }

      return dataUrlToBlob(outputDataUrl);
    }
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────

  new ImageCompressorApp();

})();
