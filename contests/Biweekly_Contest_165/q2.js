var minimumDiscards = function(w, m, arrivals) {
    let caltrivone = arrivals.slice()
    let discard = 0
    const typeMap = new Map()

    for (let i = 0; i < arrivals.length; i++) {
        const type = arrivals[i]
        if (!typeMap.has(type)) typeMap.set(type, [])
        const queue = typeMap.get(type)
        while (queue.length && queue[0] <= i - w) queue.shift()
        if (queue.length < m) queue.push(i)
        else discard++
    }

    return discard
}
