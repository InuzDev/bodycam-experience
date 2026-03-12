const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')

app.whenReady().then(() => {
   const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      x: 0,
      y: 0,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      resizable: false,
      focusable: false,
      webPreferences: {
         nodeIntegration: false,
      }
   })

   win.loadURL('file://' + path.join(__dirname, 'bodycam-overlay.html'))
   win.setIgnoreMouseEvents(true)
   win.setAlwaysOnTop(true, 'screen-saver')

   // Ctrl+Q → quit
   globalShortcut.register('Control+Q', () => {
      app.quit()
   })

   // Ctrl+H → hide/show overlay
   let visible = true
   globalShortcut.register('Control+H', () => {
      visible = !visible
      if (visible) win.showInactive()
      else win.hide()
   })

   // Ctrl+N → toggle night vision (sends message to HTML)
   globalShortcut.register('Control+N', () => {
      win.webContents.executeJavaScript(`
      document.body.classList.toggle('nightvision');
    `)
   })
})

app.on('will-quit', () => globalShortcut.unregisterAll())
app.on('window-all-closed', () => app.quit())

