const electron = require("electron");
const {app, BrowserWindow} = electron;
const path = require("path");
const url = require("url");
const {Menu} = electron;

let win;

const createWindow = ()=>{
    win = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        },
    
    });
    win.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file',
        slashes :true
    }));

    win.on('closed',()=>{
        win = null;
    })
}



app.on('ready',()=>{
    createWindow();
    // const template = [                  
        
    // ]
    // const menu = Menu.buildFromTemplate(template)
    // Menu.setApplicationMenu(menu)
})

