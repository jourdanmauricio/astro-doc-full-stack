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

## 83. Remove Duplicates from Sorted List

**Problem**: Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

**Example 1**:

- Input: head = [1,1,2]
- Output: [1,2]

**Example 2**:

- Input: head = [1,1,2,3,3]
- Output: [1,2,3]

**Constraints**:

- The number of nodes in the list is in the range [0, 300].
- -100 <= Node.val <= 100
- The list is guaranteed to be sorted in ascending order.

**Solution**:

```js
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
