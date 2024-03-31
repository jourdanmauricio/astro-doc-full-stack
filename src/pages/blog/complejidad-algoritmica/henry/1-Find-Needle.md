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

## 1. Find Needle

**Problem**: Encontrar el índice de la primera aparición de un string (needle) dentro de otro (haystack).

Es decir, el objetivo del ejercicio es determinar si el primer string, needle, esta dentro del segundo, haystack, y en dicho caso, devolver el índice en el que esto ocurre.

**Example 1**:

- needle: redux
- haystack: react-redux
- output: 6

**Example 2**:

- needle: puntual
- haystack: pinky
- output: -1

En este caso, como el needle no se encuentra en el haystack el valor de salida es -1.

**Constraints**:

- Para la resolución de este ejercicio no se pueden utilizar los métodos indexOf( ) ni includes

**Solution**:

En palabras

- Visitar cada caracter del haystack
- Visitar cada caracter del needle, si el primer caracter coincide:
- Comparar el segundo caracter del needle con el siguiente del haystack
- Continuar hasta llegar al final del needle o hasta que una comparación no sea igual
- Si llegamos al final del needle es que encontramos el indice
- Si el primer caracter del needle no coincide, avanzo al próximo caracter
- Llegamos al final del haystack y no encontramos ninguna coincidencia

Ahora sí, busquemos la forma de traducir lo que ya dijimos en palabras a código y ademas debemos evaluar la complejidad...

```js
var findNeedle = function (haystack, needle) {
  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    const sliced = haystack.slice(i, needle.length + i);
    if (sliced === needle) return i;
  }
  return -1;

  // for (let i = 0; i < haystack.length; i++) {
  //   for (let j = 0; j < needle.length; j++) {
  //     if (haystack[i + j] !== needle[j]) {
  //       break;
  //     } else {
  //       if (j === needle.length - 1) return i;
  //     }
  //   }
  // }
  // return -1;
};
console.log(findNeedle('react-redux', 'redux')); // (6)
console.log(findNeedle('Hola como estas, pinky', 'puntual')); // (-1)
console.log(findNeedle('rereredux', 'reredux')); // (2)
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
