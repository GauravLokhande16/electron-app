import { BrowserWindow, app, ipcMain } from "electron";
import path, { dirname } from "node:path";
import {fileURLToPath} from "node:url";
import { readFile, writeFile } from "node:fs/promises"
import { appendFile, createWriteStream } from "node:fs";

let win;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDev = !app.isPackaged;


function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
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

  ipcMain.on("to-main",(event, message)=>{
    win.webContents.send("main-msg",`Action from main: ${message.toUpperCase()}`);
  })

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
