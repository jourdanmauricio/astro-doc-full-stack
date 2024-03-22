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

- **TYPESCRIPT**: TypeScrip es un lenguaje de programación que potencia las funcionalidades de JavaScript y que nos permite definir tipados estáticos, los cuales nos ayudarán a reducir comportamientos inesperados en la ejecución del código y que podemos prever en tiempo de compilación.

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Manejo de rutas

### Creación y tipado de rutas

¿Recuerdas qué significa CRUD? Se refiere a las operaciones create, read, update y delete que podemos realizar en un servidor. Con todo lo que hemos aprendido hasta el momento sobre TypeScript, nuestro siguiente paso será construir rutas y controladores estáticamente tipadas.

```typescript
// src/routes/recursos.ts

interface IRecurso {
  id: string;
  nombre: string;
}
```

Lo primero que haremos será crear una interfaz llamada Recurso. Esta interfaz estará definida en un archivo llamado recursos.ts dentro de una nueva carpeta llamada routes en el directorio src.

Esto nos permitirá realizar validaciones dentro de las rutas que haremos en su momento.

```typescript
// src/routes/recursos.ts
import { Router, Request, Response } from 'express';

interface IRecurso {
  id: string;
  nombre: string;
}

const router = Router();
```

En este mismo archivo, definiremos el router con cada uno de los métodos HTTP, por lo que deberemos importarlo junto con las interfaces Request y Response para manejar la solicitud y la respuesta a las peticiones, respectivamente.

### Inserción de recursos

Lo primero que vamos a hacer es crear una ruta de tipo POST. Como sabemos, esta ruta va a recibir como primer valor un endpoint y como segundo una función de callback (controlador) que recibe como argumentos la request y response.

Utilizaremos la interfaz de IRecurso para el tipado en la solicitud con Request<IRecurso>, lo cual significa que esperamos recibir por body un objeto con esta estructura.

En index.ts estamos incorporando demasiadas responsabilidades así que modularizamos creando el archivo server.ts

```typescript
// server.ts
import express from 'express';
import router from './routes';

const server = express();
server.use(express.json());
server.use(router);

export default server;
```

```typescript
// src/config/envs.ts
import 'dotenv/config';

export const PORT = process.env.PORT;
```

```typescript
// index.ts
import server from './server';
import { PORT } from './config/envs';

server.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT || 3000}`);
});
```

Creamos las carpetas routes, controllers y services

```typescript
// src/routes/index.ts
import { Router } from 'express';
import {
  createUser,
  getUsers,
  deleteUser,
} from './../controllers/usersControllers';

const router: Router = Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.delete('/users', deleteUser);

export default router;
```

```typescript
// src/controllers/userController.ts
import { Request, Response } from 'express';
import {
  getUserService,
  createUserService,
  deleteUserService,
} from './../services/userService';
import IUser from '../interfaces/IUser';

export const getUsers = async () => {};
export const createUsers = async (req: Request, res: Response) => {
  const { name, email, active } = req.body;
  const newUser: IUser = await createUserService({ name, email, active });
  res.status(201).json(newUser);
};
export const deleteUsers = async () => {};
```

```typescript
// src/services/userService.ts
import IUser from './../interfaces/IUser';
import IUser from './../dto/UserDto';

const users: IUser[] = [];
let id: number = 1;

export const getUserService = async () => {};
export const createUserService = async (userData: UserDto): Promise<IUser> => {
  const newUser: IUser = {
    id,
    name: userData.name,
    email: userData.email,
    active: userData.active,
  };
  users.push(newUser);
  id++;
  return newUser;
};
export const deleteUserService = async () => {};
```

Creamos una carpeta nueva llamada interfaces dentro de src

```typescript
// src/interfaces/IUser.ts

interface IUser {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export default IUser;
```

Creamos una carpeta nueva llamada dto dentro de src

```typescript
// src/dto/UserDto.ts

interface UserDto {
  name: string;
  email: string;
  active: boolean;
}

export default UserDto;
```

## CRUD de recursos

Ya hemos creado nuestro primer recurso. Puedes seguir agregando todos los que desees. ¿Qué utilizaremos en los siguientes ejemplos?

- **Lectura de recursos** -> Para la lectura de recursos crearemos una ruta GET que ejecutará un controlador para obtener todos los recursos. Luego responderemos con la lista completa de estos.
- **Actualización de recursos** -> Crearemos una ruta PUT para actualizar recursos existentes. En el controlador de la solicitud podremos asignar no sólo el tipo del recurso, sino también el valor recibido por params. Luego de esto, actualizamos y respondemos con el recurso actualizado. Si no existe, devolvemos un mensaje de error.
- **Eliminación de recursos** -> En este ejemplo, añadiremos una ruta DELETE para eliminar recursos. En este caso, solo necesitamos validar el tipo de dato recibido por params, ya que no construiremos un nuevo recurso, por lo que la interfaz no será necesaria. Luego verificamos. Si el recurso existe, lo eliminamos y respondemos con el recurso eliminado. Si este no existe, devolvemos un mensaje de error.

```typescript
// src/controllers/userController.ts
import { Request, Response } from 'express';
import {
  getUserService,
  createUserService,
  deleteUserService,
} from './../services/userService';
import IUser from '../interfaces/IUser';

export const createUser = async (req: Request, res: Response) => {
  const { name, email, active } = req.body;
  const newUser: IUser = await createUserService({ name, email, active });
  res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const users: IUser[] = await getUserService();
  res.status(200).json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  await deleteUserService(id);
  res.status(200).json({ message: 'User eliminado' });
};
```

```typescript
// src/services/userService.ts
import IUser from './../interfaces/IUser';
import UserDto from './../dto/UserDto';

let users: IUser[] = [];
let id: number = 1;

export const createUserService = async (userData: UserDto): Promise<IUser> => {
  const newUser: IUser = {
    id,
    name: userData.name,
    email: userData.email,
    active: userData.active,
  };
  users.push(newUser);
  id++;
  return newUser;
};

export const getUserService = async (): Promise<IUser[]> => {
  return users;
};

export const deleteUserService = async (id: number): Promise<void> => {
  users = users.filter((user: IUser) => user.id !== id);
};
```

Este CRUD básico de express y TypeScript muestra cómo gestionar recursos de manera estructurada. La implementación de estas operaciones proporciona una base sólida para el desarrollo de aplicaciones más complejas. Veamos ahora, cómo podemos definir middlewares con este lenguaje.

## Middlewares

### ¿Qué era un middleware?

Los middlewares son funciones que juegan un papel importante en el manejo de solicitudes y respuestas en express. Estas funciones “intermediarias” realizan una tarea concreta antes de que la request llegue a su destino. Teniendo en cuenta esto, vamos a ver la creación de middlewares con TypeScript.

### Tipado de middlewares

Vamos a crear una nueva carpeta llamada **middlewares** dentro de **src** en la cual agregaremos un archivo de nombre **autenticación.ts**. En este archivo vamos a definir un middleware para verificar si un usuario tiene o no autorización para acceder a cierto contenido de la API.

La estructura base de un middleware es una función que recibe como argumentos a **request, response y next**, que nos permiten tomar la solicitud, analizarla y continuar al endpoint designado por la ruta. Para ello, importamos las interfaces Request, Response y NextFunction.

```typescript
import { Requet, Response, NextFunction } from 'express';
```

También vamos a enviar en esta función un **token** para saber que el usuario está autenticado y que tiene permiso para acceder a la información devuelta por el método GET. Esta información se envía a través de algo llamado **"headers"** de la petición.

<mark>Un **header** es información adicional que acompaña a una solicitud y puede especificar, por ejemplo, el tipo de contenido que se envía (JSON, texto plano, etc.), la longitud del contenido y, en particular, datos de autenticación, como en nuestro caso.</mark>

Recibiremos el token a través de una propiedad headers del objeto request y validaremos si este coincide con la palabra “autenticado”. De ser así, la función next nos permitirá continuar con la petición. Caso contrario, se enviará un mensaje diciendo que no está autorizado.

Creamos la carpeta middlewares dentro de src

```typescript
// src/middlewares/auth.ts
import { Requet, Response, NextFunction } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const {token} = req.headers;

  if token === 'autenticado' {
    next();
  } else {
    res.status(400).json({message: 'Error unauthorized'});
  }
};

export default auth;
```

```typescript
// src/routes/index.ts
import { Router } from 'express';
import {
  createUser,
  getUsers,
  deleteUser,
} from './../controllers/usersControllers';
import auth from './../middleware/auth';

const router: Router = Router();

router.post('/users', createUser);
router.get('/users', auth, getUsers);
router.delete('/users', deleteUser);

export default router;
```

```typescript
// src/services/userService.ts
import IUser from './../interfaces/IUser';
import IUser from './../dto/UserDto';

let users: IUser[] = [{
  id: 1,
  name: 'Mauricio',
  email: 'mau@gmail.com',
  active: true
}];
let id: number = 2;

export const createUserService = async (userData: UserDto): Promise<IUser> => {
  const newUser: IUser = {
    id,
    name: userData.name,
    email: userData.email,
    active: userData.active,
  };
  users.push(newUser);
  id++;
  return newUser;
};

export const getUserService = async (): Promise<IUser[]> => {
  return users;
};

export const deleteUserService = async (id: number): Promise<void> => {
  users = users.filter(user: IUser => user.id !== id);
};
```

¡Excelente! Has construido tu primer middleware utilizando TypeScript. Como podemos ver, los middlewares se siguen comportando tal cual los conocemos con JavaScript, solo que con TypeScript crean una capa más de seguridad a partir de su tipado.

## Cierre

En esta clase exploramos la sinergia entre TypeScript y express, como la ventaja de unir estas tecnologías hasta la creación de middlewares con tipado estático. Aprendimos cómo estructurar nuestros proyectos a partir de un esquema organizado de archivos y directorios.

También vimos de qué manera configurar nuestro entorno de trabajo con node y TypeScript para generar adecuadamente un servidor y definir las posibles rutas. También aprovechamos el tipado estático para prevenir errores al momento de definir controladores y middlewares, cuyo comportamiento es el ya conocido en JavaScript.

## Homework

<details>
<summary>Ver</summary>

**ACTIVIDAD 01**

En esta actividad iremos paso a paso sobre los contenidos visto en la clase para la creación del servidor HTTP con express y TypeScript.

Si bien el paso a paso está disponible en la clase, podrás notar que el proceso es bastante extenso, por lo cual marcaremos para esta actividad los siguiente puntos a alcanzar:

- Instalación de todas las dependencias necesarias para generar correctamente nuestro entorno.

- Configuración de nodemon.json y los comandos del package.json para poder iniciar nuestro servidor con nodemon al ejecutar el comando correspondiente.

- Creación del scaffolding del proyecto.

- Configuración de la variable de entorno PORT en su módulo correspondiente.

- Creación de la instancia del servidor y ejecución en el módulo correspondiente.

**ACTIVIDAD 02**

A partir de este punto deberías tener tu servidor funcionando y esperando peticiones en el puerto indicado. Ahora empezaremos a crear muestreo flujo. Ten en cuenta que las entidades involucradas en nuestra aplicación serán:

- User: el usuario que se registra y utiliza nuestra aplicación.

- Appointment: el turno que puede reservar o cancelar el usuario.

- Credential: el par de “username” y “password” que registra cada usuario.

Rutas / endpoints a crear:

- /users

  - GET /users => Obtener el listado de todos los usuarios.

  - GET /users/:id => Obtener el detalle de un usuario específico.

  - POST /users/register => Registro de un nuevo usuario.

  - POST /users/login => Login del usuario a la aplicación.

- /appointments

  - GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.

  - GET /appointment => Obtener el detalle de un turno específico.

  - POST /appointment/schedule => Agendar un nuevo turno.

  - PUT /appointment/cancel => Cambiar el estatus de un turno a “cancelled”.

Para cada uno de los endpoints, crearemos su correspondiente controlador, el cual por el momento únicamente deberá responder al cliente con un mensaje en texto que indica cuál será la funcionalidad a ejecutar en cada caso.

**¡Bien hecho! TIPS**

- En el video de la clase tienes toda la información y pasos para poder realizar la actividad. Revisa la clase cuantas veces sea necesario, toma nota, y avanza paso a paso con la actividad.

- Apóyate en el uso de ThunderClient, Insomnia o Postman. Te servirán para probar tu aplicación en tiempo real.

**[REQUISITOS]**:

- Haber configurado correctamente la ejecución del proyecto.

- Haber configurado correctamente las variables de entorno.

- Haber creado un enrutador principal y dos enrutadores para users y appointments.

- Haber definido en cada enrutador los endpoints correspondientes a cada entidad.

- Haber implementado el controlador correspondiente para cada endpoint, los cuales deben responder con un mensaje en texto indicando la operación que se realizará en cada caso.

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
