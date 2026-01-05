import { useState } from 'react'
import Homepage from './pages/Homepage'
import Chatpage from './pages/Chatpage'
import { Routes, Route } from "react-router";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chatpage />} />
      </Routes>
    </>
  )
}

export default App
