import React from 'react';

export const Guide = () => {
    return(
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <div className='space-y-10 font-sans text-2xl'>
                <div>
                    ・タイピングを始める際には、単語のどこかをクリックしてください。
                </div>
                <div>
                    ・タイピング途中でやり直したい場合は、Retryボタンを押してください。
                </div>
                <div>
                    ・スコアの記録を残したい場合、タイピングが終わった後に出るSendボタンを押してください。
                </div>
                <div>
                    ・Sendボタンを押した場合、Recordページに遷移し、自分の記録を確認できます。
                </div>
                <div>
                    ・Recordページには、色々なユーザーのscoreが高い順にランキング化されています。
                </div>
            </div>
        </div>  
    );
}