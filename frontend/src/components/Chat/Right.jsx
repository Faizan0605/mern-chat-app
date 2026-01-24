import { useEffect, useState, useRef } from 'react';
import useCurrChat from '../../contexts/CurrChat';
import axios from 'axios';
import io from 'socket.io-client'
import Lottie from 'react-lottie'
import animationData from '../../animations/typing.json'

const ENDPOINT = "https://mern-chat-app-7inc.onrender.com";
var socket, selectedChatCompare;

const Right = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderSetting: {
            preserveAspectRatio: "xMidYMid slice"
        },
    }

    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currChat } = useCurrChat();
    const messagesEndRef = useRef(null);

    const token = localStorage.getItem('token');
    const loggedUserId = localStorage.getItem('userId');

    // Scroll to bottom when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };



    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", loggedUserId);
        socket.on('connected', () => setSocketConnected(true));
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    }, [])

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                //give notification
            } else {
                setMessages([...messages, newMessageRecieved])
            }
        })
    })

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    // Fetch messages when chat changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!currChat?._id) return;
            setLoading(true);
            try {
                const response = await axios.get(`/api/message/${currChat._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                setMessages(response.data);
                setLoading(false);
                socket.emit("join chat", currChat._id);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
        selectedChatCompare = currChat;
    }, [currChat, token]);

    const handleSend = async () => {
        if (!message.trim() || !currChat?._id) return;
        socket.emit('stop typing', currChat._id)
        try {
            const response = await axios.post(
                '/api/message',
                {
                    content: message,
                    chatId: currChat._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            socket.emit('new message', response.data)
            setMessages([...messages, response.data]);
            setMessage('');
            // console.log(response.data)
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Get chat name to display
    const getChatName = () => {
        if (!currChat) return 'Select a chat';
        if (currChat.isGroupChat) return currChat.chatName;
        return currChat.users?.[1]?.name || 'Chat';
    };

    const typingHandler = (e) => {
        setMessage(e.target.value)

        //typing indicator logic
        if (!socketConnected) return
        if (!typing) {
            setTyping(true)
            socket.emit("typing", currChat._id)
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit('stop typing', currChat._id);
                setTyping(false);
            }
        }, timerLength);

    }

    return (
        <div className='bg-zinc-100 rounded p-3 h-full flex flex-col'>
            <div className='flex justify-between mb-4'>
                <h3 className='text-2xl font-semibold'>{getChatName()}</h3>
                {/**add contact user  image here */}
            </div>

            {/* message area */}
            <div className="bg-white rounded h-[70vh] overflow-y-auto p-4 flex flex-col">
                {!currChat ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Select a chat to start messaging</p>
                    </div>
                ) : loading ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Loading messages...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {messages.map((msg) => {
                            const isSender = msg.sender._id === loggedUserId;
                            return (
                                <div
                                    key={msg._id}
                                    className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] px-4 py-2 rounded-2xl ${isSender
                                            ? 'bg-blue-500 text-white rounded-br-sm'
                                            : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                                            }`}
                                    >
                                        {currChat.isGroupChat && !isSender && (
                                            <p className="text-xs font-semibold text-blue-600 mb-1">
                                                {msg.sender.name}
                                            </p>
                                        )}
                                        <p>{msg.content}</p>
                                        <p className={`text-xs mt-1 ${isSender ? 'text-blue-100' : 'text-gray-500'}`}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* input box */}
            {isTyping ? <div>
                <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}

                />
            </div> : <></>}
            <div className="flex gap-3 mt-3">
                <input
                    className="bg-zinc-200 w-full rounded p-3"
                    placeholder="Type a message..."
                    value={message}
                    onChange={typingHandler}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={!currChat}
                />

                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white rounded-full px-6 hover:bg-blue-600 transition disabled:bg-gray-300"
                    disabled={!currChat || !message.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Right
