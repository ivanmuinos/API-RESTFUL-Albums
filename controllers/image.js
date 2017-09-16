'use strict'

//saco la ruta en donde se van a guardar las imagenes
var path = require('path');
var Image = require('../models/image');
var Album = require('../models/image');


function pruebas(req, res){
	res.status(200).send({message: 'Pruebas del controlador de imagenes'});


}

function getImage(req, res){
	var imageId = req.params.id;

	Image.findById(imageId, (err, image) =>{
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!image){
				res.status(404).send({message: 'No existe la imagen'});
			}else{
				Album.populate(image, {path: 'album'}, (err, image) => {
					if(err){
						res.status(500).send({message: 'Error en la peticion'});
					}else{
						res.status(200).send({image});
					}

				});
	
			}
		}

	});
}

function saveImage(req, res){
	var image = new Image();

	var params = req.body;
	image.title = params.title;
	image.picture = null;
	image.album = params.album;

	image.save((err, imageStored) => {
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!imageStored){
				res.status(404).send({message: 'No se ha guardado la imagen'});
			}else{
				res.status(200).send({image: imageStored});
			}
		}
	});
}


//funcion para obtener todas las imagenes de un album
function getImages(req, res){
	//recibo el id del album
	var albumId = req.params.album;

	if(!albumId){
		//sacar todas las imagenes de bbdd
		var find = Image.find({}).sort('title');
	}else{
		//sacar todas las imagenes asociadas al album
		var find = Image.find({album: albumId}).sort('title');
	}
	find.exec((err, images) => {
			if(err){
				res.status(500).send({message: 'Error en la peticion'});	
			}else{
				if(!images){
					res.status(404).send({message: 'No hay imagenes en este album'});		
				}else{

					Album.populate(images, {path: 'album'}, (err, images) => {
						if(err){
							res.status(500).send({message: 'Error en la peticion'});
						}else{
							res.status(200).send({images});
						}
					});
				}
			}	
	});
}

function updateImage(req, res){
	var imageId = req.params.id;
	var update = req.body;


	Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!imageUpdated){
				res.status(404).send({message: 'No se ha actualizado la imagen'});
			}else{
				res.status(200).send({image: imageUpdated});
			}
		}
	});
}

function deleteImage(req, res){
	var imageId = req.params.id;

	Image.findByIdAndRemove(imageId, (err, imageRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar al borrar'});
		}else{
			if(!imageRemoved){
				res.status(404).send({message: 'No se ha podido eliminar la imagen'});
			}else{
				res.status(200).send({image: imageRemoved});	
			}
		}
	});
}

function uploadImage(req, res){
	var imageId = req.params.id;
	var file_name = 'No subido...';

	//accedo a los fcheros q nos llegan por post. req.files.
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[1];

		Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdated) => {
			if(err){
				res.status(500).send({message: 'Error en la peticion'});
			}else{
				if(!imageUpdated){
					res.status(404).send({message: 'No se encontro el elemento'});
				}else{
					res.status(200).send({image: imageUpdated});
				}
			}
		});

	}else{
		res.status(200).send({message: 'No  has subido ninguna imagen'});
	}
}

//cargo el modulo file system
var fs = require('fs');
function getImageFile(req, res){
	var imageFile = req.params.imageFile;

	fs.exist('./uploads'+imageFile, (exist) => {
		if(exist){
			res.sendFile(path.resolve('./uploads/'+imageFile));
		}else{
			
		}
		
	});

	

}


module.exports = {
	pruebas,
	getImage,
	saveImage,
	getImages,
	updateImage,
	deleteImage,
	uploadImage,
	getImageFile
}