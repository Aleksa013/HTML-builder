const fs = require('fs');
fs.readFile('./01-read-file/text.txt', 'utf-8', (error, data) => {
  error ? console.log(error.message) : null;
  console.log(data);
});
