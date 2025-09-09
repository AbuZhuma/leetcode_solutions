var sumZero = function (n) {
      if (n <= 0) return []
      if (n === 1) return [0]

      const S0 = n * (n - 1) / 2
      const q = Math.floor((0 - S0) / n)
      const S1 = S0 + n * q
      const r = 0 - S1
      const res = new Array(n)
      for (let i = 0; i < n; i++) {
            res[i] = i + q + (i >= n - r ? 1 : 0)
      }
      return res
};

