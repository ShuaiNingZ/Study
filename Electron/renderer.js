/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const ioHook = require("iohook");

ioHook.on("mousemove", (event) => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

// Register and start hook
ioHook.start();

// Alternatively, pass true to start in DEBUG mode.
ioHook.start(true);

// False to disable DEBUG. Cleaner terminal output.
ioHook.start(false);
