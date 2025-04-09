import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, prob, answers, lessonTitle, nextProblemId, nextLessonId }) => {
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [wrongAnswer, setWrongAnswer] = useState(false)

    const title = `${ lessonTitle }`

    const answerSelect = (ans) => {
        if (ans.is_correct) {
            setCorrectAnswer(true)
            setWrongAnswer(false)
        } else {
            setWrongAnswer(true)
            setCorrectAnswer(false)
        }
    }

    const shuffle = (array) => {
        const sortedArr = structuredClone(array);
        for (let i = sortedArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]];
        }
        return sortedArr;
    }

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="">
                            Choose the correct answer

                        </div>
                        { prob.problem_text }
                    </div>
                </div>
            </div>
            <div className="flex">
            { shuffle(answers).map((r, k) => {
                return (
                    <div key={k} className="py-16 cursor-pointer" onClick={ () => answerSelect(r) }>
                        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                            <div className="bg-white p-6 shadow sm:rounded-lg sm:p-4">
                                { r.answer_text }
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            {
                correctAnswer &&
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <div className="bg-green-500 p-4 shadow sm:rounded-lg sm:p-1">
                            right
                        </div>
                    </div>
            }
            {
                wrongAnswer &&
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <div className="bg-red-200 p-4 shadow sm:rounded-lg sm:p-1">
                            nope
                        </div>
                    </div>
            }
            <div className="flex">
                {
                    nextProblemId &&
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <div className="bg-white p-6 shadow sm:rounded-lg sm:p-4">
                            <a href={`/problem/${nextProblemId}`}>next problem</a>
                        </div>
                    </div>
                }
                {
                    nextLessonId &&
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <div className="bg-white p-6 shadow sm:rounded-lg sm:p-4">
                            <a href={`/lesson/${nextLessonId}`}>next lesson</a>
                        </div>
                    </div>
                }
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
