import { Fragment } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function LessonNav(props) {
    let nbrs = props.neighbors
    console.log(nbrs)
    let parts = [];
    for (let i in nbrs) {
        if (nbrs[i] !== null) {
            parts.push(
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow sm:rounded-lg sm:p-4">
                        <a href={`/lesson/${ nbrs[i] }`}>{ i } lesson</a>
                    </div>
                </div>
            )
        } else {
            parts.push(
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-slate-100 p-6 shadow sm:rounded-lg sm:p-4 text-slate-400">
                        { i } lesson
                    </div>
                </div>
            )
        }
    }
    let xxx = parts.map((p,k) => {
        return (
            <Fragment key={ k }>
                { p }
            </Fragment>
        )
    })
    return (
        <div className="flex justify-between">
            { xxx }
        </div>
    )
}

