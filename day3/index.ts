const input = 312051;
//const input = 23;

const part1 = () => {
  const size = Math.ceil(Math.sqrt(input));
  const maxSteps = size - 1;
  const mid = Math.floor(size / 2);
  const diff = (size * size) - input;
  const z = diff % mid;
  console.log(maxSteps - (mid - z));
}
part1();

const size = 11;
const middle = Math.floor(size / 2);
let dir = 0;
const outer = [];
// Dir 0 = right, 1 = up, 2 = left, 3 = down
const part2 = () => {
  for (var i = 0; i < size; i++) {
    const inner = new Array(size);
    inner.fill(0);
    outer.push(inner);
  }
  outer[middle][middle] = 1;
  step(dir, middle + 1, middle);
  console.log(outer);
}

const checkLeft = (dir, x, y) => {
  let dX = x;
  let dY = y;
  console.log('CheckLeft');
  switch (dir) {
    case 0:
      dY--;
      break;
    case 1:
      dX--;
      break;
    case 2:
      dY++;
      break;
    case 3:
      dX++;
      break;
  }
  console.log('Hello')
  if (outer[dY][dX] === 0) {
    return true;
  }
  if (!outer[dY][dX]) {
    throw new Error('Is over');
  }
  return false;
}

const setValue = (x, y) => {
  console.log(x, y);
  let sum = 0;
  if (outer[y - 1][x]) {
    sum += +outer[y - 1][x];
  }
  if (outer[y + 1][x]) {
    sum += +outer[y + 1][x];
  }
  if (outer[y][x - 1]) {
    sum += +outer[y][x - 1];
  }
  if (outer[y][x + 1]) {
    sum += +outer[y][x + 1];
  }
  if (outer[y - 1][x - 1]) {
    sum += +outer[y - 1][x - 1];
  }
  if (outer[y + 1][x - 1]) {
    sum += +outer[y + 1][x - 1];
  }
  if (outer[y - 1][x + 1]) {
    sum += +outer[y - 1][x + 1];
  }
  if (outer[y + 1][x + 1]) {
    sum += +outer[y + 1][x + 1];
  }
  console.log(sum);
  if (sum > input) {
    console.log(sum);
    throw new Error('Complete');
  }
  outer[y][x] = sum;
}

const step = (dir, x, y) => {
  try {
    setValue(x, y);
    if (dir > 3) {
      dir = 0;
    }
    if (checkLeft(dir, x, y)) {
      console.log('LEFT');
      switch (dir) {
        case 0:
          step(dir + 1, x, y - 1);
          break;
        case 1:
          step(dir + 1, x - 1, y);
          break;
        case 2:
          step(dir + 1, x, y + 1);
          break;
        case 3:
          step(dir + 1, x + 1, y);
          break;
      }
    }
    else {
      console.log('MARCHON');
      switch (dir) {
        case 0:
          step(dir, x + 1, y);
          break;
        case 1:
          step(dir, x, y - 1);
          break;
        case 2:
          step(dir, x - 1, y);
          break;
        case 3:
          step(dir, x, y + 1);
          break;
      }
    }
  }
  catch{
    return;
  }
}

part2();