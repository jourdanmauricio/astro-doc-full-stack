---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 1. Backend Architecture
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'javascript-avanzado',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/icon-general.png',
    alt: 'Logo Typescript',
  }
description: Backend Architecture
draft: false
category: Backend Js Nest
---

## Cliente - servidor

Cuando trabajamos en un proyecto es importante definir su estructura con antelación. Así, como cuando se construye un edificio, una vez se crean los cimientos es difícil y costoso realizar cambios en la estructura.

Para esto es importante tener en cuenta el concepto de **arquitectura de software**.

<mark>La arquitectura de software es la descripción de la estructura y organización de un sistema, sus componentes y cómo estos se comunican entre sí para asegurar la eficiencia, escalabilidad y mantenibilidad.</mark>

Imagina que estás construyendo tu propia casa. Lo mejor que puedes hacer es asegurarte de que se adapte a tus necesidades y sea fácil de mantener.

**La arquitectura de software sería similar al diseño de la casa**. Esta determinará la disposición de las habitaciones, la conectividad entre ellas y cómo integrar los distintos componentes (por ejemplo, eléctricos, acueductos, etc.) para crear una estructura coherente y eficiente.

> A largo plazo este impacto se verá reflejado en el costo económico a lo largo del ciclo de vida del software.

### La arquitectura de software

- Se define como la descripción de la estructura y organización de un sistema, sus componentes y cómo estos se comunican entre sí.

- Aseguran la eficiencia, escalabilidad y mantenibilidad del sistema.

### Niveles de abstracción

Para planificar la arquitectura de un sistema existen diferentes niveles de abstracción. Estos permiten determinar qué tan detallada es la definición de la estructura de una aplicación. Existen tres niveles.

- **Clases**: Definen cada una de las estructuras que serán utilizadas dentro del proyecto
- **Módulos**: Determinan cada módulo y su interacción con los demás, para desarrollar la funcionalidad del sistema.
- **Servicios**: Cada componente del proyecto es agrupado en servicios individuales dando un nivel más alto de abstración. Ideal para proyectos de gran escala.

Cada uno de estos niveles de abstracción desempeña un papel crucial en la creación de software escalable y mantenible. Las clases permiten la definición de tipos y comportamientos, los módulos organizan el código en unidades lógicas, y los servicios permiten la construcción de sistemas complejos a través de la interacción de componentes independientes.

En nuestro caso, nos enfocaremos en el diseño de una arquitectura de software enfocada a servicios para dar una visión más global de la estructura de nuestra aplicación.

<mark>Recordemos que un **servicio**, en términos generales, **es una unidad lógica, independiente y reutilizable que desempeña una tarea específica**. Además, pueden constar de múltiples clases y módulos según las necesidades.</mark>

![Arquitectura](/astro-doc-full-stack/images/henry/m4/clase1/architecture.webp)

> Los módulo consumen clases, pero las clases no pueden consumir módulos.

Podemos catalogar a las **clases** con un nivel de abstracción bajo. Se utlizan para definir la estructura y los comportamientos asociados.

Los **módulos** poseen un nivel de abstracción medio, interactúan con otros módulos para desarrollar la funcionalidad del sistema. Suelen ser una colección de clases, variables, y funciones agrupadas de manera de formar una unidad lógica, modularizando el código.

Los módulos pueden importarse desde otras partes del código a través de la inyección de dependencias y así retulizarlo. Los módulos consumen clases.

Los **servicios** agrupan componentes en servicios generando un nivel más alto de abstracción, es ideal para productos de gran escala.

Un servicio es un componete que resliza un conjunto específico de tareas, y se comunica con otros componentes a través de interfaces bien definidas. Es decir, pueden comunicarse con otros servicios.

Para poder definir la arquitectura de nuestro proyecto, lo primero que debemos considerar es su naturaleza y los requerimientos funcionales de este. Repasemos entonces un poco los conceptos básicos de la **arquitectura cliente-servidor** para entender mejor la naturaleza del proyecto a llevar a cabo.

## Arquitectura cliente-servidor - Principios

La **arquitectura cliente-servidor**, como vimos anteriormente, es un modelo de diseño de software que **organiza** una aplicación en dos entidades principales comunicadas..

- <mark>Cliente</mark> -> Corresponde a la entidad que solicita servicios e interactúa directamente con el usuario final. Este podría ser un frontend, como también otro servidor. Si un servidor le solicita información a otro, está actuando como un cliente.

- <mark>Servidor</mark> -> Proporciona los servicios y gestiona los recursos compartidos y la lógica de negocios de la aplicación.

Tomemos por ejemplo un e-commerce. La página web, el frontend, donde agregamos productos al carrito, realizar la compra, se comporta como nuestro cliente.

El servidor, es la infraestructura de verificar cuál es el stock cargado en la base de datos, procesar las transacciones, confirmación de la compra, etc.

En el modelo cliente servidor podemos establecer la comunición de dos maneras:

- **Stateful** -> el servidor guarda un registro de las solicitudes previas del cliente, con sus preferencias, y actividad en la página web a través de una sesión.

- **Stateless** -> sin estado. Cada solicitud que le llega al servidor es independiente de las solicitudes previas que se hayan realizado.

En el caso de un e-commerce el servidor debería llevar un registro del carrito de compra, sobre qué productos se agregaron, cuales se quitaron, el precio total de todos los productos en el carrito, para cada uno de los clientes. Este ejemplo, podríamos ppensarlo como un modelo con estado.

En cambio, un modelo sin estado podría ser un cuadro de búsqueda (search). Cada búsqueda es independiente de las búsquedas anteriores.

Esto se resume en que cada servicio se encargará de recibir una solicitud y resolverla de manera inmediata devolviendo una respuesta al cliente.

Esta interacción mediante solicitudes y respuestas entre ambos extremos se rige por **protocolos** estandarizados de comunicación que definen la estructura y el proceso de dichas solicitudes y respuestas.

### Protocolos comunes

Como hemos visto anteriormente,<mark> los **protocolos de comunicación** son conjuntos de reglas y convenciones que limitan las interacciones entre dispositivos conectados a una red</mark>. Dentro de estos protocolos, los más frecuentemente empleados son...

- TCP/IP -> (Transmision Control Protocol / Internet Protocol). Se utiliza para la comunicación de datos en redes de computadoras. Es el protocolo fundamental de internet.

- Websocket -> Protocolo de **comunicación bidireccional** que permite la comunicación en **tiempo real** entre clientes y servidores a través de una conexión persistente.

- FTP -> (File Transfer Protocol). Utililizado para la **transferencia de archivos** entre un cliente y un servidor en una red TCP/IP.

- HTTP (Hypertext Transfer Protocol). Para la comunicación en la Web. Define cómo se envían y reciben mensajes entre clientes y servidores web, lo que incluye solicitudes como **GET, POST, PUT y DELETE**, y respuestas como códigos de estado y contenido.

**Repaso HTTP**

Hypertext Transfer Protocol -> es la base de la mayoría de intercambio de información que se utiliza hoy en día.

- Un cliente realiza un petición de un recurso al servidor.
- La petición indicará una ruta (endpoint) y un verbo HTTP que puede ser GET, POST, PUT, DELETE, ect.
- El servidor procesa la solicitud y retorna el recurso informando el resultado de la operación, el tipo de dato (text, json, etc), el tamaño del dato y el dato.
- Cada petición sobre el protocolo HTTP es independiente del resto, es un protocolo sin estado.
- Para conseguir un estado se utilizan distintas técnicas. Una de ellas es el manejo de cookies.

## Microservicios y monolitos

Entendemos como **patrón de arquitectura** a una forma de diseño de la estructura de un proyecto siguiendo ciertas reglas. Son **abstracciones** de las mejores prácticas de diseño de software, que permiten a los desarrolladores trabajar de forma más **ordenada**.

Existen diferentes patrones de arquitectura de software...

### Monolitos

- Patrón de arquitectura que se desarrolla de forma integral como una única unidad de software.
- Se compone de un código base que se ejecuta en un solo proceso del servidor.
- Todas las funcionalidades de la aplicación (cliente y servidor) se encuentran integradas en una solo aplicación.
- Suelen ser dificiles de mantener y más aún de escalar.

<mark>**Arquitectura de monolitos**. En este patrón la aplicación se desarrolla de forma integral como una única unidad de software, que se compone de un código base que se ejecuta en un solo proceso del servidor.</mark>

Esto quiere decir, que todas las funcionalidades de la aplicación (cliente y servidor) se encuentran integradas en una sola aplicación.

Si bien este patrón nos da una forma práctica de trabajar y desplegar, suelen ser difíciles de mantener y más aún de escalar.

### Microservicios

- Divide la aplicación en varios servicios independientes autocontenidos, cada uno con su propia lógica y base de código.
- Promueve la modularidad y reutilización del código lo que puede permitir una mayor agilidad y flexibilidad.
- Permite que la base de código se más pequeña lo que conlleva a que el proceso de desarrollo sea más rápido y simple.
- Permite que múltiples desarrolladores trabajen al mismo tiempo en un proyecto.

<mark>Por otro lado tenemos el **patrón de microservicios** que divide la aplicación en varios servicios independientes autocontenidos, cada uno con su propia lógica y base de código.</mark>

Este tipo de arquitectura promueve la **modularidad y reutilización del código**. Este patrón permite que la base de código sea más pequeña, lo que conlleva a que el proceso de desarrollo sea más rápido y simple.

En cuanto al manejo de errores, el patrón de microservicios posee una ventaja. Dado que cada servicio puede ser aislado, es más fácil resolver comportamientos inesperados.

Entonces, podemos pensar el desarrollo como un único servicio que se encarga de resolver todos los requerimientos de nuestro negocio. O podemos separar cada componente clave en unidades independientes, cada uno como un servicio propio y que entre ellos se comuniquen a través de algún protocolo web.

**Ventajas Monolito**:

- Es mas sencillo desarrollar nuevos cambios.
- Es maś simple levantar el servicio.
- Escribir pruebas unitarias y end to end es mas sencillo porque dependen únicamente de un solo código.

**Desventajas Monolito**:

- Cuando la aplicación comienza a crecer porque al agregar nuevas features tenemos que tener cuidado de no romper lo que ya se encuentra implementado.
- Suele ser más cosotoso en terminos computacionales levantar un proyecto muy grande.
- Escalabilidad: si alguna parte del sistema requiere más recursos, se debe escalar toda la aplicación.
- No podemos utilizar diferentes tecnologías.

**Ventajas Microservicios**:

- Al separar la funcionalidad en distintos servicios (incluso servidor, BD, etc) y una parte requiere escalar simplemente le damos recursos a ese servicio.
- Podemos tener varios equipos de desarrollo trabajando en paralelo porque cada uno desarrolla sobre su propia base de código y no se pisa con el resto de los equipos.
- Los equipos pueden trabajar con distintas tecnologías. Siempre que utilicen el mismo protocolo para comunicarse, no importa en qué tecnología se derralle cada servicio.
- Si debemos actualizar una funcionalidad, solo modificamos ese servicio.

**Desventajas Microservicios**:

- La depuración y el testing son más complicados, porque dependemos de otros servicios.
- Utilizar diferentes tecnologías genera una falta de estandarización. Necesitamos desarrolladores para cada una de esas tecnologías.
- Complejidad cuando un cambio requiere la modificación de varios servicios.
- Requiere mayor planificación.

<mark>Por estos motivos para pequeños proyectos es conveniente comenzar como monolito bien modularizado y cuando llegue el momento separarlo en microservciios.</mark>

Cuando diseñamos una API que sigue una arquitectura de microservicios, cada servicio representa una parte específica de la funcionalidad de la aplicación y procesa la información de manera independiente.

Nos enfocaremos en el patrón de diseño mediante microservicios para asegurar la escalabilidad y rendimiento de nuestras aplicaciones.

![Microservicios](/astro-doc-full-stack/images/henry/m4/clase1/microservicios.webp)

## Escalabilidad & rendimiento

<mark>Escalabilidad: Capacidad de crecer y manejar de manera efectiva un aumento en la demanda, sin comprometer su rendimiento, confiabilidad o mantenibilidad.</mark>

### Consideraciones de escalabilidad

**Distribución de tareas**

- Es importante definir en componentes independientes cada funcionalidad de la aplicación.
- Cada uno de esos componentes debe poder trabajar de manera aislada, lo que le permitirá escalar de forma independiente en el futuro.

**Gestión de recursos**

- Es una buena práctica usar herramientas de gestión de recursos como Dockers y Kubernetes.
- Nos permiten optimizar y automatizar el despliegue de la aplicación.

**Base de datos**

- Es importante seleccionar de forma adecuada la base de datos que nos permita escalar el proyecto.

### Conceptos

Cuando hablamos de **escalabilidad** de un proyecto, hacemos alusión a su capacidad de **crecer** y **manejar** de manera efectiva un aumento en la demanda, sin comprometer su rendimiento o confiabilidad.

<mark>Ejemplo: Esto ocurre en los Black Fridays. En estos eventos las tiendas virtuales deben adaptarse a un tráfico de usuarios mucho mayor del usual. Los sitios web deben de responder sin poner en riesgo sus servidores o bases de datos.</mark>

**Escalamiento horizontal y vertical**

Vertical -> aumentamos los recursos, instalando más RAM o procesadores, pero tiene un límite.

Horizontal -> asociado a microservicios. Para el cliente es transparente. Podemos crear nuevos servidores replincado nuestra App y utilizar un proxy o balanceador de carga entre los distintos servidores. El mayor cuello de botella suele darse en el acceso a la BD. Por eso, es conveniente que los microservicios manejen su propia BD independiente.

### Estrategias de rendimiento

<mark>Aumentar el rendimiento del sistema es fundamental para asegurar el rápido procesamiento de solicitudes y la disminución de errores.</mark>

**Optimización de consultas**:

- Al realizar consultas a la base de datos, el manejo de índices o primary keys aumentan considerablemente la eficiencia de la consulta.
- Por esto es importante planificar servicios que ocupen lo más posible estos valores.

**Compresión de datos**:

- Cuando trabajamos con archivos de gran tamaño, una buena manera de mejorar el rendimiento de una aplicación es por medio de la compresión del formato para que la transferencia sea mucho más rápida.

## Cierre

En esta clase hablamos sobre arquitectura de software. Desde el modelo cliente-servidor hasta otros enfoques basados en microservicios para mejorar la escalabilidad y rendimiento.

Hemos visto que una arquitectura bien diseñada no solo optimiza el rendimiento inicial del proyecto, sino que también facilita futuras modificaciones y expansiones. También revisamos el protocolo de comunicación cliente-servidor.

A su vez, vimos una comparativa entre los patrones de arquitectura monolítica y de microservicios.

## Homework

### ACTIVIDAD 01

Crear y planificar el DER del proyecto a implementar tomando en cuenta la siguientes consideraciones. La aplicación consistirá en un e-commerce en el cual...

- Un Usuario podrá registrarse e ingresar a la aplicación mediante usuario y contraseña.

- El Usuario registrado puede realizar compras de productos mediante un carrito de compras (solo una unidad de cada producto) emitiendo una Orden de compra que registra la información en un Detalle de Compras.

- Las Órdenes de compras son asociadas al Usuario y estas a su vez tienen asociado un Detalle de Compra con la información de los productos adquiridos.

- Un Usuario Administrador, tendrá la posibilidad de actualizar la información de los productos cargados en la base de datos así como actualizar stock o agregar imágenes mediante un servicio de nube.

**[REQUISITOS]**:

Al finalizar este hito deberás tener la estructura básica del proyecto individual de e-commerce y una idea teórica de las entidades de la base de datos así como sus relaciones.

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
