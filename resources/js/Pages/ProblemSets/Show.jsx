import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ShowProblem from '@/Components/ShowProblem';
import TopMenu from '@/Components/TopMenu';
import FeedbackComponent from '@/Components/FeedbackComponent';
import HintComponent from '@/Components/HintComponent';
import EndOfSet from '@/Components/EndOfSet';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, problems, lesson, answers, hints }) => {
    const [currentProblem, setCurrentProblem] = useState(null)
    const [currentProblemIdx, setCurrentProblemIdx] = useState(-1)
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [showFeedback, setShowFeedback] = useState(false)
    const [points, setPoints] = useState(0)
    const [showHint, setShowHint] = useState(false)
    const [hintsToShow, setHintsToShow] = useState(1)
    const [showEndOfSet, setShowEndOfSet] = useState(false)

    const handleKeyDown = (event) => {
        console.log('Key pressed:', event.key, 'idx: ', currentProblemIdx);
        switch(event.key) {
            case 'n':
            case 'ArrowRight':
                nextProblem()
                break
            case 'ArrowLeft':
            case 'p':
                prevProblem()
                break
            case 'Enter':
                console.log('enter')
            default:
                // nothing
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const title = `${ lesson.name } Ejercicios`

    let topMenu = (
        <TopMenu auth={auth} title={ title } lessonId={ lesson.id } problemId={ currentProblem != null ? currentProblem.id : null } show={['home', 'lesson', 'prob-edit']} />
    )

    const toggleEndOfSet = () => {
        // console.log('toggleEndOfSet')
        setShowEndOfSet(!showEndOfSet)
    }

    const closeEndOfSet = () => {
        setShowEndOfSet(false)
    }

    const nextProblem = () => {
        // console.log(currentProblemIdx)
        if (problems.length <= currentProblemIdx + 1) {
            setCurrentProblem(null)
            return toggleEndOfSet()
        }
        let nextIdx = currentProblemIdx + 1
        setCurrentProblemIdx(nextIdx)
        setCurrentProblem(problems[nextIdx])
        setShowFeedback(false)
        setShowHint(false)
        setHintsToShow(1)
    }

    const prevProblem = () => {
        // console.log(currentProblemIdx)
        let prevIdx = Math.max(currentProblemIdx - 1, 0)
        // console.log('why doesnt work')
        setCurrentProblemIdx(prevIdx)
        setCurrentProblem(problems[prevIdx])
        // console.log(problems[prevIdx])
        setShowFeedback(false)
        setShowHint(false)
        setHintsToShow(1)
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
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu } onKeyDown={handleKeyDown}>
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
                        totalHints={!hints[currentProblem.id] ? 0 : hints[currentProblem.id].length}
                        next={nextProblem}
                        prev={prevProblem}
                        hasNextProblem={true}
                        hasPrevProblem={currentProblemIdx > 0}
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
                        hasHints={hints[currentProblem.id] != null && hints[currentProblem.id].length > 0}
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
            <EndOfSet show={showEndOfSet} onClose={closeEndOfSet}/>
        </AuthenticatedLayout>
    )
}

export default Index;
