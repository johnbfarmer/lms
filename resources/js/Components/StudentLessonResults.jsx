export default function StudentLessonResults (props) {
    let txt = ''
         let bgCol = props.progress.pct > 99 ? 'bg-green-400' : (props.progress.pct < 1 ? 'bg-slate-200' : 'bg-green-200')
        let finalJsx = (
            <span className={`p-1 m-1 border rounded-md ${ bgCol } text-sm`}>
                { `${props.progress.pct}% (${props.progress.right} out of ${props.progress.total})` }
            </span>
        )
    return (
        <div className="">
            { finalJsx }
        </div>
    );
}
