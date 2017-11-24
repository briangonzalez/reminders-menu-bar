
<p align="center">
  <img alt="reminders menu bar" src="https://user-images.githubusercontent.com/659829/33078156-aa1e76dc-ce86-11e7-9aee-b4090593957f.png" width=200>
</p>

---

[![Travis branch](https://img.shields.io/travis/briangonzalez/reminders-menu-bar/master.svg?style=flat-square)](https://github.com/briangonzalez/reminders-menu-bar) [![npm](https://img.shields.io/npm/briangonzalez/reminders-menu-bar.svg?style=flat-square)](https://www.npmjs.com/package/reminders-menu-bar)

Reminders in your menubar.

## Demo

<img alt="reminders menu bar demo" src="https://user-images.githubusercontent.com/659829/33078327-27f7a484-ce87-11e7-98e8-e0a7c664c61d.gif" width=350>

## Description

Reminders Menu Bar is neat because, instead of recreating the entire complex Reminders UI, it simply
repositions Reminders.app that comes on your system to create the illusion that it's a menubar app.

## Installation

```sh
npm install -g reminders-menu-bar
```

_Note: a postinstall script will register the application for startup._

## Caveats

_Granting access to Reminders_

When the app first boots up, you'll be asked to grant permissions to access Reminders. You'll need to confirm for it to work.

_Granting access to reposition Reminders.app_

- Get path to `Reminders Menu Bar.app`
  - After installation, run `npm ls -g reminders-menu-bar`
  - open `<path from above>/node_modules/reminders-menu-bar/scripts`

- Navigate to `System Preferences -> Security & Privacy -> Accessibility -> Privacy`
- Click `+`
- Add `Reminders Menu Bar.app` from Step 1


### License

MIT
