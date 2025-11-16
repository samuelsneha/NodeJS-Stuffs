const express = require('express');
const router = express.Router();
// const Joi = require('joi'); 
const mongoose = require('mongoose');
const { GenreSchema, validate } = require('../models/genres');

const generes = [
    { id:1, name: 'movie A', genere: 'Action'},
    { id:2, name: 'movie B', genere: 'Action'},
    { id:3, name: 'movie C', genere: 'Romcom'},
    { id:4, name: 'movie D', genere: 'Romcom'},
    { id:5, name: 'movie E', genere: 'Thriller'},
];

// const genreSchema = new mongoose.model('Genre', new mongoose.Schema({
//     name:{
//         type:String,
//         required: true,
//         minlength:5,
//         maxlength:50
//     }
// }));

router.get('/', async (req,res)=> {
    // res.status(200).send(generes)
    const generes = await GenreSchema.find().sort('name');
    res.send(generes);
});

router.get('/:id', async (req,res)=>{
    const genere = await GenreSchema.findById(req.params.id)
    // const genere = generes.find( genere => genere.id === parseInt(req.params.id) );
    if( genere){
        return res.status(200).send(genere)
    } else{
        return res.status(404).send('Movie not found')
    }
});

router.post('/', async (req,res)=> {
    const {value, error} = validate(req.body);
    if(value){
        // generes.push({ id: req.body.id, genere:req.body.genere, name:req.body.name});
        // return res.status(200).send(generes);
        let genre = new GenreSchema({name:req.body.name, genere:req.body.genere});
        genre = await genre.save();
        return res.status(200).send(genre);
    } else{
        return res.status(400).send(error);
    }
});

// function inputValidation(body){
//     const schema = Joi.object({
//         name: Joi.string().min(3).required(),
//         genere: Joi.string().min(3).required(),
//         id: Joi.number().required()
//     });
//     const validationResult = schema.validate(body);
//     return validationResult;
// };

router.put('/:id', async (req,res)=> {
  const {value, error} = validate(req.body);

    const genere = await GenreSchema.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    //a) search if the id exists
    // const genere = generes.find( genere => genere.id === parseInt(req.params.id) );
    if(!genere){
        return res.status(404).send('Genre not found')
    }
    //b) verify the schema of the req body and update
    // const {value, error} = inputValidation(req.body);
    if(value){
        // genere.id = req.body.id;
        // genere.name = req.body.name;
        // genere.genere = req.body.genere;
        return res.status(200).send(genere);
    } else{
        return res.status(400).send(error);
    }
});

router.delete('/:id', async (req,res) => {

    const genere = await GenreSchema.findByIdAndRemove(req.params.id)
    //a) search if the id exists
    // const genereId = generes.findIndex( genere => genere.id === parseInt(req.params.id) );
    // if(genereId < 0){
        // return res.status(404).send('Movie not found')
    // }
    //b) 
    // const genereNew = generes.splice( genereId, 1);
    // return res.status(200).send(genereNew);
    if( !genere )    return res.status(404).send('Genre not found') 
        return res.status(200).send(genere);
});

module.exports = router;