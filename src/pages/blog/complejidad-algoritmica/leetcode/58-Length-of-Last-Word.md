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

## 58. Length of Last Word

**Problem**: Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.

**Example 1**:

- Input: s = "Hello World"
- Output: 5
- Explanation: The last word is "World" with length 5.

**Example 2**:

- Input: s = " fly me to the moon "
- Output: 4
- Explanation: The last word is "moon" with length 4.

**Example 3**:

- Input: s = "luffy is still joyboy"
- Output: 6
- Explanation: The last word is "joyboy" with length 6.

**Constraints**:

- 1 <= s.length <= 104
- s consists of only English letters and spaces ' '.
- There will be at least one word in s.

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  //   let arr = s.trim().split(' ');
  //   let last = arr[arr.length - 1];
  //
  //   return last.trim().length;

  // Expresion regular para cotar por uno o mas espacios
  s = s.trim().split(/\s+/);
  const lastWord = s[s.length - 1];

  return lastWord.length;
};

console.log(lengthOfLastWord('Hello World')); //5
console.log(lengthOfLastWord('   fly me   to   the moon  ')); //3
console.log(lengthOfLastWord('luffy is still joyboy')); //6
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
