# Math Methods

## `math()`
Performs a mathematical operation on a numeric value stored in the database.

**Parameters:**
- `config` (object):
  - `key` (string): The key or name of the value in the database.
  - `operator` (string): The mathematical operator to apply (`+`, `-`, `*`, `/`).
  - `value` (number): The value to be used in the mathematical operation.
  - `goToNegative` (boolean, optional): Specifies whether the value can go negative (default: `false`).

**Example:**
```javascript
db.math({
  key: "coins",
  operator: "+",
  value: 100,
  goToNegative: false
});
// or
db.math("coins", "+", "100", false);
```

## `subtract()`
Subtracts a value from the numeric value stored in the database.

**Parameters:**
- `config` (object):
  - `key` (string): The key or name of the value in the database.
  - `value` (number): The value to subtract from the stored value.

**Example:**
```javascript
db.subtract({
    key: "coins",
    value: 50
});
// or
db.subtract("coins", 50);
```

## `add()`
Adds a value to the numeric value stored in the database.

**Parameters:**
- `config` (object):
  - `key` (string): The key or name of the value in the database.
  - `value` (number): The value to add to the stored value.

**Example:**
```javascript
db.add({
  key: "coins",
  value: 50
});

// or
db.add("coins", 50);
```

## `multiply()`
Multiplies the numeric value stored in the database by a given value.

**Parameters:**
- `config` (object):
  - `key` (string): The key or name of the value in the database.
  - `value` (number): The value to multiply the stored value by.

**Example:**
```javascript
db.multiply({
  key: "coins",
  value: 2
});

// or
db.multiply("coins", 2);
```

## `double()`
Doubles the numeric value stored in the database.

**Parameters:**
- `config` (object):
  - `key` (string): The key or name of the value in the database.

**Example:**
```javascript
db.double({
  key: "coins"
});

// or
db.double("coins");
```

Note: Replace `"coins"` with the actual key or name of the value you want to perform the mathematical operation on in the database. The examples assume the existence of a database object named `db`.