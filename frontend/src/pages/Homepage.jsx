import { useState } from "react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import Navbar from "../components/authentication/Navbar";

const Homepage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (<>
        <Navbar />
        <div className="h-screen gap-8 flex flex-col items-center justify-center bg-gray-100">



            {/* Forms */}
            {isLogin ? <Login /> : <Register />}

            {/* Toggle Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${isLogin
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border"
                        }`}
                >
                    Login
                </button>

                <button
                    onClick={() => setIsLogin(false)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${!isLogin
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 border"
                        }`}
                >
                    Register
                </button>
            </div>
        </div>
    </>
    );
};

export default Homepage;
