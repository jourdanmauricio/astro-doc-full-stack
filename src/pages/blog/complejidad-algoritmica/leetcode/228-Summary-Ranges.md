---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Leetcode
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/complejidad-algoritmica/back-leetcode.png',
    alt: 'Leetcode - js',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/complejidad-algoritmica/icon.png',
    alt: 'Logo Leetcode',
  }
description: Ejercicios Leetcode.
draft: false
category: Leetcode
---

https://leetcode.com/

## 228. Summary Ranges

**Problem**: You are given a sorted unique integer array nums. A range [a,b] is the set of all integers from a to b (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:

- "a->b" if a != b
- "a" if a == b

**Example 1**:

- Input: nums = [0,1,2,4,5,7]
- Output: ["0->2","4->5","7"]
- Explanation: The ranges are:
  [0,2] --> "0->2" <br>
  [4,5] --> "4->5" <br>
  [7,7] --> "7" <br>

**Example 2**:

- Input: nums = [0,2,3,4,6,8,9]
- Output: ["0","2->4","6","8->9"]
- Explanation: The ranges are:
  [0,0] --> "0" <br>
  [2,4] --> "2->4" <br>
  [6,6] --> "6" <br>
  [8,9] --> "8->9" <br>

**Constraints**:

- 0 <= nums.length <= 20
- -231 <= nums[i] <= 231 - 1
- All the values of nums are unique.
- nums is sorted in ascending order.

**Solution**:

```javascript
var summaryRanges = function (nums) {
  let result = [];
  let start = nums[0];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + 1 !== nums[i + 1]) {
      if (start - nums[i] + 1 === 1) {
        result.push(`${start}`);
      } else {
        result.push(`${start}->${nums[i]}`);
      }
      start = nums[i + 1];
    }
  }
  return result;
};
console.log(summaryRanges([0, 1, 2, 4, 5, 7]));
console.log(summaryRanges([0, 2, 3, 4, 6, 8, 9]));
```

<style>
  h1 { color: #713f12; }
  h2 { color: #2563eb; }
  h3 { color: #a855f7; }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  pre {
    padding: 10px;
  }
</style>
