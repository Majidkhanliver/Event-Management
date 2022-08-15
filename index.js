const express = require('express');
const app = express();
const crud = require('./Routes/Crud');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v3/app', crud);
app.listen(3000, (res, err) => {
    if (err) throw err;
    console.log("listening at post 3000")
})