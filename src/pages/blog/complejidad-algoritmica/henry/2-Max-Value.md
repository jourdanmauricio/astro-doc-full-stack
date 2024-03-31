---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Ejercicios Algoritmos Henry
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/complejidad-algoritmica/back-henry.webp',
    alt: 'Henry - Algoritmos',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/complejidad-algoritmica/henry-icon.jpeg',
    alt: 'Logo Henry',
  }
description: Ejercicios Algoritmos Henry.
draft: false
category: Algoritmos
---

https://www.soyhenry.com/

## 2. Max Value

**Problem**: Se nos presenta un arreglo de enteros, éstos representan el valor de una acción con el pasar del tiempo. ¿El objetivo del ejercicio? Encontrar cuál es la máxima ganancia posible de comprar en un momento y vender en otro posterior.

**Example 1**:

- acciones: [4, 3, 2, 5, 11]
- mayor ganancia: 9

Esta ganancia la obtenemos comprando la acción cuando su valor es de 2 y vendiéndola cuando su valor es de 11.

**Solution**:

```js
var maxValue = function (prices) {
  // let maxProfit = 0;

  // for (let i = 0; i < prices.length; i++) {
  //   for (let j = i + 1; j < prices.length; j++) {
  //     const profit = prices[j] - prices[i]
  //     if (profit > maxProfit) maxProfit = profit;
  //   }
  // }
  // return maxProfit;
  // O(n^2)

  //  let maxProfit = prices[1] - prices[0];
  //  let minValue = prices[0];
  //
  //  for (let i = 1; i < prices.length; i++) {
  //    const sellPrice = prices[i];
  //    const actualProfit = sellPrice - minValue;
  //    maxProfit = Math.max(actualProfit, maxProfit);
  //    minValue = Math.min(sellPrice, minValue);
  //  }
  //  return maxProfit;

  let left = 0;
  let right = 1;
  let maxProfit = 0;

  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      let profit = prices[right] - prices[left];
      maxProfit = Math.max(maxProfit, profit);
    } else {
      left = right;
    }
    right++;
  }
  return maxProfit;
};
console.log(maxValue([4, 3, 2, 5, 11])); // (9)
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
