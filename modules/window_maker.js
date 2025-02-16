const {app, BrowserWindow, globalShortcut, ipcMain}  = require('electron/main');

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
    settingWin.loadFile('./src/templates/index.html')
    settingWin.on("close", ()=>{
        settingWin = null
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
        win = null
    })

}


module.exports = {
    createWindow, 
    settingWindow
};