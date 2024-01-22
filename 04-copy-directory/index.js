const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) {
    stdout.write(err);
  } else {
    files.forEach((file) => {
      fs.access(path.join(__dirname, 'files-copy'), (error) => {
        if (error) {
          if (error.code === 'ENOENT') {
            getCopyDir(file);
          } else {
            console.log(error);
          }
        } else {
          getCopyDir(file);
          fs.readdir(path.join(__dirname, 'files-copy'), (err, copyFiles) => {
            err ? console.log(err) : null;
            if (copyFiles.length > files.length) {
              copyFiles.forEach((copyfile) => {
                if (!files.includes(copyfile)) {
                  fs.unlink(
                    path.join(__dirname, 'files-copy', copyfile),
                    (err) => {
                      err ? err : null;
                    },
                  );
                }
              });
            }
          });
        }
      });
    });
  }
});
function getCopyDir(file) {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    err ? console.log(err) : null;
    fs.copyFile(
      path.join(__dirname, 'files', file),
      path.join(__dirname, 'files-copy', file),
      (error) => {
        if (error) {
          console.log(error);
        }
      },
    );
  });
}
