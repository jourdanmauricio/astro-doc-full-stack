---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 6 - Asincronismo
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase6.jpeg',
    alt: 'Background clase 6 - Aincronismo',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-asincronismo.avif',
    alt: 'Logo for Asincronismo',
  }
description: Asincronismo
draft: false
category: Asincronismo JavaScript
---

## Práctica de peticiones HTTP

### Peticiones HTTP desde el navegador

Antes de trabajar directamente con operaciones asíncronas, vamos a volver sobre un tema que ya comenzamos a desglosar en clases anteriores: el **protocolo HTTP**.

Como mencionamos anteriormente, HTTP es un protocolo de comunicación entre un **cliente** (alguien que solicita algo) y un **servidor** (quien provee al cliente de aquello que ha solicitado). HTTP no hace más que establecer las reglas y la estructura sobre las cuales se dará esta comunicación

Ahora te estarás preguntando “¿Qué es un cliente y qué es un servidor?”. Para recordar este punto, analicemos algo que hacemos decenas de veces todos los días en nuestras computadoras y dispositivos móviles: visitar una página de internet

### Cliente y servidor

Siempre que introduces en tu navegador, por ejemplo, *www.google.com*, estás realizando, sin saberlo, **una solicitud bajo el protocolo HTTP**. En este caso, tu navegador es el cliente porque es quien está solicitando información, y el servidor es otra computadora remota, que recibirá esta solicitud y responderá al cliente con lo que este ha solicitado. Por ejemplo, un archivo de HTML, CSS y JavaScript el cual llegará a nuestro navegador para ser interpretado y mostrado en la pantalla, permitiendo visualizar la página principal de Google.

No necesitamos invitarte a hacer la prueba por ti mismo, sabemos que haces esto muchas veces al día y seguramente todos los días con distintas páginas web. Pero… sí te invitamos a pensar…

En base en los métodos HTTP que vimos en clases anteriores: **¿Cuál crees que es el método utilizado en este caso? 🤔**

> El **protocolo HTTP** no se trata de un protocolo de comunicación directamente relacionado a JavaScript, dado que no está sujeto a ningún lenguaje o librería específico.

- HTTP es un protocolo de comunicación cliente / servidor.
- El cliente es quien solicita un recurso o una acción al servidor.
- El servidor es quien recibe dicha solicitud y actúa en consecuencia, siempre enviando una respuesta al cliente...
  _...incluso cuando hay un error, pero de esto hablaremos más adelante_

### API Testing tools

Ahora probaremos algo un poco más interesante. Seguro recuerdas que en la clase de AJAX utilizamos esta tecnología para hacer solicitudes HTTP y así obtener información de una API pública.

De manera similar, existen herramientas que permiten enviar solicitudes HTTP a un servidor a través de una API para determinar qué respuestas funcionan correctamente. Sabremos así qué información estamos obteniendo desde el servidor y de qué manera la usamos en el lado cliente.

**Herramientas para realizar peticiones HTTP → Insomnia, Postman, ThunderClient**

Postman, Insomnia y ThunderClient, hacen parte de dichas herramientas que, además de ser gratuitas, poseen ciertas características particulares para trabajar las consultas de una forma más eficiente. En el siguiente video haremos una demo de estas herramientas.

**¿Cuál es la mejor herramienta?** Cada herramienta se ajustará a tus preferencias de trabajar, así como a las distintas funcionalidades que proveen. Por lo tanto, la respuesta es subjetiva y para el fin que les daremos **cualquiera de estas es igual de útil**

A ontinuación, conoceremos una sintaxis mucho más simple y directa que puede mejorar mucho la legibilidad del código al momento de escribir promesas.

## Operaciones asincrónicas

### **¿Qué son?**

Ahora, dado que conocemos ya el término de asincronismo de la clase de AJAX, introducimos el concepto de operaciones asíncronas. Las **operaciones asíncronas** en JavaScript <mark>son aquellas en las que el script no espera a que una tarea se complete antes de pasar a la siguiente, sino que, en lugar de bloquear la ejecución del código, el script continúa ejecutando otras tareas</mark>.

Para ilustrar este concepto, imagina que eres cliente de una máquina expendedora de café y snacks. Supongamos que insertas el dinero en la máquina y seleccionas “cappuccino”. Mientras la máquina baja el vaso, sirve la leche, el café, la canela, etc., consideras comprar unas galletitas.

Por lo que oprimes el botón y cae el producto de la máquina para que lo recojas. Puedes incluso seleccionar uno nuevo mientras se termina de preparar tu café y la máquina te lo dará inmediatamente. Si te das cuenta, la máquina no esperó que el café estuviera listo para darte las galletitas o los demás productos que escogiste. La tarea de preparar el café no bloquea la ejecución de otras tareas.

![Sincronismo vs Asincronismo.](/astro-doc-full-stack/images/m2/asincronismo.png)

<mark>JavaScript cuenta con diversas herramientas y metodologías que le permiten dejar de lado su naturaleza síncrona y trabajar con operaciones asincrónicas como el uso de las funciones **callback**. Una forma más actual para manejar dichas operaciones es mediante el uso de **promesas** que **permiten encadenar operaciones asíncronas y manejar errores de una forma más estructurada**</mark>. Conozcamos este concepto...

## Promesas

Para entender que es una promesa vamos a empezar por la definición de la palabra fuera del contexto de programación.

Una promesa es **una expresión de la voluntad de dar a alguien o hacer algo por alguien**. Es decir, cuando prometemos algo, aseguramos que vamos a hacer algo a futuro.

Una promesa es como un *ticket de lotería*. Lo tenemos físicamente, pero no sabemos si ese ticket nos dará un premio o no. Dependerá del momento en que se realice el sorteo. Si ganamos, podemos dejar la pala e irnos a vivir al Caribe sin trabajar 🌴. Si perdemos tendremos que trabajar cual esclavos *forever* and *ever* 🥲. Lo que sea que ocurra va a depender del resultado del sorteo. Pero de momento tenemos un ticket que es **una promesa sin resolverse**.

Ahora, hablando en términos de programación,  **una promesa va a reservar un lugar en mi código para una acción o respuesta que aún no ocurre o de la cual aún no recibimos un resultado** , pero que una vez ocurra, mi código sabrá que hacer con esa “respuesta”.

En JavaScript las promesas son estructuras de datos. Es decir, un objeto que representa el resultado eventual de una operación asincrónica. Dicho resultado puede ser evaluado con éxito o como un fracaso y, dependiendo de ese resultado, se podrá decidir qué hacer a continuación. Veamos una promesa dentro de nuestro editor de código.

Para generar promesas contamos con una estructura nativa llamada **Promise** de la cual podemos instanciar promesas utilizando la palabra clave **new**. Esta promesa recibe como argumento una función la cual a su vez toma dos funciones como parámetros...

- En javascript una promesa es un objeto
- Resultado eventual de una operación asíncrona
- Puede ser evaluado como éxito o fracaso
- Se decidirá que hacer de acuerdo al resultado

### Estados de una promesa

Dirígete a tu Visual Studio Code y sigue el siente ejemplo. Comenzaremos por instanciar la siguiente promesa. Intenta hacerle un conosle.log para ver la respuesta en consola.

```javascript
const promesa = new Promise((resolve, reject) => {
  // ...
});
console.log(promesa);
// Promise { <Pending> }
```

Por ahora no estamos realizando ninguna tarea, pero, ¿de dónde proviene ese valor **&lt;pending&gt;** que recibimos al mostrar por consola la promesa? Por naturaleza, todas las promesas tienen tres estados fundamentales:

1. **Pending** → estado inicial de una promesa. Todas las promesas mantienen este estado hasta que se ejecute la operación asíncrona
2. **Fullfilled** → una vez se completa la operación y se evalúa de forma exitosa, la promesa se resuelve a un valor asociado a dicha operación y su estado cambia a fillfilled
3. **Rejected** → en caso de que la operación falle, la promesa ser rechaza a una razón y su estado cambia a Rejected

Una vez una promesa haya sido resuelta o rechazada, ya no estará en pending ni tampoco será posible pasar de “fulfilled” a “rejected” o viceversa.

![Promesas.](/astro-doc-full-stack/images/m2/promesas.png)

Por otro lado, la gran utilidad de las promesas no es solamente informar sobre el estado de la resolución o rechazo, lo que necesitamos es conocer el valor o la razón que nos retorna para poder utilizarlo en el código.

### Métodos de promesas

Para poder manejar el valor al que se resuelve o se rechaza una promesa, hacemos uso de dos métodos: **then** y **catch**.

**THEN** → Maneja la lógica en caso de que una promesa haya sido resulta. Se le proporciona una función que recibe el valor de una resolución como argumento y se ejecuta cuando la promesa se complete exitosamente.

**CATCH** → Maneja la lógica en caso de que una promesa haya sido rechazada. Se le proporciona una función que recibe la razón del rechazo como argumento y se ejecutará cuando la promesa se rechace, permitiendo manejar el rechazo o error.

**Resumen** → la promesa es el eventual resultado de la ejecución de una operación asíncrona.

```javascript
const getPersonaje = () => {
  fetch('https://...')
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
getPersonaje();
```

## Async/ Await

Async/Await es una característica de JavaScript creada para simplificar nuestro código asincrónico. Viene a "reemplazar" las promesas de y proporciona una forma resumida de procesar su resolución, evitando la encadenación de métodos como then() y catch().

Para inicializar una función asíncrona, es necesario anteponer la palabra clave async al declarar la función. Esto le indicará a JavaScript que la función va a trabajar con código asincrónico para evitar que la lectura del resto del código se detenga.

```javascript
async function miFuncionAsync() {
  // ...
}
```

Dentro del bloque de la función asíncrona tendremos acceso a un operador especial llamado await que le indicará al intérprete que debe esperar a que se resuelva la promesa antes de continuar con la ejecución.

Podrías preguntarte: ¿Y qué pasó con el manejo de errores si ya no encadenamos el método catch? Para ello, hacemos uso del try/catch.

- Para simplificar y mejorar la legibilidad del código asíncrono
- Construida sobre las promesas de JS
- Proporciona una forma resumida de procesar su resolución
- Evita la encadenación de métodos para el manejo del resultado

### Try/catch

Dentro de las funciones async, utilizamos un bloque llamado try/catch para el manejo de errores. Este bloque se utiliza para capturar y gestionar errores que podrían ocurrir.

👉 El bloque try contendrá el código que queremos ejecutar. En caso de ocurrir un error, cancelará la ejecución de este bloque e irá directo a ejecutar al bloque catch para manejar el error. ¿Veamos un ejemplo?

Hasta el momento vimos promesas, cuando realizamos una operación asíncrona sabemos que el resultado inicialmente no se encuentra definido, esta representado por la promesa. En el siguiente ejemplo, ese resultado incierto se almacena en la variable promesa.

```javascript
const promesa = axios.get('https://...');
console.log(promesa);
// Promise { <Pending> }

promesa
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
```

Eventualmente se completará la promesa, resolviéndose o rechazándose. De esta manera, el método then (success handler) nos permite gestionar el éxito y el método catch (error handler) nos permite gestionar el error.

**Async / Await** es otra estrategia. En realidad, es azucar sintáctico, una máscara, porque bajo le capot funcionan sobre las promesas. Es más cómodo de utilizar.

Para que funcione await las funciones deben estar definidas como async. **Await** espera hasta que se resuelva o rechace la promesa. Una vez finalizada la promesa podemos acceder a la propiedad data de la variable. La propiedad data es creada por Axios, siempre deja la información útil en data.

```javascript
const fetchMovies = async () => {
  const result = await axios.get('https://...');
  // const {data} = await axios.get('https://...');
  const movies = result.data;
};
```

**try / catch**
Pero que ocurre si la promesa se rechaza? Para capturar el rechazo de la promesa utilizamos try / catch.

```javascript
const fetchMovies = async () => {
  try {
    const result = await axios.get('https://...');
    // const {data} = await axios.get('https://...');
    const movies = result.data;
  } catch (err) {
    console.log(err);
  }
};
```

Como vemos su uso es muuy simple. Itentará ejecutar lo que se encuentra dentro del bloque try y si alguna de las sentencias arroja un error (incluido el reject de la promesa) dejará la ejecución en ese punto y continuará la ejecución por el catch.

### ¿Recuerdas a fetch?

Anteriormente hemos trabajado con fetch para realizar solicitudes HTTP. Ahora conoceremos una librería llamada Axios que permite hacer este mismo tipo de consultas, pero con otras características y particularidades que potencian su uso.

## Axios

Como ya mencionamos, al igual que fetch, Axios es utilizada para realizar solicitudes HTTP en JavaScript. Pero a diferencia de ésta, es más simple. Veremos que simplifica muchas funciones y también automatiza la conversión de datos JSON a objetos de JavaScript.

### Características

- **Sintaxis simple y consistencia**. Nos proporciona una escritura simple para realizar solicitudes.
- **Manejo de promesa**. Axios está basado en promesas, lo que facilita su integración con
  async/await y manejo de errores.

### Métodos

- **axios.get(url) o axios(url)**. Realiza una solicitud de tipo GET que permite obtener los datos de una API.
- **axios.post(url)**. Ejecuta una solicitud de tipo POST permitiendo enviar datos en el cuerpo de la solicitud (por ejemplo, al enviar un formulario).
- **axios.put(url)**. Efectúa una solicitud de tipo PUT para enviar datos al servidor y actualizar un recurso existente.
- **axios.delete(url)**. Hace una solicitud de tipo DELETE la cual se utiliza
  para eliminar un recurso existente.

### Cómo funciona?

Axios es una librería sencilla de utilizar, sobre todo si la combinamos con async y await. Axios nos brinda facilidades para realizar peticiones HTTP.

### Instalación

```bash
npm install axios
```

### Utilización

```javascript
const axios = require('axios');

const getMovies = async () => {
  console.log(axios.get('url')); // Retorna una PROMESA. Tenemos que utilizar await
  const { data } = await axios.get('url');

  // Cuando la promesa es rechazada, Axios arroja un error
  try {
    const { data } = await axios.get('url');
    console.log(data);
  } catch (err) {
    console.log(err);
  }

  // Métodos
  axios.post('url', data);
  axios.put('url', data);
  axios.delete('url/1');
};
```

## Otras operaciones de naturaleza asincrónica

Ahora vamos a terminar de comprender qué otras operaciones asincrónicas podemos encontrar en JavasScript. Algunas muy comunes son las de lectura, escritura y creación de archivos, conexión a servicios y a bases de datos.

En este primer ejemplo estaremos trabajando con operaciones asíncronas con archivos. Introducimos una herramienta que nos servirá para este tipo de tareas: file system.

## File System

El módulo “fs” es nativo de Node (por lo que no necesitaremos instalarlo) y facilita la interacción con el sistema de archivos de un dispositivo, permitiendo realizar operaciones como leer, escribir y eliminar archivos, leer y crear directorios, entre otras.

<mark>No todas las operaciones asíncronas se encuentran relacionadas a HTTP</mark>. Por ejemplo, la minipulación de archivos del sistema. Para ello vamos a utilizar el paquete (que viene con Node) llamado **fs (file system)**

fs es asíncrono e internamente utiliza callbacks para resolverlo.

```javascript
const fs = require('fs');

fs.readFile('./my_archivo.txt', 'utf-8', (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
```

```bash
# mi_archivo.txt

Este contenido pertenece a mi_archivo.txt
```

## Debugging

### ERRORES

Existen tres formas en las que se pueden presentar un error en nuestro código

1. **EXPLÍCITO** → Muchas veces, cuando tenemos un error lo podremos ver reflejado en la terminal. Por ejemplo, con un error de sintaxis.
2. **RESULTADO INESPERADO** → Otras veces nuestro código funciona correctamente. El intérprete no detecta errores, ya que el error en realidad está en la lógica. Por ejemplo, una función que debería devolver un número devuelve NaN.
3. **SIN RESULTADOS** → Puede ocurrir que nos encontremos en una situación en la que no tengamos un error explícito, y tampoco tengamos un resultado inesperado.

### Chatgpt para debbuguear código

1. Cuando podemos ver nuestro error de forma explícita podemos copiar el error e ingresarlo en chatgpt. Tendremos que darle contexto, indicarle qué hace la función o programa que ejecutamos y pegar el error que nos arroja.

Como chatgpt aún no vió el código probablemente nos arroje algunas pistas de donde puede estar en error pero no será exacta.

Entonces podemos agregar un nuevo prompt indicando: te comparto el código y pegamos el código. Probablemente, la nuevas respuesta sea más acertada.

2. En otras ocaciones podemos encontrarnos con un resultado "extraño", sin un mensaje de error. Algo salió mal, pero no tenemos indicios del problema.

Podemos abrir un nuevo chat para no confundir con el hilo anterior y preguntar a chatgpt, cual es el problema con la función y pegar el código.

3. Si no tenemos resultados como salida de la función podemos consultar chatgpt con la estrategia del punto anterior.

## Cierre

Hemos explorado conceptos fundamentales sobre el asincronismo en JavaScript y su aplicación en prácticas comunes. Abordamos temas como peticiones HTTP utilizando fetch y la librería axios, y descubrimos que el asincronismo es fundamental para manejar nuestro código.

Pusimos en práctica el concepto de promesas para representar el resultado de una operación asíncrona y cómo manejarlo. A su vez, revisamos el formato async/await como una nueva sintaxis para definir promesas. Ahondamos en los manejadores de promesas con los métodos then y catch para la forma tradicional, así como el uso de try/catch para la nueva sintaxis.

Finalmente, realizamos algunas operaciones asincrónicas como lectura/escritura de archivos y conexiones a servicios.

![Mapa de conceptos asinconismo.](/astro-doc-full-stack/images/m2/mapa-conceptos/clase6.png)

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

En esta actividad buscaremos mejorar la estrategia de manejo de la asincronía de la petición HTTP que realizamos para la petición HTTP que realizamos para obtener nuestras películas.

Para ello te invitamos a utilizar la librería “axios” que vimos en la clase de hoy, y a partir de allí manejar los posibles resultados con Promesas o Async/Await, la estrategia que prefieras.

**ACTIVIDAD 02**

Para ello vamos a:

- Instalar la librería axios utilizando el comando correspondiente de npm.

- Requerir axios en el módulo de JavaSript donde estemos realizando la petición.

- Realizar la petición a la URL que veníamos trabajando utilizando el método get de axios.

- Manejar la asincronía de esta operación utilizando una de las dos estrategias vistas en la clase:

  - Promesas, definiendo con el método then un success handler y con método catch un error handler.

  - Async/Await, implementando una función async que pueda esperar a la resolución de la promesa.

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
