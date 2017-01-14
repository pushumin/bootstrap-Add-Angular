//基础gulp模块
var gulp = require("gulp");
//webserver服务器模块
var webserver = require("gulp-webserver");

//mock数据操作，需要引入url及fs.但是url/fs是内置的，所以不需要安装
var url = require('url');

var fs = require('fs'); //fs-->filesystem

//var sass = require("gulp-sass");
//
//var webpack = require('gulp-webpack');
//
//var named = require('vinyl-named');
//
//
//var uglify = require('gulp-uglify');


//var sequence = require('gulp-watch-sequence');
//
//var rev = require('gulp-rev');
//
//var revCollector = require('gulp-rev-collector');

var watch = require('gulp-watch');
/*
 * 1.创建src(src是开发目录，所有操作都在src中进行)目录
 * 2.在src下新建index.html（因为我们现在做的是spa项目，所以，通过只有一个入口文件）
 * 3.实现index.html的文件复制操作，复制目标是www
 * 4.webserver的本地服务器配置（不是gulp-connect）
 * 5.实现mock数据操作，先在根目录创建mock目录，然后在目录里放置对应的json文件
 */



gulp.task("copy-index",function(){
	return gulp.src("./src/**.html").pipe(gulp.dest("./www"));
});

//创建本地服务器
gulp.task('webserver',function(){
	gulp.src('./').pipe(webserver({
		livereload:true,			//更新
		directoryListing:true,		//目录
		open:true              		//直接打开浏览器
	})); //end gulp
});

gulp.task('htmlTemplateTask',function(){
	return gulp.src('./src/template/**')
	.pipe(gulp.dest('./www/template'))
});

gulp.task('cssTask',function(){
	return gulp.src('./src/css/**')
	.pipe(gulp.dest('./www/css'))
});

gulp.task('jsTask',function(){
	return gulp.src('./src/js/**')
	.pipe(gulp.dest('./www/js'))
});

gulp.task('watch',function(){
	gulp.watch('./src/**.html',['copy-index']);
	gulp.watch('./src/template/**.html',['htmlTemplateTask']);
	gulp.watch('./src/css/**',['cssTask']);
	gulp.watch('./src/js/**',['jsTask']);
})


gulp.task('default',['watch','webserver'])
//gulp.task('sass',function(){
//	return gulp.src('./src/index.html',['copy-index'])
//	.pipe(sass())
//	.pipe(gulp.dest('./www/css'));
//})



//gulp.task('watch',function(){
//	gulp.watch('./src/index.html',['copy-index'])
//});

//gulp.task('sass',function(){
//	return gulp.src('./src/style/healthFood.scss')
//	.pipe(sass())
//	.pipe(gulp.dest('./www/css'));
//})

//
//gulp.task('packjs',function(){
//	return gulp.src('./src/scripts/healthFood.js').pipe(named()).pipe(webpack()).pipe(uglify()).pipe(gulp.dest('./www/js'));
//});
//gulp.task('htmlTemplateTask',function(){
//	return gulp.src('./src/template/**')
//	.pipe(gulp.dest('./www/template'))
//});
//
//var cssDistFiles = ['./www/css/healthFood.css'];
//var jsDistFiles = ['./www/js/healthFood.js']
//
//gulp.task('verCss',function(){
//	return gulp.src(cssDistFiles)
//	.pipe(rev())
//	.pipe(gulp.dest('./www/css'))
//	.pipe(rev.manifest())
//	.pipe(gulp.dest('./www/ver/css'))
//})
//
//gulp.task('verJs',function(){
//	return gulp.src(jsDistFiles)
//	.pipe(rev())
//	.pipe(gulp.dest('./www/js'))
//	.pipe(rev.manifest())
//	.pipe(gulp.dest('./www/ver/js'))
//})
//
//gulp.task('html',function(){
//	gulp.src(['./www/ver/**/*.json','./www/*.html'])
//	.pipe(revCollector({
//		replaceReved:true
//	}))
//	.pipe(gulp.dest('./www'))
//})
//
//gulp.task('watch',function(){
//	gulp.watch('./src/healthFood.html',['copy-index']);
//	gulp.watch('./src/template/**',['htmlTemplateTask']);
//	var queue=sequence(300);
//	watch('./src/scripts/**/*.js',{
//		name:"JS",
//		eimtOnGlob:false
//	},queue.getHandler('packjs','verJs','html'));
//	
//	watch('./src/style/**',{
//		name:"CSS",
//		eimtOnGlob:false
//	},queue.getHandler('sass','verCss','html'));
//	watch('./src/template/**',{
//		name:"HTML",
//		eimtOnGlob:false
//	},queue.getHandler('htmlTemplateTask','html'));
//})



//gulp.task('default',['watch','webserver'])








