import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
  sendNumber: (num) => ipcRenderer.send("to-main-send-number", num),
  onMultiplyResult: (cb) => ipcRenderer.on("multiply-result", (_, data) => cb(data)),
});
