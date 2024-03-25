---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: NestJS - Programación Modular, Documentación con Swagger
date: 2024-02-12
author: Mauricio Jourdán
image:
  { src: '/astro-doc-full-stack/images/nest-js/back.webp', alt: Logo nest js' }
icon:
  { src: '/astro-doc-full-stack/images/nest-js/icon.png', alt: 'Logo Nest js' }
description: NestJS - Programación Modular, Documentación con Swagger
draft: false
category: Nest js backend
---

- Documentación: https://nestjs.com/
- Repositorio del proyecto: https://github.com/jourdanmauricio/nest-ecommerce
- Branch Fundamentos: git clone -b modulos-documentacion https://github.com/jourdanmauricio/nest-ecommerce

Este post es continuación de [Fundamentos de Nest js](/astro-doc-full-stack/blog/nest). En alquel post construimos el backen para un e-commmerce poniendo foco en los controladores y validaciones de iniformación.

En este post veremos como aplicar progración orientada a módulos para escalar y organizar mejor el código. También veremos más a profundidad la inyección de dependencias.

El código base se encuentra en la rama fundamentos-nestjs del repositorio: https://github.com/jourdanmauricio/nest-ecommerce.git

```bash
git clone -b fundamentos-nestjs https://github.com/platzi/nest-ecommerce.git

cd nest-ecommerce
npm install

# Desviculamos el repositorio origen
git remote -v
git remote rm origin
git remote add origin <your-repo>

nmp run start:dev
```

## Módulos

<details>
<summary>Detalle</summary>

La programación modular nos permite:

- Tener el código organizado
- Definir una estructura escalable para nuestra App

Es buena práctica encapsular la lógica de la aplicación en módulos, en dominios. Por el momento, toda la lógica se encuentra en el módulo App.module.ts

- El módulo users podría tener toda la lógica para el dominio de los usuarios: roles, órdenes de compra, los usuarios, laatenticación, etc.

- El módulo de productos se encargaría de gestionar todo lo relacionado a un producto: categorías, marcas, el producto, imágenes, etc.

Cada módulo se debe encargar de una parte específica agrupando ciertas características que nos permita escalar y saber donde encontrar la lógica de cada uno de ellos.

Los módulos funcionan como una isla, cada módulo posee sus propios controllers, sus servicios, y los expone hacia nuestra Rest API.

Para conectar dos módulos necesitamos sentencias especiales que veremos más adelante.

En Nest js un módulo posee el decorador **@Module** y posee cuatro atributos:

- imports -> importaciones
- controllers -> controladores
- providers -> servicios
- exports -> permite la interconexión de módulos

Crearemos los módulos users y productos.

```bash
nest g mo users
nest g mo products
```

Estos comandos crearán en /src la carpeta products con el archivo products.module.ts y users con el archivo users.module.ts.

También modificó app.module.ts agregando los módulos en el array imports. Y debemos eliminar todos los controllers y servicios que ya no se declaran aquí sino que tienen su propio módulo (ver app.module.ts, products.module.ts y users.module.ts).

Ahora debemos crear las carpetas dtos, entities, controllers, services dentro de cada una de las carpetas. Y refactorizar nuestas App pasando los servicios que estaban en /src/services y que se encuentran relacionados a productos a nuestra carpeta /src/products/services, lo mismo para el resto de carpetas.

El resultado será:

```bash
|
|-> src
|    |-> common
|    |-> products
|    |      |-> dtos
|    |      |    |-> products.dtos.ts
|    |      |    |-> brands.dtos.ts
|    |      |    --> categories.dtos.ts
|    |      |-> entities
|    |      |    |-> product.entity.ts
|    |      |    |-> brand.entity.ts
|    |      |    --> categories.entity.ts
|    |      |-> controllers
|    |      |    |-> products.controller.ts
|    |      |    |-> products.controller.spect.ts
|    |      |    |-> brands.controller.ts
|    |      |    |-> brands.controller.spec.ts
|    |      |    |-> category.controller.ts
|    |      |    --> category.controller.spec.ts
|    |      |-> services
|    |      |    |-> products.service.ts
|    |      |    |-> products.service.spect.ts
|    |      |    |-> brand.service.ts
|    |      |    |-> brand.service.spec.ts
|    |      |    |-> category.service.ts
|    |      |    --> category.service.spec.ts
|    |      --> products.module.ts
|    --> users
|           |-> dtos
|           |    |-> users.dtos.ts
|           |    --> customers.dtos.ts
|           |-> entities
|           |    |-> user.entity.ts
|           |    --> customer.entity.ts
|           |-> controllers
|           |    |-> users.controller.ts
|           |    |-> users.controller.spect.ts
|           |    |-> customers.controller.ts
|           |    --> customers.controller.spec.ts
|           |-> services
|           |    |-> users.service.ts
|           |    |-> users.service.spect.ts
|           |    |-> customers.service.ts
|           |    --> customers.service.spec.ts
|           --> users.module.ts
|
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```ts
// products.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
})
export class ProductsModule {}
```

```ts
// users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';

@Module({
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
```

</details>

## Interacción entre módulos

<details>
<summary>Detalle</summary>

Ya modularizamos a products y a users. Ahora cada módulo funciona como una isla así que no interactúan entre ellos.

**¿Cómo haríamos para consumir el servicios de products pero desde el servicio de users?**

Para ejemplificar vamos a crear la **entidad order** que representará las órdenes de compra y podremos obtener en base a un usuario sus órdenes de compra.

```ts
// src/products/entities/order.entity.ts
import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
```

Las entidades, al ser clases, podemos importarlas de está manera, pero para los controllers, los servicios, debemos utilizar la inyección de dependencias.

Creamos un nuevo endpoint en el controlador de users para obtener las órdenes de compra.

```ts
// src/users/controllers/users.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  //...
```

Ahora creamos un nuevo método en el servicio de users

```ts
// src/users/services/users.serice.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from './../../products/services/products.service';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  constructor(private productsService: ProductsService) {}

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);
    // Por el momento trabajamos en memoria
    // recuperamos un usuario,
    // agregamos una fecha y
    // nos traemos los productos desde el servicio de prosuctos
    // utilizando la inyección de dependencias porque está en otro módulo
    // (Ver el constructor de esta clase)
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
```

<mark>Para que podamos utilizar el servicio de productos debemos exportarlo desde su módulo e importalo en el modulo de users.</mark>

```ts
// products.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  // exportamos ProductsService
  exports: [ProductsService],
})
export class ProductsModule {}
```

```ts
// users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from './../products/products.module';

@Module({
  // Importamos el módulo completo,
  // pero products.module solo exporta ProductsService
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
```

</details>

## Entendiendo la inyección de dependencias

<details>
<summary>Detalle</summary>

El patrón de inyección de dependencias es un principio de arquitectura que nos permite desacoplar las cosas y un controlador por medio de su constructor utilizará un servicio A o B. Inyecta los servicios para que se utilicen en el controlador.

![Nest Inyección de dependencias.](/astro-doc-full-stack/images/nest-js/nest-modular.webp)

Un controlador puede importar tantos servicios como se requiera pero intentamos importar la menor cantidad.

**¿Cómo funciona por detrás y por qué se hace?**

Para entender el motivo de la inyección de dependencias tenemos que hablar de otro patrón: **singleton** que se encuentra implícito en el patrón de inyección de dependencias.

<mark>Singleton es un patrón que define que al crear el servicio se genere una única instacia (porque es una clase). Es decir, que durante toda la ejecución del proyecto solo existirá una instancia de esa clase. Esta instancia se compartirá entre todos los controladores.</mark>

No vamos a crear una instancia del servicio cada vez que un controlador lo requiera. Generaría mucha carga de memoria, sería ineficiente. Singleton nos asegura que solo crea una instancia y si otro controlador la solicita envía la misma que ya existe.

Los controladores no se pueden inyectar, tienen su propio decorador @Controller y manejan los request.

Para que funcione en Nest js, los controladores deben utilizar el decorador @Injectable. Indica que lo maneje como una dependencia y que sea como patrón singleton.

```ts
// src/users/services/users.serice.ts

import { Injectable } from '@nestjs/common';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}
}
```

Al definir el servicio en el contructor queda como atributo de la clase. Por este motivo podemos invocar sus métedos utilizando: this.productsService.create()

> <mark>Un servicio también puede ser inyectado en otro servicio. Solo se debe **tener cuidado de no tener un dependencia circular**, es decir, que el servicio A inyecte al servicio B y que el servicio B inyecte al servicio A.</mark>

Nest js gestiona todos estos patrones por nosotros.

</details>

## useValue y useClass

<details>
<summary>Detalle</summary>

Hasta el momento hemos utilizado el useClass. La inyección de dependencias por debajo utiliza useClass. Pero, ¿qué otra cosa se puede inyectar?

También podemos inyectar valores (**useValue**), como un string, un objeto, un array, etc. El valor será definido en un momento y luego será inyectado a los controladores que lo necesiten.

Un ejemplo puede ser un API_KEY, que tendremos diponible en el app.module.ts pero que lo necesitaremos en otros módulos.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD12345678';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
})
export class AppModule {}
```

Y para ejemplificar lo podemos importar en app.service.ts utilizando el decorador **@Inject**.

```ts
// app.service.ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('API_KEY') private apiKey: string) {}
  getHello(): string {
    return `Hello World! ${this.apiKey}`;
  }
}
```

Para simular que estamos ejecutando en un ambiente de producción podemos levantar el servidor con:

```bash
NODE_ENV=prod npm run start:dev
```

El useValue se utilizará mucho en testing y para las conexiones.

</details>

## useFactory

<details>
<summary>Detalle</summary>

**useFactory** es un método que nos va a permitir con ciertas reglas. Es una fábrica qie maneja inyección de dependencias y asincronismo. Será importante cuando veamos conexiones a base de datos.

Ahora lo utilizaremos con otro módulo de nest: **HTTP**, que nos permite conectar nuestro backend a otra API externa.

```bash
npm i @nestjs/axios
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import axios from 'axios';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD12345678';

@Module({
  imports: [ProductsModule, UsersModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE === 'prod' ? API_KEY_PROD : API_KEY,
    },
    // no utilizamos useValue porque será asíncrono
    {
      provide: 'TASKS',
      useFactory: async () => {
        const response = await axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos',
        });
        return response.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
```

```ts
// app.service.ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[]
  ) {}
  getHello(): string {
    console.log('TASKS', this.tasks);
    return `Hello World! ${this.apiKey}`;
  }
}
```

> **Nota**: puntualmente utilizatemos useFactory en la conexión a MongoDB, pero ahora debemos tener en cuenta que como es asíncrono dentendrá el proceso hasta que se recuelva la promesa. Lo ideal sería implementar llamadas a otras API desde servicios y no desde el app.module.

## Global Module

El **Global Module** y su contenido será visible por el resto de la aplicación. Crea una instancia y la podemos inyectar sin necesida realizar importaciones.

Creamos un nuevo módulo y lo declaramos como global a través de el decorador @Gñlobal.

```bash
nest g mo databse
```

```ts
// database.module.ts
import { Module, Global } from '@nestjs/common';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD12345678';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  // Este provriders se utlizan dentro de databse.module
  // si queremos utilizarlo afuera debemos exportalo
  exports: ['API_KEY'],
})
export class DatabseModule {}
```

Trasladamos la constante API_KEY de app.module a este módulo pero como este módulo es global no es necesario importarlo en app.service o en user.service, directamente lo inyectamos.

El Global Módule se utliza para variables que necesitamos utilizar en otros módulos. Deben ser generales para toda la aplicación. También se puede utilizar para resolver dependencias circulares, aunque no es ideal.

</details>

## Módulo de configuración

<details>

<summary>Detalle</summary>

El **config module** nos permitirá trabajar con variables de ambiente, trabajar con distintos tipo de ambiente, con entornos de desarrollo, entornos de testing, staging hasta entornos de producción y debemos moldear la API para que se comporte de acuerdo a estas variables.

Instalamos un nuevo packege que posee por detrás al package dotenv.

```bash
npm i @nestjs/config
```

Creamos un archivo en la raíz del proyecto llamado .env y <mark>**agregamos la línea \*.env al archivo .gitignore** para no trackearlo, no enviarlo al repositorio.</mark> En este archivo guardaremos contraseñas, keys, el acceso a la base de datos, etc

```bash
# .env
API_KEY=12345678
DATABASE_NAME=my_db
```

Luego modificamos app.module.css importando el configModule.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './databse/databse.module';
import axios from 'axios';

@Module({
  imports: [
    // indicamos el archivo .env y que será global
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // no utilizamos useValue porque será asíncrono
    {
      provide: 'TASKS',
      useFactory: async () => {
        const response = await axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos',
        });
        return response.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
```

Ahora podemos consumir estos valores desde cualquier lado de nuestra aplicación. Y no tenemos que inyectarlas una a una con useValue.

```ts
// users,service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ProductsService } from './../../products/services/products.service';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  constructor(
    private productsService: ProductsService,
    private configService: ConfigService
  ) {}

  findAll() {
    // Realizamos un get al configService
    // del valor particular que deseamos
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log('apiKey', apiKey);
    console.log('atabaseName', dbName);
    return this.users;
  }

  //...
}
```

</details>

## Configuración por ambientes

<details>
<summary>Detalle</summary>

Utilizaremos los archivos de tipo .env para configurar los distintos ambientes. Ej: el ambiente de desarrollo tendrá un API_KEY diferente a la de producción, o la conexión a la base de datos.

Creamos dos archivos más: **.stag.env** (staging) y **.prod.env** (producción)

```bash
# .prod.env
API_KEY=999
DATABASE_NAME=my_db_prod
```

```bash
# .stag.env
API_KEY=333
DATABASE_NAME=my_db_stag
```

Ahora debemos indicarle a Nest que dependiendo del ambiente deejecución cargue un archvo u otro. Creamos un archivo en /src llamado environments.ts para hacerlo de forma explícita.

```ts
// environments.ts
export const environments = {
  dev: '.env',
  stag: '.stag.env',
  prod: '.prod.env',
};
```

Luego, en app.mudule cargamos el archivo dinámicamente de acuerdo al ambiente.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './databse/databse.module';
import axios from 'axios';

@Module({
  imports: [
    // indicamos el archivo .env y que será global
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
    }),
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // no utilizamos useValue porque será asíncrono
    {
      provide: 'TASKS',
      useFactory: async () => {
        const response = await axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos',
        });
        return response.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
```

Para verificar el funcionamiento podemos modificar el app.service (que estaba utilizando el API_KEY desde useValues), para que utilice el valor pero desde el ambiente.

```ts
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    private configService: ConfigService
  ) {}
  getHello(): string {
    console.log('TASKS', this.tasks);
    const apiKey = this.configService.get('API_KEY');
    const dbNane = this.configService.get('DATABASE_NAME');
    return `Hello World! ${apiKey}: ${dbNane}`;
  }
}
```

Levantamos el servidor simulando los distintos ambientes y realizamos el get desde insomnia al endpoint http:localhost:3000/

```bash
NODE_ENV=stag npm run start:dev
NODE_ENV=prod npm run start:dev
npm run start:dev
```

</details>

## Tipado en la configuración

<details>
<summary>Detalle</summary>

Una forma evitar errores en la configuración del proyecto es tipar los datos. ¿Qué pasaría si por error en lugar de escribir this.config.get('API_KEY') escribimos this.config.get('API_KY')?

Al tipar los datos restringimos los valores que se pueden ingresar, evitando errores de tipo typo.

Creamos un nuevo archivo llamado config.ts en /src

```ts
// config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEY,
  };
});
```

Para utilizarlo vamos a modificar app.service.

```ts
// app.service.ts
import { Injectable, Inject } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    // private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}
  getHello(): string {
    console.log('TASKS', this.tasks);
    // const apiKey = this.configService.get('API_KEY');
    // const dbNane = this.configService.get('DATABASE_NAME');
    const apiKey = this.configService.apiKey;
    const dbNane = this.configService.database.name;
    return `Hello World! ${apiKey}: ${dbNane}`;
  }
}
```

Y nos falta una última modificación en app.module para carga la configuración con tipado seguro.

```ts
// app.module
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './databse/databse.module';
import axios from 'axios';
import config from './config';

@Module({
  imports: [
    // indicamos el archivo .env y que será global
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      // cargamos la configuración
      load: [config],
      isGlobal: true,
    }),
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // no utilizamos useValue porque será asíncrono
    {
      provide: 'TASKS',
      useFactory: async () => {
        const response = await axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos',
        });
        return response.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
```

</details>

## Validación de esquemas en .envs con Joi

<details>
<summary>Detalle</summary>

El tipado en la configuración nos ayuda en el momento de desarrollo, pero qué ocurre si al realizar el deploy enviamos valores incorrectos en la configuración (tiempo de ejecución). Ejemplo: si en el puerto en lugar de colocar un número el implementador en producción coloca un string.

**Entonces validaremos que las variables de ambiente sean las correctas.**

Instalamos la librería **joi**.

```bash
npm i joi
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import axios from 'axios';
import * as Joi from 'joi';

import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './databse/databse.module';
import config from './config';

@Module({
  imports: [
    // indicamos el archivo .env y que será global
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      // cargamos la configuración
      load: [config],
      isGlobal: true,
      // Indicamos la validacion de schema
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // no utilizamos useValue porque será asíncrono
    {
      provide: 'TASKS',
      useFactory: async () => {
        const response = await axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos',
        });
        return response.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
```

Ahora, si intentamos levantar el backend sin la configuración en .env del puerto o alguna de las varibles como requieras o si el tipo no coincide el servidor no arrancará informando el error.

> Recordemos de acuerdo a donde se realice la implementación puede que las variables se configuren gráficamente, o si es un servidor propio utilizaríamos el archivo .env. De todas maneras, ahora el servidor se encuentra protegido ante fallos en la configuración de las variables de entorno desde el exterior tanto en valores como en tipos.

</details>

## Integrando Swagger y PartialType con Open API

<details>
<summary>Detalle</summary>

La documentación es muy valiosa, no solo para nosotros como desarrolladores del backend, sino para el cliene que se conecte a nuestra API, para el equipo de frontend, al equipo de desarrollo mobile. Podríamos enviar un archivo generado por Postman o Insomnia pero eso no es una buena documentación, es más bien prueba y eror.

Los procesos de documentación suelen ser pesados y muy dificil de mantener, porque la documentación es en "vivo". A medida que desarrollamos debemos modificarla para que siempre se encuentre actualizada.

Nest js nos ayuda a mapear los endpoints y a documentarlos de forma automática.

**Open API** (https://www.openapis.org/) es una especificación para escribir buena documentación, legible, para las REST APIs. Nest js posee un módulo para cumplir con la especificación y que sea automática.

Como utilizamos express por debajo instalaremos las dependencias:

```bash
npm i @nestjs/swagger swagger-ui-express
```

Modificamos el archivo main.ts para que Nests js genere la documentación.

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Elimina del payload los atributos que no esten definidos en el dto
      whitelist: true,
      // Rechaza la petición indicando que se envía un atributo que no es esperado
      forbidNonWhitelisted: true,
    })
  );

  // documentacion swagger
  const config = new DocumentBuilder()
    .setTitle('My e-commerce API')
    .setDescription('Documentación de my e-commerce API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // la documentacion se verá en el endpoint http://localhost:3000/docs
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
```

Para que la documentación automática interprete correctamente la información de los dtos tenemos que activarla en el archivo nest-cli.json

```json
// nest-cli.json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": ["@nestjs/swagger"]
  }
}
```

Otra modificación que debemos realizar es en los dtos es cambiarla importación de los partial tipes desde mapped-types a la de swagger. También agregamos el decorador @ApiProperty() a cada atributo. **Como ejemplo citamos el user.dtos pero debemos cambiar todos los dtos**.

```ts
// user.dto.ts
import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

</details>

## Extendiendo la documentación

<details>
<summary>Detalle</summary>

Swagger realiza el trabajo de la documentación pero podemos agregar más detalle para que sea más facil de leer y quede más completa.

Dentro de los dtos podemos agregar una descricripción sobre el atributo en paticular. Por ejemplo para brand.dto:

```ts
// brand.dto.ts
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiPropertyOptional({ description: 'Nombre comercial de la marca' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Imágen de la marca' })
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
```

Se puede extender la documentacion de swagger con muchos decoradores

https://docs.nestjs.com/openapi/introduction

Para los controladores se utiliza:

- ApiTags: para agrupar los metodos de los controladores
- ApiOperation para documentar que es lo que hace el metodo

Por cada metodo del controlador, se puede documentar las respuestas

- ApiResponse: se le define el http code status y la descripcion description

Se puede extender con decoradores particulares para cada response que viene con su status:

- ApiOkResponse: http code status 200
- ApiBadRequestResponse http code status 400
- ApiForbiddenResponse, http code 403
- ApiUnauthorizedResponse, http code 401
- ApiCreatedResponse, http code 201
- ApiNotFoundResponse, http code 404

Otra modidicación que podemos realizar es agrupar los endpoints (por defecto se muestran en forma de lista). Ejemplo sobre el controlador brands.controller.ts pero esta característica debería incluirse en todos los controladores.

También podemos mostrar un mensaje sobre la operación que realiza el método.

```ts
// brands.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas las marcas' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una marca por id' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva marca' })
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifica una marca por id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto
  ) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una marca por id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(+id);
  }
}
```

![Nest Documentación.](/astro-doc-full-stack/images/nest-js/nest-doc.webp)

> Nota: no es necesario utilizar todos lo decoradores de documentación. Tendremos que ver cuáles serán necesarios de acuerdo a las particularidades del proyecto.

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
  img[alt="Nest Inyección de dependencias."] {
  max-width:  400px;
  margin: 0 auto;
  display: block;
  }
  pre {
    padding: 10px;
  }
</style>
