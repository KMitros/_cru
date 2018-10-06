let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    glob = require('gulp-sass-glob');

gulp.task('browser-sync', function(){
        browserSync({
            server: {
                baseDir: 'app'
            },
            notify: false
        })
});    

gulp.task('styles',function(){
    return gulp.src('scss/**/*.scss')
    .pipe(glob())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix: '.min',prefix:''}))
    .pipe(autoprefixer({browsers : ['last 2 version']}))
    .pipe(cleancss({level: { 1: {specialComments: 0}}}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch',['styles','browser-sync'], function(){
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('app/*.html', browserSync.reload)

});

gulp.task('default',['watch']);

