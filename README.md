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

// All of these arguments are optional.
var options = {
	delimiter : '\t', // default is ,
	endLine : '\n', // default is \n,
	columns : ['columnName1', 'columnName2'], // by default read the first line and use values found as columns
	columnOffset : 2, // default is 0
	escapeChar : '"', // default is an empty string
	enclosedChar : '"' // default is an empty string
}

var csvStream = csv.createStream(options);
request('http://mycsv.com/file.csv').pipe(csvStream)
	.on('error',function(err){
		console.error(err);
	})
	.on('header', function(columns) {
		console.log(columns);
	})
	.on('data',function(data){
		// outputs an object containing a set of key/value pair representing a line found in the csv file.
		console.log(data);
	})
	.on('column',function(key,value){
		// outputs the column name associated with the value found
		console.log('#' + key + ' = ' + value);
	})
```

## Test

```sh
npm test
```

## Contributions

Feel free to post issues and pull requests, more than welcome you are ;).

## Licence
(The MIT License) Copyright 2012 HipSnip Limited
