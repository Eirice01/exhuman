// import XianJSON from '@map-data/xian.json'
import JinanJSON1 from '@map-data/jinan.json'
// import JinanJSON2 from '@map-data/jinan.old.json'

export async function getData() {
  return await Promise.resolve(JinanJSON1);
}

// import axios from 'axios';

// export async function getData() {
//   return await axios.get('/map/jinan').then(res => res.data);
// }
