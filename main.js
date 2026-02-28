import { HashMap } from "./hash-map.js";
import { HashSet } from "./hash-set.js";

//RUN YOU TEST HERE

const test = new HashSet();

test.set("mario");
test.set("rosalina");
test.set("luigi");
test.set("peach");
test.set("daisy");
test.set("link");
test.set("zelda");
test.set("mipha");
test.set("sidon");
test.set("saria");
test.set("impa");
test.set("groose");

// test.set("beedle");

console.log(test.getBuckets());
console.log(test.length());
console.log(test.keys());
console.log(test.capacity);
