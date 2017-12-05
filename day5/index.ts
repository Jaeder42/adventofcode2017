import * as fs from 'fs';
import * as path from 'path';
import * as parse from 'csv-parse';

const rows1 = [];
const rows2 = []
const init = async () => {
  fs
    .createReadStream(
    path.resolve(__dirname, './input.csv'))
    .pipe(parse({ auto_parse: true }))
    .on('data', row => {
      rows1.push(row);
      rows2.push(row);
    })
    .on('end', () => {
      part1();
      part2();
    });
}

const part1 = () => {
  let sum = 0;
  let index = 0;
  while (index <= rows1.length) {
    try {
      const [ins] = rows1[index];
      rows1[index] = [ins + 1];
      sum++;
      index += ins;
    } catch (err) {
      break;
    }
  }
  console.log(sum);
}

const part2 = () => {
  let sum = 0;
  let index = 0;
  while (index <= rows2.length) {
    try {
      const [ins] = rows2[index];
      if (ins >= 3) {
        rows2[index] = [ins - 1];
      } else {
        rows2[index] = [ins + 1];
      }
      sum++;
      index += ins;
    } catch (err) {
      break;
    }
  }
  console.log(sum);
}

init();