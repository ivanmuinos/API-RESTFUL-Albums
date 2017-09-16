'use strict'
//Aca va a ir toda la configuracion de express


//cargo los modulos
var express = require('express');
var bodyParser = require('body-parser');

//llamo al modulo
var app = express();

//carga de rutas

//creo una variable para guardar las rutas q esten en el fichero
var album_routes = require('./routes/album');
var image_routes = require('./routes/image');

//uso body parser para parsear las peticiones q nos vienen por json -> javascript

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar las cabeceras
//recibe una request, respuesta y parametro next
app.use((req, res, next) =>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
	res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE');

	next();
});


//rutas base
//para que la ruta funcione
app.use('/api', album_routes);
app.use('/api', image_routes);


//exporto el modulo. Nos crea el objeto que podemos utilizar dentro de index.js

module.exports = app;
