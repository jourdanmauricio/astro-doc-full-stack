---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Composer
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Composer
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

## Composer

<details>

Composer es una herramienta que profesionalizo la forma en la que trabajamos en PHP, es esa herramienta que instalamos en nuestro proyecto que nos ayuda a gestionar los paquetes que utilizaremos en el mismo.

Composer no es un administrador de paquetes en el mismo sentido que Yum o Apt. Sí, se ocupa de “paquetes” o bibliotecas, pero los gestiona por proyecto, instalándolos en un directorio (por ejemplo vendor) dentro de su proyecto. De forma predeterminada, no instala nada globalmente.

El psr-4 es un estándar que básicamente maneja los nombres de espacio de un código haciendo alusión a la ruta en la que se encuentran. Los nombres de espacio son, en resumen, como el apellido de nuestras clases, por ejemplo, puedo tener dos clases llamadas "Format", pero puedo tener una en nombres de espacios diferentes, y usar ambas en el mismo código, de esa manera, PHP sabe cuál de las dos clases quieres usar.

Una vez que termina de descargar los paquetes los coloca dentro de una carpeta llamada vendor que está definida en nuestro archivo composer.json. Composer es capaz de instalar los paquetes que necesitas para tu proyecto con las versiones que necesites y además se encarga de todas las dependencias que se necesiten, quitándonos el dolor de tener que hacer esto manualmente y mantenerlo todo actualizado. NO DEBES TOCAR NADA QUE ESTÉ EN VENDOR.

El archivo composer.json posee la siguiente apariencia.

```json
{
    "name": "devitm/paquete-desarrollado",  // npmbre del proveedor / npmbre del paquete
    "description": "un pequeño aporte para alumnos de Platzi con mucho amor <3",
    "authors": [
        {
            "name": "Marco Aspeitia",
            "email": "contacto@devitm.com"
        }
    ],
    "require": {
        "php": ">=5.5.0"
    },
    "autoload": {
        "psr-4": {
            "SumaDosNumeros\\": "src/"
        },
        "files": [
            "src/helpers.php"
        ]
    }
}
```

Maneja un sistema de autocarga, si tenemos que incluir 10 paquetes que incluir en nuestro proyecto utilizamos esta tecnología para que toso se cargue al momento de iniciar nuestro sistema.

**Ejemplo**

- Crear composer.json
```json
{
    "name": "devitm/paquete-desarrollado",
    "description": "un pequeño aporte para alumnos de Platzi con mucho amor <3",
    "authors": [
        {
            "name": "Marco Aspeitia",
            "email": "contacto@devitm.com"
        }
    ],
    "require": {
        "php": ">=5.5.0"
    },
    "autoload": {
        // Configuramos el namespace, todo lo que se incluya como Text, hará referencia a la carpeta src.
        "psr-4": {
          "Text\\": "src/"
        },
        // Utilizamos el sistema de carga de arcuvios de composer para 
        "files": [
            "src/helpers.php"
        ]
    }
}
```

- Crear Format.php dentro del directorio src

```php
<?php
/**
 * Indicamos que hace referencia al namespace llamos Text
 */
namespace Text;

/**
 * Nombre de la clase siempre se tiene que llamar igual al nombre del archivo donde nos encontramos
 **/
class Format
{
    /**
     * Función con el modificador de acceso público que va a ser llamada en helpers.php
     * Esta función recibe dos parametros (variables que requiere la funcion para funcionar XD)
     */
    public static function upperText($value)
    {
        return strtouppercase($value);
    }
}
```

- Ejecutar en terminal

Se creará la carpeta vendor, y adentro un archivo llamada autioload.php y una carpeta llamada composer.

Dentro composer se registrará el helpers.php, también se crea la configuración para que el namespace llamado Text apunte a la carpeta /src.

```sh
composer dump
```

- Crear nuestro index.php

```php
<?php

// Instalamos el sistema de autocarga de composer
// Se obtiene la configuración inicial del autoload generado por composer dump
// Indicamos que existe un sistema de carga de clases. De esta manera, entenderá los namespace
require __DIR__ . '/vendor/autoload.php';

// Utilizamos la clase que creamos. Namespace/clase::método
// echo Text\Format::upperText('hola');
// HOLA

// Creamos una funcion helper para utilizar un nombre de función simple
echo upper('hola');
```

- Crear helpers.php dentro del directorio src

```php
<?php

// Uitlizaremos un método estáticos (en la declaración se indica public static). 
// Para acceder a métodos estáticos se debe usar sí o sí los dos puntos: ::
// La flechita -> solo se usa cuando NO son métodos estáticos, es decir, cuando instanciamos directamente una clase usando new
function upper($value) {
  return Text\Format::upperText($value);
}
```
</details>

## Revisión del proyecto

<details>

Cuando ejecutamos index.php, carga el sistema de autoload de composer. Por eso entiende que existe una función llamada upper, que se encuentra configurada en helpers.

Helpers hace uso de la clase Format, pero ¿Cómo sabe donde se encuentra? Utiliza el namespace Text que se encuentra configurado en composer.json.

Cuando escribimos Text hacemos referencia a la carpeta scr, allí se encuentra la clase Format.

Finalmente cuando creamos funciones de este tipo debemos crear un condicional preguntando si la función no existe para crearla.

```php
<?php

if (!funcion_exists()) {

  function upper($value) {
    return Text\Format::upperText($value);
  }

}
```

Realmente Composer si facilita (Y profesionaliza) mucho la carga de archivos en PHP, pero, cuand trabajas con muchas dependencias mediante Composer, es posible que existan 2 funciones iguales que lleven el mismo nombre, y eso puede causar un Fatal Error en PHP, es por eso que siempre se suele encerrar dentro de un if ( ! function_exists() ), de esa forma no duplicamos las funciones y nos evitamos un error.

<mark>Conclusión: todo componente / paquete posee este ciclo de vida. Nuestro proyecto vive en la carpeta /src y esta carpeta existe y se carga en el sistema gracias a la configuración de composer.</mark>

Podemos prescindir de todo este, crear los archivos, pero tendríamos que realizar la carga de forma manual. Utilizamos está tecnología para realizar un sistema de carga automática.

Podemos revisar frmaworks como Laravel o Symfony y todos comienzan con la línea que incluye el sistema de autocarga.

```php
require __DIR__ . '/vendor/autoload.php';
```
</details>

## Gestión de paquetes PHP

<details>

El trabajo de composer es centralizar todos los paquetes de PHP. 

En el pasado, googleabamos como enviar emails con PHP. Y seguiamos los pasos para instalar todos los que archivos necesarios. Actualmente, vamos coposer.

Composer es una herramienta que nos permite escribir comandos. Composer es la herramienta para manejar las dependencias de PHP.

**Packagist: https://packagist.org/**

- Repositorio principal de composer
- Fuente de paquetes de PHP
- Buscador de librerías para PHP

**Instalación de paquetes**

```sh
# uitlizaremos el paquete phpunit en desarrollo
composer require --dev phpunit/phpunit
```
Si no existe el composer.json se creará. También se creará la carpeta vendor con el archivo autoload.php.

```sh
# uitlizaremos el paquete carbon para el manejo de fechas rn producción
composer require nesbot/carbon
```

El archivo composer.json quedaría:

```json
{
  "require-dev": {
    "phpunit/phpunit": "^9.3"
  },
    "require": {
    "nesbot/carbon": "^2.38"
  },
}
```

Si el paquete que instalamos requiere de otros paquetes será composer el que resulva las dependencias.

</details>

## Cómo iniciar un proyecto

<details>

Al igual que la mayoría de gestores de paquetes, Composer también tiene un comando especial para empezar un proyecto con y que este pueda descargar las dependencias que necesitamos de una vez.

```sh
composer init
```

A partir de este momento se nos pregutará:

```sh
# Por defecto detecta el nombre de usuario de la configuración de git y el nombre de la carpeta del proyecto. Podemos cambiarlo o constinuar con la propuesta.
Package name (<vendor>/<name>) [jourdanmau/example]: 
# desciption
Description []: Ejemplo composer
# También toma los datos desde la configuración de git.
Author [jourdanmau <jourdanmauricio@gmail.com>, n to skip]: 
# La estabilidad mímina podemos dejar en vacía pero podemos configurar dev, alpha, beta, etc
# Las diferentes etapas del proyecto
Minimum Stability []: dev
# Tipo de proyecto. Podemos dejarlo vacío, pero coloquemos library
Package Type (e.g. library, project, metapackage, composer-plugin) []: library  
# Licencia. Utilizamos MIT (estandar para proyectos de software libre)
Licence []: MIT

Define your dependencies.
# Necesitas paquetes en producción
Would you like to define your dependencies (require) interactively [yes]? 
Search for a package: carbon

Found 15 packages matching carbon: 

[0] nesbot/carbon
[1] jenssegers/date
...
[14] advmaker/carbon-period

Enter package \# to add, or the complete package name if it not listed: 0
Enter the version constraint to require (or leave blank to use the latest version): 
Using version ^2.0@dev for nesbot/carbon

Search for a package:

Would you like to define your dev dependencies (require) interactively [yes]? 
Search for a package: phpunit

Found 15 packages matching phpunit: 

[0] phpunit/phpunit
[1] phpunit/php-code-coverage
...
[14] brianium/paratest

Enter package \# to add, or the complete package name if it not listed: 0

Enter the version constraint to require (or leave blank to use the latest version): 
Using version ^9.4@dev for phpunit/phpunit

Search for a package:

{
    "name": "jourdanmau/example",
    "description": "Ejemplo de composer",
    "type": "library",
    "require": {
        "nesbot/carbon": "^2.0@dev",
        "phpunit/phpunit": "^9.4@dev"
    },
    "license": "MIT",
    "authors": [
        {
            "name": "jourdanmau",
            "email": "jourdanmauricio@gmail.com"
        }
    ],
    "minimum-stability": "dev"
}

Do you confirm generation [yes]?
Would you like to install dependencies now [yes]: no
```

Para instalar las dependencias recuerda utilizar el comando:

```sh
composer install
```

Una ventaja de composer es que, si tu necesitas migrar tu proyecto a un servidor o a alguna otra computadora, no es necesario que te copies todas las carpetas, de hecho, la carpeta vendor se suele ignorar, esto es porque, al tener el archivo composer.json, simplemente con correr el comando composer install, composer buscará las dependencias y creará la carpeta vendor automáticamente en cualquier máquina que se ejecute.

¿Y qué pasa si dos dependencias distintas requieren de la misma dependencia? ¿Se instala dos veces? No, Composer es tan inteligente que si ve que dos dependencias distintas requieren de una misma dependencia simplemente la instala una sola vez

</details>

## Introducción a JSON

<details>

JSON (JavaScript Object Notation) es un sistema bastante simple sobre el cual gran parte de la web funciona, sobre todo cuando trabajamos con Web Services, pues como se menciona en la clase, es bastante ligero y fácil de leer, además que funciona como si fueran listas, usualmente PHP no trabaja con JSON directamente, pero hay una forma de convertir objetos JSON a arrays asociativos de PHP y viceversa.

JSON es un es un estándar para el intercambio de información que usa la sintaxis de objetos de JS. Todo va entre comillas, y las claves: valor se separan por comillas. Siempre hay que utilizar comillas dobles. Además el último elemento no puede tener una coma.

```json
{
    "name": "rimorsoft",
    "description": "Programación Web",
    "courses": {
        "advanced": ["PHP","VUEjs"],
        "basic": ["JSON","HTML"]
    }
}
```
Un archivo JSON no debe tener comentarios.

</details>

## Autoload

<details>

Si no utilizamos composer nos toca cargar gran cantidad de elementos y clases de forma manual.

autoload.php es el archivo que contiene todas las clases y archivos precargados de tal forma que podemos acceder a cualquiera de sus clases/funciones usando sus nombres de espacios.

El autoload que está dentro de del composer.json es únicamente una configuración que le pones a tu archivo de composer para indicarle cuáles son las clases que tiene que cargar, el archivo composer.json por si solo no hace nada, es solo un archivo de configuración, lo que realmente hace la magia es el archivo autoload.php, este archivo se genera gracias al composer.json y a la configuración que le pusiste dentro, es por eso que siempre tienes que correr composer install.

Es el archivo autoload.php el que tiene ya todas las clases y otros archivos pre-cargados. Es por so que en el index.php tienes que requerirlo, de esa forma al requerir el autoload.php desde el index.php haces que este también tenga ya todos los archivos pre-cargados.

**Autoload**

- Files: Permite cargar una serie de archivos con helpers. Aquí conficuramos archivos ayudantes (helpers).
- Classmap: Nos deja cargar carpetas de una manera directa, carpetas que van a tener dentro de si diferentes clases.
- Psr-0: Ya que es más antiguo, tenemos que poner todas las rutas de las carpetas.
- Psr-4: Al hacer énfasis a la carpeta principal, este entiende todas las rutas dentro de sí. (recomendado)

```json
{
    "autoload": {
        "files": [
            "src/file1.php",
            "src/file2.php"
        ],
        "classmap": [
            "database/seeds",
            "database/factories"
        ],
        // "psr-0": {
        //     "Text\\": "src/"
        // },
        "psr-4": {
            "Text\\": "src/"
        }
    }
}
```

Siempre que utilicemos un archivo principal como el index PHP necesitamos invocar al archivo de autoload.

</details>

## Comandos de Composer

<details>

El primer paso de todo proyecto es crear el archivo composer.json, esto es lo correcto. Si escribimos la palabra composer en la bash nos mostrará una lista de comando que podemos utilizar.

- Install: Si tienes el paquete agegado a tu composer.json
- Require: Si no tienes configurado en JSON, utilizar este para añadir las dependencias que requerimos.
- Remove: Si ya no requieres de algún componente, con este comando los removemos del proyecto (las desinstala todo).
- Self-update → Nos ayuda a actualizar a composer.
- Update: Este comando se conenccta a internet para saber si existe alguna actualización.
- Dump: Para agregar composer a nuestro proyecto.

```sh
# Si tienes el paquete agregado a tu composer.json
composer install

# si no lo tienes configurado en tu json
composer require phpunit/phpunit

# Si deseas removerlo
composer remove phpunit/phpunit

# para agregar composer a tu proyecto
composer dump
```

La diferencia entre self-update y update es:

- self-update: Actualiza a composer, al manejador de dependencias 
- update: Actualiza las dependencias de nuestros proyectos

</details>

## composer.lock

<details>

Equivalencias con JavaScript:

- Vendor es igual a node_modules -> No se debe compartir ni subir a un repositorio dado que es muy pesado.
- composer.json es equivalente a package.json -> Donde se define el proyecto y se listan las dependencias
- composer.lock es equivalente a package-lock.json -> Donde se ve toda la documentación e información de las librerías y paquetes

El archivo composer.lock no lo vamos a tocar ni editar, este nos sirve para trabajar con otras personas en nuestros proyectos, ya que este archivo muestra la descripción exacta y el detalle de los componentes y paquetes.

Este archivo lo crea y edita composer.

Este archivo es necesario por que entre programadores no se comparte el archivo vendor, pero gracias a este archivo nuestros compañeros podrán saber cuáles dependencias deben descargar.

composer.lock contiene a las dependencias que nosotros requerimos en nuestros proyectos así como las subdependencias que estas mismas requieren.

La carpeta vendor puede llegar a ser muy pesada, ¿Se imaginan compartir un proyecto con una carpeta que es extremadamente pesada? Por eso es mas fácil y rápido compartir los archivos .json que son más livianos.

</details>
