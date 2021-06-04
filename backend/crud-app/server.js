const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const app = express();

const connectDB  = require('./server/database/connection')

dotenv.config({PATH : 'config.env'})
const PORT = process.env.PORT || 8000;


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, 
    
}

 
//log request
app.use(morgan('tiny'))

//mongoDB connection 
connectDB();

//parse request to body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "100mb" }));

//set view engin
app.set('view-engine',"ejs");

//load assests
app.use('/css',express.static(path.resolve(__dirname,"assests/css")))
app.use('/img',express.static(path.resolve(__dirname,"assests/img")))
app.use('/js',express.static(path.resolve(__dirname,"assests/js")))


app.use(cors(corsOptions))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,() => console.log(`server is running at ${PORT}`))