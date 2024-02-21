---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 11. Mongoose
date: 13-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase11.jpg',
    alt: 'Mongoose',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-logo.png',
    alt: 'Mongoose logo',
  }
description: Conectando nuestra la base de datos
draft: false
category: Mongo - Mongoose - Base de datos
---

## Mongoose

**Mongoose** -> Librería que nos permite hacer la comunicación entre nuestra App y la base de datos. Mongoose es el intermediario

Cuando vimos Mongo observamos que los documentos pueden no ser coherentes, puedn tener una estructura diferente. Mongoose nos va a ayudar para que nuestros datos sean coherentes y cumplan con una estructura acorde a la entidad.

**ODM** -> es un tipo de librería especial que nos permite mapear y establecer modelos de documentos

## ODM

Demos un poco de contexto. Pensemos en los 2 extremos que estaremos trabajando. Por un lado tenemos un servidor, cuya funcionalidad está desarrollada con JavaScript. Por otro lado tenemos una base de datos estructurada en MongoDB que utiliza el formato BSON y funciona mediante querys.

A pesar de que ambos estarán enfocados a trabajar con la misma información, tienen una gran limitante. ¡No hablan el mismo idioma!

Los **ODM (Object Data Modeling)** son librerías que permiten manipular y convertir datos que son incompatibles naturalmente entre dos sistemas. De esta manera, un programador trabajando dentro del código del servidor puede crear elementos en la base de datos de sin necesidad de cambiar el lenguaje.

Es importante tener en cuenta que existen muchos ODMs. Unos para algunas bases de datos, y otros para otras bases de datos. Utilizamos mongoose ya que es el que mejor se adapta a MongoBD, pero si investigas podrías encontrar otras.

**Mongoose**

Hasta el momento entendimos que existen librerías llamadas ODM que tienen una funcionalidad similar entre todas: permitirnos interactuar con nuestra base de datos desde el código. Como la base de datos que estaremos utilizando es en MongoDB, vamos a utilizar un ODM específico para ella llamada Mongoose.

**Esta biblioteca fue creada específicamente para el modelado de objetos de MongoDB con node**, lo que quiere decir que está desarrollada para ser utilizada con JavaScript o TypeScript.

Para utilizar esta herramienta tenemos que seguir algunos pasos y tener en claro las reglas y los patrones de código generales. Pero no te preocupes, iremos avanzando sobre estos puntos a lo largo de la clase. 😉

### Instalación

```bash
npm i mongoose
```

Para establecer la conexión a la base de datos creamos una carpeta dentro de src llamada config y adentro un archivo llamado dbCon.js

A diferencia de otros ODMs Mongoose genera solo una instancia.

```javascript
// dbCon.js

const mongoose = require('mongoose');

const dbCon = async () => {
  // Realizar la conexión con la Base de datos
  await mongoose.connect(
    'mongodb+srv://jourdanmauricio:<password>@prueba.yymc8ps.mongodb.net/movies'
  );
};

module.exports = dbCon;
```

Ya tenemos la conexión establecida pero debemos requerirla desde nuestro index antes de comenzar a esuchar solicitudes. Creamos a la función de conexión como asíncrona para que el servidor espere que la conxexión se encuentre lista.

```javascript
// index.js
const app = require('./src/server');
const dbCon = require('./src/config/dbCon')

dbCon().then({
  res => {
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    })
  }
});

```

## Schemas & Models

### ¿Qué es un Schema?

En mongoose, un schema es un objeto que podemos crear en nuestro código, el cuál llevará la configuración de una colección. Por ejemplo, si quisiéramos crear una colección en MongoDB para guardar información de distintos perros, primero vamos a tener que crear un schema sobre perros.

### Configuraciones de un schema

Pensemos primero en qué información sobre nuestros perros quisiéramos guardar. Por ejemplo: su nombre, la raza, su color y la edad. Todos estos datos deberán ir guardados dentro del schema. De esta forma, este objeto le dirá a la colección qué tipo de documentos podremos guardar dentro de él.

> Dato: Cuando definimos cuáles serán los datos que queremos guardar en la colección, tendremos que tipar estos datos. Es decir, definir qué tipo de dato vamos a guardar en cada propiedad de un documento.

Por ejemplo, sabemos que la propiedad nombre será de tipo string. La edad será de tipo number. Incluso podríamos crear una propiedad llamada isActive para saber si el usuario está o no bloqueado. Esta dato será un booleano.

```javascript
const mongoose = require('mongoose');
const schema = mongoose.schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    unique: true,
  },
  isActive: {
    type: Boolean,
  },
});
```

**Schema types** -> En la documentación oficial podrás encontrar cuáles son los tipos de datos que se pueden guardar en una colección. https://mongoosejs.com/docs/schematypes.html

## Modelos

Un modelo es un objeto basado en un schema que nos permite interactuar con una colección específica en MongoDB. Es una palabra clave que nos ayudará a realizar operaciones CRUD (Create, Read, Update, Delete) en la base de datos.

En otras palabras, el modelo sería un objeto que utilizará la planilla creada por el Schema con el que podremos modificar la base de datos. ¿Creemos un modelo?

### Definición de modelos

Sigamos con el ejemplo de schema de un usuario que vimos anteriormente. Como ya dijimos, el schema es un objeto que simplemente definirá qué propiedades tendrá una colección. Ahora bien, ¿Cómo podemos declarar un modelo a partir de ese schema?

Sencillo. Crearemos una variable llamada "User". A partir del método model del objeto mongoose (el cual hay que importar), tomará dos argumentos. Primero, un string, que debe ser el nombre del modelo con el que queremos trabajar. El segundo argumetno será el schema que hayamos creado anteriormente.

```javascript
const User = mongoose.model('User', userSchema);
```

Como se puede ver, ambas estructuras son diferentes pero complementarias entre sí. Podríamos decir que tienen una relación simbiótica (una depende de la otra).

El **schema** define la estructura de los documentos.

El **modelo** utiliza el schema para proporcionar un objeto con el que podremos interactuar con la base de datos.

## Primeros documentos

Luego de haber entendido estos dos conceptos, crearemos nuestros primeros modelos para ya poder trabajar con nuestra base de datos. Hasta el momento hemos trabajando con mongoose directamente sobre node. Pero tenemos que tener en cuenta que las opciones de modificar la base de datos deben estar integradas a nuestro servidor (express).

Crearemos un carpeta **src/models** para guardar los modelos. <mark>Por convención llamamos a nuestros modelos en singular y con la primer letra mayúscula.</mark>

Para crear un modelo primero debemos crear un esquema que es una descripción de los datos. Es decir, que estructura van a tener los documentos que vamos a almacenar.

```javascript
// User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

Ahora podemos requerir el modelo donde lo necesitemos. Por ejemplo, dentro de los servicios.

```javascript
// userService.js

const User = require('./../models/User');

module.exports = {
  getUsers: async () => {
    const users = await User.find();
    return users;
  },
  ...
};
```

## Cierre

En esta clase aprendimos qué es un ODM y cómo estas herramientas pueden ayudarnos a realizar la gestión de información con una base de datos desde nuestro servidor. En este caso hemos revisado y puesto en práctica el ODM mongoose.

Ya sabemos inicializar su configuración dentro de node así como también definir los elementos que requerimos para realizar la transferencia de información (schemas y modelos). Estos nos ayudan a construir las estructuras de datos dentro de las cuales se almacenará la información.

Por último, realizamos la integración de mongoose con express para poder gestionar la información de la base de datos en nuestro servidor por medio de solicitudes de HTTP.

![Mapa de conceptos mongoose.](/astro-doc-full-stack/images/m2/mapa-conceptos/clase11.png)

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

- Instalar mongoose en nuestro proyecto de backend.

- Realizar en el módulo correspondiente la conexión a la base de datos de nuestro cluster en MongoDB Atlas. Utilizare para esto la URI de conexión que nos provee la plataforma.

**ACTIVIDAD 02**

- Implementar el **Schema de movie**. Utilizar los tipos de datos adecuados para cada propiedad del schema.

- Utilizando el Schema creado anteriormente, definir el **modelo Movie** y exportarlo.

- Requerir en el módulo de servicio de movies al modelo Movie y utilizar el **método find** para obtener las películas en el lugar adecuado, de manera tal que ahora la respuesta al controlador vaya con los datos “reales de la base de datos”.

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
