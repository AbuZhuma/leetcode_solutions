var findClosest = function (x, y, z) {
      let ax = Math.abs(z - x)
      let ay = Math.abs(z - y)
      return ax > ay ? 2 : ax < ay ? 1 : 0
};

console.log(findClosest(2,7,4))