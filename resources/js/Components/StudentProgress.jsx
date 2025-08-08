export default function StudentProgress (props) {
    let txt = ''
    if (props.progress === null) {
        txt = <span className="p-1 m-1 border rounded-md text-sm bg-yellow-400">no hay datos</span>
    } else {
        let bgCol = props.progress.pct_done > 95 ? 'bg-green-400' : (props.progress.pct_done < 1 ? 'bg-slate-200' : 'bg-green-200')
        txt = <span className={`p-1 m-1 border rounded-md ${ bgCol } text-sm`}>{ `${props.progress.pct_done}% hecho; ${props.progress.score}% correctos; ${props.progress.total} problemas` }</span>
    }
    return (
        <div className="flex flex-row">
            { txt }
        </div>
    );
}
