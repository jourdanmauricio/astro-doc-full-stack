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

## 292. Nim Game

**Problem**:You are playing the following Nim Game with your friend:

- Initially, there is a heap of stones on the table.
- You and your friend will alternate taking turns, and you go first.
- On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
- The one who removes the last stone is the winner.

Given n, the number of stones in the heap, return true if you can win the game assuming both you and your friend play optimally, otherwise return false.

**Example 1**:

- Input: n = 4
- Output: false
- Explanation: These are the possible outcomes:

1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.
2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.
3. You remove 3 stones. Your friend removes the last stone. Your friend wins.
   In all outcomes, your friend wins.

**Example 2**:

- Input: n = 1
- Output: true

**Example 3**:

- Input: n = 2
- Output: true

**Constraints**:

- 1 <= n <= 231 - 1

**Solution**:

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function (n) {
  return n % 4 !== 0;
};

// 5: (1) (1 2 3) -> true
// 6: (1 2) (1 2 3) -> true
// 7: (1 2 3) (1 2 3) -> true
// 8: (1 2 3) (1 2 3) -> false
// 9: -1 -> true
// 10: -2 -> true
// 11: -3 -> true
// 12: -> false

console.log(canWinNim(4)); // false
console.log(canWinNim(1)); // true
console.log(canWinNim(2)); // true
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
