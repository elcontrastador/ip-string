export const ipHasFourOctetsWithOnlyDigits = (ip: string): boolean => {
  try {
    return ip?.match(/^(\d{1,3}[.]){3}\d{1,3}$/) ? true : false;
  } catch (e) {
    return false;
  }
}

export const ipHasFourOctetsWithinMinMax = (ip: string): boolean => {
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
    if (!ipIsValid(ip)) { throw "nope"; }

    const ipA = ip.split('.').map(oct => BigInt(oct));
    const bin = (ipA[0] << 24n | ipA[1] << 16n | ipA[2] << 8n | ipA[3]);
    return bin.toString(2).padStart(32, '0');

  } catch (e) {
    throw `Invalid decimal IP addres: ${ip}`;
  }
};

export const ipBinStringIsValid = (binIp: string): boolean => {
  try {
    if (!binIp.match(/^[01]{32}$/)) { throw "nope"; }
    return true;
  } catch (e) {
    return false;
  }
}

export const ipBinToDec = (binIp: string): string => {
  try {
    if (!ipBinStringIsValid(binIp)) { throw "invalid" }
    const octs = binIp.match(/[01]{8}/g);
    if (octs?.length === 4) {
      return octs.map(oct => parseInt(oct, 2).toString()).join('.');
    } else {
      throw "invalid"
    }
  } catch (e) {
    throw `Invalid 32-bit binary IP string representation: ${binIp}`;
  }
}

