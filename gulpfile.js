

const gulp = require('gulp');
const server = require('gulp-webserver');
const sass   = require('gulp-sass');
const webpack = require('webpack-stream');
const watch = require('gulp-watch');
const del = require('del');
// 全局的配置
const config = require('./config');

// server_config 服务配置
const { server_config, sass_config, webpack_config } = config;

// 开启热更新服务器
gulp.task('server', () => {
    return gulp.src('./dist')
            .pipe(server(server_config))
})

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
    /** 报错：可能电脑先监听后改动，有时候电脑反应不过来，会颠倒顺序，保存2下即可解决，
     * 另一种解决方式是如下：包一个setTimeout,500毫秒，但是可能因为某些原因超过500毫
     * 秒甚至更多，也会报错。自己选择
     * Error in plugin "sass"
[1] Message:
[1]     src\stylesheets\app.scss
[1] Error: File to import not found or unreadable: ./modules/job.
[1]         on line 2 of src/stylesheets/app.scss
[1] >> @import './modules/job';
[1]    ^
     *  */
    return gulp.src('./src/stylesheets/*.scss')
            .pipe(sass(sass_config).on('error', sass.logError))
            .pipe(gulp.dest('./dist/stylesheets'));

    // setTimeout(function(){
    //     gulp.src('./src/stylesheets/*.scss')
    //             .pipe(sass(sass_config).on('error', sass.logError))
    //             .pipe(gulp.dest('./dist/stylesheets'));
    // },500)
})

// 模块化打包js
gulp.task('compile:js', () => {
    return gulp.src('./src/javascripts/**/*.js')
        .pipe(webpack(webpack_config))
        .pipe(gulp.dest('./dist/javascripts'))
})

// 监听任务

gulp.task('watch', () => {
    gulp.watch('./src/**/*.html', ['copy:html']);
    gulp.watch('./src/javascripts/**/*', ['compile:js']);
    gulp.watch('./src/stylesheets/**/*.scss', ['compile:scss']);
    gulp.watch('./src/static', ['copy:static']);

    watch('src/static', (v) => { // 当src/static中文件变化后执行
        if ( v.event === 'unlink' ) { // 如果文件删除了
            let _path = v.history[0].replace('\src', '\dist'); // 要删除的路径
            del(_path);// 删除dist中的文件
        }else {
            gulp.start(['copy:static'])
        }
    })
})


// 默认任务
gulp.task('default', ['copy:static', 'copy:html', 'compile:scss', 'compile:js', 'server', 'watch'], () => {
    console.log('Everything is done ...')
})