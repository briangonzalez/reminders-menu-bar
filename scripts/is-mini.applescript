#!/usr/bin/osascript

local is_mini

tell application "Reminders"
  repeat with rem_window in every window
    try
      set is_mini to (get miniaturized of rem_window)
    on error msg number -1700
      log msg
    end try
  end repeat
end tell

return is_mini
