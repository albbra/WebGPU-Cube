// math.js
// Matrix math utilities for 4x4 transformations

// Creates perspective projection matrix
// fovy: Vertical field of view in radians
// aspect: Viewport aspect ratio (width/height)
// near: Near clipping plane
// far: Far clipping plane
export function perspective(fovy, aspect, near, far) {
  const f = 1.0 / Math.tan(fovy / 2);
  const rangeInv = 1.0 / (near - far);
  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * rangeInv, -1,
    0, 0, (2 * far * near) * rangeInv, 0,
  ];
}

// Identity matrix (4x4)
export function identity() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

// Matrix multiplication (4x4 * 4x4)
export function multiplyMatrices(a, b) {
  if (!a || !b || a.length !== 16 || b.length !== 16) {
    throw new Error(`Invalid matrices: 
      a: ${a?.length || "undefined"}, 
      b: ${b?.length || "undefined"}"
    `);
  }

  let out = new Array(16).fill(0);
  for (let row = 0; row < 4; ++row) {
    for (let col = 0; col < 4; ++col) {
      for (let k = 0; k < 4; ++k) {
        out[row * 4 + col] += a[row * 4 + k] * b[k * 4 + col];
      }
    }
  }
  return out;
}

// X-axis rotation matrix
export function rotationX(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
}

// Y-axis rotation matrix 
export function rotationY(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}

// Translation matrix
export function translation(tx, ty, tz) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
}

// Transposes matrix (rows to columns)
export function transposeMatrix(m) {
  return [
    m[0], m[4], m[8], m[12],
    m[1], m[5], m[9], m[13],
    m[2], m[6], m[10], m[14],
    m[3], m[7], m[11], m[15],
  ];
}

// Creates scaled version of input matrix
export function scaleMatrix(m, factor) {
  const scaleMat = [
    factor, 0, 0, 0,
    0, factor, 0, 0,
    0, 0, factor, 0,
    0, 0, 0, 1
  ];
  return multiplyMatrices(scaleMat, m);
}