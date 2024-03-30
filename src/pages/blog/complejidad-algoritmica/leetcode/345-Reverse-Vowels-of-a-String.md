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

## 345. Reverse Vowels of a String

**Problem**: Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

**Example 1**:

- Input: s = "hello"
- Output: "holle"

**Example 2**:

- Input: s = "leetcode"
- Output: "leotcede"

**Constraints**:

- 1 <= s.length <= 3 \* 105
- s consist of printable ASCII characters.

**Solution**:

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  let arr = s.split('');
  const set = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

  let left = 0;
  let right = arr.length - 1;
  let temp;

  while (left <= right) {
    if (set.has(arr[left]) && set.has(arr[right])) {
      temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    } else !set.has(arr[left]) ? left++ : right--;
  }

  return arr.join('');
};

console.log(reverseVowels('hello')); // "holle"
console.log(reverseVowels('leetcode')); // "leotcede"
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
