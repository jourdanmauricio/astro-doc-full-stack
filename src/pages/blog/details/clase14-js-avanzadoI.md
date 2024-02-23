---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 14. JavaScript Avanzado I
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase14.webp',
    alt: 'javascript-avanzado',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-javascript.png',
    alt: 'Logo javascript',
  }
description: JavaScript Avanzado II
draft: false
category: JavasScript
---

## Contextos y entornos

### Conceptos clave

En lecciones anteriores, hablamos sobre el tiempo de ejecución de los programas (runtime) y el motor de ejecución de código, que hacen referencia al **entorno donde se ejecutan nuestros scripts**. Dentro de esos elementos cabe destacar dos piezas muy importantes:

**<mark>Memory Heap</mark>** -> <mark>Es la región o espacio en memoria en tu PC en la que se asignan las variables al crearlas. Allí se almacenan los datos creados durante la ejecución, como objetos, arrays y variables.</mark>

El Memory Heap es como un escritorio o mesa de trabajo. Allí ponemos objetos y documentos cuando los estamos utilizando. Cada vez que requerimos algo, lo tomamos de allí. Si cambiamos de actividad, traemos otros elementos al escritorio...

**<mark>Call Stack</mark>** -> <mark>Es el mecanismo que organiza la ejecución de las funciones en una aplicación. Apila los entornos en los que cada fragmento de tu código se ejecuta.</mark>

Imaginemos que estamos lavando los platos en la cocina. Los platos sucios **se apilan uno sobre otro**. Cada vez que agarramos uno para lavarlo, lo tomamos de la parte de encima de la pila. La pila representa el call stack.

El Call Stack mantiene un seguimiento de las funciones en ejecución y se modifica a medida que se llaman y completan funciones en el programa.

**¿Cómo funciona Call Stack?**

- Al llamar función: se añade un nuevo contexto
- Contiene la información sobre la función en curso
- Al completarse, se elimina su contexto de la pila
- El flujo de apilar y desapilar contextos, determina el comportamiento del código

**Cuando se ejecuta una función:**

- Se crea un **nuevo contexto de ejecución**
- Se carga en el **memory heap** toda la información
- Al finalizar, el contexto de ejecución se destruye
- Continúa con el siguiente contexto de la Call Stack

## ¿Cuál es su relación?

En el **call stack**, cada vez que se llama a una función, **se añade un nuevo contexto en la parte superior de la pila** que contiene toda la información sobre la función en curso. Al completarse la ejecución de dicha función, se elimina su contexto de la pila. El flujo de apilar y des-apilar contextos de ejecución determina el comportamiento del código.

De esta manera, al momento de ejecutar una función, se crea un nuevo contexto de ejecución y se carga en el **memory heap** toda la información contenida dentro la función como variables, parámetros y otros detalles. Una vez esta función termina de ejecutarse, el contexto de ejecución se destruye y continúa con el siguiente contexto de la call stack.

## Global vs. Local

**Contexto de ejecución Global**

- Ámbito en el que está escrito el código fuera de cualquier función o bloque específico
- Las variables y funciones se definen y pueden ser accedidas desde cualquier parte del código
- Se pueden usar lso valores de las variables o ejecutar funciones desde dentro de otras funciones

**Contexto de ejecución local**

- Entorno donde se ejecuta un bloque de código expecífico generalmente dentro de una función o un bloque delimitado ({})
- Las variables y funciones declaradas son accesibles sólo dentro de ese bloque y no fuera de él

Podrías preguntarte en este momento, ¿Y qué pasa si mi código no está dentro de una función? ¿No tiene entonces un contexto de ejecución? En este caso, decimos que hace parte del **contexto de ejecución global**.

**<mark>GLOBAL</mark>** -> El contexto de ejecución global es el ámbito en el que está escrito el código fuera de cualquier función o bloque específico. En este contexto las variables y funciones se definen y pueden ser accedidas desde cualquier parte del código, ya sea usar los valores de las variables o ejecutar las funciones desde dentro de otras funciones.

**<mark>LOCAL</mark>** -> Por otro lado, tenemos al contexto de ejecución local, el cual se refiere al entorno en el que se ejecuta un bloque de código específico, generalmente dentro de una función o un bloque delimitado por llaves ({}). Dentro de este contexto local, las variables y funciones declaradas son accesibles solo dentro de ese bloque y no fuera de él.

![Event Loop.](/astro-doc-full-stack/images/m2/event-loop.png)

## Ámbito léxico

¿Qué sucede si una función busca una variable dentro de su contexto, pero esta no existe allí? Para esta situación, introducimos el concepto de ámbito léxico.

<mark>Cuando hablamos de ámbito o alcance léxico, nos referimos al contexto en el que se busca y se resuelve el valor de una variable. En otras palabras, donde estas pueden ser referenciadas y qué valores tienen.</mark>

Entonces... Ya vimos cómo se comportan los distintos contextos de ejecución, global y local. También vimos cómo se accede desde un contexto interno hacia uno externo cuando no tenemos variables definidas en el contexto local donde son llamadas a través del ámbito léxico.

## Hoisting

- Comportamiento de Js. Las declaraciones de variables y funciones son "elevadas" internamente al inicio desu ámbito léxico
- Sucede antes de que el código comience a ejecutarse
- Permite acceder a ellas antes de su declaración
- Evita errores en la ejecución

**Expressions vs Statments**

- Expression -> todo aquello retorna algo
- Stament -> no retorna nada

Ejemplos:

```javascript
1 + 1 // expression

var miVariable = function ({
  console.log("Hola mundo!");
}); // Expression. Se llama function expression
// Hoisting -> se eleva la variable, pero con valor undefined pero arrojará error porque intentará ejecutar undefined


if (true) { console.log("Hola mundo!"); } // Statment

function saludo() {
  console.log("Hola mundo!");
} // Statment. Se llama function statement
// Hoisting -> Eleva la función por lo que si se declara despúes de la invocación funciona OK
```

> TIP: <mark>Cuando formateamos el documento, prettier asigna los ; a las expresiones y no a los statements. Cuando son expressiones se utiliza en ;, cuando son statments no se utiliza el ;</mark>

<mark>El **proceso de hoisting** consiste en un comportamiento de JavaScript. En este, las declaraciones de variables y funciones son "movidas" o “elevadas” internamente al inicio de su ámbito léxico antes de que el código comience a ejecutarse. Este comportamiento nos permite acceder a dichas variables o funciones antes de su declaración sin generar errores.</mark>

Pensemos en la idea de hoisting de una forma más cotidiana. Es el cumpleaños de tu pareja, así que decides hacerle un regalo especial. Para ello, tomas un papel y haces una lista de lo que debes en orden hacer para el evento...

- Decorar el salón.
- Preparar la comida.
- Ubicar los regalos en la mesa.

...comienzas con los preparativos, pero te das cuenta que preparar la comida tardará más que decorar el salón. Por lo que, sin cambiar el orden de la lista en el papel, decides primero preparar la comida antes que decorar la sala. Aquí estás “elevando” (hoisteando) la tarea de la preparación al inicio de tu lista (ámbito léxico).

```javascript
console.log(num1);
// cannot access 'num1' before initialization
let num1 = 5;

console.log(num2);
// undefined
var num2 = 5;
```

<mark>**Las variables declaradas con var y las funciones con function tienen la capacidad de hosting. Las variables declaradas con let o const y las funciones arrow no utilizan el hoisting.** Es decir, las funciones (function) y variables (var) se agregan al entorno léxico. Las agrega, pero solo su declaración, no sus valores. El compilador sabe que existen pero hasta la ejecución del programa no asigna el valor. **Por eso es que console.log(num2) es undefined**</mark>.

A pesar de que el hoisting parece ser de gran utilidad, y en algunas situaciones ocurre sin que tengamos conciencia de este, las buenas prácticas de código indican que debe ser evitado su uso de forma intencional procurando declarar siempre variables con let y const y declarando funciones antes de su ejecución.

Con todas estas ideas en mente (hoisting, contextos de ejecución y ámbito léxico), introducimos un nuevo término que nos permitirá acceder a la información de contextos así estos ya no estén presentes en el call stack: closures.

![Hoisting](/astro-doc-full-stack/images/m2/hoisting.png)

## Closures

- Función que tiene acceso a variables definidas en su ámbito léxico
- Incluso después de su ejecución
- Se crean cuando una función es declarada dentro de otra
- La función interna hace referencia a variables de la externa

**Receta**

1. Función que retorna otra función
2. La función anidada utiliza una variable en scope de la función contendora
3. La función retornada es invocada desde el scope externo

<mark>Las closures son funciones que tienen acceso a variables definidas en su ámbito léxico, incluso luego de haber terminado su ejecución.</mark>

En otras palabras, es la capacidad que posee una función de recordar y acceder a variables de su ámbito léxico, aun que esta ya se haya terminado de ejecutar.

**Las closures se crean cuando una función es declarada dentro de otra y la función interna hace referencia a variables de la externa.**

Una closure es la posibilidad que tiene una función “hija” (función retornada por otra) de recordar todas las variables de la función “padre” que existían en el momento de su ejecución, incluso después de que la función padre haya retornado y eliminado del call stack.

```javascript
function crearContador() {
  let count = 0;

  return function actContador() {
    count++;
    return count;
  };
  // return actContador;
}

const contador = crearContador();
console.log(contador()); // 1
console.log(contador()); // 2
console.log(contador()); // 3
console.log(contador()); // 4
```

**Entonces, Clousure se dá cuando una función(Padre) retorna a otra función (Hija) que utilzia una variable de la función Padre.** Esta lógica va en contra de todo lo visto hasta el momento. En este caso, la variable count se crea en el contexto de la funcion crearContador pero al eliminar el contexto, el compilador mantiene su valor porque se dá cuenta que se está retornando. Lo interesante es que no podemos modificar el valor decount desde afuera de la función retornada. Lo único podemos hacer es ejecutar la función contador.

🤓 Veamos otro ejemplo para entender un poco más cómo trabajan las funciones closures.¿Conoces el monstruo come galletas? Vamos a ayudarle a crear un contador para todas las galletas que quiere comer.

Hemos visto entonces el concepto de closure como la facilidad que tiene una función hija de acceder al ámbito léxico de su función padre que la define, en caso de necesitar utilizar esta información dentro de su propio contexto de ejecución.

## Cierre

La comprensión del contexto, hoisting y closures en JavaScript son esenciales para los desarrolladores que buscan comprender el comportamiento interno del lenguaje.

El **contexto** se refiere al entorno en el que se ejecuta el código y los hay de dos tipos: global y local. El **hoisting** es el comportamiento por el cual las declaraciones de variables y funciones se mueven internamente hacia arriba en el código para evitar errores. Las variables declaradas con var son elevadas (hoisted) y las funciones declaradas también son elevadas junto con sus definiciones completas.

Finalmente, las **closures** son funciones que tienen acceso a variables de un contexto externo, incluso después de que la función externa haya finalizado su ejecución.

![Resumen de Conceptos](/astro-doc-full-stack/images/m2/mapa-conceptos/clase14.png)

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**
(Creación de una vista de formulario para la creación de películas)

- Crear en nuestra aplicación de Frontend una vista de formulario, agregando además un nuevo enlace a la barra de navegación que hayas creado.

- Incluir en el formulario un input para cada uno de los campos que se requieren para la creación de una nueva película y dos botones: uno para enviar el formulario y otro para limpiar los inputs.

- Implementar una función que maneje el evento de limpieza del formulario y se encargue de seleccionar y vaciar el value de los inputs.

- Implementar una función que maneje el evento de envío de formulario, que por el momento se encargará de seleccionar los inputs, y validar que todos los datos estén completos. Asumimos para esta actividad que TODOS los datos son obligatorios.

**ACTIVIDAD 02**
(Implementación de un endpoint, controlador y función de servicio para la creación de películas)

Para esta actividad te sugerimos implementar las funciones correspondientes en el “camino inverso” al que hace nuestra request:
servicio --> controlador --> endpoint

- Implementar en el módulo de servicio de películas una función async que reciba por parámetro los datos de las películas y llame al método correspondiente del modelo Movie para crear una nueva película en la base de datos.

- Implementar una función en el controlador de películas que se encargue de desestructurar del body los datos de la película para así llamar a la función del servicio que implementamos en el paso anterior. Que maneje errores de manera tal que si todo salió correctamente, se envíe un mensaje descriptivo al cliente con el status 201.

- Preparar en nuestro enrutador un nuevo endpoint que se encargue de recibir una petición de método POST a “/movies”. Al recibirla, ejecutar la lógica definida por el controlador implementado en el punto anterior.

- **IMPORTANTE:** Recuerda hacer que las peticiones que ingresan al servidor pasen por el middleware express.json(), para que la información del body de la request esté disponible en el objeto req.body.

**EXTRA CREDIT**
Implementar una función middleware que se encargue de validar que todos los datos estén completos. Asumimos para esta actividad que TODOS los datos son obligatorios. Si quieres ir un poco más allá, puedes realizar validaciones más específicas. Ej: que el año sea un número de 4 dígitos.

Implementar una función que maneje el evento de envío de formulario, que por el momento se encargará de seleccionar los inputs, y validar que todos los datos estén completos. Asumimos para esta actividad que TODOS los datos son obligatorios.

**ACTIVIDAD 03**
(Realizar la petición de método POST para la creación de películas)

- Desde la aplicación de frontend, en la función que maneja el envío del formulario, realizar utilizando axios la solicitud de método POST a nuestra aplicación de backend.

- Recuerda que el segundo argumento que le damos a la función axios.post es el objeto que representa al body de la petición, con todos los datos de la película que deseamos crear.

Si todo el proceso ha salido correctamente, luego de la creación deberías poder ver en el HOME la nueva película que has creado.

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
