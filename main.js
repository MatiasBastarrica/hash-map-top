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
console.log(test.length());
