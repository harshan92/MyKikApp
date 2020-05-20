class Users{
    constructor(){
        this.users=[];
    }

    addUserData(id, name, room){
        var users={id, name, room};
        this.users.push(users);
        return users;
    }
}

module.exports={Users};