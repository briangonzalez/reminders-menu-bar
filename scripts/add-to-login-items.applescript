set unix_path to POSIX path of ((path to me as text) & "::")
set app_path to (unix_path & "Reminders Menu Bar.app")
set posix_app_path to (POSIX path of app_path)
set app_file to (POSIX file posix_app_path)
set login_item_path to POSIX path of alias app_file

tell application "System Events"
   make login item at end with properties { name: "Reminders Menu Bar", path: login_item_path, hidden:true }
end tell

log "Added 'Reminders Menu Bar' to login items."
