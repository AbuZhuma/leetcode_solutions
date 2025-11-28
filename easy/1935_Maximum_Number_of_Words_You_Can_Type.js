var canBeTypedWords = function (text, brokenLetters) {
      const brokenSet = new Set(brokenLetters.split(""))
      const words = text.split(" ")
      let result = 0

      for (let i = 0; i < words.length; i++) {
            let isBroken = 1
            for (let a = 0; a < words[i].length; a++) {
                  if(brokenSet.has(words[i][a])){
                        isBroken = 0
                        break;
                  }
            }
            result+=isBroken
      }
      
      return result
};
canBeTypedWords("hello world", "ad")