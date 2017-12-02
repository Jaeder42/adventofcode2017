import * as fs from 'fs';
import * as path from 'path';

const p = fs.readFileSync(path.resolve(__dirname, './input.txt'));

const part1 = () => {
  const array = p.toString().split('');
  let sum = 0;
  for (var i = 0; i < array.length; i++) {
    let last = i - 1;
    if (last < 0) {
      last = array.length - 1;
    }
    if (array[i] === array[last]) {
      sum += +array[i];
    }
  }
  console.log(sum);
}

const part2 = () => {
  const array = p.toString().split('');
  let sum = 0;
  const step = array.length / 2;
  for (var i = 0; i < array.length; i++) {
    let next = i + step;
    if (next > array.length - 1) {
      next = next - array.length
    }
    if (array[i] === array[next]) {
      sum += +array[i];
    }
  }
  console.log(sum);
}

part1();
part2();