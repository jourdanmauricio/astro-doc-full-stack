---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Conociendo Mongodb
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/database/mongo/back.png', 
    alt: Logo mongodb'
  }
icon:
  {
    src: '/astro-doc-full-stack/images/database/mongo/icon.png',
    alt: 'Logo Angular',
  }
description: Introducción a Mondodb.
draft: false
category: Bases de datos
---

## ¿Qué es Mongo DB?

Es la base de datos más polular entre las NoSql u orientadas a documentos.

## Bases de datos NoSQL

### Tipos de Bases NoSQL

- **Documentales**: se empareja cada clave con una estructura de datos compleja que se denomina documento, existen otras bases de datos documentales como Mongo, Cloud Firebase o Couchbase.

- **Grafos**: Se utilizan para almacenar información sobre redes de datos, como las conexiones sociales. Neo4j es uno de los ejemplos mas populares de bases datos de este tipo.

- **Clave - Valor**: Son las bases de datos NoSQL mas simples. Cada elemento de la base de datos se almacena como un nombre de atributo (o “clave”), junto con su valor para acceso de memoria rápida. un ejemplo de estas bases de datos es redis.

- **Orientada a columnas**: Estas bases de datos, como Cassandra (la mas popular) o Hbase, permiten realizar consultas en grandes conjuntos y almacenan los datos en columnas, en lugar de filas.

Las bases de datos NoSQL tienen la característica de tener gran facilidad de escalamiento.

- **Escalamiento vertical**: incrementar las características de esa misma maquina (+RAM, +CPU, +almacenamiento)

- **Escalamiento horizontal**: Tener una maquina (o nodo) y “copiarla” (ahora tienes varios nodos o maquinas con las mismas características), asegurando alta disponibilidad, sistemas de replicacion o tener un conjunto que responda en simultaneo. Esto te libera de la necesidad de escalar de forma vertical.

Hacer escalamiento vertical es mas fácil pero mas costoso con el paso del tiempo. el escalamiento horizontal es mas costoso en el inicio pero luego el precio se mantiene “estándar” con el paso del tiempo.

<mark>Las bases de datos NoSQL aprovechan muy bien el Escalamiento horizontal: puedes armar un cluster de información en el que los datos se van a conectar entre si (varios nodos). Esto hace que los bases datos de datos NoSQL sea mas fácilmente escalable o replicable que una SQL.</mark>

**Que es Replicacion?** es una técnica en la que, una ves distribuimos la base de datos en varios nodos, mediante un load balancer, asigna las peticiones y consultas a cada uno de los nodos en una forma ordenada. Esto permite procesamiento en paralelo y también alta disponibilidad (si una replica falla, habrá otra disponible). Esto no es posible en el escalamiento vertical.

## ¿Qué son los documentos y colecciones?

Los documentos son la forma en que Mongo va a almacenar la información que este dentro de un dominio (entidad).

**Ejemplos de dominio:**

- Los productos de un ecommerce.
- Las clases de un curso.
- El inventario de una tienda.

Los **Documentos** son una forma de organizar y almacenar información con un conjunto de pares clave-valor.

Las **Colecciones** es la forma en que guardamos esos documentos y que normalmente comparten datos entre si, o al menos sabemos que tenemos una entidad o un modelo de datos que se relacionan. MongoDB almacena documentos en una colección, usualmente con campos comunes entre si.

Ejemplo: Podemos tener una colección llamada Usuarios que contengan todos los documentos de los usuarios de nuestra aplicación.

**Ejemplo de documento**

```javascript
{
  //_id -> cada documento contiene un objeto denominado "_id" que actúa
  //      como un identificar único dentro de una colección. Este identificador
  //      facilita el acceso y búsqueda a los documentos.
  "_id": ObjectId("5f8f58d4f46c6e8b9b395c"),
  "city": "LA PLATA",
  "zip": 1900,
  "loc": {
      "y": 33.331165,
      "y": 86.208934
  },
  "state": "BA"
}
```

## Creando tu primer BD

Crearemos una Base de Datos utilizando el servicio <mark>Mongo Atlas</mark>. Es un servicio en la nube que administra bases de datos Mongo. fue desarrollado por los mismos creadores de Mongo.

También veremos cómo gestionar una base de datos Mongo localmente.

Mongo Atlas posee un sistema de clusters, el motor de Mongo y muchas carcaterísticas que nos permiten administrar muy facilemente la base de datos.

Mongo Atlas incluye como parte de su servicio un sistema de replicación y clusterización, que es dificil de administrar si deseamos realizarlo por nuestra cuenta.

Seleccionaremos el <mark>**Free Cluster**</mark>

- 512MB to 5GB of storage
- Shared RAM
- Upgrade to dedicated clusters for full functionality
- No credit card requiered to start

La página de Mongo es: https://www.mongodb.com/es

## Usando Mongo Compass

Una forma utilizar Mongo es a través Compass. Debemos descargar el ejecutable de acuerdo al sistema oprativo que tenemos.

Compass nos solitará un conection string que obtendremos desde la propia web de Mongo Atlas. Unicamente debemos reemplazar el password por el que obtuvimos al crear la base de datos.

Para filtrar documentos de una colección solo debemos ingresar un json con las condiciones en la barra de búsqueda. Por ejemplo:

```javascript
{
  state: 'BA';
}
```

## Mongo en VSCode

Mongo posee una extensión para VSCode que nos ayuda a ejecutar las consultas a través del Mongo Query Language.

> Como ejecutaremos varias coonsultas, podemos guardarlas dentro de un archivo en el respositorio

Creamos un nuevo proyecto y abrimos VSCode

```bash
mkdir curso-mongo
cd curso-mongo
echo "node_modules" > .gitignore

code .
```

```javascript
// .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf
# editorconfig-tools is unable to ignore longs strings or urls
max_line_length = off

[CHANGELOG.md]
indent_size = false
```

La extension que debemos habilitar en VSCode es <mark>MongoDB for Vs Code</mark>. Se encuentra construida por los propios desarrolladores de Mongo

## Mongo Query Language

Dentro del proyecto creamos la carpeta src, y adentro creamos la carpeta 01-playground, y adentro un archivo llamado query.mongodb

```javascript
// query.mongodb
use('sample_trainig');
```

## Mongo con Docker

Para utilizar Mongodb en local podemos levantar el servicio en docker. Creamos un archivo llamado docker-compose.yml en la raíz del proyecto

```yaml
# docker-compose.yml
version: '3.9'

services:
  mongodb:
    image: mongo:5.0
    ports:
      - 27017:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root123
    volumes:
      - ./mongo_data:/data/db
```

Estamos bindeando la carpeta ./mongo_data para persistir los datos por lo que debemos agreagrla al .gitignore para no subir la base de datos local al repo en github-

```bash
# Agreamos a .gitignore
mongo_data/

```

Para levantar el contenedor ejecutamos desde el terminal:

```bash
# Levantamos el servicio en local
docker-compose up -d mongodb
```

Verificamos los servicios en ejecución

```bash
# Check
docker-compose ps
```

Ahora podemos generar una nueva conexón desde Mongo Compass. La URI sería mongodb://localhost:27017. En autenticación debemos ingresar Username: root, password: root123, SSL: off y ya podemos conectarnos.

Finalmente, podemos crear una nueva base de datos, sus colecciones y documentos.

También podemos generar la conexión desde VSCode y generar consultas a la base de datos local.

## Conectándonos usando mongosh

Mongo dispone la terminal mongosh para conectarnos directamente. No requiere nada en particular para realizar esta conexión ya que al tener la instancia de docker en ejecución podemos entrar al contenedor y ejecutar algunos comandos (mongodb ya posee instalado mongosh)

<mark>Para ingresar al contenedor:</mark>

```bash
docker-compose exec mongodb bash
```

Conectar con mongosh

```bash
mongosh "url"
```

Comandos

```javascript
// Muestra las bases de datos
show dbs

// Muestra las colecciones
show collections

use('prueba');

//db.movies.find({ director: 'James Gunn' })

//db.movies.find({ director: 'James Gunn' }).count();

// Retorna todos los docuemtnos de la colección
db.movies.find();

```

De esta manera, logramos conectanos a la base de datos tanto en Atlas como en local:

- A través de la terminal
- A través de Mongo Compass
- A través de VSCode

## Json vs. Bson

**Ventajas de Json:**

- Amigable
- Se puede leer
- Es un formato muy usado

**Desventajas de Json:**

- Basado en texto
- Consume myucho espacio
- Es limitado: string, boolean, number, arrays

Mongo creó un nuevo formato. BSON

**Ventajas de Bson:**

- Representación binaria de Json
- No cunsume demasiado espacio
- Alto rendiemiento
- Tipos de datos: extendemos los tipos de datos -> date, raw binary, integer, long, float

**Desventajas de Bson:**

- No es estandar
- No es un formato facil de leer, es para la máquina

Nosotros veremos la información como Json pero Mongo internamente trabajará con Bson.

Los tipos de datos que nos aporta Mongo son:

- String: este es el tipo de datos más utilizado para almacenar los datos. La cadena en MongoDB debe ser válida para UTF-8.
- Integer: este tipo se utiliza para almacenar un valor numérico. El número entero puede ser de 32 o 64 bits, dependiendo de su servidor.
- Boolean: este tipo se utiliza para almacenar un valor booleano (verdadero / falso).
- Double: este tipo se utiliza para almacenar valores de punto flotante.
- Min / Max: este tipo se usa para comparar un valor con los elementos BSON más bajos y más altos.
- Arrays: este tipo se usa para almacenar arrays o listas o múltiples valores en una clave.
- Timestamp: Marca de hora. Esto puede ser útil para grabar cuando un documento ha sido modificado o agregado.
- Object: este tipo de datos se utiliza para documentos incrustados.
- Null: este tipo se utiliza para almacenar un valor nulo.
- Symbol: este tipo de datos se utiliza de forma idéntica a una cadena; sin embargo, generalmente se reserva para idiomas que usan un tipo de símbolo específico.
- Date: este tipo de datos se utiliza para almacenar la fecha u hora actual en formato de hora UNIX. Puede especificar su propia fecha y hora creando el objeto de Fecha y día, mes, año que pasa.
- ObjectId: este tipo de datos se utiliza para almacenar la ID del documento.
- Binary: este tipo de datos se utiliza para almacenar datos binarios.
- Code: este tipo de datos se utiliza para almacenar el código JavaScript en el documento.
- Regular Expression: este tipo de datos se utiliza para almacenar expresiones regulares.

## CRUD

### Insertando un documento

```javascript
// Si la base de datos no existe la crea
use('prueba');

// Si no existe la colleccion movies la crea
db.movies.find();

// Insertando un documento, mongo genera el id
db.products.insertOne({
  title: 'Title 1',
  duration: '1hs',
});

// Insertando un documento, indicando el id
db.products.insertOne({
  _id: 1,
  title: 'Title 1',
  duration: '1hs',
});

// Cuidado. No podemos generar dos documentos con el mismo Id. Mongo garantiza utilizar Ids únicos pero si los gestionamos nosotros será nuestra responsabilidad
```

### Insertando varios documentos

```javascript
use('prueba');

// Borramos todos los documentos de la colleción
db.movies.drop();

db.movies.insertMany([
  {
    title: 'Guardians of the Galaxy Vol. 2',
    year: 2017,
    director: 'James Gunn',
    duration: '2h 16min',
    genre: ['Action', 'Adventure', 'Comedy'],
    rate: 7.7,
    poster:
      'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg',
  },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
    director: 'George Lucas',
    duration: '2h 1min',
    genre: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
    rate: 8.7,
    poster:
      'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    director: 'Peter Jackson',
    duration: '2h 58min',
    genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    rate: 8.8,
    poster:
      'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
  },
]);

db.products.find();
```

En este caso no enviamos el \_id, pero **qué ocurre si enviamos \_ids repetidos?** En ese caso, Mongo insertará hasta el punto donde encuentra el error. Arrojará el error pero los registros que llegaron a insertarse permanecen, no ejecuta un rollback. Es decir, solo insertará hasta el punto de error y finalizará la ejecución.

Este puede ser un problema porque en ocaciones deseamos enviar un set de datos y que queden afuera los que poseen un error. Para indicarle a Mongo que si encuentra un error descarte el documento y continúe podemos agregar una instrucción **ordered: false**.

```javascript
use('prueba');
db.products.drop();

db.products.insertMany(
  [
    {
      _id: 1,
      name: 'Product 1',
      price: 100,
    },
    {
      _id: 2,
      name: 'Product 2',
      price: 200,
    },
    {
      _id: 1,
      name: 'Product 1',
      price: 300,
    },
    {
      _id: 4,
      name: 'Product 4',
      price: 400,
    },
  ],
  {
    ordered: false,
  }
);

db.products.find();
```

<mark>Genera error por duplicidad pero inserta los productos 1, 2, 4.<mark>

### Actualizando un documento

Para actualizar un documento debemos pasar un query con un identificador del documento y un objeto con operadores como $inc para incrementar propiedades numéricas o $set para setear una o mas propiedades, añadir una nueva etc.

Mongo no nos permite reemplazar todo el documento.

```javascript
db.products.updateOne(
  // query
  { _id: 2 },
  // change
  { name: 'Juan' }
);
// ERROR

// A través del operador $set indicamos que atributos modificaremos y
// también podemos agregar nuevos
db.products.updateOne(
  // query
  { _id: 2 },
  // change
  {
    $set: {
      name: 'Juan',
      price: 3000,
      tags: ['A', 'B', 'C'],
    },
  }
);

// A través del operador $inc indicamos qué atributo queremos incrementar
// generalmente es para valores numéricos
// Incrementa en 1000 el precio
db.products.updateOne(
  // query
  { _id: 2 },
  // change
  {
    $inc: {
      price: 1000,
    },
  }
);

// Los productos generados con id por Mongo se seleccionan de
// la siguiente manera. Recordemos que para buscar en mongo los ids
// autogenerados no podemos utilizar el string directamente, utilizamos
// la función ObjectId
db.products.updateOne(
  //query
  {
    _id: ObjectId('63d81a4a8e4fe2331cfbef8f'),
  },
  //change => operator
  {
    $inc: {
      price: 100,
    },
  }
);
```

### Actualizando varios documentos

Listado de operadores de actualización:

- $inc: Incrementa el valor de un atributo numérico en una cantidad específica. |
- $mul: Multiplica el valor de un atributo numérico por un factor específico. |
- $rename: Cambia el nombre de un atributo. |
- $set: Asigna un valor específico a un atributo. |
- $unset: Elimina un atributo de un documento. |
- $min: Actualiza el valor de un atributo con el valor mínimo especificado, sólo si el valor actual es mayor que el valor especificado. |
- $max: Actualiza el valor de un atributo con el valor máximo especificado, sólo si el valor actual es menor que el valor especificado. |
- $currentDate: Establece el valor de un atributo como la fecha y hora actual. |
- $addToSet: Añade un valor a un atributo de tipo conjunto (array), sólo si el valor no existe en el conjunto. |
- $pop: Elimina el primer o último elemento de un atributo de tipo conjunto (array). |
- $pull: Elimina un valor específico de un atributo de tipo conjunto (array). |
- $push: Añade un valor a un atributo de tipo conjunto (array). |
- $pullAll: Elimina varios valores específicos de un atributo de tipo conjunto (array).

```javascript
db.zips.updateMany(
  //query has two conditions, population $gt is greater than
  { city: 'CLEVELAND', pop: { $gt: 50000 } },
  {
    $inc: {
      pop: 20,
    },
    $set: {
      //add new attribute
      my_description: 'This state is bigger',
    },
  }
);
```

### Array Update Operators

Por si necesitamos insertar multiples valores adentro de un arreglo, lo podemos hacer de la siguiente manera:

```javascript
db.products.updateOne(
  { _id: 4 },
  {
    $push: { tags: 'uno' },
  }
);

db.products.updateOne(
  { _id: 4 },
  {
    $push: {
      tags: {
        $each: ['headphone', 'wireless'],
      },
    },
  }
);

// Elimina todos los valores book de los array en donde se encuentre
db.products.updateMany(
  {},
  {
    $pull: {
      tags: 'book',
    },
  }
);

db.products.updateMany(
  {},
  {
    //delete this elements in a array
    $pullAll: {
      tags: ['notebook', 'pencil'],
    },
  }
);

db.products.updateMany(
  {},
  {
    //delete this elements in a array
    $pull: {
      tags: {
        $in: ['notebook', 'pencil'],
      },
    },
  }
);

db.products.find();
```

- $push -> Sin el modificador $position, el agrega los elementos al final de la matriz
- $pull -> Eliminar valor del array
- $each -> Agrega múltiples valores al campo de la matriz.
- $slice -> Limita el número de elementos de la matriz. Requiere el uso del modificador $each.
- $sort -> Ordena los elementos de la matriz. Requiere el uso del modificador $each.
- $position -> Especifica la ubicación en la matriz en la que insertar los nuevos elementos.

### Update or insert

```javascript
//Use Upsert para crear o actualizar un registro.
db.iot.updateOne(
  {
    sensor: 'A001',
    date: '2022-01-04',
  },
  {
    $push: {
      readings: 12434,
    },
  },
  {
    upsert: true,
    // El operador $push agrega un valor al array readings en el documento existente que coincide con los criterios de búsqueda sensor: "A001" y date: "2022-01-04". Si no existe un documento que cumpla con esos criterios, se crea uno nuevo debido al uso de upsert: true.
  }
);

// Elimina el ultimo elemento del array
db.iot.updateOne(
  {
    sensor: 'A001',
    date: '2022-01-03',
  },
  {
    $pop: {
      readings: 1,
    },
  }
);
```

### Elimando documentos

```javascript
// eliminar solo uno
db.products.deleteOne({ _id: 1 });

// eliminar todos los que coincidan con la consulta
db.products.deleteMany({
  price: 100,
});

// eliminar todos los elementos de un documento
db.products.drop();

// .drop también elimina la colección
// si quisiéramos sólo eliminar los documentos y dejar la colección vacía, debemos ejecutar
db.products.deleteMany({});
```

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
