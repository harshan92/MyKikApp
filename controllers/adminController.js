'use strict';
const path=require('path');
// const fs=require('fs');
module.exports=function(formidable, Group, lsu){
    return {
        SetRouting:function(router){
            router.get('/dashboard', this.adminPage);

            router.post('/uploadFile',lsu.Upload.any(), this.uploadFile);
            router.post('/dashboard',this.adminPostPage);
        },
        adminPage:function(req, res){
            res.render('admin/dashboard');
        },
        uploadFile:function(req, res){
            const form=new formidable.IncomingForm();
            form.uploadDir=path.join(__dirname, '../public/temp_uploads');

            form.on('file', (field, file)=>{
                // fs.rename(file.path, path.join(form.uploadDir, file.name), (err)=>{
                //     if(err) throw err;
                //     console.log("File renamed successfully!")
                // });
            });

            form.on('error', (err)=>{
                console.log(err);
            });

            form.on('end', ()=>{
                console.log('File uploaded successfully!');
            });

            form.parse(req);
        },
        adminPostPage:function(req, res){
            
        }
    }
}