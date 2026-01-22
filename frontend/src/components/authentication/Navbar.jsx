import React from 'react'
import { useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        // Redirect to homepage
        navigate("/");
    };

    return (
        <div className='my-5 p-3 bg-zinc-100 rounded flex justify-between items-center'>
            <h2 className='text-4xl'>Talky-Talky</h2>
            {token && (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            )}
        </div>
    )
}

export default Navbar
