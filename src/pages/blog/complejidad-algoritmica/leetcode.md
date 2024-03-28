---
layout: '../../../layouts/SubBlogPostLayout.astro'
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

- [9. Palindrome Number](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/9-Palindrome-Number)
- [20. Valid Parentheses](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/20-Valid-Parentheses)
- [796. Rotate String](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/796-Rotate-String)
- [2620. Counter](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/2620-Counter)
- [1. Two Sum](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/1-Two-Sum)
- [14. Longest Common Prefix](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/14-Longest-Common-Prefix)
- [27. Remove Element](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/27-Remove-Element)
- [28. Find the Index of the First Occurrence in a String](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/28-Find-the-Index-of-the-First-Occurrence-in-a-String)
- [35. Search Insert Position](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/35-Search-Insert-Position)
- [26. Remove Duplicates from Sorted Array](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/26-Remove-Duplicates-from-Sorted-Array)
- [58. Length of Last Word](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/58-Length-of-Last-Word)
- [66. Plus One](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/66-Plus-One)
- [67. Add Binary](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/67-Add-Binary)
- [70. Climbing Stairs](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/70-Climbing-Stairs)
- [88. Merge Sorted Array](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/88-Merge-Sorted-Array)
- [13. Roman to Integer](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/13-Roman-to-Integer)
- [125. Valid Palindrome](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/125-Valid-Palindrome)
- [136. Single Number](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/136-Single-Number)
- [169. Majority Element](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/169-Majority-Element)
- [217. Contains Duplicate](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/217-Contains-Duplicate)
- [231. Power of Two](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/231-Power-of-Two)
- [268. Missing Number](/astro-doc-full-stack/blog/complejidad-algoritmica/leetcode/268-Missing-Number)

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
