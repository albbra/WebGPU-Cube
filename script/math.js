// math.js
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

export function identity() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

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

export function rotationX(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
}

export function rotationY(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}

export function translation(tx, ty, tz) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
}

export function transposeMatrix(m) {
  return [
    m[0], m[4], m[8], m[12],
    m[1], m[5], m[9], m[13],
    m[2], m[6], m[10], m[14],
    m[3], m[7], m[11], m[15],
  ];
}

export function scaleMatrix(m, factor) {
  return [
    m[0] * factor, m[1],         m[2],         m[3],
    m[4],         m[5] * factor, m[6],         m[7],
    m[8],         m[9],          m[10] * factor, m[11],
    m[12],        m[13],         m[14],         m[15],
  ];
}