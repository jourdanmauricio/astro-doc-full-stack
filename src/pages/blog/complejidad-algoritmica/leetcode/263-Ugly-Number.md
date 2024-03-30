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

## <mark>263. Ugly Number</mark>

**Problem**: An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.
Given an integer n, return true if n is an ugly number.

**Example 1**:

- Input: n = 6
- Output: true
- Explanation: 6 = 2 × 3

**Example 2**:

- Input: n = 1
- Output: true
- Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.

**Example 3**:

- Input: n = 14
- Output: false
- Explanation: 14 is not ugly since it includes the prime factor 7.

**Constraints**:

- -231 <= n <= 231 - 1

**Solution**:

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function (n) {
  if (n === 0) return false;
  if (n === 1) return true;
  while (n % 2 === 0) n /= 2;
  while (n % 3 === 0) n /= 3;
  while (n % 5 === 0) n /= 5;
  return n == 1;
};

console.log(isUgly(6)); // true
console.log(isUgly(1)); // true
console.log(isUgly(14)); // false
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
