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
  const lists = out.stdout.split(', ')
  return lists
}

function switchList (list) {
  const p = path.resolve(__dirname, '../scripts/switch-list.applescript')
  exec(`${p} "${list}"`)
}

export {
  open,
  isFrontmost,
  isHidden,
  isMini,
  isRunning,
  getLists,
  switchList
}
