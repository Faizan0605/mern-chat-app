const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require('./middleware/errorMiddleware')



dotenv.config();
connectDB();
const app = express();
app.use(express.json());


// Test route
app.get('/', (req, res) => {
  res.send("Server is running 🚀");
});


app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


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
    // console.log(loggedUserId);
    socket.emit("connected");
  })

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log("User Joined Room" + room) //room = currChatID
  })
});


