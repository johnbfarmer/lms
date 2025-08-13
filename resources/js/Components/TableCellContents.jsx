function getClass(props) {
    if (Object.keys(props.col).indexOf('classFormatter') >= 0) {
        return props.col.classFormatter(props.data)
    }
    if (Object.keys(props.col).indexOf('class') >= 0) {
        return props.col.class
    }
    return null
}

function getContent(props) {
    if (Object.keys(props.col).indexOf('displayText') >= 0) {
        return props.col.displayText
    }
    if (Object.keys(props.col).indexOf('displayFormatter') >= 0) {
        return props.col.displayFormatter(props.data)
    }

    return props.data[props.col.field]
}


export default function TableCellContents(props) {

    return (
        <>
            <span className={ getClass(props) }>
                { getContent(props) }
            </span>
        </>
    )
}
