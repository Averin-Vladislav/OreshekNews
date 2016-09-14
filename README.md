<p align="center">
  <h1 align="center">OreshekNews</h1>
  <p align="center">
    <img align="center" src="http://storage3.static.itmages.ru/i/16/0909/h_1473431086_8270064_28ec693ddb.png">
  </p>
  <h3 align="center">Handy news-service to keep track last trends and events of a world</h3>
</p>  

 [![](https://img.shields.io/badge/version-v1.0.0-brightgreen.svg)](https://github.com/Averin-Vladislav/OreshekNews)
 [![NPM version](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](https://www.npmjs.com/)  [![](https://img.shields.io/badge/build%20with-Gulp-yellow.svg)](http://gulpjs.com/)
 [![](https://img.shields.io/badge/Angular-v1.5.8-red.svg)](https://angularjs.org/) [![](https://img.shields.io/badge/contacts-Facebook-blue.svg)](https://www.facebook.com/vladik.averin)

##To deploy project and run application you must do following steps:  
 1. Download repository to your local machine  
 2. Create web-app project on MSVS or use other server-based framework to create server side  
 3. Extract downloaded files to 'app' folder in your [project-name] folder (for MSVS users)  
 4. [Install node.js](https://nodejs.org/en/) globally  
 5. In 'app' folder run command-prompt and install 'node-modules' use `$ npm install` command
 6. Run server (`Ctrl + F5` in MSVS)

##Using Gulp
For using [Gulp](http://gulpjs.com/) you ought to install these packages:  
  * [gulp-babel](https://www.npmjs.com/package/gulp-babel)  
  * [gulp-sass](https://www.npmjs.com/package/gulp-sass)  
  * [gulp-concat](https://www.npmjs.com/package/gulp-concat)  
  * [gulp-uglifyjs](https://www.npmjs.com/package/gulp-uglifyjs)  
  * [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)  
  * [gulp-uglifycss](https://www.npmjs.com/package/gulp-uglifycss)    

For installing [Gulp](http://gulpjs.com/) use command `$ npm install --save-dev gulp-install` in command prompt.  
For installing packages use command `$ npm install --save-dev [package-name]` in command prompt.   

##So now you can use gulp tasks 
Just print `$ gulp` to build whole project or `$ gulp [task-name]` to run particular task:
  * **babel** - for translate your code into earler standarts of EcmaScript
  * **scripts** - for minifying and concatination your js-code
  * **styles** - for minifying and concatination your css-styles
  * **sass** - for compile your .sass files to .css
  * **watch** - for upload any changes in your code



> You can contact me using following email address: 
exo-1996@tut.by
