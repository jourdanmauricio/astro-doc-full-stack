---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 8. Express II
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry-index.jpg',
    alt: 'A picture of a coder',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-express.png',
    alt: 'Logo express',
  }
description: Backend con Express segunda clase
draft: false
category: Express Node
---

## Servicios

Los servicios representan **segmentos específicos de lógica de negocio**. En otras palabras, se definen como <mark>una parte puntual de la aplicación que "brinda servicio" a una funcionalidad específica de la aplicación</mark>.

Podemos pensar a nuestra aplicación como una cebolla, y a los servicios como las distintas capaz que esta tiene. Cada capa estará encargada de una tarea concreta. Por ejemplo, un servicio puede gestionar las solicitudes de usuarios. Otro puede encargarse de la autenticación.

A menudo, surge la pregunta: **¿Cómo se diferencian los servicios de los controladores?** Si bien los controladores manejan la lógica de manejo de solicitudes y respuestas, los servicios se centran en tareas más amplias y especializadas. Mientras que un controlador puede ocuparse de responder a una solicitud específica, un servicio manejará una funcionalidad completa, desde la autenticación hasta la gestión de bases de datos.

- Segmentos especilizados de lógica de negocio
- Busca asegurar la cohesión y eficiencia del sistema
- Gestionan solicitudes de usuarios
- Se encargan de la autenticación
- Se centran en tareas más amplias y especializadas
- Meneja una funcionalidad completa

**Los servicios encapsulan lógica específica y cómo los controladores utilizan estos servicios para realizar acciones más amplias.**

## Middlewares

- Funciones que tienen acceso a los objetos de:
  - Solicitud (req)
  - Respuesta (res)
  - a la siguiente función en el ciclo de solicitud-respuesta (next)
- Pueden realizar acciones globales antes de llegar a las rutas específicas
- Permite una modularidad y reutilización efectiva del código

En el contexto de Express, un middleware es una función que tiene acceso a los objetos de solicitud (req), respuesta (res), y a la siguiente función en el ciclo de solicitud-respuesta de la aplicación (next). Se usan para realizar diversas acciones en el flujo de solicitud y respuesta.

Imagina que vas de viaje a Europa. Llegas al aeropuerto y a partir de allí debes pasar por varias etapas una seguida de la otra donde se realizan ciertas acciones. Por ejemplo, al llegar debes pasar por el puesto de registro en donde entregas tu maleta de bodega y recibes tu pase de abordar, luego de esto, debes pasar por el punto de detección de elementos prohibidos, a continuación te diriges a tu puerta de abordaje y finalmente abordas el avión cuando sea el momento indicado. Como puedes ver, cada punto de control (middleware) poseen una función específica y están en medio de tu llegada (solicitud) y salida (respuesta) del aeropuerto.

**Los middlewares pueden realizar acciones globales antes de llegar a rutas específicas, permitiendo una modularidad y reutilización efectiva del código.**

En general, los middlewares se utilizan cuando deseamos agregar funcionalidades específicas, manipular datos de solicitud o respuesta, o realizar acciones antes o después de que la solicitud llegue a su destino.

<mark>Estos se pueden dividir en dos categorías principales:</mark>

- **Pre-built**
- **Personalizados**

### MIDDLEWARES PRE-BUILT MÁS UTILIZADOS

Podemos ver a los **middlewares pre-built** como componentes listos para usar que ofrecen distintas funcionalidades que son específicas para cada tarea en Express. Entre los más utilizados se encuentran:

<mark>**Morgan**</mark>

Es un middleware de registro de solicitudes HTTP que facilita el seguimiento y la visualización detallada de la información de las solicitudes que llegan al servidor, como por ejemplo método HTTP, ruta de la solicitud, tiempo que tarda en obtener respuesta, etc.

<mark>**express.json()**</mark>

Convierte automáticamente los cuerpos de las solicitudes con formato JSON, facilitando el manejo de datos enviados por los clientes. En términos más simples, convierte los datos JSON enviados en el cuerpo de la solicitud en un objeto JavaScript para que puedan ser fácilmente manipulados

<mark>**CORS (Cros-Origen Resource Sharing )**</mark>

Permite o restringe el acceso a recursos, un aspecto esencial para la seguridad en las solicitudes desde el navegador.

### Middlewares personalizados

Un **middleware personalizado** se refiere a funciones o conjuntos de funciones que tú mismo creas para adaptar el flujo de manejo de solicitudes según las necesidades específicas de tu aplicación. Estos middlewares se insertan en la cadena de manejo de solicitudes entre el momento en que se recibe la solicitud y el momento en que se envía la respuesta. Se usan para realizar tareas adicionales, manipular datos, validar información, entre otros.

¿Cuándo usar middleware personalizado? En situaciones donde los middlewares pre-built no cubren exactamente lo que necesitas o cuando deseas una lógica de manejo de solicitudes específica para tu aplicación.

<mark>Beneficios de los Middlewares personalizados</mark>

- Adaptabilidad -> Puedes personalizar la lógica de manejo de solicitudes de acuerdo con requisitos puntuales de la aplicación.

- Reutilización de código -> Al encapsular funciones específicas en middlewares personalizados, puedes reutilizarlas en diversas partes de tu aplicación.

- Mejora la mantenibilidad -> Al separar la lógica de manejo de solicitudes en middlewares específicos, tu código se vuelve más fácil de mantener.

En resumen, la creación de Middlewares personalizados te brinda flexibilidad y control total sobre el flujo de manejo de solicitudes en tu aplicación de Express, permitiéndote adaptarla de manera precisa a tus necesidades.

Los middlewares en Express proporcionan funcionalidades adicionales, desde la gestión de autenticación hasta la optimización del manejo de errores y la compresión de respuestas para mejorar el rendimiento.

Contrastando con los pre-built, los middlewares personalizados son funciones creadas por el desarrollador para abordar necesidades específicas con relación a la tarea que esté implementando, mientras los pre-built son middlewares ya definidos que cualquier desarrollador puede consultar en el gestor de paquetes npm y usar dentro de sus proyectos.

Ya vimos cómo los middlewares, en general, optimizan el flujo de solicitudes y respuestas en nuestro servidor Express. Sin embargo, hay otro punto vital para lograr aplicaciones sólidas y efectivas: la seguridad. Es aquí donde entran las validaciones.

## Validaciones

- Garantizan la integridad, seguridad y eficiencia del sistema
- Aseguran la fiabilidad y consistencia general de la aplicación
- Evita errores
- Protege tu aplicación contra posibles vulnerabilidades
- Brinda una buena experiencia de usuario

**Importancia de las validaciones en la app de backend**

En un servidor, las validaciones son esenciales para garantizar la integridad, seguridad y eficiencia del sistema, asegurando la fiabilidad y consistencia general de la aplicación.

Al validar los datos de entrada, puedes verificar que cumplen con las condiciones necesarias antes de procesarlos, evitando errores, protegiendo tu aplicación contra posibles vulnerabilidades y mejorando el desempeño de tu código. Además, permite también brindar una buena experiencia de usuario al proporcionar retroalimentación de parte de estos.

### Estrategias de validación utilizando middlewares

- Puedes crear middlewares personalizados que verifiquen los datos de entrada
- Asegura de que cumplan con ciertos criterios antes de pasarlos a la lógica principal de la aplicación
- Puedes aprovechar middlewares pre-construidos
- Puedes utilizar bibliotecas especializadas en validaciones para simplificar el proceso

En cuanto a las estrategias de validación utilizando middlewares, existen varias maneras de implementar validaciones en Express. Puedes crear middlewares personalizados que verifiquen los datos de entrada, asegurándote de que cumplan con ciertos criterios antes de pasarlos a la lógica principal de la aplicación. Además, también puedes aprovechar middlewares pre-construidos o bibliotecas especializadas en validaciones para simplificar este proceso. <mark>Ej: express-validator</mark>

Puedes implementar validaciones en Express. No obstante, hay muchas más implementaciones posibles como: validación de números enteros, validación de longitud de cadena o lo que necesites validar, sea con una librería externa o con un middleware personalizado. Ahora sí, tienes todas las herramientas de Express que necesitas para crear aplicaciones robustas, sólidas y eficientes.

## Cierre

En esta clase, profundizamos en Express y exploramos conceptos clave que forman el corazón de cualquier aplicación Express, desde el concepto de servicio hasta la implementación de middlewares validadores.

Comenzamos conociendo los servicios y cómo se diferencian de los controladores. Luego, avanzamos hacia los middlewares, poderosos interceptores de solicitudes y respuestas. Exploramos middlewares pre-construidos como `morgan`, `express.json()` y `cors`, y luego nos aventuramos a crear nuestros propios middlewares personalizados. Desde autenticación hasta manejo de errores, los middlewares se revelaron como herramientas cruciales para moldear el flujo de nuestra aplicación.

A continuación, destacamos la importancia de validar los datos en una aplicación backend. Desde la implementación de validaciones personalizadas hasta el uso de la librería `express-validator`, exploramos estrategias para garantizar la integridad y seguridad de nuestras solicitudes.

Por último, cerramos la clase implementando rutas, controladores y validaciones en ejemplos concretos. Desde la creación de usuarios hasta el inicio de sesión, vimos cómo cada pieza encaja en el rompecabezas de una aplicación Express.

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

- Instalar las siguientes dependencias:
  - morgan
  - cors
- Luego de la definición del servidor en server.js, configurar todo de manera tal que las peticiones pasen por los middlewares morgan, cors y express.json.

- Implementar los elementos correspondientes para continuar el “camino” que iniciamos en la actividad anterior:

  - Implementar un módulo de servicio de películas. Que este módulo exporte un objeto donde cada propiedad será una función.

  - Implementar en este módulo de servicio una función que retorne el mismo arreglo de 3 películas con el que estuvimos trabajando. (Puedes copiarlo de la respuesta del servidor al que solicita tu frontend).

  - Realiza a tu controlador las modificaciones necesarias para que hacer que ejecute la función del servicio que le permite obtener todas las películas.

**ACTIVIDAD 02**

En este punto, si todo ha salido bien, ya podemos realizar una prueba en Insomnia, Postman, etc. Si ves que la respuesta de la petición está correcta, ¡ya puedes cambiar la URL a la que realiza la petición tu aplicación de frontend!.

Ahora es solo cuestión de que abras 2 CONSOLAS en tu Visual Studio Code (RECUERDA QUE SON DOS APLICACIONES SEPARADAS) y pruebes todo este flujo funcionando.

EXTRA CREDIT: Te sugerimos como extra que, en lugar de responder con objetos literales de películas, en tu módulo de servicio implementes la clase Movie, y respondas con instancias de esta clase. Si logras implementar esto, te asegurarás la integridad de los datos. Además, como un desafío extra, te proponemos que, dentro del constructor de la clase, arrojes un error en caso de que esta función no reciba adecuadamente las propiedades “title”, “poster” y “director”.

**¡Bien hecho!**

<mark>TIPS</mark>

- No te preocupes por ahora por la creación de las películas nuevas (porque tenemos solo 3). Ya lo encararemos más adelante cuando tengamos nuestra Base de Datos.

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
