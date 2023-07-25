# ydb
Lightweight JSON/YAML database for Node.js

![ydb](static/banner.png)

## Installation
```bash
npm install ydb
```

## Usage
```javascript
import { Database } from 'ydb';
const db = new Database('path/to/db.json');

db.set('foo', 'bar');
db.get('foo'); // bar
```

Check out the [Documentations](https://onrirr.github.io/yDB/) for more info