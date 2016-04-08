# uProject
Best project you've ever seen


## Environment setup
1. Install ` git ` : [Git SCM](http://git-scm.com/downloads/). *Dependency for bower*
2. Install ` node ` : [NodeJS v4*](https://nodejs.org/en/download/)
3. Install ` npm ` : [NPM Super easy install](https://www.npmjs.org/doc/README.html#super-easy-install)
4. Install ` ruby ` : [Ruby installer](http://rubyinstaller.org/)

## Project initialization
1. Navigate to root folder.
2. Run ` npm install `
3. Run ` npm install -g grunt `
4. Run ` npm install -g bower `
5. Run ` gem install sass `
6. Run ` bower install `


## Start local dev server
1. Open in root folder a terminal and run ` grunt server `
2. If you want watch on files chages and reload browser, run in other terminal ` grunt watch `
3. To prevent js minification use "dev" flag ` grunt server:dev `
4. To run tests run in terminal ` grunt tests `


## Build project
1. To build ui part run in the root folder ` grunt build `
   By default, all files are built to the "production" folder
2. To prevent js minification use "dev" flag ` grunt build:dev `
