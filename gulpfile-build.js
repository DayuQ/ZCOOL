

const gulp = require('gulp');
const sass   = require('gulp-sass');
const webpack = require('webpack-stream');
// 全局的配置
const config = require('./config/build');

const { sass_config, webpack_config } = config;


// 输出静态文件
gulp.task('copy:static', () => {
    return gulp.src('./src/static/**/*.*')
            .pipe(gulp.dest('./dist/static'));
})

// 输出html页面
gulp.task('copy:html', () => {
    return gulp.src('./src/**/*.html')
            .pipe(gulp.dest('./dist/'));
})

// 处理scss
gulp.task('compile:scss', () => {
    console.log('handle scss')

    return gulp.src('./src/stylesheets/*.scss')
            .pipe(sass(sass_config).on('error', sass.logError))
            .pipe(gulp.dest('./dist/stylesheets'));

})

// 模块化打包js
gulp.task('compile:js', () => {
    return gulp.src('./src/javascripts/**/*.js')
        .pipe(webpack(webpack_config))
        .pipe(gulp.dest('./dist/javascripts'))
})




// 默认任务
gulp.task('default', ['copy:static', 'copy:html', 'compile:scss', 'compile:js'], () => {
    console.log('Everything is done ...')
})