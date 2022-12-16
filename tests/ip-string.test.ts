import { describe, expect, test } from '@jest/globals';
import { ipDecToBin, ipBinToDec, ipHasFourOctetsWithinMinMax, ipHasFourOctetsWithOnlyDigits } from '../src/index';

const testDataTrue: { ip: string, bin: string }[] = [
  { ip: '123.213.130.119', bin: '01111011110101011000001001110111' },
  { ip: '10.0.0.0', bin: '00001010000000000000000000000000' },
  { ip: '192.168.17.255', bin: '11000000101010000001000111111111' },
  { ip: '172.30.14.101', bin: '10101100000111100000111001100101' },
]

const testDataFalse: { ip: string, bin: string }[] = [
  { ip: '123.213.130.119', bin: '11111011110101011000001001110111' },
  { ip: '10.0.0.0', bin: '00000010000000000000000000000000' },
  { ip: '192.168.17.255', bin: '11000000101010000001000011111111' },
  { ip: '172.30.14.101', bin: '10101100000111100000111001100100' }
]

describe('IP decimal string validation', () => {

  test('has 4 grous of digits separated by dots', () => {
    expect(ipHasFourOctetsWithOnlyDigits('1.2.3.4')).toBe(true);
    expect(ipHasFourOctetsWithOnlyDigits('a.1.2.3.4')).toBe(false);
    expect(ipHasFourOctetsWithOnlyDigits('1.a.3.4')).toBe(false);
    expect(ipHasFourOctetsWithOnlyDigits('1')).toBe(false);
    expect(ipHasFourOctetsWithOnlyDigits('1.2.3')).toBe(false);
    expect(ipHasFourOctetsWithOnlyDigits('1.2.3.4.a')).toBe(false);
    expect(ipHasFourOctetsWithOnlyDigits('')).toBe(false);
  });

  test('has 4 octs between 0 and 255', () => {
    expect(ipHasFourOctetsWithinMinMax('1.2.3.4')).toBe(true);
    expect(ipHasFourOctetsWithinMinMax('0.0.0.0')).toBe(true);
    expect(ipHasFourOctetsWithinMinMax('255.255.255.255')).toBe(true);
    expect(ipHasFourOctetsWithinMinMax('1.2.3.256')).toBe(false);
  });

  test('converts decimal IP to 32b binary string rep', () => {
    testDataTrue.map(rec => {
      expect(ipDecToBin(rec.ip)).toBe(rec.bin);
    });
    testDataFalse.map(rec => {
      expect(ipDecToBin(rec.ip)).not.toBe(rec.bin);
    });

  });

  test('converts 32b binary string rep to decimal IP', () => {
    testDataTrue.map(rec => {
      expect(ipBinToDec(rec.bin)).toBe(rec.ip);
    });
    testDataFalse.map(rec => {
      expect(ipBinToDec(rec.bin)).not.toBe(rec.ip);
    });
  });
});

