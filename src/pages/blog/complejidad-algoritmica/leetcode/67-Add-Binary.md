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

## 67. Add Binary

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

```js
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  // El tipo de dato int se queda chico con binarios largos
  // const num1 = parseInt(a, 2);
  // const num2 = parseInt(b, 2);
  // const result = num1 + num2;

  // return result.toString(2);

  // En el comando BigInt(0b${a}), 0b indica que la cadena que sigue es una cadena binaria.
  // Es un prefijo que se utiliza para convertir una cadena literal en un valor binario.
  // El prefijo 0b es obligatorio para que el comando funcione correctamente.

  // Sin el prefijo 0b, la cadena se interpretaría como un número decimal.
  // Por ejemplo, el comando BigInt("1011") devolvería el valor decimal 1011,
  // en lugar del valor binario 11.

  const num1 = BigInt(`0b${a}`);
  const num2 = BigInt(`0b${b}`);
  return (num1 + num2).toString(2);
};
console.log(addBinary('1010', '1011')); // "10101"
console.log(
  addBinary(
    '10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101',
    '110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011'
  )
);

// "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000"
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
