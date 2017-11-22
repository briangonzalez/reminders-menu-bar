#!/usr/bin/osascript
on is_running(app_name)
	tell application "System Events" to (name of processes) contains app_name
end is_running

return is_running("Reminders")
