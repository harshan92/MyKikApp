class Users{
    constructor(){
        this.users=[];
    }

    addUserData(id, name, room){
        var users={id, name, room};
        this.users.push(users);
        return users;
    }

    removeUser(id){
        var user=this.getUser(id);
        if(user){
            this.users=this.users.filter((user)=> user.id !== id);
        }
        return user;
    }

    getUser(id){
        var user=this.users.filter((userId)=>{
            return userId.id===id;
        })[0];
        return user;
    }

    getUsersList(room){
        var users=this.users.filter((user)=>user.room===room);

        var namesArray=users.map((user)=>{
            return user.name;
        });

        return namesArray;
    }
}

module.exports={Users};