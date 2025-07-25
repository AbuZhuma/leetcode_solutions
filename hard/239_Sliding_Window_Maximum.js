// Use a monotonic decreasing deque to store indices of potential max values.
// Remove front if it's out of the current window.
// Remove all smaller values from the back before inserting a new index.
// The front of the deque always holds the max for the current window.
// Time: O(n), each element is pushed and popped at most once.

var maxSlidingWindow = function(nums, k) {
    const deque = [];
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        if (deque.length && deque[0] <= i - k) deque.shift();

        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop()

        deque.push(i);

        if (i >= k - 1) result.push(nums[deque[0]]);
    }

    return result;
};
