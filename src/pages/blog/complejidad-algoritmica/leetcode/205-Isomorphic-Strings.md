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

## 205. Isomorphic Strings

**Problem**: Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

**Example 1**:

- Input: s = "egg", t = "add"
- Output: true

**Example 2**:

- Input: s = "foo", t = "bar"
- Output: false

**Example 3**:

- Input: s = "paper", t = "title"
- Output: true

**Constraints**:

- 1 <= s.length <= 5 \* 104
- t.length == s.length
- s and t consist of any valid ascii character.

**Solution**:

```js
var isIsomorphic = function (s, t) {
  // console.log(s, t);
  let mapS = new Map();
  let mapT = new Map();

  for (let i = 0; i < s.length; i++) {
    if (!mapS.has(s[i])) {
      mapS.set(s[i], t[i]);
    } else {
      if (mapS.get(s[i]) !== t[i]) return false;
    }

    if (!mapT.has(t[i])) {
      mapT.set(t[i], s[i]);
    } else {
      if (mapT.get(t[i]) !== s[i]) return false;
    }
  }
  return true;
};
console.log(isIsomorphic('badc', 'baba')); // false
console.log(isIsomorphic('egg', 'add')); // true
console.log(isIsomorphic('paper', 'title')); // true
console.log(isIsomorphic('foo', 'bar')); // false
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
