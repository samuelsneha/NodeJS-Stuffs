const express = require('express');
const router = express.Router();
const Joi = require('joi'); 

const courses = [
    { id:1, name: 'asd'},
    { id:2, name: 'wer'},
    { id:3, name: 'pou'},
    { id:4, name: 'mnb'},
    { id:5, name: 'zxc'},
];

router.get('/', (req,res)=> {
    res.status(200).send(courses)
});

router.get('/:id', (req,res)=>{
    const course = courses.find( course => course.id === parseInt(req.params.id) );
    if( course){
        return res.status(200).send(course)
    } else{
        return res.status(404).send('Course not found')
    }
});

router.post('/', (req,res)=> {
    const {value, error} = inputValidation(req.body);
    if(value){
        courses.push({ id: req.body.id, name:req.body.name});
        return res.status(200).send(courses);
    } else{
        return res.status(400).send(error);
    }
});

function inputValidation(body){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        id: Joi.number().required()
    });
    const validationResult = schema.validate(body);
    return validationResult;
};

router.put('/:id', (req,res)=> {
    //a) search if the id exists
    const course = courses.find( course => course.id === parseInt(req.params.id) );
    if(!course){
        return res.status(404).send('Course not found')
    }
    //b) verify the schema of the req body and update
    const {value, error} = inputValidation(req.body);
    if(value){
        course.id = req.body.id;
        course.name = req.body.name;
        return res.status(200).send(course);
    } else{
        return res.status(400).send(error);
    }
});

router.delete('/:id', (req,res) => {
    //a) search if the id exists
    const courseId = courses.findIndex( course => course.id === parseInt(req.params.id) );
    if(courseId < 0){
        return res.status(404).send('Course not found')
    }
    //b) 
    const courseNew = courses.splice( courseId, 1);
    return res.status(200).send(courseNew);

});

module.exports = router;