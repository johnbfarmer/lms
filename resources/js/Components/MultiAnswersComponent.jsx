import { useState } from 'react';
import AnswerChoice from '@/Components/AnswerChoice';
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
                        Escoge todas las respuestas correctas y luego haz clic en Enviar:
                    </div>
                    <div className="flex justify-center flex-wrap">
                    { props.answers.map((r, k) => {
                        let isSelected = selectedAnswers.indexOf(r.id) >= 0
                        return (
                            <AnswerChoice key={ k } answer={ r } select={ selectAnswer } selected={ isSelected } selectable= { !hasAnswered } />
                        )
                    })}
                    </div>
                </div>
            </div>
            {
                !hasAnswered &&
                <div className="mx-auto w-48 text-center my-6 space-y-6 sm:px-6 lg:px-8 cursor-pointer" onClick={ () => { props.answerSelect(selectedAnswers); setHasAnswered(false)}}>
                    <div className="bg-white p-6 shadow sm:rounded-lg sm:p-4">
                        Enviar
                    </div>
                </div>
            }
        </>
    );
}
