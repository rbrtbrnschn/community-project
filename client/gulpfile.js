var gulp = require("gulp"),
	sass = require("gulp-sass")

gulp.task("hello",function(){
	console.log("Hello World!");
})

// Compile All Sass (.scss not .sass - sorry,#2dumb4that) 
// Pipes To src/css
// Creates unwanted directories in src/css instead of just the files
gulp.task("sass",function(){
	return gulp.src("src/components/**/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("src/css"))
})

// Watches ["sass"]
gulp.task("watch-sass",function(){
	gulp.watch("src/components/**/*.+(scss|sass)",gulp.series(["sass"]));
})

gulp.task("watch",function(){
	gulp.watch("src/components/**/*.+(scss|sass)",gulp.series(["sass"]));
})


