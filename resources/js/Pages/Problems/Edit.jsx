import { useState } from 'react';
import Select from 'react-select';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link, Head } from '@inertiajs/react';
import { FaTrash, FaPlus } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import Checkbox from '@/Components/Checkbox';
import ShowProblem from '@/Components/ShowProblem';
import TopMenu from '@/Components/TopMenu';
import CourseSelect from '@/Components/CourseSelect';
import FeedbackComponent from '@/Components/FeedbackComponent';
import HintComponent from '@/Components/HintComponent';
import InputError from '@/Components/InputError';
import ImageGalleryComponent from '@/Components/ImageGalleryComponent';
import { handleFraction } from '@/Helpers/Utilities';

const Edit = ({ auth, origProblem, origAnswers, origHints, courses, origCourseId, origChapterId, origLessonId }) => {
    const [probTxt, setProbTxt] = useState(origProblem.problem_text)
    const [problem, setProblem] = useState(origProblem)
    const [answers, setAnswers] = useState(origAnswers)
    const [hints, setHints] = useState(origHints || [])
    const [courseId, setCourseId] = useState(origCourseId)
    const [chapterId, setChapterId] = useState(origChapterId)
    const [lessonId, setLessonId] = useState(origLessonId)
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [showFeedback, setShowFeedback] = useState(false)
    const [points, setPoints] = useState(0)
    const [showHint, setShowHint] = useState(false)
    const [showGallery, setShowGallery] = useState(false)
    const [hintsToShow, setHintsToShow] = useState(1)
    const { data, setData, post, errors } = useForm({
        problem: problem,
        answers: answers,
        hints: hints || [],
        lessonId: lessonId
    })

    const title = 'id' in problem ?`${ problem.id }` : 'New Problem'

    const nextProblem = () => {
        setProblem(problem)
        setShowFeedback(false)
        setShowHint(false)
    }
    const prevProblem = () => {
        setProblem(problem)
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

    const closeGalleryModal = () => {
        setShowGallery(false)
    }

    const chgProbTxt = (e) => {
        let txt = e.target.value
        setProbTxt(txt)
        let prob = {...problem}
        prob.problem_text = txt
        setProblem(prob)
        data.problem = prob
        setData(data)
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

    const chgAnsCorrect = (e, k) => {
        let txt = e.target.value
        let a = [...answers]
        a[k].is_correct = !a[k].is_correct
        setAnswers(a)
        data.answers = a
        setData(data)
    }

    const addAns = () => {
        let a = [...answers]
        a.push({problem_id: problem.id, sequence_id: (a.length + 1) * 10, answer_text:'', is_correct: 0, display_type: 'latex'})
        setAnswers(a)
        data.answers = a
        setData(data)
    }

    const delAns = (e, k) => {
        let a = [...answers]
        a.splice(k, 1)
        setAnswers(a)
        data.answers = a
        setData(data)
    }

    const chgHintTxt = (e, k) => {
        let txt = e.target.value
        let h = [...hints]
        h[k].hint = txt
        setHints(h)
        data.hints = h
        setData(data)
    }

    const addHint = () => {
        let h = [...hints]
        h.push({problem_id: problem.id, sequence_id: (h.length + 1) * 10, hint:''})
        setHints(h)
        data.hints = h
        setData(data)
    }

    const delHint = (e, k) => {
        let h = [...hints]
        h.splice(k, 1)
        setHints(h)
        data.hints = h
        setData(data)
    }

    const save = () => {
        post(route('problem.save'), {data: data})
    }

    const selectCourse = (e) => {
        setCourseId(e.value)
    }

    const selectChapter = (e) => {
        setChapterId(e.value)
    }

    const selectLesson = (e) => {
        setLessonId(e.value)
        let p = { ...problem }
        p.lesson_id = e.value
        setProblem(p)
        data.problem = p
        setData(data)
    }

    const changeProblemDisplayType = (t) => {
        let p = { ...problem }
        p.display_type = t
        setProblem(p)
        data.problem = p
        setData(data)
    }

    const changeProblemType = (t) => {
        let p = { ...problem }
        p.problem_type_id = t
        setProblem(p)
        data.problem = p
        setData(data)
    }

    const togglePublish = () => {
        let p = { ...problem }
        // console.log(p.active)
        p.active = !p.active
        setProblem(p)
        data.problem = p
        setData(data)
    }

    const toggleShowGallery = () => {
        setShowGallery(!showGallery)
    }

    const deleteProblem = () => {
        if (confirm('Really delete this problem?')) {
            console.log('mkay')
        }
    }

    let topMenu = (
        <TopMenu auth={auth} title={ title } lessonId={lessonId} problemId={problem.id} show={['home', 'prob-set', 'prob-add', 'prob-dup']} />
    )

    let problemDisplayTypeSelector = ['latex', 'text', 'hybrid'].map(t => {
        let sel = t === problem.display_type ? 'font-bold' : 'text-slate-500'
        return (
            <div key={t} className={`cursor-pointer text-sm mx-1 ${sel}`} onClick={() => changeProblemDisplayType(t)}>{t}</div>
        )
    })

    let problemTypeSelector = ['single MC', 'multiple MC', 'text', 'numeric'].map((t,k) => {
        let key = k + 1
        let sel = key === problem.problem_type_id ? 'font-bold' : 'text-slate-500'
        return (
            <div key={t} className={`cursor-pointer text-sm mx-1 ${sel}`} onClick={() => changeProblemType(key)}>{t}</div>
        )
    })

console.log(errors)
    let errMsg = ''
    for (let i in errors) {
        errMsg = errMsg + errors[i]
console.log(errMsg)
    }

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="flex items-center"> 
                        <div className=""> Question:</div>
                        <div className="flex items-center mx-2">
                            {problemDisplayTypeSelector}
                        </div>
                        <div className="flex items-center mx-2">
                            {problemTypeSelector}
                        </div>
                        <div className="flex items-center mx-2">
                            <Checkbox
                                checked={ problem.active }
                                onChange={ togglePublish }
                                className='border border-black border-1'
                            />
                            <div className="text-sm ml-1 mr-2">
                                Publicar
                            </div>

                            <GrGallery className="text-base mx-2 cursor-pointer" onClick={toggleShowGallery} title="galería de imágenes"/>
                            <FaTrash className="text-base ml-2 cursor-pointer" onClick={deleteProblem} title="borrar problema"/>
                        </div>
                    </div>
                        <input
                            type="text"
                            onChange={chgProbTxt}
                            value={probTxt}
                            className="w-full"
                        />
                    </div>
                    <InputError message={ errMsg } className="mt-2" />
                </div>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="flex items-center"> Answers: <FaPlus className="text-base ml-2 cursor-pointer" onClick={addAns} /></div>
                    {
                        answers.map((a, k) => {
                            let ansTxt = a.answer_text
                            let isRight =  a.is_correct 
                            return (
                                <div key={k} className="flex">
                                <input
                                    key={k}
                                    type="text"
                                    onChange={(e) => chgAnsTxt(e, k)}
                                    value={ansTxt}
                                    className="w-full"
                                />
                                <Checkbox
                                    checked={ isRight }
                                    onChange={(e) => chgAnsCorrect(e, k)}
                                    className='border border-black border-1'
                                />
                                <FaTrash className="text-base ml-2 cursor-pointer" onClick={(e) => delAns(e, k)} />
                                </div>
                            )

                        })
                    }
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="flex items-center"> Hints: <FaPlus className="text-base ml-2 cursor-pointer" onClick={addHint} /></div>
                    {
                        hints.map((h, k) => {
                            let hintTxt = h.hint
                            return (
                                <div key={`hnt_${k}`} className="flex">
                                <input
                                    key={k}
                                    type="text"
                                    onChange={(e) => chgHintTxt(e, k)}
                                    value={hintTxt}
                                    className="w-full"
                                />
                                <FaTrash className="text-base ml-2 cursor-pointer" onClick={(e) => delHint(e, k)} />
                                </div>
                            )

                        })
                    }
                    </div>
                </div>
            </div>
            <div className="py-2">
                <input
                    type="file"
                    onChange={() => {}}
                    className="w-full"
                    placeholder="upload image..."
                />
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8 cursor-pointer" onClick={save}>
                        SAVE
                    </div>
                </div>
            </div>
            {
                problem !== null && (
                    <ShowProblem
                        problem={problem}
                        answers={answers}
                        handleAnswer={handleAnswer}
                        showHint={showHint} 
                        hint={toggleShowHint}
                        totalHints={hints.length}
                        hintsToShow={hintsToShow}
                        nextHint={nextHint}
                        next={() => {}}
                        prev={() => {}}
                        hasNextProblem={false}
                        hasPrevProblem={false}
                    />
                )
            }
            {
                problem !== null && (
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
                problem !== null && (
                    <HintComponent
                        show={showHint}
                        hints={hints}
                        next={nextProblem}
                        onClose={closeHintModal}
                        hintsToShow={hintsToShow}
                        nextHint={nextHint}
                    />
                )
            }
            <ImageGalleryComponent
                show={showGallery}
                onClose={closeGalleryModal}
                courseId={courseId}
            />
            <CourseSelect
                courses={courses}
                selected={courseId}
                onSelectCourse={selectCourse}
                onSelectChapter={selectChapter}
                onSelectLesson={selectLesson}
                chapterId={chapterId}
                lessonId={lessonId}
            />
        </AuthenticatedLayout>
    )
}

export default Edit;
