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

## 20. Valid Parentheses

**Problem**: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Every close bracket has a corresponding open bracket of the same type.

**Example 1**:

- Input: s = "()"
- Output: true

**Example 2**:

- Input: s = "()[]{}"
- Output: true

**Example 3**:

- Input: s = "(]"
- Output: false

**Constraints**:

- 1 <= s.length <= 104
- s consists of parentheses only '()[]{}'.

**Solution**:

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let result = [];

  let map = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ]);

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      result.push(map.get(s[i]));
    } else if (s[i] === result[result.length - 1]) {
      result.pop();
    } else {
      return false;
    }
  }
  return result.length === 0;
};

console.log(isValid('()')); // true
console.log(isValid('()[]{}')); // true
console.log(isValid('(]')); // false
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
