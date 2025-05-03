import { useState } from 'react';
import Modal from '@/Components/Modal';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function FeedbackComponent(props) {
    let bgColor = 'bg-orange-300'
    if (props.points >= 90) {
        bgColor = 'bg-green-300'
    }
    if (props.points === 0) {
        bgColor = 'bg-red-300'
    }
    const textToShow = props.showHint ? props.hints[0].hint : props.feedback 
console.log(props)
    return (
        <div className="mx-auto my-6 max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <Modal show={props.show} onClose={props.onClose} >
                <div className={`${bgColor} p-12 shadow sm:rounded-lg`}>
                    <div className="flex justify-between">
                        { textToShow }
                        <div className="flex justify-between">
                            <div className="cursor-pointer bg-white p-2 m-2 rounded-lg" onClick={props.hint}>hint</div>
                            <div className="cursor-pointer bg-white p-2 m-2 rounded-lg" onClick={props.next}>next</div>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
