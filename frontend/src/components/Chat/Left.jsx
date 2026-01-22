import axios from 'axios';
import { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { CgRename } from "react-icons/cg";
import useCurrChat from '../../contexts/CurrChat';

const Left = () => {

    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const { setCurrChat } = useCurrChat();
    const [allUsers, setAllUsers] = useState([]);
    const [groupUsers, setGroupUsers] = useState([]);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [newGroupName, setNewGroupName] = useState("");
    const [renameChatId, setRenameChatId] = useState(null);



    const token = localStorage.getItem('token');


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

            // console.log(usersData.data);
            setUsers(usersData.data);

        } catch (error) {
            console.error(error);
        }
    };

    const accessChat = async (contact) => {
        // console.log(contact);
        const id = contact.users[1]._id
        try {
            const response = await axios.post('/api/chat', { "userId": id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data);
            setCurrChat(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const createGroupChat = async () => {
        try {
            const usersData = await axios.get('/api/user', {
                params: {
                    search: search,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllUsers(usersData.data);
            console.log(allUsers);
            setShowGroupModal(true);

        } catch (error) {
            console.log(error.message);
        }
    }

    const createGroup = async () => {
        try {
            const response = await axios.post('/api/chat/group', {
                name: groupName || "New Group",
                users: JSON.stringify(groupUsers.map((u) => u._id)),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("done");
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const renameGroup = async (chatId) => {
        try {
            const response = await axios.put(
                "/api/chat/rename", // backend route
                {
                    chatId: chatId,
                    chatName: newGroupName, // from state
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // your existing token
                    },
                }
            );

            // backend returns updated chat
            console.log("Renamed chat:", response.data);

            // update your UI or state here if needed
            // e.g., setCurrChat(response.data);
        } catch (error) {
            console.error("Error renaming group:", error.response?.data?.message || error.message);
            alert("Failed to rename group");
        }
    };


    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('/api/chat', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // console.log(response.data);
                setContacts(response.data); //  store chats
            } catch (error) {
                console.error(error);
            }
        };

        fetchChats();
    }, [token]);


    return (<div className='bg-zinc-200 rounded p-3'>
        <div className='flex justify-between mb-4'>
            <h3 className='text-2xl'>My Chats</h3>
            {/* Add users to group */}
            <div><button className='bg-blue-100 p-2 rounded hover:bg-blue-200 transition' onClick={createGroupChat} >Add Group Chat +</button></div>
        </div>


        {/*showing group modal */}
        {showGroupModal && (
            <div className="bg-white p-4 rounded mb-5">
                <h3 className="mb-2 text-xl">Select Users</h3>


                {groupUsers.length > 0 && (
                    <div className="mb-4">
                        <h4 className="mb-1 font-semibold">Selected Users:</h4>
                        <div className="flex flex-wrap gap-2">
                            {groupUsers.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full cursor-pointer hover:bg-red-200 transition"
                                    onClick={() => // remove selected user on click
                                        setGroupUsers((prev) =>
                                            prev.filter((u) => u._id !== user._id)
                                        )
                                    }
                                >
                                    <span>{user.name}</span>
                                    <span className="text-sm font-bold">×</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {allUsers.map((user) => ( //redering all registered users
                    <div
                        key={user._id}
                        onClick={() => {
                            setGroupUsers((prev) =>
                                prev.some((u) => u._id === user._id)
                                    ? prev
                                    : [...prev, user]
                            );
                        }}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                    >
                        {user.name}
                    </div>
                ))}
                <div>
                    <input
                        className='px-3 py-1 bg-white rounded my-2'
                        placeholder='Group Name'
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <button className='bg-blue-100 hover:bg-blue-200 rounded-xl p-2 ml-2 ' onClick={createGroup}>Create Group</button>
                </div>
            </div>
        )}

        {/*search*/}
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
        </div> : <></>
        }


        {/* contacts */}
        <div className="flex flex-col gap-2 mt-4">
            {contacts.map((contact) => (
                <div
                    onClick={() => accessChat(contact)}
                    key={contact._id}
                    className="p-3 bg-white rounded cursor-pointer hover:bg-blue-100 transition flex justify-between items-center"
                >
                    <div>

                        <h4 className="font-semibold">{contact.chatName}</h4>
                        <p className="text-sm text-zinc-500">
                            {contact.latestMessage?.content || "No messages yet"}
                        </p>
                    </div>

                    {/* Rename input ONLY for clicked group */}
                    {contact.isGroupChat && renameChatId === contact._id && (
                        <div>
                            <input
                                className="px-3 py-1 bg-white rounded"
                                placeholder="Rename Group"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                            />
                            <button
                                className="bg-blue-100 hover:bg-blue-200 rounded-xl p-2 ml-2"
                                onClick={() => {
                                    renameGroup(contact._id);
                                    setRenameChatId(null);
                                }}
                            >
                                Rename
                            </button>
                        </div>
                    )}

                    {/* Rename icon */}
                    {contact.isGroupChat && (
                        <div
                            onClick={() => {
                                setRenameChatId(contact._id);
                                setNewGroupName(contact.chatName);
                            }}
                            className="bg-zinc-200 rounded-full p-2 hover:p-3 hover:bg-zinc-300 transition-all duration-200"
                        >
                            <CgRename />
                        </div>
                    )}
                </div>
            ))}
        </div>

    </div >
    )
}

export default Left