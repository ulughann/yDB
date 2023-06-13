# Initialization

## Default

### JSON Database

```js
import { Database } from 'ydb';

const json_db = new Database("database.json");
```

The code snippet above initializes a new `Database` named `json_db` and specifies the database file as "database.json". This suggests that the database is stored in JSON format. You can replace "database.json" with the actual file path and name of your JSON database file.

### YAML Database

```js
import { Database } from 'ydb';

const yaml_db = new Database("database.yaml");
```

The code snippet above initializes a new `Database` named `yaml_db` and specifies the database file as "database.yaml". This suggests that the database is stored in YAML format. You can replace "database.yaml" with the actual file path and name of your YAML database file.










## Options

Creates a new instance of a database from files outside the work project.

```javascript
const db_outside_project = new Database(path, options);
```

### Parameters

- `path` (String): The path to the database file.
- `options` (Object): An optional object containing the following options:

    - `cPath` (Boolean): If set to `true`, enables the "pathOutsideTheProject" option, allowing you to specify any path from your computer in the "path" parameter. Default: `false`.
    
    - `style` (Enum: `Database.Style`): Specifies the style of the database. It can be set to either `Database.Style.Array` or `Database.Style.Object`. Default: `Database.Style.Object`.
    
    - `encryption` (Object): Allows you to encrypt data with a password. It should contain a `password` property with the desired password. Default: `null`.
    
### Example

```javascript
// Create a new database instance from a file outside the project
const db_outside_project = new Database("C:/Users/pc/Desktop/database.yml", {
    cPath: true,
    style: Database.Style.Array,
    encryption: { password: "ea6d4h4j" }
});
```

In the example above, a new instance of the `Database` class is created using the `Database` constructor. The database file is located at `"C:/Users/pc/Desktop/database.yml"`. The options object is provided with the following values:
- `cPath` is set to `true`, allowing the use of any path from the computer.
- `style` is set to `Database.Style.Array`, indicating that the database will be stored in an array format.
- `encryption` is set with a password of `"ea6d4h4j"`, enabling data encryption.

Note: The actual usage of the `Database` class and its methods may vary depending on the specific implementation.
