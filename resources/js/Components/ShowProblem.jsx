import { useState, useEffect } from 'react';
import { PiSteps } from "react-icons/pi";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import AnswersComponent from '@/Components/AnswersComponent';
import HybridDisplay from '@/Components/HybridDisplay';
import MultiAnswersComponent from '@/Components/MultiAnswersComponent';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function ShowProblem(props) {
    const [htmlContent, setHtmlContent] = useState(props.problem.problem_text)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [points, setPoints] = useState(null)
    const [feedbackMessage, setFeedbackMessage] = useState('right')

    const multiAnswerSelect = (ans) => {
        let score = 0, total = props.answers.length
        props.answers.forEach(r => {
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
        let msg = ('you scored ' + score + ' out of ' + total + ' for ' + pts + '%')
        fetch(route('results.recordanswer', { id: props.problem.id, answers: ans, score: pts }))
        props.handleAnswer(props.problem.id, pts, msg)
    }

    const answerSelect = (ans) => {
        let pts, msg
        if (ans.is_correct) {
            pts = 100
             msg = ('Correct!')
        } else {
            pts = 0
             msg = ('Not quite!')
        }
        // setHasAnswered(true)
        setPoints(pts)
        fetch(route('results.recordanswer', { id: props.problem.id, answers: [ans.id], score: pts} ))
        props.handleAnswer(props.problem.id, pts, msg)
    }

    let problemSection, answerComponent, answersType = 'latex'

    console.log(props.totalHints)
    console.log(props)

    let disabled = props.totalHints <= 0
    let colr = disabled ? 'text-slate-400' : ''
    let pointer = disabled ? '' : 'cursor-pointer'
    let clik = disabled ? () => {} : props.hint
    let hintLink = <PiSteps className={`${pointer} ${colr}`} onClick={clik} title="show the steps" />

    colr = props.hasNextProblem ? '' : 'text-slate-400'
    pointer = props.hasNextProblem ? 'cursor-pointer' : ''
    clik = props.hasNextProblem ? props.next : () => {}
    let nextLink = props.hints === null ? '' : <MdNavigateNext className={`${pointer} ${colr}`} onClick={clik} title="next problem" />

    colr = props.hasPrevProblem ? '' : 'text-slate-400'
    pointer = props.hasPrevProblem ? 'cursor-pointer' : ''
    clik = props.hasPrevProblem ? props.prev : () => {}
    let prevLink = props.hints === null ? '' : <MdNavigateBefore className={`${pointer} ${colr}`} onClick={clik} title="previous problem" />

    if (props.problem.display_type === 'text') {
        problemSection = (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )
    }
    if (props.problem.display_type === 'latex') {
        problemSection = (
            <Latex>{ props.problem.problem_text }</Latex>
        )
    }
    if (props.problem.display_type === 'pdf') {
        problemSection = (
            <iframe src={`/storage/${pageAssets.pdf}.pdf`} style={{width:"900px", height:"1200px"}} frameBorder="0" />
        )
    }
    if (props.problem.display_type === 'hybrid') {
        problemSection = (
            <HybridDisplay content={ props.problem.problem_text } />
        )
    }

    if (props.problem.problem_type_id === 1) {
        answerComponent = (
            <AnswersComponent answers={ props.answers } answerSelect={ answerSelect } />
        )
    }
    if (props.problem.problem_type_id === 2) {
        answerComponent = (
            <MultiAnswersComponent answers={ props.answers } answerSelect={ multiAnswerSelect } />
        )
    }
    return (
        <div className="py-2" >
            <div className="mx-auto max-w-7xl space-y-1 sm:px-6 lg:px-8">
                <div className="bg-white px-4 shadow sm:rounded-lg sm:px-8 sm:py-2">
                    { hintLink }
                    { nextLink }
                    { prevLink }
                    <div className="py-2">
                        <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                            <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                                { problemSection }
                            </div>
                        </div>
                    </div>
                    { answerComponent }
                </div>
            </div>
        </div>
    );
}
