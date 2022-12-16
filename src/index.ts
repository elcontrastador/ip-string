const ipHasFourOctetsWithOnlyDigits = (ip: string): boolean => {
  try {
    return ip?.match(/^(\d{1,3}[.]){3}\d{1,3}$/) ? true : false;
  } catch (e) {
    return false;
  }
}

const ipHasFourOctetsWithinMinMax = (ip: string): boolean => {
  try {
    const octs = ip.split('.')
      .map(oct => parseInt(oct))
      .filter(oct => oct >= 0 && oct <= 255);

    if (octs.length !== 4) {
      throw "Invalid octet(s)";
    }
    return true;

  } catch (e) {
    return false;
  }
}

export const ipIsValid = (ip: string): boolean => {
  return ipHasFourOctetsWithOnlyDigits(ip) &&
    ipHasFourOctetsWithinMinMax(ip) ? true : false;
}


//in: 'xxx.xxx.xxx.xxx', out: '1010101010101010100110101' (32b as str)
export const ipDecToBin = (ip: string): string | never => {
  try {
    if (!ipIsValid(ip)) {
      throw "nope";
    }

    const ipA = ip.split('.').map(oct => BigInt(oct));
    const bin = (ipA[0] << 24n | ipA[1] << 16n | ipA[2] << 8n | ipA[3]);
    return bin.toString(2).padStart(32, '0');

  } catch (e) {
    throw `Invalid decimal IP addres: ${ip}`;
  }
};

const ipBinStringIsValid = (binIp: string): boolean => {
  try {
    if (!binIp.match(/^[01]{32}$/)) {
      throw "nope";
    }
    return true;
  } catch (e) {
    return false;
  }
}

//TODO
export const ipBinToDec = (binIp: string): string => {
  const throwMsg = `Invalid 32-bit binary IP string representation: ${binIp}`;
  if (!binIp.match(/^[01]{32}$/)) { throw throwMsg; }
  const octs = binIp.match(/[01]{8}/g);
  if (octs?.length === 4) {
    return octs.map(oct => parseInt(oct, 2).toString()).join('.');
  } else {
    throw throwMsg;
  }
}

const testData: { ip: string, bin: string }[] = [
  { ip: '123.213.130.119', bin: '01111011110101011000001001110111' },
  { ip: '10.0.0.0', bin: '00001010000000000000000000000000' },
  { ip: '192.168.17.255', bin: '11000000101010000001000111111111' },
  { ip: '172.30.14.101', bin: '10101100000111100000111001100101' }
]

testData.map(rec => {
  console.assert(ipHasFourOctetsWithOnlyDigits('10.1.2.') == false, '10.1.2.');
  console.assert(ipHasFourOctetsWithOnlyDigits('10.1.2.3') == true, '10.1.2.3');
  console.assert(ipHasFourOctetsWithOnlyDigits('10.1.2.3.5') == false, '10.1.2.3.5');
  console.assert(ipHasFourOctetsWithOnlyDigits('10.1.2.300') == true, '10.1.2.300');
  console.assert(ipHasFourOctetsWithinMinMax('10.1.2.300') == false, '10.1.2.300');
  console.assert(ipHasFourOctetsWithinMinMax('10.1.2.') == false, '10.1.2.300');
  // console.assert(ipHasFourOctetsWithinMinMax('10.1.2.254.d') == false, '10.1.2.254.d');
  console.assert(ipHasFourOctetsWithinMinMax('a.10.1.2.254') == false, 'a.10.1.2.254');
  // console.log(validIpDecNotation(rec.ip));
  // console.log(validIpDecNotation('1.2.3.256'))
  console.assert(ipDecToBin(rec.ip) === rec.bin, `${rec.ip} !== '${rec.bin}'`);
  // console.log(ipDecToBin('10.1.2a.3')) //throw error
  // console.log(ipDecToBin('10.1.2.256')) //throw error
  // console.log(ipDecToBin('10.1.2')) //throw error
  // console.log(ipDecToBin('10.1.2.255.1')) //throw error
  // console.log(ipDecToBin('1')) //throw error
  // console.log(ipDecToBin('300.10.2.3')); //throw error
  console.assert(ipBinToDec(rec.bin) === rec.ip, `${rec.bin} !== '${rec.ip}'`);
  // console.log(`${ipBinToDec(rec.bin)}: ${ipDecToBin(rec.ip)}`);
  // console.assert(ipBinToDec(rec.bin + '1')); //throw error
  // console.assert(ipBinToDec(rec.bin.slice(0, 31))); //throw error
});

exports.ipDecToBin = ipDecToBin;

