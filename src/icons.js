import { exec } from 'child-process-promise'
import path from 'path'
import { position, activate, hideSidebar, isPositioned } from './reminders'

function setInactive (tray) {
  tray.setHighlightMode('never')

  const inactiveIcon = path.join(__dirname, 'icon.png')
  tray.setImage(inactiveIcon)

  const p = path.resolve(__dirname, '../scripts/hide.applescript')
  exec(p)
}

async function setActive (tray, bounds = null) {
  tray.setHighlightMode('always')

  const activeIcon = path.join(__dirname, 'icon-active.png')
  tray.setImage(activeIcon)

  await activate()
  const positioned = await isPositioned()
  if (!positioned) {
    await position(bounds)
    await hideSidebar()
  }
}

function setAttention (tray) {
  tray.setHighlightMode('never')
  const activeIcon = path.join(__dirname, 'icon-attention.png')
  tray.setImage(activeIcon)
}

export {
  setActive,
  setInactive,
  setAttention
}
