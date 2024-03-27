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

## 2620. Counter

**Problem**: Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).

**Example**:

- Input:
- n = 10
- ["call","call","call"]
- Output: [10,11,12]
- Explanation:
- counter() = 10 // The first time counter() is called, it returns n.
- counter() = 11 // Returns 1 more than the previous time.
- counter() = 12 // Returns 1 more than the previous time.

**Example 2**:

- Input:
- n = -2
- ["call","call","call","call","call"]
- Output: [-2,-1,0,1,2]
- Explanation: counter() initially returns -2. Then increases after each sebsequent call.

**Constraints**:

- 1000 <= n <= 1000
- 0 <= calls.length <= 1000
- calls[i] === "call"

**Solution**:

```js
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n) {
  let counter = n;
  return function () {
    return counter++;
  };
};

const ejUno = createCounter(10);
console.log(ejUno()); // 10
console.log(ejUno()); // 11
console.log(ejUno()); // 12

const ejDos = createCounter(-2);
console.log(ejDos()); // -2
console.log(ejDos()); // -1
console.log(ejDos()); // 0
console.log(ejDos()); // 1
console.log(ejDos()); // 2
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
