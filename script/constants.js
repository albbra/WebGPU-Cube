// Cube vertex data: position (3 floats) and color (3 floats)
export const cubeVertices = new Float32Array([
    // positions        // colors 
    // Back face (red)
    -1, -1, -1,    1, 0, 0,
    1, -1, -1,     1, 0, 0.5,
    1, 1, -1,      1, 0.5, 0,
    -1, 1, -1,     1, 0.5, 0.5,
  
    // Front face (blue)
    -1, -1, 1,     0, 0, 1,
    1, -1, 1,      0, 0.5, 1,
    1, 1, 1,       0.5, 0, 1,
    -1, 1, 1,      0.5, 0.5, 1,
  
    // Left face (green)
    -1, -1, -1,    0, 1, 0,
    -1, -1, 1,     0, 1, 0.5,
    -1, 1, 1,      0.5, 1, 0,
    -1, 1, -1,     0.5, 1, 0.5,
  
    // Right face (yellow)
    1, -1, -1,     1, 1, 0,
    1, -1, 1,      1, 1, 0.25,
    1, 1, 1,       1, 1, 0.5,
    1, 1, -1,      1, 1, 0.75,
  
    // Bottom face (magenta)
    -1, -1, -1,    1, 0, 1,
    1, -1, -1,     1, 0.25, 1,
    1, -1, 1,      1, 0.5, 1,
    -1, -1, 1,     1, 0.75, 1,
  
    // Top face (cyan)
    -1, 1, -1,     0, 1, 1,
    1, 1, -1,      0.25, 1, 1,
    1, 1, 1,       0.5, 1, 1,
    -1, 1, 1,      0.75, 1, 1,
  ]);
  
export const cubeIndices = new Uint16Array([
    // Back face
    0, 1, 2, 0, 2, 3,
    // Front face
    4, 5, 6, 4, 6, 7,
    // Left face
    8, 9, 10, 8, 10, 11,
    // Right face
    12, 13, 14, 12, 14, 15,
    // Bottom face
    16, 17, 18, 16, 18, 19,
    // Top face
    20, 21, 22, 20, 22, 23,
  ]);