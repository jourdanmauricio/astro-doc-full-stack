---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 9. Database Fundamentals
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase9.webp',
    alt: 'Bases de datos',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-database.jpg',
    alt: 'Logo Base de datos',
  }
description: Fundamentos de Base de Datos
draft: false
category: Databases
---

## Introducción a bases de datos

Las bases de datos desempeñan un papel fundamental en el mundo de la tecnología de la información al proporcionar un medio estructurado y eficiente para almacenar, gestionar y recuperar datos de manera organizada. Son la columna vertebral de numerosas aplicaciones y sistemas, abarcando desde aplicaciones empresariales hasta plataformas web y servicios en la nube.

La importancia de las bases de datos radica en su capacidad para ofrecer acceso rápido y fiable a grandes volúmenes de información, facilitando la toma de decisiones informadas, mejorando la eficiencia operativa y permitiendo el desarrollo de aplicaciones escalables.

Antes de comenzar a diseñar una base de datos, es importante comprender algunos conceptos claves:

Nuestro objetivo es almacenar datos de manera estructurada para que, cuando sea necesario, podamos procesarlos y obtener información significativa.

Imagina una base de datos de una tienda en línea. Los datos podrían ser las órdenes de compra, los productos y la información detallada del cliente. Mediante un procesamiento adecuado, podríamos obtener información valiosa como los productos más vendidos, el promedio de órdenes por semana o el perfil de los compradores de la tienda.

<mark>Entidades y atributos</mark>

Otro concepto clave es la entidad. Una entidad representa un objeto o concepto del mundo real que puede ser identificado, almacenado y gestionado en una base de datos.

Estas **entidades** pueden ser objetos físicos como una persona, un producto o un lugar, o conceptos abstractos como un pedido o una transacción.

Pensemos en el ejemplo anterior sobre la tienda en línea. En este contexto, cliente, orden y producto serían entidades, dado que representan un ente sobre el cual se recopila y almacena información. Ahora, ¿Qué características tendrían estas entidades?

Las características o propiedades de una entidad, las cuales denominaremos atributos, describen a la entidad y la información específica que ésta representa.

Ejemplo: "Cliente" es una entidad y cada cliente individual que registramos en la base de datos representa una instancia o registro único de esa entidad. Los atributos (ID del Cliente, Nombre, Correo Electrónico, Dirección) describen las características específicas de cada cliente.

Otra entidad común podría ser un "Producto"

Aquí, "Producto" es otra entidad, y cada producto específico que se ofrece en la tienda representa una instancia única de esta entidad. Los atributos proporcionan información detallada sobre cada producto.

En resumen, una entidad es una representación organizada y estructurada de un objeto o concepto del mundo real y se utiliza para almacenar información relevante sobre ese objeto o concepto en particular, con sus respectivos atributos que lo definen.

Ahora bien, la definición de estos modelos de entidad nos ayuda a planificar la estructura de cada tabla que se genera dentro de la base de datos. Diseñar y construir las tablas de la base de datos para mejorar su eficiencia puede ser un proceso complejo al principio, pero gracias a la normalización de datos tenemos formas de simplificarlo

**Normalización de Datos: Concepto y Ejemplos**

La normalización es un proceso en el diseño de bases de datos que busca organizar la información de manera eficiente y reducir la redundancia, mejorando la integridad de los datos. Este proceso implica dividir las tablas de la base de datos para evitar la repetición innecesaria de información y garantizar que los datos se almacenen de manera coherente.

Existen reglas específicas para realizar este proceso de normalización de tablas definidas por formas normales, Estas formas normales son niveles de organización de una BDD con reglas específicas a cumplir Pero implementarlas de forma puntual requiere un conocimiento más profundo del manejo de base de datos. Por eso vamos a trabajar de una forma más básica por ahora creando un ejemplo sencillo.

Vamos a suponer que tenemos una librería y almacenamos la información de los libros que manejamos en una tabla única donde algunos datos tienden a repetirse, por ejemplo el autor o el género, a esto le llamamos una tabla No normalizada ya que la repetición de datos reduce la eficiencia y genera redundancia al momento de trabajar con una base de datos.

## Introducción a persistencia de datos

La **persistencia de datos** es fundamental en el desarrollo de software pues nos permite almacenar y recuperar información a través del tiempo incluso cuando un programa o aplicación haya terminado su ejecución por cierre o actualización. Esto nos permitirá tener los datos disponibles más allá de la ejecución temporal de un programa.

Existen diversas formas de lograr la persistencia de datos, obviamente dentro de ellas encontramos a las bases de datos que nos permiten almacenar y gestionar la información de una aplicación ya sea de forma relacional(SQL) o no relacional(NoSQL), pero ahora que sabemos cómo funcionan vamos a ver algunas alternativas.

### Sistemas de archivos y almacenamiento Local

🎮 Imagina que tienes un juego en tu computadora y deseas guardar tu partida luego de haber derrotado al villano principal. Deseas continuar al día siguiente con las misiones extras que debes completar, sin que se pierda tu información (no fue fácil ganarle al jefe final así que no quisieras repetir la batalla). Aquí es donde nos encontramos con la importancia de la persistencia de datos.

La persistencia de datos se refiere a la capacidad de almacenar información de manera duradera, incluso cuando apagamos nuestros dispositivos, para acceder a esta en cualquier momento a futuro. Hay dos maneras principales de lograr esto: mediante sistemas de archivos y almacenamiento local. Echemos un vistazo a cada uno de ellos:

1. **Sistemas de archivos**:

Un sistema de archivos es una estructura utilizada por un sistema operativo para organizar y guardar datos en un dispositivo como un disco duro o memoria USB, a través de carpetas y archivos. Cada carpeta puede contener muchos archivos y estos archivos pueden almacenar datos.

Volvamos al ejemplo anterior. Al guardar la partida de tu juego, este se almacena en un archivo específico en tu computadora o en tu unidad de disco, dentro de una carpeta llamada "Juegos" y dentro de ella, un archivo llamado "tupartida.txt" por ejemplo.

- Sistemas de archivos. Ventajas
  - Simple de entender y usar
  - Cada aplicación puede tener su propio archivo de datos
- Sistemas de archivos. Desventajas
  - Puede volverse desordenado si muchas aplicaciones usan muchos archivos.
  - No es tan eficiente para buscar y organizar grandes cantidades de datos.

2. **Almacenamiento Local (Local Storage)**:

Dentro de los navegadores disponemos de herramientas que nos permiten tener un almacenamiento local y de sesión mediante la API Web Storage nativa. Esto permite que las aplicaciones puedan almacenar datos del lado del cliente utilizando la persistencia de datos con Local Storage o la información de una sesión con Session Storage.

- LocalStorage. Ventajas
  - Facil de usar, requiere pocas líneas de código
  - Tiene más capacidad de almacenamiento que otras herramientas del navegador
  - Beneficios para la seguridad del usuario ya que no son enviados automáticamente al servidor
  - Están disponibles de forma rápida y son accesibles de manera síncrona
- LocalStorage. Desventajas
  - El almacenamiento puede ser limitado dependiendo de las políticas de seguridad del navegador
  - Capacidad de almacenamiento muy limitada, es más útil para pequeños fragmentos de información
  - Al ser síncrono, la carga de información puede llegar a bloquear otras áreas de la aplicación
  - Almacena datos como cadenas de texto. Datos más complejos pueden ser difíciles de manejar
  - No es seguro para datos sensibles como contraseñas porque no cuenta con expiración automática

Ahora que hemos explorado cómo persisten los datos mediante sistemas de archivos y almacenamiento local, es importante entender cómo estructuramos esos datos. Aquí es donde entra en juego el concepto de formatos de almacenamiento.

## Formatos de almacenamiento

- XML
- CSV
- YAML
- BSON
- Protobuf

Uno de los formatos más comunes es el formato JSON. Este proporciona una estructura clara y legible para organizar datos, lo que lo hace ideal para almacenar información en el contexto del desarrollo web. Es un formato ligero de intercambio de datos que utiliza una sintaxis legible por humanos. Está basado en pares clave-valor y es fácil de entender para tanto humanos como máquinas. Ampliamente utilizado en la comunicación entre clientes y servidores web, configuración de aplicaciones y almacenamiento de datos estructurados.

Ejemplo

```json
{
  "nombre": "Juan",
  "edad": 30,
  "ciudad": "Ciudad de Ejemplo",
  "contacto": {
    "email": "juan@example.com",
    "telefono": "+123456789"
  },
  "intereses": ["programación", "viajes", "lectura"]
}
```

**El uso de formatos de almacenamiento adecuados es esencial para garantizar que los datos se guarden y recuperen de manera eficiente. Al comprender los sistemas de archivos, el almacenamiento local y los formatos de almacenamiento, como desarrolladores podemos tomar decisiones informadas sobre cómo estructurar y gestionar datos en nuestras aplicaciones.**

## Cierre

En esta clase de fundamentos de bases de datos, hemos conocido diferentes conceptos muy importantes que son la base de cómo persistimos y gestionamos datos en entornos informáticos. Comenzamos entendiendo la importancia de la persistencia de datos, que nos permite almacenar información de manera duradera incluso cuando nuestros dispositivos se apagan.

Introducimos la idea de los sistemas de archivos, comparándolos con organizadores, donde guardamos carpetas y archivos. Aprendimos que, aunque son simples de entender y cada aplicación puede tener su propio archivo de datos, pueden volverse desordenados y menos eficientes para grandes cantidades de datos.

Abarcamos el concepto de almacenamiento local, utilizando un ejemplo de una caja de juguetes con compartimentos especiales. Vimos cómo, a diferencia de los sistemas de archivos, el almacenamiento local proporciona una forma más eficiente y organizada de persistir datos en el contexto de una aplicación.

Hemos conocido los formatos de almacenamiento, destacando el formato JSON como una opción común debido a su estructura clara y legible. Este formato nos permite representar datos de manera eficiente tanto para humanos como para máquinas.

A través de un ejemplo práctico en código, demostramos cómo guardar información en el almacenamiento local utilizando JSON.

Es fundamental comprender cómo podemos persistir datos. Los sistemas de archivos, el almacenamiento local y los formatos de almacenamiento como JSON son herramientas clave para los desarrolladores.

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

Esta es una actividad sencilla, pero al mismo tiempo es un paso fundamental al momento de encarar cualquier proceso de persistencia de datos en tus proyectos: el modelado de datos.

Aquí te hacemos una aclaración importante: en este proyecto trabajaremos con una única entidad Movie. En próximos proyectos ya utilizaremos varias entidades y las relacionaremos. Esto es así porque el sistema de Bases de Datos que utilizaremos este proyecto (MongoDB - NoSQL) trabaja las relaciones entre entidades de una forma muy particular.

¡No te preocupes! En próximos módulos las Bases de Datos SQL nos darán mas herramientas para esto.

**ACTIVIDAD 02**

Pero por el momento y para practicar, te invitamos a hacer lo siguiente:

- En alguna planilla de cálculo (Excel, Google Sheets, Open Office, etc), arma una tabla con las 3 películas que tenemos en nuestros arreglos.

- Agrega a la tabla las columnas para cada propiedad e inserta sus valores.

- Intenta separar dentro de esta planilla otra entidad. Sugerimos la entidad Director. Y crea una nueva tabla para esta nueva entidad.

- Piensa qué atributos podrías darle al director y agregalos a su tabla

- Coloca las claves correspondientes de manera tal que estas entidades queden relacionadas.

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
