'use strict';


const createFilters = require('./resize_filter_gen');


function resetAlpha(dst, width, height) {
  let ptr = 3, len = (width * height * 4)|0;
  while (ptr < len) { dst[ptr] = 0xFF; ptr = (ptr + 4)|0; }
}


function asUint8Array(src) {
  return new Uint8Array(src.buffer, 0, src.byteLength);
}


let IS_LE = true;
// should not crash everything on module load in old browsers
try {
  IS_LE = ((new Uint32Array((new Uint8Array([ 1, 0, 0, 0 ])).buffer))[0] === 1);
} catch (__) {}


function copyInt16asLE(src, target, target_offset) {
  if (IS_LE) {
    target.set(asUint8Array(src), target_offset);
    return;
  }

  for (let ptr = target_offset, i = 0; i < src.length; i++) {
    let data = src[i];
    target[ptr++] = data & 0xFF;
    target[ptr++] = (data >> 8) & 0xFF;
  }
}

module.exports = function resize_wasm(options) {
  const src     = options.src;
  const srcW    = options.width;
  const srcH    = options.height;
  const destW   = options.toWidth;
  const destH   = options.toHeight;
  const scaleX  = options.scaleX || options.toWidth / options.width;
  const scaleY  = options.scaleY || options.toHeight / options.height;
  const offsetX = options.offsetX || 0.0;
  const offsetY = options.offsetY || 0.0;
  const dest    = options.dest || new Uint8Array(destW * destH * 4);
  const quality = typeof options.quality === 'undefined' ? 3 : options.quality;
  const alpha   = options.alpha || false;

  const filtersX = createFilters(quality, srcW, destW, scaleX, offsetX),
        filtersY = createFilters(quality, srcH, destH, scaleY, offsetY);

  // destination is 0 too.
  const src_offset      = 0;
  // buffer between convolve passes
  const tmp_offset      = this.__align(src_offset + Math.max(src.byteLength, dest.byteLength));
  const filtersX_offset = this.__align(tmp_offset + srcH * destW * 4);
  const filtersY_offset = this.__align(filtersX_offset + filtersX.byteLength);
  const alloc_bytes     = filtersY_offset + filtersY.byteLength;

  const instance = this.__instance('resize', alloc_bytes);

  //
  // Fill memory block with data to process
  //

  const mem   = new Uint8Array(this.__memory.buffer);
  const mem32 = new Uint32Array(this.__memory.buffer);

  // 32-bit copy is much faster in chrome
  const src32 = new Uint32Array(src.buffer);
  mem32.set(src32);

  // We should guarantee LE bytes order. Filters are not big, so
  // speed difference is not significant vs direct .set()
  copyInt16asLE(filtersX, mem, filtersX_offset);
  copyInt16asLE(filtersY, mem, filtersY_offset);

  //
  // Now call webassembly method
  // emsdk does method names with '_'
  const fn = instance.exports.convolveHV || instance.exports._convolveHV;

  fn(filtersX_offset, filtersY_offset, tmp_offset, srcW, srcH, destW, destH);

  //
  // Copy data back to typed array
  //

  // 32-bit copy is much faster in chrome
  const dest32 = new Uint32Array(dest.buffer);
  dest32.set(new Uint32Array(this.__memory.buffer, 0, destH * destW));

  // That's faster than doing checks in convolver.
  // !!! Note, canvas data is not premultipled. We don't need other
  // alpha corrections.

  if (!alpha) resetAlpha(dest, destW, destH);

  return dest;
};
