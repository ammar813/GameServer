const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('index.html', (err, data) => {
      res.statusCode = 200;
      res.end(data); 
    });
});
const io = new Server(server); 

io.on("connection", socket => {
  console.log("client connected");

  socket.on("send_to_cpp", msg => {
    
    io.emit("cpp_message", msg);
    })
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port localhost:${PORT}`);
  console.log(`Press Ctrl + C to close the server`);

});