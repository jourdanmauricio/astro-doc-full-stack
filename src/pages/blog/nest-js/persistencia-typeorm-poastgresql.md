---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Persistencia de Datos con TypeORM y PostgreSQL
date: 2024-02-12
author: Mauricio Jourdán
image:
  { src: '/astro-doc-full-stack/images/nest-js/back.webp', alt: Logo nest js' }
icon:
  { src: '/astro-doc-full-stack/images/nest-js/icon.png', alt: 'Logo Nest js' }
description: NestJS - Persistencia de Datos con TypeORM y PostgreSQL
draft: false
category: Nest js backend
---

- Documentación: https://nestjs.com/
- Repositorio del proyecto: https://github.com/jourdanmauricio/nest-ecommerce
- Branch Fundamentos: git clone -b persistencia-typeorm https://github.com/jourdanmauricio/nest-ecommerce

Para agregar persistencia a nuestro proyecto utilizaremos typeORM y PostgreSQL como base de datos. Aunque como utilizamos typeORM y docker para la base de datos será muy simple cambiar el gestor de base de datos por ejemplo a MySQL.

## Cómo instalar Docker

<details>
<summary>Detalle</summary>

### Instalación en Windows con WSL

Debes descargar el instalador desde la página de Docker for Windows.

Cuando ya tienes instalado Docker Desktop dentro de tus programas debes abrirlo y debes asegurarte que la opción “Use the WSL 2 based engine” está habilitada:

Luego en la sección “Resources > WSL Integration”, asegurarate que la opcion “Enable integration with my default WSL distro”, este habilitada:

Puedes ver más detalles de Docker con WLS en https://docs.docker.com/desktop/wsl/

### Instalación en Windows

Debes descargar el instalador desde la página de Docker for Windows -> https://docs.docker.com/desktop/install/windows-install/

Cuando ya tienes instalado Docker Desktop dentro de tus programas, una de las cosas que debes tener en cuenta en la instalación con Windows es que debes contar con Windows 10 de 64 Bits o superior y debes habilitar el Hyper-V de Windows.

Si quieres conocer los detalles, aquí te dejo el detalle como habilitar Hyper-V desde la Interfaz de Windows -> https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v

### Instalación en macOS

En Mac tienes dos opciones. Todo dependerá si tienes los nuevos chips M1 o Intel, ya que hay un instalable apropiado para ambas arquitecturas de chip. Puedes escoger el instalable desde https://docs.docker.com/desktop/install/mac-install/

Adicionalmente, si cuentas con los nuevos chips M1, debes ejecutar la siguiente instrucción en tu terminal softwareupdate --install-rosetta

Una vez descargues el instalador adecuado, solo debes seguir los pasos y pasar Docker Desktop a tus aplicaciones.

### Instalación en Ubuntu

Estos son los pasos para instalarlo dentro de Ubuntu, sin embargo, también puedes ver directamente en https://docs.docker.com/engine/install/ubuntu/

```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo docker run hello-world
```

Para otras distribuciones de Linux:

- Install Docker Engine on CentOS
- Install Docker Engine on Debian
- Install Docker Engine on Fedora

</details>

## Configuración de PostgresSQL en Docker

<details>
<summary>Detalle</summary>

Utilizamos docker como contenedor para correr bases de datos, así no tendremos problemas de configuración, drivers, sistemas operativos, etc. No lidiamos con problemas de instalación.

Veamos cono levantar PostgreSQL en un contenedor.

> Instalar la extensión para VSCode YAML (Red Hat), ya que docker-compose utiliza YAML para su configuración.

Creamos un archivo llamado docker-compose.yml en la raiź del proyecto.

```yml
# docker-compose.yml
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=my_db
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=123456
    ports:
      - '5432:5432'
```

Levantamos el servicio:

```bash
docker-compose up -d postgres
```

Verificamos que el contenedor quedo en ejecución en segundo plano

```bash
docker-compose ps

          Name                        Command              State                    Ports
-----------------------------------------------------------------------------------------------------------
my-ecommmerce_postgres_1   docker-entrypoint.sh postgres   Up      0.0.0.0:5432->5432/tcp,:::5432->5432/tcp
```

```bash
# Baja el contenedor
docker-compose down
```

Por defecto docker no posee estado, es de tipo statless, no posee persistencia. Esto quiere decir, que si bajamos el contenedor perderemos los datos de la base de datos. Para generar persitencia debemos definir un volumen en nuestro archivo de configuración.

La siguiente configuración creará una carpeta ./postgres_data. Como forma parte del proyecto debemos incluir /postgres_data en el .gitignore .

```yml
# docker-compose.yml
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=my_db
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=123456
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

</details>

## Explorando postgres con interfaces gráficas y terminal

<details>
<summary>Detalle</summary>

Desde la terminal podemos ingresar al contenedor y directamente ejecutar comnados SQL.

```bash
# Vemos el log del container
docker-compose logs -f postgres

# Para ingresar al container
docker-compose exec postgres bash

# una vez dentro del container podemos ingresar a la BD
psql -h localhost -d my_db root

# Vemos las tablas de la bd, pero aún no hemos creado ninguna
\d
#Did not find any relations.

# Salimos de la BD
\q

# Salimos del contenedor
exit
```

También podemos utilizar una interfaz gráfica para conectarnos a la base de datos que se encuentra en ejecución dentro del contenedor. Para ello modificaremos el docker-compose configurando un nuevo servicio que llamaremos **pg-admin**.

```yml
# docker-compose.yml
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=my_db
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=123456
    ports:
      - '5432:5432'
    volumes:
      - ./postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=root@admin.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - '5050:80'
```

Levantamos el nuevo servicio y lo podemos ver en funcionamiento en http://localhost:5050. Nos logueamos con email: root@admin.com y password: root

```bash
docker-compose up -d pgadmin

docker-compose ps

         Name                        Command              State                       Ports
---------------------------------------------------------------------------------------------------------------
my-ecommerce_pgadmin_1    /entrypoint.sh                  Up      443/tcp, 0.0.0.0:5050->80/tcp,:::5050->80/tcp
my-ecommerce_postgres_1   docker-entrypoint.sh postgres   Up      0.0.0.0:5432->5432/tcp,:::5432->5432/tcp
```

![Pg admin login.](/astro-doc-full-stack/images/nest-js/pg-admin.webp)

Para conectarnos a la base de datos debemos crear un nuevo servidor.

Objeto / Register/ Servidor...

En la ventana emergente ingresamos:

Name: my_db

y en la pestaña connection:

Host: postgres
Port: 5432
Maintenance database: postgres
Username: root
Password: 123456

![Pg admin.](/astro-doc-full-stack/images/nest-js/pg-admin2.webp)

Para crear una tabla clickeamos en:
my_db / Bases de Datos / my_db / Esquemas / public y en la parte superior Herramienta de consulta, ingresamos el siguiente comando SQL y presionamos play.

```SQL
CREATE TABLE tasks (
  id serial PRIMARY KEY,
  title VARCHAR (255) NOT NULL,
  completed boolean DEFAULT false
);
```

Si le damos con el boton derecho a eschemas y actualizamos, ya nos debería aparecer **la tabla tasks**.

</details>

## Integración de node-postgres con NestJS

<details>
<summary>Detalle</summary>
Para conectarnos desde nuestro servidor a la base de datos postgres debemos utilizar el driver oficial instalando la dependencia pg. También debemos instalar los tipos para la librería como dependencia de desarrollo.

<mark>Vamos a probar la conexión a la base de datos insertando algunos registros a la tabla de pruba tasks y consultándolos cuando levantamos el servidor.</mark>

- Inatalación de dependencias

```bash
npm i pg
npm i @types/pg -D
```

- Agregamos algunos datos a la tabla tasks desde la consola.

```sql
-- docker-compose exec postgres bash
-- psql -h localhost -d my_db root

INSERT INTO tasks (title) VALUES ('Tarea 1'), ('Tarea 2'), ('Tarea 3');

SELECT * FROM tasks;
```

- Conexión

```ts
//app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import axios from 'axios';
import * as Joi from 'joi';
import { Client } from 'pg';

import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabseModule } from './databse/databse.module';
import config from './config';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

// Establecemos la conexion
client.connect();
// ejecutamos un query
client.query('SELECT * FROM tasks', (err, res) => {
  // el método trabaja con error first
  // imprimimos el error
  console.log('Error', err);
  // imprimimos las filas del resultado
  // cuando levantemos el backend veremos los logs
  console.log('Result', res.rows);
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
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

- Verificación

```bash
$ npm run start:dev

[Nest] 466020  - 26/03/2024, 06:13:06     LOG [InstanceLoader] ProductsModule dependencies initialized +0ms
[Nest] 466020  - 26/03/2024, 06:13:06     LOG [InstanceLoader] UsersModule dependencies initialized +1ms
Error null
Result [
  { id: 1, title: 'Tarea 1', completed: false },
  { id: 2, title: 'Tarea 2', completed: false },
  { id: 3, title: 'Tarea 3', completed: false }
]
[Nest] 466020  - 26/03/2024, 06:13:06     LOG [InstanceLoader] AppModule dependencies initialized +47ms
[Nest] 466020  - 26/03/2024, 06:13:06     LOG [RoutesResolver] AppController {/}: +27ms
```

</details>

## Conexión como inyectable y ejecutando un SELECT

<details>

<summary>Detalle</summary>

Ya tenemos la conexión a la base de datos. La mejor estrategía para que cualquier servicio pueda acceder a esta conexión sería colocarla en un inyectable. Dejaremos la conexión en el módulo Global database.module.

Pasaremos la conexión que realizamos en app.module a database.module. Al final tenemos un objeto llamado client que podemos pasar como useValue.

<mark>Recordemos que **todo provider posee el patrón de inyección de dependencias**, entonces cada que un controlador solicite una conexión enviará la misma instancia de conexión. **Solo existirá una connexión a la Base de datos.**</mark>

- Incorporamos la conexión a database.module

```ts
// database.module.ts
import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

client.connect();

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD12345678';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabseModule {}
```

- Eliminamos la prueba de la conexión de app.module, y comentamos la solicitud a jsonplaceholder.

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
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
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

- Probamos la conexión desde el servicio app.service. Creamos un nuevo método llamado getTasks. También creamos un nuevo endpoint en el controlador app.controller que ejecute el método.

```ts
// app.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    // Inyectamos la conexíon
    @Inject('PG') private clientPg: Client
  ) {}
  getHello(): string {
    console.log('TASKS', this.tasks);
    const apiKey = this.configService.apiKey;
    const dbNane = this.configService.database.name;
    return `Hello World! ${apiKey}: ${dbNane}`;
  }
  getTasks() {
    // Teníamos un callback, pero en next necesitamos retornar el resultado al controlador
    // a través de una promesa o un observable
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  }
}
```

```ts
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): string {
    return 'Server working correctly';
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
```

![Nest Prueba de conexón a BD.](/astro-doc-full-stack/images/nest-js/nest-connection-db.webp)

</details>

## Usando variables de ambiente

<details>
<summary>Detalle</summary>

<mark>La conexíon que establecimos posee los datos de la base de datos hardcodeados en el código. Utilizaremos las variables de entorno para establecer la conexión dinámicamente de acuerdo al entorno (dev, stag, prod), y así tendríamos 3 bases de datos, una para cada ambiente. </mark>

- Variables de entorno. Recordemos trasladar las la variables a .stag.env y a .prod.env

```bash
# .env
API_KEY=12345678
DATABASE_NAME=my_db
DATABASE_PORT=5432

## DB
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=my_db
POSTGRES_USER=root
POSTGRES_PASSWORD=123456
```

- Leemos y Validamos los tipos de las nuevas variables

```ts
// config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      dbHost: process.env.POSTGRES_HOST,
      dbPort: parseInt(process.env.POSTGRES_PORT, 10),
      dbName: process.env.POSTGRES_DB,
      dbUser: process.env.POSTGRES_USER,
      dbPass: process.env.POSTGRES_PASSWORD,
    },
    apiKey: process.env.API_KEY,
  };
});
```

```ts
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
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        // DB Postgres
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
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

- Utilizamos las variables en database.module para disponibilizar la conexión al resto de módulos.

```ts
// database.module.ts

import { ConfigType } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import config from '../config';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD12345678';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbHost, dbPort, dbName, dbUser, dbPass } =
          configService.postgres;
        const client = new Client({
          host: dbHost,
          port: dbPort,
          database: dbName,
          user: dbUser,
          password: dbPass,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabseModule {}
```

- Probamos la nueva conxión desde el modulo users. Creamos un nuevo endpoint y servicio para consultar la tabla tasks en la base de datos.

```ts
// users.controller.ts
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
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('tasks')
  getTasks() {
    return this.usersService.getTasks();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
```

```ts
//users.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ProductsService } from './../../products/services/products.service';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Client } from 'pg';

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
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log('apiKey', apiKey);
    console.log('atabaseName', dbName);
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
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  }
}
```

<mark>Ahora podemos utilizar la conexón a la base de datos desde cualquier servicio. Simplemente debemos inyectar la conexón al constructor (@Inject('PG') private clientPg: Client).</mark>

</details>

## ¿Qué es un ORM? Instalando y configurando TypeORM Module

<details>
<summary>Detalle</summary>

ORM -> Object Relational Model. Un ORM se encarga de la conexión y las consultas SQL a la base de datos, a travé de modelos y entidades. Nos brinda una abstracción para no utilizar SQL directamente a través de métodos.

Existen dos ORMs muy utilizados en Node js: sequelize y typeORM. Nosotros utilizaremos typeORM, que se encuentra desarrollado con typeScript por lo que su integración con Nest es muy buena.

Documentación: https://typeorm.io/

### Integración de Nest con TypeORM

- Instalación

```bash
npm install --save @nestjs/typeorm typeorm
```

Una vez que se completa el proceso de instalación, podemos importar TypeOrmModule al database.module.

```ts
// database.module.ts
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import { Client } from 'pg';
import config from '../config';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD12345678';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbHost, dbPort, dbName, dbUser, dbPass } =
          configService.postgres;
        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPass,
          database: dbName,
          // entities: [],
          // synchronize: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbHost, dbPort, dbName, dbUser, dbPass } =
          configService.postgres;
        const client = new Client({
          host: dbHost,
          port: dbPort,
          database: dbName,
          user: dbUser,
          password: dbPass,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabseModule {}
```

</details>

## Creando tu primera entidad

<details>
<summary>Detalle</summary>

Las entidades son una pieza clave del ORM. Definimos las columnas, el nombre de las tablas, qué métodos tendrá, etc.

Comenzaremos creando la entidad de producto. Recordemos que ya tenemos definida la entidad de productos como una clase. Ahora la envolveremos en un schema (decorador Entity) para que lo lea TypeORM y utilizamos los decoradores para definir la entidad.

También indicaremos al módulo de producto que utilizaremos esta entidad.

```ts
// product.entity.ts
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;
}
```

```ts
// products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
```

> <mark>Crear el resto de entidades -> brand, category, user, customer </mark>

</details>

## TypeORM: active record vs. repositories

<details>
<summary>Detalle</summary>

**TypeORM** dispone de dos patrones para que seleccionemos de qué manera gestionaremos la creación, actualización, eliminación y búsqueda en base a entidades.

- **<mark>Active Record</mark>** -> Utiliza la misma instancia para realizar el save. Por ejemplo, si queremos crear un producto, creamos una instacia de la entidad (new Product), asignamos los atributos del producto y utilizando la misma instancia aplicamos el método .save. Para realizar una búsqueda, como no tenemos la referencia del objeto, se utiliza el nombre de la clase (await Product.findOne(1)). El modelo se encarga de todo, tiene la responsabilidad de realizar búsquedas y su propia instancia de salvar, crear o actualizar. Ejemplo:

```ts
const product = new Product();
product.name = 'Product 1';
await product.save();
// ...
await product.remove();
// ...
await Product.finOne(1);
```

- **<mark>Repositories</mark>** -> este patrón divide las responsabilidades. La responsabilidad del modelo será solo de los atributos, pero el repository se encarga de las operaciones. Entonces creamos la instancia del repositorio y la instancia del producto (modelo), pero la actualización, búsqueda y eliminación se realiza a partir del repository. Ejemplo:

```ts
const productRepo = connection.getRepository(Product);
const product = new Product();

product.name = 'Product 1';
await productRepo.save(product);
// ...
await productRepo.remove(product);
// ...
await productRepo.finOne(1);
```

El patrón repository genera la división de responsabilidades, el modelo es solo una instancia y es el repositorio es quien se encarga de las operaciones.

<mark>La recomendación de Nest Js con TypeORN es utilizar el patrón Repository, nos brinda un injectable para inyectar los repositorios en los servicios.</mark>

Aplicaremos el patrón repository a products.service. Ya no trabajaremos en memoria porque se almacenarán en la BD.

</details>

## Consultar, crear, actualizar y eliminar

<details>
<summary>Detalle</summary>

Veamos como ejemplo como queda el módulo de producto aplicando el patrón repository.

```ts
// database.module.ts
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import { Client } from 'pg';
import config from '../config';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD12345678';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbHost, dbPort, dbName, dbUser, dbPass } =
          configService.postgres;
        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPass,
          database: dbName,
          // entities: [],
          // A medida que modifiquemos las tablas sincronizarán con la BD
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbHost, dbPort, dbName, dbUser, dbPass } =
          configService.postgres;
        const client = new Client({
          host: dbHost,
          port: dbPort,
          database: dbName,
          user: dbUser,
          password: dbPass,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabseModule {}
```

```ts
// products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
```

```ts
// product.entity.ts
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

// Indicamos que el nombre en la base de datos sea en plural
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  // Eliminamos el atributo brand

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;
}
```

```ts
// products.dtos.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
// isEmail, isDate, etc

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

```ts
// products.controller.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
// import { ParseIntPipe } from './../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string
  ) {
    return this.productsService.findAll();
  }

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
products.service.ts;
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  // Simulamos el id. Luego lo gestionará la BD

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }
  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
```

> <mark>Todos los métodos dl products se encuentran gestionando la base de datos. Ahora debemos trasladar la misma lógica al resto de las entidades.</mark>

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
