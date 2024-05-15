const multer = require('multer');

const halereyaUploadJSON = multer({
    storage: multer.diskStorage({
        destination: 'public/halereya_files/',
    }),
    limits: { fileSize: 100 * 1024 /* bytes */ },
    fileFilter: (req, file, callback) => {
        if (!['application/json'].includes(file.mimetype)) {
            return callback(createError.BadRequest("File is not allowed"));
        }

        callback(null, true);
    }
}).single('file');

// const halereyasUpload = multer().single('file');

module.exports = {
    halereyaUploadJSON
}