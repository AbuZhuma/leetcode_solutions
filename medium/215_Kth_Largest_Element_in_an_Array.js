// Maintain a Min Heap of size k to track the top k largest elements.
// Insert each number into the heap, and remove the smallest if size exceeds k.
// After all insertions, the root of the heap is the k-th largest element.
// Time complexity: O(n log k) where n is the number of elements.

class MinHeap {
      constructor(limit) {
            this.heap = []
            this.limit = limit
      }
      getParentIndex(i) { return Math.floor((i - 1) / 2) }
      getLeftChildIndex(i) { return 2 * i + 1 }
      getRigthChildIndex(i) { return 2 * i + 2 }

      swap(i, j) {
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
      }

      insert(value) {
            this.heap.push(value)
            this.heapifyUp()
            if(this.heap.length > this.limit) this.extractMin()
      }

      heapifyUp() {
            let index = this.heap.length - 1
            while (
                  index > 0 &&
                  this.heap[this.getParentIndex(index)] > this.heap[index]
            ) {
                  this.swap(index, this.getParentIndex(index))
                  index = this.getParentIndex(index)
            }
      }
      
      extractMin(){
            if(this.heap.length === 0) return null
            if(this.heap.length === 1) return this.heap.pop()
            this.heap[0] = this.heap.pop()
            this.heapifyDown()
      }
      heapifyDown(){
            let index = 0
            const length = this.heap.length;

            while(this.getLeftChildIndex(index) < length){
                  let smallerChildIndex = this.getLeftChildIndex(index)
                  const rightChildIndex = this.getRigthChildIndex(index)

                  if(
                        rightChildIndex < length &&
                        this.heap[rightChildIndex] < this.heap[smallerChildIndex]
                  ){
                        smallerChildIndex = rightChildIndex
                  }

                  if(this.heap[index] <= this.heap[smallerChildIndex]) break;
                  this.swap(index, smallerChildIndex)
                  index = smallerChildIndex
            }
      }
}

var findKthLargest = function(nums, k) {
    const heap = new MinHeap(k)
    for (let i = 0; i < nums.length; i++) {
      heap.insert(nums[i])
    }
    return heap.heap[0]
};