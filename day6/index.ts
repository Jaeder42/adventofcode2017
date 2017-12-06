const initial = [
  0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11
];
// const initial = [
//   0, 2, 7, 0
// ]

const first = () => {
  const states = [];
  let sum = 0;
  while (true) {
    let i = initial.indexOf(Math.max(...initial));
    let dist = initial[i];
    initial[i] = 0;
    sum += 1;
    while (dist > 0) {
      i += 1;
      if (i >= initial.length) {
        i = 0;
      }
      initial[i] += 1;
      dist--;
    }
    const state = initial.slice().toString();
    if (states.find(item => state === item)) {
      console.log('State ', state);
      break;
    }
    states.push(state);
  }
  console.log(sum);
};

const second = () => {
  const states = [];
  let sum = 0;
  let found = false;
  let foundState = '';
  while (true) {
    let i = initial.indexOf(Math.max(...initial));
    let dist = initial[i];
    initial[i] = 0;

    while (dist > 0) {
      i += 1;
      if (i >= initial.length) {
        i = 0;
      }
      initial[i] += 1;
      dist--;
    }
    const state = initial.slice().toString();
    if (!found) {
      if (states.find(item => state === item)) {
        found = true;
        foundState = state;
      }
    } else {
      sum += 1;
      if (state === foundState) {
        break;
      }
    }
    states.push(state);
  }
  console.log(sum);
};

first();
second();
