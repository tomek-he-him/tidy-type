"use strict";

var del = require("del");
var gulp = require("gulp");
var less = require("gulp-less");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");
var zip = require("gulp-zip");


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


gulp.task("release", ["build"], function () {
  var manifest = require("./package.json");

  return gulp.src(manifest.files, {base: "."})
    .pipe(zip(manifest.name + "-v" + manifest.version + ".zip"))
    .pipe(gulp.dest("."))
    ;
  });
