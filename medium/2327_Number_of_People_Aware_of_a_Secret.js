var peopleAwareOfSecret = function(n, delay, forget) {
    const MOD = 10**9 + 7;
    let dp = Array(n + 1).fill(0);
    let total = 0;
    let newPeople = 0;

    dp[0] = 1;

    for (let day = 1; day <= n; day++) {
        if (day >= forget) {
            total = (total - dp[day - forget]) % MOD;
        }
        
        if (day >= delay) {
            newPeople = (newPeople + dp[day - delay]) % MOD;
        }
        
        total = (total + newPeople) % MOD;
        dp[day] = newPeople;
    }

    return total;
};

console.log(peopleAwareOfSecret(6, 2, 4));
console.log(peopleAwareOfSecret(4, 1, 3));