import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ShowProblem from '@/Components/ShowProblem';
import TopMenu from '@/Components/TopMenu';
import FeedbackComponent from '@/Components/FeedbackComponent';
import HintComponent from '@/Components/HintComponent';
import EndOfSet from '@/Components/EndOfSet';
import HybridDisplay from '@/Components/HybridDisplay';
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { router, Link, Head } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';

const Index = ({ auth, problems, lesson, answers, hints }) => {
    const [currentProblem, setCurrentProblem] = useState(null)
    const [currentProblemIdx, setCurrentProblemIdx] = useState(-1)
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [showFeedback, setShowFeedback] = useState(false)
    const [points, setPoints] = useState(0)
    const [showHint, setShowHint] = useState(false)
    const [hintsToShow, setHintsToShow] = useState(1)
    const [showEndOfSet, setShowEndOfSet] = useState(false)

    const title = `${ lesson.name } Ejercicios`

    let topMenu = (
        <TopMenu auth={auth} title={ title } lessonId={ lesson.id } problemId={ currentProblem != null ? currentProblem.id : null } show={['home', 'lesson', 'prob-edit', 'prob-add', 'prob-set-edit']} />
    )

    const deleteProblem = () => {
            console.log('tbi')
    }

    const togglePublish = () => {
            console.log('tbi')
    }

    const probList = problems.map((p, k) => {
        if (!p.active) {
            return null
        }
        let problemSection
        if (p.display_type === 'text') {
            problemSection = (
                <div dangerouslySetInnerHTML={{ __html: p.problem_text }} />
            )
        }
        if (p.display_type === 'latex') {
            problemSection = (
                <Latex>{ p.problem_text }</Latex>
            )
        }
        if (p.display_type === 'pdf') {
            problemSection = (
                <iframe src={`/storage/${pageAssets.pdf}.pdf`} style={{width:"900px", height:"1200px"}} frameBorder="0" />
            )
        }
        if (p.display_type === 'hybrid') {
            problemSection = (
                <HybridDisplay content={ p.problem_text } />
            )
        }
        return (
            <div className="flex flex-row justify-space">
                <div className="text-center bg-white p-1 m-2 shadow text-2xl sm:rounded-lg sm:p-2 border border-slate-200">
                    <Link href={ route('problem.show', p.id) }>{ problemSection }</Link>
                </div>
            </div>
        )
    })

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu } >
            <Head title={title} />
            { probList }
        </AuthenticatedLayout>
    )
}

export default Index;
