import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link, Head } from '@inertiajs/react';
import AnswersComponent from '@/Components/AnswersComponent';
import MultiAnswersComponent from '@/Components/MultiAnswersComponent';
import FeedbackComponent from '@/Components/FeedbackComponent';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const Index = ({ auth, prob, answers, lessonTitle, nextProblemId, nextLessonId }) => {
    const [htmlContent, setHtmlContent] = useState(prob.problem_text)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [points, setPoints] = useState(null)
    const [feedbackMessage, setFeedbackMessage] = useState('right')
    const { data, setData, post, processing, reset, errors } = useForm(prob)

    const title = `${ lessonTitle }`

    const multiAnswerSelect = (ans) => {
        let score = 0, total = answers.length
        answers.forEach(r => {
            let didSubmit = ans.indexOf(r.id) >= 0
            if (r.is_correct) {
                if (didSubmit) {
                    score++;
                }
            } else {
                if (!didSubmit) {
                    score++;
                }
            }
        })
        let pts = Math.floor(0.5 + 100 * score/total) / 100
        setPoints(pts)
        setHasAnswered(true)
        setFeedbackMessage('you scored ' + score + ' out of ' + total + ' for ' + pts + ' points')
        post(route('results.recordanswer', { answers: ans }));
    }

    const answerSelect = (ans) => {
        if (ans.is_correct) {
            setPoints(1)
            setFeedbackMessage('Correct!')
        } else {
            setPoints(0)
            setFeedbackMessage('Not quite!')
        }
        setHasAnswered(true)
        post(route('results.recordanswer', { answers: [ans.id] }));
    }

    const shuffle = (array) => {
        const sortedArr = structuredClone(array);
        for (let i = sortedArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]];
        }
        return sortedArr;
    }

    let problemSection, answerComponent, answersType = 'latex'

    if (prob.display_type === 'text') {
        problemSection = (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )
    }
    if (prob.display_type === 'latex') {
        problemSection = (
            <Latex>{ prob.problem_text }</Latex>
        )
    }
    if (prob.display_type === 'pdf') {
        problemSection = (
            <iframe src={`/storage/${pageAssets.pdf}.pdf`} style={{width:"900px", height:"1200px"}} frameBorder="0" />
        )
    }

    if (prob.problem_type_id === 1) {
        answerComponent = (
            <AnswersComponent answers={ answers } answerSelect={ answerSelect } />
        )
    }
    if (prob.problem_type_id === 2) {
        answerComponent = (
            <MultiAnswersComponent answers={ answers } answerSelect={ multiAnswerSelect } />
        )
    }

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            <div className="py-12">
                <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-4 shadow text-2xl sm:rounded-lg sm:p-8">
                        { problemSection }
                    </div>
                </div>
            </div>
            { answerComponent }
            {
                points !== null &&
                    <FeedbackComponent feedback={ feedbackMessage } points={points} />
            }
            <div className="flex py-12">
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
