---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 7. Express
date: 11-02-2024
author: Mauricio Jourdán
image: { src: '/images/henry-index.jpg', alt: 'A picture of a coder' }
icon: { src: '/images/m2/icon/icon-express.png', alt: 'Logo express' }
description: Backend con Express
draft: false
category: Express Node
---

## Objetivos de la clase

1. Conocer los fundamentos de Express, comenzando por la comprensión de la estructura básica de un servidor HTTP.

2. Explorar el proceso de creación y configuración del proyecto mediante el uso eficiente del scaffolding

3. Profundizar en la implementación práctica del servidor HTTP utilizando Express y abordar el concepto esencial de controlador y enrutado.

## Estructura básica de servidor

### Recordemos a HTTP...

Antes de iniciar con la creación de un servidor con nuestra nueva herramienta, recordemos que HTTP es el lenguaje que permite a los navegadores y servidores compartir información a través de internet.

Cuando buscas algo en internet y presiones la tecla enter, lo que está sucediendo por detrás de todo es que tu navegador envía un pedido de información a un servidor. Este le responderá con la información solicitada o con un error correspondiente. La información puede ser, por ejemplo, el contenido que buscas en la web.

Ese **pedido (request)** y **respuesta (response)** de información es lograda gracias a el protocolo HTTP.

### Comprendamos la estructura

A continuación veremos, a partir de una comparación con la vida real, cómo es la estructura de un servidor. Imaginemos que trabajamos en un restaurante...

<mark>Host y puerto (contexto del restaurante)</mark>

En términos sencillos, el “localhost” es un identificador de ubicación de un recurso en la red. Puede ser una dirección IP numérica o un nombre de dominio, como "www.ejemplo.com". El host indica dónde se encuentra el servidor que aloja la aplicación o el recurso al que se está intentando acceder.

- El host sería la dirección de nuestro restaurante, digamos 'localhost'. Por ejemplo, Av. San Martín 2000.

El puerto, por otro lado, es como una puerta específica en el servidor. Se utiliza para distinguir diferentes servicios o aplicaciones que se ejecutan en el mismo host. Mientras que el host te dice dónde encontrar el servidor, el puerto te dice a qué "puerta" debes llamar para acceder a un servicio específico en ese servidor. Por ejemplo, tu computadora cuenta con muchos puertos, por lo que podrías tener muchos servidores activos al mismo tiempo.

- El puerto podría ser el número de mesa '3000'.

<mark>Controladores (chef en acción)</mark>

- Imagina que un cliente realiza un pedido de comida al mesero. El mesero se dirige a la cocina y le comenta al chef cuál fue el pedido. El chef preparará el plato y se lo enviará al cliente.

Esto mismo sucede en un servidor. Cuando una persona utiliza una página web, está realizando peticiones al servidor que le brinda servicio. Dentro del servidor existen los "controladores" (chef) que se encargan de recibir el pedido y darle una respuesta. Por ejemplo, enviar información, eliminar un dato, o crear un nuevo registro.

<mark>Servicios (organización del personal)</mark>

Ahora bien ¡Nuestro chef no trabaja solo! Aquí es donde entra en escena el resto del personal, que cumple el papel esencial de los "servicios". Imagina a los servicios como un equipo coordinado de meseros. Cada mesero se especializa en un área particular para asegurar que cada solicitud se atienda adecuadamente.

Supongamos que un navegador solicita una página web. Los servicios (mesero) toman ese pedido y lo llevan al controlador (chef) adecuado: el encargado de esa ruta específica. Este controlador prepara la respuesta

Así, cada servicio tiene su propia responsabilidad y se organiza para manejar un aspecto particular de la aplicación (solicitudes de usuario, autenticación, interacción con base de datos). Los servicios se utilizan para descomponer la lógica de la aplicación en partes más pequeñas y manejables, lo que facilita la escalabilidad, el mantenimiento y la colaboración entre equipos de desarrollo.

<mark>Middlewares (camareros adicionales)</mark>

El personal puede contar con algunos meseros adicionales: nuestros middlewares. Estos meseros tendrán la capacidad de mejorar o darle un toque final al plato antes de que llegue al cliente.

Dentro de un servidor podemos encontrar esto, por ejemplo, cuando queremos enviar una serie de datos al cliente, no como viene desde la base de datos (cocina) sino con un formato en particular.

## Estructura de servidor de express

Una de las características de express es su **flexibilidad**, ya que la documentación no especifica una estructura de carpetas "ideal". Por ello, es posible contar con diferentes variantes en la organización de carpetas. Exploremos más, entonces, en la arquitectura de nuestras carpetas y archivos.

Nos enfocaremos en cómo dar forma a nuestro proyecto a través del **scaffolding**. Vamos a crear una estructura de carpetas para organizar nuestro código de manera eficiente. Esta estructura se basará en 3 carpetas principales.

Cuando comenzamos el proyecto solo tenemos el archivo index.js (entry point) en la raiz del proyecto. La estructura del proyecto quedaría de la siguiente manera:

```
/
|-> index.js
|
|-> src
|    |-> routes
|    |-> controllers
|    |-> services
|
|-> middlewares
|
|- package.json
```

> <mark>IMPORTANTE</mark> Las carpetas "rutas" y "controladores" son comúnmente utilizadas en patrones de diseño MVC (Modelo - Vista - Controlador) y en el contexto de desarrollo web para organizar y estructurar el código de una manera clara y mantenible. De esta manera, separamos por responsabilidades.

De la misma manera que al ruta utiliza al controlador, el controlador utilizará los servicios.

- Las rutas (endpoints) de nuestra aplicación estarán definidas dentro de la carpeta <mark>routes</mark>
- ¿Qué debe realizar la app cuando recibe un request? La función controladora es quien determina la acción a tomar. No es responsabilidad de la ruta (routes), por lo tanto creamos la carpeta <mark>controllers</mark>. Establecen la lógica de negocio de cada ruta
- La función controladora indicará que es lo que se debe hacer pero no lo hará. El controlador define la lógica, no la ejecuta. Las funciones que ejecutan las tareas son los <mark>servicios</mark>. Un ejemplo común es recuperar la información de la base de datos

<mark>RUTA => CONTROLADOR => SERVICIO</mark>

### Variante de enfoques

Existen variantes de cómo estructurar las carpetas y archivos de nuestros proyectos. Cada variante tiene su propia filosofía y ventajas. Puedes elegir la que mejor se adapte a tus necesidades y preferencias.

<mark>Enfoque funcional</mark>

Organizas tu proyecto en carpetas que representan características específicas del proyecto, como 'usuarios', 'publicaciones', etc.

En este ejemplo, cada carpeta representa una característica principal del proyecto y contiene archivos relacionados con esa característica, como rutas, controladores y servicios específicos para usuarios o publicaciones.

```
/
|
|-> users
|     |-> UsersRoutes
|     |-> UsersColtroller
|     |-> UsersService
|
|-> post
|     |-> PostsRoutes
|     |-> PostsColtroller
|     |-> PostsService
|
-> App.js
```

<mark>Enfoque modular</mark>
Organizas tu proyecto en carpetas que representan roles o componentes clave, como 'rutas', 'controladores' y 'servicios'. Las carpetas contienen archivos que se centran en una función específica, como definir rutas, manejar la lógica de negocio en controladores o gestionar servicios compartidos.

En este ejemplo, las carpetas están organizadas por roles o componentes clave, como rutas, controladores y servicios. Cada carpeta contiene archivos que se centran en una función específica, proporcionando flexibilidad y mantenimiento.

```
/
|
|-> routes
|     |-> UsersRoutes
|     |-> PostsRoutes
|
|-> controllers
|     |-> UsersColtroller
|     |-> PostsColtroller
|
|-> services
|     |-> PostsService
|     |-> UsersService
|
-> App.js
```

## Creación de servidor

### ¿Por qué aprenderlo?

**¿Proqué aprender Express?**

1. **Facilita el manejo de rutas** → Simplifica la creación y gestión de rutas en nuestra aplicación, permitiéndonos estructurar nuestro código de una manera más organizada.
2. **Middleware para funcionalidades adicionales** → Introduce el concepto de middleware que nos brinda una forma elegante de incorporar funciones adicionales a nustras rutas, como la autenticación o la gestión de errores.
3. **Ahorra tiempo con los middlewares integrados** → Trabaja con middlewares integrados para tareas comunes, como el manejo de sesiones, cookies, y análsis de cuerpos de solicitudes.
4. **Amplia comunidad y documentación** → Es uno de los frameworks web más populares para Node.js, lo que significa que tiene una amplia comunidad y una sólida documentación.
5. **Escalabilidad y flexibilidad** → A medida que nuestros proyectos crecen, nos brinda la flexibilidad necesaria para manejar lac complejidas y escalar nuestras aplicaciones de manera eficiente.

Al crear el servidor definiremos el puerto 3000 para escuchar las peticiones.

### Puntos importantes

**Puerto 3000**
El puerto 3000 es comúnmente utilizado durante el desarrollo local de servidores. No está reservado para ningún servicio específico. Sin embargo, puedes elegir cualquier otro número de puerto que no esté siendo utilizado por otros servicios en tu sistema.

En resumen, al "abrir el puerto 3000", estamos permitiendo que nuestro servidor de express escuche las solicitudes entrantes en ese puerto específico. Esto nos permite interactuar con nuestra aplicación a través de la URL http://localhost:3000 en un navegador web.

**Método Listen**
El método listen que has visto en el ejemplo, es utilizado en express para iniciar un servidor y que este "escuche" las solicitudes HTTP en un puerto específico.

- puerto: número del puerto en el que el servidor escuchará las solicitudes.

- callback: función opcional que se ejecuta cuando el servidor se inicia correctamente.

> [NOTA]: el callback es útil para realizar acciones específicas después de que el servidor se ha iniciado correctamente. En el ejemplo, utilizamos un console.log para imprimir un mensaje indicando que el servidor está escuchando en un puerto específico.

```javascript
server.listen(puerto, [callback]);
```

En resumen, el método listen es fundamental para iniciar un servidor con express. El callback que recibe es opcional, pero útil para acciones posteriores al inicio. Ahora que tienes las herramientas para iniciar tu propio servidor y comenzar a construir sobre esta base sólida.

## Controladores

Un controlador es una función que maneja las solicitudes HTTP, llevando a cabo la lógica necesaria y enviando una respuesta al cliente. Estos controladores estarán ligados a una (o más) ruta que es la que recibe el pedido o request del cliente.

### Funciones y responsabilidades típicas

1. Procesamiento de datos → Un controlador puede procesar datos de la solicitud, como parámetros de ruta o datos del cuerpo.
2. Interacción con modelos → Puede interactual con modelos (representación de datos) para realizar operaciones en la base de datos.
3. Generación de respuestas → Un controlador crea y envía respuestas al cliente, ya sea HTML, JSON u otros formatos.
4. Manejo de errores → Puede contener lógica para manejar errores y enviar respuestas adecuadas.
5. Redirecciones → Puede redirigir a otras respuestas o URLs según la lógica de la aplicación.

<mark>En resumen, **un controlador** en express maneja solicitudes HTTP y ejecuta lógica específica de la aplicación.</mark>

## Enrutado

Hasta el momento hemos definido a los controladores y aprendimos de crearlos. Ahora, avancemos con otro concepto clave para la clase de hoy...

El <mark>enrutado</mark> es un componente de express que se encarga de gestionar las rutas de nuestra aplicación. Su propósito principal es actuar como un canalizador de solicitudes, dirigiéndolas hacia controladores específicos encargados de darles una respuesta.

<mark>Enrutado</mark>

Creamos un enrutador utilizando **express.Router()**. Este enrutador será responsable de manejar todas las rutas relacionadas con los posts.

<mark>Rutas</mark>

Asociamos rutas específicas con un método HTTP y con uno de los métodos del controlador correspondiente.

<mark>Enrutador principal</mark>

1. Incorporamos nuestro enrutador de Posts en el enrutador principal de la aplicación.

2. Ahora, todas las solicitudes dirigidas a '/posts' serán manejadas por el enrutador de posts.

3. En este ejemplo, el enrutador de Usuarios maneja las rutas específicas para usuarios. El enrutador index actúa como el punto de entrada principal. Al utilizar **router.use('/posts', postsRouter)**, indicamos que todas las solicitudes que comienzan con "/posts" deben ser dirigidas al enrutador de posts. Esto proporciona una forma estructurada y lógica de organizar las rutas.

<mark>Enrutador index</mark>

1. **req y res** → son abreviaturas de request y response. Son objetos proporcionados por Express. <mark>req</mark> contiene información sobre la solicitud del cliente, y res se utiliza para enviar la respuesta al cliente.

2. **send** → es un método de respuesta que envía una respuesta al cliente.

3. **express.router()** → este método devuelve un objeto de enrutador de Express, que se utiliza para definir rutas y middlewares. Permite modularizar las rutas y organizar el código.

4. **Número de rutas y métodos HTTP** → puedes crear tantas rutas como necesites. No están limitadas al método GET. Puedes usar métodos como PUT, POST, DELETE, entre otros, según las necesidades de la aplicación.

### Enrutadores por entidad

Además de los enrutadores index podemos encontrar los enrutadores por entidad. Ellos se centran en gestionar rutas relacionadas con una entidad específica (pj: Usuarios, Productos, etc).

## Extensiones para Visual Studio Code

¿Sabías que VSC ofrece distintas extensiones que pueden permitirte acelerar el desarrollo de código, y a su vez mejorar la calidad? A continuación te compartimos algunas de las extensiones más recomendadas.

- GitHub Copilot (30 días de prueba)

Esta extensión es un copiloto de inteligencia artificial programado para sugerir automáticamente líneas de código mientras escribes. Es, a día de hoy, la herramienta más completa ya que también puede debuggear, generar test, transcribir código y documentarlo.

- ESLint

Esta extensión utiliza reglas predefinidas o personalizadas para analizar código JavaScript o TypeScript en busca de errores, inconsistencias y malas prácticas.

- IntelliCode

Esta extensión de Microsoft utiliza IA para analizar tu código y ofrecerte sugerencias de autocompletado inteligentes basadas en patrones de programación comunes y en millones de líneas de código de otros desarrolladores. A medida que la utilices, IntelliCode se adaptará a tu estilo de codificación personal.

## Cierre

Hemos dado pasos significativos en el mundo de express. Desde la creación de nuestro servidor HTTP hasta la organización estructurada con controladores, enrutadores y modularización. Exploramos cómo express simplifica la creación de servidores y estructuración de nuestro código.

Recuerda, cada bloque de código es una pieza del rompecabezas, y hoy hemos encajado muchas de ellas.

![Estructura del proyecto.](/images/m2/mapa-conceptos/clase7.png)

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

En esta actividad empezaremos a trabajar sobre la aplicación de Backend de nuestro proyecto. Iremos hacia la carpeta “back” de nuestro repositorio y allí realizaremos las primeras instalaciones y configuraciones en base a lo visto en la clase.

**ACTIVIDAD 02**

Identificar la ubicación del archivo package.json de nuestro proyecto de backend y posicionarnos allí en nuestra terminal.

**ACTIVIDAD 03**
Instalar las dependencias con las que estaremos trabajando:

- Nodemon (como dependencia de desarrollo).
- Express.

**ACTIVIDAD 04**
Preparar la estructura de carpetas que presentamos en la clase:

- Módulo index.js.
- Carpeta src.
- Módulo src/server.js.
- Carpeta src/controllers.
- Carpeta src/services.
- Carpeta src/routes.

**ACTIVIDAD 05**
Configurar en package.json el comando start para que ejecute con nodemon el módulo index.js.

**ACTIVIDAD 06**
Requerir express y crear el objeto app dentro del módulo server.js. Exportar este objeto.

**ACTIVIDAD 07**
Requerir en el módulo index.js el objeto app y ejecutar su método listen, pasando los argumentos correspondientes.

**ACTIVIDAD 08**
Implementar los elementos necesarios de manera tal que nuestra aplicación:

- Espere una petición de tipo GET a /movies.
- Al recibir la petición, debe ejecutarse el controlador correspondiente.
- El controlador responda al cliente que realizó la petición con un mensaje que indique que próximamente estarán disponibles los datos de películas.

**¡Bien hecho!**

<mark>TIPS</mark>

- Vas a notar que este proyecto tiene muchos módulos de JavaScript. No te preocupes si esto se siente desafiante, es normal que así sea al principio.

- No te dimos instrucciones tan detalladas para la parte de la definición de las rutas. Notarás que de a poco las consignas estarán más a “alto nivel”.

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
