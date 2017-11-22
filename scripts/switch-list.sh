echo $1
script="tell application \"Reminders\" to show list \"$1\""
echo $script
/usr/bin/osascript -e "$script"
