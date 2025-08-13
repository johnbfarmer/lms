import { useState } from 'react';
import Select from 'react-select';

export default function AggSelect (props) {
    const [aggId, setAggId] = useState(props.selected)

    const options = props.aggs.map(c => {
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

    const onSelectAgg = (e) => {
        setAggId(e.value)
        props.onSelect(e)
    } 

    return (
        <div className="text-center bg-white p-1 shadow w-full sm:p-4 flex">
            <div className="w-fit">Agregación:</div>
            {
                props.aggs.length > 0 &&
                <div className = "w-full">
                    <Select
                        options={ options }
                        placeholder='Escoge una agregación...'
                        onChange={onSelectAgg}
                        defaultValue={ selected }
                    />
                </div>
            }
        </div>
    )
}
