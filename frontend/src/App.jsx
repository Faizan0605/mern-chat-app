import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage"
import Chatpage from "./pages/Chatpage"
import './App.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chatpage />} />
      </Routes>
    </div>
  )
}

export default App
