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

## 9. Palindrome Number

**Problem**: Given an integer x, return true if x is a palindrome, and false otherwise.

**Example 1**:

- Input: x = 121
- Output: true
- Explanation: 121 reads as 121 from left to right and from right to left.

**Example 2**:

- Input: x = -121
- Output: false
- Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

**Example 3**:

- Input: x = 10
- Output: false
- Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

**Constraints**:

- 231 <= x <= 231 - 1

<mark>Follow up: Could you solve it without converting the integer to a string?</mark>

**Solution**

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  let cadena = x.toString();
  let result = true;

  for (let i = 0; Math.floor(i < cadena.length / 2); i++) {
    if (cadena[i] !== cadena[cadena.length - i - 1]) result = false;
  }

  return result;
};

console.log(isPalindrome(121)); // true
console.log(isPalindrome(-121)); // false
console.log(isPalindrome(10)); // false
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
