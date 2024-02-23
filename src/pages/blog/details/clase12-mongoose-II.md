---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 12. Mongoose II
date: 13-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase11.jpg',
    alt: 'Mongoose',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-logo.png',
    alt: 'Mongoose logo',
  }
description: Mongoose. Segunda parte.
draft: false
category: Mongo - Mongoose - Base de datos
---

## Queries

- Es una solicitud de información específica a la BD
- Busca, crea, actualiza o elimina datos de acuerdo a ciertos criterios
- Instrucción para realizar una acción en la base de datos
- Mongoose nos **provee de algunos métodos** que nos facilitarán dichas solicitudes/queries para trabajar desde nuestro servidor

En el contexto de las bases de datos, **una query** es una solicitud de información específica a la base de datos.

Dicha query se utiliza para buscar, crear, actualizar o eliminar datos de acuerdo a ciertos criterios que pueden estar definidos dentro de la misma query. En otras palabras, es una instrucción para realizar una acción en la base de datos.

😎 Mongoose nos provee de una serie de métodos que nos permitirán realizar estar queries a la base de datos desde nuestros servidor. ¿Veamos algunos ejemplos?

El método **create** del modelo que definimos recibe un objeto. Mongoose, a través del método **findById**, también nos permite obtener un dato puntual por su identificador.

El id se obtiene de los parámetros del request. En el ejemplo users, la ruta quedará deifinida como **/users/:id**. De esta manera, indicamos que el :id será dinámico y podemos enviar el id de usuario que deseemos obtener.

Pero, que ocurré si no tenemos el id del usuario para realizar la consulta. En ese caso podemos utilizar otro valor para realizar la consulta como el nombre. El método **findOne** retorna el primer docuemtno que encuentre y que cumpla las condiciones que enviemos por parámetro.

Para este caso puntual deberemos definir una nueva ruta **/users/userName** y utilizar el body del request para enviar un objeto para enviar los filtros de búsqueda. La consideración que tenemos que tener es que la ruta /users/userName debe definirse antes que /users/:id, ya que Express creerá que userName es un Id de usuario e ingresará a la ruta incorrecta. Como regla se debe tener en cuenta que tenemos que ordenar los endpoints de los específico a lo más general. Los endpoints que reciban valores por parámetro (como :id) irán al final.

Más adelante veremos los métodos para eliminar y modificar datos.

```javascript
// controller
getUserById: async(req, res) {
  const {id } = req.params;
  const user = userService.getUserById(id)

  res.status(200).json(user);
}

getUserByName: async(req, res) {
  const { name } = req.body;
  const user = userService.getUserByName(name)

  res.status(200).json(user);
}
```

```javascript
// service
createUser: async(user) {
  const newUser = await User.create(user);
  return newUser;
}

getUserById: async(id) {
  const user = await User.findById(id);
  return user;
}

getUserByName: async(name) {
  const user = await User.findOne({name});
  return user;
}
```

## Actualización por operadores

Cuando actualizamos documentos podemos hacer que esta actualización sea definida mediante **operadores de comparación**, en lugar de que lo haga el cliente. Los operadores de comparación son códigos que nos permiten realizar la comparación de los datos recibidos con una condición específica.

> Operadores de comparación -> En la documentación oficial de MongoDB podrás encontrar todos los tipos. https://www.mongodb.com/docs/manual/reference/operator/query-comparison/

Por ejemplo, supongamos que queremos **incrementar** la edad del autor ‘Gabriel García Márquez’ en 5 años. Para esto, vamos a definir una nueva **ruta put** que reciba el nombre del autor por query y busque la coincidencia para actualizar.

En este caso, suponemos que solo habrá un autor con este nombre, por lo que utilizaremos el método **findOneAndUpdate()** pasándole por argumentos el nombre recibido por query para la consulta, el operador para incrementar la edad del autor ($inc) y la indicación para devolver el documento actualizado.

Finalmente, respondemos a la solicitud con la nueva información.

```javascript
app.put('/increment', async (res, req) => {
  try {
    const { name } = req.query;
    const author = await Author.findOneAndUpdate(
      { name: name },
      { $inc: { age: 5 } },
      { new: true }
    );

    res.json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

En el ejemplo, por simplicidad, resolvemos la consulta dentro de la ruta. No utilizamos controlador ni servicio. Por otro lado, utilizamos en query del endpoint para obtener el nombre del usuario.

**La ruta debería invocarse: /increment?name=Juan**

## Actualización con validación

¿Qué ocurriría si se envía una solicitud para actualizar un dato, pero esta solicitud fue no intencional? Supongamos que queremos incrementar la edad de Tolkien. Pero queremos que la actualización se realice solo si su edad es menor a 100, ya que no tendría sentido aumentar más de esta edad.

Para esto utilizaremos el operador $lt que nos ayude a validar la información. En este ejemplo, evaluaremos si el valor de la edad es menor a 100 años.

Si la propiedad edad del documento cumple esta **validación**, entonces se realizará la actualización. Caso contrario, no sucederá nada.

```javascript
app.put('/increment', async (res, req) => {
  try {
    const { name } = req.query;
    const author = await Author.findOneAndUpdate(
      { name: name, age: { $lt: 100 } },
      { $inc: { age: 5 } },
      { new: true }
    );

    res.json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

## Actualizar o crear

Dentro de todos los métodos existe uno llamado **findAndUpdate()** que nos permite forzar una actualización. En otras palabras, cuando se realiza la búsqueda y no se encuentra el documento no hay nada para actualizar, por lo que se creará. Esta acción es conocida como upsert.

```javascript
app.put('/forceUpdate', async (res, req) => {
  try {
    const { name, age } = req.query;
    const author = await Author.findOneAndUpdate(
      { name: name, age: age },
      { upsert: true },
      { new: true }
    );

    res.json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

**La ruta debería invocarse: /forceUpdate?name=Juan&age=25**

## Relaciones (referencias)

- Las relaciones se generan por referencia
- Establece conexiones entre documentos de diferentes colecciones
- Almacenamos una referencia al documento relacionado
- Esto optimiza la estructura de nuestra base de datos. Evita la redundancia
- Facilita el manejo de datos relacionados

Cuando trabajamos en MongoDB podemos combinar los datos de diferentes colecciones para generar una estructura de datos que unifique la información.

Estas relaciones se generan por referencia. En lugar de almacenar toda la información relacionada en un solo documento, almacenamos una referencia al documento relacionado.

😉 Esto optimiza la estructura de nuestra base de datos y facilita el manejo de datos relacionados, algo muy similar a cuando hablamos de la normalización de tablas.

Para continuar el ejemplo vamos a suponer que un usuario puede o no tener un vehículo. Enonces definimos el modilo Vehículo.

```javascript
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  patente: String,
  marca: String,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
```

Tendremos que crear las rutas, el controlador y el servicio para gestionar los vehículos.

Para indicar que un usuario podría tener un vehículo debemos modificar el modelo User.

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  // Hacemos referencia al vehiculo
  // el campo vehicle será un objectId, una referencia al modelo vehicle
  vehicle: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

También podemos agregar una nueva ruta para users que nos permita establecer la referencia.

```javascript
router.put('users/addVehicle', userController.addVehicle);
```

Preparamos el controlador:

```javascript
addVehicle: async(req, res) {
  const {userId, vehicleId} = req.body;
  await userService.addVehicle({userId, vehicleId});
  res.status(200).json({message: "User updated"})
}
```

Finalmente, agregamos el servicio utilizando el método **save()**. Tener en cuenta que para simplificar no realizamos validaciones. Existe el user? Existe el vehículo?

```javascript
addVehicle: async({userId, vehicleId}) {
  const user = await User.findById(userId);
  user.vehicle = vehicleId;
  await user.save();
  return user;
}
```

A continuación conoceremos el método populate, que nos permitirá completar con información que nos interesa una solicitud a la base de datos.

## Populación

### Población de Documentos

La **populación** es una técnica que nos permite **reemplazar referencias** en documentos con los datos reales de los documentos a los que hacen referencia. En otras palabras, podemos acceder a información de otras colecciones que están relacionadas con los documentos que estamos consultando.

Para ilustrar esta idea, piensa en una colección de Usuarios y otra de Publicaciones correspondientes a una aplicación de blog web.

Consideremos que cada documento usuario de la colección Usuarios, posee un campo llamado “publicaciones” que es una referencia a uno o varios documentos de la colección Publicaciones.

Si deseamos consultar un usuario podemos "poblar" el campo publicaciones, de manera que no veríamos solo la referencia, sino los detalles completos de todas las publicaciones que están asociadas a este.

El resultado de consultar el user ahora retornará el nuevo dato: la referencia a el vehículo, pero retornará el objectId. Podemos hacer que retorne todos los valores del vehículo en la misma consulta.

```javascript
getUsers: async() {
  const users = await User.find().populate("vehicle");
  return users;
}
```

El **método populate** no retorna el Id de la referencia, lo reemplaza por el doumento al que hace la refencia.

```json
[
  {
    "_id": "dkf2kj546k54l",
    "name": "Mauricio",
    "email": "jourdanmauricio@gmail.com",
    "age": 49,
    "vehicle": {
      "_id": "dfkjdkfg343dfs",
      "patente": "ABC123",
      "marca": "Ford",
      "modelo": "Falcon"
    }
  },
  ...
]
```

## Mongoose Tips & Tricks

### Método lean

El **método lean** es una herramienta que nos permite obtener documentos como objetos simples de JavaScript, en lugar de instancias completas de modelos de mongoose.

🎯 Esto puede ser útil cuando necesitamos datos livianos y no planeamos modificar ni guardar los documentos recuperados.

En esta función hemos realizado la búsqueda de información con y sin el método **lean()**.

En este caso **no es importante lo que está haciendo el código** sino la comparación de tamaño en bits de la respuesta que obtenemos al serializarlas con el método serialize de v8.

```javascript
app.get('/authors', async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const authors = await Author.findOne({ name: name }, 'name age');
      const books = await Book.find({ author: authors._id }, 'title year');
      authors.books = books;
      return res.json(authors);
    }

    const lightAuthors = await Author.find().select('name age').lean();
    const authors = await Author.find();

    console.log(
      'Sin Lean: ',
      v8.serialize(authors.map((a) => a.toJson())).length
    );
    console.log('Con Lean: ', v8.serialize(lightAuthors).length);

    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

<mark>Este método no genera una diferencia notable en cuanto a la información recibida, pero sí en cuanto al peso en memoria de dicha información, lo cual mejora la eficiencia en consultas rápidas de información ya que **en promedio la reducción en tamaño es 5 veces el original**.</mark>

## Métodos estáticos y dinámicos

Para finalizar hablaremos de otra herramienta útil: la creación y asignación de métodos que pueden ser asociados a un modelo o esquema. Estos métodos actúan como funciones personalizadas de los modelos. Podemos encontrar 2 variantes:

### Métodos Estáticos

**CREACION**
Los **métodos estáticos** son funciones que aplicamos directamente al modelo y no a instancias específicas. Son útiles para realizar operaciones que afectan a toda la colección o que no se vinculan a ningún documento en específico.

Por ejemplo, tomemos la lógica que busca libros mediante el id de un autor. Esto lo guardaremos como un método llamado findBooksByAuthor.

- Creación -> Para crearlo, solo tendremos que acceder a la propiedad statics del schema, y lugo generar la función.

```javascript
bookSchema.statics.findBooksByAuthor = async(authorId) => {
  const books = await this.foind({author: authorId}, "title year");
  reeturn books;
}
```

**USO**

Esto nos permitirá utilizar el método **findBooksByAuthor** dentro del modelo books y replicar su funcionamiento.

```javascript
app.get('/authors', async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const authors = await Author.findOne({ name: name }, 'name age');
      const books = await Book.findBooksByAuthor(authors._id);
      authors.books = books;
      return res.json(authors);
    }

    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

### Métodos Dinámicos

**CREACION**

Los **métodos dinámicos**, a diferencia de los estáticos, se aplican a instancias específicas del modelo. Son útiles para realizar operaciones concretas en documentos individuales, sin afectar los demás documentos.

Para este ejemplo realizaremos un console log con la información de la instancia que nos devuelve la búsqueda por nombre del autor.

Para poder declarar un **método dinámico** accederemos a la propiedad **methods** del schema al que queremos asociar el método y asignaremos el nombre y código de la función deseada.

Al ser un método dinámico podemos utilizar la palabra clave **this** para acceder a los valores de la instancia específica sobre la cual estamos trabajando.

```javascript
authorSchema.methods.printBook = async (books) => {
  console.log(`El autor ${this.name} tiene estos libros: ${this.books}`);
};
```

**USO**

Esto nos permitirá utilizar el método printBook para imprimir un string en consola con la información de la instancia recibida.

```javascript
app.get('/authors', async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const authors = await Author.findOne({ name: name }, 'name age');
      const books = await Book.findBooksByAuthor(authors._id);
      authors.books = books;
      return res.json(authors);
    }

    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

## Cierre

En esta clase profundizamos más en **mongoose** y las herramientas que lo componen. Vimos los principales **métodos** para hacer consultas, crear, eliminar o actualizar datos basada en ciertas condiciones.

Exploramos las **relaciones por referencia**, que permiten vincular documentos de distintas colecciones mediante referencias en los schemas, facilitando la estructuración de documentos que se enlazan unos con otros.

Conocimos el método **populate** que permite reemplazar referencias a documentos por datos más detallados de los documentos relacionados a otros sobre los que se consulta. Esto flexibiliza las **queries** y evita llevar a cabo múltiples consultas separadas para obtener la misma información solicitada.

Finalmente, descubrimos el método **lean**, que proporciona documentos como objetos de JavaScript, en lugar de instancias de modelos Mongoose. Introdujimos los **métodos estáticos**, que afectan a todas las instancias del modelo, y los **dinámicos**, que solo alteran instancias concretas que nosotros escojamos.

![Mapa de conceptos mongoose II.](/astro-doc-full-stack/images/m2/mapa-conceptos/clase12.png)

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

Creación de una vista de formulario para la creación de películas.

- Crear en nuestra aplicación de FrontEnd una vista de formulario, agregando además un nuevo enlace a la barra de navegación que hayas creado.

- Incluir en el formulario un input para cada uno de los campos que se requieren para la creación de una nueva película y dos botones: uno para enviar el formulario y otro para limpiar los inputs.

- Implementar una función que maneje el evento de limpieza del formulario y se encargue de seleccionar y vaciar el value de los inputs.

Implementar una función que maneje el evento de envío de formulario, que por el momento se encargará de seleccionar los inputs, y validar que todos los datos estén completos. Asumimos para esta actividad que todos los datos son obligatorios.

**ACTIVIDAD 02**
Implementación de un endpoint, controlador y función de servicio para la creación de películas.

Para esta actividad te sugerimos implementar las funciones correspondientes en el “camino inverso” al que hace nuestra request: servicio --> controlador --> endpoint

- Implementar en el módulo de servicio de películas una función async que reciba por parámetro los datos de las películas y llame al método correspondiente del modelo Movie para crear una nueva película en la base de datos.

- Implementar una función en el controlador de películas que se encargue de desestructurar del body los datos de la película para así llamar a la función del servicio que implementamos en el paso anterior. Que maneje errores de manera tal que si todo salió correctamente, se envíe un mensaje descriptivo al cliente con el status 201.

- Preparar en nuestro enrutador un nuevo endpoint que se encargue de recibir una petición de método POST a “/movies”. Al recibirla, ejecutar la lógica definida por el controlador implementado en el punto anterior.

- **IMPORTANTE**: Recuerda hacer que las peticiones que ingresan al servidor pasen por el middleware express.json(), para que la información del body de la request esté disponible en el objeto req.body.

**EXTRA CREDIT**

Implementar una función middleware que se encargue de validar que todos los datos estén completos. Asumimos para esta actividad que TODOS los datos son obligatorios. Si quieres ir un poco más allá, puedes realizar validaciones más específicas. Ej: que el año sea un número de 4 dígitos.

**ACTIVIDAD 03**

Realizar la petición de método POST para la creación de películas

- Desde la aplicación de FrontEnd, en la función que maneja el envío del formulario, realizar utilizando axios la solicitud de método POST a nuestra aplicación de backend.

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
