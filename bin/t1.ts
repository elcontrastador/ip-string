// import { ipDecToBin } from '../src/ip';
import { ipDecToBin } from 'ip-string';

const t1a = ipDecToBin('10.11.12.13');
console.log(`${t1a}: ${t1a.length}b`);
