import { app, Tray, dialog, Menu } from 'electron'
import {
  isHidden,
  isMini,
  isRunning,
  open,
  getLists,
  switchList,
  activate
} from './reminders'

import { setActive, setInactive, setAttention } from './icons'
import path from 'path'

// ask for Reminders permission
let lists
let isActive = false

async function showRemindersListMenu (tray) {
  const menuItems = lists.map(list => ({
    label: list,
    click () {
      isActive = true
      switchList(list)
      setActive(tray)
    }
  }))

  const menu = Menu.buildFromTemplate([
    { label: 'Switch list…', enabled: false },
    ...menuItems,
    { type: 'separator' },
    {
      label: 'Refresh lists',
      async click () {
        lists = await getLists()
        showRemindersListMenu(tray)
      }
    },
    { type: 'separator' },
    /* { label: 'List for badge', submenu: buildSelectBadgeList() }, */
    { label: 'Quit', role: 'quit' }
  ])

  tray.popUpContextMenu(menu)
}

function showopenDialog (tray) {
  dialog.showMessageBox(
    {
      message: 'Reminders.app not running',
      detail:
        'In order for Reminders Menu Bar to work, Reminders.app must be running.',
      buttons: ['Open Reminders.app', 'Cancel']
    },
    index => {
      if (index === 0) {
        open()
        setInactive(tray)
      }
    }
  )
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

    isActive = !isActive
    if (!isActive) {
      await setInactive(tray)
    } else {
      await setActive(tray, bounds)
    }
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
    if (!running) { await setAttention(tray) }
  }, 10000)
}

function createTray () {
  const inactiveIcon = path.join(__dirname, 'icon.png')
  const tray = new Tray(inactiveIcon)
  return tray
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

app.dock.hide()

app.on('ready', async () => {
  const running = await isRunning()
  if (!running) {
    open()
  }

  lists = await getLists()
  const tray = createTray()

  const interval = await setupWatcher(tray)
  app.on('before-quit', () => {
    clearInterval(interval)
  })

  setInactive(tray)
  bindEvents(tray, app)
})
