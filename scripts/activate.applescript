#!/usr/bin/osascript
on run argv
  tell application "System Events"

    --Show Reminders.
    if visible of process "Reminders" is false then
      tell application "Reminders" to activate
    end if

    tell application "Reminders"
      set miniaturized of window 1 to false
    end tell
  end tell
end run
