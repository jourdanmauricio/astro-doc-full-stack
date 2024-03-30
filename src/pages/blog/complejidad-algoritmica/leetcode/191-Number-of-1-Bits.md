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

## 191. Number of 1 Bits

**Problem**: Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Example 1**:

- Input: n = 00000000000000000000000000001011
- Output: 3
- Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.

**Example 2**:

- Input: n = 00000000000000000000000010000000
- Output: 1
- Explanation: The input binary string 00000000000000000000000010000000 has a total of one '1' bit.

**Example 3**:

- Input: n = 11111111111111111111111111111101
- Output: 31
- Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one '1' bits.

**Constraints**:

- The input must be a binary string of length 32.

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  // let count = 0;
  // const str = n.toString(2);
  // for (let i = 0; i < str.length; i++) {
  //   if ((str[i] === '1')) count++;
  // }
  // return count;

  let bitMask = 1;
  let count = 0;
  for (let i = 0; i < 32; i++) {
    if (n & bitMask) count++;
    n >>= bitMask;
  }
  return count;
};
console.log(hammingWeight(00000000000000000000000000001011)); // 3
console.log(hammingWeight(00000000000000000000000010000000)); // 1
console.log(hammingWeight(11111111111111111111111111111101)); // 31
```

Follow up: If this function is called many times, how would you optimize it?

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
