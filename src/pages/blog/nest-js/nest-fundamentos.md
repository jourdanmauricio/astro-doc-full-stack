---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Fundamentos de Nest js
date: 11-02-2024
author: Mauricio Jourdán
image:
  { src: '/astro-doc-full-stack/images/nest-js/back.webp', alt: Logo nest js' }
icon:
  { src: '/astro-doc-full-stack/images/nest-js/icon.png', alt: 'Logo Nest js' }
description: Fundamentos de Nest js.
draft: false
category: Nest js backend
---

## Nest Js

Documentación: https://nestjs.com/
Repositorio del proyecto: https://github.com/jourdanmauricio/nest-ecommerce
Branch Fundamentos: git clone -b fundamentos-nestjs https://github.com/jourdanmauricio/nest-ecommerce

<mark>Nest Js es un framework con abastracciones basado en Node Js</mark>. Decimos con abstracciones porque Nest Js es agnóstico, por debajo generalmente utiliza Express Js pero prodía utilizar otros framworks. Nest Js realiza las abstracciones.

Las aplicaciones basadas en Node utilizando por ejemplo Express no llegan a ser muy escalables.

NestJS nos ofrece diferentes patrones tales como:

- SOLID
- Typescript
- Orientado a Objetos
- Programación Funcional
- Programación Reactiva

Esto nos ayuda a desarrollar aplicaciones potentes e increíbles.

La arquitectura que nos brinda esta basada en Controladores, Servicios y Modelos de datos.

## Instalación

<details>
<summary>Detalle</summary>

```bash
node --version
# instalamos el cli globalmente como administrador
sudo npm i -g @nestjs/cli
nest --version
nest --help
```

### Plugins VSCode

Para tener buenas prácticas en nuestro proyecto utilizaremos plugins como ESlint y Prettier en nuestro proyecto que nos permiterán desarrollar código siguiendo un estandar.

- ESLint
- Prettier - Code formatter
- EditorConfig for VS Code

**EditorConfig** para VSCode permite definir y aplicar estilos de codificación consistentes en tu proyecto, independientemente del editor o IDE que utilicemos. Esto significa que todos los colaboradores del proyecto, incluso si usan diferentes editores, pueden seguir las mismas reglas de estilo, lo que mejora la legibilidad, la mantenibilidad y la colaboración del código.

Principales beneficios de usar la extensión EditorConfig:

- Consistencia: asegura que todos los archivos del proyecto se formateen de la misma manera, lo que facilita la lectura y el mantenimiento del código.
- Mejora la legibilidad: al tener un estilo de código uniforme, el código se vuelve más fácil de entender para todos los colaboradores.
- Aumenta la productividad: al tener un estilo de código consistente, los colaboradores pueden enfocarse en escribir código en lugar de discutir sobre cómo formatearlo.

Características de la extensión EditorConfig para VSCode:

- Detección automática de archivos .editorconfig: la extensión detecta automáticamente los archivos .editorconfig en tu proyecto y aplica las reglas de estilo definidas en ellos.
- Resaltado de errores de estilo: la extensión resalta los errores de estilo en tu código mientras escribes, lo que te permite corregirlos rápidamente.
- Formato automático: la extensión te permite formatear automáticamente tu código de acuerdo con las reglas de estilo definidas en el archivo .editorconfig.
- Personalización: puedes personalizar las reglas de estilo en el archivo .editorconfig para que se ajusten a las necesidades de tu proyecto.

**ESLint**:
Es un linter que analiza tu código en busca de errores de sintaxis, problemas de estilo y posibles errores lógicos.
Te ayuda a escribir código más limpio, eficiente y mantenible.
Puedes personalizar las reglas de ESLint para que se ajusten a las necesidades de tu proyecto.

La **principal diferencia entre ESLint y EditorConfig** es que ESLint se enfoca en la detección de errores y la calidad del código, mientras que EditorConfig se enfoca en la consistencia del estilo de código.

ESLint y EditorConfig son dos herramientas complementarias que ayudan a mejorar la calidad de tu código:

- ESLint ayuda a escribir mejor código. Ejemplo: puedes usar ESLint para asegurarte de que todas las variables estén correctamente declaradas, que no haya errores de sintaxis y que el código esté bien formateado.

- Prettier ayuda a formatear tu código de una manera consistente y legible. Ejemplo: puedes usar Prettier para formatear automáticamente tu código cada vez que lo guardas. Esto te ahorrará tiempo y esfuerzo, y te ayudará a mantener tu código consistente.

- EditorConfig ayuda a que tu código sea más consistente. Ejemplo: puedes usar EditorConfig para definir reglas de estilo de código como el tamaño de la sangría, el número de espacios en blanco entre las líneas y el estilo de las comillas.

Se recomienda usar estas herramientas juntas para obtener los mejores resultados.

</details>

## Creación y estructura de un proyecto

<details>
<summary>Detalle</summary>

```bash
nest new your-name-project
# Seleccionamos npm
cd your-name-project
npm run start
#  check => localhost:3000
```

## Estructura del proyecto

Nest.js trae muchas carpetas y archivos cuya finalidad es configurar todo lo que nuestro proyecto de backend necesitaría sin tener que configurarlo nosotros. Entre todos los archivos y carpetas generados, los principales son:

```bash
your-name-project
|-> /dist
|-> /node_modules
|-> /src
|-> /test
|-> .eslintrc.js
|-> .gitignore
|-> .prettierrc
|-> nest-cli.json
|-> package-lock.json
|-> package.json
|-> README.md
|-> tsconfig.build.json
|-> tsconfig.json
```

- La carpeta dist donde se encuentra todo el código que enviaremos a producción
- La carpeta src donde crearemos nuestro proyecto backend (servicios, controladores, etc)
- El archivo package.json dentro del cual se encuentran todos los comandos (scripts) y dependencias que utiliza Nest.js
- El archivo tsconfig.json que contiene toda la configuración de TypeScript que necesita nuestro proyecto. Nest js utiliza TypesScript por defecto
- .eslintrc.js contiene la configuración para ESLint que nos permite llevar buenas prácticas a nuestro código. Por defecto, viene con un configuración adecuada para trabajar con Nest
- .prettierrd contiene la configuración de Prettier y por default se genera con laconfiguración básica

El archivo que no se crea en la intalación es .editorConfig que nos permite que todos los miemobros del equipo manejemos el mismo estandar en los diferentes editores. Todos tendremos las mismas normas, por ejemplo que la tabulación sea con espacios y que idente con 2 espacios, etc.

```bash
# .editorconfig
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

**Carpeta src**

Dentro de /src el archivo más importante es **main.ts**. Es el que ejecuta nuestra aplicación. Contiene el puerto que utilizará la app.

También tendremos un controlador, un module y un service.

</details>

## Proyecto e-coomerce

<details>
<summary>Detalle</summary>

Aprenderemos a utilizar Next js a medida que trabajamos sobre un proyecto de e-commerce. contruiremos una API que permita la conexión desde cualquier cliente, como Android, una App React, Angular, etc.

Tendrá las siguientes entidades:

- USER
- CUSTOMER
- BRAND
- PRODUCT
- CATEGORY
- ORDER

El proyecto terminará con la documentación autogenerada con Swagger

</details>

## Controladores / Decoradores Controller y Get

<details>
<summary>Detalle</summary>

Son los encargados de recibir los request. Su responsabilidad es manipular los requests, validar que los tipos sean correctos, que los permisos del usuario sean correctos. Y si todo se encuentra OK realizamos la conexión a una capa llamada servicios para manipular los datos.

Los requests llegarán desde el cliente a través del proptocolo HTTP. Debemos utilizar los verbos GET, PUT, POST y DELETE.

![Controladores.](/astro-doc-full-stack/images/nest-js/controladores.webp)

### Decoradores

Dentro de los controladores tendremos decoradores, que le indican a Nest como se deben comportar. Ejemplo:

```ts
// AppController.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  // Endpoint predefinido
  @Get()
  getHello(): string {
    return 'Hello Word!';
  }

  // Creamos un nuevo endpoint
  @Get('health')
  getHealth(): string {
    return 'Server working correctly';
  }
}
```

En el ejemplo el decorador **@Controller** para definir un controlador y para crear un nuevo endpoint utilizamos el decorador **@Get**

### Probando nuestro endpoint

Para levantar el servidor en modo live reload (--watch), de manera que cada vez que modifiquemos el código se reiniciará el servidor ejecutando los cambios.

```bash
npm run start:dev
```

Ahora podemos ir a http://localhost:3000 y obtendremos una respuesta **"Hello Word!"**. de la misma manera si modificamos la solicitud a http://localhost:3000/health (endpoint quecreamos) obtendremos **"Server working correctly"**.

Una característica de Nest es su flexibilidad ante los slash "/" de las rutas. En otros framworks las siguientes solicitudes nos podrían generar algún inconveniente.

http://localhost:3000/health
http://localhost:3000/health/

</details>

## Controladores. Cómo recibir parámetros?. Decoradores PARAM y QUERY

<details>
<summary>Detalle</summary>

> Es buena práctica definir los endpoint en plural. Ejemplo: users, tasks, etc

- endpoint api.example.com/users

A través del endpoint api.example.com/users obtendríamos todos los usuarios, pero ¿Cómo podemos obtener un usuario específico?

En este caso podríamos utilizar el endponint api.example.com/users/1 que nos retornará la información del user 1.

Nuestro endpoint deberá utilizar el parámetro de la ruta para capturar el id del usuario:

- api.example.com/users/{id}

También podríamos definir rutas de rutas, para obtener las tareas de un user específico:

- api.example.com/users/{id}/tasks

> Es importante planificar nuestros endpoints para mantener las buenas prácticas

**Decorador @Param**

Nest Js nos ofrece el decorador **@Param** que se recibe como un atributo del método.

```ts
// Definición
@Get(':id')
findOne(@Param('id') id: string) {
  return `Respuesta para el id: ${id}`;
}
```

Ejemplo:

```ts
import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  // @Get('products/:productId')
  // getProduct(@Param() params: any) {
  //   return `Respuesta producto id: ${params.productId}`;
  // }

  // Una forma más facil de recibir los parámetros es indicar en @Param el nombre del atributo que queremos recibir

  @Get('products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `Respuesta producto id: ${productId}`;
  }

  // Si recibimos dos parámetros
  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `Respuesta producto id: ${productId} de la categoría id: ${id}`;
  }
}
```

Ahora podemos solicitar:

- http://localhost:3000/categories/1/products/1

"Respuesta producto id: 1 de la categoría id: 1"

## GET: parámetros query

Los **parámetros query** se utilizan para no enviar un conjunto de parámetros dentro de un endpoint. Por ejemplo, si deseamos enviar un filtro, quiero todos los productos de una marca específica, dentro de una región específica y en un orden determinado.

Los query param comienzan por un símbolo de interrogación (?) y luego se separan por un ampersand (&).

http://localhost:3000/products?region=ARG&brand=nike&sort=asc

Otro uso común de los query param es la paginación de información que deseamos recibir de un endpoint.

**Decorador @Query**

```ts
// Definición
@Get()
findAll(@Query() paginationQuery) {
  const {limit,offset} = paginationQuery;
  return `Limit ${limit}, offset: ${offset}`;
}
```

```ts
// appController.ts
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  // @Get('products')
  // getProduct(@query() params: any) {
  //   const {limit,offset} = params;
  //   return `Limit ${limit}, offset: ${offset}`;
  // }

  // De la misma manera que con params, podemos utilizar la forma simplificada
  // y también podemos indicar valores por default
  @Get('products')
  getProducts(
    @Query('limit') limit = 10, // ts infiere el tipo number
    @Query('offset') offset = 0, // ts infiere el tipo number
    @Query('brand') brand: string
  ) {
    return `Products: Limit ${limit}, offset: ${offset}, brand: ${brand}`;
  }

  @Get('products/filter')
  getProductFilter() {
    return `Respuesta aplicando un filtro`;
  }

  @Get('products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `Respuesta producto id: ${productId}`;
  }

  /***************/
  /* ERROR COMUN */
  /***************/
  // Nest comprueba los endpoints de arriba hacia abajo,
  // por lo que jamas llegará a ingresar en el siguiente endpoint ya que interpretará
  // a /filter como un productId en ingresará en la ruta anterior
  // La solución es colocar la ruta 'products/filter' antes que 'products/:productId',
  // debemos siempre colocar arriba las rutas más específicas

  @Get('products/filter')
  getProductFilter() {
    return `Respuesta aplicando un filtro`;
  }

  // Si recibimos dos parámetros
  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `Respuesta producto id: ${productId} de la categoría id: ${id}`;
  }
}
```

</details>

## Separación de responsabilidades. SOLID: SINGLE RESPONSIBILITY

<details>
<summary>Detalle</summary>

Nest respeta los principios **SOLID**. El primero de ellos en **SINGLE RESPONSIBILITY**, un método o una clase debe tener una sola y única responsabilidad. Es un patrón que nos lleva a escribir mejor código, y también mejora el testing.

En nuestro ejemplo la clase Controller está atendiendo a verios endpoints. No está mal que tenga varios métodos (GET, POST, PUT, DELETE), pero no debería atender a categories y a products. Aplicando el principio de una sola responsabilidad podríamos tener un controlador para products y otro para categories.

### El cli de Nest Js

El cli de nest, a parte del comando para generar una nueva app, nos ofrece comandos para generar piezas o artefactos dentro de nuestra app. Por ejemplo: generar clases, controladores, decoradores, etc.

```bash
nest generate controller products
# también podemos utilizar la forma abreviada
nest g co categories
```

Nest generará el controlador products.controller.ts y el archivo para pruebas unitarias products.controller.spec.ts dentro de una carpeta llamada products. Y a parte actualizará el archvi app.module.ts.

```bash
|
|-> /src
|     |-> products
|     |       |-> products.controller.ts
|     |       |-> products.controller.spec.ts
|     |
|     |-> categories
|             |-> categories.controller.ts
|             |-> categories.controller.spec.ts
|
```

El archivo app.module.ts es el módulo principal de nuestra App. El cli incorporará los dos nuevos controladores.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './products/products.controller.ts';
import { CategoriesController } from './categories/categories.controller.ts';

@Module({
  imports: [],
  controllers: [AppController, ProductController, CategoriesController],
  providers: [AppService],
})
export class AppModule {}
```

Otra forma de generar los controladores sería creando una carpeta específica para los controladores. Los vamos a regenerar, por lo que debemos eliminar los controladores /products/products.controller.ts, /categories/categories.controller.ts y modificar app.module.ts para que solo contenga el AppController.

```bash
nest g co controllers/products
nest g co controllers/categories
```

Si deseamos que Nest no cree una subcarpeta para cada controlador dentro de controllers podemos incluir la bandera --flat.

```bash
nest g co controllers/products --flat
nest g co controllers/categories --flat
```

La ejecucución de estos comandos modificará nuevamente el app.module.ts.

```bash
|
|-> /src
|     |-> controllers
|             |-> products.controller.ts
|             |-> products.controller.spec.ts
|             |-> categories.controller.ts
|             |-> categories.controller.spec.ts
|
```

Finalmente, debemos mover todos los endpoints relacionados a products al controlador de products y lo mismo para categories.

> <mark>**TIP**: en el decorador @Controller podemos indicar la ruta que será atendida por el controlador, por lo que podemos eliminar la palabra 'products' de cada endpoint.</mark>

```ts
// products.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Get()
  getProduct(
    @Query('limit') limit = 10, // ts infiere el tipo number
    @Query('offset') offset = 0, // ts infiere el tipo number
    @Query('brand') brand: string
  ) {
    return `Products: Limit ${limit}, offset: ${offset}, brand: ${brand}`;
  }

  @Get('filter')
  getProductFilter() {
    return `Respuesta aplicando un filtro`;
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return `Respuesta producto id: ${productId}`;
  }
}
```

```ts
// categories.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor() {}

  @Get(':id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `Respuesta producto id: ${productId} de la categoría id: ${id}`;
  }
}
```

```ts
// appController.ts
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return "Hello Word!";
  }

  // Creamos un nuevo endpoint
  @Get('health');
  getHealth(): string {
    return 'Server working correctly';
  }
}
```

</details>

## Método POST para cla creación. Decorador POST

<details>
<summary>Detalle</summary>

El método POST se utiliza para solicitar la creación de información en el backend. La información se envía en el body del request.

Hasta el momento solo hemos implementados rutas con métodos GET. Veamos el POST refactorizando nuestro controlller. Vamos a eliminar la palabra products de los métodos porque ya se entiende que el controlador es de productos. Ejemplo: getProduct() x getOne()

> Para solicitar los endpoints utilizamos el navegador. Para consunir rutas con verbo **POST** debemos enviar información (en el ejemplo el producto que deseamos crear), por lo que ya no podemos realizarlo desde el navegador. Podemos utilizar **Insomnia**, **Postman** o **alguna de las extensiones de VSCode**.

```ts
// products.controller.ts
import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Get()
  getAll(
    @Query('limit') limit = 10, // ts infiere el tipo number
    @Query('offset') offset = 0, // ts infiere el tipo number
    @Query('brand') brand: string
  ) {
    return `Products: Limit ${limit}, offset: ${offset}, brand: ${brand}`;
  }

  @Get('filter')
  getFilter() {
    return `Respuesta aplicando un filtro`;
  }

  @Get(':productId')
  getOne(@Param('productId') productId: string) {
    return `Respuesta producto id: ${productId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return { message: 'Producto creado', payload };
  }
  // También podemos definir cada atributo que recibimos en el body,
  // pero ya no es cómodo porque podemos recibir 20 o 30 atributos
  // Luego definiremos una interfaz
}
```

```json
// Desde Insomnia
// Method: POST,
// url: http://localhost:s3000/products

{
  "name": "zapatillas",
  "brand": "Nike",
  "quantity": "50",
  "price": "75"
}
```

Al ejecutar obtendremos el siguiente response:

```json
{
  "message": "Producto creado",
  "payload": {
    "name": "zapatillas",
    "brand": "Nike",
    "quantity": "50",
    "price": "75"
  }
}
```

</details>

## Métodos PUT y DELETE para editar y eliminar. Decoradores PUT y DELETE

<details>
<summary>Detalle</summary>

Agregaremos al controlador de productos los endpoints para editar y eliminar.

```ts
// products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}
  // ...

  @Get(':productId')
  getOne(@Param('productId') productId: string) {
    return `Respuesta producto id: ${productId}`;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return { id };
  }

  // ...
}
```

```json
// Desde Insomnia
// Method: PUT,
// url: http://localhost:s3000/products/1

{
  "price": "85"
}
```

Al ejecutar obtendremos el siguiente response:

```json
{
  "id": 1,
  "payload": {
    "price": "85"
  }
}
```

```json
// Desde Insomnia
// Method: DELETE,
// url: http://localhost:s3000/products/1
```

Al ejecutar obtendremos el siguiente response:

```json
{
  "id": 1
}
```

</details>

## Códigos de estado HTTP / status code

<details>
<summary>Detalle</summary>

El status code es un estandar que recibiremos ante cada solicitud que enviemos al backend. Ejemplos

**200** -> Resulto con éxito
**201** -> entidad creada con éxito
**401** -> Unauthorized
**404** -> Not found
**500** -> Internal server error

Los distintos código se clasifican de acuerdo al número:

- Informational responses (100 – 199)
- Successful responses (200 – 299)
- Redirection messages (300 – 399)
- Client error responses (400 – 499)
- Server error responses (500 – 599)

> En el siguiente enlace se encuentran los status code representados con imagenes de gatitos: https://http.cat/

Por defecto Nest envía el estatus code pero vamos a ver como customizarlo.

```ts
// products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpStatus, // Importamos el decorador
  HttpCode, // Importamos
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}
  // ...

  @Get(':productId')
  @HttpCode(HttpStatus.OK) // Envia un statusCode 200
  getOne(@Param('productId') productId: string) {
    return `Respuesta producto id: ${productId}`;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  update(@Param('id') id: number) {
    return { id };
  }

  // ...
}
```

Más adelante veremos como enviar un statusCode para el caso de error, ya que puede deberse a varios motivos y cada uno posee su propio statusCode.

Recordemos que Nest realiza abstracciones sobre otro framework, por ejemplo Express. Podríamos utilizar los objetos request y response de Express para manipularlo, pero dejamos de utilizar los decoradores y nos atamos al utilizar Express por debajo.

```ts
// products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpStatus, // Importamos el decorador
  HttpCode, // Importamos
  Res
} from '@nestjs/common';

import {Response} from 'express'

@Controller('products')
export class ProductsController {
  constructor() {}
  // ...

  // @Get(':productId')
  // @HttpCode(HttpStatus.OK) // Envia un statusCode 200
  // getOne(@Param('productId') productId: string) {
  //   return `Respuesta producto id: ${productId}`;
  // }

  @Get(':productId')
  @HttpCode(HttpStatus.OK) // Envia un statusCode 200
  getOne(@Res() response: Response @Param('productId') productId: string) {
    response.status(200).send(`Respuesta producto id: ${productId}`);
  }
}
```

De la misma manera, podemos utilizar el request de Espress, por ejemplo para ontener un token. También podríamos crear nuestro propio decorador para realizarlo (lo veremos más adelante). Aunque lo ideal es utilizar los decoraderes de Nest Js.

</details>

## Servicios

<details>
<summary>Detalle</summary>

Los servicios son parte importante de Nest Js. Los controladores se conectan a los servicios y los servicios manipula la información, pueden conectarse a los DATA MODEL o DATA ACCESS para crear esta información o manipularla.

![Servicios.](/astro-doc-full-stack/images/nest-js/services.webp)

Los servicios tiene un dcorador especial llamado **@Injetable**· significa que utilizaremos el patrón **inyección de dependencias**. Más adelante veremos de que trata.

El cli de Nest también posee un comando para crear servicios.

```bash
# Creará el servicio products dentro de la carpeta /src/services.
# No creará la carpeta products dentro de services porque colocamos el flag --flat
# También actualiza en app.module.ts
nest g s services/products --flat
```

```bash
|
|-> /src
|     |-> controllers
|     |       |-> products.controller.ts
|     |       |-> products.controller.spec.ts
|     |       |-> categories.controller.ts
|     |       |-> categories.controller.spec.ts
|     |-> services
|             |-> products.service.ts
|             |-> products.service.spec.ts
|
```

```ts
// product.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {}
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductController } from './products/products.controller.ts';
import { CategoriesController } from './categories/categories.controller.ts';
import { AppService } from './app.service';
import { ProductsService } from './sercices/products.service';

@Module({
  imports: [],
  controllers: [AppController, ProductController, CategoriesController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
```

> Por el momento vamos a almacenar los productos en memoria, en otro post del blog veremos cómo utilizar una Base de Datos

Crearemos un array privado en memoria que contendrá los productos. Inicialmente, lo crearemos con unos productos ejemplo, y lo tiparemos.

Creamos la carpeta /src/entities y adentro la entida product.entity.ts.

```ts
// product.entity.ts

export class Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}
```

```ts
// product.service.ts
import { Injectable } from '@nestjs/common';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  // Simulamos el id. Luego lo gestionará la BD

  private counterId = 0;
  private products: Product[] = [
    {
      id: 1,
      name: 'Camisas para hombre',
      brand: 'Calvin Klein',
      description: 'Camisas para hombre Calvin Klein - azul, negra, blanca',
      price: 20,
      stock: 27,
      image: 'https://...',
    },
    {
      id: 2,
      name: 'Calzado de seguridad',
      brand: 'Ombu',
      description: 'Calzado de trabajo Ombu Ozono. Segurida y Confort',
      price: 60,
      stock: 34,
      image: 'https://...',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  // Por el momento no tipamos el payload para crear productos,
  // utilizamos any pero ya lo reemplazaremos
  create(payload: any) {
    this.counterId = this.counterId + 1;

    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.products.splice(index, 1);
    return { id };
  }
}
```

</details>

## Implementando servicios en el controlador

<details>
<summary>Detalle</summary>

Vamos a implementar el servicio desde el controlador utilizando la inyección de dependencias.

```ts
// products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';

import { ProductsService } from './../services/products.service';

@Controller('products')
export class ProductsController {
  // El motor de nest resuelve la inyección de dependencias.
  // Crea una instanciade ProductsService y la pasa al controlador
  // De esta forma inyectamos el servicio
  constructor(private productsService: ProductsService) {}

  // ...

  @Get()
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string
  ) {
    return this.productsService.findAll();
  }

  @Get(':productId')
  getOne(@Param('productId') productId: string) {
    return this.productsService.findOne(Number(productId));
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.productsService.update(Number(id), payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}
```

</details>

## Manejo de errores con throw y NotFoundException

<details>
<summary>Detalle</summary>

### Errores manejados en forma dinámica

Si desde Insomnia realizamos un get a un id de producto que no existe el backend contestrá con status code 200 pero no returnorá ningún producto. Esto es un error, debería retornar un status code 404 con el mensaje 'product not found'.

**NotFoundException** nos brinda un conjunto de excepciones que podemos manejar. Rn el siguiente link podremos ver el listado de excepciones que podemos gestionar: https://docs.nestjs.com/exception-filters#built-in-http-exceptions

```ts
// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  // Simulamos el id. Luego lo gestionará la BD

  private counterId = 0;
  private products: Product[] = [
    {
      id: 1,
      name: 'Camisas para hombre',
      brand: 'Calvin Klein',
      description: 'Camisas para hombre Calvin Klein - azul, negra, blanca',
      price: 20,
      stock: 27,
      image: 'https://...',
    },
    {
      id: 2,
      name: 'Calzado de seguridad',
      brand: 'Ombu',
      description: 'Calzado de trabajo Ombu Ozono. Segurida y Confort',
      price: 60,
      stock: 34,
      image: 'https://...',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  // Por el momento no tipamos el payload para crear productos,
  // utilizamos any pero ya lo reemplazaremos
  create(payload: any) {
    this.counterId = this.counterId + 1;

    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);

    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }

    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('product not found');

    this.products.splice(index, 1);
    return { id };
  }
}
```

Ahora desde Insomnia podemos realizar estas peticiones.

```json
// Desde Insomnia
// Method: DELETE,
// url: http://localhost:s3000/products/1
```

```json
// Response
{ "id": 1 }
```

Si intentamos eliminar un producto que no existe obtendremos:

```json
// Desde Insomnia
// Method: DELETE,
// url: http://localhost:s3000/products/12
```

```json
// Response
{
  "statusCode": 404,
  "message": "product not found",
  "error": "Not found"
}
```

</details>

## Introducción a pipes

<details>
<summary>Detalle</summary>

En Nest Js los **pipes** poseen dos usos principales: **transformar** y **validar información**. Y debemos tener en cuenta que la salida de un pipe puede ser la entrada de otro.

Podemos ver un ejemplo concreto con los prámetros que recibimos en la url. Recordemos que siempre llegará en forma de string.

En el ejemplo estamos casteando de string a number al momento de invocar al servicio. Pero, ¿qué pasaría si enviamos una palabra como id? Tendríamos un problema al pasar la palabra a number.

La solución es utilizar un pipe que realice la validación verificando que el id recibido en el parámetro posee la forma de un id.

Documentación Pipes: https://docs.nestjs.com/pipes

Existen varios pipes ya implementados en Nest Js -> https://docs.nestjs.com/pipes#built-in-pipes. Uno de los más utilizados es parseIntPipe, que justamente es el que necesitamos.

El Pipe Se envía como segundo parámetro en el decorador

```ts
// products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from './../services/products.service';

@Controller('products')
export class ProductsController {
  // El motor de nest resuelve la inyección de dependencias.
  // Crea una instanciade ProductsService y la pasa al controlador
  // De esta forma inyectamos el servicio
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string
  ) {
    return this.productsService.findAll();
  }

  // El Pipe Se envía como segundo parámetro en el decorador
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
```

Ahora desde Insomnia si intentamos consultar un productio con un id de tipo string obtendremos el error del pipe.

```json
// Desde Insomnia
// Method: GET,
// url: http://localhost:s3000/products/cat
```

```json
// Response
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```

De esta forma éste pipe valida y transforma a un número el parámetro recibido en la url

</details>

## Pipe personalizados

<details>
<summary>Detalle</summary>

Para crear un pipe en una carpeta llamada /src/common utilizaremos un generador del cli.

Crearemos un pipe que transforme de string a int. Este pipe ya se encuentra integrado en Nest pero lo realizaremos por cuestiones didácticas.

```bash
nest g pipe common/parse-int
```

```bash
|
|-> /src
|     |-> controllers
|     |       |-> products.controller.ts
|     |       |-> products.controller.spec.ts
|     |       |-> categories.controller.ts
|     |       |-> categories.controller.spec.ts
|     |-> services
|     |       |-> products.service.ts
|     |       |-> products.service.spec.ts
|     |-> common
|             |-> parse-int.pipe.ts
|             |-> parse-int.pipe.spec.ts
|
```

```ts
// parse-int.pipe.ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

El generador nos crea la estructura básica, asi que ahora podemos modificarlo según nuestras necesidades.

```ts
// parse-int.pipe.ts
import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException} from '@nestjs/common';

@Injectable()
export class ParseIntPipe impletments PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not a number`);
    }

    return val;
  }
}
```

Ahora desde el controlador podemos utilizar nuestro pipe.

```ts
// products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  // parseIntPipe,
} from '@nestjs/common';

import { ProductsService } from './../services/products.service';
import { parseIntPipe } from './../common/parse-int.pipe';

@Controller('products')
export class ProductsController {
  // El motor de nest resuelve la inyección de dependencias.
  // Crea una instanciade ProductsService y la pasa al controlador
  // De esta forma inyectamos el servicio
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string
  ) {
    return this.productsService.findAll();
  }

  // El Pipe Se envía como segundo parámetro en el decorador
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
```

> Info Extra. Realmente es muy diferente el pipe del core de Nest Js al que creamos? Recordemos que podemos acceder al código de Nest Js, y ver cómo se programó el pipe. También podemos realizar una mejora, generar un pull request y contribuir con Nest Js. El repositorio se encuentra en: https://github.com/nestjs/nest

```ts
// nest/packages/common/pipes/parse-int.pipe.ts

import { Injectable } from '../decorators/core/injectable.decorator';
import { Optional } from '../decorators/core/optional.decorator';
import { HttpStatus } from '../enums/http-status.enum';
import {
  ArgumentMetadata,
  PipeTransform,
} from '../interfaces/features/pipe-transform.interface';
import {
  ErrorHttpStatusCode,
  HttpErrorByCode,
} from '../utils/http-error-by-code.util';
import { isNil } from '../utils/shared.utils';

/**
 * @publicApi
 */
export interface ParseIntPipeOptions {
  errorHttpStatusCode?: ErrorHttpStatusCode;
  exceptionFactory?: (error: string) => any;
  optional?: boolean;
}

/**
 * Defines the built-in ParseInt Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  protected exceptionFactory: (error: string) => any;

  constructor(@Optional() protected readonly options?: ParseIntPipeOptions) {
    options = options || {};
    const { exceptionFactory, errorHttpStatusCode = HttpStatus.BAD_REQUEST } =
      options;

    this.exceptionFactory =
      exceptionFactory ||
      ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }

  /**
   * Method that accesses and performs optional transformation on argument for
   * in-flight requests.
   *
   * @param value currently processed route argument
   * @param metadata contains metadata about the currently processed route argument
   */
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    if (isNil(value) && this.options?.optional) {
      return value;
    }
    if (!this.isNumeric(value)) {
      throw this.exceptionFactory(
        'Validation failed (numeric string is expected)'
      );
    }
    return parseInt(value, 10);
  }

  /**
   * @param value currently processed route argument
   * @returns `true` if `value` is a valid integer number
   */
  protected isNumeric(value: string): boolean {
    return (
      ['string', 'number'].includes(typeof value) &&
      /^-?\d+$/.test(value) &&
      isFinite(value as any)
    );
  }
}
```

Como vemos la función **transform** no difiere demasido con la que construimos.

</details>

## Data Transfers Objects

<details>
<summary>Detalle</summary>

Para validar datos como los que llegan en un payload necesitamos implementar un **patrón** que son los **Data Trandfers Objects**. Son objetos que nos permitirán tipar y validar la información que nos llega, la data de transferencia, que luego utilizaremos para crear o actualizar una entidad.

**¿Por qué no utilizamos la entidad?** Basicamente no es una buena práctica y es mejor tenerlos separados porque hay ocasiones en las que necesitamos atributos agregados en la transferencia de información que no necesariamente terminarán en la entidad (Base de datos).

- Creamos la carpeta /src/dtos y adentro el archivo products.dtos.ts

```ts
// products.dtos.ts

export class CreateProductDto {
  // readonly no permite que modifiquemos el valor
  readonly name: string;
  readonly brand: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly image: string;
}

export class UpdateProductDto {
  // readonly no permite que modifiquemos el valor
  readonly name?: string;
  readonly brand?: string;
  readonly description?: string;
  readonly price?: number;
  readonly stock?: number;
  readonly image?: string;
}
```

```ts
// products.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  // parseIntPipe,
} from '@nestjs/common';

import { ProductsService } from './../services/products.service';
import { parseIntPipe } from './../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Controller('products')
export class ProductsController {
  // El motor de nest resuelve la inyección de dependencias.
  // Crea una instanciade ProductsService y la pasa al controlador
  // De esta forma inyectamos el servicio
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string
  ) {
    return this.productsService.findAll();
  }

  // El Pipe Se envía como segundo parámetro en el decorador
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
```

```ts
// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {

  // Simulamos el id. Luego lo gestionará la BD

  private counterId = 0;
  private products: Product[] = [
    {
      id: 1,
      name: 'Camisas para hombre',
      brand: 'Calvin Klein',
      description: 'Camisas para hombre Calvin Klein - azul, negra, blanca',
      price: 20,
      stock: 27,
      image: 'https://...',
    },
    {
      id: 2,
      name: 'Calzado de seguridad',
      brand: 'Ombu',
      description: 'Calzado de trabajo Ombu Ozono. Segurida y Confort',
      price: 60,
      stock: 34,
      image: 'https://...',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  create(payload: CreateProductDto) {

    // La siguiente línea arroja un alerta de typescript
    // porque indicamos el readonly en dto
    // payload.name = 'Change name';
    this.counterId = this.counterId + 1;

    const newProduct = {
      id: this.counterId
      ..payload
    }
    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {

    const product = this.findOne(id);

    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
        };
      return this.products[index];
    }

    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1)  throw new NotFoundException('product not found');

    this.products.splice(index, 1);
    return {id}
  }
}
```

Con este tipado evitamos cometer errores al desarrollar pero recordemos que en momento de ejecución no se realizan estas validaciones.

</details>

## Validando parámetros con class-validator y mapped-types

<details>
<summary>Detalle</summary>

<mark>Ya tenemos validación de tipos desde la experiencia de desarrollo, pero ¿Cómo hacer esta validación desde la ejecución? Que los tipos coincidan con lo que estamos esperando en los dtos.</mark>

Instalaremos dos dependencias que integraremos con los dtos.

Documentación de class-validator -> https://github.com/typestack/class-validator
Nota sobre mapped-types -> https://trilon.io/blog/introducing-mapped-types-for-nestjs

```bash
npm i class-validator class-transformer @nestjs/mapped-types
```

```ts
// products.dtos.ts
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
// isEmail, isDate, etc

export class CreateProductDto {
  // readonly no permite que modifiquemos el valor
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDto {
  // readonly no permite que modifiquemos el valor
  readonly name?: string;
  readonly brand?: string;
  readonly description?: string;
  readonly price?: number;
  readonly stock?: number;
  readonly image?: string;
}
```

**class-validator** también nos permite la opción de retornar mensajes personalizados para cada una de las validaciones. Solo basta con, en la validación que corresponda, agregar un objeto con la key message que contendra dicho mensaje.

```ts
  @IsString({message: 'El nombre del producto debe ser un string'})
  @isNotEmpty()
  readonly name: string;
```

Fianlemente, para activar las validacoines de class-validator debemos modificar main.ts.

```ts
// main.ts

import { NestFactory } from '@nest/core';
import { appModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
```

> Ahora podemos probar la creación de un producto omitiendo algún atributo o modificando el tipo de precio a string para ver cómo nos responde el backend.

Y, ¿Cómo podemos realizar las validaciones sobre el dto para update? Podríamos replicar las validaciones pero existe una forma más eficiente de hacerlo.

**mapped-types** nos ayuda a reutilizar código extendiendo clases que ya tenemos. PartialType transforma todos los atributos en opcionales de forma automática.

```ts
// products.dtos.ts
import { PartialType } from '@nestjs/mapped-types';

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
// isEmail, isDate, etc

export class CreateProductDto {
  // readonly no permite que modifiquemos el valor
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

</details>

## Evitar parámetros incorrectos

<details>
<summary>Detalles</summary>

¿Qué ocurre si en el body para crear un producto enviamos un atributo que no esperamos? Puede ser un error del cliente o algo malicioso. No estamos alertando este tipo de situaciones.

<mark>Cuando trabajamos con bases de datos relacionales no hay demasiado problema porque el atributo no existe en la entidad (será ignorado). Pero en las bases de datos NoSQL puede ser peligroso porque no poseen un esquema definido.</mark>

Para evitar esta situación debemos modificar el archivo main.ts, indicando que simplemente se ignore el atributo "extra" o que directamente se rechace la petición con un Bad Request.

```ts
// main.ts

import { NestFactory } from '@nest/core';
import { appModule } from './app.module';
import { ValidationPipe } from '@nest/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGolbalPipes(
    new ValidationPipe({
      // Elimina del payload los atributos que no esten definidos en el dto
      whitelist: true,
      // Rechaza la petición indicando que se envía un atributo que no es esperado
      forbidNonWhitelisted: true,
    })
  );
  await app.listen(3000);
}

bootstrap();
```

</details>

## controladores y servicios restantes

<details>
<summary>Detalle</summary>

Ya tenemos todas las bases y hemos avanzado en el proyecto. Ahora llego la hora del RETO y este será hacer los demás controladores, así es debes crear los controladores, DTOs y servicios para:

Products
Categories
Brands
Users
Customers

Nuestro app.module.ts debería ser parecido a:

```ts
// app.module.ts

// ...
@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController, // 👈
    CategoriesController, // 👈
    BrandsController, // 👈
    CustomerController, // 👈
    UsersController, // 👈
  ],
  providers: [
    AppService,
    ProductsService, // 👈
    CategoriesService, // 👈
    BrandsService, // 👈
    CustomersService, // 👈
    UsersService, // 👈
  ],
})
export class AppModule {}
```

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
