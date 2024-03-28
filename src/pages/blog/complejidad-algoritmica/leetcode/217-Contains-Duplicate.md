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

## <mark>217. Contains Duplicate</mark>

**Problem**: Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

**Example 1**:

- Input: nums = [1,2,3,1]
- Output: true

**Example 2**:

- Input: nums = [1,2,3,4]
- Output: false

**Example 3**:

- Input: nums = [1,1,1,3,3,4,3,2,4,2]
- Output: true

**Constraints**:

- 1 <= nums.length <= 105
- -109 <= nums[i] <= 109

**Solution**:

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  // For
  // nums.sort((a, b) => a - b);
  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] === nums[i + 1]) {
  //     return true;
  //   }
  // }
  // return false;

  // Set
  const set = new Set(nums);
  return set.size !== nums.length;
};
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true
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
