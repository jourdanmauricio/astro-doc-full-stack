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

## 231 Power of Two

**Problem**: Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2x.

**Example 1**:

- Input: n = 1
- Output: true
- Explanation: 20 = 1

**Example 2**:

- Input: n = 16
- Output: true
- Explanation: 24 = 16

**Example 3**:

- Input: n = 3
- Output: false

**Constraints**:

- -231 <= n <= 231 - 1

**Solution**:

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  // Un número entero n es una potencia de dos, si existe un número entero x tal que n == 2x.

  for (let i = 0; 2 ** i <= n; i++) {
    if (n === 2 ** i) return true;
  }
  return false;
};

console.log(isPowerOfTwo(1)); // true
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(3)); // false
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
