import { useState, useEffect } from 'react';
import Select from 'react-select';
import ChapterSelect from '@/Components/ChapterSelect';

export default function CourseSelect (props) {
    const [courseId, setCourseId] = useState(props.selected)
    const [chapters, setChapters] = useState([])
    const [chapterId, setChapterId] = useState(props.chapterId)

    const options = props.courses.map(c => {
        return { key: c.id, value: c.id, label: c.name }
    });
    let selectedOption = null
    options.some(x => {
        if (x.value == props.selected) {
            selectedOption = x
            return true
        }
        return false
    })

    useEffect(() => {
        fetch(route('course.chapters', {id: courseId}))
        .then(res => res.json())
        .then(
            (results) => {
                setChapters(results)
                setChapterId(0)
            },
            (error) => {
                console.log('error', error)
            }
        )
    }, [courseId])

    const onSelectCourse = (e) => {
        setCourseId(e.value)
        props.onSelectCourse(e)
    } 

    const onSelectChapter = (e) => {
        setChapterId(e.value)
        props.onSelectChapter(e)
    } 

    return (
        <div className="py-2">
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="text-center bg-white p-1 shadow w-full sm:rounded-lg sm:p-8 flex">
                <div className="w-50%">Course:</div>
                {
                    props.courses.length > 0 &&
                    <div className = "w-full">
                        <Select
                            options={options}
                            placeholder='Select a course...'
                            onChange={onSelectCourse}
                            isClearable={ true }
                            defaultValue={ selectedOption }
                        />
                    </div>
                }
                </div>
            </div>
            <ChapterSelect
                chapters={chapters}
                selected={chapterId || props.chapterId}
                onSelectChapter={onSelectChapter}
                onSelectLesson={props.onSelectLesson}
                lessonId={props.lessonId}
            />
        </div>
    )
}
