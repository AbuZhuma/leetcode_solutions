function minimumRemovals(nums, k) {

}
var minRemoval = function (nums, k) {
      nums.sort((a, b) => a - b);

      let maxLen = 0;
      let n = nums.length;

      for (let i = 0; i < n; i++) {
            let left = i, right = n - 1, validRight = i;

            while (left <= right) {
                  let mid = Math.floor((left + right) / 2);
                  if (nums[mid] <= nums[i] * k) {
                        validRight = mid;
                        left = mid + 1;
                  } else {
                        right = mid - 1;
                  }
            }

            let length = validRight - i + 1;
            maxLen = Math.max(maxLen, length);
      }

      return n - maxLen;
};