# Primitive Methods

## `db.set()`

The `db.set()` method is used to store data in a database.

### Syntax

```javascript
db.set(key, value);
```

### Parameters

- `key` (required): The key or identifier under which the data will be stored in the database. It can be a string or an object.
- `value` (required): The value to be stored in the database. It can be of any valid data type, such as a string, number, object, or array.

### Return Value

The `db.set()` method does not return a specific value.

### Examples

1. Storing settings in the database:

```javascript
db.set({ key: "settings", value: { theme: "dark", fontSize: 10 } });
```

2. Storing a username in the database:

```javascript
db.set("username", "Onrir");
```

3. Storing a user object in the database:

```javascript
db.set("user", { name: "username", password: "password" });
```

Note: In the examples above, `db` represents the instance of the database being used.

## `db.get()`

The `db.get()` method is used to retrieve data from a database.

### Syntax

```javascript
db.get(key);
```

### Parameters

- `key` (required): The key or identifier associated with the data to be retrieved from the database. It can be a string or an object.

### Return Value

The `db.get()` method returns the value associated with the provided key in the database.

### Example

Retrieving settings from the database:

```javascript
console.log(db.get("settings"));
```

Note: In the example above, `db` represents the instance of the database being used. The returned value from `db.get()` will be printed to the console.

Apologies for the confusion. Here is the combined documentation for the `db.getByValue()` and `db.get()` methods:

## `db.getByValue()`

The `db.getByValue()` or `db.get({query})` methods are used to retrieve elements from the database based on a specific value or query.

### Syntax

```javascript
db.getByValue(value);
db.get(query);
```

### Parameters

- `value` (for `db.getByValue()`): The value to search for in the database. It can be of any valid data type, such as a string, number, object, or array.

- `query` (for `db.get()`): An object specifying the query parameters to match against the elements in the database.

### Return Value

Both methods return an array of `ElementInData` objects that match the specified value or query.

### Examples

1. Retrieving elements from the database with a specific value:

```javascript
console.log(db.getByValue("Onrir"));
```

2. Retrieving elements from the database using a query:

```javascript
console.log(db.get({ value: "Onrir" }));
```

Note: In the examples above, `db` represents the instance of the database being used. The methods return an array of `ElementInData` objects that have the value "v6" in the database or match the provided query.

## `db.has()`

The `db.has()` method is used to check whether an item with a specified key exists in the database.

### Syntax

```javascript
db.has(key);
```

### Parameters

- `key` (required): The key or identifier of the item to check for existence in the database. It can be a string or an object.

### Return Value

The `db.has()` method returns a boolean value indicating whether the item with the specified key exists in the database (`true` if it exists, `false` otherwise).

### Example

Checking if an item exists in the database:

```javascript
console.log(db.has({ key: "settings" }));
```

or

```javascript
console.log(db.has("settings"));
```

Note: In the examples above, `db` represents the instance of the database being used. The `db.has()` method checks if an item with the key "settings" exists in the database, and the result is logged to the console as either `true` or `false`.

## `db.type()`

The `db.type()` method is used to get the value type of a given key element in the database.

### Syntax

```javascript
db.type(key);
```

### Parameters

- `key` (required): The key or identifier of the element in the database for which you want to determine the value type. It can be a string or an object.

### Return Value

The `db.type()` method returns a string representing the value type of the element. The possible value types include "symbol" | "array" | "undefined" | "string" | "number" | "bigint" | "boolean" | "object".

### Example

Getting the value type of a given key element in the database:

```javascript
console.log(db.type({ key: "settings" }));
```

or

```javascript
console.log(db.type("settings"));
```

Note: In the examples above, `db` represents the instance of the database being used. The `db.type()` method retrieves the value type of the element with the key "settings" in the database, and the result is logged to the console as a string representing the value type.

## `db.delete()`

The `db.delete()` method is used to remove an element from the database based on the specified key.

### Syntax

```javascript
db.delete(key)
```

### Parameters

- `key` (required): The key or identifier of the element to be deleted from the database. It can be a string or an object.

### Return Value

The `db.delete()` method does not have a specific return value.

### Example

Deleting an element from the database:
```javascript
db.delete({key: "settings"});
```
or
```javascript
db.delete("settings");
```

Note: In the examples above, `db` represents the instance of the database being used. The `db.delete()` method removes the element with the key "settings" from the database.

## `db.all()`

The `db.all()` method is used to retrieve all the elements stored in the database.

### Syntax

```javascript
db.all()
```

### Return Value

The `db.all()` method returns an array containing all the elements stored in the database.

### Example

Retrieving all elements from the database:
```javascript
console.log(db.all());
```

Note: In the example above, `db` represents the instance of the database being used. The `db.all()` method retrieves all the elements stored in the database and logs them to the console.

---

## `db.valuesAll()`

The `db.valuesAll()` method is used to retrieve all the values stored in the database.

### Syntax

```javascript
db.valuesAll()
```

### Return Value

The `db.valuesAll()` method returns an array containing all the values stored in the database.

### Example

Retrieving all values from the database:
```javascript
console.log(db.valuesAll());
```

Note: In the example above, `db` represents the instance of the database being used. The `db.valuesAll()` method retrieves all the values stored in the database and logs them to the console.

---

## `db.keysAll()`

The `db.keysAll()` method is used to retrieve all the keys stored in the database.

### Syntax

```javascript
db.keysAll()
```

### Return Value

The `db.keysAll()` method returns an array containing all the keys stored in the database.

### Example

Retrieving all keys from the database:
```javascript
console.log(db.keysAll());
```

Note: In the example above, `db` represents the instance of the database being used. The `db.keysAll()` method retrieves all the keys stored in the database and logs them to the console.

## `db.includes()`

The `db.includes()` method is used to fetch all elements from the database that contain a specific value.

### Syntax

```javascript
db.includes(value)
```

### Parameters

- `value` (required): The value to search for within the elements of the database.

### Return Value

The `db.includes()` method returns an array containing all the elements from the database that contain the specified value.

### Example

Fetching elements containing a specific value:
```javascript
console.log(db.includes("tti"));
```

Note: In the example above, `db` represents the instance of the database being used. The `db.includes()` method retrieves all elements from the database that contain the value "tti" and logs them to the console.

---

## `db.startsWith()`

The `db.startsWith()` method is used to fetch all elements from the database that start with a specific value.

### Syntax

```javascript
db.startsWith(value)
```

### Parameters

- `value` (required): The value that the elements in the database should start with.

### Return Value

The `db.startsWith()` method returns an array containing all the elements from the database that start with the specified value.

### Example

Fetching elements that start with a specific value:
```javascript
console.log(db.startsWith("setti"));
```

Note: In the example above, `db` represents the instance of the database being used. The `db.startsWith()` method retrieves all elements from the database that start with the value "setti" and logs them to the console.

---

## `db.endsWith()`

The `db.endsWith()` method is used to fetch all elements from the database that end with a specific value.

### Syntax

```javascript
db.endsWith(value)
```

### Parameters

- `value` (required): The value that the elements in the database should end with.

### Return Value

The `db.endsWith()` method returns an array containing all the elements from the database that end with the specified value.

### Example

Fetching elements that end with a specific value:
```javascript
console.log(db.endsWith("ings"));
```

Note: In the example above, `db` represents the instance of the database being used. The `db.endsWith()` method retrieves all elements from the database that end with the value "ings" and logs them to the console.
