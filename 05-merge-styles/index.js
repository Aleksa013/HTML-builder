const fs = require('fs');
const path = require('path');
// const { stdout } = require('process');

const writeStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);

function getData(file) {
  if (path.extname(file.name) === '.css') {
    fs.readFile(
      path.join(__dirname, 'styles', file.name),
      'utf-8',
      (err, style) => {
        if (err) {
          console.log(err);
        } else {
          writeStream.write(style);
        }
      },
    );
  }
}
fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (error, files) => {
    if (error) {
      console.log(error);
    } else {
      files.forEach((file) => {
        getData(file);
      });
    }
  },
);
