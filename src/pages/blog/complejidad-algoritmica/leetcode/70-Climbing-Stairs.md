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

## <mark>70. Climbing Stairs</mark>

**Problem**: You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example 1**:

- Input: n = 2
- Output: 2
- Explanation: There are two ways to climb to the top.

1. 1 step + 1 step
2. 2 steps

**Example 2**:

- Input: n = 3
- Output: 3
- Explanation: There are three ways to climb to the top.

1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

**Constraints**:

- 1 <= n <= 45

**Ejemplo**:

- n=1, climbingStaircase(1) = 1 | (1)
- n=2, climbingStaircase(2) = 2 | (1, 1) and (2)
- n=3, climbingStaircase(3) = 3 | (1, 1, 1), (1, 2) and (2, 1)
- n=4, climbingStaircase(4) = 5 | (1, 1, 1, 1), (1, 1, 2), (1, 2, 1), (2, 1, 1) and (2, 2)

**Concepto**

En cualquier momento, puedes subir 1 o 2 escalones
Si tienes que subir al escalón ‘n’, solo puede hacerlo desde el escalon ‘n-1’ o ‘n-2’
Calcular las formas en que podemos subir al escalon n-1 y n-2 y sumarlas
climbingStaircase(n) = climbingStaircase(n-1) + climbingStaircase(n-2)

<mark>Es el patrón de la secuencia de Fibonacci</mark>

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbingStaircase(n) {
  const nroOfWays = [1, 2];

  for (let i = 2; i < n; i++) {
    nroOfWays[i] = nroOfWays[i - 1] + nroOfWays[i - 2];
  }
  return nroOfWays[n - 1];
}

console.log(climbingStaircase(1)); // 1
console.log(climbingStaircase(2)); // 2
console.log(climbingStaircase(3)); // 3
console.log(climbingStaircase(4)); // 5
console.log(climbingStaircase(5)); // 8
// Big-O = O(n)
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
