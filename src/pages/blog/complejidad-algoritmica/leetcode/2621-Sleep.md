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

## 2621. Sleep

**Problem**: Given a positive integer millis, write an asynchronous function that sleeps for millis milliseconds. It can resolve any value.

**Example 1**:

- Input: millis = 100
- Output: 100
- Explanation: It should return a promise that resolves after 100ms.

```js
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
```

**Example 2**:

- Input: millis = 200
- Output: 200
- Explanation: It should return a promise that resolves after 200ms.

**Constraints**:

- 1 <= millis <= 1000

**Solution**

```js
/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('Hola');
    }, millis);
  });
}
/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

sleep(100).then((res) => console.log(res));
sleep(200).then((res) => console.log(res));
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
