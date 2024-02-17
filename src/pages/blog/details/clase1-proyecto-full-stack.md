---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 1. Proyecto Full Stack
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase1.jpg',
    alt: 'Aldrin on the moon',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-code.png',
    alt: 'Logo for code',
  }
description: Proyecto Full Stack
draft: false
category: Full Stack
---

## Frontend

Dentro de los proyectos full stack, nos referimos a **frontend** a un pedazo de la aplicación que solo se enfoca en la interacción con lo usuarios. De este lado, el objetivo es presentar información útil, definir la visualización de datos y gestionar las interacciones de este con la aplicación.

**Por ejemplo, mientras ves esta clase estas interactuando con el frontend de Henry. Es decir, estás  leyendo  información,  clickeando  sobre botones y  recorriendo  distintas vistas. Esto es el frontend de una aplicación.**

La rama del desarrollo del frontend se encarga de:

1. **La interfaz de usuario** → que tenga todos elementos que la funcionalidad requiere, que muestre las imágenes, información, botones que al presionarlos disparen las acciones correspondientes. Todo aquello que el usuario necesita para interactuar.

2. **Experiencia de usuario** → los elementos no solo deben funcionar sino que deben tener un diseño atractivo, deben estar posicionados de manera que para el usuario tengan sentido, considerar tamaño de fuente e imágenes, se debe resaltar el contenido más importante, que el usuario pueda encontrar las cosas facilmente, que sepa los pasos para cumplir un objetivo

### Tecnologías comunes

Al ser el frontend un fragmento de una aplicación, este viene acompañado de tecnologías específicas. Es decir, tecnologías que solo sirven para el desarrollo del frontend. Todas estas tecnologías las podemos agrupar en 4 categorías.

1. **Lenguajes** → sintaxis de código que nos permite escribir instrucciones que pueden ser ejecutadas por una computadora. Podemos encontrar lenguajes como JavaScript, Python, TypeScript, entre otros

2. **Frameworks** → grupo de herramientas que proporcionan una estructura para desarrollo de software. Simplifican el desarrollo al ofrecer soluciones predefinidas para tareas comunes. Ej: Angular, Vue, etc.

3. **Librerías** → a diferencia de los frameworks, las librerías no nos dictan una estructura general de la app, sino que proporciona herramientas específicas. Dentro de las más utilizadas podemos encontrar a JQuery o React

4. **Preprocesadores** → facilitan la escritura del diseño y estilos de una app. Ej: Sass, Less.

Estas son solo algunas de las muchas librerías y frameworks disponibles en el ecosistema del desarrollo frontend. La elección de las herramientas adecuadas dependerá de los requisitos específicos del proyecto, así como de su alcance y estructura general.

## Backend

El **backend** es otro fragmento que puede tener una aplicación. Es la parte encargada de la lógica que hace foco en las funcionalidades de una página y la gestión de bases de datos. El backend es responsable de que una aplicación funcione correctamente (detrás de cámaras), manipulando y disponiendo la información necesaria para ser consumida por el cliente.

> **[NOTA]:** no confundir **servidor** con **backend**. El primero es una porción del backend que se encarga de operar solicitudes de un cliente (u otra aplicación). En cambio el backend es un conjunto de piezas como el servidor, base de datos, lógica de negocio, etc.

### ¿Cómo funciona?

El backend es el detrás de escena de la app. Cuando el usuario envía o recibe información, es el backend quien se ocupa de gestionarla. El frontendse comunica con el backend. El backend es una app aparte que recibe las solicitudes del frontend, el backend buscará la información para cumplir con la solicitud (guardar o enviar la información solicitada). La aplicación backend se encarga de la lógica de la app, interactua con la base de datos (que no es parte del backend) y de gestionar la seguridad (permisos, roles).

### Tecnologías comunes

De la misma manera que sucede en el frontend, podremos encontrar herramientas específicas para el desarrollo de funcionalidades en esta parte de una aplicación.

Existe una amplia variedad de tecnologías **enfocadas al desarrollo backend**. En este caso, vamos a mencionar algunas de las más populares que se complementan con lenguajes como JavaScript y/o TypeScript.

1. **Entorno de ejecución** → incluyen recursos y servicios que permiten la ejecución de programas o aplicaciones. Ej: Node, Deno y Bun.

2. **Frameworks** → los más populares son: Express, Koa, Hapi y NestJs.

3. **ORM (Object Relational Model) / ODM (Object Document Model)** → son herramientas que facilitan la interacción entre sistemas de bases de datos y lenguajes de programación. Ej: Mogose, TypeOrm, Sequelize y Prisma.

**¿Qué te parece si mejor vemos un ejemplo más cercano a la vida real?** Supongamos que eres un chef con grandes habilidades en la cocina, y que ahora debes preparar una cena especial para alguien importante.

**ENTORNO DE EJECUCIÓN** → Tu **entorno de ejecución** será equivalente a la cocina o al espacio en el que estés cocinando. Por ejemplo, desde que iniciaste el Prep Course hasta ahora, has trabajado con NodeJS. Este es nuestro entorno de ejecución. Pero no te preocupes por esto ahora, ya tendremos toda una clase enfocada a este punto.

**FRAMEWORKS** → Podemos pensar a los **frameworks** como recetas detalladas que debes seguir para preparar tus platos de forma correcta y simplificar tu trabajo.

**ORM / ODM** → Los **ORMS** y **ODMS** serán los tarros etiquetados que guardan ciertos ingredientes que usarás para la preparación de cada plato. Al finalizar, la cena será tu aplicación completa desarrollada del lado backend.

## API

Una **API (Application Programming Interface)** define el conjunto de reglas y protocolos que permiten que dos sistemas se comuniquen entre sí, independientemente de las tecnologías utilizadas en cada uno de ellas. En otras palabras, es una forma de estructurar el código para estandarizar la comunicación entre dos o sistemas.

**Las APIs dictan cómo debe realizarse la solicitud de información de un cliente a un servidor, y cómo este deberá estructurar las respuestas.**

### ¿Cómo funcionan?

Frontend y Backend son dos aplicaciones separadas. Estas aplicaciones pueden vivir una sin la otra, por ejemplo: páginas estáticas institucionales.

El concepto de API no necesariamente se encuentra relacionado a frontend o backend. Una API nos brinda un serie de recursos, herramientas, protocolos, reglas para la comunicación entre dos sistemas independientes. Ej: La API del DOM que nos brinda métodos para interactuar con el DOM. Nuestra app no conoce la implementación de los métodos pero podemos interactuan con ellos.

![Definición API](/astro-doc-full-stack/images/m2/full-stack-1.png)

API Rest → Son un tipo especial de API que se utilizan entre front y back. La comunicación se realiza a través del protocolo HTTP, que no solo sirve para esta comunicación.

![Definición Rest API](/astro-doc-full-stack/images/m2/full-stack-2.png)

Las implementaciones de APIs no son completamente al azar. Estas están ligadas a unos patrones/reglas que debe conocer el equipo de trabajo para desarrollar proyectos de manera conjunta.

Las APIs pueden seguir distintos **patrones y diseños** dependiendo de las necesidades que detecte el equipo de desarrollo. A continuación veremos uno de ellos.

**API Restful** → El patrón **RESTful (Representational State Transfer)** es un estilo de arquitectura para diseñar una API. Se basa en principios fundamentales, simplicidad y escalabilidad de la API.

<mark>Principios de API RESTFull</mark>

1. Recursos → En RESTful todo es considerado como un recurso. Un recurso puede ser cualquier información que tenga sentido para el sistema, como un objeto, un servicio, o una entidad abstracta.
2. Operaciones CRUD → Se definen operaciones estandar basadas en el sistema CRUD (create, read, update, delete) para interactuar con los recursos.
3. Estado representacional → El estado de un recurso se representa y se transfiere entre el cliente y el servidor en algún formato de representación, como JSON o XML
4. Identificadores únicos (URI) → Cada recruso posee un identificador único conocido como URI (Identificador de Recurso Uniforme). Los URIs proporcionan una forma de acceder y manipular un resurso específico
5. Sin estado (stateless) → La comunicación entre cliente y servidor es sin estado, lo que significa que cada solicitud del cliente al servidor contiene toda la información necesaria para entender y procesar la solicitud. No hay información de estado almacenada en el servidor entre solicitudes

## Protocolo HTTP

Anteriormente hemos mencionado que las APIs establecen un protocolo de comunicación entre el cliente y el servidor, y el más comúnmente empleado es el llamado **protocolo HTTP**. Pero, ¿qué significa esto?

**Protocolo de Red** → Primero es necesario entender qué es un protocolo de red. La **red**, en términos simples, se refiere a un entorno donde las computadoras comparten recursos e información utilizando protocolos que facilitan la comunicación entre ellas.

![Protocolo http](/astro-doc-full-stack/images/m2/protocolo-http.png)

💪Existe una organización que creó un modelo llamado OSI (Open System Interconnection). Este modelo permite que estos protocolos de comunicación se organicen según su funcionalidad.

Este modelo define **siete capas de encapsulamiento** y es probable que hayas encontrado algunas siglas familiares en la imagen anterior, como IP (Internet Protocol), TCP (Transmission Control Protocol), DHCP (Dynamic Host Configuration Protocol), entre otros.

¿**Es necesario**conocer a fondo cada uno de estos protocolos? ¡Para nada! Aunque...👉👈 aquellos quienes quieran dedicarse al desarrollo backend podrían profundizar más en este punto en algún momento. Por ahora es suficiente comprender que son lenguajes estandarizados (protocolos) que posibilitan la conexión a través de redes de información, siguiendo la estructura definida del Modelo OSI.

<mark>El **HTTP** (Hypertext Transfer Protocol).</mark> Es el principal protocolo para transferencia de información en internet. Este, a su vez, opera sobre el conjunto de protocolos TCP/IP, los cuales, a grandes rasgos, se permiten la transmisión de datos entre dispositivos conectados a la red.

La pregunta que nos podríamos hacer es... ¿Cómo indicamos el tipo de *request* que queremos hacer en este protocolo? Para esto, el protocolo HTTP define un "status" del proceso que queremos procesar en el servidor. Esto se llama: **Métodos HTTP**.

## Métodos HTTP

**GET** → para obtener información de un recurso. Corresponde a la operación de READ. Obtiene datos existentes

**POST** → para enviar datos al servidor para crear un nuevo recurso. Corresponde a la operación CREATE. Crea nueva información

**PUT** → para enviar datos al servidor para actualizar un recurso o crearlo. Puede corresponder a la operación UPDATE o CREATE según como se utilice

**DELETE** → para solicitar al servidor que elimine un recurso. Corresponde a la operación DELETE. Elimina un recurso existente

### ¿Cómo funciona?

No necesariamente cliente y servidor van a ser una app front y una app back. Dos aplicaciones back pueden comunicarse y una tomara el rol de cliente y otra de servidor. El caso más común es que el cliente sea el front y el servidor sea el back

El cliente solicita recursos (a través de una petición / request) al servidor. El servidor gestiona la solicitud y responde al cliente a través de una response. Siempre habrá un request y un response.

Dentro del request incluye el método para indicar al servidor que acción debe realizar.

La siguiente imagen muestra el flujo completo de una solicitud HTTP, desde su emisión por el navegador, hasta la devolución de una respuesta por parte del servidor:

![Metodos http](/astro-doc-full-stack/images/m2/metodos-http.png)

## Cierre

En la clase de hoy, exploramos la estructura full stack, dividiéndola en dos componentes esenciales:

- **Frontend**: Se centra en la experiencia del usuario, todo lo que vemos y con lo que interactuamos en una aplicación web.
- **Backend**: Trabaja "detrás de escena", gestionando la lógica de la aplicación, interactuando directamente con la base de datos, entre otras funciones.

Introdujimos el concepto de API (Interfaz de Programación de Aplicaciones), que nos permite gestionar y regular la comunicación entre ambos extremos de mi aplicación full stack.

Exploramos el estilo de arquitectura **RESTful**, un enfoque que organiza las interacciones entre sistemas de manera clara y eficiente mejorando la escalabilidad y capacidad de interpolación de mi aplicación.

Dimos una explicación del protocolo **HTTP**, el lenguaje fundamental de comunicación en internet que se encarga de regular y definir las solicitudes y respuestas de información entre cliente y servidor mediante el empleo de métodos HTTP que representan los cuatro principales tipos de interacciones correspondientes al sistema **CRUD**.

En resumen, hoy hemos desglosado la complejidad de las aplicaciones web, desde la interfaz del usuario hasta el corazón del servidor, explorando conceptos cruciales como APIs RESTful y el protocolo HTTP. Este conocimiento sienta las bases para comprender cómo interactúan los diferentes componentes de un proyecto full stack y cómo construir aplicaciones web robustas y eficientes.

## HomeWork

<details>
 <summary>Actividades</summary>

**ACTIVIDAD 01**

Clonar el repositorio del proyecto y explorar su estructura. Identificar los dos archivos package.json de ambas partes del proyecto.

**ACTIVIDAD 02**

Instalar las dependencias de la aplicación de Front-End y probar el funcionamiento con el comando “**npm start**”. Esto debería “levantar” nuestra aplicación de front en el navegador.

**ACTIVIDAD 03**

Diseñar la página web con la que estaremos trabajando. Se trata de una página de películas, por lo que el diseño debe ser acorde a la temática. Esto implicará:

1. Generar los archivos css necesarios y vincularlos al documento index.html.
2. Generar la plantilla HTML con sus elementos y asignar las clases y ids correspondientes para seleccionarlos y darles estilos.

**ACTIVDAD 04**

Mapear los objetos incluídos en el array tempData para construir con sus datos las tarjetas correspondientes a cada película. Incluir estas tarjetas en el contenedor que hayas creado.

**ACTIVIDAD 05**

Incluir en la página web enlaces a páginas estáticas. Estas páginas estáticas (mínimo 2) tendrán una temática a tu elección. Sugerencias: “Sobre mi proyecto”, “Historia del cine”, “Webs recomendadas”.

**ACTIVIDAD 06**

Configurar correctamente los enlaces desde index.html para poder navegar hacia estas páginas, y luego desde las mismas poder regresar al index.

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
