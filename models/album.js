'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
		title: String,
		description: String
	});


// Exporto indicando que voy a tener una entidad album y va a usar AlbumSchema
module.exports = mongoose.model('Album', AlbumSchema);