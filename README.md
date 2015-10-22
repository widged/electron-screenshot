# Electron-screenshot

Using electron to take screenshots of a list of urls

## Install dependencies

    npm install

## Edit

Open the file:

    electron-screenshot/screen-capture/script.es6.js

and edit the list

    captureList([
    	"http://google.com",
      "http://github.com"
    ]);

## Run

    cd electron-screenshot/screen-capture
    ./electron

For OSX mac users, `electron.command` is provided as a shortcut. Double click to run these commands from the finder.

For OSX mac users, `automator-raw-to-thumbnail.workflow` is an automator workflow for converting raw png screenshots into 200px jpg thumbnails. 
