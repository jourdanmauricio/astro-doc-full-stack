---
layout: '../../layouts/BlogPostLayout.astro'
title: Algunos ejercicios de Leetcode
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/leetcode.png',
    alt: 'A picture of a coder',
  }
description: Resolución Ejercicios de Leetcode
draft: false
category: JS Leetcode
---

## 9. ❌ Palindrome Number

<details>
<summary>Ver</summary>

**Problem**: Given an integer x, return true if x is a palindrome, and false otherwise.

**Example 1**:

- Input: x = 121
- Output: true
- Explanation: 121 reads as 121 from left to right and from right to left.

**Example 2**:

- Input: x = -121
- Output: false
- Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

**Example 3**:

- Input: x = 10
- Output: false
- Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

**Constraints**:

- 231 <= x <= 231 - 1

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

  for (let i = 0; Math.floor(i < number.length / 2); i++) {
    if (number[i] !== number[number.length - i - 1]) res = false;
  }

  return res;
};
```

</details>

## 20. ❌ Valid Parentheses

<details>
<summary>Ver</summary>

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

- Input:
- n = 10
- ["call","call","call"]
- Output: [10,11,12]
- Explanation:
- counter() = 10 // The first time counter() is called, it returns n.
- counter() = 11 // Returns 1 more than the previous time.
- counter() = 12 // Returns 1 more than the previous time.

**Example 2**:

- Input:
- n = -2
- ["call","call","call","call","call"]
- Output: [-2,-1,0,1,2]
- Explanation: counter() initially returns -2. Then increases after each sebsequent call.

**Constraints**:

- 1000 <= n <= 1000
- 0 <= calls.length <= 1000
- calls[i] === "call"

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

## 14. ❌ Longest Common Prefix

<details>
<summary>Ver</summary>

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

## 27. Remove Element

<details>
<summary>Ver</summary>

**Problem**: Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

- Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
- Return k.

Custom Judge:

The judge will test your solution with the following code:

**Example 1**:

- Input: nums = [3,2,2,3], val = 3
- Output: 2, nums = [2,2,_,_]
- Explanation: Your function should return k = 2, with the first two elements of nums being 2.
- It does not matter what you leave beyond the returned k (hence they are underscores).

**Example 2**:

- Input: nums = [0,1,2,2,3,0,4,2], val = 2
- Output: 5, nums = [0,1,4,0,3,_,_,_]
- Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
- Note that the five elements can be returned in any order.
- It does not matter what you leave beyond the returned k (hence they are underscores).

```javascript
var removeElement = function (nums, val) {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
};
removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
```

</details>

## 28. ❌ Find the Index of the First Occurrence in a String

<details>
<summary>ver</summary>

**Problem**: Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

**Example 1**:

- Input: haystack = "sadbutsad", needle = "sad"
- Output: 0
- Explanation: "sad" occurs at index 0 and 6.
- The first occurrence is at index 0, so we return 0.

**Example 2**:

- Input: haystack = "leetcode", needle = "leeto"
- Output: -1
- Explanation: "leeto" did not occur in "leetcode", so we return -1.

**Constraints**:

- 1 <= haystack.length, needle.length <= 104
- haystack and needle consist of only lowercase English characters.

**Solution**:

```javascript
var strStr = function (haystack, needle) {
  return haystack.indexOf(needle);
};

console.log(strStr('sadbutsad', 'sad'));
```

</details>

## 35. Search Insert Position

<details>
<summary>ver</summary>

**Problem**: Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

**Example 1**:

- Input: nums = [1,3,5,6], target = 5
- Output: 2

**Example 2**:

- Input: nums = [1,3,5,6], target = 2
- Output: 1

**Example 3**:

- Input: nums = [1,3,5,6], target = 7
- Output: 4

**Constraints**:

- 1 <= nums.length <= 104
- -104 <= nums[i] <= 104
- nums contains distinct values sorted in ascending order.
- -104 <= target <= 104

**Solution**:

```javascript
var searchInsert = function (nums, target) {
  let leftIndex = 0;
  let rightIndex = nums.length - 1;

  while (leftIndex <= rightIndex) {
    let middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    if (target === nums[middleIndex]) return middleIndex;
    if (target < nums[middleIndex]) {
      rightIndex = middleIndex - 1;
    } else {
      leftIndex = middleIndex + 1;
    }
  }
  return leftIndex;
};

console.log(searchInsert([1, 3, 5, 6], 7));
// console.log(searchInsert([1,3,5,6], 2));
```

</details>

## 26. Remove Duplicates from Sorted Array

<details>
<summary>ver</summary>

**Problem**: Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

- Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
- Return k.

```javascript
var removeDuplicates = function (nums) {
  let k = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
};
```

</details>

## 58. ❌ Length of Last Word

<details>
<summary>Ver</summary>

**Problem**: Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.

**Example 1**:

- Input: s = "Hello World"
- Output: 5
- Explanation: The last word is "World" with length 5.

**Example 2**:

- Input: s = " fly me to the moon "
- Output: 4
- Explanation: The last word is "moon" with length 4.

**Example 3**:

- Input: s = "luffy is still joyboy"
- Output: 6
- Explanation: The last word is "joyboy" with length 6.

**Constraints**:

- 1 <= s.length <= 104
- s consists of only English letters and spaces ' '.
- There will be at least one word in s.

```javascript
var lengthOfLastWord = function (s) {
  let arr = s.trim().split(' ');
  let last = arr[arr.length - 1];

  return last.trim().length;
};

console.log(lengthOfLastWord('Hello World')); //5
console.log(lengthOfLastWord('   fly me   to   the moon  ')); //3
console.log(lengthOfLastWord('luffy is still joyboy')); //6
```

</details>

## 66. Plus One

<details>
<summary>Ver</summary>

**Problem**: You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

**Example1**:

- Input: digits = [1,2,3]
- Output: [1,2,4]
- Explanation: The array represents the integer 123.
- Incrementing by one gives 123 + 1 = 124.
- Thus, the result should be [1,2,4].

**Example2**:

- Input: digits = [4,3,2,1]
- Output: [4,3,2,2]
- Explanation: The array represents the integer 4321.
- Incrementing by one gives 4321 + 1 = 4322.
- Thus, the result should be [4,3,2,2].

**Example3**:

- Input: digits = [9]
- Output: [1,0]
- Explanation: The array represents the integer 9.
- Incrementing by one gives 9 + 1 = 10.
- Thus, the result should be [1,0].

**Constraints**:

- 1 <= digits.length <= 100
- 0 <= digits[i] <= 9
- digits does not contain any leading 0's.

**Soluction**

```javascript
var plusOne = function (digits) {
  let number = BigInt(digits.join(''));
  // console.log("number", number);
  number++;
  return number.toString().split('');
};
```

</details>

## 67. Add Binary

<details>
<summary>Ver</summary>

**Problem**: Given two binary strings a and b, return their sum as a binary string.

**Example 1**:

- Input: a = "11", b = "1"
- Output: "100"

**Example 2**:

- Input: a = "1010", b = "1011"
- Output: "10101"

**Constraints**:

- 1 <= a.length, b.length <= 104
- a and b consist only of '0' or '1' characters.

```javascript
var addBinary = function (a, b) {
  const num1 = BigInt(`0b${a}`);
  const num2 = BigInt(`0b${b}`);
  return (num1 + num2).toString(2);
};
```

console.log(addBinary("1010", "1011")); // "10101"
console.log(addBinary("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101", "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"));

// "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000"

</details>

## <mark>70. Climbing Stairs</mark>

<details>
<summary>Ver</summary>

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

```javascript
function climbingStaircase(n) {
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

</details>

## 88. Merge Sorted Array

<details>
<summary>Ver</summary>

**Problem**: You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

**Example 1**:

- Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
- Output: [1,2,2,3,5,6]
- Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
- The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

**Example 2**:

- Input: nums1 = [1], m = 1, nums2 = [], n = 0
- Output: [1]
- Explanation: The arrays we are merging are [1] and [].
- The result of the merge is [1].

**Example 3**:

- Input: nums1 = [0], m = 0, nums2 = [1], n = 1
- Output: [1]
- Explanation: The arrays we are merging are [] and [1].
- The result of the merge is [1].
- Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.

```javascript
var merge = function (nums1, m, nums2, n) {
  let j = 0;
  for (let i = m; i < nums1.length; i++) {
    nums1[i] = nums2[j];
    j++;
  }
  return nums1.sort((a, b) => a - b);
};

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)); // [1,2,2,3,5,6]
console.log(merge([1], 1, [], 0)); // [1]
console.log(merge([0], 0, [1], 1)); // [1]
```

</details>

## 13. Roman to Integer

<details>
<summary>Ver</summary>

**Problem**: Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol Value
I 1
V 5
X 10
L 50
C 100
D 500
M 1000

For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.

**Example 1**:

- Input: s = "III"
- Output: 3
- Explanation: III = 3.

**Example 2**:

- Input: s = "LVIII"
- Output: 58
- Explanation: L = 50, V= 5, III = 3.

**Example 3**:

- Input: s = "MCMXCIV"
- Output: 1994
- Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

**Constraints**:

- 1 <= s.length <= 15
- s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
- It is guaranteed that s is a valid roman numeral in the range [1, 3999].

```javascript
var romanToInt = function (s) {
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  let prevValue = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    const currentValue = romanMap[s[i]];

    if (currentValue >= prevValue) {
      result += currentValue;
    } else {
      result -= currentValue;
    }

    prevValue = currentValue;
  }

  return result;
};
console.log(romanToInt('III')); // 3
console.log(romanToInt('LVIII')); // 58
console.log(romanToInt('MCMXCIV')); // 1994
```

</details>

## ❌ 125. Valid Palindrome

<details>
<summary>Ver</summary>

**Problem**: A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

**Example 1**:

- Input: s = "A man, a plan, a canal: Panama"
- Output: true
- Explanation: "amanaplanacanalpanama" is a palindrome.

**Example 2**:

- Input: s = "race a car"
- Output: false
- Explanation: "raceacar" is not a palindrome.

**Example 3**:

- Input: s = " "
- Output: true
- Explanation: s is an empty string "" after removing non-alphanumeric characters.
- Since an empty string reads the same forward and backward, it is a palindrome.

**Constraints**:

- 1 <= s.length <= 2 \* 105
- s consists only of printable ASCII characters.

```javascript
var isPalindrome = function (s) {
  const words = s.replace(/[^0-9a-zA-Z]+/gim, '');
  const str = words.toLowerCase();
  for (let i = 0; i <= str.length / 2; i++) {
    if (str[i] !== str[str.length - (i + 1)]) {
      return false;
    }
  }
  return true;
};

console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car')); // false
console.log(isPalindrome(' ')); // true
```

</details>

## 136. Single Number

<details>
<summary>Ver</summary>
 
**Problem**: Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1**:
Input: nums = [2,2,1]
Output: 1

**Example 2**:
Input: nums = [4,1,2,1,2]
Output: 4

**Example 3**:
Input: nums = [1]
Output: 1

**Constraints**:
1 <= nums.length <= 3 _ 104
-3 _ 104 <= nums[i] <= 3 \* 104
Each element in the array appears twice except for one element which appears only once.

**Solution**:

```javascript
var singleNumber = function (nums) {
  let sortArr = nums.sort((a, b) => a - b);

  for (let i = 0; i < sortArr.length; i += 2) {
    if (sortArr[i] !== sortArr[i + 1]) return sortArr[i];
  }
};
console.log(singleNumber([2, 2, 1])); // 1
console.log(singleNumber([4, 1, 2, 1, 2])); // 4
console.log(singleNumber([1])); // 1
```

</details>

## <mark>169. Majority Element</mark>

<details>
<summary>Ver</summary>

**Problem**: Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

**Example 1**:
Input: nums = [3,2,3]
Output: 3

**Example 2**:
Input: nums = [2,2,1,1,1,2,2]
Output: 2

**Constraints**:
n == nums.length
1 <= n <= 5 \* 104
-109 <= nums[i] <= 109

Follow-up: Could you solve the problem in linear time and in O(1) space?

```javascript
// Boyer-Moore Voting Algorithm. Equilibrio para sobrevivir
var majorityElement = function (nums) {
  let candidate;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
    }
    count += nums[i] === candidate ? 1 : -1;
  }
  return candidate;
};

console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
```

</details>

## <mark>217. Contains Duplicate</mark>

<details>
<summary>Ver</summary>

**Problem**: Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

**Example 1**:
Input: nums = [1,2,3,1]
Output: true

**Example 2**:
Input: nums = [1,2,3,4]
Output: false

**Example 3**:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

**Constraints**:
1 <= nums.length <= 105
-109 <= nums[i] <= 109

**Solution**:

```javascript
var containsDuplicate = function (nums) {
  const s = new Set(nums);
  if (s.size !== nums.length) return true;
  return false;

  // nums.sort((a, b) => a - b);
  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] === nums[i + 1]) {
  //     return true;
  //   }
  // }
  // return false;
};
console.log(containsDuplicate([1, 2, 3, 1]));
console.log(containsDuplicate([1, 2, 3, 4]));
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]));
```

</details>

## 231 Power of Two

<details>
<summary>Ver</summary>

**Problem**: Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2x.

**Example 1**:
Input: n = 1
Output: true
Explanation: 20 = 1

**Example 2**:
Input: n = 16
Output: true
Explanation: 24 = 16

**Example 3**:
Input: n = 3
Output: false

**Constraints**:
-231 <= n <= 231 - 1

**Solution**:

```javascript
var isPowerOfTwo = function (n) {
  let x = 0;
  while (2 ** x < n) {
    x++;
  }
  return 2 ** x === n;
};

console.log(isPowerOfTwo(1));
console.log(isPowerOfTwo(16));
console.log(isPowerOfTwo(3));
```

</details>

## 268. Missing Number

<details>
<summary>Ver</summary>

**Problem**: Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

**Example 1**:

- Input: nums = [3,0,1]
- Output: 2
- Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

**Example 2**:

- Input: nums = [0,1]
- Output: 2
- Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

**Example 3**:

- Input: nums = [9,6,4,2,3,5,7,0,1]
- Output: 8
- Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.

**Constraints**:

- n == nums.length
- 1 <= n <= 104
- 0 <= nums[i] <= n
- All the numbers of nums are unique.

**Solution**:

```javascript
var missingNumber = function (nums) {
  nums.sort((a, b) => a - b);
  if (nums[0] != 0) return 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + 1 !== nums[i + 1]) return nums[i] + 1;
  }
  return nums.length;
};

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
```

</details>

## 21. Merge Two Sorted Lists

<details>
<summary>Ver</summary>

**Problem**: You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Example 1**:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

**Example 2**:
Input: list1 = [], list2 = []
Output: []

**Example 3**:
Input: list1 = [], list2 = [0]
Output: [0]

**Constraints**:
The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.

**Solution**:

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let tempNode = new ListNode(0, null);
  let currentNode = tempNode;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      currentNode.next = list1;
      list1 = list1.next;
    } else {
      currentNode.next = list2;
      list2 = list2.next;
    }
    currentNode = currentNode.next;
  }
  currentNode.next = list1 || list2;

  return tempNode.next;
};
console.log(mergeTwoLists([1, 2, 4], [1, 3, 4])); // [1,1,2,3,4,4]
console.log(mergeTwoLists([], [])); // []
console.log(mergeTwoLists([], [0])); //[0]
```

</details>

## 83. Remove Duplicates from Sorted List

<details>
<summary>Ver</summary>

**Problem**: Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

**Example 1**:
Input: head = [1,1,2]
Output: [1,2]

**Example 2**:
Input: head = [1,1,2,3,3]
Output: [1,2,3]

**Constraints**:
The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.

**Solution**:

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let cur = head;
  while (cur && cur.next) {
    if (cur.val == cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return head;
};
console.log(deleteDuplicates([1, 1, 2])); // [1,2]
console.log(deleteDuplicates([1, 1, 2, 3, 3])); // [1,2,3]
```

</details>

## 118. Pascal's Triangle

<details>
<summary>Ver</summary>

**Problem**: Given an integer numRows, return the first numRows of Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it.

**Example 1**:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

**Example 2**:
Input: numRows = 1
Output: [[1]]

**Constraints**:
1 <= numRows <= 30

**Solution**:

```javascript
var generate = function (numRows) {
  // initilize the result array
  let dp = [];

  for (let i = 0; i < numRows; i++) {
    // Setup for each new row
    // We know that each row will have first and last number set to 1
    dp[i] = [];
    dp[i][0] = 1;
    dp[i][i] = 1;

    // Iterate over each position in the row,
    // and calculate the result for that position using the formula
    for (let j = 1; j < i; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];
    }
  }

  return dp;
};

console.log(generate(5)); // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate(1)); // [[1]]
```

</details>

## <mark>121. Best Time to Buy and Sell Stock</mark>

<details>
<summary>Ver</summary>

**Problem**: You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

**Example 1**:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

**Example 2**:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

**Constraints**:
1 <= prices.length <= 105
0 <= prices[i] <= 104

```javascript
var maxProfit = function (prices) {
  let left = 0; // Buy
  let right = 1; // sell
  let max_profit = 0;
  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      let profit = prices[right] - prices[left]; // our current profit

      max_profit = Math.max(max_profit, profit);
    } else {
      left = right;
    }
    right++;
  }
  return max_profit;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
```

</details>

## <mark>202. Happy Number</mark>

<details>
<summary>Ver</summary>

**Problem**: Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the squares of its digits.
Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

**Example 1**:
Input: n = 19
Output: true
Explanation:

- 1<sup>2</sup> + 9<sup>2</sup> = 82
- 8<sup>2</sup> + 2<sup>2</sup> = 68
- 6<sup>2</sup> + 8<sup>2</sup> = 100
- 1<sup>2</sup> + 0<sup>2</sup> + 0<sup>2</sup> = 1

**Example 2**:
Input: n = 2
Output: false

**Constraints**:
1 <= n <= 231 - 1

**Solution**:

```javascript
var isHappy = function (n) {
  const set = new Set();
  let sum = n;

  while (sum !== 1) {
    let newSum = 0;
    sum
      .toString()
      .split('')
      .forEach((v) => (newSum += v * v));

    if (set.has(newSum)) return false;
    set.add(newSum);
    sum = newSum;
  }
  return true;
};

console.log(isHappy(19)); // true
console.log(isHappy(2)); // false
console.log(isHappy(7)); // true
console.log(isHappy(23)); // true
```

</details>

## 205. Isomorphic Strings

<details>
<summary>Ver</summary>

**Problem**: Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

**Example 1**:
Input: s = "egg", t = "add"
Output: true

**Example 2**:
Input: s = "foo", t = "bar"
Output: false

**Example 3**:
Input: s = "paper", t = "title"
Output: true

**Constraints**:
1 <= s.length <= 5 \* 104
t.length == s.length
s and t consist of any valid ascii character.

**Solution**:

```javascript
var isIsomorphic = function (s, t) {
  // console.log(s, t);
  let mapS = new Map();
  let mapT = new Map();

  for (let i = 0; i < s.length; i++) {
    if (!mapS.has(s[i])) {
      mapS.set(s[i], t[i]);
    } else {
      if (mapS.get(s[i]) !== t[i]) return false;
    }

    if (!mapT.has(t[i])) {
      mapT.set(t[i], s[i]);
    } else {
      if (mapT.get(t[i]) !== s[i]) return false;
    }
  }
  return true;
};
console.log(isIsomorphic('badc', 'baba')); // false
console.log(isIsomorphic('egg', 'add')); // true
console.log(isIsomorphic('paper', 'title')); // true
console.log(isIsomorphic('foo', 'bar')); // false
```

</details>

## <mark>219. Contains Duplicate II</mark>

<details>
<summary>Ver</summary>

**Problem**: Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

**Example 1**:
Input: nums = [1,2,3,1], k = 3
Output: true

**Example 2**:
Input: nums = [1,0,1,1], k = 1
Output: true

**Example 3**:
Input: nums = [1,2,3,1,2,3], k = 2
Output: false

**Constraints**:
1 <= nums.length <= 105
-109 <= nums[i] <= 109
0 <= k <= 105

**Solution**:

```javascript
var containsNearbyDuplicate = function (nums, k) {
  const hasmap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (i - hasmap.get(nums[i]) <= k) {
      return true;
    }
    hasmap.set(nums[i], i);
  }
  return false;
};
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)); // false
```

</details>

## 228. Summary Ranges

<details>
<summary>ver</summary>

**Problem**: You are given a sorted unique integer array nums. A range [a,b] is the set of all integers from a to b (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:

- "a->b" if a != b
- "a" if a == b

**Example 1**:
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"

**Example 2**:
Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"

**Constraints**:
0 <= nums.length <= 20
-231 <= nums[i] <= 231 - 1
All the values of nums are unique.
nums is sorted in ascending order.

**Solution**:

```javascript
var summaryRanges = function (nums) {
  let result = [];
  let start = nums[0];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + 1 !== nums[i + 1]) {
      if (start - nums[i] + 1 === 1) {
        result.push(`${start}`);
      } else {
        result.push(`${start}->${nums[i]}`);
      }
      start = nums[i + 1];
    }
  }
  return result;
};
console.log(summaryRanges([0, 1, 2, 4, 5, 7]));
console.log(summaryRanges([0, 2, 3, 4, 6, 8, 9]));
```

</details>

## 258. Add Digits

<details>
<summary>Ver</summary>

**Problem**: Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.

**Example 1**:
Input: num = 38
Output: 2
Explanation: The process is
38 --> 3 + 8 --> 11
11 --> 1 + 1 --> 2
Since 2 has only one digit, return it.

**Example 2**:
Input: num = 0
Output: 0

**Constraints**:
0 <= num <= 231 - 1

```javascript
var addDigits = function (num) {
  const arrNums = (str) => {
    const res = str
      .toString()
      .split('')
      .map((el) => +el);
    return res.reduce((acc, cur) => acc + cur, 0);
  };

  do {
    num = arrNums(num);
  } while (num > 9);

  return num;
};
console.log(addDigits(38)); //2
console.log(addDigits(0)); //0
```

</details>

## <mark>263. Ugly Number</mark>

<details>
<summary>Ver</summary>

**Problem**: An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.
Given an integer n, return true if n is an ugly number.

**Example 1**:
Input: n = 6
Output: true
Explanation: 6 = 2 × 3

**Example 2**:
Input: n = 1
Output: true
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.

**Example 3**:
Input: n = 14
Output: false
Explanation: 14 is not ugly since it includes the prime factor 7.

**Constraints**:
-231 <= n <= 231 - 1

**Solution**:

```javascript
var isUgly = function (n) {
  if (n === 0) return false;
  if (n === 1) return true;
  while (n % 2 === 0) n /= 2;
  while (n % 3 === 0) n /= 3;
  while (n % 5 === 0) n /= 5;
  return n == 1;
};

console.log(isUgly(6)); // true
console.log(isUgly(1)); // true
console.log(isUgly(14)); // false
```

</details>

## 191. Number of 1 Bits

<details>
<summary>Ver</summary>

**Problem**: Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Example 1**:
Input: n = 00000000000000000000000000001011
Output: 3
Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.

**Example 2**:
Input: n = 00000000000000000000000010000000
Output: 1
Explanation: The input binary string 00000000000000000000000010000000 has a total of one '1' bit.

**Example 3**:
Input: n = 11111111111111111111111111111101
Output: 31
Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one '1' bits.

**Constraints**:
The input must be a binary string of length 32.

```javascript
let bitMask = 1;
let count = 0;
for (let i = 0; i < 32; i++) {
  if (n & bitMask) count++;
  n >>= bitMask;
}
return count;
```

Follow up: If this function is called many times, how would you optimize it?

</details>

## <mark>242. Valid Anagram</mark>

<details>
<summary>Ver</summary>

**Problem**: Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1**:
Input: s = "anagram", t = "nagaram"
Output: true

**Example 2**:
Input: s = "rat", t = "car"
Output: false

**Constraints**:
1 <= s.length, t.length <= 5 \* 104
s and t consist of lowercase English letters.

```javascript
var isAnagram = function (s, t) {
  // return s.split('').sort().join('')===t.split('').sort().join('');
  if (s.length !== t.length) return false;
  let map = {};
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = map[s[i]] ? map[s[i]] + 1 : 1;
    map[t[i]] = map[t[i]] ? map[t[i]] - 1 : -1;
  }
  for (let letter in map) {
    if (map[letter] !== 0) {
      return false;
    }
  }
  return true;
};
console.log(isAnagram('anagram', 'nagaram')); // true
console.log(isAnagram('rat', 'car')); // false
```

</details>

## 283. Move Zeroes

<details>
<summary>Ver</summary>

**Problem**: Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

**Example 1**:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

**Example 2**:
Input: nums = [0]
Output: [0]

**Constraints**:
1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1

Follow up: Could you minimize the total number of operations done?

**Solution**:

```javascript
var moveZeroes = function (nums) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[k] = nums[i];
      k++;
    }
  }
  for (let i = k; i < nums.length; i++) nums[i] = 0;
  return nums;
};

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1,3,12,0,0]
console.log(moveZeroes([0])); // [0]
```

</details>

## 278. First Bad Version

<details>
<summary>Ver</summary>

**Problem**: You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

**Example 1**:
Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.

**Example 2**:
Input: n = 1, bad = 1
Output: 1

**Constraints**:
1 <= bad <= n <= 231 - 1

```javascript
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    var start = 1,
      end = n;
    while (start < end) {
      var mid = Math.floor(start + (end - start) / 2);
      if (isBadVersion(mid)) {
        end = mid; // look on left side of mid
      } else {
        start = mid + 1; // look on the right side of mid
      }
    }
    return start;
  };
};
```

</details>

## 290. Word Pattern

<details>
<summary>Ver</summary>

**Problem**: Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

**Example 1**:
Input: pattern = "abba", s = "dog cat cat dog"
Output: true

**Example 2**:
Input: pattern = "abba", s = "dog cat cat fish"
Output: false

**Example 3**:
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false

**Constraints**:

- 1 <= pattern.length <= 300
- pattern contains only lower-case English letters.
- 1 <= s.length <= 3000
- s contains only lowercase English letters and spaces ' '.
- s does not contain any leading or trailing spaces.
- All the words in s are separated by a single space.

**Solution**:

```javascript
var wordPattern = function (pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;

  let mapP = new Map();
  let mapS = new Map();

  for (let i = 0; i < pattern.length; i++) {
    if (!mapP.has(pattern[i])) {
      mapP.set(pattern[i], words[i]);
    } else {
      if (mapP.get(pattern[i]) !== words[i]) return false;
    }
    if (!mapS.has(words[i])) {
      mapS.set(words[i], pattern[i]);
    } else {
      if (mapS.get(words[i]) !== pattern[i]) return false;
    }
  }
  // console.log(mapP)
  // console.log(mapS)
  return true;
};
console.log(wordPattern('abba', 'dog cat cat dog')); // true
console.log(wordPattern('abba', 'dog cat cat fish')); // false
console.log(wordPattern('abba', 'dog dog dog dog')); // false
```

</details>

## 292. Nim Game

<details>
<summary>Ver</summary>

**Problem**:You are playing the following Nim Game with your friend:

- Initially, there is a heap of stones on the table.
- You and your friend will alternate taking turns, and you go first.
- On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
- The one who removes the last stone is the winner.

Given n, the number of stones in the heap, return true if you can win the game assuming both you and your friend play optimally, otherwise return false.

**Example 1**:
Input: n = 4
Output: false
Explanation: These are the possible outcomes:

1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.
2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.
3. You remove 3 stones. Your friend removes the last stone. Your friend wins.
   In all outcomes, your friend wins.

**Example 2**:
Input: n = 1
Output: true

**Example 3**:
Input: n = 2
Output: true

**Constraints**:
1 <= n <= 231 - 1

**Solution**:

```javascript
var canWinNim = function (n) {
  return n % 4 !== 0;
};
console.log(canWinNim(4)); // false
console.log(canWinNim(1)); // true
console.log(canWinNim(2)); // true
```

</details>

## 414. Third Maximum Number

<details>
<summary>Ver</summary>

**Problem**: Given an integer array nums, return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.

**Example 1**:

- Input: nums = [3,2,1]
- Output: 1
- Explanation:
- The first distinct maximum is 3.
- The second distinct maximum is 2.
- The third distinct maximum is 1.

**Example 2**:

- Input: nums = [1,2]
- Output: 2
- Explanation:
- The first distinct maximum is 2.
- The second distinct maximum is 1.
- The third distinct maximum does not exist, so the maximum (2) is returned instead.

**Example 3**:

- Input: nums = [2,2,3,1]
- Output: 1
- Explanation:
- The first distinct maximum is 3.
- The second distinct maximum is 2 (both 2's are counted together since they have the same value).
- The third distinct maximum is 1.

**Constraints**:

- 1 <= nums.length <= 104
- -231 <= nums[i] <= 231 - 1

Follow up: Can you find an O(n) solution?

```javascript
var thirdMax = function (nums) {
  const set = new Set(nums);
  const array = Array.from(set).sort((a, b) => b - a);
  // console.log(array[5]);
  return array[2] !== undefined ? array[2] : array[0];
};
console.log(thirdMax([3, 3, 4, 3, 4, 3, 0, 3, 3])); // 0
console.log(thirdMax([3, 2, 1])); // 1
console.log(thirdMax([1, 2])); // 2
console.log(thirdMax([2, 2, 3, 1])); // 1
```

</details>

## 412. Fizz Buzz

<details>
<summary>Ver</summary>

**Problem**: Given an integer n, return a string array answer (1-indexed) where:

- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.

**Example 1**:
Input: n = 3
Output: ["1","2","Fizz"]

**Example 2**:
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

**Example 3**:
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

**Constraints**:
1 <= n <= 104

**Solution**:

```javascript
var fizzBuzz = function (n) {
  let res = [];

  for (let i = 1; i <= n; i++) {
    let string = '';
    if (i % 3 === 0) string += 'Fizz';
    if (i % 5 === 0) string += 'Buzz';

    if (string === '') string += i;
    res.push(string);
  }
  return res;
};
console.log(fizzBuzz(3)); // ["1","2","Fizz"]
console.log(fizzBuzz(5)); // ["1","2","Fizz","4","Buzz"]
console.log(fizzBuzz(15)); // ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

</details>

## ❌ 344. Reverse String

<details>
<summary>Ver</summary>

**Problem**: Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

**Example 1**:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

**Example 2**:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

**Constraints**:
1 <= s.length <= 105
s[i] is a printable ascii character.

**Solution**:

```javascript
var reverseString = function (s) {
  let i = 0;
  j = s.length - 1;
  while (i < j) {
    let temp = s[i];
    s[i] = s[j];
    s[j] = temp;
    i++;
    j--;
  }
  return s;
};

console.log(reverseString(['h', 'e', 'l', 'l', 'o'])); // ["o","l","l","e","h"]
console.log(reverseString(['H', 'a', 'n', 'n', 'a', 'h'])); // ["h","a","n","n","a","H"]
```

</details>

## 345. Reverse Vowels of a String

<details>
<summary>Ver</summary>

**Problem**: Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

**Example 1**:
Input: s = "hello"
Output: "holle"

**Example 2**:
Input: s = "leetcode"
Output: "leotcede"

**Constraints**:
1 <= s.length <= 3 \* 105
s consist of printable ASCII characters.

**Solution**:

```javascript
var reverseVowels = function (s) {
  let arr = s.split('');
  const set = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

  let left = 0;
  let right = arr.length - 1;
  let temp;

  while (left <= right) {
    if (set.has(arr[left]) && set.has(arr[right])) {
      temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    } else !set.has(arr[left]) ? left++ : right--;
  }

  return arr.join('');
};

console.log(reverseVowels('hello')); // "holle"
console.log(reverseVowels('leetcode')); // "leotcede"
```

</details>

## 349. Intersection of Two Arrays

<details>
<summary>Ver</summary>

**Problem**: Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

**Example 1**:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

**Example 2**:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.

**Constraints**:
1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000

**Solution**:

```javascript
var intersection = function (nums1, nums2) {
  const intersect = (set1, set2) => {
    let res = [];

    for (const num of set1) {
      if (set2.has(num)) res.push(num);
    }
    return res;
  };

  let set1 = new Set(nums1);
  let set2 = new Set(nums2);

  return set1.size > set2.size ? intersect(set1, set2) : intersect(set2, set1);
};

console.log(intersection([1, 2, 2, 1], [2, 2])); //  [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]
```

</details>

## 350. Intersection of Two Arrays II

<details>
<summary>Ver</summary>

**Problem**: Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

**Example 1**:

- Input: nums1 = [1,2,2,1], nums2 = [2,2]
- Output: [2,2]

**Example 2**:

- Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
- Output: [4,9]
- Explanation: [9,4] is also accepted.

**Constraints**:

- 1 <= nums1.length, nums2.length <= 1000
- 0 <= nums1[i], nums2[i] <= 1000

**Follow up**:

- What if the given array is already sorted? How would you optimize your algorithm?
- What if nums1's size is small compared to nums2's size? Which algorithm is better?
- What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

```javascript
var intersect = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  let i = 0;
  let j = 0;
  let result = [];

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      result.push(nums1[i]);
      i++;
      j++;
    } else nums1[i] < nums2[j] ? i++ : j++;
  }

  return result;
};
console.log(intersect([1, 2, 2, 1], [2, 2])); // [2,2]
console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4])); // [4,9]
```

</details>

## 387. First Unique Character in a String

<details>
<summary>Ver</summary>

**Problem**: Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

**Example 1**:

- Input: s = "leetcode"
- Output: 0

**Example 2**:

- Input: s = "loveleetcode"
- Output: 2

**Example 3**:

- Input: s = "aabb"
- Output: -1

**Constraints**:

- 1 <= s.length <= 105
- s consists of only lowercase English letters.

**Solution**:

```javascript
var firstUniqChar = function (s) {
  for (let idx = 0; idx < s.length; idx++) {
    if (s.indexOf(s[idx]) === s.lastIndexOf(s[idx])) {
      return idx;
    }
  }
  return -1;
};
console.log(firstUniqChar('leetcode')); // 0
console.log(firstUniqChar('loveleetcode')); // 2
console.log(firstUniqChar('aabb')); // -1
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
