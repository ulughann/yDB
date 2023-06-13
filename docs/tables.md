# Table Methods

## `new Table()`
```js
import { Database, Table } from  "ydb";
const db = new Database("test.yaml");

// Create new Table 
const table_1 = new Table("profile", db);
```

## `table.set()`
```js
table_1.set("name", "Onrir");
table_1.set("programming_languages", ["JS","TS","C++"]);
```

If the file is a YML file and the format is Object, then the tables will look like this
```yml
profile:
  age: 16
  skills:
    programming_languages:
    - JS
    - TS
    - C++
```