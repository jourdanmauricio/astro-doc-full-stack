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

## <mark>169. Majority Element</mark>

**Problem**: Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

**Example 1**:

- Input: nums = [3,2,3]
- Output: 3

**Example 2**:

- Input: nums = [2,2,1,1,1,2,2]
- Output: 2

**Constraints**:

- n == nums.length
- 1 <= n <= 5 \* 104
- -109 <= nums[i] <= 109

<mark>Follow-up: Could you solve the problem in linear time and in O(1) space?</mark>

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  ///////////////////////////////////
  // Boyer-Moore Voting Algorithm  //
  // Runtime: 56ms, Memory: 51.1MB //
  ///////////////////////////////////

  // let candidate;
  // let count = 0;
  // for (let i = 0; i < nums.length; i++) {
  //   if (count === 0) {
  //     candidate = nums[i];
  //   }
  //   count += nums[i] === candidate ? 1 : -1;
  // }
  // return candidate;

  ///////////////////////////////////
  // Map                           //
  // Runtime: 64ms, Memory: 52.2MB //
  ///////////////////////////////////

  let map = new Map();
  let maxKey;
  let maxValue = 0;

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + 1);
    } else {
      map.set(nums[i], 1);
    }
    if (map.get(nums[i]) > maxValue) {
      maxKey = nums[i];
      maxValue = map.get(nums[i]);
    }
  }

  return maxKey;
};
console.log(majorityElement([3, 3, 4])); // 3
console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
```

### Algoritmo de Votación de Boyer-Moore

El Algoritmo de Votación de Boyer-Moore es un método ingenioso y eficiente para encontrar el elemento mayoritario en una matriz. A continuación se explica cómo funciona:

**Condiciones**:

Este algoritmo funciona bajo la suposición de que existe un único elemento que aparece más de la mitad de las veces (N/2) en la matriz.

**Intuición**:

Imagine un escenario donde hay diferentes partidos políticos y todos los votantes están reunidos en una sala (similar a la matriz). Si se produce una pelea en la que los partidarios de un partido intentan "votar" a los demás, eventually un partido mayoritario will emerge. El algoritmo de Boyer-Moore aprovecha un concepto similar.

**Pasos**:

- Inicialización:

Se inicializan dos variables:

- candidato: Esta variable almacenará el elemento potencialmente mayoritario que encontremos durante el recorrido.
- votos: Esta variable lleva la cuenta del número de veces que hemos visto al candidato actual.

- Recorrido de la matriz: Se itera a través de cada elemento (arr[i]) en la matriz.

- Selección de candidato y recuento de votos:

Hay dos casos a considerar:

- votos es cero:Esto significa que aún no hemos encontrado un candidato mayoritario. Se establece el elemento actual (arr[i]) como candidato y se inicializa votos a 1.
- votos es mayor que cero:

Hay dos subcasos aquí:

- Si el elemento actual (arr[i]) es el mismo que el candidato actual, se incrementa votos en 1. Esto significa que se ha encontrado otro partidario del partido mayoritario potencial.
- Si el elemento actual (arr[i]) es diferente del candidato, se decrementa votos en 1. Esto representa el encuentro con un miembro del partido contrario, que potentially "cancela" un partidario anterior. Si votos llega a cero después de este decremento, significa que aún no se ha encontrado un candidato mayoritario consistente, por lo que se pasa al siguiente elemento.

**Verificación (Opcional)**: Después del recorrido, es necesario verificar si el candidato elegido es realmente un elemento mayoritario. Esto se puede hacer en un bucle separado contando las apariciones del candidato en la matriz. Si el recuento es mayor que N/2, es el elemento mayoritario. Sin embargo, este paso de verificación no es strictly necesario para que el algoritmo funcione, ya que solo garantiza encontrar un elemento mayoritario si existe uno.

**Complejidad**:

El Algoritmo de Votación de Boyer-Moore tiene una complejidad temporal de O(N), donde N es la longitud de la matriz. Esto se debe a que solo se itera la matriz una vez.

La complejidad espacial es O(1), lo que significa que utiliza un espacio adicional constante independientemente del tamaño de la matriz.

**Ejemplo**:

Considere la matriz [3, 2, 3, 1, 3]:

- Se comienza con candidato y votos ambos a cero.
- Se encuentra 3, por lo que candidato se convierte en 3 y votos se convierte en 1.
- Se encuentra 2, que es diferente de 3, por lo que votos se convierte en 0. Dado que votos llega a cero, se pasa al siguiente elemento sin un candidato aún.
- Se encuentra 3 de nuevo, por lo que candidato sigue siendo 3 y votos se convierte en 1.
- Se encuentra 1, que es diferente de 3, por lo que votos se convierte en 0. Dado que votos llega a cero again, se pasa al siguiente elemento sin un candidato aún.
- Se encuentra 3 por tercera vez, por lo que candidato permanece como 3 y votos se convierte en 1.
- Después del recorrido, candidato sigue siendo 3. Aunque el paso de verificación no es strictly necesario, se puede confirmar que 3 aparece tres veces, que es más de la mitad de la longitud de la matriz (5 / 2 = 2.5). Therefore, 3 es el elemento mayoritario.

El Algoritmo de Votación de Boyer-Moore es una herramienta poderosa para encontrar el elemento mayoritario en una matriz de manera eficiente.

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
