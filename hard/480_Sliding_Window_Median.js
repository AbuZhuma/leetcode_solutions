class Heap {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }
  size()      { return this.data.length; }
  peek()      { return this.data[0]; }
  insert(node){
    this.data.push(node);
    this._heapifyUp(this.data.length - 1);
  }
  extractTop(){
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length) {
      this.data[0] = last;
      this._heapifyDown(0);
    }
    return top;
  }
  _heapifyUp(i){
    const node = this.data[i];
    while (i > 0) {
      const pi = (i - 1) >> 1;
      if (this.compare(node.val, this.data[pi].val) ||
          (node.val === this.data[pi].val && node.idx < this.data[pi].idx)) {
        this.data[i] = this.data[pi];
        i = pi;
      } else break;
    }
    this.data[i] = node;
  }
  _heapifyDown(i){
    const n = this.data.length;
    const node = this.data[i];
    while (true) {
      let best = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && (this.compare(this.data[l].val, this.data[best].val) ||
         (this.data[l].val === this.data[best].val && this.data[l].idx < this.data[best].idx)))
        best = l;
      if (r < n && (this.compare(this.data[r].val, this.data[best].val) ||
         (this.data[r].val === this.data[best].val && this.data[r].idx < this.data[best].idx)))
        best = r;
      if (best === i) break;
      this.data[i] = this.data[best];
      i = best;
    }
    this.data[i] = node;
  }
}

function medianSlidingWindow(nums, k) {
  const maxHeap = new Heap((a,b)=>a>b);
  const minHeap = new Heap((a,b)=>a<b);
  const delayed = new Map(); // key = `${val}_${idx}`

  let maxSize = 0, minSize = 0;
  const res = [];

  const prune = heap => {
    while (heap.size()) {
      const node = heap.peek();
      const key = `${node.val}_${node.idx}`;
      if (delayed.has(key)) {
        delayed.set(key, delayed.get(key) - 1);
        if (delayed.get(key) === 0) delayed.delete(key);
        heap.extractTop();
      } else break;
    }
  };

  const balance = () => {
    if (maxSize > minSize + 1) {
      const node = maxHeap.extractTop();
      minHeap.insert(node);
      maxSize--; minSize++;
      prune(maxHeap);
    } else if (minSize > maxSize) {
      const node = minHeap.extractTop();
      maxHeap.insert(node);
      minSize--; maxSize++;
      prune(minHeap);
    }
  };

  const add = (val, idx) => {
    const node = { val, idx };
    if (!maxHeap.size() || val < maxHeap.peek().val ||
        (val === maxHeap.peek().val && idx < maxHeap.peek().idx)) {
      maxHeap.insert(node);
      maxSize++;
    } else {
      minHeap.insert(node);
      minSize++;
    }
    balance();
  };

  const remove = (val, idx) => {
    const key = `${val}_${idx}`;
    delayed.set(key, (delayed.get(key) || 0) + 1);
    if ((maxHeap.size() && (val < maxHeap.peek().val ||
        (val === maxHeap.peek().val && idx <= maxHeap.peek().idx)))) {
      maxSize--;
    } else {
      minSize--;
    }
    prune(maxHeap);
    prune(minHeap);
    balance();
  };

  const getMedian = () => {
    prune(maxHeap);
    prune(minHeap);
    return k % 2 === 1 ? maxHeap.peek().val :
      (maxHeap.peek().val + minHeap.peek().val) / 2;
  };

  for (let i = 0; i < nums.length; i++) {
    add(nums[i], i);
    if (i >= k - 1) {
      res.push(getMedian());
      remove(nums[i - k + 1], i - k + 1);
    }
  }

  return res;
}
                              