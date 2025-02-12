const {app, BrowserWindow, globalShortcut, ipcMain}  = require('electron/main');
const { stat } = require('node:fs');
const path = require('node:path');
const { PassThrough } = require('node:stream');

let win = null;
let state = "null"

function handleprompt(prompt) {
    console.log(prompt)
}

const createWindow = () => {
    win = new BrowserWindow({
        width: 500,
        height: 90,
        // frame: false,
        showInTaskbar: false,
        webPreferences:{
            preload: path.join(__dirname,"preload.js"),
            nodeIntegration: true
        }
    })
    win.isAlwaysOnTop(true,"screen-saver")
    win.loadFile('./src/templates/index.html')
    win.on("close", ()=>{
        win = null
    })

}

app.whenReady().then(() =>{
    createWindow()
    win.hide()
    globalShortcut.register("Control+Space", () => {
        if(win) {
            if (win.isVisible()){
                win.hide()
            }else{
                win.show()
            }
        }
     
    })
    globalShortcut.register("Escape", () => {
        if(win) {
            if (win.isVisible()){
                win.hide()
            }
        }
    })
    ipcMain.on("prompt", (event, data) =>{
        console.log("the prompt was ", data)
    })
    
})



app.on("window-all-closed",()=>{
    app.quit()
})