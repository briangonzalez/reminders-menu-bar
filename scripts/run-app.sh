#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
cd ..
./node_modules/.bin/run-node ./node_modules/.bin/electron-forge start > /dev/null 2>&1 &
