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
  rows.forEach(row => {
    row.sort((a, b) => {
      return a - b;
    });
    sum += row[row.length - 1] - row[0];
  });
  console.log(sum);
}

const part2 = () => {
  let sum = 0;
  rows.forEach(row => {
    row.sort((a, b) => {
      return b - a;
    });
    while (row.length > 0) {
      const comp = row.pop();
      const result = row.find(item => item % comp === 0);
      if (result) {
        sum += result / comp;
        break;
      }
    }

  });
  console.log(sum);

}
init();
