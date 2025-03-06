export class ShaderLoader {
  static async load(device) {
    const response = await fetch("../shader/shader.wgsl");
    if (!response.ok) throw new Error(`Shader load failed: ${response.status}`);
    const code = await response.text();

    const shaderModule = device.createShaderModule({
      code: code,
      label: "Main Shader Module",
    });

    return new Promise((resolve) => {
      shaderModule.getCompilationInfo().then((info) => {
        if (info.messages.length > 0) {
          console.error("Shader errors:", info.messages);
        }
        resolve(shaderModule);
      });
    });
  }
}
