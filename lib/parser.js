/**
 * Modules dependencies
 */

var EventEmitter = require('events').EventEmitter,
	util = require('util');

module.exports = Parser;

function Parser(options){
	EventEmitter.call(this);
	this.delimiter = options.delimiter || ',';
	this.endLine = options.endLine || '\n';
	this.columns = options.columns || [];
	this._defaultColumns = !!options.columns;
	this._currentColumn = 0;
	this._index = 0;
	this._line = {};
	this._text = '';
	this._paused = false;
}


// Inherits from EventEmitter
util.inherits(Parser,EventEmitter);

Parser.prototype.write = function(buffer,encoding){
	if(this._paused) return false;
	var s = buffer.toString(encoding);
	this._parse(s);
}

Parser.prototype.destroy = function(){
	this.emit('close');
}

Parser.prototype.end = function(buffer,encoding){
	if(buffer) this.write(buffer,encoding);
	this.emit('end');
}

Parser.prototype.pause = function(){
	this._paused = true;
}

Parser.prototype.resume = function(){
	this._paused = false;
}

Parser.prototype._parse = function(s){
	for(var i = 0; i < s.length; i++){
		var c = s[i];
		switch(c){
			case this.delimiter :
				if(this._index === 0 && !this._defaultColumns){
					this.columns[this._currentColumn] = this._text;
				}else{
					this.emit('column',this.columns[this._currentColumn],this._text);
					this._line[this.columns[this._currentColumn]] = this._text;
				}
				this._text = '';
				this._currentColumn++;
			break;
			case this.endLine : //CRLF
				if(this._text.charAt(this._text.length -1) === '\r') this._text = this._text.slice(0,this._text.length - 1);
				if(this._index === 0 && !this._defaultColumns){
					this.columns[this._currentColumn] = this._text;
				}else{
					this.emit('column',this.columns[this._currentColumn],this._text);
					this._line[this.columns[this._currentColumn]] = this._text;
				}
				this.emit('data',this._line);
				this._index++;
				this._currentColumn = 0;
				this._line = {};
			break;
			default :
				this._text = this._text + c;
		}
	}
}


