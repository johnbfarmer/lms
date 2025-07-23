import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LessonDescription from '@/Components/LessonDescription';
import TopMenu from '@/Components/TopMenu';
import Checkbox from '@/Components/Checkbox';
import { router, Link, Head, useForm } from '@inertiajs/react';
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";

const Edit = ({ auth, origLesson }) => {
    const [lesson, setLesson] = useState(origLesson)
    const { data, setData, post } = useForm({
        lesson: origLesson,
        file: null,
    })

    const title = `Capítulo ${lesson.name}`

    const changeLessonName = (e) => {
        let nm = e.target.value
        let c = { ...lesson }
        c.name = nm
        setLesson(c)
        data.lesson = c
        setData(data)
    }
    const togglePublishLesson = () => {
        let c = { ...lesson }
        c.active = !c.active
        setLesson(c)
        data.lesson = c
        setData(data)
    }
    const deleteLesson = () => {}
    const deleteLessonPage = () => {
        let c = { ...lesson }
        c.lesson_page = ''
        setLesson(c)
        data.lesson = c
        data.file = null
        setData(data)
    }
    const changeLessonText = (e) => {
        let c = { ...lesson }
        c.lesson_text = e.target.value
        setLesson(c)
        data.lesson = c
        setData(data)
    }
    const changeLessonFile = (e) => {
        let c = { ...lesson }
        c.lesson_page = e.target.files[0].name
        setLesson(c)
        data.lesson = c
        data.file = e.target.files[0]
        setData(data)
    }
    const changeLessonDisplayType = (t) => {
        let val = t
        let c = { ...lesson }
        c.lesson_type = val
        setLesson(c)
        data.lesson = c
        setData(data)
    }

    let lessonDisplayTypeSelector = ['text', 'pdf', 'hybrid', 'latex'].map(t => {
        let sel = t === lesson.lesson_type ? 'font-bold' : 'text-slate-500'
        return (
            <div key={t} className={`cursor-pointer text-sm mx-1 ${sel}`} onClick={() => changeLessonDisplayType(t)}>{t}</div>
        )
    })

    const save = () => {
        post(route('lesson.save'))
    }

    let topMenu = (
        <TopMenu auth={auth} title={ title } lessonId={lesson.id} chapterId={lesson.chapter_id} show={['home', 'lesson', 'chapter']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <Head title={title} />
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        <div className="flex items-center"> 
                            <div className=""> Nombre de Lección:</div>
                                <div className="flex items-center mx-2">
                                    <Checkbox
                                        checked={ lesson.active }
                                        onChange={ togglePublishLesson }
                                        className='border border-black border-1'
                                    />
                                    <div className="text-sm ml-1 mr-2">
                                        Publicar
                                    </div>
                                    <FaTrash className="text-base ml-2 cursor-pointer" onClick={deleteLesson} />
                                </div>
                            </div>
                        <div>
                            <input
                                type="text"
                                onChange={changeLessonName}
                                value={lesson.name}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        <div className="flex items-center"> 
                            <div className="text-left"> Contenido:</div>
                            <div className="flex items-center mx-2">
                                { lessonDisplayTypeSelector }
                            </div>
                        </div>
                        <div className="">
                            {
                                lesson.lesson_type !== 'pdf' &&
                                <textarea
                                    rows="15"
                                    onChange={ changeLessonText }
                                    className="w-full"
                                    value={lesson.lesson_text}
                                />
                            }
                            {
                                lesson.lesson_type === 'pdf' && lesson.lesson_page &&
                                <div className="flex flex-row justify-center">
                                    <div>
                                        { lesson.lesson_page }
                                    </div>
                                    <FaTrash className="text-base ml-2 cursor-pointer" onClick={deleteLessonPage} />
                                </div>
                            }
                            {
                                lesson.lesson_type === 'pdf' && !lesson.lesson_page &&
                                <div className="flex flex-row justify-center">
                                    <div>
                                        <input
                                            type="file"
                                            className="w-full"
                                            placeholder="pdf"
                                            onChange={ changeLessonFile }
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8 cursor-pointer" onClick={save}>
                        SAVE
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit;
