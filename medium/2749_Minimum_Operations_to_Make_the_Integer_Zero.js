var makeTheIntegerZero = function(num1, num2) {
    num1 = BigInt(num1);
    num2 = BigInt(num2);

    for (let k = 1n; k <= 60n; k++) {
        let rem = num1 - k * num2;
        if (rem < k) continue; 
        if (bitCount(rem) <= k) return Number(k);
    }
    return -1;
};

function bitCount(x) {
    let count = 0n;
    while (x > 0n) {
        count += x & 1n;
        x >>= 1n;
    }
    return count;
}
