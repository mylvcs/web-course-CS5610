var express = require('express');
var router = express.Router();

function connect() {
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://localhost: 27017";

    var client = new MongoClient(url);
    client.connect(function(err){
        if (err!= null)
            throw err;
        
        var db = client.db("DevConnect");
        
        console.log("Connected");
    });
}