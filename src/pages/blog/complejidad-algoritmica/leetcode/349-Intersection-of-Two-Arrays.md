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

## 349. Intersection of Two Arrays

**Problem**: Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

**Example 1**:

- Input: nums1 = [1,2,2,1], nums2 = [2,2]
- Output: [2]

**Example 2**:

- Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
- Output: [9,4]
- Explanation: [4,9] is also accepted.

**Constraints**:

- 1 <= nums1.length, nums2.length <= 1000
- 0 <= nums1[i], nums2[i] <= 1000

**Solution**:

```js
var intersection = function (nums1, nums2) {
  // Sets
  // Runtime: 65ms, Memory: 50.55MB
  // let res = new Set();
  // const set1 = new Set(nums1);
  // const set2 = new Set(nums2);

  // for (let item of set1) {
  //   if (set2.has(item)) res.add(item);
  // }
  // return Array.from(res);

  // includes
  // Runtime: 47ms, Memory: 48.61MB
  let res = new Set();
  for (let i = 0; i < nums1.length; i++) {
    if (nums2.includes(nums1[i])) res.add(nums1[i]);
  }
  return Array.from(res);
};

console.log(intersection([1, 2, 2, 1], [2, 2])); //  [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]
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
