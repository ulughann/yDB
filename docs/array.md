# Array Methods

## `push()`
Pushes an element or elements to the end of an array stored in the database.

**Parameters:**
- `key` (string): The key or name of the array in the database.
- `value` (any): The element or elements to be added to the array.

**Example:**
```javascript
db.push("skills", ["html", "javascript"]);
```

## `unshift()`
Adds an element or elements to the **beginning** of an array stored in the database.

**Parameters:**
- `key` (string): The key or name of the array in the database.
- `value` (any): The element or elements to be added to the array.

**Example:**
```javascript
db.unshift("skills", "typescript");
```

## `shift()`
Removes the first element from the beginning of an array stored in the database.

**Parameters:**
- `key` (string): The key or name of the array in the database.

**Example:**
```javascript
db.shift("skills");
```

## `pop()`
Removes the last element from the end of an array stored in the database.

**Parameters:**
- `key` (string): The key or name of the array in the database.

**Example:**
```javascript
db.pop("skills");
```

## `pull()`
Removes specific elements from an array stored in the database.

**Parameters:**
- `key` (string): The key or name of the array in the database.
- `value` (any): The element or elements to be removed from the array.

**Example:**
```javascript
db.pull("skills", "javascript");
```

Note: Replace `"skills"` with the actual key or name of the array you want to manipulate in the database. The examples provided assume the existence of a database object named `db`.