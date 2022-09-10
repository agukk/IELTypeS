import React from 'react';
import { Link } from 'react-router-dom';

export const Introduce = () => {
    return(
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <h3 className='text-3xl font-sans mb-12'>Learn English while typing!</h3>
            <Link to='/start'>
                <button className="bg-indigo-700 hover:bg-indigo-600 shadow-xl font-semibold text-3xl text-white py-3 px-4 rounded">Get Started</button>
            </Link>
        </div>
    );
}