import { useState } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function AnswersComponent(props) {
    const [selectedAnswer, setSelectedAnswer] = useState(0)
    const [hasAnswered, setHasAnswered] = useState(false)
    const selectAnswer = ( ans ) => {
        if (!hasAnswered) {
            setSelectedAnswer(ans.id)
            setHasAnswered(true)
            props.answerSelect(ans)
        }
    }
    return (
        <>
            <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                <div className="text-center bg-white p-4 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 text-center pt-2 text-base">
                        Choose the correct answer:
                    </div>
                    <div className="flex justify-center">
                    { props.answers.map((r, k) => {
                        let ans = r.answer_text
                        if (!isNaN(ans)) {
                            ans = '$' + ans + '$'
                        }                
                        let border = selectedAnswer == r.id ? 'border-2 border-slate-400' : ''
                        let cursor = !hasAnswered ? 'cursor-pointer' : ''
                        return (
                            <div key={k} className={`py-16 ${ cursor }`} onClick={ () => selectAnswer(r) } >
                                <div className="max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                    <div className={`bg-white ${ border } m-2 p-6 shadow-xl sm:rounded-lg sm:p-4`}>
                                        <Latex>{ ans }</Latex>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </>
    );
}
