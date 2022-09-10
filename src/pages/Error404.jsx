import React from 'react';
import { Link } from 'react-router-dom';

export const Error404 = () => {
    return(
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <p className='text-6xl font-sans font-bold tracking-wider pb-4'>404</p>
            <p className='text-4xl font-sans tracking-wider pb-4'>PAGE NOT FOUND</p>
            <p className='text-2xl font-sans pb-10'>What you're looking for isn't there...</p>
            <Link to='/'>
                <button className='bg-gray-800 hover:bg-gray-700 text-white rounded px-4 py-2'>Back to the Top page</button>
            </Link>
        </div>  
    );
}