const mongoose = require('mongoose');
const dotenv = require('dotenv');


const connectDB = async () =>{
    try{
        //mongodb connection
        const con = await mongoose.connect("mongodb+srv://Divya:Divya@12@55@cluster0.fvjth.mongodb.net/CRUD-App?retryWrites=true&w=majority",{
             useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        })
        console.log(`MongoDB Connected : ${con.connection.host}` ); 
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB