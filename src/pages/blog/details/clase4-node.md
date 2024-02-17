---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 4. Node
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase4.jpeg',
    alt: 'Background clase 4 - Node js',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-node.png',
    alt: 'Logo for Node js',
  }
description: Node js
draft: false
category: Node js
---

## NodeJS

Cuando queríamos agregar lógica de JavaScript a un archivo de HTML utilizábamos la etiqueta script. Por ejemplo, cuando queríamos definir un *listener* para eventos del DOM. Estas implementaciones funcionaban ya que los navegadores cuentan con un **motor** que permite ejecutar código JavaScript.

Imaginemos este **motor** del navegador como un motor de un coche. Tu coche puede ser el mejor de todos, pero sin un motor no te servirá. Lo mismo sucede con el código. Este necesita ser ejecutado y para esto requiere este motor de ejecución.

**¿Sabías que cada navegador tiene su propio motor?**

1. El motor de Chrome es **V8**.
2. El motor de Firefox es **SipderMonkey**.
3. El motor de Safari es **JSCore**.
4. El motor de Explorer es **Chakra**.

<mark>**¿Qué sucede cuando no estamos trabajando dentro de un navegador y debemos ejecutar scripts? Es aquí donde nace Node.**</mark>

<mark>>Node es un **entorno de ejecución de JavaScript**, también llamado *runtime*</mark>. Imagnia a node como una especie de contenedor que tiene todo lo necesario para ejecutar código JavaScript: APIs propias, funciones integradas, etc. De esta manera, podemos trabajar con JavaScript sin depender de los navegadores y sus motores, ya que node trabaja como un motor en nuestra computadora.

### Elementos

Node fue desarrollado a partir del motor V8 de Chrome. Este utiliza el lenguaje *C++* y una librería llamada *libuv* escrita en C. En otras palabras, estamos utilizando un lenguaje para ejecutar otro lenguaje... (¿lenguaje al cuadrado? xD).

Esto hace posible la creación de servidores y la construcción de APIs de forma rápida y escalable, así como el uso de un solo lenguaje tanto para el desarrollo de software. Este entorno de ejecución es utilizado por grandes empresas...

## Inicialización de proyecto

### Proyecto

Llegó el momento de crear un proyecto con esta herramienta. En el siguiente video aprenderemos a hacerlo paso a paso.

**Package.json** → es el alma del proyecto, el que indica donde está el proyecto, su nombre, sus dependencias, la versión. Toda la información del proyecto se encuentra en este archivo. Podemos escribir el archivo “a mano”, pero tenemos un comando para generarlo

**npm init** → nos preguntará cómo se llama el proyecto, la versión, la descripción, el entry point, comando de test, el repositorio de git, keywords, el autor, y la licencia. Luego nos mostrará un preview del archivo y nos preguntará si estamos de acuerdo

**Módulos** → así llamaremos a los archivos .js

**npm start** → la propiedad scripts nos permite generar comandos. Node conoce algunos comandos y otros podemos agregarlos. El comando para que se ejecute un proyecto es:

```json
"scripts": {
	"start": "node index.js"
}
```

Ahora desde la consola podemos ejecutar `npm start`. Por detrás se ejecutará: `node index.js`

El nombre de los comandos se define por convención. Si utilizamos un nombre como “inicio” debemos ejecutar `npm run inicio`. Lo ideal es seguir la convención: test, start, buid, dev

### ¿Se puede ordenar el código?

Hasta el momento hemos visto que, gracias a node, podemos ejecutar scripts que se encuentran en distintos archivos y ubicaciones. Imagina que comenzamos a desarrollar un proyecto grande. ¿Crees que todo el código lo guardaremos en un solo archivo? ¡Claro que no!

A medida que un proyecto comienza a ser más grande, necesitamos desarrollar una arquitectura de archivos y carpetas que nos permita hacerla escalable. De esta forma, todo nuestro código estará dividido en distintas partes (a partir de las responsabilidades de cada función) pero se ejecutarán en conjunto.

A partir de ahora, a cada archivo o carpeta que contenga código lo llamaremos módulo.

## Módulos

### ¿Qué es un módulo?

Este concepto se refiere a un conjunto de código **organizado** y **encapsulado** que se puede reutilizar en otras partes de un programa. Estos ayudan a estructurar y mantener proyectos ya que dividen el código en piezas más pequeñas y manejables.

> Imaginemos que nuestro código completo es un automóvil. Los módulos serán las partes que lo componen como el motor, los frenos, la transmisión, etc. Cada componente del auto tiene una tarea específica y opera independientemente, pero contribuye a que el automóvil funcione de manera adecuada. Además, puedes utilizar cada componente en otro automóvil.

_Modularización de código_

Node proporciona un sistema de módulos que permite la **exportación** e **importación**. Es decir, que nos permite importar y exportar código de un archivo a otro. Cada módulo tiene su propio ámbito, lo que significa que las variables y funciones definidas en un módulo no están automáticamente disponibles en otros módulos, a menos que sean exportados.

Para exportar código desde un módulo se utiliza un objeto llamado **exports**. Guardaremos en este objeto las propiedades y valores que se expondrán para ser reutilizados desde cualquier otra parte del proyecto.

Para importar ese código en otro archivo se utiliza la función **require()**, que recibe por argumento la ruta (_path_) de la ubicación del módulo desde la cual se realiza la exportación.

```jsx
// archivo1.js
function creadorDeNombre(nombre) {
  const miNombre = nombre + ' JavaScript';
  return miNombre;
}
module.exports = { creadorDeNombre };
```

```jsx
// archivo2.js
const creadorDeNombre = require('./archivo1');
creadorDeNombre('Este es un nombre');
```

Vemos que la exportación se realiza en un solo objeto. Existe una manera más cómoda de hacer exportaciones utilizando el objeto **module.exports**, donde haremos de una vez la agrupación de las propiedades y los valores que queremos exportar...

**Módulo** → Porción de código encapsulado y reutilizable, que se encuentra en su propio archivo

```jsx
// models/activity.js
class Activity {
  constructor(id, title, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
module.exports = { Activity };
```

```jsx
// models/repository.js
const { Activity }= require("./activity");

class Repository {
	constructor() {
		this.activities = [];
	}
	createActivity(id, title, description, imageUrl) {
		const newActivity = new Activity(id, title, description, imageUrl);
		this.activities.push(newActivity);
	}
	getAllActivities = () => thsi.activities;
	deleteActivity(id) = (id) => {
		this.activities = this.activities.filter((activity) => activity.id !== id);
	}
}

module.exports = {Repository}
```

```jsx
// index.js
const { Repository }= require("./models/repository");

const repository = new Repository();
...
```

De la misma manera que descubrimos cómo conectar distintos módulos dentro de nuestro proyecto, también podremos conectar módulos que están por fuera.

## NPM

### NPM (node package modules)

Node cuenta con una librería *open source* gigante con muchos módulos que nos ayudarán a desarrollar nuestros proyectos reduciendo la cantidad de lógica y código que debe implementarse. Esto es gracias a que, en lugar de nosotros construir este código, utilizaremos el que otras personas ya han hecho. ¿Qué beneficios trae esto?

**Beneficios de utilizar módulos externos**

1. Reutilización de código
2. Eficiencia en el desarrollo
3. Colaboración y comunidad
4. Actualizaciones
5. Foco en el core de tu app
6. Ecosistema de desarrollo

https://www.npmjs.com/

¿Recuerdas cuando hablábamos de *frameworks* y *librerías*? Estas era un tipo de herramienta. Pues NPM también tiene su propia clasificación. A este tipo de herramienta se lo conoce como **gestor de paquetes**. Existen muchos otros como Bun, Yarn o Pip. Pero en Henry solo utilizaremos NPM.

¿Te imaginas qué es un paquete? ¿Y por qué NPM lo gestiona? Esto es sencillo. Se le llama paquete a un conjunto de módulos (código) que podemos descargar e instalar en nuestro proyecto.

Por ejemplo, durante el Prep Course trabajaste con un repositorio en el que debías ejecutar un comando llamado **npm install**. Este comando descargaba e instalaba todos los paquetes que estaban detallados en un archivo llamado *package.json*. Pero no te preocupes, ya llegaremos a esto.

NPM gestiona estos paquetes porque facilita la instalación, manejo y compartición de paquetes que podemos usar dentro de nuestros proyectos.

> Cuando utilizamos **módulos externos** dentro de nuestra aplicación, nos referimos a estos como una dependencia

### Instalación de nodemon

Dejemos la teoría y pasemos a la práctica. Vamos a descargar e instalar una dependencia con NPM. Esta dependencia se llama **nodemon** y nos ayudará a desarrollar más rápido. ¿Cómo? Nos permitirá realizar cambios en el código y que, al guardar, estos cambios impacten directamente en el proyecto. Sin este paquete deberíamos reiniciar todo el proyecto

Dependencia →paquete de módulos que podemos instalar para requerirlos y utilizarlos. Son módulos desarrollados por otras personas

**npm** → gestor de paquetes de node. Se instala al instalar node. Cuando ejecutamos `npm init` estamos creando nuestro propio paquete

**npm install** → instala paquetes de terceros. Ej: `npm install jasmine`

**dependencias** → existen las de desarrollo y las de producción. Las de desarrollo facilitan nuestra tarea y no se envían al servidor, a producción. Las de producción se instalan en nuestro proyecto pero si se envían al servidor porque son necesarias para el funcionamiento de nuestro programa. Las dependencias de desarollo se instalan con: `npm install -D nodemon`

**.gitIgnore** → contiene los nombres de archivos y carpetas que no deseamos subir a github. Cuando descargamos (clonamos) un proyecto, el comando `npm install` instala todas las dependencias que se encuentran indicadas en el package.json. Por este motivo, se debe incluir la carpeta node_modules en .gitIgnore

**nodemon** → nos permite refrescar el servidor cuando modifiques algún módulo del proyecto. `npm install -D nodemon` . Modificamos el srcript start del package.json para utilizar nodemon

```jsx
"scripts": {
	"start": "nodemon index.js"
}
```

### ¿Qué otras dependencias puedo instalar?

Existen miles y miles de dependencias que podemos instalar. Desde paquetes para crear una arquitectura en nuestro proyecto, hasta paquetes que nos facilitarán el diseño y estilo de nuestra aplicación. Sin embargo, es importante que comprendas algunas características de estos paquetes, como por ejemplo, el **versionado**...

## Versionado

Habíamos dicho que los paquetes que NPM (o cualquier otro gestor) nos permite instalar son código. Esto quiere decir que esos módulos de código tienen una versión. Por ejemplo, cuando compramos un celular, podemos escoger un modelo más viejo o uno más nuevo. Esto también sucede con las aplicaciones. Estas se actualizan y tienen nuevas versiones.

Node nos permite manejar las versiones de los paquetes. Es decir, podremos controlar y definir qué versiones de los paquetes queremos utilizar en nuestro proyecto.

Node utiliza un archivo llamado **package.json** para definir las dependencias de un proyecto y especificar sus versiones.

En el archivo **package.json**, las dependencias pueden tener diversas formas de versionado, pero la convención común es utilizar el formato semántico SemVer. Este consta de tres números separados por puntos, por ejemplo, MAJOR.MINOR.PATCH. Cada número tiene un significado específico:

```jsx
1 . 4 . 2
```

Otra cosa que nos permite ver el versionado qué otras versiones son compatibles gracias a los símbolos **^** y **~**. Supongamos que en nuestro package.json tenemos instaladas las siguientes dependencias.

```json
{
  "dependencies": {
    "express": "^4.17.1",
    "lodash": "~4.17.21"
  }
}
```

Esto indica que el proyecto depende de "express" en cualquier versión compatible con la 4.17.1 pero no la 5.0.0, y de lodash en cualquier versión compatible con la 4.17.21 pero no la 4.18.0.

El manejo de versiones en Node.js ayuda a prevenir problemas de compatibilidad y a garantizar que todos los desarrolladores que trabajan en un proyecto compartan las mismas versiones de las dependencias.

## ¡Mejora la calidad de tu código!

### Better the quality, less the work

La calidad del código es una inversión a mediano y largo plazo ya que nos permitirá tener un código escalable y fácil de manipular. En el siguiente video podrás ver cómo puedes utilizar a ChatGPT a tu favor para mejorar el código

Una IA nos puede dar ventajas como velocidad de análisis. “Analiza la siguiente función y dame un listado de todos los problemas y potenciales errores que encuentras. ¿Qué buenas prácticas no sigo?”

“Devuelve la misma función pero con nombres de variables más descriptivos y que sigan el estandar camelCase”

“Devuelve la misma función pero que valide que los parámetros que llegan sean números. Caso contrario finaliza la ejecución con un aviso”

**Para mejorar nuestro código podemos seguir 4 pasos:**

1. Identificar el problema, y definir que inconsistencias tenemos en nuestro código. Podemos utilizar GPT con el prompt: ”Analiza la siguiente función y dame un listado de todos los problemas y potenciales errores que encuentras. ¿Qué buenas prácticas no sigo?”
2. Explorar las soluciones. Si tenemos errores, podemos preguntar a GPT de qué manera lo podemos solucionar. “Devuelve la misma función pero con nombres de variables más descriptivos y que sigan el estandar camelCase”
3. Aplicar los cambios: pedirle a GPT que aplique los cambios que considere más adecuada para nuestro código
4. Evaluar los resultados. Validar que los resultados sean los esperados

### Pasos para mejorar mi código

1. Identificar el problema
2. Explorar todas las soluciones posibles
3. Aplicar los cambios de la solución más adecuada
4. Evaluar los resultados en comparación con los anteriores

## Cierre

Hemos explorado las bases fundamentales de node, un entorno de ejecución. Además, abordamos el concepto de **módulos**. La capacidad de exportar e importar módulos nos permite construir aplicaciones más organizadas y mantenibles.

Finalmente, revisamos el manejo de versiones. Las dependencias nos garantizan la coherencia y prevención de problemas de compatibilidad.

### Resumen

- Node: entorno de ejecución del lado del servidor
- Módulos: piezas de código que encapsulan funcionalidades, promueven la modularidad y la reutilización
- NPM: simplifica la gestión de dependencias y facilita la colaboración en proyectos
- Versinado: para gerantizar la coherencia y prevenir problemas de compatibilidad

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

Para esta actividad te invitamos a LEER ATENTAMENTE todas estas cards y comprender la situación que estamos abordando.

**ACTIVIDAD 02**

Seguramente habrás notado que al principio de este proyecto utilizamos un arreglo con información de películas que, para que funcione, debimos vincular los scripts **tempData.js** e **index.js** al documento index.html para que funcione, y en ese orden.

Esto no está mal, pero ahora imagina que tenemos 10 módulos de Javascript, todos ellos compartiendo variables, funciones, etc… ¡sería un caos! Porque…

1. Deberíamos vincular LOS 10 SCRIPTS a mi documento index.html.
2. Deberíamos hacer un rompecabezas de qué módulo vincular antes o después para tener disponibles todas las variables antes de utilizarlas.

**ACTIVIDAD 03**

Seguramente estarás pensando que, con lo que vimos en la clase de hoy de module.exports y require, esto se puede solucionar muy fácilmente. ¡Y es así! Si con esta posibilidad exportamos y requerimos adecuadamente los módulos, sólo será cuestión de vincular el index.js y luego este requerirá todos los demás módulos… pero aquí hay un problema 😞

El navegador no entiende de module.exports ni require, ya que estos son una capacidad propia de Node, y el navegador únicamente entiende Javascript “puro”. Es decir, el navegador por sí solo no puede interpretar y manejar las importaciones y exportaciones. 😣

**ACTIVIDAD 04**

Pero aquí es donde viene lo interesante, y esta es una lección que debes llevarte para todo tu camino como Desarrollador/a Web:

Siempre que te preguntes “¿Existirá una librería de NPM que solucione este X problema?”, la respuesta será casi siempre “¡SÍ!”.

Y esta no es la excepción 🚀 Para ellos instalaremos desde npm lo que denominamos un bundler. Ya te daremos detalles de qué es y qué hace este buen señor.

**ACTIVIDAD 05**

Esta actividad será distinta a las demás. Será una actividad 100% guiada. En el video de hito de esta clase desarrollaremos paso a paso la siguiente tarea:

- Vamos a comentar qué es un bundler, cómo los instalaremos y de qué forma puede ayudarnos a resolver el problema planteado más arriba.
- Vamos a configurar y ejecutar este bundler para que nos ayude a “acomodar” nuestros módulos de JavaScript.
- Vamos a configurar algunos comandos de nuestro package.json para facilitarnos la tarea al momento de ejecutar nuestro proyecto.

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
