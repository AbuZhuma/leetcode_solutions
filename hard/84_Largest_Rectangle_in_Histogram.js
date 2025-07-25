class Stack {
      constructor() {
            this.items = [];
      }

      get top() {
            return this.items[this.items.length - 1];
      }

      get length() {
            return this.items.length;
      }

      isEmpty() {
            return this.items.length === 0;
      }

      push(value) {
            this.items.push(value);
      }
      pop() {
            if (this.isEmpty()) return null;
            return this.items.pop();
      }
}


var largestRectangleArea = function (heights) {
      let maxArea = 0
      const stack = new Stack()
      heights.push(0)
      for (let i = 0; i < heights.length; i++) {
            if (stack.isEmpty() || heights[i] >= heights[stack.top]) {
                  stack.push(i);
            } else if (heights[stack.top] > heights[i]) {
                  while (!stack.isEmpty() && heights[stack.top] > heights[i]) {
                        let g = stack.pop()
                        let width = stack.isEmpty() ? i : i - stack.top - 1;
                        let r = heights[g] * width
                        if (r > maxArea) {
                              maxArea = r
                        }
                  }
                  stack.push(i)
            }
      }
      return maxArea
};