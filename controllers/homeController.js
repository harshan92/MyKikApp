
module.exports=function(async, Group, _){
    return {
        SetRouting:function(router){
            router.get('/home', this.homePage);
        },
        homePage:function(req, res){
            async.parallel([
                function(callback){
                    Group.find({},(err, result)=>{
                        callback(err, result);
                    })
                }
            ], (err, result)=>{
                const res1=result[0];
                console.log(res1);

                res.render('home', {title:'MyKik - Home',data:res1});
            })
             
        }
    }
}