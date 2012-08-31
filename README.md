# csv-stream - Simple CSV stream for node.js

[![](https://secure.travis-ci.org/lbdremy/node-csv-stream.png)](http://travis-ci.org/#!/lbdremy/node-csv-stream)

## Install

```sh
npm install csv-stream
```

## Usage

```js
var csv = require('csv-stream'),
var request = require('request');

var options = {
	delimiter : '\t', // default is ,
	endLine : '\n', // default is \n,
	columns : ['columnName1', 'columnName2'] // by default read the first line and use values found as columns 
}

var csvStream = csv.createStream(options);
request('http://mycsv.com/file.csv').pipe(csvStream)
	.on('error',function(err){
		console.error(err);
	})
	.on('data',function(data){
		// Output line by line
		console.log(data);
	})
	.on('column',function(key,value){
		// Output the column name associates with the value found
		console.log('#' + key ' = ' + value);
	})
```

## Test

```sh
npm test
```

## TODOs

* Support field enclosed in double quotes (or given character used to enclosed a field)
* Support escape character

## Contributions

Feel free to post issues and pull requests, more than welcome you are ;).

## Licence
(The MIT License) Copyright 2012 HipSnip Limited