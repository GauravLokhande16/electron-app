import { app, BrowserWindow, ipcMain } from "electron";
import path, { dirname } from "path";
import { fork } from "child_process";
import { fileURLToPath } from "url";

const isDev = !app.isPackaged;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win;
let child;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(app.getAppPath(), "dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (child && !child.killed) child.kill();
    app.quit();
  }
});

// utility process
const  utilityProcess = () => {
  if (child && !child.killed) return;

  const childPath = path.join(__dirname, "child.js");
  child = fork(childPath);

  child.on("message", (msg) => {
    if (msg?.type === "result") {
      win.webContents.send("multiply-result", {
        value: msg.value,
      });
    }
  });

  child.on("exit", () => (child = null));
  child.on("error", (err) => {
    console.error("Child error:", err);
    child = null;
  });
}

ipcMain.on("to-main-send-number", (event, number) => {

  utilityProcess();
  if (child && !child.killed) {
    child.send({ action: "multiply", number });
  }
  else {
    event.sender.send("child-result", {
      error: "Child process not available",
      requestId,
    });
  }
});
