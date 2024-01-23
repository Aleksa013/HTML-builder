const fs = require('fs');
const path = require('path');

const template = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf-8',
);

let correctCode = '';
template.on('data', (data) => {
  correctCode = data;
});

fs.readdir(path.join(__dirname, 'components'), (error, files) => {
  error ? console.log(error) : null;
  files.forEach((file) => {
    fs.readFile(
      path.join(__dirname, 'components', file),
      'utf-8',
      (error, code) => {
        if (error) {
          console.log(error);
        } else {
          const tag = file.split('.')[0];
          correctCode = correctCode.replace(`{{${tag}}}`, code);
          fs.mkdir(path.join(__dirname, 'project-dist'), () => {
            const writeStream = fs.createWriteStream(
              path.join(__dirname, 'project-dist', 'index.html'),
            );
            const styleStream = fs.createWriteStream(
              path.join(__dirname, 'project-dist', 'style.css'),
            );
            writeStream.write(correctCode);
            function getData(file) {
              if (path.extname(file.name) === '.css') {
                fs.readFile(
                  path.join(__dirname, 'styles', file.name),
                  'utf-8',
                  (err, style) => {
                    if (err) {
                      console.log(err);
                    } else {
                      styleStream.write(style);
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
          });
        }
      },
    );
  });
});

fs.readdir(path.join(__dirname, 'assets'), 'utf-8', (err, parts) => {
  if (err) {
    console.log(err);
  } else {
    parts.forEach((part) => {
      fs.stat(path.join(__dirname, 'assets', part), (error, stats) => {
        if (error) {
          console.log(error);
        } else {
          if (stats.isFile()) {
            getCopyDir(part);
          } else {
            ifIsDirectory(part);
          }
        }
      });
    });
  }
});

function ifIsDirectory(folder) {
  fs.readdir(path.join(__dirname, 'assets', folder), (error, files) => {
    if (error) {
      console.log(error);
    } else {
      files.forEach((file) => getCopyDir(folder, file));
    }
  });
}

function getCopyDir(folder, file) {
  fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets', folder),
    { recursive: true },
    (err) => {
      err ? console.log(err) : null;
      fs.copyFile(
        path.join(__dirname, 'assets', folder, file),
        path.join(__dirname, 'project-dist', 'assets', folder, file),
        (error) => {
          if (error) {
            console.log(error);
          }
        },
      );
    },
  );
}
