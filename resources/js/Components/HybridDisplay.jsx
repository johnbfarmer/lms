import { Fragment } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function HybridDisplay(props) {
    let content = props.content, parts = [], symbL = '[LLL]', symbH = '[HHH]', jsxParts = []
    let p1 = content.split(symbL)
        console.log(p1)
    p1.forEach(p => {
        if (p.length < 1) { return }
        console.log(p)
        let p2 = p.split(symbH)
        console.log(p2)
        if (p2[0].length > 0) {
            parts.push({ c: p2[0], t: 'L'})
        }
        if (p2.length > 1 && p2[1].length > 0) {
            parts.push({ c: p2[1], t: 'H'})
        }
    })
    let s = ''
    parts.forEach(p => {
        if (p.t === 'L') {
            jsxParts.push(<Latex>{ p.c }</Latex>)
        } else {
            jsxParts.push(<div dangerouslySetInnerHTML={{ __html: p.c }} />)
        }
    })
    let xxx = jsxParts.map((p,k) => {
        return (
            <Fragment key={ k }>
                { p }
            </Fragment>
        )
    })
    return (
        <>
            { xxx }
        </>
    )
}
