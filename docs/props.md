# Database Document Properties

## `db.raw`
Returns the raw data stored in the database.

**Example:**
```javascript
console.log(db.raw);
```

## `db.cache`
Returns the cache collection associated with the database.

**Example:**
```javascript
console.log(db.cache);
```

## `db.length`
Returns the number of items stored in the database.

**Example:**
```javascript
console.log(db.length);
```

## `db.uptime`
Returns the duration of the database connection's uptime.

**Example:**
```javascript
console.log(db.uptime);
```

## `db.fileSize`
Returns the size of the database file.

**Example:**
```javascript
console.log(db.fileSize);
```

Note: The code snippets assume the existence of a `db` object representing the database. The actual implementation and behavior of these properties may vary depending on the specific database library or framework being used.