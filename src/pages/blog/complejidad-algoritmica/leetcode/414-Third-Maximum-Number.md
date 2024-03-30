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

## 414. Third Maximum Number

**Problem**: Given an integer array nums, return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.

**Example 1**:

- Input: nums = [3,2,1]
- Output: 1
- Explanation: <br>
  The first distinct maximum is 3. <br>
  The second distinct maximum is 2. <br>
  The third distinct maximum is 1. <br>

**Example 2**:

- Input: nums = [1,2]
- Output: 2
- Explanation: <br>
  The first distinct maximum is 2. <br>
  The second distinct maximum is 1. <br>
  The third distinct maximum does not exist, so the maximum (2) is returned instead. <br>

**Example 3**:

- Input: nums = [2,2,3,1]
- Output: 1
- Explanation: <br>
  The first distinct maximum is 3. <br>
  The second distinct maximum is 2 (both 2's are counted together since they have the same value). <br>
  The third distinct maximum is 1. <br>

**Constraints**:

- 1 <= nums.length <= 104
- -231 <= nums[i] <= 231 - 1

Follow up: Can you find an O(n) solution?

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  const set = new Set(nums);
  const array = Array.from(set).sort((a, b) => b - a);

  return array[2] !== undefined ? array[2] : array[0];
};
console.log(thirdMax([3, 3, 4, 3, 4, 3, 0, 3, 3])); // 0
console.log(thirdMax([3, 2, 1])); // 1
console.log(thirdMax([1, 2])); // 2
console.log(thirdMax([2, 2, 3, 1])); // 1
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
