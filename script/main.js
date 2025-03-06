import { WebGPUContext } from "./webgpu-context.js";
import { InputHandler } from "./input-handler.js";
import { TransformController } from "./transform-controller.js";
import { RenderLoop } from "./render-loop.js";
import { ShaderLoader } from "./shader-loader.js";

async function initWebGPU() {
  try {
    const canvas = document.getElementById("webgpuCanvas");
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;

    // Initialize core systems
    const webGPU = new WebGPUContext(canvas);
    const input = new InputHandler(canvas);
    await webGPU.initialize();

    // Load shaders
    const shaderModule = await ShaderLoader.load(webGPU.device);
    await webGPU.createPipeline(shaderModule);

    // Initialize remaining systems
    const transforms = new TransformController(input, webGPU);
    const renderer = new RenderLoop(webGPU, transforms);

    // Start rendering
    renderer.start();
  } catch (error) {
    console.error("Fatal initialization error:", error);
  }
}

initWebGPU();
