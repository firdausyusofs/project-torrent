// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const WebTorrent = require('webtorrent')
const spawn = require('child_process').spawn
const vlcCommand = require('vlc-command')
const isDev = require('electron-is-dev')

const client = new WebTorrent()

require('@electron/remote/main').initialize()

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
    webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  mainWindow.webContents.send('start', 'lala')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

var _torrent;
var _cp;

ipcMain.on('start:torent', (evt, args) => {
  console.log(args)
  if (args !== undefined) {
    client.add(args, torrent => {
      _torrent = torrent

      torrent.createServer().listen(9900)

      torrent.on('download', function () {
        evt.sender.send('torrent:info', torrent.progress)
        console.log(torrent.progress*100)

        if (Math.round(torrent.progress*100) === 5) {
          console.info('send url to play')
          evt.sender.send('torrent:play', `http://localhost:9900/0`)
        }
      })

      // vlcCommand((err, vlcPath) => {
      //   if (err) {
      //     console.error(err);
      //     return
      //   }

      //   _cp = spawn(vlcPath, [
      //     '--play-and-exit',
      //     '--quiet',
      //     `http://localhost:9900/0`
      //   ])
      // })
    })
  }
})

ipcMain.on('stop:torrent', (evt, args) => {
  _torrent.destroy()
  // _cp.kill('SIGINT');
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.