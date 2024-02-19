---
layout: '../../layouts/BlogPostLayout.astro'
title: Complejidad algorítmica - Leetcode
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/complejidad-algoritmica.jpeg',
    alt: 'A picture of a coder',
  }
description: Complejidad algorítmica utilizando javascript - Ejercicios en Leetcode
draft: false
category: JS Leetcode
---

## Temario

- Algoritmos
- Medición de la performance
- Time and Space complexity
- Notación Big O
- Math algorithms
- Sort
- Search
- Misc algorithms and problem solving

## ¿Qué es un algoritmo?

Un **algoritmo** es un conjunto de istrucciones bien definidas para resolver un problema particular.

Podemos realizar una analogía con una receta. Por un lado, tenemos los ingredientes, para preparar el plato seguiremos una receta y ejecutaremos los pasos uno a uno en secuencia y como resultado tendremos el plato finalizado.

![Conceptos algoritmos.](/astro-doc-full-stack/images/leetcode/algoritmo.png)

### Características de los algoritmos

- Inputs y outputs bien definidos
- Cada instrucción del algoritmo debe ser clara y sin ambigüedades
- Independencia de lenguaje (de programación)

## Análisis de algortimos

Para recolver un mismo problema podemos utilizar distintos algoritmos. **Podemos analizar cuál de los algoritmos es más efeciente para resolver el problema**.

El tiempo de ejecución de un algoritmo no puede ser predecido porque depende de varios factores, como:

- El lenguaje de progamación usado para implementar el algoritmo
- La computadora donde se ejecute
- Otros programas en ejecución al mismo tiempo
- El sistema operativo

Teniendo esto en cuenta, evaluaremos la performance de un algortimo en términos del tamaño de sus inputs.

**Time Complexity** -> Considera el tiempo de ejecución en función del tamaño del input
**Space Complexity** -> Considera la memoria utilizada por el algoritmo en función del tamaño del input

Consideramos el tamaño del input porque un algoritmo puede ser más rápido que otro para inputs pequeños pero más lento para inputs grandes.

<mark>Si tu app necesita ser muy rápida y disponemos de memoria para ejecutar, no nos preocuparemos tanto por el Space Complexity. Por el contrario, si disponemos de poca memoria para ejecutar el algoritmo, escogeremos una solución más lenta pero que requiera menos espacio en memoria.</mark>

### ¿Cómo se representa la complejidad?

Utilizaremos la **notación asintótica**, herramientas matemáticas para representar tiempo y complejidad espacial.

Existen tres notaciones asintóticas principales.

1. Big-O Notation (O-notation) - complejidad en el peor de los casos
2. Omega Notation (Ω-notation) - complejidad para el mejor de los casos
3. Theta Notation (θ-notation) - complejidad para el promedio de casos

Utilizaremos la Notación Big-O para resolución de problemas

## Big-O Notation

La notación Big-O describe la complejidad de un algoritmo utilizando términos algebraicos y tiene dos caracteristicas importantes.

### Características

- Está expresado en términos del input
- Se centra en el panorama más amplio sin quedar considerar los detalles minuciosos

## Big-O Time Complexity

```javascript
function suma(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log(suma(4)); // 1 + 2 + 3 + 4 = 10
```

Contamos el número de veces que se ejecutan las instrucción basados en el tamaño del input. Tal como lo realiza el compilador.

El programa tiene tres sentencias principales para ejecutar: linea 2 (let sum = 0), línea 4 (sum += i) y línea 6 (return sum). El loop repite la línea 4.

Considernado a n = 4 calculemos la cantidad de sentencias ejecutadas.

- linea 2 -> ejecuta 1 vez
- linea 4 -> ejecuta 4 vez
- linea 6 -> ejecuta 1 vez

Se ejecutan n + 2 veces. Decimos n + 2 porque n es el input de la función. Con 4 el total será de 6, pero con 10, el total será de 12 instrucciones.

<mark>Nuestro Time Complexity depende del tamaño del input. Aquí cumplimos con la primera de las características mencionadas.</mark>

<mark>La segunda característica se enfoca en el panorama más amplio sin quedar considerar los pequeños detalles. Veamos de que se trata.</mark>

### n + 2

```bash
n=100         100+2
n=1000        1000+2
n=10000       10000+2
...
n=100000000   100000000+2
```

Como podemos ver el +2 es insignificante, entonces podemos descartarlo y considerar a n para el valor total.

Retornando a nustro algoritmo...

```javascript
function suma(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log(suma(4)); // 1 + 2 + 3 + 4 = 10
```

## Time Complexity

- O(n) - Complejidad lineal

Complejidad lineal significa que a medida que el tamaño del input incrementa, el time complexity también aumenta.

Muchas veces mirando el loop del algoritmo podemos ver que al menos será lineal, aunque hay excepciones.

A continuación vemos otro algoritmo para el mismo problema.

```javascript
function suma(n) {
  return (n * (n + 1)) / 2;
}
```

- O(1) - Complejidad constante

Aquí la línea 2 se ejecuta solo una vez, por lo tanto la **complejidad es constante**, siempre será 1.

- En una función que posee dos loops anidados la complejidad es **cuadrática**.

```javascript
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    // instrucciones
  }
}
```

O(n<sup>2</sup>) - Complejidad cuadrática -> 3n<sup>2</sup> + 5n + 1

- Tres loops anidados tendrán una **complejidad cúbica**

```javascript
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    for (let k = 1; k <= j; k++) {
      // instrucciones
    }
  }
}
```

O(n<sup>3</sup>) - Complejidad cúbica -> 3n<sup>2</sup> + 5n + 1

- Cuando el tamaño del input reduce por la mitad cada iteración tenemos una **coplejidad logarítmica**

## Space Complexity

La idea principal es la misma.

**Complexity constant** -> cuando el algoritmo no requiere memoria extra o la memoria usada no depende del tamaño del input.

O(1) - Constante

Ejemplo: algoritmos de ordenación (sort) que no utilizan arrays adicionales.

O(n) - Lineal

Necesita tanto espacio extra como el input crezca.

O(log) - Logarítmico

Necesta espacio extra pero no en la misma relación con el tamaño del input

![Conceptos algoritmos.](/astro-doc-full-stack/images/leetcode/algoritmos2.png)

En el gráfico podemos ver como el tamaño del input afecta a la perfomance.

O(1) O(log n) con muy buenos y O(!), O(2<sup>n</sup>) son malos en Time Complexity (debemos evitarlos tanto como sea posible).

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
