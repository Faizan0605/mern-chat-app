import { use, useEffect } from 'react';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useCurrChat from '../../contexts/CurrChat';

const Right = () => {
    const [message, setMessage] = useState('');
    const [eye, setEye] = useState(false);
    const { currChat } = useCurrChat();




    const handleSend = () => {
        if (!message.trim()) return; // prevent empty message

        console.log('Sending message:', message);

        // 👉 send message to backend / socket here

        setMessage(''); // clear input after send
    };
    return (
        <div className='bg-zinc-100  rounded p-3 overflow-scroll'>
            <div className='flex justify-between mb-4'>
                <h3 className='text-2xl'>John</h3>
                <div className='bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition'
                    onClick={() => setEye(!eye)}
                >
                    {eye ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
            </div>

            {/* message area */}
            <div className='bg-white rounded h-[70vh]'>
                {currChat?.users?.map((user) => (
                    <h1 key={user._id}>{user.name}</h1>
                ))}

            </div>

            {/* input box */}
            <div className="flex gap-3 mt-3">
                <input
                    className="bg-zinc-200 w-full rounded p-3"
                    placeholder="message......"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />

                <button
                    onClick={handleSend}
                    className="bg-blue-100 rounded-full px-4"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Right