import React from 'react';
import Navbar from '../components/authentication/Navbar';
import Right from '../components/Chat/Right';
import Left from '../components/Chat/Left';

const Chatpage = () => {
    return (<div className='mx-5'>
        <Navbar />

        <div className="grid grid-cols-4 gap-5 h-screen">

            {/* Left Section (1/4) */}
            <div className="col-span-1 overflow-scroll">
                <Left />
            </div>

            {/* Right Section (3/4) */}
            <div className="col-span-3">
                <Right />
            </div>

        </div>
    </div>
    );
};

export default Chatpage;
