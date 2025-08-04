import { useState, useRef } from 'react';
import Modal from '@/Components/Modal';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function HintComponent(props) {
    let jsxParts = []
    let hints = [], hintCount = 0, nextHintBtn = ''
    const bottomRef = useRef(null);
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

    // const scrollToBottom = () => {
    //     console.log('scrollin')
    //     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };

    async function nextHint() {
        await props.nextHint();
        scrollToBottom();
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
                <div className={`bg-white p-1 shadow sm:rounded-lg flex flex-row max-w-5xl h-[400px] overflow-hidden`}>
                    <div className="flex flex-col min-w-[20%] h-full">
                        <div className={`${nextHntCls} cursor-pointer bg-white p-2 m-2 rounded-lg`} onClick={ onClk }>siguiente paso</div>
                        <div className="cursor-pointer bg-white p-2 m-2 rounded-lg" onClick={props.onClose}>cerrar</div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col max-h-[400px] overflow-y-auto">
                            {xxx}
                            <div ref={bottomRef}></div>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
