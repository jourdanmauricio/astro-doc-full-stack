---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 5 - NestJS & TypeORM
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: NestJS & TypeORM
draft: false
category: Backend Js Nest
---

## TypeORM en NestJS

Como aprendimos en lecciones anteriores, **TypeORM** es una librería que nos permite interactuar con la base de datos desde nuestro código del servidor, y que está optimizada para trabajar con el lenguaje TypeScript.

La elección del ORM para trabajar con NestJS es 100% dependiente de las necesidades del proyecto a implementar. Sin embargo, es importante resaltar que tanto TypeORM como Mongoose, cuentan con una integración por defecto dentro de proyectos inicializados con Nest.

<mark>Estas librerías, además, están optimizadas para trabajar de forma eficiente
dentro del patrón de inyección de datos, lo cual las hace las mejores
opciones para incorporar en un proyecto de Nest.</mark>

En nuestro caso, trabajaremos con la integración de **TypeORM** ya que esta nos permite interactuar tanto con bases de datos relacionales como no relacionales. Tiene también soporte para la mayoría de las **DBMS** más populares de la industria, en especial, **PostgreSQL**.

## Instalacion y configuracion inicial

Como siempre, el primer paso será la instalación de las librerías y dependencias correspondientes dentro del proyecto que hemos venido trabajando hasta el día de hoy.

Tendremos la instalación de las librerías **@nestjs/typeorm**, que nos da acceso a la interfaz para integrar ambas herramientas; la librería misma typeorm, y a **@nestjs/config**, que incluye a dotenv, para leer la información de las variables de entorno de la aplicación. Por último, el driver pg de **PostgreSQL** para trabajar con este gestor SQL.

```bash
npm install @nestjs/typrorm @nestjs/config typeorm pg
```

Ahora que tenemos las bases, empecemos por construir la conexión de nuestra base de datos. Esta conexión será configurada dentro del módulo principal de la aplicación para que pueda ser compartida a lo largo de toda esta.

Lo primero que necesitamos es una base de datos a la que podamos conectarnos. En la demos crearemos una base de datos postgres llamada "**demo-db**".

Una vez logueados podemos ejecutar el siguiente comando para crear la base de datos.

```bash
CREATE DATABASE demo-db;
```

Para conectarnos desde la demo a la base de datos modificaremos el app.module.ts para importar el módulo de TypeORM.

```ts
// app.module.ts
import { Module }  from '@nestjs/common' ;
import { TypeOrmModule} from '@nestjs/typeorm' ;
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    database: 'demo-db',
    host: 'http://localhost',
    port: 5432,
    username: 'postgres',
    password: 'example'
  }),
  UserModule, TodosModule]
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

Con esta configuración, al leventar el servidor debería conectarse a la BD.

Ahora, que la conexión se realizó con éxito podemos mejorar el código para no "hardcodear" las credenciales de la BD. Deberían estar en variables de entorno.

Creamos una archivo en la raíz del proyecto llamado .env.devepment:

```bash
# .env.devepment

DB_NAME=demo-db,
DB_HOST=http://localhost,
DB_PORT=5432,
DB_USERNAME=postgres,
DB_PASSWORD=example
```

Para leer este archivo de variables de ambiente debemos importar otro módulo llamado ConfigModule.

```ts
// app.module.ts
import { Module }  from '@nestjs/common' ;
import { TypeOrmModule} from '@nestjs/typeorm' ;
import { ConfigModule} from '@nestjs/config' ;
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // para acceder desde cualquier lado de la app
      envFilePath: './.env.development'
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    database: 'demo-db',
    host: 'http://localhost',
    port: 5432,
    username: 'postgres',
    password: 'example'
  }),
  UserModule, TodosModule]
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

Ahora podemos utilizar las variables desde el app.module

```ts
// app.module.ts
import { Module }  from '@nestjs/common' ;
import { TypeOrmModule} from '@nestjs/typeorm' ;
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // para acceder desde cualquier lado de la app
      envFilePath: './.env.development'
    }),
    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      database: configService.get('DB_NAME'),
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      // en prod -> false
      synchronoize: true,  // ase actualiza la bd automaticamente
      logging: true,   // muestra en terminal las query que ejecuta en la BD
    })
  }),
  UserModule, TodosModule]
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

## Entidades, modelos y migraciones

## Modelos de entidades

Recordemos que en **TypeORM** los modelos son clases de TypeScript que definen la estructura de los objetos que representan elementos del mundo real. Estos se transforman en entidades que son mapeadas a tablas dentro de la base de datos por TypeORM, mediante el decorador **@Entity**.

La declaración de entidades en proyectos de Nest sigue las mismas directrices de **TypeORM**. A pesar de que se trabaja sobre este framework, las características y funcionalidades que se utilizan para crear las estructuras son las de la misma librería TypeORM.

Esto quiere decir, que trabajaremos con los decoradores **@Entity**, **@Column**, **@PrimaryGeneratedColumn**, etc. y seguiremos la sintaxis que aprendimos durante la clase de TypeORM para la asignación de tipos de datos y propiedades.

Llegó el momento de crear las primeras entidades en la demo que serán mapeadas a tablas en la Base de Datos.

Crearemos la entidad Users y la entidad Todos. Observamos que los usuarios no tendran un id autoincremental numérico porque a nivel de seguridad puede ser vulnerable, se puede intentar obtener información de otros usuarios, etc. Para estos casos se utiliza otro tipo de clave primaria con tipo de dato UUID, que es una combinación de letra y números únicos pero no tiene relación con el anterior ni el próximo. Para gerenerar este tipo de datos utilizaremos una librería llamada uuid.

```bash
npm install uuid
```

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
// src/todos/todos.entity.ts
import { Entity, Colunm, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')    // -> nombre de la tabla
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Colunm();
  title: string;

  @Colunm();
  description: string;

  @Colunm({
    default: false
  });
  isCompeted: boolean;
}

```

Finalmente, en app.module indicamos cuáles son las entidades que se deben sincronizar.

```ts
// app.module.ts
import { Module }  from '@nestjs/common' ;
import { TypeOrmModule} from '@nestjs/typeorm' ;
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todos.entity';
import { User } from './users/users.entity';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // para acceder desde cualquier lado de la app
      envFilePath: './.env.development'
    }),
    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      database: configService.get('DB_NAME'),
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      entities: [ User, Todo]
      // en prod -> false
      synchronoize: true,  // ase actualiza la bd automaticamente
      logging: true,   // muestra en terminal las query que ejecuta en la BD
    })
  }),
  UserModule, TodosModule]
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

Al levantar la aplicación nuevamente, creará la tabla users y todos en la base de datos.

> Antes de empezar a trabajar con la DB, presentaremos un tema muy importante en TypeORM, que nos permite actualizar las tablas de la DB sin correr el riesgo de perder información importante.

## Migraciones

Las **_migraciones_** en TypeORM son una forma de gestionar y aplicar cambios en la estructura de la base de datos de una manera controlada y reproducible. En términos más simples, cada vez que necesitemos agregar, quitar o modificar algo en la estructura de tu base de datos (como añadir una nueva tabla o cambiar el tipo de datos de una columna), creamos una migración para documentar esos cambios.

Estructuralmente hablando, las migraciones son archivos que contienen clases que implementan la interfaz **MigrationInterface** de TypeORM para ejecutar dos querys mediante QueryRunner. Esta nos permite escribir queries dentro del código de tanto de JS como de TS.

Una migración siempre debe ejecutar dos queries: **UP y DOWN**.

- **UP**, será una función que por medio del método query de QueryRunner, ejecuta una query con los cambios que queremos actualizar, “subir” a la DB.

- **DOWN**, por su parte, ejecuta la query del mismo tipo con los cambios que deseamos deshacer, “dar de baja”.

```ts
import { MigrationInterface, QueryRunner } from "typeorm";

class MyMigration implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    awair queryRunner.query('ALTER TABLE <tabla a modificar> CAMBIOS A REALIZAR')
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    awair queryRunner.query('ALTER TABLE <tabla a modificar> CAMBIOS A REALIZAR')
  }
}
return go(f, seed, [])
```

A pesar de que existe una integración altamente eficiente entre **TypeORM** y **NestJS**, el proceso de creación de migraciones por desgracia no es tan intuitivo y configurarlas requiere paciencia. Veamos cómo crear una migración dentro de nuestro proyecto con NestJS.

**Migraciones**

Las migraciones se gestionan sobre la librería de TypeORM que es independiente de Nest js. TypeORM nos facilita un CLI que viene preinstalada para gestionar las migraciones.

Que sean librerías independientes implica que debemos generar una configuración particular para TypeORM, no podemos utilizar la misma de Nest js. Tampoco podemos utilizar el módulo config de Nest por lo que instalamos la librería dotenv para leer las variables de ambiente.

```bash
npm install dotenv
```

Creamos un archivo llamado typeorm.ts en una carpeta llamada src/config.

```ts
// src/config/typeorm.ts
import { DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'ditenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env.development' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  synchronoize: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
```

```ts
// app.module.ts
import { Module }  from '@nestjs/common' ;
import { TypeOrmModule} from '@nestjs/typeorm' ;
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import typeOrmConfig from './config/typeorm'
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // para acceder desde cualquier lado de la app
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get('typeorm'),
  }),
  UserModule, TodosModule]
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

Ahora podemos crear las migraciones incorporando scripts al packege.json.

```json
// package.json
// ...
"scripts": {
  // ..
  "typeorm": "ts-node ./node_modules/typeorm/cli",
  "migration:run": "npm run typeorm migration:run -- -d ./src/config/typeorm.ts",
  "migration:generate": "npm run typeorm -- -d ./src/config/typeorm.ts migration:generate",
  "migration:create": "npm run typeorm migration:create",
  "migration:revert": "npm run typeorm -- -d ./src/config/typeorm.ts migration:revert",
  "migration:show": "npm run typeorm -- -d ./src/config/typeorm.ts migration:show",
}
// ...

```

```bash
# Generamos una migración "Vacia"
npm run migration:create src/migrations/prueba
```

El comando anterior generará una nueva migración con la siguiente estructura:

```ts
import { MigrationInterface, QueryRunner } from "typeorm";

class MyMigration implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    // creamos una tabla ejemplo
    awair queryRunner.query(`ALTER TABLE TEST (
      id SERIAL PRIMARY KEY
    )`);
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    // Preparamos el rollback
    awair queryRunner.query(`DROP TABLE TEST`);
  }
}
```

Para ejecutar la migración debemos compilar la aplicación para que se regenere la carpeta dist a partir de los archivos .ts

```bash
npm run build

# Ejecutamos la migración
npm run migrations:run
```

Para no tener que escibir el query "a mano" debemos otro comando, pero primeramente debemos eliminar la tabla test y migrations que se generaron en la base de datos y eliminar el archivo demigración.

```bash
npm run migration:generate src/migrations/initial
```

Ahora, el arhivo de migración generado contiene la creación de tablas sobre la defición de nuestras entidades.

```bash
npm run build

# Ejecutamos la migración
npm run migrations:run
```

Ahora tendremos las tablas users y todos en la base de datos.

A continuación veremos un nuevo patrón de diseño con el que trabajaremos muy seguido.

## Implementación del patrón de repositorio

Una de las grandes ventajas de **TypeORM** es que puede trabajar dentro del patrón de repositorios de Nest que se basa en la separación de responsabilidades de acceso a la base de datos.

Previamente construimos repositorios como clases dentro de nuestra aplicación, pero estos eran repositorios personalizados, pues realmente no existía una conexión a una base de datos real. Ahora si la tenemos, así que ha llegado el momento de implementar **repositorios con conexión a una DB**.

Ahora debemos conectar la BD con nuestra app en Nest de tal manera que podamos, a través de nuestros servicios, acceder, guardar, modificar o eliminar los datos en la BD.

Primero, debemos importar el typeOrmModule con el feature User, ya que será la entidad que utilizaremos dentro del módulo.

```ts
// users.module.ts
import { Module } from '@nestjs/common';

import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { User } from './users.entity';
// import { UsersRepository } from './users.repository';

// const mockUsersService = {
//   getUsers: () => 'Este es un servicio mock de usuario',
// };

@Module({
  imports: [typeOrmModule.forFeature([User])],
  controllers: [UsersController],
  // providers: [UsersService, UsersRepository],
  // cuando encuentre UserService, utiliza mockUsersService
  providers: [
    // {
    //   provide: UsersService,
    //   useValue: mockUsersService,
    // },
    UsersDBService,  // lo creamos en el paso siguiente
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

Para no afectar el código que tenemos en la demo, podemos hacer una prueba creando un nuevo servicio llamado usersDB.service.ts

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

  saveUser(user: User) {
    this.usersRepository.save(user);
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
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import {usersDBService} from './usersDB.service';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService,
  private readonly usersDBService: UsersDBService,
  ) {}

  // ...

  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: UserEntity, @Req() request: Request & { now: string }) {
    console.log('Request en enpoint post', request, now);
    // return this.usersService.createUser(user);
    return this.usersService.saveUser(...user, createdAt: request.now);
  }

  // ...
}
```

Hemos visto de qué manera llevar a cabo la separación de responsabilidades de las bases de datos mediante el patrón y la inyección de repositorios, brindando una estructura organizada y modular para nuestras aplicaciones.

## Cierre

Exploramos la integración de **TypeORM** en **NestJS**, destacando varias ventajas. La configuración inicial se simplifica significativamente gracias a la compatibilidad natural entre los frameworks, ambos orientados a Typescript. Permite aprovechar decoradores, lo que facilita la creación de entidades y modelos de manera, siguiendo el enfoque de inyección de dependencias.

Asimismo, hemos comprendido cómo TypeORM se adapta perfectamente al patrón de repositorios de NestJS, facilitando la implementación de operaciones CRUD.

## Homework

### ACTIVIDAD 01

Instalar y configurar las librerías necesarias para utilizar TypeORM y postgres.

- Crear un archivo de configuración para la conexión con TypeORM.

- Los datos de conexión a la BD deben ser almacenados en variables de entorno.

- Crear el módulo de conexión de manera global.

### ACTIVIDAD 02

Definir las siguientes entidades de typeorm con sus respectivas relaciones.

- Users

  - id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
  - name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
  - email: debe ser una cadena de texto de máximo 50 caracteres, único y no puede ser nulo.
  - password: debe ser una cadena de texto de máximo 20 caracteres y no puede ser nulo.
  - phone: debe ser un número entero.
  - country: debe ser una cadena de texto de máximo 50 caracteres.
  - address: debe ser un texto.
  - city: debe ser una cadena de texto de máximo 50 caracteres.
  - orders_id: Relación 1:N con orders.

- Products

  - id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
  - name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
  - description: debe ser un texto y no puede ser nulo.
  - price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
  - stock: debe ser un valor numérico. No puede ser nulo.
  - imgUrl: debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.
  - category_id (Relación 1:N).
  - Relación N:N con orderDetails.

- Categories

  - id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
  - name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
  - Relación 1:1 con products.

- Orders

  - id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
  - user_id: (Relación 1:N) con users.
  - date.
  - Relación 1:1 con orderDetails.

- OrderDetails

  - id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
  - price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
  - order_id: Relación 1:1 con orders.
  - Relación N:N con products.

### ACTIVIDAD 03

Al inicializar el servidor deben pre-cargarse a la base de datos las categorías y los productos del siguiente archivo a la base de datos. Ten en cuenta que la categoría debe ser cargada antes del producto.

- Vamos a suponer que del lado del cliente se ejecutará el endpoint /categories/seeder para realizar la carga de categorías al inicializar la aplicación así que puedes contemplar este proceso como parte del flujo de un controlador normal. Lo mismo para la pre-carga de productos utilizando del endpoint /products/seeder (El orden de invocación es importante).

- Debes evitar la carga de registros bajo el mismo nombre tanto en categorías como en productos.

- Deberás crear el módulo, controlador, servicio y repositorio correspondiente para las categorías, este repositorio solo debe contener los métodos getCategories y addCategories.

[ARCHIVO]

### ACTIVIDAD 04

Crear el modelo,controllador, servicio y repositorio para las órdenes de compra (orders), dentro de este repositorio crearemos la lógica necesaria para que un usuario pueda realizar una compra de un “carrito de productos”.

- La orden de compra será recibida mediante una solicitud de HTTP Post al endpoint /orders cuyo cuerpo tendrá la siguiente estructura:

{
"userId":"UUID del usuario",
"products":[
{
"id":"UUID producto 1"
},
{
"id":"UUID producto 2"
}
]
}

- Por ahora los usuarios solo pueden agregar una unidad de cada producto dentro de su carrito.

- En el repositorio de orders tendrás que crear 2 métodos diferentes getOrder y addOrder.

**addOrder**

- Busca a un usuario por id.

- Crea un registro en la tabla orders con el usuario encontrado.

- Busca los productos por id recibidos en la request actualizando el total de la compra y reduciendo el stock del producto. correspondiente. (al realizar la búsqueda de todos los productos aquellos con stock igual a 0 no deben ser mostrados).

- Construye y registra un detalle de compra con los productos seleccionados.

- Devuelve la orden de compra con el precio y id del detalle de compra.

**getOrder**

- Busca una orden recibida por id.

- Devuelve un objeto con la orden y los detalles de la orden (el detalle de la orden debe contener un array con todos los productos adquiridos).

### ACTIVIDAD 05

Modificar los el contenido del repositorio para que utilice la entidad Users para la gestión de información. En el caso de la búsqueda por Id la respuesta debe devolver al usuario incluyendo un array con las órdenes de compras efectuadas (únicamente id y date).

### ACTIVIDAD 06

Configurar las migraciones correspondientes y los comandos en el package.json para ejecutarlas.

**TIPS ¡Bien hecho!**

Tendrás que hacer algunos cambios en controladores y servicios para que funcione correctamente la aplicación en conjunto con la DB. Puedes almacenar el archivo de productos en un json dentro de la carpeta src de tu proyecto.

**[REQUISITOS]**:

Al terminar el hito el alumno debe haber realizado la correcta configuración de la base de datos en el proyecto.
Los servicios deben trabajar con los repositorios de cada entidad para gestionar la información en la base de datos.
Las relaciones entre tablas deben funcionar correctamente al realizar el proceso de compra.
Debe estar configurada la implementación de migraciones para monitorear futuros cambios en la base de datos.

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
