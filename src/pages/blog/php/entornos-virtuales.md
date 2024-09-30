---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Entornos Virtuales y Funciones Avanzadas
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Entornos Virtuales y Funciones Avanzadas
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

## ¿Debería seguir usando versiones antiguas de PHP?

<details>

Muchas veces puede que estés trabajando sobre un proyecto “legacy” o estés iniciando un proyecto nuevo.

> **Legacy** quiere decir proyecto con codigo antiguo 

### **Si es un proyecto legacy**

Cuando estás trabajando en proyectos que ya llevan tiempo de uso, muchas veces no es recomendable hacer el update. ¿Qué tan costos sería hacer ese update? ¿Vale la pena?

### **Actualización en sistemas distribuidos**

Muchas veces actualizar un sistema distribuido es más fácil, ya que simplemente toca actualizar pequeñas partes mientras lo demás sigue funcionando

### **Si es un proyecto nuevo que saldrá a producción**

Para el caso de proyectos nuevos, ¡siempre es mejor utilizar la última versión estable! Muchas veces las podemos encontrar como "**Stable version**" o incluso como "**LTS**". Esto nos asegura que nuestro sistema funcionará sin fallas por parte del lenguaje (y si las hay, serán corregidas).

### **Si es un proyecto nuevo que usarás para experimentar**

Acá puedes usar cualquier versión, incluso versiones beta. Esto te ayudará a explorar el futuro de cualquier lenguaje y descubrir cosas nuevas.

</details>

## Documentación: La biblia de PHP

<details>

https://www.php.net/manual/es/

Página princilpal https://www.php.net

Leer la documentacion de php diferencia entre un programador senior de un jr

Es muy importante ya que es la que te dicta como funciona el lenguaje y que novedades puede tener.

Tambien encontraras las built-in-functions

> 💡 **built-in-functions:** Son funciones predefinidas en el lenguaje tales como: empty() is_array(), array_diff_assoc(), etc. 

</details>

## ¿Qué es PHP Doc?

<details>

PHPDoc no es mas que un estandar informal que tenemos para documentar cédigo en PHP, de esta forma los editores de cédigo pueden mostrar sugerencias cuando implementemos el codigo que estamos comentando.

Es una adaptación de Javadoc y, además de ayudar a los editores de código, también puede ser útil para algunos generadores de documentacion como phpDocumentor.

```php
/**
 * @param int $n1
 * @param int $n2
 * @return int
 */
function suma(int $n1, int $n2): int {
    return $n1 + $n2;
}
```

Una vez puesto los comentarios relacionados a los requerimientos de la funcion, al hacer un hover sobre la funcion nos mostrará la leyenda de esa misma documentacion donde sea que usemos esa función

Es una buena práctica documentar tus funciones y clases durante la realizacion del código.

Extensión PHP DocBlocker -> https://marketplace.visualstudio.com/items?itemName=neilbrayfield.php-docblocker

PHP Doc funciona con clases, métodos de clases. Se puede agregar a cualquier función que deseemos documentar.

</details>

## ¿Para qué sirven los entornos virtuales?

<details>

Muchas veces necesitamos trabajar con distintos proyectos que usan diferentes versiones de PHP. Aunque en algunos sistemas operativos es facil cambiar entre versiones, muchas veces es recomendado utilizar entornos virtuales.

**¿Qué es un entorno virtual?**

Un entorno virtual nos permite encapsular todo lo necesario para que un proyecto pueda funcionar con las versiones que este mismo requiere. Esto a su vez permite que podamos tener varios proyectos con distintas versiones.

**Entornos Virtuales Populares:**

- Docker
- Laragon
- Vagrant

Un entorno virtual para programar con PHP, también conocido como entorno de desarrollo o sandbox, es una herramienta esencial para los desarrolladores de PHP. Proporciona un ambiente aislado y controlado en el cual puedes escribir, probar y depurar tus aplicaciones y scripts PHP de manera efectiva. Aquí te explico ampliamente para qué sirve un entorno virtual para programar con PHP:

- Aislamiento de entorno:

Un entorno virtual te permite crear un espacio aislado dentro de tu sistema operativo principal. Esto significa que puedes trabajar en proyectos de PHP sin preocuparte por afectar o interferir con otros proyectos o componentes del sistema. Cada entorno virtual es independiente y tiene su propia configuración.

- Gestión de dependencias:

PHP tiene muchas bibliotecas y dependencias que pueden variar de un proyecto a otro. Un entorno virtual te permite gestionar estas dependencias de forma aislada. Puedes instalar, actualizar y gestionar las bibliotecas y paquetes específicos para cada proyecto sin afectar a otros.
Versiones de PHP:

Algunos proyectos pueden requerir versiones específicas de PHP debido a diferencias en la sintaxis o características disponibles. Con un entorno virtual, puedes configurar la versión exacta de PHP que necesitas para cada proyecto, lo que garantiza la compatibilidad.

- Seguridad:

Los entornos virtuales permiten ejecutar código PHP de forma segura. Esto es especialmente importante cuando trabajas en aplicaciones web o sistemas que interactúan con bases de datos y servidores externos. El aislamiento ayuda a prevenir vulnerabilidades de seguridad y problemas relacionados con la ejecución de scripts maliciosos.

- Facilita la colaboración:

Cuando trabajas en equipo, es importante que todos los miembros del equipo tengan un entorno de desarrollo consistente y controlado. Los entornos virtuales facilitan la colaboración al garantizar que todos estén utilizando la misma configuración y versiones de PHP.

- Facilita la migración y despliegue:

Cuando estás listo para desplegar tu aplicación en un servidor de producción, un entorno virtual puede ayudarte a asegurarte de que todo funcione correctamente. Puedes replicar fácilmente la configuración de desarrollo en el servidor de producción, lo que reduce los problemas de compatibilidad.

- Experimentación y pruebas:

Puedes utilizar un entorno virtual para experimentar con nuevas características, probar soluciones a problemas y realizar pruebas unitarias y de integración de forma segura sin afectar a otros componentes del sistema.

- Aprendizaje y enseñanza:

Los entornos virtuales son excelentes para aprender y enseñar PHP. Los estudiantes pueden crear entornos aislados para practicar sin preocuparse por afectar sus sistemas personales, y los instructores pueden garantizar que todos los estudiantes tengan la misma configuración.

En resumen, un entorno virtual para programar con PHP es una herramienta esencial que proporciona aislamiento, gestión de dependencias, seguridad y compatibilidad para desarrolladores de PHP. Facilita el desarrollo, la colaboración y el despliegue de aplicaciones PHP de manera más eficiente y efectiva.

</details>

## Creando entornos virtuales con Vagrant

<details>

Vagrant es una herramienta para construir y administrar entornos de máquinas virtuales en un solo flujo de trabajo. Con un flujo de trabajo fácil de usar y un enfoque en la automatización, Vagrant reduce el tiempo de configuración del entorno de desarrollo, aumenta la paridad de producción y hace que la excusa "funciona en mi máquina" sea una reliquia del pasado.

Las máquinas se suministran sobre VirtualBox, VMware, AWS o cualquier otro proveedor. Luego, las herramientas de aprovisionamiento estándar de la industria, como scripts de shell, Chef o Puppet, pueden instalar y configurar automáticamente el software en la máquina virtual.

Instala Vagrant segun tu sistema operativo: es compatible con windows, linux y Mac

Busca un Box (vagrantfile) que se adapte a tus necesidades en tu entorno virtual en: https://app.vagrantup.com/boxes/search o que alguien configure un vagrantfile.

Crea un directorio donde instalar ese vagranfile 

```sh
mkdir vagrant_getting_started
```

Inicializa el proyecto descargando el box (descarga el vagrantFile) 

```sh
vagrant init hashicorp/bionic64
```

Levanta el vargrantfile con <code>vagrant up</code> (la primera vez tardara mas por la descarga de paquetes, posteriormente se quedaran como cache para iniciar mas rapidamente)

conéctate a tu maquina de vargrant con 

```sh
vagrant ssh  
```

Para salir de la maquina solo haz el comando: <code>logout</code> o <code>exit</code>

Para apagar la maquina de vagrant e impedir que siga utilizando recursos del pc, utiliza: <code>vagrant halt</code>

Tambien puedes apagar y borrar todos los recursos utilizados por vagrant con <code>vagrant destroy</code>

Y para borrar todos los datos descargados por el box utilizado en vagrant, es necesario buscar el box que quieres eliminar y correr 

```sh
vagrant box list 
vagrant box remove hashicorp/bionic64
```

</details>

## Creando entornos virtuales con Laragon

<details>

Un entorno virtual con Laragon es una herramienta para desarrollar aplicaciones web de manera aislada en un ambiente seguro y portátil. Con Laragon, los desarrolladores pueden crear entornos de desarrollo personalizados y utilizar una variedad de lenguajes de programación, incluyendo PHP, Node.js, Python, Java, Go y Ruby.

Para instalar Laragon, siga estos pasos:

- Descargue el instalador de Laragon desde su sitio web oficial.
- Ejecute el instalador y siga las instrucciones en pantalla para completar la instalación.
- Una vez que se complete la instalación, abra Laragon y seleccione el "Menú" en la esquina superior derecha de la pantalla.
- Seleccione "Nuevo proyecto" para crear un nuevo proyecto y seleccione el tipo de proyecto que desea crear.
- Especifique el nombre del proyecto y seleccione la versión de PHP o el lenguaje de programación que desea usar.
- Haga clic en "Crear" y Laragon creará automáticamente un entorno de desarrollo seguro y portátil para su proyecto.
- Con un entorno virtual con Laragon, los desarrolladores pueden trabajar de manera más eficiente y productiva, ya que no tienen que preocuparse por conflictos de software o problemas de compatibilidad. Además, pueden trabajar en cualquier lugar y en cualquier momento, ya que Laragon es completamente portátil y se puede ejecutar desde una unidad USB o un disco duro externo.

</details>

## ¿Qué son los Virtual Hosts?

<details>

Es una forma de que varias paginas web puedan funcionar al mismo tiempo en un mismo servidor. Los podemos definir por direcciones IP o por nombres de dominio.

Cuando trabajamos con localhost se pueden configurar para que un nombre de dominio que escribamos en nuestro navegador apunte hacia alguna pégina web que esté sirviendo Apache desde nuestra computadora.

Para configurar un virtual host tenemos que hacer dos cosas:

Decirle a Apache que exponga X pagina web en tal dominio.

Decirle al navegador que cuando escribamos X dominio redirija a la web que Apache esta exponiendo.

</details>

## Configurando Virtual Hosts en Linux

<details>

```sh
cd /etc/apache2/sites-available

sudo cp 000-default.conf mi-sitio.conf

sudo nano mi-sitio.conf
```

```sh
# mi-sitio.conf
ServerName mi-sitio.test
ServerAdmin jourdanmauiricio@gmail.com
DocumentRoot /var/www/html/my-project
```

```sh
sudo systemctl restart apache2 
```

```sh
sudo nano /etc/hosts
```
```sh
# /etc/hosts
127.0.0.1   localhost
127.0.0.1   mi-sitio.test
```

```sh
sudo a2ensite mi-sitio.conf
sudo systemctl reload apache2
```

</details>

## Constantes en PHP

<details>

Una constante es algo que nunca cambia, una vez asignado un valor ya no es posible modificarlo.

Las constantes en PHP son case-sensitive, distinguen entre mayúsculas y minúsculas. Por convención se declaran en mayúsculas.

Las constantes se definen a través de la palabra reservada **define()** o a trvés de **const**, aunque tienen sus diferencias.

### DIFERENCIA CONST VS DEFINE**

**Const**:

- Funciona dentro y fuera de la definición de una clase
- Define las constantes en tiempo de compilación
- No podemos usarlos dentro de bloques de código
- Solo acepta tipos de dato escalares
- Siempre es case sensitive

**Define**:

- Solo funciona fuera de la definición de una clase
- Define las constantes en tiempo de ejecución
- Si podemos usarlos dentro de bloques de código
- Acepta cualquier expresión
- Puedes definir case insensitive pasando “true” en el tercer argumento. (Esto solo para versiones anteriores a PHP 8, ya que a partir de la version 8 el valor “true” no es valido)


### Constantes predefinidas

Doc https://www.php.net/manual/es/language.constants.predefined.php

- PHP_VERSION
- PHP_OS
- E_ERROR

### CONSTANTES MÁGICAS

Las constantes mágicas son constantes cuyos valores cambian. Realmente no son constantes, se las llama así porque hacen referencia a algo que depende del entorno en que se encuentra ejecutando el script. En tiempo de ejecución ya no varían.

- \__LINE__: Nos indica en que línea está actualmente el script.

- \__FILE__: Nos indica cual es el archivo que se está ejecutando actualmente.

- \__DIR__: Nos brinda la dirección del archivo del cual es llamada.

- ClassName::class: Nos brinda el nombre completo de una clase.

```php
<?php
/* 
define ("MICHI", "Mr. Michi");
const PI = 3.1416;

$decision = true;
if ($decision) {
  define("BLOCK_CONSTANT","Esta constante fue declarada dentro de un if");
  echo BLOCK_CONSTANT;

  // const BLOCK_CONSTANT_2 = "No se puede declarar dentro de bloques";
}

echo MICHI;
echo "\n"; 

*/

echo E_ERROR;  // 1 (no hay error)

echo __LINE__;  // 20
?>
```

</details>

## ¿Variables... variables?

<details>

¿Qué son las variables variable? Simplemente, PHP interpreta la variable que está en donde debería estar el nombre para saber cual es la variable que realmente debe modificar.

```php
 $variable = "nombre";
 $$variable = "Mr. Michi";
 echo $nombre;

 // Mr. Michi
 ```

Internamente lo que hace PHP es lo siguiente.

```php
 $variable = "nombre";
 $nombre = "Mr. Michi";
 echo $nombre;

 // Mr. Michi
 ```

Por está razón, tenemos que nuestra variable $$variable se llama $nombre y su valor es Mr. Michi

</details>

## Scope de PHP

<details>

El scope (o ambito de las variables) es el contexto en dondte una variable es definida. Usualmente, la mayor del tiempo una variable tiene un ambito simple, es decir, está disponible en todo el archivo e incluso en otros archivos donde se haga un require.

**Ambito local**

Cuando empezamos a usar funciones el ambito de cualquier variable definida dentro de la función pasa a ser un ambito local.

En otras palabras, esa variable solo existe dentro de la función.

**La palabra reservada global**

Cuando queremos que una variable externa exista dentro de una función sin necesidad de pasarla como un parametro podemos usar la palabra reservada "global".

```php
$outside_variable = "Esto es una variable global";
function my_function() {
    global $outside_variable;
    echo $GLOBALS["outside_variable"];
}
```

Es posible ver todas las variables globales disponibles y creadas usando la variable $GLOBALS, y como este devuelve un array de las variables disponibles puedes acceder a estas.

```php
function my_function() {
    global $outside_variable;
    echo $outside_variable;
    echo $GLOBALS["outside_variable"];
}
```

</details>

## Variables superglobales

<details>

DOC https://www.php.net/manual/es/language.variables.superglobals.php

¿Qué son las **variables superglobales**? Las variables superglobales son variables predefinidas por PHP que estén disponibles en cualquier parte del cédigo, incluso sin necesidad de usar la palabra reservada global.

Algunos ejemplos:

- $GLOBALS: Nos brinda información de todas las variables globales que existen.
- $_SERVER: Nos brinda información del servidor.
- $_GET: Nos brinda información de todas las variables o parámetros que son pasadas por URL.
- $_POST: Nos brinda información de las variables que son enviadas a través del método POST de HTTP.
- $_FILES: Nos brinda información de variables de subida de ficheros HTTP con el método POST.
- $_COOKIE: Nos brinda información de todas las cookies.
- $_SESSION: Nos brinda información de todas las variables de sesiones.
- $_REQUEST: Por defecto contiene el contenido o valores de las variables superglobales $_GET, $_POST y $_COOKIE.
- $_ENV: Nos brinda información del entorno en el que se está ejecutando PHP.

</details>

## Redirecciones

<details>

**La función header()**

En el modelo cliente/servidor es común enviar informacion extra (autenticacion, control de cookies, control de caché, etc.). Esto lo podemos hacer con la funcion header.

Puedes enviar:

- autenticacion
- control de cookies
- control de cache

Uno de los headers que podemos mandar son redirects, es decir, el servidor puede responder al navegador, "**redirige al usuario a esta página**".

```php
header ("Location: https://platzi.com");
exit; 
// colocamos exit porque
// - cuando ingresa un ususario no se ejecuta porque realiza la redirección
// - cuando ingresa un robot ignora la senticia header y continúan, pero al entrarse el exit finaliza.
```

Tambien puedes redirigir a archivos especificos pero debemos **tener cuidado de no generar un bucle**

```php
//page.php
header("Location: index.php");
// index.php
header("Location: page.php");
```

**Consideraciones**

Los encabezados siempre deben ser enviados antes de enviar el cuerpo de la peticion, es decir antes de mandar el contenido. Eso quiere decir que, si imprimes HTML o cualquier otra cosa que genere cuerpo, al intentar redirigir con header obtendras un error.

> <mark>Recuerda que los encabezados deben ser los primeros en enviarse antes de enviar una respuesta o body. Recuerda utlizar la funcion exit() o die al terminar tus headers para que los crawlers se detengan de analizar</mark>

</details>

## Match

<details>

```php
<?php

/**
 * Obtiene el nombre completo del país según lo especificado por parámetro.
 *
 * NOTA: Se utiliza 'switch' que es compatible con todas las versiones de PHP.
 *
 * @param string $country Nombre corto del país.
 * @return string
 */
function get_country_name_switch($country) {

  $name = "";
  switch ($country) {
    case 'MX':
      $name = "México";
      break;
    case 'COL':
      $name = "Colombia";
      break;
    case 'EUA':
      $name = "Estados Unidos Americanos";
      break;
    default:
      $name = "Lo siento, no conozco ese país";
      break;
  }

  return $name;
}

// Imprimimos el resultado.
echo get_country_name_switch("MX") . PHP_EOL;

/**
 * Obtiene el nombre completo del país según lo especificado por parámetro.
 *
 * NOTA: Se utiliza 'match' el cuál se incorporó a partir de la versión 8 de php.
 *
 * @param string $country Nombre corto del país.
 * @return string
 */
function get_country_name_match($country) {

  return match($country) {
    "MX" => "México",
    "COL" => "Colombia",
    "EUA" => "Estados Unidos Americanos",
    default => "Lo siento, no conozco ese país"
  };

}

// Imprimimos el resultado.
echo get_country_name_match("LKASJDKLASDNLAS") . PHP_EOL;
```

</details>

## Funciones variables

Utilizan el mismo principio que las variables variables. Podemos ejecutar funciones a partir de cadenas de texto dinámicas.

<details>

```php
<?php
function michi(){
  echo "Meow";
}

function dogo(){
  echo "Woof";
}

function zorro(){
  echo "Grrr";
}

$function = "zorro";
$function();

?>
```

</details>

## Parámetros por referencia

<details>

Cuando declaras una variable, lo que sucede es que se ocupa un lugar en tu memoria para guardar el valor de dicha variable. ¿Y cómo sabe PHP que lugar de memoria se ocupó? 

Bueno, PHP lo sabe por que guarda la referencia de ese lugar. Los nombres de lugares de memoria suelen ser cosas como 0x123124234.

**Paso de parametros por referencia**

Cuando pasamos parametros a una función, lo que hacemos es hacer una copia de la variable, es decir, estamos guardando el mismo valor en diferentes espacios.

Hacer un paso por referencia significa que, en lugar de mandar una copia de la variable, estamos mandando la referencia de dicha variable. Es decir, estamos apuntando al mismo espacio en memoria gracias a que tenemos su referencia.

Para acceder a la referncia en memoria usamos **&** en la variable deseada para acceder a la variable original.

```php
$cat = "Meow!";

function make_a_cat_bark(&$cat_dog) {
    $cat_dog = "Woof!";
}

make_a_cat_bark($cat);
echo $cat; // Woof!
echo "\n";
```

</details>

## Argumentos a profundidad

<details>

```php
<?php

// Parámetros por defecto con array.
function sumar_edades($edades = array(13, 17, 35)) {
  // función built-in para sumar los elementos de un array
  return array_sum($edades);
}
echo sumar_edades() . PHP_EOL; // 65
echo sumar_edades(array(5, 10, 15)) . PHP_EOL; // 30

/**
 * Trailing commas implementado en PHP 8
 *
 * NOTA: En versiones anteriores a PHP 8
 * esto generará un error de sintaxis.
 */
function multiplicar($n1 = 1, $n2 = 2, $n3 = 3,) {
  return $n1 * $n2 * $n3;
}

echo multiplicar() . PHP_EOL; // 6

class UnaClaseRandom {}
class OtraClaseRandom {}

// Parámetros por defecto con clases.
function receive_a_class($class = new UnaClaseRandom) {
    echo $class::class;   // retorna el nombre de la clase
}

echo receive_a_class() . PHP_EOL;   // UnaClaseRandom
echo receive_a_class(new OtraClaseRandom) . PHP_EOL;   // OtraClaseRandom

// Orden de los parámetros. Forma correcta de escribirlos
// Los parámetros opcionales siempre se definen al final
function suma($n1, $n2 = 8)
{
    return $n1 + $n2;
}

echo suma(8) . PHP_EOL;  // 16
```

</details>

## Named arguments

<details>

Los Argumentos Nombrados son una característica introducida en PHP 8.0 que permite pasar argumentos a una función basándose en el nombre del parámetro, en lugar de la posición del parámetro. 

Esta característica puede ser muy útil, especialmente en funciones con un gran número de parámetros o cuando el orden de los parámetros no es intuitivo o fácil de recordar. 

```php
function get_person_name($name, $age, $country)
{
    echo "Tengo la información de $name, tiene $age años y vive en $country";
}

$res_edad = 18;
$res_country = "Prusia";

get_person_name(
    age: $res_edad,
    country: $res_country,
    name: "Edgar Brotjovick",
);

echo "\n";
```

A continuación, se presentan detalles sobre cómo funcionan los argumentos nombrados en PHP:

- Sintaxis: La sintaxis para pasar un argumento nombrado implica escribir el nombre del parámetro seguido de dos puntos y luego el valor para el argumento. Por ejemplo, si tienes una función definida como function find($needle, $haystack), puedes llamar a esta función usando argumentos nombrados como find(needle: 'a', haystack: 'haystack').

- Ventajas:

    - Legibilidad: Los argumentos nombrados pueden mejorar significativamente la legibilidad del código, especialmente en el caso de funciones que toman múltiples argumentos con valores predeterminados. Al usar argumentos nombrados, es claro qué valor corresponde a qué parámetro sin tener que contar la posición del argumento.

    - Mantenibilidad: El código puede ser más fácil de mantener y entender cuando se usan argumentos nombrados, ya que el nombre del parámetro proporciona un contexto adicional sobre qué representa cada valor pasado a la función.

- Compatibilidad: Los argumentos nombrados son compatibles con cualquier función o método en PHP, y están completamente controlados por el llamador. Esto significa que puedes usar argumentos nombrados al llamar a cualquier función o método en PHP, independientemente de si fue definido por ti, por PHP o por una biblioteca de terceros.

- Uso Tradicional vs Argumentos Nombrados: Tradicionalmente, cuando llamas a una función en PHP, pasas argumentos en el orden definido en la función. Con los argumentos nombrados, puedes especificar un valor para un parámetro prefixando el valor con el nombre del parámetro seguido de dos puntos, lo que te permite pasar argumentos en cualquier orden y omitir argumentos opcionales que tienen valores predeterminados.


Esta característica proporciona una mayor flexibilidad y puede hacer que el código sea más claro y fácil de entender, lo que puede ser muy beneficioso en proyectos grandes o complejos.

</details>

## Funciones anónimas

<details>

Las **funciones anónimas o también conocidas como Closures** son funciones que podemos definir sin necesidad de asignarles un nombre. Son muy similares a los callbacks de JavaScript.

Las podemos guardar dentro de variables, pero su uso mas común es pasarlas como parámetro de otra función.

**Las funciones anónimas son una instancia de la clase Closure**

```php
<?php

$numbers = [1,2,3,4];

$numbers_by_2 = array_map(function($current){
  return $current * 2;
}, $numbers);

print_r($numbers_by_2); // [2,4,6,8]

echo "\n";  
```

Cuando queremos que una variable externa exista dentro de un Closure sin necesidad de pasarla como parámetro podemos usar la palabra reservada "**use**"

```php
$michi = "Mr.Michi";

$change_michi_name = function() use($michi){
    echo $michi;
};

$change_michi_name();
echo "\n";
```

Con "**use**" cambiamos el ambito de la variable de global a local y la podemos usar dentro del closure, pero debemos tener en cuenta que solo podemos leerla, mas no cambiar su valor

</details>

## Arroww functions

<details>

Las funciones anónimas, también conocidas como closures, son una característica de PHP que permite la creación de funciones sin un nombre especificado. Aquí hay una explicación detallada basada en varios recursos:

1. Definición y Creación: Las funciones anónimas no tienen un nombre especificado al momento de la definición. Se crean utilizando la palabra clave function seguida de una lista opcional de parámetros y un cuerpo de función. Pueden ser asignadas a variables o pasadas como argumentos a otras funciones. Estas funciones son muy útiles como valores de parámetros que requieren una función como callback, entre otros usos. Además, están implementadas usando la clase Closure en PHP.

2. Uso:

- Asignación a Variables: Las funciones anónimas pueden ser asignadas a variables. Por ejemplo:

```php
$greet = function($name) {
  printf("Hello %s\\\\\\\r\\\\\\\n", $name);
};
$greet('World');
$greet('PHP');
```
- Callbacks: Las funciones anónimas son útiles como callbacks, por ejemplo, con funciones como array_map o preg_replace_callback. Por ejemplo:

```php
echo preg\_replace\_callback('~-(\[a-z])~', function ($match) {
  return strtoupper($match\[1]);
}, 'hello-world');  // outputs helloWorld
```

- Herencia de Variables del Ámbito Padre: Las funciones anónimas pueden heredar variables del ámbito en el que están definidas usando la palabra clave use: En este ejemplo, la función anónima tiene acceso a la variable $message del ámbito padre.

```php
$message = 'hello';

$example = function () use ($message) {
  var_dump($message);
};
$example();
```

3. Casos de Uso: Las funciones anónimas pueden ser utilizadas en diferentes situaciones según el caso de uso. Algunos casos de uso incluyen la asignación de valores a variables, implementación de lógica de callback, y encapsulación de lógica en un ámbito local, entre otros.

Las funciones anónimas son una herramienta poderosa en PHP que proporciona una forma flexible de crear y utilizar funciones en tiempo de ejecución. 

También permiten una organización de código más limpia y modular en ciertas situaciones. Por ejemplo, pueden ser muy útiles en situaciones donde una función se utilizará una sola vez o en casos donde una función necesita ser pasada como un argumento a otra función. 

También permiten una forma de capturar o "cerrar" sobre variables del ámbito circundante, proporcionando una forma de mantener el estado entre invocaciones de función.

```php
<?php
// Lee variables del ámbito global
$cajero = 10;
$add_cajero = fn($add) => $cajero + $add;

echo $add_cajero(20) . PHP_EOL;  // 30

// No se puede modificar un variable del ámbito global desde una arrow function
$cajero2 = 10;
$add_cajero2 = fn($add) => $cajero += $add; 
$add_cajero2(5);
$add_cajero2(5);
$add_cajero2(6);

echo $cajero2 . PHP_EOL;  // 10 

// Otro ejemplo
$edades = [5, 21, 50, 9 ,18]; 
$mayores_de_edad = array_filter($edades, fn($current) => $current >= 18);

echo implode(" ", $mayores_de_edad) . PHP_EOL;  // 21 50 18

// Yes
$where_am_i = "México";
$change_where_am_i = fn(&$where_am_i) => $where_am_i = "Colombia";
$change_where_am_i($where_am_i);

echo $where_am_i . PHP_EOL;   // Colombia
```

> <mark>Las arrow functions no definen ámbito local. Podemos utilizar variables del ámbito global, aunque solo para leer. No podemos modificar el valor de las variables globales.</mark>

</details>

## Declaraciones de tipo escalar

<details>

Cuando declaramos una funcion es posible indicar que tipo de datos queremos recibir en nuestros parametros. Esto nos da la certeza de que estamos trabajando con el tipo de dato que realmente necesitamos.

En otras palabras,podemos tipar nuestras funciones. Este comportamiento,por defecto,es de tipo coercitivo (opcional), pero podemos hacer que sea obligatorio poniendo la palabra reservada [declare] (https://www.php.net/manual/es/control-structures.declare.php) al inicio de nuestro script.

```php
<?php

// El tipado es opcional
function clacular_area_triangulo(int $base, int $altura, string $nombre) 
{
  return "Hola $nombre, el área del triángulo es:  " . ($base * $altura) / 2 . EOF;
}

clacular_area_triangulo("20", 2, "Mauri");  // Hola Mauri, el área del triángulo es: 25
```

```php
<?php
declare(strict_types=1);

// Tipado obligatorio
function calcular_area_triangulo(int $base, int $altura)
{
	return ($base * $altura) / 2;
}
```

PHP 7 añade soporte para declaraciones de tipo de devolución. Similarmente a las declaraciones de tipo de argumento, las declaraciones de tipo de devolución especifican el tipo del valor que será devuelto por una función. Están disponibles los mismos tipos tanto para las declaraciones de tipo de devolución como para las declaraciones de tipo de argumento.

```php
<?php
function sumarArrays(array ...$arrays): array 
{
  return array_map(function(array $array): int 
  {
    return array_sum($array);    
  }, $arrays);
}

print_r(sumarArrays([1,2,3], [4,5,6], [7,8,9]));
```

</details>

## Declaraciones de tipo devolución

<details>

De la misma forma que podemos declarar que tipo de dato queremos recibir, también podemos declarar que tipo de dato va a devolver nuestra función. Esto le da la certeza a cualquier persona que la implemente de que está trabajando con el tipo de dato que realmente necesita.

Este comportamiento, por defecto, es de tipo coecirtivo (opcional), pero podemos hacer que sea obligatorio poniendo la palabra reservada "declare" al inicio de nuestro script (Tanto como escalares como devolucion serán obligatorias, no se puede uno cada uno), en este caso, declaramos que la devolución tiene que ser de tipo int ($n2) : int, despues de los dos puntos.

```php
function suma(int $n1, int $n2) : int {
    return $n1 + $n2;
}
```
</details>

