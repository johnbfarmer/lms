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
    let xxx = jsxParts.map((p,k) => {
        return (
            <div key={ k } className="my-4">
                { p }
            </div>
        )
    })
    if (props.hintsToShow < hints.length) {
        nextHintBtn = (
            <div className="cursor-pointer bg-white p-2 m-2 rounded-lg" onClick={props.nextHint}>siguiente paso</div>
        )
    }
    return (
        <div className="mx-auto my-6 max-w-5xl space-y-6 sm:px-6 lg:px-8">
            <Modal show={props.show} onClose={props.onClose} >
                <div className={`bg-white p-1 shadow sm:rounded-lg flex flex-row max-w-5xl`}>
                    <div className="flex flex-col min-w-[20%]">
                        {nextHintBtn}
                        <div className="cursor-pointer bg-white p-2 m-2 rounded-lg" onClick={props.next}>siguiente problema</div>
                        <div className="cursor-pointer bg-white p-2 m-2 rounded-lg" onClick={props.onClose}>cerrar</div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col">
                            {xxx}
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
