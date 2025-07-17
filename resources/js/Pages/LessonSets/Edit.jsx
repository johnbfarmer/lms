import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LessonDescription from '@/Components/LessonDescription';
import TopMenu from '@/Components/TopMenu';
import Checkbox from '@/Components/Checkbox';
import { router, Link, Head, useForm } from '@inertiajs/react';
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";

const Edit = ({ auth, origLessons, origChapter }) => {
    const [chapter, setChapter] = useState(origChapter)
    const [lessons, setLessons] = useState(origLessons)
    const { data, setData, post } = useForm({
        chapter: origChapter,
        lessons: origLessons,
        deletedLessons: [],
    })

    const title = `Capítulo ${chapter.name}`

    const changeChapterName = () => {}
    const togglePublishChapter = () => {}
    const deleteChapter = () => {}
    const changeLessonName = () => {}
    const deleteLesson = () => {}
    const addLesson = () => {}

    let topMenu = (
        <TopMenu auth={auth} title={ title } chapterId={chapter.id} show={['home', 'course', 'chapter']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <Head title={title} />
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        <div className="flex items-center"> 
                            <div className=""> Nombre del Capítulo:</div>
                                <div className="flex items-center mx-2">
                                    <Checkbox
                                        checked={ chapter.active }
                                        onChange={ togglePublishChapter }
                                        className='border border-black border-1'
                                    />
                                    <div className="text-sm ml-1 mr-2">
                                        Publicar
                                    </div>
                                    <FaTrash className="text-base ml-2 cursor-pointer" onClick={deleteChapter} />
                                </div>
                            </div>
                        <div>
                            <input
                                type="text"
                                onChange={changeChapterName}
                                value={chapter.name}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        <div className="flex items-center"> Lecciones: <FaPlus className="text-base ml-2 cursor-pointer" onClick={addLesson} /></div>
                        {
                            lessons.map ((c,k) => {
                                let lessonName = c.name
                                return (
                                    <div key={k} className="flex">
                                    <input
                                        key={k}
                                        type="text"
                                        onChange={(e) => changeLessonName(e, k)}
                                        value={lessonName}
                                        className="w-full"
                                    />
                                    <Checkbox
                                        checked={ c.active }
                                        onChange={(e) => togglePublishChapter(e, k)}
                                        className='border border-black border-1'
                                    />
                                    <div className="text-sm ml-1 mr-2">
                                        P
                                    </div>
                                    <a href={`/lesson/${c.id}/edit`}>
                                        <FaPencilAlt className="text-base ml-2" />
                                    </a>
                                    <FaTrash className="text-base ml-2 cursor-pointer" onClick={(e) => deleteLesson(e, k)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit;
