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

## 796. Rotate String

**Problem**: Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.

A shift on s consists of moving the leftmost character of s to the rightmost position.

For example, if s = "abcde", then it will be "bcdea" after one shift.

**Example 1**:

- Input: s = "abcde", goal = "cdeab"
- Output: true

**Example 2**:

- Input: s = "abcde", goal = "abced"
- Output: false

**Constraints**:

- 1 <= s.length, goal.length <= 100
- s and goal consist of lowercase English letters.

**Planteos**
Existen dos formas de resolver el ejercicio-

1. Fuerza bruta.

```
"a b c d e"     "c d e a b"
 i               j
 i                 j j j
                         j
                 j j j

            == a b c d e
```

Si tenemos un puntero j, podemos iterarlo hasta que encuentre el valor de i. Luego podemos extraer un substring desde la posición de j y con la misma cantidad de caracteres que la longitud de s.

Si coinciden retornamos true.

T: O(n<sup>2</sup>)
S: O(n<sup>2</sup>)

2. Otra forma es concatenar el string al mismo string (duplicarlo).

```
s                 goal
"abcde"           "cdeab"
"abcdeabcde"      "cdeab"
```

Ahora podemos buscar goal dentro de s.

T: O(n)
S: O(n)

**Solution**

```js
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function (s, goal) {
  //////////////////////////////////////
  // Solución fuerza bruta            //
  // Runtime 52 ms; Memory: 48.08 MB  //
  //////////////////////////////////////

  // for (let i = 0; i < s.length; i++) {
  //   if (goal.includes(s)) return true;
  //   s = s.substr(1) + s[0];
  // }
  // return false;

  //////////////////////////////////////
  // Solución sumando string          //
  // Runtime 49 ms; Memory: 48.51 MB  //
  //////////////////////////////////////

  if (s.length !== goal.length) return false;
  if (s.length === 0 && goal.length === 0) return true;

  s = s + s;

  return s.includes(goal);
};

console.log(rotateString('abcde', 'cdeab')); // true
console.log(rotateString('abcde', 'abced')); // false
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
