module.exports=function(io, Users){

    const users=new Users();

    io.on('connection', (socket)=>{
        console.log("User connected");

        socket.on('join', function(params, callback){
            socket.join(params.room);

            users.addUserData(socket.id, params.name, params.room);
            console.log(users);
            callback();
        });

        socket.on('createMessage', (message, callback)=>{
            console.log(message);
            io.to(message.room).emit('newMessage',{
                text:message.text,
                room:message.room,
                from:message.sender
            })

            callback();
        })
    })
}