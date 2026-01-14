const http = require('http');
const { Server } = require('socket.io');
const exrpress = require('express');
Counter = 0

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

app.get('/gsm', (req, res) => {
  Counter++;
  res.end('GSM Endpoint Reached' + Counter);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port localhost:${PORT}`);
  console.log(`Press Ctrl + C to close the server`);

});