---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 6 - NestJS Pipes
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: NestJS Pipes
draft: false
category: Backend Js Nest
---

## Validación de solicitudes

################################################

**Validación avanzada de solicitudes**

- En Nest, contamos con herramientas conocidas como Pipes.
- Estas trabajan interceptando las solicitudes para hacer validaciones, antes de que sean manejados por el controlador.
- Las pipes pueden ser implementadas con dos finalidades: **transformar la información a un formato deseado** y **validar los datos de la solicitud**.

**Uso de pipes predeterminados y sus características**

Existen nueve pipes predeterminadas de Nest que se utilizan para transformar o validar los datos de entrada en un formato específico antes de ser procesados por los controladores.

- **ValidationPipe**: Valida los datos de la solicitud HTTP según la regla establecida.
- **ParseIntPipe**: Establece la entrada como dato numérico.
- **ParseFloatPipe**: Convierte a dato tipo flotante.
- **ParseBoolPipe**: Transforma a valor booleano.
- **ParseArrayPipe**: Muta la entrada a un arreglo.
- **ParseUUIDPipe**: Verifica y transforma a formato UUID.
- **ParseEnumPipe**: Valida y convierte a un tipo enumerado.
- **DefaultValuePipe**: Establece un valor predeterminado si no se proporciona uno.
- **ParseFilePipe**: Facilita el manejo de archivos en las solicitudes.

**parseUUIDPipe**

- Trata de transformar un valor recibido por argumento dentro de un controlador al dato correspondiente y en caso de fallar, devuelve un error.

**Creación de pipes personalizados**

- Los **pipes** son clases inyectables de Nest que implementan la interfaz **PipeTransform de @nestjs/common**.
- Dicha interfaz contiene al método **transform** que recibe dos argumentos.
- El primero es **value**, considerado como el valor del argumento que se desea evaluar.
- El segundo, **metadata**, que contiene información adicional del argumento como el tipo de dato, origen, etc
- La creación de validaciones personalizadas se estructuran por medio de la clase **ValidationPipe**.
- Necesitas indicar a la aplicación que utilizaremos a **ValidationPipe**, dentro del archivo principal **main.ts**.
- A pesar de que esta opción de protección se habilita de forma global, la aplicación de las reglas de validación del DTO solo son hechas dentro del endpoint que definamos explícitamente.

**Data Transfer Object**

- Los **DTO** son clases que definen la estructura de un objeto en particular.
- Verifican que el cuerpo de una solicitud coincida con estas especificaciones.
- Con frecuencia, se hace uso de librerías como **class-validator** o **class-transformer**.
- Estas nos proveen funciones de validación que pueden ser aplicadas por medio de decoradores haciendo más eficiente el desarrollo.

**class-transformer / class-validator**

- El trabajo de **class-transformer** será transformar los objetos recibidos en instancias de una clase, para que puedan ser
  validados mediante los decoradores de **class-validator**.

################################################

## Validación avanzada de solicitudes

Las validaciones de la información recibida de las solicitudes al servidor, como por ejemplo verificar que el email proporcionado sea válido y único en nuestra base de datos, son de suma importancia para garantizar que estos cumplan con ciertos criterios antes de ser procesados.

Dichas validaciones pueden ayudar a prevenir errores y vulnerabilidades, además de garantizar la integridad de la información.

En Nest, contamos con herramientas conocidas como **Pipes (tuberías)** que trabajan interceptando las solicitudes para hacer validaciones, antes de que sean manejados por el controlador.

Las **pipes** pueden ser implementadas con dos finalidades: transformar la información a un formato deseado y validar los datos de la solicitud.

> Dentro de Nest JS contamos con **pipes preconstruidas** diseñadas para manejar las validaciones y transformaciones más comunes.

## Uso de pipes predeterminados y sus características

Existen **nueve pipes** predeterminadas de Nest que se utilizan para transformar o validar los datos de entrada en un formato específico antes de ser procesados por los controladores, estas son:

- La **transformación** implica modificar la estructura o el formato de los datos recibidos para ajustarse a las necesidades de la aplicación. Por ejemplo, convertir tipos de datos, como cadenas de texto a números, aplicar transformaciones de fechas o realizar conversiones de formatos.

- El **saneamiento**, por su parte, implica validar y limpiar los datos recibidos para garantizar que sean seguros y consistentes antes de ser utilizados por la aplicación. Esto puede incluir la validación de formatos, la eliminación de caracteres no deseados, entre otras cosas.

La idea detrás de las pipes de **Parse\***, es tratar de transformar un valor recibido por argumento dentro de un controlador al dato correspondiente (integer, float, boolean,etc) y en caso de fallar, devolver un error.

Veamos un ejemplo sobre **parseUUIDPipe**.

```ts
// src/users/users.entity.ts
import { Entity, Colunm, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Colunm();
  name: string;

  @Colunm();
  email: string;

  @Colunm();
  createdAt: string;
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
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import { usersDBService } from './usersDB.service';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService
  ) {}

  // ...

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersDBService.getUserById(id);
  }

  // ...
}
```

```ts
// usersDB.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersDBService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  getUserById(id: string) {
    this.usersRepository.findOne({ where: { id } });
  }
}
```

Si ejecutamos el endpoint http://localhost:3000/users/1 obtendremos el error de tipo 500 (Internal Server Error) indicando que "2" no es un valor válido para el tipo uuid.

Deberíamos modificar el controlador incorporando los pipes para validar.

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
  parseUUIDPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import { usersDBService } from './usersDB.service';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService
  ) {}

  // ...

  @Get(':id')
  getUserById(@Param('id', parseUUIDPipe) id: string) {
    return this.usersDBService.getUserById(id);
  }

  // ...
}
```

Si ejecutamos nuevamente el request obtendremos un error tipo 400 (Bad Request) con el
mensaje "Validation failed (uuid as expected)".

<mark>A pesar de contar con una amplia gama de pipes de validación, es probable que en ocasiones se necesite de un pipe personalizado que nos permita realizar una evaluación más particular de la información de la solicitud. </mark>

## Pipes personalizados en Nest JS

## Creación de pipes personalizados para satisfacer requisitos específicos

Estructuralmente hablando, las **pipes** son clases inyectables de Nest que implementan la interfaz **PipeTransform** de **@nestjs/common**.

- **Value**: considerado como el valor del argumento que se desea evaluar
- **Metadata**: que contiene información adicional del argumento como el tipo de dato. origen, etc.

Su estructura lucirá así:

```ts
import { PipeTransform, Injectable, ArgumentMetadata } from '"nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }

  return go(f, seed, [])
}
```

<mark>Dentro de esta clase de validación, podemos incluir cualquier tipo de lógica que nos permita verificar la información recibida dentro de la solicitud:</mark>

```ts
import { PipeTransform, Injectable, ArgumentMetadata } from '"nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (!value.name && value.email) {
        return value;
      }
    } catch(error) {
      throw new Error('Información incompleta');
    }
  }
  return go(f, seed, [])
}
```

> Si bien podemos generar pipes de forma manual y podríamos continuar construyendo un ejemplo en torno a este pipe, la realidad es que en la práctica la creación de validaciones personalizadas se estructuran por medio de la clase **ValidationPipe**.

El primer paso será definir las propiedades que esperamos contenga el cuerpo de la solicitud mediante algo llamado **Data Transfer Object (DTO)** por sus siglas.

Los **DTO** son clases que definen la estructura de un objeto en particular y se emplean para verificar que el cuerpo de una solicitud coincida con estas especificaciones.

Para simplificar esta validación, con frecuencia, se hace uso de librerías como **class-validator** o **class-transformer**.

Estas **librerías** nos proveen de ciertas funciones de validación que pueden ser aplicadas por medio de decoradores haciendo más eficiente el desarrollo.

Por ejemplo:

```ts
import { IsString, IsInt } from 'class-validator';

export class MyDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
```

Definamos un **DTO** para las solicitudes de creación de usuarios dentro de nuestra aplicación. En una nueva carpeta dentro de src que nombraremos **dtos**, agregaremos un archivo **usersBody.dto.ts**. En este último, crearemos una clase con las propiedades que esperamos recibir dentro del cuerpo de la solicitud de la ruta POST para crear un usuario.

- En este caso, utilizaremos el decorador **@IsString** para validar que las propiedades cumplan con este requisito.

No olvides instalar la librería **class-validator** y **class-transformer**
desde tu terminal, con el comando:

```bash
npm i class-validator class-transformer
```

El trabajo de **class-transformer** será transformar los objetos recibidos en instancias de una clase, para que puedan ser validados mediante los decoradores de **class-validator**.

- Este proceso de transformación ocurre detrás de cámaras al momento de procesar una solicitud.

La estructura de **usersBodyDto** incluirá las mismas propiedades de nuestra entidad y agregaremos algunas reglas de validación con los decoradores **@IsString**, **@IsEmail** e **@IsNotEmpty**.

Si deseas conocer más decoradores de validación, ingresa a la documentación:
https://www.npmjs.com/package/class-validator#validation-decorators

Estos decoradores serán aplicados en todas las propiedades exceptuando id y createdAt, dado que estos no se reciben dentro de la solicitud, sino que son creados al agregar al usuario a la base de datos.

En la demo crearemos un dto para user.

```ts
// CreateUser.dto.ts
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
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
  UseGuard,
  UseInterceptors,
  parseUUIDPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import { usersDBService } from './usersDB.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService
  ) {}

  // ...

  @Get(':id')
  getUserById(@Param('id', parseUUIDPipe) id: string) {
    return this.usersDBService.getUserById(id);
  }

  @Post()
  createUser(
    @Body() user: CreateUserDto,
    @req() request: Request & { now: string }
  ) {
    return this.userDbRepository.saveUser({ ...user, createdAt: request.now });
  }

  // ...
}
```

```ts
// usersDB.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersDBService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  getUserById(id: string) {
    this.usersRepository.findOne({ where: { id } });
  }

  saveUser(user: Omit<User, 'id'>) {
    this.userRepository.save(user);
  }
}
```

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { loggerGlobal } from './middlewares/logger.middleware';
// import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // que se ejecuten los validation pipes para todos los requests
  app.useGolbalPipes(new validationPipe());
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInteceptors(new MyInterceptor())
  app.use(loggerGlobal);
  await app.listen(3000);
}
bootstrap();
```

De esta manera, los datos del request (body) deberán coincidir con la especificación que realizamos en el dto, sino obtendremos un error dfe tipo 400 (Bad Request).

Hasta aquí, hemos abordado el concepto de **pipe personalizado**, herramientas que permiten validar y manipular de forma customizada los datos recibidos en una solicitud.

## Transformación y saneamiento de datos

###############################################

**Técnicas de transformación y saneamiento**

**Transformación**

- Implica modificar la estructura o el formato de los datos recibidos para ajustarse a las necesidades de la aplicación.

**Saneamiento**

- Implica validar y limpiar los datos recibidos para garantizar que sean seguros y consistentes antes de ser utilizados por la aplicación.

**Eliminación de propiedades**

- **ValidationPipe** se implementa para deshacernos de propiedades que pueden estar incluidas dentro de la solicitud que
  ingresa al controlador.
- Para realizar esta limpieza, debes asignar la propiedad **whitelist** de **ValidationPipe** a **true**.

**Transformación de datos**

- Esta transformación se emplea cuando se extrae información de la solicitud.
- La transformación puede ser realizada de manera global o local.
- En caso de un pipe local, unirlo al método en cuestión por medio del decorador **@UsePipes** que recibe como argumento una instancia de **ValidationPipe**.

###############################################

## Técnicas de transformación y saneamiento

Las pipes pueden ser utilizadas no solo para llevar a cabo la validación de datos, sino también para realizar **la transformación y el saneamiento** de estos.

## Coherencia de datos con pipes

Veamos algunos de los usos de los pipes para realizar el saneamiento y transformación de datos.

Si enviamos un request (POST) para crear un user, nada impide que agreguemos mas información al body, como age: 42.

La solicitud se ejecuta correctamente, pero hacemos la diferenciación de acuerdo al tipo de motor de BD que utilicemos.

- En el caso de un base de datos de tipo relacional, el campo no se encuentra definido por lo que será ignodaro, pero

- En una base de datos NoSQL, corremos el riesgo de guardar información en el documento que no debería existir.

La forma de ignorar estos datos "adicionales" es:

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { loggerGlobal } from './middlewares/logger.middleware';
// import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // que se ejecuten los validation pipes para todos los requests
  app.useGolbalPipes(
    new validationPipe({
      // Ignora los campos adicionales que no se encuentran definidos en el dto
      whitelist: true,
    })
  );
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInteceptors(new MyInterceptor())
  app.use(loggerGlobal);
  await app.listen(3000);
}
bootstrap();
```

Otro caso común a tener en cuenta ocurre en las peticiones donde enviamos un id (numérico) como para parámetro. Recordemos que los parátros son de tipo string por lo que debemos transformarlos a número.

```ts
// todos.controller.ts
import { Controller } from '@nestjs/common';

import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getTodos(@Param('id') id: number) {
    return this.todosService.getTodo(id);
  }
}
```

Hasta ahora, hemos visto cómo realizar **transformaciones** y **validaciones** de la información que recibimos de las solicitudes mediante el uso de pipes.

Pero... ¿qué sucede cuando se presenta algún **error** en particular?

## Manejo de errores

######################################

**Manejo de errores**

- Una gran ventaja de trabajar con Nest, es que la mayoría de las características que implementa están construidas para retornar errores descriptivos.
- Al momento de no cumplir con una validación impuesta por algún decorador de la librería class-validator, devuelve un error con un status y mensaje asociado a la validación fallida.

**¿Qué sucede con aquellos errores que no son manejados correctamente?**

- Dentro de Nest, los errores que no son controlados por alguna función o librería son procesados por medio de la **capa de excepciones (Exceptions Layer)**.
- Esta herramienta se encarga de procesar cualquier error dentro de la aplicación que no haya sido considerado dentro del manejo de errores en el código.

**HttpException**

- Es una clase incorporada a Nest que se encuentra configurado de manera predeterminada y puede ser empleado para generar excepciones personalizadas con status y cuerpo definidos por la aplicación.
- Este manejo de errores puede ser asignado en un bloque try/catch dentro de la ruta para definir la excepción.

**Exception Filters Preconstruidos**

- BadRequestException
- UnauthorizedException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- HttpVersionNotSupportedException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableEntityException
- InternalServerErrorException
- NotImplementedException
- ImATeapotException
- MethodNotAllowedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException
- PreconditionFailedException

**NotFoundException**

- Podes agregar como argumento un string con un mensaje personalizado de error.

**BadRequestException**

- Recibe como argumento un objeto con un mensaje de alerta y los errores que encapsulamos y lo devolverá al cliente con un status 400.

######################################

Una gran ventaja de trabajar con Nest, es que la mayoría de las características que implementa están construidas para **retornar errores** descriptivos como vimos por ejemplo en el caso de los pipes.

En estos casos, al momento de no cumplir con una validación impuesta por algún decorador de la librería **class-validator**, nos devolvió un error con un status y mensaje asociado a la validación fallida.

> En este caso el **mensaje y status** son definidos internamente por la librería y devueltos al cliente de manera automática por medio del pipe implementado.

Pero, ¿qué ocurre con los **errores** que no se encuentran definidos por una librería o que no son detectados por medio de pipes? En otras palabras... ¿qué sucede con aquellos errores que no son manejados correctamente?

- Dentro de Nest, los errores que no son controlados por alguna función o librería son procesados por medio de la capa de excepciones (Exceptions Layer).

- Esta herramienta se encarga de procesar cualquier error dentro de la aplicación que no haya sido considerado dentro del manejo de errores en el código.

En términos generales, las excepciones son procesadas por los **exception filters**.

- Por defecto, la capa de excepciones recibe los errores no manejados y se encarga de devolver una respuesta genérica al usuario que le indique que algo ha ocurrido.

Generemos un error dentro de alguna ruta de la aplicación para ver cuál es su respuesta.

Tomemos, por ejemplo, la **ruta delete** dentro del controlador de usuarios en la cual forzaremos la devolución de un error:

```ts
@Delete()
deleteUser() {
  throw new Error();
}
```

> Este es un **error** que no emite ningún tipo de información. Simplemente indica que algo salió mal y no se tiene forma de procesarlo, pero es una respuesta al fin y al cabo.

Si prestamos atención en la consola veremos que este error ha sido procesado por **ExceptionHandler**. Este es precisamente el exception filter por default de Nest y su capa de excepciones llamado **HttpException**.

"**HttpException** es una clase incorporada a Nest que se encuentra configurado de manera predeterminada y puede ser empleado para generar excepciones personalizadas con status y cuerpo definidos por la aplicación."

Usemos esta clase para enviar una **excepción personalizada** al usuario dentro de la misma ruta.

Recibirá dos argumentos:

- El primero, un objeto donde definimos el status así como el mensaje de error que deseamos enviar.

- El segundo, nuevamente el status que deseamos enviar.

La razón de esto es que:

- El primero es para construir el objeto que se devuelve al cliente.

- El segundo es el que se detecta para marcar la solicitud con el estado correspondiente.

**ExceptionHandler**

Hasta el momento dejamos que Nest se encargue de manejar las excepciones por nosotros, pero Nest también nos permite que retornemos un error específico.

Como ejemplo utilizaremos un endopoint Get('coffee')

```ts

@Get('coffee')
getCoffee() {
  try {
    throw new Error()
  } catch (err) {
    throw new HttpException({
      {
        status: HttpStatus.I_AM_A_TEAPOT,
        error: "Envío de café fallido",
      },
      HttpStatus.I_AM_A_TEAPOT
    })
  }
}

```

Así como existe el HttpException que podemos configurar, Nest nos brinda excepciones por cada tipo de error http.

```ts

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersDBService.getUserById(id);

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    return user
  }
```

El resultado será:

```json
{
  "message": "Usuario no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

De esta manera, estandarizamos lo errores que retornamos desde la API. Aunque si lo deseamos podemos modificar la estructura de errores modificando el main:

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { loggerGlobal } from './middlewares/logger.middleware';
// import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // que se ejecuten los validation pipes para todos los requests
  app.useGolbalPipes(
    new validationPipe({
      // Ignora los campos adicionales que no se encuentran definidos en el dto
      whitelist: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return {
            property: error.property,
            constraints: error.constraints,
          };
        });
        return new BadRequestException({
          alert: 'Se han detectado los siguientes errores en la petición',
          errors: cleanErrors,
        });
      },
    })
  );
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInteceptors(new MyInterceptor())
  app.use(loggerGlobal);
  await app.listen(3000);
}
bootstrap();
```

Hemos visto en esta sección cómo realizar un adecuado manejo de errores, sea mediante la capa de excepciones integrada de Nest o a partir de mensajes personalizados y descriptivos.

## Cierre

En esta clase hemos ahondado aún más en las distintas características proporcionadas por Nest...

Aprendimos a realizar transformaciones y validaciones de datos de manera estructurada y reutilizable mediante el uso de pipes, una funcionalidad que nos permite garantizar la integridad y la coherencia de nuestros datos de entrada.

Además, hemos descubierto cómo personalizar nuestros propios pipes para adaptarlos a las necesidades específicas de nuestras aplicaciones.

Por otro lado, hemos profundizado en el manejo de excepciones, comprendiendo la importancia de capturar y manejar excepciones de manera centralizada y significativa, para proporcionar una experiencia de usuario fluida y confiable.

Mediante el uso de filtros globales de excepciones, excepciones HTTP integradas y la creación de excepciones personalizadas, hemos aprendido a transformar excepciones en respuestas descriptivas y significativas para nuestros clientes.

## Homework

### ACTIVIDAD 01

Implementar el global pipe de Class-Validator.

### ACTIVIDAD 02

Crear los DTOs CreateUserDto y CreateOrderDto, e implementarlos en los POST y PUT correspondientes

**CreateUserDto**

- name: Se requiere que el nombre no esté vacío, sea una cadena de al menos 3 caracteres y no supere los 80 caracteres de longitud.
- email: El correo electrónico debe tener una estructura válida según el estándar de direcciones de correo electrónico.
- password: La contraseña debe cumplir con los siguientes criterios:
  - Debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&\*
  - Debe tener una longitud mínima de 8 caracteres y una longitud máxima de 15 caracteres.
- address: La dirección debe tener una longitud mínima de 3 caracteres y no superar los 80 caracteres de longitud.
- phone: El número de teléfono debe estar presente y ser un número.
- country: El país debe ser una cadena de texto de al menos 5 caracteres y no superar los 20 caracteres de longitud.
- city: La ciudad debe ser una cadena de texto de al menos 5 caracteres y no superar los 20 caracteres de longitud.

**CreateOrderDto**

- Validar que el email tenga una estructura válida
- Validar que el password contenga:

  - al menos una minúscula
  - al menos una mayúscula
  - al menos un caracter numérico
  - un largo mínimo de 8 caracteres
  - un largo máximo de 15 caracteres
  - al menos uno de los siguientes caracteres = !@#$%^&\*

- Validar para el resto de campos, que se condigan con el dato de la BD, y que los campos string no superen el largo definido en la entidad

### ACTIVIDAD 03

Crear el dto LoginUserDto, e implementarlo en POST /auth/signin

### ACTIVIDAD 04

Extra: Agrega el manejo de errores que creas correspondiente para cada ruta

### ACTIVIDAD 05

Validar en todos los endpoints que lo requiera, que el id tenga el formato especificado (UUID) recibido por parámetros o query.

**[Requisitos]**

- Al terminar el hito el alumno debe haber implementado correctamente la validación de solicitudes HTTP por medio de Pipes
- Las validaciones deben ser implementadas en aquellos endpoints que utilicen información proveniente de la solicitud según corresponda

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
