const { src, dest, series, parallel,watch } = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");

const tsProject = ts.createProject("tsconfig.json");
const buildSrc = {
  copy: ["./src/**/*", "!./src/**/*.ts", "!./src/**/*.tsx"],
  ts: ["./src/**/*.ts", "./src/**/*.tsx"]
};

function clean() {
    return del(["dist/**/*"])
}
function copy() {
    return src(buildSrc.copy).pipe(dest("dist"));
}
function typescript() {
  return src(buildSrc.ts)
    .pipe(tsProject())
    .pipe(dest("dist"));
}
exports.default =  series(
    clean,
    parallel(
        copy,
        typescript
    )
);
exports.watch = function(){
    watch('./src/**/*', exports.default);
}
