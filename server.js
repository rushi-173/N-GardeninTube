const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');


//middlewares
// app.use(cors());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import routes
const authRoute = require('./routes/auth.route');
const dataRoute = require('./routes/playlist.route');
const videoRoute = require('./routes/video.route');


app.use('/auth', authRoute);
app.use('/playlist', dataRoute);
app.use('/video', videoRoute);


//Routes
app.get('/', (req, res) => {
    res.send("We are on home")
})


//Connect to database
const dbConnect = require("./database/connect");
dbConnect(process.env.DB_URI);

//Listening to the server
const port = process.env.PORT || 8000;
app.listen(port, ()=>console.log(`Server started at http://localhost:${port}/`));


