import * as ips from '@elcontrastador/ip-string';

const bin1 = ips.ipDecToBin('10.11.12.13');
console.log(`${bin1}: ${bin1.length}b`);

const ip1 = ips.ipBinToDec(bin1);
console.log(`${ip1}: ${bin1}`);
