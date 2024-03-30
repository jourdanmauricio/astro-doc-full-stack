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

## 415. Add Strings

**Problem**: Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and num2 as a string.

You must solve the problem without using any built-in library for handling large integers (such as BigInteger). You must also not convert the inputs to integers directly.

**Example 1**:

- Input: num1 = "11", num2 = "123"
- Output: "134"

**Example 2**:

- Input: num1 = "456", num2 = "77"
- Output: "533"

**Example 3**:

- Input: num1 = "0", num2 = "0"
- Output: "0"

**Constraints**:

- 1 <= num1.length, num2.length <= 104
- num1 and num2 consist of only digits.
- num1 and num2 don't have any leading zeros except for the zero itself.

**Solution**:

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

const sum = (cadena1, cadena2) => {
  let result = [];
  let acarreo = 0;

  for (let i = cadena1.length - 1; i >= 0; i--) {
    const last1 = Number(cadena1.pop());
    const last2 = Number(cadena2.pop());

    let res = last1 + acarreo;
    if (last2) res = res + last2;

    if (i === 0) {
      result.unshift(res);
      break;
    }

    if (res > 9) {
      result.unshift(res % 10);
      acarreo = 1;
    } else {
      result.unshift(res);
      acarreo = 0;
    }
  }
  return result.join('').toString();
};

var addStrings = function (num1, num2) {
  return num1.length > num2.length
    ? sum(num1.split(''), num2.split(''))
    : sum(num2.split(''), num1.split(''));
};

console.log(addStrings('11', '123')); // 134
console.log(addStrings('456', '77')); // 533
console.log(addStrings('0', '0')); //0
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
