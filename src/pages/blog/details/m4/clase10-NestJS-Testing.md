---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 10 - NestJS Testing
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: NestJS Testing
draft: false
category: Backend Js Nest
---

## Pruebas unitarias

##############################################

**Pruebas unitarias**

- Consisten en verificar el funcionamiento correcto de unidades individuales de código de forma aislada y controlada.
- Garantizan calidad y fiabilidad de las aplicaciones.
- Permiten identificar errores en etapas tempranas de desarrollo.
- Facilitan el proceso de generación y mantenimiento del código de una aplicación.

**ETAPAS**

- Análisis y Planificación: Identificar las unidades de código a probar.
- Escritura de Pruebas: Utiliza un framework de pruebas unitarias. Crear los distintos casos a testear.
- Ejecución de Pruebas: Ejecutar las pruebas unitarias para verificar el comportamiento de las unidades de código.
- Corrección de Errores: Si se encuentran errores o fallos en la etapa anterior, corregir el código de las unidades afectadas.
- Refactorización: Revisión y refactorización del código para mejorar su calidad y mantenibilidad.

**Validar el funcionamiento aislado del servicio mediante pruebas unitarias**

- Validar que puedes construir una instancia de **AuthService**.
- Mediante un test utilizar la función **it**.
- Agregar un módulo de pruebas.
- Definir los providers que serán empleados en el el entorno de testing.
- Utilizar la función **createTestingModule** de @**nestjs/testing**.

**Simulación de Dependencias en Pruebas**

- Es una herramienta que permite recrear y controlar de manera simulada las dependencias en un sistema desarrollado con Nest.
- Facilita la realización de pruebas unitarias al aislar y configurar entornos específicos para evaluar el comportamiento del código, sin depender de servicios externos.

**Pruebas en controladores, servicios y módulos**

Desarrollo de estrategias de testing

- Preparación del Entorno de Pruebas: Configura un entorno de pruebas separado que simula el entorno real del módulo, servicio o controlador.
- Instalación de Dependencias: Instala las dependencias necesarias para realizar pruebas.
- Creación de Mocks: Crea mocks para simular el comportamiento de los servicios y dependencias.
- Pruebas Unitarias: Escribe pruebas unitarias acordes al elemento a evaluar.

**Conceptos clave y aplicación de pruebas de integración**

- Se centran en verificar el funcionamiento conjunto de varios componentes o módulos de una aplicación.
- Evalúan cómo interactúan diferentes partes de un sistema y cómo se integran para lograr el comportamiento esperado.
- Garantiza que el sistema funcione como se espera en su conjunto y que los diferentes componentes trabajen de manera coherente y eficiente.
- Crear una instancia de testing de la aplicación completa.
- Cada test generado será validado dentro de esta copia.
- Estas pruebas son conocidas como **end-to-end**.
- Dentro del proyecto generado con Nest CLI se encuentra pre configurado un entorno de integración dentro de la carpeta test.

**Creación de Pruebas de integración en Nest**

- El test realiza el recorrido completo de una solicitud.
- Pasa por el módulo, controlador y servicio hasta llegar al repositorio de usuarios.
- Valida el correcto funcionamiento de la ruta.
- Válida alguna ruta que tenga contacto con la base de datos.
- Para ejecutar los tests end to end debes utilizar el comando: npm run test:e2e

##############################################

## Comprender la importancia y aplicación de pruebas unitarias

Comencemos hablando de un concepto que nos es un poco familiar: <mark>**las pruebas unitarias**. Estas consisten en verificar el funcionamiento correcto de **unidades individuales de código**, como funciones, métodos o clases, de forma aislada y controlada. </mark>

Son un componente fundamental en el desarrollo de software, ya que juegan un papel crucial en la garantía **de calidad y la fiabilidad de las aplicaciones**. La implementación de estas pruebas permiten identificar errores en etapas tempranas de desarrollo y facilitan el proceso de generación y mantenimiento del código de una aplicación.

Para integrar pruebas unitarias en un proyecto, tenemos acceso a diversos frameworks y bibliotecas como Jest, Jasmine, Mocha, entre otros. Cada una de estas proporciona herramientas y funcionalidades para escribir, ejecutar y analizar tests de manera efectiva.

El proceso de testing puede ser confuso y complejo en un principio. La idea general del flujo para la aplicación de pruebas unitarias podría resumirse en las siguientes etapas:

### Etapas del testing

- **Análisis y planificación**: Indentificamos las unidades de código a probar. Definimos escenarios que abarcan aspectos especícos del comportamiento que pretendemos evaluar.

- **Escrituras de pruebas**: Aquí emplamos un framework de pruebas unitarias como Jest o Mocha por ejemplo, y creamos los distintos casos a testear.

- **Integraciones y extensibilidad**: Ejecutamos las pruebas unitarias. Observaremos los resultados de las pruebas para indentificar fallos, errores ocompartamientos inesperados.

- **Corrección de errores**: Si se encuentran errores o fallos en la etapa anterior, corregimos el código de las unidades afectadas.

- **Refactorización**: refactorizar el código para mejorar su calidad y mantenibilidad. Actualización de las pruebas unitarias para garantizar que sigan siendo efectivas.

Con esta información en mente, veamos ahora cómo implementar pruebas unitarias en Nest JS.

## Desarrollar y ejecutar pruebas unitarias para componentes NestJS

Por defecto, al inicializar un proyecto con Nest CLI como lo hemos hecho la primera vez, se instala y configura el framework de testing Jest, un framework de testing para JS enfocado en el desarrollo de pruebas unitarias mediante una API muy completa y especializada. Por esta razón, no es necesario realizar ninguna configuración. Basta solo empezar a planificar y desarrollar los tests.

Actualmente nuestra aplicación tiene una estructura que podría ser representada gráficamente con el siguiente diagrama:

![Testing](/astro-doc-full-stack/images/henry/m4/clase10/testing.webp)

Si analizamos el flujo de la aplicación, nos daremos cuenta que al realizar pruebas unitarias en el servicio de autenticación, por ejemplo, este hace uso de la dependencia del servicio de usuarios, quien a su vez es inyectado por la dependencia del repositorio de usuarios.

Entonces, <mark>¿cómo podemos validar el funcionamiento aislado de este primer servicio mediante pruebas unitarias, si tiene a su vez otras dependencias?</mark> Para ello, haremos uso de una versión ficticia de **UsersService** para simular sus tareas dentro del entorno de test de **AuthService**.

![Testing2](/astro-doc-full-stack/images/henry/m4/clase10/testing2.webp)

Crearemos un archivo de testing **auth.service.spec.ts** en la carpeta **services**

- El primer paso será, en un bloque de código, validar que podemos construir una instancia de **AuthService** que trabaje en un entorno de testing. Esto se logra mediante un test utilizando la función it.

- <mark>Allí agregaremos un módulo de pruebas a través del cual podemos definir los providers que serán empleados en el el entorno de testing</mark> gracias a la función **createTestingModule** de **@nestjs/testing**.

- <mark>Una vez definido el módulo de pruebas y los proveedores, debemos compilarlo con el método **compile** para que pueda ejecutar tests unitarios.</mark>

- <mark>Por último, obtenemos la instancia del módulo de pruebas que acabamos de generar usando el método get y evaluamos que haya sido creado correctamente, con las funciones **expect y toBeDefined**</mark>.

```ts
// src/services/auth.service.spec.ts
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

it('Create an instance of AuthService', async () => {
  const module = await Test.createTestingModule({
    providers: [AuthService],
  }).compile();

  const authService = module.get<AuthService>(AuthService);
  expect(authService).toBeDefined();
});

return go(f, seed, []);
```

Seguramente recibas un <mark>error</mark> porque no se encuentran definidos los tipos de **Jest**.

Este no es un error de instalación, ya que recuerda que este framework se encuentra preconfigurado, así que solo resta agregar sus tipos dentro del archivo **tsconfig.json**.

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetada": true,
    "expertimentalDecotators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCastingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "types": ["Multer", "jest"]
  }
}
```

<mark>Si ejecutamos el comando npm run test nos daremos cuenta que el test falla y que la instancia de **AuthService** no puede ser creada</mark>.

La razón de esto, se debe a que las dependencias requeridas por el módulo no pueden ser resueltas.

<mark>Para definir el testing adecuadamente, simularemos las dependencias</mark>. **Veamos...**

## Simulación de Dependencias en Pruebas

<mark>El simulador de dependencias es una herramienta que permite recrear y controlar de manera simulada las dependencias en un sistema desarrollado con Nest</mark>. Esto facilitará la realización de pruebas unitarias al aislar y configurar entornos específicos para evaluar el comportamiento del código, sin depender de servicios externos.

En nuestro caso, **AuthService** utiliza como instancias a **JwtService** y a **UsersDbService**.

- A este primero, podemos importarlo directamente y agregarlo al array de providers. Ahora, para no depender de la funcionalidad real del segundo, creamos una versión simulada **(mock)** que incluye parcialmente aquellos métodos empleados en el servicio de autenticación **(create y findByEmail)** junto con sus respectivos argumentos.

En este mock, **create** devolverá un Usuario con la información proporcionada. Por otro lado, para el caso de findByEmail, esperaremos 2 respuestas:

- undefined para signUp, ya que para crear necesitamos que no exista el correo en la DB,
  la información del usuario para signIn.

- la información del usuario para signIn.

Agreguemos por el momento a **UsersDbService** como dependencia, pero usamos a mockUsersService como valor.

<mark>El módulo AuthService utiliza muchos providers pero solo necesatomso JwtService y UsersDbService. Entonces definiremos como providers el AuthService (que queremos probar) y sus dependencias (JwtService y UsersDbService)</mark>.

El problema con UsersDbService es que a su vez depende de UsersRpository, por lo que también deberíamos proveer esta dependencia y a su vez la de TypeORM que utiliza UsersRpository. Terminamos dependendiendo de muchas cosas que no queremos probar. No queremos conectanos a la BD en cada prueba.

Solo queremos realizar pruebas unitarias, ejemplo: el hash del password.

Para solucionar este inconveniente creamos un Mock de usersDbService. Será un objeto con la misma firma que la instancia de usersDbService que no llamará a la BD sino que será una función que retorne nuestra definición.

Por otro lado, los únicos métodos que nos interesan de usersDbService son getUserByEmail y saveUser.

> <mark>WARNING: Jest utiliza rutas relativas por lo que seguramente tendremos errores en los casos en que nuestro programa utilizamos rutas absolutas. Por ejemplo: 'src/roles.enum'. Las autoimportaciones de VSCode importan con rutas absolutas</mark>.

```ts
// auth.service.ts
import { Role } from 'src/roles.enum';
// deberíamos modificar la importación por:
import { Role } from './../roles.enum';
```

```ts
// src/services/auth.service.spec.ts
import { Test } from '@nestjs/testing';
import { JwtService } from '';

import { AuthService } from './auth.service';
import { UsersDbService } from './userDB.service';
import { User } from './user.entity';

it('Create an instance of AuthService', async () => {
  const mockUsersService: Partial<UsersDbService> = {
    // retornamos undefined porque el usuario no debería existir
    getUserByEmail: () => Promise.recolve(undefined),
    saveUser: (user: Omit<User, 'id'>): Promise<User> =>
      Promise.resolve({
        ...user,
        isAdmin: false,
        id: '76ae2f54-dade-49a3-9e7e-da883778cfe7',
      }),
  };

  const module = await Test.createTestingModule({
    // En lugar de proveer mockUsersService, definimo un provide y un useValue diferente
    // de tal manera que cuando intentemos crear una instancia de usersService,
    // se creará pero de la clase que definamos en useValue
    // Entonces, cuando AuthService desee utilizar a UsersDbService,
    // en realidad utilizará mockUsersService
    providers: [
      AuthService,
      JwtService,
      {
        provide: UsersDbService,
        useValue: mockUsersService,
      },
    ],
  }).compile();

  const authService = module.get<AuthService>(AuthService);
  expect(authService).toBeDefined();
});
```

Finalmente, al ejecutar <code>npm run test</code> las pruebas deberían pasar con éxito. Pero, por el momento creamos solo un test y deseamos ejecutar varios sobre AuhtService. Los englobaremos bajo la función **describe**. Y para reutilizar la lógica que ejecutarán todos los test utilizaremos la funcion **beforeEach**, que se ejecutará antes de cada **It**. Ejemplo, la generación del módulo authService.

A partir de la creación del describe podemos crear pruebas adicionales como la creación de un usuario de prueba, que también definiremos "globalmente" para utilizarlo en varias pruebas.

```ts
// src/services/auth.service.spec.ts
import { Test } from '@nestjs/testing';
import { JwtService } from '';

import { AuthService } from './auth.service';
import { UsersDbService } from './userDB.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let authService: AuthService;

  let mockUser: Omit<User, 'id'> = {
    name: 'Mauricio',
    createdAt: '01/01/2024',
    password: '12346578',
    email: 'mauricio@gmail.com',
    isAdmin: false,
  };

  beforeEach(async () => {
    const mockUsersService: Partial<UsersDbService> = {
      // retornamos undefined porque el usuario no debería existir
      getUserByEmail: () => Promise.recolve(undefined),
      saveUser: (user: Omit<User, 'id'>): Promise<User> =>
        Promise.resolve({
          ...user,
          isAdmin: false,
          id: '76ae2f54-dade-49a3-9e7e-da883778cfe7',
        }),
    };

    const module = await Test.createTestingModule({
      // En lugar de proveer mockUsersService, definimo un provide y un useValue diferente
      // de tal manera que cuando intentemos crear una instancia de usersService,
      // se creará pero de la clase que definamos en useValue
      // Entonces, cuando AuthService desee utilizar a UsersDbService,
      // en realidad utilizará mockUsersService
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersDbService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('signup() create a new user with an encripted password', async () => {
    const user = await authService.signUp(mockUser);
    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password);
  });
});
```

Ahora, ¿qué ocurre si queremos comprobar que **signUp** me arroja un error cuando el **email** se encuentra en uso? La función mock de **findByEmail** actualmente está escrita para no devolver coincidencias, lo que quiere decir que jamás podría testear esta situación.

Para organizarlo, modifiquemos a **mockUsersService**. Lo primero que debemos hacer es extraer la declaración de **mockUsersService** de la función **beforeEach**. De esta manera es posible acceder a ella dentro de cualquier tests, permitiendo modificar sus métodos dentro de aquellos tests que lo requieran.

```ts
// src/services/auth.service.spec.ts
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { UsersDbService } from './userDB.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let authService: AuthService;

  let mockUser: Omit<User, 'id'> = {
    name: 'Mauricio',
    createdAt: '01/01/2024',
    password: '12346578',
    email: 'mauricio@gmail.com',
    isAdmin: false,
  };

  const mockUsersService: Partial<UsersDbService> = {
    // retornamos undefined porque el usuario no debería existir
    getUserByEmail: () => Promise.recolve(undefined),
    saveUser: (user: Omit<User, 'id'>): Promise<User> =>
      Promise.resolve({
        ...user,
        isAdmin: false,
        id: '76ae2f54-dade-49a3-9e7e-da883778cfe7',
      }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      // En lugar de proveer mockUsersService, definimo un provide y un useValue diferente
      // de tal manera que cuando intentemos crear una instancia de usersService,
      // se creará pero de la clase que definamos en useValue
      // Entonces, cuando AuthService desee utilizar a UsersDbService,
      // en realidad utilizará mockUsersService
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersDbService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('signup() create a new user with an encripted password', async () => {
    const user = await authService.signUp(mockUser);
    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password);
  });

  it('signUp() throws an error if the email is already in use', async () => {
    // Sobreescribimos la implementación de la fucnión getUserByEmail de mockUserService
    mockUsersService.getUserByEmail = (email: string) =>
      Promise.resolve(mockUser as User);

    try {
      await authService.singUp(mockUser as User);
    } catch (err) {
      expect(err.message).toEqual('Email is already in use');
    }
  });

  it('signIn() returns an error if the password is invalid', async () => {
    mockUsersService.getUserByEmail = (email: string) =>
      Promise.resolve(mockUser as User);

    try {
      await authService.singIn(mockUser.email, 'INVALID PASSWORD');
    } catch (err) {
      expect(err.message).toEqual('Invalid password');
    }
  });

  it('signIn() returns an error if the user is not found', async () => {
    try {
      await authService.singIn(mockUser.email, mockUser.password);
    } catch (err) {
      expect(err.message).toEqual('User not found');
    }
  });

  // test que utiliza jwt que a su vez utiliza otras dependencias
  // El primer problema que tendremos es el password. Debería estar hasheada.
  // Podemos modificar el mockUser para terner uno particular para este test.
  it('signIn() returns an object with a message and a token if the user is found and the password is valid', async () => {
    const moskUserVariant = {
      ...moskUser,
      password: bcrypt.hash(mockUser.password, 10),
    };

    mockUsersService.findUserByEmail = (email: string) =>
      Promise.resolve(moskUserVariant as User);

    const response = await authService.singIn(
      mockUser.email,
      mockUser.password
    );

    expect(response).toBeDefined();
  });
});
```

Al ejecutar el este el proceso fallará porque el authService.singIn requiere el secret que proviene de las variables de entorno. Para reolverlo, crearemos un MockJwtService.

```ts
// src/services/auth.service.spec.ts
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { AuthService } from './auth.service';
import { UsersDbService } from './userDB.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let authService: AuthService;

  let mockUser: Omit<User, 'id'> = {
    name: 'Mauricio',
    createdAt: '01/01/2024',
    password: '12346578',
    email: 'mauricio@gmail.com',
    isAdmin: false,
  };

  const mockUsersService: Partial<UsersDbService> = {
    // retornamos undefined porque el usuario no debería existir
    getUserByEmail: () => Promise.recolve(undefined),
    saveUser: (user: Omit<User, 'id'>): Promise<User> =>
      Promise.resolve({
        ...user,
        isAdmin: false,
        id: '76ae2f54-dade-49a3-9e7e-da883778cfe7',
      }),
  };

  beforeEach(async () => {
    const mockJwt = {
      sign: (payload) => jwt.sign(payload, 'testSecret'),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: UsersDbService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('signup() create a new user with an encripted password', async () => {
    const user = await authService.signUp(mockUser);
    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password);
  });

  it('signUp() throws an error if the email is already in use', async () => {
    // Sobreescribimos la implementación de la fucnión getUserByEmail de mockUserService
    mockUsersService.getUserByEmail = (email: string) =>
      Promise.resolve(mockUser as User);

    try {
      await authService.singUp(mockUser as User);
    } catch (err) {
      expect(err.message).toEqual('Email is already in use');
    }
  });

  it('signIn() returns an error if the password is invalid', async () => {
    mockUsersService.getUserByEmail = (email: string) =>
      Promise.resolve(mockUser as User);

    try {
      await authService.singIn(mockUser.email, 'INVALID PASSWORD');
    } catch (err) {
      expect(err.message).toEqual('Invalid password');
    }
  });

  it('signIn() returns an error if the user is not found', async () => {
    try {
      await authService.singIn(mockUser.email, mockUser.password);
    } catch (err) {
      expect(err.message).toEqual('User not found');
    }
  });

  // test que utiliza jwt que a su vez utiliza otras dependencias
  // El primer problema que tendremos es el password. Debería estar hasheada.
  // Podemos modificar el mockUser para terner uno particular para este test.
  it('signIn() returns an object with a message and a token if the user is found and the password is valid', async () => {
    const moskUserVariant = {
      ...moskUser,
      password: bcrypt.hash(mockUser.password, 10),
    };

    mockUsersService.findUserByEmail = (email: string) =>
      Promise.resolve(moskUserVariant as User);

    const response = await authService.singIn(
      mockUser.email,
      mockUser.password
    );

    expect(response).toBeDefined();
    expect(response.token).toBeDefined();
    expect(response.succes).toBeEqual('User logged in successfully');
  });
});
```

Con esta implementación habremos validado el que las funciones del servicio de autenticación trabajen correctamente de manera aislada del resto de la aplicación, que es precisamente el objetivo de las pruebas unitarias.

La creación de baterías de testing es un tema complejo que requiere del completo entendimiento de la aplicación y la inyección de dependencias, pero con la práctica el proceso de generación de tests será mucho más sencillo.

Por otro lado, **¿Qué ocurre si deseamos implementar test en otros elementos del código, como controladores o módulos?**

## Pruebas en controladores, servicios y módulos

### Desarrollo de estrategias de testing para controladores, servicios y módulos en Nest

Como puedes imaginar, cada uno de los componentes de la aplicación tiene una manera particular de ser testeado. Sea que hablemos de un servicio tal como lo desarrollamos en el ejemplo anterior, un controlador o un elemento más integral como lo es un módulo de Nest.

Aunque cada elemento de la aplicación trabaja de forma diferente y los test están enfocados a evaluar una tarea distinta, podemos definir una estrategia general que nos permita simplificar el proceso de creación de tests, a partir de los siguientes pasos:

<mark>Pasos para crear test</mark>

- **Preparación del entorno de pruebas**: Configura un entorno de pruebas separado que simula el entorno real del módulo, servicio o controlador.

- **Instalación de dependencias**: Instala las dependencias necesarias para realizar pruebas.

- **Creación de mocks**: crea mocks para simular el comportamientos de los servicios y dependencias.

- **Pruebas unitarias**: Escribe pruebas unitarias acordes al elemento a evaluar.

Veamos cómo aplicar esta estrategia general para testear, por ejemplo, el controlador **todosController**.

- Empecemos por crear y definir el entorno de pruebas: esto quiere decir, que el primer paso será crear una instancia de TestingModule del controlador que nos permitirá trabajar dentro del entorno de testing. Dentro de la carpeta todos definamos un nuevo archivo de test **todos.controller.spec.ts**

**Testeando todosController**

Nuevamente debemos crear mocks para FilesServices y para TodosServices.

```ts
// todos.controller.spec.ts
import { Test } from '@nestjs/testing';

import { TodosController } from './todos.controller.ts';
import { todosServices } from './todos.service.ts';
import { filesServices } from './files.services.ts';
import { Todo } from './todo.entity.ts';

describe('todosController', () => {
  let todosController: TodosController;

  let mockTodosServices: Partial<TodosServices>;
  let mockFilesServices: Partial<FilesServices>;

  const mockTodo: Partial<Todo> = {
    title: 'Todo 1',
    description: 'Description 1',
  };

  const mockFile: Express.Multer.File = {
    fieldname: 'example',
    originalname: 'example.txt',
    encoding: 'UTF-8',
    mimetype: 'text/plain',
    size: 0,
    stream: new Readable(),
    destination: '',
    filename: '',
    path: '',
    buffer: Buffer.from([]),
  };

  breforeEach(async () => {
    mockTodosServices = {
      getTodos: () =>
        Promise.resolve([{ ...mockTodo, id: 1, isCompleted: false } as Todo]),
      findById: (id: number) =>
        Promise.resolve({ ...mockTodo, id: 1, isCompleted: false } as Todo),
      create: (todo: Partial<Todo>) =>
        Promise.resolve({ ...mockTodo, id: 1, isCompleted: false } as Todo),
    };

    mockFilesServices = {
      saveFile: () =>
        Promise.resolve({
          id: 1,
          name: 'example.txt',
          mimetype: 'text/plain',
          data: Buffer.from([]),
          todo: {
            ...mockTodo,
            id: 1,
            isCompleted: false,
          } as Todo,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        { provide: TodosServices, useValue: mockTodosServices },
        { provide: FilesServices, useValue: mockFilesServices },
      ],
    }).compile();

    todosController = module.get<TodosController>(TodosController);
  });

  it('Should be defined', async () => {
    expect(todosController).toBeDefined();
  });

  it('getTodos() should return an array of todos', async () => {
    const todos = await todosController.getTodos();

    expect(todos).toBeEqual([
      {
        todo: 1,
        title: 'Todo 1',
        description: 'Description 1',
        isCompleted: false,
      },
    ]);
  });

  it('createTodo() should return a new todo', async () => {
    const todo = await todosController.create(mockTodo);

    expect(todos).toBeEqual({
      todo: 1,
      title: 'Todo 1',
      description: 'Description 1',
      isCompleted: false,
    });
  });

  it('uploadFile() should upload a File', async () => {
    const file = await todosController.uploadFile(mockFile);

    expect(file).toBeDefined({
      id: 1,
      name: 'example.txt',
      mimetype: 'text/plain',
      data: Buffer.from([]),
      todo: {
        ...mockTodo,
        id: 1,
        isCompleted: false,
      } as Todo,
    });
  });
});
```

Como mencionamos anteriormente, la creación de tests puede ser un tema complejo y demandante pero su implementación es crucial para asegurar el correcto **funcionamiento** de una aplicación y mejorar la eficiencia en la solución de errores.

Hasta ahora, hemos aprendido cómo evaluar funcionalidades de la aplicación de manera aislada mediante pruebas unitarias. Pero, **¿qué ocurre si por el contrario queremos validar el funcionamiento desde una perspectiva integral?** En este caso, hacemos referencia a las pruebas de integración.

## Pruebas de integración

### Conceptos clave y aplicación de pruebas de integración

Las pruebas de integración son un tipo de pruebas en el desarrollo de software que se centran en verificar el funcionamiento conjunto de varios componentes o módulos de una aplicación. Estas pruebas **evalúan cómo interactúan** diferentes partes de un sistema y cómo se integran para lograr el comportamiento esperado.

En el contexto de una aplicación backend, las **pruebas de integración** se utilizan para validar la interacción entre diferentes capas de la aplicación, como controladores, servicios, módulos y bases de datos.

La **verificación** de la adecuada comunicación entre los controladores y los servicios, la correcta manipulación de datos en la capa de persistencia (base de datos), la gestión de errores y excepciones, etcétera, hacen parte de los objetivos de las pruebas de integración.

> Al probar la integración de los diferentes módulos de una aplicación, se garantiza que el sistema funcione como se espera en su conjunto y que los diferentes componentes trabajen de manera coherente y eficiente.

A diferencia de las pruebas unitarias, no debemos aislar los componentes de la aplicación para validar el funcionamiento de un método específico. Por el contrario, crearemos una instancia de testing de la aplicación completa y cada test que generemos será validado dentro de esta copia.

Estas pruebas son conocidas también como pruebas **end-to-end** y dentro del proyecto generado con **Nest CLI** se encuentra pre configurado un entorno de integración dentro de la carpeta **test**.

Para ejecutar los tests end to end debes utilizar el comando:

```bash
npm run test:e2e
```

> **Ten presente que, si al ejecutar el comando, recibes un error como el que se muestra en la siguiente imagen, simplemente debes cambiar las importaciones en los archivos correspondientes. Jest no entiende los path absolutos, es decir, importaciones como 'src/todos/todo.entity' deben ser transformados a paths relativos '../todo.entity'**.

Al correr los test nos encontraremos con una prueba fallida correspondiente al test **app.e2e-spec.ts**

Si nos dirigimos a este archivo, podremos encontrar el código correspondiente a este test que a grandes rasgos sería una plantilla para cualquier prueba de integración que deseemos realizar.

```ts
// test/app.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

decribe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.careateTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFisture.creteNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello world!');
  });
});
```

## Creación de Pruebas de integración en Nest

Tomemos como base el archivo preconstruido de **e2e testing de Nest** y configuremos algunas pruebas para validar la integración de la lógica de negocio correspondiente a los usuarios.

A este archivo de test le llamaremos **users.e2e-spec.ts** y el primer test que crearemos servirá para validar que la ruta **“/users/”** nos devuelva el código de status correcto, así como un array con los usuarios.

```ts
// test/app.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

decribe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.careateTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFisture.creteNestApplication();
    await app.init();
  });

  it('Get /users, returns an array of users with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get('/users');
    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toInstanceOf(Array);
  });

  it('Get /users/:id, returns an user with an OK status code', async () => {
    //Buscar un id que exista
    const req = await request(app.getHttpServer()).get(
      '/users/76ae2f54-dade-49a3-9e7e-da883778cfe7'
    );
    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toInstanceOf(Object);
  });

  it("Get /users/:id, throws a NotFoundException if the user doesn't exists with a message User not found", async () => {
    //Buscar un id que no exista
    const req = await request(app.getHttpServer()).get(
      '/users/76ae2f54-dade-49a3-9e7e-da883778cfe0'
    );
    console.log(req.body);

    expect(req.status).toBe(404);
    expect(req.body.message).toBe('User not found');
  });

  // Podemos probar los pipes
  it('Get /users/:id, throws an error if not a UUID', async () => {
    //Buscar un id que no exista
    const req = await request(app.getHttpServer()).get('/users/not-a-uuid');
    console.log(req.body);

    expect(req.status).toBe(400);
    expect(req.body).toBeInstanceOf(Object);
  });

  // Creación de usuario
  it('Post /users/signup, create a user with an OK status code', async () => {
    //Buscar un id que no exista
    const req = await request(app.getHttpServer()).post('/users/signup').send({
      email: 'test@test.com',
      password: '12345678',
      name: 'Test',
    });

    console.log(req.body);

    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object);
  });
});
```

El último test fallará en la segunda ejecución porque la primera insertó el user correctamente en la base de datos, por lo que en la segunda ejecución fallará por constraint (email: unique).

En los test e2e se suele utilizar una base de datos mock.

Por ahora, lo importante es que prestemos atención en cómo podemos realizar una validación de rutas de forma integral gracias a las pruebas de integración.

- Estas pruebas generalmente son implementadas después de que cada elemento cuenta con **pruebas unitarias** que aseguran el correcto funcionamiento del código de manera independiente, para después observar el comportamiento conjunto de forma integral.

## Cierre

En esta clase, hemos aprendido a escribir test para nuestras aplicaciones desarrolladas en Nest. Aprendimos a implementar pruebas unitarias que evalúan el correcto funcionamiento de componentes individuales de nuestro desarrollo. Construimos entornos de simulación de dependencias para testear los distintos elementos según su naturaleza y las dependencias correspondientes. De esta manera, podíamos aislar por completo al componente y verificar que cumpliera su respectivo trabajo.

Pasamos al siguiente nivel mediante el testeo de otros elementos como controladores, servicios y módulos, siguiendo una estrategia de testing adecuada para la correcta implementación y flujo de las pruebas.

Finalmente, conocimos el concepto de pruebas de integración, que nos permiten evaluar el comportamiento de un componente y cómo este se está integrando con otros elementos del sistema. La finalidad de las pruebas end-to-end consiste en verificar que nuestras aplicaciones funcionen adecuadamente y el flujo de la información que pasa entre las distintas capas (controladores, servicios, módulos y base de datos) sea el correcto.

Este recorrido nos ha proporcionado una comprensión integral de las prácticas de testing en NestJS, permitiéndonos asegurar la calidad y el rendimiento de nuestro código en todas las capas de la aplicación.

## Homework

### ACTIVIDAD 01

Crear e implementar pruebas unitarias en los diferentes módulos de la aplicación.

### ACTIVIDAD 02

Crear e implementar pruebas de integración en la aplicación.

**TIPs: ¡Bien hecho!**

- La implementación de pruebas es un extra credit para el proyecto integrador.

**[Requisitos]**:

Para tomar el extra credit de este hito el alumno deberá haber creado:

- 5 pruebas unitarias de al menos 5 funcionalidades diferentes dentro de la aplicación.
- Validar mediante pruebas de integración el funcionamiento de al menos 5 rutas de la aplicación.

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
