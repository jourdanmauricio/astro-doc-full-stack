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

## 459. Repeated Substring Pattern

**Problem**: Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

**Example 1**:

- Input: s = "abab"
- Output: true
- Explanation: It is the substring "ab" twice.

**Example 2**:

- Input: s = "aba"
- Output: false

**Example 3**:

- Input: s = "abcabcabcabc"
- Output: true
- Explanation: It is the substring "abc" four times or the substring "abcabc" twice.

**Constraints**:

- 1 <= s.length <= 104
- s consists of lowercase English letters.

**Solution**:

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  let end = Math.floor(s.length / 2);
  while (end > 0) {
    let substring = s.substring(0, end);
    if (substring.repeat(Math.floor(s.length / substring.length)) === s) {
      return true;
    }
    end -= 1;
  }
  return false;
};

console.log(repeatedSubstringPattern('abab')); // true
console.log(repeatedSubstringPattern('aba')); // false
console.log(repeatedSubstringPattern('abcabcabcabc')); // true
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
