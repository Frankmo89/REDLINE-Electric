// Redline Electric — client-side image compression before upload.
// Phone photos are often 3-5MB straight out of the camera. This resizes
// the longest edge down to a sane max and re-encodes as JPEG in the
// browser via Canvas, so Supabase Storage receives a lean file instead
// of the original. No external library needed — Canvas is native.
//
// Known gap: Chrome and Firefox cannot decode HEIC/HEIF (the format
// iPhones save photos in by default) via Canvas — only Safari can, since
// it uses the OS's native image decoder. When that happens this module
// does not fail the upload; it falls back to the original file untouched
// and reports why via the `compressed`/`reason` fields below, so the
// caller can surface a visible notice instead of silently uploading a
// multi-MB original.
(function () {
  var MAX_EDGE = 1920;
  var JPEG_QUALITY = 0.8;

  function loadImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error('Could not decode image'));
      };
      img.src = url;
    });
  }

  function skip(file, reason) {
    return { file: file, compressed: false, reason: reason };
  }

  // Resizes so the longest edge is at most maxEdge, then re-encodes as
  // JPEG at the given quality. Resolves to { file, compressed, reason }:
  //   compressed: true  -> `file` is the new, smaller JPEG
  //   compressed: false -> `file` is the original, untouched; `reason` is
  //                        'unsupported-type' | 'decode-failed' | 'no-gain'
  function compressImage(file, opts) {
    opts = opts || {};
    var maxEdge = opts.maxEdge || MAX_EDGE;
    var quality = opts.quality != null ? opts.quality : JPEG_QUALITY;

    if (!file || !/^image\//.test(file.type)) {
      // Covers HEIC/HEIF in Chrome and Firefox: those browsers report the
      // file's type as "application/octet-stream" (not "image/heic"), so
      // we never even attempt a decode — same outcome as decode-failed,
      // just detected up front instead of via a failed Image() load.
      return Promise.resolve(skip(file, 'unsupported-type'));
    }

    return loadImage(file)
      .then(function (img) {
        var width = img.naturalWidth || img.width;
        var height = img.naturalHeight || img.height;
        if (!width || !height) return skip(file, 'decode-failed');

        var scale = Math.min(1, maxEdge / Math.max(width, height));
        var targetWidth = Math.max(1, Math.round(width * scale));
        var targetHeight = Math.max(1, Math.round(height * scale));

        var canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        var ctx = canvas.getContext('2d');
        // JPEG has no alpha channel, so transparent pixels would encode as
        // black. Paint white first so PNGs with transparency (logos, diagrams)
        // come out on white instead of a black box.
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        return new Promise(function (resolve) {
          canvas.toBlob(function (blob) {
            if (!blob) {
              resolve(skip(file, 'decode-failed'));
              return;
            }
            var baseName = file.name.replace(/\.[^.]+$/, '');
            var compressed = new File([blob], baseName + '.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            if (compressed.size < file.size) {
              resolve({ file: compressed, compressed: true, reason: null });
            } else {
              resolve(skip(file, 'no-gain'));
            }
          }, 'image/jpeg', quality);
        });
      })
      .catch(function () {
        return skip(file, 'decode-failed');
      });
  }

  window.RedlineImageCompress = { compressImage: compressImage };
})();
