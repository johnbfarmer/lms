export default function StudentProgress (props) {
    let txt = ''
    let nolinks = props.noLinks || false
    if (!nolinks && props.progress === null) {
        txt = <span className="p-1 m-1 border rounded-md text-sm bg-yellow-400"><a href={`/enroll/${props.courseId}`}>enroll</a></span>
    } else {
        let bgCol = props.progress.pct_done > 99 ? 'bg-green-400' : (props.progress.pct_done < 1 ? 'bg-slate-200' : 'bg-green-200')
        let pct = <span className={`p-1 m-1 border rounded-md ${ bgCol } text-sm`}>{ `${props.progress.pct_done}% done` }</span>
        let goBtn = ''
        if (!nolinks && props.progress.is_premium == 0) {
            goBtn = <span className="p-1 m-1 border rounded-md text-sm bg-yellow-400"><a href={`/upgrade/${props.courseId}`}>go premium</a></span>
        }
        txt =  (<> {pct}  {goBtn} </>)
    }
    return (
        <div className="">
            { txt }
        </div>
    );
}
