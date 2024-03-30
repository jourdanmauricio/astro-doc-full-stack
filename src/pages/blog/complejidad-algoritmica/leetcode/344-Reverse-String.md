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

## 344. Reverse String

**Problem**: Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

**Example 1**:

- Input: s = ["h","e","l","l","o"]
- Output: ["o","l","l","e","h"]

**Example 2**:

- Input: s = ["H","a","n","n","a","h"]
- Output: ["h","a","n","n","a","H"]

**Constraints**:

- 1 <= s.length <= 105
- s[i] is a printable ascii character.

**Solution**:

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  // reverse()
  // Runtime: 89, Memory: 57.50
  // return s.reverse();

  // let i = 0;
  // j = s.length - 1;
  // while (i < j) {
  //   let temp = s[i];
  //   s[i] = s[j];
  //   s[j] = temp;
  //   i++;
  //   j--;
  // }
  // return s;

  // for
  // Runtime: 73, Memory: 57.48
  const size = s.length - 1;
  for (let i = 0; i < Math.floor(s.length / 2); i++) {
    [s[i], s[size - i]] = [s[size - i], s[i]];
  }
  return s;
};

console.log(reverseString(['h', 'e', 'l', 'l', 'o'])); // ["o","l","l","e","h"]
console.log(reverseString(['H', 'a', 'n', 'n', 'a', 'h'])); // ["h","a","n","n","a","H"]
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
