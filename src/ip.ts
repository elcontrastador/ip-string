//in: 'xxx.xxx.xxx.xxx', out: '1010101010101010100110101' (32b as str)
export const ipDecToBin = (ip: string): string => {
  const ipA = ip.split('.').map(oct => BigInt(oct));
  const bin = (ipA[0] << 24n | ipA[1] << 16n | ipA[2] << 8n | ipA[3]);
  return bin.toString(2).padStart(32, '0');
};

const testData: { ip: string, bin: string }[] = [
  { ip: '123.213.130.119', bin: '01111011110101011000001001110111' },
  { ip: '10.0.0.1', bin: '00001010000000000000000000000001' },
  { ip: '192.168.17.255', bin: '11000000101010000001000111111111' },
  { ip: '172.30.14.101', bin: '10101100000111100000111001100101' }
]

testData.map(rec => {
  console.assert(ipDecToBin(rec.ip) == rec.bin, `${rec.ip} !== '${rec.bin}'`);
});

