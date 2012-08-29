
/**
 * Modules dependencies
 */

var csv = require('./../'),
	fs = require('fs');

// Parse csv product feed from Zuneta
var options = {
	delimiter : '\t'
}
fs.createReadStream('/home/lbdremy/Downloads/productBrands.csv')
.pipe(csv.createStream(options))
.on('data',function(data){

})
.on('column',function(key,value){
	console.log('#' + key + '=' + value);
})