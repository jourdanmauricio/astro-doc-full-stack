---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 4. SQL Fundamentals
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase4/back.webp',
    alt: 'A picture of a coder',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m3/clase4/icon.webp',
    alt: 'Logo express',
  }
description: SQL Fundamentals
draft: false
category: SQL Base de datos
---

## Bases de datos relacionales

### Relacional

Hasta ahora sabemos que las bases de datos son **sistemas** que nos permiten gestionar la información de una aplicación de manera ordenada para manipular y registrar datos.

Hemos trabajado hasta el día de hoy con **bases de datos no relacionales** (MongoDB), las cuales organizan la información en forma de **colecciones** y **documentos** (objetos) que pueden ser referenciados entre ellos mismos y poseen una estructura bastante flexible.

Por otro lado, las **bases de datos relaciones** cumplen la misma función que las no relacionales, pero su principal diferencia es que la información se almacena en estructuras tabulares **(tablas)** compuestas por filas y columnas, en lugar de colecciones y documentos.

Consideremos dos escenarios concretos para ilustrar mejor esta diferencia.

El primero de ellos, será un **sistema de gestión** de pedidos en un comercio electrónico. En este tendremos tablas que representan usuarios, productos y pedidos.

Podemos considerar que la tabla **Usuarios** guardará el mismo tipo de información para cada registro: nombre, email y contraseña.

<mark>Tabla Usuarios</mark>

| Nombre | Email          | Contraseña |
| ------ | -------------- | ---------- |
| Gamma  | gamma@mail.com | 1234$%56   |
| Alejo  | alejo@mail.com | 985$%12    |

En la tabla Productos, cada uno de estos tendrá un nombre y un código de identificación.

<mark>Tabla Productos</mark>

| Código | Nombre      |
| ------ | ----------- |
| 123    | Computadora |
| 124    | Monitor 8k  |
| 125    | Parlantes   |

Finalmente, la tabla Pedidos va a contener el nombre del usuario, los productos adquiridos y la fecha de compra.

<mark>Tabla Pedidos</mark>

| Usuarios | Productos   | Fechas     |
| -------- | ----------- | ---------- |
| Gamma    | Computadora | 2024-01-02 |
| Alejo    | Monitor 8k  | 2023-10-21 |

![Relaciones.](/astro-doc-full-stack/images/m3/clase4/Relaciones.webp)

<mark>Nuestro segundo escenario, será una plataforma de redes sociales en la que cada usuario tiene su propio perfil.</mark>

Como podemos ver, las tablas en una **base de datos relacional** mantienen una estructura estática para la información que guardan en ellas.

Cada usuario tiene las mismas características, así como los productos y pedidos.

```json
"nombre_usuario": "pepe_messi123",
"biografia": "I'm a software engineer from Colombia...",
"publicaciones": [],
"seguidores": 15,
"seguiudos": 452
```

Los perfiles basados en una **base de datos no relacional**, no tienen esta condición.

Por su parte, poseen un esquema flexible y pueden contener diferentes datos según las necesidades del proyecto.

```json
"nombre_usuario": "max234_cfr",
"biografia": "Entrepreneur | Achitect",
"publicaciones": [
  {"id": 1, "post": "Greetings from USA!"},
  {"id": 2, "post": "Paris tonight"},
],
"seguidores": 15345,
"seguidos": 23452,
"fotos": ["foto1.jpg", "foto2.jpg", "foto3.jpg",],
"videos": ["video1.jpg"],
"etiquestas": ["food", "vacations", "travel"],
```

En el modelo relacional, una <mark>**entidad**</mark> se representa como una tabla que encapsula las características de un objeto, como el usuario del ejemplo anterior.

<mark>Tabla Usuarios</mark>

| id  | Nombre | Email          | Contraseña |
| --- | ------ | -------------- | ---------- |
| 1   | Gamma  | gamma@mail.com | 1234$%56   |
| 2   | Alejo  | alejo@mail.com | 985$%12    |

- Entidad: Usuarios
- Cantidad de registros: 2
- Propiedades: id, Nombre, Email, Contraseña

Cada **columna** de la tabla representa los atributos o propiedades de esa entidad (por ejemplo, un identificador, nombre del usuario, email y teléfono) y las **filas** contienen los registros o instancias particulares de esa entidad (cada usuario individual).

<mark>Cabe resaltar que una entidad puede ser cualquier concepto del mundo real, en el que necesites almacenar y gestionar datos.</mark>

Para mantener esta integridad se especifica la cardinalidad entre tablas relacionadas. La cardinalidad nos indica cuántos registros de una tabla están asociados con cuántos de otra. Por ejemplo, si tenemos dos entidades, Estudiantes y Cursos, estas podrían tener registros relacionados entre sí:

![Relaciones.](/astro-doc-full-stack/images/m3/clase4/Relaciones2.webp)

<mark>Existen tres tipos posibles de cardinalidad dentro del modelo relacional...</mark>

- **UNO A UNO (1:1)** -> Cada fila en una tabla está relacionada a lo sumo con una fila en la otra tabla, y viceversa.

En este caso, podemos definir, por ejemplo, que una entidad Persona se relacione con una entidad Area (nos referimos al "área" de una empresa), bajo la relación “dirigir”.

En palabras simples, diremos que “una persona dirige una sola área y, a su vez, un área es dirigido por una sola persona”.

- **UNO A MUCHOS (1:N)** -> Cada fila en la tabla "A" puede estar relacionada con varias filas en la tabla "B", pero cada fila en la tabla "B" solo puede estar relacionada con una fila en la tabla "A".

Continuando con las entidades del ejemplo anterior, diremos que, bajo la relación “trabajar”, podemos considerar que “muchas personas trabajan en una sola área y, de la misma manera, en una sola área trabajan muchas personas”.

- **UNO A UNO (N:M)** -> Varias filas en una tabla pueden estar relacionadas con varias filas en la otra tabla.

Para este caso y considerando dos entidades, Actor y Película, bajo la relación “actuar”, es pertinente decir que “cada actor puede actuar en muchas películas y, de forma análoga, en cada película actúan muchos actores”.

## ¿Qué es SQL?

<mark>**SQL** (Structured Query Language) es un lenguaje estandarizado que permite realizar queries de información a una base de datos relacional. Estas queries pueden ser consultas, actualizaciones, inserciones o eliminación de datos. Es un lenguaje declarativo, es decir, el usuario indica qué operación y qué resultado desea obtener y el sistema de gestión se encarga del procesamiento de la solicitud.</mark>

### Características de SQL

- **Lenguaje universal** -> SQL esta presente en gran cantidad de disciplinas, así como su compatibilidad con la mayoría de los lengiajes de programación
- **Open source** -> Dado que es un lenguaje de código abierto, posee una gran comuniad de desarrollo y recusos para responder a tus inquietudes
- **Capacidad de imformación** -> Millones de registros en BD relacionales pueden ser gestionados a través de SQL son problemas
- **Incemento en la demanda** -> La demanda de desarrolladores con conocimientos en SQL ha aumentado año tras año, tanto para pequeños negocios hasta para grandes asociaciones, bancos y hospitales

Imagina que tienes una lista de mil usuarios y quieres felicitar a quienes cumplen años el día de hoy.

No harás el proceso manualmente, ya que te llevaría mucho tiempo. Lo que harás es, mediante <mark>**comandos SQL**</mark>, señalar cuáles son las condiciones y la acción (en este caso, felicitara quienes cumplen años hoy).

Ahora que entendemos la diferencia entre ambos paradigmas vamos a enfocarnos en trabajar con una base de datos relacional mediante **SQL**. Las bases de datos relacionales más utilizadas son estas...

1. PostgreSQL ----> esta es la que utilizaremos.
2. MySQL
3. MariaDB
4. SQlite

## PostgreSQL

**PostgreSQL** es una base de datos de código abierto y de alto rendimiento. Es hasta la fecha el sistema de gestión más utilizado en la industria. Podemos mencionar que cuenta con soporte completo para las consultas **SQL** e incorpora una amplia gama de tipos de datos propios y personalizados que facilitan la gestión de la información.

Ahora que tienes tu **terminal shell** abierta (recuerda ingresar tus credenciales), te invitamos a crear una base de datos con el nombre empleados.

```bash
CREATE DATABASE <nombre de la base de datos>;
```

<mark>📢 Importante: Todos los comandos que escribas dentro de esta terminal deben terminar en punto y coma (;) para que sean ejecutados correctamente.</mark>

Para poder visualizar nuestras bases de datos dentro de PostgreSQL debemos ejecutar el comando **\l** en la línea de comandos. Nos encontraremos un listado incluyendo la que acabamos de crear.

Para conectarnos a empleados y trabajar sobre ella debemos utilizar el comando **\c** especificando el nombre de la BD. Si la conexión se realiza con éxito verás el mensaje de la imagen.

```bash
postgres=# \c empleados;
# Ahora estamos conectados a la base de datos empleados con el usuario postgres
empleados=#
```

Es hora de empezar a llenar de información esta base de datos.
**Veamos cómo construir las distintas tablas que la componen.**

## Creación de tablas y constraints

### Constraints

Son restricciones o reglas que se aplican a una o más columnas dentro de la tabla para garantizar la integridad de los datos. Se agregan a cada propiedad.

- **Primary Key** -> Asigna los valores de una columna como clave primaria. Estos datos deben ser únicos en la tabla y no pueden ser nulos
- **Foreing key** -> Establece la relación entre dos tablas garantizando que los valores de referencia sean válidos y tengan coincidencias
- **Unique** -> Garantiza que los valores dentro de la columna sean únicos
- **Not Null** -> Restringe el registro de instancias en las que esta propiedad tengan un valor nulo
  **Check** -> Verifica una condición booleana que debe cumplirse antes de almacenar datos en la columna

### Create Table

El primer paso será crear las tablas correspondientes a las entidades que queremos definir dentro de nuestra base de datos. Para ello trabajaremos sobre el siguiente modelo entidad relación que representa la base de datos de los empleados de una empresa.

![Relaciones.](/astro-doc-full-stack/images/m3/clase4/Relaciones3.webp)

Ya que estamos conectados a nuestra base de datos estamos listos para crear nuestras tablas. Utiliza el comando de la imagen, en el que las propiedades indican las características que tendrá cada columna de la tabla.

```bash
CREATE TABLE <nombre de la tabla>(propiedades);
```

> Antes de ejecutar el comando anterior, conozcamos de qué manera podemos definir estas **propiedades**.

### Constraints y tipos de datos

Las propiedades (columnas) de cada entidad deben tener asociado un **tipo de dato** que nos permite asegurar que la información de todas las instancias o registros de dicha tabla sea estandarizada, limitando la información que puede ser almacenada en ella. Algunos ejemplos de estos tipos de datos son:

- **Character varying - varchar(n)** -> Para strings que contengan entre 1 y n caracteres.
- **Integer - int** -> Integers de 4 bytes, es decir, un número tan grande como 2 a la potencia 32.
- **Date** -> Fechas de calendario con estructura año, mes, dia.

> Data Types -> En la documentación oficial podrás encontrar todos los tipos de datos posibles. https://www.postgresql.org/docs/current/datatype.html

- No vamos a utilizar PG-ADMIN porque pesa demasiado, utilizamos **SQL Shell**, que es un programa que viene instalado con postgres

- Cuando iniciamos SQL Shell nos solicitará:

  - Server [localhost]:
  - Database [postgres]:
  - Port [5432]:
  - Username [postgres]:
  - Contraseña para usuario postgres:

- Una vez que iniciemos sesión nos encontraremos con la consola lista para recibir comandos:

```bash
# muestra el listado de bases de datos
\l

# Eliminar base de datos
DROP DATABASE demo_sql;

# Crear base de datos
CREATE DATABASE demo_sql;

# Cambiar a la base de datos demo_sql
\c demo_sql;

# Crear tabla películas
CREATE TABLE peliculas (
  id SERIAL PRIMARY KEY,
  title varchar(255),
  year INTEGER,
  duration INTEGER
);

# Listar las tablas dentro de la base de datos
\dt;

# Crear tabla directores
CREATE TABLE derectores (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  since DATE,
  nationality varchar(100)
);
```

> El tipo de datos varchar adminte hasta 255 caracteres

## Estructura de una query

### Interacción con las tablas

Cuando hablamos de trabajar con tablas nos referimos a trabajar con información; añadirla, modificarla, eliminarla, etc. Para lograr este tipo de interacciones utilizaremos las **querys** que nos permite crear SQL.

```bash
# Insertamos una película
INSERT INTO peliculas (title, year, duration)
VALUES ('Titanic', 1997, 195);

# Seleccionamos todos los registros y campos de la tabla películas
SELECT * FROM peliculas;

# Seleccionamos el id y el título de todos los registros de la tabla películas
SELECT id, title FROM peliculas;

# Insertamos más registros
INSERT INTO peliculas (title, year, duration)
VALUES
  ('Inception', 2010, 148),
  ('The dark Knight', 2008, 162),
  ('The Shawshank Redemption', 1994, 142),
  ('Forrest Gump', 1994, 142),
  ('the Matrix', 1999, 136),
  ('Interstellar', 2014, 169),
  ('Pulp Fiction', 19940, 154),
  ('The Godfather', 1972, 175),
  ('The Lorf of the rings', 2001, 178);

# Seleccionamos las peliculas del año 1994
SELECT * FROM peliculas WHERE year = 1994;

# Seleccionamos las peliculas ordenadas por duracion
SELECT * FROM peliculas ORDER BY duration;

# Combinamos las sentencias
SELECT * FROM peliculas WHERE year = 1994 ORDER BY duration;

# Moficamos el año de la película matrix
UPDATE peliculas SET year = 1994 where id = 6;

# Eliminamos un pelicula
DELETE FROM peliculas WHERE id = 3;
```

## Relaciones en SQL

- Las relaciones son parte fundamental del manejo de una base de datos relacional

- Es imprescindible planificarlas desde antes de crear las tablas que contendrán información

- Estas relaciones tendrán una representación de la cardinalidad entre tablas y la forma en que se conectan

### ONE TO MANY

- Es importan definir dentro de la tabla base la columna que almacena la FOREIGN KEY (clave foránea) así como la tabla a la que hace referencia

- Dicha clave foranea debe coincidir con algún registro dentro de la tabla referida

### ONE TO ONE

- Esta relación se genera cuando los valores de referencia de la tabla base únicamente pueden estar asociados a un valor de la tabla a la que refieren

- Es necesario que la columna donde se almacena la clave foránea sea marcada con el constraint UNIQUE

### MANY TO MANY

- Las relaciones de muchos elementos de una tabla A a una tabla B funcionan diferente

- Es necesario crear una tabla intermedia que se encargará de almacenar las relaciones entre tablas asegurándose de mantener la integridad de los datos

- Cada relación será identificada por una clave primaria que será una combinación de las claves primarias referidas lo que permite que cada relación sea única

### Middlewares con express y ts

Como mencionamos anteriormente, es imprescindible planificar de antemano las relaciones que habrá entre nuestras tablas. Estas relaciones tendrán una **representación de la cardinalidad**. Tomemos nuestro diagrama, por ejemplo, junto a la tabla **EMPLEADOS** como base.

Al crear esta tabla, tendremos que indicar las relaciones con el resto de las entidades. Debemos considerar que la tabla **departamentos** es la única que se relaciona con la tabla **localidades**, así que es necesario observar de qué manera lo hacen a partir de la cardinalidad vista al inicio de clase.

### Join

Cuando realizamos solicitudes lo más común es que esa solicitud dependa de la información de dos o más tablas en función de la relación entre ellas. Para poder crear estas querys, **SQL** nos permite utilizar la cláusula llamada **JOIN** para unir la información entre tablas.

Por ejemplo, si al realizar una solicitud en vez de visualizar las claves foráneas de cada tabla deseamos **conocer el valor** que representa, debemos definir el punto de unión entre ambas tablas.

```bash
# Insertamos directores
INSERT INTO directores (name, since, nationality)
VALUES ('Christopher Nolan', '2001-01-01', 'British');
VALUES ('Krank Dazabont', '1990-01-01', 'American');
VALUES ('Robert Zemeckis', '1980-01-01', 'American');
VALUES ('Lana Wachowski', '1990-01-01', 'American');
VALUES ('Quentin Tarantino', '1990-01-01', 'American');
VALUES ('Francis Ford Coppola', '1960-01-01', 'American');
VALUES ('Peter Jackson', '1980-01-01', 'New Zealand');

SELECT * FROM directores;

ALTER TABLE peliculas
ADD COLUMN director_id INTEGER;

ALTER TABLE peliculas
ADD CONSTRAINT fk_director
FOREING KEY (director_id)
REFERENCES directores(id);

UPDATE peliculas SET director_id = 8 WHERE id = 20;
UPDATE peliculas SET director_id = 8 WHERE id = 21;
UPDATE peliculas SET director_id = 7 WHERE id = 19;

SELECT p.title AS pelicula, d.name AS director FROM peliculas
FROM peliculas p
JOIN directores p ON p.director_id = d.id;

CREATE TABLE generos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

INSERT INTO generos (nombre) VALUES
('Acción'),
('Comendia'),
('Drama'),
('Ciencia ficción'),
('Fantasía'),
('Thriller'),
('Romance'),
('Animación'),
('Aventura'),
('Documental');

# La relación entre peliculas y generos es N:M
# Creamos la tabla pivot pelicula_genero
CREATE TABLE pelicula_genero (
  pelicula_id INTEGER REFERENCES peliculas(id),
  genero_id INTEGER REFERENCES generos(id),
  PRIMARY KEY (pelicula_id, genero_id)
);

INSERT INTO pelicula_genero (pelicula_id, genero_id)
VALUES
  (17, 3),
  (17, 4),
  (17, 5),
  (20,1),
  (20,5),
  (20,9),
  (21,1),
  (21,5),
  (21,9);

SELECT * FROM pelicula_genero;

SELECT p.*, d.name as director, COALESCE(STRING_AGG(g.nombre SPARATOR ', '), 'Sin género') AS generos
FROM peliculas g,
LEFT JOIN directores d ON p.director_id = d.id
LEFT JOIN pelicula_genero pg ON p.id = pg.pelicula_id
LEFT JOIN generos g ON pg.generos_id = g.id
GROUP BY p.id;
```

![Joins sql.](/astro-doc-full-stack/images/m3/clase4/sql-joins.webp)

- **LEFT JOIN**: Devuelve todas las filas de la tabla de la derecha (B) y las filas correspondientes de la tabla izquierda (A) cuando hay coindicidencia. Si no hay coincidencia, devuelve **NULL** para las columnas de la tabla derecha

- **RIGHT JOIN**: Devuelve todas las filas de la tabla de la izquierda (A) y las filas correspondientes de la tabla de la derecha (B) cuando hay coindicidencia. Si no hay coincidencia, devuelve **NULL** para las columnas de la tabla izquierda

- **FULL PUTER JOIN**: Devuelve todas las filas cuando hay una coincidencia en una de las tablas. Si no hay coincidencia, devuelve NULL para las columnas de la tabla sin coincidencia

- **INNER JOIN**: Devuelve filas cuando hay una coincidencia en las tablas de ambos lados de la cláusula **JOIN**. Es decir, solo devuelve filas donde las columnas que participen en la condición de unión tienen valores que se encuentran en ambas tablas

## Filtrado y ordenamiento de datos

### Operadores de comparación

**SQL** integra también herramientas para filtrar y comparar datos de nuestras consultas a partir de operadores. Estos pueden ser utilizados para buscar registros con características muy particulares respecto a sus valores.

Para crear las querys que nos permiten realizar estas solicitudes tenemos mútiples herramientas que nos ayudan a definir condiciones de filtro u ordenamiento. Una de ellas son los **operadores de comparación**. Estos operadores nos permiten utilizar cláusulas como **WHERE** o **JOIN** para comparar dos valores y devolver un resultado booleano que nos permitirá filtrar la información.

Algunos de estos operadores son....

- Igual a (=)
- Diferente de (!=)
- Mayor que (>)
- Menor que (<)
- Mayor o igual que (>=)
- Menor o igual que (<=)

```bash
# Veamos cómo crear una query que nos permita traer todos aquellos empleados que tengan un sueldo mayor a 250k.
# Este es un caso muy simple en el cual utilizamos un operador de comparación para realizar una consulta de información
SELECT * FROM empleados WHERE sueldo > 250000.00;

# Ahora, vamos a hacer un aumento de sueldo del 10% a los empleados que ganen menos de 250k. En este caso, el operador está siendo utilizado para definir en qué registros dentro de la tabla EMPLEADOS deben ser actualizados.

UPDATE empleados SET sueldo = sueldo * 1.1 WHERE sueldo < 250000;
```

### Operadores lógicos

Estos operadores permiten combinar/modificar condiciones en las querys con cláusulas como **WHERE**, y sirven para realizar comparaciones lógicas entre expresiones.

- **AND**: deben cuamplirsee ambas condiciones
- **OR**: debe cumplirse al menos una condición
- **NOT**: invierte el valor de una condición

Un ejemplo básico es utilizar estos operadores para **unir dos condiciones** de filtrado generadas por un operador de comparación. Por ejemplo, tratamos de filtrar a los empleados que coincidan con dos nombres específicos...

```bash
SELECT * FROM empleados WHERE nombre = 'Bartolomiau' OR nombre = 'Milaneso';
```

Otro ejemplo podría ser que queramos actualizar el sueldo de los empleados exceptuando a uno en específico. Ambos operadores pueden ser utilizados de formas **combinadas** para lograr diferentes resultados...

```bash
UPDATE empleados SET sueldo = sueldo + 50000.00 WHERE NOT nombre = 'Tota';
```

Finalmente, abordaremos un último tema que nos permitirá ejecutar consultas aún más complejas con operaciones que combinan la información de las tablas relacionadas.

## Cierre

Hemos visto los fundamentos de las relaciones en una base de datos y de **SQL**, así como sus principales características y uso. Comparamos el paradigma **SQL** vs **NoSQL** para resaltar las razones por las cuales es importante conocer y trabajar también con bases de datos relacionales.

También exploramos cómo organizar, manipular y consultar datos utilizando **PostgreSQL** como base de datos. Diseñamos esquemas, creamos tablas que representan entidades y se relacionan unas con otras, conocimos las distintas **cardinalidades** entre dichas relaciones y a ejecutar consultas complejas utilizando distintas cláusulas, así como operadores lógicos y de comparación.

Por último, tuvimos un vistazo general de los **joins** que permiten crear queries más complejas y obtener información explícita entre las tablas que se relacionan.

![Conceptos.](/astro-doc-full-stack/images/m3/clase4/Conceptos.webp)

## Homework

<details>
<summary>Ver</summary>

**ACTIVIDAD 01**

En esta actividad continuaremos con la creación de nuestro servidor, avanzando con la implementación de los controladores y servicios.

Implementar las interfaces de las entidades con las que estaremos trabajando.

- User

  - **id**: ID numérico que identifica al usuario.
  - **name**: nombre completo del usuario.
  - **email**: dirección de email del usuario.
  - **birthdate**: fecha de nacimiento.
  - **nDni**: número de DNI o identificación.
  - **credentialsId**: ID de las credenciales, referencia al par de credenciales que posee el usuario.

- Appointment:

  - **id**: ID numérico que identifica al turno.
  - **date**: fecha para la cual fue reservado el turno.
  - **time**: hora para la cual fue reservado el turno.
  - **userId**: ID del usuario que agendó el turno, referencia al usuario
  - **status**: status actual del turno, que puede ser “active” o “cancelled”.

- Credential:
  - **id**: ID numérico que identifica al par de credenciales.
  - **username**:username del usuario que posee las credenciales.
  - **password**: password del usuario que posee las credenciales.

**ACTIVIDAD 02**

Ahora trabajaremos sobre las funciones de servicio. Recuerda en cada servicio crear, por el momento, un arreglo de elementos que se ajusten a las interfaces creadas que te servirán como “precarga” de datos.

En el servicio de credenciales:

- Implementar una función que reciba username y password y cree un nuevo par de credenciales con estos datos. Debe retornar el ID del par de credenciales creado.

- Implementar una función que recibirá username y password, y deberá chequear si el nombre de usuario existe entre los datos disponibles y, si es así, si el password es correcto. En caso de que la validación sea exitosa, deberá retornar el ID de las credenciales.

En el servicio de usuarios:

- Implementar una función que pueda retornar el arreglo completo de usuarios.

- Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.

- Implementar una función que pueda crear un nuevo usuario dentro del arreglo PERO ten en cuenta que al momento de crear el usuario, debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales. Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.

En el servicio de turnos:

- Implementar una función que pueda retornar el arreglo completo de turnos.

- Implementar una función que pueda obtener el detalle de un turno por ID.

- Implementar una función que pueda crear un nuevo turno, siempre guardando, además, el ID del usuario que ha creado dicho turno. NO PUEDE HABER UN TURNO SIN ID DE USUARIO.

- Implementar una función que reciba el id de un turno específico y una vez identificado el turno correspondiente, cambiar su estado a “cancelled”.

**ACTIVIDAD 03**

El siguiente paso será implementar tus controladores ahora en su versión completa, utilizando cada uno de ellos las funciones de servicio que creas convenientes para cada caso. Quizás algunas funciones de servicio no sean utilizadas por el momento, pero tendrán su aparición más adelante.

**TIPS**

- En el video de la clase tienes toda la información y pasos para poder realizar la actividad. Revisa la clase cuantas veces sea necesario, toma nota, y avanza paso a paso con la actividad.

- Apóyate en el uso de ThunderClient, Insomnia o Postman. Te servirán para probar tu aplicación en tiempo real.

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
