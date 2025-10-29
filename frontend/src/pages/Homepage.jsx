import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Homepage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) { navigate("/chats") }
    }, [navigate])

    const [page, setPage] = useState("login");
    return (
        <div>
            <div>
                <span onClick={() => setPage("login")}>Login</span>{" "}
                <span onClick={() => setPage("signup")}>Signup</span>
            </div>
            <br></br>
            <br></br>
            {page === "login" ? <Login /> : <Signup />}
        </div>

    )
}

export default Homepage