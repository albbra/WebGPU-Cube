import {
  perspective,
  rotationX,
  rotationY,
  multiplyMatrices,
  scaleMatrix,
  translation,
  transposeMatrix,
} from "./math.js";
import { mat4ToString } from "./utils.js";

export class TransformController {
  constructor(inputHandler, webGPUContext) {
    this.input = inputHandler;
    this.webGPU = webGPUContext;
  }

  updateTransforms() {
    const rotX = rotationX(this.input.rotXAngle);
    const rotY = rotationY(this.input.rotYAngle);

    // Combine rotations and scale
    const modelMatrix = multiplyMatrices(rotY, rotX);
    const scaledModelMatrix = scaleMatrix(modelMatrix, 0.5);

    // Camera/view matrix
    const viewMatrix = translation(0, 0, -this.input.cameraZ);

    // Projection matrix
    const aspect = this.webGPU.canvas.width / this.webGPU.canvas.height;
    const projMatrix = perspective(Math.PI / 4, aspect, 0.1, 10.0);

    // MVP matrix
    const mvpMatrix = multiplyMatrices(
      multiplyMatrices(projMatrix, viewMatrix),
      scaledModelMatrix
    );

    //Debug Output
    console.log("Model Matrix:\n", mat4ToString(scaledModelMatrix));
    console.log("View Matrix:\n", mat4ToString(viewMatrix));
    console.log("Projection Matrix:\n", mat4ToString(projMatrix));
    console.log("MVP Matrix:\n", mat4ToString(mvpMatrix));

    this.updateUniformBuffer(mvpMatrix);
    return mvpMatrix;
  }

  updateUniformBuffer(mvpMatrix) {
    const transposedArray = transposeMatrix(mvpMatrix);
    if (transposedArray.some((v) => isNaN(v))) {
      console.error("Invalid matrix values");
      return;
    }
    this.webGPU.device.queue.writeBuffer(
      this.webGPU.uniformBuffer,
      0,
      new Float32Array(transposedArray)
    );
  }
}
