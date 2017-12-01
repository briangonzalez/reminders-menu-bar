import path from 'path'
import { exec } from 'child-process-promise'

async function isRunning () {
  const p = path.resolve(__dirname, '../scripts/is-running.applescript')
  const out = await exec(p, { encoding: 'utf8' })
  return out.stdout.includes('true')
}

async function isMini () {
  const p = path.resolve(__dirname, '../scripts/is-mini.applescript')
  let out = await exec(p, { encoding: 'utf8' })
  return out.stdout.includes('true')
}

async function isHidden () {
  const p = path.resolve(__dirname, '../scripts/is-hidden.applescript')
  const out = await exec(p, { encoding: 'utf8' })
  return !out.stdout.includes('true')
}

async function isFrontmost () {
  const p = path.resolve(__dirname, '../scripts/is-frontmost.applescript')
  const out = await exec(p, { encoding: 'utf8' })
  return out.stdout.includes('Reminders')
}

async function open () {
  exec('open /Applications/Reminders.app')
}

async function getLists () {
  const out = await exec(
    "osascript -e 'tell application \"Reminders\" to set todo_lists to (get name of every list)'"
  )
  const lists = out.stdout.split(', ').map(l => l.trim())
  return lists
}

async function switchList (list) {
  const p = path.resolve(__dirname, '../scripts/switch-list.applescript')
  await exec(`${p} "${list}"`)
}

async function countList (list) {
  const p = path.resolve(__dirname, '../scripts/count-list.applescript')
  await exec(`${p} "${list}"`)
}

async function activate () {
  const activateScript = path.resolve(__dirname, '../scripts/activate.applescript')
  await exec(activateScript)
}

async function position (bounds) {
  const positionScript = path.resolve(__dirname, '../scripts/position.applescript')
  await exec(`${positionScript} ${bounds ? `${bounds.x} ${bounds.y}` : ''}`)
}

async function hideSidebar () {
  const hideSidebarScript = path.resolve(__dirname, '../scripts/hide-sidebar.applescript')
  await exec(hideSidebarScript)
}

async function isPositioned () {
  const getBoundsScript = path.resolve(__dirname, '../scripts/get-bounds.applescript')
  const out = await exec(getBoundsScript)
  return out.stdout.split(', ')[1] === '40' // moved to upper right
}

export {
  activate,
  countList,
  getLists,
  hideSidebar,
  isFrontmost,
  isHidden,
  isMini,
  isPositioned,
  isRunning,
  open,
  position,
  switchList
}
