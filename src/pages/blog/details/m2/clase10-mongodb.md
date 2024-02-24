---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 10. Mongodb
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase9.webp',
    alt: 'Mongodb',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-mongodb.png',
    alt: 'Logo Mongodb',
  }
description: Base de Datos Mongo
draft: false
category: Databases MongoDB
---

## MongoDB

Antes de comenzar a describir las bases de datos NoSQL vamos a aprovechar la oportunidad para entender qué significan sus siglas...

SQL (Structured Query Language) es el lenguaje que se utiliza para trabajar en bases de datos. Ahora, cuando nos referimos a que estamos trabajando con NoSQL, estamos hablando de bases de datos que no utilizan este lenguaje.

- SQL es el lenguaje que utilizan las bases de datos para comunicarse
- NoSQL no siguen todas las reglas del lenguaje SQL tradicional
- Les permite tener más libertad al no seguir un patrón estructurado

**¿Cuándo utilizar bases de datos NoSql?**

- Cuando tengas datos flexibles
- Cuando tus datos no siguen un formato estricto como una hoja de cálculo
- Escalabilidad sin límites
- Necesitas más espacio (o datos)
- Adaptación rápida
- Permite agregar má servidores (nodos) al sistema fácilmente
- Distribuye la carga de trabajo y el tráfico entre los nuevos servidores

**Ventajas**

- Flexibilidad de esquemas
- Escalabilidad horizontal
- Manejo de datos no estructurados o semi estructurados
- Alto rendimiento en operaciones específicas

**MongoDB**

- es un sistema de bases de datos NoSQL
- orientado al almacenamiento de datos en forma de documentos
- almacena los datos en formato BSON (Binary JSON)
- simplifica el proceso de creación de bases de datos
- cuenta con diferentes interfaces de usuario y aplicaciones
- permite ver la información dentro de la base de datos de forma sencilla

**Características principales**

- Utiliza un esquema dinámico
- No requiere un esquema definido de tablas con relaciones predefinidas
- Trabaja con documentos y colecciones
- Pueden ser modificadas según las necesidades de la información
- Utiliza un formato BSON (creado por MongoDB)
- Mejora la eficiencia en la transferencia de datos
- Serialización binaria de los documentos en formato JSON
- Indexación para mejorar la velocidad de consulta y búsqueda de datos

**Entonces... ¿Cómo nos comunicamos en una base de datos No SQL?**

Imaginemos que tienes una base de datos de libros y quieres encontrar información específica sobre 'El Principito'. En una base de datos SQL deberías realizar una consulta estructurada con ese lenguaje donde hagas referencia a las columnas correspondientes para solicitar información. En cambio, al trabajar con una base de datos NoSQL, podrías utilizar una consulta simple y entenderla incluso si no eres programador.

Por ejemplo, digamos que la base de datos tiene una colección llamada 'libros'. La consulta sería algo como esto...

```javascript
database.libros.findOne({ título: 'El Principito' });
```

## Estructura de datos

MongoDB es un sistema de bases de datos NoSQL. Almacena datos en forma de documentos. Esto quiere decir que, en lugar de almacenar los datos en tablas, utiliza un formato llamado BSON (Binary JSON) el cual a grandes rasgos es una representación binaria de <mark>objetos en formato JSON</mark> y mapas (descuida, esto no es importante).

Cuenta con diferentes interfaces de usuario y aplicaciones que permiten ver la información dentro de la base de datos de forma sencilla.

A pesar de ser una herramienta con costo, tiene opciones para trabajar sin necesidad de realizar ningún pago. Es excelente para aplicaciones con bases de datos pequeñas (lo que haremos nosotros😙).

## Características principales

1. Utiliza un esquema dinámico. Trabaja con estructuras (documentos y colecciones) que pueden ser modificadas de forma dinámica.

2. BSON es un formato creado por MongoDB específicamente para mejorar la eficiencia en la transferencia de datos. Este es una serialización binaria (no legible por humanos). Veamos un ejemplo visual que nos ayude a ver la diferencia.

> Ten en cuenta que la serialización no se ve así realmente. Es solo par hacernos una idea de la diferencia entre BSON y JSON.

![Diferecia entre Bson y Json.](/astro-doc-full-stack/images/m2/bson.jpg)

### Elementos principales

**Conceptos clave**

**<mark>Documentos</mark>**

<mark>Un documento es la unidad básica de almacenamiento</mark>. Por ejemplo, si guardamos la información específica de un sólo usuario o un producto, ese conjunto de datos sería considerado un documento. Está representado en formato BSON y contiene pares de campos (clave-valor) similares a los objetos JavaScript.

Los valores de las claves pueden ser cualquier tipo de dato como strings, arrays, objetos, números, etc. Un ejemplo de cómo luciría un documento de “usuario” sería...

```javascript
{
  //_id -> cada documento contiene un objeto denominado "_id" que actúa
  //      como un identificar único dentro de una colección. Este identificador
  //      facilita el acceso y búsqueda a los documentos.
  "_id": ObjectId("5f8f58d4f46c6e8b9b395c"),
  "nombre": "Juan Perez",
  "correo": "juan.perez@email.com",
  "direcciones": [
    {
      "tipo": "casa",
      "ciudad": "Ciudad de Mexico",
      "calle": "Calle Principal 123",
    },
    {
      "tipo": "trabajo",
      "ciudad": "Guadalajara",
      "calle": "Avenida Secundaria 456",
    },
  ]
}
```

**<mark>Colecciones</mark>**

Otro de los elementos principales de MongoDB son las colecciones. Una colección es un <mark>conjunto de documentos almacenados que se encuentran relacionados entre sí</mark>. Siguiendo el ejemplo anterior del usuario, una colección de usuarios se vería como un array de usuarios.

## Referencias

- Vinculan documentos de distintas colecciones
- Sin duplicar la información
- Maneja grandes cantidades de datos y evitar redundancias
- Si los datos cambian, la referencia realiza cambios en un solo lugar
- Permite acceder a la información completa del usuario si es necesario
- Evita duplicar toda la información del usuario si es necesario
- Facilita la organización y gestión eficiente de datos

En muchas situaciones vamos a querer crear algo llamado referencia entre documentos. Las referencias son una "conexión" que hay entre dos documentos que dice que uno de ellos puede abarcar la información del otro. Veamos esto en un ejemplo...

![Referencias.](/astro-doc-full-stack/images/m2/referencias.jpg)

## MongoDB Atlas

- Es un servicio de nube para el manejo de base de datos de MongoDB
- Despliega nuestra base de datos para elegir un proveedor de la nube y la región de implementación
- Ofrece la capacidad de escalamiento horizontal automáticamente
- Atlas incorpora características de seguridad avanzadas
- Realiza respaldos automáticos regulares
- Permite la recuperación de datos en caso de pérdida o errores

Hasta el momento, en la teoría, estuvimos aprendiendo MongoDB como si lo fuésemos a utilizar de forma local en nuestra computadora. Pero esto no será así en el futuro. Utilizaremos esta base de manera online, para que la gestión de información sea mucho más sencilla y accesible. Para esto traemos una nueva herramienta...

MongoDB Atlas es la plataforma de base de datos en la nube ofrecida por MongoDB. En otras palabras, es un servicio online para trabajar con MongoDB.

Una de sus características fundamentales es que permite deployar (veremos esto más adelante) de manera sencilla nuestra base de datos. Además, ofrece la capacidad de escalamiento horizontal de manera automática. También realiza respaldos automáticos regulares y permite la recuperación de datos en caso de pérdida o errores.

**MongoDB Atlas** -> Esta es la página oficial del Atlas. Te invitamos a que la abras en una nueva pestaña. https://www.mongodb.com/atlas/database

### Crear Cuenta

1. Haz clic en el botón "Try Free" para iniciar el proceso de registro. Deberías ver una página donde puedes registrarte o iniciar sesión si ya tienes una cuenta.

2. Completa el formulario con los datos solicitados, o bien ingresar con Google. Luego tendrás que aceptar los términos y condiciones.

## MongoDB Compass

- Es útil para quienes deseen trabajar con bases de datos MongoDB de manera visual en lugar de usar comandos
- Proporciona gráficas que facilitan la organización y edición de las bases de datos

Con las computadoras tenemos dos formas principales de comunicarnos. Interactuando mediante el mouse y haciendo clicks, o también mediante comandos por la terminal. Veremos que con las bases de datos sucede lo mismo. Podremos pedirle cosas con comandos, o tambipen utilizando una interfaz.

Por ahora lo haremos de la segunda forma. Ya sabemos que el Atlas nos permitirá administrar una base de datos en la nube. Ahora, conoceremos una nueva herramienta llamada MongoDB Compass que será la interfaz mediante la cuál podremos trabajar con la base de datos de la nube.

¿Por qué no trabajar directamente desde el Atlas? Porque veremos que Compass utiliza muchos menos recursos y no necesita que entremos en el navegador, ya que es una aplicación local. Para trabajar con ella primero deberemos instalarla.

**MongoDB Compass** Aquí puedes ingresar a la página oficial de esta herramienta. Ábrela en otra pestaña. https://www.mongodb.com/try/download/compass

Instalación de compas: Selecciona la versión de MongoDB Compass (GUI) y elige tu sistema operativo (Windows, macOS o Linux).

## Cierre

En esta clase, hemos conocido las bases de datos NoSQL, con enfoque especial en MongoDB. Comprendimos por qué elegimos bases de datos NoSQL, reconociendo su flexibilidad y adaptabilidad para gestionar grandes volúmenes de datos con estructuras dinámicas.

Conocimos los elementos principales de MongoDB: documentos, colecciones y referencias, y cómo estos se relacionan entre sí. Aprendimos a utilizar MongoDB Atlas, la plataforma en la nube de MongoDB, para gestionar y desplegar nuestras bases de datos en entornos en la nube. Además descargamos e instalamos MongoDB Compass, una interfaz gráfica que nos permite explorar y manipular datos de manera visual. Conectamos Compass a nuestro cluster en MongoDB Atlas.

![Mapa de conceptos mongodb.](/astro-doc-full-stack/images/m2/mapa-conceptos/clase10.png)

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

Crear una cuenta (si no la tienes) en el sitio web de MongoDB Atlas.

**ACTIVIDAD 02**

Siguiendo el paso a paso visto en la clase, crea tu propio cluster de base de datos dentro de la plataforma.

**ACTIVIDAD 03**

Crea manualmente (por el momento) una colección llamada “movies”.

**ACTIVIDAD 04**

Copiar las 3 películas que tenemos actualmente en nuestro set de datos e intentar cargarlas como documentos de la colecciones “movies” con todas sus propiedades.

**ACTIVIDAD 05**

Descargar e instalar MongoDB Compass. Luego conectar nuestro cluster de base de datos a la aplicación. Este punto de la actividad es opcional, ya que esta aplicación puede ser un poco demandante en cuanto a recursos dependiendo de las características de nuestro equipo.

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
