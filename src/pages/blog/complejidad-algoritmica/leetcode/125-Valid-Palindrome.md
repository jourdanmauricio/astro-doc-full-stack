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

## 125. Valid Palindrome

**Problem**: A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

**Example 1**:

- Input: s = "A man, a plan, a canal: Panama"
- Output: true
- Explanation: "amanaplanacanalpanama" is a palindrome.

**Example 2**:

- Input: s = "race a car"
- Output: false
- Explanation: "raceacar" is not a palindrome.

**Example 3**:

- Input: s = " "
- Output: true
- Explanation: s is an empty string "" after removing non-alphanumeric characters.
- Since an empty string reads the same forward and backward, it is a palindrome.

**Constraints**:

- 1 <= s.length <= 2 \* 105
- s consists only of printable ASCII characters.

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  ////////////////////////////////////
  // for                            //
  // Runtime: 73ms, Memory: 51.35ms //
  ////////////////////////////////////

  // let cadena = s.toLowerCase();
  // cadena = cadena.replace(/[^a-z0-9]/g, '');

  // for (let i = 0; i < Math.floor(cadena.length / 2); i++) {
  //   if (cadena[i] !== cadena[cadena.length - 1 - i]) return false;
  // }
  // return true;

  ////////////////////////////////////
  // reverse                        //
  // Runtime: 62ms, Memory: 53.10ms //
  ////////////////////////////////////
  let cadena = s.toLowerCase();
  cadena = cadena.replace(/[^a-z0-9]/g, '');
  return cadena === cadena.split('').reverse().join('');
};

console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car')); // false
console.log(isPalindrome(' ')); // true
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
