import { useState, useEffect } from 'react';
import Select from 'react-select';
import LessonSelect from '@/Components/LessonSelect';

export default function ChapterSelect (props) {
    const [chapterId, setChapterId] = useState(props.selected)
    const [lessons, setLessons] = useState([])
    useEffect(() => {
        fetch(route('chapter.lessons', {id: chapterId}))
        .then(res => res.json())
        .then(
            (results) => {
                setLessons(results)
            },
            (error) => {
                console.log('error', error)
            }
        )
    }, [chapterId])

    const options = props.chapters.map(c => {
        return { key: c.id, value: c.id, label: c.name }
    });
    let selected = null
    options.some(x => {
        if (x.value == props.selected) {
            selected = x
            return true
        }
        return false
    })

    const onSelectChapter = (e) => {
        setChapterId(e.value)
        // props.onSelect(e)
    } 

    return (
        <div className="py-2">
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="text-center bg-white p-1 shadow w-full sm:rounded-lg sm:p-8 flex">
                <div className="w-50%">Chapter:</div>
                {
                    props.chapters.length > 0 &&
                    <div className = "w-full">
                        <Select
                            options={options}
                            placeholder='Select a chapter...'
                            onChange={onSelectChapter}
                            isClearable={ true }
                            defaultValue={ selected }
                        />
                    </div>
                }
                </div>
            </div>
            <LessonSelect
                lessons={lessons}
                selected={props.lessonId}
                onSelect={props.onSelectLesson}
            />
        </div>
    )
}
