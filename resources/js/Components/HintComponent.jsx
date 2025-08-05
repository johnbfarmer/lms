import { useState, useRef } from 'react';
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
            jsxParts.unshift(<div><Latex>{ h.hint }</Latex></div>)
        }
    })
    let xxx = jsxParts.map((p,k) => {
        let cls = k > 0 ? 'text-slate-300' : 'text-slate-600'
        return (
            <div key={ k } className={`my-4 ${cls}`}>
                { p }
            </div>
        )
    })

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView();
    };

    function nextHint() {
        props.nextHint();
    }

    let moreHints = props.hintsToShow < hints.length
    let onClk = nextHint
    let nextHntCls = 'cursor-pointer text-black'
    if (!moreHints) {
        onClk = () => {}
        nextHntCls = 'text-slate-200'
    }

    return (
        <div className="mx-auto my-6 max-w-5xl space-y-6 sm:px-6 lg:px-8">
            <Modal show={props.show} onClose={props.onClose} maxWidth="5xl">
                <div className={`bg-white p-1 shadow sm:rounded-lg flex flex-row max-w-5xl overflow-y-auto h-screen`}>
                    <div className="flex flex-col min-w-[20%] h-full">
                        <div className={`${nextHntCls} cursor-pointer bg-white p-2 m-2 rounded-lg`} onClick={ onClk }>siguiente paso</div>
                        <div className="cursor-pointer bg-white p-2 m-2 rounded-lg" onClick={props.onClose}>cerrar</div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col max-h-dvh">
                            {xxx}
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
