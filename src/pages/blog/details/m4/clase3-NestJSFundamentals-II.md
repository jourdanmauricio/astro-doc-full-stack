---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 3 - NestJS Fundamentals II
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

## Servicios vs repositorios

#######################################

**Servicios**

- Es una clase que contine la lógica de negocio de una aplicación
- Pueden hacer uso de uno o más repositorios para acceder a dicha información.

**Repositorios**

- Son clases cuya función es contener lógica relacionada con solicitudes a fuentes externas de información.

#######################################

## Fundamentos

En la clase anterior, aprendimos cómo construir y configurar una aplicación con NestJS mediante módulos, controladores y proveedores. A través de los proveedores, generamos un servicio dentro de la aplicación, pero ¿Qué entendemos por **servicio**?

<mak>Catalogamos como servicio a una clase cuya finalidad es contener la lógica de negocio.</mak>

En otras palabras, la lógica de todos los procesos que gestionan datos. Esta, a su vez, pueden hacer uso de uno o más repositorios para acceder a dicha información.

<mark>Los **repositorios** son clases cuya función es contener lógica relacionada con solicitudes a fuentes externas de información como, por ejemplo, una base de datos.</mark>

Para comprender mejor estos dos conceptos imaginemos que nuestra aplicación es una biblioteca

- Los **servicios** estarían representados por el bibliotecario que sabe cómo realizar operaciones específicas y la lógica de la biblioteca.

- Los **repositorios**, por su parte, corresponderían a sus estantes. Estos se encargarán del almacenamiento y la recuperación de los libros (datos) proporcionando al servicio la capacidad de interactuar con la información de manera organizada y eficiente.

```ts
class AppService {
  // Ejecuta la lógica del negocio
  // Invoca repositorios
  // No interactúa con la base de datos
}
```

```ts
class AppRepository {
  // Interactúa directamente con la base de datos
}
```

> Si tomamos en cuenta el ejemplo sobre el cual trabajamos la clase anterior, el **repositorio** corresponde al último eslabón en la cadena de una solicitud realizada a nuestro servidor.

![Repository](/astro-doc-full-stack/images/henry/m4/clase3/fundamentalsII.webp)

<mark>Los repositorios son el nexo entre nuestra base de datos y y nuestra capa de negocio (nuestro service).</mark>

Retomemos el proyecto demo que se trabajó la clase anterior e implementemos un repositorio para cada una de nuestros servicios.

Por cada módulo crearemos un repositorio, aunque luego cada servicio puede hacer uso de más de un repositorio. Es buena práctica separarlos por entidad o por entidades relacionadas.

También, por el momento, utilizaremos unos datos en memoria simulando una base datos para agregar funcionalidad a los repositorios.

Creamos todos.repository.ts y users.repository.ts

```ts
// todos.repository.ts
// Estos archivos serán proveedores, serán inyectables
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosRepository {
  private todos = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'Description 1',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'Description 2',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Todo 3',
      description: 'Description 3',
      isCompleted: false,
    },
  ];

  async getTodo() {
    return this.todos;
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
}
```

### Inyección de dependencias

- Este patrón nos permite delegar la generación de instancias de las dependencias de nuestro proyecto.
- Asegura que este proceso se realice de la manera más eficiente posible.
- Esto generará las instancias del repositorio para poder usar sus funcionalidades dentro del servicio correspondiente.
- Recuerda: Integrar el repositorio a la lista de dependencias a usar dentro del array providers de cada módulo.

<mark>Este patrón **nos permite delegar la generación de instancias de las dependencias de nuestro proyecto**. Este flujo está totalmente controlado por el **runtime**. Cada vez que definimos una función o clase como provider por medio del decorador **@Injectable** y lo incorporamos como una dependencia.</mark>

> ¡No te marees! Parece ser un tema complejo de entender, pero en la práctica es bastante sencillo de aplicar.

Estos providers deben ser requeridos dentro de la clase que los implementa por medio del constructor donde se define la inyección de la dependencia. Realicemos la inyección de la dependencia de los repositorios dentro del servicio. Aparte, estos inyectables se deben declarar como proveedores en el modulo donde los utilizaremos.

```ts
// users.service.ts
import { Injectable } from '@nestjs/common';

import { UsersRespository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }
}
```

```ts
// todos.service.ts
import { Injectable } from '@nestjs/common';

import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private todosRepository: TodosRepository) {}

  getTodos() {
    return this.todosRepository.getTodos();
  }
}
```

```ts
// users.module.ts
import { Module } from '@nestjs/common';

import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
```

```ts
// todos.module.ts
import { Module } from '@nestjs/common';

import { TodosController } from './todos.controllers';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}
```

## Custom providers

#########################################

- Nest nos proporciona algunas propiedades alternativas.
- Pueden ser agregadas dentro de la declaración extendida.
- Nos permite modificar el funcionamiento estadar (useClase).

**useValue**

- Esta propiedad nos sirve para definir una dependencia bajo el nombre de un proveedor existente.
- Ejecuta una función diferente.
- Toma el valor de la clave de acceso dentro del servicio o repositorio de todos, mediante el decorador **@Inject**.

**useFactory**

- Autoriza la creación de proveedores que trabajan de forma dinámica con información proveniente de otra función.
- Async.

#########################################

## Personalización

Hasta ahora hemos aprendido a implementar los proveedores estándar, pero es importante saber que estos proveedores pueden ser personalizados según las necesidades de la aplicación.

Sabemos que cuando definimos un proveedor como dependencia dentro del array de providers, únicamente insertamos el nombre de la dependencia. Esto es correcto cuando trabajamos con **proveedores estándar**. En realidad, es una versión reducida de la sintaxis que usa Nest la cual es necesaria al trabajar con proveedores personalizados.

<mark>En situaciones específicas, recurrimos al uso de proveedores personalizados. Un ejemplo común es cuando queremos reemplazar un proveedor estándar de la aplicación con una **versión simulada**, o cuando necesitamos crear un proveedor que no está vinculado a una clase en particular</mark>.

También resulta útil cuando queremos que el proveedor se adapte según las circunstancias cambiantes de la aplicación.

En la versión extendida de la definición de dependencias podemos ver que se asocia el nombre del proveedor a la propiedad que asigna a la clase del proveedor que deseamos utilizar. Para crear un **proveedor personalizado**, debemos utilizar esta sintaxis extendida.

```ts
@Module({controllers: [AppController], providers: [AppService]})

@Module({
  controllers: [AppController],
  providers: [{provide: AppService, useClass: AppService}],
})
```

Para declarar un **proveedor personalizado**, nest nos proporciona algunas propiedades alternativas que pueden ser agregadas dentro de la declaración extendida. Estas opciones nos permiten modificar el funcionamiento estándar. Veamos algunas de ellas.

### useValue

<mark>Esta propiedad nos sirve para definir una dependencia bajo el nombre de un proveedor existente, pero que ejecuta una función diferente.</mark>

En determinadas situaciones, no necesitamos una clase como proveedor, sino un objeto (por ejemplo un mock para una prueba) o directamente un valor particular.

```ts
// users.module.ts
import { Module } from '@nestjs/common';

import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

const mockUsersService = {
  getUsers: () => 'Este es un servicio mock de usuario',
};

@Module({
  controllers: [UsersController],
  // providers: [UsersService, UsersRepository],
  // cuando encuentre UserService, utiliza mockUsersService
  providers: [
    {
      provide: UsersService,
      useValue: mockUsersService,
    },
    UsersRepository,
  ],
})
export class UsersModule {}
```

Otra manera de utilizar un provider es con un valor.

```ts
// todos.module.ts
import { Module } from '@nestjs/common';

import { TodosController } from './todos.controllers';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';

const TOKEN = 'Clave Super Secreta';

@Module({
  controllers: [TodosController],
  providers: [
    TodosService,
    TodosRepository,
    {
      provide: 'ACCESS_TOKEN',
      useValue: TOKEN,
    },
  ],
})
export class TodosModule {}
```

<mark>Para acceder a un valor (useValue) definido en el array de providers utilizamos el decorador @Inject con el nombre que definimos.</mark>

Y para utilizarlo, por ejemplo en todos.service sería:

```ts
// todos.service.ts
import { Injectable } from '@nestjs/common';

import { TodosRespository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(
    private todosRepository: TodosRepository,
    @Inject('ACCESS_TOKEN') private accessToken: string
  ) {}

  getTodos() {
    return accessToken === 'Clave Super Secreta'
      ? this.todosRespository.getTodos()
      : 'Unauthorized';
  }
}
```

**¡Excelente!** Este es un ejemplo sencillo para validar la transferencia de información empleando la inyección de datos con proveedores no definidos como clases. A continuación, tenemos una nueva propiedad que nos permite utilizar proveedores personalizados.

### useFactory

Nos autoriza la creación de **proveedores** que trabajan de forma dinámica con información proveniente de otra función, como por ejemplo, una solicitud asincrónica. Estas funciones pueden realizar un sinnúmero de acciones cuyo resultado necesita ser inyectado como dependencia en algún componente del módulo.

Vamos a pensar, por ejemplo, que nuestro módulo de usuarios necesita integrar información de una API que será utilizada como dependencia en UsersService para unificar esta información con la de la base de datos.

En este caso, la función creada dentro de **useFactory** tendrá que realizar la solicitud de información y su limpieza para que pueda ser empleada.

Volviendo a la demos, otra cosa que podemos hacer con los providers es utilizar el <mark>**useFactory**. Se utiliza cuando necesitamos configurar algo del provider antes de generarlo</mark>. Nos permite ejecutar una función que retorne el calor que tendrá en provider.

En la demo suponemos que tenemos que llamar a una API externa (https://jsonplaceholder.typicode.com/users) donde tenemos usuarios.

```ts
// users.module.ts
import { Module } from '@nestjs/common';

import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
// import { UsersRepository } from './users.repository';

// const mockUsersService = {
//   getUsers: () => 'Este es un servicio mock de usuario',
// };

@Module({
  controllers: [UsersController],
  // providers: [UsersService, UsersRepository],
  // cuando encuentre UserService, utiliza mockUsersService
  providers: [
    // {
    //   provide: UsersService,
    //   useValue: mockUsersService,
    // },
    UsersService,
    UsersRepository,
    {
      provide: 'API_USERS'
      useFactory: async() => {
        const apiUsers = await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json());
        return apiUsers.map(user => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        })
      }
    }
  ],
})
export class UsersModule {}
```

```ts
// users.service.ts
import { Injectable, Inject } from '@nestjs/common';

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
}
```

Estos son algunos ejemplos de los **custom providers** más empleados. Su uso dependerá totalmente de las necesidades de la aplicación. Para finalizar, hablemos un poco más sobre una de las herramientas de NestJS que hemos venido utilizando hasta este momento y merecen una mención especial: los **decoradores**.

## Decoradores

Son una característica que nos permite agregar métodos, propiedades y parámetros a una clase. Se definen mediante el prefijo “**@**”. NestJS explota al máximo el uso de los decoradores a partir de su implementación de manera declarativa.

Hemos aplicado **decoradores** para la definición de controladores y módulos, para configurar la estructura y enrutamiento de nuestra aplicación, utilizando los decoradores **@Controller** y **@Module**.

También, aprendimos a controlar el patrón de inyección de dependencias por medio de los controladores **@Injectable** e **@Inject**. Con estos podemos definir e importar providers para que nest pueda realizar la gestión de dependencias de la manera más eficiente posible.

> Sin embargo, estos no son los únicos decoradores que emplearemos a lo largo de este módulo, pues más adelante incorporaremos funcionalidades de validación, autenticación y conexión que se efectúan de forma más sencilla por medio de decoradores.

Ahora bien, al implementar estos decoradores es importante seguir algunas consideraciones para asegurar que el proyecto se mantenga legible sin importar su extensión y complejidad.

**Buenas prácticas para el uso de decoradores**

- Mantener a los decoradores pequeños y enfocados a una sola responsabilidad para trabajar de uan forma más ordenada, asegurando así el funcionamiento correcto de la aplicación.

- Documentar el propósito y el comportamiento de cada decorador, asegurándonos que las clases a las que se incorporan tengan nombres descriptivos para facilitar su empleo.

- Reutilizar los decoradores siempre que sea posible para evitar la duplicación de código. Reutilizar las clases que emplean al decorador para evitar saturar innecesariamente el código de clases.

- Seguir las convenciones de nomenclatura y escritura de código de Nest Js para mantener la consistencia en toda la aplicación.

## Cierre

En esta clase hemos explorado conceptos clave como servicios y repositorios, así como la manera en que estos se relacionan y complementan al momento de definir la lógica de negocios y las respuestas a las solicitudes.

Descubrimos el uso de custom providers que, a través de propiedades como useValue o useFactory, permiten la definición personalizada de distintos providers para nuestras aplicaciones.

Finalmente, profundizamos en el concepto de decorador, conociendo las mejores prácticas para un uso adecuado y responsable.

![Mapa de conceptos](/astro-doc-full-stack/images/henry/m4/clase3/mapa.webp)

## Homework

### ACTIVIDAD 01

Crear los repositorios para Users y Products.

### ACTIVIDAD 02

Guardar las entidades en un array en memoria.

### ACTIVIDAD 03

Cargar algunas entidades de prueba hardcodeadas, con las siguientes propiedades...

**Users**

- id:number
- email: string
- name: string
- password: string
- address: string
- phone: string
- country?: string | undefined
- city?: string | undefined

**Products**

- id:number
- name: string
- description: string
- price: number
- stock: boolean
- imgUrl: string

### ACTIVIDAD 04

Modificar los endpoints GET /products y GET /users para que devuelvan el array de entidades.

**TIPS**

- Recuerda que los controllers sólo pueden comunicarse con el repositorio a través de los servicios.

- No olvides actualizar el array de providers.

**[REQUISITOS]**:

- Al finalizar este hito, el alumno deberá implementar de manera satisfactoria un repositorio para cada entidad del proyecto.

- Los endpoints de la aplicación deben funcionar de manera correcta y devolver la información provista por cada repositorio.

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
