const { parallel, src, watch } = require("gulp");
const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const markdownPdf = require("gulp-markdown-pdf");

function styles() {
  return src("src/styles/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(rename("main.css"))
    .pipe(gulp.dest("assets/styles"));
}

function scripts() {
  return src("src/scripts/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("assets/scripts"));
}

function images() {
  return src(["src/images/*.png", "src/images/*.jpg", "src/images/*.svg"])
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest("assets/images"));
}

// Task: Fonts

function fonts() {
  return src("node_modules/font-awesome/fonts/**/*", { base: "" }).pipe(
    gulp.dest("assets/fonts")
  );
}

// Task: PDF

function pdf() {
  return src("./*.md")
    .pipe(markdownPdf())
    .pipe(gulp.dest("assets/pdf"));
}

watch("src/styles/*.scss", styles);
watch("src/scripts/*.js", scripts);
watch(["src/images/*.png", "src/images/*.jpg", "src/images/*.svg"], images);
watch("/*.md", pdf);

gulp.task("default", gulp.parallel(styles, scripts, images, fonts, pdf));
