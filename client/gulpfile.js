var gulp = require("gulp"),
	sass = require("gulp-sass")

gulp.task("hello",function(){
	console.log("Hello World!");
})

gulp.task("sass",function(){
	return gulp.src("src/components/**/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("src/css"))
})
