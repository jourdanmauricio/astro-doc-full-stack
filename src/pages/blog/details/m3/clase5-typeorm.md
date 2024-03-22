---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 5. TypeORM
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase5/back.webp',
    alt: 'A picture of a coder',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m3/clase5/icon.png',
    alt: 'Logo express',
  }
description: TypeORM
draft: false
category: TypeORM SQL Bases de datos
---

## TypeORM

Para comprender qué es **TypeORM**, comprendamos primero qué es una ORM.

Un **ORM** <mark>(Object Relational Mapping)</mark> es un tipo de herramienta que permite la interacción entre una base de datos relacional y código estructurado en objetos de JavaScript.

¿Recuerdas el concepto de **ODM** cuando hablábamos de Mongoose(opens in a new tab)? Su funcionamiento sería similar a cómo trabaja la ODM con bases de datos no relacionales. Veamos un ejemplo sencillo.

<mark>**TypeORM** es una biblioteca para trabajar en diferentes entornos de ejecución. En nuestro caso, el de node con enfoque en TypeScript y JavaScript nos proporciona una interfaz que permite transformar objetos a tablas de una base de datos relacional.</mark>

### ¿Por qué utilizar TypeORM y qué ventajas ofrece?

- Se destaca por brindar una experiencia de desarrollo más segura y completa
- Permitiendo trabajar con objetos y clases en lugar de escribir consultas SQL
- Es compatible con varios gestores de bases de datos relaciones, como PostgreSQL, MySQL, SQLite, y SQL Server
- Brinda flexibilidad según la necesidad del proyecto
- Se integra con facilidad con múltiples frameworks web, como Express en el entorno Node Js

A pesar de que **existen múltiples opciones para incorporar como ORM** a un proyecto que trabaja con bases de datos relacionales (como Hibernate, Entity, o Sequelize), TypeORM ha adquirido mucha más popularidad ya que proporciona una mayor simplificación del proceso de desarrollo y el mapeo de información.

Es compatible con varios gestores de bases de datos relacionales, como el ya conocido **PostgreSQL**, y otros como **MySQL, SQLite y SQL Server**, brindando flexibilidad según la necesidad del proyecto. Además, se integra con facilidad a frameworks como **express**.

## Instalación y Setup en un proyecto

Para trabajar con **TypeORM** es necesario instalar la librería junto con los complementos correspondientes a la base de datos con la cual trabaja nuestra aplicación (🚀PostgreSQL). El proceso de instalación se logra con este comando...

```bash
## No ejecutar
npx typeorm init --name demoTypeORM --database postgres
```

TypeORM posee comandos que nos permiten realizar la configuraciones pero como ya tenemos un proyecto avanzado modificará archivos que no deseamos. Va a pisar congiguraciones que ya realizamos. Por lo tanto, realizaremos la configuración paso a paso.

<mark>Documentación: https://typeorm.io/</mark>

<mark>Primeramente debemos crear la base de datos. Ejecutamos SQL Shell</mark>

```bash
CREATE DATABASE demo_typeorm;
```

```bash
npm install typeorm --save
npm install reflect-metadata --save
npm install pg --save
```

```typescript
// index.ts
import { PORT } from './config/envs';
import server from './server';
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';

AppDataSource.initialize().then((res) => {
  console.log('Conexión a BD OK');
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
```

```json
// tsconfig.json
...
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
"lib": ["ES6"],
...
```

```typescript
// src/config/data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'poostgres',
  password: 'admin',
  database: 'demo_typeorm',
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
```

```bash
npm run start
```

## Definición de modelos

### Creación de entidades y modelos

<mark>Las **entidades** representan objetos reales con propiedades y relaciones. Puedes tener, por ejemplo, una entidad “Usuario” con propiedades como nombre, edad e email.</mark>

<mark>Un **modelo**, por su parte, corresponde a una **clase de TypeScript** que define cómo se verán y se comportarán las entidades en tu aplicación. Estos modelos se usan para crear, leer, actualizar y eliminar datos.</mark>

Debemos modificar el archivo tsconfig.ts

```bash
# tsconfig.ts
...
"experimentalDecorators": true,
"emitDecoratorMetada": true,
"strictPropertyInitialization": false,
...
```

<mark>Para crear una entidad es necesario anteponer el decorador **@entity** de TypeORM.</mark>

<mark>Los **decoradores son funciones de TypeScript** inicializadas con "@" que nos permiten agregar múltiples características, propiedades y métodos a una clase.</mark>

El decorador **@column** sirve para identificar y construir columnas dentro de una tabla a partir de la información de las propiedades de la clase. Podemos agregar opciones o restricciones a la columna

Ya trabajamos con la interfaz user. Ahora la llevaremos a un modelo. Creamos la carperta entities en src.

```typescript
// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'users',
})
// definimos nombre de la tabla en BD. No utilizar user porque postgres ya posee una
// y las tablas se nombran en plural
export class User {
  // clave primaria y autoincremental
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string; // VARCHAR(100)

  @Column()
  email: string;

  @Column('integer')
  age: number;

  @Column()
  active: boolean;
}
```

Finalmente, debemos modificar el archivo de configuración para indicar las entidades que queremos que typeORM mapee.

```typescript
// src/config/data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'poostgres',
  password: 'admin',
  database: 'demo_typeorm',
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});
```

La tabla users ya se encuentra creada en la base de datos.

## Operaciones básicas

### Inserción de datos

Este paso tiene una característica muy importante. Debemos tener en cuenta la integridad de los datos. Es decir, que la información que queramos añadir a la tabla sea consistente con los respectivos campos que en ella están definidos.

```typescript
// scr/services/userServces.ts
import {AppDataSource} from '../config/data-source';
import {User} from '../entities/User';

...
export const getUsersService = async() => {
  const users = await AppDataSource.getRepository(User).find();
  return users;
}
```

Para que no aparezcan los logs en consola podemos modificar para que aparezcan solo los errores o directamente colocar false.

Por otro lado, **repetiremos mucho: AppDataSource.getRepository, asi que podríamos integrarlo al data-source.ts y exportarlo con un nombre más simple**.

```typescript
// src/config/data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  // ...
  logging: ['error'],
});

export const UserModel = AppDataSource.getRepository(User);
```

```typescript
// scr/services/userServces.ts
import {UserModel} from '../config/data-source';
import {User} from '../entities/User';

...
export const getUsersService = async() => {
  const users = await UserModel.find();
  return users;
}

export const createUserService = async(userData: UserDto) => {
  const user = await UserModel.create(userData);
  // Una vez creado el user debemos guardarlo con save
  // Es una operación de tipo commit?
  const result = await UserModel.save(user);
  return user;
}
```

Agreguemos un getById

```typescript
// src/controllers/usersController.ts
import { getUserByIdService } from '../services/userServces.ts';

// ..
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Atención -> ya no utilizamos la interfaz IUser, lo reemplazamos por el modelo User.
  const user: User | null = await getUserByIdService(Number(id));
  res.status(200).json(user);
};
```

```typescript
// scr/services/userServces.ts
import {UserModel} from '../config/data-source';
import {User} from '../entities/User';

...
// Atención -> ya no retornamos una promesa utilizando la iterfaz.
// Ahora podemos utilizar el modelo User.
export const getUsersService = async(): Promise<User[]> => {
  const users = await UserModel.find();
  return users;
}

export const createUserService = async(userData: UserDto): Promise<User> => {
  const user = await UserModel.create(userData);
  // Una vez creado el user debemos guardarlo con save
  // Es una operación de tipo commit?
  const result = await UserModel.save(user);
  return user;
}

export const getUserByIdService = async(id: number): Promise<User | null> => {
  const users = await UserModel.findOneBy({id});
  return user;
}
```

## Relaciones

### Relaciones entre entidades

En la bases de datos relacionales trabajamos con diversas tablas las cuales pueden estar relacionadas entre sí mediante diferentes tipos de cardinalidad. <mark>Dentro de TypeORM la definición del tipo de relación es muy sencilla gracias al uso de decoradores.</mark>

1. Uno a uno mediante @OneToOne.
2. Muchos a uno mediante @ManyToOne.
3. Uno a muchos mediante @OneToMany.
4. Muchos a muchos mediante @ManyToMany.

Ilustremos este concepto con un ejemplo de la vida cotidiana. Imagina que tienes una **entidad** que representa comidas, cuya **tabla** contiene distintas recetas de estas y hay **otra entidad** de personas donde cada una de ellas tiene una **propiedad** (arreglo) de sus comidas favoritas.

Si estas tablas estuvieran relacionadas, en lugar de hacer dos **peticiones GET** (una por tabla) para obtener toda la información, podremos solo hacer **una petición** a personas y automáticamente obtener también el **array** con sus comidas favoritas.

Creamos una nueva entidad llamada Vehicle.

```typescript
// src/entities/Vehicle.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'vehicles',
})
export class Vehicle {
  // clave primaria y autoincremental
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  color: string;

  @Column()
  model: string;

  @Column()
  year: number;
}
```

```typescript
// src/routes/index.ts
import { createVehicle, getVehicle };

const router: Router = Router();
// ...

router.post('/vehicles', createVehicle);
router.get('/vehicles', getVehicles);
```

```typescript
// src/controllers/vehiclesController.ts

export const getVehicles = async (req: Request, res: Response) => {
  const vehicles = await getVehiclesServices();
  res.status(200).json(vehicles);
};

export const createVehicle = async (req: Request, res: Response) => {
  const { brand, color, model, year, userId } = req.body;

  const newVehicle = await createVehicleService({
    brand,
    color,
    model,
    year,
    userId,
  });
  res.status(201).json(newVehicle);
};
```

```typescript
// src/services/vehiclesService.ts

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicles = await VehicleModel.find();
  return vehicles;
};

export const createVehicleService = async (
  vehicle: CreateVehicleDto
): Promise<Vehicle> => {
  const newVehicle = await VehicleModel.create(vehicle);
  await VehicleModel.save(newVehicle);
  return newVehicle;
};
```

### Relación 1:1

Por el momento, tenemos a usuarios y vehículos con sus rutas, controllers, services, pero aún no se encuentran relacionadas. La relación será: 1:1, aunque sabemos que un usuario puede tener varios vehiculos y viceversa, pero establecemos 1:1 como punto de partida.

> **<mark>Como vaciar (reiniciar) la base de datos</mark>** -> modificamos la configuración src/config/data-source.ts y agregamos la propiedad <mark>**dropSchema: true,**</mark> esto creará las tablas nuevamente. Una restaurada la BD, comentamos la propiedad. **ATENCION**: perderemos todos los datos de la base de datos.

La relación se establece en los modelos a través del **decorador @OneToOne()**:

```typescript
// src/entities/User.ts

//...
@OneToOne(() => Vehicle)
@JoinColumn()
vehicle: Vehicle
```

Ahora cuando creamos en la BD un vehículo deberemos actualizar la tabla users actualizando la pertenencia a ese usuario

```typescript
// src/services/vehiclesService.ts

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicles = await VehicleModel.find();
  return vehicles;
};

export const createVehicleService = async (
  vehicle: CreateVehicleDto
): Promise<Vehicle> => {
  const newVehicle = await VehicleModel.create(vehicle);
  await VehicleModel.save(newVehicle);

  // Busco el user
  const user = await UserModel.findOneBy({
    id: vehicle.userId,
  });

  if (user) {
    user.vehicle = newVehicle;
    await UserModel.save(user);
  } else {
    throw Error('User not found');
  }

  return newVehicle;
};
```

<mark>Para que el resultado de consultar a los usuarios nos muestre toda la información del vehículo y no solo su id (Populate de Mongoose) deberemos indicarlo en el servicio.</mark>

```typescript
// scr/services/userServces.ts
import { UserModel } from '../config/data-source';
import { User } from '../entities/User';

// ...
export const getUsersService = async (): Promise<User[]> => {
  const users = await UserModel.find({
    relations: {
      vehicule: true,
    },
  });
  return users;
};
// ...
```

### Relación 1:N

Modifiquemos el ejemplo estableciendo que un usuario puede tener varios vehículos

```typescript
// src/entities/User.ts

@Entity({
  name: 'users',
})
export class User {
  //...
  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicle: Vehicle[];
}
```

En el caso de 1:N también debemos modificar el modelo Vehicle para indicar que varios vehiculos pueden pertenecer a un user.

```typescript
// src/entities/Vehicle.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({
  name: 'vehicles',
})
export class Vehicle {
  // clave primaria y autoincremental
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  color: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @ManyToOne(() => User, (user) => user.vehicles)
  user: User;
}
```

Ahora, cuando creo un vehículo no debemos actualizar el usuario, sino que le indicamos a vehicle a quien pertenece. Ahora la relación se encuentra en la tabla vehicles.

Finalmente, al obtener los vehículos indicamos que muestre la información del usuario. Método find().

```typescript
// src/services/vehiclesService.ts

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicles = await VehicleModel.find({
    relations: {
      user: true,
    },
  });
  return vehicles;
};

export const createVehicleService = async (
  vehicle: CreateVehicleDto
): Promise<Vehicle> => {
  const newVehicle = await VehicleModel.create(vehicle);
  await VehicleModel.save(newVehicle);

  // Busco el user
  const user = await UserModel.findOneBy({
    id: vehicle.userId,
  });

  // if (user) {
  //   user.vehicle = newVehicle;
  //   await UserModel.save(user);
  // } else {
  //   throw Error('User not found');
  // }
  if (user) {
    newVehicle.user = user;
    await VehicleModel.save(newVehicle);
  }

  return newVehicle;
};
```

## Cierre

Hemos explorado la gestión de TypeORM, una herramienta para el mapeo objeto-relacional entre nuestro código y una base de datos relacional, caracterizada por su robustez y eficiencia en la comunicación entre un servidor y su respectiva base de datos.

Aprendimos a definir **modelos** y **entidades**, que se traducirán en las distintas tablas, a definir los atributos y sus tipos para cada modelo, a agregar y consultar registros de las tablas y a conocer las diferentes maneras de relacionarlas a partir de su cardinalidad.

![Conceptos.](/astro-doc-full-stack/images/m3/clase5/Conceptos.png)

## Homework

<details>
<summary>Ver</summary>

**ACTIVIDAD 01**

Instalar las dependencias necesarias para trabajar con TypeORM en el proyecto integrador.

**ACTIVIDAD 02**

Configurar el AppDataSource de la aplicación, como así también las propiedades necesarias de tsconfig.json.

**ACTIVIDAD 03**

Crear las entities necesarias para el proyecto, que representen los turnos, usuarios y credenciales de usuarios. Tener en cuenta que en este punto se establecen las relaciones entre las entidades.

**ACTIVIDAD 04**

Realizar los cambios necesarios en las funciones de servicio para que, en lugar de utilizar los viejos arreglos de datos, ahora utilicemos las entities creadas.

**ACTIVIDAD 05**

Testear y asegurar que se mantienen las funcionalidades implementadas.

**TIPS**

- Sigue el paso a paso de nuestra clase para poder realizar la actividad. Tienes allí todo el contenido necesario.

- Recuerda ir agregando a tu proyecto todos los tópicos tratados en clases y módulos anteriores: manejo de errores, validación, etc.

- Apóyate en SQL Shell si quieres ayuda para revisar los datos de tus tablas.

- Configura correctamente las peticiones que deseas realizar en ThunderClient, Insomnia o Postman. Esto te hará mucho más fácil el trabajo.

**[REQUISITOS]**:

- Instalar y configurar correctamente las dependencias necesarias para trabajar con TypeORM.

- Crear correctamente las entities involucradas en el proyecto.

- Adaptar las funciones de servicio para que utilicen las entities y se dejen de utilizar los datos falsos.

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
    table {
    border-collapse: collapse; /* Elimina el espacio entre las celdas */
    width: 100%; /* Ancho de la tabla */
    margin: 0 auto; /* Centrar la tabla */
  }

  th, td {
    border: 1px solid #ddd; /* Borde de las celdas */
    padding: 8px; /* Relleno de las celdas */
    text-align: left; /* Alineación del texto */
  }

  th {
    background-color: #f2f2f2; /* Color de fondo del encabezado */
    font-weight: bold; /* Peso de la fuente del encabezado */
  }

  tr:nth-child(even) {
    background-color: #f9f9f9; /* Color de fondo de las filas pares */
  }
</style>
