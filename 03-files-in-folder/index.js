const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (error, names) => {
    if (error) {
      console.log(error);
    } else {
      names.forEach((name) => {
        if (!name.isDirectory()) {
          fs.stat(
            path.join(__dirname, 'secret-folder', name.name),
            (err, stats) => {
              if (err) {
                console.log(err);
              } else {
                stdout.write(
                  `${name.name.split('.')[0]} - ${path
                    .extname(name.name)
                    .slice(1)} - ${stats.size}\n`,
                );
              }
            },
          );
        }
      });
    }
  },
);
