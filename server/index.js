// const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// const User = require('./modal/userSchema');


const main = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/mernStack").then(()=>{
        console.log("connection successfull")
    })
    // const productschema = new mongoose.Schema({
    //     name:String
    // });
//    const ProductModel = mongoose.model('student', productschema);
//    let data = new ProductModel({name:"m8"});
//    let result = await data.save();
//    console.log(result);
}
main();

app.use(express.json());
// link router file
app.use(require('./router/auth'));


// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// async function getData(){
//     let result = await client.connect();
//     let db=result.db('cscorner')
//     let collection = db.collection('student');
//     let response = await collection.find({}).toArray();
//     console.log(response);
// }
// getData();


//middleware
// const middleware = (req, res, next)=>{
//     console.log("from middleware")
//     next();
// }

// app.get('/', middleware, (req, res)=>{
//     console.log("from home")
//     res.send('server start')
// });

app.listen(5000);
