---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 7 - NestJS File Upload
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: NestJS File Upload
draft: false
category: Backend Js Nest
---

## Carga de archivos

## Implementación de estrategias para gestionar cargas de archivos

Hasta el día de hoy, hemos venido trabajando únicamente con aplicaciones que trabajan compartiendo información en formato **JSON**, a través de un protocolo de comunicación. Independientemente de lo básica o compleja de la estructura compartida, no ha sido más que información basada en texto plano con dicho tipo de formato.

A medida que nuestras aplicaciones crecen tanto en complejidad como en funcionalidad, puede llegar a surgir la necesidad de tener en cuenta algunas consideraciones adicionales.

<mark>¿Qué ocurre cuando la transferencia de información es un archivo, como un PDF, un TXT o una carpeta completa comprimida como ZIP?</mark>

> Cuando trabajamos con aplicaciones que facilitan la transferencia de archivos, es importante que dentro de estas **implementemos estrategias** que nos permitan gestionar las solicitudes de carga y descarga de información en variados formatos.

**Estas estrategias incluyen**:

- El uso de bibliotecas externas como Multer, una biblioteca de NodeJS para gestionar la carga de archivos. Puedes integrar Multer en una aplicación NestJS utilizando middlewares personalizados o creando un proveedor de middleware reutilizable.

- La integración con servicios de almacenamiento en la nube para guardar archivos de manera escalable y segura como son Amazon S3, Google Cloud Storage o Azure Blob Storage.

- La validación y procesamiento de archivos Una vez que los archivos se cargan, podemos dar uso a los pipes que nos permitan validar las características de estos. Dichas características pueden ser la extensión o el tamaño del archivo determinando si cumple con las condiciones de nuestra aplicación.

Estas son solo algunas de las estrategias más comunes del manejo de archivos, veamos cómo implementarlas.

## File Upload

Como mencionamos anteriormente, Nest hace uso de Multer por defecto para el procesamiento de archivos. Este es un middleware de Node.js que permite a los usuarios cargar archivos, como imágenes, documentos, archivos de audio, videos, entre otros, enviados a través de formularios HTML. Multer facilita la validación, gestión y procesamiento de estos archivos antes de almacenarlos en el servidor.

Para trabajar con este middleware, solo necesitamos instalar sus reglas de tipado y así usarlo en conjunto con TS dentro de Nest. Esto se hace ejecutando el comando

```bash
npm i @types/multer
```

Veamos cómo implementarlo dentro de una aplicación. En esta ocasión vamos a trabajar en el controlador de tareas, dentro del cual agregaremos un método de tipo POST para cargar archivos en formato PDF, por ejemplo.

Para cargar un archivo en Nest solo debemso habilitar un endpoint y utilizar un decorador.

```ts
// todos.controller.ts
import { Controller, Get, Post, UseInterceptor } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('upload')
  @UseInterceptor(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
```

Ahora podemos realizar una petición de tipo POST al endpoint http://localhost:3000/todos/upload. El body no es de tipo JSON sino que es un FORM y el form es de tipo FILE. Debemos seleccionar un archivo para subir y llamar al atributo como "file".

La respuesta será:

```json
{
  "filename": "file",
  "originalname": "archivo1.webp",
  "encoding": "7bit",
  "mimetype": "image/web",
  "buffer": {
    "type": "Buffer",
    "data": [
      82, 24, 59, ..., 54  // Array de bytes
    ]
  },
  "size": 16862,
}
```

**Buffer**: área de memoria temporal utilizada para almacenar datos.

Vamos a guardar esta información (el archivo) en una tabla de la base de datos. Y asociaremos esta nueva tabla con la de todos en una relación 1:N. Cada todo generado puede tener uno o más archivos.

Dentro de la carpeta todos creamso un archivo llamado files.entity.

```ts
// src/todos/files.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Todo } from './todos.entity.ts';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column({ type: 'bytea' })
  data: Buffer;

  @ManyToOne(() => Todo, (todo) => todo.files)
  @JoinColumn({ name: 'todo_id' })
  todo: Todo;
}
```

```ts
// src/todos/todos.entity.ts
import { Entity, Colunm, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './files.entity.ts';

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

  @OneToMany(() => File, (file) => file.todo)
  files: File[];
}

```

```ts
// todos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosController } from './todos.controllers';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';
import { FilesService } from './files.service';
import { Todo } from './todos.entity.ts';
import { File } from './files.entity.ts';

const TOKEN = 'Clave Super Secreta';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, File])],
  controllers: [TodosController],
  providers: [
    TodosService,
    FilesService,
    TodosRepository,
    {
      provide: 'ACCESS_TOKEN',
      useValue: TOKEN,
    },
  ],
})
export class TodosModule {}
```

```ts
// todos.service.ts
import { Injectable } from '@nestjs/common';

import { Todo } from './todos.entity.ts';

@Injectable()
export class TodosService {
  constructor(
    private todosRepository: TodosRepository,
    @Inject('ACCESS_TOKEN') private accessToken: string,
    @InjectRepository(Toto) private todosBdRepository: Rpository<Todo>
  ) {}

  getTodos() {
    return this.todosRepository.find({ relations: ['files'] });
  }

  findById(id: number) {
    return this.todosRepository.findOne({
      where: { id },
      relations: ['files'],
    });
  }

  create(todo: Omit<Todo, 'id'>) {
    return this.todosRepository.save(todo);
  }
}
```

```ts
// src/todos/files.services.ts
import { Injectable } from '@nestjs/common';
import { InjectaRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from './files.entity';
import { Todo } from './todos.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private readonly filesRepository: Repository<File>
  ) {}

  async saveFile({
    name,
    mimeType,
    data,
    todo,
  }: {
    name: string;
    mimeType: string;
    data: Buffer;
    todo: Todo;
  });

  const file = new File();
  file.name = name;
  file.mimeType = mimeType;
  file.data = data;
  file.todo = todo;

  return this.filesRepository.save(file);
}
```

```ts
// todos.controller.ts
import { Controller, Get, Post, UseInterceptor, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly filesService: FilesService
  ) {}

  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getTodos(@Param('id') id: number) {
    return this.todosService.findById(id);
  }

  @Post()
  createTodo(@Body() private todo: any) {
    return this.todoService.create(todo);
  }

  @Post('upload')
  @UseInterceptor(FileInterceptor('file'))
  async uploadFile(
    @Body('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    const todo = await this.todosService.findById(id);

    return this.filesService.saveFile({
      name: file.originalname,
      mimeType: file.mimeType,
      data: file.buffer,
      todo,
    });
  }
}
```

```bash
npm run migration:generate src/migrations/files
npm run build
npm run migration:run
```

Ahora podemos subir un archivo al servidor y será insertado en la BD. Pero primero creamos un todo.

```json
// POST http://localhost:3000/todos
{
  "title": "Test",
  "description": "Una tarea que tendrá un archivo asociado"
}
```

```json
// POST http://localhost:3000/todos/upload
// Fied name: 1
// File archivo.webp
{
  "title": "Test",
  "description": "Una tarea que tendrá un archivo asociado"
}
```

Este es un buen ejemplo de cómo realizar la carga de **archivos directamente** en la base de datos, una práctica común al trabajar con aplicaciones que manejan volúmenes pequeños de información.

Sin embargo, esta técnica cuenta con un limitante ya que a medida que la aplicación escale, el **volumen de datos podría aumentar** proporcionalmente afectando la eficiencia de la base de datos y, por ende, de la aplicación.

Debido a lo anterior, una alternativa para la gestión de archivos dentro de un proyecto es la **integración de herramientas** de almacenamiento en la nube.

## Almacenamiento en la nube

El **almacenamiento en la nube** hace referencia al servicio de almacenamiento de datos en servidores remotos accesibles a través de Internet.

> En lugar de usar bases de datos locales o dispositivos físicos, permite guardar y acceder de forma remota a los datos mediante una conexión web.

Para tener una idea más clara de este concepto, imagina que tienes un e-commerce donde vendes productos artesanales.

En lugar de almacenar las imágenes de los productos en tu propio servidor web, decides usar un servicio de almacenamiento en la nube.

- Subes las imágenes a la nube y creas una API en tu servidor local para acceder a ellas.

- Ahora, cuando alguien visita tu tienda en línea y selecciona un producto, la aplicación web llama a la API, que recupera rápidamente la imagen asociada desde la nube.

> Este enfoque no solo mejora la eficiencia al reducir la carga del servidor local, sino que también te permite escalar fácilmente y actualizar imágenes sin afectar directamente tu servidor web.

<mark>Existen diversas opciones para integrar servicios de almacenamiento en la nube:</mark>

La elección de la herramienta adecuada depende mucho de las necesidades del proyecto, así como los gustos del equipo desarrollador.

Entre las principales alternativas que encontramos en el mercado están Microsoft Azure, AWS (Amazon Web Services), Google Cloud Storage, Cloudinary, IBM Cloud Storage, entre otros.

Para esta oportunidad, veamos un ejemplo de cómo integrar nuestros proyectos con **Cloudinary**.

Este servicio en la nube ofrece una solución integral para la gestión de archivos multimedia, como imágenes y videos, a través de una API muy simple para la conexión con Nest JS.

## Conexión y configuración de servicios de almacenamiento en la nube

El primer paso es crear una cuenta en **Cloudinary** (https://cloudinary.com/) lo cual es muy sencillo. Solo basta registrar un correo electrónico y asignar una contraseña, o hacer el ingreso con una cuenta de Google. Una vez registrados, nos preguntará cuáles son nuestros intereses.

Esto solo es para determinar qué veremos en la pantalla de inicio de nuestro panel de control al ingresar.

En este caso seleccionamos la opción **Coding with APIs and SDKs**.

```bash
npm install cloudinary buffer-to-stream
```

```bash
# .env.delopment
DB_NAME=pm4_db
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=example

CLOUDINARY_CLOUD_NAME=XXXXXXXXXXXXXXX
CLOUDINARY_API_SECRET=XXXXXXXXXXX
CLOUDINARY_API_KEY=XXXXXXXXXXXX
```

```ts
// src/config/cloudinary.ts

import {v2} from 'cloudinary';
import {config as dotenvConfig} from 'dotenv';

dotenvConfig({ path: '.env.development'});

export const CloudinaryConfig =  {
  provide: 'cloudinary'
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      api_key: process.env.CLOUDINARY_API_KEY,
    })

  }
}
```

```ts
// src/users/cloudinary.service.ts
import {Injectble} from '@nestjs/common';
import {UploadApiResponse, v2} from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectble()
export class ClodinaryService() {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {resource_type: 'auto'},
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result);
          }
        }
      );
      toStream(file.buffer).pipe(upload)
    })
  }
}
```

```ts
// users.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryConfig } from 'src/config/cloudinary';

import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CloudinaryService } from './cloudinary.service';
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
    CloudinaryConfig,
    CloudinaryService,
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
  UploadedFile,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';
import { User } from './user.interface';
import { User as UserEntity } from './user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { DateAdderInterceptor } from './../interceptors/date-adder.interceptor';
import { usersDBService } from './usersDB.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CloudinaryService } from './cloudinary.service';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // ...

  @Get(':id')
  getUserById(@Param('id', parseUUIDPipe) id: string) {
    return this.usersDBService.getUserById(id);
  }

  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  createUserImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file);
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

Ahora podemos realizar un post a http://localhost:3000/users/profile/images pasandole el atibuto image y la imagen que desamos subir.

Nustro servidor enviará el archivo a Cloudinary y nos responderá la información de alojamiento de la imagen (tipo, tamaño, url, etc).

Ahora pero, **¿qué ocurre si enviamos una imagen en lugar de un pdf o cargamos una imagen en un formato no permitido para mi aplicación**?

De igual manera que cuando validamos objetos dentro de una ruta, la validación de archivos es fundamental para garantizar la coherencia de los datos y el correcto funcionamiento de la aplicación.

## Procesamiento y validación de archivos

## Implementación de procesos para el procesamiento y validación de archivos

Para validar archivos de manera sencilla, contamos con el pipe integrado de Nest llamado **ParseFilePipe**.

Este pipe contempla las dos principales verificaciones que se implementan en la carga de archivos:

- Tamaño
- Tipo de archivo

Hace uso de los validadores integrados **MaxFileSizeValidator**, que verifica que el archivo no pase de una tamaño especificado en bytes y, **FileTypeValidator**, que verifica el tipo de archivo a partir de un string definido o una Regex.

**Procesamiento y validación**

Para validar el tipo y tamaño de archivos utilizaremos pipes.

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
import { CloudinaryService } from './cloudinary.service';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // ...

  @Get(':id')
  getUserById(@Param('id', parseUUIDPipe) id: string) {
    return this.usersDBService.getUserById(id);
  }

  // Agregamos Pipes
  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  createUserImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000,
            message: `El archivo debe ser menor a 100kb`,
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.cloudinaryService.uploadImage(file);
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

Si queresmo realizar validaciones personalizadas podemos crear nuestro propio validator. Para ello, creamos la carpeta src/pipes y creamos un archivo llamado MinsizeValidator.pipe.ts

```ts
// src/pipes/MinsizeValidator.pipe.ts
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from 'nestjs/common';

@Injectable()
export class MinsizeValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const minSize = 100000;
    if (value.size < minSize) {
      throw new BadRequestException('El tamaño deñ archivo es muy pequeño');
    }

    return value;
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
import { CloudinaryService } from './cloudinary.service';

@Controller('users')
// @UseGuard(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // ...

  @Get(':id')
  getUserById(@Param('id', parseUUIDPipe) id: string) {
    return this.usersDBService.getUserById(id);
  }

  // Agregamos Pipes
  @Post('profile/images')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(MinSizeValidatorPipe)
  createUserImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000,
            message: `El archivo debe ser menor a 100kb`,
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.cloudinaryService.uploadImage(file);
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

De esta manera, podemos agregar nuevas validaciones a los archivos que se enviarán en la solicitud a través de pipes personalizados. **¡Te invitamos a probar por tu cuenta! **

Haz el ejercicio con distintos tipos de validaciones para
archivos y tamaños personalizados.

## Cierre

En esta clase hemos explorado el manejo de cargas de archivos en Nest JS, así como las mejores prácticas y técnicas para una manipulación segura y efectiva de archivos dentro del entorno de desarrollo.

Conocimos la integración con servicios de almacenamiento en la nube, centrándonos específicamente en Cloudinary. Este enfoque permite externalizar y optimizar el manejo de archivos, aprovechando las capacidades de almacenamiento y entrega de servicios en la nube especializados.

Finalmente, se abordaron las estrategias de procesamiento y validación de archivos mediante pipes nativos y personalizados, proporcionando herramientas clave para mejorar la modularidad y reutilización del código, así como asegurar la integridad y seguridad de los datos. Este conocimiento no solo fortalece nuestra capacidad técnica, sino que también nos impulsa hacia un desarrollo más eficiente y robusto.

Con estas habilidades y conocimientos adquiridos, estamos preparados para enfrentar desafíos relacionados con la gestión de archivos en nuestras aplicaciones NestJS de manera efectiva y profesional.

## Homework

### ACTIVIDAD 01

Configurar una cuenta en Cloudinary y generar las credenciales de acceso correspondientes.

### ACTIVIDAD 02

Crear la conexión dentro de la aplicación mediante un archivo de configuración.

### ACTIVIDAD 03

Crear el módulo, servicio, controlador y repositorio correspondientes para la gestión de archivos.

### ACTIVIDAD 04

Desarrollar la lógica para la carga de imágenes a Cloudinary y la actualización de imágenes de los productos en la DB. Este proceso será realizado por medio del endpoint /files/uploadImage/:id que recibe por parámetros el id del producto cuya imagen queremos actualizar y el archivo a emplear en el cuerpo de la solicitud.

### ACTIVIDAD 05

La DB debe reflejar los cambios efectuados en el campo imgUrl

### ACTIVIDAD 06

Implementar pipes para la validación del tamaño de imagen (no mayor a 200kb) así como los tipos de imagen permitidos.

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
