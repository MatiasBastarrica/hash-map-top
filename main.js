import { HashMap } from "./hash-map.js";

const test = new HashMap();
test.set("mario", "bros");
test.set("Mario", "galaxy");
test.set("mario", "sunshine");

console.log(test.has("amrio"));
