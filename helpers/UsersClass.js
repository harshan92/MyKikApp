class Users{
    constructor(){
        this.users=[];
    }

    addUserData(id, name, room){
        var users={id, name, room};
        this.users.push(users);
        return users;
    }

    getUsersList(room){
        var users=this.users.filter((user)=>user.room===room);

        var namesArray=users.map((user)=>{
            return user.name;
        })
    }
}

module.exports={Users};