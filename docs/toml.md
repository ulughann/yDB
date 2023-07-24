# Toml

yDB supports parsing and reading TOML files.

## `Toml.read()`
  
  ```js
  import { Toml } from "ydb";
  const data = Toml.read("test.toml");
  console.log(data);
  ```

## `Toml.parse()`

  ```js
  import { Toml } from "ydb";
  const data = Toml.parse(`
  [profile]
  name = "Onrir"
  age = 16
  `);
  console.log(data);
  ```

yDB does not support writing TOML files yet.  