const fs = require("fs");

const contents = fs.readFileSync("a.txt", "utf-8");
const contents2 = fs.readFileSync("b.txt", "utf-8");

console.log(contents);
console.log(contents2);