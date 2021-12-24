// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const pathResolve = require('path').resolve
const WebTorrent = require('webtorrent')
const mkdirp = require('mkdirp')
const PouchDB = require('pouchdb-node')
const spawn = require('child_process').spawn
const vlcCommand = require('vlc-command')
const isDev = require('electron-is-dev')
const { autoUpdater } = require('electron-updater')
const fs = require('fs');
const os = require('os')

var client = new WebTorrent()
// PouchDB.plugin(require('pouchdb-adapter-leveldb')).defaults({prefix: ".db/"})
var db = new PouchDB('db', {prefix: "/tmp/flashx/"})

console.log(pathResolve('/tmp/flashx'))

db.info()
.catch(function (error) {
  if (error.name === 'OpenError') {
    var path = db.__opts.prefix
    // console.log(pathResolve(path))

    return new Promise(function (resolve, reject) {
      mkdirp("/tmp/flashx").catch(function (error) {
        if (error) {
          return reject(error)
        }

        resolve()
      })
    })

    .then(function () {
      console.log("here")
      // reusing the db instance from above does not work for me
      return new state.PouchDB('flashx').info()
    })
  }

  throw error
})

require('@electron/remote/main').initialize()

let TMP
try {
  TMP = path.join(fs.statSync('/tmp') && '/tmp', 'flashx')
} catch (err) {
  TMP = path.join(typeof os.tmpdir === 'function' ? os.tmpdir() : '/', 'flashx')
}

let mainWindow;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    frame: false,
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

  var settings = {
    _id: "settings",
    theme: "light",
    path: TMP,
  }

  db.put(settings, (err, result) => {
    if (!err)
      console.log("Successfully added settings")
  })


  mainWindow.webContents.on('did-finish-load', () => {
    
    if (loadingScreen != null) {
      loadingScreen.close();
      loadingScreen = null
    }

    mainWindow.webContents.send('platform:info', process.platform)

    db.get('settings').then(doc => {
      console.log(doc)
      mainWindow.webContents.send('settings:load', doc)
    }).catch(err => {
      console.log(err)
    })

    mainWindow.show();

  })

  // mainWindow.webContents.send('start', 'lala')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

var _torrent;
var _cp;
var _torrentId;

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

ipcMain.on('settings:update', (evt, args) => {
  db.get('settings').then(doc => {
    doc[args.key] = args.value
    db.put(doc)
  })
  console.log("Settings updated")
})

ipcMain.on('start:torent', (evt, args) => {
  if (args !== undefined) {
    client.add(args.url, {destroyStoreOnDestroy: true, path: args.path ? args.path : TMP}, torrent => {
      _torrent = torrent
      _torrentId = args

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

      torrent.on('ready', function () {
        // console.log("ready")
      })

      torrent.on('noPeers', function (announceType) {
        // console.log(announceType)
      })

      torrent.on('infoHash', function () {
        // console.log('infohash')
      })

      torrent.on('wire', function (wire) {
        // console.log(wire)
      })

      torrent.on('download', function () {
        // console.log("here")
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

              _cp.on('exit', () => {
                mainWindow.webContents.send('torrent:stopped')
                stopTorrent()
              })
            })

            _sent = true
          }
        }
      })

      torrent.on('error', function(err) {
        console.log(err)
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
  if (_torrent) {
    if (_cp) {
      _cp.stdin.pause();
      _cp.kill();
    }
    
    _torrent.destroy({destroyStore: true}, (err) => {
      console.log(err)
    })
    // client.remove(_torrentId)
    client.destroy()
    client = new WebTorrent()
  }
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

  if (isDev) {
    setTimeout(() => {
      createWindow()
    }, 2000)
  }
  
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
