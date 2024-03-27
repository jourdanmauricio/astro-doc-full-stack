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

## 1. Two Sum

**Problem**: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1**:

- Input: nums = [2,7,11,15], target = 9
- Output: [0,1]
- Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2**:

- Input: nums = [3,2,4], target = 6
- Output: [1,2]

**Example 3**:

- Input: nums = [3,3], target = 6
- Output: [0,1]

**Constraints**:

- 2 <= nums.length <= 104
- 109 <= nums[i] <= 109
- 109 <= target <= 109
- Only one valid answer exists.

Follow-up: Can you come up with an algorithm that is less than O(n<sup>2</sup>) time complexity?

**Solución**:

- Utilizar un map permite reducir el time complexity de O(n<sup>2</sup>) a O(n) ya que no debemos utilizar un segundo loop.
- La idea es guardar en un map u objeto pares clave - valor, donde la clave serán los números que ya evaluamos y el valor será la posición original dentro del array.

```js

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum(nums, target) {

  //////////////////////////////////////////
  // Solución de fuerza bruta. Big-O(n^2) //
  // Runtime: 103ms, Memory: 49.33MB       //
  //////////////////////////////////////////

  //  for (let i = 0; i < nums.length; i++) {
  //    for (let j = i + 1; j < nums.length; j++) {
  //      if (nums[i] + nums[j] === target) return [i, j];
  //    }
  //  }
  //  return [];

  ///////////////////////////////////////
  // Solución utilizando Map. Big-O(n) //
  // Runtime: 59ms, Memory: 52.46MB    //
  ///////////////////////////////////////

  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    // num + resto = target
    const resto = target - nums[i];
    if (map.has(target - nums[i])) return [i, map.get(resto)];
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]
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
