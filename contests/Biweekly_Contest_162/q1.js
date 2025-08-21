var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    let minFinishTime = Infinity;

    for (let i = 0; i < landStartTime.length; i++) {
        for (let j = 0; j < waterStartTime.length; j++) {
            const startLand = landStartTime[i];
            const endLand = startLand + landDuration[i];

            const startWaterAfterLand = Math.max(endLand, waterStartTime[j]);
            const endWater = startWaterAfterLand + waterDuration[j];
            minFinishTime = Math.min(minFinishTime, endWater);

            const startWater = waterStartTime[j];
            const endWaterFirst = startWater + waterDuration[j];

            const startLandAfterWater = Math.max(endWaterFirst, landStartTime[i]);
            const endLandSecond = startLandAfterWater + landDuration[i];
            minFinishTime = Math.min(minFinishTime, endLandSecond);
        }  
    }

    return minFinishTime;
}
