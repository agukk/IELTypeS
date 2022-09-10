import React from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

export const ResultModal = ({correctCount, missCount, modalOpen, retryAll, accuracy}) => {
    const [user] = useAuthState(auth);

    const handleRecordSend = () => {
        const typingScoreData = {
            name : auth.currentUser.displayName,
            score : ((correctCount - missCount) * (accuracy / 100)).toFixed(0),
            correct : correctCount,
            miss : missCount,
            accuracy : accuracy,
            datetime : dayjs(Timestamp.now().toDate()).format('YYYY/MM/DD HH:mm:ss')
        }
        // setDocの第３引数には、1つ1つユニークな文字列を生成して、ドキュメントを作成する必要があるため、Math.random().toString(32).substring(2)と記述している
        setDoc(doc(db, "scores", Math.random().toString(32).substring(2)), typingScoreData)
    }

    return(
        <>
            {user ? (
                <div>
                    {modalOpen ? (
                        <div className="fixed top-36 right-0 bottom-0 left-36 pl-80">
                            <div className="relative rounded-lg p-4 w-full max-w-lg h-full md:h-auto">
                                {/* Modal content */}
                                <div className="relative bg-white rounded-lg shadow-2xl">
                                    {/* Modal header */}
                                    <div className="flex justify-center items-center p-10 rounded-t border-b dark:border-gray-600">
                                        <h3 className="text-3xl font-medium">
                                            Score : {((correctCount - missCount) * (accuracy / 100)).toFixed(0)}
                                        </h3>
                                    </div>
                                    {/* Modal body */}
                                    <div className="p-6 space-y-6">
                                        <p className="flex justify-center text-2xl leading-relaxed text-gray-600">
                                            Correct Type : {correctCount}
                                        </p>
                                        <p className="flex justify-center text-2xl leading-relaxed text-gray-600">
                                            Miss Type : {missCount}
                                        </p>
                                        <p className="flex justify-center text-2xl leading-relaxed text-gray-600">
                                            Accuracy : {accuracy} %
                                        </p>
                                    </div>
                                    {/* Modal footer */}
                                    <div className=" flex justify-center pt-5 pb-16 space-x-16">
                                        <button onClick={retryAll} className="bg-indigo-700 hover:bg-indigo-600 shadow-xl font-semibold text-xl text-white py-2 px-3 rounded">
                                            Again
                                        </button>
                                        <Link to='/'>
                                            <button className="bg-indigo-700 hover:bg-indigo-600 shadow-xl font-semibold text-xl text-white py-2 px-3 rounded">
                                                Home
                                            </button>
                                        </Link>
                                        <Link to='/record'>
                                            <button className="bg-indigo-700 hover:bg-indigo-600 shadow-xl font-semibold text-xl text-white py-2 px-3 rounded" 
                                                    onClick={handleRecordSend}>
                                                Record
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div>
                    {modalOpen ? (
                        <div className="fixed top-36 right-0 bottom-0 left-36 pl-80">
                            <div className="relative rounded-lg p-4 w-full max-w-lg h-full md:h-auto">
                                {/* Modal content */}
                                <div className="relative bg-white rounded-lg shadow-2xl">
                                    {/* Modal header */}
                                    <div className="flex justify-center items-center p-10 rounded-t border-b dark:border-gray-600">
                                        <h3 className="text-3xl font-medium">
                                            Score : {((correctCount - missCount) * (accuracy / 100)).toFixed(0)}
                                        </h3>
                                    </div>
                                    {/* Modal body */}
                                    <div className="p-6 space-y-6">
                                        <p className="flex justify-center text-2xl leading-relaxed text-gray-600">
                                            Correct Type : {correctCount}
                                        </p>
                                        <p className="flex justify-center text-2xl leading-relaxed text-gray-600">
                                            Miss Type : {missCount}
                                        </p>
                                        <p className="flex justify-center text-2xl leading-relaxed text-gray-600">
                                            Accuracy : {accuracy} %
                                        </p>
                                    </div>
                                    {/* Modal footer */}
                                    <div className=" flex justify-center pt-5 pb-16 space-x-16">
                                        <button onClick={retryAll} className="bg-indigo-700 hover:bg-indigo-600 shadow-xl font-semibold text-xl text-white py-2 px-3 rounded">
                                            Again
                                        </button>
                                        <Link to='/'>
                                            <button className="bg-indigo-700 hover:bg-indigo-600 shadow-xl font-semibold text-xl text-white py-2 px-3 rounded">
                                                Home
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </>
    );
}