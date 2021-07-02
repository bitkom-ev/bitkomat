const gulp = require('gulp');
const sass = require('gulp-sass');
//const scss = require("gulp-scss");
const glob = require("glob");
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const fs = require('fs');
const cleanCSS = require('gulp-clean-css');
//const kss = require('kss');

// use only for digitaltag skin:
gulp.task('sass', function () {

    return gulp.src(['./08/sass/*.sass'])
        .pipe(sass({
            includePaths: ['./sass/', './'],
            outputStyle: 'expanded' // compressed :nested :compact :expanded :compressed
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            grid: true
        }))
        .pipe(cleanCSS({level: 2, rebase: false}))
        .pipe(gulp.dest('./08/css/'));
});

gulp.task('watch', function () {
    gulp.watch(['./08/sass/']);
});
gulp.task('default', ['watch']);

const iconfont = require('gulp-iconfont');
const cheerio = require('gulp-cheerio');


