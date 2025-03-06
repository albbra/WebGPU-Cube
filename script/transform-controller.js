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
    const aspect = this.webGPU.canvas.width / this.webGPU.canvas.height;

    // Create matrices
    const model = multiplyMatrices(
      rotationY(this.input.rotYAngle),
      rotationX(this.input.rotXAngle)
    );

    // Camera/view matrix
    const view = translation(0, 0, -this.input.cameraZ);

    // Projection matrix
    const proj = perspective(Math.PI / 4, aspect, 0.1, 10.0);

    // MVP matrix: PROJ * VIEW * MODEL
    const mvp = multiplyMatrices(multiplyMatrices(model, view), proj);

    this.updateUniformBuffer(mvp);
    return mvp;
  }

  // Send matrix data to GPU
  updateUniformBuffer(mvpMatrix) {
    const alignedBuffer = new Float32Array(16);
    alignedBuffer.set(mvpMatrix);
    this.webGPU.device.queue.writeBuffer(
      this.webGPU.uniformBuffer,
      0,
      alignedBuffer.buffer
    );
  }
}
