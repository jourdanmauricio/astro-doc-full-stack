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

## Sync Mode vs. Migraciones en TypeORM

<details>
<summary>Detalle</summary>

**Migraciones** -> es la forma en que controlamos los cambios hacia la base de datos.

En el proyecto utilizamos la **versión síncrona de TypeORM**. Cuando configuramos la conexión tenemos una bandera que indica **synchroniza: true**. Las consecuencias de esta bandera es que cada vez que creamos una entidad o agregamos un atributo, lo sincroniza directamente a la BD. Por eso cuando ejecutamos el proyecto ya estaban disponibles las tablas.

Este modo de sincronizar es buena práctica en desarrollo o para ambientes de testing. En producción es mala práctica y es riesgosa, puede corremper la BD o borrar una columna que tiene información productiva.

Para evitar este problema se creatron las **migraciones**. Las migraciones son como un control de versión de la BD. Entonces cuando creemos una nueva entidad tendremos una migración para crear la tabla en la BD, o cuando alteramos un campo. Así disminuimos el riesgo de perder información.

Sync Mode en TypeORM es una opción que se puede utilizar cuando se está trabajando con una base de datos de TypeORM. Sync Mode indica si TypeORM debe sincronizar la estructura de la base de datos con el modelo de entidades que se está utilizando. Si Sync Mode está habilitado, TypeORM comparará la estructura de la base de datos con el modelo de entidades y, si hay alguna diferencia, modificará la base de datos para que coincida con el modelo de entidades.

Las migraciones, por otro lado, son un proceso que se utiliza para realizar cambios en la estructura de una base de datos de manera controlada y documentada. Las migraciones se pueden utilizar para hacer cosas como agregar o eliminar tablas, modificar columnas existentes o agregar nuevas columnas a una tabla. Al utilizar migraciones, se puede tener un control más preciso sobre los cambios que se están realizando en la base de datos y revertir cambios si es necesario.

En general, Sync Mode es útil cuando se está trabajando en un entorno de desarrollo y se quiere que TypeORM se encargue de mantener la base de datos sincronizada con el modelo de entidades. Las migraciones, por otro lado, son más adecuadas para entornos de producción, ya que permiten un mayor control y documentación de los cambios que se realizan en la base de datos.

</details>

## Configurando migraciones y npm scripts

<details>
<summary>Detalle</summary>

El CLI de TypeORM nos ayuda a generar las migraciones de forma automática, muy similar al CLI de Nest que nos ayuda a crear controladores, módulos, servicios, etc.

Para ejecutar las migraciones con TypeORM se requiere de una conexión propia a la BD. Esta configuración es aparte de la que tenemos con Nest.

Para leer la variables de ambiente tendremos que utilizar el package dotenv. Ya que no utilizaremos los módulos de Nest. Podemos ejecutar las migraciones sin que el servidor se encuentre en ejecución. Por eso, leemos directamente las variables de .env.

```bash
npm i dotenv
npm i ts-node --save-dev
```

```ts
// src/database/data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.TYPEORM_URL,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  logging: Boolean(process.env.TYPEORM_LOGIN),
  migrations: [process.env.TYPEORM_MIGRATIONS],
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
  entities: [process.env.TYPEORM_ENTITIES],
});
```

```sh
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
TYPEORM_URL='postgres://root:123456@localhost:5432/my_db'
TYPEORM_ENTITIES='src/**/*.entity.ts'
TYPEORM_LOGGING=false
TYPEORM_MIGRATIONS='src/database/migrations/*.ts'
TYPEORM_MIGRATIONS_TABLE_NAME='migrations'
TYPEORM_SYNCHRONIZE=false
```

```json
// package.json
// ..
"scripts": {
  //...
  "typeorm": "typeorm-ts-node-esm -d src/database/data-source.ts",
  "migrations:generate": "npm run typeorm -- migration:generate",
  "migrations:run": "npm run typeorm -- migration:run",
  "migrations:show": "npm run typeorm -- migration:show",
  "migrations:drop": "npm run typeorm -- schema:drop",
  "migrations:revert": "npm run typeorm -- migration:revert"
},
//...
```

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
          // pasamos synchronize a false
          synchronize: false,
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

Antes de crear mas migraciones vamos a eliminar las tablas existentes para crearlas a partir de la migración inicial. Ejecutar este comando con mucha precausión ya que elimina todas las tablas y su información.

```bash
npm run migrations:drop
```

Creemos la primera migración con el CLI de typeORM

```bash
npm run migrations:generate ./src/database/migrations/init
```

Corremos las migraciones

```bash
npm run migrations:run
```

</details>

## Modificando una entidad

<details>
<summary>Detalle</summary>

Si agregamos un nuevo atributo a una tabla, ¿Cómo lo controlamos en una migración?

A la entidad de productos le agregaremo los campos createdAt y updatedAt a través de los decoradores que nos ofrece TypeORM.

<mark>Como los dos nuevos campos son generados por default no debemos agregarlos al dto. timestamptz -> asigna zona horaria.</mark>

```ts
// product.entity
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
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

  // timestamptz -> asigna zona horaria
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  // timestamptz -> asigna zona horaria
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
```

```bash
npm run migrations:generate ./src/database/migrations/product-add-fields
npm run migrations:run
npm run migrations:show

# [X] 1 Init1711514850150
# [X] 2 ProductAddFields1711571479528
```

</details>

## Relaciones uno a uno

<details>
<summary>Detalle</summary>
Dentro de las bases de datos relaciones existen las relaciones **uno a uno**, **uno a muchos** y **muchos a muchos**.

Comenzaremos por la relación uno a uno entre user y customer. Un customer puede tener un usuario (no es obligatorio porque tenfremos users administrativos que no son customers), y un user solo puede tener un customer.

<mark>Las relaciones uno a uno tienen una **llave foranea (FK)** que nos lleva hacia la otra tabla. Alguna de las dos tablas debe llevar la relación. **No importa demasiado cuál es la tabla que lleva la relación, TypeORM nos dá la posibilidad de hacer la referencia bidireccional**</mark>, pero por practicidad la colocaremos en la tabla user para saber si un user es un customer.

En el proyecto que la relación sea bidireccional significa que cuando trabajamos con usuarios puedo saber si ese usuario tiene o no un customer (haciendo el join de forma automática) pero si estamos trabajando en customer, ¿cómo podría saber si ese customer tiene un usuario? No lo podríamos saber en forma directa a menos que hagamos un query. La relación bidireccional nos permite tener la referencia desde user a customer como desde customer a user.

```ts
// user.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // JoinColumn crea la referencia hacia la otra tabla
  // Se coloca en la tabla que queremos que cargue la relación
  // Joincolumn no se puede colocar en las dos tablas
  // nullable: true -> indica que pueden existir users que no sean customers
  // Para que funcione la relación bidireccional debemos
  // especificar contra que campo se resuelve la referencia
  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn()
  customer: Customer;
}
```

```ts
// customer.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Para que funcione la relación bidireccional debemos
  // especificar contra que campo se resuelve la referencia
  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;
}
```

```bash
npm run migrations:generate ./src/database/migrations/user-customer-relation
npm run migrations:run
npm run migrations:show

# [X] 1 Init1711514850150
# [X] 2 ProductAddFields1711571479528
```

</details>

## Resolviendo la relación uno a uno en el controlador

<details>
<summary>Detalle</summary>

Al momento de crear un user podríamos tener el id del customer (no es obligatorio), asi que comenzamos por agregar el campo customerId al dto de users.

Modificamos el servicio de users para que al momento de crear un usuario, obtener el customerId para poder relacionarlo. También modificaremos el método find para que al consultar todos los usuarios retorne la información de customers indicando la relación.

```ts
// user.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
} from 'class-validator';
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

  @IsOptional()
  @ApiProperty()
  @IsPositive()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

```ts
// users.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Client } from 'pg';

import { User } from '../entities/user.entity';
import { ProductsService } from './../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { CustomersService } from './customers.service';

// import { Order } from '../entities/order.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private configService: ConfigService,
    private productsService: ProductsService,
    @Inject('PG') private clientPg: Client,
    private customersService: CustomersService
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log('apiKey', apiKey);
    console.log('atabaseName', dbName);
    // retornamos los users con la relacion a customers
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    // Buscamos el customerId
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
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

Creamos un user de tipo administrador que no tendrá su contraparte como customer.

![Crear user admin.](/astro-doc-full-stack/images/nest-js/create-user-admin.webp)

Creamos un customer.

![Crear customer.](/astro-doc-full-stack/images/nest-js/create-customer.webp)

Creamos el user para ese customer.

![Crear user customer.](/astro-doc-full-stack/images/nest-js/create-user-customer.webp)

Finalmente comprobamos la relación al obtener todos los usuarios.

![Obtener todos los usuarios.](/astro-doc-full-stack/images/nest-js/getAllUsers.webp)

Como vemos el user admin no posee un usuario customer, pero el user con role customer posee la relación.

</details>

## Relaciones uno a muchos

<details>
<summary>Detalle</summary>

Para ilustrar las relaciones **1 a muchos** vamos a utilizar productos y marcas. Un producto solo puede pertenecer a una marca, pero una marca puede estar ligada a muchos productos.

En una relación de 1 a muchos la entidad débil es la que lleva la relación. Product es la que tiene que tener la referencia porque un producto solo puede tener una marca.

En esta oportunidad también dfefiniremos la relación bidireccional, ya que nos puede interesar obtener todos los productos al consultar una marca.

No utilizaremos el decorador @JoinColmun porque TypeORM sabe que la entidad que carga con la relación, es la ManyToOne, la que poseerá la Foreing Key.

```ts
// brand.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
```

```ts
// product.entity.ts
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Brand } from './brand.entity';

@Entity({ name: 'products' })
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

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
```

```bash
npm run migrations:generate ./src/database/migrations/brand-product-relation
npm run migrations:run
```

</details>

## Resolviendo la relación uno a muchos en el controlador

<details>
<summary>Detalle</summary>

```ts
// products.dto.ts
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

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  brandId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

```ts
// products.services.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  // Simulamos el id. Luego lo gestionará la BD

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsService: BrandsService
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newProduct.brand = brand;
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);

    // Si hay cambio de marca
    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
```

```ts
// brands.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!brand) throw new NotFoundException('category not found');
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);
  }

  remove(id: number) {
    return this.brandRepo.delete(id);
  }
}
```

![Create brand.](/astro-doc-full-stack/images/nest-js/create-brand.webp)

![Create product.](/astro-doc-full-stack/images/nest-js/create-product.webp)

![Get product.](/astro-doc-full-stack/images/nest-js/brand-products.webp)

</details>

## Relaciones muchos a muchos

<details>
<summary>Detalle</summary>

Una relación muchos a muchos implica tener una tabla terciaria. TypeORM la gestiona por nosotros a través del decorador JoinTables, que se debe colocar en solo lado de la relación, sin importar en cuál de las tablas se define.

En el proyecto estbleceramos la relación muchos a muchos entre categories y products. Un producto puede tener muchas categorías y una categoría puede tener muchos productos.

```ts
// catgory.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product[];
}
```

```ts
// product.entity.ts
import { Category } from './category.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Brand } from './brand.entity';

@Entity({ name: 'products' })
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

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];
}
```

```bash
npm run migrations:generate ./src/database/migrations/category-product-relation
npm run migrations:run
```

</details>

## Resolviendo la relación muchos a muchos en el controlador

<details>
<summary>Detalle</summary>

Al crear un producto debemos indicar que se encuentra relacionado a varias categorías. Lo primero que debemos modificar es el dto para crear este campo nuevo e indicar que es oblitagorio.

Una vez nos llegan las categorías en el dto debemos modificar el servicio de products para resolver la relación. Buscar las categorías para incoroirarlas al nuevo producto. Deberíamos realizar un for por cada categoría informada para realizar la búsqueda pero TypeORM posee el operador In que nos permite buscar un array de ids en una sola consulta ().

Por otro lado, modificaremos la consulta a brands reemplazando el servicio por el repositorio. Esto cambio se debe, a que al crear un producto se busca la información de la marca y el findOne de la marca trae la relación hacia productos nuevamente, y funciona pero tenemos redundancia de información.

También podemos modificar los gets de productos para que retorne la relación con categorías. Solo lo incorporaremos al findOne porque realizarlo en la consulta de todos los pructos puede traer demasiada información.

Finalmente, cuando realizamos un getOne por categoría deberíamos retornar los productos asociados a esa categoría.

```ts
// products.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
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

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly brandId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

```ts
// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    // private brandsService: BrandsService,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });

    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });

      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);

    // Si hay cambio de marca
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: changes.brandId },
      });
      product.brand = brand;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
```

```ts
// categories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) throw new NotFoundException('category not found');
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
```

</details>

## Manipulación de arreglos en relaciones muchos a muchos

<details>
<summary>Detalle</summary>

**¿Cómo actualizamos las categorías de un producto?** O, si deseamos eliminar una categoría del array de categorías en el producto.

```ts
// products.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
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

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly brandId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly categoriesIds: number[];
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

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: UpdateProductDto
  ) {
    return this.productsService.addCategoryToProd(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.removeCategoryByProd(id, categoryId);
  }
}
```

```ts
// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    // private brandsService: BrandsService,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });

    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async removeCategoryByProd(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId
    );

    return this.productRepo.save(product);
  }

  async addCategoryToProd(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });

    const category = await this.categoryRepo.findOneBy({ id: categoryId });
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);

    // Si hay cambio de marca
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: changes.brandId },
      });
      product.brand = brand;
    }

    // Si hay cambios en categorías
    // Esto funciona pero desde el front siempre
    // se debe enviar todas las categorías.

    // Una buena práctica para el manejo de arrays es
    // separarlo en un método diferente
    // y generar endpoints para agregar o quitar categorias
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(changes.categoriesIds),
      });
      product.categories = categories;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
```

</details>

## Relaciones muchos a muchos personalizadas

<details>
<summary>Detalle</summary>

Las relaciones ManyToMany son administradas automáticamente por TypeORM, crea la tabla ternaria (catgory_products), la gestión de la relación, etc. Crea la tabla con solo dos atributos. En nuestro proyecto una columna referenciando a productId y la otra a categoryId.

Pero que pasa si queremos una relación muchos a muchos con campos adicionales. Por ejemplo, orders y productos. Una orden de compra tiene muchos productos, así como muchos productos pueden pertecer a una orden compra. Podriamos utilizar ManyToMany, pero qué ocurre si queremos agregar a la tabla ternaria la cantidad de cada producto.

En esta situación, en la que tenemos que agregar campos a la tabla ternaria, nosotros debemos generar la tabla ternaria.

Crearemos la tabla order tendrá una relación OneToMany hacia el Customer. Y la tabla ternaria (order-items) que poseerá los items para esa order de compra. La tabla tendrá el orderId, el productId y la cantidad de ese producto.

```ts
// order.entity,ts
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
```

```ts
// customer.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Para que funcione la relación bidireccional debemos
  // especificar contra que campo se resuelve la referencia
  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
```

```ts
// order-item.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'int' })
  quantity: number;

  // Relación hacia products
  // No habililitamos la relación bidireccional
  // porque no nos interesa obtener las ordernes
  // en las que participó un producto.
  @ManyToOne(() => Product)
  product: Product;

  // Relación hacia orders
  // En este caso si establecemos la bidireccionalidad
  // Nos interesa los items de una orden,
  // y desde los obtener la info de la orden
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
```

```ts
// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Customer } from './entities/customer.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ProductsModule } from './../products/products.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
```

```bash
npm run migrations:generate ./src/database/migrations/create-order-orderItem
npm run migrations:run
```

</details>

## Resolviendo la relación muchos a muchos personalizada en el controlador

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
