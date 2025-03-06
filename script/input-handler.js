export class InputHandler {
  constructor(canvas) {
    // Rotation state
    this.rotXAngle = 0;  // X-axis rotation
    this.rotYAngle = 0;  // Y-axis rotation
    this.cameraZ = 5;    // Camera distance

    // Mouse drag state
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    // Initialize event listeners
    this.initControls(canvas);
  }

  // Set up input event handlers
  initControls(canvas) {
    // Mouse drag rotation
    canvas.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;

      this.rotYAngle += dx * 0.01;
      this.rotXAngle += dy * 0.01;

      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    canvas.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    // WS keys for camera zoom
    window.addEventListener("keydown", (e) => {
      const step = 0.5;
      if (e.key === "w") this.cameraZ -= step;
      if (e.key === "s") this.cameraZ += step;
      this.cameraZ = Math.max(1, Math.min(20, this.cameraZ));
    });
  }
}
