---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Desarrollo Web con PHP y Yii2
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Desarrollo Web con PHP y Yii2
draft: false
category: PHP
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
    text-align: center;
  }

  th, td {
    border: 1px solid #ddd; /* Borde de las celdas */
    padding: 8px; /* Relleno de las celdas */
    /* text-align: left;  */
  }

  th {
    background-color: #f2f2f2; /* Color de fondo del encabezado */
    font-weight: bold; /* Peso de la fuente del encabezado */
  }

  tr:nth-child(even) {
    background-color: #f9f9f9; /* Color de fondo de las filas pares */
  }  

</style>

## ¿Qué es Yii2?

<details>

DOC: https://www.yiiframework.com/

**Yii2** es un framework fullstack para PHP con más de 15 años en línea, hecho en PHP. Es:

- Robusto
- Seguro
- Práctico

Utiliza la arquitectura MVC (modelo vista controlador), que nos permite crear aplicaciones bien segmentadas, de manera muy rápida y sin que nos cueste capacidad de desarrollo para hacerlo bien y rápido.

- Curva de aprendizaje corta.
- Desarrollo de Apps en muy poco tiempo.

### ¿Qué es un framework?

Es un conjunto de scripts organizado que nos ayuda al desarrollo de aplicaciones. Se puede encargar de muchas cosas como:

- Conexión a BD
- Manejo de sesiones
- Administración de usuarios
- Automatización de envío de emails

El framework nos ayuda para que solo nos encarguemos del:

- Modelo de datos
- Lógica de la App
- Lógica de negocio

Yii2 posee una gran documentación y una gran comunidad.

Yii2 nos ayuda a mantener un desarrollo simple, evitando complejidades.

- Se basa en el patrón MVC preferible, pero es flexible lo que indica que puede adaptarse a otro patrón arquitectónico.
- Posee excelente desempeño con esto quiere decir que es rápido(uso de caché, la optimización de consultas etc)
- Es seguro, brinda protección CSRF y XSS entre otros.
- Tiene documentación en varios idiomas

</details>

## ¿Por qué usar PHP y Yii2?

<details>

**PHP** permite hacer cosas utilizando malas prácticas, pero por otro lado es un lenguaje:

- Rápido
- Facil de aprender
- Posee Frameworks muy potentes
- Funcionalidad prácticas

Entre los frameworks de PHP Yii2 posee un balance perfecto entre:

- Instalación sencilla
- Profundidad de conceptos en sus clases

**Ventajas** de Yii2:

- Velocidad de ejecución
- Facilidad de aprendizaje
- Documentación entendible

</details>  

## Arquitectura modelo–vista–controlador

<details>  

La arquitectura MVC es una de las más probadas. Todo se basa en responsabilidades, quién se encarga de qué.

![MVC](/astro-doc-full-stack/images/php/MVC.png)

Podemos ver al modelo, vista y contrlador como una capa de nuestra app.

El **Modelo** es el responsable de empáquetar la información de forma que todas las demás capas vean exactamente los mismo, con los mismos recursos, atributos y funciones.

La **Vista** se encarga, por un lado, de presentar la información y por otro lado, de recopilar de un usuario o de otro agente externo al sistema para darle tratamiento.

El **Controlador** es la capa encargada de interpretar lo que llega de la vista, enviarla al modelo, recibir lo que llega desde el modelo después de que las reglas de negocio fueron aplicadas en la capa de modelo y retornar esa información a la vista.

Lo importante es saber qué responsabilidades recaen en cada capa. Ejemplo: una vist jamás buscará información en la BD. PHP desde un principio permite utilizar estas malas prácticas. Respetando las responsabilidades mantendremos una app entendible, mantenible, escalable.

</details>  

## Instalación de Yii2

<details>  

Requerimientos:

- PHP 7.1 o superior
- Composer
- Base de datos MySQL

Crearemos nuestra primera app utilizando un templete de yii2 (yiisoft/yii2-app-basic). La llamaremos thebookclub

```sh
composer create-project --prefer-dist yiisoft/yii2-app-basic thebookclub.test

# Ejecuta un server web
yii serve
```
http://localhost:8080

</details>  

## Estructura de una aplicación con Yii2

<details>  

Una de las grandes ventajas de los lenguajes interpretados es que para ver los cambios realizados en un archivo, no tnemos que bajar el servidor, compilar y levantar el servidor; los cambios son directos.

Otra característica importante es como yii realiza la gestión de errores, como nos muestra en Web (modo dev) donde se encuentra el error.

```sh
# thebookclub.test
|- assests
|- commands
|- config
|- controllers
|- mail
|- models
|- runtime
|- tests
|- vagrant
|- vendor
|- views
|- web
|- widgets
|- .bowerrc
|- .gitIgnore
|- codeception.yml
|- composer.json
|- conposer.lock
|- docker-composer.yml
|- LICENSE.md
|- README.md
|- requerimients.php
|- Vagrantfile
|- yii
`- yii.bat 
```

- **config**: posee 3 archivos importantes. 
  - db.php -> es un arreglo que retorna la configuración de una o mnás Bases de Datos, las que necesitemos.
  - web.php -> si invocamos a yii a través de web (cada vez que los controladores retornen vistas Html) se utiliza este archivo de configuración.
  - console.php -> si la invocación a yii se produce a tarvés de la línea de comandos se utiliza este archivo de configuración.

- **Models**: el corazón, los datos que vamos a almacenar. Aquí guardaremos todas las clases relacionadas a los modelos. Cada tabla tendrá su correlación directa con su clase/objeto modelo.

- **Commands**: aquí guardaremos comandos para ejecutar desde la línea de comandos. Viene con una plantilla llamada HelloController.php que podemos clonar para crear nuestros comandos. 

- **Controllers**: contendrá los controladores para el ambiente web. La regla básica es que exista un controlador por cada modelo. 

- **Views**: cada controlador tendrá su propia carpeta de vistas, de manera que no debemos por nombrar archivos como contact_new.php y subscribers_new.php. Al estar en distintas carpetas simplemente podemos utilizar /views/contact/new.php y /views/subscribers/new.php.

- **yii y yii.bat**: el primero es un scritp bash para sistemas Unix, Linux, y Mac y el segundo un .bat para windows. Desde lanzaremos yii. Recibe la solicitud desde la línea de comandos y se lanza la app.

- **Web**: en el arhcivo index.php nace el request. Esta es la carpeta raíz de nuestro server web. Aquí se encontraran las imágenes, los archivos .css, los archivos .js, los assets que utilicemos para cuaquier vista. También tendremos el favicon.ico, el .htaccess y el robots.txt.

> <mark>**Sugenrencia**: podemos crear dos carpetas adicionales: </mark>

- **Schema**: donde tendremos los sqls de la base de datos.

```sh
mkdir schema
touch schema/schema.sql
```

- **local**: carpeta que no subiremos a ningún repositorio. Aquí podremos dejar los passwords, rutas secretas. Luego veremos un script bash que utilizaremos para convertir estos valores en variables que serán consumidas desde la configuración de yii.

```sh
mkdir local
```
</details>  

## Configuración de variables de entorno

<details>  

Comenzaremos con el archivo db.php. Aquí tendremos la configuración central de la base de datos. 

```php
// /config/db.php
<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=yii2basic',
    'username' => 'jourdanm',
    'password' => 'password',
    'charset' => 'utf8',

    // Schema cache options (for production environment)
    //'enableSchemaCache' => true,
    //'schemaCacheDuration' => 60,
    //'schemaCache' => 'cache',
];
```
El **problema** de tener este archivo es que cualquier persona puede ver estos datos sensibles en un repositorio. Para evitar este problema utilizaremos variables de entorno. 

Escribiremos variables en el entorno donde se ejecutará el programa y luego las leeremos desde el programa. No tiene que ver con php, sino con el sistema operativo. **Para ello creamos el directorio local**.

En este directorio crearemos un archivo de configuración para ejecutar antes de levantar la app.

```sh
# /local/variables_local.sh

# Variables básicas para BD
export db_host=localhost
export db_name=thebookclub
export db_user=jourdanm
export db_pass=password
export db_port=3306

# Variables para encriptación de pass (salt). 
# Es una cadena de caracteres que no enviaremos a ningún repositorio,
# que no se encuentra en el código n ien la BD
# que nos servirá para hashear información sensible
export salt=MGViY2RkMTU1MjBmOTNjMWViZDQxYmM4IP!M
```

Para crear un password aleatorio podemos utilizar el comando, y e insertar algunos caracteres especiales.

```sh
date +%s | sha256sum | base64 | head -c 32 ; echo
# MGViY2RkMTU1MjBmOTNjMWViZDQxYmM4
```

Ejecutamos el script para exponer las variables al entorno. Inicialmente si ejecutamos un <code>echo $dh_host</code> no encontrará la variable.

El comando source nos sirve para levantar variables al entorno. Esto quiere decir, que todos los programas que se ejecuten en esa terminal, en ese ambiente, tendrán acceso al valor de estas variables.

```sh
echo $db_host 
# no existe la variable

source local/variables_local.sh
# localhost
```

### Leyendo las variables desde PHP

La función de PHP **getenv()** recupera el valor de la variables que indiquemos o null si no la encuentra. Ejemplo: <code>getenv('db_host')</code>.

Otra función que utilizaremos es **sprintf()**, que recibe una máscara y luego tantas variables como se mencionan en la máscara. La máscara utiliza placeholders espécificos como <code>"%f - %s (%d)"</code> que significa float, string y numérico o entero. Ejemplo: <code>sprintf("%f %s %d", 3.1416, "Hola!!!!", 67)</code>

sprintf retornará un string con el formato indicado. Así evitaremos código malicio y tener mayor control no solo sobre el formato, sino sobre el input de un usuario o fuentes desconocidas.

En PHP tambén existe la funcion printf(), que retorna el string a pantalla. Eso quiere decir que: 

```php
echo printf == printf
```

Conociendo estas funciones podemos levantar las variables desde el archivo de configuración de la BD.

```php
// /config/db.php
<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => sprintf("mysql:host=%s;dbname=%s", getenv('db_host'), getenv('db_name')),
    'username' => sprintf("%s", getenv('db_user')),
    'password' => sprintf("%s", getenv('db_pass')),
    'charset' => 'utf8',

    // Schema cache options (for production environment)
    //'enableSchemaCache' => true,
    //'schemaCacheDuration' => 60,
    //'schemaCache' => 'cache',
];
```
</details>  

## Proyecto: The Book Club



<details>  

El proyecto que desarrollaremos es un gestor de libros donde se podrá:

- Crear un usuario 
- Tener su biblioteca personal
- Agregar libros
- Agregar autores

No profundizaremos demasiado en la UI/UX, pero si en lo relacionado a los datos, BD, relaciones, etc.

Por otro lado, veremos como Yii, a pesar de ser un framework fullstack, posee muchas facilidades para el frontend.

Es un proyecto sencillo, pero perfecto para entender las relaciones entre los datos. Crearemos la BD, los modelos, los controladores, y las vistas utilizando las ventajas que nos proporciona Yii.

</details>  

## Creación del schema de la base de datos

<details>  

Primeramente diseñaremos la BD, crearemos la tablas para tener claro los datos que manejará la app.

Yii tiene la capacidad de ejecutar **migrations**, pero para manetener el control absoluto **diseñaremos la BD en SQL**.

```sql
/* /schema/schema.sql */
CREATE DATABASE if not exists thebookclub;
use thebookclub;

CREATE table if not exists users (
    -- id int auto_increment primary key,
    -- username varchar(255) not null,
    -- email varchar(255) not null,
    -- password varchar(255) not null,
    -- created_at timestamp default current_timestamp
);

CREATE table if not exists books (
  book_id integer unsigned auto_increment primary key,
  title varchar(500) not null,
  author_id integer unsigned not null,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE table if not exists authors (
  author_id integer unsigned auto_increment primary key,
  name varchar(100) not null,
  nationality varchar(2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE table if not exists clubs (
  clud_id integer unsigned auto_increment primary key,
  name varchar(100) not null unique,
  description varchar(500),
  created_at timestamp not null default current_timestamp,
  modified_at timestamp not null default current_timestamp 
    on update current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE table if not exists club_members (
  club_member_id integer unsigned not null primary key auto_increment,
  user_id integer unsigned not null,
  club_id integer unsigned not null,
  is_admin tinyint not null default 0,
  created_at timestamp not null default current_timestamp,
  modified_at timestamp not null default current_timestamp 
    on update current_timestamp,
  unique key no_rep(user_id, club_id),

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

create table if not exists user_books (
  user_books_id integer unsigned primary key auto_increment,
  user_id integer not null,
  book_id integer not null,
  created_at timestamp not null default current_timestamp,
  modified_at timestamp not null default current_timestamp
    on update current_timestamp,
  unique key no_rep(user_id, book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

create table if not exists book_scores (
	book_score_id integer unsigned primary key auto_increment,
	user_id integer unsigned not null,
	book_id integer unsigned not null,
	score tinyint unsigned,
	created_at timestamp not null default current_timestamp,
	modified_at timestamp not null default current_timestamp on update current_timestamp,
	unique key no_rep(user_id, book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
```

</details>  

## Commands

<details>  

Los **comandos** son una herramienta que nos ofrece Yii para acceder a todos los recursos del sistema invocados desde la línea de comandos. Un comando es un controlador, **el controller es el standar para Web** y **el command es un controller para línea de comando**.

En la instalación básica del proyecto viene un ejemplo de command (HelloController).

Crearemos un command llamado ExampleController.php

```php
// /commands/ExampleController.php

<?php

namespace app\commands;

use yii\console\Controller;
use yii\console\ExitCode;

/**
 * Comando para prueba
 */

class ExampleController extends Controller
{
  /**
   * Suma los valores de los dos parámetros
   * @return int Exit code
   */
  public function actionSuma($a, $b)
  {
    $result = $a + $b;
    printf("%0.2f\n", $result);
    return ExitCode::OK;
  }

  public function actionBooks($file)
  {
    $f = fopen($file, "r");
    while (!feof($f)) {
      $data = fgetcsv($f);
      print_r($data);
    }
    fclose($f);
    return ExitCode::OK;
  }
}
```

```sh
# Muestra las opciones de yii
# Veremos que aparece un nuevo comando (example/suma)
php yii

# Ejecutamos 
php yii example/suma 10 5
# 15.00
```
</details>  

## Models 

<details>  

Un **modelo** es un paquete de transporte de datos, de reglas de negocio y de reglas de validación. El modelos es el corazón de nuestra aplicación.

Creamos el primer modelo llamado Book. 

- Así como a las tablas las nombramos en plural, a los modelos los nombraremos en singular. 
- Por el momento, nos olvidaremos de la BD y avanzaremos sobre el modelo. Solo lo utilizaremos cono contenedor de información.


```php
// /models/Book.php
<?php

namespace app\models;

use yii\base\Model;

class Book extends Model
{
  public $title;
  public $author;

  public function toString()
  {
    return sprintf("%s - %s", $this->title, $this->author);
  }
}
```

```php
// /commands/ExampleController.php
<?php

namespace app\commands;

use app\models\Book;
use yii\console\Controller;
use yii\console\ExitCode;

/**
 * Comando para prueba
 */

class ExampleController extends Controller
{
  /**
   * Suma los valores de los dos parámetros
   * @return int Exit code
   */
  public function actionSuma($a, $b)
  {
    $result = $a + $b;
    printf("%0.2f\n", $result);
    return ExitCode::OK;
  }

  public function actionBooks($file)
  {
    $f = fopen($file, "r");
    while (!feof($f)) {
      $data = fgetcsv($f);
      // print_r($data);
      if (!empty($data[1]) && !empty($data[2])) {
        $book = new Book();
        $book->title = $data[1];
        $book->author = $data[2];
        printf("%s\n", $book->toString());
      }
    }
    fclose($f);
    return ExitCode::OK;
  }
}
```

```sh
php yii example/books local/books.csv
```
En el controlador tenemos dos datos separados, pero en el modelo transformamos los datos en información estableciendo la relación entre título y autor.

</details>  

## ActiveRecord

<details>  

**ActiveRecord** es un patrón de diseño utilizado en el ámbito del desarrollo de software, especialmente en el contexto de aplicaciones que interactúan con bases de datos. 

En este patrón, cada clase representa una tabla en la base de datos. Las clases ActiveRecord proporcionan métodos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) directamente sobre las filas de la base de datos, lo que simplifica la manipulación de datos y mejora la legibilidad del código.

```php
// /models/Book.php
<?php

namespace app\models;

use yii\db\ActiveRecord;

class Book extends ActiveRecord
{

  public static function tableName()
  {
    return 'books';
  }

  public function getId()
  {
    return $this->book_id;
  }

  public function toString()
  {
    return sprintf("(%s) %s", $this->id, strtoupper($this->title));
  }
}
```
```php
// /commands/ExampleController.php
<?php

namespace app\commands;

use app\models\Book;
use yii\console\Controller;
use yii\console\ExitCode;

/**
 * Comando para prueba
 */

class ExampleController extends Controller
{
  /**
   * Suma los valores de los dos parámetros
   * @return int Exit code
   */
  public function actionSuma($a, $b)
  {
    $result = $a + $b;
    printf("%0.2f\n", $result);
    return ExitCode::OK;
  }

  public function actionBooks($file)
  {
    $f = fopen($file, "r");
    while (!feof($f)) {
      $data = fgetcsv($f);
      // print_r($data);
      if (!empty($data[1]) && !empty($data[2])) {
        $book = new Book();
        $book->title = $data[1];
        $book->author_id = 1;

        $book->save();
        printf("%s\n", $book->toString());
      }
    }
    fclose($f);
    return ExitCode::OK;
  }
}
```
</details>  

## ActiveRecord de la clase author

<details>  

**ActiveRecord** nos brinda funciones como find(). Y en este caso es de tipo static, no llamamos a través de una instancia sino a la clase.

El método **find** acepta un arreglo como where. 


```php
// /models/Author.php
<?php

namespace app\models;

use yii\db\ActiveRecord;

class Author extends ActiveRecord
{

  public static function tableName()
  {
    return 'authors';
  }

  public function getId()
  {
    return $this->author_id;
  }
}
```
```php
// /commands/ExampleController.php
<?php

namespace app\commands;

use app\models\Author;
use app\models\Book;
use yii\console\Controller;
use yii\console\ExitCode;

/**
 * Comando para prueba
 */

class ExampleController extends Controller
{
  /**
   * Suma los valores de los dos parámetros
   * @return int Exit code
   */
  public function actionSuma($a, $b)
  {
    $result = $a + $b;
    printf("%0.2f\n", $result);
    return ExitCode::OK;
  }

  public function actionBooks($file)
  {
    $f = fopen($file, "r");
    while (!feof($f)) {
      $data = fgetcsv($f);
      // print_r($data);
      if (!empty($data[1]) && !empty($data[2])) {

        $author = Author::find()->where(['name' => $data[2]])->one();

        if (empty($author)) {
          $author = new Author();
          $author->name = $data[2];
          $author->save();
        }

        $book = new Book();
        $book->title = $data[1];
        $book->author_id = $author->id;

        $book->save();
        printf("%s\n", $book->toString());
      }
    }
    fclose($f);
    return ExitCode::OK;
  }

  public function actionAuthor($author_id)
  {
    $author = Author::findOne($author_id);
    if (empty($author)) {
      printf("Author not found\n");
      return ExitCode::DATAERR;
    }
    printf("Nombre: %s\n", $author->name);
    return ExitCode::OK;
  }
}
```
</details>  

## Relational data: hasOne()

<details>  

Por el momento mantenemos relaciones lógicas entre books y authors. Podemos decir que un book tiene un a author.

```php
// /models/Book.php
<?php

namespace app\models;

use yii\db\ActiveRecord;

class Book extends ActiveRecord
{

  public static function tableName()
  {
    return 'books';
  }

  public function getId()
  {
    return $this->book_id;
  }

  public function getAuthor()
  {
    //                                author.author_id => book.author_id        
    return $this->hasOne(Author::class, ['author_id' => 'author_id'])->one();
  }

  public function toString()
  {
    return sprintf(
      "(%d) %s - %s",
      $this->id,
      $this->title,
      $this->getAuthor()->name
    );
  }
}

```

```php
// /commands/ExampleController.php
<?php

namespace app\commands;

use app\models\Author;
use app\models\Book;
use yii\console\Controller;
use yii\console\ExitCode;

/**
 * Comando para prueba
 */

class ExampleController extends Controller
{
  /**
   * Suma los valores de los dos parámetros
   * @return int Exit code
   */
  public function actionSuma($a, $b)
  {
    $result = $a + $b;
    printf("%0.2f\n", $result);
    return ExitCode::OK;
  }

  public function actionBooks($file)
  {
    $f = fopen($file, "r");
    while (!feof($f)) {
      $data = fgetcsv($f);
      // print_r($data);
      if (!empty($data[1]) && !empty($data[2])) {

        $author = Author::find()->where(['name' => $data[2]])->one();

        if (empty($author)) {
          $author = new Author();
          $author->name = $data[2];
          $author->save();
        }

        $book = new Book();
        $book->title = $data[1];
        $book->author_id = $author->id;

        $book->save();
        printf("%s\n", $book->toString());
      }
    }
    fclose($f);
    return ExitCode::OK;
  }

  public function actionAuthor($author_id)
  {
    $author = Author::findOne($author_id);
    if (empty($author)) {
      printf("Author not found\n");
      return ExitCode::DATAERR;
    }
    printf("Nombre: %s\n", $author->name);
    return ExitCode::OK;
  }

  public function actionBook($book_id)
  {
    $book = Book::findOne($book_id);
    if (empty($book)) {
      printf("Book not found\n");
      return ExitCode::DATAERR;
    }
    printf("%s\n", $book->toString());
    return ExitCode::OK;
  }
}
```

```sh
php yii example/book 88
# (88) El Sanador de Caballos - Gonzalo Giner
```
De esta manera, consultamos un libro y también obtuvimos información sobre al autor (otro modelo). No realizamos selects adicionales o inner join.

</details>  

## Relational data: hasMany()

<details>  

A través de hasOne establecimos la relación entre libro y autor, ahora vamos a establecer la relación inversa (desde un autor qué libros posee).

```php
// /models/Author.php
<?php

namespace app\models;

use yii\db\ActiveRecord;

class Author extends ActiveRecord
{

  public static function tableName()
  {
    return 'authors';
  }

  public function getId()
  {
    return $this->author_id;
  }

  public function getBooks()
  {
    return $this->hasMany(Book::class, ['author_id' => 'author_id'])->all();
  }

  public function toString()
  {
    return sprintf(
      "%s (%d)",
      $this->name,
      count($this->books)
    );
    // $this->books == $this->getBooks()
    // cualquier método que empiece con get, se puede llamar como un atributo sin el get
  }
}
```
```php
// /commands/ExampleController.php
<?php

namespace app\commands;

use app\models\Author;
use app\models\Book;
use yii\console\Controller;
use yii\console\ExitCode;

/**
 * Comando para prueba
 */

class ExampleController extends Controller
{
  /**
   * Suma los valores de los dos parámetros
   * @return int Exit code
   */
  public function actionSuma($a, $b)
  {
    $result = $a + $b;
    printf("%0.2f\n", $result);
    return ExitCode::OK;
  }

  public function actionBooks($file)
  {
    $f = fopen($file, "r");
    while (!feof($f)) {
      $data = fgetcsv($f);
      // print_r($data);
      if (!empty($data[1]) && !empty($data[2])) {

        $author = Author::find()->where(['name' => $data[2]])->one();

        if (empty($author)) {
          $author = new Author();
          $author->name = $data[2];
          $author->save();
        }

        $book = new Book();
        $book->title = $data[1];
        $book->author_id = $author->id;

        $book->save();
        printf("%s\n", $book->toString());
      }
    }
    fclose($f);
    return ExitCode::OK;
  }

  public function actionAuthor($author_id)
  {
    $author = Author::findOne($author_id);
    if (empty($author)) {
      printf("Author not found\n");
      return ExitCode::DATAERR;
    }
    printf("%s\n", $author->toString());
    foreach ($author->books as $book) {
      printf(" - %s\n", $book->toString());
    }
    return ExitCode::OK;
  }

  public function actionBook($book_id)
  {
    $book = Book::findOne($book_id);
    if (empty($book)) {
      printf("Book not found\n");
      return ExitCode::DATAERR;
    }
    printf("%s\n", $book->toString());
    return ExitCode::OK;
  }
}
```

```sh
php yii example/author 88
# Alessandro Baricco (3)
#  - (117) La Esposa joven - Alessandro Baricco
#  - (210) Seda - Alessandro Baricco
#  - (211) Océano mar - Alessandro Baricco
```
</details>  

## Web Controllers

<details>  

Los comandos son controladores que poseen acceso a todo el sistema pero para ejecutarse desde línea de comandos.

Los controladores Web son los controladores por defecto, son los que más utilizaremos. 

Los dos tipos de controladores, tanto los del namespace de command como los del namespace Web son similares y hacen lo mismo pero poseen una diferencia.

- Command Controller: retorna un código numérico que el sistema operativo interpreta como OK, me faltan datos, usuario no tiene permisos, etc.
- Web Controller: retorna un string, que puede ser una frase, o todo el html que el cliente solicitó.

No existe una regla en cuanto a la cantidad de controladores Web, pero podemos crear uno por cada modelo. Crearemos 2, uno para book y otri para author.

Aún no profundizaremos en tema sesiones porque no tenemos usuarios. Pero ya existe una sesion. Una vez que el usuario ingresa al sitio se crea una sesión, así que ya tenemos acceso a ella.

**seFlash** registra en la sesion un mensaje. Recibe dos parámetros. 
- El color que deseamos en el mensaje. Utilizamos bootstrap ya que se encuentra integradoa a yii
- El mensaje

Ej: Yii::$app->session->setFlash('error', "El libro no existe");

Para interactuar desde la parte Web debemos ejecutar un servidor.

```sh
source local/variables_local.sh
php yii serve
```

```php
// /controllers/BookController.php
<?php

namespace app\controllers;

use Yii;
use app\models\Book;
use yii\web\Controller;

class BookController extends Controller
{
  public function actionAll()
  {
    $books = Book::find()->all();
    // foreach ($books as $book) {
    //   echo $book->toString() . "\n";
    // }
    return serialize($books);
  }

  public function actionDetail($id)
  {
    $book = Book::findOne($id);
    if (empty($book)) {
      // return "Book not found";
      // return $this->redirect(['site/index']);
      Yii::$app->session->setFlash('error', "El libro no existe");
      return $this->goHome();
    }
    return $book->title;
  }
}

```

- http://localhost:8080/index.php?r=book/all
- http://localhost:8080/index.php?r=book/detail&id=5

</details>  

## Controller de la clase author

<details>  

```php
// /controllers/AuthorController.php
<?php

namespace app\controllers;

use app\models\Author;
use Yii;
use yii\web\Controller;

class AuthorController extends Controller
{

  public function actionAll($search = null)
  {
    if ($search != null) {
      $authors = Author::find()
        ->where(['like', 'name', $search])
        ->all();
    } else {
      $authors = Author::find()->all();
    }
    return serialize($authors);
  }

  public function actionDetail($id)
  {
    $author = Author::findOne($id);
    if (empty($author)) {
      Yii::$app->session->setFlash('error', "El autor no existe");
      return $this->redirect(['author/all']);
    }
    return $author->tostring();
  }
}

```
- http://localhost:8080/index.php?r=author/all
- http://localhost:8080/index.php?r=author/all&search=Jack
- http://localhost:8080/index.php?r=author/detail&id=45

</details>  

## Enrutamiento y creación de URLS con urlManager

<details>  

Podemos mejorar las urls para que sean más limpias. Para ello yii nos brinda una solución.

Para utilizarla debemos descomentar las siguientes líneas del archivo de configuracion web.php. También agregamos algunas reglas. Ej: cuando se ingrese a la ruta books internamente respondera book/all.

```php
// /config/web.php

  'urlManager' => [
      'enablePrettyUrl' => true,
      'showScriptName' => false,
      'rules' => [
        'books' => 'book/all',
        'book/<id:\d+>' => 'book/detail',
        'authors' => 'authors/all',
        'author/<id:\d+>' => 'author/detail',
        'author/search/<search:\w+>' => 'author/all',
      ],
  ],
```
- http://localhost:8080/books
- http://localhost:8080/authors
- http://localhost:8080/book/5
- http://localhost:8080/authors
- http://localhost:8080/author/search/Jack
- http://localhost:8080/author/45

</details>  

## Views

<details>  

Para desarrollar las vistas Html no utilizaremos ningún framework para frontend.

El **método render** que se ene cuentra dentro de la clase controller, y recibe dos parámetros:
- El nombre del template que vamos a utilizar, podemos obviar la extensión (.php)
- Un arreglo asociativo donde la llave será el nombre de valor que se leerá en la vista y el valor será la variable que tenemos en el controlador.

Cada controlador debería tener su carpeta en Views, y dentro de ella un archivo por cada acción. Los archivos se pueden organizar y llamar como deseemos, pero es buena práctica mantener el mismo sistema de nombramiento de archivos dentro del proyecto. 

Iniciaremos con la vista para mostrar un autor que incluye nombre, cantidad de libros y una lista de libros. Cada elemneto de la lista nos llevará al detalle del libro. 

Para realizar los enlaces yii nos ofrece el **helper Html**. Html es una forma estandar que yii nos ofrece para escribir html normal dentro de código. Dentro de Html tenemos las distintas etiquetas, necesitamos utilizar &lt;a&gt;&lt;/a&gt;, que recibe dos parámetros.
- El texto que contendrá el enlace
- La dirección a donde nos llevará

> Ejemplo: <?= Html::a($book->title, 'https://google.com.ar') ?>

El valor para la url debería ser algo como "http://localhost:8080/...", o el valor de una variable llamada server o dominio, pero yii nos proporciona la funcionalidad para enviar un arreglo ['controller/action', param => value]

```php 
<?= Html::a($book->title, ['book/detail', 'id' => $book->id]) ?> 
```

Crearemos un arvhivo que imprimirá lo que el controlador envíe. Creamos el archivo views/author/detail.php.

```php
// /app/controllers/AuthorController.php
<?php

namespace app\controllers;

use app\models\Author;
use Yii;
use yii\web\Controller;

class AuthorController extends Controller
{

  public function actionAll($search = null)
  {
    if ($search != null) {
      $authors = Author::find()
        ->where(['like', 'name', $search])
        ->all();
    } else {
      $authors = Author::find()->all();
    }
    return serialize($authors);
  }

  public function actionDetail($id)
  {
    $author = Author::findOne($id);
    if (empty($author)) {
      Yii::$app->session->setFlash('error', "El autor no existe");
      return $this->redirect(['author/all']);
    }
    return $this->render('detail', ['author' => $author]);
  }
}

```

```php
// views/author/detail.php

<h1>
  <?= $author->toString() ?>
</h1>

<h2>Libros:</h2>
<ol>
  <?php

  use yii\helpers\Html;

  foreach ($author->books as $book) : ?>
    <li>
      <?= Html::a($book->title, ['book/detail', 'id' => $book->id])  ?>
    </li>
  <?php endforeach; ?>
</ol>
```
</details>  

## Configuración de vistas con Smarty

<details>  

DOC: 
- https://www.smarty.net/
- https://www.yiiframework.com/extension/yiisoft/yii2-smarty

**Smarty** es un template engine que no pertence a yii pero se integra perfectamente. Es muy sencillo, muy potente y nos ayuda a visualizar lo que estamos escribiendo (que será html).

La extensión de los archivos de smarty es **tpl**.

```sh
# Instalamos la extensión
composer require --prefer-dist yiisoft/yii2-smarty
```

Dentro del archivo /config/web.php debemos incorporar la siguiente llave dentro de components.

```php
// /config/web.php
  'components' => [
    ...,
    'view' => [
      'renderers' => [
        'tpl' => [
          'class' => 'yii\smarty\ViewRenderer',
          //'cachePath' => '@runtime/Smarty/cache',
        ],
      ],
    ],
    ...,
  ],
```

Comenzaremos a utilizar smarty en la vista para books, qué listará el listado de todos lso libros.

En smarty todo lo que coloquemos entre llaves se imprimirá.

```php
// /app/controllers/BookController
<?php

namespace app\controllers;

use app\models\Book;
use Yii;
use yii\web\Controller;

class BookController extends Controller
{
  public function actionAll()
  {
    $books = Book::find()->all();
    return $this->render('all.tpl', ['books' => $books]);
  }

  public function actionDetail($id)
  {
    $book = Book::findOne($id);
    if (empty($book)) {
      // return "Book not found";
      // return $this->redirect(['site/index']);
      Yii::$app->session->setFlash('error', "El libro no existe");
      return $this->goHome();
    }
    return $book->title;
  }
}
```

```html
{use class="yii\helpers\Html"}

<h1>Todos los libros</h1>

<ol>
  {foreach $books as $book}
    <li>{Html::a($book->title, ['book/detail', 'id' => $book->id])}</li>
  {/foreach}
</ol>
```
</details>  

## Clase user

<details>  

La clase User viene dentro de la instalación básica. Pero aún no hemos creado la tabla users dentro la base de datos.

Dentro del arhcivo schemas/schemas.sql agregamos la definición de la tabla.

```sql
CREATE table if not exists users (
    user_id integer unsigned auto_increment primary key,
    username varchar(100) unique,
    password varchar(500),
    auth_key varchar(200),
    access_token varchar(200),
    created_at timestamp not null default current_timestamp,
    modified_at timestamp not null default current_timestamp 
      on update current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
```

Modificamos el modelo /models/user.php

```php
// /models/user.php
<?php

namespace app\models;

use yii\db\ActiveRecord;

class User extends ActiveRecord implements \yii\web\IdentityInterface
{
    // public $id;
    // public $username;
    // public $password;
    // public $authKey;
    // public $accessToken;

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        // return isset(self::$users[$id]) ? new static(self::$users[$id]) : null;
        $user = self::findOne($id);
        if (empty($user)) {
            return null;
        }
        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        // foreach (self::$users as $user) {
        //     if ($user['accessToken'] === $token) {
        //         return new static($user);
        //     }
        // }

        // return null;

        $user = self::findOne(['token' => $token]);
        if (empty($user)) {
            return null;
        }
        return $user;
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        $user = self::findOne(['username' => $username]);
        if (empty($user)) {
            return null;
        }
        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->user_id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return $this->password === $this->ofuscatePassword($password);
    }

    public function ofuscatePassword($password)
    {
        if (empty(getenv('salt'))) {
            throw new \Exception('Salt not found');
        }
        return md5(sprintf('%s-%s-%s', $password, $this->username, getenv('salt')));
    }
}

```
</details>  

## Autenticación de usuarios

<details>  

En el paso anterior realizamos la encriptación del password para el login pero no lo hicimos al momento de registrar un usuario.

Yii nos ofrece los **before** y **after**. En cada paso del modelo entre que el user envía la información y se crea el modelo, disponemos de las funciones que se encuentran en la clase Model.

- BeforeValidate
- AfterValidate
- BeforeSave
- AfterSave

A través de estos métodos podemos realizar seguimiento o tratamiento puntual de la información.

En nuestro ejemplo el password se deberá encriptar luego de validar (cantidad de caracteres, etc), y antes de ser guardada. Necesitamos cambiar del texto plano a lo que nos retorne la función ofuscatePassword. 

```php
// /models/user.php
<?php

namespace app\models;

use yii\db\ActiveRecord;

class User extends ActiveRecord implements \yii\web\IdentityInterface
{
    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        // return isset(self::$users[$id]) ? new static(self::$users[$id]) : null;
        $user = self::findOne($id);
        if (empty($user)) {
            return null;
        }
        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        $user = self::findOne(['token' => $token]);
        if (empty($user)) {
            return null;
        }
        return $user;
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        $user = self::findOne(['username' => $username]);
        if (empty($user)) {
            return null;
        }
        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->user_id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return $this->password === $this->ofuscatePassword($password);
    }

    public function ofuscatePassword($password)
    {
        if (empty(getenv('salt'))) {
            throw new \Exception('Salt not found');
        }
        return md5(sprintf('%s-%s-%s', $password, $this->username, getenv('salt')));
    }

    public function beforeSave($insert)
    {
        if ($insert == true) {
            $this->password = $this->ofuscatePassword($this->password);
        }

        return parent::beforeSave($insert);
    }
}

```

Para verificar la encriptación al crear un usuario generaremos un command.

```php
// app/commands/UserController.php
<?php

namespace app\commands;

use yii\console\Controller;
use yii\console\ExitCode;
use app\models\User;

class UserController extends Controller
{

  public function actionNew($name, $password)
  {
    $user = new User();
    $user->username = $name;
    $user->password = $password;
    if ($user->save()) {
      printf("User %s created\n", $user->id);
    } else {
      printf("Error creando user\n");
    }

    return ExitCode::OK;
  }

  public function actionChekPass($name, $password)
  {
    $user = User::findOne(['username' => $name]);
    if (empty($user)) {
      printf("User not found\n");
      return ExitCode::DATAERR;
    }

    if ($user->password == $user->ofuscatePassword($password)) {
      printf("Password correct\n");
    } else {
      printf("Password incorrect\n");
    }
    return ExitCode::OK;
  }
}
```

```sh
php yii user/new mauri hermes
# User 1 created
php yii user/new mauri2 hermes
# User 2 created
```

```sql
mysql> select * from users;
+---------+----------+----------------------------------+----------+--------------+---------------------+---------------------+
| user_id | username | password                         | auth_key | access_token | created_at          | modified_at         |
+---------+----------+----------------------------------+----------+--------------+---------------------+---------------------+
|       1 | mauri    | 677f74006b341c65411770757156529d | NULL     | NULL         | 2024-10-13 10:10:49 | 2024-10-13 10:10:49 |
|       2 | mauri2   | f428fd87556426674501e3c3a8e517a5 | NULL     | NULL         | 2024-10-13 10:11:44 | 2024-10-13 10:11:44 |
+---------+----------+----------------------------------+----------+--------------+---------------------+---------------------+
2 rows in set (0,00 sec)
```

```sh
php yii user/chek-pass mauri hermes
# Password correct
php yii user/chek-pass mauri herme
# Password incorrect
```
</details>  

## Autenticación de usuarios: LoginForm

<details>  

La instalación básica del proyecto, así como trae el modelo User, también trae el modelo **LoginForm**. LoginForm es un modelo, no es ActiveRecord. 

Por otro lado, el usuario (ya logueado) se encuentra en la sesión y en la app. Para ver como funciona vamos a crear un nuevo archivo dentro de site/index.tpl. También mnodificaremos el controlador del sitio para que en lugar de invocar a index.php llame a index.tpl.

```php
// views/index.tpl
{use class='Yii'}
{use class='yii\helpers\Html'}

<h1>Índice del sitio.</h1>

# user de yii, no del modelo <br>
{if Yii::$app->user->isGuest}
Hola invitado, {Html::a('login', ['site/login'])} 
{else}
# User del modelo
Hola {Yii::$app->user->identity->username}
{/if}

<p>Hay {$book_count} libros en el sistema</p>
```
```php
// app/controllers/SiteController.php
 ...
    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        $book_count = Book::find()->count();
        return $this->render('index.tpl', ['book_count' => $book_count]);
    }
  ...  
```
</details>  

## User input

<details>  

Crearemos un controlador para user.

```php
// app/controllers/UserController.php
<?php

namespace app\controllers;

use app\models\User;
use Yii;
use yii\web\Controller;


class UserController extends Controller
{
  public function actionNew()
  {
    $user = new User();

    if ($user->load(Yii::$app->request->post())) {
      if ($user->validate()) {
        if ($user->save()) {
          Yii::$app->session->setFlash('success', "User created");
          return $this->redirect(['site/login']);
        } else {
          throw new \Exception("Error saving user");
          return;
        }
      }
    }

    return $this->render('new.tpl', ['user' => $user]);
  }
}
```

</details>  

## Formulario de login con ActiveForm

<details>  

Yii tiene un concepto llamado **Widgets**, que refiere a código reutilizable desde diferentes puntos de la vista. No importa si es con Smarty o con PHP directamente. 

En el ejemple utilizaremos un llamado **ActiveForm**. Este widget escibe Html, en particular From, type, method, id, etc.

Primeramente agregaremos dos atributos al modelo de usuario, y prepararemos el controlador para que procese la vista. 

```php
// app/models/User
<?php
namespace app\models;

use yii\db\ActiveRecord;

class User extends ActiveRecord implements \yii\web\IdentityInterface
{
    public $password_repeat;
    public $bio;

    public static function tableName()
    {
        return 'users';
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        // return isset(self::$users[$id]) ? new static(self::$users[$id]) : null;
        $user = self::findOne($id);
        if (empty($user)) {
            return null;
        }
        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {

        $user = self::findOne(['token' => $token]);
        if (empty($user)) {
            return null;
        }
        return $user;
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        $user = self::findOne(['username' => $username]);
        if (empty($user)) {
            return null;
        }
        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->user_id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return $this->password === $this->ofuscatePassword($password);
    }

    public function ofuscatePassword($password)
    {
        if (empty(getenv('salt'))) {
            throw new \Exception('Salt not found');
        }
        return md5(sprintf('%s-%s-%s', $password, $this->username, getenv('salt')));
    }

    public function beforeSave($insert)
    {
        if ($insert == true) {
            $this->password = $this->ofuscatePassword($this->password);
        }

        return parent::beforeSave($insert);
    }
}
```

```php
// app/controllers/UserController
<?php
namespace app\controllers;

use app\models\User;
use Yii;
use yii\web\Controller;

class UserController extends Controller
{
  public function actionNew()
  {
    if (!Yii::$app->user->isGuest) {
      Yii::$app->session->setFlash('warning', "You are already logged in");
      return $this->goHome();
    }
    $user = new User();

    if ($user->load(Yii::$app->request->post())) {
      if ($user->validate()) {
        if ($user->save()) {
          Yii::$app->session->setFlash('success', "User created");
          return $this->redirect(['site/login']);
        } else {
          throw new \Exception("Error saving user");
          return;
        }
      }
      $user->password = '';
      $user->password_repeat = '';
    }

    return $this->render('new.tpl', ['user' => $user]);
  }
}
```

```php
{use class="yii\widgets\ActiveForm" type="block"}

<h1>Crear usuario</h1>

{ActiveForm id="new-user" assign="form"}
  {$form->field($user,'username')}
  {$form->field($user,'password')->passwordInput()->label('Contraseña')}
  {$form->field($user,'password_repeat')->passwordInput()}
  {$form->field($user,'bio')->textArea()}
  <input type="submit" value="Guardar" />
{/ActiveForm}
```
</details>  

## Validación de modelo con core validators

<details>  

DOC: https://www.yiiframework.com/doc/guide/2.0/es/tutorial-core-validators

Comenzaremos a trabajar con las validaciones en el modelo, pero antes vamos a incorporar el campo bio a la tabla users en la BD. Para ello, creamos un nuevo archivo dentro de schemas llamado ater.sql.

```sql
/* /schemas/ater.sql */
ALTER TABLE users ADD COLUMN bio TEXT AFTER password;
```
Ya no es necesario mantener el atributo bio dentro del modelo. Se refleja desde la Base de Datos.

```php
// app/models/User
<?php

namespace app\models;

use yii\db\ActiveRecord;

class User extends ActiveRecord implements \yii\web\IdentityInterface
{
    public $password_repeat;

    public static function tableName()
    {
        return 'users';
    }

    public function rules()
    {
        # reglas de validación
        # Bio -> si no posee reglas, aún debe ser incluido en el array
        # El primer valor es el nombre del campo (puede ser un elemento o un array), el segundo es la regla de validación
        # Las reglas se ejecutan en orden
        # Filter no valida, modifca el valor
        return [
            [['username', 'password', 'password_repeat'], 'required', 'message' => 'Requerido'],
            ['username', 'filter', 'filter' => function ($value) {
                $value = trim($value);
                $value = strtolower($value);
                return $value;
            }],
            ['username', 'unique'],
            ['username', 'string', 'min' => 4, 'max' => 100],
            // ['email', 'email'],
            ['password', 'string', 'length' => [4, 50]],
            ['password_repeat', 'compare', 'compareAttribute' => 'password'],
            ['bio', 'default'],
        ];
    }

    public function attributeLabels()
    {
        # etiquetas que veremos en la vista
        return ['username' => 'Usuario', 'password' => 'Contraseña', 'password_repeat' => 'Repetir contraseña'];
    }

    public function attributeHints()
    {
        # ayuda que veremos en la vista
        return [
            'username' => 'Introduce tu nombre de usuario',
            'password_repeat' => 'Repite tu contraseña'
        ];
    }

    ...
```
</details>  

