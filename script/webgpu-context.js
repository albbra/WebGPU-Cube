import { cubeVertices, cubeIndices } from "./constants.js";

export class WebGPUContext {
  constructor(canvas) {
    // WebGPU resources
    this.canvas = canvas;
    this.device = null;       // GPU device
    this.pipeline = null;     // Render pipeline
    this.uniformBuffer = null;// Matrix storage
    this.depthTexture = null; // Depth buffer
    this.vertexBuffer = null; // Geometry data
    this.indexBuffer = null;  // Index data
    this.bindGroup = null;    // Resource bindings
  }
  
  // Initialize WebGPU context
  async initialize() {

    // Adapter/device setup
    const adapter = await navigator.gpu.requestAdapter();
    this.device = await adapter.requestDevice();

    // Canvas configuration
    const context = this.canvas.getContext("webgpu");
    const format = navigator.gpu.getPreferredCanvasFormat();

    context.configure({
      device: this.device,
      format: format,
      alphaMode: "premultiplied",
    });

    // Create GPU buffers
    this.createBuffers();
    this.createDepthTexture();
    return this.device;
  }

  // Handle window resize
  resize() {
    this.createDepthTexture();
  }

  // Create vertex/index/uniform buffers
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

  // Create/recreate depth texture
  createDepthTexture() {
    if (this.depthTexture) this.depthTexture.destroy();
    this.depthTexture = this.device.createTexture({
      size: [this.canvas.width, this.canvas.height],
      format: "depth24plus",
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
  }

  // Create render pipeline
  async createPipeline(shaderModule) {

    // Bind group layout for uniforms
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

    // Pipeline configuration
    this.pipeline = this.device.createRenderPipeline({
      layout: this.device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      }),
      // Vertex shaders
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
      // Fragment shaders
      fragment: {
        module: shaderModule,
        entryPoint: "fragmentMain",
        targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }],
      },
      // Render settings
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
