var { MongoClient } = require('mongodb');
var url = "mongodb+srv://Majid:Majid123@cluster0.y6blzyy.mongodb.net/?retryWrites=true&w=majority";

const client = MongoClient.connect(url)
module.exports = MongoClient;