(function () {
  'use strict';

  const state = {
    format: 'image/jpeg',
    quality: 0.80,
    preserveExif: true,
  };

  // Files staged for conversion (not yet processed)
  let pendingFiles = [];
  // Blob URLs created for preview thumbnails — revoked on next preview update
  let previewUrls = [];

  let fileIdCounter = 0;
  // Map of id -> { file, status: 'processing'|'done'|'error', result: {blob, name} | null }
  const fileEntries = new Map();

  // DOM refs
  const dropZone        = document.getElementById('drop-zone');
  const fileInput       = document.getElementById('file-input');
  const selectFilesBtn  = document.getElementById('select-files-btn');
  const formatSelect    = document.getElementById('output-format');
  const qualitySlider   = document.getElementById('quality-slider');
  const qualityValue    = document.getElementById('quality-value');
  const qualitySetting  = document.getElementById('quality-setting');
  const exifSetting     = document.getElementById('exif-setting');
  const exifNote        = document.getElementById('exif-note');
  const preserveExifEl  = document.getElementById('preserve-exif');
  const previewSection  = document.getElementById('preview-section');
  const previewThumbs   = document.getElementById('preview-thumbnails');
  const previewCount    = document.getElementById('preview-count');
  const clearBtn        = document.getElementById('clear-btn');
  const convertBtn      = document.getElementById('convert-btn');
  const resultsSection  = document.getElementById('results-section');
  const resultsList     = document.getElementById('results-list');
  const downloadAllBtn  = document.getElementById('download-all-btn');

  // ── Settings ──────────────────────────────────────────────────────────────

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

  // ── Staging & preview ─────────────────────────────────────────────────────

  function stageFiles(files) {
    if (!files.length) return;
    pendingFiles = pendingFiles.concat(files);
    updatePreview();
  }

  function clearPending() {
    pendingFiles = [];
    updatePreview();
  }

  function updatePreview() {
    // Revoke old object URLs to free memory
    previewUrls.forEach((u) => URL.revokeObjectURL(u));
    previewUrls = [];
    previewThumbs.innerHTML = '';

    const total = pendingFiles.length;

    if (total === 0) {
      previewSection.hidden = true;
      convertBtn.disabled = true;
      return;
    }

    previewSection.hidden = false;
    convertBtn.disabled = false;
    previewCount.textContent = `${total} image${total === 1 ? '' : 's'} selected`;

    // Show up to 4 thumbnails; if total > 4 the 4th slot is an overflow badge
    const slotCount  = Math.min(total, 4);
    const overflow   = total > 4 ? total - 3 : 0; // how many are hidden

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

  // ── Conversion ────────────────────────────────────────────────────────────

  function convertAll() {
    if (!pendingFiles.length) return;

    const toProcess = pendingFiles.slice();
    clearPending(); // clear the queue immediately so users can stage another batch

    resultsSection.hidden = false;

    toProcess.forEach((file) => {
      const id = ++fileIdCounter;
      fileEntries.set(id, { file, status: 'processing', result: null });
      addResultRow(id, file);
      processFile(id, file);
    });
  }

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

  async function processFile(id, file) {
    try {
      const dataUrl = await readAsDataUrl(file);

      // Extract EXIF from original JPEG if needed
      let exifObj = null;
      if (state.preserveExif && file.type === 'image/jpeg' && state.format === 'image/jpeg' && window.piexif) {
        try {
          exifObj = piexif.load(dataUrl);
          // The browser auto-applies EXIF orientation when drawing to canvas, so
          // the canvas output is already correctly rotated. Reset the tag to 1
          // (normal) to prevent viewers from rotating again.
          if (exifObj['0th']) {
            exifObj['0th'][piexif.ImageIFD.Orientation] = 1;
          }
        } catch (_) { /* no EXIF */ }
      }

      // Draw to canvas at native resolution
      const img = await loadImage(dataUrl);
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);

      const qualityArg = state.format === 'image/png' ? undefined : state.quality;
      let outputDataUrl = canvas.toDataURL(state.format, qualityArg);

      // Re-inject EXIF into the compressed JPEG
      if (exifObj && window.piexif) {
        try {
          outputDataUrl = piexif.insert(piexif.dump(exifObj), outputDataUrl);
        } catch (_) { /* leave without EXIF if injection fails */ }
      }

      const blob = dataUrlToBlob(outputDataUrl);
      const name = replaceExtension(file.name, formatToExt(state.format));

      fileEntries.get(id).status = 'done';
      fileEntries.get(id).result = { blob, name };
      updateRowDone(id, file.size, blob.size);
    } catch (err) {
      fileEntries.get(id).status = 'error';
      updateRowError(id, err.message || 'Unknown error');
    }
  }

  function updateRowDone(id, originalSize, compressedSize) {
    const row = document.getElementById(`result-${id}`);
    if (!row) return;

    const savedFraction = 1 - compressedSize / originalSize;
    const savingsText =
      savedFraction >= 0
        ? `-${(savedFraction * 100).toFixed(1)}%`
        : `+${(Math.abs(savedFraction) * 100).toFixed(1)}%`;

    row.querySelector('.result-item__compressed').textContent = formatBytes(compressedSize);
    const savingsEl = row.querySelector('.result-item__savings');
    savingsEl.textContent = savingsText;
    savingsEl.classList.toggle('-increased', savedFraction < 0);

    const btn = row.querySelector('.result-item__download');
    btn.disabled = false;
    btn.addEventListener('click', () => downloadSingle(id));
  }

  function updateRowError(id, message) {
    const row = document.getElementById(`result-${id}`);
    if (!row) return;
    row.classList.add('-error');
    row.querySelector('.result-item__compressed').textContent = 'Error';
    row.querySelector('.result-item__savings').textContent = message;
  }

  // ── Downloads ─────────────────────────────────────────────────────────────

  function downloadSingle(id) {
    const entry = fileEntries.get(id);
    if (entry?.result) triggerDownload(entry.result.blob, entry.result.name);
  }

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

  function readAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload  = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function dataUrlToBlob(dataUrl) {
    const [header, b64] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const raw  = atob(b64);
    const buf  = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) buf[i] = raw.charCodeAt(i);
    return new Blob([buf], { type: mime });
  }

  function formatBytes(n) {
    if (n < 1024)           return `${n} B`;
    if (n < 1024 * 1024)    return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  }

  function formatToExt(mime) {
    return { 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png' }[mime] || 'jpg';
  }

  function replaceExtension(filename, ext) {
    return filename.replace(/\.[^.]+$/, '') + '.' + ext;
  }

  function truncateName(name, max = 32) {
    if (name.length <= max) return name;
    const ext = name.match(/\.[^.]+$/)?.[0] ?? '';
    return name.slice(0, max - ext.length - 1) + '…' + ext;
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }
})();
