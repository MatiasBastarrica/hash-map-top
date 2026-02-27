import { HashMap } from "./hash-map.js";

const test = new HashMap();
test.set("mario", "bros");

console.log(test.getBuckets());
