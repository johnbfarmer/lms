import { Link } from '@inertiajs/react';

export default function BreadcrumbsComponent(props) {
    if (!props.data) {
        return ''
    }
    let separator
    const bc = props.data.map((d, k) => {
        separator = k < props.data.length - 1 ? ' > ' : ''
        return (<><Link key={k} href={d.link}>{d.name}</Link>{ separator }</>) 
    })

    return (
        <div className="text-sm mx-3 text-nowrap">
            { bc }
        </div>
    );
}
