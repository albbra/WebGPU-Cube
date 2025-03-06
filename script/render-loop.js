import { cubeIndices } from "./constants.js";

export class RenderLoop {
  constructor(webGPUContext, transformController) {
    this.webGPU = webGPUContext;
    this.transform = transformController;
    this.frameCount = 0;
  }

  start() {
    const frame = () => {
      this.frameCount++;
      try {
        this.transform.updateTransforms();
        this.executeRenderPass();
      } catch (error) {
        console.error("Render error:", error);
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  executeRenderPass() {
    const commandEncoder = this.webGPU.device.createCommandEncoder();
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.webGPU.canvas
            .getContext("webgpu")
            .getCurrentTexture()
            .createView(),
          clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1 },
          loadOp: "clear",
          storeOp: "store",
        },
      ],
      depthStencilAttachment: {
        view: this.webGPU.depthTexture.createView(),
        depthClearValue: 1.0,
        depthLoadOp: "clear",
        depthStoreOp: "store",
      },
    });

    renderPass.setPipeline(this.webGPU.pipeline);
    renderPass.setBindGroup(0, this.webGPU.bindGroup);
    renderPass.setVertexBuffer(0, this.webGPU.vertexBuffer);
    renderPass.setIndexBuffer(this.webGPU.indexBuffer, "uint16");
    renderPass.drawIndexed(cubeIndices.length);
    renderPass.end();

    this.webGPU.device.queue.submit([commandEncoder.finish()]);
  }
}
