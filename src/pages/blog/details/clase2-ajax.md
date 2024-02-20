---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 2. AJAX
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase2.jpg',
    alt: 'Ajax background',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-ajax.jpg',
    alt: 'Logo for Ajax',
  }
description: Ajax (Asynchronous JavaScript and XML)
draft: false
category: Ajax Asincronismo
---

## Introducción

La comunicación entre front y back se realiza a través del protocolo HTTP. Es una herramienta que nos facilita la gestión para realizar solicitudes y recibir respuestas del servidor.

## Asincronismo

Alrededor del año 2000, cuando el internet empezaba a tomar fuerza, las nociones que se tenían de programación cambiaron de forma radical. Las aplicaciones y programas que antes estaban disponibles únicamente de forma local en el dispositivo, ahora debían contemplar la posibilidad de enviar y recibir información de manera remota mediante la comunicación entre un **cliente** y un **servidor**.

Este proceso de envío y recepción de información requiere de un manejo de procesos asíncronos dentro del código que se ejecuta. Ahora bien, veamos en más detalle a qué nos referimos por procesos **síncronos** y **asíncronos**.

- <mark>Sincronismo</mark> → Las tareas que lleva un dispositivo a la hora de ejecutar un programa se procesan de forma secuencial, es decir, una proceso después del otro. Esto indica que cada instrucción se ejecuta y completa antes de continuar con la nueva tarea. JavaScript, así como otros lenguajes, es sincrónico por naturaleza.

- <mark>Asincronismo</mark> → El asincronismo es la capacidad que tiene un lenguaje de realizar otras operaciones mientras una operación se ejecuta en segundo plano.

En los procesos **asincrónicos** se distinguen varias características:

- **Inicio de la tarea**: cuando se inicia una tarea asíncrona el programa no espera su finalización.
- **Continuación inmediata**: luego de iniciar la tarea, el programa continúa ejecutando otras tareas sin esperar a que la tarea asíncrona se complete.
- **Manejo del resultado:** cuando la tarea asíncrona se completa, se maneja el resultado o se ejecuta una función de retorno (_callback_) para procesar el resultado. Lo veremos al final de la clase 💪.

![Asincronismo](/astro-doc-full-stack/images/m2/asincronismo.png)

El objetivo del enfoque asincrónico es simplemente que un programa pueda mejorar su eficiencia y capacidad de respuesta, evitando que se generen procesos bloqueantes a partir de operaciones que toman mucho tiempo (como la lectura de archivos, las solicitudes de red o las operaciones de entrada/salida) y continuar realizando otros procesos en un “segundo plano”, en lugar de quedarse inactivo.

## Manejo de asincronía en JavaScript

- Se utliza para crear app dinámicas e interactivas
- Permite realizar solicitudes y recibir respuestas del servidor

Como mencionamos anteriormente, JavaScript es un lenguaje naturalmente sincrónico. Sin embargo, **podemos darle un comportamiento asincrónico** mediante el uso de algunas herramientas (callbacks, promesas y async/await) que permiten gestionar estos procesos. ¡Veamos!

<mark>**JavaScript es single thread y sincrónico → puede realizar una sola tarea a la vez y no puede continuar con la siguiente hasta terminar la anterior**.</mark>

```javascript
// Ejemplo síncrono
console.log('Tarea 1');
console.log('Tarea 2');
console.log('Tarea 3'); // Demora 30 segundos
console.log('Tarea 4'); // Espera 30 segundos
console.log('Tarea 5');
```

A medida que la Web evolucionaba aparecieron procesos que requieren un tratamiento distinto.
**Estos procesos involucran un alto grado de incertidumbre**.

En el ejemplo anterior supongamos que la tarea 3 demora 30 segundos en ejecutarse. La tarea 4 no podrá ejecutarse hasta que finalice la 3. Y supongamos que la tarea 4 se encuentra relacionada a la interfaz de usuario, quien quedaría esperando 30 segundos hasta que se carguen los datos.

Pero **no solo se trata de las demoras, sino también de no saber qué resultado voy a recibir**. Entonces, las tareas asíncronas tienen un grado de incertidumbre muy alto, generalmente relacionado con el tiempo, pero que además tienen otros resultados posibles

Para simular el contexto asincronismo podemos utilizar la función setTimeout, que nos permite aumentar el tiempo de ejecución de una tarea

```jsx
// Ejemplo asíncrono
console.log('Tarea 1');
console.log('Tarea 2');
setTimeout(() => {
  console.log('Tarea 3');
}, 2000);
console.log('Tarea 4');
console.log('Tarea 5');
// Tarea 1
// Tarea 2
// Tarea 4 -> la tarea 4 se ejecutó sin esperar a que finalice la 3
// Tarea 5
// Tarea 3
```

El compilador ejecutó la tarea 1, la tarea 2, comenzó la tarea 3 pero como vio que va a tardar la inicio y continuo con la ejecución de la tarea 4. Luego ejecutó la tarea 5, y finalmente cuando terminó la tarea 3 imprimió por consola el resultado.

## AJAX

### Introducción

Debido a la necesidad de procesar asincronismo en las solicitudes y respuestas en el manejo de información a través de la red, se dio lugar a la implementación de una técnica de desarrollo denominada como **AJAX (Asynchronous JavaScript and XML)**. Ya sabemos en qué consiste la asincronía en JavaScript. Veamos brevemente de qué se trata XML.

**Extensible Markup Language** o **XML**, es un lenguaje de marcado (similar a HTML) que se usa para almacenar e intercambiar información. Se basa en etiquetas que describen la estructura y el significado de los datos.

Aquí tienes un ejemplo sencillo de cómo luce el lenguaje XML.

Si te fijas bien, parece tener cierta similitud a HTML debido al uso de etiquetas. HTML se enfoca en la presentación del contenido de una página web, mientras XML representa datos de manera más genérica. La forma en la que lo presenta es similar al formato JSON, con la diferencia que en lugar de utilizar objetos, utiliza etiquetas.

```xml
<Persona>
	<Nombre>Juan</Nombre>
	<Edad>30</Edad>
	<Direccion>
		<Ciudad>Buenos Aires</Ciudad>
		<CodigoPostal>1407</CodigoPostal>
	</Direccion>
</Persona>
```

<mark>**AJAX se utiliza para darle funcionalidades y permitir interacción en una página web. Permite realizar procesos asincrónicos. Por ejemplo, hacer una solicitud de información un servidor.**</mark>

> ¡AJAX **NO** es una tecnología por sí misma! Es un término que describe un modo de utilizar varias tecnologías existentes, incluyendo **HTML**, **DOM**, **CSS**, **JavaScript**, **XML** y el objeto **XMLHttpRequest**, del cual hablaremos más adelante.

Si bien las siglas de AJAX hacen ilusión a que solo se utiliza XML para hacer un intercambio de datos, en la práctica se pueden utilizar otros **formatos**. Por ejemplo, el formato JSON es una forma más sencilla y ligera de enviar información.

**JSON (JavaScript Object Notation)** estructura la información con pares **_clave-valor_** (como los objetos de JavaScript que ya conoces), donde las claves son cadenas y los valores pueden ser cualquier otro tipo de dato.

```json
{
  "Persona": {
    "Nombre": "Juan",
    "Edad": 30,
    "Direccion": {
      "Ciudad": "Buenos Aires",
      "CodigoPostal": 1407
    }
  }
}
```

Para que te hagas una idea de este formato, el equivalente en JSON del ejemplo anterior de XML, sería el siguiente:

**Diferencias entre el formato XML y JSON**

|             | XML                                                     | JSON                                                                      |
| ----------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| Sintaxis    | Más verbosa y basada en etiquetas con apertura y cierre | Más concisa basada en pares clave-valor                                   |
| Legibilidad | Más difícil de leer debido a su estructura de etiquetas | Más legible debido a la simpleza de su estructura                         |
| Anidamiento | Permite anidamiento profundo de elementos               | También permite anidamiento siendo más fácil de leer debido a su sintaxis |

<mark>Las aplicaciones web tradicionales solían requerir una recarga completa de la página cada vez que se realizaba una solicitud al servidor. **AJAX permite enviar y recibir datos del servidor en segundo plano**, sin interferir con la interacción del usuario en la página. Esto mejora la experiencia del usuario al proporcionar respuestas más rápidas y fluidas.</mark>

![Ciclo de vida web tradicional vs SPA](/astro-doc-full-stack/images/m2/ciclo-de-vida.png)

AJAX es una técnica de desarrollo que nos permite pedir información puntual al servidor para modificar una parte de nuestra página Web. Antes de Ajax no era posible modificar una parte de la Web con nueva información solicitada al servidor.

Ejemplo: al ingresar a un ecommerce el navegador realizar un petición HTTP al servidor, que le responde con los archivos HTML, CSS y Js, y finalmente, el navegador renderiza la web completa.

Supongamos que estamos en la página relacionada a la categoría “Muebles y jardín” y deseamos ir a la categoría “Baños y cocina”. En este caso, el navegador vuelve a enviar un solicitud HTTP al servidor, repitiendo el ciclo. Es decir, que el proceso comienza de nuevo. Se reciben los archivos y se renderizan los archivos completamente.

![Web tradicional](/astro-doc-full-stack/images/m2/tradicional-ajax-1.png)

Pero, los cambios entre las distintas “páginas” solo era la información de las “tarjetas”, solo cambian los productos. El resto del documento (menu, footer, barras laterales, etc) es exactamente igual.

![Web ajax](/astro-doc-full-stack/images/m2/tradicional-ajax-2.png)

**AJAX →Asynchronous JavaScript And XML**

Ajax nos permite no tener que recargar la página entera. Al seleccionar “Baños y cocina”, realizamos una petición al servidor pero no de la página entera, sino que solicitamos la información de los productos. Luego, se pintará solo la sección donde se encuentran los productos, borrando de la pantalla los anteriores y renderizando los relacionados a “Baños y cocina”.

> En el gráfico incluimos la segunda respuesta del servidor como JSON, pero inicialmente el formato era XML. Actualemente, XML se encuentra en desuso (aunque hay sistemas que lo mantienen) reemplazado por JSON.

En el ejemplo anterior la segunda respuesta del servidor podría ser un JSON

```json
[
	{
		"prodId": 7,
		"name": "Bacha",
		"price": 188.9,
		"decription": "...",
		...
	},
	...,
	{
		"prodId": 11,
		"name": "Grifería para bacha",
		"price": 110,
		"decription": "...",
		...
	},
]
```

### **¿Cómo sumamos AJAX a nuestro código?**

Vamos a desarrollar una página demo para solicitar usuarios “Fake” a laAPI pública de **JSON PLACEHOLDER (https://jsonplaceholder.typicode.com/)**

Nuestro ejemplo solo contendrá un título y un botón mediante el que solicitaremos información a la API a través de AJAX <mark>**utilizando la líbrería JQuery**</mark>. Cuando recibamos la información del servidor incorporaremos el usuario a un contenedor.

Antes de planificar la forma en que deseamos traer la información, primero es necesario entender **qué** recibiremos como resultado de la consulta. Si visitamos la página web encontraremos una API pública que contiene recursos relacionados con usuarios, posts, etc.

Esta API (**JSON Placeholder**) está enfocada únicamente al consumo y lectura de información, por lo que solo aceptará solicitudes de tipo GET con cualquiera de los endpoints con los que trabajemos. Por ejemplo, si quisiéramos conocer la información del usuario guardado en la posición 1, podemos dirigirnos al enlace...

**https://jsonplaceholder.typicode.com/users/1**

...obteniendo el siguiente JSON como respuesta:

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

**JSON Formatter**

Si quieres visualizar la información JSON de tu navegador de una forma más amigable, te recomendamos instalar esta extensión.

Ahora es momento de realizar una solicitud AJAX utilizando el signo **$** que nos proporciona **JQuery**. Es importante mencionar que este signo nos proporciona las funcionalidades necesarias para realizar peticiones asíncronas desde nuestro código, en este caso, utilizando el método **GET**.

Podemos ver un ejemplo básico del funcionamiento de AJAX sobre la API de JSONPlaceHolder en el siguiente repositorio: https://github.com/jourdanmauricio/henry-ajax-example

```javascript
// $.get(url, callback )
$.get('https://rickandmortyapi.com/api/character/1', (data, status) => {
  console.log(data);
  console.log(status); //success
});
```

## Callbacks

Los callbacks **son funciones** que se pasan como argumentos a otras funciones y se ejecutan después de que se complete alguna operación. Veamos este concepto con un ejemplo básico:

Vamos a crear una función que recibirá 3 argumentos. Los dos primeros serán números que servirán como factores de una operación matemática (en este caso una suma), y el tercer argumento será un callback (una función) que se encargará de procesar el resultado de la operación. Para este caso, dicho callback únicamente imprimirá el resultado.

```jsx
function operacion(a, b, callback) {
  var resultado = a + b;
  callback(resultado);
}

let funcionCallback = function (resultado) {
  console.log(`El resultado es: ${resultado}`);
};

operacion(5, 3, funcionCallback); // El resultado es: 8
```

Como puedes ver, este ejemplo deja clara la funcionalidad de los callbacks para realizar tareas después de que otro proceso haya terminado. En este caso, la función callback solo puede ejecutar su código cuando se ha resuelto la operación matemática.

<mark>**Los callbacks son funciones que se pasan como argumentos a otras funciones y se ejecutan después de que se complete la operación.**</mark>

## Cierre

En esta clase comprendimos temas fundamentales para el proceso de intercambio de información dentro de una página web. También revisamos cómo podemos trabajar solicitudes asincrónicas dentro de JavaScript.

Hemos aprendido que el asincronismo hace referencia a la capacidad de realizar tareas sin bloquear el flujo principal del programa. Esto es especialmente importante cuando se enfrenta a operaciones que pueden llevar tiempo, como la lectura de archivos, solicitudes a servidores, etc. Además, a pesar de que el motor de JavaScript es síncrono por naturaleza, puede utilizar un modelo de ejecución asíncrona.

Conocimos a AJAX como una técnica que permite realizar solicitudes asincrónicas al servidor desde el navegador sin recargar la página por completo, mejorando significativamente la experiencia del usuario al llevar a cabo actualizaciones dinámicas en los sitios web. Finalmente, recordamos a los callbacks como funciones que se pasan como argumentos a otras funciones y se ejecutan después de que se complete alguna operación, siendo fundamentales en JavaScript para manejar operaciones asincrónicas.

1. **Asincronía** → JS maneja operaciones que pueden llevar tiempo, sin bloquear el hilo principal de ejecución
2. **AJAX** → permite realizar solicitudes asíncronas al servidor desde el navegador
3. **Callbacks** → son funciones que se pasan como argumentos a otras funciones y se ejecutan después de que se complete alguna operación

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

Vincula tu documento **index.html** con **JQuery** a través de la etiqueta correspondiente. Recuerda que esta etiqueta debe importarse en el <head> de nuestro documento.

**_<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>_**

**ACTIVIDAD 02**

Cambiar el origen de los datos que mapeamos para renderizar las tarjetas de películas. Dejaremos de utilizar el array “escrito a mano” para obtener datos desde un servidor externo real:

- Implementar una función que realice una solicitud de tipo GET a la siguiente URL https://students-api.2.us-1.fl0.io/movies. Al hacer esa solicitud, recibiremos un JSON con un array EXACTAMENTE IGUAL al que teníamos escrito a mano.
- Si la solicitud es exitosa, ejecutar en la callback la misma lógica que ya tienes implementada para mapear el arreglo y renderizar las tarjetas.

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
