---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Manejo de Datos en PHP
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Manejo de Datos en PHP
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

## Comillas

<details>

**Comillas simples**

Para manejar datos strings con comillas simples. Si queremos utilizar una comilla simple dentro de nuestro string utilizamos \ (backslash) para escaparla y no nos de error.

```php
<?php

echo 'Un texto de una línea';

echo 'Un texto de 
varías líneas solo en código
no solo refleja en output';

echo 'Podemos escapar una comilla
simple así \' con un backslash \\ continuar con más texto <br>';
```

**Comillas dobles**

Si queremos acceder a una variable utilizamos comillas dobles. También podemos acceder a una variable con comillas simples, pero tiene que estar fuera de la comillas simples.

```php
$name = 'Luigi';
echo "Mi nombre es $name <br>";
echo 'Mi nombre es ' . $name;
```

**Datos complejos (Comillas dobles)**

Para acceder a datos complejos como un objeto o un array con varios niveles necesitamos utilizar {} (llaves) que encierren a la variable con los parámetros que indicamos.

Se puede dar el caso de cuando es un objeto, y este solo tiene un nivel en su parámetro accedemos sin utilizar {} (llaves) y para indicar el key ponemos →, ej: $hora→segundos

```php
$name = 'Luigi';
$courses = [
    'backend' => 'PHP'
];

echo "{$courses['backend'][0]}";

class User
{
    public $name = 'Mario';
}

$user1 = new User;

echo "<br>  $user1->name quiere aprender {$courses['backend'][0]} <br>";
```

**Variables variables**

Y si necesitamos utilizar las variables variables, lo hocemos añadiendo $ antes de las {} (llaves) para que búsque la variable variable.

La variable variable debe tener exactamente el mismo nombre que el dato que tiene la variable principal, deben coincidir tanto en lo que dice como si está en mayúscula o no.

También para hacer más legible el código podemos encerrar esta llamada a una variable dentro de otra {} (llaves). Ej: {${getLove()}}

```php
$teacher = 'waluigi';
$waluigi = 'Profesor de moda púrpura';

echo "$teacher es ${$teacher}";

function getTeacher()
{
    return 'teacher';
}

$teacher = 'Wario';

echo "{${getTeacher()}} enseña PHP";
```
</details>

## Extracción de datos

<details>

```php
<?php
    # Extracción de datos.
    # De esta cadena de texto extraer los caracteres que yo le diga al impimir.
    $data = 'Estudio PHP';
    echo $data[0];
    //echo $data{0};
    // //E


    # Imaginemos que tenemos un post
    $post = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ullam omnis reprehenderit debitis quos voluptatum odit eos, doloremque aperiam vel illo voluptate? Accusantium, velit aliquam quasi totam architecto libero nobis!';
    $extract = substr($post, 0, 20);
    echo "$extract... [Ver más]";

    # Si tenemos un texto y un formulario que diga ingresa las etiquetas de este post podemos pasar ese texto a un array directamente.
    # pre permite organizar mejor mi información.
    $data = 'javascript, php, laravel';
    $tags = explode(', ', $data); // le digo que cada vez que consiga una coma a un arreglo. Y ESE ARRAY ES EL QUE GUARDAMOS EN LA ABSE DE DATOS.
    echo "<pre>";
    var_dump($tags);
    /* SALIDA:
        array(3) 
        {
            [0]=>
            string(10) "javascript"
            [1]=>
            string(3) "php"
            [2]=>
            string(7) "laravel"
        }
    */

    # Pasar un array a string
    $courses = ['javascript', 'php', 'laravel'];
    echo implode(', ', $courses);
    //javascript, php, laravel

    # Eliminar espacios.
    $course = "   Curso de PHP          ";
    echo trim($course);

    # Eliminar espacios.
    $course = "   Curso de PHP          ";
    $course = trim($course);
    echo "<pre>";
    echo "Quiero aprender $course, y otro texto";

    # Eliminar solo espacios de la izquierda.
    $course = "   Curso de PHP          ";
    $course = ltrim($course);
    echo "<pre>";
    echo "Quiero aprender $course, y otro texto";
    
    # Eliminar solo espacios de la derecha.
    $course = "   Curso de PHP          ";
    $course = rtrim($course);
    echo "<pre>";
    echo "Quiero aprender $course, y otro texto";
?>
```
</details>

## Formato de datos

<details>

DOC: https://www.php.net/manual/es/ref.strings.php

**Funciones**

- **strtolower** -> Con strtolower podemos convertir una cadena de texto a minúscula.
- **strtoupper** -> Con strtoupper podemos convertir una cadena de texto a mayúscula.
- **ucfirst** -> Con ucfirst haces que el primer caracter de una cadena sea mayúscula.
- **lcfirst** -> Con lcfirst haces que el primer caracter de una cadena sea minúscula.
- **str_replace** -> Con str_replace(" ", "-", $text);podemos reemplazar uno o varios caracteres por uno o varios caracteres dentro de un string.
- **str_pad** -> Con str_pad($code, 8, "#", STR_PAD_LEFT); lo que hacemos es que al contenido de esa variable, hasta que lleguemos a 8 caracteres, llenar el espacio que le falte para llegar con un cierto caracter, y tiene un modificador para poner ese relleno comenzando a la izquierda.
- **strip_tags** -> Con strip_tags($text); podemos quitar todos los tags html o de otro lenguaje que tengan <h2> (por ejemplo).

Podemos anpononer mb_ para decir que el texto a convertir es mutibyte, permitiendo que caracteres especiales como la ñ o tildes se puedan convertir de manera correcta con mb_strtoupper($text);

```php
###########
# Alterar #
###########
$text = "<h1>PHP es UN LENGUAJE</h1>";
echo $text;

// Hacer un texto en minuscula
echo "<pre>";
echo strtolower($text);

// Hacer un texto en Mayuscula
echo "<pre>";
echo strtoupper($text);

// Convierte el primer elemento en minuscula
echo "<pre>";
echo lcfirst($text);

// Convierte el primer elemento en Mayuscula
echo "<pre>";
echo ucfirst($text);

echo "<br><br>";

##############
# Reemplazar #
##############

// reemplazamos cada espacio vacio por un guión(-)
$slug = str_replace(' ', '-', $text);
echo $slug;
echo strtolower($slug);

echo "<br><br>";

################
# Modificación #
################

// Si tenemos una factura se imprima de la siguiente forma.
$code = 39;

// Vamos a tener 8 espacio con 8 carácteres
echo "<br>";
echo str_pad($code, 8, '#');
echo "<br>";

// Ambos lados, izquierda y derecha
echo str_pad($code, 8, '#', STR_PAD_BOTH);
echo "<br>";
echo str_pad($code, 8, '#', STR_PAD_LEFT);
echo "<br>";
echo str_pad($code, 8, '#', STR_PAD_RIGHT);

echo "<br><br>";

// En nuestra base de datos no se deben de guardar etiquetas.
// Con strip_tags eliminamos cualquier etiqueta html que contega el dato
echo strip_tags($text);

echo "<br><br>";

# ELEMENTOS MONOBYTES Y MULTIBYTES.

$text_uno = "PHP es UN LENGUAJE, año 2020, programación";
$text_dos = "PHP es UN LENGUAJE, año 2020, programación";
echo strtoupper($text_uno); //monobye // PHP ES UN LENGUAJE, AñO 2020, PROGRAMACIóN
echo "<br>";

// Al colocar mb_nombrefuncion con esto formateamos correctamente.
echo mb_strtoupper($text_dos); //multibyte // PHP ES UN LENGUAJE, AÑO 2020, PROGRAMACIÓN
```

- preg-match

La función preg-match busca un carácter o cadena de caracteres en otra cadena. Por ejemplo, para validar que en un campo donde el usuario debía escribir una dirección de email, haya una arroba.

ARGUMENTOS OBLIGATORIOS: carácter o cadena que deseamos buscar (@), objeto donde se quiere buscar ese carácter ($email).

```php
<?php
/* Suponemos que venimos de un formulario donde el usuario ya completó su dirección en la variable $email
*/
if (preg_match ("/@/", $email)){
print ("Email correcto");
} else {
print ("A su email le falta la arroba!");
}
?>
```

Si en cambio, queremos buscar en vez de un símbolo una letra o cadena de texto, podemos agregar un parámetro extra para que realice la misma tarea, pero ignorando la diferencia entre mayúsculas y minúsculas (por ejemplo, para que considere que "a" y "A" son iguales): i

```php
<?php
/* Suponemos que el usuario escribió un Comentario en la página anterior, y se almacenó en la variable $comentario */
$insulto = "tonto";
if (preg_match ("/$insulto/i", $comentario)){
print ("No se permite esa palabra. Escriba su comentario con mayor cortesía");
} else {
print ("Gracias por su comentario");
}
?>
```
**Convertir saltos de linea a breaks html**

- nl2br

La función nl2br convierte los “Enters”( \n) que un usuario realiza en un campo multilínea (textarea), por ejemplo en tags <br> de HTML con el objetivo de respetar los “puntos aparte” tal cual los ingreso el usuario.

ARGUMENTOS OBLIGATORIOS: cadena a convertir ($comentario).

```php
<?php
$formateado = nl2br($comentario);
print ($formateado);
?>
```

**Contar la cantidad de letras de un string**

- strlen

La función strlen cuenta la cantidad de caracteres que contiene una cadena.

ARGUMENTOS OBLIGATORIOS: cadena a contar ($texto).

```php
<?php
$cuantas_letras = strlen($texto);
?>
```

**Otras funciones**

- htmlspecialchars

convierte los tags html de una cadena en sus entidades.

ARGUMENTO OBLIGATORIO: Cadena a la cual se le quieren convertir los tags html en entidades ($texto)

```php
htmlspecialchars ($texto);
```

- parse_str

baja automáticamente las variables enviadas a través del método GET a variables locales.

ARGUMENTOS OBLIGATORIOS: Cadena a la cual se le quieren bajar automáticamente las variables GET ($url).

SERVER[‘QUERY_STRING’] extrae todo lo que venga después del signo “?” en el comando GET.

```php
$url = SERVER[‘QUERY_STRING’];
parce_str($url);
```

- number_format

Formatear un número con los millares agrupados.

ARGUMENTOS OBLIGATORIOS: Numero a formatear ($dato1):

Si se agrega este solo parámetro el numero será formateado sin decimales, pero con una coma (",") entre cada grupo de millares.

```php
$conpuntos = number_format($dato1);
```

ARGUMENTOS OPCIONALES:

Cantidad de decimales : $dato sera formateado con tantos decimales como se hayan definido en decimals colocando un punto (".") delante, y una coma (",") entre cada grupo de millares.

```php
$conpuntos = number_format($dato1, 0, '', '.');
```

Separador de decimales y separador de millares: $datos sera formateado con tantos decimales como hayamos definido en decimals, dec_point sustituirá al punto (".") como seperador de los decimales y el separador por defecto de los millares, la coma (","), será sustituida por thousands_sep.

```php
$conpuntos = number_format($dato1, 0, '', '.');
```

**Encontrar la posición de algo**

- strpos

La función strpos nos indica la posición de un determinado carácter o cadena dentro de otra cadena.

ARGUMENTOS OBLIGATORIOS: la cadena donde buscar, y el carácter o caracteres de los que se quiere saber la posición.

ARGUMENTOS OPCIONALES: a partir de cuál carácter de la cadena empezar la búsqueda; de todos modos, el resultado lo dará contando desde la primera posición (cero) de la cadena.

```php
<?php
$cadena = "América Latina unida";
$abuscar = "unida";
$posicion = strpos($cadena,$abuscar);
print($posicion);
// Imprimirá 15 -comienza desde cero-.
?>
```

USO PRÁCTICO: Buscador de caracteres especiales

```php
<?php
$texto = ”Hoy es un día soleado”;
$existe = strpos(”ì”);

if ($existe===false) {

echo “No existe”;

}
else {

echo “Existe”;
}
?>
```

- strrpos

Nos indica la última posición de un determinado carácter o cadena dentro de otra cadena.

- stripos

Nos indica la posición de un determinado carácter o cadena dentro de otra cadena pero con la propiedad insensecase (sin importar mayúsculas o minúsculas).

- strstr

Devuelve como resultado toda la cadena de texto hasta su final a partir del carácter especificado.

ARGUMENTOS OBLIGATORIOS: cadena original ($email), carácter a partir del cual se quiere inicializar la cadena (@).

```php
<?php
$email = "hernan@saberweb.com.ar";
$caracter = "@";
$dominio = strstr($email,$caracter);
print($dominio);
// Imprimirá "@saberweb.com.ar"
?>
```

- strtr

realiza reemplazos en una cadena a partir del especificado en una tabla de reemplazos.

ARGUMENTOS OBLIGATORIOS: Cadena a la cual se le quieren realizar reemplazos ($texto), tabla con los datos de los reemplazos ($tablareemplazo).

```php
$tablareemplazo = array(“<b>”=>”<strong>”,”</b>”=>”</strong>”);
strtr($texto,$tablareemplazo);
```

- ucwords

Convierte en mayúscula la primera letra de cada palabra de una cadena.

ARGUMENTO OBLIGATORIO: Cadena a la cual se le quiere modificar la primera letra de cada palabra ($texto).

```php
$text = "php es un lenguaje";
echo ucwords($text);
// Php Es Un Lenguaje
```
</details>

## Expresiones regulares

<details>


- / → Es un contenedor. Este inicia y finaliza.
- ^ → Dentro del contenedor tenemos esta expresión que nos indica un inicio.
- $ → Cuando finalicemos utilizamos esta exprseión.
- \- → Nos sirve para especificar rangos.
- [] → Este es para especificar un patrón.
- {} → Este nos sirve para establecer condición.

```php
# EXPRESIONES REGULARES

/*

/:  CONTENEDOR
^: INICIO
$: FINAL
-: RANGO
[]: PATRÓN 
{}: CONDICIÓN

*/

$password = '12345';
$password1 = '123456a';
$password2 = '123456';

// Iniciamos con un contenedo // luego iniciamos con  ^ y que solo permita un patrón del 0 al 9 [0-9] 
// la condicion en llaves y que tenga como minimo 6 elementos y máximo 9 caracteres {6,9}
echo preg_match('/^[0-9]{6,9}$/', $password);
// Resultado 0

var_dump(preg_match('/^[0-9]{6,9}$/', $password1));
// Resultado int(0)

var_dump((bool)preg_match('/^[0-9]{6,9}$/', $password2));
// Resultado bool(true)
```

```php
<?php

$password='123456';
/**
 * Esta expresion regular exige caracteres
 * desde el 0 al 9  y que tenga una
 * longuitud de 6  a 9 caracteres
 */
$expreg='/^[0-9]{6,9}$/';

if (preg_match($expreg,$password)) {
    echo 'La contraseña tiene un formato correcto';
} else{
    echo 'La contraseña no tiene un formato correcto';
}
```

Las expresiones regulares (regex) en PHP son una herramienta muy útil para trabajar con cadenas de texto. Una expresión regular es un patrón que describe un conjunto de cadenas. En PHP, se pueden usar expresiones regulares para buscar, reemplazar, extraer y validar información en una cadena de texto.

Aquí hay algunos ejemplos de código que muestran cómo usar expresiones regulares en PHP:

**preg_match**: busca una ocurrencia de un patrón en una cadena y devuelve true si se encuentra o false si no se encuentra. Tiene dos argumentos: el patrón y la cadena en la que se busca.

```php
$email = 'juan@example.com';
$pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
if (preg_match($pattern, $email)) {
    echo 'La dirección de correo es válida.';
} else {
    echo 'La dirección de correo no es válida.';
}
```

**preg_replace**: reemplaza todas las ocurrencias de un patrón en una cadena con un valor especificado. Tiene tres argumentos: el patrón, el valor con el que se quiere reemplazar y la cadena en la que se busca.

```php
$text = 'Hola, mi nombre es Juan.';
$pattern = '/Juan/';
$replacement = 'Pedro';
$newText = preg_replace($pattern, $replacement, $text);
echo $newText; // Imprime: Hola, mi nombre es Pedro.
```

**preg_split**: divide una cadena en un array de subcadenas en función de un patrón. Tiene dos argumentos: el patrón y la cadena que se quiere dividir.

```php
$text = 'Hola, mi nombre es Juan y tengo 30 años';
$pattern = '/, | y /';
$words = preg_split($pattern, $text);
print_r($words);
/*
Imprime:
Array
(
    [0] => Hola
    [1] => mi nombre es Juan
    [2] => tengo 30 años
)
*/
```
</details>

## Iniciando nuestro proyecto

<details>

Vamops a iniciar un proyecto con PHP, Composer y PHPUnit

```sh
# Instalamos PHPUNIT
composer require --dev phpunit/phpunit
```

Se crearán la carpeta vendor y los archivos composer.json y composer.lock

```json
// composer.json

// Completamos el archivo con name, description y autoload
{
    "name": "sebasvillegas/validate",
    "description": "Proyecto de validación",
    "autoload": {
        "psr-4": {
            "App\\":"src/"    // Trabajaremos con el namespace App
        }
    },
    "require-dev": {
        "phpunit/phpunit": "^9.5"
    }
}
```

Ejecutamos la nueva configuración

```sh
composer dump
```

Creamos el archivo phpunit.xml en la carpeta raíz

```sh
touch phpunit.xml
```

```xml
<!-- phpunit.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="vendor/autoload.php" colors="true">
    <testsuite name="Test Directory">
         <directory>tests</directory>
    </testsuite>
</phpunit>
```

Creamos la carpeta tests

```sh
mkdir tests
```

Creamos la clase sobre la que realizaremos el test con la siguiente estructura de nombre NombreClaseTest.php

```sh
touch tests/ValidateTest.php
# Abrir con Visual Studio Code
code tests/ValidateTest.php 
```

```php
// ValidateTest.php
<?php

use PHPUnit\Framework\TestCase;
use App\Validate;

class ValidateTest extends TestCase
{
    public function test_email()
    {
        $email = Validate::email('optimusoft@outlook.com');
        $this->assertTrue($email);
    }
}
```

Creamos la carpeta src

```sh
mkdir src
```

Luego creamos el archivo con la clase que vamos a usar, siguiendo la teoría de nombres, en este caso no le agregamos test al final: NombreClase.php.

```sh
touch src/Validate.php

# Abre el archivo con vsCode
code src/Validate.php
```

Escribimos la clase con sus funciones como se muestra a continuación, retornando un boolean como validación o resultado del test. La función creada debe ser static function 

```php
<?php
// src/Validate.php
namespace App;

class Validate
{
     public static function email($value)
     {
        return (bool) filter_var($value, FILTER_VALIDATE_EMAIL);
     }
}
```

La función filter_var nos ayuda a filtrar una variable con muchas opciones distintas. PHP ha incluido varios filtros para ayudarnos a validar y sanear datos según estándares.

Por tanto ese return (bool) filter_var($value, FILTER_VALIDATE_EMAIL) revisará si el valor de $value cumple con la sintaxis de email RFC 822. Honestamente es mucho más práctico que usar preg_match y crear o buscar una expresión regular que valide emails (te aseguro que encontraras muchas expresiones regulares para esto, por lo que ¿cuál es la estándar?).

Dicho de otro modo, los filtros ya están construidos con las expresiones, patrones y condiciones necesarias para validar urls, números, booleanos, ip, direcciones mac, o también eliminar caracteres especiales, etiquetas... y sólo cambiando el nombre del filtro, ahorrando un montón de tiempo para que no tengas tú que construir estas validaciones

Doc filter -> https://www.php.net/manual/es/filter.filters.php

Finalmente ejecutamos la prueba en la consola con el siguiente comando

```sh
vendor/phpunit/phpunit/phpunit
```

**Ejecutando las pruebas**

El comando anterior ejecutará la prueba y nos lanzará el mensaje de validación o error correspondeinte. Se sugiere por buenas practicas ejecutar la validación antes de crear la calse, y durante la creación de la calse, así nos aseguramos de reconocer el valor negativo o de error. Nos debe aparecer algo similar a lo que se muestra acá:

```sh
Error: Call to undefined method App\Validate::email()

C:\xampp\htdocs\prueba\tests\ValidateTest.php:10

ERRORS!
Tests: 1, Assertions: 0, Errors: 1.
```

Este sería el resultado al ejecutar el comando cuando la función se sncuentré creada correctamente

```sh
.                       1 / 1 (100%)

Time: 00:00.060, Memory: 6.00 MB

OK (1 test, 1 assertion)
```

El archivo phpunit.xml es la configuración principal de PHPUnit para este proyecto. Específicamente, indica que se utilizará vendor/autoload.php como el archivo de inicio para cargar dependencias, y que se ejecutarán todos los tests dentro del directorio tests.

El archivo validateTest.php es una clase de prueba que extiende la clase TestCase de PHPUnit. La clase contiene un solo método de prueba, test_email, que prueba la función email de la clase Validate. La función email recibe una dirección de correo electrónico como entrada y devuelve true o false en función de si la dirección es válida o no. La función assertTrue comprueba si el resultado de la función es true.

El archivo validate.php es la clase Validate que contiene la función email que se está probando en la clase de prueba. La función email utiliza filter_var para validar la dirección de correo electrónico y devuelve true si la dirección es válida, y false en caso contrario. La función está marcada como static para que pueda ser invocada directamente desde la clase sin tener que crear una instancia.

</details>

## Argumentos

<details>

Los <mark>argumentos<mark> son los valores que van dentro de los paréntesis a la hora de llamar una función.

**Valores**

Es la forma más común de pasar argumentos a una función. Simplemente se le pasa el valor deseado y esta ejecuta el código que contiene.

**Referencias**

Si realizamos un cambio al parámetro dentro de la función, este solo mantendrá el nuevo valor dentro de dicha función. Si se consulta el valor fuera, será el que tenía antes de llamar a la función.

Para hacer que el valor de fuera de la función también cambie se utiliza el parámetro por referencia, esto hace que a la función se le pase la referencia del valor que está afuera y al modificarlo se mantengan esos cambios fuera de la función.

**Predeterminado**

Para darle un valor predeterminado a un argumento se hace como cualquier asignación a una variable, si al llamar la función no se le da un valor tomará el predeterminado.

```php
<?php

///////////////
// Por valor //
///////////////
function greet($name)
{
    return "Hola, $name!";
}

echo greet("Juan") . "<br/>";

////////////////////
// Por referencia //
////////////////////
$course = 'PHP';
// Indicamos que es la refencia da la variable a través 
// del símbolo &. De esta manera podemos modificar la 
// variable externa a la función.
function path(&$course)
{
    $course = "Laravel";
    echo "<br/> Laravel: $course";  // Laravel
}

path($course);
echo "<br/> Curso: $course"; // Laravel

////////////////////
// Predeterminado //
////////////////////
function greet2($name = "Juan")
{
    return "Hola, $name";
}

echo greet2(). "<br/>";
echo greet2("Campuzano");
```

Cuando usamos una función y pasamos argumentos, se realiza una **COPIA** el valor de esa variable al argumento que nosotros hayamos definido en la función.

Cuando hacemos uso del paso por referencia, lo que hacemos en **ENVIAR** la variable como tal, es decir, aquí ya no se hace una copia de esa variable sino que se envía directamente, lo que nos permite modificar su valor libremente desde dentro de la función.

</details>

## Return

<details>

La palabra reservada return siempre va ha estar dentro de una función, nos ayuda retornar.

Es una mala práctica no retornar nada de una función y hacer que esta se imprima cuando la llamemos.

```PHP
<?php
function saludo()
{
    return "Hola...";
}

echo saludo();
```

Si necesitamos retornar más de un elemento tendremos que utilizar la estructura de un Array.

```PHP
<?php
function saludo()
{
    return ['PDF','vista'];
}

var_dump(saludo());
```

No debemos confundir la función de exit() con la de return. Es verdad que exit() nos retorna un resultado, pero esta también detiene el sistema al ejecutarse.

</details>

## Closure
  
<details>

Las **funciones anónimas** son funciones que no poseen nombre. Se asignan a veriables que requieren lógica. La ejecución de la función se realiza a través de la variable.

```php
const greet = function ($name) {
  return "Hola, $name";
};

echo $greet('Mauri');
```

La palabra palabra clave **CLOSURE** dentro de los partámetro de una función indica que enviremos como argumento una función anónima.

```php
// Declaración de la función greet que recibe dos argumentos: un closure (función anónima) y un nombre
function greet(Closure $lang, $name) {
  // La función greet retorna el resultado de la ejecución del closure
  return $lang($name);
}

// Declaración de la variable $es, que es un closure
$es = function ($name) {
  // El closure $es retorna un saludo en español
  return "hola, $name";
};

// Declaración de la variable $en, que es un closure
$en = function ($name) {
  // El closure $en retorna un saludo en inglés
  return "Hello, $name";
};

// Llamada a la función greet con el closure $es y el nombre "Lynda"
echo greet($es, "Lynda"); // Hola, Lynda

// Llamada a la función greet con el closure $en y el nombre "Lynda"
echo greet($en, "Lynda"); // Hello, Lynda
```

Los **Closures** también se llaman **callbacks** porque son las funciones que son llamadas de regreso al terminar de ejecutar el código de otra función que te la pidió

</details>

## Array simple

<details>

Los datos de los Arrays son datos complejos por que nos permiten guardar varios datos dentro de una sola variable. Declaramos un array de la siguiente forma:

```php 
<?php

$courses = ['JS', 'Sass', 'PHP', 'Ruby'];
```

Recuerda que un array simple es aquel al cual no le hemos definido ninguna llave. Estamos hablando de los valores directamente.

El array simple es un array de toda la vida, el mismo que se usa en cualquier lenguaje. En PHP es válido definirlo usando corchetes "[]" pero también se puede usar una función llamada "array()" para crear arreglos, y existen muchas funciones predefinidas del lenguaje para mnipular arrays.

```php
<?php

$courses = ['JS', 'Sass', 'PHP', 'Ruby'];

echo "<prev>";
var_dump($courses);

echo "<prev>";
echo "Me gusta {$courses[3]} y {$courses[2]}.";

$courses2 = [
    'JS', 
    'Sass',
    8 =>'PHP',
    'Ruby'
];

echo "<prev>";
var_dump($courses2);
```

Recorriendo un array

```php
$courses = ['JS', 'Sass', 'PHP', 'Ruby'];

// FOREACH
echo '<ul>';
foreach ($cursos as $key => $curso) {
    echo "<li>$curso</li>";
}

// FOR
echo '<ul>';
for ($i=0; $i < count($cursos); $i++) { 
    echo "<li>$cursos[$i]</li>";
}
echo '</ul>';
```

Para visualizar mejor la estructura de datos, como ya se había mencionado antes se puede utilizar esta forma; se imprime la etiqueta "&lt;pre&gt;" de HTML.

</details>

## Array complejo

<details>

Los "arrays complejos" son llamados de igual forma "arrays asociativos", donde prácticamente al valor le poner un nombre, eso es todo, y lo interesante de esto es que actúa de la misma forma que una lista, así como actúa de la misma forma de un objeto JSON, tiene en lista el atributo clave/valor, esta es la forma más cómoda de trabajar con objetos JSON desde PHP, y claro que existen funciones para transformar un array asociativo en objetos JSON y viceversa.

Los datos de los Arrays son datos complejos por que nos permiten guardar varios datos dentro de una sola variable. Declaramos un array de la siguiente forma:

```php
<?php

$courses = [
    'frontend' => 'JS', 
    'framework' => 'laravel',
    'backend' => 'php'
];

foreach ($courses as $key => $var) {
    echo "<h4> $key: $var <br><h4>";
}

function upper($course, $key)
{
    echo ucfirst($course) . "=> $key <br>";
}

array_walk($courses, 'upper');
```

- array_walk('key', $array); → Nos ayuda a aplicar una función que le pasemos a cada miembro del array, es muy parecido a .map() o .each() en JS o Ruby.
- array_key_exists('key', $array); → Para saber si existe una key.
- in_array('valor', $array); → Nos ayuda a buscar si existe un valor en el Array.
- array_keys($array); → Nos imprime todos los keys en pantalla.
- array_values($array); → Nos imprime todos los valores en pantalla.

</details>

## Funciones PHP para arrays

<details>

DOC: https://www.php.net/manual/es/ref.array.php

Estas son algunas de las funciones de PHP utilizadas para los arrays:

- sort: Ordena un array.
- rsort: Ordena un array en orden inverso.
- ksort: Ordena un array por clave.
- krsort: Ordena un array por clave en orden inverso.
- array_slice: Extrae una parte de un array.
- array_chunk: Divide un array en fragmentos.
- array_shift: Quita un elemento del principio del array.
- array_pop: Extrae el último elemento del final del array.
- array_unshift: Añadir al inicio de un array uno a más elementos.
- array_push: Inserta uno o más elementos al final de un array.
- array_flip: Intercambia todas las claves de un array con sus valores asociados.

```php
<?php

$courses = ['php', 'javascript', 'laravel'];

$course = [
	10 => 'php', 
	100 => 'javascript', 
	1000 => 'laravel'
];

// ordenar 
//////////
sort($courses);

// Ordenar de forma Reversa
///////////////////////////
rsort($courses);


// Ordenar por Key
//////////////////
ksort($course);

// Ordenar de forma reversa
/////////////////////////////
krsort($course); 

echo("<pre>");
var_dump($courses);
echo "<br>";
var_dump($course);

echo "<br>";

// array_slide array rebanada
//////////////////////////////

// eliminamos el Key 1
array_slice($courses, 1);
var_dump(array_slice($course, 1));

//Resultado
/*
array(2) {
	[0]=>
	string(10) "javascript"
	[1]=>
	string(7) "laravel"
  }
*/

echo "<br>";

// array_chunk array pedazo
///////////////////////////
$courses_chunk = ['php', 'javascript', 'laravel'];
// creamos un 2 arrays y uno de ellos contiene dos elementos de los 3 que cotiene el array principal
array_chunk($courses_chunk, 2);
var_dump(array_chunk($courses_chunk, 2));

echo "<br>";

// array_shift() 
////////////////
$courses_shift = ['php', 'javascript', 'laravel'];
// Quita un elemento del principio del array
array_shift($courses_shift);
var_dump(array_shift($courses_shift));

echo "<br>";
// array_pop()
//////////////
$courses_pop = ['php', 'javascript', 'laravel'];
// Extrae el último elemento del final del array
array_pop($courses_pop);
var_dump($courses_pop);

echo "<br>";

// array_unshift()
//////////////////
$courses_unshift = ['php', 'javascript', 'laravel'];
// Añadir al inicio de un array uno a más elementos
array_unshift($courses_unshift, 'laravel2', 'javascript2');
var_dump($courses_unshift);

echo "<br>";
// array_push()
///////////////
$courses_push = ['php', 'javascript', 'laravel'];
// Inserta uno o más elementos al final de un array
array_push($courses_push, 'laravel1', 'javascript1');
var_dump($courses_push);

echo "<br>";

// array_flip()
///////////////
$courses_flip = [
	'backend' => 'php', 
	'forntend' => 'javascript'
];
// Intercambia todas las claves de un array con sus valores asociados
$intercambio = array_flip($courses_flip);
var_dump($intercambio);
```

<mark>TIP: Para imprimir una array completo podemos usar la función print_r ($array)</mark>

</details>

## Comparación

<details>

```php
<?php

$courses = ['php', 'javascript'];
$wishes = ['php', 'javascript', 'laravel', 'vuejs'];

// array_diff()
///////////////

// Calcula la diferencia entre arrays
echo "<pre>";
var_dump(array_diff($wishes, $courses));
// array(2) {
//  [1] => string(7) 'laravel'
//  [3] => string(5) 'vuejs'
// } 

echo "<br>";

$arrayA = [1, 2, 3, 4, 5];
$arrayB = [3, 4, 5, 6, 7];

// Evalua depende al orden que coloquemos
var_dump(array_diff($arrayA, $arrayB));
// array(2) {
//  [0] => int(1)
//  [1] => int(2)
// } 
var_dump(array_diff($arrayB, $arrayA));
// array(2) {
//  [3] => int(6)
//  [4] => int(7)
// } 

// array_diff_assoc()
/////////////////////

// Calcula la diferencia entre arrays con un chequeo adicional de índices

```
</details>

## Unión

<details>

```php
<?php

$frontend = [
    'html',
    'javascript',
    'react.js'
];

$backend = [
    'php',
    'laravel'    
];

$frontend2 = [
    'structure' => 'html',
    'frontend' => 'javascript',
    'framework' => 'react.js'
];

$backend2 = [
    'backend' => 'php',
    'framework bk' => 'laravel'    
];
// Podemos unir dos arryas así, pero terminaría borrando algunos valores. Sí
// queremos evitarlo debemos poner keys
var_dump($frontend + $backend);
var_dump($frontend2 + $backend2);

// Podemos usar una función también, pero solo con aquellos que tengan keys númericos
var_dump(array_merge($frontend, $backend));

// Si nuestros keys son letras debemos usar la siguiente función
var_dump(array_merge_recursive($frontend2, $backend2));

// Y si queremos combinar dos arrays,así creamos arrays complejos y lo hacemos con la función array_combine
$cursos = ['JS', 'php', 'laravel'];
$categorias = ['front', 'back', 'framework'];

var_dump(array_combine($cursos, $categorias));
```
</details>