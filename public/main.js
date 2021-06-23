// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const WebTorrent = require('webtorrent')
const spawn = require('child_process').spawn
const vlcCommand = require('vlc-command')
const isDev = require('electron-is-dev')
const { autoUpdater } = require('electron-updater')

const client = new WebTorrent()

require('@electron/remote/main').initialize()

let mainWindow;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
    webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    show: false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  mainWindow.setMenuBarVisibility(false)

  mainWindow.webContents.on('did-finish-load', () => {
    if (loadingScreen != null) {
      loadingScreen.close();
      loadingScreen = null
    }
    mainWindow.show();
  })

  // mainWindow.webContents.send('start', 'lala')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

var _torrent;
var _cp;

var _format = [
  'mkv',
  'mp4'
]

autoUpdater.on('checking-for-update', () => {
  console.log("checking for update")
})

autoUpdater.on('update-available', (info) => {
  console.log('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  console.log('Update not available.');
  createWindow();
})
autoUpdater.on('error', (err) => {
  console.log('Error in auto-updater. ' + err);
})
// autoUpdater.on('download-progress', (progressObj) => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//   log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//   sendStatusToWindow(log_message);
// })
autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall();  
});

ipcMain.on('start:torent', (evt, args) => {
  console.log(args)
  if (args !== undefined) {
    client.add(args, torrent => {
      _torrent = torrent

      torrent.createServer().listen(9900)

      var _idx;
      var _subIdx;
      var _sent = false;
    
      torrent.files.forEach((file, idx) => {
        // console.log(file)
        var ext = file.name.split('.')

        // console.log(file.name.endsWith('.srt'))
    
        if (_subIdx === undefined)
          _subIdx = file.name.endsWith('.srt') ? idx : null;

        // console.log(file.name.endsWith('.srt') ? idx : null)

        if (_idx === undefined)
          _idx = _format.indexOf(ext[ext.length-1]) !== -1 ? idx : null;
      })

      torrent.on('download', function () {
        evt.sender.send('torrent:info', torrent.progress)
        // console.log(torrent.progress*100)
        // console.warn(_subIdx)

        if (Math.round(torrent.progress*100) === 5) {
          // console.info('send url to play')
          if (!_sent) {
            // evt.sender.send('torrent:play', {
            //   vidUrl: `http://127.0.0.1:9900/${_idx}`,
            //   subUrl: `http://127.0.0.1:9900/${_subIdx}`
            // })

            vlcCommand((err, vlcPath) => {
              if (err) {
                console.error(err);
                return
              }
      
              console.log(_idx)
      
              _cp = spawn(vlcPath, [
                '--play-and-exit',
                '--quiet',
                `http://localhost:9900/${_idx}`
              ])
            })

            _sent = true
          }
        }
      })

      // vlcCommand((err, vlcPath) => {
      //   if (err) {
      //     console.error(err);
      //     return
      //   }

      //   console.log(_idx)

      //   _cp = spawn(vlcPath, [
      //     '--play-and-exit',
      //     '--quiet',
      //     `http://localhost:9900/${_idx}`
      //   ])
      // })
    })
  }
})

const stopTorrent = () => {
  // console.log(_torrent)
  if (_torrent)
    _torrent.destroy()
}

ipcMain.on('stop:torrent', (evt, args) => {
  stopTorrent()
  // _cp.kill('SIGINT');
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let loadingScreen;
const createLoadingScreen = () => {
  autoUpdater.checkForUpdates();
  loadingScreen = new BrowserWindow({
    width: 350,
    height: 250,
    frame: false,
    transparent: true
  })

  loadingScreen.loadURL(
    `file://${path.join(__dirname, '../public/loading.html')}`
  )

  loadingScreen.setResizable(false)

  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  })

  // setTimeout(() => {
  //   loadingScreen.close();
  //   mainWindow.show();
  // }, 5000)
  // loadingScreen.show();
}


app.whenReady().then(() => {
  createLoadingScreen()

  // setTimeout(() => {
  //   createWindow()
  // }, 2000)
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('before-quit', () => {
  stopTorrent()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.