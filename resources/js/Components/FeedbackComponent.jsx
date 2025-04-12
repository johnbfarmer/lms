import { useState } from 'react';
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
    return (
        <div className="mx-auto my-6 max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <div className={`${bgColor} p-4 shadow sm:rounded-lg sm:p-1`}>
                { props.feedback }
            </div>
        </div>
    );
}
