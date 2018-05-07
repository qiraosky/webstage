var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var fs = require('fs');
var _ = require('lodash');

//CSS处理
var rename = require('gulp-rename');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');   //css压缩
var autoprefixer = require('gulp-autoprefixer');

var scripts = require('./gulp.scripts.json');

var source = {
    js: {
        main: 'src/core/main.js',
        src: [
            // application config
            'src/core/app.config.js',

            // application bootstrap file
            'src/core/main.js',

            // module config
            'src/core/module.config.js',

            // module files
            //'src/app/**/module.js'
        ],
        tpl: 'app/**/*.tpl.html'
    }
};

gulp.task('less', function(){
    gulp.src('styles/theme/main.less')
        .pipe(less({ compress: true }))
        .on('error', function(e){console.log(e);} )
        .pipe(autoprefixer('last 6 version'))
        .pipe(minifyCss())
        .pipe(rename('global.min.css'))
        .pipe(gulp.dest('dist/styles/css/'));
});

gulp.task('concat-css', function() {
    gulp.src(['./styles/css/bootstrap.min.css', 
              './styles/css/font-awesome.min.css'])
        .pipe(concat('vendor.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/styles/css/'));
});

var destinations = {
    js: 'dist'
};

gulp.task('build', function(){
    return es.merge(gulp.src(source.js.src) , getTemplateStream())
         .pipe(ngAnnotate())
         .pipe(uglify())
        .pipe(concat('js/app.js'))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('js', function(){
    return es.merge(gulp.src(source.js.src) , getTemplateStream())
        .pipe(concat('js/app.js'))
        .pipe(gulp.dest(destinations.js));
});

gulp.task('watch', function(){
    gulp.watch(source.js.src, ['js']);
    gulp.watch(source.js.tpl, ['js']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 8888
    });
});

gulp.task('vendor', function(){
    _.forIn(scripts.chunks, function(chunkScripts, chunkName){
        var paths = [];
        chunkScripts.forEach(function(script){
            var scriptFileName = scripts.paths[script];

            if (!fs.existsSync(__dirname + '/' + scriptFileName)) {

                throw console.error('Required path doesn\'t exist: ' + __dirname + '/' + scriptFileName, script)
            }
            paths.push(scriptFileName);
        });
        gulp.src(paths)
            .pipe(concat('js/' + chunkName + '.js'))
            //.on('error', swallowError)
            .pipe(gulp.dest(destinations.js))
    })

});

gulp.task('prod', ['vendor', 'build', 'less','concat-css' ]);
gulp.task('dev', ['vendor', 'js', 'less', 'concat-css', 'watch', 'connect']);
gulp.task('default', ['dev']);

var swallowError = function(error){
    console.log(error.toString());
    this.emit('end')
};

var getTemplateStream = function () {
    return gulp.src(source.js.tpl)
        .pipe(templateCache({
            root: 'src/',
            module: 'app'
        }))
};