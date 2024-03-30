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

## 290. Word Pattern

**Problem**: Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

**Example 1**:

- Input: pattern = "abba", s = "dog cat cat dog"
- Output: true

**Example 2**:

- Input: pattern = "abba", s = "dog cat cat fish"
- Output: false

**Example 3**:

- Input: pattern = "aaaa", s = "dog cat cat dog"
- Output: false

**Constraints**:

- 1 <= pattern.length <= 300
- pattern contains only lower-case English letters.
- 1 <= s.length <= 3000
- s contains only lowercase English letters and spaces ' '.
- s does not contain any leading or trailing spaces.
- All the words in s are separated by a single space.

**Solution**:

```javascript
var wordPattern = function (pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;

  let mapP = new Map();
  let mapS = new Map();

  for (let i = 0; i < pattern.length; i++) {
    if (!mapP.has(pattern[i])) {
      mapP.set(pattern[i], words[i]);
    } else {
      if (mapP.get(pattern[i]) !== words[i]) return false;
    }
    if (!mapS.has(words[i])) {
      mapS.set(words[i], pattern[i]);
    } else {
      if (mapS.get(words[i]) !== pattern[i]) return false;
    }
  }
  // console.log(mapP)
  // console.log(mapS)
  return true;
};
console.log(wordPattern('abba', 'dog cat cat dog')); // true
console.log(wordPattern('abba', 'dog cat cat fish')); // false
console.log(wordPattern('abba', 'dog dog dog dog')); // false
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
