var subsequenceSumAfterCapping = function (nums, k) {
      const result = []
      for (let i = 0; i < nums.length; i++) {
            const capped = []
            let sum = 0
            for (let a = 0; a < nums.length; a++) {
                  let min = Math.min(i + 1, nums[a])
                  capped.push(min)
                  sum += min
            }

            const sorted = capped.sort((a, b) => a - b)
            let cur = sum - k
            while (sorted.length > 0) {
                  const l = sorted.pop()
                  if (cur - l >= 0) {
                        cur -= l
                  }
            }
            if (cur === 0) {
                  result.push(true)
            } else {
                  result.push(false)
            }
      }
      return result
};

subsequenceSumAfterCapping([4, 3, 2, 4], 5)