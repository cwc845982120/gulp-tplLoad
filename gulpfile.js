'use strick'

var gulp = require('gulp');
var path = require('path');
var minimist = require('minimist');
var fs = require('fs');
var eslint = require('gulp-eslint');
var $ = require('gulp-load-plugins')();

var options = minimist(process.argv.slice(2), {});
console.dir(options);

/**
 * [template params]
 * @_author author
 * @_date the date of file created
 */
var _author = 'caowencheng <845982120@qq.com>';
var _date = (function() {
    var date = new Date();
    return '' + date.getDate() + '.' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' + date.getFullYear();
})();

function _generateModule1(basePath,srcPath){
	console.log(basePath + srcPath);
}

gulp.task('lint',function(){
	return gulp.src('./controllers/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
})

gulp.task('default',['lint'],function(){
	console.log("gulp is config!");
	_generateFor();
});

gulp.task('_generate1',function(){
	console.dir(options);
	_generateModule1('./controlers/',options.m);
});

gulp.task('_generate2',function(){
	console.dir(options);
	_generateModule2();
});

function _generateFor(){
    var _modules=[
            'controller1',
            'controller2',
            'controller3',
            'controller4'
        ]
    for(var i=0;i<_modules.length;i++){
        console.log(_modules[i]);
        _generateModule1('./controllers/',_modules[i]);
        gulp.src('./dev-template/controllerTpl.js')
	        .pipe($.template({
	            author: _author,
	            date: _date,
	            name: _modules[i],
	            moduleName: _modules[i],
	            //tplUrl: (path.join(basePath, _moduleName, _moduleName) + '.tpl.html').replace(/^src\//, '')
	        }))
	        .pipe($.rename(_modules[i] + '.js'))
	        .pipe(gulp.dest('./controllers'));
    }
}
