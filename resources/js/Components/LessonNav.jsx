import { Fragment } from 'react';

export default function LessonNav(props) {
    let nbrs = props.neighbors
    let parts = [];
    for (let i in nbrs) {
        if (nbrs[i] !== null) {
            parts.push(
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <a href={`/lesson/${ nbrs[i] }`}>{ i } lección</a>
                </div>
            )
        } else {
            parts.push(
                <div className="mx-auto max-w-7xl space-y-6 text-slate-200 sm:px-6 lg:px-8">
                    { i } lesson
                </div>
            )
        }
    }
    let finalJsx = parts.map((p,k) => {
        return (
            <Fragment key={ k }>
                { p }
            </Fragment>
        )
    })
    return (
        <div className="flex justify-between">
            { finalJsx }
        </div>
    )
}

