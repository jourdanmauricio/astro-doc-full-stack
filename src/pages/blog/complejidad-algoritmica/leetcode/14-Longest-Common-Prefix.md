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

**Problem**: Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

**Example 1**:

- Input: strs = ["flower","flow","flight"]
- Output: "fl"

**Example 2**:

- Input: strs = ["dog","racecar","car"]
- Output: ""
- Explanation: There is no common prefix among the input strings.

**Constraints**:

- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i] consists of only lowercase English letters.

**Solution**:

- Realizar un sort del array nos permite que solo debamos verificar la última palabra del array,
- Tomamos la primer palabra del array y verificamos cada letra contra la última palabra
- Big-O = O(n)

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  strs.sort((a, b) => b.length - a.length);

  for (let i = 0; i < strs[0].length; i++) {
    const target = strs[0].substring(0, strs[0].length - i);

    if (strs.every((word) => word.includes(target))) return target;
  }

  return '';

  //  strs.sort();

  //  const last = strs[strs.length - 1];
  //  const first = strs[0];
  //  for (let i = 0; i < first.length; i++) {
  //    if (first[i] !== last[i]) {
  //      return first.substring(0, i);
  //    }
  //  }

  //  return strs[0];
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "ft"
console.log(longestCommonPrefix(['dog', 'racecar', 'car2'])); // ""
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
