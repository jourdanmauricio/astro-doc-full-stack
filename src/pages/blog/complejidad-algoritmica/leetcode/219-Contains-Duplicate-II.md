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

## <mark>219. Contains Duplicate II</mark>

**Problem**: Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

**Example 1**:

- Input: nums = [1,2,3,1], k = 3
- Output: true

**Example 2**:

- Input: nums = [1,0,1,1], k = 1
- Output: true

**Example 3**:

- Input: nums = [1,2,3,1,2,3], k = 2
- Output: false

**Constraints**:

- 1 <= nums.length <= 105
- -109 <= nums[i] <= 109
- 0 <= k <= 105

**Solution**:

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const hasmap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (i - hasmap.get(nums[i]) <= k) {
      return true;
    }
    hasmap.set(nums[i], i);
  }
  return false;
};
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)); // false
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
