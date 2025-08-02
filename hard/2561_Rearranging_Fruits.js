var minCost = function(basket1, basket2) {
    const freq = new Map();
    for (const fruit of basket1) freq.set(fruit, (freq.get(fruit) || 0) + 1);
    for (const fruit of basket2) freq.set(fruit, (freq.get(fruit) || 0) - 1);

    const extra1 = [], extra2 = [];
    for (const [fruit, count] of freq) {
        if (count % 2 !== 0) return -1;
        if (count > 0) {
            for (let i = 0; i < count / 2; i++) extra1.push(fruit);
        } else if (count < 0) {
            for (let i = 0; i < -count / 2; i++) extra2.push(fruit);
        }
    }

    extra1.sort((a, b) => a - b);
    extra2.sort((a, b) => a - b);

    const min_fruit = Math.min(...basket1, ...basket2);
    let res = 0;
    for (let i = 0; i < extra1.length; i++) {
        res += Math.min(extra1[i], extra2[extra2.length - 1 - i], 2 * min_fruit);
    }
    return res;
};
