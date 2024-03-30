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

## 409. Longest Palindrome

**Problem**: Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

**Example 1**:

- Input: s = "abccccdd"
- Output: 7
- Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.

**Example 2**:

- Input: s = "a"
- Output: 1
- Explanation: The longest palindrome that can be built is "a", whose length is 1.

**Constraints**:

- 1 <= s.length <= 2000
- s consists of lowercase and/or uppercase English letters only.

**Solution**:

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  s = s.split('').sort();

  let result = 0;
  let single = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      result += 2;
      i++;
    } else {
      single = 1;
    }
  }
  return result + single;
};

console.log(longestPalindrome('abccccdd'));
console.log(longestPalindrome('aba'));
console.log(longestPalindrome('a'));
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
