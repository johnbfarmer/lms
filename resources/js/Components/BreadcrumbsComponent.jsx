import { Link } from '@inertiajs/react';

export default function BreadcrumbsComponent(props) {
    if (!props.data) {
        return ''
    }
    let separator
    const bc = props.data.map((d, k) => {
        separator = k < props.data.length - 1 ? '>' : ''
        return (<div key={k} className="text-nowrap flex"><Link href={d.link}>{d.name}</Link><div className="mx-1">{ separator }</div></div>) 
    })

    return (
        <div className="text-sm mx-3 flex text-nowrap">
            { bc }
        </div>
    );
}
