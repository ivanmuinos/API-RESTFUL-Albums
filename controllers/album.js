'use strict'

//cargamos nuestro modelo de album

var Album =  require('../models/album');

function getAlbum(req, res){
	//agarro el id que me llega por parametro, por la peticion url.
	var albumId = req.params.id;

	//Hago una peticion a la base de datos
	Album.findById(albumId, (err, album) => {
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!album){
				res.status(404).send({message: 'El album no existe !!'});

			}else{
				res.status(200).send({album});
			}
		}
	});
}

function getAlbums(req, res){
	//agarro el id que me llega por parametro, por la peticion url.
	var albumId = req.params.id;

	//Hago una peticion a la base de datos
	Album.find({}, (err, albums) => {
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!albums){
				res.status(404).send({message: 'El album no existe !!'});

			}else{
				res.status(200).send({albums});
			}
		}
	});
}

function saveAlbum(req, res){
	var album = new Album();

	var params = req.body;
	//agarro los parametros q vienen por http
	album.title = params.title;
	album.description = params.description;

	album.save((err, albumStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el album'});
		}else{
			if(!albumStored){
				res.status(404).send({message: 'No hay albums'});
			}else{
				res.status(200).send({album: albumStored});
			}
		}
	});

}

function updateAlbum(req, res){
	//recibe por parametro la id
	var albumId = req.params.id;
 	//guardo los parametros que llegan por put
	var update = req.body;

	Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el album'});
		}else{
			if(!albumUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el album'});
			}else{
				res.status(200).send({album: albumUpdated});	
			}
		}
	});

}

function deleteAlbum(req, res){
	//recibe por parametro la id
	var albumId = req.params.id;
 	//guardo los parametros que llegan por put
	var update = req.body;

	Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar al borrar'});
		}else{
			if(!albumRemoved){
				res.status(404).send({message: 'No se ha podido eliminar el album'});
			}else{
				res.status(200).send({albumRemoved});	
			}
		}
	});

}

module.exports = {
	getAlbums,
	getAlbum,
	saveAlbum,
	updateAlbum,
	deleteAlbum
};