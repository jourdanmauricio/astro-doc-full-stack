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

## 3. Has Balance Brackets

**Problem**: Crear un bracket validator. La idea es que chequee que los brackets estén balanceados correctamente.

Los brackets válidos son los siguientes: [ ] ( ) { }

**Examples**:

- input: "{ [ ] ( ) }" output: true
- input: "{ [ ( ] ) }" output: false
- input: "{ [ ] ) }" output: false
- input: "{ [ }" output: false
- input: "{ [ ( [ { ( )[ ]{ } } ] ) ] }" output: true

**Solution**:

En palabras

- Tienes:
  - "opening" - ( { [ - y,
  - "closing" - ) } ] - brackets.
- Cada closing bracket tiene que corresponder con la opening bracket mas cercano que empareje.
- Cada opening y closing bracket tienen que estar en pareja.

Entonces tienen que ir trackeando los opening brackets y fijarse si cuando encontramos una closing bracket, matchea con la opening bracket mas cercana

¿Qué estructura de datos podemos utilizar para esto?

```js
var hasBalanceBrackets = function (s) {
  const set = new Set([')', ']', '}']);
  const map = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ]);
  const result = [];

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) result.push(map.get(s[i]));
    if (set.has(s[i])) {
      if (result[result.length - 1] === s[i]) {
        result.pop();
      } else {
        return false;
      }
    }
  }
  return result.length === 0;
};
console.log(hasBalanceBrackets('{[]()}')); // true
console.log(hasBalanceBrackets('{[(])}')); // false
console.log(hasBalanceBrackets('{[])}')); // false
console.log(hasBalanceBrackets('{[}')); // false
console.log(hasBalanceBrackets('{[([{()[]{}}])]}')); // true
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
