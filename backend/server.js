const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const path = require('path')

dotenv.config();
connectDB();
const app = express();
app.use(express.json());




app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//-------------------------Deployement----------------------------------

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, './frontend/dist')));
  app.get("/:any", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))

  })
} else {
  app.get('/', (req, res) => {
    res.send("Server is running 🚀");
  });
}

//-------------------------Deployement----------------------------------

app.use(notFound)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log(`app is listning to port ${PORT}`)
})

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (loggedUserId) => {
    socket.join(loggedUserId);
    // console.log(loggedUserId); //
    socket.emit("connected");
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log("User Joined Room" + room) //room = currChatID
  });

  socket.on('typing', (room) => socket.in(room).emit("typing"))
  socket.on('stop typing', (room) => socket.in(room).emit("stop typing"))

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log('chat.users not defined')

    chat.users.forEach(user => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved)
    })

  })

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(loggedUserId)
  })
});


