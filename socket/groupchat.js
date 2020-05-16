module.exports=function(io){
    io.on('connection', (socket)=>{
        console.log("User connected");

        socket.on('join', function(params, callback){
            socket.join(params.room);
            callback();
        });

        socket.on('createMessage', (message)=>{
            console.log(message);
            io.emit('newMessage',{
                text:message.text
            })
        })
    })
}