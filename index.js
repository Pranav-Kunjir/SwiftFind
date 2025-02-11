const {app, BrowserWindow, ipcMain, globalShortcut}  = require('electron/main')
const path = require('node:path');
const { PassThrough } = require('node:stream');

let win = null;
const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 800,
        frame: false,
        showInTaskbar: false,
        webPreferences:{
            preload: path.join(__dirname,"preload.js"),
            nodeIntegration: true
        }
    })
    win.isAlwaysOnTop(true,"screen-saver")
    win.loadFile('index.html')

}

app.whenReady().then(() =>{

    globalShortcut.register("Control+Space", () => {
        console.log("shortuct pressed")
        console.log(BrowserWindow.getAllWindows().length)
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
     
    })
})

app.on("window-all-closed",()=>{
    app.hide()
})