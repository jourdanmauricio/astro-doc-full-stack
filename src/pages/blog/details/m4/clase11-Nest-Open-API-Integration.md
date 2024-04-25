---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 11 - Nest Open API Integration
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: Nest Open API Integration
draft: false
category: Backend Js Nest
---

## Documentación de APIs

########################################

**Documentación de APIs ¿Qué es?**

- Es un conjunto de recursos escritos.
- Describen cómo utilizar y acceder a una API específica.
- Permiten interactuar con la API de manera efectiva.
- Detalla los endpoints disponibles, los parámetros que se pueden enviar, los tipos de respuesta que se esperan, los códigos de estado HTTP posibles, entre otros.

La creación de una documentación eficiente es vital para mejorar la claridad y comprensión de los servicios de una API.

**Buenas prácticas para una documentación efectiva de APIs**

- Mantener la documentación actualizada
- Usa un formato legible y estructurado
- Proporciona ejemplos prácticos
- Documenta claramente los endpoints
- Describe los códigos de estado y errores
- Incluye información sobre autenticación y autorización
- Ofrece una guía de inicio rápido

**Generación de documentación Open Api**

**Open API Specification**

- También conocida como Swagger.
- Es una especificación que define un estándar o conjunto de reglas para describir APIs de manera clara y detallada.
- Facilita la comprensión, el diseño y la implementación de servicios web de manera consistente.

**Documentación de una API que trabaja con el estándar de OpenAPI**

- La estructura básica es un archivo en formato JSON o YAML.
- Describen las características de la aplicación de manera estandarizada.
- Facilita su desarrollo y puede ser interpretada en interfaces gráficas para mostrar su contenido como Swagger Editor o Swagger UI.

**Integrar Swagger en entornos NestJS**

- npm install --save @nestjs/swagger
- Para generar la documentación de una API hecha con Nest siguiendo las especificaciones de OpenAPI,
  contamos con un módulo enfocado en su construcción a partir de la lectura de los decoradores de la aplicación.
- main.ts: Dentro de la raíz del proyecto utiliza una instancia de **DocumentBuilder** de @nestjs/swagger. A dicha instancia le podemos encadenar diferentes métodos que nos permitirán construir la descripción general del proyecto.
- Construir el documento a partir de una instancia de la aplicación junto con la configuración definida
  previamente. Usar el método **createDocument** de la clase **SwaggerModule**. Setear a **SwaggerModule** mediante el método **setup**.

**Personalización de la documentación Open Api**

- Separar las rutas de acuerdo a la entidad de negocio que manejan por medio del decorador **@ApiTags**.
- Puede ser añadido antes de cada una de las rutas o controladores que consideremos agrupar.
- Utiliza el decorador **@ApiProperty**. Permite definir manualmente una propiedad. Utilizada para construir el schema dentro de la documentación.

**Nest CLI swagger plugin**

- Permite automatizar la definición de esquemas a partir de las propiedades de DTOS y entidades que se encuentran en la api con las extensiones **.dto.ts** y **.entity.ts**.
- Para utilizarlo se debe habilitar dentro de **nest-cli.json**.
- **classValidatorShim** obtiene información de las validaciones realizadas con class-validator.
- **introspectComments** permite la introspección y extracción de comentarios dentro del esquema
  para convertirlos en la descripción de la propiedad.

**Pruebas de Api con Swagger UI**

- Permite realizar simulaciones desde la API para validar el funcionamiento de la ruta según la información provista.

**Validaciónes**

- Agregar a la configuración del documento creado el método de autenticación que se implementó.
- Definir con el decorador **@ApiBearerAuth** aquellas rutas que requieren un token de acceso.

########################################

## ¿Qué es la documentación en APIs?

Entendemos por documentación en APIs a un **conjunto de recursos escritos** que describen cómo **utilizar y acceder a una API específica**. Esta documentación detalla los endpoints disponibles, los parámetros que se pueden enviar, los tipos de respuesta que se esperan, los códigos de estado HTTP posibles, entre otros. Toda esta información así como otros detalles técnicos necesarios, permiten interactuar con la API de manera efectiva.

La creación de una documentación eficiente es vital para mejorar la claridad y comprensión de los servicios de una API. Cabe resaltar que mediante la documentación nos aseguramos que el proceso de integración de la API en aplicaciones de terceros sea mucho más simple, ya que esta proporciona instrucciones detalladas de las solicitudes y respuestas que puede procesar.

Estos beneficios permiten mejorar la experiencia del desarrollador al momento de implementar la API, puesto que cuenta con información clara y concisa que facilita su comprensión y, por lo tanto, promueve su uso.

<mark>Buenas prácticas para una documentación efectiva de APIS</mark>

- **Mantener la documentación actualizada**: La documentación debe reflejar con precisión el estado actual de la API. Esto incluye describir las funciones, endpoints, parámetros y tipos de datos actualizados disponibles.

- **Usa un formato legible y estructurado**: La documentación debe estar bien organizada y utilizar un formato claro y legible. Puedes usar formatos, como OpenAPI o API Blueprint, que proporcionan una estructura clara para describir endpoints, parámetros, respuestas y ejemplos de uso.

- **Proporciona ejemplos prácticos**: Incluye ejemplos de uso reales que ayuden a los desarrolladores a comprender cómo interactuar con la API. Estos ejemplos deben cubrir casos comunes de uso y mostrar cómo enviar solicitudes y recibir respuestas correctamente.

- **Documenta claramente los endpoints**: Cada endpoint de la API debe estar claramente documentado, incluyendo su URL, método HTTP permitido, parámetros necesarios y opcionales, y ejemplos de posibles respuestas.

- **Describe los códigos de estado y errores**: Proporciona una lista de los códigos de estado HTTP que puede devolver la API, junto con una descripción de su significado. Además, documenta cualquier error específico que pueda ocurrir y cómo manejarlo correctamente.

- **Incluye información sobre autenticación y autorización**: Si la API requiere autenticación o autorización, asegúrate de documentar claramente los métodos admitidos (por ejemplo, tokens JWT, OAuth), cómo obtener y utilizar tokens de acceso, y qué permisos son necesarios para acceder a ciertos endpoints.

- **Ofrece una guía de inicio rápido**: Proporciona una guía paso a paso para que los desarrolladores puedan comenzar a usar la API rápidamente. Esto puede incluir instrucciones sobre cómo registrarse para obtener una clave de API, cómo realizar una solicitud de prueba y cómo interpretar la respuesta.

> Estas son solo algunas de las recomendaciones que te pueden ayudar a crear la documentación de una API de forma efectiva que mejore su comprensión y facilite el uso de tu aplicación.

Como mencionamos anteriormente, una de las opciones que pueden ayudarte a simplificar el proceso de creación de documentación es mediante un formato.

## Generacion de documentacion open API (swagger)

## Utilizar OpenAPI para generar documentación detallada de APIs

**Open API Specification** (OAS), también conocida como Swagger, es una especificación que define un estándar o conjunto de reglas para describir APIs de manera clara y detallada, facilitando la comprensión, el diseño y la implementación de servicios web de manera consistente. Piensa en las APIs de Google, Instagram o X, por ejemplo, cuyos servicios son utilizados en una infinidad de aplicaciones. Si su documentación no estuviera estandarizada de alguna manera, sería casi imposible de usar en cualquier desarrollo.

Un ejemplo de cómo luce la documentación de una API que trabaja con el estándar de OpenAPI (actualmente la versión 3.0) podemos encontrarlo en su **web oficial** (https://swagger.io/specification/) o en su **editor** (https://editor.swagger.io/).

No es más que un set de herramientas creado para trabajar con base en este estándar.

Por ahora, no pondremos mucha atención en el contenido del documento...

- Vemos, en primer lugar, que su estructura básica es un archivo en formato **JSON** o **YAML** (código a la izquierda), en el cual se describen las características de la aplicación de manera estandarizada.

> Esto no solo facilita su desarrollo sino que puede ser interpretada en interfaces gráficas para mostrar su contenido como Swagger Editor o Swagger UI.

Allí se desglosan los inputs y outputs de cada ruta, así como datos adicionales y detalles del servicio correspondiente, como información sobre autenticación, seguridad, etcétera.

Este estándar define múltiples campos empleados para definir los elementos de una API en pares **clave-valor**, que permiten identificar cada una de las partes de una ruta.

A pesar de la utilidad de esta herramienta, realizar la escritura detallada de nuestras API puede ser una tarea tediosa y extensa. Por suerte, existen múltiples herramientas que nos permiten generar la documentación de la API a partir de un código existente, como lo es **SwaggerHub**. Una de las ventajas de Nest es que esta integración ya está contemplada.

## Integrar Swagger en entornos NestJS

Para generar la documentación de una API hecha con Nest siguiendo las especificaciones de OpenAPI, contamos con un módulo enfocado en su construcción a partir de la lectura de los decoradores de la aplicación. Para incorporar este módulo al proyecto, es necesario realizar la instalación de las herramientas de Swagger por medio del comando.

```bash
npm install --save @nestjs/swagger
```

Una vez instalada, debemos configurarla dentro de la raíz del proyecto (archivo main.ts) utilizando una instancia de DocumentBuilder de **@nestjs/swagger**. A dicha instancia le podemos encadenar diferentes métodos que nos permitirán construir la descripción general del proyecto

Habilitamos la documentación en main.ts.

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Demo Nest')
    .setDecription(
      'Esta es una API contruida para ser empleada en las demos del módulo 4 de la especialidad Backend de la carrera Full Stack Developer de Henry'
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
```

En este momento, podemos ingresar a http://localhost:3000/api y automácamente veremos la documentación de los endpoints de la app. Incluso se encuentran los schemas, con sus dtos.

Nest / Swagger recorre nuestros controladores relevando los endpoinsts. De allí obtiene los parámetros, los dtos, etc.

La página web de la documentación se genera a partir de la especificación de Open API, que se genera en http://localhost:3000/api-json. Esta específicación permite que se pueda implementar en cualquier framework / lenguaje, es agnóstica a la tecnología de nuestro backend.

Hasta ahora, hemos conocido cómo integrar OpenAPI a nuestro entorno de desarrollo con Nest, a través de la librería Swagger. Veamos a continuación, de qué manera llenar los campos de los distintos endpoints establecidos en la documentación.

## Personalización de la documentación Open API

## Personalización de la documentación OpenAPI generada por Swagger

Ahora que tenemos la estructura base de la API, es momento de personalizar la información que será mostrada en la documentación. Esto lo haremos separando inicialmente las rutas de acuerdo a la entidad de negocio que manejan por medio del decorador **@ApiTags**, que puede ser añadido antes de cada una de las rutas o controladores que consideremos agrupar.

Podemos personalizar la documentación autogenerada agregando maś información. Por ejemeplo, la estructura de los dtos, la estructura del body para los endpoints de tipo post, etc.

También podemos agregar Tags para que en la web se organicen de acuerdo a la ruta agregando el decorador @ApiTags() en cada controlador.

```ts
// users.controller.ts
import { Role } from 'src/roles.emun';
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
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import { usersDBService } from './usersDB.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from './AuthService.service';

@ApiTags('Users')
@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService
  ) {}

  // ...
  @Get('profile')
  UseGuards(AuthGuard)
  getUserProfile(/*@Headers('token') token: string*/
  @Req() resquest: Resquest & { user: any }) {

    console.log("user: ", request.user)
    return "Perfil del usuario";
  }

  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAmin() {
    return "Ruta protegida";
  }

// ...
}
```

En cada propiedad de los dtos debemos agregar el decorador @ApiProperty() para que swagger lo incluya dentro de la esrtuctua del dto.

```ts
// createUser.dto.ts
import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLenght,
  IsEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'El nombre del usuario debe tener como mínimo 3 caracteres',
    example: 'Mauricio',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'El email del usuario debe ser un email válido',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLenght()
  @ApiProperty({
    description: 'La contraseña debe ser una contraseña dificil de encontrar',
    example: 'Strong!(Password',
  })
  password: string;

  @IsEmpty()
  @ApiProperty({
    description:
      'Asignada por default al momento de crear el usuario, no debe ser incluida en el body',
    default: false,
  })
  isAdmin: boolean;
}
```

> Esto parece no ser un trabajo difícil, sin embargo, si tuviéramos más DTOS que considerar, sería un poco engorroso hacerlo manualmente. Afortunadamente, podemos contar con una herramienta que nos dará una mano en esto.

### Nest CLI swagger plugin

Esta es una opción viable y muy utilizada al momento de definir schemas dentro de la documentación. **Nest CLI** tiene incorporado un **plugin** que permite automatizar la definición de esquemas a partir de las propiedades de DTOS y entidades que se encuentran en la api con las extensiones **.dto.ts** y **.entity.ts**.

Este **plugin** se encuentra incorporado por default en Nest, pero para utilizarlo se debe habilitar dentro de **nest-cli.json**. Allí mismo podemos sumarlo al array de plugins empleados por el CLI del proyecto, además de configurar algunas opciones que nos ayudan con la construcción de la documentación.

- Por ejemplo, si activamos la opción **classValidatorShim**, obtendremos información de las validaciones realizadas con **class-validator**, mientras que la opción **introspectComments**, permite la introspección y extracción de comentarios dentro del esquema para convertirlos en la descripción de la propiedad..

Para agregar el plugin de Swagger a Nest js tenemos que modificar el archivo nest-cli.json.

```json
// nest-cli.json

{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          // lee las validaciones de los decoradores
          "classValidatorShim": true,
          // lee los comentarios son necesidad de utilizar el @preperty
          "introspectComments": true
        }
      }
    ]
  }
}
```

Ahora la documentación se regerará y ya no es necesario colocar el @property en los dtos.

```ts
// createUser.dto.ts
import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLenght,
  IsEmpty,
} from 'class-validator';

export class CreateUserDto {
  /**
   * El nombre del usuario debe tener como mínimo 3 caracteres
   * @example: Mauricio
   */
  @IsNotEmpty()
  @IsString()
  // @ApiProperty({
  //   description: 'El nombre del usuario debe tener como mínimo 3 caracteres',
  //   example: 'Mauricio',
  // })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'El email del usuario debe ser un email válido',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLenght()
  @ApiProperty({
    description: 'La contraseña debe ser una contraseña dificil de encontrar',
    example: 'Strong!(Password',
  })
  password: string;

  @IsEmpty()
  @ApiProperty({
    description:
      'Asignada por default al momento de crear el usuario, no debe ser incluida en el body',
    default: false,
  })
  isAdmin: boolean;
}
```

Hemos visto de qué manera podemos personalizar la documentación generada por OpenAPI, sea que hagamos el proceso manualmente, o a partir del plugin de Swagger.

Resta probar que la información suministrada funcione perfectamente. Probemos a continuación, nuestra API desde la documentación.

## Pruebas de API con swagger UI

## Realizar pruebas de APIs utilizando OpenAPI

Hagamos algunas pruebas dentro de la documentación de **OpenAPI** para validar el correcto funcionamiento de la API. Observamos que en la ruta de registro de usuarios **“/users/signup”**, por ejemplo, se define la estructura del cuerpo de una request según las especificaciones del DTO, así como la estructura de la respuesta. esto nos permite realizar simulaciones desde la API para validar el funcionamiento de la ruta según la información provista.

Tratemos de hacer una prueba haciendo click en el botón **try it out**

![Pruebas Swagger](/astro-doc-full-stack/images/henry/m4/clase11/swagger.webp)

En este caso la prueba claramente fallará, pues el valor que estamos pasando por body no es el correcto.

![Pruebas Swagger](/astro-doc-full-stack/images/henry/m4/clase11/swagger2.webp)

- En realidad, solo son los tipos que definimos por medio del esquema. Cuando se definen los esquemas dentro de la documentación, se contempla la propiedad example para construir el cuerpo de una request adecuada, esta propiedad la podemos definir en forma de comentario dentro del código.

Una ventaja de utilizar los ejemplos de input de datos es que autocompleta el body al momento de ejecutar una prueba desde la documentación.

## Validación en pruebas con Swagger UI

Para probar rutas que trabajan con una autenticación por medio de tokens, es necesario agregar a la configuración del documento creado el método de autenticación que se implementó. En nuestro caso, será por medio de **addBearerAuth**. Posteriormente, se deben definir con el decorador **@ApiBearerAuth** aquellas rutas que requieren un token de acceso.

Entonces, modifiquemos la demo para permitir realizar pruebas sobre endpoints protegidos.

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Demo Nest')
    .setDecription(
      'Esta es una API contruida para ser empleada en las demos del módulo 4 de la especialidad Backend de la carrera Full Stack Developer de Henry'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
```

```ts
// users.controller.ts
import { Role } from 'src/roles.emun';
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
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import { usersDBService } from './usersDB.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from './AuthService.service';

@ApiTags('Users')
@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService
  ) {}

  // ...
  // auth para ejecutar pruebas desde documentación
  @ApiBearerAuth()
  @Get('profile')
  UseGuards(AuthGuard)
  getUserProfile(/*@Headers('token') token: string*/
  @Req() resquest: Resquest & { user: any }) {

    console.log("user: ", request.user)
    return "Perfil del usuario";
  }

  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAmin() {
    return "Ruta protegida";
  }

// ...
}
```

Ahora, aparecerá una indicación sobre los endpoints protegidos. Para poder ejecutar las pruebas sobre estos endpoints debemos realizar el login para obtener un token e ingresarlo al momento de ejecutar la prueba sobre el endpoint protegido.

**¡Excelente!** De esta manera, hemos logrado generar la documentación de una API creada en Nest cubriendo la mayoría de los aspectos a considerar con la demo que hemos construido.

- Al tener una API completa y 100% funcional, la creación y pruebas mediante Swagger es mucho más sencilla e intuitiva. Por el momento, estas bases te serán útiles para construir una API documentada de manera eficiente utilizando el estándar de OpenAPI.

## Cierre

En esta clase, exploramos a fondo la documentación de APIs, destacando las mejores prácticas para crear documentación efectiva.

Profundizamos en el uso de **OpenAPI** como una herramienta integral para generar documentación detallada de APIs, y aprendimos a integrar **Swagger** en entornos NestJS.

Además, exploramos la capacidad de personalizar la documentación OpenAPI generada por Swagger, utilizando herramientas como **Nest CLI swagger plugin**. Finalmente, hicimos algunas prácticas realizando pruebas de APIs mediante Swagger UI.

Recuerda la importancia de la documentación, esta será siempre una guía esencial para facilitar la comprensión y utilización adecuada de nuestras APIs.

## Homework

### Actividad 1

- Integrar Swagger a la aplicación para la generación dinámica de la documentación en la ruta /API.

- Cada controlador debe tener su propia etiqueta para facilitar la legibilidad.

### Actividad 2

- Mantener la protección de rutas que utilicen JWT, las rutas con control de acceso mediante roles únicamente pueden ser testeadas para validar errores.

- Los DTOs y entidades deben estar detallados en la documentación

- Las pruebas de la aplicación de forma integral en la interfaz de Open API deben ser funcionales.

**TIPs**

Puedes utilizar el formato con comentarios o decoradores para la definición y personalización de los DTOs y entidades.

**[REQUISITOS]**:

- Al finalizar el hito la aplicación debe mostrar la documentación completa de la aplicación donde se desglosen las rutas, DTOs y entidades disponibles para el correcto uso de la API.

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
