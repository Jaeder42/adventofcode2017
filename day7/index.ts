import * as fs from 'fs';
import * as path from 'path';
let difference = 0;

const init = async () => {
  const d = fs.readFileSync(path.resolve(__dirname, './input.txt'));
  const arr = d.toString().split('\n');
  return arr;
}

const part1 = async () => {
  const arr = await init();
  const bases = [];
  const boosted = [];
  let baseNode = '';
  arr.forEach((item) => {
    if (item.indexOf('->') > -1) {
      const split = item.split('->');
      bases.push(split[0].split(' ')[0]);
      boosted.push(split[1]);
    }
  });
  bases.forEach(base => {
    const found = boosted.find(item => item.indexOf(base) > -1);
    if (!found) {
      console.log(base);
      baseNode = base;
    }
  });
  return baseNode;
};

const finnEttFel = (values) => {
  let fel = null;
  values.map((item, index) => {
    let prev = index - 1;
    let next = index + 1;
    if (prev < 0) {
      prev = values.length - 1
    }
    if (next >= values.length) {
      next = 0;
    }
    if (item !== values[prev] && item !== values[next]) {
      fel = index;
    }
  });
  return fel;
}

const find = (name, nodes) => {
  const node = nodes.find(item => item.name === name);
  if (node.children) {
    const children = [];
    node.children.map(item => {
      const child = nodes.find(n => n.name === item);
      children.push(child);
    });
    const sums = [];
    children.map(child => {
      sums.push(child.weight + calculateChildWeights(child.name, nodes));
    });
    const diff = finnEttFel(sums);
    if (diff) {

      difference = sums[diff] - sums[diff - 1];
      console.log(children[diff].weight - difference);
      return find(children[diff].name, nodes);
    }

  }
}

const calculateChildWeights = (name, nodes) => {
  const node = nodes.find(item => item.name === name);
  if (node.children) {
    const children = [];
    node.children.map(item => {
      const child = nodes.find(n => n.name === item);
      children.push(child);
    });
    let sum = 0;
    children.map((child) => {
      sum += child.weight + calculateChildWeights(child.name, nodes)
    });
    return sum;
  } else {
    return 0;
  }
}

const part2 = async () => {
  const arr = await init();
  const baseNode = await part1();
  const nodes = [];
  arr.forEach((item) => {
    if (item.indexOf('->') > -1) {
      const split = item.split('-> ');
      const first = split[0].split(' (');
      const children = split[1].split(', ');
      const node = {
        name: first[0],
        weight: +first[1].split(')')[0],
        children
      }
      nodes.push(node);
    }
    else {
      const first = item.split(' (');
      const node = {
        name: first[0],
        weight: +first[1].split(')')[0],
        children: null,
      }
      nodes.push(node);
    }
  });
  find(baseNode, nodes);
}
part2();

