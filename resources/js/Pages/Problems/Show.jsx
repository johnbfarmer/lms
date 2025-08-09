import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AnswersComponent from '@/Components/AnswersComponent';
import HybridDisplay from '@/Components/HybridDisplay';
import FeedbackComponent from '@/Components/FeedbackComponent';
import HintComponent from '@/Components/HintComponent';
import ShowProblem from '@/Components/ShowProblem';
import LessonNav from '@/Components/LessonNav';
import ProblemNav from '@/Components/ProblemNav';
import TopMenu from '@/Components/TopMenu';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { buildBreadCrumbs } from '@/Helpers/Utilities';

const Show = ({ auth, prob, answers, hints, lesson, course, chapter, problemIds, lessonIds, numberCorrect, score}) => {
    const [htmlContent, setHtmlContent] = useState(prob.problem_text)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [points, setPoints] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState('right')
    const [showHint, setShowHint] = useState(false)
    const [hintsToShow, setHintsToShow] = useState(1)
    const title = `${ lesson.name }`

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

    const breadcrumbs = buildBreadCrumbs({course, chapter}, 3)
    let topMenu = (
        <TopMenu 
            auth={auth}
            title={ title }
            lessonId={lesson.id}
            problemId={prob.id}
            show={['home', 'prob-set', 'prob-add', 'prob-dup', 'prob-edit']}
            breadcrumbs={ breadcrumbs }
        />
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
                numberCorrect={numberCorrect}
                answered={score !== null}
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
                hasNextProblem={problemIds.siguiente !== null}
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
