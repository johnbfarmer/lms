import HybridDisplay from '@/Components/HybridDisplay';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function TProblemComponentopMenu(props) {
    let problemSection

    if (props.problem.display_type === 'text') {
        problemSection = (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )
    }
    if (props.problem.display_type === 'latex') {
        problemSection = (
            <Latex>{ props.problem.problem_text }</Latex>
        )
    }
    if (props.problem.display_type === 'pdf') {
        problemSection = (
            <iframe src={`/storage/${pageAssets.pdf}.pdf`} style={{width:"900px", height:"1200px"}} frameBorder="0" />
        )
    }
    if (props.problem.display_type === 'hybrid') {
        problemSection = (
            <HybridDisplay content={ props.problem.problem_text } />
        )
    }
    return (
        <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
            <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-2">
                { problemSection }
            </div>
        </div>
    );
}
 