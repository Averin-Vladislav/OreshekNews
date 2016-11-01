<p align="center">
  <h1 align="center">OreshekNews</h1>
  <h3 align="center">Handy news-service to keep track last trends and events of a world</h3>
</p>  

 [![](https://img.shields.io/badge/version-v1.0.0-brightgreen.svg)](https://github.com/Averin-Vladislav/OreshekNews)
 [![NPM version](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](https://www.npmjs.com/)  [![](https://img.shields.io/badge/build%20with-Gulp-yellow.svg)](http://gulpjs.com/)
 [![](https://img.shields.io/badge/Angular-v1.5.8-red.svg)](https://angularjs.org/) [![](https://img.shields.io/badge/contacts-Facebook-blue.svg)](https://www.facebook.com/vladik.averin) [![](https://img.shields.io/badge/API-NY%20Times-lightgrey.svg)](https://developer.nytimes.com/) [![](https://img.shields.io/badge/DataBase-MongoDB-brightgreen.svg)](https://docs.mongodb.com/)
 
##Fast start with app:
 1. [Download repository](https://github.com/Averin-Vladislav/OreshekNews/archive/master.zip) to your local machine  
 2. Open `[installation]` folder  
 3. Run `deploy.bat` file  
 
 
 
> Implied that you have configured mongoDB - it's necessary for using additional functionality

##To deploy project and run application you must do following steps:  
 1. [Download repository](https://github.com/Averin-Vladislav/OreshekNews/archive/master.zip) to your local machine    
 2. Create web-app project on MSVS or use other server-based framework to create server side (i.e. you can use [gulp-webserver](https://www.npmjs.com/package/gulp-webserver)).
 3. Extract downloaded files to 'app' folder in your `[project-name]` folder (for MSVS users)  
 4. [Install node.js](https://nodejs.org/en/) globally  
 5. In `[app]` folder run command-prompt and install 'node-modules' use `$ npm install` command
 6. Install [mongoDB](https://docs.mongodb.com/) and follow [this instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
 7. For convenient collaboration with your DataBase you can use [RoboMongo](https://robomongo.org/)
 8. Open `[server]` folder and run `$ node server` command there
 9. Run server for gulp compile (`Ctrl + F5` in MSVS or `$ gulp start` command in `[app]` folder - see **Using Gulp** section below)

##Using Gulp
For using [Gulp](http://gulpjs.com/) you ought to install these packages:  
  * [gulp-babel](https://www.npmjs.com/package/gulp-babel)  
  * [gulp-sass](https://www.npmjs.com/package/gulp-sass)  
  * [gulp-concat](https://www.npmjs.com/package/gulp-concat)  
  * [gulp-uglifyjs](https://www.npmjs.com/package/gulp-uglifyjs)  
  * [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)  
  * [gulp-uglifycss](https://www.npmjs.com/package/gulp-uglifycss) 
  * [gulp-webserver](https://www.npmjs.com/package/gulp-webserver)   

For installing [Gulp](http://gulpjs.com/) use command `$ npm install --save-dev gulp-install` in command prompt.  
For installing packages use command `$ npm install --save-dev [package-name]` in command prompt.   

##So now you can use gulp tasks 
Just print `$ gulp` to build whole project or `$ gulp [task-name]` to run particular task:
  * **start** - for running local webser 
  * **babel** - for translate your code into earler standarts of EcmaScript
  * **scripts** - for minifying and concatination your js-code
  * **styles** - for minifying and concatination your css-styles
  * **sass** - for compile your .sass files to .css
  * **clean** - for cache cleaning (cache is used as buffer for image storing)
  * **watch** - for upload any changes in your code



> You can contact me using following email address: 
exo-1996@tut.by
