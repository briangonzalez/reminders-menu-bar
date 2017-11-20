import childProcess from 'child_process'
import path from 'path'

function isRunning () {
  const p = path.resolve(__dirname, '../applescripts/is-running.applescript')
  const out = childProcess.execSync(p, { encoding: 'utf8' })
  return out.includes('true')
}

function isMini () {
  const p = path.resolve(__dirname, '../applescripts/is-mini.applescript')
  const out = childProcess.execSync(p, { encoding: 'utf8' })
  return out.includes('true')
}

function isHidden () {
  const p = path.resolve(__dirname, '../applescripts/is-hidden.applescript')
  const out = childProcess.execSync(p, { encoding: 'utf8' })
  return !out.includes('true')
}

function open () {
  childProcess.execSync('open /Applications/Reminders.app')
}

function getLists () {
  return childProcess
    .execSync('osascript -e \'tell application "Reminders" to set todo_lists to (get name of every list)\'', {
      encoding: 'utf8'
    })
    .split(', ')
}

export {
  open,
  isHidden,
  isMini,
  isRunning,
  getLists
}
