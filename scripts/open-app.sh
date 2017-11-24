#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" # path of this file
LINK=$DIR/reminders-menu-bar # this is a symlink
SDIR="$(dirname "$(readlink "$LINK")")" # get full path which link points to

cd $DIR
APP_PATH="$SDIR/Reminders Menu Bar.app"
open "$APP_PATH"
