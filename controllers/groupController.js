module.exports=function(Users){
    return {
        SetRouting:function(router){
            router.get('/group/:name', this.groupPage)
        },
        groupPage:function(req, res){
            const name=req.params.name;
            res.render('group_chat/group',{title:"MyKik - Group", user:req.user, groupName:name});
        }
    }
}