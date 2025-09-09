var numberOfPairs = function(points) {
    points.sort((a, b) => a[0] - b[0] || b[1] - a[1])
    let n = points.length
    let result = 0
    
    for (let i = 0; i < n; i++) {
        let maxY = -Infinity
        for (let j = i + 1; j < n; j++) {
            if (points[j][1] <= points[i][1]) {
                if (points[j][1] > maxY) {
                    result++
                    maxY = points[j][1]
                }
            }
        }
    }
    return result
}