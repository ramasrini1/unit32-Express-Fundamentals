function findMean(nums){
  if (nums.length === 0)
    return 0;
  sum = nums.reduce(function(accumalator, nextValue){
    return accumalator + nextValue;
  });
  return sum/nums.length;
}

function  convertAndValidateNumsArray(numsAsStrings){
  nums = [];
  for (let i = 0; i < numsAsStrings.length; i++) {
    valToNumber = Number(numsAsStrings[i]);
    if (Number.isNaN(valToNumber) ){
      return new Error(
        `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
      ); 
    }
    nums.push(valToNumber);
  }
  
  return nums;
}

function findMode(arr) {
  let freqCounter = new Map();
  let maxFreq = 0;
  let modes = [];
  let val = 0;

  for (num of arr){
    
    if (freqCounter.has(num)) {
      val = freqCounter.get(num) + 1;
      freqCounter.set(num, val);
    } else {
      val = 1;
      freqCounter.set(num, val);
    }
    if (val > maxFreq) maxFreq = val;
  }
  
  for (let [key, value] of freqCounter) {
    if ( value === maxFreq){
      modes.push(key);
    }
  }
  return modes;
}

function findMedian(nums){
  // sort and get the middle element

  nums.sort((a, b) => a - b);

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  return median;
}

module.exports = {
  findMean,
  convertAndValidateNumsArray,
  findMedian,
  findMode
};