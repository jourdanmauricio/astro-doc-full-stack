---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Cookies, Sesiones y Modularización
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Cookies, Sesiones y Modularización
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

## La función dd() 

<details>

En Laravel, tenemos una forma increiblemente sencilla y elegante de hacer debugging a través función dump(). Esta función nos provee de un elemento que podemos manipular para ver informacion muy detallada de lo que queramos. A la función die() ya la hemos usado antes. Nos sirve para terminar la ejecución del script en cualquier momento.

Estas funciones no se encuentran integradas nativamente en PHP, si no que hacen parte del core de Laravel. Pero se puede replicar en PHP nativo.

Tenemos un ejemplo de array complejo.

```php
class Michi {
    protected $patas = [];
    protected $color;

    function __construct($color) {
        $this->color = $color;
        
        for ($i=0; $i < 4; $i++) {
            $this->patas[$i] = new PataDeMichi();
        }
    }
}

class PataDeMichi {
    protected $nails = 4;
    protected $description = "Tiene manchas";

    public function get_description():string{
        return $this->descripcion;
    }
}

$casa_de_michis = array(
    "nombre"=>"Michilango",
    "ubicacion"=>[
        "pais" => "Mexico",
        "ciudad" => "Cuidad de México",
        "colonia" => "Doctores",
        "numero"=>27
    ],
    "numero_de_michis" => 3,
    "michis"=>[
        new Michi("blanco"),
        new Michi("blanco"),
        new Michi("blanco")
    ]
);
```

Seria abrumador debuggear todo esto cierto? no habria mucha diferencia si usaramos var_dump verdad? pues por eso existe la funcion dd que podemos instalar con el comando composer require symfony/var-dumper y al final usamos dd con el array complejo que queramos debuggear.

```sh
composer require-dev symfony/var-dumper
```

```php
require("vendor/autoload.php");
//......
//Todo el codigo anterior
//::....
dd($casa_de_michis);
```

Cuando accedas al navegador notarás que podras interactuar con el debugger de una forma intuitiva, con todo y hasta colores.

Ahora en cada proyecto que hago, esta linea es infaltable en el composer.json:

```json
	"require-dev": {
		"symfony/var-dumper": "^6.1"
	}
```

> <mark>Septiembre de 2022 - La funcion dd fue modificada y ahora muestra tambien el numero de linea desde donde se genero el die(). y desde que contexto se hizo el llamado.</mark>

- dd() = Dump and Die
- ddd() = Dump, Die and Debug

</details>

## ¿Qué son las cookies?

<details>

Las cookies no son más que un pedacito de la memoria de tu computadora que le prestas a una página web para que guarde información personalizada acerca de ti.

No deberían guardar una cookie así porque sí. Nosotros damos el consentimiento para que lo hagan. Así pueden almacenar información no sensible y personalizada sobre ti (ej: si ya has visto esa web).

Podemos obtener las cookies guardadas a través de la variable superglobal **$_COOCKIES**.

Para definir una cookie podemos utilzar los métodos **setCookie()** o **setrawcookie()**. 

### La función setCookie()

Esta función acepta unos cuentos parámetros, por ejemplo, podemos definir que una cookie este disponible para solo una página del sitio en lugar de para todo el sitio web.

```php
<?php
setcookie(
    name: "header_color",
    value: "#12373d"
);

$color = $_COOKIE["header_color"] ?? "#121f3d";

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Platzi</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header
        style = "background : <?= $color ?>">
    
        <img src="logo.webp" alt="Platzi">
    </header>
</body>
</html>
```

</details>

## Trabajando con cookies

<details>

Los parámetros que se están usando en la función setcookie() son los siguientes:

- name: El nombre de la cookie, en este caso "example".
- value: El valor de la cookie, en este caso "Michi_salvaje".
- expires_or_options: La fecha de expiración de la cookie expresada en formato Unix timestamp. En este caso se ha establecido en 0, lo que significa que la cookie expirará al finalizar la sesión.
- path: La ruta dentro del servidor a la que la cookie está disponible. En este caso se ha establecido en "/" lo que significa que la cookie está disponible en todo el sitio.
- domain: El dominio para el que la cookie está disponible. En este caso se ha establecido en "localhost".
- secure: Un valor booleano que indica si la cookie sólo está disponible en conexiones seguras (https). En este caso se ha establecido en false.
- httponly: Un valor booleano que indica si la cookie puede ser accedida por el frontend con js

```php
<?php

setcookie(
    name: "example_cookie",
    value: "Michi salvaje",
    expires_or_options: time() + 60 *60 * 24, // 0 La cookie estara viva mientas la sesion, time() en tiempo inmediato
    path : "/configuracion", // url en la que estara disponible la cookie, si se deja solo / la cookie estara disponible ew
    domain: "localhost", // dominio en el que estará disponible
    secure: false, //la cookie podra definirse solo si el dominio tiene ssl
    httponly: true // puede ser accedida desde Front, en flase estara disponible solo en server side
);

?>
```

Ya que estamos trabajando con las cookies, quiero compartirles unos apuntes (buenas practicas) sobre seguridad (para prevenir los ataques XSS): .

- Si las usas no poner datos sensibles (solamente usarse preferencias de usuario, ejemplo: modo dia, modo noche )
- Siempre poner fecha de expiracion
- Siempre poner el dominio y el path
- Usar solamente en HTTPS .

> Es mejor usar sessiones del lado del servidor que cookies del lado del cliente.

Otras recomendaciones, para tener en cuenta (de manera informativa, porque no es el scope del curso) pero es la forma profesional de lidiar con las cookies:

- Encriptar los datos que van en la cookie
- Ademas de la encritacion firmarlas, usando hash.


</details>

## ¿Qué son las sesiones?

<details>

Son muy similares a las cookies, pero estas nos permiten implementar sistemas de autenticacion dentro de nuestros sition web. Una sesion es una cookie temporal y encriptada que estrá viva y contendrá toda la información del usuario mientras esté activa.

Las sesiones se destruyen en cuanto hacemos logout. Con las sesiones podemos tener información específica de un usuario para pesonalizar el contenido que le mostramos.

Con la función **session_start()** podemos decirle a PHP que queremos empezar a trabajar con sesiones, siempre hay que incluirla en todos los archivos en donde queremos usar sesiones.

Una vez que tenemos una sesion iniciada, podemos empezar a escribir y obtener datos a traves de la variable superglobal $_SESSION (Un arreglo de datos unico por usuario), cuando cerremos la sesion estos datos serán borrados.

Debemos tener cuidado de no usar dos veces la función session_start, ya que esto puede provocar un error.

</details>

## Trabajando con sesiones

<details>

Las sesiones en PHP son una forma de almacenar información (en variables) que se puede utilizar a través de múltiples páginas. A diferencia de las cookies, la información de la sesión se almacena en el servidor. El ejemplo muestra un uso básico de las sesiones para manejar el inicio de sesión y cierre de sesión de usuarios en una aplicación web.

**sesiones/index.php**

```html
<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
</head>
<body>
        <?php if(isset($_SESSION['id'])): ?>
            <h2>Hola <?= $_SESSION["username"] ?></h2>

        <?php else: ?>
            <h2>No estás logueado</h2>

        <?php endif; ?>
</body>
</html>
```

Este archivo es la página principal (perfil) de tu aplicación. Al principio, se llama a session\_start(), que es esencial para iniciar el uso de las sesiones en PHP. Si no se llama a esta función, no podrás acceder ni modificar las variables de sesión.

Luego, el código verifica si existe un ID de sesión ($\_SESSION\["id"]). Si el ID existe, significa que el usuario ha iniciado sesión, y muestra un mensaje de bienvenida junto con el nombre de usuario y el correo electrónico almacenados en la sesión. Si no existe un ID de sesión, muestra un mensaje indicando que el usuario no ha iniciado sesión.

**sesiones/login.php**

```php
<?php 
session_start();

$users = [
    array(
        "username" => "Jorge",
        "email" => "retaxito@noesmiemail.com"
    ),

    array(
        "username" => "MR. Michi",
        "email" => "michi@noesmiemail.com"
    ),
];

$user = $_GET["user"] ?? "";

echo "El usuario elegido es " . $users[$user]["username"];

$_SESSION["id"] = $user;
$_SESSION["username"] = $users[$user]["username"];
$_SESSION["email"] = $users[$user]["email"];
```

Este archivo es el encargado de "iniciar sesión". Primero, se inicia la sesión con session\_start(). Luego, hay una lista de usuarios (en este caso, una matriz de usuarios). El código obtiene un parámetro user de la URL (a través de $\_GET\["user"]) que indica qué usuario ha iniciado sesión.

El script establece las variables de sesión id, username y email basadas en la información del usuario seleccionado. Estas variables de sesión estarán disponibles en todos los scripts de PHP que también llamen a session\_start().

**sesiones/logout.php**

```php
<?php
session_start();
session_destroy();
?>
```

Este archivo se encarga de "cerrar sesión". Al igual que los otros scripts, comienza con session\_start(). Luego, llama a session\_destroy(), lo que elimina todas las variables de sesión y termina la sesión actual. Después de ejecutar este script, el usuario ya no estará "logueado" y, si regresa a index.php, verá el mensaje que indica que no ha iniciado sesión.

En resumen, este conjunto de scripts muestra un flujo básico de autenticación de usuarios utilizando sesiones en PHP. Las sesiones permiten llevar un seguimiento del estado del usuario a través de diferentes páginas, lo que es fundamental en muchas aplicaciones web.

</details>

## ¿Qué son las excepciones?

<details>

### Errores en tiempo de ejecución

En un primer momento, nuestro programa puede ejecutarse correctamente pero puede ocurrir que ocurran errores inesperados durante su ejecución.

- Divisiones entre 0.
- Acceder a un elemento de un array vacio.
- Consultar una URL incorrecta.

Cuando ocurre un error de este tipo, PHP lanza una excepción. 

### ¿Para qué siven las excepciones?

Como programadores nunca deberíamos dejar que los usuarios vean nuestros errores. Las excepciones nos permiten mantener un error bajo control. Nosotros podemos decidir que hacer con el error.

PHP nos brinda herramientas para controlar las exceciones. Podemos ontener mensaje, códigos de error, etc. Pero hay una herramienta indispensable para controlarlos.

### Try / catch

Es una estructura que nos permite "atrapar" errores. Es dicir, cada vez que PHP lanza una excepción, esta estructura los atrapa...

```php

try {
  // Código que deseamos probar
  // Puede generar una excepción
} catch () {
  // Atrapamos el error
}
```

Aprovechando la estructura try/catch, nosotros también podemos lanzar errores intencionalmente para luego interceptarlos. Es útil cuando creamos errores personalizados.

Únicamente debemos utilizar la palabra **throw**.

### La interfaz Throwable

Todas las excepciones dentro de PHP deben implementar **Throwable** para funcionar. La clase **Exception** de PHP implementa la interfaz Throwable.

</details>

## Implementando try/catch

<details>

```php
<?php

try {
  $resultado = 20 / 0;
  echo $resultado;
} catch (Throwable $e) {
  echo $e->getMessage();   // Division by zero
  echo "Ups, algo salio mal con tu división";
}

echo "<br>";
echo "Esto pasa si o si";
?>
```

```php
<?php

try {
  $pet = readline("¿Qué quieres adoptar? ");

  if ($pet != "Michi" && $pet != "Conejo") 
    throw new Exception("Lo sentimos, no tenemos $pet en este centro de adopción");

  echo "Felicidades por tu nuevo $pet";

} catch (Throwable $e) {
  echo $e->getMessage();   
  // Lo sentimos, no tenemos $pet en este centro de adopción
}

echo "<br>";
echo "Esto pasa si o si";
?>
```
</details>

## Revisando los métodos de las excepciones

<details>

- getMessage() devuelve una cadena de texto que describe el mensaje de la excepción.

- getCode() devuelve un entero que representa el código de la excepción.

- getFile() devuelve una cadena de texto que indica el nombre del archivo donde se lanzó la excepción.

- getLine() devuelve un entero que representa el número de línea donde se lanzó la excepción.

- getTrace() devuelve una matriz de información de seguimiento que muestra la secuencia de llamadas a la excepción.

- getTraceAsString() devuelve una cadena de texto con la información de seguimiento en un formato legible.

- getPrevious() devuelve una instancia de Throwable que representa la excepción anteriormente lanzada, si la hay.

- __toString() devuelve una cadena de texto que representa la excepción como una cadena formateada.

El método heredado __toString() de la interfaz Stringable también devuelve una cadena de texto que representa la excepción como una cadena formateada.

```php
// methods.php
<?php

try {
  $resultado = 20 / 0;
} catch (Throwable $e) {
  echo $e->getMessage(); // Division by zero
  echo $e->getCode(); // 0
  echo $e->getFile(); // /../methods.php
  echo $e->getLine(); // 5
  echo "<pre>";
    var_dump($e->getTrace()); 
  echo "</pre>";
  // array(0)
}
```

```php

function division() {
  return 20/0;
}

try {
  $resultado = division();
} catch (Throwable $e) {
  echo "<pre>";
    var_dump($e->getTrace()); 
  echo "</pre>";
  //  array(1) {
  //    [0] => array(4) {
  //      [file] => string(59) "/var/www/html/methods.php"
  //      [line] => int(9) 
  //      [function] => string(8) "division"  
  //      [args] => array(0) {
  //      }  
  //    }
  //  }
}
```
</details>

## Crea tus propias excepciones

<details>

Podemos crear nuestras propias excepciones personalizadas, que podemos lanzar manualmente. Esto nos permitirá tener aún más control sobre los errores a manejar.

Las clases de PHP no pueden implementar la interfaz Throwable directamente. Debemos extender la clase **Exception**.

```php
<?php

class MichiException extends Exception{
  public function getMeow(){
    return "Meow";
  }
}

class ConejiException extends Exception{
  public function getRabbut(){
    return "Conejo";
  }
}

try {

  $exception = readline("Excepcion a lanzar: ");

  if ($exception == "michi") 
    throw new MichiException("Michi incorrecto");
  else 
    throw new ConejiException("Conejo incorrecto");

} catch (MichiException $e) {
  echo $e->getMessage() . "\n";  // Michi incorrecto
  echo $e->getMeow();            // Meow
} catch (ConejiException $e) {
  echo $e->getMessage() . "\n"; // Conejo incorrecto
  echo $e->getRabbut();         // Conejo
} finally {
  echo "Este bloque se ejecuta siempre. No importa si hubo error o no.";
}
?>
```
</details>

## ¿Cómo trabajar con fechas en PHP?

<details>

Casi toda la magia la hace la **función date**. A esta función hay que pasarle un string con lo que queremos y mágicamente nos da el dato.

Pero tambien existe la **clase DateTime**, con esta clase podemos obtener varios métodos que nos permitan trabajar con fechas.

```php
date(string $format, int $timestamp = time()) : string
```

Documentacion: https://www.php.net/manual/es/function.date.php

- timestamp: El parametro opcional tiemstamp es una marca de unix de tipo integer que por defecto es la hora local si no se propporciona ningun valor a timestamp. En otras palabras, es de forma predeterminada el valor de la funcion time()

- DateInterval: nos ayuda a formatear un intervalo de tiempo, Representa un intervalo de fechas o una diferencia de fechas

- time: devuelve la fecha unix actual. Devuelve el momento actual medido como el número de segundos desde la Época Unix (1 de Enero de 1970 00:00:00 GMT).

```php

// Obtener la fecha actual:
$fecha_actual = date('Y-m-d'); // Retorna la fecha actual en formato 'año-mes-día'

// Obtener la hora actual:
$hora_actual = date('H:i:s'); // Retorna la hora actual en formato 'hora:minuto:segundo'

// Convertir una fecha de texto a formato de fecha:
$fecha_texto = '19-04-2023';
$fecha = date_create_from_format('d-m-Y', $fecha_texto); // Retorna un objeto fecha

// Sumar días a una fecha:
$fecha = date_create('2023-04-19');
$fecha->modify('+7 days'); // Suma 7 días a la fecha
echo $fecha->format('Y-m-d'); // Retorna '2023-04-26'

// Restar días a una fecha:
$fecha = date_create('2023-04-19');
$fecha->modify('-7 days'); // Resta 7 días a la fecha
echo $fecha->format('Y-m-d'); // Retorna '2023-04-12'

// Obtener el número de días entre dos fechas:
$fecha1 = date_create('2023-04-19');
$fecha2 = date_create('2023-05-01');
$intervalo = date_diff($fecha1, $fecha2); // Retorna un objeto intervalo
echo $intervalo->format('%R%a días'); // Retorna '+12 días'

// Obtener el nombre del día de la semana:
$fecha = date_create('2023-04-19');
$nombre_dia = date_format($fecha, 'l'); // Retorna el nombre del día de la semana en inglés
echo $nombre_dia; // Retorna 'Tuesday'

// Obtener el nombre del mes:
$fecha = date_create('2023-04-19');
$nombre_mes = date_format($fecha, 'F'); // Retorna el nombre del mes completo
echo $nombre_mes; // Retorna 'April'
```
</details>

## Fechas con funciones vs fechas con POO

<details>

En PHP, hay dos enfoques principales para trabajar con fechas y horas: utilizando funciones y utilizando la programación orientada a objetos (POO). Ambos enfoques pueden lograr resultados similares, pero difieren en su sintaxis y estilo de programación. 

**Trabajar con Fechas Usando Funciones**

- Este enfoque utiliza funciones incorporadas de PHP para manipular fechas y horas.
- Es un estilo más procedimental o estructurado.

**Trabajar con Fechas Usando POO**

- Este enfoque utiliza clases y objetos de PHP para manipular fechas y horas.
- Es más modular y ofrece una mejor gestión del estado y la funcionalidad de los objetos relacionados con la fecha/hora.

**Comparación y Diferencias Clave**

1. **Legibilidad y Mantenimiento**:

- POO generalmente se considera más legible y fácil de mantener, especialmente para aplicaciones más grandes y complejas. Los métodos encadenados y el manejo de estado dentro de los objetos pueden hacer que el código sea más intuitivo.

2. **Modularidad y Reutilización**:

- Con POO, puedes crear instancias de objetos y reutilizarlos de manera más flexible. Por ejemplo, una vez que tienes un objeto DateTime, puedes modificarlo y usarlo en diferentes contextos sin necesidad de pasar la fecha como una variable a múltiples funciones.

3. **Manejo de Errores**:

- La POO puede ofrecer un manejo de errores más sofisticado a través de excepciones, lo que permite un control más fino sobre las situaciones de error.

4. **Estilo de Programación**:

- La elección entre procedimientos y POO a menudo depende del estilo de programación preferido del desarrollador y de la complejidad del proyecto. Algunos desarrolladores prefieren la simplicidad y la familiaridad de las funciones, mientras que otros prefieren la estructura y las características avanzadas de la POO.

En conclusión, mientras que las funciones y la POO pueden utilizarse para lograr los mismos objetivos al trabajar con fechas y horas en PHP, la POO ofrece una mayor modularidad, legibilidad y un manejo de errores más robusto, lo que la hace más adecuada para aplicaciones más grandes y complejas.


```php 
// Por procedimiento / estruturada / funciones
$date = date_create();   // retorna un DateTime
$interval = date_interval_create_from_date_string("5 days");  // retorna un DateInterval
date_add($date, $interval); // retorna un DateTime
echo date_format($date, "Y-m-d"); 

echo "<br>";

// Procedimiento mediante OOP
$date2 = new DateTime();
$interval2 = DateInterval::createFromDateString("5 days");
$date2->add($interval2);
echo $date2->format("Y-m-d");
```
</details>

## Funciones para fechas

<details>

En PHP, trabajar con fechas es una tarea común y el lenguaje proporciona varias funciones y clases para manejar fechas y horas de manera efectiva. 


```php
<?php

// Establecer la zona horaria. Por default toma la del servidor.
date_default_timezone_set("America/Argentina/Buenos_Aires");
echo date_default_timezone_set();
echo "<br>";

// Obtener la fecha actual
$now = date("Y-m-d H:i:s");
// $now = date_create();
echo $now;
echo "<br>";

// strtotime
echo strtotime($now); // Tranforma cadena de texto (en inglés) a formato Unix 
echo strtotime("17 April 2020");
echo strtotime("+1 day");
echo strtotime("next Monday");
echo strtotime("last Wednesday");

$unix_time_last_wednesday = strtotime("last Wednesday");
echo date("Y-m-d H:i:s", $unix_time_last_wednesday);

// Fechas inmutables
$date_inmutable = new DateTimeImmutable();
?>
```
- date\_default\_timezone\_set() establece la zona horaria predeterminada usada por todas las funciones de fecha/hora en un script. En este caso, estás estableciendo la zona horaria a "America/Guatemala". Es importante establecer esto en tus scripts de PHP para asegurarte de que las operaciones de fecha y hora se realicen en el contexto de la zona horaria correcta.

- date() es una función que formatea una fecha/hora local. Aquí, obtienes la fecha y hora actuales en el formato "Año-Mes-Día Hora:Minuto:Segundo". Alternativamente con date\_create()

- date\_create() es un alias de la función DateTime::\_\_construct() y crea un objeto DateTime. Si se llama sin argumentos, como en tu ejemplo, crea un objeto DateTime con la fecha y hora actuales.

- strtotime() es una función muy útil en PHP que convierte una descripción de fecha/hora en inglés en una marca de tiempo Unix. En este caso, convierte "Next Monday" (el próximo lunes) en una marca de tiempo Unix. Luego, usas date() para formatear y mostrar esta fecha.

- DateTimeImmutable es similar a DateTime, pero con una diferencia importante: mientras que los métodos de DateTime modifican el objeto mismo, los métodos de DateTimeImmutable devuelven un nuevo objeto con la modificación. Esto es útil en situaciones donde necesitas asegurarte de que el objeto original de fecha/hora no se modifique accidentalmente.

</details>

## Más funciones para fechas

<details>

```php
<?php

// Diferencia de tiempo

# Neceitamos dos marcas de tiempo
$today = new DateTime();
$mrmichi_birth =  new DateTime("2020-03-25");

$interval = $mrmichi_birth->diff($today);      // retorna un objeto de tipo DateInterval
echo $interval->format("%y años, %m meses, %d días");

// Crear desde un formato dado

$date = DateTime::createFromFormat("l j F y", "Sunday 17 April 2022");
echo $date->format("Y-m-d H:i:s"); 

//Modificar una fecha

$date = new DateTime();
$date->modify("+1 day +2 months");
echo $date->format("Y-m-d H:i:s");

?>
```
</details>

## Arsenal de funciones para fechas

<details>

Funciones personalizadas útiles para el manejo de fechas.

```php
// date.php
<?php

// Transforma a una fecha legible un timestamp - RetaxMaster
function get_date_from_timestamp(string $timestamp) : string {
    $timestamp = substr($timestamp, 0, 10);
    $numeroDia = date('d', strtotime($timestamp));
    $dia = date('l', strtotime($timestamp));
    $mes = date('F', strtotime($timestamp));
    $anio = date('Y', strtotime($timestamp));
    $dias_ES = array("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo");
    $dias_EN = array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
    $nombredia = str_replace($dias_EN, $dias_ES, $dia);
    $meses_ES = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    $meses_EN = array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    $nombreMes = str_replace($meses_EN, $meses_ES, $mes);
    return $nombredia." ".$numeroDia." de ".$nombreMes." del ".$anio;
}

// Transforma un timestamp en una fecha corta: dd/mm/yyyy - RetaxMaster
function get_short_date_from_timestamp(string $timestamp) : string {
    return date("d/m/Y", strtotime($timestamp));
}

// Añade puntos a am y pm retornando a.m o p.m - RetaxMaster
function add_dots_to_hour(string $hour) : string {
    return str_replace("pm", "p.m", str_replace("am", "a.m", $hour));
}

// Transforma a una hora legible un timestamp - RetaxMaster
function get_time_from_timestamp(string $time) : string {
    return add_dots_to_hour(date("g:ia", strtotime($time)));
}

// Obtiene el día de la semana según su numero - RetaxMaster
function get_day_of_the_week(int $day) : string {
    switch ($day) {
        case 1: $name = "Lunes"; break;
        case 2: $name = "Martes"; break;
        case 3: $name = "Miércoles"; break;
        case 4: $name = "Jueves"; break;
        case 5: $name = "Viernes"; break;
        case 6: $name = "Sábado"; break;
        case 7: $name = "Domingo"; break;
        default: $name = "Undefined";
    }
    return $name;
}

// Traduce el tiempo a español o ingles según se especifique, por ejemplo: "1 día" a inglés da: "1 day" y viceversa - RetaxMaster
function translate_time(string $time, bool $toSpanish) : string {
    //Separo el numero del texto
    $time = explode(" ", $time);
    $number = $time[0];
    $string = $time[1];
    //Creamos los arays con sus traducciones
    $es = array("segundo", "minuto", "hora", "día", "semana", "mes", "año", "segundos", "minutos", "horas", "días", "semanas", "meses", "años");
    $en = array("second", "minute", "hour", "day", "week", "month", "year", "seconds", "minutes", "hours", "days", "weeks", "months", "years");
    //Lo traducimos y retornamos la palabra traducida segun el idioma especificado
    $string = ($toSpanish) ? $es[array_search($string, $en)] : $en[array_search($string, $es)];
    return $number." ".$string;
}

// Añade la cantidad de tiempo indicada a un timestamp, si indicas "now" tomará la fecha actual, como segundo parámetro recibe la cantidad de tiempo a añadir en español, por ejemplo, "1 año", "7 dias", "4 semanas", etc... - RetaxMaster
function add_time(string $timestamp, string $timeToAdd) : string {
    $timestamp = ($timestamp == "now") ? date("Y-m-d  H:i:s") : $timestamp;

    $timeToAdd = explode(" + ", $timeToAdd);
    foreach ($timeToAdd as $key => $value) $timeToAdd[$key] = translate_time($value, false);
    $time = implode(" + ", $timeToAdd);

    $date = new DateTime($timestamp);
    $date->add(DateInterval::createFromDateString($time));
    return $date->format('Y-m-d H:i:s');
}

// Resta dos fechas en formato tiemstamp y retorna un DateInterval - RetaxMaster
function time_diff(string $timestamp1, string $timestamp2) : DateInterval {
    $timestamp1 = ($timestamp1 == "now") ? date("Y-m-d  H:i:s") : $timestamp1;
    $timestamp2 = ($timestamp2 == "now") ? date("Y-m-d  H:i:s") : $timestamp2;
    $date1 = new DateTime($timestamp1);
    $date2 = new DateTime($timestamp2);
    $interval = $date1->diff($date2);
    return $interval;//->format("%a días");
}

// Retorna la diferencia entre 2 horas
function hour_diff(string $h1, string $h2, bool $enable_distant_hours = true) : int {
    $hour1 = new DateTime($h1);
    $hour2 = new DateTime($h2);
    $diff = $hour1->diff($hour2);
    $diff = (int) $diff->format("%R%H");
    //Si sale un número negativo es porque se está obteniendo la diferencia entre horas distantes, ej: entre las 4 de la mañana y las 1 de la mañana
    $diff = ($diff < 0 && $enable_distant_hours) ? $diff + 24 : $diff;
    return $diff;
}

// Retorna si una hora dada está entre dos horas, recibe la hora inferior, la superior y la hora que se verificará - RetaxMaster
function hour_is_between(string $from, string $to, string $input) : bool {
    $dateFrom = DateTime::createFromFormat('!H:i:s', $from);
    $dateTo = DateTime::createFromFormat('!H:i:s', $to);
    $dateInput = DateTime::createFromFormat('!H:i:s', $input);
    if ($dateFrom > $dateTo) $dateTo->modify('+1 day');
    return ($dateFrom <= $dateInput && $dateInput <= $dateTo) || ($dateFrom <= $dateInput->modify('+1 day') && $dateInput <= $dateTo);
}

// Retorna si una fecha está entre dos fechas, recibe la hora inferior, la superior y la fecha que se verificará - RetaxMaster
function date_is_between(string $from, string $to, string $input) : bool {
    return strtotime($from) <= strtotime($input) && strtotime($input) <= strtotime($to);
}

// Obtiene una fecha entera a partir de un timestamp - RetaxMaster
function get_full_date(string $timestamp) : string {
    return get_date_from_timestamp($timestamp)." a las ".get_time_from_timestamp($timestamp);
}

// Convierte Timestamp de JavaScript a Timestamp de PHP -- RetaxMaster

function convert_javascript_timestamp_to_php_timestamp(string $timestamp) {
    $timestamp = substr($timestamp, 0, -1);
    return explode(".", implode(" ", explode("T", $timestamp)))[0];
}

// btiene una fecha entera a partir de un timestamp de JavaScript - RetaxMaster
function get_full_date_from_javascript_timestamp(string $timestamp) : string{
    $timestamp = convert_javascript_timestamp_to_php_timestamp($timestamp);
    return get_full_date($timestamp);
}
```

```php
require("date.php");

// retorna detalle de fecha
echo get_date_from_timestamp('25-04-2022');
// Lunes 25 de Abril del 2022

// retorna fecha corta
echo get_short_date_from_timestamp('25-04-2022');
// 25/04/2022

// retorna las horas
echo get_time_from_timestamp('18:32:45');
// 6:32p.m

// Obtiene el día de la semana
echo get_day_of_the_week('4');
// Jueves

// Traduce de Ingles a Español o viceversa
echo translate_time('1 día', false);
// 1 day
echo translate_time('1 day', false);
// 1 día

// Añadir tiempo
echo add_time('2022-04-23 12:45:34', '1 día + 2 horas + 3 semanas');
// 2022-05-15 14:45:32

// Obteniene la fecha completa
echo get_full_date('2022-03-14 16:35:45');
// Lunes 14 de Marzo del 2022 a las 4:35p.m
```
</details>

## Modularización del código

<details>

Dividir el código en archivos nos permite: 

- Facilitar su lectura, 
- El código es más fácil de mantener,
- Mejoramos el orden y limpieza de nuestro código

### Modularización de códigpo en PHP

Existen 3 formas de separar el código. Las 3 formas tienen el mismo objetivo pero son ligeramente diferentes.

- **include**: Incluye el archivo especificado sin problemas. Si no se encuentra el archivo indicado, emite una advertencia.

- **include_once**: Lo mismo que el anterior PERO si el archivo se incluye dos veces o más veces, sólo tomará en cuenta el primero.

- **require**: Incluye el archivo especificado sin problemas. Si no se encuentra el archivo indicado, genera un error fatal.

```php
// constanstes.php

const NOMBRE = "Retaxito";
const EDAD = 14;
const PROFESION = "Paseador profesional";
```
```php
// index.php

include("constantes.php");

echo PROFESION;
// Paseador profesional
```
```php
// index.php

// Typo en nombre de archivo
include("constants.php");

echo "A pesar de no encontrar el archivo incluido sigue funcionando";
```
```php
// index.php

// Typo en nombre de archivo
include("constants.php");

echo "A pesar de no encontrar el archivo incluido sigue funcionando, lanza un alerta pero continúa";
```
```php
// index.php

// Typo en nombre de archivo
require("constants.php");

echo "No encontra el archivo, arroja un error fatal. No llega a esta línea";
```

```php
// index.php

include("constants.php");
include("constants.php");

echo "Incluímos dos veces el mismo archivo continuará pero arroja alerta por la declaración duplicada de constantes, funciones, etc";
```

```php
// index.php

include_once("constants.php");
include_once("constants.php");

echo "Incluímos dos veces el mismo archivo continuará sin arrojar alerta";
```
</details>

## Namespaces

<details>

Conocidos como espacios de nombres, son los "*apellidos*" que podemos dar a una clase. Es decir, **podemos tener dos clases con el mismo nombre**, pero distintos apellidos (espacios de nombre).

Aunque podemos escribir cualquier código dentro de un espacio de nombre, los únicos tipos que serán afectados son las **clases** (incluyendo abstracciones y traits), **interfaces**, **funciones** y **constantes**.

```php
// MichisAdoptados.php
# Definimos un namespace
namespace MichisAdoptados;

# Class Michis
```
```php
// MichisDisponibles.php
# Definimos un namespace
namespace MichisDisponibles;

# Class Michis
```

```php
require ('Classes/MichisAdoptados/Michi.php');
require ('Classes/MichisDisponibles/Michi.php');

$mrMichi = new MichisDisponibles\Michi('Mr. Michi', 'Blanquito', 16);
$michisancio = new MichisDisponibles\Michi('Michisancio', 'Naranja', 14);
```

```php
// Otra alternativa para simplificar el uso del namespace
require ('Classes/MichisAdoptados/Michi.php');
require ('Classes/MichisDisponibles/Michi.php');

use MichisDisponibles\Michi;
use MichisAdoptados\Michi as MichisAdoptados;

$mrMichi = new Michi('Mr. Michi', 'Blanquito', 16);
$michisancio = new Michi('Michisancio', 'Naranja', 14);

$mrMichi_adopted = new MichisAdoptados('Mr. Michi', new DateTime('2022-04-21'), "Mauri");
```
> <mark>No puede haber alias repetidos en tu archivo.</mark>

</details>

## PSR-4 y Composer

<details>

PSR son un conjunto de reglas o estandares que definen como trabajar con el lenguaje. Basicamente un grupo de programadores de PHP se reunieron, crearon PHP Fig y definieron esos estandares.

PSR-4 hace referencia a que, todos los espacios de nombre deben hacer referrencia hacia la carpeta en donde dichos archivos estan ubicados.

Composer usa este PSR para lograra hacer la autocarga de sus archivos, es decir, **ya no temeos que preocuparnos de usar include y require**, Composer lo hace por nosotros gracias a PSR-4.

- Las clases deben llamarse igual que el archivo.
- El namespace debe ser el nombre de la carpeta donde se encuentra.

</details>

## Front Controller

<details>

Sabemos que cada archivo .php puede ser una página. 

- http://dominio.com/inicio.php
- http://dominio.com/contact.php
- http://dominio.com/services.php

Aquí tenemos varios puntos de entrada que trabajhan en forma independiente. Si deseamos tener algo en común entre las 3 debemos copiar y pegar código.

Un **Front Controller** nos permite definir un único punto de entrada, desde donde cargaremos las páginas solicitadas.

Podemos definir un index.php que sea el Front Controller, y desde allí cargar services.php o contact.php. Además nos permite escribir código común para nuestras páginas.

```sh
- front-controller
  |-> pages
  |     |-> home.php
  |     |-> services.php
  |     |-> contact.php
  |-> index.php
```
```php
// index.php
<?php

$page = $_GET['page'] ?? null;

switch ($page) {
    case 'home':
        require("pages/home.php");
        break;
    case 'contact':
        require("pages/contact.php");
        break;
    case 'services':
        require("pages/services.php");
        break;
    deafult:
        require("pages/404.php");
        break;
}
?>
```

```html
<!-- home.php -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
</head>
<body>
  <h1>Home</h1>
</body>
</html>
```

```html
<!-- contact.php -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact</title>
</head>
<body>
  <h1>Contact</h1>
</body>
</html>
```

```html
<!-- services.php -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Services</title>
</head>
<body>
  <h1>Services</h1>
</body>
</html>
```

Ahora accedemos a través de:

- home: http://dominio.com/front-controller/  
- services: http://dominio.com/front-controller?page=services  
- contact: http://dominio.com/front-controller?page=contact  

Este es un Front Controller demasiado básico. Más adelante profundizaremos...

</details>

## El archivo .htaccess

<details>

Con el Front Controller obtenermo un único punto de entrada pero las url quedan sucias. 

A través del archivo .htaccess podemos limpiar las urls, que sean fáciles de leer y optiomizadas para SEO.

El **archivo .htaccess** se utiliza para reescribir mediante condiciones la url de nuestro sitio web, esto nos permite utilizar la definición de Front Controller pero a su vez teniendo URL’s más limpias, fáciles de leer y buenas para SEO.

El proceso que sigue el rescribir la url es:

- Tomar la url ingresada por el usuario
- La url pasa por el archivo htacess y se somete a las reglas y condiciones registradas en el mismo
- El resultado es enviado al Front Controller para que pueda mostrar al usuario el contenido que solicita

Tutorial oficial de Apache para el uso del .htaccesshttps://httpd.apache.org/docs/trunk/es/howto/htaccess.html

El archivo .htaccess se coloca en la raíz del dominio.

Configuramos un virtual host.

```sh
sudo nano /etc/apache2/apache2.conf
```

```sh
<VirtualHost *:80>
    ServerName www.sitio.test
    DocumentRoot /var/www/htdocs/sitio/htaccess
    <Directory "/var/www/htdocs/sitio/htaccess">
        Options FollowSymLinks
        AllowOverride All
    </Directory>
</VirtualHost>
```

```sh
# hosts
127.0.0.1   localhost
127.0.0.1   sitio.test
```

```sh
sudo a2enmod rewrite
sudo systemctl restart apache2
```

```sh
# .htacccess

# Habilitamos la sobre-escritura
RewriteEngine On 

# Condición para el caso de que no se encuentre el archivo
RewriteCond %{REQUEST_FILENAME} !-f 
# Condición para el caso de que no se encuentre el directorio
RewriteCond %{REQUEST_FILENAME} !-d 


RewriteRule ^(.*)$ index.php?page=$1 [L]
# Donde: ^(.*)$ es una expresión regular, ^ indica el inicio de la expresión y $ el final
# .*: es la expresión que indica que cualquier caracter puede ser escrito en la url 
# y se puede repetir cualquier cantidad de veces, es decir, 
# que aplicará para cualquier cosa que se escriba en la url
# (): Los parentesis indican que todo lo que se escriba en la url se guarda en una variable 
# que se utilizara luego en la sentencia de la condición, esto se almacena en $1
# index.php?page=$1 : Es la condición de redirección, a donde enviamos al usuario según como lo definamos en le programa. 
# El valor $1 representa la variable donde se almaceno el contenido de la expresión regular que se colocó dentro de los parentesis.
# El page en la condición corresponde a la variable que vamos a pasar al parámetro $_GET
```
</details>

## Traits

<details>

Un **trait** es una **plantilla de métodos que podemos usar en diferentes clases**, este puede usarse en varias clases a la vez.

Hay que tomar en cuenta que los métodos que definamos en esta plantilla deben poder ser utilizados para todas las clases en los que se vayan a implementar.

La definición de un trait es exactamente igual que una clase, como estamos utilizando PSR-4 este debe tener el mismo nombre que el archivo.

```php
// Pet.php

namespace App\Traits

trait Pet{
	public function play(){
		return "I'm playing";
	}
	public function sleep(){
		return "I'm sleeping";
	}
}
```

Hay que tener en cuenta que este Trait no se puede instanciar al igual que como se hace con una clase.

Para la implementación se debe hacer la invocación mediante su namespace y colocar el nombre del trait dentro de la definición de la clase donde se va a utilizar haciendo uso de la palabra reservada “**use**”.

```php
//Michi.php

namespace App\Classes;

use App\Traits\Pet;

class Michi {

    use Pet;

    public function sayMeow() {
        return "Meow! 🐱";
    }

    public function scratch() {
        return "😾";
    }
}
```

```php
//Perritu.php
namespace App\Classes;

use App\Traits\Pet;

class Perritu {

    use Pet;

    public function bark() {
        return "Woof! 🐶";
    }

    public function drool() {
        return "🐶💧";
    }
}
```

```php
// index.php

require("vendor/autoload.php");

use App\Classes\Perritu;
use App\Classes\Michi;

$firulais = new Perritu();
$mrmichi = new Michi();

echo $firulais->bark() . "\n";
echo $firulais->play() . "\n";

echo $mrmichi->sayMeow() . "\n";
echo $mrmichi->sleep() . "\n";
```

Los traits vienen a solucionar un problema de limitaciones de la herencia simple en php, es decir, solucionan el hecho de que una misma clase no puede heredar de dos clases padre. Con los traits podemos hacer uso de un conjunto de "rasgos" / métodos sobre varias clases independientes.

**Eso no es lo mismo que usar interfaces??? o que cambia**

Los traits más bien son una forma de reutilizar métodos en diferentes clases, mientras que las interfaces son "contrato" u obligaciones que literalmente te obligan a implementar X métodos en alguna clase, pero realmente no los estás reutilizando



</details>