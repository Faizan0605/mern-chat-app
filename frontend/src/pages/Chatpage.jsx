import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react'
const Chatpage = () => {

    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const { data } = await axios.get("/api/chat");
        setChats(data);
        console.log(data);
    }

    useEffect(() => {
        fetchChats();
    }, [])

    return (
        <div>
            {chats.map(chat => (
                <div key={chat._id}>{chat.chatName} </div>
            ))}
        </div>
    )
}

export default Chatpage