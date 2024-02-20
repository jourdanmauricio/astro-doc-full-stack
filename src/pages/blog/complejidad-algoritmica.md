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

## Objectos y Arrays Big-O

### Objetos

Un **objeto** es una colección de pares calve - valor.

```javascript
const person = {
  firstName: "Mauricio",
  lastName "Jourdán"
}
```

- Insert - O(1) Ej: person.age = 30
- Remove - O(1) Ej: delete person.age
- Access - O(1) Ej: console.log(person.firstName)
- Search - O(n)
- Object.keys - O(n)
- Object.values - O(n)
- Object.entries - O(n)

### Arrays

Un **array** es una colección ordenada de valores. Comienzan por el índice 0 y se incrementa en 1.

- Insert or remove al final - O(1)
- Insert or remove al principio - O(n)
- Access - O(1)
- Search - O(n)
- Push / Pop - O(1)
- Shift / Unshift /concat / slice / splice - O(n)
- forEach / map / filter / reduce - O(n)

Al resolver un problema, puede usar foreach o filter y la función callback también contendrá un bucle for. En tal escenario, la complejidad de su tiempo es cuadrática y es posible que no estemos contentos con eso.

## Math Algorithms

Comencemos a resolver algunos algoritmos matemáticos básicos. Problemas relacionados con:

- Fibonacci sequence
- Factorial of a number
- Prome number
- Power of two
- Recursion
- Fibonacci sequence with recursion
- Factorial of a number with recursion

## Big-O guide

- Si el cálculo no depende del tamaño del input es constante - O(1)
- 1 loop - O(n)
- 2 loops anidados - O(n<sup>2</sup>)
- El tamaño del input reducido por la mitad - O(log n)

### Fibonacci Sequence

**Problem**: give a number 'n', find the frist 'n' elements of the Fibonacci sequence

<mark>En matemáticas, la secuencia de Fibonacci es una secuencia en la que cada número es la suma de los dos precedentes. Los primeros dos números en la secuencia son 0 y 1.</mark>

Por ejemplo:

- fibonacci(2) = [0, 1]
- fibonacci(3) = [0, 1, 1]
- fibonacci(7) = [0, 1, 1, 2, 3, 5, 8]

```javascript
function fibonacci(n) {
  const fib = [0, 1];

  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  return fib;
}

console.log(fibonacci(2)); // [0, 1]
console.log(fibonacci(3)); // [0, 1, 1]
console.log(fibonacci(7)); // [0, 1, 1, 2, 3, 5, 8]

// Big-O = O(n)
```

La función contiene un for (loop), por lo tanto, posee una complejidad lineal O(n)

### Factorial of a Number

**Problem**: Given an integer 'n', find the factorial of that integer.

<mark>En matemáticas, el factorial de un entero no negativo 'n', denotado n!, es el producto de todos los enteros positivos menores o iguales que 'n'.

- Factorial de 0 es 1
- factorial(4) = 4 \* 3 \* 2 \* 1 = 24
- factorial(5) = 5 \* 4 \* 3 \* 2 \* 1 = 120

```javascript
function factorial(n) {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result = result * i;
  }

  return result;
}

console.log(factorial(0)); // 1
console.log(factorial(1)); // 1
console.log(factorial(5)); // 120

// Big-O = O(n)
```

La función contiene un for (loop), por lo tanto, posee una complejidad lineal O(n)

### Prime Number

**Problem**: Given a natural number 'n', determine if the number is prime or not.

<mark>Un número primo es un número natural mayor que 1 que no es producto de dos números naturales menores.</mark>

- isPrime(5) = true (1\*5 or 5\*1)
- isPrime(4) = false (1\*4 or 2\*2 or 4\*1)

```javascript
function isPrime(n) {
  if (n < 2) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrime(1)); // false
console.log(isPrime(4)); // false
console.log(isPrime(5)); // true

// Big-O = O(n)
```

La función contiene un for (loop), por lo tanto, posee una complejidad lineal O(n).

## Optimized Primality Test

Los números enteros mayores que la raíz cuadrada no necesitan ser chequeados, porque cuando sea 'n = a \* b' uno de los dos factores 'a' y 'b' es menor o igual que la raíz cuadrada de n.

Ejemplos para validar la hipótesis:

- n=24, a=4 y b=6

La raíz cuadrada de 24 es 4.89 <br>
4 es menor que 4.89 <br>
a es menor que la raíz cuadrada de n

- n=35, a=5 y b=7

La raíz cuadrada de 35 es 5.91 <br>
5 es menor que 5.91 <br>
a es menor que la raíz cuadrada de n

Ahora podemos **optimizar nustra función**:

```javascript
function isPrime(n) {
  if (n < 2) return false;

  // for (let i = 2; i < n; i++) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrime(1)); // false
console.log(isPrime(4)); // false
console.log(isPrime(5)); // true

// Big-O = O(sqtr(n))
```

Observamos que si n es 100, la raíz cuadrada de 100 es 10. Por lo tanto, el for irá desde 2 a 10 en lugar de a 100.

<mark>Si el n crece, el número de ejecuciones del loop crecerá pero no en la mismo proporción.</mark>

### Power of Two

**Problem**: Give a positive integer 'n', determine if the number is a power of 2 or not.

<mark>Un entero es potencia de 2 si existe un entero 'x' tal que 'n' === 2<sup>x</sup></mark>

- isPowerOfTwo(1) = true (2<sup>0</sup>)
- isPowerOfTwo(2) = true (2<sup>1</sup>)
- isPowerOfTwo(5) = false

```javascript
function isPowerOfTwo(n) {
  /* if (n < 1) return false;
  while (n > 1) {
    if (n % 2 !== 0) return false;
    n = n / 2;
  }
  return true; */
  // Big-O = O(log n)

  // ---------- //
  if (n < 1) return false;
  return (n & (n - 1)) === 0;
}

console.log(isPowerOfTwo(1)); // true
console.log(isPowerOfTwo(2)); // true
console.log(isPowerOfTwo(5)); // false

// Big-O = O(1)
```

## Recursion

<mark>Rescursión es una técnica para resolver problemas donde la solución depende de soluciones a instancias más pequeñas del mismo problema.</mark>

Recursión es cuando una función se llama a sí misma. Es una gran técnica para simplificar la solución.

Si te encuentras dividiendo tu problema en una versión más pequeña del mismo problema, la recursividad es muy útil.

### Algunos puntos sobre recursion

1. <mark>Toda solución recursiva necesita tener un caso base (una condición que finalice la recursión). </mark> Sino entraríamos en un loop infinito.

2. <mark>La recursion puede simplificar un problema pero no siempre se traslada en una solución más rápida.</mark> La solución recursiva puede ser peor comparada con una solución iterativa.

3. <mark>La recursividad es un tema que no es el más sencillo de entender.</mark> No te rindas si tienes dificultades con el concepto.

## Secuencia recursiva de Fibonacci

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
