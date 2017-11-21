#!/usr/bin/osascript
tell application "System Events"
	if visible of process "Reminders" is true then
		set visible of application process "Reminders" to false
	end if

	local is_min

	tell application "Reminders"
		repeat with rem_window in every window
			try
				set is_min to (get miniaturized of rem_window)
			on error msg number -1700
				log msg
			end try
		end repeat
	end tell

	if (not is_min)
		tell application "Reminders" to set miniaturized of window 1 to true
	end if
end tell
