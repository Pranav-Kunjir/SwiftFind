const {contextBridge, ipcRenderer} = require('electron')
// this is a preloader which is used to connect the node js and web renderer which do not talk for some security reasons so we have added these to expose them the renderer

// contextBridge.exposeInMainWorld("versions",{
//     node: () => process.versions.node,
//     chrome: () => process.versions.chrome,
//     electron: () => process.versions.electron,
// })

contextBridge.exposeInMainWorld("electron", {
    sendPrompt: (data) => ipcRenderer.send("prompt", data),
});