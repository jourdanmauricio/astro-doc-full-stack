---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: PHP Fundamentos
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Fundamentos de PHP
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

## ¿Que es PHP?

<details>

**PHP** es un lenguaje de scripting de uso general que es especialmente adecuado para el desarrollo Web. 

Sus siglas provienen de Hypertext Preprocessor (procesador de hipertexto). Recordemos que HTML es Hypertext Markup Languaje. PHP es un preprocesador de HTML, finalmente nos dará un HTML limpio. 

- Del lado del Servidor
- Hypertext Preprocessor

**De propósito general**

- Código en el servidor. APIS, backend
- Crear comandos para terminal. ls, cut, etc
- Aplicaciones de escritorio. Se utiliza una librería externa llamada PHPGTK

- De alto nivel
- Es un lenguaje interpretado. No pasa por un proceso de compilación
- Es de tipado debil. No necesitamos definir los tipos explícitamente, infiere los tipos por nosotros

</details>

## Cómo interactúa una página web con tu backend

<details>

PHP se encuentra en el backend, pero cómo interactúa con la página Web que se encuentra en el front?

Se basa en el modelo <mark>cliente - servidor</mark>.

Toda nuestra aplicación esta guardada en un servidor, el cual entrega una copia de la misma a cada cliente que la solicite.

Además, el servidor también se encarga de responder cada solicitud del usuario.

- **Dominio**. El dominio es nuestra dirección en internet. Gracias a él cualquier computadora es capaz de encontrar páginas web.

- **Servidor físico o VPS**. Es la computadora que se encarga de guardar tu página web y mantener accesible 24/7. Se le conoce como servidor y siempre está conectado a internet. A través de él podemos definir ciertas reglas de seguridad para nuestra página.

- **Servidor web**. Es un programa que corre dentro de nuestro servidor físico y se encarga de gestionar cualquier petición que llegue al mismo. Esta petición es procesada por algún lenguaje de programación y al final devuelve una respuesta.

- **Métodos HTTP**. Los métodos HTTP son una forma de comunicación entre el cliente y el navegador. A través de una solicitud HTTP el cliente es capaz de pedirle al servidor que realice una acción

- **GET**. Este método permite solicitar información al servidor. Por ejemplo, podemos pedirle una lista de productos en el caso de que estemos haciendo un e-commerce o una lista de cursos si tenemos una pagina como Platzi.

- **POST**. Este método permite guardar información. Por ejemplo, podemos recabar datos del usuario desde un formulario y mandarlos a nuestro servidor para procesarlos. Podríamos guardarlos para armar una base de datos de usuarios o incluso un sistema de login.

- **PUT/PATCH**. Estos métodos permiten actualizar información ya guardada. Por ejemplo, podemos darle la oportunidad a un usuario de actualizar su correo electrónico o incluso cambiar su contraseña. La diferencia es que PUT reemplaza toda la información existente y PATCH solo reemplaza lo necesario, es decir, "parcha" la información

- **DELETE**. Este método lo usamos para eliminar un recurso del servidor. Por ejemplo, podemos usarlo si deseamos eliminar un blogpost o un comentario. Esto no significa que dejamos eliminarlo necesariamente dentro de nuestra base de datos, podemos hacer un "Soft delete".

</details>

## Instalación 

<details>

### Windows

Utilizamos Xampp

## Linux

Xampp tamnbién se encuentra disponible para linux pero existe una forma más interesante de instalarlo.

```sh
# Agregamos el repositorio
sudo add-apt-repository ppa:ondrej/php
# Actualizamos los repositorios
sudo apt update
# Actualizamos los paquetes
sudo apt upgrade

# Instalación de php y apache
sudo apt install php8.0 apache2
# Podemos revisar que versiones de php tenemos instaladas con
sudo dpkg --get-selections | grep php
# Para saver que versión de php tenemos ejecutando podemos utilizar el comando
php --version

# Habilitamos la version 8.0 en apache
sudo a2enmod php8.0
# Deshabilitamos la version 8.0 en apache
sudo a2dismod php8.0
# Habilitamos la version 8.1 en apache
sudo a2enmod php8.1
# Para efectivizar los cambios reiniciamos el servicio
systemctl restart apache2

# Modificamos los permisos
cd /var/www
sudo chown -R $(whoami):$(whoami) html

cd /var/www/html
sudo touch index.pho
nano index.php
```

```php
// index.php
<?php

phpinfo();
```
En el navegador: localhost

La configuración de PHP se almacena en el archivo <mark>php.ini</mark>. Vamos a modificarlo para que php muestre los errores, ya que por seguridad no los muestra.

```sh
sudo nano /etc/php/8.0/apache2/php.ini
# ctrl+w display_errors
# Reemplazamos display_errors = Off x
display_errors = On
# Guardamos con ctrl+o
# Confirmamos con enter
# Ctrl+x para salir
```

Finalmente podemos probar el entrono de PHP a través de la consola interactiva.

```sh
php -a
# Interactive mode enabled
```

```php
php > echo "Hola mundo!!!";
Hola mundo!!!

# Ctrl+c salimos de la consola interactiva
```
</details>

## Cómo ejecutar tus archivos PHP

<details>

- Si utilizamos Xampp los proyectos se encuentran en la carpeta xampp/htdocs. Desde ahí las levanta apache2 (será localhost)
- En linux la carpeta es /var/www/html

Recordemos que el servidor web por defecto busca un archivo llamado index.html o index.php. Si no encuentra un archivo llamado index, listará el directorio.

</details>

## Sintaxis básica de PHP

<details>

```sh
cd /var/www/html
mkdir curso-php
cd curso-php
touch index.php
code .
```

```php
# Etiqueta de apertura. Indica que comenzamos a trabajar con php
<?php
# Etiqueta de cierre. No es obligatoria, es obligatoria si vamos a combinar php con HTML
# ?>

# Las sentencias finalizan con ;
# Imprimir por patalla incorporando un salto de línea al final
echo "Hola desde PHP\n";

# El salto de línea final no funciona en el navegador, en cambio debemos utiliza <br>
# echo "Hola desde PHP<br>";

# Variables

$nombre="Mauricio";
$apellido="Jourdan";

echo "Me llamo: " . $nombre . " " . $apellido . "\n";
# Utilizando comillas dobles PHP interpola el texto con las variables
echo "Me llamo: $nombre $apellido \n";

# Operaciones matemáticas
echo "El resultado de 4x5 es: " .  4 * 5 . "\n";
```

```sh
# Ejecutamos el programa desde la terminal
php index.php
# Hola desde PHP
# Me llamo: Mauricio Jourdan
# Me llamo: Mauricio Jourdan
# El resultado de 4x5 es: 20
```
</details>

## Debugging y comentarios

<details>

```php
<?php

$personas = [
    "Mauricio" => 49,
    "Mr. Michi" => 7,
    "Juan" => 65
];

# var_dump permite inspeccionar el contenido de la variable
var_dump( $personas );

# array(3) {
#   ["Mauricio"]=>
#   int(49)
#   ["Mr. Michi"]=>
#   int(7)
#   ["Juan"]=>
#   int(65)
# }

# print_r también permite inspeccionar pero la salida es más limpia. var_dump arroja más info que print_r
print_r( $personas );

# Array
# (
#     [Mauricio] => 49
#     [Mr. Michi] => 7
#     [Juan] => 65
# )

# Comnentarios. Podemos utilizar #, // o /* */

// Primer Comentario
// Segundo Comentario
/* 
Comentario
de 
varias 
líneas
*/

```
</details>

## Variables y constantes
<details>

Las variables y las constantes son estructuras que guardan valores necesarios para el funcionamiento del programa.

Sin embargo, las variables se declaran anteponiendo el signo peso ($) al nombre de estas, y se inicializan entregando un valor luego de poner el operador de asignación =.

```php
$variable_1 = 99;
$variable_2 = 15;
echo $variable_1 + $variable_2;  // 114
```

Las variables pueden cambiar su valor durante el tiempo de ejecución del programa. Por ejemplo, pasando de guardar un número a guardar una cadena de caracteres.

```php
$variable_3 = 50;
echo $variable_3;  // 50
$variable_3 = "Andrés";
echo $variable_3;  // 'Andrés'
```

Las constantes se declaran con la función define(); esta función recibe por argumento dos valores separados por una coma (,), siendo el primero el nombre de la constante encerrado entre comillas dobles, y el segundo, el valor de esta. Por convención se espera que el nombre sea en mayúsculas.

```php
define("NUMERO_E", 2.7183);
echo NUMERO_E;  // 2.7183
```

Para usar las constantes, no hay necesidad de anteponer el signo peso ($).

</details>

## Tipos de datos
<details>

En programación tenemos varios tipos de datos, los más conocidos son:

**Numéricos**:
- Integer: Número sin decimales.
- Float: Número con punto flotante o punto decimal.
- Double: Decimales con valores más precisos, con más decimales que float.

**Cadenas ded caracteres:**
- Chart: Un solo una letra o un simbolo.
- String: Una cadena de caracteres.

**Booleanos:**
- Bool: Verdadero o falso.

**Sin valor:**
- Null: No hay valor.
- Undefined: Hay una variable pero no tiene ningun valor.

PHP tiene un tipado débil, no necesita que se defina de forma explicita el tipo de dato ya que lo deduce por si mismo.

PHP es capaz de convertir de un tipo a otro de forma automática. Por ejemplo si sumas un número con un string PHP evaluará ambos como números.

```php
print_r("25"+5);
// Aunque 25 sea un string el resultado será 30.
```
Si concatenas un string + un numero, solo va a sumar el numero en el string si el numero esta al inicio, si esta en medio o al final no lo tomará.

Y es que en realidad lo que esta tratando es de hacer la suma a pesar de que el numero es un string y no un numero. Si es un string, dirá: "Oye, junto a este numero, pusiste un valor que no es numerico, pero como puedo segregar el valor numerico ya que esta al inicio, lo sumaré".

Por ejemplo:
```php
$bags = "a 4 bags inside";
$how_many = $bags + 4;

echo $how_many; // 4
```
```php
$bags = "4 bags inside";
$how_many = $bags + 4;

echo $how_many; // 8
```
```php
$bags = "bags inside: 4";
$how_many = $bags + 4;

echo $how_many; // 4
```
</details>

## ¿Qué es el casting?

<details>

El <mark>Casting</mark> es la manera de indicar al interprete de PHP para forzar el cambio de un tipo de dato a otro deseado. Se puede acceder a esta utilidad anteponiendo el tipo de dato entre paréntesis antes de un valor o una variable al momento de la asignación o inicialización.

Las siguientes definiciones ayudan a forzar el cambio de tipos en PHP:

- (array) forzado al tipo arreglo
- (bool) forzado al tipo booleano
- (boolean) forzado al tipo booleano
- (double) forzado al tipo 'punto flotante'
- (float) forzado al tipo 'punto flotante'
- (int) forzado al tipo entero
- (integer) forzado al tipo entero
- (object) forzado al tipo objeto
- (string) forzado al tipo 'cadena de texto'

A continuación, se muestra un par de ejemplos de lo mencionado:

```php
$var_3 = "5";  // string(1) "5"
$var_4 = (int) $var_3;  // int(5)

$flag = 1;  // int(1)
$flag = (bool) $flag;  // bool(true)
```
</details>

## Operadores lógicos: ¿qué son las tablas de verdad?

<details>

Son los operadores que nos ayudan a combinar dos o mas afirmaciones para definir si una oración es cierta o falsa. Su uso esta basado en tablas de verdad.

**AND (y)**
Se usa para verificar si dos afirmaciones son ciertas, entonces la oración completa es cierta. Si una de ellas es falsa, entonces, la oración completa es falsa.

```php
# true AND true = True
# false AND true = False
# true AND false = False
# false AND false = False

# Se escribe así:
$valor_1 and $valor_2
$valor_1 && $valor_2
```

**OR (o)**

Si una de las 2 afirmaciones es cierta, entonces la oración completa es cierta. Si solo una de ellas es falsa, entonces, la oración completa es cierta.

```php
true OR true = True
false OR true = True
true OR false = True
false OR false = False

# Se escribe así:
$valor_1 or $valor_2
$valor_1 || $valor_2
```

**NOT (no)**

Se usa para invertir el significado de una oración

```php
NOT True ⇒ False
NOT False ⇒ True
```
</details>

## Operadores aritméticos

<details>

- Adición ⇒ +
- Sustracción ⇒ -
- Multiplicación ⇒ *
- División ⇒ /
- Modulo ⇒ % ⇒ Se usa para conocer el residuo de una división ⇒ $a % $b
- Potenciación ⇒ ** ⇒ $a ** $b
- Identidad ⇒ Sirve para convertir un string a un int o float, según sea el caso ⇒ + ⇒ +$a
- Negación ⇒ Convierte un numero positivo a negativo ⇒ -$a

</details>

## Operadores relacionales

<details>
Son usados en PHP para la comparación entre valores

| Operador |	Descripción    |
| -------- | ----------------- |
| ==	   | Igual a           |
| ===	   | Idéntico a        |
| !=	   | Diferente de      |
| <>	   | Diferente de      |
| !==      | No idéntico a     |
| >	       | Mayor que         |
| >=	   | Mayor o igual que |
| <	       | Menor que         |
| <=	   | Menor o igual que | 
| <=>      | Nave espacial     | 
| ??	   | Fusión de null    | 

```php
// devuelve 'true' si $a es igual a $b después de la manipulación de tipos.
$a == $b

// devuelve 'true' si $a es igual a $b, y son del mismo tipo.
$a === $b  

// devuelve 'true' si $a no es igual a $b después de la manipulación de tipos.
$a != $b  

// devuelve 'true' si $a no es igual a $b después de la manipulación de tipos.
$a <> $b  

// devuelve 'true' si $a no es igual a $b, o si no son del mismo tipo.
$a !== $b  

// devuelve 'true' si $a es estrictamente menor que $b.
$a < $b

// devuelve 'true' si $a es estrictamente mayor que $b.
$a > $b

// devuelve 'true' si $a es menor o igual que $b.
$a <= $b

// devuelve 'true' $a es mayor o igual que $b.
$a >= $b

// Un integer menor que, igual a, o mayor que cero cuando $a es respectivamente menor que, igual a, o mayor que $b.
$a <=> $b

// El primer operando de izquierda a derecha que exista y no sea null. null si no hay valores definidos y no son null.
$a ?? $b ?? $c
```
</details>

## Otros operadores en PHP

<details>

| Operador | Descripción |
| -- | -- |
| =	 |  Asignación |
| += |  Incremento |
| ++ |  Incremento |
| -= |  Decremento |
| -- |  Decremento |
| *= |  Multiplicación |
| /= |  División |
| .= |  Concatenación |

El operador de Asignación, representado por el signo =, se usa para indicar al intérprete que un determinado identificador deberá apuntar a un valor en memoria.

```php
$estatura = 1.65;
$talla = "XS";
$instrumento = "Bambuco";

// El operador de Incremento, representado por la secuencia +=, 
// se usa para simplificar la asignación de una adición sobre la misma variable.

$index = 0;
$index += 10;  // Equivale a la sentencia '$index = $index + 10;'

// El operador de Incremento unitario, representado por la secuencia ++, 
// se usa para simplificar la asignación de una adición unitaria sobre la misma variable. 
// Sin embargo, si el operador se encuentra a la izquierda de la variable, 
// se considera Pre-incremento (Incrementa en uno, y luego retorna el valor); 
// y si el operador se encuentra a la derecha de la variable, 
// se considera Post-incremento (Retorna el valor, y luego lo incrementa en uno).

$length = 6;
$length++;  // Equivale a la sentencia '$length = $length + 1;'

// El operador de Decremento, representado por la secuencia -=, 
// se usa para simplificar la asignación de una sustracción sobre la misma variable.

$juegos = 335;
$juegos -= 20;  // Equivale a la sentencia '$juegos = $juegos - 20;'

// El operador de Decremento unitario, representado por la secuencia --, 
// se usa para simplificar la asignación de una sustracción unitaria sobre la misma variable. 
// Sin embargo, si el operador se encuentra a la izquierda de la variable, 
// se considera Pre-decremento (Reduce en uno, y luego retorna el valor); 
// y si el operador se encuentra a la derecha de la variable, 
// se considera Post-decremento (Retorna el valor, y luego lo reduce en uno).

$peces = 15;
$peces--;  // Equivale a la sentencia '$peces = $peces - 1;'

// El operador de Multiplicación, representado por la secuencia *=, 
// se usa para simplificar la asignación de una multiplicación sobre la misma variable.

$casas = 3;
$casas *= 3;  // Equivale a la sentencia '$casas = $casas * 3;'

// El operador de División, representado por la secuencia /=, 
// se usa para simplificar la asignación de una división sobre la misma variable.

$cupcakes = 25;
$cupcakes /= 5;  // Equivale a la sentencia '$cupcakes = $cupcakes / 5;'

// El operador de Concatenación, representado por la secuencia .=, 
// se usa para simplificar la asignación de una concatenación sobre la misma variable.

$nombre = "Blanca";
$nombre .= " Nieves";  // Equivale a la sentencia '$nombre = $nombre . " Nieves";'
```
</details>

## Precedencia de operadores

<details>

La <mark>precedencia de operadores</mark> es una colección de reglas que definen cómo se ordenan las operaciones en una expresión que tiene más de un operador. Por ejemplo, en la expresión 3 + 4 * 5, primero se realiza la multiplicación y luego la suma, porque la multiplicación tiene mayor precedencia que la suma. Así, el resultado es 3 + (4 * 5) = 23 y no (3 + 4) * 5 = 35.

En PHP, la precedencia de operadores sigue un orden similar a la mayoría de los lenguajes de programación. Aquí te muestro una lista simplificada de operadores en orden de mayor a menor precedencia:

- Operadores de incremento y decremento: ++, --
- Operadores aritméticos: *, /, %
- Operadores aritméticos de adición y sustracción: +, -
- Operadores de comparación: <, <=, >, >=, ==, !=, ===, !==
- Operadores lógicos: &&, ||
- Operador de asignación: =, +=, -=, *=, /=, .= (concatenación)

Es importante recordar que puedes cambiar la precedencia de los operadores utilizando paréntesis. Por ejemplo, (3 + 4) * 5 cambiará la operación que se realiza primero.

También, algunos operadores tienen la misma precedencia y en estos casos se evalúan de izquierda a derecha. Por ejemplo, en la expresión 100 / 10 * 5, primero se realiza la división y luego la multiplicación, dando como resultado 50.

</details>