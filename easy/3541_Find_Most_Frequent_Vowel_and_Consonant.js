var maxFreqSum = function (s) {
      const vowel = new Map()
      const cons = new Map()
      const sf = new Set(["a", "i", "e", "u", "o"])
      for (let i = 0; i < s.length; i++) {
            let map = sf.has(s[i]) ? vowel : cons
            let val = map.get(s[i]) ? map.get(s[i]) + 1 : 1
            map.set(s[i], val)
      }
      let maxV = 0
      let maxC = 0
      vowel.forEach((el) => {
            if(el > maxV){
                  maxV = el
            }
      })
      cons.forEach((el) => {
            if(el > maxC){
                  maxC = el
            }
      })
      return maxC+maxV
};

console.log(maxFreqSum("queyfwefwef"))