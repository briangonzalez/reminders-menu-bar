const AutoLaunch = require('auto-launch')
const path = require('path')

const launcher = new AutoLaunch({
  name: 'reminders-menu-bar',
  path: path.join(__dirname, 'Reminders Menu Bar.app')
})

launcher.isEnabled()
.then((isEnabled) => {
  launcher.enable()
  console.log('Registered Reminders Menu Bar for startup')
})
.catch(console.error)
