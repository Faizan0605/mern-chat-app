import axios from 'axios';
import { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";

const Left = () => {

    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = async () => {
        try {
            const usersData = await axios.get('/api/user', {
                params: {
                    search: search,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(usersData.data);
            setUsers(usersData.data);

        } catch (error) {
            console.error(error);
        }
    };



    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('/api/chat', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data);
                setContacts(response.data); // 👈 store chats
            } catch (error) {
                console.error(error);
            }
        };

        fetchChats();
    }, [token]);


    return (<div className='bg-zinc-200 rounded p-3'>
        <div className='flex justify-between mb-4'>
            <h3 className='text-2xl'>My Chats</h3>
            <div><button className='bg-blue-100 p-2 rounded hover:bg-blue-200 transition'>Add Group Chat +</button></div>
        </div>

        <div className='flex justify-between mb-2'>
            <input className='px-3 py-1 bg-white rounded' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <button className='bg-blue-100 hover:bg-blue-200 rounded-full p-2' onClick={(handleSearch)}><IoIosSearch /></button>
        </div>

        {!users.length == 0 ? <div className='bg-white rounded p-3 mb-6'>
            {users.map((user) => (
                <div
                    key={user._id}
                    className="p-1 bg-white rounded cursor-pointer hover:bg-blue-100 transition"
                >
                    <h4 className="font-semibold">{user.name}</h4>
                </div>

            ))}
        </div> : <></>}


        {/* contacts */}
        <div className="flex flex-col gap-2 mt-4" onClick={() => { }}>
            {contacts.map((contact) => (
                <div
                    key={contact._id}
                    className="p-3 bg-white rounded cursor-pointer hover:bg-blue-100 transition"
                >
                    <h4 className="font-semibold">{contact.chatName}</h4>
                    <p className="text-sm text-zinc-500">
                        {contact.latestMessage?.content || "No messages yet"}
                    </p>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Left