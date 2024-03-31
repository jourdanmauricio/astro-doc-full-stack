---
layout: '../../layouts/BlogPostLayout.astro'
title: Un poquito de JavaScript
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/metodos-javascript/back.webp',
    alt: code',
  }
description: Un poquito de JavaScript
draft: false
category: javascript
---

- [Programación Orientada a Objetos con JavasSript](/astro-doc-full-stack/blog/javascript/POO-JavaScript)

## Modificación de arrays:

<details>
<summary>push, unshift, pop, shift</summary>

### push()

- **Agrega** uno o más elementos al **final del array**
- El método push **modifica el array original** y lo retorna con los elementos añadidos

### unshift()

- **Agrega** uno o más elementos al **inicio del array**
- El método push **modifica el array original** y lo retorna con los elementos añadidos

### pop()

- **Elimina** un elemento del **final del array**
- El método pop **modifica el array original y retorna el elemento eliminado**

### shift()

- **Elimina** un elemento del **inicio del array**
- El método pop **modifica el array original y retorna el elemento eliminado**

### splice()

- **Elimina o agrega** elementos en cualquier posición del array.
- **Parámetros**
  - startIndex (obligatorio): La posición en el array desde donde se comenzará a modificar. Puede ser negativo para contar desde el final del array.
  - deleteCount (opcional): La cantidad de elementos que se eliminarán a partir de startIndex. Si se omite, se eliminan todos los elementos desde startIndex hasta el final.
  - element1, element2, ... (opcional): Elementos cero o más para insertar en el array en la posición startIndex.
- splice **modifica el array original y retorna un nuevo array que contiene los elementos eliminados**

**Ejemplo**:

```javascript
const array = ['a', 'b', 'c', 'd', 'e'];

// Eliminar elementos del segundo al cuarto (inclusive) e insertar "X" y "Y"
const elementosEliminados = array.splice(1, 3, 'X', 'Y');

console.log(array); // ["a", "X", "Y", "e"]
console.log(elementosEliminados); // ["b", "c", "d"]
```

</details>

## Búsqueda en arrays:

<details>
<summary>indexOf, findIndex, lastIndexOf, find, includes</summary>

### indexOf()

- **Busca** la primera aparición un **elemento** en el array y **devuelve su índice**. Si no lo encuentra retorna -1
- **Parámetros**:
  - searchElement (obligatorio): El valor que se busca en el array
  - fromIndex (opcional): Un índice entero a partir del cual se comienza la búsqueda. Si se omite, la búsqueda comienza desde el índice 0

**Ejemplo**:

```javascript
const array = ['a', 'b', 'c', 'b', 'd'];

// Buscar el índice de la primera aparición de "b"
const primerIndice = array.indexOf('b');
console.log(primerIndice); // 1

// Buscar el índice de "b" a partir del índice 3
const segundoIndice = array.indexOf('b', 3);
console.log(segundoIndice); // 3

// Buscar un elemento que no existe
const elementoNoExistente = array.indexOf('z');
console.log(elementoNoExistente); // -1
```

### findIndex()

- Es similar a indexOf, pero en lugar de buscar un valor específico, **busca** un elemento que cumpla con una condición definida por una función. Si no lo encuentra retorna -1
- Parámetro
  - callbackFn (obligatorio): Una función que se ejecuta para cada elemento del array. La función debe retornar un valor booleano: true si el elemento cumple la condición, false si no.

**Ejemplo**:

```javascript
const array = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Juan', edad: 30 },
  { nombre: 'María', edad: 22 },
  { nombre: 'Pedro', edad: 35 },
];

// Buscar el índice del primer elemento con edad mayor a 30
const indiceMayor30 = array.findIndex((persona) => persona.edad > 30);
console.log(indiceMayor30); // 1

// Buscar el índice del primer elemento con nombre "María"
const indiceMaria = array.findIndex((persona) => persona.nombre === 'María');
console.log(indiceMaria); // 2

// No se encuentra ningún elemento con nombre "Laura"
const indiceLaura = array.findIndex((persona) => persona.nombre === 'Laura');
console.log(indiceLaura); // -1
```

### lastIndexOf()

- **Busca** un elemento en el array y **devuelve su último índice**
- **Parámetros**:
  - searchElement (obligatorio): El valor que se busca en el array. Si no lo encuentra retorna -1
  - fromIndex (opcional): Un índice entero a partir del cual se comienza la búsqueda. Si se omite, la búsqueda comienza desde el último elemento (índice igual a la longitud del array - 1)

**Ejemplo**:

```javascript
const array = ['a', 'b', 'c', 'b', 'd'];

// Buscar el índice de la última aparición de "b"
const ultimoIndice = array.lastIndexOf('b');
console.log(ultimoIndice); // 3

// Buscar el índice de "b" a partir del índice 2 (exclusivo)
const penultimoIndice = array.lastIndexOf('b', 2);
console.log(penultimoIndice); // 1

// Buscar un elemento que no existe
const elementoNoExistente = array.lastIndexOf('z');
console.log(elementoNoExistente); // -1
```

### find()

- **Busca** un elemento en el array **que cumpla una condición** y devuelve el primer elemento que la cumpla. Si no lo encuentra retorna undefined
- **Parámetros**
  - callbackFn (obligatorio): Una función que se ejecuta para cada elemento del array. La función debe retornar un valor booleano: true si el elemento cumple la condición, false si no.

**Ejemplo**:

```javascript
const array = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Juan', edad: 30 },
  { nombre: 'María', edad: 22 },
  { nombre: 'Pedro', edad: 35 },
];

// Buscar el primer elemento con edad mayor a 30
const personaMayor30 = array.find((persona) => persona.edad > 30);
console.log(personaMayor30); // { nombre: "Juan", edad: 30 }

// Buscar el primer elemento con nombre "María"
const personaMaria = array.find((persona) => persona.nombre === 'María');
console.log(personaMaria); // { nombre: "María", edad: 22 }

// No se encuentra ningún elemento con nombre "Laura"
const personaLaura = array.find((persona) => persona.nombre === 'Laura');
console.log(personaLaura); // undefined
```

### includes()

- **Busca** un **elemento** en el array y devuelve true si lo encuentra, false si no
- **Parámetros**
  - searchElement (obligatorio): El valor que se busca en el array
  - fromIndex (opcional): Un índice entero a partir del cual se comienza la búsqueda. Si se omite, la búsqueda comienza desde el índice 0

**Ejemplo**:

```javascript
const array = ['a', 'b', 'c', 'd', 'e'];

// Buscar si "b" está presente en el array
const estaB = array.includes('b');
console.log(estaB); // true

// Buscar si "z" está presente en el array
const estaZ = array.includes('z');
console.log(estaZ); // false

// Buscar si "b" está presente a partir del índice 2
const estaBDesdeIndice2 = array.includes('b', 2);
console.log(estaBDesdeIndice2); // false
```

</details>

## Recorrido de arrays:

<details>
<summary>forEach, map, filter</summary>

### forEach()

- Recorre el array y **ejecuta una función para cada elemento**. No retorna ningún valor. **Su objetivo es ejecutar la función proporcionada para cada elemento del array, sin modificar el array original**
- **Parámetros**:
  - callbackFn (obligatorio): Una función que se ejecuta para cada elemento del array. La función puede recibir como argumentos el elemento actual, el índice del elemento y el array completo.

**Ejemplo**:

```javascript
const array = ['a', 'b', 'c', 'd', 'e'];

// Mostrar cada elemento del array en la consola
array.forEach((elemento) => console.log(elemento));
/* Salida:
a
b
c
d
e
*/

// Multiplicar cada elemento del array por 2 y mostrarlo
array.forEach((elemento, indice) => {
  console.log(`Elemento ${indice + 1}: ${elemento * 2}`);
});
/* Salida:
Elemento 1: 2
Elemento 2: 4
Elemento 3: 6
Elemento 4: 8
Elemento 5: 10
*/
```

### map()

- Recorre el array y **devuelve un nuevo array con los resultados de ejecutar una función para cada elemento**. Retorna un nuevo array con la misma longitud que el array original, donde cada elemento ha sido reemplazado por el valor devuelto por la función callbackFn
- **Parámetros**
  - callbackFn (obligatorio): Una función que se ejecuta para cada elemento del array. La función puede recibir como argumentos el elemento actual, el índice del elemento y el array completo. La función debe devolver un valor que se agregará al nuevo array

**Ejemplo**:

```javascript
const array = [1, 2, 3, 4, 5];

// Multiplicar cada elemento del array por 2
const nuevoArray = array.map((elemento) => elemento * 2);
console.log(nuevoArray); // [2, 4, 6, 8, 10]

// Convertir cada elemento del array a una cadena
const arrayCadenas = array.map((elemento) => String(elemento));
console.log(arrayCadenas); // ["1", "2", "3", "4", "5"]
```

### filter()

- Recorre el array y **devuelve un nuevo array con los elementos que cumplen una condición**. Si no ecuentra elementos retorna un array vacío
- **Parámetros**
  - callbackFn (obligatorio): Una función que se ejecuta para cada elemento del array. La función debe retornar un valor booleano: true si el elemento debe ser incluido en el nuevo array, false si no

**Ejemplo**:

```javascript
const array = [1, 2, 3, 4, 5];

// Filtrar los números pares
const arrayPares = array.filter((numero) => numero % 2 === 0);
console.log(arrayPares); // [2, 4]

// Filtrar los números mayores a 3
const arrayMayores3 = array.filter((numero) => numero > 3);
console.log(arrayMayores3); // [4, 5]

// Filtrar los números mayores a 8
const arrayMayores8 = array.filter((numero) => numero > 8);
console.log(arrayMayores8); // []
```

</details>

## Ordenación de arrays:

<details>
<summary>sort, reverse</summary>

### sort()

- **Ordena** los elementos del array. Modifica el array original. El orden por defecto es **ascendente**
- **Parámetro**
  - compareFn (opcional): Una función que se utiliza para comparar dos elementos del array y determinar cuál debe ir primero. La función debe retornar un valor negativo si el primer elemento debe ir antes que el segundo, un valor positivo si el segundo elemento debe ir antes que el primero y 0 si son iguales.

**Ejemplo**:

```javascript
const array = [5, 2, 4, 1, 3];

// Ordenar el array de forma ascendente
array.sort();
console.log(array); // [1, 2, 3, 4, 5]

// Ordenar el array de forma descendente
array.sort((a, b) => b - a);
console.log(array); // [5, 4, 3, 2, 1]
```

### reverse()

- **Invierte el orden** de los elementos del array. Modifica el array original

**Ejemplo**:

```javascript
const array = [1, 2, 3, 4, 5];

// Invertir el orden del array
array.reverse();
console.log(array); // [5, 4, 3, 2, 1]
```

</details>

## Otros métodos útiles:

<details>
<summary>join, slice, concat, reduce</summary>

### join()

- **Convierte un array en una cadena** separando cada elemento por un caracter específico
- **Parámteros**
  - separador (opcional): El caracter que se utiliza para separar los elementos en la cadena resultante. Si se omite, se utiliza una coma ,

**Ejemplo**:

```javascript
const array = ['a', 'b', 'c', 'd', 'e'];

// Unir los elementos del array con una coma
const cadena = array.join();
console.log(cadena); // "a,b,c,d,e"

// Unir los elementos del array con un espacio
const cadenaConEspacio = array.join(' ');
console.log(cadenaConEspacio); // "a b c d e"
```

### slice()

- Crea una copia de una parte del array, se utiliza para **extraer una subsección** de un array sin modificar el array original. Retorna un nuevo array con la subsección de elementos del array original
- **Parámetros**
  - inicio (obligatorio): El índice del primer elemento que se incluirá en la subsección.
  - fin (opcional): El índice del último elemento que se incluirá en la subsección. Si se omite, se incluye hasta el final del array.
  - Los índices pueden ser negativos para indicar posiciones desde el final del array
  - Si el índice de inicio es mayor o igual al índice de fin, se retorna un array vacío

**Ejemplo**:

```javascript
const array = ['a', 'b', 'c', 'd', 'e'];

// Extraer los elementos del índice 1 al 3 (sin incluir el 4)
const subseccion = array.slice(1, 4);
console.log(subseccion); // ["b", "c", "d"]

// Extraer los elementos del índice 2 hasta el final
const subseccionFinal = array.slice(2);
console.log(subseccionFinal); // ["c", "d", "e"]
```

### concat()

- **Concatena** dos o más arrays sin modificar los arrays originales. Retorna un nuevo array
- **Parámetros**
  - array1, array2, ... (obligatorio): Los arrays que se van a unir

**Ejemplo**:

```javascript
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];

// Unir los dos arrays
const arrayConcatenado = array1.concat(array2);
console.log(arrayConcatenado); // ["a", "b", "c", "d", "e", "f"]

// Unir más de dos arrays
const array3 = ['g', 'h', 'i'];
const arrayCompleto = array1.concat(array2, array3);
console.log(arrayCompleto); // ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
```

### reduce()

- **Reduce** un array **a un único valor**, acumula un valor a partir de cada elemento del array, utilizando una función de callback
- **Parámetros**
  - callbackFn (obligatorio): La función que se ejecuta para cada elemento del array. La función debe retornar un valor que se acumula en el valor final
  - valorInicial (opcional): El valor inicial que se utiliza como punto de partida para la acumulación. Si se omite, se utiliza el primer elemento del array

**Ejemplo**:

```javascript
const array = [1, 2, 3, 4, 5];

// Sumar todos los elementos del array
const sumaTotal = array.reduce((acumulador, numero) => acumulador + numero);
console.log(sumaTotal); // 15

// Calcular el producto de todos los elementos del array
const productoTotal = array.reduce(
  (acumulador, numero) => acumulador * numero,
  1
);
console.log(productoTotal); // 120

const valorMaximo = array.reduce((maximo, numero) => Math.max(maximo, numero));
console.log(valorMaximo); // 5

const numerosPares = array.reduce((numerosPares, numero) => {
  if (numero % 2 === 0) {
    numerosPares.push(numero);
  }
  return numerosPares;
}, []);
console.log(numerosPares); // [2, 4]
```

</details>

## Estructura de datos Set

<details>
<summary>Set</summary>

Un Set en JavaScript es una **estructura de datos que almacena una colección de valores únicos**. Es decir, cada valor solo puede aparecer una vez en un Set.

- Características de un Set:

  - Valores únicos: No permite valores duplicados
  - Sin orden: Los elementos no se ordenan de ninguna manera
  - Acceso rápido: Es rápido verificar si un valor está presente en un Set
  - Eficiencia de memoria: Los Sets son eficientes en memoria

- Creación de un Set:

Se puede crear un Set utilizando el constructor Set y pasando un iterable como argumento, como un array o una cadena.

```javascript
const set1 = new Set([1, 2, 3, 3, 2, 1]); // Set {1, 2, 3}
const set2 = new Set('Hola mundo'); // Set {"H", "o", "l", "a", " ", "m", "u", "n", "d"}
```

- Métodos de un Set:

  - add(valor): Agrega un nuevo valor al Set
  - has(valor): Comprueba si un valor está presente en el Set
  - delete(valor): Elimina un valor del Set
  - size: Retorna la cantidad de elementos en el Set
  - clear(): Elimina todos los elementos del Set

- **Ejemplo**:

```javascript
const array = [1, 2, 3, 3, 2, 1];
const set = new Set(array);
const arraySinDuplicados = [...set];

console.log(arraySinDuplicados); // [1, 2, 3]

const set2 = new Set(['a', 'b', 'c']);
set2.add('d');
console.log(set2.has('b')); // true
console.log(set2.has('d')); // rue
console.log(set2.has('e')); // false
set2.delete('d');
console.log(set2.size); // 3
set2.clear();
```

</details>

## Estructura de datos Map

<details>
<summary>Map</summary>

Un Map es una **estructura de datos que almacena una colección de pares clave-valor**. Es decir, cada clave se asocia con un valor.

- Características de un Map:

  - Pares clave-valor: No hay restricciones en los tipos de datos que se pueden usar como claves o valores
  - Sin orden: Los elementos no se ordenan de ninguna manera
  - Acceso rápido: Es rápido obtener el valor asociado a una clave en un Map
  - Eficiencia de memoria: Los Maps son eficientes en memoria

- Creación de un Map:

Se puede crear un Map utilizando el constructor Map y pasando un iterable como argumento, como un array o un objeto.

```javascript
const map1 = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]); // Map {{"a" => 1}, {"b" => 2}, {"c" => 3}}
const map2 = new Map(Object.entries({ a: 1, b: 2, c: 3 })); // Map {{"a" => 1}, {"b" => 2}, {"c" => 3}}
```

- Métodos de un Map:

  - set(clave, valor): Agrega un nuevo par clave-valor al Map
  - get(clave): Obtiene el valor asociado a la clave en el Map
  - has(clave): Comprueba si una clave está presente en el Map
  - delete(clave): Elimina un par clave-valor del Map
  - size: Retorna la cantidad de elementos en el Map
  - clear(): Elimina todos los elementos del Map
  - forEach(callbackFn): Recorre el Map y ejecuta la función callbackFn para cada par clave-valor

**Ejmplo**:

```javascript
////////////////////////////////
// Almacenar datos de un usuario
const usuario = {
  nombre: 'Juan',
  edad: 30,
  email: 'juan@example.com',
};

const mapaUsuario = new Map([
  ['nombre', usuario.nombre],
  ['edad', usuario.edad],
  ['email', usuario.email],
]);

console.log(mapaUsuario.get('nombre')); // "Juan"

///////////////////////////////////////////////
// Contar la frecuencia de palabras en un texto
const texto = 'Hola mundo, mundo cruel';

const mapaPalabras = new Map();

for (const palabra of texto.split(' ')) {
  if (mapaPalabras.has(palabra)) {
    mapaPalabras.set(palabra, mapaPalabras.get(palabra) + 1);
  } else {
    mapaPalabras.set(palabra, 1);
  }
}

console.log(mapaPalabras); // Map {{"Hola" => 1}, {"mundo" => 2}, {"cruel" => 1}}
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
