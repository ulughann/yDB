# Events

## Event: ready
Emitted when the database becomes ready to start working.

### Example:
```javascript
db.on("ready", () => {
    console.log("Database Ready!");
});
```

## Event: debug
Emitted for general debugging information.

### Example:
```javascript
db.on("debug", (msg) => {
    console.log(msg);
});
```

## Event: elementAdd
Emitted when a new element is added to the database.

### Parameters:
- `el` (object): The data of the element being added.
- `value` (any): The value of the new element.

### Example:
```javascript
db.on("elementAdd", (el, value) => {
    console.log(`New "${elementInData.ID}" element Value: ${value}`);
});
```

## Event: elementEdit
Emitted when an existing element in the database is edited.

### Parameters:
- `el` (object): The data of the element being edited.
- `new_value` (any): The new value of the element.
- `old_value` (any): The old value of the element.

### Example:
```javascript
db.on("elementEdit", (el, new_value, old_value) => {
    console.log(`Edit "${el.ID}" element New Value: ${new_value} and Old value: ${old_value}`);
});
```

Note: Replace `db` with the actual name of your database instance in the code snippets.