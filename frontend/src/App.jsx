import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage"
import Chatpage from "./pages/Chatpage"
import './App.css';
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/chats" element={<Chatpage />} />
      </Routes>
    </div>
  )
}

export default App
