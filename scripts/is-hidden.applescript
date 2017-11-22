#!/usr/bin/osascript

tell application "System Events"
  -- set props to (properties of window 1 of application process "Reminders")
  -- log props
  set is_hidden to visible of window 1 of application "Reminders"
  return is_hidden
end tell
