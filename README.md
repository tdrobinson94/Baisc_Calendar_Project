Gulp Tasks
All tasks are listed below, but ideally you will just need to run gulp start and be done with it.

gulp watch: This is the primary task that will fire up the server, watch files and allow you to start building
gulp css: This will minify the CSS file
gulp scss: This will compile your SASS
gulp browserified: This will transpile your JS from ES6 to ES5
gulp deploy: This will deploy your application to Surge.sh for you



# Installation

#### Prerequisites

Make sure you have an up to date installation of `npm`
with `brew update` followed by either `brew install npm` or `brew upgrade npm`.

Then use npm to install the following apps with `npm install -g $APP_NAME`
* `gulp-cli`
* `surge`

# Features

This template features a couple different tools. First it utalizes Gulp for different tasks.

1. Clone down this repo
2. Rename and change into the project folder
3. Remove `git` from it `$ rm -rf .git`
4. Initialize Git `$ git init`
5. Install the dependencies `$ npm install`
6. Build 


## Gulp Tasks

All tasks are listed below, but ideally you will just need to run `gulp start` and be done with it.

- `gulp watch`: This is the primary task that will fire up the server, watch files and allow you to start building
- `gulp css`: This will minify the CSS file
- `gulp scss`: This will compile your SASS
- `gulp browserify`: This will transpile your JS from ES6 to ES5
- `gulp deploy`: This will deploy your application to Surge.sh for you

- `gulp build`: This will run gulp watch, gulp scss and gulp browserify
