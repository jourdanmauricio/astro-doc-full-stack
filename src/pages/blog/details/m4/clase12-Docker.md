---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 12 - Docker
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: Docker
draft: false
category: Backend Js Nest
---

## Docker y su importancia en el desarrollo de aplicaciones

La primera pregunta que debemos hacernos es **¿Qué es Docker?** Y la respuesta más sencilla es que **Docker** es una tecnología para crear y gestionar **contenedores**. Pero para entender esta definición primero debemos comprender a qué nos referimos con un contenedor en el contexto del desarrollo de software.

Consideramos como contenedores a aquellas unidades de software que contienen un fragmento de código y las dependencias necesarias para ejecutarlo, asegurando que este se comporte siempre de la misma manera sin importar donde se implemente.

Así como un contenedor de carga, utilizado en la industria de transporte, asegura la mercancía eficientemente; un contenedor de software garantiza que una aplicación se ejecute de manera confiable, sin importar el entorno en que se despliegue.

La segunda pregunta importante es **¿Para qué necesitamos a Docker y los contenedores?**

Para responder esta pregunta pensemos en la siguiente situación: **Un desarrollador trabaja en una aplicación dentro del entorno de Node con la versión 18.0.0 instalada en su computadora**.

> Sin embargo, al desplegarla, lo hace en un servidor que trabaja con una versión anterior, por ejemplo, 14.0.0. Si recordamos el concepto de versionado, hablamos de cambios mayores que podría ocasionar que la aplicación tenga comportamientos inesperados o, incluso, deje de funcionar.

Es aquí donde trabajar con contenedores cobra importancia. Con estos encapsulamos no solo al código de la aplicación, sino que hace una copia estandarizada, exacta e independiente del entorno que puede ser ejecutada dentro del mismo contenedor.

De esta manera sabemos que el entorno de ejecución de la app será el mismo en desarrollo o producción o incluso en el entorno de trabajo de los miembros de un equipo de desarrollo.

![Docker](/astro-doc-full-stack/images/henry/m4/clase12/docker.webp)

Actualmente, todos los sistemas operativos están preparados para trabajar con contenedores de manera nativa así que el proceso de desarrollo e implementación es sencillo. Gracias a Docker, podemos ejecutar una versión emulada de una o más aplicaciones sin importar el sistema operativo mediante el uso de la imagen de Docker.

> **Las imágenes son paquetes estáticos que contienen no solo las dependencias de una aplicación, sino también la configuración necesaria para utilizarlas. Quizás esta definición te suene muy similar a la de contenedor.**

Para diferenciar estos conceptos, consideremos la siguiente analogía:

Piensa que una imagen de **Docker** es una receta de cocina que define todos los ingredientes y pasos necesarios para preparar un plato específico.

La imagen sería equivalente a la receta impresa en papel: es **estática** y describe los elementos requeridos, pero no puedes saborear el plato directamente desde ella.

Por otro lado, un contenedor de Docker sería el plato real que obtienes al seguir esa receta. Es la instancia en ejecución de la imagen, con el código de la aplicación, las bibliotecas y las configuraciones aplicadas.

En otras palabras, las imágenes de Docker podrían ser consideradas como plantillas que nos permiten crear contenedores.

Estas imágenes son construidas a partir de un archivo de texto llamado **Dockerfile**. En este se indica, además, cómo debe configurarse el entorno de ejecución y qué aplicaciones o servicios deben incluirse en cada imagen.

**Ahora que entendemos un poco mejor qué es Docker y para qué se utiliza, veamos como instalarlo para crear nuestras primeras imágenes y contenedores.**

## Contenerización de imágenes

## Cómo crear y gestionar imágenes y contenedores en Docker

El primer paso es instalar **Docker Desktop** en nuestro sistema operativo desde la página oficial de **Docker**(https://docs.docker.com/desktop/) según los requerimientos de nuestro sistema. Docker Desktop es una aplicación que contiene todo lo necesario para construir y gestionar aplicaciones contenerizadas, mediante una interfaz gráfica sencilla.

Una vez seleccionado el sistema operativo, seremos dirigidos a una página que nos explica paso a paso cómo instalar y configurar **Docker**, junto con las especificaciones mínimas del sistema necesarias para su uso.

Construiremos este ejemplo sobre el sistema operativo Windows. El primer paso es descargar el archivo de instalación e iniciar el archivo ejecutable.

Esto inicia el wizard de instalación de Docker y tendremos que esperar a que se instalen todos los archivos. Dependiendo de tu versión de Windows, es probable que el wizard te solicite seleccionar entre una tecnología: **WSL** y **Hyper V**, ambas relacionadas con la virtualización y la compatibilidad de sistemas operativos en entornos Windows.

Seguiremos la recomendación de la documentación que es optar por WSL (Windows Subsystem for Linux)

**¡Y listo!** Ahora solo debemos inicializar la aplicación. Ten presente que, según la versión instalada, la interfaz puede ser diferente, pero el contenido será el mismo.

Además de abrir la aplicación de escritorio, podemos comprobar que **Docker** ha sido instalado en mi sistema operativo si nos dirigimos a la terminal y al ejecutar el comando docker recibimos una lista de comandos disponibles.

Esto se debe a que la instalación de Docker Desktop incluye la instalación de **Docker CLI**, que al final será la herramienta que más utilizaremos para trabajar con imágenes y contenedores.

De forma totalmente opcional, puedes instalar la extensión Docker dentro de tu editor de código que nos dará una interfaz muy sencilla para la creación y gestión de aplicaciones contenerizadas.

¡Vamos a crear nuestro primer contenedor!

Para ello vamos a trabajar con una aplicación de **Node**, aunque recuerda que Docker trabaja con cualquier entorno y lenguaje de programación. Comenzaremos con una aplicación muy básica, la cual solo inicializa un servidor y define una única ruta para una solicitud de tipo **GET**.

Para crear una aplicación de docker utilizaremos express.

```bash
npm init -y
npm i express
```

```ts
// app.js
cont express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Demo de docker');
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})
```

```json
// package.json
// ...
"scripts": {
  "start": "node app.js",
},
// ...
```

```bash
npm start
```

http://localhost:3000

Para incorporar docker crearemos un archivo llamado Dokerfile

```yml
FROM node:18.12

WORKDIR /app

COPY . ./

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
```

Con este dockerfile crearemos una imagen que comienza a partir de la version 18.12 de node, copia el contenido de la carpeta /app, instala las dependecias, expone el puerto 3000 y finalmente ejecuta el comando <code>node app.js</code>.

```bash
docker build .

docker run -p 3001:3000 <id>
```

http://localhost:3001

**Buscar los comandos docker**

```bash
# Muestra los contenedores en ejecución
docker ps

docker stop <nombre del contenedor>
```

Es importante que consideres que las imágenes creadas son de solo lectura. Esto quiere decir, que para realizar cambios en el código y que estos sean reflejados al ejecutar el contenedor, es necesario detener el contenedor y volver a ejecutar el **build de la imagen**.

Este proceso es similar ya sea que trabajemos con una aplicación tan sencilla como la que vimos en el ejemplo o una aplicación más compleja. Tomemos por ejemplo la demo que hemos utilizado dentro de las clases de Node que hemos visto hasta el día de hoy.

Vamos a crear un Dockerfile dentro de la carpeta raíz de
nuestro proyecto, tal como lo hicimos en el ejemplo anterior

Dentro de este archivo definiremos una imagen de un proyecto de node (recuerda que Nest trabaja en este entorno) que será creada en un directorio app, en este caso se generará una copia del package.json dentro del directorio activo antes del comando de instalación para mejorar la eficiencia del proceso de creación de la imagen.

**Este proceso es opcional pero se considera dentro de las buenas prácticas de Docker. Realizaremos a continuación, una nueva copia de todos los archivos en el directorio activo.**

Hecho esto, expondremos el puerto de nuestro servidor y definiremos el comando
de inicialización:

```bash
npm run start
```

Construiremos un Dokerfile para la demo. Primero eliminamos las carpetas /dist y /node_module, porque no queremos que copien a la imagen. Luego las instalaremos dentro de la imagen.

```yml
# Dockerfile
FROM node:18.12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

Para compilar la imgen con un nombre legible podemos ejecutar

```bash
docker build . -t nest-demo-docker
docker run -0 3001:3000 nest-demo-docker
```

Estamos ejecutando la versión local de nuestra app dentro de un conteneder, y como vemos en nuestro proyecto no se encuentra la carpeta node_modules, pero si en el contenedor que estamos ejecutando.

La ejecución del contrato nos arroja un error indicando que no existe la base de datos dentro del contenedor. Dentro del contendor (localhost) no existe un servidor de postgres.

```bash
docker ps
docker stop <nombre-del-contenedor> // ?nest-demo-docker?
```

## Aplicaciones con múltiples contenedores

## Manejo de redes en Docker para la comunicación entre contenedores.

En **Docker**, la forma en que conseguimos que los contenedores se comuniquen con otros servicios o fuentes de información puede ser de tres tipos:.

<mark>Tipos de comunicación de los contenedores</mark>

- **Contenedor-WEB**: Hace referencia a la comunicación con páginas web mediante APIs o servicios. Este tipo de comunicación se encuentra habilitada por default. Como ejemplo, volvamos al archivo base que utilizamos para esta sesión. Dentro de este, instalaremos axios mediante el comando npm i axios y agregaremos una ruta para traer información desde una API al contenedor. No olvides volver a realizar el build antes de ejecutar el contenedor.

- **Contenedor-Localhost**: Esta comunicación se realiza cuando un contenedor interactúa con algún elemento del host en el cual se encuentra inicializado, para acceder a algún servicio, por ejemplo. una base de datos local. En este caso, regresemos al proyecto de Nest. Para que el contenedor generado pueda acceder a la base de datos de nuestro sistema, tendremos que realizar una nueva configuración. Nos dirigimos al archivo typeorm.ts de la carpeta config donde cambiaremos el valor del host en el objeto de configuración de la conexión a la DB por host.docker.internal y ya está. De esta manera le indicamos a Docker que deseamos definir al host sobre el cual se encuentra montado el contenedor como la ruta de host de la misma base de datos.

- **Contenedor-Contenedor**: Este caso contempla la comunicación entre dos contenedores aislados que dependen uno del otro. Para este ejemplo, realizaremos una pequeña modificación. Si bien la app funciona ahora que dimos acceso a la DB local, lo ideal sería que esta DB pudiera ser contenerizada igual que el resto de la app, pues deseamos que la persona que utilice la aplicación pueda acceder a ella aunque no tenga instalado el gestor en cuestión.

<mark>Contenedor-WEB</mark>

Para conectarnos a la Web, a una API externa podemos instalar Axios.

```ts
// app.js
cont express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Demo de docker');
});

app.get('/users', (req, res) => {
  axios.get('https://jsonplaceholder.com/users')
  .then((response) => {
    return response.data.map((user) => {
      return {
        name: user.name,
        email: user.email
      }
    })
  }).then((users) => {
    res.send(users);
  })
})

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})
```

```bash
npm start
```

http://localhost:3000/users

Para levantar el proyecto desde Docker:

```bash
docker build . -t express-demo-docker

doker run -p 3002:3000 express-demo-docker
```

http://localhost:3002/users

Un contenedor se puede conectar a internet sin problemas

<mark>Contenedor-Localhost</mark>

En el la demo-docker vamos a crear un archivo llamado **app2.js** y copiamos el contenido de app.js.

Ahora modificamos app.js para que en lugar de llamar a https://jsonplaceholder.com/users, utilice el servicio de app2.js.

```ts
// app.js
cont express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Demo de docker');
});

app.get('/users', (req, res) => {
  axios.get('https://localhost:3005/users')
  .then((response) => {
    res.send({"fromLocalHost": response.data})
  }).catch((err) => {
    res.send({error: err.message})
  })
})

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})
```

Y modificamos el app.js para que ejecute en el puerto 3005.

```ts
// app2.js
cont express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Demo de docker');
});

app.get('/users', (req, res) => {
  axios.get('https://jsonplaceholder.com/users')
  .then((response) => {
    return response.data.map((user) => {
      return {
        name: user.name,
        email: user.email
      }
    })
  }).then((users) => {
    res.send(users);
  })
})

app.listen(3005, () => {
  console.log("Server listening on port 3005");
})
```

```bash
docker ps
docker stop <nombre-del-contenedor> // ?nest-demo-docker?
```

Para probar en local abrimos dos teminales y levantamos los dos servidores.

```bash
npm start
node app2.js
```

https://localhost:3000/users
https://localhost:3005/users

Ahora podemos dockerizar a app.js

```bash
docker run -p 3002:3000 express-demo-docker
```

Al ejecutar obtendremos el error "connect ECONNREFUSED 127.0.0.1:3005" y se debe a que en el contenedor no existe un proceso escuchando el puerto 3005. Está en local (nuestro pc), pero no dentro del contenedor.

```bash
docker ps
docker stop <nombre-del-contenedor> // ?nest-demo-docker?
```

Para acceder desde el contenerdor a nuestra pc:

```ts
// app.js
cont express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Demo de docker');
});

app.get('/users', (req, res) => {
  axios.get('http://host.docker.internet:3005/users')
  .then((response) => {
    res.send({"fromLocalHost": response.data})
  }).catch((err) => {
    res.send({error: err.message})
  })
})

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})
```

Ahora, si podremos acceder desde el contendor a la API local.

```bash
docker run -p 3002:3000 express-demo-docker
```

> Siempre que realicemos un cambio en la App, debemos recontruir la imagen (build), ya que es estática, no se reconstruye dinámicamente.

<mark>Contenedor-Contenedor</mark>

Para ejemplificar las conxiones de un contenedor a otro vamos a utilizar Postgres con nuestra app.

```bash
docker run --name postgresdb -e POSTGRES_PASSWORD=example -e POSTGRES_DB=demo-db -d postgres
```

Ahora, tenemos un contenedor ejecutando una instancia de postgres. Para obtener la IP (al necesitamos para conectarnos desde nuestra app que se ejecutará en otro contenedor) del contenedor podemos ejecutar:

```bash
docker container inspect postgresdb
```

Este comando muestra al información del contenedor, incluida la IP. Debemos modificar el archivo .env.development indicando que el host de la BD será esa IP.

```bash
# .env.delopment
DB_NAME=pm4_db
DB_HOST=127.17.0.2
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=example

CLOUDINARY_CLOUD_NAME=XXXXXXXXXXXXXXX
CLOUDINARY_API_SECRET=XXXXXXXXXXX
CLOUDINARY_API_KEY=XXXXXXXXXXXX

JWT_SECRET=superclavesecreta
```

Reconstruimos la imagen de nuestra app.

```bash
docker build . -t nest-demo-docker
docker run -p 3001:3000 nest-demo-docker
```

Nuestra app se ejecutará desde el contenedor utilizando la base de datos que se ejecuta en otro contenedor.

hppt://localhost:3001/api

El problema que tenemos es que si bajamos el contenedor de la BD y lo volvemos a levantar puede que el sistema le asigne una IP diferente, veamos como mejorarlo...

```bash
# Creamos una network
docker network create nestnetwork

# Listamos las networks
docker network ls
...
nestnetwork
...
```

```bash
# Bajamos el contenedor de la bd
docker stop postgresdb

# Eliminamos el contenedor
docker rm postgresdb
```

Levantamos nuevamente el contenedor de la bd pero indicando que trabaje sobre la network que creamos.

```bash
docker run --name postgresdb -e POSTGRES_PASSWORD=example -e POSTGRES_DB=demo-db --network nestnetwork -d postgres
```

Ahora podemos modificar la configuración de nuestra app para indicar que el host de la bd será postgresdb. El proceso podrá acceder a él porque se encontrará en la misma network.

```bash
# .env.delopment
DB_NAME=pm4_db
DB_HOST=postgresdb
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=example

CLOUDINARY_CLOUD_NAME=XXXXXXXXXXXXXXX
CLOUDINARY_API_SECRET=XXXXXXXXXXX
CLOUDINARY_API_KEY=XXXXXXXXXXXX

JWT_SECRET=superclavesecreta
```

En el run de nuestra app conteinerizada indicamos que levante sobre la misma network.

```bash
docker build . -t nest-demo-docker
docker run -p 3001:3000 --network nestnetwork nest-demo-docker
```

<mark>Recordemos configurar el synchronize en true para que las tablas se generen en la BD. Sino deberíamos ejecutar las misgraciones.</mark>

El problema es que si bajamos el contendor de la BD se perderá la información, porque no hemos cofigurado la persistencia fuera del contenedor.

**¡Felicidades!** has conseguido construir una Network de Docker funcional para trabajar con múltiples contenedores! Sin embargo, no todo es alegría

Detengamos los contenedores y eliminémoslos de **Docker** con los comandos stop y rm que ya conocemos. Volvamos a inicializar los contenedores desde 0. Si tratamos de iniciar sesión con el mismo usuario que creamos anteriormente, veremos que no existe este usuario.

> **Esto ocurre dado que cada vez que iniciamos un nuevo contenedor o removemos la versión anterior, los datos de la DB se pierden: no existe permanencia.**

Descubramos cómo agregar la persistencia de datos y conservar la información dentro de nuestras bases de datos, mediante los volúmenes.

## Persistencia de datos en Docker

## Uso de volúmenes en Docker para la gestión y persistencia de datos

Los **volúmenes** son una utilidad de Docker que nos permite almacenar información del contenedor en forma de folders en la memoria del **host**, en lugar de almacenarla dentro del contenedor.

De esta manera, al crear contenedores con una imagen que define un volumen, dicha información se encontrará disponible cada vez que se inicialice un nuevo contenedor a partir de esta imagen.

> **Piensa en los volúmenes como el disco duro de tu computadora, donde almacenas información mediante carpetas**.

Los **volúmenes** almacenan información que deseamos conservar, a pesar de que un contenedor se haya removido de Docker. Para generar un volumen, hacemos uso de la bandera -v que nos permite asignar un volumen al contenedor, el cual es almacenado en un folder dentro del host local en la misma carpeta que se define en la imagen.

- Ya que estamos trabajando con postgres, este folder es creado en la ruta **“/var/lib/postgresql/data”** de la máquina virtual de nuestro localhost (esta es información extraída de la documentación de la imagen).

**Volúmenes**

Paramos y eliminamos los contedores

```bash
# Bajamos el contenedor de la bd
docker stop postgresdb

# Eliminamos el contenedor
docker rm postgresdb
```

Lo levantaremos nuevamente con una nueva opción

```bash
docker run --name postgresdb -e POSTGRES_PASSWORD=example -e POSTGRES_DB=demo-db --network nestnetwork -v pgdata:/var/lib/postgresql/data -d postgres
```

Postgres guarda la información de las BD en el directorio /var/lib/postgresql/data. De esta manera, estamos indicando que ese directorio dentro del contenedor se mapee al directorio pgdata de nuestro proyecto local. De esta manera, si bajamos el docker y lo levantamos nuevamente, tomará la información de la carpeta local. Agregamos persistencia!

```bash
docker build . -t nest-demo-docker
docker run -p 3001:3000 --network nestnetwork nest-demo-docker
```

Podemos tener una coordinación entre los dos contenedores para poder bajarlos y levantarlos en simultaneo. Si bajo la app que se baje la BD. Para ello utilizaremos docker-compose.

En la demos creamos un archivo que coordinará los contenedores llamado docker-compose.yml

```yml
# docker-compose.yml

version: '3.8'

services:
  nestapp:
    build: ./
    ports:
      - '3001:3000'
    env_file:
      - .env.delopment
    depends_on:
      - postgresdb

  postgresdb:
    image: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    env_file:
      - .env.delopment

volumes:
  pgdata:
```

```bash
# .env.delopment
DB_NAME=pm4_db
DB_HOST=127.17.0.2
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=example

CLOUDINARY_CLOUD_NAME=XXXXXXXXXXXXXXX
CLOUDINARY_API_SECRET=XXXXXXXXXXX
CLOUDINARY_API_KEY=XXXXXXXXXXXX

JWT_SECRET=superclavesecreta


POSTGRES_PASSWORD=example
POSTGRES_DB=demo-db
```

```bash
docker compose up

# docker compose stop
# docker compose rm
```

Y así hemos logrado tener una aplicación multicontenedores que se comunican entre sí y utilizan la persistencia de datos. Si bien este proceso pudo parecer tedioso, **Docker** cuenta con una herramienta que nos ayudará a simplificarlo.

## Docker Compose

## Docker Compose y gestión de aplicaciones con múltiples contenedores

**Docker Compose** es una herramienta de Docker que nos permite automatizar el proceso de creación y configuración de aplicaciones multi contenedores, reemplazando el uso de algunos comandos como build o run mediante la implementación de un archivo de configuración.

Dicho archivo debe contener cada uno de los **contenedores** que componen nuestra aplicación, junto con sus respectivas configuraciones (variables de entorno, puestos, volúmenes, Networks, etc).

**Docker Compose** posee una gran variedad de configuraciones las cuales varían de acuerdo al proyecto donde se implemente. Puedes conocer más al respecto en la documentación oficial de Docker.(opens in a new tab) En esta ocasión, vamos a utilizar el proyecto que hemos trabajado hasta ahora para mostrar la configuración básica de Docker Compose.

Vamos a crear un nuevo archivo dentro de la carpeta raíz llamado **docker-compose.yaml**

Posiblemente, este formato de texto no te sea nada familiar. Está basado en el uso de espacios, sangrías y estructuras de clave-valor, similares al ya conocido formato JSON. Dentro del archivo YAML **la indentación es sumamente importante** pues esta diferencia los elementos padres de hijos.

Dentro de este archivo, lo primero que haremos será definir qué versión de Docker Compose deseamos implementar. Actualmente, la última versión es la 3.8. Seguido de esto, sumamos los contenedores que deseamos crear bajo el nombre de **services**.

Ahora vamos a configurar estos contenedores. La idea general será transformar los comandos que utilizamos a través docker CLI en la terminal.

Empecemos por el contenedor de la base de datos, el cual era inicializado con el comando:

```bash
docker run --name postgresdb -e POSTGRES_PASSWORD=example -e POSTGRES_DB=demo-db --network nestnetwork -v pgdata:/var/lib/postgresql/data -d postgres
```

Dentro del archivo anterior y en un nivel inferior de indentación:

- Lo primero que haremos será configurar la imagen que utilizamos para crear el contenedor postgresdb, que en este caso será la imagen oficial de postgres en la propiedad image.

- Lo siguiente será definir el volumen que deseamos utilizar para asegurar la persistencia de datos **pgdata:/var/lib/postgresql/data** dentro de la propiedad volumes. Este debe está indentado en un nivel inferior.

Los volúmenes no son creados automáticamente, sino que deben ser definidos dentro de una propiedad llamada volumes que se crea en el mismo nivel de services y version.

Por último, vamos a definir las variables de entorno.

Para ello aprovechemos el archivo **.development.env** que se encuentra en la raíz del proyecto al cual haremos referencia en la propiedad env_file. No olvides definir las variables **POSTGRES_PASSWORD y POSTGRES_DB** dentro de este archivo.

**¡Excelente!** Hemos gestionado una aplicación con múltiples contenedores que se comunican entre sí, mediante la herramienta de Docker Compose.

## Cierre

En esta clase conocimos a Docker, una herramienta crucial en el desarrollo de aplicaciones que revoluciona la forma en que desplegamos y gestionamos entornos. Hemos comprendido cómo Docker facilita la creación de entornos de desarrollo reproducibles, el despliegue ágil de aplicaciones y la escalabilidad de infraestructuras, lo que nos permite maximizar la productividad y la eficiencia en nuestras operaciones.

Ahondamos en el concepto de contenerización, que implica la creación y gestión eficiente de imágenes Docker y simplifica el despliegue de aplicaciones al encapsularlas con sus dependencias.

Además, descubrimos el manejo de redes para facilitar la comunicación entre contenedores, asegurando una integración fluida que, junto a la utilización de volúmenes en Docker, agrega una capa de persistencia, permitiendo la gestión efectiva de datos

Finalmente, hicimos uso de Docker Compose, la cual surge como una herramienta esencial para la administración de aplicaciones con múltiples contenedores, proporcionando un enfoque organizado y eficaz para la organización de servicios.

Este conjunto integral de conceptos y prácticas dentro del ecosistema Docker marca un hito en el desarrollo moderno de aplicaciones, brindando flexibilidad, escalabilidad y eficiencia en el desarrollo de software.

## Homework

### ACTIVIDAD 01

Definir la imagen de la aplicación dentro de un archivo docker.

### ACTIVIDAD 02

Crear un archivo docker-compose para utilizar la aplicación en conjunto con una base de datos dockerizada.

### ACTIVIDAD 03

Asegurar la persistencia de datos del contenedor.

**[Requisitos]**:

- Al finalizar el hito el alumno deberá contar con una aplicación completamente montada en contenedores de docker que pueda ser levantada de forma integral mediante docker compose y preserve todas sus funcionalidades de manera local.

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

  img[alt="Testing2"] {
  max-width:  600px;
  margin: 0 auto;
  display: block;
  }
</style>
