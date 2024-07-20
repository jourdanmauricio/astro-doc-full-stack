---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Mysql
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/database/mysql/back.jpg', 
    alt: Logo Mysql'
  }
icon:
  {
    src: '/astro-doc-full-stack/images/database/mysql/icon.png',
    alt: 'Logo Angular',
  }
description: Introducción a Mysql.
draft: false
category: Bases de datos
---
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

## Mysql en docker 

```bash
docker pull mysql
docker volume create mysql_data
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=tu_contraseña -v mysql_data:/var/lib/mysql -d mysql:latest
docker exec -it mysql-container mysql -uroot -p
tu_contraseña

# Listamos las bases de datos
show databases; 
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)

# Para salir
quit;

docker stop mysql-container
docker rm mysql-container
```

## ¿Qué es una base de datos?

Una **base de datos** es un **grupo de información** que se almacena dentro de un programa de manera estratégica, y con una estructura determinada, que contiene rutinas optimizadas para guardar, eliminar, consultar y gestionar datos masivamente.

Este tipo de herramienta surgió gracias a la necesidad de preservar información contra el tiempo y el deterioro para acudir a ella posteriormente y transformarla en algo más valioso. Por ejemplo:

- Dinero
- Crecimiento
- Sabiduría

Sin embargo, con la creciente ola informática y la gran cantidad de información que manejan los sitios web y aplicaciones en Internet, un archivo corriente o un Excel no es una base de datos que funcione para desarrollo web backend. Para esto, necesitarás motores como PostgreSQL y MongoDB que se pueden clasificar dentro de 2 categorías.

**Tipos de bases de datos**

Básicamente, las bases de datos se pueden clasificar dentro de 2 posibles motores que son: no relaciones y relacionales. A continuación conocerás sus diferencias.

1. Bases de datos relacionales
Las bases de datos relacionales son elementos de información que comparten relaciones predefinidas y emplean el álgebra relacional para almacenar información y crear estructuras. Se pueden ordenar en conjuntos de filas o columnas y algunos ejemplos son:

- MariaDB
- SQL Server
- Oracle

2. Bases de datos no relacionales
En cambio, las bases de datos no relacionales son grupos de datos que no estructurados, es decir, no se pueden ordenar por columnas o tablas, y tienen un tiempo de respuesta más bajo cuando se comparan con las relacionales. Tampoco tienen restricciones y su diseño se basa en la nube.

Puedes utilizar Java Scrip Objet Notation para modificar su información.

- MongoDB
- elasticsearch
- Cassandra,
- neo4j

**Cómo funciona una base de datos**

El manejo de las bases de datos funciona por medio de sistemas de gestión conocidos como Sistemas de Gestión de Base de Datos, o Database Management Systems.

Estos programas están conformados por modelos o tablas y cada uno cuenta con un N de atributos de diferentes tipos de datos que se guardan como registros. Para darte un ejemplo de cómo funcionan, piensa en el registro de la tabla de usuarios de una base de datos:

- Contiene información del nombre y apellido de una persona
- Abarca más variables dependiendo de nuestra lógica de negocio

Con todos estos campos podemos llegar a tener millones de registros, relacionarlos, indexarlos y demás.

En la conformación de una base de datos se pueden seguir diferentes modelos y paradigmas, cada uno dotado de características, ventajas y dificultades. El almacenamiento ordenado y la rápida recuperación de información resume los principios de la informática:

- Estructura organizacional
- Jerarquía
- Capacidad de transmisión o interrelación

Esto se conoce como modelos de base de datos y permiten el diseño e implementación de algoritmos y otros mecanismos lógicos de gestión, según el caso.

## Comando CREATE

Existen 2 **Tipos de Tablas** en MySQL:

- InnoDB: Es una tabla de BD, mas nueva, mas robusta, mas recuperable en caso de que haya alguna falla en el disco duro pero es un poco mas lenta.

- MyISAM: Es una tabla de BD muy directa, muy sencilla, muy rápida y las operaciones y transacciones son completamente uno a uno. La velocidad de lectura y escritura es mayor.

En la vida real usamos las tablas con dos propósitos: 
- Catalogo: crecerá en un orden lento, según las necesidades de la propia BD. (Listado de Usuarios, InnoDB) 
- Operación: se enfocan a lectura, mayor acceso a disco duro. (Prestamos de libros, MyISAM).

**InnoDB** El bloqueo se hace por registro. Cuando se realiza una inserción o actualización del registro de una tabla de este tipo, únicamente se bloquea ese registro y no la tabla, como sucedía en MyISAM. Por lo que otros usuarios podrán hacer uso de manera simultánea de la base de datos. También hace control de transacciones, para entenderlo imaginemos la tabla de clientes de un banco, en el que se transfiere dinero de un cliente a otro, para ello se deben completar dos pasos: 1. La cantidad debe sumarse en la cuenta de destino 2. Restarse en la de origen. En caso de interrupción de la energía del servidor, no podría quedarse a medias el proceso ya que la transacción (los dos pasos) deben cumplirse. Por lo tanto la transacción o se completa o no.

**MyISAM** Es la evolución de ISAM, mejora la velocidad y la optimización del espacio. Además, es el tipo predeterminado de tablas que utiliza MySQL. En el caso de que intentes crear otro tipo específico de tablas (y en caso de que MySQL no pueda crearlas), MySQL creará este tipo de tablas. Otra característica, es que si realizas una inserción o actualización de un registro de la tabla, MySQL bloquea la tabla hasta que se complete la tarea. Por lo que nadie más podrá hacer actualizaciones o inserciones durante ese tiempo.

## Tipos de columnas / Creación de la tabla books

```sql
CREATE DATABASE operation;
-- Query OK, 1 row affected (0.01 sec) 

CREATE DATABASE IF NOT EXISTS operation;
-- Query OK, 1 row affected, 1 warning (0.00 sec)

/* 
Como vemos nos arroja un warning
porque la Base de datos ya existe
*/

CREATE DATABASE operation;
-- ERROR 1007 (HY000): Can't create database 'operation'; database exists

/* Si no colocamos el IF EXITS 
obtenemos un error */

use operation;
-- Database changed

SELECT DATABASE();
+------------+
| DATABASE() |
+------------+
| operation  |
+------------+
-- 1 row in set (0.00 sec)
```

> **Tip**: Por convención las tablas se deben llamar en el plural del sustantivo. Si guardas libros pues la tabla deberá llamarse LIBROS. Y de preferencia en ingles (books). 

> **Tip**: No se gurdan archivos binarios en la base de datos relacional, nunca guardar una imagen, pero si una referencia. 

> **Tip**: En todaas las tablas definiremos un ID. para ubicar a cada tupla de manera única, puede ser un entero autoincremental.

```sql
CREATE TABLE IF NOT EXISTS books(
  book_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  author INTEGER UNSIGNED,
  title VARCHAR(100) NOT NULL,
  year INT UNSIGNED NOT NULL DEFAULT 1900,
  language VARCHAR(2) NOT NULL DEFAULT 'es' COMMENT 'ISO 639-1 Lenguage',
  cover_url VARCHAR(500),
  price DOUBLE(6,2) NOT NULL DEFAULT 10.0,
  sellable TINYINT(1) DEFAULT 1,
  copies INT NOT NULL DEFAULT 1,
  description TEXT
);
-- Query OK, 0 rows affected, 2 warnings (0.04 sec)

SHOW warnings;
+---------+------+------------------------------------------------------------------------------------------------------------------+
| Level   | Code | Message                                                                                                          |
+---------+------+------------------------------------------------------------------------------------------------------------------+
| Warning | 1681 | Specifying number of digits for floating point data types is deprecated and will be removed in a future release. |
| Warning | 1681 | Integer display width is deprecated and will be removed in a future release.                                     |
+---------+------+------------------------------------------------------------------------------------------------------------------+
-- 2 rows in set (0.00 sec)

/* Para que no aparezcan los warnings */
DROP TABLE books;

CREATE TABLE IF NOT EXISTS books (
  book_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  author_id INT UNSIGNED,
  title VARCHAR(100) NOT NULL,
  `year` INT UNSIGNED NOT NULL DEFAULT 1900,
  language VARCHAR(2) NOT NULL DEFAULT 'es' COMMENT 'ISO 639-1 Language',
  cover_url VARCHAR(500),
  price DOUBLE NOT NULL DEFAULT 10.0,
  sellable TINYINT DEFAULT 1,
  copies INT NOT NULL DEFAULT 1,
  description TEXT
);
-- Query OK, 0 rows affected (0.03 sec)

SHOW TABLES;
+---------------------+
| Tables_in_operation |
+---------------------+
| books               |
+---------------------+
-- 1 row in set (0.00 sec)
```

- El error vs Warnings: la diferencia entre estos dos es que el error rompe cualquier flujo de trabajo que tengamos en nuestra aplicación mientras que el warnnigs nos muestra una advertencia que no rompe el flujo de trabajo workflow.
- DROP TABLE table_name; borra la estructura de la tabla de bases de datos y su contenido
- Cuando queremos usar una palabra reservada del lenguaje como nombre de alguna columna lo colocamos encerrado entre comillas de acento ejemplo: year. En este caso no arroja error porque la palabra se encuentra en una posición dentro del query donde solo puede ser un nombre de campo.

Existen distintos tipos de enteros, int, tinyint, bigint. Double es para decimales, float solo almacena hasta 6 y es para calculos precisos.

- INTEGER: Es un entero,Ocupa 4 bytes.
- AUTO_INCREMENT: Hace enteros que se auto incrementan, se meten a una dupla y detecta el numero para hacerlo crecer automáticamente. *Al borrar un dato de MYSQL no lo nota y sigue aumentando números, EJEMPLO 1 2 4, si se elimina el 3 no le importa y sigue contando.
- UNSIGNED: entero solo positivo
- TINYINT: Ocupa 1 byte. True o False
- SMALLINT: Ocupa 2 byes.
- Varchar: Tu le tienes que indicar el numero de caracteres a almacenar de texto.EJEMPLO VARCHAR(2) SI.
- NOTNULL: Es decirle a MYSQL que no almacene algo ,algo nulo es que no existe información, en otras palabras es nada.
- DEFAULT: Es que no le mando información por defecto debe poner el valor que se agrega después del mismo.
- COMMENT: Comentario a la columna, que solo se ve al revisar el código.
- DOUBLE: Almacena los números enteros y los decimales. *DOUBLE (6,2) esto hace que de los 6 números que le estamos diciendo 2 de ellos los use solo para decimales.
- FLOAT: Es un numero que esta almacenando hasta 6 decimales, es para cálculos precisos.
- TEXT: Es meter tanto como se pueda. EJEMPLO Descripción de un libro

Hay un error y es que DOUBLE permite una mayor precisión en la cantidad de decimales, que FLOAT

- Float es para presición simple en un rango de 4 bytes
- Double es para un rango de presición de 8 bytes

Además de eso FLOAT permite una presición de 0 a 23 mientras que DOUBLE la maneja de 24 a 53 y según la documentación de MySQL se recomienda usar para los precios el tipo de dato Decimal(m,n) m cantidad de bits en total, n cantidad en decimal.

No se recomienda usar FLOAT o DOUBLE por que no se guardan de una manera tan fiable, y puede que si guardas un 4, te arroje un 3.99999999999

## Tipos de columnas / Creación de la tabla authors

Necesitamos comenzar a relacionar tablas, laas de books con la de atores que crearemos a continuación. Y ver como se van a relacionar **lógicamente**. Es decir, puede haber librosa sin autor y la base dedatos no indicará error. Lo lógico sería relaizar la relación a través del Id.

Mysql permite mayusculas o minisculas en palabras reservadas, nombres de columnas, nomnbres de tablas, etc. Una bunea práctica es colocar todas las palabras reservadas del lenguaje en mayúsculas y el resto en minúsculas. 

```sql
CREATE TABLE IF NOT EXISTS authors (
	author_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT  NULL,
	nationality VARCHAR(3)
);
-- Query OK, 0 rows affected (0.03 sec)

SHOW TABLES;
+---------------------+
| Tables_in_operation |
+---------------------+
| authors             |
| books               |
+---------------------+
-- 2 rows in set (0.00 sec)

DESCRIBE books;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| book_id     | int unsigned | NO   | PRI | NULL    | auto_increment |
| author_id   | int unsigned | YES  |     | NULL    |                |
| title       | varchar(100) | NO   |     | NULL    |                |
| year        | int unsigned | NO   |     | 1900    |                |
| language    | varchar(2)   | NO   |     | es      |                |
| cover_url   | varchar(500) | YES  |     | NULL    |                |
| price       | double       | NO   |     | 10      |                |
| sellable    | tinyint      | YES  |     | 1       |                |
| copies      | int          | NO   |     | 1       |                |
| description | text         | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
-- 10 rows in set (0.00 sec)

DESC authors;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| author_id   | int unsigned | NO   | PRI | NULL    | auto_increment |
| name        | varchar(100) | NO   |     | NULL    |                |
| nationality | varchar(3)   | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
-- 3 rows in set (0.00 sec)

SHOW FULL COLUMNS FROM `books`;
+-------------+--------------+--------------------+------+-----+---------+----------------+---------------------------------+--------------------+
| Field       | Type         | Collation          | Null | Key | Default | Extra          | Privileges                      | Comment            |
+-------------+--------------+--------------------+------+-----+---------+----------------+---------------------------------+--------------------+
| book_id     | int unsigned | NULL               | NO   | PRI | NULL    | auto_increment | select,insert,update,references |                    |
| author_id   | int unsigned | NULL               | YES  |     | NULL    |                | select,insert,update,references |                    |
| title       | varchar(100) | utf8mb4_0900_ai_ci | NO   |     | NULL    |                | select,insert,update,references |                    |
| year        | int unsigned | NULL               | NO   |     | 1900    |                | select,insert,update,references |                    |
| language    | varchar(2)   | utf8mb4_0900_ai_ci | NO   |     | es      |                | select,insert,update,references | ISO 639-1 Language |
| cover_url   | varchar(500) | utf8mb4_0900_ai_ci | YES  |     | NULL    |                | select,insert,update,references |                    |
| price       | double       | NULL               | NO   |     | 10      |                | select,insert,update,references |                    |
| sellable    | tinyint      | NULL               | YES  |     | 1       |                | select,insert,update,references |                    |
| copies      | int          | NULL               | NO   |     | 1       |                | select,insert,update,references |                    |
| description | text         | utf8mb4_0900_ai_ci | YES  |     | NULL    |                | select,insert,update,references |                    |
+-------------+--------------+--------------------+------+-----+---------+----------------+---------------------------------+--------------------+
-- 10 rows in set (0.00 sec)
```

- DESCRIBE table_name; muestra la estructura de nuestra tabla. Nos muestra las columnas: field, type, Null, Key, Default, Extra.
- DESC table_name; es un acrónimo de describe que realiza la misma función de describir la estructura de la tabla.
- SHOW FULL COLUMNS FROM table_name; Esta función describe la estructura de la bases de datos incluyendo más información cómo: field, Type, Collation, Null, Key, Default, Extra, Privileges, comment.

## Tipos de columnas usando / Creación de la tabla clientes

```sql
CREATE TABLE clients (
  client_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  birthdate DATETIME,
  gender ENUM('M', 'F', 'ND') NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
      ON UPDATE CURRENT_TIMESTAMP
);
-- Query OK, 0 rows affected, 1 warning (0.04 sec)

SHOW WARNINGS;
+---------+------+------------------------------------------------------------------------------+
| Level   | Code | Message                                                                      |
+---------+------+------------------------------------------------------------------------------+
| Warning | 1681 | Integer display width is deprecated and will be removed in a future release. |
+---------+------+------------------------------------------------------------------------------+
-- 1 row in set (0.00 sec)
```

- Si no colocamos **AUTO_INCREMENT** a la columna que es **PRIMARY KEY** deberíamos asignarlo de forma manual, se puede asignar desde otra capa de negocios. UNIQUE, la columna que tenga el **constraint unique** garantiza que el valor que se guarda en esa columna sea único.

- **TIMESTAMP** Está basado en el **número epoch** que es el número de segundos que han pasado desde el 1 enero de 1970 hasta la fecha (es donde se determina el inicio de las computadoras). Es un número entero que se guarda en segundos y permite hacer operaciones sobre él. La misma base de datos se encarga de realizar la transformación para presentarlo como fecha 'yyyy-mm-dd hh:mm:ss'.

- **DATETIME** Este tipo de datos puede guardar cualquier valor de tipo fecha sin restricción. Incluso anterior a nuestra era (pueder el año -120). Es por eso que las fechas de nacimiento de usuarios debe utilizar este valor. No podemos garantizar que todos los usuarios nacieron después de 1970. 

**TIMESTAMP vs DATETIME**: hay que resaltar que un, 
  1. TIMESTAMP "NO PUEDE HACER TODO LO DE DATETIME pero DATETIME SÍ PUEDE HACERLO DE UN TIMESTAMP", 
  2. DATETIME no está guardado en segundos y no es tan eficiente para hacer cálculos.

- **ENUM** es una enumeración de datos, indicaremos cuáles son los valores que puede tomar la columna. 

- **Campo Active** Es buena práctica no eliminar registros de una bases de datos, se crea una columna como active que es un valor booleano dicho valor sirve para para decir si el registro está activo o no.

- **TINYINT**: Un entero muy pequeño, es decir, solo acepta números enteros que estén dentro del rango -128 a 127.

- **Campos created_at y updated_at** Es buena práctica tener una columna que permite saber el momento exacto en el que se crea un registro o se actualiza. Este tipo de dato se comporta más como una meta-información y nos puede ayudar por ejemplo a cuántos usuarios fueron creados en una fecha en específico, saber cuando una tupla se actualizó

- **created_at** Es una columna de buena práctica que permite saber cuando se creó un registro. Está utilizará un conjunto de propiedades llamada entre ella se colocará **DEFAULT CURRENT_TIMESTAMP**. Cuando se realiza un insert sí el valor de esta columna viene vacío colocará en la tupla el valor de la fecha en que se creó de manera automática.

- **update_at** Es una columna de buena práctica que permite saber cuando un registro se actualiza se puede colocar **ON UPDATE CURRENT_TIMESTAMP** esto permite dejar un registro de la fecha actual cuando ocurre una actualización.

```sql
CREATE TABLE IF NOT EXISTS operations (
operation_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
book_id INTEGER,
client_id INTEGER,
`type` ENUM('vendido','prestado','devuelto') NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
ON UPDATE CURRENT_TIMESTAMP,
finshed TINYINT(1) NOT NULL
);
```
## Comando INSERT

Es buena práctica tener una buen modelo de bases de datos y un buen modelo de negocio que evite la duplicidad de información ya que esto nos ahorra el tiempo de procesamiento, ahorra en espacio.

Es buena práctica realizar inserciones de 50 registros máximo. Esto no es necesariamente obligatorio pero funciona muy bien y esto se hace porque sí hay algún problema en la inserción sólo se pierde datos de 50 a 50.

```sql
/* Existe varias formas de hacer insert, según las versiones de mysql 
que tengamos instalados estas son algunas de ellas */
INSERT INTO authors (author_id, name, nationality)
    VALUES ( NULL, 'Juan Rulfo', 'MEX');
-- Query OK, 1 row affected (0.00 sec)

INSERT INTO authors (name, nationality)
    VALUES ('Gabriel García Máquez', 'COL');
-- Query OK, 1 row affected (0.00 sec)

INSERT INTO authors 
    VALUES (NULL, 'Juan Gabriel Vasquez', 'COL');

INSERT INTO authors (name, nationality)
    VALUES ('Juan Rulfo', 'MEX');
-- Query OK, 1 row affected (0.00 sec)

/* otra forma */
INSERT INTO  authors (name,nationality) 
    VALUES  
          ('Julio Cortázar', 'COL'),
          ('Isabelle Allende', 'CHI'),
          ('Octavio Paz', 'MEX'),
          ('Juan Carlos Onetti', 'URU');    
-- Query OK, 4 rows affected (0.00 sec)
-- Records: 4  Duplicates: 0  Warnings: 0          

/* o si sabemos que hay un id que no existe podemos insertarlos junto con su id */
INSERT INTO authors (author_id, name, nationality)
    VALUES (16, 'Pablo Neruda', 'MEX');
-- Query OK, 1 row affected (0.00 sec)

SELECT * FROM authors;
+-----------+----------------------+-------------+
| author_id | name                 | nationality |
+-----------+----------------------+-------------+
|         1 | Juan Rulfo           | MEX         |
|         2 | Gabriel Garca Mquez  | COL         |
|         3 | Juan Gabriel Vasquez | COL         |
|         4 | Julio Cortzar        | COL         |
|         5 | Isabelle Allende     | CHI         |
|         6 | Octavio Paz          | MEX         |
|         7 | Juan Carlos Onetti   | URU         |
|        16 | Pablo Neruda         | MEX         |
+-----------+----------------------+-------------+
-- 8 rows in set (0.00 sec)
```

## Comando on duplicate key

**ON DUPLICATE KEY** indica lo que queremos hacer ante un KEY duplicado.

1. ON DUPLICATE KEY IGNORE ALL. Si hay error, ignore y ejecute el comando. **No usar nunca**.

2. ON DUPLICATE KEY UPDATE. Cando encuentre un duplicado, actualiza con el nuevo valor que envió.

```sql
INSERT INTO clients (name, email, birthdate, gender, active)
  VALUES 
('Maria Dolores Gomez', 'Maria Dolores.95983222J@random.names', '1971-06-06', 'F', 1),
('Adrian Fernandez', 'Adrian.55818851J@random.names', '1970-04-09', 'M', 1),
('Maria Luisa Marin', 'Maria Luisa.83726282A@random.names', '1957-07-30', 'F', 1),
('Pedro Sanchez', 'Pedro.78522059J@random.names', '1992-01-31', 'M', 1);
-- Query OK, 4 rows affected (0.01 sec)
-- Records: 4  Duplicates: 0  Warnings: 0

/* CVuando tenemos muchas columnas podemos formatear la salida */
SELECT * FROM clients WHERE client_id = 4\G
*************************** 1. row ***************************
 client_id: 4
      name: Pedro Sanchez
     email: Pedro.78522059J@random.names
 birthdate: 1992-01-31 00:00:00
    gender: M
    active: 1
created_at: 2024-07-20 12:33:54
updated_at: 2024-07-20 12:33:54
-- 1 row in set (0.00 sec)

INSERT INTO clients (name, email, birthdate, gender, active)
  VALUES 
('Pedro Sanchez', 'Pedro.78522059J@random.names', '1992-01-31', 'M', 1);
-- ERROR 1062 (23000): Duplicate entry 'Pedro.78522059J@random.names' for key 'clients.email'

-- NO EJECUTAR
INSERT INTO
  `clients` (name, email, birthdate, gender, active)
VALUES
  ('Pedro Sanchez', 'Pedro.78522059J@random.names', '1992-01-31', 'M', 1)
ON DUPLICATE KEY IGNORE ALL; 
-- NO EJECUTAR

INSERT INTO
  `clients` (name, email, birthdate, gender, active) 
VALUES
  ('Pedro Sanchez', 'Pedro.78522059J@random.names', '1992-01-31', 'M', 0) as newData
ON DUPLICATE KEY UPDATE active = newData.active; 
-- Query OK, 2 rows affected (0.01 sec)

SELECT * FROM clients WHERE client_id = 4 \G
*************************** 1. row ***************************
 client_id: 4
      name: Pedro Sanchez
     email: Pedro.78522059J@random.names
 birthdate: 1992-01-31 00:00:00
    gender: M
    active: 0
created_at: 2024-07-20 12:33:54
updated_at: 2024-07-20 12:46:48
-- 1 row in set (0.00 sec)
```

## Inserción de datos usando queries anidados

Mysql nos permite realizar inserts a partir de selects, pero aumenta la complejidad algoritmica y es mejor hacer hacer estos inserts usando scripts desde otra capa. Por otro lado, corremos el riesgo de introducir información incorrecta. 


```sql 
INSERT INTO books (title, author_id, `year`)
VALUES('Vueltra al laberinto de la soledad',
    (SELECT author_id FROM authors
    WHERE name = 'Octavio Paz'
    LIMIT 1), 1960
);
-- Query OK, 1 row affected (0.01 sec)

SELECT * FROM books;
+---------+-----------+------------------------------------+------+----------+-----------+-------+----------+--------+-------------+
| book_id | author_id | title                              | year | language | cover_url | price | sellable | copies | description |
+---------+-----------+------------------------------------+------+----------+-----------+-------+----------+--------+-------------+
|       1 |         6 | Vueltra al laberinto de la soledad | 1960 | es       | NULL      |    10 |        1 |      1 | NULL        |
+---------+-----------+------------------------------------+------+----------+-----------+-------+----------+--------+-------------+
-- 1 row in set (0.00 sec)
```

## Bash y archivos SQL

```sql
-- all_schema.sql
DROP DATABASE IF EXISTS operation;
 
CREATE DATABASE operation;
USE operation;
 
CREATE TABLE `authors` (
  `author_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `nationality` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`author_id`),
  UNIQUE KEY `uniq_author` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8;
 
CREATE TABLE `books` (
  `book_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `author_id` INT(10) UNSIGNED DEFAULT NULL,
  `title` VARCHAR(100) NOT NULL,
  `year` INT(11) NOT NULL DEFAULT '1900',
  `language` VARCHAR(2) NOT NULL COMMENT 'ISO 639-1 Language code (2 chars)',
  `cover_url` VARCHAR(500) DEFAULT NULL,
  `price` DOUBLE(6,2) DEFAULT NULL,
  `sellable` tinyint(1) NOT NULL DEFAULT '0',
  `copies` INT(11) NOT NULL DEFAULT '1',
  `description` text,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `book_language` (`title`,`language`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8;
 
CREATE TABLE `clients` (
  `client_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `birthdate` DATE DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
 
 
 
CREATE TABLE `transactions` (
  `transaction_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `book_id` INT(10) UNSIGNED NOT NULL,
  `client_id` INT(10) UNSIGNED NOT NULL,
  `type` enum('lend','sell','return') NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `finished` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

```sql
-- all_data.sql
INSERT INTO `authors` VALUES (1,'Sam Altman','USA'),
(2,'Freddy Vega','COL'),
(3,'Arthur Conan Doyle','GBR'),
(4,'Chuck Palahniuk','USA'),
(5,'Juan Rulfo','MEX'),
(6,'Henning Mankel','SWE'),
(7,'Jaideva Goswami','USA'),
(8,'John Foreman','USA'),
(9,'Stephen Hawking','USA'),
(10,'Stephen Dubner','USA'),
(11,'Edward Said','USA'),
(12,'Vladimir Vapnik','RUS'),
(13,'V P Menon','IND'),
(14,'Leonard Mlodinow','USA'),
(15,'Frank Shih','JAP'),
(16,'Maria Konnikova','RUS'),
(17,'Sebastian Gutierrez','ESP'),
(18,'Kurt Vonnegut','USA'),
(19,'Cedric Villani','FRA'),
(20,'Gerald Sussman','USA'),
(21,'Abraham Eraly','IND'),
(22,'Frank Kafka','AUT'),
(23,'John Pratt','USA'),
(24,'Robert Nisbet','USA'),
(25,'H. G. Wells',"ENG"),
(26,'Werner Heisenberg','DEU'),
(27,'Andy Oram',NULL),
(28,'Terence Tao',"AUS"),
(29,'Drew Conway',"USA"),
(30,'Nate Silver',"USA"),
(31,'Wes McKinney',"USA"),
(32,'Thomas Cormen', "USA"),
(33,'Siddhartha Deb',"IND"),
(34,'Albert Camus',"FRA"),
(37,'Adam Smith',"ENG"),
(38,'Ken Follett',"ENG"),
(39,'Fritjof Capra',"AUT"),
(40,'Richard Feynman',"USA"),
(41,'Ernest Hemingway',"USA"),
(42,'Frederick Forsyth',"ENG"),
(43,'Jeffery Archer',"ENG"),
(44,'Randy Pausch',"USA"),
(45,'Ayn Rand',"RUS"),
(46,'Michael Crichton',"USA"),
(47,'John Steinbeck',"USA"),
(48,'Edgar Allen Poe',"USA"),
(51,'Will Durant',NULL),
(52,'P L Deshpande',NULL),
(56,'John Grisham',"USA"),
(57,'V. S. Naipaul',NULL),
(58,'Joseph Heller',NULL),
(59,'BBC',NULL),
(60,'Bob Dylan',"USA"),
(61,'Madan Gupta',"IND"),
(62,'Alfred Stonier',NULL),
(63,'W. H. Greene',NULL),
(64,'Gary Bradsky',NULL),
(65,'Andrew Tanenbaum',NULL),
(66,'David Forsyth',NULL),
(67,'Schilling Taub',NULL),
(68,'Yashwant Kanetkar',NULL),
(69,'Jonathan Stroud',NULL),
(70,'Fyodor Dostoevsky',"RUS"),
(71,'Dan Brown',"USA"),
(72,'Amartya Sen',NULL),
(73,'Amitav Ghosh',NULL),
(75,'Lorraine Hansberry',NULL),
(76,'Bob Woodward',NULL),
(78,'Kuldip Nayar',NULL),
(79,'Sunita Deshpande',NULL),
(80,'William Dalrymple',NULL),
(81,'Various',NULL),
(85,'Sanjay Garg',NULL),
(86,'V P Kale',NULL),
(87,'Shashi Tharoor',"IND"),
(89,'Dominique Lapierre',NULL),
(93,'Bertrand Russell',"ENG"),
(94,'Sam Harris',NULL),
(96,'Earle Stanley Gardner',NULL),
(98,'Peter Drucker',NULL),
(99,'David Bodanis',NULL),
(100,'Victor Hugo',"FRA"),
(103,'Richard Gordon',NULL),
(104,'George Orwell',NULL),
(107,'Lee Iacoca',"USA"),
(108,'William S Maugham',NULL),
(111,'Robert Pirsig',NULL),
(112,'Robert Fisk',NULL),
(114,'Amir Aczel',NULL),
(117,'Samuel Huntington',NULL),
(119,'Richard Bach',NULL),
(120,'Braithwaite',NULL),
(121,'V S Naipaul',NULL),
(122,'Jawaharlal Nehru',NULL),
(128,'Gerald Durrell',NULL),
(133,'Simon Singh',"ENG"),
(134,'Hart Duda',NULL),
(135,'Thomas Friedman',NULL),
(138,'Keith Devlin',NULL),
(140,'James Gleick',NULL),
(141,'Joy Thomas',NULL),
(142,'Muhammad Rashid',NULL),
(143,'Ned Mohan',NULL),
(144,'Simon Haykin',NULL),
(148,'Alex Rutherford',NULL),
(153,'Michael Baz-Zohar',NULL),
(154,'Jim Corbett',NULL),
(155,'Jules Verne',NULL),
(156,'Deshpande P L',NULL),
(160,'Eric Raymond',NULL),
(161,'Sergio Franco',NULL),
(162,'Allen Downey',NULL),
(163,'Morris West',NULL),
(166,'Phillip Janert',NULL),
(167,'Carl Sagan',"USA"),
(168,'E T Bell',NULL),
(169,'Richard Dawkins',NULL),
(170,'Sudhanshu Ranjan',"IND"),
(171,'Kautiyla',NULL),
(172,'Palkhivala',NULL),
(174,'Sorabjee',NULL),
(175,'Hussain Zaidi',NULL),
(176,'Peter Ackroyd',NULL),
(178,'Nariman',NULL),
(179,'Jean Sassoon',NULL),
(180,'Peter Dickinson',NULL),
(182,'Machiavelli',NULL),
(183,'Aldous Huxley',"ENG"),
(184,'J K Rowling',"ENG"),
(185,'Steig Larsson',"SWE"),
(189,'Steve Eddins', NULL),
(192,'Charles Dickens',"ENG");
 
INSERT INTO `books` VALUES (1,1,'The Startup Playbook',2013,'en',NULL,10.00,1,5,'Advice from the experts'),
(2,1,'The Startup Playbook',2014,'es',NULL,10.00,1,5,'Consejo de los expertos, traducido por Platzi'),
(3,3,'Estudio en escarlata',1887,'es',NULL,5.00,1,10,'La primera novela de Sherlock Holmes'),
(4,6,'Wallander: Asesinos sin rostro',1991,'es',NULL,15.00,1,3,''),
(5,6,'Wallander: Los perros de Riga',1992,'es',NULL,15.00,1,3,''),
(6,6,'Wallander: La leona blanca',1993,'es',NULL,15.00,1,3,''),
(7,6,'Wallander: El hombre sonriente',1994,'es',NULL,15.00,1,3,''),
(8,6,'Wallander: La falsa pista',1995,'es',NULL,15.00,1,3,''),
(9,6,'Wallander: La quinta mujer',1996,'es',NULL,15.00,1,3,''),
(10,6,'Wallander: Pisando los talones',1997,'es',NULL,15.00,1,3,''),
(11,6,'Wallander: Cortafuegos',1998,'es',NULL,15.00,1,3,''),
(12,5,'El llano en llamas',1953,'es',NULL,10.00,0,1,'Cuentos mexicanos'),
(13,7,'Fundamentals of Wavelets',1900,'en',NULL,NULL,1,4,NULL),
(14,8,'Data Smart',1900,'en',NULL,NULL,1,4,NULL),
(15,9,'God Created the Integers',1900,'en',NULL,NULL,1,4,NULL),
(16,10,'Superfreakonomics',1900,'en',NULL,NULL,1,4,NULL),
(17,11,'Orientalism',1900,'en',NULL,NULL,1,4,NULL),
(18,12,'The Nature of Statistical Learning Theory',1900,'en',NULL,NULL,1,4,NULL),
(19,13,'Integration of the Indian States',1900,'en',NULL,NULL,1,4,NULL),
(20,14,'The Drunkard\'s Walk',1900,'en',NULL,NULL,1,4,NULL),
(21,15,'Image Processing & Mathematical Morphology',1900,'en',NULL,NULL,1,4,NULL),
(22,16,'How to Think Like Sherlock Holmes',1900,'en',NULL,NULL,1,4,NULL),
(23,17,'Data Scientists at Work',1900,'en',NULL,NULL,1,4,NULL),
(24,18,'Slaughterhouse Five',1900,'en',NULL,NULL,1,4,NULL),
(25,19,'Birth of a Theorem',1900,'en',NULL,NULL,1,4,NULL),
(26,20,'Structure & Interpretation of Computer Programs',1900,'en',NULL,NULL,1,4,NULL),
(27,21,'The Age of Wrath',1900,'en',NULL,NULL,1,4,NULL),
(28,22,'The Trial',1900,'en',NULL,NULL,1,4,NULL),
(29,23,'Statistical Decision Theory',1900,'en',NULL,NULL,1,4,NULL),
(30,24,'Data Mining Handbook',1900,'en',NULL,NULL,1,4,NULL),
(31,25,'The New Machiavelli',1900,'en',NULL,NULL,1,4,NULL),
(32,26,'Physics & Philosophy',1900,'en',NULL,NULL,1,4,NULL),
(33,27,'Making Software',1900,'en',NULL,NULL,1,4,NULL),
(34,28,'Vol I Analysis',1900,'en',NULL,NULL,1,4,NULL),
(35,29,'Machine Learning for Hackers',1900,'en',NULL,NULL,1,4,NULL),
(36,30,'The Signal and the Noise',1900,'en',NULL,NULL,1,4,NULL),
(37,31,'Python for Data Analysis',1900,'en',NULL,NULL,1,4,NULL),
(38,32,'Introduction to Algorithms',1900,'en',NULL,NULL,1,4,NULL),
(39,33,'The Beautiful and the Damned',1900,'en',NULL,NULL,1,4,NULL),
(40,34,'The Outsider',1900,'en',NULL,NULL,1,4,NULL),
(41,3,'The - Vol I Complete Sherlock Holmes',1900,'en',NULL,NULL,1,4,NULL),
(42,3,'The - Vol II Complete Sherlock Holmes',1900,'en',NULL,NULL,1,4,NULL),
(43,37,'The Wealth of Nations',1900,'en',NULL,NULL,1,4,NULL),
(44,38,'The Pillars of the Earth',1900,'en',NULL,NULL,1,4,NULL),
(45,39,'The Tao of Physics',1900,'en',NULL,NULL,1,4,NULL),
(46,40,'Surely You\'s re Joking Mr Feynman',1900,'en',NULL,NULL,1,4,NULL),
(47,41,'A Farewell to Arms',1900,'en',NULL,NULL,1,4,NULL),
(48,42,'The Veteran',1900,'en',NULL,NULL,1,4,NULL),
(49,43,'False Impressions',1900,'en',NULL,NULL,1,4,NULL),
(50,44,'The Last Lecture',1900,'en',NULL,NULL,1,4,NULL),
(51,45,'Return of the Primitive',1900,'en',NULL,NULL,1,4,NULL),
(52,46,'Jurassic Park',1900,'en',NULL,NULL,1,4,NULL),
(53,47,'A Russian Journal',1900,'en',NULL,NULL,1,4,NULL),
(54,48,'Tales of Mystery and Imagination',1900,'en',NULL,NULL,1,4,NULL),
(55,10,'Freakonomics',1900,'en',NULL,NULL,1,4,NULL),
(56,39,'The Hidden Connections',1900,'en',NULL,NULL,1,4,NULL),
(57,51,'The Story of Philosophy',1900,'en',NULL,NULL,1,4,NULL),
(58,52,'Asami Asami',1900,'en',NULL,NULL,1,4,NULL),
(59,47,'Journal of a Novel',1900,'en',NULL,NULL,1,4,NULL),
(60,47,'Once There Was a War',1900,'en',NULL,NULL,1,4,NULL),
(61,47,'The Moon is Down',1900,'en',NULL,NULL,1,4,NULL),
(62,56,'The Brethren',1900,'en',NULL,NULL,1,4,NULL),
(63,57,'In a Free State',1900,'en',NULL,NULL,1,4,NULL),
(64,58,'Catch 22',1900,'en',NULL,NULL,1,4,NULL),
(65,59,'The Complete Mastermind',1900,'en',NULL,NULL,1,4,NULL),
(66,60,'Dylan on Dylan',1900,'en',NULL,NULL,1,4,NULL),
(67,61,'Soft Computing & Intelligent Systems',1900,'en',NULL,NULL,1,4,NULL),
(68,62,'Textbook of Economic Theory',1900,'en',NULL,NULL,1,4,NULL),
(69,63,'Econometric Analysis',1900,'en',NULL,NULL,1,4,NULL),
(70,64,'Learning OpenCV',1900,'en',NULL,NULL,1,4,NULL),
(71,65,'Data Structures Using C & C++',1900,'en',NULL,NULL,1,4,NULL),
(72,66,'A Modern Approach Computer Vision',1900,'en',NULL,NULL,1,4,NULL),
(73,67,'Principles of Communication Systems',1900,'en',NULL,NULL,1,4,NULL),
(74,68,'Let Us C',1900,'en',NULL,NULL,1,4,NULL),
(75,69,'The Amulet of Samarkand',1900,'en',NULL,NULL,1,4,NULL),
(76,70,'Crime and Punishment',1900,'en',NULL,NULL,1,4,NULL),
(77,71,'Angels & Demons',1900,'en',NULL,NULL,1,4,NULL),
(78,72,'The Argumentative Indian',1900,'en',NULL,NULL,1,4,NULL),
(79,73,'Sea of Poppies',1900,'en',NULL,NULL,1,4,NULL),
(80,72,'The Idea of Justice',1900,'en',NULL,NULL,1,4,NULL),
(81,75,'A Raisin in the Sun',1900,'en',NULL,NULL,1,4,NULL),
(82,76,'All the President\'s Men',1900,'en',NULL,NULL,1,4,NULL),
(83,43,'A Prisoner of Birth',1900,'en',NULL,NULL,1,4,NULL),
(84,78,'Scoop!',1900,'en',NULL,NULL,1,4,NULL),
(85,79,'Ahe Manohar Tari',1900,'en',NULL,NULL,1,4,NULL),
(86,80,'The Last Mughal',1900,'en',NULL,NULL,1,4,NULL),
(87,81,'Vol 39 No. 1 Social Choice & Welfare',1900,'en',NULL,NULL,1,4,NULL),
(88,52,'Radiowaril Bhashane & Shrutika',1900,'en',NULL,NULL,1,4,NULL),
(89,52,'Gun Gayin Awadi',1900,'en',NULL,NULL,1,4,NULL),
(90,52,'Aghal Paghal',1900,'en',NULL,NULL,1,4,NULL),
(91,85,'Maqta-e-Ghalib',1900,'en',NULL,NULL,1,4,NULL),
(92,86,'Manasa',1900,'en',NULL,NULL,1,4,NULL),
(93,87,'India from Midnight to Milennium',1900,'en',NULL,NULL,1,4,NULL),
(94,87,'The Great Indian Novel',1900,'en',NULL,NULL,1,4,NULL),
(95,89,'O Jerusalem!',1900,'en',NULL,NULL,1,4,NULL),
(96,89,'The City of Joy',1900,'en',NULL,NULL,1,4,NULL),
(97,89,'Freedom at Midnight',1900,'en',NULL,NULL,1,4,NULL),
(98,47,'The Winter of Our Discontent',1900,'en',NULL,NULL,1,4,NULL),
(99,93,'On Education',1900,'en',NULL,NULL,1,4,NULL),
(100,94,'Free Will',1900,'en',NULL,NULL,1,4,NULL),
(101,87,'Bookless in Baghdad',1900,'en',NULL,NULL,1,4,NULL),
(102,96,'The Case of the Lame Canary',1900,'en',NULL,NULL,1,4,NULL),
(103,9,'The Theory of Everything',1900,'en',NULL,NULL,1,4,NULL),
(104,98,'New Markets & Other Essays',1900,'en',NULL,NULL,1,4,NULL),
(105,99,'Electric Universe',1900,'en',NULL,NULL,1,4,NULL),
(106,100,'The Hunchback of Notre Dame',1900,'en',NULL,NULL,1,4,NULL),
(107,47,'Burning Bright',1900,'en',NULL,NULL,1,4,NULL),
(108,98,'The Age of Discontuinity',1900,'en',NULL,NULL,1,4,NULL),
(109,103,'Doctor in the Nude',1900,'en',NULL,NULL,1,4,NULL),
(110,104,'Down and Out in Paris & London',1900,'en',NULL,NULL,1,4,NULL),
(111,72,'Identity & Violence',1900,'en',NULL,NULL,1,4,NULL),
(112,80,'Beyond the Three Seas',1900,'en',NULL,NULL,1,4,NULL),
(113,107,'Talking Straight',1900,'en',NULL,NULL,1,4,NULL),
(114,108,'Vol 3 Maugham\'s Collected Short Stories',1900,'en',NULL,NULL,1,4,NULL),
(115,42,'The Phantom of Manhattan',1900,'en',NULL,NULL,1,4,NULL),
(116,108,'Ashenden of The British Agent',1900,'en',NULL,NULL,1,4,NULL),
(117,111,'Zen & The Art of Motorcycle Maintenance',1900,'en',NULL,NULL,1,4,NULL),
(118,112,'The Great War for Civilization',1900,'en',NULL,NULL,1,4,NULL),
(119,45,'We the Living',1900,'en',NULL,NULL,1,4,NULL),
(120,114,'The Artist and the Mathematician',1900,'en',NULL,NULL,1,4,NULL),
(121,93,'History of Western Philosophy',1900,'en',NULL,NULL,1,4,NULL),
(122,72,'Rationality & Freedom',1900,'en',NULL,NULL,1,4,NULL),
(123,117,'Clash of Civilizations and Remaking of the World Order',1900,'en',NULL,NULL,1,4,NULL),
(124,39,'Uncommon Wisdom',1900,'en',NULL,NULL,1,4,NULL),
(125,119,'One',1900,'en',NULL,NULL,1,4,NULL),
(126,120,'To Sir With Love',1900,'en',NULL,NULL,1,4,NULL),
(127,121,'Half A Life',1900,'en',NULL,NULL,1,4,NULL),
(128,122,'The Discovery of India',1900,'en',NULL,NULL,1,4,NULL),
(129,52,'Apulki',1900,'en',NULL,NULL,1,4,NULL),
(130,93,'Unpopular Essays',1900,'en',NULL,NULL,1,4,NULL),
(131,42,'The Deceiver',1900,'en',NULL,NULL,1,4,NULL),
(132,76,'Veil: Secret Wars of the CIA',1900,'en',NULL,NULL,1,4,NULL),
(133,52,'Char Shabda',1900,'en',NULL,NULL,1,4,NULL),
(134,128,'Rosy is My Relative',1900,'en',NULL,NULL,1,4,NULL),
(135,108,'The Moon and Sixpence',1900,'en',NULL,NULL,1,4,NULL),
(136,130,'A Short History of the World',1900,'en',NULL,NULL,1,4,NULL),
(137,108,'The Trembling of a Leaf',1900,'en',NULL,NULL,1,4,NULL),
(138,103,'Doctor on the Brain',1900,'en',NULL,NULL,1,4,NULL),
(139,133,'Simpsons & Their Mathematical Secrets',1900,'en',NULL,NULL,1,4,NULL),
(140,134,'Pattern Classification',1900,'en',NULL,NULL,1,4,NULL),
(141,135,'From Beirut to Jerusalem',1900,'en',NULL,NULL,1,4,NULL),
(142,133,'The Code Book',1900,'en',NULL,NULL,1,4,NULL),
(143,112,'The Age of the Warrior',1900,'en',NULL,NULL,1,4,NULL),
(144,138,'The Numbers Behind Numb3rs',1900,'en',NULL,NULL,1,4,NULL),
(145,47,'A Life in Letters',1900,'en',NULL,NULL,1,4,NULL),
(146,140,'The Information',1900,'en',NULL,NULL,1,4,NULL),
(147,141,'Elements of Information Theory',1900,'en',NULL,NULL,1,4,NULL),
(148,142,'Power Electronics - Rashid',1900,'en',NULL,NULL,1,4,NULL),
(149,143,'Power Electronics - Mohan',1900,'en',NULL,NULL,1,4,NULL),
(150,144,'Neural Networks',1900,'en',NULL,NULL,1,4,NULL),
(151,47,'The Grapes of Wrath',1900,'en',NULL,NULL,1,4,NULL),
(152,52,'Vyakti ani Valli',1900,'en',NULL,NULL,1,4,NULL),
(153,12,'Statistical Learning Theory',1900,'en',NULL,NULL,1,4,NULL),
(154,148,'Empire of the Mughal - The Tainted Throne',1900,'en',NULL,NULL,1,4,NULL),
(155,148,'Empire of the Mughal - Brothers at War',1900,'en',NULL,NULL,1,4,NULL),
(156,148,'Empire of the Mughal - Ruler of the World',1900,'en',NULL,NULL,1,4,NULL),
(157,148,'Empire of the Mughal - The Serpent\'s Tooth',1900,'en',NULL,NULL,1,4,NULL),
(158,148,'Empire of the Mughal - Raiders from the North',1900,'en',NULL,NULL,1,4,NULL),
(159,153,'Mossad',1900,'en',NULL,NULL,1,4,NULL),
(160,154,'Jim Corbett Omnibus',1900,'en',NULL,NULL,1,4,NULL),
(161,155,'20000 Leagues Under the Sea',1900,'en',NULL,NULL,1,4,NULL),
(162,156,'Batatyachi Chal',1900,'en',NULL,NULL,1,4,NULL),
(163,156,'Hafasavnuk',1900,'en',NULL,NULL,1,4,NULL),
(164,156,'Urlasurla',1900,'en',NULL,NULL,1,4,NULL),
(165,68,'Pointers in C',1900,'en',NULL,NULL,1,4,NULL),
(166,160,'The Cathedral and the Bazaar',1900,'en',NULL,NULL,1,4,NULL),
(167,161,'Design with OpAmps',1900,'en',NULL,NULL,1,4,NULL),
(168,162,'Think Complexity',1900,'en',NULL,NULL,1,4,NULL),
(169,163,'The Devil\'s Advocate',1900,'en',NULL,NULL,1,4,NULL),
(170,45,'Ayn Rand Answers',1900,'en',NULL,NULL,1,4,NULL),
(171,45,'Philosophy: Who Needs It',1900,'en',NULL,NULL,1,4,NULL),
(172,166,'Data Analysis with Open Source Tools',1900,'en',NULL,NULL,1,4,NULL),
(173,167,'Broca\'s Brain',1900,'en',NULL,NULL,1,4,NULL),
(174,168,'Men of Mathematics',1900,'en',NULL,NULL,1,4,NULL),
(175,169,'Oxford book of Modern Science Writing',1900,'en',NULL,NULL,1,4,NULL),
(176,170,'Judiciary and Democracy Justice',1900,'en',NULL,NULL,1,4,NULL),
(177,171,'The Arthashastra',1900,'en',NULL,NULL,1,4,NULL),
(178,172,'We the People',1900,'en',NULL,NULL,1,4,NULL),
(179,172,'We the Nation',1900,'en',NULL,NULL,1,4,NULL),
(180,174,'The Courtroom Genius',1900,'en',NULL,NULL,1,4,NULL),
(181,175,'Dongri to Dubai',1900,'en',NULL,NULL,1,4,NULL),
(182,176,'Foundation History of England',1900,'en',NULL,NULL,1,4,NULL),
(183,80,'City of Djinns',1900,'en',NULL,NULL,1,4,NULL),
(184,178,'India\'s Legal System',1900,'en',NULL,NULL,1,4,NULL),
(185,179,'More Tears to Cry',1900,'en',NULL,NULL,1,4,NULL),
(186,180,'The Ropemaker',1900,'en',NULL,NULL,1,4,NULL),
(188,182,'The Prince',1900,'en',NULL,NULL,1,4,NULL),
(189,183,'Eyeless in Gaza',1900,'en',NULL,NULL,1,4,NULL),
(190,184,'Tales of Beedle the Bard',1900,'en',NULL,NULL,1,4,NULL),
(191,185,'Girl with the Dragon Tattoo',1900,'en',NULL,NULL,1,4,NULL),
(192,185,'Girl who kicked the Hornet\'s Nest',1900,'en',NULL,NULL,1,4,NULL),
(193,185,'Girl who played with Fire',1900,'en',NULL,NULL,1,4,NULL),
(194,28,'Structure and Randomness',1900,'en',NULL,NULL,1,4,NULL),
(195,189,'Image Processing with MATLAB',1900,'en',NULL,NULL,1,4,NULL),
(196,104,'Animal Farm',1900,'en',NULL,NULL,1,4,NULL),
(197,70,'The Idiot',1900,'en',NULL,NULL,1,4,NULL),
(198,192,'A Christmas Carol',1900,'en',NULL,NULL,1,4,NULL);
 
INSERT INTO `clients` VALUES (1,'Maria Dolores Gomez','Maria Dolores.95983222J@random.names','1971-06-06','F',1,'2018-04-09 16:51:30'),
(2,'Adrian Fernandez','Adrian.55818851J@random.names','1970-04-09','M',1,'2018-04-09 16:51:30'),
(3,'Maria Luisa Marin','Maria Luisa.83726282A@random.names','1957-07-30','F',1,'2018-04-09 16:51:30'),
(4,'Pedro Sanchez','Pedro.78522059J@random.names','1992-01-31','M',1,'2018-04-09 16:51:30'),
(5,'Pablo Saavedra','Pablo.93733268B@random.names','1960-07-21','M',1,'2018-04-09 16:51:30'),
(6,'Marta Carrillo','Marta.55741882W@random.names','1981-06-15','F',1,'2018-04-09 16:51:30'),
(7,'Javier Barrio','Javier.54966248C@random.names','1971-04-24','M',1,'2018-04-09 16:51:30'),
(8,'Milagros Garcia','Milagros.90074144A@random.names','1964-12-05','F',1,'2018-04-09 16:51:30'),
(9,'Carlos Quiros','Carlos.63291957M@random.names','1954-08-28','M',1,'2018-04-09 16:51:30'),
(10,'Carmen De la Torre','Carmen.57408761W@random.names','1966-05-14','F',1,'2018-04-09 16:51:30'),
(11,'Laura Moron','Laura.57774589S@random.names','1954-03-02','F',1,'2018-04-09 16:51:30'),
(12,'Maria Dolores Larrea','Maria Dolores.71788005Z@random.names','1990-09-04','F',1,'2018-04-09 16:51:30'),
(13,'Maria Dolores Sanz','Maria Dolores.30948169J@random.names','2001-08-30','F',1,'2018-04-09 16:51:30'),
(14,'Jose Maria Bermudez','Jose Maria.24963969E@random.names','1998-05-23','M',1,'2018-04-09 16:51:30'),
(15,'Carlos Blanco','Carlos.94783133H@random.names','1952-08-07','M',1,'2018-04-09 16:51:30'),
(16,'Juan Carlos Jurado','Juan Carlos.71650477A@random.names','1990-12-12','M',1,'2018-04-09 16:51:30'),
(17,'David Gonzalez','David.54332034P@random.names','1976-05-03','M',1,'2018-04-09 16:51:30'),
(18,'Antonia Aranda','Antonia.91560262E@random.names','1979-10-25','F',1,'2018-04-09 16:51:30'),
(19,'Maria Moreno','Maria.58935447V@random.names','1997-01-12','F',1,'2018-04-09 16:51:30'),
(20,'David Casals','David.06746883V@random.names','1999-07-13','M',1,'2018-04-09 16:51:30'),
(21,'Mario Romero','Mario.46091382A@random.names','1985-03-29','M',1,'2018-04-09 16:51:30'),
(22,'Maria angeles Alba','Maria angeles.91808919A@random.names','1959-09-14','F',1,'2018-04-09 16:51:30'),
(23,'Rafael Espinola','Rafael.67605541P@random.names','1998-10-11','M',1,'2018-04-09 16:51:30'),
(24,'Montserrat alvarez','Montserrat.31114289G@random.names','1994-11-06','F',1,'2018-04-09 16:51:30'),
(25,'Maria Carmen Gomez','Maria Carmen.64351051H@random.names','1968-06-30','F',1,'2018-04-09 16:51:30'),
(26,'Maria Cruz Morillas','Maria Cruz.81385695B@random.names','1978-10-29','F',1,'2018-04-09 16:51:30'),
(27,'Josefa Roldan','Josefa.51417560W@random.names','1993-08-09','F',1,'2018-04-09 16:51:30'),
(28,'Monica Pla','Monica.18992324M@random.names','1972-06-08','F',1,'2018-04-09 16:51:30'),
(29,'Juana Maria Lopez','Juana Maria.51072683X@random.names','1990-07-15','F',1,'2018-04-09 16:51:30'),
(30,'Maria Carmen Ponce','Maria Carmen.41619980P@random.names','1984-07-26','F',1,'2018-04-09 16:51:30'),
(31,'Juan Carlos Rios','Juan Carlos.45673504N@random.names','1967-05-04','M',1,'2018-04-09 16:51:30'),
(32,'Isabel Alfaro','Isabel.77316882J@random.names','1980-07-25','F',1,'2018-04-09 16:51:30'),
(33,'Maria Isabel Armas','Maria Isabel.42010289F@random.names','1950-11-21','F',1,'2018-04-09 16:51:30'),
(34,'Maria Teresa Castillo','Maria Teresa.91228389Q@random.names','2002-11-08','F',1,'2018-04-09 16:51:30'),
(35,'Andres Planells','Andres.09981449R@random.names','1992-06-19','M',1,'2018-04-09 16:51:30'),
(36,'Silvia Perez','Silvia.91812407H@random.names','1969-02-15','F',1,'2018-04-09 16:51:30'),
(37,'Pablo Gonzalez','Pablo.11605676Z@random.names','2000-10-11','M',1,'2018-04-09 16:51:30'),
(38,'Maria Antonia Jimenez','Maria Antonia.98071058R@random.names','1998-06-23','F',1,'2018-04-09 16:51:31'),
(39,'Jesus Rodriguez','Jesus.86679475L@random.names','1961-01-17','M',1,'2018-04-09 16:51:31'),
(40,'Carmen Rodriguez','Carmen.81799536J@random.names','1973-02-17','F',1,'2018-04-09 16:51:31'),
(41,'Maria Dolores Rodriguez','Maria Dolores.75444599E@random.names','1962-08-14','F',1,'2018-04-09 16:51:31'),
(42,'Jordi Campos','Jordi.76000917Q@random.names','1956-09-23','M',1,'2018-04-09 16:51:31'),
(43,'Carlos Caceres','Carlos.97628163V@random.names','1993-05-16','M',1,'2018-04-09 16:51:31'),
(44,'Carmen Robles','Carmen.29258188A@random.names','1955-06-19','F',1,'2018-04-09 16:51:31'),
(45,'Sara Rodriguez','Sara.16181250Z@random.names','2001-06-07','F',1,'2018-04-09 16:51:31'),
(46,'Maria Carmen Rivera','Maria Carmen.59955426S@random.names','2000-05-27','F',1,'2018-04-09 16:51:31'),
(47,'Alberto Cabanas','Alberto.40633755T@random.names','1991-10-27','M',1,'2018-04-09 16:51:31'),
(48,'Jose Sanchez','Jose.52243847Z@random.names','1976-12-06','M',1,'2018-04-09 16:51:31'),
(49,'Isabel Martinez','Isabel.90843261T@random.names','1962-07-01','F',1,'2018-04-09 16:51:31'),
(50,'David Sanchez','David.14910073R@random.names','1975-05-18','M',1,'2018-04-09 16:51:31'),
(51,'Sergio Sebastian','Sergio.09345984A@random.names','1959-08-30','M',1,'2018-04-09 16:51:31'),
(52,'Manuel Cabrera','Manuel.38738750B@random.names','1993-08-23','M',1,'2018-04-09 16:51:31'),
(53,'Marina Gabaldon','Marina.12101665P@random.names','1959-03-25','F',1,'2018-04-09 16:51:31'),
(54,'Rafael Galvez','Rafael.87947175M@random.names','1988-09-02','M',1,'2018-04-09 16:51:31'),
(55,'Francisco Villar','Francisco.13922268T@random.names','1952-04-25','M',1,'2018-04-09 16:51:31'),
(56,'Francisco Garcia','Francisco.34242509V@random.names','1989-01-22','M',1,'2018-04-09 16:51:31'),
(57,'Esther Pina','Esther.36300729J@random.names','1977-11-07','F',1,'2018-04-09 16:51:31'),
(58,'Maria Jesus Noya','Maria Jesus.95839533M@random.names','1996-08-07','F',1,'2018-04-09 16:51:31'),
(59,'Paula Ropero','Paula.53630073F@random.names','1998-09-04','F',1,'2018-04-09 16:51:31'),
(60,'Maria Carmen Iglesias','Maria Carmen.24044144J@random.names','1977-06-12','F',1,'2018-04-09 16:51:31'),
(61,'Albert Galvez','Albert.10067957Y@random.names','1971-05-17','M',1,'2018-04-09 16:51:31'),
(62,'Carmen Lopez','Carmen.09399409E@random.names','1987-03-07','F',1,'2018-04-09 16:51:31'),
(63,'Francisco Jose Leon','Francisco Jose.07598657D@random.names','1965-12-11','M',1,'2018-04-09 16:51:31'),
(64,'Francisca Gonzalez','Francisca.19675393C@random.names','1957-12-23','F',1,'2018-04-09 16:51:31'),
(65,'Daniel Garcia','Daniel.01386486T@random.names','1979-05-29','M',1,'2018-04-09 16:51:31'),
(66,'Ana Maria Martinez','Ana Maria.91340418N@random.names','1980-09-14','F',1,'2018-04-09 16:51:31'),
(67,'Maria Aguilar','Maria.41749884P@random.names','2000-07-31','F',1,'2018-04-09 16:51:31'),
(68,'oscar Penas','oscar.31681177B@random.names','1981-10-02','M',1,'2018-04-09 16:51:31'),
(69,'Adrian Vela','Adrian.66561884E@random.names','1978-12-10','M',1,'2018-04-09 16:51:31'),
(70,'Francisco Alcalde','Francisco.52899588W@random.names','1967-03-11','M',1,'2018-04-09 16:51:31'),
(71,'Maria Dolores Perez','Maria Dolores.47800073R@random.names','2003-11-10','F',1,'2018-04-09 16:51:31'),
(72,'Juan Jose Tejada','Juan Jose.30429668R@random.names','1990-06-15','M',1,'2018-04-09 16:51:31'),
(73,'Cristobal Nogues','Cristobal.01001763K@random.names','2003-10-01','M',1,'2018-04-09 16:51:31'),
(74,'Maria Luisa Sanchez','Maria Luisa.91748033K@random.names','2000-02-03','F',1,'2018-04-09 16:51:31'),
(75,'Adrian Orta','Adrian.11458937S@random.names','1952-03-20','M',1,'2018-04-09 16:51:31'),
(76,'Maria Pilar Martin','Maria Pilar.93607154Y@random.names','1996-08-29','F',1,'2018-04-09 16:51:31'),
(77,'Jesus Perez','Jesus.91931655B@random.names','1954-06-01','M',1,'2018-04-09 16:51:31'),
(78,'Jesus Perez','Jesus.15757299E@random.names','1956-08-29','M',1,'2018-04-09 16:51:31'),
(79,'Esther Capdevila','Esther.96440550D@random.names','1970-10-12','F',1,'2018-04-09 16:51:31'),
(80,'David Nieves','David.40697907M@random.names','1965-04-02','M',1,'2018-04-09 16:51:31'),
(81,'Antonia Giron','Antonia.32080105G@random.names','1983-01-22','F',1,'2018-04-09 16:51:31'),
(82,'Juan Casero','Juan.94063877H@random.names','1974-06-29','M',1,'2018-04-09 16:51:31'),
(83,'Manuel De Pablo','Manuel.01279669H@random.names','1973-03-23','M',1,'2018-04-09 16:51:31'),
(84,'angel Palomo','angel.28890315S@random.names','1991-07-04','M',1,'2018-04-09 16:51:31'),
(85,'Laura Herrera','Laura.98555932N@random.names','1966-12-12','F',1,'2018-04-09 16:51:31'),
(86,'Maria Josefa Benitez','Maria Josefa.36743977M@random.names','1987-04-17','F',1,'2018-04-09 16:51:31'),
(87,'Luis Saez','Luis.08103734Y@random.names','1983-03-28','M',1,'2018-04-09 16:51:31'),
(88,'Susana Nevado','Susana.09442372K@random.names','1961-12-26','F',1,'2018-04-09 16:51:31'),
(89,'Miguel Gomez','Miguel.01631964E@random.names','1965-05-16','M',1,'2018-04-09 16:51:31'),
(90,'Julio Mayordomo','Julio.77582185B@random.names','1968-06-05','M',1,'2018-04-09 16:51:31'),
(91,'Sonia Mari','Sonia.06246888L@random.names','1994-10-13','F',1,'2018-04-09 16:51:31'),
(92,'Antonia Beltran','Antonia.96371304Q@random.names','1967-11-17','F',1,'2018-04-09 16:51:31'),
(93,'Mercedes Perez','Mercedes.80944345P@random.names','1958-11-05','F',1,'2018-04-09 16:51:31'),
(94,'Concepcion Velez','Concepcion.56896097P@random.names','1964-04-05','F',1,'2018-04-09 16:51:31'),
(95,'Diego Correa','Diego.44862413Q@random.names','1999-09-15','M',1,'2018-04-09 16:51:31'),
(96,'Juan Antonio Galan','Juan Antonio.95710220K@random.names','1982-11-20','M',1,'2018-04-09 16:51:31'),
(97,'Manuel Cerezo','Manuel.25853412D@random.names','1991-03-12','M',1,'2018-04-09 16:51:31'),
(98,'Rosa Maria Singh','Rosa Maria.41642169W@random.names','1956-12-31','F',1,'2018-04-09 16:51:31'),
(99,'angeles Mena','angeles.88859550Q@random.names','1987-09-22','F',1,'2018-04-09 16:51:31'),
(100,'Jose Hidalgo','Jose.05903641R@random.names','1973-08-13','M',1,'2018-04-09 16:51:31');
 
 
INSERT INTO transactions(client_id, book_id, TYPE, finished) VALUES(34, 12, 'sell',1);
INSERT INTO transactions(client_id, book_id, TYPE, finished) VALUES(87, 54, 'lend',0);
INSERT INTO transactions(client_id, book_id, TYPE, finished) VALUES(14, 3, 'sell',1);
INSERT INTO transactions(client_id, book_id, TYPE, finished) VALUES(54, 1, 'sell',1);
INSERT INTO transactions(client_id, book_id, TYPE, finished) VALUES(81, 12, 'lend',1);
INSERT INTO transactions(client_id, book_id, TYPE, finished) VALUES(81, 12, 'sell',1);
INSERT INTO transactions(client_id, book_id, TYPE, finished) VALUES(30, 10, 'return',1);
```

```bash
docker cp ./all_schema.sql mysql-container:/var/lib/mysql/all_schema.sql
docker cp ./all_data.sql mysql-container:/var/lib/mysql/all_data.sql
docker exec -it mysql-container bash
ls -ltra /var/lib/mysql/

mysql -u root -p < /var/lib/mysql/all_schema.sql
tu_contraseña

mysql -u root -p -D operation < /var/lib/mysql/all_data.sql
tu_contraseña
```

## Su majestad el SELECT


```sql

-- Listar todas la tuplas de la tabla clients
SELECT * FROM clients;

-- Listar todos los nombres de la tabla clients
SELECT name FROM clients;

-- Listar todos los nombres, email y género de la tabla clients
SELECT name, email, gender FROM clients;

-- Listar los 10 primeros resultados de la tabla clients
SELECT name, email, gender FROM clients LIMIT 10;

-- Listar todos los clientes de género Masculino
SELECT name, email, gender FROM clients WHERE gender = 'M';

-- Listar el año de nacimientos de los clientes, con la función YEAR()
SELECT YEAR(birthdate) FROM clients;

-- Mostrar el año actual
SELECT YEAR(NOW());

-- Listar los 10 primeros resultados de las edades de los clientes
SELECT YEAR(NOW()) - YEAR(birthdate) FROM clients LIMIT 10;

-- Listar nombre y edad de los 10 primeros clientes
SELECT name, YEAR(NOW()) - YEAR(birthdate) FROM clients LIMIT 10;

-- Listar clientes que coincidan con el nombre de &quot;Saave&quot;
SELECT * FROM clients WHERE name LIKE '%Saave%';

-- Listar clientes (nombre, email, edad y género). con filtro de genero = F y nombre que coincida con 'Lop'
--Usando alias para nombrar la función como 'edad'
SELECT name, email, YEAR(NOW()) - YEAR(birthdate) AS edad, gender FROM clients WHERE gender = 'F' AND name LIKE '%Lop%';
```

## Comando JOIN

