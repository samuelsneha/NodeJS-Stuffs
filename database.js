const { required } = require('joi');
const mongoose = require('mongoose');

mongoose. connect('mongodb://localhost/playground') //mongodb://localhost is the connection string that references to the mongodb that we installed on this machine. when we deploy it to production env, it will have a different connection string. playground is the name of our database
     .then(()=> console.log('coonected to mongodb'))
     .catch((err) => console.log('could not connect to mongodb db'))

const courseSchema = new mongoose.Schema({
    name:{type:String, required:true, 
          //minlength
          //maxlength
          //uppercase
          //lowercase
          //trim
    },
    author:String,
    tags:[String],
    //tags:{
        // type: Array,
        // validate: {
        //     validator: function(v){
        //         return v &&v.length > 0; which basically means if v has a value and its length is greater than 0 
        //     },
        //     message: 'A course should have atleast one element' //custom validator
        // }
    //},
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; }
        //enum
        //get: v => Math.round(v),
        //set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course',courseSchema)//model is used to create a class. Creating class Course using Course as  the name of the collection and courseSchema as the document schema
async function createCourse(){
    const course  = new Course({  //creating an object (row/document) from the class Course
        // name: 'Node js course',
        author: 'mosh',
        tags: ['sql', 'database'],
        isPublished: true
    });
    const result = await course.save(); //since it is asynchronous, we have put await
    console.log("result of create course"+result);
}
createCourse();

async function getCourse1(){
    const result = await Course //since it is asynchronous, we have put await
    .find()
    //.find({price:{$gte: 10, $lte: 20}})
    //.find({price:{$in: [10,15,20]}})
    //.or([ {author: 'Mosh'}, {isPublished:true} ])
    //.count()
    //.skip() //used for pagination
    .limit(10)
    .sort({name:1}) //sorting by name ascending
    .select({name:1, tags:1}) //selecting only name and tags property
    console.log( "result of get course "+result);
}
//getCourse1();

async function getCourse(){
    const result = await Course.find({tags:'angular'})//since it is asynchronous, we have put await
    console.log(result);
}
// getCourse();

async function getCourseExercise1(){
    const result = await Course
    .find({tags:'backend', isPublished:true})
    .sort({name:1})
    .select({name:1, author:1})
    console.log(result);
}
//getCourseExercise1();

async function getCourseExercise2(){
    const result = await Course
    .find({tags:{ $in: ['backend','frontend']}, isPublished:true})
    .sort({price:-1})
    .select({name:1, author:1, price:1})
    console.log(result);
}
//getCourseExercise2();

async function getCourseExercise3(){
    const result = await Course
    .find({isPublished:true})
    .or([
        {price:{$gte:15}},
        {name:/.*by.*/i}
    ])
    .sort({price:-1})
    .select({name:1, author:1, price:1})
    console.log(result);
}
//getCourseExercise3();

async function updateCourse1(id){
    const course = await Course.findById(id)
    console.log(course)
    if(!course)
        return
    course.set({
        isPublished:true,
        author: 'Another Author'
    });  
    const result = await course.save();
    console.log(result);
}
//updateCourse1('68e2779fb7012fb05f4e8b79');

async function updateCourse2(id){
    const course = await Course.updateOne({_id:id}, { //no ned to save explicitly as its automatically handled
        $set:{
            author:'Mosh',
            isPublished:false
        }
    });
    console.log(course)
}
// updateCourse2('68e2779fb7012fb05f4e8b79');

async function updateCourse3(id){
    const course = await Course.findOneAndUpdate(_id, { //no ned to save explicitly as its automatically handled
        $set:{
            author:'Jason',
            isPublished:false
        }
    }, {new:true});
    console.log(course)
}
// updateCourse3('68e2779fb7012fb05f4e8b79'); not working

async function removeCourse1(id){
    const course = await Course.deleteOne({_id:id});
    // const course = await Course.deleteMany({_id:id});  
    // const course = await Course.findByIdAndDelete(id); 
    console.log(course)
}
removeCourse1('68e2779fb7012fb05f4e8b79');


// const courseSchema1 = new mongoose.Schema({
//     name:{type:String, required:true},
//     author:String,
//     tags:[String],
//     date: {type: Date, default: Date.now},
//     isPublished: Boolean
// });

// const Course1 = mongoose.model('Course',courseSchema1)//model is used to create a class. Creating class Course using Course as  the name of the collection and courseSchema as the document schema
// async function createCourse(){
//     const course  = new Course({  //creating an object (row/document) from the class Course
//         name: 'Node js course',
//         author: 'mosh',
//         tags: ['sql', 'database'],
//         isPublished: true
//     });
//     try{
//         const result = await course.save(); //since it is asynchronous, we have put await
//         // await course.validate();
//     } catch(err){
//         console.log(err.message);
//     }
//     console.log("result of create course"+result);
// }