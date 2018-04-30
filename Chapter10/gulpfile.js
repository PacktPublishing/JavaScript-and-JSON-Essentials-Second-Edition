const gulp = require('gulp');
const mochaPlugin = require('gulp-mocha');
const runSequence = require('run-sequence');
var exec = require('child_process').exec;
let processInstance =undefined;

const gulpTasksConfig = require('./gulpconfig.json');
gulp.task('default',['dependent-task'], ()=>{
	console.log("Greetings to Readers!");
})

gulp.task('dependent-task', ()=>{
	console.log("Greetings to all!");
})

//Start our hapi app
gulp.task('start-app', (cb)=>{
	//Update the package.json for start script
	processInstance = exec(`npm start`);
	cb();
})

//Test the API of the hapi app
gulp.task(gulpTasksConfig.routes.name,()=>{
	return gulp.src(gulpTasksConfig.routes.src).pipe(mochaPlugin({ reporter: 'spec' }))
});

//Stop the hapi app
gulp.task('stop-app', (cb)=>{
	processInstance.kill(0);
	cb();
	process.exit(0);
})

gulp.task(gulpTasksConfig.apiflow.name, function(){
	return runSequence(...gulpTasksConfig.apiflow.sequence);
});