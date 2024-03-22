---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 6. TypeORM II
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
description: TypeORM II
draft: false
category: TypeORM SQL Bases de datos
---

## Transacciones

- <mark>Las **transacciones** son secuencias de operaciones que se ejecutan como una unidad lógica y atómica</mark>.
- Esto quiere decir que todas las operaciones deben ser ejecutadas con éxito para que el resto se lleven a cabo.
- Garantiza la integridad y consistencia de datos.

Pensemos en un ejemplo teórico muy sencillo para entender este concepto. Supongamos que debemos realizar una transferencia bancaria de la cuenta A a la B. Los pasos serían los siguientes.

- Retiro de dinero de la cuenta A
- Actualizar saldo de la cuenta A
- Depósito de dinero en la cuenta B
- Actualizar saldo de la cuenta B

¿qué ocurriría si la cuenta A no tiene saldo suficiente o si el número de la cuenta B no existe? En cualquiera de los casos la transacción tendría que detenerse. Pues bien, las transacciones en las bases de datos funcionan de esta forma.

## Método transaction() del objeto AppDataSource.manager

- Se adegura que cada solicitud sea tratada como una unidad
- Hasta que una de las solicitudes no sea completada la siguiente no será procesada
- Usa el método transaction() del objeto AppDataSource.manager
- Este método es **asíncrono**, por tanto debe llevar antepuesta la palabra await

### Argumentos del método de transaction()

- **Nivel de aislamiento** -> El primero argumento será el nivel de aislamiento, que determina que tan esctrictas son las operaciones y si otras operaciones pueden acceder a sus datos. Mientras más alto el nivel más confiable es la transacción pero maś costosa en términos de rendimiento

  - REPETEABLE READ -> la siguiente transacción necesita datos de la actual
  - READ UNCOMMITED
  - READ COMMITTED
  - SERIALIZABLE

- Función asíncrona -> El segundo argumento recibe una función asíncrona que se encarga de realizar las consultas a la BD y recibe como argumento a **transaccionalEntityManager** que resolverá la promesa

### Ejemplo:

Recordemos que la propiedad **dropschema: true** del archivo data-source.ts elimina la base de datos y vuelve a genera las tablas a partir de las entidades. Y esto, esta my bien cuando deseamos limpiar la BD, pero al levantar el servidor debemos crear todos los usuarios y vehículos nuevamente.

Esta tarea se vuelve repetitiva, por lo que podemos realizar una precarga de datos de prueba con los que podemos comenzar a trabajar.

- Crear la carpeta helpers dentro de src
- Crear el archivo preloadData.ts

> Todo lo que deseemos incluir en una transacción debe ser ejecutado en un callback. También podríamos utilizar los modelos para realizar los cambios, pero **siempre** debemos utilizar el transactionalEntityManager que se nos brinda.

```ts
// prealoadData.ts
import { AppDataSource } from '../config/data-source';
import IUser from '../interfaces/IUser';

const user1 = {
  name: 'Mauricio Jourdan',
  email: 'jourdanmauricio@gmail.com',
  age: 49,
  active: true,
};
const user2 = {
  name: 'Paola Jourdan',
  email: 'jourdanpao@mail.com',
  age: 47,
  active: true,
};
const user3 = {
  name: 'Nancy Jourdan',
  email: 'jourdannancy@mail.com',
  age: 50,
  active: true,
};

export const preloadData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const newUser1 = await userModel.create(user1);
      const newUser2 = await userModel.create(user2);
      const newUser3 = await userModel.create(user3);

      // await userModel.save(newUser1);
      // await userModel.save(newUser2);
      // await userModel.save(newUser3);

      await transactionalEntityManager.save(newUser1);
      await transactionalEntityManager.save(newUser2);
      await transactionalEntityManager.save(newUser3);
      // Si algun save falla se rollbackean todos los usuarios

      console.log('Precarga de datos realizada con éxito');
    }
  );
};
```

3- El preloadData se ejecutará desde nuestro indes.ts

```typescript
// index.ts
import { PORT } from './config/envs';
import server from './server';
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import { preloadData } from './helpers/preloadData';

AppDataSource.initialize().then((res) => {
  console.log('Conexión a BD OK');
  preloadData().then((res) => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  });
});

// const initializeApp = async () => {
//   await AppDataSource.initialize();
//   await preloadData();
//   server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//   });
// };
```

> El problema que tenemos es (si dropSchema se encuentra comentada) que cada vez que se levante el backend creará los 3 usuarios nuevamente, generando información incorrecta. Es decir, deseamos que los usuarios se creen siempre que la tabla de users se encuentr vacía.

```ts
// prealoadData.ts
import { AppDataSource } from '../config/data-source';
import IUser from '../interfaces/IUser';

...
export const preloadData = async () => {
  await AppDataSource.manager.transaction(

    const users = await unserModel.find();

    if (users.length) return;
      // creo los usuarios
      ...

  )
}
```

Por el momento, solo hemos creado usuarios pero podemos explotar las transacciones para crear vehículos para esos usuarios. Recordemos que no deberían generarse vehículos sin un user asociado. Por lo que si no se pueden crear usuarios tampoco deberían crearse los vehículos.

```ts
// prealoadData.ts
import { AppDataSource } from '../config/data-source';
import IUser from '../interfaces/IUser';

const preloadUsers = [
  {
    name: 'Mauricio Jourdan',
    email: 'jourdanmauricio@gmail.com',
    age: 49,
    active: true,
  },
  {
    name: 'Paola Jourdan',
    email: 'jourdanpao@mail.com',
    age: 47,
    active: true,
  },
  {
    name: 'Nancy Jourdan',
    email: 'jourdannancy@mail.com',
    age: 50,
    active: true,
  }
]

const preloadVehicles = [
  {
    brand: 'Ford',
    model: 'Fiesta',
    year: 2020,
    color: 'red',
    userId: 1,
  }
  {
    brand: 'Renault',
    model: 'Clio',
    year: 2021,
    color: 'red',
    userId: 2,
  },
  {
    brand: 'Chevrolet',
    model: 'Onis',
    year: 2022,
    color: 'white',
    userId: 3,
  }
]

export const preloadUserData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {

      const users = await unserModel.find();
      if (users.length) return;

      for await (const user of preloadUsers) {
        const newUser = await userModel.create(user);
        await transactionalEntityManager.save(newUser);
      }
      console.log('Precarga de datos de usuarios realizada con éxito');
    }
  );
};

export const preloadVehicleData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      for await (const vehicle of preloadVehicle) {
          const newVehicle = await VehicleModel.create(vehicle);
          await transactionalEntityManager.save(newVehicle);
          const user = await userModel.findOneBy({id: vehicle.userId});

         if (user) {
            newVehicle.user = user;
            await transactionalEntityManager.save(newVehicle);
          } else {
            throw Error("Usuario inexistente");
          }
        }

        console.log('Precarga de datos de vehiculos realizada con éxito');
      }
  )
};
```

```typescript
// index.ts
import { PORT } from './config/envs';
import server from './server';
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import { preloadUserData, preloadVehicleData } from './helpers/preloadData';

const initializeApp = async () => {
  await AppDataSource.initialize();
  await preloadUserData();
  await preloadVehicleData();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

initializeApp();
```

## Inicio y confirmación de una transacción

Al realizar la solicitud **POST** podremos ver en nuestra terminal que efectivamente se inicia una transacción la cual, al ser realizada de forma exitosa, es confirmada por medio de **COMMIT**, indicando que se ha finalizado con éxito el registro y continúa con el resto de las transacciones.

Si agregamos un usuario, veremos que... el valor de inventario es **asociado con éxito** tanto para el primer como segundo registro. Pero, ¿qué sucede si la transacción no puede realizarse con éxito? Esto nos conllevaría a cometer errores en nuestras implementaciones.

### Rollback y manejo de errores

Una transacción puede no completarse debido a situaciones como:

- Violación a las restricciones de la base de datos (clave primaria duplicada, registro repetido, campos obligatorios vacios, etc).

- El servidor deja de escuchar en un puerto específico por errores de red.

- Excepciones en la lógica del código.

Para esto necesitamos mecanismos llamados **rollback** que permitan manejar errores y revertir los cambios que se realicen a un estado previo si la transacción no se completa con éxito.

Para ilustrar este concepto de **rollback**, vamos a modificar la query para forzar un error, usando el nombre de una columna inexistente.

La transacción es inicializada con éxito, pero no se resuelve de igual manera: los cambios no son confirmados y en lugar de ejecutarse el **COMMIT**, se ejecuta un **ROLLBACK**, que revertirá todos los cambios previamente definidos en el inicio de la transacción para que el resto de estas que están en cola, puedan tomar la información correcta de la base de datos.

Al presentarse un error nos daremos cuenta que el servidor se “cae” y es necesario reiniciarlo para poder continuar.

En la práctica esto no es lo ideal, ya que el servidor debe seguir realizando sus funciones independientemente de una solicitud errónea. Debe reportar también al cliente el error obtenido de la petición. Esto podemos solucionarlo mediante el manejo de errores.

Cuando trabajamos con controladores asincrónicos, debemos envolver nuestro código en los bloques **try/catch** para gestionar la resolución de la promesa creada por la solicitud. Esto nos permitirá devolver una respuesta al cliente ya sea en caso de éxito o rechazo.

En nuestro ejemplo, todo el código que hicimos hasta este momento corresponde al código del bloque try, ya que solo considera el caso de éxito: la transacción se complete. Añadiremos al bloque catch una respuesta que devuelva al cliente el error recibido y permita que el servidor continúe su función...

<mark>El usuario no encontrado, al momento de crear un vehículo es un error para nosotros no para typeORM, por lo que debemos buscar uan alternativa a transactionalEntityManager para gestionar los errores con mayor control.</mark>

Aquí interviene **queryRunner**, para crear y controlar el estado de la transacción.

```ts
// prealoadData.ts
import { AppDataSource } from '../config/data-source';
import IUser from '../interfaces/IUser';

const preloadUsers = [
  {
    name: 'Mauricio Jourdan',
    email: 'jourdanmauricio@gmail.com',
    age: 49,
    active: true,
  },
  {
    name: 'Paola Jourdan',
    email: 'jourdanpao@mail.com',
    age: 47,
    active: true,
  },
  {
    name: 'Nancy Jourdan',
    email: 'jourdannancy@mail.com',
    age: 50,
    active: true,
  }
]

const preloadVehicles = [
  {
    brand: 'Ford',
    model: 'Fiesta',
    year: 2020,
    color: 'red',
    userId: 1,
  }
  {
    brand: 'Renault',
    model: 'Clio',
    year: 2021,
    color: 'red',
    userId: 2,
  },
  {
    brand: 'Chevrolet',
    model: 'Onis',
    year: 2022,
    color: 'white',
    userId: 3,
  }
]

export const preloadUserData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {

      const users = await unserModel.find();
      if (users.length) return;

      for await (const user of preloadUsers) {
        const newUser = await userModel.create(user);
        await transactionalEntityManager.save(newUser);
      }
      console.log('Precarga de datos de usuarios realizada con éxito');
    }
  );
};

export const preloadVehicleData = async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  // Como es dificil trabajar con try/catch sobre operaciones asíncronas y en nuestro caso tenemos que procesar el array de vheiculos. Vamos a transformar el array en procesas

  const promises = preloadVehicles.map(async(vehicle) => {
    const newVehicle = await vehicleModel.create(vehicle);  // Creamos sobre el model
    await queryRunner.manager.save(newVehicle);             // Guardamos sobre queryRunner
    const user = await userModel.findOneBy({id: vehicle.userId});
    if (!user) new Error("Usuario inexistente");
    newVehicle.user = user;
    await queryRunner.manager.save(newVehicle);
  })

  try {
    await queryRunner.startTransaction();     // START
    await Promise.all(promises);
    await queryRunner.commitTransaction();    // COMMIT
    console.log('Precarga de datos de vehiculos realizada con éxito');
  } catch (err){
    console.log(err)
    await queryRunner.rollbackTransaction();  // ROLLBACK
  } finally {
    /*********************************************************/
    // release -> Libera el queryRunner.
    // Una transaccion inicia y luego, si o si debe commitear o rollbackear,
    // finalmente liberamos la conexion a la BD con realease.
    /*********************************************************/
    await queryRunner.release();              // RELEASE
  }
};
```

<mark>La transaccion:</mark>

- Inicia -> Comienzo de transaccion
- Commit o Rollback -> Confirma los cambios o los vuelve atrás
- Release -> liberamos la conexion a la BD

## Manejo de repositorios

## Repositorios vs EntityManager

Por ahora hemos trabajado el **CRUD** por medio del objeto manager de **AppDataSource** a partir de consultas a una colección que contiene todas las entidades de nuestra aplicación. Si bien, trabajar utilizando esta herramienta es correcto, existe una opción que es mucho más específica: **los repositorios**.

<mark>A grandes rasgos, un repositorio tiene la misma función que manager. Sin embargo, un repositorio limita su acción a una entidad en concreto y no sobre la colección general que las contiene.</mark> Veamos a qué nos referimos.

Empecemos por modificar los **controladores** que utilizan a manager para que hagan uso de **Repository**. Lo primero que debemos hacer es generar un repositorio para cada entidad mediante el método **getRepository()** de AppDataSource.

Este método recibe como argumento la entidad a la cual queremos acceder y la asocia al repositorio que creamos como una **constante**.

En nuestro proyecto podemos crear la carpeta /src/repository y adentro los archivos userRepository.ts y vehicleRepository.ts

```js
// /src/repositories/userRepository.ts
import { AppDatasource } from '../config/data-source';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);
export default userRepository;
```

```js
// /src/repositories/userVehicle.ts
import { AppDatasource } from '../config/data-source';
import { Vehicle } from '../entities/Vehicle';

const vehicleRepository = AppDataSource.getRepository(Vehicle);
export default vehicleRepository;
```

Ahora, podemos inportar los repositorios en nuestros servicios y trabajar con los repositorios en lugar de los modelos.

<mark>El repositorio representa a la entidad mapeada y reflejada en la BD.</mark>

De esta forma todos nuestros **controladores** trabajan con un repositorio particular y podemos incluso personalizarlos para potenciar sus funciones.

<mark>Los repositorios poseen métodos como find(), create(), fidOneBy(), etc, pero además nos permiten crear métodos propios que realicen tareas muy específicas, por ejemplo finfById()</mark>

## Repositorios personalizados

- Maneja un repositorio que sea exclusivo de una entidad
- Permite agregar métodos que únicamente sean aplicables a este repositorio
- Desempeñan una tarea particular dentro de él

<mark>El manejar un **repositorio** que sea exclusivo de una **entidad** nos permite agregar métodos que únicamente sean aplicables a este repositorio y que desempeñen una tarea particular dentro de él.</mark> Por ejemplo, supongamos que en diferentes rutas y controladores, vamos a tener que realizar la búsqueda por nombre.

En lugar de repetir una y otra vez la lógica de búsqueda, podríamos agregar esta funcionalidad a **usersRepository** y utilizarla desde allí.

```js
// /src/repositories/userRepository.ts
import { AppDatasource } from '../config/data-source';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User).extend({
  // No utilizamos arrow functions (=>) porque utilizaremos el this.
  findById = async function (id: number): Promise<User> {
    const user = await this.findOneBy({id});
    if (user) return user
    else throw Error("Invalid ID");
  },
  checkIfExists = async function(id: number): Promise<boolean>{
    const user = await this.findById(id);
    return !!user
  }
});
export default userRepository;
```

Ahora, desde nuestros servicios podemos utilizar este nuevo **método personalizado** del repositorio.

## Cierre

A lo largo de la lecture, hemos comprendido la importancia de los repositorios como interfaces para interactuar con nuestras entidades directamente, permitiendo así una separación clara entre la lógica personalizada de cada entidad y el manejo de los controladores.

Además, hemos aprendido cómo utilizar transacciones para garantizar la consistencia de nuestros datos al realizar operaciones complejas que requieren múltiples cambios, así como a manejar los distintos errores que puedan ocurrir a lo largo del proceso.

Finalmente, hemos explorado los conceptos de listeners y subscribers, que nos permiten capturar y responder a eventos específicos que ocurran al trabajar con nuestras entidades y la conexión a la base de datos, añadiendo flexibilidad y extensibilidad a nuestras aplicaciones.

![Mapa de conceptos.](/astro-doc-full-stack/images/m3/clase6/mapa.png)

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
