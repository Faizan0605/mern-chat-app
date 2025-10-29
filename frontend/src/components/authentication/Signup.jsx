import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);




    const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            // toast({
            //     title: "Please Fill all the Feilds",
            //     status: "warning",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
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
            setPicLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            // toast({
            //     title: "Passwords Do Not Match",
            //     status: "warning",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
            toast('Passwords Do Not Match', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",
                {
                    name,
                    email,
                    password,
                    pic,
                },
                config
            );
            console.log(data);
            // toast({
            //     title: "l",
            //     status: "success",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
            toast('Registration Successful', {
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
            setPicLoading(false);
            navigate("/chats");
        } catch (error) {
            // toast({
            //     title: "",
            //     description: error.response.data.message,
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
            toast('Error Occured!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setPicLoading(false);
        }
    };




    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            // toast({
            //     title: "Please Select an Image!",
            //     status: "warning",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
            toast('Please Select an Image!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "piyushproj");
            fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            // toast({
            //     title: "Please Select an Image!",
            //     status: "warning",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
            toast('Please Select an Image!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setPicLoading(false);
            return;
        }
    };


    return (
        <div className='justify-center items-center'>
            <form>
                <div>
                    <label>Name</label>
                    <input
                        placeholder="Enter Your Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

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

                <div>
                    <label>Confirm Password</label>
                    <input
                        type={show ? "text" : "password"}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <button type="button" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </button>
                </div>

                <div>
                    <label>Upload your Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
                </div>

                <button type="button" onClick={submitHandler}>
                    {picLoading ? "Loading..." : "Sign Up"}
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup