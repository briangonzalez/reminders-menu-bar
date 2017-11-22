import path from 'path'
import { exec } from 'child-process-promise'
import childProcess from 'child_process'

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

async function open () {
  exec('open /Applications/Reminders.app')
}

async function getListsWithCLI () {
  /* Very SLOW! */
  const remindersCli = path.join(__dirname, '../bin/reminders-cli')
  const out = await exec(`${remindersCli} show-lists`)
  return out.stdout.trim().split('\n')
}

async function getLists () {
  const out = await exec(
    "osascript -e 'tell application \"Reminders\" to set todo_lists to (get name of every list)'"
  )
  const lists = out.stdout.split(', ')
  return lists
}

function switchList (list) {
  // const p = path.resolve(__dirname, '../scripts/bin/switch-list')
  // exec(`osascript ${p} "${list}"`)
  // childProcess.spawn(`/usr/bin/osascript`,
  //   [
  //     '-e',
  //     `tell application "Reminders" to show list "${list}"`
  //   ]
  // )
  childProcess.exec(`/bin/sh ./scripts/switch-list.sh "${list}"`, (err) => {
    console.log(err)
  })
}

export {
  open,
  isHidden,
  isMini,
  isRunning,
  getLists,
  getListsWithCLI,
  switchList
}
