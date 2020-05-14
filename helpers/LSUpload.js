const multer=require('multer');


// var upload = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
// })
var upload=multer({
    dest:'/uploads',
    rename:function(fieldName, fileName){
        console.log('renaming...');
        // return fileName.replace('/\W+/g', '-');
    },

    onFileUploadStart: function () {
        console.log("Upload is starting...");
    },

    onFileUploadComplete: function () {
        console.log("File uploaded");
    }
});

exports.Upload=upload;