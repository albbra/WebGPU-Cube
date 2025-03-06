# WebGPU 3D Cube Rendering

This project demonstrates how to render a 3D cube using WebGPU, a modern graphics API for the web. The cube can be rotated using mouse drag and moved along the Z-axis using the W and S keys.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Controls](#controls)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Prerequisites

Before running the project, ensure you have the following installed:

- **Visual Studio Code (VSCode):** Download and install from [here](https://code.visualstudio.com/).
- **Live Server Extension:** Install the Live Server extension in VSCode.
- **Microsoft Edge:** Ensure you have Microsoft Edge installed, as it supports WebGPU.

## Setup

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/albbra/WebGPU-Cube.git
cd WebGPU-Cube
```

### 2. Open the Project in VSCode

Open the project folder in Visual Studio Code:

```bash
code .
```

### 3. Install Live Server Extension

- Open the Extensions view in VSCode (**Ctrl+Shift+X**).
- Search for **Live Server** and install it.

## Running the Project

### 1. Start Live Server

- Open the `index.html` file in the project.
- Right-click anywhere in the file and select **Open with Live Server**.
- Alternatively, click the **Go Live** button in the bottom-right corner of VSCode.

### 2. Open in Microsoft Edge

Live Server will open the project in your default browser. If it doesn't open in Microsoft Edge, manually open Edge and navigate to:

```
http://127.0.0.1:5500
```

### 3. Interact with the Cube

- **Rotate the Cube:** Click and drag with the mouse.
- **Move the Camera:** Use the **W** key to move forward and the **S** key to move backward.

## Project Structure

The project is organized as follows:

```
WebGPU-Cube/
├── .vscode/
│ └── settings.json           # VSCode workspace settings
├── scripts/                  # JavaScript source files
│ ├── constants.js            # Geometry data
│ ├── input-handler.js        # Mouse/keyboard input handling
│ ├── main.js                 # Application entry point
│ ├── math.js                 # Matrix math utilities
│ ├── render-loop.js          # WebGPU rendering loop
│ ├── shader-loader.js        # WGSL shader loading
│ ├── transform-controller.js # Matrix transformations
│ ├── utils.js                # Helper functions
│ └── webgpu-context.js       # WebGPU initialization and management
├── shader/
│ └── shader.wgsl             # WebGPU shader code
├── style/
│ └── style.css               # CSS styles
├── index.html                # Main HTML entry point
└── README.md                 # Project documentation
```

## Controls

- **Mouse Drag:** Rotate the cube.
- **W Key:** Move the camera closer to the cube.
- **S Key:** Move the camera away from the cube.

## Troubleshooting

### 1. WebGPU Not Supported

If you see an error like *WebGPU is not supported in your browser*, ensure:

- You are using **Microsoft Edge** or another browser that supports WebGPU.
- WebGPU is enabled in your browser (usually enabled by default in Edge).

### 2. Cube Not Rendering

If the cube does not render:

- Check the browser console for errors (**F12 > Console**).
- Ensure the `shader.wgsl` file is correctly loaded and compiled.

### 3. Live Server Issues

If Live Server does not work:

- Ensure the Live Server extension is installed and enabled.
- Restart VSCode and try again.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [WebGPU API Documentation](https://gpuweb.github.io/gpuweb/)
- **Microsoft Edge** for WebGPU support.
