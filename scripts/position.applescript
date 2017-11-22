#!/usr/bin/osascript
on run argv

  tell application "Finder"
    set _b to bounds of window of desktop
    set _width to item 3 of _b
    set _height to item 4 of _b
  end tell

  set upper_right_pos to _width - 300

  local x_loc
  if (count of argv) > 0 then
    set x_loc to item 1 of argv
  else
    set x_loc to upper_right_pos
  end if

  if (x_loc > upper_right_pos) then
    set x_loc to upper_right_pos
  end if

  tell application "System Events"

    try
      -- Put it in the upper right hand corner.
      set position of first window of application process "Reminders" to {x_loc, 40}
      set size of first window of application process "Reminders" to {0, 400}
    on error errMsg
      log "Can't position window due to assitive devices macOS issue"
    end try

  end tell
end run
