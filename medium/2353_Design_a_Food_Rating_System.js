var FoodRatings = function (foods, cuisines, ratings) {
      class MaxHeap {
            constructor() {
                  this.data = [];
                  this.indexMap = new Map(); 
            }

            insert(item) {
                  this.data.push(item);
                  this.indexMap.set(item.val, this.data.length - 1);
                  this._heapifyUp();
            }

            extractMax() {
                  if (this.data.length === 0) return null;
                  if (this.data.length === 1) {
                        const last = this.data.pop();
                        this.indexMap.delete(last.val);
                        return last;
                  }

                  const max = this.data[0];
                  const last = this.data.pop();
                  this.indexMap.delete(max.val);

                  this.data[0] = last;
                  this.indexMap.set(last.val, 0);
                  this._heapifyDown();
                  return max;
            }

            peek() {
                  return this.data.length > 0 ? this.data[0] : null;
            }

            changePriority(value, newPriority) {
                  const index = this.indexMap.get(value);
                  if (index === undefined) return false;

                  const oldPriority = this.data[index].priority;
                  this.data[index].priority = newPriority;

                  if (newPriority > oldPriority) {
                        this._heapifyUpFrom(index);
                  } else if (newPriority < oldPriority) {
                        this._heapifyDownFrom(index);
                  }
                  return true;
            }

            _heapifyUp() {
                  this._heapifyUpFrom(this.data.length - 1);
            }

            _heapifyUpFrom(i) {
                  while (i > 0) {
                        let parent = Math.floor((i - 1) / 2);
                        if (this._compare(this.data[i], this.data[parent]) <= 0) break;
                        this._swap(i, parent);
                        i = parent;
                  }
            }

            _heapifyDown() {
                  this._heapifyDownFrom(0);
            }

            _heapifyDownFrom(i) {
                  const n = this.data.length;
                  while (true) {
                        let left = 2 * i + 1;
                        let right = 2 * i + 2;
                        let largest = i;

                        if (left < n && this._compare(this.data[left], this.data[largest]) > 0) largest = left;
                        if (right < n && this._compare(this.data[right], this.data[largest]) > 0) largest = right;

                        if (largest === i) break;
                        this._swap(i, largest);
                        i = largest;
                  }
            }

            _swap(i, j) {
                  [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
                  this.indexMap.set(this.data[i].val, i);
                  this.indexMap.set(this.data[j].val, j);
            }

            _compare(a, b) {
                  if (a.priority !== b.priority) return a.priority - b.priority;
                  if (a.val < b.val) return 1;
                  if (a.val > b.val) return -1;
                  return 0;
            }
      }
      const mapa = new Map()
      const foodsCus = new Map()
      for (let i = 0; i < foods.length; i++) {
            foodsCus.set(foods[i], cuisines[i])
            if (!mapa.has(cuisines[i])) {
                  const heap = new MaxHeap()
                  heap.insert({ val: foods[i], priority: ratings[i] })
                  mapa.set(cuisines[i], heap)
            } else {
                  const heap = mapa.get(cuisines[i])
                  heap.insert({ val: foods[i], priority: ratings[i] })
                  mapa.set(cuisines[i], heap)
            }
      }
      this.map = mapa
      this.foodsCus = foodsCus
};

/** 
 * @param {string} food 
 * @param {number} newRating
 * @return {void}
 */
FoodRatings.prototype.changeRating = function (food, newRating) {
      return this.map.get(this.foodsCus.get(food)).changePriority(food, newRating)
};

/** 
 * @param {string} cuisine
 * @return {string}
 */
FoodRatings.prototype.highestRated = function (cuisine) {
      return this.map.get(cuisine).peek().val
};

const foodRatings = new FoodRatings(
      ["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"],
      ["korean", "japanese", "japanese", "greek", "japanese", "korean"],
      [9, 12, 8, 15, 14, 7]
)
console.log(foodRatings.highestRated("korean"))
