var generate = function (numRows) {
  // initilize the result array
  let dp = [];

  for (let i = 0; i < numRows; i++) {
    // Setup for each new row
    // We know that each row will have first and last number set to 1
    dp[i] = [];
    dp[i][0] = 1;
    dp[i][i] = 1;

    // Iterate over each position in the row,
    // and calculate the result for that position using the formula
    for (let j = 1; j < i; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];
    }
  }

  return dp;
};

console.log(generate(5)); // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate(1)); // [[1]]
