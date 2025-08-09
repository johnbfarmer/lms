import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { handleFraction } from '@/Helpers/Utilities';

export default function OpenAnswerComponent(props) {
    const [answer, setAnswer] = useState('')
    const [hasAnswered, setHasAnswered] = useState(false)

    const validateAnswer = (e) => {
        let ans = e.target.value
        setAnswer(handleFraction(ans))
    }

    const chgAnsTxt = (e, k) => {
        let txt = e.target.value
        if (problem.problem_type_id === 4) {
            txt = handleFraction(txt)
        }
        let a = [...answers]
        a[k].answer_text = txt
        setAnswers(a)
        data.answers = a
        setData(data)
    }
    return (
        <>
            <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                <div className="text-center bg-white p-4 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="mt-4">
                        <InputLabel htmlFor="myAnswer" value="Tecla la respuesta:" />

                        <TextInput
                            id="myAnswer"
                            type="text"
                            name="myAnswer"
                            value={answer}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setAnswer(e.target.value)}
                            onBlur={validateAnswer}
                            disabled={hasAnswered}
                            onKeyDown={e => {if (e.key === 'Enter') {props.answerSelect(answer); setHasAnswered(false)}}}
                        />

                        <InputError message='' className="mt-2" />
                    </div>
                </div>
            </div>
            {
                !hasAnswered &&
                <div className="mx-auto w-48 text-center my-6 space-y-6 sm:px-6 lg:px-8 cursor-pointer" onClick={ () => { props.answerSelect(answer); setAnswer(''); setHasAnswered(true)}}>
                    <div className="bg-white p-6 shadow sm:rounded-lg sm:p-4">
                        Submit
                    </div>
                </div>
            }
        </>
    );
}
