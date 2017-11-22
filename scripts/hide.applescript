#!/usr/bin/osascript
tell application "System Events"
	if visible of process "Reminders" is true then
		set visible of application process "Reminders" to false
	end if
end tell
