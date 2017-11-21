import { app, Tray, dialog, Menu } from 'electron'
import { isHidden, isMini, isRunning, open, getLists } from './reminders'
import { setActive, setInactive, setAttention } from './icons'
import path from 'path'
import childProcess from 'child_process'

let isActive = false

let highlightIndex
async function showRemindersListMenu (tray) {
  getLists()

  const lists = await getLists()

  const menuItems = lists.map((item, index) => ({
    label: item,
    click () {
      childProcess.exec(`osascript -e 'tell application "Reminders" to show list ${index + 1}'`)
    }
  }))

  const buildSelectBadgeList = () => lists.map((item, index) => ({
    label: item,
    type: 'radio',
    checked: highlightIndex === index,
    click: () => { highlightIndex = index }
  }))

  const menu = Menu.buildFromTemplate([
      { label: 'Switch list…', enabled: false },
    ...menuItems,
      { type: 'separator' },
      { label: 'List for badge', submenu: buildSelectBadgeList() },
      { label: 'Quit', role: 'quit' }
  ])

  tray.popUpContextMenu(menu)
}

function showopenDialog (tray) {
  dialog.showMessageBox({
    message: 'Reminders app not running',
    detail: 'In order for Reminders Menu Bar to work, Reminders.app must be running.',
    buttons: ['Open Reminders.app', 'Cancel']
  }, (index) => {
    if (index === 0) {
      open()
      setInactive(tray)
    }
  })
}

async function bindEvents (tray, app) {
  tray.on('click', async (e, bounds) => {
    const running = await isRunning()
    if (!running) {
      showopenDialog(tray)
      return
    }

    if (e.ctrlKey) {
      await showRemindersListMenu(tray)
      return
    }

    if (isActive) {
      await setInactive(tray)
    } else {
      await setActive(tray, bounds)
    }

    isActive = !isActive
  })

  tray.on('right-click', async () => {
    if (!isRunning()) {
      showopenDialog()
      await setInactive(tray)
      return
    }

    await showRemindersListMenu(tray)
  })
}

async function setupWatcher (tray) {
  return setInterval(async () => {
    const running = await isRunning()
    if (!running) {
      await setAttention(tray)
      return
    }

    const mini = await isMini()
    const hidden = await isHidden()
    const isMiniOrHiddenAndNotMini = mini || (hidden && !mini)
    if (!isActive && !isMiniOrHiddenAndNotMini) {
      isActive = true
      await setActive(tray)
      return
    }

    if (isActive && isMiniOrHiddenAndNotMini) {
      isActive = false
      setInactive(tray)
    }
  }, 10000)
}

function createTray () {
  const inactiveIcon = path.join(__dirname, 'icon.png')
  const tray = new Tray(inactiveIcon)
  return tray
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit()
}

app.dock.hide()

app.on('ready', async () => {
  const running = await isRunning()
  if (!running) {
    open()
  }

  const tray = createTray()

  const interval = await setupWatcher(tray)
  app.on('before-quit', () => {
    clearInterval(interval)
  })

  setInactive(tray)
  bindEvents(tray, app)
})
