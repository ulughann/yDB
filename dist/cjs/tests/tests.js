"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const db = new index_1.Database("./tests/myDb.yaml");
db.on("ready", () => console.log("Database Ready!"));
db.on("elementAdd", (El, value) => console.log(`New "${El.ID}" element Value: ${value}`));
db.on("elementEdit", (El, newValue, oldValue) => {
    console.log(`"${El.ID}" element Value: ${oldValue} -> ${newValue}`);
});
console.log("hello world"); // hi
