export function handleFraction(ans) {
    if (ans === parseFloat(ans)) {
        return ans
    }
    if (ans !== parseFloat(ans)) {
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
}