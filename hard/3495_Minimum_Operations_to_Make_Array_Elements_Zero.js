function countDivisionsInRange(l, r) {
    let total = 0;
    let startPow = Math.floor(Math.log(l) / Math.log(4));
    let endPow = Math.floor(Math.log(r) / Math.log(4));

    for (let k = startPow; k <= endPow; k++) {
        let blockStart = Math.max(l, 4 ** k);
        let blockEnd = Math.min(r, 4 ** (k + 1) - 1);
        if (blockStart <= blockEnd) {
            let count = blockEnd - blockStart + 1;
            total += count * (k + 1);
        }
    }
    return total;
}

var minOperations = function (queries) {
    let result = 0;
    for (let [l, r] of queries) {
        let totalDivisions = countDivisionsInRange(l, r);
        result += Math.ceil(totalDivisions / 2);
    }
    return result;
};
 