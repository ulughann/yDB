# Database Document Methods

## `destroy()`
Destroys the entire database, removing all stored data.

**Example:**
```javascript
db.destroy();
```

## `deleteAll()`
Deletes all data stored in the database.

**Example:**
```javascript
db.deleteAll();
```

## `clear()`
Clears all data stored in the database, but keeps the database structure intact.

**Example:**
```javascript
db.clear();
```

## `reload()`
Reloads the database, refreshing the data to its initial state.

**Example:**
```javascript
db.reload();
```

Note: These methods control the behavior and state of the database. Use them with caution, as they may result in the permanent loss or modification of data. Make sure to backup any important data before executing these methods.