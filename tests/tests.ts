import { Database } from "../index";
const db = new Database("./tests/myDb.yaml");

db.on("ready", () => console.log("Database Ready!"));

db.on("elementAdd", (El, value) =>
  console.log(`New "${El.ID}" element Value: ${value}`)
);

db.on("elementEdit", (El, newValue, oldValue) => {
  console.log(`"${El.ID}" element Value: ${oldValue} -> ${newValue}`);
});

console.log("hello world"); // hi