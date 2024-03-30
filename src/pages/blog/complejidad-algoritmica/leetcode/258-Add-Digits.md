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

## 258. Add Digits

**Problem**: Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.

**Example 1**:

- Input: num = 38
- Output: 2
- Explanation: The process is <br>
  38 --> 3 + 8 --> 11 <br>
  11 --> 1 + 1 --> 2 <br>
- Since 2 has only one digit, return it.

**Example 2**:

- Input: num = 0
- Output: 0

**Constraints**:

- 0 <= num <= 231 - 1

```js
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
  const arrNums = (str) => {
    const res = str
      .toString()
      .split('')
      .map((el) => +el);
    return res.reduce((acc, cur) => acc + cur, 0);
  };

  do {
    num = arrNums(num);
  } while (num > 9);

  return num;
};
console.log(addDigits(38)); //2
console.log(addDigits(0)); //0
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
