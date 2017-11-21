import path from 'path'
import { exec } from 'child-process-promise'

async function isRunning () {
  const p = path.resolve(__dirname, '../applescripts/is-running.applescript')
  const out = await exec(p, { encoding: 'utf8' })
  return out.stdout.includes('true')
}

async function isMini () {
  const p = path.resolve(__dirname, '../applescripts/is-mini.applescript')
  let out = await exec(p, { encoding: 'utf8' })
  return out.stdout.includes('true')
}

async function isHidden () {
  const p = path.resolve(__dirname, '../applescripts/is-hidden.applescript')
  const out = await exec(p, { encoding: 'utf8' })
  return !out.stdout.includes('true')
}

async function open () {
  exec('open /Applications/Reminders.app')
}

async function getLists () {
  const out = await exec('osascript -e \'tell application "Reminders" to set todo_lists to (get name of every list)\'')
  const lists = out.stdout.split(', ')
  return lists
}

export {
  open,
  isHidden,
  isMini,
  isRunning,
  getLists
}
