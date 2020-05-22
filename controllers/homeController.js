
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
                    });
                },
                function(callback){
                    Group.aggregate([
                        {$group:{
                            _id:"$country"
                        }}
                    ],
                    (err, newResult)=>{
                        callback(err, newResult);
                    }
                    )
                }
            ], (err, result)=>{
                const res1=result[0];
                const res2=result[1];
                console.log(res2);

                res.render('home', {title:'MyKik - Home', user:req.user, data:res1, countries:res2});
            })
             
        }
    }
}