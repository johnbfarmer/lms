import { useState, Fragment } from 'react';
import Modal from '@/Components/Modal';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function HintComponent(props) {
    let jsxParts = []
    let hints = [], hintCount = 0, nextHintBtn = ''
    if (props.hints && props.hints.length > 0) {
        hints = props.hints
    }
    hints.forEach(h => {
        if (hintCount++ < props.hintsToShow) {
            jsxParts.push(<div><Latex>{ h.hint }</Latex></div>)
        }
    })
    console.log(jsxParts)
    let xxx = jsxParts.map((p,k) => {
        return (
            <Fragment key={ k }>
                { p }
            </Fragment>
        )
    })
    if (props.hintsToShow < hints.length) {
        nextHintBtn = (
            <div className="cursor-pointer bg-white p-2 m-2 rounded-lg" onClick={props.nextHint}>next hint</div>
        )
    }
    return (
        <div className="mx-auto my-6 max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <Modal show={props.show} onClose={props.onClose} >
                <div className={`bg-white p-12 shadow sm:rounded-lg`}>
                    <div className="">
                        {xxx}
                    </div>
                    <div className="flex justify-end">
                        {nextHintBtn}
                        <div className="cursor-pointer bg-white p-2 m-2 rounded-lg" onClick={props.next}>next problem</div>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
