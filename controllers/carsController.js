const express = require('express');
const Car = require('../models/car');

function create(req, res, next){
  const model = req.body.model;
  const description = req.body.description;
  const status = req.body.status;
  const color = req.body.color;

  let car = new Car();

  car.model = model;
  car.description = description;
  car.status = status;
  car.color = color;

  car.save((err, car) =>{
    if (err) {
      res.json({
        err: true,
        message: 'No se pudo guardar carro',
        objs: {}
      });
    }else{
      res.json({
        err: false,
        message:'Carro Guardado',
        objs:car
      });
    }
  });
}

function index(req, res, next){
  const page = req.params.page ? req.params.page : 1;
  Car.paginate({}, {
    page : page,
    limit : 3
  }, (err, cars) => {
    if(err){
      res.json({
        err : true,
        message : 'No se pudo obtener lista',
        obj : {}
      });
    }else{
      res.json({
        err: false,
        message:'Lista de carros',
        obj : cars
      })
    }
  });
}

function findById(req, res, next){
  const page = req.params.page ? req.params.page : 1;
  const id = req.params.id;
  Car.paginate({_id : id}, {
    page : page,
    limit : 3
  }, (err, cars) => {
    if(err){
      res.json({
        err : true,
        message : 'No se pudo obtener carro',
        obj : {}
      });
    }else{
      res.json({
        err: false,
        message:'Carro',
        obj : cars
      })
    }
  });
}

function update(id, req, res, next, car){
  const model = req.body.model;
  const description = req.body.description;
  const status = req.body.status;
  const color = req.body.color;

  Car.set({model : model});
  Car.set({description : description});
  Car.set({status : status});
  Car.set({color : color});

  Car.save((err, car) =>{
    if(err){
      res.json({
        error : true,
        messages : "Auto no editado",
        obj : {}
      });
    }else{
      res.json({
        error : false,
        messages : "Pelicula editada",
        obj : obj
      });
    }
  });
}

function remove(req, res, next){
  const id = req.params.id;
  if(id){
    Car.remove({_id:id}, (err) =>{
      if(err){
        res.json({
          error : true,
          messages : "Carro no eliminado",
          obj : {}
        });
      }else{
        res.json({
          error : false,
          messages : 'Auto eliminado',
          obj : {}
        });
      }
    });
  }else{
    res.json({
      err : true,
      message : "Auto no existe",
      obj : {}
    });
  }
}

module.exports = {
  create,
  index,
  findById,
  remove,
  update
};
