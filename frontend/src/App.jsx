
import './App.css'
import { Button, HStack } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router";
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';

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
