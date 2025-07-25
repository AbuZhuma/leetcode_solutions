// Use a Min Heap to always extract the smallest head node among all lists.
// First, insert the head of each list into the heap.
// Then, repeatedly extract the min node and push its .next into the heap.
// This builds the merged sorted list in O(N log k) time, where k is the number of lists.

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
}

class MinHeap {
    constructor() {
        this.heap = []
    }

    insert(node) {
        this.heap.push(node)
        this.heapifyUp()
    }

    extractMin() {
        if (this.heap.length === 0) return null
        if (this.heap.length === 1) return this.heap.pop()
        const min = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.heapifyDown()
        return min
    }

    heapifyUp() {
        let i = this.heap.length - 1
        while (
            i > 0 &&
            this.heap[this.getParentIndex(i)].val > this.heap[i].val
        ) {
            this.swap(i, this.getParentIndex(i))
            i = this.getParentIndex(i)
        }
    }

    heapifyDown() {
        let i = 0
        while (this.getLeftChildIndex(i) < this.heap.length) {
            let smallerChild = this.getLeftChildIndex(i)
            let right = this.getRightChildIndex(i)

            if (
                right < this.heap.length &&
                this.heap[right].val < this.heap[smallerChild].val
            ) {
                smallerChild = right
            }

            if (this.heap[i].val <= this.heap[smallerChild].val) break

            this.swap(i, smallerChild)
            i = smallerChild
        }
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2) }
    getLeftChildIndex(i) { return 2 * i + 1 }
    getRightChildIndex(i) { return 2 * i + 2 }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }

    isEmpty() {
        return this.heap.length === 0
    }
}

var mergeKLists = function (lists) {
    const heap = new MinHeap()
    for (let node of lists) {
        if (node) heap.insert(node)
    }

    const dummy = new ListNode(-1)
    let current = dummy

    while (!heap.isEmpty()) {
        const minNode = heap.extractMin()
        current.next = minNode
        current = current.next

        if (minNode.next) {
            heap.insert(minNode.next)
        }
    }

    return dummy.next
}
