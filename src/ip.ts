//in: 'xxx.xxx.xxx.xxx', out: '1010101010101010100110101' (32bits as str)
export function ipDecToBin (ip: string): string {
    const ipA = ip.split('.').map(oct => BigInt(oct));
    const bin = (ipA[0] << 24n | ipA[1] << 16n | ipA[2] << 8n | ipA[3]);
    return bin.toString(2);
};


