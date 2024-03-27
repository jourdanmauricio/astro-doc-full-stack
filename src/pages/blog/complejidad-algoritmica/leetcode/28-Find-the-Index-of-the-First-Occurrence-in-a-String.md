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

## 28. Find the Index of the First Occurrence in a String

**Problem**: Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

**Example 1**:

- Input: haystack = "sadbutsad", needle = "sad"
- Output: 0
- Explanation: "sad" occurs at index 0 and 6.
- The first occurrence is at index 0, so we return 0.

**Example 2**:

- Input: haystack = "leetcode", needle = "leeto"
- Output: -1
- Explanation: "leeto" did not occur in "leetcode", so we return -1.

**Constraints**:

- 1 <= haystack.length, needle.length <= 104
- haystack and needle consist of only lowercase English characters.

**Solution**:

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  return haystack.indexOf(needle);
};

console.log(strStr('sadbutsad', 'sad')); // 0
console.log(strStr('leetcode', 'leeto')); // -1
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
