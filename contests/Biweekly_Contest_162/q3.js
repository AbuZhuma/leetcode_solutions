var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    const landFinishes = landStartTime.map((start, i) => start + landDuration[i]);
    const minLandFinish = Math.min(...landFinishes);
    
    const waterFinishes = waterStartTime.map((start, j) => start + waterDuration[j]);
    const minWaterFinish = Math.min(...waterFinishes);
    
    let case1 = Infinity;
    for (let j = 0; j < waterStartTime.length; j++) {
        const start = Math.max(minLandFinish, waterStartTime[j]);
        const finish = start + waterDuration[j];
        if (finish < case1) {
            case1 = finish;
            if (case1 === minLandFinish + Math.min(...waterDuration)) {
                break;
            }
        }
    }
    
    let case2 = Infinity;
    for (let i = 0; i < landStartTime.length; i++) {
        const start = Math.max(minWaterFinish, landStartTime[i]);
        const finish = start + landDuration[i];
        if (finish < case2) {
            case2 = finish;
            if (case2 === minWaterFinish + Math.min(...landDuration)) {
                break;
            }
        }
    }
    
    return Math.min(case1, case2);
};