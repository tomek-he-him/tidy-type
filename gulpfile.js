"use strict";

var del = require("del");
var gulp = require("gulp");
var less = require("gulp-less");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");


gulp.task("build"
  , ["build:clean"]
  , function () {
    return gulp.src("source/*.less")
      .pipe(less())
      .pipe(gulp.dest("dist"))

      .pipe(minifyCSS({roundingPrecision: 3}))
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest("dist"))
      ;
    }
  );

gulp.task("build:clean", function (done) {
  del("dist", done);
  });
