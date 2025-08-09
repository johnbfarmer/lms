import { useState } from 'react';
import AnswerChoice from '@/Components/AnswerChoice';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function AnswersComponent(props) {
    const [selectedAnswer, setSelectedAnswer] = useState(0)
    const [hasAnswered, setHasAnswered] = useState(props.answered)
    const selectAnswer = ( ans ) => {
        if (!hasAnswered) {
            setSelectedAnswer(ans.id)
            // setHasAnswered(true)
            props.answerSelect(ans)
        }
    }

    return (
        <>
            <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                <div className="text-center bg-white p-4 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 text-center pt-2 text-base">
                        Escoge la respuesta correcta:
                    </div>
                    <div className="flex justify-center flex-wrap">
                    { props.answers.map((r, k) => {
                        return (
                            <AnswerChoice key={ k } answer={ r } select={ selectAnswer } selected={ r.id === selectedAnswer} selectable= { !hasAnswered } />
                        )
                    })}
                    </div>
                </div>
            </div>
        </>
    );
}
