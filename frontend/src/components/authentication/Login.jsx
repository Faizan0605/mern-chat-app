import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast('Please Fill all the Feilds', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            toast('Login Successful', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            toast(error.response?.data?.message || 'Error Occured!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false);
        }
    };

    return (
        <div className='justify-center items-center'>
            <form>
                <div>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter Your Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </button>
                </div>

                <button type="button" onClick={submitHandler} disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
                <br></br>
                <button
                    type="button"
                    onClick={() => {
                        setEmail("guest@example.com");
                        setPassword("123456");

                    }}
                >
                    Get Guest User Credentials
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
