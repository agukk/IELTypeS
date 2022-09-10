import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

export const Header = () => {   
    const [user] = useAuthState(auth);

    return(
        <>
            {user ? (
                <div className='absolute bg-gray-700 w-full py-8 px-8 flex justify-between'>
                    <a href='/' className='text-white font-sans font-bold text-4xl hover:text-gray-200'>Native Typing</a>
                    <ul className='flex justify-evenly'>
                        <li className='text-white font-sans font-light text-xl pr-16 pt-2.5'>
                            <UserInfo />
                        </li>
                        <li className='text-white font-sans font-normal text-2xl pr-16 pt-2 hover:underline'>
                            <a href='/guide'>
                                Guide
                            </a>
                        </li>
                        <li className='text-white font-sans font-normal text-2xl pr-16 pt-2 hover:underline'>
                            <a href='/record'>
                                Record
                            </a>
                        </li>
                        <li className='text-gray-700 font-sans font-normal text-xl rounded-full bg-white px-5 py-2 hover:bg-gray-200'>
                            <SignOutButton />
                        </li>
                    </ul>
                </div>
            ) : (
                <div className='absolute bg-gray-700 w-full py-8 px-8 flex justify-between'>
                    <a href='/' className='text-white font-sans font-bold text-4xl hover:text-gray-100'>Native Typing</a>
                    <ul className='flex justify-evenly'>
                        <li className='text-white font-sans font-normal text-2xl pr-16 pt-2 hover:underline'>
                            <a href='/guide'>
                                Guide
                            </a>
                        </li>
                        <li className='text-gray-700 font-sans font-normal text-xl rounded-full bg-white px-5 py-2 hover:bg-gray-100'>
                            <SignInButton />
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

function SignInButton() {
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };
    return(
        <button onClick={signInWithGoogle}>
            Sign In
        </button>
    );
}

function SignOutButton() {
    return(
        <button onClick={() => auth.signOut()}>
            Sign Out
        </button>
    );
}

function UserInfo() {
    return(
        <p>
            User Name : {auth.currentUser.displayName}
        </p>
    );
}