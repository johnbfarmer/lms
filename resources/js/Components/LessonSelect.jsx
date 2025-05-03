import { useState, useEffect } from 'react';
import Select from 'react-select';

export default function LessonSelect (props) {
    const [lessonId, setLessonId] = useState(props.selected)

    const options = props.lessons.map(c => {
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

    const onSelectLesson = (e) => {
        setLessonId(e.value)
        props.onSelect(e)
    } 

    return (
        <div className="py-2">
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="text-center bg-white p-1 shadow w-full sm:rounded-lg sm:p-8 flex">
                <div className="w-50%">Lesson:</div>
                {
                    props.lessons.length > 0 &&
                    <div className = "w-full">
                        <Select
                            options={options}
                            placeholder='Select a Lesson...'
                            onChange={onSelectLesson}
                            isClearable={ true }
                            defaultValue={ selected }
                        />
                    </div>
                }
                </div>
            </div>
        </div>
    )
}
