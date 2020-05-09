const multer=require('multer');

var upload=multer({
    dest:'uploads/',
    rename:function(fieldName, fileName){
        console.log('renaming...');
        return fileName.replace('/\W+/g', '-');
    },

    onFileUploadStart: function () {
        console.log("Upload is starting...");
    },

    onFileUploadComplete: function () {
        console.log("File uploaded");
    }
});

exports.Upload=upload;