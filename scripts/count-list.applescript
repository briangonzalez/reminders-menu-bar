#!/usr/bin/osascript

on run argv
  if (count of argv) > 0 then
    set reminder_list to item 1 of argv
  else
    error "Please provide a list name as the first argumentto this script"
  end if

  tell application "Reminders"
    set the_list to list reminder_list
    set list_size to count of the_list
    return list_size
  end tell
end run
