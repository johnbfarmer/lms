import { Fragment } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function ProblemNav(props) {
    let nbrs = props.neighbors
    let parts = [];
    for (let i in nbrs) {
        if (nbrs[i] !== null) {
            parts.push(
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <a href={`/problem/${ nbrs[i] }`}>{ i }</a>
                </div>
            )
        } else {
            parts.push(
                <div className="mx-auto max-w-7xl space-y-6 text-slate-200 sm:px-6 lg:px-8">
                    { i }
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

