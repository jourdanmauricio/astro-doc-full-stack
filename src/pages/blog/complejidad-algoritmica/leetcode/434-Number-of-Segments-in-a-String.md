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

## 434. Number of Segments in a String

**Problem**: Given a string s, return the number of segments in the string.

A segment is defined to be a contiguous sequence of non-space characters.

**Example 1**:

- Input: s = "Hello, my name is John"
- Output: 5
- Explanation: The five segments are ["Hello,", "my", "name", "is", "John"]

**Example 2**:

- Input: s = "Hello"
- Output: 1

**Constraints**:

- 0 <= s.length <= 300
- s consists of lowercase and uppercase English letters, digits, or one of the following characters "!@#$%^&\*()\_+-=',.:".
- The only space character in s is ' '.

**Solution**:

```js
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
  // Runtime: 53ms, Memory: 47.10
  // if (!s.trim()) return 0;

  // s = s.split(' ');
  // s = s.map((cadena) => cadena.trim());
  // s = s.filter((char) => char !== '');

  // return s.length;

  // Runtime: 46ms, Memory: 48.81 MB
  if (s.trim() === '') return 0;
  return s.trim().split(/\s+/).length;
};
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
