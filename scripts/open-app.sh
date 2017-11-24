#!/bin/bash

echo $PWD
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LINK=$DIR/reminders-menu-bar
SDIR="$(dirname "$(readlink "$LINK")")"
echo $SDIR

cd $DIR
APP_PATH="$SDIR/Reminders Menu Bar.app"
echo $APP_PATH
open "$APP_PATH"
