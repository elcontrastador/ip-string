"use strict";
exports.__esModule = true;
// import { ipDecToBin } from '../src/ip';
var ip_string_manip_1 = require("ip-string-manip");
var t1a = (0, ip_string_manip_1.ipDecToBin)('10.11.12.13');
console.log("".concat(t1a, ": ").concat(t1a.length, "b"));
