const http = require('http');
const { Server } = require('socket.io');
const exrpress = require('express');

const app = exrpress();
app.use(exrpress.static('public'));

const server = http.createServer(app);
const io = new Server(server); 

io.on("connection", socket => {
  console.log("client connected");

  socket.on("send_to_cpp", msg => {
    
    io.emit("cpp_message", msg);
    })
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port localhost:${PORT}`);
  console.log(`Press Ctrl + C to close the server`);

});