---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Laravel
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Laravel
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


## Configuración

<details>

DOC https://laravel.com/

**Laravel** es un popular framework de código abierto para el desarrollo de aplicaciones web en PHP. Fue creado en 2011 por Taylor Otwell y desde entonces ha ganado una gran popularidad gracias a su facilidad de uso, su documentación completa y su gran comunidad de desarrolladores.

Entre las características más destacadas de Laravel se encuentran su sistema de enrutamiento, migraciones de base de datos, sistema de plantillas Blade, ORM Eloquent, autenticación integrada y soporte para pruebas automatizadas.

Laravel utiliza una sintaxis elegante y expresiva para escribir código y proporciona herramientas para mejorar la seguridad y el rendimiento de las aplicaciones.

En resumen, Laravel es una excelente opción para aquellos que buscan un framework fácil de aprender, potente y bien documentado para el desarrollo de aplicaciones web en PHP.

**Requerimientos**

- PHP
- Composer
- Instalador de Laravel
- NPM
- Base de datos
- Apache

### Instalación de PHP y Laravel 9 en Ubuntu

Para instalar **Laravel 9** en Ubuntu primero debemos disponer como mínimo con > PHP en la versión 8.0 instalada en nuestro ordenador, para instalarlo debemos disponer de una lista de repositorios instalado, para esto usamos software-properties-common, la mayoría de ordenadores con Ubuntu disponen de esto por defecto pero por si nos hace falta ejecutamos esto en consola:

```sh
$ sudo apt install software-properties-common
```

Agregamos el repositorio de PHP de Ondřej Surý, el desarrollador principal de PHP y Debian, esto para que todas las versiones de PHP estén disponibles para su instalación:

```sh
$ sudo add-apt-repository ppa:ondrej/php -y
```

Luego actualizamos nuestra lista de repositorios APT actuales:

```sh
$ sudo apt update && sudo apt upgrade
```

La última versión de PHP ya estará disponible para instalarlo con todas sus dependencias (basadas en Apache), proseguimos con la instalación de una vez con:

```sh
$ sudo apt install php
```

Podemos comprobar que se instaló la última versión de PHP (en este momento es la 8.1) con lo siguiente:

```sh
$ php -v
```

Debemos constar de que PHP tenga ciertos módulos los cuales se específican acá, esto se comprueba con lo siguiente en la terminal:

```sh
$ php -m
```

Generalmente los módulos que suelen faltar son los siguientes:

```sh
bcmath
curl
dom
mbstring
xml
```

La instalación de cada uno de estos módulos se realizan mediante APT, como ejemplo vamos a instalar bcmath:

```sh
$ sudo apt install php-bcmath
```

Lo siguiente será instalar Composer, pegamos todo esto en consola:

```sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

php composer-setup.php

php -r "unlink('composer-setup.php');"
```

La instalación se realizará como composer.phar en el directorio personal, es recomendable moverlo a /usr/local/bin/composer:

```sh
$ sudo mv composer.phar /usr/local/bin/composer
```

Creación y ejecución de proyecto en Laravel 9
Ya estamos listos para emplear Laravel, podemos crear un proyecto de Laravel 9 de nombre primer-proyecto así:

```sh
$ composer create-project laravel/laravel primer-proyecto
```

Para ejecutar el proyecto nos ubicamos en el directorio en donde hemos lo creado:

```sh
$ cd primer-proyecto/
```

Y procedemos con levantar el servidor así:

```sh
$ php artisan serve
```

Por defecto el proyecto se montará en la dirección 127.0.0.1:8000.

Como extra podemos ejecutar Visual Studio Code en el mismo directorio para trabajar directamente con:

```sh
$ code .
```

### Crear proyecto

```sh
# Crear proyecto a través de componser
composer create-project laravel/laravel:^9.0 example-app

# o

# Crear proyecto a través del instalador de Laravel
composer global require laravel/installer
laravel new example-app

cd example-app
php artisan serve
```
</details>

## Estructura principal de Laravel

<details>

- APP: Aqui viviró todo nuestro codigo principal.
- Bootstrap: Utilizada por laravel para mejorar el rendimiento
- config: Cada paquete que se instale. Se genera un archivo que se puede editar y modificar.
- Database : Carpeta principal de las bases de datos
  - a. migrations : Archivos con la estructura principal para desarrollar tablas.
  - b. factories: nos permite desarrollar datos falsos para probar aplicacion
  - c. seeders: encargada de ejecutar los factories que desarrollemos
- lang: idioma
- public: punto de acceso a web.
- resources: archivos originales css, javascript y vistas. En public están los compilados.
- routes: configuramos rutas. Trabajaremos principalmente en web.php. 
- storage: elementos generados por laravel. cache o si usuario guarda muchos archivos se pueden guardar ahí. 
- test: Pruebas
- vendor: Nose toca esta carpeta. Ahí se ve todo lo que se instala con composer.

</details>

## Uso de Artisan en Laravel: Comandos y Funciones

<details>

**Artisan** es la interfaz de línea de comandos incluida con Laravel, para ver una lista de todos los comandos Artisan disponibles podemos utilizar el **comando list**:

```sh
php artisan list
```

**Laravel Tinker** permite interactuar con toda su aplicación Laravel en la línea de comando, incluidos sus modelos, trabajos, eventos y más de Eloquent.

Para ingresar al entorno Tinker, ejecute el comando:

```sh
php artisan tinker
```

**Artisan** es la herramienta de interfaz de línea de comandos (CLI) que viene integrada con el marco de Laravel. Proporciona una amplia gama de comandos útiles que agilizan varias tareas de desarrollo y ayudan a administrar su aplicación Laravel. Los comandos de Artisan cubren tareas relacionadas con andamios, administración de bases de datos, administración de paquetes y más.

Los propósitos de Artisan en Laravel son:

- Generación de código y andamiaje: los comandos de Artisan le permiten generar código repetitivo para varias partes de su aplicación, como controladores, modelos, migraciones y más. Esto acelera el desarrollo al proporcionar un punto de partida para su código.
- Administración de base de datos: Artisan proporciona comandos para administrar la base de datos de su aplicación, incluida la creación y ejecución de migraciones, la inicialización de la base de datos con datos de muestra y la reversión de migraciones si es necesario.
- Gestión de caché y configuración: puede borrar y gestionar la caché de la aplicación, así como ver y modificar los ajustes de configuración mediante los comandos de Artisan.
- Automatización de tareas: los comandos de Artisan se pueden usar para automatizar tareas recurrentes, como enviar correos electrónicos, programar trabajos usando la programación de trabajos integrada de Laravel y más.
- Visualización de rutas y lista de rutas: puede enumerar e inspeccionar las rutas definidas en su aplicación mediante los comandos de Artisan, lo que le ayuda a realizar un seguimiento de los puntos finales de su aplicación.
- Generación de documentación: algunos paquetes y herramientas le permiten generar documentación de API a partir de los comentarios de su código, lo que brinda una mejor perspectiva de las API de su aplicación.
- Comandos personalizados: puede crear sus propios comandos personalizados de Artisan para realizar tareas específicas de su aplicación.
- Pruebas y depuración: los comandos de Artisan son útiles para ejecutar pruebas, generar andamios de prueba y realizar tareas de depuración.

El uso de los comandos de Artisan a través de la terminal suele ser más rápido y eficiente que realizar las mismas tareas manualmente o mediante una interfaz gráfica. Es una herramienta esencial que mejora la experiencia de desarrollo en proyectos de Laravel al proporcionar una forma estandarizada de ejecutar tareas comunes y mantener la aplicación de manera eficiente.

Podemos crearle un alias a psp artisan. 

```sh
nano ~/.zshrc 
# o  
nano ~/.bashhrc

alias art="php artisan"
```
</details>

## Manejo de Solicitudes HTTP en PHP

<details>

**Routes** Nuestro trabajo comienza en el desarrollo y definición de las rutas (routes), estas son unas de las capas mas importantes en el Framework debido a que el route se encarga de manejar el flujo de solicitudes y respuestas, desde y hacia el cliente.

La **carpeta Routes** está compuesto por: 

- api.php: Aquí se definen todas las rutas de la APIs que puedan tener nuestra app. 
- channels.php: Aquí se definen los canales de transmisión de evento (ej. notificaciones en tiempo real). 
- console.php: en este archivo definimos comando de consola. 
- web.php: Aquí se definen las rutas de nuestra aplicación web (HTTP).

</details>

## Uso de Blade para Crear Vistas en Laravel

<details>

**Blade** es un motor de plantillas de Laravel que nos permite escribir de forma limpia en nuestras vistas.

Para retornar una vista en lugar de texto, en el archivo /routes/web.php utilizamos una función llamada view('home'), y como parámetro enviamos el nombre de la vista.

Para pasar información a la vista podemos utilizar un array. 

```php
// routes.php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return view('home');
});

Route::get('blog', function () {
  // Consulta a la BD

  $posts = [
    ['id' => 1, 'title' => 'PHP', 'slug' => 'php'],
    ['id' => 2, 'title' => 'Laravel', 'slug' => 'laravel']
  ];

  return view('blog', ['posts' => $posts]);
});

Route::get('blog/{slug}', function($slug) {
  // Consulta a la BD

  $post = $slug;
  return view('post', ['post' => $post]);
}) 
```

Cada una de estas vistas debe existir en la carpeta /ressources/views. Ejemplo:

```php
// /ressources/views/home.blade.php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1>Listado</h1>

  // Sintaxis de Blade. 
  // Los nombres archivos deben finalizar con .blade.php
  @foreach($posts as $post)
    <p>
      <h2>{{ $post->['id'] }}</h2>
      <a href="">{{ $post->['title'] }}</a>
    </p>
  @endforeach
</body>

</html>  
```

</details>

## Configuración de Plantillas para Vistas Reutilizables en Laravel

<details>

Utilizaremos plantillas para reducir el código en nuestras vistas. Los templates nos permiten tener archivos pequeños de fácil administración, con poco código. 

- Creo un archivo template.blade.php utilizamos la directiva @yield('content')
- En el archivo donde deseo utilizar él, template, extiendo @extends('template')
- Posterior ya puedo utilizar él, template usando @section('content')

Cuando utilizas la directiva @yield en una plantilla Blade, estás creando un espacio en blanco que será llenado por una vista que extienda esa plantilla. La vista que extiende la plantilla puede entonces sobrescribir ese espacio en blanco con su propio contenido.

```php
// /ressources/views/template.blade.php
<html>
    <head>
        <title>@yield('title')</title>
    </head>
    <body>
      
      <p>
        <a href="{{ route('home')}} ">Home</a>
        <a href="{{ route('blog')}} ">Blog</a>
      </p>
      
      @yield('content')
    </body>
</html>
```

```php
// extendemos el template
@extends('layout')  

@section('title', 'Mi Página de Inicio')@endsection

@section('content')
    <h2>Bienvenido a mi sitio web</h2>
    <p>Este es el contenido de mi página de inicio.</p>
@endsection
```

Si deseamos utilizar enlaces, podemos nombrar las rutas en el archivo web.php.

```php
Route::get('/', function () {
    return view('home');
})->name('home');
```
</details>

## Controladores en Laravel: Gestión de Rutas y Peticiones

<details>

Los controladores nos permiten aislar la lógica de las rutas. Los controladores se encuentran /App/Http/Controllers.

Podemos generar el código base de un controlador a través de:

```sh
php artisan make:controller PageController 
```

Para tener control sobre las rutas que vamos creando, con este comando de artisan podemos ver que rutas estan registradas.

```sh
php artisan route:list
```

Filtrar rutas que compienzen por alguna palabra asi:

```sh
php artisan route:list --path=blog
php artisan route:list --path=articles
```
Esconder las rutas de paquetes de terceros (esta es muy util, para ver solamente las rutas que hemos creado)

```sh
php artisan route:list --except-vendor
```

Ejemplo:

```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller 
{
  public function home()
  {
    return view('home');
  }

  public function blog()
  {
    $posts = [
      ['id' => 1, 'title' => 'PHP', 'slug' => 'php'],
      ['id' => 2, 'title' => 'Laravel', 'slug' => 'laravel'];

      return view('blog', ['posts' => $posts]);
    ]
  }
  public function post($slug)
  {
    // Consulta a la BD

    $post = $slug;
    return view('post', ['post' => $post]);
  }
}
```

Dentro de /routes/php.web

```php
use App\Http\Controllers\PageController;
...

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('blog', [PageController::class, 'blog'])->name('blog');
Route::get('blog/{slug}', [PageController::class, 'post'])->name('post');
...

# Otra forma de escribirlo es a través de grupos
Route::controller(PageController::class)->group(function () {
  #           route, method 
  Route::get('/', 'home')->name('home');
  Route::get('blog', 'blog')->name('blog');
  Route::get('blog/{slug}', 'post')->name('post');
}) 
```
</details>

## Cómo Crear Migraciones en Laravel

<details>
Las migraciones son una estructura inicial de nuestras tablas. Una migración es un archivo, que nos permite tener un registro detallado de los cambios en la base de datos.

Las migraciones se encuentran en /app/database/migrations. El nombre del arhivo incluye la fecha y hora de creación. A este sistema se lo conoce como control de versiones de Base de Datos.

Adentro del archivo de migración se encuentra definido el schema de la tabla. No trabajamos directamente con la BD, trabajamos con estos archivos. El único requisito es disponer una base de datos vacía.

Las migraciones nos permiten compartir nuestro proyecto con otras personas. No necesitamos exportar Base de Datos, exportar schemas, y luego realizar las importaciones. Todo lo realizamos a través de código PHP. Cuando otras personas decidan utilizar el proyecto ejecutan las migraciones y ya poseen la base de datos generada. 

### Conección a la base de datos

Dentro del archivo .env definimos:

```sh
# .env
...
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=proyecto
DB_USERNAME=root
DB_PASSWORD=
...

```

## Ejecución de migraciones

```sh
php artisan migrate
```

El proceso se conecta a la BD a partir de la información del .env y ejecuta cada una de las migraciones.

### Creando una migración

```sh
# Crea la migración con los métodos up y down
# php artisan make:migration posts

#  Crea la migración con los métodos up y down, pero contiene la definción inicial del schema,
# que incluye el atributo id y los campos timestamps (create y update) de la tabla.
php artisan make:migration create_posts_table
```

```php
// 2024_03_10_082826_create_posts_table.php
...
return {
  public function up() {
    Schema::create('posts', function(Blueprint $table)) {
      $table->id();

      $table->string('title');
      $table->string('slug')->unique();
      $table->text('body');

      $table->timestamps();
    }
  }

  public function down() {
    Schema::dropIfExists('posts');
  }
}
```

Cuando corramos el comando de ejecución de migraciones solo se ejecutará la creación de la tabla posts, ya que las anteriores ya corrieron. Laravel lleva un control sobre la ejecución de migraciones.

```sh
php artisan migrate
```

El método down nos permite regresar de versión. Revierte la migración.

</details>

## Cómo Crear Modelos en Laravel

<details>

Los modelos son clases, archivos que representan a una tabla. Nos permite realizar consultas sobre la tabla que creamos a través de las migraciones. La migración crea la estructura de la tabla, pero para manejar la tabla (datos) necesitamos un modelo.

Los modelos o entidades viven en /app/Models. Laravel nos disponibiliza el modelo User.php como ejemplo.

### Creando un modelo

A parte de generar el modelo, artisan, posee opciones para generar distintos recursos como los factories, migraciones, seeders, etc.

```sh
php artisan make:model Post -fc
# Opciones 
# -a, --All         -> crea la migracion, seeder, factory, policity, controller, etc
# -c, --controller  -> controller
# -m, --migration   -> migration
# -f, --factory     -> factory

# Model created successfully.
# Factory created successfully.
# Controller created successfully.
```

Los factories viven en /app/database/factories. Las factories nos permiten definir datos falsos. Utilizar una estructura principal para crear información de ejemplo.

```php
// PostFactory.php
<?php

namespace Database\Factories;

use Illuminate\Supporte\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory {
  public function definition () {
    return [
      # 'title' => $this->faker->sentence(),
      'title' => $title = $this->faker->sentence(),
      # 'slug' => $this->faker->sentence(),
      'slug' => Str::slug($title),
      'body' => $this->faker->text(2200),
    ]
  }
}
```

Ahora podemos modificar el arhcivo semilla (seeder).

```php
// /app/database/seeders/DatabaseSeeder.php
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
  public function run() {
    \App\Models\User::factory()->create();
    \App\Models\Post::factory(80)->create();
  }
}
```
Finalmente, podemos re-ejecutar las migraciones pero indicando que deben incluirse las factories (seeders). 

```sh
php artisan migrate:refresh --seed
```
</details>

## Manejo de Datos con Eloquent en Laravel

<details>

**Eloquent** es una herramienta (ORM) proporcionada por Laravel y nos permite administrar de manera sencilla nustras bases de datos. Uitlizamos sintaxis Eloquent, no trabajamos con sentencias sql.

El ORM nos permite trabajar con objetos.

Para poder usar eloquent se tiene que importar el modelo de la clase que vamos a consultar con la sentencia use App\Models\nombreModelo donde el nombreModelo es modelo que vamos a utilizar, y para manejar las consultas se debe poner la lógica en el controlador por lo tanto es allí donde debemos importar el modelo.

Algunas sentencias importantes de eloquent son:

- nombreModelo::get(): trae todos los registros de la base de datos.
- nombreModelo::first(): trae el primer registro de nuestra base de datos.
- nombreModelo::find(id): trae el registro especificado.
- nombreModelo::latest('columna'): ordena de menor a mayor los registros de la columna especificada.

- paginate(número_registros_por_pagina) este se le puede poner a todas las sentencias que tragan varios registros para paginar todos los registros que traga según un número especificado.

El objeto a resultante de la paginación tiene un método llamado ->link() el cual el cual nos imprime la paginación en pantalla, los elementos que nos da son:

- ̇« Previous: el cual nos permite ir a la página anterior
- Next »: el cual nos permite el a la página siguiente
- Showing x to x of x result el cual nos dice desde que número de registro vemos hasta cual vemos y cuantos registros hay en total
- ícono de anterior: el cual nos permite ir a la página anterior
- ícono de siguiente: el cual nos permite ir a la siguiente página
- paginas que existen: es una enumeración de páginas para decirnos en qué número de página estamos.

</details>

## Configuración de Relaciones entre Tablas con Eloquent

<details>

Las relaciones entre tablas nos permiten identificar relaciones de datos, por ejemplo: qué usuario creo una publicación. Un usuario posee muchas publicaciones, y una publicación pertenece a un usuario.

```php
// 2024_03_10_082826_create_posts_table.php
...
return {
  public function up() {
    Schema::create('posts', function(Blueprint $table)) {
      $table->id();

      # definimos el nuevo campo en la tabla
      $table->unsignedBigInteger('user_id');

      # definimos la relación a user
      $table->foreign('user_id')->references('id')->on('users');

      $table->string('title');
      $table->string('slug')->unique();
      $table->text('body');

      $table->timestamps();
    }
  }

  public function down() {
    Schema::dropIfExists('posts');
  }
}
```

```php
// PostFactory.php
<?php

namespace Database\Factories;

use Illuminate\Supporte\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory {
  public function definition () {
    return [
      'user_id' => 1,
      # 'title' => $this->faker->sentence(),
      'title' => $title = $this->faker->sentence(),
      # 'slug' => $this->faker->sentence(),
      'slug' => Str::slug($title),
      'body' => $this->faker->text(2200),
    ]
  }
}
```
```sh
php artisan migrate:refresh --seed
```

Indicamos la relación en el modelo.

```php
// app/Models/Post.php
<?php

namespace \App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Models {
  use HasFactory;

  public function user() {
    return $this->belongsTo(User::class);
  }

}
```
</details>

## Inicio de sesión

<details>

Un sistema de login nos permitirá tener un área administratitiva y un área publica. 

Laravel nos proporciona una herramienta que nos permite instalar componenetes. Podemos instalar Breeze en desarrollo para activar el inicio de sesion.

```sh
composer require laravel/breeze --dev

# Verificamos la instalación 
php artisan
# en el listado debe aparecer el comnando breeze

php artisan breeze:install
# Descargamos el js, css del lado cliente
# Crea node_modules
npm install
# Genera en public el compilado de css y js 
npm run dev
```

En los archivos  .php podemos ver si estamos logueados o no a través de @auth.

```php
...
<p>
  <a href="{{  route('hmoe') }}">Home</a>
  <a href="{{  route('blog') }}">Blog</a>
</p>

@auth
  // Si estamos logueados tenemos acceso al Dashboard
  <a href="{{  route('dashboard') }}">Dashboard</a>
@else
  <a href="{{  route('login') }}">Login</a>
@endauth
...
```

Si hacemos click en Login, nos dirigimos a http://localhost/login ya disponemos de la página. Ya podemos iniciar sesion. 

</details>

## Sistema de inicio de sesión

<details>

El componente de inicio de sesión que instalamos modificó el archivo web.php para agregar las rutas de login, register, etc. Agregó la línea <code>require __DIR__."/auth.php"</code>.

También creó las carpetas css y js en /resources, que luego será tomado por webpack para compilarlos y dejarlos en /public. 

Finalmente, también en /resources/views creo la carpeta auth para dejar allí las vistas para la sesión (login, register, forgot pass, etc).

</details>

