import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseComponent from '@/Components/CourseComponent';
import TopMenu from '@/Components/TopMenu';
import Checkbox from '@/Components/Checkbox';
import { router, Link, Head, useForm } from '@inertiajs/react';
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";

const Index = ({ auth, origCourse, origChapters }) => {
    const [course, setCourse] = useState(origCourse)
    const [chapters, setChapters] = useState(origChapters)
    const { data, setData, post } = useForm({
        course: origCourse,
        chapters: origChapters,
        deletedChapters: [],
    })

    const title = 'Cursos'

    let topMenu = (
        <TopMenu auth={auth} title={ title } courseId={course.id} show={['home', 'course', 'course-add']} />
    )

    const deleteCourse = () => {
        if (confirm('Really delete this course?')) {
            console.log('mkay')
        }
    }

    const togglePublishCourse = () => {
        let c = { ...course }
        c.active = !c.active
        setCourse(c)
        data.course = c
        setData(data)
    }

    const changeCourseName = (e) => {
        let nm = e.target.value
        let c = { ...course }
        c.name = nm
        setCourse(c)
        data.course = c
        setData(data)
    }

    const changeCourseShortName = (e) => {
        let nm = e.target.value
        let c = { ...course }
        c.short_name = nm
        setCourse(c)
        data.course = c
        setData(data)
    }

    const changeCourseDescription = (e) => {
        let d = e.target.value
        let c = { ...course }
        c.description = d
        setCourse(c)
        data.course = c
        setData(data)
    }

    const addChapter = () => {
        let c = [...chapters]
        c.push({course_id: course.id, sequence_id: (c.length + 1) * 10, name:'', active: 0})
        setChapters(c)
        data.chapters = c
        setData(data)
    }

    const changeChapterName = (e, k) => {
        let nm = e.target.value
        let c = [...chapters]
        c[k].name = nm
        c[k].changed = true
        setChapters(c)
        data.chapters = c
        setData(data)
    }

    const deleteChapter = (e, k) => {
        let c = [...chapters]
        let r = c.splice(k, 1)
        setChapters(c)
        data.chapters = c
        data.deletedChapters.push(r[0].id)
        setData(data)
    }

    const togglePublishChapter = (e, k) => {
        let c = [ ...chapters ]
        c[k].active = !c[k].active
        c[k].changed = true
        setChapters(c)
        data.chapters = c
        setData(data)
    }

    const save = () => {
        post(route('course.save'), {data: data})
    }

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        <div className="flex items-center"> 
                            <div className=""> Nombre del Curso:</div>
                                <div className="flex items-center mx-2">
                                    <Checkbox
                                        checked={ course.active }
                                        onChange={ togglePublishCourse }
                                        className='border border-black border-1'
                                    />
                                    <div className="text-sm ml-1 mr-2">
                                        Publicar
                                    </div>
                                    <FaTrash className="text-base ml-2 cursor-pointer" onClick={deleteCourse} />
                                </div>
                            </div>
                        <div>
                            <input
                                type="text"
                                onChange={changeCourseName}
                                value={course.name}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        Nombre Corto
                        <div>
                            <input
                                type="text"
                                onChange={changeCourseShortName}
                                value={course.short_name}
                                className="w-full"
                                maxLength={30}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        <div className="text-left"> Descripción:</div>
                        <div>
                            <input
                                type="text"
                                onChange={changeCourseDescription}
                                value={course.description}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="flex items-center"> Capítulos: <FaPlus className="text-base ml-2 cursor-pointer" onClick={addChapter} /></div>
                    {
                        chapters.map((c, k) => {
                            let chapName = c.name
                            return (
                                <div key={k} className="flex">
                                <input
                                    key={k}
                                    type="text"
                                    onChange={(e) => changeChapterName(e, k)}
                                    value={chapName}
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
                                <a href={`/chapter/${c.id}/edit`}>
                                    <FaPencilAlt className="text-base ml-2" />
                                </a>
                                <FaTrash className="text-base ml-2 cursor-pointer" onClick={(e) => deleteChapter(e, k)} />
                                </div>
                            )

                        })
                    }
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

export default Index;
