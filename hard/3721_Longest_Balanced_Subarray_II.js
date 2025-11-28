var longestBalanced = function(nums) {
    const evenSet = new Set();
    const oddSet = new Set();
    const map = new Map();
    map.set('0,0', -1)
    let maxLen = 0;
    
    let evenCount = 0;
    let oddCount = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            evenSet.add(nums[i]);
        } else {
            oddSet.add(nums[i]);
        }
        
        evenCount = evenSet.size;
        oddCount = oddSet.size;
        
        const key = `${evenCount - oddCount},${evenCount+oddCount}`; 

        if (map.has(key)) {
            maxLen = Math.max(maxLen, i - map.get(key));
        } else {
            map.set(key, i);
        }
    }
    
    return maxLen;
};
