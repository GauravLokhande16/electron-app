# React + Electron

# Deliverables:
1. A working Electron app with the required functionality.

- This app is build with react and electron.
To run this app in dev mode
- install node module [npm install]
- [npm run dev]
- [npm run watch]

By using the package app also you can try this app

Note: please electron app inside AppFolder

2. A brief explanation of how the communication works in your app.
- In electron app communication between processes is done by IPC(inter process communication).
- preload scripts consist of context Bridge. it bridges the gap between main(parent) and renderer(child) process. It has methods that is being access by main process using webContents and also access by renderer method using window object.
- To give the access of this preload scripts method to renderrer process, we have to enabel context isolation and node intigration.
- react application trigger any action using window object and mension the channel name (string) to identify which action need to be executed and in second parameter send the data to the main process.
- this preload script method send event/data to the main process by using "ipcRenderer" module.
- In main process "ipcMain" module listens for the event and execute the same function on which channel it is being called.
- It perform a task that is place inside the function.
- After performing the operation it can send back the response using preload script channel, it uses "ipcMain" module to send data to renderer process(react app).
- React app listenes an event when it being called by ipcMain module from preload scripts.

- This is how electron app communicates with the other process using the preload scripts, to make our app more secure and less prone web app Vulnerabilities.
