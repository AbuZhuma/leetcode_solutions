var smallestAbsent = function(nums) {
    const avg = nums.reduce((a, b) => a + b, 0) / nums.length
    const set = new Set(nums)
    let candidate = 1
    while (true) {
        if (!set.has(candidate) && candidate > avg) return candidate
        candidate++
    }
}
