const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld("electron", {
    sendPrompt: (data) => ipcRenderer.send("prompt", data),
    change_llm_request: (new_llm) => ipcRenderer.send("change_llm", new_llm),
});