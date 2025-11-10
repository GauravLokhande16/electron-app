import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('msg',{
  sendToMain: (data) => ipcRenderer.send('to-main', data),
  onFromMain: (callback) => ipcRenderer.on('main-msg', (event, data) => callback(data))
});