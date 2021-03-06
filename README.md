# compare-lib

"compare-lib" is a Javascript library for comparing (by containing data) any two variable (without any order or sorting).

## Installation

```bash
npm i compare-lib
```

## Usage

```javascript
const compare = require("compare-lib");

/* For any type, returns "true" if equal,
                         "false" if not equal */
compare.any(item1, item2);

/* For function, returns "true" if equal,
                         "false" if not equal,
                         "undefined" if not function */
compare.fnc(function1, function2);

/* For object, returns "true" if equal,
                       "false" if not equal,
                       "undefined" if not object */
compare.obj(object1, object2);

/* For array, returns "true" if equal,
                      "false" if not equal,
                      "undefined" if not array */
compare.arr(array1, array2);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
