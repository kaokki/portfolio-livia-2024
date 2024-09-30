const { src, dest, watch, series} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const rename = require('gulp-rename');

function buildStyle(){
    return src('./src/sass/main.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(dest('./src/dist'));
}

function buildJS(){
    return src('./src/js/main.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./src/dist'));
}

function watchTask(){
    watch(['./src/sass/*.scss'], buildStyle)
    watch(['./src/js/*.js'], buildJS)
}

exports.default = series(buildStyle, buildJS, watchTask);