---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 13. Backend Avanzado
date: 13-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry-index.jpg',
    alt: 'A picture of a coder',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-express.png',
    alt: 'Logo express',
  }
description: Mongoose. Segunda parte.
draft: false
category: Mongo - Mongoose - Base de datoss
---

## Responsabilidad y modularización

### Responsabilidades

**Modularización**

- Se refiere a la forma en que el código se organiza
- Se divide en carpetas y archivos independientes
- Facilita su desarrollo, mantenimiento y escalabilidad
- Cada módulo encapsula una parte del sistema
- Cada archivo desempeña una única responsabilidad

Cuando trabajamos en un proyecto, **una de las principales tareas del desarrollador es mantener el código ordenado y legible** sin importar la extensión de la aplicación.

Esto puede sonar a una tarea sencilla, pero en realidad puede llegar a ser todo un reto y más aún cuando no se planifica una modularización adecuada al inicio de un proyecto, así como la responsabilidad de las carpetas y archivos que componen la aplicación.

<mark>El proceso de **modularización** y división de responsabilidades es la forma en la que el **código se organiza** y se divide en carpetas y archivos independientes, para facilitar su desarrollo, mantenimiento y escalabilidad.</mark>

Cada **módulo** encapsula una parte de la aplicación y, cada **archivo**, tendrá una única responsabilidad bien definida.

Para ello, es necesario realizar una **planificación del proyecto** que nos permita ver a gran escala la estructura de nuestra aplicación.

## Estrategias de modularización

Conozcamos algunas estrategias que podemos seguir para simplificar este proceso...

1. **Diseñar modular desde el principio**

- Identifica los componentes principales del sistema y cómo se relacionan entre sí.
- 😉 Esto te ayudará a definir los módulos y archivos necesarios.

👉 Por ejemplo, si vamos a crear un servidor que trabaje como API Rest de una aplicación, dividiremos el proyecto en carpetas asociadas a la configuración del servidor, enrutadores, controllers y handlers como mínimo.

> Recodemos que existe el modelo:
>
> - <mark>Modular</mark>
>   - Divide por responsabilidades (MVC)
>   ```
>   /
>   |-> index.js
>   |
>   |-> src
>   |    |-> routes
>   |    |-> controllers
>   |    |-> services
>   |
>   |-> middlewares
>   |
>   |- package.json
>   ```
> - <mark>Funcional</mark>
>   - Las carpetas representan características específicas del proyecto, como 'usuarios', 'publicaciones'
>   ```
>   /
>   |
>   |-> users
>   |     |-> UsersRoutes
>   |     |-> UsersColtroller
>   |     |-> UsersService
>   |
>   |-> post
>   |     |-> PostsRoutes
>   |     |-> PostsColtroller
>   |     |-> PostsService
>   |
>   -> App.js
>   ```

2. **Separación de preocupaciones**

- Divide tu código en módulos que se ocupen de preocupaciones específicas.
- 😉 Esto facilita la comprensión y el mantenimiento del código. Es decir que, dentro de cada una de estas carpetas y archivos, se desarrollará la lógica específica para trabajar con un elemento de mi aplicación.

👉 Por ejemplo, puedes tener módulos separados para la lógica de negocio, acceso a datos, autenticación, manejo de errores, etcétera.

👉 Por ejemplo, dentro de la carpeta controllers puedo crear un módulo donde almacenar la lógica para cada uno de los recursos de mi API.

3. **Principio de responsabilidad única**

- Como ya mencionamos en múltiples oportunidades, cada archivo o módulo debe tener una responsabilidad única y bien definida.

- 😉 Evita la sobrecarga de funcionalidades en un solo archivo y asegúrate de que, además, tenga un propósito claro.

Así, cada uno de los módulos se encargará de contener la lógica enfocada a gestionar la información de un solo recurso, facilitando su manipulación y mantenimiento.

👉 Por ejemplo, podríamos tener un módulo que únicamente contenga lógica para procesar las solicitudes del recurso usuarios.

4. **Jerarquía de archivos y carpetas**

- Organiza tus archivos y carpetas de manera lógica y coherente.

👉 Por ejemplo, puedes agrupar archivos relacionados en carpetas según su función o módulo. Utiliza una estructura de carpetas clara y consistente en todo el proyecto.

Cuando el proyecto sea cada vez más grande, será necesario incorporar nuevas herramientas y archivos a la aplicación, así que es fundamental definir la jerarquía para simplificar el manejo de información e importaciones entre módulos.

👉 Por ejemplo, si agrego un ODM para definir los modelos o entidades de mi base de datos, lo ideal sería definirla dentro de los niveles más altos de mi proyecto ya que la configuración del servidor y controladores van a requerir acceso a dicha información.

5. **Nombres descriptivos**

- Utiliza nombres descriptivos y significativos para tus archivos y módulos.
- 😉 Esto facilita la comprensión del propósito de cada uno de ellos y su relación con otros archivos en el proyecto.

7. **Acoplamiento mínimo**

- Minimiza el acoplamiento entre módulos y archivos. Esto significa que los módulos deben tener la menor dependencia posible entre sí y comunicarse a través de definiciones claras y específicas.
- En otras palabras, te invitamos a planificar la interacción entre módulos para minimizar las importaciones y exportaciones innecesarias.

👉 Por ejemplo, el enrutador de tu aplicación solo debe acceder a los handlers que le corresponden y estos a su vez se encargan de importar los controladores necesarios para que la ruta funcione correctamente.

En ningún momento el enrutador importa al controlador de forma directa.

😉 Otra forma de asegurar que el acoplamiento entre módulos se realice de la manera más eficientemente posible, es por medio de la abstracción.

## Abstracción

- Permite interactuar con un módulo sin necesidad de entender todos los detalles internos de su implementación
- Simplifica el uso de una funcionalidad al exponer sólo lo esencial y relevante, ocultando el resto de información máscompleja

En el contexto de la modularización, <mark>la **abstracción** permite interactuar con un módulo sin necesidad de entender todos los detalles internos de su implementación</mark>.

<mark>Su principal objetivo es **simplificar** el uso de una funcionalidad al exponer solo lo relevante, ocultando el resto de información más compleja</mark>.

Hagamos una analogía para entender esto mejor. Imagina que tenemos un coche. Este proporciona distintos elementos para interactuar con él, como el volante, los pedales, la caja de cambios, entre otros.

Sin embargo, para utilizarlo, no necesitas entender todos los detalles del motor, cómo funciona internamente la transmisión o cómo opera el sistema de frenos.

En este caso, el auto sería un componente abstraído con herramientas mediante las cuales te comunicas y haces uso del componente, sin tener en cuenta las distintas operaciones que realiza internamente.

Este concepto puede parecer complejo, pero en la práctica es fácil de aplicar😉. De hecho lo hemos utilizado en diferentes ocasiones sin darnos cuenta.

![Abstracción.](/astro-doc-full-stack/images/m2/clase13-abstraccion.png)

Volvamos por un momento a la aplicación de ejemplo que creamos en la clase de mongoose.

En esta clase, para la **definición de los esquemas** de las entidades usamos instancias de la clase Schema de la librería mongoose.

Pero, ¿De dónde sale esta clase? ¿Cómo se construye el schema dentro de esta clase?

Probemos haciendo **ctrl+click** en la palabra **Schema**, lo cual nos llevará al módulo que se encarga de definir esta clase y veremos la siguiente información.

![Abstracción II.](/astro-doc-full-stack/images/m2/clase13-abstraccion2.png)

## Propuesta en backend

En el backend podemos separar aún más la funcionalidad archivos más mantenibles. Por ejemplo nuestros servicios podían seprarar su funcionalidad de la siguiente manera:

```bash
|
|-> services
|     |-> movies
|     |     |-> getMovies.js
|     |     |-> postMovie.js
|     |-> index.js
|
```

```javascript
// getMovies.js
const Movie = require('../../models/Movie.js');

module.exports = async () => {
  const allMovies = await Movie.find();
  return allMovies;
};
```

```javascript
// postMovie.js
const Movie = require('../../models/Movie.js');

module.exports = async (movie) => {
  const newMovie = new Movie(movie);
  const savedMovie = await newMovie.save();
  return savedMovies;
};
```

```javascript
// index.js
const getMovies = requiere('./movies/getMovies');
const postMovies = requiere('./movies/postMovie');

module.exports = { getMovies, postMovies };
```

Ahora podemos importar de manera simple. En el ejemplo importamos desde el controlador a los servicios. Cómo solo colocamos la carpeta servicios, Node búscará un archivo llamado index.js

```javascript
// movieController.js
// const { getMovies, postMovies } = requiere('../services/movieService');
const { getMovies, postMovies } = requiere('../services');
...
...
```

## Manejo de errores

Para garantizar el correcto funcionamiento y eficiencia de una aplicación, debemos **identificar** aquellas tareas susceptibles de provocar errores en algún momento.

Esta detección permite gestionar de manera adecuada cualquier tipo de error que pueda ocurrir durante la ejecución del código, con lo cual prevenimos que una aplicación se bloquee o genere comportamientos inesperados.

Existen diversas alternativas y estrategias que nos permiten realizar este manejo de errores y pueden trabajar de manera conjunta o de forma independiente.

Estas tienen como objetivo ejecutar una operación, ya sea de forma sincrónica o asincrónica, considerando los posibles casos de error para actuar en consecuencia y devolver información pertinente al cliente.

- Identificar aquellas tareas susceptibles de provocar errores en algún momento
- Gestionar de manera adecuada cualquier tipo de error que pueda ocurrir durante la ejecución del código
- Prevenir que una aplicación se bloquee o genere comportamientos inesperados

### Estategias para el manejo de errores

- **Try / Catch** → envuelve la ejecución de una tarea propensa a errores dentro del bloque try, seguido del bloque catch, que capturará y manejará cualquier error dentro del bloque anterior.

Una de las implementaciones más frecuentes de esta herramienta es para el manejo de errores en funciones asíncronas lo cual nos brinda una alternativa para procesar la finalización de una promesa en caso de éxitoo de rechazo.

- **Throw** → Cuando el error que se genera es causado por el cliente, debido a una solicitud mal estructurada, aparece otra estrategia para el manejo de errores: throw.

Esta palabra clave nos permite lanzar errores explícitamente y se utiliza para crear condiciones específicas de error dentro del código, es decir, podemos personalizar el mensaje de error usando throw.

- **Middlewares** → Como vimos, son funciones que actúan como intermediarios dentro de nuestro servidor, esto es, ocurren antes de llegar al endpoint de destino.

Una de las grandes aplicaciones de los middlewares es en el manejo de errores que pueden presentarse de forma repetitiva dentro del código y que pueden ser validados antes de que la solicitud llegue incluso al handler.

**si gregamos una función para gestionar errores podemos:**

- Evitar la "caida" del servidor
- Alertar al cliente sobre la respuesta a la solicitud

Hasta el momento no hemmos capturado los errores que sugen en la base de datos. Por ejemplo, si queremos buscar un elemento en paricular y no existe el backend arraja un error y se detiene. Esto ocurre si no gestionamos los errores.

Cuando el proceso se encuentra con un error síncrono, Express es capaz de manejar el error automáticamente, utiliza un gestionador de errores que trae por defecto y la app no cancela.

En cambio cuando encuentra un error sobre una operación asíncrona (ejemplo de la base de datos), Express no lo puede gestionar y ocurre la cancelación.

- **Altenativa 1** Partimos de un ejemplo que no gestiona errores en los servicios ni en controladores. Es conveniente que la gestión de errores la lleve el controlador, porque es el encargado de llamar a las funciones de servicios, que pueden ser varias y cualquiera de ellas puede generar el error. Por lo tanto, centralizamos la gestión de errores en el controlador.

Un posibilidad es agregar un try {} catch {} al controlador envolviendo las llamadas a las funciones de los servicios. Entonces ante cualquier error lo gestionamos en el catch. Pero aquí surge otro problema, ¿es un error del servidor? ¿Es un error en la petición del usuario?

Ahora, el error está controlado. Si ocurre un error lo retornamos como respuesta y el servidor no cancela. Entonces, no es la mejor gestión del error proque colocamos bloques try catch en todos los controladores y asumimos un código de error y status, pero la aplicación no cancela.

- **Alternativa 2** Para evitar tantos try cacth y asumir un status y código de error para retornar al cliente podemos crear una carpeta llamada utils.

La carpeta utils contendrá funciones que se pueden utilizar para utilizar en distintos lugares del proyecto, pero también en otros proyectos.

Creamos una archivo llamado catchAsync.js para lograr que todos los controladores manejen los errores.

La función catchAsync.js es una función de orden superior. Es una función que recibe una función (controller) y le hace un mejora. Los controladores no pueden manejar errores a menos que les coloquemos try catch y lo solventaremos con la nueva utilidad.

```javascript
// catchAsync.js
const catchAsync = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch((err) => {
      next(err);
    });
  };
};
module.exports = catchAsync;
```

<mark>La función recibe al controlador y retorna una nueva función que será el nuevo controlador mejorado. Ejecuta el controlador original y si ocurre un error lo catchea ejecutando un next(error). Next(error) envía el error al manejador de errores automático de Express.</mark>

<mark>En los middlewares, cuando ejecutamos next() sin parámetro indicamos que continúe por el siguiente middleware o por la ejecución del controlador, pero si next(error) posee un parámetro see enviará al manejador de errores de Express.</mark>

### Cómo utilizamos la utilidad

```javascript
const userService = require('../services/userServices');
const catchAsync = require('../utils/catchAsync');

const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.param;
  const user = await userService.getUserById(id);
  return user;
};

const getUserByName = async (req, res) => {
  const { name } = req.body;
  const user = await userService.getUserById(name);
  return user;
};

const createUser = async (req, res) => {
  const { name, email, age } = req.body;
  const newUser = await userService.createUser({ name, email, age });
  return newUser;
};

const addVehicle = async (req, res) => {
  const { userId, vehickeId } = req.body;
  await userService.createUser(userId, vehickeId);
  res.status(200).json({ message: 'Vehicle added' });
};

module.exports = {
  getUsers: catchAsync(getUsers),
  getUserById: catchAsync(getUserById),
  getUserByName: catchAsync(getUserByName),
  createUser: catchAsync(createUser),
  addVehicle: catchAsync(addVehicle),
};
```

De esta manera, evitamos colocar el try catch en cada controlador, pero aún tenemos que gestionar el status y el código de error.

## Express error handler

- Express cuenta con un middleware de manejo de errores predeterminado de manera implícita
- Captura los errores que ocurran dentro de las rutas y otros middlewares de la app
- Proporciona un mecanismo centralizado para gestionarlos de manera eficiente
- Para utilizar el error handler de Express solo es necesario agregarlo como middleware a nustras rutas

Express cuenta con un **middleware** de manejo de errores predeterminado de manera implícita que captura los errores que ocurren dentro de las rutas y otros middlewares de la aplicación. El problema es que tiende a ser demasiado extenso, como pudiste ver en la solicitud anterior, pero por suerte podemos sobre-escribir su funcionamiento de una forma muy simple.

Para hacer uso del **error handler de express** solo es necesario agregarlo como middleware a nuestras rutas con la siguiente estructura.

```javascript
app.use((err, req, res, next) => {
  // Manejo del error
});

return go(f, seed, []);
```

Este error handler se encarga de recibir los errores de las solicitudes y gestionarlos de acuerdo a lo que indiquemos en el bloque de código del middleware.

Vamos a agregarlo dentro del archivo **app.js** donde tenemos la configuración de nuestra app y por ahora solo construiremos un objeto con el mensaje de error generado.

## Funciones de Orden Superior

- Son aquellas funciones que aceptan otras funciones como argumentos
- Se utilizan en un bloque de lógica adicional
- Se encarga de procesar los errores de nuestros handlers de forma "genérica"
- Permite planificar el manejo de errores dentro de una sola función en lugar de hacerlo en cada handler
- Es una función que recibe como argumento otra función asíncrona
- Se ejecuta dentro del manejo de errores que definamos, como un try/catch
- Permite reducir líneas de código al momento de crear los handlers
- Podemos exportar la versión validada de cada handler asegurándonos que todos reciban el mismo manejo de errores asíncronos
- Evita la repetición de bloques try/catch que desmpeñan el mismo papel

El concepto de **función de orden superior** se refiere a aquellas funciones que aceptan otras funciones como argumentos para usarlas en un bloque de lógica adicional. En nuestro caso, esa lógica adicional estará enfocada al manejo de errores en los handlers de nuestra aplicación.

La idea general es crear una función de orden superior que se encargue de procesar los errores de nuestros handlers de forma “genérica”, permitiendo planificar el manejo de errores dentro de una sola función en lugar de hacerlo en cada handler.

La **estructura general** es una función que recibe como argumento otra función asíncrona y la ejecuta dentro del manejo de errores que definamos, como un try/catch.

El manejador de errores de Express tiene dos problemas.

1. Por defecto asume que todos los erroresson de tipo 500, no discrimina el tipo de error y siempre responde con status 500.

2. Por otro lado, envía al cliente como respuesta la traza del error, el seguimiento de la petición hasta el error.

> <mark>Brindar esta información al cliente no es adecuado porque no sabemos quién es. No es buena práctica exponer información interna de nuestro serividor.</mark>

Una de las soluciones que podemos dar es pisar el manejador de errores de Express. En nuestra app podemos crear (al final) un nuevo middleware que reciba el error, req, res y next.

Al definir cuatros parámetros le indicaremos a Express que este es el nuevo manejador de errores.

```javascript
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.messaje });
});
```

Ahora recibiremos una respuesta formateada a nuestra preferencia. Pero seguimos teniendo el problema sobre el código de error. Siempre respondemos con código 500 y podría ser 400 o 409 o cualquier otro derivado de un error en la base de datos.

Podemos cambiar el 500 por 400 pero siempre responderíamos 400. La idea es que el código de error sea dinámico.

Entonces podemos crear un nuevo middleware:

```javascript
const mongoose = require('mongoose');

const validateId = (req, res, next) => {
  const { id } = rea.params;
  // Verificamos si el id que recibimos en la solicitud es un id válido de Mongodb
  // a través de un método de mongoose
  if (mongoose.types.ObjectId.isValue(id)) {
    next();
  } else {
    next({ message: 'Id inválido', statusCode: 400 });
  }
};

module.exports = validateId;
```

Ahora podemos incorporar el middleware a las rutas donde necesitemos evaluar el id.

```javascript
const usersController = require('../controllers/usersController');
const ivalidateId = require('../middlewares/validateId');

router.get('/users/:id', ivalidateId, usersController.getUserById);
```

Y modificamos nuestro manejador de eventos para que interprete el código de error y el mensaje.

```javascript
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.messaje });
});
```

Como vimos, las **buenas prácticas** de código nos indican que el **status code** debe coincidir con la respuesta emitida al cliente. Una forma de llegar a este resultado es mediante la **implementación** de una clase auxiliar o utilitaria que nos permita definir tipos de **error** cuyas propiedades puedan ser personalizadas.

Normalmente, estas clases están dentro de una carpeta llamada **utils o helpers**, las cuales no tienen el mismo propósito. Hagamos una pequeña distinción entre estos dos conceptos de **modularización** que nos pueden ayudar a organizar mejor nuestro código, antes de implementar esta clase utilitaria.

## Utils y helpers

En general, estos términos se refieren a funciones o grupo de funciones que proporcionan **utilidades auxiliares**. Realizan tareas comunes, y en ocasiones repetitivas, para **facilitar** ciertas operaciones dentro de nuestros proyectos.

> En realidad, **no existe una diferencia definitiva entre ambos conceptos** y en ocasiones se utiliza una sola categoría dependiendo del equipo de desarrollo, ya que ambos términos se refieren a funciones o utilidades genéricas o auxiliares. Pero...

- **HELPERS** → </mark>Están enfocados en almacenar funciones auxiliares para una tarea específica dentro de la aplicación.</mark>

- **UTILS** → </mark>Estos trabajan con implementaciones más genéricas.</mark>

### Casos de uso y ejemplo

- Manipular strings
- Operaciones matemáticas
- Formateo de datos
- Manejo de fechas
- Manejo de errores

En general los utils y helpers pueden utilizarse para manipulación de strings, operaciones matemáticas, formateo de datos, manejo de fechas y en particular en el manejo de errores.

**Util** → función pequña que hace algo muy específica que segurmanete reutilicemos desde distintos lugares de nuestra App. Podría llevarme el módulo así como está a otro proyecto y funcionaría exactamente igual.

**helpers** → los helpers son funciones que van apareciendo a medida que trabajamos con proyectos complejos, que van creiendo. Y que tienen procesos muy propios del proyecto pero que también son pequeños y reutilizables en nuestra App.

```javascript
// formatAge.js
// Seguramente sean funciones un poco más complejas
module.exports = (n) => `${n} años`;
```

Lo podemos utilizar en el service, al crear un usuario.

```javascript
const User = require('../models/User');
const formatAge = requiere('../helpers/')

const createUser: async (user) => {
  const newUser = await User.create({ ...user, age: formatAge(user.age) });
  return newUser;
};
```

## Cierre

En esta clase hemos visto las **diferentes estrategias para estructuras de proyectos**, escalable y sólida, de nuestras carpetas y archivos, teniendo en cuenta recomendaciones como lo son el diseño modular, la responsabilidad única y la separación de preocupaciones.

Conocimos cómo funciona la **abstracción** y de qué manera nos facilita interactuar con módulos, sin conocer en profundidad cómo estos trabajan internamente. Esto es lo que está detrás de muchas librerías y frameworks como, por ejemplo, mongoose.

Pasamos luego a descubrir algunas **herramientas** para el manejo de los distintos **errores** que puedan ocurrir en nuestras aplicaciones y cómo implementarlas de manera eficiente. Cada una de ellas tiene características particulares y nos permiten personalizar su implementación según nuestras necesidades o las del proyecto.

Finalmente, exploramos el uso de los llamados **helpers y utils**; carpetas que contendrán funciones que nos permiten trabajar con tareas específicas en partes de código concretos o tareas más generales que pueden llevarse a cabo en cualquier lugar de nuestra aplicación, respectivamente.

![Mapa backend Avanzado.](/astro-doc-full-stack/images/m2/mapa-conceptos/clase13.png)

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

Creación de una vista de formulario para la creación de películas.

- Crear en nuestra aplicación de FrontEnd una vista de formulario, agregando además un nuevo enlace a la barra de navegación que hayas creado.

- Incluir en el formulario un input para cada uno de los campos que se requieren para la creación de una nueva película y dos botones: uno para enviar el formulario y otro para limpiar los inputs.

- Implementar una función que maneje el evento de limpieza del formulario y se encargue de seleccionar y vaciar el value de los inputs.

Implementar una función que maneje el evento de envío de formulario, que por el momento se encargará de seleccionar los inputs, y validar que todos los datos estén completos. Asumimos para esta actividad que TODOS los datos son obligatorios.

**ACTIVIDAD 02**

Implementación de un endpoint, controlador y función de servicio para la creación de películas.

Para esta actividad te sugerimos implementar las funciones correspondientes en el “camino inverso” al que hace nuestra request: servicio --> controlador --> endpoint

- Implementar en el módulo de servicio de películas una función async que reciba por parámetro los datos de las películas y llame al método correspondiente del modelo Movie para crear una nueva película en la base de datos.

- Implementar una función en el controlador de películas que se encargue de desestructurar del body los datos de la película para así llamar a la función del servicio que implementamos en el paso anterior. Que maneje errores de manera tal que si todo salió correctamente, se envíe un mensaje descriptivo al cliente con el status 201.

- Preparar en nuestro enrutador un nuevo endpoint que se encargue de recibir una petición de método POST a “/movies”. Al recibirla, ejecutar la lógica definida por el controlador implementado en el punto anterior.

**IMPORTANTE**: Recuerda hacer que las peticiones que ingresan al servidor pasen por el middleware express.json(), para que la información del body de la request esté disponible en el objeto req.body.

**EXTRA CREDIT**

Implementar una función middleware que se encargue de validar que todos los datos estén completos. Asumimos para esta actividad que TODOS los datos son obligatorios. Si quieres ir un poco más allá, puedes realizar validaciones más específicas. Ej: que el año sea un número de 4 dígitos.

**ACTIVIDAD 03**

Realizar la petición de método POST para la creación de películas.

- Desde la aplicación de FrontEnd, en la función que maneja el envío del formulario, realizar utilizando axios la solicitud de método POST a nuestra aplicación de BackEnd.

- Recuerda que el segundo argumento que le damos a la función axios.post es el objeto que representa al body de la petición, con todos los datos de la película que deseamos crear.

Si todo el proceso ha salido correctamente, luego de la creación deberías poder ver en el HOME la nueva película que has creado.

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
