# ydb
A lightweight, easy to use, and fast database system for prototyping in Javascript / Typescript.

![ydb](static/banner.png)

## Features
- **Beginner Friendly**: ydb is easy to use with simple keywords that avoid boilerplate.
- **Easy to use**: Ever declared a variable or an object? Then you already know how to use ydb.
- **Versatile**: ydb can be used for a variety of purposes and allows for both **yaml** and **json** files.
- **Secure by default**: ydb allows for encryption with a password.
- **Blazingly fast**: ydb is built with speed in mind and is as fast as Node.js allows.

## Installation
```bash
npm install ydb
```

## Usage
Commonjs:
```js
const { Database } = require('ydb');
const db = new Database('database.json');
```
Modulejs:
```js
import { Database } from 'ydb';
const db = new Database('database.json');
```


