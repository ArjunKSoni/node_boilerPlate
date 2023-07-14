const multer = require('multer')

// add enctype="multipart/form-data" to form

exports.multerStorage = {
    storage: multer.diskStorage({  //using multer to save files
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
        destination: (req, file, cb) => {
            cb(null, 'images')  // null is for the error message and 2 argument is the place to store image
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        }
        else cb(null, false);
    }
}