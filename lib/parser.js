/**
 * Modules dependencies
 */

var EventEmitter = require('events').EventEmitter,
	util = require('util');

module.exports = Parser;

function Parser(options){
	EventEmitter.call(this);
	this.delimiter = options ? options.delimiter || ',' : ',';
	this.endLine = options ? options.endLine || '\n' : '\n';
	this._defaultColumns =  options ? !!options.columns : false;
	this.columns = options ? options.columns || [] : [];
	this._currentColumn = 0;
	this._index = 0;
	this._line = {};
	this._text = '';
}


// Inherits from EventEmitter
util.inherits(Parser,EventEmitter);

Parser.prototype.end = function(s){
	if(s) this.parse(s);
	this.emit('end');
}

Parser.prototype.parse = function(s){
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
					this.emit('data',this._line);
				}
				this._index++;
				this._currentColumn = 0;
				this._line = {};
				this._text = '';
			break;
			default :
				this._text = this._text + c;
		}
	}
}


