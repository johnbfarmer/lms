import { useState } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function MultiAnswersComponent(props) {
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [hasAnswered, setHasAnswered] = useState(false)
    const selectAnswer = ( ans ) => {
        let ansrs = [ ...selectedAnswers ]
        let id = ans.id
        let idx = ansrs.indexOf(id)
        if (idx >= 0) {
            ansrs.splice(idx, 1)
        } else {
            ansrs.push(id)
        }
        setSelectedAnswers(ansrs)
    }
    return (
        <>
            <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                <div className="text-center bg-white p-4 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 text-center pt-2 text-base">
                        Select all correct answers then click Submit:
                    </div>
                    <div className="flex">
                    { props.answers.map((r, k) => {
                        let ans = r.answer_text
                        let isSelected = selectedAnswers.indexOf(r.id) >= 0
                        let border = isSelected ? 'border-2 border-slate-400' : ''
                        let bgColor = hasAnswered ? (r.is_correct ? 'bg-green-200' : 'bg-red-200') : 'bg-slate-200'
                        if (!isNaN(ans)) {
                            ans = '$' + ans + '$'
                        }
                        return (
                            <div key={k} className="mx-auto py-16 cursor-pointer" onClick={ () => selectAnswer(r) }>
                                <div className="max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                    <div className={`${ bgColor } ${ border } m-2 p-6 shadow-xl sm:rounded-lg sm:p-4`}>
                                        <Latex>{ ans }</Latex>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            {
                !hasAnswered &&
                <div className="mx-auto w-48 text-center my-6 space-y-6 sm:px-6 lg:px-8 cursor-pointer" onClick={ () => { props.answerSelect(selectedAnswers); setHasAnswered(true)}}>
                    <div className="bg-white p-6 shadow sm:rounded-lg sm:p-4">
                        Submit
                    </div>
                </div>
            }
        </>
    );
}
