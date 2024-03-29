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

## 118. Pascal's Triangle

**Problem**: Given an integer numRows, return the first numRows of Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it.

```bash
          1
        1   1
      1   2   1
    1   3   3   1
  1   4   6   4   1
1   5  10   10  5   1
```

**Example 1**:

- Input: numRows = 5
- Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

**Example 2**:

- Input: numRows = 1
- Output: [[1]]

**Constraints**:

- 1 <= numRows <= 30

**Solution**:

```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let rows = [];

  for (let i = 0; i < numRows; i++) {
    rows[i] = [];
    rows[i][0] = 1;
    rows[i][i] = 1;
    for (let j = 1; j < i; j++) {
      rows[i][j] = rows[i - 1][j] + rows[i - 1][j - 1];
    }
  }
  return rows;
};

console.log(generate(6)); // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate(1)); // [[1]]
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
