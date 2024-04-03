---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 4 - NestJS Routing
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: NestJS Fundamentals
draft: false
category: Backend Js Nest
---

## Solicitudes HTTP

## Técnicas avanzadas

Como ya sabemos, la funcionalidad principal de un controlador es recibir las **solicitudes HTTP** enviadas a un **endpoint** determinado, procesar la lógica y devolver una respuesta acorde a la petición.

NestJS integra una herramienta simplificada para el manejo y enrutamiento de solicitudes. Esta se define por medio de clases que hacen uso del decorador **@Controller**. Este decorador recibe como argumento un **string** correspondiente a la ruta que lo inicializa.

Dentro de la clase correspondiente al decorador encontramos las acciones a llevarse a cabo en forma de funciones. Cada una de estas funciones estará asociada a un decorador concreto, según el tipo de petición **HTTP** a hacer: **@Get**, **@Post**, **@Put**, **@Delete**.

A través de los decoradores podemos acceder a muchas propiedades del request y del response, pero hay ocasiones en las que debemos acceder al request o response de Express.

```ts
// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('profile')
  getUserProfile() {
    return 'Datos del perfil de usuario';
  }

  @Get('profile/images')
  getUserImages() {
    return 'Restorna las imágenes del usuario';
  }

  @HttpCode(418)
  @Get('coffe')
  getUserCoffe() {
    return 'No puedo brindarte esa información';
  }

  @Get('message')
  getUserMessage(@Res() response: Response) {
    response.status(200).send('Mensaje del usuario');
  }

  @Get('request')
  getUserRequest(@Req() request: Request) {
    console.log(request);
    return 'Realizamos un console.log de request';
  }

  @Post()
  createUser() {
    return 'Usuario creado!!';
  }

  @Put()
  updateUser() {
    return 'Usuario modificado!!';
  }

  @Delete()
  deleteUser() {
    return 'Usuario eliminado!!';
  }
}
```

> Esta implementación solo será necesaria para casos muy específicos.

Ahora que conocemos el modelo y protocolo sobre el cual vamos a construir nuestro servidor, ha llegado el momento de definir el patrón de arquitectura que emplearemos.

## Extracción

## Parámetros de ruta

Nest proporciona una forma muy eficiente de extraer **información de las solicitudes** por medio del uso de decoradores. Estos simplifican la sintaxis común para acceder al objeto request que conocemos de express.

Podemos acceder a los **params** de la ruta (ejemplo en @Get(':id')), y a los query params (ejemplo en @Get()).

Ahora, la solicitud para llamar al endpoint a los endpoints de users sería:

- http://localhost:3000/users -> sin query params
- http://localhost:3000/users/1 -> params -> retorna solo el user 1
- http://localhost:3000/users?name=Mauri -> Query param name -> retorna solo el user 1

```ts
// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Res,
  Req,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('name') name?: string) {
    if (name) {
      return this.usersService.getUserByName(name);
    }
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUsersById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Get('profile')
  getUserProfile() {
    return 'Datos del perfil de usuario';
  }

  @Get('profile/images')
  getUserImages() {
    return 'Restorna las imágenes del usuario';
  }

  @HttpCode(418)
  @Get('coffe')
  getUserCoffe() {
    return 'No puedo brindarte esa información';
  }

  @Get('message')
  getUserMessage(@Res() response: Response) {
    response.status(200).send('Mensaje del usuario');
  }

  @Get('request')
  getUserRequest(@Req() request: Request) {
    console.log(request);
    return 'Realizamos un console.log de request';
  }

  @Post()
  createUser() {
    return 'Usuario creado!!';
  }

  @Put()
  updateUser() {
    return 'Usuario modificado!!';
  }

  @Delete()
  deleteUser() {
    return 'Usuario eliminado!!';
  }
}
```

```ts
// users.service.ts
import { Injectable } from '@nestjs/common';

import { UsersRespository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository,
  @Inject('API_USERS') private apiUsers: ApiUsers: any[]) {}

  async getUsers() {
    const dbUsers = await this.usersRepository.getUsers();
    const users = [...dbUsers, ...this.apiUsers];
    return users:
  }

  getUserById(id) {
    return this.usersRepository.getById(id);
  }

  getUserByName(name) {
    return this.usersRepository.getByName(name);
  }
}
```

```ts
// users.repository.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      name: 'Mauri',
      email: 'mauri@mail.com',
    },
    {
      id: 2,
      name: 'Paola',
      email: 'pao@mail.com',
    },
    {
      id: 3,
      name: 'Nancy',
      email: 'nan@mail.com',
    },
  ];

  async getUsers() {
    return this.users;
  }

  async getById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async getByName(name: string) {
    return this.users.find((user) => user.name === name);
  }
}
```

## Gestión del cuerpo de solicitudes

Para extraer información del cuerpo de la solicitud tenemos acceso al decorador **@Body**. Este permite recuperar datos enviados por el cliente mediante solicitudes de tipo **POST**, **PUT** o **PATCH** en forma de objeto.

Tembién veremos como extraer información de la cabecera del request. Podemos inplementar que el endpoint /profile solo responda cuando en el header llegue un token.

Crearemos una interface para el usuario que recibiremos en el body del request.

```ts
// src/users/user.interface.ts
export interface User {
  id: number;
  name: string;
  email: string;
}
```

```ts
// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Res,
  Req,
  Param,
  Body,
  Headers,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('name') name?: string) {
    if (name) {
      return this.usersService.getUserByName(name);
    }
    return this.usersService.getUsers();
  }

  @Get('profile')
  getUserProfile(@Headers('token') token?: string) {
    if (token !== '1234') return 'Unathorized';
    return 'Datos del perfil de usuario';
  }

  @Get('profile/images')
  getUserImages() {
    return 'Restorna las imágenes del usuario';
  }

  @HttpCode(418)
  @Get('coffe')
  getUserCoffe() {
    return 'No puedo brindarte esa información';
  }

  @Get('message')
  getUserMessage(@Res() response: Response) {
    response.status(200).send('Mensaje del usuario');
  }

  @Get('request')
  getUserRequest(@Req() request: Request) {
    console.log(request);
    return 'Realizamos un console.log de request';
  }

  @Get(':id')
  getUsersById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Put()
  updateUser() {
    return 'Usuario modificado!!';
  }

  @Delete()
  deleteUser() {
    return 'Usuario eliminado!!';
  }
}
```

```ts
// users.service.ts
import { Injectable } from '@nestjs/common';

import { UsersRespository } from './users.repository';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository,
  @Inject('API_USERS') private apiUsers: ApiUsers: any[]) {}

  async getUsers() {
    const dbUsers = await this.usersRepository.getUsers();
    const users = [...dbUsers, ...this.apiUsers];
    return users:
  }

  getUserById(id) {
    return this.usersRepository.getById(id);
  }

  getUserByName(name) {
    return this.usersRepository.getByName(name);
  }

  createUser(user: Omit<User, 'id'>): Promise<User> {
    return this.usersRepository.createUser(user);
  }
}
```

```ts
// users.repository.ts
import { Injectable } from '@nestjs/common';

import { User } from './user.interface';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      name: 'Mauri',
      email: 'mauri@mail.com',
    },
    {
      id: 2,
      name: 'Paola',
      email: 'pao@mail.com',
    },
    {
      id: 3,
      name: 'Nancy',
      email: 'nan@mail.com',
    },
  ];

  async getUsers() {
    return this.users;
  }

  async getById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async getByName(name: string) {
    return this.users.find((user) => user.name === name);
  }

  async createUser(user: Omit<User, 'id'>) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { id, ...user };
  }
}
```

<mark>Esta tarea de limitar el acceso a ciertas rutas es realmente importante para asegurar que el contenido solo sea accesible para clientes con la debida autorización. </mark>

La implementación de las **cabeceras** es una alternativa que puede ser empleada en algunos casos, pero vamos a aprender una forma más eficiente de proteger las rutas de nuestra aplicación.

## Guardianes

## Implementación de guardianes

Los **guardianes** son clases inyectables cuya tarea es determinar si una solicitud recibida en el controlador debe o no continuar su ejecución. Lo anterior, de acuerdo a ciertos parámetros de seguridad definidos dentro del guardián. En otras palabras, **actúan como filtros** que pueden permitir o denegar el acceso a ciertas rutas o recursos, si se cumplen o no algunas condiciones.

```bash
  Client side --- HTTP Request ---> Guard ------> Route Handler
```

Estos guardianes tienen una función similar a la de un middleware de autorización, pero su ejecución es mucho más eficiente. A diferencia del middleware, los **guardianes** por naturaleza tienen acceso directo al contexto de ejecución de la aplicación, lo que les permite trabajar de forma declarativa y no estar atados al uso del **next()**.

De esta manera, cuentan con una mayor flexibilidad al momento de ser definidos dentro del controlador. Para implementar un guardián, se debe hacer uso del decorador **@Injectable** que tienen acceso al contexto de ejecución, gracias a **ExecutionContext**.

Esta clase de NestJS proporciona acceso a los procesos de ejecución de la aplicación. Cada guard utiliza también la interfaz **CanActivate**, que actúa como filtro para determinar si una solicitud continua o no su recorrido. La resolución del **guardián** es devuelta como una **Promesa** o un **Observable** que finalmente se resuelve como un booleano que determina el acceso a la solicitud.

<mark>Un observable es una estructura de datos que puede emitir múltiples valores de forma asíncrona para permitir la toma de decisiones con respecto a estos valores. </mark>

La estructura base de un guardián podría ser la siguiente...

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

function validateRequest(request) {
  // Logica de validación de la request
}

@Injectable()
class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.swithToHttp().getRequest();
    return validateRequest(request);
  }
}
```

Utilizamos la función canActivate que recibe como argumento a ExcecutionContext y devuelve un dato de tipo promesa u observable, dependiendo si el proceso se realiza async o no.

Volviendo a la demo, la forma que utilizamos para proteger una ruta (@Get('profile')), a través de un if, es poco mantenible. Aquí, es donde los guardianes nos pueden ayudar. Trasladamos la lógica al guardian y luego podemos retulizarlo en otros endpoints.

En /src creamos la carpeta guards.

```ts
// src/guards/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

function validateRequest(request: Request) {
  const token = request.header('token');
  return token === '1234';
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

Impementamos el guardian en users.controller (@Get('profile/images')).

```ts
// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Res,
  Req,
  Param,
  Body,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { AuthGuard } from './../guards/auth.guard';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('name') name?: string) {
    if (name) {
      return this.usersService.getUserByName(name);
    }
    return this.usersService.getUsers();
  }

  @Get('profile')
  getUserProfile(@Headers('token') token?: string) {
    if (token !== '1234') return 'Unathorized';
    return 'Datos del perfil de usuario';
  }

  @Get('profile/images')
  @UseGuards(AuthGuard)
  getUserImages() {
    return 'Restorna las imágenes del usuario';
  }

  @HttpCode(418)
  @Get('coffe')
  getUserCoffe() {
    return 'No puedo brindarte esa información';
  }

  @Get('message')
  getUserMessage(@Res() response: Response) {
    response.status(200).send('Mensaje del usuario');
  }

  @Get('request')
  getUserRequest(@Req() request: Request) {
    console.log(request);
    return 'Realizamos un console.log de request';
  }

  @Get(':id')
  getUsersById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Put()
  updateUser() {
    return this.usersService.updateUser(user);
  }

  @Delete()
  deleteUser() {
    return 'Usuario eliminado!!';
  }
}
```

Ahora, si accedemos a la rura https://localhost:3000/users/profile/images sin un token válido obtendremos un statusCode 403.

<mark>**Primero se ejecutan los middlewares y luego se ejecutan las guardias**</mark>

Otra alternativa es utilizar el guardian a la altura de la clase (del controlador). **De esta manera, protegemos todas las rutas**.

También podriamos realizar una protección a nivel global. Existen dos formas de hacerlo.

- En main.ts:

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { loggerGlobal } from './middlewares/logger.middleware';
// import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard());
  app.use(loggerGlobal);
  await app.listen(3000);
}
bootstrap();
```

- En un módulo:

```ts
// app.module.ts
import { Module }  from '@nestjs/common' ;
// import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UserModule, TodosModule]
  contreollers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ]
})

export class app.module {}

```

Como último tema de esta clase hablaremos de otra herramienta que nos permite llevar a cabo acciones al momento en el que una solicitud es recibida dentro de nuestra servidor: **interceptores**.

## Interceptores

## Manipulación de flujo de datos

En términos generales, un **interceptor** es una clase inyectable que permite “interceptar” una solicitud o respuesta y modificar la información contenida en esta, antes de que la solicitud llegue al controlador o antes de que la respuesta sea devuelta al cliente.

![Interceptors](/astro-doc-full-stack/images/henry/m4/clase4/routing.webp)

A diferencia de los middlewares y los guards, **los interceptores estan pensados para hacer modificaciones a los requests**

A demás de tener acceso al contexto, al igual que los guardianes, tienen acceso a next(), lo que nos permite ejecutar un interceptor detrás de otro, incluso antes o despues del esnpoint en sí.

En la demo crearemos una carpeta llamada src/interceptors y un archivo llamado date-adder.interceptor.ts que modifique el request para guardar un dato adicional (ejemplo la fecha en la que se realizó el request). Lo utilizaremos en el método post del users.controller.

```ts
// date-adder.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DataAdderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const now = new Date();
    const format = now.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const request = context.switchToHttp().getRequest();
    request.now = format;
    return next.handle();
  }
}
```

```ts
// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Res,
  Req,
  Param,
  Body,
  Headers,
  UseGuard,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ...

  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: User, @Req() request: Request & { now: string }) {
    console.log('Request en enpoint post', request, now);
    return this.usersService.createUser(user);
  }

  // ...
}
```

También podemos crear interceptores globales de dos maneras.

- En main.ts:

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { loggerGlobal } from './middlewares/logger.middleware';
// import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInteceptors(new MyInterceptor())
  app.use(loggerGlobal);
  await app.listen(3000);
}
bootstrap();
```

- En un módulo:

```ts
// app.module.ts
import { Module }  from '@nestjs/common' ;
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UserModule, TodosModule]
  contreollers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: MyInterceptor,
    // },
  ]
})

export class app.module {}

```

- **LogginInterceptor**: Intercepta las solicitudes HTTP para realizar un seguimiento de los tiempos de respuesta y registrarlos en un archivo.

- **AuthorizationInterceptor**: Verifica los encabezados de autorización en las solicitudes entrantes y permite o niega el acceso a las rutas protegidas según los permisos del usuario.

- **TransformInterceptor**: Transforma la respuestade una solicitud para que coincida con un formato específico antes de enviarla al cliente, como convertir todas las respuestas JSON o XML.

- **CacheInterceptor**: Almacena en caché las respuestas de las solicitudes para mejorar el rendimiento, evitando así las llamadas innecesarias a recursos externos.

**ErrorHandlerInterceptor**: Captura errores en las solicitudes y genera respuestas de error coherentes para proporcionar una experiencia de usuario consistente.

Hemos visto en esta sección, cómo los **interceptores** permiten llevar a cabo acciones antes o después de que una solicitud entre al controlador e incluso luego de que se envíe una respuesta.

## Cierre

En esta clase hemos aprendido a gestionar las distintas solicitudes HTTP dentro de un servidor a través del enrutamiento, así como a definir y organizar las rutas de nuestra aplicación de manera clara.

También logramos definir controladores para distintas tareas, obtener los valores y la información que provienen de la solicitud, y responder adecuadamente según la petición realizada por el cliente.

Además, introdujimos el concepto de guardianes, que permiten implementar una capa de seguridad adicional para proteger nuestras rutas.

Por último, conocimos a los interceptores, con los cuales hemos descubierto cómo podemos modificar y controlar el flujo de las solicitudes HTTP para agregar funcionalidades como el registro, la transformación de datos y la gestión de errores.

![Mapa de conceptos](/astro-doc-full-stack/images/henry/m4/clase4/mapa.webp)

## Homework

### ACTIVIDAD 01

Crear todos los endpoints CRUD para Products y Users (GET, GET{id}, POST, PUT{id}, DELETE{id}).

### ACTIVIDAD 02

Desarrollar la lógica de creación, listado y eliminación desde el repository.

- GET debe devolver la lista de elementos, y httpStatus = 200.

- GET{id} debe devolver el elemento con id pedido, y httpStatus = 200.

- En el caso de Users, no devolver el password.

- POST debe devolver el id de la entidad creada, y httpStatus = 201.

- PUT{id} y DELETE{id} pueden devolver el id de la entidad editada/eliminada y httpStatus 200.

### ACTIVIDAD 03

Validar en POST y PUT que la estructura de la entidad corresponda a la estructura de cada entidad.

### ACTIVIDAD 04

El método GET puede recibir como query params los valores page y limit.

- Si no recibe el parámetro page, el valor por defecto es 1.

- Si no recibe el parámetro limit, el valor por defecto es 5.

- **Bonus**: Implementar la lógica desde el repositorio, para paginar las entradas devuelvas.

### ACTIVIDAD 05

Crear el endpoint POST /auth/signin, que reciba email y password.

- Para el login se utilizarán las credenciales email / password.

- Inyectar el usersRepository para poder hacer consultas.

- No se procederá al login si faltan alguna de las dos credenciales.

- No se procederá con el login en caso de que no exista un usuario registrado con la dirección de email proporcionada.

- En caso de que el usuario no exista o la contraseña proporcionada no coincida con la registrada, se deberá enviar una única respuesta para cualquiera de los casos. Ej: “Email o password incorrectos”. NOTA: Por seguridad es preferible no especificar cuál de los dos datos ha fallado en su verificación.

### ACTIVIDAD 06

Dentro de la carpeta Auth, crear una guarda AuthGuard, que debe verificar lo siguiente...

- Debe existir un header Authorization.

- Dicho header, tiene que tener una estructura como la siguiente: Basic: &lt;email&gt;:&lt;password&gt;.

- NO validaremos por ahora que sea un email y un password válido, únicamente verificar si el header es enviado y continente un email y un password.

- Todos los endpoints de Users, salvo el POST, deben utilizar esta guarda.

- Todos los endpoints de Products, salvo el GET y el GET{id} deben utilizar esta guarda.

**TIPS ¡Bien hecho!**

- No te preocupes por ahora por el manejo de errores, la ruta de autenticación puede devolver strings únicamente.

**[REQUISITOS]**:

- Al finalizar e ste hito el proyecto debe contar con una ruta para cada una de las acciones correspondientes al CRUD de cada entidad.

- La lógica de estas tareas deberá estar encapsulada en el repositorio correspondiente.

- Los endpoints deberán ser validados para asegurar la integridad de la información recibida en la solicitud.

- Las rutas deberán ser protegidas por una guarda.

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
