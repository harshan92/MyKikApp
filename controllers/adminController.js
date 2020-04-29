module.exports=function(){
    return {
        setRouter:function(router){
            router.get('/dashboard', this.adminPage);
        },
        adminPage:function(req, res){
            res.render('admin/dashboard');
        }
    }
}