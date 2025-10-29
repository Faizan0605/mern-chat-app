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
app.listen(PORT, () => {
  console.log(`app is listning to port ${PORT}`)
})
