import { app, Tray, dialog, Menu } from 'electron'
import { isHidden, isMini, isRunning, open, getLists } from './reminders'
import path from 'path'
import childProcess from 'child_process'

let isActive = false
let hasQuit

function setInactive (tray) {
  tray.setHighlightMode('never')
  const p = path.resolve(__dirname, '../applescripts/hide.applescript')
  childProcess.execSync(p)

  const inactiveIcon = path.join(__dirname, 'icon.png')
  tray.setImage(inactiveIcon)
}

function setActive (tray, bounds = null) {
  tray.setHighlightMode('always')
  const activeIcon = path.join(__dirname, 'icon-active.png')
  tray.setImage(activeIcon)

  const p = path.resolve(__dirname, '../applescripts/activate-and-position.applescript')
  childProcess.execSync(`${p} ${bounds ? `${bounds.x} ${bounds.y}` : ''}`)
}

function setAttention (tray) {
  tray.setHighlightMode('never')
  const activeIcon = path.join(__dirname, 'icon-attention.png')
  tray.setImage(activeIcon)
}

let highlightIndex
function showRemindersListMenu (tray) {
  getLists()

  const lists = getLists()

  const menuItems = lists.map((item, index) => ({
    label: item,
    click () {
      childProcess.execSync(`osascript -e 'tell application "Reminders" to show list ${index + 1}'`)
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

function bindEvents (tray, app) {
  tray.on('click', (e, bounds) => {
    if (!isRunning()) {
      showopenDialog(tray)
      return
    }

    if (e.ctrlKey) {
      showRemindersListMenu(tray)
      return
    }

    if (isActive) {
      setInactive(tray)
    } else {
      setActive(tray, bounds)
    }

    isActive = !isActive
  })

  tray.on('right-click', () => {
    if (!isRunning()) {
      showopenDialog()
      setInactive(tray)
      return
    }

    showRemindersListMenu(tray)
  })

  app.on('quit', () => {
    hasQuit = true
  })
}

function setupWatcher (tray) {
  setInterval(() => {
    if (hasQuit) return

    if (!isRunning()) {
      setAttention(tray)
      return
    }

    const isMiniOrHiddenAndMini = isMini() || (isHidden() && !isMini())
    if (!isActive && !isMiniOrHiddenAndMini) {
      isActive = true
      setActive(tray)
      return
    }

    if (isActive && isMiniOrHiddenAndMini) {
      isActive = false
      setInactive(tray)
    }
  }, 3000)
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

app.on('ready', () => {
  if (!isRunning()) {
    open()
  }

  const tray = createTray()

  setupWatcher(tray)
  setInactive(tray)
  bindEvents(tray, app)
})
