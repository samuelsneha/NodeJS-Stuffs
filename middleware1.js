const express = require('express');
const app = express();
const Joi = require('joi'); 
var helmet = require('helmet'); //this requires a function
const logger = require('./loggerMiddleware');
const morgan = require('morgan');

app.use(express.json()); //this is the json middleware function
app.use(express.urlencoded()); //this is the middleware function for urlencoded data format
app.use(express.static('public')); //this is the middleware function to render static files
app.use(morgan('combined')); //this middleware logs for every http request you send. But its not really recomended for all environments

// app.use( function(req,res,next){
//     console.log('logging middleware function...')
//     next(); //to pass control to the next middleware function in the req res pipeline
// });

app.use(logger); //custom middleware imported

function customMiddleware(req,res,next){
    console.log('using a custom middleware function...you can do whatever you want with this function');
    console.info('Also remember that if custom middleware does not have req,res, next parametes then it wont work. You had tried before without req,res,next parameters and it didnt work');
    next();
}

app.use(customMiddleware);

app.use( function(req,res,next){
    console.log('authenticating middleware function...')
    console.log('This comes after custom middleware function coz its written after custom middleware. If it would had been before custom middleware then this would had come before')
    next();
});

const generes = [
    { id:1, name: 'movie A', genere: 'Action'},
    { id:2, name: 'movie B', genere: 'Action'},
    { id:3, name: 'movie C', genere: 'Romcom'},
    { id:4, name: 'movie D', genere: 'Romcom'},
    { id:5, name: 'movie E', genere: 'Thriller'},
];

app.use(helmet()); //we use the helmet from requie which returns a function and then use it

app.get('/', (req,res)=> {
    console.log('entered get all');
    res.status(200).send(generes);
});

app.post('/', (req,res)=> {
    const {value, error} = inputValidation(req.body);
    if(value){
        generes.push({ id: req.body.id, genere:req.body.genere, name:req.body.name});
        return res.status(200).send(generes);
    } else{
        return res.status(400).send(error);
    }
});

function inputValidation(body){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        genere: Joi.string().min(3).required(),
        id: Joi.number().required()
    });
    const validationResult = schema.validate(body);
    return validationResult;
};

console.log(process.env.PORT);

const port = process.env.PORT === undefined ? 3000 : process.env.PORT;
app.listen(port, ()=> {console.log(`listening on port ${port}`)}); 



