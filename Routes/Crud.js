const express = require('express');
const router = express.Router();
const date = require("date-and-time");
const { getEventById, postEvent, deleteByID, getAllEvents, updateEvent } = require('../Controller/CrudController');
const multer = require('multer');
const path = require('path')
const disk = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("Called");
        cb(null, path.join(__dirname, "../public/Images/"));
    },
    filename: function(req, file, cb) {
        const now = new Date();
        var filename =
            date
            .format(now, "YYYY/MM/DD HH:mm:ss")
            .toString()
            .replace(/[\/ :]/g, "") + ".jpg";
        console.log(filename);
        file.originalname = filename;
        req.query.filename = filename;
        req.body.filename = filename;
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: disk });
router.get('/events/:id', getEventById);
router.get('/events', getAllEvents);
router.put('/events/:id', updateEvent);
router.post('/events', upload.single('image'), postEvent);
router.delete('/events/:id', deleteByID);

module.exports = router;