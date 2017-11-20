#!/usr/bin/osascript
tell application "System Events"
	if visible of process "Reminders" is true then
		set visible of application process "Reminders" to false
	end if

	tell application "Safari"
		set miniaturized of window 1 to true
	end tell
end tell
