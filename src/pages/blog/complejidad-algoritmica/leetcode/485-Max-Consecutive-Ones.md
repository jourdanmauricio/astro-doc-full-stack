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

## 485. Max Consecutive Ones

**Problem**: Given a binary array nums, return the maximum number of consecutive 1's in the array.

**Example 1**:

- Input: nums = [1,1,0,1,1,1]
- Output: 3
- Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.

**Example 2**:

- Input: nums = [1,0,1,1,0,1]
- Output: 2

**Constraints**:

- 1 <= nums.length <= 105
- nums[i] is either 0 or 1.

**Solution**:

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let count = 0;
  let current = 0;

  for (let i = 0; i < nums.length; i++) {
    current = nums[i] === 0 ? 0 : current + 1;
    count = Math.max(current, count);
  }

  return count;
};

console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // 3
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])); // 2
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
