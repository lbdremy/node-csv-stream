/**
 * Modules dependencies
 */

var csv = require('./../'),
	request = require('request');

// Parse csv product feed from Zuneta
var options = {
        endLine : ['\n', '\r']
}
request('http://www.zuneta.com/feeds/productBrands.txt')
	.pipe(csv.createStream(options))
	.on('data',function(data){
		console.log(data);
	})
	.on('column',function(key,value){
		//console.log('#' + key + '=' + value);
	})