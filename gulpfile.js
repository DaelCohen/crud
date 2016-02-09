/**
 *Load module dependencies
 */
 var gulp = require('gulp');
 var clean = require('gulp-clean');
 var concat = require('gulp-concat');
 var cssmin = require('gulp-cssmin');
 var jshint = require('gulp-jshint');
 var livereload = require('gulp-livereload');
 var uglify = require ('gulp-uglify');
 /**
  * Configuration Variables 
  */
  var bases = {
  	app: 'source/',
  	dist: 'public/'
  }
  var paths={
  	font: [
  		 'source/lib/boostrap/dist/font/**/*'
  	],
  	libs: [
  		'source/lib/jquery/dist/jquery.min.js',
        'source/lib/bootstrap/dist/js/bootstrap.min.js',
        'source/lib/angular/angular.min.js'
  	],
  	styles: [
  		'source/lib/bootstrap/dist/css/bootstrap.min.css'
  	] 

  };
/**
 * Task definition
 */
 //Define clean Task
 gulp.task('clean',function(){
 	gulp.src('/'+ bases.dist + '**/*',{cwd: __dirname})
 		.pipe(clean({force:true}));
 });
 //Define copy task
 gulp.task('copy',['clean'],function(){
 	//copy html
 	gulp.src(bases.app + 'index.html')
 		.pipe(gulp.dest(bases.dist))
 		.pipe(livereload());
 	//copy font
 	gulp.src(paths.font)
 		.pipe(gulp.dest((bases.dist + 'fonts')))
 });
 //Define  bundle task
 gulp.task('bundle', function(){
 	//bundle js files
 	gulp.src(paths.libs)
 		.pipe(concat('bundle.min.js'))
 		.pipe(gulp.dest(bases.dist + 'js'));
 	//bundle css files
 	gulp.src(paths.styles)
 		.pipe(concat('bundle.min.css'))
 		.pipe(gulp.dest(bases.dist + 'js'))
 })
 //Define concat task
 gulp.task('conat',function(){
 	//Concatenate all custom js files
 	gulp.src(bases.app + 'js/**/*.js')
 		.pipe(jshint())
 		.pipe(jshint.reporter('default'))
 		.pepe(concat('crud.min.js'))
 		.pipe(uglify())
 		.pepe(gulp.dest(base.dist + 'js'));
 	//Concatenate all custom css files
 	gulp.src(bases.app + 'css/**/*.css')
 	.pipe(concat('crud.min.css'))
 	.pepe(uglify())
 	.pepe(gul.dest(base.dist + 'css'));
 });
 gulp.task('concatDev', function () {
    // Concatenate all custom js files
    gulp.src(bases.app + 'js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('crud.min.js'))
        .pipe(gulp.dest(bases.dist + 'js'))
        .pipe(livereload());
    // Concatenate all custom css files
    gulp.src(bases.app + 'css/**/*.css')
        .pipe(concat('crud.min.css'))
        .pipe(gulp.dest(bases.dist + 'css'))
        .pipe(livereload());
});
 // Define watch task
 gulp.task('watch',function(){
 	livereload.listen();
 	gulp.watch(bases.app + '**/*',['clean','copy','bundle','concatDev']);
 });
/**
 * Registrer gulp task
 */
 // Define default task
 // Prepare our code for PRD enverionment
 gulp.task('default',['clean','copy','bundle','concatDev']);
// Define dev task
// gulp dev
gulp.task('dev',['clean','copy','bundle','concatDev','watch']);








