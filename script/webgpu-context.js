import { cubeVertices, cubeIndices } from "./constants.js";

export class WebGPUContext {
  constructor(canvas) {
    this.canvas = canvas;
    this.device = null;
    this.pipeline = null;
    this.uniformBuffer = null;
    this.depthTexture = null;
    this.vertexBuffer = null;
    this.indexBuffer = null;
    this.bindGroup = null;
  }

  async initialize() {
    const adapter = await navigator.gpu.requestAdapter();
    this.device = await adapter.requestDevice();

    const context = this.canvas.getContext("webgpu");
    const format = navigator.gpu.getPreferredCanvasFormat();

    context.configure({
      device: this.device,
      format: format,
      alphaMode: "premultiplied",
    });

    this.createBuffers();
    this.createDepthTexture();
    return this.device;
  }

  resize() {
    this.createDepthTexture();
  }

  createBuffers() {
    // Vertex buffer
    this.vertexBuffer = this.device.createBuffer({
      size: cubeVertices.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    });
    new Float32Array(this.vertexBuffer.getMappedRange()).set(cubeVertices);
    this.vertexBuffer.unmap();

    // Index buffer
    this.indexBuffer = this.device.createBuffer({
      size: cubeIndices.byteLength,
      usage: GPUBufferUsage.INDEX,
      mappedAtCreation: true,
    });
    new Uint16Array(this.indexBuffer.getMappedRange()).set(cubeIndices);
    this.indexBuffer.unmap();

    // Uniform buffer
    this.uniformBuffer = this.device.createBuffer({
      size: 16 * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
  }

  createDepthTexture() {
    if (this.depthTexture) this.depthTexture.destroy();
    this.depthTexture = this.device.createTexture({
      size: [this.canvas.width, this.canvas.height],
      format: "depth24plus",
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
  }

  async createPipeline(shaderModule) {
    const bindGroupLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX,
          buffer: { type: "uniform" },
        },
      ],
    });

    this.bindGroup = this.device.createBindGroup({
      layout: bindGroupLayout,
      entries: [{ binding: 0, resource: { buffer: this.uniformBuffer } }],
    });

    this.pipeline = this.device.createRenderPipeline({
      layout: this.device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      }),
      vertex: {
        module: shaderModule,
        entryPoint: "vertexMain",
        buffers: [
          {
            attributes: [
              // Position: 3 floats (offset 0)
              { shaderLocation: 0, offset: 0, format: "float32x3" },
              // Color: 3 floats (offset 12 = 3 floats * 4 bytes)
              { shaderLocation: 1, offset: 12, format: "float32x3" },
            ],
            arrayStride: 24, // 6 floats * 4 bytes = 24 bytes per vertex
            stepMode: "vertex",
          },
        ],
      },
      fragment: {
        module: shaderModule,
        entryPoint: "fragmentMain",
        targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }],
      },
      primitive: {
        topology: "triangle-list",
        cullMode: "none",
      },
      depthStencil: {
        format: "depth24plus",
        depthWriteEnabled: true,
        depthCompare: "less",
      },
    });
  }
}
