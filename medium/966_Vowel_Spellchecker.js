var spellchecker = function (wordlist, queries) {
      const exact = new Set(wordlist);  
      const lowerMap = new Map();      
      
      const toLower = (s) => s.toLowerCase();
      const toVowelMask = (s) => toLower(s).replace(/[aeiou]/g, "*");

      for (let word of wordlist) {
            let lower = toLower(word);
            let mask = toVowelMask(word);

            if (!lowerMap.has(lower)) lowerMap.set(lower, word);
            if (!lowerMap.has(mask)) lowerMap.set(mask, word);
      }

      const spell = []
      
      for (let i = 0; i < queries.length; i++) {
            const el = queries[i];
            let result = ""
            if(exact.has(el)){
                  result = el
            }else if(lowerMap.has(toLower(el))){
                  result = lowerMap.get(toLower(el))
            }else if(lowerMap.has(toVowelMask(el))){
                  result = lowerMap.get(toVowelMask(el))
            }
            spell.push(result)
      }
      return spell
};