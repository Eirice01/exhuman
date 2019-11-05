
export function SymbolFor(name) {
  return typeof Symbol === 'function' && Symbol['for'] && Symbol['for'](name) || name;
}

export function RAM({ bits, time }) {
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

export function RAMR(...range) {
  const [a, b] = range;
  const min = Math.min(a);
  const max = Math.max(b);
  const dif = max - min;
  return parseInt(Math.random() * dif + min, 10);
}

export function phoneNumber() {
  // 1xx xxxx xxxx
  return `1${RAM({ bits: 1, time: 1 })}${RAM({ bits: 1, time: 1 })}${RAM({ bits: 1, time: 4 })}${RAM({ bits: 1, time: 4 })}`
}

export function IDNumber() {
  // 370100 198x 45678
  return `370100198${RAM({ bits: 1, time: 1 })}${Math}${RAM({ bits: 1, time: 4 })}`
}

// function RAM({ bits, time, range }) {
//   bits = isNaN(bits) ? 1 : bits;
//   time = isNaN(time) ? 1 : time;

//   let res = '';
//   while(time > 0) {
//     const t10 = Math.pow(10, bits);
//     const ram = Math.random();
//     const num = parseInt(ram * t10, 10);
//     res += (num < t10 ? `${'0'.repeat(bits - (num + '').length)}${num}` : num) + '';
//     time--;
//   }
//   return res;
// }

// function phoneNumber() {
//   // 1xx xxxx xxxx
//   return `1${RAM({ bits: 1, time: 1 })}${RAM({ bits: 1, time: 1 })}${RAM({ bits: 1, time: 4 })}${RAM({ bits: 1, time: 4 })}`
// }

// function IDNumber() {
//   // 370100 198x 45678
//   const month = parseInt(Math.random() * 11 + 1, 10);
//   const day   = parseInt(Math.random() * 25 + 1, 10);
//   const tens = value => value < 10 ? `0${value}` : value
//   return `370100198${RAM({ bits: 1, time: 1 })}${tens(month)}${tens(day)}${RAM({ bits: 1, time: 4 })}`
// }


// var list = [];
// for(let i =0; i< 11; i++) {
//   list.push(IDNumber());
// }
