var ip = require("ip-string");
var t1a = (0, ip.ipDecToBin)('10.11.12.13');
console.log("".concat(t1a, ": ").concat(t1a.length, "b"));
