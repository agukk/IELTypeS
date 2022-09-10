import React, { useEffect, useState } from 'react';
import { ResultModal } from '../modal/ResultModal';

export const Start = () => {
    // タイピングする単語
    let words = 
    [
        "come clean", "sloppy", "black and white", "ancient", "slack off",
        "freebie", "clear-cut", "fiddly", "downtime", "get it",
        "legit", "hyped", "attention-seeking", "get into", "cut corners",
        "big deal", "on the dot", "pricey", "touchy subject", "one-off",
        "rusty", "in-your-face", "downer", "packed", "old-school",
        "sick of", "white noise", "tricky", "slammed", "tell me about it",
        "take it easy", "chill", "on the same page", "give credit", "loaded",
        "cutting-edge", "chill out", "roughly", "selling point", "party animal",
        "wordy", "surefire", "up in the air", "worth a shot", "sharp",
        "burning desire", "face-time", "jump the gun", "fishy", "broken record"
    ];

    const [typingString, setTypingString] = useState(""); 
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [isMisstype, setIsMisstype] = useState(false);
    const [missCount, setMissCount] = useState(0);
    const [finish, setFinish] = useState(false); 
    const [modalOpen, setModalOpen] = useState(false);
    const [retry, setRetry] = useState("");

    useEffect(() => {
        let ts = '';
        for (let i = 0; i < 10; i++) {
            let word = words[Math.floor(Math.random() * words.length)];
            ts += word + ' '
        }
        let newTypingString = ts.slice(0,-1)
        setTypingString(newTypingString);
        // eslint-disable-next-line
    },[retry]);

    const handleKeyDown = (e) => {
        if (finish) return;
        if (e.key === typingString[currentIndex]) {
            setIsMisstype(false);
            setCurrentIndex(currentIndex + 1);
            if (currentIndex+1 >= typingString.length) {
                setFinish(true);
                setModalOpen(true);
            }
        } else {
            setIsMisstype(true);
            setMissCount(missCount + 1)
        }
    }

    const retryAll = () => {
        setCurrentIndex(0);
        setIsMisstype(false);
        setMissCount(0);
        setFinish(false);
        setModalOpen(false);
        setRetry(Math.random());
    }

    const accuracy = (currentIndex / (currentIndex + missCount) * 100).toFixed(1)

    return(
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            {/* タイピングをするための中心的な実装 */}
            <div onKeyDown={(e) => handleKeyDown(e)} tabIndex={0} className='text-5xl font-serif p-24 cursor-pointer'>
                <span className='text-green-500'>
                    {typingString.slice(0, currentIndex)}
                </span>
                {isMisstype ? (
                    <span className='text-red-500 bg-slate-100'>
                        {typingString[currentIndex]}
                    </span>
                ) : (
                    <span className='bg-slate-100'>
                        {typingString[currentIndex]}
                    </span>
                )}
                <span className='text-gray-500'>
                    {typingString.slice(currentIndex + 1, typingString.length)}
                </span>
            </div>
            {/* ここまで */}
            <div className='font-light text-2xl space-x-12'>
                <span>CorrectType : { currentIndex }</span>
                <span>MissType : { missCount }</span>
                <span>Accuracy : { accuracy } %</span>
            </div>
            <div className='pt-24'>
                <button onClick={retryAll} className="bg-indigo-700 hover:bg-indigo-600 shadow-xl font-semibold text-2xl text-white py-2 px-4 rounded">
                    Retry
                </button>
            </div>
            <ResultModal 
            correctCount={currentIndex}
            missCount={missCount}
            modalOpen={modalOpen}
            retryAll={retryAll}
            accuracy={accuracy} 
            />
        </div>
        );
}