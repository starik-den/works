var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    autopref = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require ('gulp-imagemin'),
    pngquant = require ('imagemin-pngquant'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
watch = require ('gulp-watch');


var path = {
    build: { //Куда складывать готовые после сборки файлы
        html: 'production/',
        js: 'production/js/',
        css: 'production/css/',
        img: 'production/img/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/css/styles.scss',
        img: 'src/img/**/*.*'
    },
    watch: { //За изменением каких файлов наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.scss',
        img: 'src/img/**/*.*'
    }
};
gulp.task('html:prod', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task('style:prod', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(autopref()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});
gulp.task('js:prod', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});
gulp.task('image:prod', function () {
    gulp.src(path.src.img) //Выберем картинки
        .pipe(imagemin())
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     use: [pngquant()],
        //     interlaced: true
        // }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: "./production"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('build', [
    'html:prod',
    'js:prod',
    'style:prod'
    // 'fonts:prod',
    // 'image:prod'
]);
gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:prod');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:prod');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:prod');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:prod');
    });

});


gulp.task('default', ['build', 'browserSync', 'watch']);


/*------------------------------------------------------*/
