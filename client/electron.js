const { app, BrowserWindow } = require("electron");

let homeWindow;

app.on("ready",createHomeWindow);

app.on("window-all-closed", () => {
  if(process.platform !== "darwin"){
    app.quit();
  }
})

app.on("activate",() => {
  if(homeWindow === null){
    createHomeWindow();
  }
})


function createHomeWindow(){
  homeWindow = new BrowserWindow({
    width: 800,
    width: 600
  })

  homeWindow.on("close", () => {
    homeWindow = null;
  })
  
  homeWindow.loadFile(`${__dirname}/build/index.html`);
}

