function RAM({ bits, time }) {
  bits = isNaN(bits) ? 1 : bits;
  time = isNaN(time) ? 1 : time;

  let res = '';
  while(time > 0) {
    const t10 = Math.pow(10, bits);
    const ram = Math.random();
    const num = parseInt(ram * t10, 10);
    res += (num < t10 ? `${'0'.repeat(bits - (num + '').length)}${num}` : num) + '';
    time--;
  }
  return res;
}

function RAMR(...range) {
  const [a, b] = range;
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  const dif = max - min;
  return parseInt(Math.random() * dif + min, 10);
}

const DEC = value => value < 10 ? `0${value}` : value

function PhoneNumber() {
  // 1xx xxxx xxxx
  return `1${RAM({ bits: 1, time: 1 })}${RAM({ bits: 1, time: 1 })}${RAM({ bits: 1, time: 4 })}${RAM({ bits: 1, time: 4 })}`
}

function IDNumber() {
  // 370100 19xx xx xx xxxx
  const year  = `19${RAMR(6, 9)}${RAMR(0, 9)}`;
  const month = DEC(RAMR(1, 12));
  const day   = DEC(RAMR(1, 28));

  return `370100${year}${month}${day}${RAM({ bits: 1, time: 4 })}`
}

function Popout(items) {
  const index = RAMR(0, items.length - 1);
  const name  = items[index];

  items.splice(index, 1);

  return name;
}

module.exports = {
  RAM, RAMR, Popout, PhoneNumber, IDNumber
};
