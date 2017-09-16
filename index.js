//Cargar mongoose, conexcion a la base de datos, poner a funcionar la db
//nos permite utilizar nuevas funcionaldes de java script
'use strict'

//cargo mongoose
var mongoose = require('mongoose');
var app = require('./app');

//indico el puerto q tiene el sv
var port = process.env.PORT || 3700;

//conexion a mongodb "app_albums es el nombre de la base de datos a conectar"
mongoose.connect('mongodb://localhost:27017/app_albums', (err, res) => {
	//miro si hay algun tipo de error cuando intenta conectar
	if(err){
		throw err;
	}else{
		console.log("Base de datos funcionando correctamente...");

		app.listen(port, function(){
			console.log(`API RESTful de albums funcionando en http://localhost:${port}`);
		});
		
	}
});