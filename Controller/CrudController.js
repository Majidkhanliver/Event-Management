// const mongo = require('../db/dbconnection')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Majid:Majid123@cluster0.y6blzyy.mongodb.net/?retryWrites=true&w=majority";
var ObjectID = require('mongodb').ObjectID;
const getEventById = (req, res) => {
    console.log(req.query.id)
    MongoClient.connect(url, (err, client) => {
        if (!err) {
            var db0 = client.db('DTEvent');
            console.log("successful connection to getEventById");
            db0.collection("Event").findOne({
                "_id": ObjectID(req.params.id)
            }, (err, result) => {
                if (err) throw err;
                console.log(result);
                return res.send(result);
            })
        } else
            res.send("Cionnectio failed")
    })
};
const postEvent = (req, res) => {
    console.log("REQuest received event");
    console.log(req.body)
    MongoClient.connect(url, (err, client) => {
        if (!err) {
            var db = client.db('DTEvent');
            console.log("successful connection with the server");
            var myobj = { name: "Ajeet Kumar", age: "28", address: "Delhi" };
            try {
                db.collection("Event").insertOne(req.body, (err, result) => {
                    if (err) throw err;
                    return res.send(result);
                });
            } catch (err) {
                console.log(err);
            }
        } else
            console.log("Error in the connectivity");
    })
}
const deleteByID = (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (!err) {
            var db = client.db('DTEvent');
            console.log("successful connection with the server");
            try {
                db.collection("Event").deleteOne({ "_id": ObjectID(req.params.id) }, (err, result) => {
                    if (err) throw err;
                    return res.send(result);
                });
            } catch (err) {
                console.log(err);
            }
        } else
            console.log("Error in the connectivity");
    })
}
const getAllEvents = (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    MongoClient.connect(url, (err, client) => {
        if (!err) {
            var db = client.db('DTEvent');
            console.log("successful connection with the server");
            try {
                db.collection("Event").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    const newResult = result.slice(startIndex, endIndex);
                    return res.send(newResult);
                });
            } catch (err) {
                console.log(err);
            }
        } else
            console.log("Error in the connectivity");
    })


}
const updateEvent = (req, res) => {
    console.log(req.params.id)
    MongoClient.connect(url, (err, client) => {
        if (!err) {
            var db = client.db('DTEvent');
            console.log("successful connection with the server");
            try {
                db.collection("Event").updateOne({ "_id": ObjectID(req.params.id) }, req.query, (err, result) => {
                    if (err) throw err;

                    return res.send(result);
                });
            } catch (err) {
                console.log(err);
            }
        } else
            console.log("Error in the connectivity");
    })

}
module.exports = { getEventById, postEvent, deleteByID, getAllEvents, updateEvent };