import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link, Head } from '@inertiajs/react';
import AnswersComponent from '@/Components/AnswersComponent';
import HybridDisplay from '@/Components/HybridDisplay';
import MultiAnswersComponent from '@/Components/MultiAnswersComponent';
import FeedbackComponent from '@/Components/FeedbackComponent';
import LessonNav from '@/Components/LessonNav';
import ProblemNav from '@/Components/ProblemNav';
import TopMenu from '@/Components/TopMenu';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const Index = ({ auth, prob, answers, lesson, problemIds, lessonIds }) => {
    const [htmlContent, setHtmlContent] = useState(prob.problem_text)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [points, setPoints] = useState(null)
    const [feedbackMessage, setFeedbackMessage] = useState('right')
    // const { data, setData, post, processing, reset, errors } = useForm(prob)

    const title = `${ lesson.name }`

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
        let pts = Math.floor(0.5 + 100 * (100 * score/total)) / 100
        setPoints(pts)
        setHasAnswered(true)
        setFeedbackMessage('you scored ' + score + ' out of ' + total + ' for ' + pts + '%')
        fetch(route('results.recordanswer', { id: prob.id, answers: ans, score: pts }))
    }

    const answerSelect = (ans) => {
        let pts
        if (ans.is_correct) {
            pts = 100
            setFeedbackMessage('Correct!')
        } else {
            pts = 0
            setFeedbackMessage('Not quite!')
        }
        setHasAnswered(true)
        setPoints(pts)
        fetch(route('results.recordanswer', { id: prob.id, answers: [ans.id], score: pts} ))
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
    if (prob.display_type === 'hybrid') {
        problemSection = (
            <HybridDisplay content={ prob.problem_text } />
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

    let topMenu = (
        <TopMenu title={ title } lessonId={ lesson.id }  neighboringProblems={ problemIds } show={['home', 'lesson', 'prob-set', 'prob-nav']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <Head title={ title } />
            <div className="py-2">
                <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        { problemSection }
                    </div>
                </div>
            </div>
            { answerComponent }
            {
                points !== null &&
                    <FeedbackComponent feedback={ feedbackMessage } points={points} />
            }
            <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                <div className="p-4 text-base sm:rounded-lg sm:p-1">
                    <LessonNav neighbors={ lessonIds } lesson={ lesson } showLessonLink={ true } />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
