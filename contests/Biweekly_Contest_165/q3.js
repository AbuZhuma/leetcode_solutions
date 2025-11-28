function generateSchedule(n) {
    if (n < 2) return [];
    
    const totalMatches = n * (n - 1);
    const schedule = [];
    
    const isOdd = n % 2 === 1;
    let workingN = isOdd ? n + 1 : n;
    
    const rounds = workingN - 1;
    const matchesPerRound = workingN / 2;
    
    for (let round = 0; round < rounds * 2; round++) {
        for (let i = 0; i < matchesPerRound; i++) {
            const home = (round + i) % (workingN - 1);
            let away = (workingN - 1 - i + round) % (workingN - 1);
            
            if (i === 0) {
                away = workingN - 1;
            }
            
            if (isOdd && (home === workingN - 1 || away === workingN - 1)) {
                continue;
            }
            
            const actualHome = home;
            const actualAway = away;
            
            if (round < rounds) {
                schedule.push([actualHome, actualAway]);
            } else {
                schedule.push([actualAway, actualHome]);
            }
        }
    }
    
    const lastPlayed = new Array(n).fill(-2);
    for (let day = 0; day < schedule.length; day++) {
        const [home, away] = schedule[day];
        if (lastPlayed[home] === day - 1 || lastPlayed[away] === day - 1) {
            return [];
        }
        lastPlayed[home] = day;
        lastPlayed[away] = day;
    }
    
    return schedule;
}