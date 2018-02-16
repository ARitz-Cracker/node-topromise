# node-topromise

A NodeJS library that works not-unlike util.promisify except it supports multiple callback arguments and also handles "this"

## USAGE:

`npm install arc-topromise`

```js
let tp = require("arc-topromise") // Because topromise was already taken :^)
let result = await tp.ToPromise(func,arg); // For callback functions with 0 or 1 "value" arguments
let result = await tp.ToPromise(thisArg,func,arg); // First argument can be a object, used to correct "this"

let results = await tp.ToPromiseArray(func,arg); // For callback functions with more than 1 "value" argument
func(arg,(err,arg1,arg2,arg3) => {
	results[0] == arg1; //true
	results[1] == arg2; //true
	results[2] == arg3; //true
});

```

## EXAMPLE:

```js
let mysql = require('mysql'); //Just using this as an example
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

await tp.ToPromise(connection,connection.connect);
let results = (await tp.ToPromiseArray(connection,connection.query,'SELECT 1 + 1 AS solution'))[0];
```
