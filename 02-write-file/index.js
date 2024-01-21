const fs = require('fs');
const path = require('path');
const { stdout, stdin, stderr } = require('process');

const writeIn = fs.createWriteStream(path.join(__dirname, 'writeIn.txt'));
stdout.write('Welcome! \n');
stdout.write('Write your note, please \n');
stdin.on('data', (data) => {
  const arrData = data.toString().trim();
  arrData === 'exit' ? process.exit() : writeIn.write(data);
});

process.on('exit', (code) => {
  code === 0 ? stdout.write('\n Data has been recorded') : stderr.write(code);
});
process.on('SIGINT', () => process.exit());
