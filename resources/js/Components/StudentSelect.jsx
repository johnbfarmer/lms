import { useState, useEffect } from 'react';
import Select from 'react-select';

export default function StudentSelect (props) {
    const [studentId, setStudentId] = useState(props.selected)

    const options = props.students.map(c => {
        return { key: c.id, value: c.id, label: c.name }
    });
    options.unshift({ key: 0, value: 0, label: 'Todos' })
    let selected = null
    options.some(x => {
        if (x.value == props.selected) {
            selected = x
            return true
        }
        return false
    })

    const onSelectStudent = (e) => {
        setStudentId(e.value)
        props.onSelect(e)
    } 

    return (
        <div className="text-center bg-white p-1 shadow w-full sm:p-4 flex">
            <div className="w-fit">Estudiante:</div>
            {
                props.students.length > 0 &&
                <div className = "w-full">
                    <Select
                        options={ options }
                        placeholder='Escoge un alumno...'
                        onChange={onSelectStudent}
                        isClearable={ true }
                        defaultValue={ selected }
                    />
                </div>
            }
        </div>
    )
}
