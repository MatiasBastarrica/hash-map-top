import { HashMap } from "./hash-map.js";

const test = new HashMap();
test.set("mario", "bros");
test.set("Mario", "galaxy");
test.set("mario", "sunshine");
test.set("mArio", "oddysey");
// console.log(test.getBuckets(4).toString());
// console.log(test.remove("mARio"));
test.set("zelda", "skyward sword");
console.log(test.getBuckets());
// test.remove("mario");
console.log(test.keys());
// test.clear();
// console.log(test.getBuckets());
console.log(test.values());
console.log(test.length());

// console.log(test.getBuckets());
