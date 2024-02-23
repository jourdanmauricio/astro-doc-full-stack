---
layout: '../../layouts/BlogPostLayout.astro'
title: Leetcode
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/leetcode.png',
    alt: 'A picture of a coder',
  }
description: Ejercicios en Leetcode
draft: false
category: JS Leetcode
---

## 9. Palindrome Number

<details>
<summary>Ver</summary>

**Problem**: Given an integer x, return true if x is a palindrome, and false otherwise.

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

**Problem**: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

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

**Problem**: Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.

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

## 2620. Counter

<details>
<summary>Ver</summary>

**Problem**: Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).

**Example**:

Input:
n = 10
["call","call","call"]
Output: [10,11,12]
Explanation:
counter() = 10 // The first time counter() is called, it returns n.
counter() = 11 // Returns 1 more than the previous time.
counter() = 12 // Returns 1 more than the previous time.
Example 2:

Input:
n = -2
["call","call","call","call","call"]
Output: [-2,-1,0,1,2]
Explanation: counter() initially returns -2. Then increases after each sebsequent call.

**Constraints**:

-1000 <= n <= 1000
0 <= calls.length <= 1000
calls[i] === "call"

**Solution**:

```javascript
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n) {
  let counter = n;
  return function () {
    return counter++;
  };
};
```

</details>

## 1. Two Sum

<details>
<summary>Ver</summary>

**Problem**: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1**:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2**:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**Constraints**:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.

Follow-up: Can you come up with an algorithm that is less than O(n<sup>2</sup>) time complexity?

**Solución**:

- Utilizar un map permite reducir el time complexity de O(n<sup>2</sup>) a O(n) ya que no debemos utilizar un segundo loop.
- La idea es guardar en un map u objeto pares clave - valor, donde la clave serán los números que ya evaluamos y el valor será la posición original dentro del array.

```javascript
// function twoSum(nums, target) {
//   const numToIndex = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     const complement = target - nums[i];
//     if (numToIndex.has(complement)) {
//       return [numToIndex.get(complement), i];
//     }
//     numToIndex.set(nums[i], i);
//   }
//   return [];
// }
// console.log(twoSum([3, 2, 4], 6));

function twoSum(nums, target) {
  const numMap = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in numMap) {
      return [numMap[complement], i];
    }
    numMap[nums[i]] = i;
  }
  return [];
}
console.log(twoSum([3, 2, 4], 6)); // [ 1, 2 ]
console.log(twoSum([2, 7, 11, 15], 9)); // [ 0, 1 ]
```

</details>

## 14. Longest Common Prefix

<details>
<summary>Ver</summary>

**Problem**: Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

**Example 1**:

Input: strs = ["flower","flow","flight"]
Output: "fl"

**Example 2**:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

**Constraints**:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.

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
  strs.sort();

  const last = strs[strs.length - 1];
  const first = strs[0];
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== last[i]) {
      return first.substring(0, i);
    }
  }

  return strs[0];
};
```

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
