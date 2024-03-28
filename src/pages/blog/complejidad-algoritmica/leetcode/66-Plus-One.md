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

## 66. Plus One

**Problem**: You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

**Example1**:

- Input: digits = [1,2,3]
- Output: [1,2,4]
- Explanation: The array represents the integer 123.
- Incrementing by one gives 123 + 1 = 124.
- Thus, the result should be [1,2,4].

**Example2**:

- Input: digits = [4,3,2,1]
- Output: [4,3,2,2]
- Explanation: The array represents the integer 4321.
- Incrementing by one gives 4321 + 1 = 4322.
- Thus, the result should be [4,3,2,2].

**Example3**:

- Input: digits = [9]
- Output: [1,0]
- Explanation: The array represents the integer 9.
- Incrementing by one gives 9 + 1 = 10.
- Thus, the result should be [1,0].

**Constraints**:

- 1 <= digits.length <= 100
- 0 <= digits[i] <= 9
- digits does not contain any leading 0's.

**Soluction**

```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  //////////////////////////////////
  // Casteo                       //
  // Runtime: 57ms, Memory: 49.02 //
  //////////////////////////////////

  // let number = BigInt(digits.join(''));
  // // console.log("number", number);
  // number++;
  // return number.toString().split('');

  //////////////////////////////////
  // Bucle                        //
  // Runtime: 50ms, Memory: 48.98 //
  //////////////////////////////////

  let index = digits.length - 1;

  while (digits[index] === 9) {
    digits[index] = 0;
    index--;
  }

  if (index < 0) {
    digits.unshift(1);
  } else {
    digits[index] = digits[index] + 1;
  }

  return digits;
};
console.log(plusOne([0])); // [1]
console.log(plusOne([1, 2, 3])); // [1, 2, 4]
console.log(plusOne([4, 3, 2, 1])); // [4, 3, 2, 2]
console.log(plusOne([9])); // [1, 0]
console.log(plusOne([9, 9, 9])); // [1, 0, 0, 0]
console.log(plusOne([1, 1, 9, 9])); // [1, 2, 0, 0]
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
