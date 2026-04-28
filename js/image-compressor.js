(function () {
  'use strict';

  const state = {
    format: 'image/jpeg',
    quality: 0.80,
    preserveExif: true,
  };

  // Files staged for conversion (not yet processed)
  let pendingFiles = [];
  // Blob URLs for the thumbnail strip — revoked on next preview update
  let previewUrls = [];

  let fileIdCounter = 0;
  // Map of id -> { file, status: 'processing'|'done'|'error', result: {blob, name} | null }
  const fileEntries = new Map();

  // Conversion progress counters (reset to 0 when a batch completes)
  let conversionTotal = 0;
  let conversionDone  = 0;

  // Running totals for the summary panel (accumulate across all batches)
  let summaryOrigBytes  = 0;
  let summaryCompBytes  = 0;
  let summaryFileCount  = 0;
  let summaryMinBytes   = Infinity;
  let summaryMaxBytes   = 0;

  // Sample preview state
  // Array of { file, origUrl, compUrl, origSize, compSize, settingsLabel }
  let sampleData = [];
  let sampleUrls = []; // object URLs to revoke on re-run
  let modalIndex = 0;

  // ── DOM refs ──────────────────────────────────────────────────────────────

  const dropZone        = document.getElementById('drop-zone');
  const fileInput       = document.getElementById('file-input');
  const formatSelect    = document.getElementById('output-format');
  const qualitySlider   = document.getElementById('quality-slider');
  const qualityValue    = document.getElementById('quality-value');
  const qualitySetting  = document.getElementById('quality-setting');
  const exifNote        = document.getElementById('exif-note');
  const preserveExifEl  = document.getElementById('preserve-exif');
  const sampleSection   = document.getElementById('sample-section');
  const sampleBtn       = document.getElementById('sample-btn');
  const sampleList      = document.getElementById('sample-list');
  const previewSection  = document.getElementById('preview-section');
  const previewThumbs   = document.getElementById('preview-thumbnails');
  const previewCount    = document.getElementById('preview-count');
  const clearBtn        = document.getElementById('clear-btn');
  const convertBtn      = document.getElementById('convert-btn');
  const convertBtnLabel = document.getElementById('convert-btn-label');
  const resultsSection   = document.getElementById('results-section');
  const summaryOrigEl    = document.getElementById('summary-original');
  const summaryCompEl    = document.getElementById('summary-compressed');
  const summarySavingsEl = document.getElementById('summary-savings');
  const statsDetailEl    = document.getElementById('results-stats-detail');
  const summaryAvgEl     = document.getElementById('summary-avg');
  const summaryMaxEl     = document.getElementById('summary-max');
  const summaryMinEl     = document.getElementById('summary-min');
  const toggleFilesBtn   = document.getElementById('toggle-files-btn');
  const filesTable       = document.getElementById('files-table');
  const resultsList      = document.getElementById('results-list');
  const downloadAllBtn   = document.getElementById('download-all-btn');
  const modal           = document.getElementById('comparison-modal');
  const modalBackdrop   = document.getElementById('modal-backdrop');
  const modalClose      = document.getElementById('modal-close');
  const modalTitle      = document.getElementById('modal-title');
  const modalFilename   = document.getElementById('modal-filename');
  const modalOrigImg    = document.getElementById('modal-orig-img');
  const modalCompImg    = document.getElementById('modal-comp-img');
  const modalOrigSize   = document.getElementById('modal-orig-size');
  const modalCompSize   = document.getElementById('modal-comp-size');
  const modalSettings   = document.getElementById('modal-settings');
  const modalPrev       = document.getElementById('modal-prev');
  const modalNext       = document.getElementById('modal-next');

  // ── Settings ──────────────────────────────────────────────────────────────

  /** Shows a note when EXIF preservation is unavailable for the selected format. */
  function updateExifNote() {
    exifNote.textContent = state.format !== 'image/jpeg'
      ? 'EXIF can only be preserved in JPEG → JPEG conversions.'
      : '';
  }

  formatSelect.addEventListener('change', () => {
    state.format = formatSelect.value;
    qualitySetting.hidden = state.format === 'image/png';
    updateExifNote();
  });

  qualitySlider.addEventListener('input', () => {
    state.quality = qualitySlider.value / 100;
    qualityValue.textContent = qualitySlider.value;
  });

  preserveExifEl.addEventListener('change', () => {
    state.preserveExif = preserveExifEl.checked;
  });

  // ── File input & drag-drop ────────────────────────────────────────────────

  dropZone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    stageFiles(Array.from(fileInput.files));
    fileInput.value = '';
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('-drag-over');
  });

  dropZone.addEventListener('dragleave', (e) => {
    if (!dropZone.contains(e.relatedTarget)) {
      dropZone.classList.remove('-drag-over');
    }
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('-drag-over');
    const images = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/')
    );
    stageFiles(images);
  });

  dropZone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  clearBtn.addEventListener('click', clearPending);
  convertBtn.addEventListener('click', convertAll);
  downloadAllBtn.addEventListener('click', downloadAll);
  toggleFilesBtn.addEventListener('click', () => {
    const expanded = !filesTable.hidden;
    filesTable.hidden = expanded;
    toggleFilesBtn.innerHTML = expanded
      ? '&#9656; View Individual Files'
      : '&#9662; Hide Individual Files';
  });

  // ── Staging & preview ─────────────────────────────────────────────────────

  /** Appends files to the pending queue and refreshes the preview strip. */
  function stageFiles(files) {
    if (!files.length) return;
    pendingFiles = pendingFiles.concat(files);
    updatePreview();
  }

  /** Empties the pending queue and hides the preview strip. */
  function clearPending() {
    pendingFiles = [];
    updatePreview();
  }

  /**
   * Rebuilds the thumbnail strip from pendingFiles.
   * Shows up to 4 thumbnails; if more than 4 files are pending the 4th slot
   * becomes an overflow badge showing the hidden count.
   */
  function updatePreview() {
    previewUrls.forEach((u) => URL.revokeObjectURL(u));
    previewUrls = [];
    previewThumbs.innerHTML = '';

    const total = pendingFiles.length;
    const hasFiles = total > 0;

    sampleSection.hidden = !hasFiles;
    previewSection.hidden = !hasFiles;
    updateConvertBtn();

    if (!hasFiles) {
      sampleList.hidden = true;
      sampleList.innerHTML = '';
      return;
    }

    previewCount.textContent = `${total} image${total === 1 ? '' : 's'} selected`;

    const slotCount = Math.min(total, 4);
    const overflow  = total > 4 ? total - 3 : 0;

    for (let i = 0; i < slotCount; i++) {
      const file = pendingFiles[i];
      const isOverflow = overflow > 0 && i === 3;

      const url = URL.createObjectURL(file);
      previewUrls.push(url);

      const thumb = document.createElement('div');
      thumb.className = 'preview-thumb' + (isOverflow ? ' -overflow' : '');

      const img = document.createElement('img');
      img.src = url;
      img.alt = file.name;
      thumb.appendChild(img);

      if (isOverflow) {
        const badge = document.createElement('span');
        badge.className = 'preview-thumb__badge';
        badge.textContent = `+${overflow}`;
        thumb.appendChild(badge);
      }

      previewThumbs.appendChild(thumb);
    }
  }

  // ── Sample preview ────────────────────────────────────────────────────────

  sampleBtn.addEventListener('click', runSamplePreview);

  /**
   * Compresses up to the first 4 pending files at the current settings and
   * populates the sample comparison list without adding them to the results.
   */
  async function runSamplePreview() {
    const files = pendingFiles.slice(0, 4);
    if (!files.length) return;

    sampleBtn.disabled = true;
    sampleBtn.textContent = 'Processing…';

    sampleUrls.forEach((u) => URL.revokeObjectURL(u));
    sampleUrls = [];
    sampleData = [];

    const settingsLabel = state.format === 'image/png'
      ? 'PNG (lossless)'
      : `${Math.round(state.quality * 100)}%, ${formatToExt(state.format).toUpperCase()}`;

    for (const file of files) {
      const blob     = await compressFileToBlob(file);
      const origUrl  = URL.createObjectURL(file);
      const compUrl  = URL.createObjectURL(blob);
      sampleUrls.push(origUrl, compUrl);
      sampleData.push({ file, origUrl, compUrl, origSize: file.size, compSize: blob.size, settingsLabel });
    }

    renderSampleList();
    sampleList.hidden = false;
    sampleBtn.disabled = false;
    sampleBtn.textContent = 'Re-run preview';
  }

  /** Renders the sample comparison list from the current sampleData. */
  function renderSampleList() {
    sampleList.innerHTML = '';
    sampleData.forEach((item, i) => {
      const savedFraction = 1 - item.compSize / item.origSize;
      const savingsText = savedFraction >= 0
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
      li.querySelector('.sample-item__view').addEventListener('click', () => openModal(i));
      sampleList.appendChild(li);
    });
  }

  // ── Comparison modal ──────────────────────────────────────────────────────

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  modalPrev.addEventListener('click', () => navigateModal(-1));
  modalNext.addEventListener('click', () => navigateModal(1));

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape')      closeModal();
    if (e.key === 'ArrowLeft')   navigateModal(-1);
    if (e.key === 'ArrowRight')  navigateModal(1);
  });

  /** Opens the comparison modal at the given sampleData index. */
  function openModal(index) {
    modalIndex = index;
    renderModal();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  /** Closes the comparison modal and restores page scrolling. */
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  /** Advances the modal by dir (+1 or -1), wrapping around. */
  function navigateModal(dir) {
    modalIndex = (modalIndex + dir + sampleData.length) % sampleData.length;
    renderModal();
  }

  /** Populates modal content from the current modalIndex entry in sampleData. */
  function renderModal() {
    const item  = sampleData[modalIndex];
    const count = sampleData.length;

    const savedFraction = 1 - item.compSize / item.origSize;
    const savingsText = savedFraction >= 0
      ? `(${(savedFraction * 100).toFixed(1)}% smaller)`
      : `(${(Math.abs(savedFraction) * 100).toFixed(1)}% larger)`;

    modalTitle.textContent    = `Image ${modalIndex + 1} of ${count} Preview`;
    modalFilename.textContent = item.file.name;
    modalOrigImg.src          = item.origUrl;
    modalCompImg.src          = item.compUrl;
    modalOrigSize.textContent = formatBytes(item.origSize);
    modalCompSize.textContent = `${formatBytes(item.compSize)} ${savingsText}`;
    modalSettings.textContent = item.settingsLabel;

    modalPrev.disabled = count <= 1;
    modalNext.disabled = count <= 1;
  }

  // ── Core compression ──────────────────────────────────────────────────────

  /**
   * Compresses a File to a Blob using the current state settings.
   * Handles EXIF extraction and re-injection for JPEG → JPEG conversions,
   * resetting the orientation tag since the canvas already applies it.
   *
   * @param {File} file
   * @returns {Promise<Blob>}
   */
  async function compressFileToBlob(file) {
    const dataUrl = await readAsDataUrl(file);

    let exifObj = null;
    if (state.preserveExif && file.type === 'image/jpeg' && state.format === 'image/jpeg' && window.piexif) {
      try {
        exifObj = piexif.load(dataUrl);
        // Browser auto-applies EXIF orientation when drawing to canvas, so
        // the canvas pixels are already correctly rotated. Reset tag to 1
        // (normal) to prevent viewers from rotating the output again.
        if (exifObj['0th']) exifObj['0th'][piexif.ImageIFD.Orientation] = 1;
      } catch (_) { /* no EXIF */ }
    }

    const img = await loadImage(dataUrl);
    const canvas = document.createElement('canvas');
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);

    const qualityArg = state.format === 'image/png' ? undefined : state.quality;
    let outputDataUrl = canvas.toDataURL(state.format, qualityArg);

    if (exifObj && window.piexif) {
      try { outputDataUrl = piexif.insert(piexif.dump(exifObj), outputDataUrl); } catch (_) {}
    }

    return dataUrlToBlob(outputDataUrl);
  }

  /** Refreshes the before/after summary panel and per-file stats from the running totals. */
  function updateSummary() {
    summaryOrigEl.textContent = formatBytes(summaryOrigBytes);
    summaryCompEl.textContent = formatBytes(summaryCompBytes);

    const saved = (1 - summaryCompBytes / summaryOrigBytes) * 100;
    summarySavingsEl.textContent = saved >= 0
      ? `${saved.toFixed(1)}% smaller`
      : `${Math.abs(saved).toFixed(1)}% larger`;

    summaryAvgEl.textContent = formatBytes(summaryCompBytes / summaryFileCount);
    summaryMaxEl.textContent = formatBytes(summaryMaxBytes);
    summaryMinEl.textContent = formatBytes(summaryMinBytes);
    statsDetailEl.hidden = false;
  }

  /** Syncs the convert button label, spinner, and disabled state with conversion progress. */
  function updateConvertBtn() {
    const isProcessing = conversionDone < conversionTotal;
    convertBtn.disabled = isProcessing || pendingFiles.length === 0;
    convertBtn.classList.toggle('-loading', isProcessing);
    convertBtnLabel.textContent = isProcessing
      ? `Compressing… ${conversionDone}/${conversionTotal}`
      : 'Convert';
  }

  // ── Batch conversion ──────────────────────────────────────────────────────

  /** Moves all pending files into the processing queue and starts compression. */
  function convertAll() {
    if (!pendingFiles.length) return;

    const toProcess = pendingFiles.slice();
    pendingFiles = []; // clear queue without hiding the preview strip

    conversionTotal += toProcess.length;
    updateConvertBtn();

    toProcess.forEach((file) => {
      const id = ++fileIdCounter;
      fileEntries.set(id, { file, status: 'processing', result: null });
      addResultRow(id, file);
      processFile(id, file);
    });
  }

  /**
   * Appends a result row in "Processing…" state to the results list.
   * @param {number} id
   * @param {File} file
   */
  function addResultRow(id, file) {
    const li = document.createElement('li');
    li.id = `result-${id}`;
    li.className = 'result-item';
    li.innerHTML = `
      <span class="result-item__name" title="${escapeHtml(file.name)}">${escapeHtml(truncateName(file.name))}</span>
      <span class="result-item__original">${formatBytes(file.size)}</span>
      <span class="result-item__compressed">Processing…</span>
      <span class="result-item__savings">—</span>
      <span class="result-item__actions">
        <button type="button" class="result-item__download btn" data-id="${id}" disabled>Download</button>
      </span>
    `;
    resultsList.appendChild(li);
  }

  /**
   * Compresses a single file and updates its result row on completion.
   * @param {number} id
   * @param {File} file
   */
  async function processFile(id, file) {
    try {
      const blob = await compressFileToBlob(file);
      const name = replaceExtension(file.name, formatToExt(state.format));

      fileEntries.get(id).status = 'done';
      fileEntries.get(id).result = { blob, name };
      updateRowDone(id, file.size, blob.size);
    } catch (err) {
      fileEntries.get(id).status = 'error';
      updateRowError(id, err.message || 'Unknown error');
    }
  }

  /**
   * Marks a result row as successfully compressed and enables its download button.
   * @param {number} id
   * @param {number} originalSize  - bytes
   * @param {number} compressedSize - bytes
   */
  function updateRowDone(id, originalSize, compressedSize) {
    const row = document.getElementById(`result-${id}`);
    if (!row) return;

    const savedFraction = 1 - compressedSize / originalSize;
    const savingsText = savedFraction >= 0
      ? `-${(savedFraction * 100).toFixed(1)}%`
      : `+${(Math.abs(savedFraction) * 100).toFixed(1)}%`;

    row.querySelector('.result-item__compressed').textContent = formatBytes(compressedSize);
    const savingsEl = row.querySelector('.result-item__savings');
    savingsEl.textContent = savingsText;
    savingsEl.classList.toggle('-increased', savedFraction < 0);

    summaryOrigBytes += originalSize;
    summaryCompBytes += compressedSize;
    summaryFileCount++;
    summaryMinBytes = Math.min(summaryMinBytes, compressedSize);
    summaryMaxBytes = Math.max(summaryMaxBytes, compressedSize);
    updateSummary();
    resultsSection.hidden = false;
    conversionDone++;
    if (conversionDone === conversionTotal) { conversionTotal = 0; conversionDone = 0; }
    updateConvertBtn();

    const btn = row.querySelector('.result-item__download');
    btn.disabled = false;
    btn.addEventListener('click', () => downloadSingle(id));
  }

  /**
   * Marks a result row as failed and reveals the results section.
   * @param {number} id
   * @param {string} message
   */
  function updateRowError(id, message) {
    const row = document.getElementById(`result-${id}`);
    if (!row) return;
    resultsSection.hidden = false;
    conversionDone++;
    if (conversionDone === conversionTotal) { conversionTotal = 0; conversionDone = 0; }
    updateConvertBtn();
    row.classList.add('-error');
    row.querySelector('.result-item__compressed').textContent = 'Error';
    row.querySelector('.result-item__savings').textContent = message;
  }

  // ── Downloads ─────────────────────────────────────────────────────────────

  /**
   * Triggers a download for the compressed output of a single file entry.
   * @param {number} id
   */
  function downloadSingle(id) {
    const entry = fileEntries.get(id);
    if (entry?.result) triggerDownload(entry.result.blob, entry.result.name);
  }

  /**
   * Bundles all successfully compressed files into a ZIP and triggers a download.
   * Falls back to staggered individual downloads if JSZip is unavailable.
   */
  async function downloadAll() {
    const ready = [...fileEntries.values()].filter(
      (e) => e.status === 'done' && e.result
    );
    if (!ready.length) return;

    if (!window.JSZip) {
      let delay = 0;
      ready.forEach((e) => {
        setTimeout(() => triggerDownload(e.result.blob, e.result.name), delay);
        delay += 200;
      });
      return;
    }

    downloadAllBtn.disabled = true;
    downloadAllBtn.textContent = 'Zipping…';

    try {
      const zip = new JSZip();
      ready.forEach((e) => zip.file(e.result.name, e.result.blob));
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      triggerDownload(zipBlob, 'compressed-images.zip');
    } finally {
      downloadAllBtn.disabled = false;
      downloadAllBtn.textContent = 'Download All';
    }
  }

  /**
   * Creates a temporary anchor element to trigger a file download, then cleans up.
   * @param {Blob} blob
   * @param {string} filename
   */
  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  // ── Utilities ─────────────────────────────────────────────────────────────

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
})();
