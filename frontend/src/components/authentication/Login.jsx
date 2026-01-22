import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/user/login', {
                email,
                password,
            });

            console.log('Login success:', res.data);
            const token = res.data.token;
            const userId = res.data._id;

            // ✅ Save token
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            navigate("/chats");

        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
        }
    };

    return (
        <div className=" flex items-center justify-center bg-gray-100">
            <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
