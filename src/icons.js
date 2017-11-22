import { exec } from 'child-process-promise'
import path from 'path'

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

  const activateScript = path.resolve(__dirname, '../scripts/activate.applescript')
  const positionScript = path.resolve(__dirname, '../scripts/position.applescript')
  const hideSidebarScript = path.resolve(__dirname, '../scripts/hide-sidebar.applescript')

  await exec(activateScript)
  await exec(hideSidebarScript)
  await exec(`${positionScript} ${bounds ? `${bounds.x} ${bounds.y}` : ''}`)
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
