
var socket = io.connect('http://localhost:8000');
var output = document.getElementById('output');
var username = document.getElementById('name')
var messege = document.getElementById('messege')
var send = document.getElementById('send');
var istyping = document.getElementById('feedback');

send.addEventListener('click',()=>{
    socket.emit('chat',{
        name : username.value,
        messege  : messege.value

    });
    username.value = '';
    messege.value = '';
   
})

messege.addEventListener('keypress',()=>{
    socket.emit('istyping', username.value);
})
// listen for events
socket.on('chat',(data)=>{
    output.innerHTML += '<p><strong>'+data.name+':</strong>'+ data.messege+'</p>';
    istyping.innerHTML = '';
   
})

socket.on('istyping',(data)=>{
    istyping.innerHTML = '<p><em></p>'+ data+'is typing </em></p>';
})