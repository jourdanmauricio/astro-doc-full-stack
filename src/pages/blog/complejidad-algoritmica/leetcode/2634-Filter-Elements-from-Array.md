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

## 2634. Filter Elements from Array

**Problem**: Given an integer array arr and a filtering function fn, return a filtered array filteredArr.

The fn function takes one or two arguments:

- arr[i] - number from the arr
- i - index of arr[i]

filteredArr should only contain the elements from the arr for which the expression fn(arr[i], i) evaluates to a truthy value. A truthy value is a value where Boolean(value) returns true.

Please solve it without the built-in Array.filter method.

**Example 1**:

- Input: arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
- Output: [20,30]
- Explanation: <br>
  const newArray = filter(arr, fn); // [20, 30] <br>
  The function filters out values that are not greater than 10 <br>

**Example 2**:

- Input: arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }
- Output: [1]
- Explanation: <br>
  fn can also accept the index of each element <br>
  In this case, the function removes elements not at index 0 <br>

**Example 3**:

- Input: arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 }
- Output: [-2,0,1,2]
- Explanation: Falsey values such as 0 should be filtered out

**Constraints**:

- 0 <= arr.length <= 1000
- -109 <= arr[i] <= 109

**Solution**:

```js
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) result.push(arr[i]);
  }

  return result;
};

console.log(
  filter([0, 10, 20, 30], function greaterThan10(n) {
    return n > 10;
  })
); // [20,30]

console.log(
  filter([1, 2, 3], function firstIndex(n, i) {
    return i === 0;
  })
); // [1]

console.log(
  filter([-2, -1, 0, 1, 2], function plusOne(n) {
    return n + 1;
  })
); // [-2,0,1,2]
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
