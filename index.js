const startupDebugger = require('debug')('app:startup');//returns function (we are calling the function and giving an argument to it.
//the second bracket is the namespace which is called using the env variable DEBUG before running the application
const dbDebugger = require('debug')('app:db');
const config = require('config');//returns function
const Joi = require('joi');//returns class
const express = require('express');//returns function 
const app = express();
const logger = require('./logger');
const morgan = require('morgan');//returns function
const courses = require('./routes/courses');





app.use(express.json());
app.use(express.urlencoded({extended: true})); 
//key=value&key=value

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);//gives the environment we are currently working on
app.use(express.static('public'));//shows static content such as images in folder named public.
app.use(logger);//another function logger created in logger.js
app.use('/api/courses', courses);




if(app.get('env') === 'development'){
	app.use(morgan('tiny'));//morgan logs requests made to http.
 	startupDebugger('Morgan enabled');
}

dbDebugger('debugger for database is running'); 
console.log(`app: ${app.get('env')}`);//we get the environment in which we are working.


//Configuration
 //takes the name from the config folder based on the current environment settings
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));//environment variable





app.get('/', (req, res) => {
	res.send('hello, world!!!!');
});


const port = process.env.PORT||3000;
app.listen(port, () => console.log('listening on port '+port+'...'));