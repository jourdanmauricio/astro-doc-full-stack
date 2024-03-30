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

## 2635. Apply Transform Over Each Element in Array

**Problem**: Given an integer array arr and a mapping function fn, return a new array with a transformation applied to each element.

The returned array should be created such that returnedArray[i] = fn(arr[i], i).

Please solve it without the built-in Array.map method.

**Example 1**:

- Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
- Output: [2,3,4]
- Explanation:

```js
const newArray = map(arr, plusone); // [2,3,4]
```

The function increases each value in the array by one.

**Example 2**:

- Input: arr = [1,2,3], fn = function plusI(n, i) { return n + i; }
- Output: [1,3,5]
- Explanation: The function increases each value by the index it resides in.

**Example 3**:

- Input: arr = [10,20,30], fn = function constant() { return 42; }
- Output: [42,42,42]
- Explanation: The function always returns 42.

**Constraints**:

- 0 <= arr.length <= 1000
- -109 <= arr[i] <= 109
- fn returns a number

**Solution**

```js
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function (arr, fn) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i));
  }
  return result;
};

console.log(
  map([1, 2, 3], function plusone(n) {
    return n + 1;
  })
); //  [2,3,4]

console.log(
  map([1, 2, 3], function plusI(n, i) {
    return n + i;
  })
); //  [1,3,5]

console.log(
  map([10, 20, 30], function constant() {
    return 42;
  })
); //  [42,42,42]
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
