---
layout: '../../layouts/BlogPostLayout.astro'
title: Complejidad algorítmica
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/complejidad-algoritmica.jpeg',
    alt: 'A picture of a coder',
  }
description: Complejidad algorítmica utilizando javascript
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

## Algoritmos

<details>
<summary>Ver</summary>

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

</details>

## Big-O Notation

<details>
<summary>Ver</summary>

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

</details>

## Big-O guide

- Si el cálculo no depende del tamaño del input es constante - O(1)
- 1 loop - O(n)
- 2 loops anidados - O(n<sup>2</sup>)
- El tamaño del input reducido por la mitad - O(log n)

## Math Algorithms

Comencemos a resolver algunos algoritmos matemáticos básicos. Problemas relacionados con:

- Fibonacci sequence
- Factorial of a number
- Prome number
- Power of two
- Recursion
- Fibonacci sequence with recursion
- Factorial of a number with recursion

### Fibonacci Sequence

<details>
<summary>Ver</summary>

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

</details>

### Factorial of a Number

<details>
<summary>Ver</summary>

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

</details>

### Prime Number

<details>
<summary>Ver</summary>

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

</details>

### Optimized Primality Test

<details>
<summary>Ver</summary>

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

</details>

### Power of Two

<details>
<summary>Ver</summary>

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

</details>

## Recursion

<details>
<summary>Ver</summary>

<mark>Rescursión es una técnica para resolver problemas donde la solución depende de soluciones a instancias más pequeñas del mismo problema.</mark>

Recursión es cuando una función se llama a sí misma. Es una gran técnica para simplificar la solución.

Si te encuentras dividiendo tu problema en una versión más pequeña del mismo problema, la recursividad es muy útil.

### Algunos puntos sobre recursion

1. <mark>Toda solución recursiva necesita tener un caso base (una condición que finalice la recursión). </mark> Sino entraríamos en un loop infinito.

2. <mark>La recursion puede simplificar un problema pero no siempre se traslada en una solución más rápida.</mark> La solución recursiva puede ser peor comparada con una solución iterativa.

3. <mark>La recursividad es un tema que no es el más sencillo de entender.</mark> No te rindas si tienes dificultades con el concepto.

</details>

### Secuencia recursiva de Fibonacci

<details>
<summary>Ver</summary>

**Problem**: give a number 'n', find the frist 'n' elements of the Fibonacci sequence

<mark>En matemáticas, la secuencia de Fibonacci es una secuencia en la que cada número es la suma de los dos precedentes. Los primeros dos números en la secuencia son 0 y 1.</mark>

Por ejemplo:

- fibonacci(0) = 0
- fibonacci(1) = 1
- fibonacci(6) = 8

Si F representa una función para calcular el número Fibonacci, entonces

F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>

El caso base es:

F<sub>0</sub> = 0, y F<sub>1</sub> = 1

Ejemplo:

F<sub>2</sub> = F<sub>1</sub> + F<sub>0</sub> <br>
F<sub>2</sub> = 1 + 0 <br>
F<sub>2</sub> = 1 <br>

```javascript
const recursiveFibonacci = (n) => {
  if (n < 2) return n;
  return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
};

console.log(recursiveFibonacci(0)); // 0
console.log(recursiveFibonacci(1)); // 1
console.log(recursiveFibonacci(6)); // 8

// Big-O (socución iterativa) = O(n)
// Big-O (socución recursiva) = O(2^n)
```

La socución iterativa es por lejos más optima que la recursiva. La solcuión recursiva invoca muchas veces a la fución.

</details>

### Recursive Factorial of a Number

<details>
<summary>Ver</summary>

**Problem**: Given an integer 'n', find the factorial of that integer.

<mark>En matemáticas, el factorial de un entero no negativo 'n', denotado n!, es el producto de todos los enteros positivos menores o iguales que 'n'.

- factorial de 0 es 1
- factorial(4) = 4 \* 3 \* 2 \* 1 = 24
- factorial(5) = 5 \* 4 \* 3 \* 2 \* 1 = 120

```javascript
function recursiveFactorial(n) {
  if (n === 0) return 1;
  return n * recursiveFactorial(n - 1);
}

console.log(recursiveFactorial(0)); // 1
console.log(recursiveFactorial(4)); // 24
console.log(recursiveFactorial(5)); // 120

// Big-O = O(n)
```

n! = n \* (n-1)!

Cuando n es 3 se llama a la función 3 veces, cuando es 4 se llama 4 veces.

</details>

## Algoritmos de búsqueda

Solo analizaremos dos algoritmos:

- Linear search
- Binary search
- Recursive binary search

### Linear Search

<details>
<summary>Ver</summary>

**Problem**: Given an array of 'n' elements and a target element 't', find the index of 't' in the array. Return -1 if the target element is not found.

arr = [-5, 2, 10, 4, 6], t = 10 => Should return 2
arr = [-5, 2, 10, 4, 6], t = 6 => Should return 4
arr = [-5, 2, 10, 4, 6], t = 20 => Should return -1

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

console.log(linearSearch([-5, 2, 10, 4, 6], 10)); // 2
console.log(linearSearch([-5, 2, 10, 4, 6], 6)); // 4
console.log(linearSearch([-5, 2, 10, 4, 6], 20)); // -1
// Big-O = O(n)
```

</details>

### Binary Search

<details>
<summary>Ver</summary>

**Problem**: Given a sorted array of 'n' elements and a target element 't', find the index of 't' in the array. Return -1 if the target element is not found.

arr = [-5, 2, 4, 6, 10], t = 10 => Should return 4
arr = [-5, 2, 4, 6, 10], t = 6 => Should return 3
arr = [-5, 2, 4, 6, 10], t = 20 => Should return -1

> NOTA: la búsqueda binaria solo funciona sobre arrays ordenados. Si no se encuentra ordenado debemos aplicar un .sort()

**pseudocode**

- Si el array es [] retornar -1
- Si posee elementos, buscar el elemento del medio
  - Si el elemento del medio es el target, retonar el índice
  - Si el target es menor al elemento del medio, aplicar la búsqueda binaria sobre la mitad izquierda del array
  - Si el target es mayor al elemento del medio, aplicar la búsqueda binaria sobre la mitad derecha del array

> NOTA: Si el array contiene un número par de elementos la mitad será el elemento inferior de los dos del medio

```javascript
function binarySearch(arr, target) {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex <= rightIndex) {
    let middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    if (target === arr[middleIndex]) return middleIndex;
    if (target < arr[middleIndex]) {
      rightIndex = middleIndex - 1;
    } else {
      leftIndex = middleIndex + 1;
    }
  }
  return -1;
}

console.log(binarySearch([-5, 2, 4, 6, 10], 10)); // 4
console.log(binarySearch([-5, 2, 4, 6, 10], 6)); // 3
console.log(binarySearch([-5, 2, 4, 6, 10], 20)); // -1
// Big-O = O(log n)
```

El algoritmo utiliza un while, pero en cada iteración el recorrdo que debe realizar se reduce a la mitad entonces el Big-O= es O(log n)

</details>

### Recursive Binary Search

<details>
<summary>Ver</summary>

**Problem**: Given a sorted array of 'n' elements and a target element 't', find the index of 't' in the array. Return -1 if the target element is not found.

arr = [-5, 2, 4, 6, 10], t = 10 => Should return 4
arr = [-5, 2, 4, 6, 10], t = 6 => Should return 3
arr = [-5, 2, 4, 6, 10], t = 20 => Should return -1

> Tips para recursisvidad

- Identificar el caso base. Break. En este ejemplo los puntos de salida serán que el elemento del medio sea = al target o que el array quede sin elementos

**pseudocode**

- Si el array es [] retornar -1
- Si posee elementos, buscar el elemento del medio
  - Si el elemento del medio es el target, retonar el índice
  - Si el target es menor al elemento del medio, aplicar la búsqueda binaria sobre la mitad izquierda del array
  - Si el target es mayor al elemento del medio, aplicar la búsqueda binaria sobre la mitad derecha del array

```javascript
function recursiveBinarySearch(arr, target) {
  // return search(arr, target, leftIndex, rightIndex);
  return search(arr, target, 0, arr.length - 1);
}

function search(arr, target, leftIndex, rightIndex) {
  if (leftIndex > rightIndex) return -1;
  let middleIndex = Math.floor((leftIndex + rightIndex) / 2);

  if (target === arr[middleIndex]) return middleIndex;
  if (target < arr[middleIndex]) {
    return search(arr, target, leftIndex, middleIndex - 1);
  } else {
    return search(arr, target, middleIndex + 1, rightIndex);
  }
}

console.log(recursiveBinarySearch([-5, 2, 4, 6, 10], 10)); // 4
console.log(recursiveBinarySearch([-5, 2, 4, 6, 10], 6)); // 3
console.log(recursiveBinarySearch([-5, 2, 4, 6, 10], 20)); // -1
// Big-O = O(log n)
```

En esta oportunidad no tenemos un loop pero la función search se llama una y otra vez, aunque su imput se reduce a la mitad en cada ejecución. Big-O = O(log n)

</details>

## Sorting Algorithms

El problema de ordenar un array de números en forma ascendente es el escenario más simple. Veremos los algoritmos:

- Bubble sort
- Insertion sort
- Quick sort
- Merge sort

### Bubble Sort

<details>
<summary>Ver</summary>

**Problem**: Given an array of integers, sort de array.

const arr = [-6, 20, 8, -2, 4]
bubbleSort(arr) => should return [-6, -2, 4, 8, 20]

**Concepto**

- Comparar los elementos adjacentes y cambiar las posiciones si no se encuentran ordenados
- Repetir hasta finalizar el array
- En cada repetición el número más grande quedará en la última posición del array

**Ejemplo**

[**-6 20** 8 -2 4] -> -6 y 20 estan ordenados <br>
[-6 **20 8** -2 4] -> 20 y 8 se deben cambiar porque 20 > 8 <br>
[-6 8 **20 -2** 4] -> 20 y -0 se deben cambiar porque 20 > -2 <br>
[-6 8 -2 **20 4**] -> 20 y 4 se deben cambiar porque 20 > 4 <br>
[-6 8 -2 4 20] -> Llegamos al final del array. Cambiaron elementos? Si, entonces repetir el proceso

[**-6 8** -2 4 20] -> -6 y 20 estan ordenados <br>
[-6 **8 -2** 4 20] -> 8 y -2 se deben cambiar porque 8 > -2 <br>
[-6 -2 **8 4** 20] -> 8 y 4 se deben cambiar porque 8 > 4 <br>
[-6 -2 4 **8 20**] -> 8 y 20 estan ordenados <br>
[-6 -2 4 8 20] -> Llegamos al final del array. Cambiaron elementos? Si, entonces repetir el proceso

[**-6 -2** 4 8 20] -> -6 y -2 estan ordenados <br>
[-6 **-2 4** 8 20] -> -2 y 4 estan ordenados <br>
[-6 -2 **4 8** 20] -> 4 y 8 estan ordenados <br>
[-6 -2 4 **8 20**] -> 8 y 20 estan ordenados <br>
[-6 -2 4 8 20] -> Llegamos al final del array. Cambiaron elementos? No, fin del proceso <br>
**[-6 -2 4 8 20]**

**Solution**:

```javascript
function bubbleSort(arr) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}

const arr = [8, 20, -2, -4, -6];
bubbleSort(arr);
console.log(arr); // [-6 -2 4 8 20]
// Big-O = O(n^2)
```

El algoritmo posee 2 loops => Big-O = O(n<sup>2</sup>)

</details>

### Insertion Sort

<details>
<summary>Ver</summary>

**Problem**: Given an array of integers, sort de array.

const arr = [-6, 20, 8, -2, 4]
insertionSort(arr) => should return [-6, -2, 4, 8, 20]

**Concepto**

- Separar virtualmente el array dentro de una parte ordenada y otra desordenada
- Asumimos que el primer elemento se encuentra ordenado y el resto desordenado
- Seleccionamos un elemento desordenado y lo comparamos con los elementos de la parte desordenada
- Si el elemento en la parte ordenada es menor que el elemento seleccionado, continuamos por el siguiente elemento en la parte desordenada. Sino, desplazar elementos más grandes en la parte ordenada hacia la derecha.
- Insertar el elemento seleccionado a la derecha del indice
- Repetir hasta que los elementos desordenados estén en el orden correcto

**Ejemplo**:

| Array                | nti    | SE    | Action                                            |
| -------------------- | ------ | ----- | ------------------------------------------------- |
| [ -6 **20 -8 -2 4**] | nti=20 | SE=-6 | -6 > 20? No. Mover 20 a la derecha de -6          |
| [ -6 20 **-8 -2 4**] | nti=8  | SE=20 | 20 > 8? Si. Cambiar 20 una posición a la derecha  |
| [ -6 20 20 **-2 4**] | nti=8  | SE=-6 | -6 > 8? No. Mover 8 a la derecha de -6            |
| [ -6 8 20 **-2 4**]  | nti=-2 | SE=20 | 20 > -2? Si. Cambiar 20 una posición a la derecha |
| [ -6 8 20 **-2 4**]  | nti=-2 | SE=8  | 8 > -2? Si. Cambiar 8 una posición a la derecha   |
| [ -6 8 8 20 **4**]   | nti=-2 | SE=-6 | -6 > -2? No. Mover -2 a la derecha de -6          |
| [ -6 -2 8 20 **4**]  | nti=4  | SE=20 | 20 > 4? Si. Cambiar 20 una posición a la derecha  |
| [ -6 -2 8 20 20]     | nti=4  | SE=8  | 8 > 4? Si. Cambiar 8 una posición a la derecha    |
| [ -6 -2 8 8 20]      | nti=4  | SE=-2 | -2 > 4? No. Mover 4 a la derecha de -2            |
| [ -6 -2 4 8 20]      |        |       | Array ordenado                                    |

**Solution**:

```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let numberToInsert = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > numberToInsert) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = numberToInsert;
  }
}
const arr = [8, 20, -2, -4, -6];
insertionSort(arr);
console.log(arr); // [-6 -2 4 8 20]
// Big-O = O(n^2)
```

El algoritmo posee 2 loops => Big-O = O(n<sup>2</sup>)

</details>

### Quick Sort

<details>
<summary>Ver</summary>

**Problem**: Given an array of integers, sort de array.

const arr = [-6, 20, 8, -2, 4]
quickSort(arr) => should return [-6, -2, 4, 8, 20]

**Concepto**

- Identificar el elemento pivot en el array
  - Tomar el primer elemento como pivot
  - **Tomar el último elemento como pivot (nuestra solución)**
  - Tomar elemento random como pivot
  - Tomar elemento medio como pivot
- Poner todos los que sean menores al elemento pivot dentro del array izquierda y todos los que sean mayores dentro del array derecha
- Repetir el proceso para los array individuales izquierda y derecha hasta tener un array de longitud 1
- Concatenar el array izquierda, el pivot y el array derecha

**Ejemplo**

[-6, 20, 8, -2, 4], pivot = 4

[-6 -2] [**4**] [8 20]

[-6 -2], pivot = -2

[-6] [**-2**] []

[8 20] pivot = 20

[8] [20] []

Los array poseen un solo elemento, asi que concatenamos

**-6 -2 4 8 20**

**Solution**:

```javascript
function quickSort(arr) {
  if (arr.length < 2) return arr;
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
const arr = [8, 20, -2, -4, -6];
console.log(quickSort(arr)); // [-6 -2 4 8 20]
// Worst case Big-O = O(n^2)
// Avg case Big-O = O(log n)
```

</details>

### Merge Sort

<details>
<summary>Ver</summary>

**Problem**: Given an array of integers, sort de array.

const arr = [-6, 20, 8, -2, 4]
mergeSort(arr) => should return [-6, -2, 4, 8, 20]

**Concepto**

- Dividir el array en sub arrays, cada uno contrendrá un elemento. Un array de un elemento se considera ordenado.
- Luego mergear los sub arrays para generar un sub array ordenado hasta que solo quede un sub array.

**Ejemplo**:

[-6, 20, 8, -2, 4]

-6, 20, 8, -2, 4

[-6] [20] => [] -> Left and rigth are not empty. -6 < 20 <br>
[] [20] => [-6] -> Left is empty. Push right array <br>
[] [] => [-6 20] <br>

[8] [-2, 4] => [] -> Left and rigth are. -2 < 8 <br>
[8] [4] => [-2] -> Left and rigth are not empty. 4 < 8 <br>
[8] [] => [-2 4] -> Right is empty. Push left array <br>
[] [] => [-2 4 8] <br>

[-6 20] [-2 4 8] => [] -> Left and rigth are. -6 < -2 <br>
[20] [-2 4 8] => [-6] -> Left and rigth are. -2 < 20 <br>
[20] [4 8] => [-6 -2] -> Left and rigth are. 4 < 20 <br>
[20] [8] => [-6 -2 4] -> Left and rigth are. 8 < 20 <br>
[20] [] => [-6 -2 4 8] -> Right is empty. Push left array <br>
[] [] => [-6 -2 4 8 20] <br>

**Solution**:

```javascript
function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const middle = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, middle);
  const rightArr = arr.slice(middle);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(leftArr, rightArr) {
  let sortedArr = [];

  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      sortedArr.push(leftArr.shift());
    } else {
      sortedArr.push(rightArr.shift());
    }
  }
  return [...sortedArr, ...leftArr, ...rightArr];
}

const arr = [8, 20, -2, -4, -6];
console.log(mergeSort(arr)); // [-6 -2 4 8 20]
//Big-O = O(n log n)
```

<mark>Este es uno de lso mejores algoritmos para ordenar</mark>

</details>

## Miscellaneous algorithms and problem solving

- Cartesian product
- Climbing staircase
- Tower of Hanoi

### Cartesian product

<details>
<summary>Ver</summary>

**Problem**: Given two finite non-empty sets, find their Cartesian Product.

En matemáticas, el producto cartesiano de dos conjuntos A y B, denotado AXB, es un conjunto de todos los pares ordenados (a,b) donde a esta en A y b esta en B.

En matemáticas, el producto cartesiano de dos conjuntos es una operación, que resulta en otro conjunto, cuyos elementos son todos los pares ordenados que pueden formarse de forma que el primer elemento del par ordenado pertenezca al primer conjunto y el segundo elemento pertenezca al segundo conjunto.

**Ejemplo**:

const A = [1, 2] <br>
const B = [3, 4] <br>
AXB = [ [1, 3], [1, 4], [2, 3], [2, 4]] <br>

const A = [1, 2] <br>
const B = [3, 4, 5] <br>
AXB = [ [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]] <br>

**Concepto**

- Recorrer cada array y emparejar cda elemento del primer con cada elemento del segundo array.

**Solution**:

```javascript
function cartesianProduct(arr1, arr2) {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      result.push([arr1[i], arr2[j]]);
    }
  }
  return result;
}

const arr1 = [1, 2];
const arr2 = [3, 4, 5];
console.log(cartesianProduct(arr1, arr2));
// [ [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]]

// Big-O = O(mn)
```

</details>

### Climbing Staircase

<details>
<summary>Ver</summary>

**Problem**: Given a staircase of 'n' steps, count the number of distinct ways to climb to the top. You can either climb1 step or 2 steps at time.

**Ejemplo**:

n=1, climbingStaircase(1) = 1 | (1) <br>
n=2, climbingStaircase(2) = 2 | (1, 1) and (2) <br>
n=3, climbingStaircase(3) = 3 | (1, 1, 1), (1, 2) and (2, 1) <br>
n=4, climbingStaircase(4) = 5 | (1, 1, 1, 1), (1, 1, 2), (1, 2, 1), (2, 1, 1) and (2, 2) <br>

**Concepto**

- En cualquier momento, puedes subir 1 o 2 escalones
- Si tienes que subir al escalón 'n', solo puede hacerlo desde el escalon 'n-1' o 'n-2'
- Calcular las formas en que podemos subir al escalon n-1 y n-2 y sumarlas

climbingStaircase(n) = climbingStaircase(n-1) + climbingStaircase(n-2)

**<mark>Es el patrón de la secuencia de Fibonacci</mark>**

**Solution**:

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

### Tower of Hanoi

<details>
<summary>Ver</summary>

La torre de Hanoi es un rompecabezas o juego matemático que consiste en tres varillas y un número de discos de diferentes tamaños, que pueden deslizarse en cualquiera de las varillas. El rompecabezas comienza con todos los discos en una varilla, ordenados por tamaño, con el disco más grande en la parte inferior y el disco más pequeño en la parte superior.

![Torre de Hanoi](/astro-doc-full-stack/images/algorithms/hanoi.webp)

**Concepto**:

El objetivo del rompecabezas es mover todos los discos a una varilla diferente, siguiendo estas reglas:

- Solo se puede mover un disco a la vez.
- Cada movimiento consiste en tomar el disco superior de una varilla y colocarlo en la parte superior de otra varilla.
- Un disco no se puede colocar encima de un disco más pequeño.

El rompecabezas se puede resolver con un número mínimo de movimientos, que es 2^n - 1, donde n es el número de discos. Por ejemplo, con 3 discos, el número mínimo de movimientos es 7.

![Ejemplo Torre de Hanoi](/astro-doc-full-stack/images/algorithms/hanoi2.webp)

**Solution**:

```javascript
function toerOfHanoi(n, fromRod, toRod, usingRod) {}

console.log(toerOfHanoi(3, 'A', 'C', 'B'));
```

</details>

https://www.youtube.com/watch?v=x3rkUQcfFww

<style>
  h1 { color: #713f12; }
  h2 { color: #2563eb; }
  h3 { color: #a855f7; }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  img[alt="Torre de Hanoi"] { 
  max-width:  250px; 
  display: block;
}
  pre {
    padding: 10px;
  }
    table {
    border-collapse: collapse; /* Elimina el espacio entre las celdas */
    width: 100%; /* Ancho de la tabla */
    margin: 0 auto; /* Centrar la tabla */
  }

  th, td {
    border: 1px solid #ddd; /* Borde de las celdas */
    padding: 8px; /* Relleno de las celdas */
    text-align: left; /* Alineación del texto */
  }

  th {
    background-color: #f2f2f2; /* Color de fondo del encabezado */
    font-weight: bold; /* Peso de la fuente del encabezado */
  }

  tr:nth-child(even) {
    background-color: #f9f9f9; /* Color de fondo de las filas pares */
  }
</style>
