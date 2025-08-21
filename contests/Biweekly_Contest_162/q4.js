var subarrayMajority = function(nums, queries) {
    const ans = new Array(queries.length).fill(-1);
    const blockSize = Math.floor(Math.sqrt(nums.length)) + 1;

    const indexedQueries = queries.map((q, i) => [...q, i]);
    indexedQueries.sort((a, b) => {
        const blockA = Math.floor(a[0] / blockSize);
        const blockB = Math.floor(b[0] / blockSize);
        if (blockA !== blockB) return blockA - blockB;
        return (blockA % 2 === 0) ? a[1] - b[1] : b[1] - a[1];
    });

    let currentL = 0, currentR = -1;
    const frequency = new Map();
    const freqToNums = [];
    let maxFreq = 0;

    const addNum = (num) => {
        const oldFreq = frequency.get(num) || 0;
        const newFreq = oldFreq + 1;
        frequency.set(num, newFreq);

        if (freqToNums[oldFreq]) {
            freqToNums[oldFreq].delete(num);
        }
        if (!freqToNums[newFreq]) {
            freqToNums[newFreq] = new Set();
        }
        freqToNums[newFreq].add(num);

        if (newFreq > maxFreq) {
            maxFreq = newFreq;
        }
    };

    const removeNum = (num) => {
        const oldFreq = frequency.get(num);
        const newFreq = oldFreq - 1;
        frequency.set(num, newFreq);

        freqToNums[oldFreq].delete(num);
        if (freqToNums[oldFreq].size === 0 && oldFreq === maxFreq) {
            maxFreq--;
        }
        if (newFreq >= 0) {
            if (!freqToNums[newFreq]) {
                freqToNums[newFreq] = new Set();
            }
            freqToNums[newFreq].add(num);
        }
    };

    for (const [l, r, threshold, originalIndex] of indexedQueries) {
        while (currentL > l) {
            currentL--;
            addNum(nums[currentL]);
        }
        while (currentR < r) {
            currentR++;
            addNum(nums[currentR]);
        }
        while (currentL < l) {
            removeNum(nums[currentL]);
            currentL++;
        }
        while (currentR > r) {
            removeNum(nums[currentR]);
            currentR--;
        }

        if (maxFreq >= threshold) {
            const candidates = freqToNums[maxFreq];
            let minNum = Infinity;
            for (const num of candidates) {
                if (num < minNum) minNum = num;
            }
            ans[originalIndex] = minNum;
        }
    }

    return ans;
};