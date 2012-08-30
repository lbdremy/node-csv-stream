/**
 * Modules dependencies
 */

var Stream = require('stream'),
	util = require('util'),
	Parser = require('./lib/parser');

exports.createStream = function(options){
	return new CSVStream(options || {});
}

function CSVStream(options){
	var self = this;
	Stream.call(this);
	this.writable = true;
	this.readable = true;
	// States
	this._paused = false;
	this._parser = new Parser(options);
	this._parser.on('data',function(data){
		self.emit('data',data);
	});
	this._parser.on('column',function(key,value){
		self.emit('column',key,value);
	});
	this._parser.on('end',function(){
		self.emit('end');
	});
	this._parser.on('error',function(err){
		self.emit('error',err);
	});
}

util.inherits(CSVStream,Stream);

CSVStream.prototype.write = function(buffer,encoding){
	if(this._paused) return false;
	return this._parser.write(buffer,encoding);
}

CSVStream.prototype.end = function(buffer,encoding){
	if(buffer) this._parser.end(buffer,encoding);
	this.emit('end');
}

CSVStream.prototype.destroy = function(){
	this._parser.destroy();
	this.emit('close');
}

CSVStream.prototype.pause = function(){
	this._paused = true;
	this._parser.pause();
}

CSVStream.prototype.resume = function(){
	this._paused = false;
	this._parser.resume();
	self.emit('drain');
}