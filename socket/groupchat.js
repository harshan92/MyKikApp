module.exports=function(io){
    io.on('connection', (socket)=>{
        console.log("User connected");

        socket.on('join', function(params, callback){
            socket.join(params.room);
            callback();
        });

        socket.on('createMessage', (message, callback)=>{
            console.log(message);
            io.to(message.room).emit('newMessage',{
                text:message.text,
                room:message.room
            })

            callback();
        })
    })
}