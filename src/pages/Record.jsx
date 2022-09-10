import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../firebase';
import { auth } from "../firebase";
import { Error404 } from './Error404';

export const Record = () => {
    const [scores, setScores] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        // データベースからスコアのデータを取得する
        const scoreData = query(collection(db, "scores"), orderBy('score', 'desc'))
        getDocs(scoreData).then((snapShot) => {
            console.log(snapShot.docs.map((doc) => ({ ...doc.data()})));
            setScores(snapShot.docs.map((doc) => ({ ...doc.data() })));
        }) 
    }, []);
    
    return(
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <div className='text-4xl pb-10'>
                - User Score Ranking -
            </div>

                {user ? (
                    <table className='bg-slate-50'>
                        <thead>
                            <tr className='border-b-2 border-black'>
                                <th className='text-xl px-4 py-2'>Rank</th>
                                <th className='text-xl px-4 py-2'>Name</th>
                                <th className='text-xl px-4 py-2'>Score</th>
                                <th className='text-xl px-4 py-2'>Correct Type</th>
                                <th className='text-xl px-4 py-2'>Miss Type</th>
                                <th className='text-xl px-4 py-2'>Accuracy</th>
                                <th className='text-xl px-4 py-2'>Datetime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score, index) => 
                                <tr className='border-b-2 text-center'>
                                    <td className='p-2 text-xl text-gray-700'>
                                        {index + 1}
                                    </td>
                                    <td className='p-2 text-xl text-gray-700'>
                                        {score.name}
                                    </td>
                                    <td className='p-2 text-xl text-gray-700'>
                                        {score.score}
                                    </td>
                                    <td className='p-2 text-xl text-gray-700'>
                                        {score.correct}
                                    </td>
                                    <td className='p-2 text-xl text-gray-700'>
                                        {score.miss}
                                    </td>
                                    <td className='p-2 text-xl text-gray-700'>
                                        {score.accuracy} %
                                    </td>
                                    <td className='p-2 text-xl text-gray-700'>
                                        {score.datetime}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <>
                        <Error404 />
                    </>
                )}
        </div>  
    );
}