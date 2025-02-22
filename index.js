const {app, BrowserWindow, globalShortcut, ipcMain, Tray, Menu}  = require('electron/main');
const { stat } = require('node:fs');
const path = require('node:path');
const { PassThrough } = require('node:stream');
const {handlePrompt} = require("./modules/handler");
const {readSettings, returnUrl, change_llm} = require("./modules/access_files")
const { nativeImage, MenuItem } = require('electron');
const { type } = require('node:os');
const { run } = require('node:test');


let win = null;
let settingWin = null;
let tray;
let runOnStartUp = false;
let default_llm,llm_url;

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

function autoStartApp(runOnStartUp){
    if (runOnStartUp){
        // electron.app.setLoginItemSettings({
        //     openAtLogin: arg.settings.startOnStartup,
        //     path: electron.app.getPath("exe")
        // });
        console.log("working on that ")
    }
}
const systemTray = () =>{
    const icon = nativeImage.createFromPath("./src/img/icon.png")
    tray = new Tray(icon)
    tray.setToolTip('Swift-Find')
    tray.setTitle('my tytle')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Setting', click:() =>{settingWindow()}},
        { label: 'Quit', role:"quit" },
        { label: 'Run on Start Up',type:'checkbox',checked:runOnStartUp,click:(menuItem) =>{runOnStartUp = menuItem.checked;autoStartApp(runOnStartUp)}}
    ]);
    tray.setContextMenu(contextMenu)
}


app.whenReady().then(() =>{
    autoStartApp()
    systemTray()
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
            readSettings("./src/setting.json")
        }else{                      
            readSettings("./src/setting.json")
            .then(value => {
                default_llm = value;
                return returnUrl("./src/llm_source.json",default_llm); // Return this promise
            })
            .then(value => {
                llm_url = value;
                handlePrompt(data,llm_url)
            })
            .catch(err => console.log(err));

        }
        win.hide()
    });
    ipcMain.on("change_llm", (event,data)=>{
        change_llm("./src/setting.json",data)

    })
    
})



app.on("window-all-closed",()=>{
    app.quit()
})