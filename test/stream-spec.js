/**
 * Modules dependencies
 */

var spec = require('stream-spec'),
	tester = require('stream-tester'),
	csv = require('./../');

var options = {
	delimiter : ','
};
var stream = csv.createStream(options);

spec(stream)
	.through({ strict : true , error : false })
	.validateOnExit();

var first = false;

tester.createRandomStream(function(){
	if(first){
		first = false;
		return new Buffer('id,title,description\r\n');
	}
	var id = Math.random();
	return new Buffer(  id + ',title' + id + ',description' + id + '\r\n' );
},1000)
	.pipe(stream)
	.pipe(tester.createPauseStream());
/*
require('fs').createReadStream('/home/lbdremy/Downloads/productBrands.csv')
	.pipe(stream)
	.pipe(tester.createPauseStream());
*/