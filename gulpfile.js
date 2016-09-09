var installer  = require('gulp-install');
var rseq = require('run-sequence');
var git = require('gulp-git');
var async = require('async');
var gulp = require('gulp');
var fs = require('fs');

//CONFIG
var SOURCES_DIR = './src',
    SERVER_DIR = `${SOURCES_DIR}/server`;


gulp.task('server:update', (callback) => {
    async.series([
        _ => git.exec({args: `submodule deinit -f ${SERVER_DIR}`}, _),
        _ => git.updateSubmodule({ args: '--init --recursive' }, _)
    ], callback);
});

gulp.task('server:clear', (callback) => {
    async.parallel([
        _ => async.concat(['README.md', '.eslintrc.js', 'CONTRIBUTING.md', '.gitignore'].map(x => `${SERVER_DIR}/${x}`), fs.unlink, _)
    ], callback);
});

gulp.task('server:install', (callback) => {
    gulp.src([`${SERVER_DIR}/package.json`])
        .pipe(installer());
});

gulp.task('install', _ => rseq('server:update', ['server:clear', 'server:install'], _));