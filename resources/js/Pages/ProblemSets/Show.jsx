import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ShowProblem from '@/Components/ShowProblem';
import TopMenu from '@/Components/TopMenu';
import FeedbackComponent from '@/Components/FeedbackComponent';
import HintComponent from '@/Components/HintComponent';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, problems, lesson, answers, hints }) => {
    console.log(problems, answers, hints)
    const [currentProblem, setCurrentProblem] = useState(null)
    const [currentProblemIdx, setCurrentProblemIdx] = useState(-1)
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [showFeedback, setShowFeedback] = useState(false)
    const [points, setPoints] = useState(0)
    const [showHint, setShowHint] = useState(false)
    const [hintsToShow, setHintsToShow] = useState(1)

    const title = `${ lesson.name } Problems`

    let topMenu = (
        <TopMenu title={ title } lessonId={ lesson.id } show={['home', 'lesson']} />
    )

    const nextProblem = () => {
        let nextIdx = currentProblemIdx + 1
        setCurrentProblemIdx(nextIdx)
        setCurrentProblem(problems[nextIdx])
        setShowFeedback(false)
        setShowHint(false)
    }

    const toggleShowHint = () => {
        setShowFeedback(false)
        setShowHint(!showHint)
    }

    const nextHint = () => {
        setHintsToShow(hintsToShow + 1)
    }

    const handleAnswer = (id, points, msg) => {
        setFeedbackMessage(msg)
        setShowFeedback(true)
        setPoints(points)
    }

    const closeFeedbackModal = () => {
        setShowFeedback(false)
    }

    const closeHintModal = () => {
        setShowHint(false)
    }

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <Head title={title} />
            {
                currentProblem === null && 
                <div className="mx-auto text-center py-16 cursor-pointer" onClick={ nextProblem }>
                        <div className={`bg-white m-2 p-6 shadow-xl sm:rounded-lg sm:p-4`}>
                            START
                        </div>
                </div>
            }
            {
                currentProblem !== null && (
                    <ShowProblem
                        problem={currentProblem}
                        answers={answers[currentProblem.id]}
                        handleAnswer={handleAnswer}
                        showHint={showHint} 
                        hint={toggleShowHint}
                        hintsToShow={hintsToShow}
                        nextHint={nextHint}
                        next={nextProblem}
                    />
                )
            }
            {
                currentProblem !== null && (
                    <FeedbackComponent
                        show={showFeedback}
                        feedback={feedbackMessage}
                        points={points}
                        next={nextProblem}
                        hint={toggleShowHint}
                        onClose={closeFeedbackModal}
                    />
                )
            }
            {
                currentProblem !== null && (
                    <HintComponent
                        show={showHint}
                        hints={hints[currentProblem.id]}
                        next={nextProblem}
                        onClose={closeHintModal}
                        hintsToShow={hintsToShow}
                        nextHint={nextHint}
                    />
                )
            }
        </AuthenticatedLayout>
    )
}

export default Index;
