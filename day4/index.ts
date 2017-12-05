import * as fs from 'fs';
import * as path from 'path';
import * as parse from 'csv-parse';

const rows = [];
const init = async () => {
  fs
    .createReadStream(
    path.resolve(__dirname, './input.csv'))
    .pipe(parse({ auto_parse: true, delimiter: '\t' }))
    .on('data', row => {
      rows.push(row);
    })
    .on('end', () => {
      part1();
      part2();
    });
}

const part1 = () => {
  let sum = 0;
  rows.forEach(([row]) => {
    const passWords = row.split(' ');
    let valid = true;
    while (passWords.length > 0) {
      const comp = passWords.pop();
      const found = passWords.find(item => comp === item);
      if (found) {
        valid = false;
        break;
      }
    }
    if (valid) {
      sum++;
    }
  });
  console.log(sum);
}

const part2 = () => {
  let sum = 0;
  rows.forEach(([row]) => {
    const passWords = row.split(' ');
    let valid = true;
    while (passWords.length > 0) {
      const compstring = passWords.pop();
      const comp = compstring.split('').sort().join();
      const found = passWords.find(item => comp === item.split('').sort().join());
      if (found) {
        valid = false;
        break;
      }
    }
    if (valid) {
      sum++;
    }
  });
  console.log(sum);
}
init();