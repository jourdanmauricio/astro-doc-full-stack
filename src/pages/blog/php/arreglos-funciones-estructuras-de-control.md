---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Arreglos, Funciones y Estructuras de Control
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Arreglos, Funciones y Estructuras de Control
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

## ¿Qué son los arreglos?

<details>

https://www.php.net/manual/es/index.php 

Tenemos mas de 1 forma de escribir arrays

```php
$edades = [20, 18, 40];

echo "Este es mi array  \n";
echo "Subindice 0 = ". $edades[0] . "\n";
echo "Subindice 1 = ". $edades[1] . "\n";
echo "Subindice 2 = ". $edades[2] . "\n";
echo "\n";

// declarando con la función array
$edadesF = array(20, 18, 40);
echo "Este es mi array usando la función ARRAY \n";
echo "Subindice 0 = ". $edadesF[0] . "\n";
echo "Subindice 1 = ". $edadesF[1] . "\n";
echo "Subindice 2 = ". $edadesF[2] . "\n";
```

</details>

## Arreglos asociativos

<details>

```php
$ages = [
    'Carlos' => 23,
    'Mr.popo' => 43,
    'Jesus' => 40,
];

echo $ages['Jesus'];

echo "La edad de Carlos es de: " . $ages['Carlos'] . "\n";
echo "La edad de Carlos es de {$ages['Carlos']} \n";
```

```php
$personas = array(
  "Carlos" => array(
    "edad" => 20,
    "apellidos" => array(
      "paterno" => "Santana",
      "materno" => "Morales",
    )
  ),
);

$carlos = $personas["Carlos"];

echo "La información de Carlos es: \n-Edad: $carlos[edad]" . "\n-Apellido Paterno: $carlos[apellido][paterno]" . "\n-Apellito Materno: $carlos[apellido][materno]";
```
</details>

## Manipulando arreglos

<details>
Documentación: https://www.php.net/manual-lookup.php?pattern=manuak%2Fes%2Fref.array.php&lang=es&scope=404quickref

```php

<?php

$edades = [18. 20, 22, 40];
$nombre = "Nombre";

// count -> Cantidad de elementos
echo count($edades) . '\n';  
// 4

// array_push -> agregar elemento al final del arreglo
array_push($edades, 13);

var_dump($edades);
// array(5) {
//   [0] => 
//   int(18)
//   [1] => 
//   int(20)
//   [2] => 
//   int(22)
//   [3] => 
//   int(40)
//   [4] => 
//   int(13)
// }

// array_unique -> Elimina valores duplicados de un array

$entrada = array("4", "4", "3", "4", "3", "3");
$resultado = array_unique($entrada);
var_dump($resultado);
// array(2) {
//   [0]=>
//   string(1) "4"
//   [2]=>
//   string(1) "3"
// }

// is_array() -> La función is_array() verifica si una variable es una matriz o no
if(is_array($nombre)){
    echo "Si es un array";
}else{
    echo "No es un array";
}
// No es un array

// explode() -> Convierte un string en un array
// explode(separetor,string,limit); 
 
$frase = "Nunca pares";
var_dump(explode(" ",$frase));


// implode() -> Convierte un array en un string
// implode(separador,string);

$palabras = ["No","Pares"];
var_dump(implode(" ",$palabras));

// otras funciones comunes

// array_keys -> retorna las claves de un array 
// array_pop -> extrae el último elemento del array
// array_search -> busca un elemento dentro del arraglo
```
</details>

## if y else

<details>

```php
$mayor_de_edad = 18;
$edadMaria = 15;

if ($edadMaria >= $mayor_de_edad) {
    echo "Maria es mayor de edad";
} else {
    echo "Maria es menor de edad";
}

echo "\n";

// Si solo se debe ejecutar una sentencia se pueden omitir las llaves
if ($edadMaria >= $mayor_de_edad) 
    echo "Maria es mayor de edad";
else
    echo "Maria es menor de edad";
```

En PHP, los bloques de código condicionales se pueden crear utilizando la sintaxis if, else y elseif.

La sintaxis básica de un bloque if es la siguiente:

```php
if (condición) {
    // Código a ejecutar si la condición es verdadera
}
```

En este caso, condición es una expresión booleana que se evalúa como verdadera o falsa. Si la condición es verdadera, el código dentro del bloque if se ejecutará. De lo contrario, el código se saltará.

Es posible agregar bloques else y elseif para crear una lógica más compleja. La sintaxis para un bloque else es la siguiente:

```php
if (condición) {
    // Código a ejecutar si la condición es verdadera
} else {
    // Código a ejecutar si la condición es falsa
}
```

En este caso, si la condición es falsa, el código dentro del bloque else se ejecutará.

La sintaxis para un bloque elseif es la siguiente:

```php
if (condición1) {
    // Código a ejecutar si la condición1 es verdadera
} elseif (condición2) {
    // Código a ejecutar si la condición1 es falsa y la condición2 es verdadera
} else {
    // Código a ejecutar si todas las condiciones son falsas
}
```
En este caso, si la condición1 es falsa, se evaluará la condición2. Si la condición2 es verdadera, se ejecutará el código dentro del bloque elseif. De lo contrario, se ejecutará el código dentro del bloque else.

A continuación, se presenta un ejemplo de código que utiliza bloques if y else para verificar si un número es par o impar:

```php
$numero = 4;

if ($numero % 2 == 0) {
    echo "El número es par";
} else {
    echo "El número es impar";
}
```
En este caso, se utiliza el operador % para calcular el resto de la división del número entre 2. Si el resto es 0, el número es par; de lo contrario, es impar.

</details>

## Switch

<details>

La sentencia switch es similar a una serie de sentencias IF en la misma expresión. En muchas ocasiones, es posible que se quiera comparar la misma variable (o expresión) con muchos valores diferentes, y ejecutar una parte de código distinta dependiendo de a que valor es igual. Para esto es exactamente la expresión switch. Documentación -> https://www.php.net/manual/es/control-structures.switch.php

```php
switch ($i) {
    case 0:
        echo "i es igual a 0";
        break;
    case 1:
        echo "i es igual a 1";
        break;
    case 2:
    case 3:
        echo "i es igual a 2";
        break;
    default:
        echo "i no existe";
}
```

**Usarlo cuando:**
- Necesitamos decidir entre un caso u otro
- Necesitamos una forma forma fácil de plantear distintas situaciones
- Cuando usarlo no signifique sacrificar la legibilidad del código

**No usarlo cuando:**
- Necesitamos comparaciones complejas
- Queremos veririficar un rango de números
- Necesitamos grandes bloques de código o el código se vuelve ilegible

</details>

## Ciclo while

<details>

```php
<?php

$contador = 0;

while($contador <= 3){
  $contador++;
  echo "$contador Este curso está cool\n";
}
// 0 Este curso está cool
// 1 Este curso está cool
// 2 Este curso está cool
// 3 Este curso está cool
```
</details>

## ¿Do... While?
<details>

```php
<?php 
$usernames = ["salem", "atzin"];

do {
  echo "se ejecuta por lo menos una vez";
  $username = readline("Ingresa tú nombre de usuario: ");
  echo "\n";
} 
while (in_array($username, $usernames));

echo "Hola $username \n";
```
</details>

## Ciclo for

<details>

```php
<?php

for($i = 0; $i <= 100; $i++){
  echo "Hello World $i";
  echo "\n";
}
```

```php
<?php

for($i = 0, $j = 0; $i < 10; $i++, $j += 2){
  echo "Hello World $i, $j";
  echo "\n";
}
```
</details>

## Ciclo foreach
<details>

```php
<?php 

$tiendita_de_cafes = array(
    "Americano" => 20, 
    "Latte" => 25,
    "Recalentado" => 10,
    "Capuccino" => 27.5,
    "Mocca" => 24
);

foreach ($tiendita_de_cafes as $price){
  echo "El cafe cuesta $$price \n";
}
echo "\n";

// Utilizando la key del array
foreach ($tiendita_de_cafes as $cafe => $price){
  echo "El cafe $cafe cuesta $$price \n";
}
echo "\n";
```

**Sentencias break y continue**

En PHP, las sentencias break y continue se utilizan dentro de estructuras de control para modificar el flujo de ejecución del programa.

La sentencia break se utiliza para salir de un bucle, mientras que la sentencia continue se utiliza para saltar una iteración del bucle y pasar a la siguiente.

- Ejemplo de la sentencia break

Un ejemplo de la sentencia break en la vida real es la búsqueda de un elemento en un arreglo. Por ejemplo, se puede utilizar un bucle for para buscar un número en un arreglo y salir del bucle cuando se encuentra el número.

```php
$numeros = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
$buscar = 5;

for ($i = 0; $i < count($numeros); $i++) {
    if ($numeros[$i] == $buscar) {
        echo "El número $buscar se encuentra en el índice $i.\n";
        break;
    }
}
// El número 5 se encuentra en el índice 4.
```
Este código utiliza un bucle for para buscar el número 5 en un arreglo y salir del bucle cuando se encuentra el número. Dentro del bloque for, se verifica si el valor del elemento actual del arreglo es igual al número a buscar; si es así, se imprime un mensaje y se utiliza la sentencia break para salir del bucle.

- Ejemplo de la sentencia continue

Un ejemplo de la sentencia continue en la vida real es la impresión de números pares en un rango determinado. Por ejemplo, se puede utilizar un bucle for para imprimir los números pares en el rango del 1 al 10.

```php
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 != 0) {
        continue;
    }
    echo "$i\n";
}
// 2
// 4
// 6
// 8
// 10
```

Este código utiliza un bucle for para imprimir los números pares en el rango del 1 al 10. Dentro del bloque for, se verifica si el valor del elemento actual es impar, si es así, se utiliza la sentencia continue para saltar a la siguiente iteración del bucle. Si el valor es par, se imprime el número utilizando el comando echo.

En resumen, las sentencias break y continue son útiles para modificar el flujo de ejecución de un programa dentro de estructuras de control como los bucles for y foreach.

</details>

## Funciones

<details>

Las funciones en PHP son bloques de código que se pueden llamar en cualquier parte de un programa para realizar una tarea específica. Las funciones se utilizan para modularizar el código y hacerlo más fácil de mantener y reutilizar.

**Definición de funciones**

Las funciones en PHP se definen utilizando la palabra clave function, seguida del nombre de la función y los parámetros que recibe (si los tiene), y luego el bloque de código que se ejecuta cuando se llama a la función. La sintaxis básica es la siguiente:

```php
function nombre_funcion($parametro1, $parametro2, ...) {
  // Código a ejecutar
}
```

En este caso, nombre_funcion es el nombre de la función y $parametro1, $parametro2, etc. son los parámetros que recibe la función. Los parámetros son opcionales y se pueden omitir si la función no los necesita.

**Llamado de funciones**

Para llamar a una función en PHP, se utiliza el nombre de la función seguido de los parámetros que se desean pasar a la función (si los tiene), encerrados en paréntesis. La sintaxis básica es la siguiente:

```php
nombre_funcion($arg1, $arg2, ...);
```

En este caso, nombre_funcion es el nombre de la función y $arg1, $arg2, etc. son los argumentos que se pasan a la función. Los argumentos son opcionales y se pueden omitir si la función no los necesita.

**Valor de retorno de funciones**

Las funciones en PHP pueden devolver un valor utilizando la palabra clave return. Si se utiliza return, la función terminará y devolverá el valor especificado. La sintaxis básica es la siguiente:

```php
function nombre_funcion($parametro1, $parametro2, ...) {
  // Código a ejecutar
  return $valor;
}
```

En este caso, $valor es el valor que se devuelve cuando se llama a la función. Si la función no tiene un valor de retorno, se puede omitir la palabra clave return.

Ejemplo de función en PHP
A continuación se muestra un ejemplo de una función en PHP que toma dos números como parámetros y devuelve su suma:

```php
function sumar($num1, $num2) {
  $resultado = $num1 + $num2;
  return $resultado;
}

// Llamado de la función
$suma = sumar(5, 3);

// Imprimir el resultado de la función
echo "La suma es: " . $suma;
```

En este caso, la función sumar toma dos números como parámetros, los suma y devuelve el resultado. Luego, se llama a la función con los argumentos 5 y 3, y se almacena el resultado en la variable $suma. Finalmente, se imprime el resultado utilizando el comando echo.

La salida esperada del código es:

```sh
La suma es: 8
```

**Funciones con parámetros por defecto**

En PHP, se pueden definir valores predeterminados para los parámetros de una función. Si se omite un argumento al llamar a la función, se utilizará el valor predeterminado. La sintaxis básica es la siguiente:

```php
function nombre_funcion($parametro1 = valor_predeterminado1, $parametro2 = valor_predeterminado2, ...) {
  // Código a ejecutar
}
```

En este caso, $parametro1, $parametro2, etc. son los parámetros que recibe la función y valor_predeterminado1, valor_predeterminado2, etc. son los valores predeterminados que se utilizarán si no se proporciona un valor para esos parámetros al llamar a la función.

**Ejemplo de función con parámetros por defecto en PHP**

A continuación se muestra un ejemplo de una función en PHP que toma un número como parámetro y un valor predeterminado de 1 para el segundo parámetro, que se utiliza para multiplicar el número:

```php
function multiplicar($num, $multiplicador = 1) {
  $resultado = $num * $multiplicador;
  return $resultado;
}

// Llamado de la función sin el segundo parámetro
$resultado1 = multiplicar(5);

// Llamado de la función con el segundo parámetro
$resultado2 = multiplicar(5, 3);

// Imprimir los resultados de la función
echo "Resultado 1: " . $resultado1 . "\\n";
echo "Resultado 2: " . $resultado2 . "\\n";
```

En este caso, la función multiplicar toma un número como parámetro y un valor predeterminado de 1 para el segundo parámetro, que se utiliza para multiplicar el número. Si se llama a la función sin proporcionar un segundo parámetro, se utilizará el valor predeterminado de 1. Si se proporciona un segundo parámetro, se utilizará ese valor en lugar del valor predeterminado.

La salida esperada del código es:

```sh
Resultado 1: 5
Resultado 2: 15
```

**Funciones con número variable de argumentos**

En PHP, se pueden definir funciones que acepten un número variable de argumentos utilizando el operador .... La sintaxis básica es la siguiente:

```php
function nombre_funcion(...$argumentos) {
  // Código a ejecutar
}
```

En este caso, $argumentos es un número variable de argumentos que se pueden pasar a la función.

**Ejemplo de función con número variable de argumentos en PHP**

A continuación se muestra un ejemplo de una función en PHP que acepta un número variable de argumentos y devuelve su suma:

```php
function sumar_varios(...$numeros) {
  $total = 0;
  foreach ($numeros as $num) {
    $total += $num;
  }
  return $total;
}

// Llamado de la función con diferentes números de argumentos
$resultado1 = sumar_varios(2, 4, 6, 8);
$resultado2 = sumar_varios(1, 3, 5);

// Imprimir los resultados de la función
echo "Resultado 1: " . $resultado1 . "\\n";
echo "Resultado 2: " . $resultado2 . "\\n";
```

En este caso, la función sumar_varios acepta un número variable de argumentos y devuelve la suma de los argumentos. El código utiliza un bucle foreach para iterar sobre los argumentos y sumarlos.

La salida esperada del código es:

```sh
Resultado 1: 20
Resultado 2: 9
```
</details>

## Unpacking

<details>

```php
$array1 = [1, 2, 3];
$array2 = [1, 2, 3];

$new_array = [...$array1 , ...$array2]
```
</details>

## Operador de nave espacial

<details>

Tengo una lista de precios de cafés en un array que deseo ordenar.

Lista de Precios: Primero tenemos una lista llamada $precios_de_cafes con varios números. Cada número representa el precio de un café diferente.

```php
$precios_de_cafes = [12, 56, 32, 89, 2, 1];

// Ordenar la Lista: Para ordenar esta lista, utilizamos una herramienta llamada usort(), que es una función en PHP que nos ayuda a ordenar elementos en un array de acuerdo a una regla que yo defino.

usort($precios_de_cafes, function($a, $b){ 
  return $a <=> $b;
});

// Función Anónima: Aquí debemos crear una "función anónima", es decir, una función sin nombre que sólo se usa aquí y que se invoca así misma. Esta función toma dos elementos a la vez (por ejemplo, $a y $b, que son precios de la lista), y decide cuál debería ir antes y cuál después.

// Operador de Nave Espacial: El <=> es conocido como el "operador de nave espacial". Compara los dos elementos ($a y $b):
// Si $a es menor que $b, devuelve -1 (lo que significa que $a va antes que $b).
// Si $a es igual a $b, devuelve 0 (quedan en el mismo orden que estaban).
// Si $a es mayor que $b, devuelve 1 (lo que significa que $a va después de $b).
// Mostrar el Resultado: Al final, utilizamos var_dump() para mostrar cómo quedó ordenada la lista después de usar usort(). Ahora la lista $precios_de_cafes estará organizada de menor a mayor precio.
var_dump($precios_de_cafes);
```
</details>

## Funciones predefinidas

<details>

- Texto -> https://www.php.net/manual/es/ref.strings.php

- Matemáticas -> https://www.php.net/manual/es/refs.math.php
</details>

