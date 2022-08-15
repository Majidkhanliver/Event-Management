const multer = require('multer');
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
        cb(null, file.originalname);
    },
    rename: function(fieldname, filename) {
        return filename.replace(/\W+/g, "-").toLowerCase() + Date.now();
    },

});
const upload = multer({ storage: disk });
module.exports = upload;