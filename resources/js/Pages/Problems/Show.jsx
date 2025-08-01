import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AnswersComponent from '@/Components/AnswersComponent';
import HybridDisplay from '@/Components/HybridDisplay';
import MultiAnswersComponent from '@/Components/MultiAnswersComponent';
import FeedbackComponent from '@/Components/FeedbackComponent';
import HintComponent from '@/Components/HintComponent';
import ShowProblem from '@/Components/ShowProblem';
import LessonNav from '@/Components/LessonNav';
import ProblemNav from '@/Components/ProblemNav';
import TopMenu from '@/Components/TopMenu';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const Show = ({ auth, prob, answers, hints, lesson, problemIds, lessonIds }) => {
    const [htmlContent, setHtmlContent] = useState(prob.problem_text)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [points, setPoints] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState('right')
    const [showHint, setShowHint] = useState(false)
    const [hintsToShow, setHintsToShow] = useState(1)

    const title = `${ lesson.name }`
console.log(problemIds)
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

    const handleAnswer = (id, points, msg) => {
        setFeedbackMessage(msg)
        setShowFeedback(true)
        setPoints(points)
    }

    const toggleShowHint = () => {
        setShowFeedback(false)
        setShowHint(!showHint)
    }

    const nextHint = () => {
        setHintsToShow(hintsToShow + 1)
    }

    const nextProblem = () => {
        window.location.href = '/problem/' + problemIds.siguiente
    }

    const prevProblem = () => {
        window.location.href = '/problem/' + problemIds.anterior
    }

    const closeFeedbackModal = () => {
        setShowFeedback(false)
    }

    const closeHintModal = () => {
        setShowHint(false)
    }

    let topMenu = (
        <TopMenu auth={auth} title={ title } lessonId={ lesson.id } problemId={ prob.id } neighboringProblems={ problemIds } show={['home', 'lesson', 'prob-set', 'prob-nav', 'prob-edit']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <Head title={ title } />
            <ShowProblem
                problem={prob}
                answers={answers}
                handleAnswer={handleAnswer}
                showHint={showHint} 
                hint={toggleShowHint}
                hintsToShow={hintsToShow}
                nextHint={nextHint}
                totalHints={!hints ? 0 : hints.length}
                next={nextProblem}
                prev={prevProblem}
                // restart={restartProblems}
                hasNextProblem={problemIds.siguiente !== null}
                hasPrevProblem={problemIds.anterior !== null}
            />
            <FeedbackComponent
                show={showFeedback}
                feedback={feedbackMessage}
                points={points}
                next={nextProblem}
                hint={toggleShowHint}
                hasHints={hints != null && hints.length > 0}
                onClose={closeFeedbackModal}
            />
            <HintComponent
                show={showHint}
                hints={hints}
                next={nextProblem}
                onClose={closeHintModal}
                hintsToShow={hintsToShow}
                nextHint={nextHint}
            />
        </AuthenticatedLayout>
    )
}

export default Show;
