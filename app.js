const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD
const dbUri = "mongodb+srv://"+dbUser+":"+dbPassword+"@cluster0-egf9l.mongodb.net/sample_mflix?retryWrites=true";
mongoose.connect(dbUri, { useNewUrlParser: true, useFindAndModify: false });

const movieSchema = new mongoose.Schema({title:String,rated:String,runtime:Number,year:Number});
const Movie = mongoose.model('Movie', movieSchema, 'movies');

app.use(morgan('short'));
app.use(bodyParser.json());

app.get("/", function(req,res){
    res.send("Hello! SiSI web api works!");
});

app.get("/movie/:id/", function(req,res){
    const movieId = req.params.id;
    Movie.findById(movieId).exec(function(err,movie){
        if(err) res.send(err);
        res.json(movie);
    });
});

app.delete("/movie/:id/", function(req,res){
    const movieId = req.params.id;
    Movie.findByIdAndDelete(movieId).exec(function(err,movie){
        if(err) res.send(err);
        res.json(movie);
    });
});

app.post("/movie/", function(req,res){
    const newMovie = new Movie(req.body);    
    newMovie.save(function(err,movie){
        if(err) res.send(err);
        res.json(movie);
    });
});

app.put("/movie/:id/", function(req,res){
    const movieId = req.params.id;
    const updateData = req.body;
    Movie.findByIdAndUpdate(movieId, {$set:updateData},{new:true}).exec(function(err,movie){
        if(err) res.send(err);
        res.json(movie);
    });
});

app.get("/movies/", function(req,res){
    Movie.find({}).exec(function(err,movies){
        res.json(movies);
    })
});

app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), function() {
    console.log("App started on port: " + app.get("port"));
});

process.on('SIGUSR2', function() {
    gracefulDbShutdown('nodemon restart', function() {
        process.kill(process.pid,'SIGUSR2');
    });
});

process.on('SIGINT', function(){
    server.close( function() {
        console.log('Express server closed');
        mongoose.connection.close(function() {
            console.log("Mongoose closed by app termination");
            process.exit(0);
        });
    });
});

process.on('SIGTERM', function(){
    server.close(function(){
        console.log("Express HTTP server closed");
        mongoose.connection.close(function() {
            console.log("Mongoose closed by Heroku app termination");
            process.exit(0);
        });
    });
});
