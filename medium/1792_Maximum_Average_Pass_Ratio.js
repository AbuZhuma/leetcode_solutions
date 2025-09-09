var maxAverageRatio = function(classes, extraStudents) {
    function gain(p, t) {
        return (p + 1) / (t + 1) - p / t
    }

    class MaxHeap {
        constructor() { this.data = [] }
        _p(i) { return (i - 1) >> 1 }
        _l(i) { return (i << 1) + 1 }
        _r(i) { return (i << 1) + 2 }
        _swap(i, j) { [this.data[i], this.data[j]] = [this.data[j], this.data[i]] }
        push(x) {
            let d = this.data, i = d.push(x) - 1
            while (i > 0 && d[i][0] > d[this._p(i)][0]) {
                this._swap(i, this._p(i)); i = this._p(i)
            }
        }
        pop() {
            let d = this.data
            if (d.length === 1) return d.pop()
            let top = d[0]; d[0] = d.pop()
            let i = 0
            while (true) {
                let l = this._l(i), r = this._r(i), largest = i
                if (l < d.length && d[l][0] > d[largest][0]) largest = l
                if (r < d.length && d[r][0] > d[largest][0]) largest = r
                if (largest === i) break
                this._swap(i, largest); i = largest
            }
            return top
        }
    }

    let heap = new MaxHeap()
    for (let [p, t] of classes) heap.push([gain(p, t), p, t])

    while (extraStudents > 0) {
        let [g, p, t] = heap.pop()
        if (heap.data.length === 0) {
            p += extraStudents
            t += extraStudents
            extraStudents = 0
            heap.push([gain(p, t), p, t])
            break
        }

        let nextGain = heap.data[0][0]
        let low = 1, high = extraStudents
        while (low < high) {
            let mid = Math.floor((low + high + 1) / 2)
            let newGain = (p + mid) / (t + mid) - (p + mid - 1) / (t + mid - 1)
            if (newGain >= nextGain) low = mid
            else high = mid - 1
        }
        let add = Math.min(low, extraStudents)
        p += add
        t += add
        extraStudents -= add
        heap.push([gain(p, t), p, t])
    }

    let sum = 0
    while (heap.data.length) {
        let [g, p, t] = heap.pop()
        sum += p / t
    }
    return sum / classes.length
};
