import { useState } from 'react'
import Homepage from './pages/Homepage'
import Chatpage from './pages/Chatpage'
import { Routes, Route } from "react-router";
import { CurrChatProvider } from './contexts/CurrChat';


function App() {
  const [currChat, setCurrChat] = useState({});
  // const setCurrChatFunc = (curr) => {
  //   setCurrChat(curr);
  // }

  return (
    <CurrChatProvider value={{ currChat, setCurrChat }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chatpage />} />
      </Routes>
    </CurrChatProvider>
  )
}

export default App
