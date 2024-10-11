---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Introducción a Frameworks de PHP
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Introducción a Frameworks de PHP
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

## Un proyecto en PHP

<details>

A un proyecto de PHP, podemos crearlo con un **framework**. 

Un framework nos permite **no volver a crear la rueda**.

Si hacemos todo desde cero, demoraríamos mucho tiempo, el framework, nos agiliza el trabajo, porque todo viene configurado como: conexiones,plantillas,etc. Sin descuidar la seguridad y rendimiento.

Nos permite enfocarnos en la necesidad y no tanto en la arquitectura del software.

</details>

## Frameworks PHP

<details>

Los frameworks como **Symfony** y **Laravel** para PHP, sus características notables son:

- Administración de plantillas.
- Manejo fácil y sencillo de una conexión a una DB.
- Funciones pre-hechas.
- Sistema de testing.
- Caché para aumentar el rendimieto.
- Maneja un estándar para la creación de archivos y carpetas.

Utilizar frameworks habla de mi dominio del lenguaje y de mis buenas prácticas de escritura de código.

EL MISMO FRAMEWORK, NOS PERMITE APRENDER LOS ESTÁNDARES PROFESIONAL. Aprender un framework como laravel, nos permite integrarnos a un equipo que maneja este framework de manera rápida, porque todos trabajan bajo el mismo estándar.

La principal característica notable es: Ya hay una estructura de manejo de carpetas o directorios del proyecto.

</details>

## Estructura de carpetas

<details>

Crearemos un proyecto utilizando una estructura similar a la que utilizan los frameworks como Laravel. 

La estructura que utilizaremos es la siguiente:

```sh
        |-- app
        |   |-- Http
        |   |   |-- Controllers
        |   |   |   |-- ContactController.php
        |   |   |   `-- HomeController.php
        |   |   |-- Request.php
        |   |   `-- Response.php
        |   `-- helpers.php
        |-- composer.json
        |-- public
        |   `-- index.php
        |-- vendor
        |   |-- autoload.php
        |   `-- composer
        |       |-- ClassLoader.php
        |       |-- LICENSE
        |       |-- autoload_classmap.php
        |       |-- autoload_files.php
        |       |-- autoload_namespaces.php
        |       |-- autoload_psr4.php
        |       |-- autoload_real.php
        |       `-- autoload_static.php
        `-- views
            |-- contact.php
            |-- home.php
            `-- layout.php
```            

Creamos el proyecto a través de composer para utilizar el sistema de autocarga.

```sh
sudo mkdir -p /var/www/intro-frameqorks.test
sudo chown -R $USER:$USER /var/www/intro-frameqorks.test
cd /var/www/intro-frameqorks.test
composer init
                                            
  Welcome to the Composer config generator  
                                            
This command will guide you through creating your composer.json config.

Package name (<vendor>/<name>) [mauricio/intro-frameqorks.test]: 
Description []: Proyecto básico
Author [mauricio <jourdanmauricio@gmail.com>, n to skip]: 
Minimum Stability []: 
Package Type (e.g. library, project, metapackage, composer-plugin) []: 
License []: 

Define your dependencies.

Would you like to define your dependencies (require) interactively [yes]? no
Would you like to define your dev dependencies (require-dev) interactively [yes]? no
Add PSR-4 autoload mapping? Maps namespace "Mauricio\IntroFrameqorksTest" to the entered relative path. [src/, n to skip]: n

{
    "name": "mauricio/intro-frameqorks.test",
    "description": "Proyecto básico",
    "authors": [
        {
            "name": "mauricio",
            "email": "jourdanmauricio@gmail.com"
        }
    ],
    "require": {}
}

Do you confirm generation [yes]? 

```

```json
// composer.json
{
    "name": "mauricio/intro-frameqorks.test",
    "description": "Proyecto básico",
    "authors": [
        {
            "name": "mauricio",
            "email": "jourdanmauricio@gmail.com"
        }
    ],
    "require": {},
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        },
        "files": [
            "app/helpers.php"
        ]
    }
} 
```

```sh
composer dump
```

Aún no aparece composer.lock porque no hemos instalado paquetes adicionales.

```sh
mkdir app
mkdir views
touch views/home.php
touch views/layout.php
mkdir public
touch public/index.php
touch app/helpers.php
mkdir app/Http
touch app/Http/Request.php
touch app/Http/Response.php
mkdir app/Http/Controllers
touch app/Http/Controllers/HomeController.php
```
</details>

## Front Controller

<details>

Es un patrón que nos ayuda a solucionar el problema de acceso único en la web. Este se utiliza para proporcionar un mecanismo centralizado para manejar solicitudes, todas las solicitudes son procesadas por un solo controlador. 

El controlador puede realizar la autenticación / autorización / registro o solicitud de seguimiento, entonces la petición al controlador adecuado.

En este caso, vamos a lograr que todos pase a través de index.php, así centralizaremos los accesos. Además, ya no necesitaremos tener un sistema lleno de include para incluir cabeceras o footers.

Esto es todo lo que contendrá el archivo index. Este va a cargar todo lo necesario, luego va a disponer de la clase Request porque lo registramos en composer, este va a ejecutar el método enviar.

```php
// public/index.php
<?php

require __DIR__ . '/../vendor/autoload.php';

$request = new App\Http\Request;
$request->send();
```
**Resumen**: Básicamente es centralizar todas las peticiones.

</details>

## Request

<details>

Vamos a trabajar en las peticiones del cliente, sobre el **request**.

Los namespaces proporcionan una forma de agrupar clases, interfaces, funciones y constantes relacionadas.


```php
// app/Http/controllers/request.php
<?php

namespace App\Http;

class Request
{
  protected $segments = [];
  protected $controller;
  protected $method;

  public function __construct()
  {
    $this->segments = explode('/', $_SERVER['REQUEST_URI']);

    $this->setController();
    $this->setMethod();
  }

  public function setController()
  {
    $this->controller = empty($this->segments[1])
      ? 'home'
      : $this->segments[1];
  }

  public function setMethod()
  {
    $this->method = empty($this->segments[2])
      ? 'index'
      : $this->segments[2];
  }

  public function getController()
  {
    // colocamos la primera letra en mayúscula
    $controller = ucfirst($this->controller);
    return "App\Http\Controllers\\{$controller}Controller";
  }

  public function getMethod()
  {
    return $this->method;
  }

  public function send()
  {
    $controller = $this->getController();
    $method = $this->getMethod();

    // call_user_func -> permite ejecutar una función de usuario
    $response = call_user_func([new $controller, $method]);

    try {
      if ($response instanceof Response) {
        $response->send();
      } else {
        throw new \Exception("Error Processing Request");
      }
    } catch (\Exception $e) {
      echo "Detalle: {$e->getMessage()}";
    }
  }
}
```

En resumen, lo que hace la clase Request es obtener de la URL, qué es lo que el usuario quiere visualizar, entonces, de manera dinámica esta clase busca los controladores necesarios para servirle la respuesta al usuario, realmente lo que se hace es concatenar el controlador pasado en la URL con la palabra Controller para crear el nombre del archivo que debemos mandar 

```sh
# Ejecución del proyecto
php -S localhost:8000 -t public/
```

</details>

## Response

<details>

Al igual que la clase Request se encargaba de deducir de forma dinámica que es lo que el usuario necesita, la clase Response se está encargando de deducir de igual manera de forma dinámica, dependiendo del request, qué archivo o qué respuesta tiene que enviar, en este caso, busca cuál es la vista que necesita enviar y lo hace de manera dinámica 

**Ciclo de Petición → Proceso → Respuesta**

- El sistema arranca en el index.php el cual es la vista de entrada del usuario.
- El usuario comienza una petición y se dispara la clase Request.
- La clase Request ejecuta un controlador y un método del mismo en base a la solicitud del usuario.
- Es método de ese controlador tiene que ser una configuración de la clase Response para servirle al usuario de una vista, array, json o pdf que necesite.


- Conocer un lenguaje de programación : sintaxis y funciones propias del lenguaje.
- Saber programación: ingeniería de software, patrones de diseño, programación modular, programación, buenas practicas, etc.
- Uso de Frameworks como herramienta profesional y estandarizada.

```php
// app/Http/Response.php
<?php

namespace App\Http;

class Response
{
  protected $view; // Por ahora solo retornarmos vistas, pero podríamos retornar: array, json, pdf..

  public function __construct($view)
  {
    $this->view = $view; //ejecuta la vista home o la que tengamos
  }
  
  public function getview()
  {
    return $this->view;
  }

  public function send()
  {
    $view = $this->getview();
    // home se guarda en contents
    $content = file_get_contents(__DIR__ . "/../../view/$view.php");

    require __DIR__ . "/../../layout.php";
  }
}
```
</details>

## Controllers

<details>

Un controlador, como su nombre lo dice, es una clase que se encarga de hacer todo el procesamiento del request del usuario, ahí es en donde en la mayoría de las veces ejecutaremos la lógica, y por su puesto, se retorna el resultado, en este caso, una vista.

Como se retorna una instancia de Response, entonces tenemos acceso a todos los datos de la vista que mandamos desde la misma clase.

```php
// app/Http/Controllers/HomeController.php
<?php

namespace App\Http\Controllers;

use App\Http\Response;

class HomeController
{
  public function index()
  {
    return new Response('home');
  }
}
```
</details>

## Views

<details>

```html
<!-- views/layout.php -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sitio Web</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

</head>

<body>
  <nav class='navbar navbar-expand-lg navbar-light bg-light'>
    <div class='container'>
      <a class='navbar-brand h1' href='/'>FW</a>
    </div>
  </nav>

  <div class='container'>
    <div class="row">
      <?php echo $content; ?>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
  </script>
</body>

</html>
```
```php
// /views/home.php
<div class="col-8">
  <h1>Página Home</h1>
  <p>Bienvenido a la página de inicio</p>
  <p>Este es un ejemplo de una aplicación web simple con PHP y el patrón de diseño MVC</p>
  <p>Para ver la lista de usuarios, haga clic en el enlace Usuarios en la barra de navegación</p>
</div>
```
</details>

## Helpers

<details>

Los helpers son muy útiles en los proyectos, y más si los usamos con composer, porque ya composer se encarga de requerir a los helpers en nuestros archivos, y nosotros solo tenemos que usarlos.

Y usualmente, al ser funciones, suelen ser mucho más fáciles de recordar y usar.

No obstante, ustedes también pueden definir sus propios helpers en frameworks como Laravel usando funciones comunes que les guste tener en sus proyecto y que les ayuden en la resolución de problema.

Los helpers en son funciones de utilidad incorporados que puedes llamar desde cualquier parte dentro de tu aplicación. Si no han sido provistas por el núcleo del framework, Pueded desarrollar una propia.

A pesar de que el núcleo de los frameworks ya provee una variedad de helpers, siempre existe una oportunidad de que necesites una propia y quisieras desarrollar una asi no necesitas repetir el mismo código aquí y haya, y de este modo reforzando una mejor mantenibilidad.

Crearemos un helper para que utilicen los controladores al momento de retornar una vista.

```php
// app/helpers.php
<?php

if (! function_exists('view')) {
  function view($view)
  {
    return new App\Http\Response($view);
  }
}

if (! function_exists('viewPath')) {
  function viewPath($view)
  {
    return __DIR__ . "/../views/$view.php";
  }
}
```

```php
// app/Http/Controllers/HomeController.php
<?php

namespace App\Http\Controllers;

class HomeController
{
  public function index()
  {
    return view('home');
  }
}
```

```php
// app/Http/Response.php
<?php

namespace App\Http;

class Response
{
  protected $view; // Por ahora solo retornarmos vistas, pero podríamos retornar: array, json, pdf..

  public function __construct($view)
  {
    $this->view = $view; //ejecuta la vista home o la que tengamos
  }

  public function getview()
  {
    return $this->view;
  }

  public function send()
  {
    $view = $this->getview();
    // file_get_contents -> Lee el contenido de un archivo en un string
    $content = file_get_contents(viewPath($view));

    require viewPath('layout');
  }
}
```
</details>

## Repaso final

<details>

Todo arranca en el index.php, este se encarga de llamar a nuestra clase Request, esta clase a su vez, se encarga de cargar el controlador necesario de manera dinámica dependiendo de lo que el usuario haya pasado por la URL, ya que logró identificar cuál es el controlador que tiene que llamar, simplemente lo llama, y esta clase está esperando que dicho controlador retorne una instancia de Response para poder mandar la vista.

Response por su parte, dependiendo de lo que hayas establecido en el controlador, se encarga de buscar cuál es la vista que tiene que envíar y cargarla en una variable, para posteriormente imprimir esa variable dentro del template y así cargar de manera dinámica las páginas que van a conservar una estructura HTML en común siempre. Obviamente nuestro controlador retornará una instancia de Request indicando cuál es la vista que queremos.

Y para facilitar todavía más las cosas, podemos usar helpers que se encarguen del "trabajo sucio".

</details>

## Los frameworks modernos

<details>

Utiliza herramientas profesionales para tener un mejor resultado.

Los frameworks modernos ayudan a aprender mucho de PHP para poder utilizarlos de manera correcta.

En los frameworks todo gira entorno a:

- Petición
- Procesamiento
- Respuesta

</details>

## Ventajas de usar frameworks

<details>

Hoy en día los frameworks son la mejor herramienta que tenemos a la mano como programadores, es la opción que debemos usar siempre. La estructura que aprendimos se presenta como una estructura de carpetas sólida y segura, esto te ayudará a responder el “porqué” de muchas cosas respecto a Laravel, Symfony y otros frameworks.

Estos ofrecen una estructura sencilla, útil y muy robusta aprobada por la mayoría de las personas en la comunidad. El único objetivo aquí es enseñarte todo lo necesario para entender a un framework como Laravel o Symfony, estos breves textos, clases y conceptos te darán la orientación necesaria para que puedas extender, comprender y adaptar de mejor manera estos frameworks modernos a tu necesidad única y particular.

Siempre hemos tenido dudas respecto a dónde colocar los archivos fuentes de Javascript, imágenes, archivos finales de Javascript, archivos fuentes de CSS y archivos procesados de CSS, paquetes externos y separación de lógica, vista, controladores, etc. La idea es aprender de estas grandes herramientas y seguir su estándar para crear proyectos profesionales.

Cuando se comienza con el lenguaje PHP es complicado adoptar una estructura útil y estándar debido a su flexibilidad, es difícil conseguir la mejor forma de organizar un proyecto. Mi consejo es claro, puntual y directo, leamos código y aprendamos de ellos, en este caso lee el código de Laravel y Symfony.

Los **frameworks nos ayudan** respecto a los siguiente puntos:

- Desde su descarga todo está organizado.
- No reinventamos la rueda.
- Poseen una gran arquitectura.
- La seguridad ya está configurada y probada.
- Respaldo y ayuda de la comunidad.
- Más oportunidad de empleo.
- Mejor trabajo en equipo.

Estas cosas reafirman que el desarrollo con frameworks es cada vez más real por todas las soluciones que ofrecen. Lo podemos comprender como una herramienta más de trabajo y aprendimos PHP para comprenderlos mejor.

Las **características notables** son:

- Administración de plantillas.
- Manejo fácil y sencillo respecto a una base de datos.
- Sistema de rutas completo y profesional.
- Administrador de peticiones.
- Documentación y comunidad.
- Rápido desarrollo y actualización.
- Sencillo mantenimiento.
- Manejo correcto de peticiones y respuestas.
- Apertura para trabajar con otros proyectos.
- Comandos propios para acelerar el trabajo.
- Manejo de caché.
- Manejo profesional de archivos.
- Sistema de email incluido.
- Sistema adecuado para crear proyectos con testing.
- Y mucho más.

El potencial de estos proyectos no se puede comparar con nada ya que nos permiten crear cualquier proyecto a nuestra medida. Es solo descargar el framework (la plantilla) y comenzar a construir nuestro proyecto personalizado. Esto no quiere decir que todos los proyectos sean iguales y esta es otra ventaja, podemos cada vez crear algo único y totalmente personalizado.

Todo gira entorno a:

- Petición
- Procesamiento
- Respuesta

Descárgalos y comienza a construir cosas asombrosas.

</details>