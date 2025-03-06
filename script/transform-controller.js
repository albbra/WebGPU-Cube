import {
  perspective,
  rotationX,
  rotationY,
  multiplyMatrices,
  translation,
} from "./math.js";

// Transformation matrix controller
export class TransformController {
  constructor(inputHandler, webGPUContext) {
    this.input = inputHandler;
    this.webGPU = webGPUContext;
  }

  updateTransforms() {
    // Calculate rotation matrices
    const rotX = rotationX(this.input.rotXAngle);
    const rotY = rotationY(this.input.rotYAngle);

    // Combine rotations
    const modelMatrix = multiplyMatrices(rotY, rotX);

    // Camera/view matrix
    const viewMatrix = translation(0, 0, -this.input.cameraZ);

    // Projection matrix
    const aspect = this.webGPU.canvas.width / this.webGPU.canvas.height;
    const projMatrix = perspective(Math.PI / 4, aspect, 0.1, 10.0);

    // MVP matrix
    const mvpMatrix = multiplyMatrices(
      multiplyMatrices(modelMatrix, viewMatrix),
      projMatrix
    );

    this.updateUniformBuffer(mvpMatrix);
    return mvpMatrix;
  }

  // Send matrix data to GPU
  updateUniformBuffer(mvpMatrix) {
    const gpuBufferData = new Float32Array(mvpMatrix);
    this.webGPU.device.queue.writeBuffer(
      this.webGPU.uniformBuffer,
      0,
      gpuBufferData
    );
  }
}
