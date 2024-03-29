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

## <mark>202. Happy Number</mark>

**Problem**: Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

**Example 1**:

- Input: n = 19
- Output: true
- Explanation:

1<sup>2</sup> + 9<sup>2</sup> = 82 <br>
8<sup>2</sup> + 2<sup>2</sup> = 68 <br>
6<sup>2</sup> + 8<sup>2</sup> = 100 <br>
1<sup>2</sup> + 0<sup>2</sup> + 0<sup>2</sup> = 1 <br>

**Example 2**:

- Input: n = 2
- Output: false

**Constraints**:

- 1 <= n <= 231 - 1

**Solution**:

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  let result = n;
  const set = new Set();

  while (result !== 1) {
    cadena = String(result);
    result = 0;

    for (let i = 0; i < cadena.length; i++) {
      const digit = parseInt(cadena[i], 10);
      result += digit * digit;
    }
    if (set.has(result)) return false;
    set.add(result);
  }

  return true;
};

console.log(isHappy(19)); // true
console.log(isHappy(2)); // false
console.log(isHappy(7)); // true
console.log(isHappy(23)); // true
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
