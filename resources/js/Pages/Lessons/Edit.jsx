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
    })

    const title = `Capítulo ${lesson.name}`

    const changeChapterName = () => {}
    const togglePublishChapter = () => {}
    const deleteChapter = () => {}
    const changeLessonName = () => {}
    const deleteLesson = () => {}
    const addLesson = () => {}
    const changeLessonText = () => {}
    const changeLessonDisplayType = () => {}

    let lessonDisplayTypeSelector = ['text', 'pdf', 'hybrid', 'latex'].map(t => {
        let sel = t === lesson.lesson_type ? 'font-bold' : 'text-slate-500'
        return (
            <div key={t} className={`cursor-pointer text-sm mx-1 ${sel}`} onClick={() => changeLessonDisplayType(t)}>{t}</div>
        )
    })

    console.log(lesson)

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
                                        onChange={ togglePublishChapter }
                                        className='border border-black border-1'
                                    />
                                    <div className="text-sm ml-1 mr-2">
                                        Publish
                                    </div>
                                    <FaTrash className="text-base ml-2 cursor-pointer" onClick={deleteChapter} />
                                </div>
                            </div>
                        <div>
                            <input
                                type="text"
                                onChange={changeChapterName}
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
                        <div>
                            <textarea
                                rows="15"
                                onChange={ changeLessonText }
                                className="w-full"
                                value={lesson.lesson_text}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit;
