"use strict";
exports.__esModule = true;
var ips = require("@elcontrastador/ip-string");
var bin1 = ips.ipDecToBin('10.11.12.13');
console.log("".concat(bin1, ": ").concat(bin1.length, "b"));
var ip1 = ips.ipBinToDec(bin1);
console.log("".concat(ip1, ": ").concat(bin1));
