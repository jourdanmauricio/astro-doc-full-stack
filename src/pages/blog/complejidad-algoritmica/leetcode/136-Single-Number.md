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

## 136. Single Number

**Problem**: Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1**:
Input: nums = [2,2,1]
Output: 1

**Example 2**:
Input: nums = [4,1,2,1,2]
Output: 4

**Example 3**:
Input: nums = [1]
Output: 1

**Constraints**:
1 <= nums.length <= 3 _ 104
-3 _ 104 <= nums[i] <= 3 \* 104
Each element in the array appears twice except for one element which appears only once.

**Solution**:

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  ////////////////////////////////
  // Sort                       //
  // Runtime: 73ms, Memory 52Mb //
  ////////////////////////////////
  // let sortArr = nums.sort((a, b) => a - b);

  // for (let i = 0; i < sortArr.length; i += 2) {
  //   if (sortArr[i] !== sortArr[i + 1]) return sortArr[i];
  // }

  ///////////////////////////////////
  // indexOf                       //
  // Runtime: 67ms, Memory 51.89Mb //
  ///////////////////////////////////

  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i])) return nums[i];
  }
};
console.log(singleNumber([2, 2, 1])); // 1
console.log(singleNumber([4, 1, 2, 1, 2])); // 4
console.log(singleNumber([1])); // 1
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
