export function handleFraction(ans) {
    if (ans == parseFloat(ans)) {
        return ans
    }
    // user trying to send fraction ?
    if (ans.indexOf("/") >= 0) {
        let a = ans.split(' ') // allow for mixed number
        let w = 0
        let f = a[0]
        if (a.length < 1 || a.length > 2) {
            return NaN
        }
        if (a.length === 2) {
            w = a[0]
            f = a[1]
        }
        if (w != parseInt(w)) {
            return NaN
        }
        let frac = f.split('/')

        if (frac.length !== 2 || !frac[1]) {
            return NaN
        }
        return (1 * w + (frac[0] / frac[1]))
    }
}

export function buildBreadCrumbs(data, level) {
    // levels - 1 course, 2 chapter, 3 lesson, 4 problem
    let {lesson, chapter, course} = data 
    let bc = [{name: 'Cursos', link: '/courses/all'}]
    if (level > 1) {
        bc.push({name: course.short_name, link: `/course/${course.id}`})
    }
    if (level > 2) {
        bc.push({name: chapter.short_name, link: `/chapter/${chapter.id}`})
    }
    if (level > 3) {
        bc.push({name: lesson.short_name, link: `/lesson/${lesson.id}`})
    }

    return bc
}