---
layout: '../../layouts/BlogPostLayout.astro'
title: Complejidad algorítmica II - Leetcode
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/leetcode.png',
    alt: 'A picture of a coder',
  }
description: Complejidad algorítmica utilizando javascript - Ejercicios en Leetcode
draft: false
category: JS Leetcode
---

## 9. Palindrome Number

<details>
<summary>Ver</summary>

Given an integer x, return true if x is a palindrome, and false otherwise.

**Example 1**:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

**Example 2**:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

**Example 3**:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

**Constraints**:

-231 <= x <= 231 - 1

<mark>Follow up: Could you solve it without converting the integer to a string?</mark>

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  // const cadena = x.toString();
  // const array = cadena.split('');
  // const reverse = array.reverse();
  // return cadena === reverse.join('');
  const number = x.toString();
  let res = true;

  for (let i = 0; i < number.length; i++) {
    if (number[i] !== number[number.length - i - 1]) res = false;
  }

  return res;
};
```

</details>

## 20. Valid Parentheses

<details>
<summary>Ver</summary>

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

**Example 1**:

Input: s = "()"
Output: true

**Example 2**:

Input: s = "()[]{}"
Output: true

**Example 3**:

Input: s = "(]"
Output: false

**Constraints**:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.

**Solución**:

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let map = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
  ]);

  let result = [];

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      result.push(map.get(s[i]));
    } else if (s[i] !== result.pop()) {
      return false;
    }
  }
  return result.length === 0;
};
```

</details>

## 796. Rotate String

<details>
<summary>Ver</summary>

Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.

A shift on s consists of moving the leftmost character of s to the rightmost position.

For example, if s = "abcde", then it will be "bcdea" after one shift.

**Example 1**:

Input: s = "abcde", goal = "cdeab"
Output: true

**Example 2**:

Input: s = "abcde", goal = "abced"
Output: false

**Constraints**:

1 <= s.length, goal.length <= 100
s and goal consist of lowercase English letters.

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

**Solución**

```javascript
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function (s, goal) {
  if (s.length !== goal.length) return false;
  if (s.length === 0 && goal.length === 0) return true;

  s = s + s;

  return s.includes(goal);
};
```

- T: O(n)
- S: O(n)

</details>

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
