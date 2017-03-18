const gulp = require('gulp');
const git = require('gulp-git');
const gitrev = require('git-rev')
const argv = require('yargs').argv;

function increment(tag, i) {
  var temp = tag.split(".");
  temp[i] = parseInt(temp[i]) + 1;
  tag = temp.join(".");
  return tag;
}

gulp.task('version', function() {
  gitrev.tag(function (tag) {
    if (argv.i == "p") {
        var tag = increment(tag, 2);
        git.tag(tag, 'patch fix', function (err) {
          if (err) throw err;
        });
        console.log("You are now on version",tag);
    } else if (argv.i == "m"){
        var tag = increment(tag, 1);
        git.tag(tag, 'minor fix', function (err) {
          if (err) throw err;
        });
        console.log("You are now on version",tag);
    } else if (argv.i == "M"){
        var tag = increment(tag, 0);
        git.tag(tag, 'major fix', function (err) {
          if (err) throw err;
        });
        console.log("You are now on version",tag);
    } else {
      console.log("Sorry not a valid incrementation.");
    }
  });
  git.push('origin', ['master'], {args: " --tags"}, function (err) {
    if (err) throw err;
  });
});
