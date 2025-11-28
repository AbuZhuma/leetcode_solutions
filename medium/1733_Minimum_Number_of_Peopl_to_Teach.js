var minimumTeachings = function (n, languages, friendships) {
  const nonKnown = [];
  for (let [u, v] of friendships) {
    if (!languages[u - 1].some(lang => languages[v - 1].includes(lang))) {
      nonKnown.push([u, v]);
    }
  }
  if (!nonKnown.length) return 0;
  const users = new Set();
  for (let [u, v] of nonKnown) {
    users.add(u);
    users.add(v);
  }
  const langCount = new Array(n + 1).fill(0);
  for (let u of users) {
    for (let lang of languages[u - 1]) langCount[lang]++;
  }
  let bestLang = 1, maxCount = 0;
  for (let i = 1; i <= n; i++) {
    if (langCount[i] > maxCount) {
      maxCount = langCount[i];
      bestLang = i;
    }
  }
  let toTeach = 0;
  for (let u of users) {
    if (!languages[u - 1].includes(bestLang)) toTeach++;
  }

  return toTeach;
};
