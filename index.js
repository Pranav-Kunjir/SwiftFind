const {app, BrowserWindow, globalShortcut, ipcMain}  = require('electron/main');
const { stat } = require('node:fs');
const path = require('node:path');
const { PassThrough } = require('node:stream');
const {handlePrompt} = require("./modules/handler")

let win = null;
let settingWin = null;

const settingWindow = () =>{
    settingWin = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences:{
            preload: path.join(__dirname,"preload.js"),
            nodeIntegration: true
        }
    })
    settingWin.loadFile('./src/templates/setting.html')
    settingWin.on("close", ()=>{
        settingWin = null;
    })
}


const createWindow = () => {
    win = new BrowserWindow({
        width: 500,
        height: 90,
        frame: false,
        showInTaskbar: false,
        webPreferences:{
            preload: path.join(__dirname,"preload.js"),
            nodeIntegration: true
        }
    })
    win.isAlwaysOnTop(true,"screen-saver")
    win.loadFile('./src/templates/index.html')
    win.on("close", ()=>{
        win = null;
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
        if(data.includes("/help")){
            settingWindow()
        }else{
            handlePrompt(data)
        }
        win.hide()
    });
    ipcMain.on("change_llm", (event,data)=>{
        console.log(data)
    })
    
})



app.on("window-all-closed",()=>{
    app.quit()
})