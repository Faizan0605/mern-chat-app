import React from 'react'

const Chatpage = () => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const { data } = await axios.get("/api/chats");
        setChats(data);
    }

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            {chats.map((chat) => (
                <div key={chat._id}>chat.Chatname</div>
            ))}
        </div>
    )
}

export default Chatpage