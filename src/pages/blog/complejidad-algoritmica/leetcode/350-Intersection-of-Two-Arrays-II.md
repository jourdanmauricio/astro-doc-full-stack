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

## 350. Intersection of Two Arrays II

**Problem**: Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

**Example 1**:

- Input: nums1 = [1,2,2,1], nums2 = [2,2]
- Output: [2,2]

**Example 2**:

- Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
- Output: [4,9]
- Explanation: [9,4] is also accepted.

**Constraints**:

- 1 <= nums1.length, nums2.length <= 1000
- 0 <= nums1[i], nums2[i] <= 1000

**Follow up**:

- What if the given array is already sorted? How would you optimize your algorithm?
- What if nums1's size is small compared to nums2's size? Which algorithm is better?
- What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {

var intersect = function (nums1, nums2) {
  //////////////////////////////////
  // sort - while                 //
  // runtime: 66ms, Memory: 50.98 //
  //////////////////////////////////
  // nums1.sort((a, b) => a - b);
  // nums2.sort((a, b) => a - b);

  // let i = 0;
  // let j = 0;
  // let result = [];

  // while (i < nums1.length && j < nums2.length) {
  //   if (nums1[i] === nums2[j]) {
  //     result.push(nums1[i]);
  //     i++;
  //     j++;
  //   } else nums1[i] < nums2[j] ? i++ : j++;
  // }

  // return result;

  //////////////////////////////////
  // Object                       //
  // runtime: 48ms, Memory: 49.94 //
  //////////////////////////////////
  let result = [];
  let counter = {};
  for (let i = 0; i < nums1.length; i++) {
    if (!counter[nums1[i]]) {
      counter[nums1[i]] = 1;
    } else {
      counter[nums1[i]] += 1;
    }
  }

  for (let i = 0; i < nums2.length; i++) {
    if (counter[nums2[i]]) {
      counter[nums2[i]] -= 1;
      result.push(nums2[i]);
    }
  }

  return result;
};
console.log(intersect([1, 2, 2, 1], [2, 2, 2, 2])); // [2,2]
console.log(intersect([1, 2, 2, 1], [2, 2])); // [2,2]
console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4])); // [4,9]
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
