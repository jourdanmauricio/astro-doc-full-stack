---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 3. Express && TypeScript
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
description: Express && TypeScript
draft: false
category: TypeScript Express Node
---

## Express & TypeScript

### Breve repaso de herramientas

Antes de ver de qué manera ambas tecnologías se conectan para trabajar y desarrollar un proyecto más potente, recordemos un poco en qué consiste cada una de ellas.

- **EXPRESS**: Express es un framework minimalista para node, ideal para construir aplicaciones web y APIs. Su sencillez y flexibilidad lo convierten en una opción popular para el desarrollo backend con JavaScript o TypeScript.

Hemos visto también que pueden agregarse middlewares y servicios, pero por ahora solo nos centraremos en lo básico de un servidor. Un ejemplo sencillo de como crear un servidor básico luce así.

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hola, Express!');
});

app.listen(3000, () => {
  console.log('Server iniciado en puerto 3000');
});
```

- **TYPESCRIPT**: ypeScrip es un lenguaje de programación que potencia las funcionalidades de JavaScript y que nos permite definir tipados estáticos, los cuales nos ayudarán a reducir comportamientos inesperados en la ejecución del código y que podemos prever en tiempo de compilación.

Por ejemplo, al construir una función dejamos asignado explícitamente el tipo de datos que recibirá como argumentos y que retornará, en caso que devuelva algo:

```javascript
function saludar(nombre: string): string {
  return `Hola, ${nombre}`;
}

const mensaje = saludar('Mario');
console.log(mensaje); // Hola, Mario!
```

### ¿Cómo se complementan?

La combinación de ambas tecnologías implica la creación de aplicaciones del lado servidor más mantenibles, escalables y eficientes. Podremos dar uso a los tipos estáticos de TS dentro de los controladores y las rutas para detectar posibles errores y prevenir comportamientos inesperados en nuestros proyectos.

```javascript
PORT = 'Gato';

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// const PORT: number = process.env.PORT;
// type 'string | undefined' is not assignable to type 'number'

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

En este ejemplo vemos que la variable PORT recibe un valor string en lugar de uno numérico.

Así que **TSC** nos notifica que es preciso realizar la corrección para poder levantar el servidor.

```typescript
import {Resques, Response} from "express";

interface Usuario {
  id: number;
  nombre: string;
}

const crearUsuario = async(req; Request, res: Response) {
  const {id, nombre} = req.query;
  const nuevoUsuario: Usuario = {id, nombre};
  nuevoUsuario.extra = "extra";
  // Error: porperty extra does not exists on type "Usuario"

  res.status(201).json({usuario: nuevoUsuario});
};
```

En este otro ejemplo validamos la estructura de un nuevo usuario a partir de una interfaz Usuario, logrando ver errores en tiempo de compilación.

En este caso, la propiedad extra no hace parte de la interfaz y de allí el error.

Estos ejemplos nos muestran cómo TypeScript y Express trabajan juntos para darnos un desarrollo más completo y complementario. Pasemos ahora a ver formalmente cómo integrar express y TypeScript en nuestros proyectos de backend.

## Estructura de proyecto

### Inicialización de proyecto

Para avanzar, vamos a construir una pequeña API Rest para realizar solicitudes básicas de CRUD. Esto ya lo hemos realizado antes...

1. Lo primero será crear un nuevo directorio con el comando mkdir mi-proyecto e ingresar al directorio del proyecto con cd mi-proyecto.
2. Una vez dentro, inicializamos el proyecto utilizando npm init -y.
3. Para instalar TypeScript, ingresa el comando npm install --save-dev typescript @types/express @types/node nodemon ts-node express.

### Archivos y carpetas

Comencemos añadiendo estratégicamente los diferentes archivos y directorios que usaremos en el proyecto, con el fin de trabajar de manera organizada.

```bash
mkdir demo-typescript
cd demo-typescript
git init
mkdir src
npm init -y
npm i express dotenv
npm i -D express typescript ts-node morgan nodemon @types/node @types/express
tsc --init
touch nodemon.json
touch .env
touch .gitignore
cd src
touch index.ts
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outdir": "./dist",
    "rootdir": "./src",
    "strict": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- Los archivos de TS a compilar estarán ubicados en la **carpeta src** y el resultado de la compilación estará en una **carpeta dist** que se creará en su momento.

- El target señala que se compilará para la versión ES5 y se utilizará el sistema de **módulos CommonJS**.

- Con strict indicamos que se harán restricciones más rigurosas del código, lo que implica mayores comprobaciones por parte de TSC.

- Se incluirá en la compilación todos aquellos archivos dentro de src y sus directorios internos con extensión .ts y se omite la carpeta de node_modules para la compilación.

Solo nos resta configurar el script para ejecutar el proyecto. Como node no puede ejecutar código de TypeScript, **primero debe realizar la compilación**. Para esto, dentro del archivo package.json agregaremos un script **build** que ejecutará a TSC. Esto nos permitirá realizar la compilación al ejecutar el comando npm run build.

En el script start agregamos nodemon, pero esto sería muy poco práctico ya que cada vez que realicemos cambios en algún archivo de TS, deberíamos detener el servidor, ejecutar npm run build y volver a ejecutar npm start.

Para evitar este proceso instalamos la dependencia **ts-node** con el comando que nos permite ejecutar archivos .ts directamente en node, sin necesidad de compilar previamente. Finalmente, usamos nodemon para reiniciar automáticamente nuestro servidor. Recuerda instalar también **dotenv** para la gestión de las variables de entorno (npm install dotenv).

```json
// nodemon.json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

```json
// package.json
{
  // ...
  "scripts": {
    // "start": "nodemon src/index.ts"
    "start": "nodemon"
  }
}
```

```bash
# .env
PORT=3000
```

```bash
# .gitignore
node_modules
.env
```

```javascript
// index.ts
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT: number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Manejo de rutas

### Creación y tipado de rutas

¿Recuerdas qué significa CRUD? Se refiere a las operaciones create, read, update y delete que podemos realizar en un servidor. Con todo lo que hemos aprendido hasta el momento sobre TypeScript, nuestro siguiente paso será construir rutas y controladores estáticamente tipadas.

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
