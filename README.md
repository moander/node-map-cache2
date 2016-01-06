## Installation

    npm install --save map-cache2

## Usage

```js
const MapCache2 = require('map-cache2');

let map = new MapCache2(15000);

map.set('a', 'aa');

map.set('b', 'bb', 1000);

map.get('a');

map.get('a', 500);

map.clean();

map.clear();
```

