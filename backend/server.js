const express = require('express');
const dotenv = require('dotenv');

const { chats } = require("./data/data");

dotenv.config();

const app = express();


// Test route
app.get('/', (req, res) => {
  res.send("Server is running 🚀");
});

// All chats
app.get('/api/chat', (req, res) => {
  res.send(chats);
});

// Single chat
app.get('/api/chat/:id', (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  if (!singleChat) {
    return res.status(404).send({ message: "Chat not found" });
  }
  res.send(singleChat);
});

// Start server
const PORT = process.env.PORT || 5222;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
