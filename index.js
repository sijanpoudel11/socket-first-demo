var express = require('express');
var socket = require('socket.io');

var app = express();
app.use('/public',express.static('public'));
app.set('view engine','ejs');
    app.get('/',(req,res)=>{

       res.render('index');
    })

var server = app.listen('8000',(req,res)=>{
    console.log('server started at port 8000');
})


// setup socket.io

var io = socket(server);

io.on('connection',(socket)=>{
    console.log('new connection'+ socket.id);

    socket.on('chat',(data)=>{
        console.log(data);
        io.sockets.emit('chat',data);
    });

    socket.on('istyping',(data)=>{
        socket.broadcast.emit('istyping',data);
    })
})

