# Caching with Actions

## Caching with Actions

The `Action` class allows you to perform actions on a `Database` instance. Here's an example of how to create and use an `Action` instance:

### Importing the Classes
First, you need to import the necessary classes from the "ydb" library:

```javascript
import { Database, Action } from "ydb";
```

### Creating a `Database` Instance
Next, create a `Database` instance by specifying the filename of the database file:

```javascript
const db = new Database("cache.json");
```

The `new Database("cache.json")` statement creates a new `Database` object with the database file named "cache.json". Make sure the file exists in the specified location.

### Creating an `Action` Instance
Once you have the `Database` instance, you can create an `Action` instance associated with it:

```javascript
const action = new Action(db);
```

The `new Action(db)` statement creates a new `Action` object and associates it with the `db` instance of the `Database` class. This allows you to perform actions on the database through the `action` object.

Overall your code might look something like this:

```javascript
import { Database, Action } from  "ydb";
const db = new Database("cache.json") 
const action = new Action(db);
```

Now you can use the `action` object to perform various actions on the associated database instance.

Note: The code assumes that the "ydb" library is correctly installed and imported into your project.

## General Overview
You can use every method you have on a database in an action.
The code below sets "name" to "mohamed"
```javascript
action.set("name", "mohamed"); 
```
The code below gets "name" from the database
```javascript
db.get("name"); 
```
Lets check out what this returns
```bash
> undefined
```
It returns undefined like this because we didn't save the database yet.
To save it to the cache you can use the `action.save();` method.

# Methods

## `action.save()`
This method saves the cache to the database file.

```javascript
action.save();
```

## `action.undo()`
This method returns the Action to the state it was in when initialized.

```javascript
action.undo();
```