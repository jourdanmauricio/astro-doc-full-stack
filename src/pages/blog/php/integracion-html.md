---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Integración con HTML
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Integración con HTML
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

## PHP como preprocesador de HTML

<details>

Cuando comenzamos a combinar archivos PHP con HTML es importante empazar a utilizar las etiquetas de cierre. De esta forma, PHP sabe cuando se está ejecutando código PHP o cuán esta ejecutando HTML.

Aunque estemos trabajando con HTML, nuestros archivos seguirán siengo archivos .PHP, es por eso que PHP -a diferencia de otros lenguajes- tiene etiquetas de apertura y cierre, porque en el mismo archivo soporta dos lenguajes.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3</title>
</head>
<body>
    <h4>Impreso con HTML</h4>
    <?php
        echo"<h4>Impreso con PHP</h4>";
    ?>
</body>
</html>
```

</details>

## Imprime texto y etiquetas HTML

<details>

Existen varias formas de imprimir HTML utilizando PHP. A continuación, se presentan algunas de las formas más comunes:

- Concatenar HTML con variables PHP: Puedes concatenar cadenas de texto HTML con variables PHP para imprimir contenido dinámico. Aquí hay un ejemplo:

```php
<?php
$nombre = "Juan";
$edad = 25;
echo "<h2>Bienvenido, " . $nombre . "!</h2>";
echo "<p>Tienes " . $edad . " años.</p>";
?>
```

- Utilizar la sintaxis de apertura y cierre de PHP: Puedes utilizar la sintaxis de apertura y cierre de PHP para alternar entre el modo PHP y el modo HTML. Aquí hay un ejemplo:

```php
<?php
$nombre = "María";
$edad = 30;
?>
<h2>Bienvenida, <?php echo $nombre; ?>!</h2>
<p>Tienes <?php echo $edad; ?> años.</p>
```

- Utilizar la función printf: Puedes utilizar la función printf para formatear e imprimir contenido HTML. Aquí hay un ejemplo:

```php
<?php
$nombre = "Pedro";
$edad = 35;
printf("<h2>Bienvenido, %s!</h2>", $nombre);
printf("<p>Tienes %d años.</p>", $edad);
?>
```

- Utilizar la sintaxis abreviada <?= $variable ?>: Puedes utilizar la sintaxis abreviada <?= $variable ?> para imprimir el valor de una variable PHP directamente en el HTML. Aquí hay un ejemplo:

```html
<?php
$titulo = "Mi Página";
?>

<!DOCTYPE html>
<html lang="es">
<head>
   <meta charset="UTF-8">
   <title><?= $titulo ?></title>
</head>
<body>
   <h2>Bienvenidos a <?= $titulo ?>!</h2>
   <p>Esta es una página HTML generada por PHP.</p>
</body>
</html>
```

</details>

## Condicionales

<details>

La forma correcta usar el "if" de php en html:

```PHP
<?php if(condition): ?>
	# HTML code...
<?php else: ?>
	# HTML code...
<?php endif; ?>
```

```html
<?php
$age = 18;
$isAnAdult = ($age >= 18);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Condition</title>
</head>
<body>
    <!-- ESTO NO SE DEBE DE HACER -->
    <?php if ($isAnAdult) {
        echo "<p>Eres un adulto porque tienes $age años</p>";
    }else{
        echo "<p>No eres un adulto porque tienes $age años</p>";
    }
    ?>
    <!-- ESTO ES ACEPTABLE -->
    <?php if($isAnAdult) {?>
        <p>Eres un adulto porque tienes <?= $age ?> años</p>
    <?php }else{?>
        <p>No eres un adulto porque tienes <?= $age ?> años</p>
    <?php }?>
    <hr>
    <!-- ESTA ES LA MEJOR FORMA DE HACER ESTO -->
    <?php if($isAnAdult): ?>
        <p>Eres un adulto porque tienes <?= $age ?> años</p>
    <?php else: ?>
        <p>No eres un adulto porque tienes <?= $age ?> años</p>
    <?php endif; ?>
</body>
</html>
```

</details>

## Ciclos

<details>

<mark>Ciclo For con PHP y HTML</mark>

El ciclo for se utiliza cuando se conoce de antemano el número de repeticiones que se deben realizar. A continuación se muestra un ejemplo de cómo usar el ciclo for en PHP y HTML:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ciclo For</title>
</head>
<body>
    <?php for ($i = 1; $i <= 5; $i++): ?>
        <p>Iteración número: <?= $i ?></p>
    <?php endfor; ?>
</body>
</html>
```
En este ejemplo, el ciclo for se ejecuta 5 veces, imprimiendo el número de iteración en cada repetición.

<mark>Ciclo While con PHP y HTML</mark>

El ciclo while se utiliza cuando no se conoce el número exacto de repeticiones y se desea repetir un bloque de código mientras se cumpla una condición. A continuación se muestra un ejemplo de cómo usar el ciclo while en PHP y HTML:

El ciclo while se utiliza cuando no se conoce el número exacto de repeticiones y se desea repetir un bloque de código mientras se cumpla una condición. A continuación se muestra un ejemplo de cómo usar el ciclo while en PHP y HTML:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ciclo While</title>
</head>
<body>
    <?php $i = 1; ?>
    <?php while ($i <= 5): ?>
        <p>Iteración número: <?= $i ?></p>
        <?php $i++; ?>
    <?php endwhile; ?>
</body>
</html>
```
En este ejemplo, el ciclo while se ejecuta mientras la variable $i sea menor o igual a 5, imprimiendo el número de iteración en cada repetición.

<mark>Ciclo Foreach con PHP y HTML</mark>

El ciclo foreach se utiliza para recorrer elementos de un array o una colección de elementos. A continuación se muestra un ejemplo de cómo usar el ciclo foreach en PHP y HTML:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ciclo Foreach</title>
</head>
<body>
    <?php
    $frutas = array("manzana", "pera", "plátano", "naranja");
    foreach ($frutas as $fruta): ?>
        <p><?= $fruta ?></p>
    <?php endforeach; ?>
</body>
</html>
```

En este ejemplo, el ciclo foreach recorre el array $frutas e imprime cada elemento en una etiqueta &lt;p&gt;.

<mark>Ciclo Do-While con PHP y HTML</mark>

El ciclo do-while es similar al ciclo while, pero se asegura de que el bloque de código se ejecute al menos una vez, antes de verificar la condición para continuar o salir del ciclo. A continuación se muestra un ejemplo de cómo usar el ciclo do-while en PHP y HTML:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ciclo Do-While</title>
</head>
<body>
    <?php $i = 1; ?>
    <?php do: ?>
        <p>Iteración número: <?= $i ?></p>
        <?php $i++; ?>
    <?php while ($i <= 5); ?>
</body>
</html>
```
En este ejemplo, el ciclo do-while se ejecuta al menos una vez, imprimiendo el número de iteración en cada repetición y luego verificando si la condición se cumple para continuar o salir del ciclo.

</details>

## ¿Cómo pasar variables de PHP a JavaScript?

<details>

**SSR** PHP prepprocesa todo lo que se encuentra dentro de las etiquetas de PHP. Esto significa que PHP es capaz incluso de preprocesar código JavaScript, permitiendo pasar variables de PHP a JavasScript.

<mark>Se puede escribir código JavasScript desde PHP<mark>

```html
<?php
  // Creación de variables
  $personas = [
    [
      'id' => 0,
      'username' => "Joel",
    ],
    [
      'id' => 1,
      'username' => "Julieta",
    ],
    [
      'id' => 2,
      'username' => "Pepe",
    ],
  ];

  $saludo = "¡Hey, que tal!";
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iJCode - Integración de PHP con HTML</title>
</head>
<body>
  <h1 id="saludo"></h2>

    <!-- Obteniendo variables de PHP desde Javascript -->
    <script>
      // Declarando variables
      let d = document;
      let $saludo = d.getElementById('saludo');

      // Pintando en el H1 el valor de la variable obtenida de PHP en JS
      $saludo.textContent = '<?= $saludo ?>';

      // Mostrando en consola el arreglo obtenido de PHP en JS
      let personas = '<?= json_encode($personas) ?>'; // [{"id":0,"username":"Joel"},{"id":1,"username":"Julieta"},{"id":2,"username":"Pepe"}]
      let personasJson = JSON.parse(personas);
      console.log( personasJson ); // (3) [{…}, {…}, {…}]

      // Recorriendo el arreglo obtenido para mostrar los nombres
      personasJson.forEach((el) =>{
        console.log(el.username);
      });
      /*
        Joel
        Julieta
        Pepe
      */
    //  Nota*: Se debe tener cuidado de obtener datos de PHP desde Js ya que esta información se puede leer y editar desde el navegador

    </script>
    <script src='./index.js'></script>
</body>
</html>
```

```js
// index.js

console.log(personas)
```

**¿Y si queremos pasar variables desde JavasScript a PHP?**

Deberíamos plantearnos el para qué. Ya que es tan simple como realizar una petición asíncrona al servidor.

PHP sejecuta en tiempo de carga, mientras la página es procesada, JavaScript se ejecuta después de que la página fue cargada.

<mark>Debemos tener en cuenta las buenas prácticas. La información sesible se encuentra segura del lado servidor (PHP) pero si la enviamos al cliente es visible desde el navegador.</mark>

</details>

## Evita el código espagueti

<details>

PHP es un lenguaje muy propenso a crear codigo espagueti, ya que este es demasiado permisivo, por lo que es recomendable seguir buenas practicas a la hora de crear el codigo.

- Usar nombres de variables descriptivos a lo que almacena
- No combinar logica PHP con HTML
- Usar las etiquetas diseñadas de PHP para imprimir en HTML
- Si solo cuentas con un archivo, colocar toda la logica de PHP hasta arriba del documento
- No abusar de la libertad que nos brinda PHP

</details>

## Cómo obtener una solicitud al servidor con PHP

<details>

Para obtener una solicitud al servidor con PHP, generalmente se hace uso de variables superglobales que contienen la información enviada al servidor.

**Variables Superglobales**

DOC: https://www.php.net/manual/es/language.variables.superglobals.php

Las variables superglobales en PHP son variables especiales predefinidas que contienen información sobre diferentes aspectos del entorno de ejecución y las solicitudes HTTP. Estas variables están disponibles en todos los ámbitos del script y se llenan automáticamente por PHP, proporcionando información útil sobre la solicitud actual, las sesiones, las cookies, los datos del servidor y más.

PHP define variables superglobales a través de las cuales podemos acceder a cierta información desde cualquier parte del código.

Algunas de las principales variables superglobales son:

- $_GET
- $_POST
- $_REQUEST

**$_GET**

Este método permite solicitar información al servidor, pero también nos permite enviar información a través de la URL. $_GET es una de las variables superglobales en PHP que se utiliza para acceder a los datos pasados a través de una solicitud HTTP utilizando el método GET. Cuando un usuario hace una solicitud a un servidor web utilizando el método GET, los datos se envían en la URL como parámetros. La variable superglobal $_GET permite acceder a estos parámetros y trabajar con ellos en tu script PHP.

Cuando se realiza una solicitud GET, los parámetros se adjuntan a la URL de la siguiente manera: http:url/archivo.php?nombre=Juan&edad=25. En este ejemplo, "nombre" y "edad" son parámetros que se pueden acceder utilizando la variable $_GET.

Recuerda que los datos recibidos a través de $_GET no son seguros por defecto, ya que pueden ser manipulados por el usuario. Por lo tanto, es importante validar y sanitizar los datos antes de usarlos para evitar posibles vulnerabilidades de seguridad, como inyecciones de código o ataques XSS.

**$_POST**

Este método permite guardar información. Por ejemplo, podemos recabar datos del usuario desde un formulario y mandarlos a nuestro servidor para procesarlos.

Los datos se envían por “detrás” de la página, en el cuerpo de la petición.

$_POST es otra de las variables superglobales en PHP que se utiliza para acceder a los datos enviados a través de una solicitud HTTP utilizando el método POST. Cuando un usuario envía datos a través de un formulario HTML utilizando el método POST, estos datos se envían al servidor de manera que no son visibles en la URL, a diferencia del método GET. La variable superglobal $_POST permite acceder y manejar estos datos en tu script PHP.

**$_REQUEST**

$_REQUEST es otra de las variables superglobales en PHP que se utiliza para acceder a los datos de las solicitudes HTTP, pero a diferencia de $_GET y $_POST, $_REQUEST incluye datos de ambas solicitudes GET y POST, así como también datos de cookies.

Esta variable superglobal recopila datos de las siguientes fuentes:

- Datos pasados a través de una solicitud GET.
- Datos enviados a través de una solicitud POST.
- Datos almacenados en cookies.

Sin embargo, es importante tener en cuenta que debido a que $_REQUEST contiene datos de múltiples fuentes, su uso puede ser menos seguro que el uso de $_GET y $_POST por separado, ya que puede ser más difícil determinar la fuente exacta de los datos. Además, algunas configuraciones de servidor pueden deshabilitar la población de $_REQUEST para aumentar la seguridad.

Dado que $_REQUEST puede contener datos de múltiples orígenes y podría llevar a confusión, se recomienda utilizar $_GET y $_POST específicamente según el tipo de solicitud que estés manejando. Esto proporciona una mejor comprensión de dónde provienen los datos y puede ayudar a evitar problemas de seguridad.

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iJCode - Obtener solicitudes desde PHP</title>
</head>
<body>
  <script>
    // Creación de un objeto de formulario 'FormData'
    const formData = new FormData();

    // Agregar juego de clave-valor al objeto de Formulario
    formData.append("nombre", "Joel");
    formData.append("edad", "22");

    // Creación de una petición al servidor
    fetch("./server.php?color=naranja",{
      body: formData,
      method: 'POST',
    }).then(res => res.text())
  .then(data => {console.log(data)});

  </script>
</body>
</html>
```

```php
// server.php
<?php

// Se imprimen los valores de las variables globales ($_GET, $_POST, $_REQUEST)

// $_GET: Almacena los valores que se pasaron por parametro en la URL
var_dump($_GET);

// $_POST: Almacena los valores que fueron mandados por atras (POST)
var_dump($_POST);

// $_REQUEST: Almacena los valores tanto de $_GET y $_POST
var_dump($_REQUEST);
```
</details>

## Envío de un formulario a través de GET

<details>

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Envío de Formulario con GET</title>
</head>
<body>
  <!-- Se crea el formulario -->
  <!-- action: Hacia que archivo se mandan los datos -->
  <!-- method: Que método se usara -->
  <form action="server.php" method="GET">
    <!-- Se crean los inputs -->
    <!-- En el input es necesario agregar el atributo 'name' ya que de esta forma se mandara y se podra obtener su valor -->
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre"/>

    <label for="edad">Edad:</label>
    <input type="text" id="edad" name="edad"/>

    <!-- Se agrega el botón que enviara el formulario *Debe ser de tipo submit -->
    <button type="submit">Enviar Datos</bubtton>
  </form>
</body>
</html>
```
```php
// server.php
<?php
  // Se obtiene la información enviada por el método GET
  var_dump($_GET); 

  /*
    Salida de ejemplo:
        array(2) { ["nombre"]=> string(4) "Joel" ["edad"]=> string(1) "2" }
  */
```
</details>

## Envío de un formulario a través de POST

<details>

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iJCode - Envío de datos por POST</title>
</head>
<body>
  <!-- Creación del formulario -->
  <form action="./server.php" method="post">
    <label for="name">Nombre: </label>
    <input type="text" name="name" id="name">

    <label for="age">Edad: </label>
    <input type="text" name="age" id="age">

    <button type="submit">Enviar formulario</button>
  </form>
</body>
</html>
```

```php
// server.php
<?php
// Se obtiene lo que tiene la variable global $_POST
$post = $_POST;

// Se imprime lo que contiene la variable $post
var_dump($post);
/*
  Ejemplo de salida: 
  array(2) { ["name"]=> string(4) "Joel" ["age"]=> string(2) "12" }
*/

// Se valida si hay algún valor del arreglo que tenga el nombre de 'nombre' y 'edad', enviados desde el formulario
// Si si, se guarda en a variable correspondiente, si no, se guarda un valor por defecto
$name = isset($post['name'])? $post['name'] : 'Sin nombre';
$age = isset($_POST['age'])? $_POST['age'] : 'Sin edad';
$lastname = isset($_POST['lastname'])? $_POST['lastname'] : 'Sin apellido';

echo("\nEl nombre es: $name");
echo("\nLa edad es: $age");
echo("\nEl apellido es: $lastname");
/*
  Ejemplo de salida (pasando desde formulario 'nombre' y 'edad')
  El nombre es: Julieta La edad es: 53 El apellido es: Sin apellido
*/  

// Al utilizar el método POST, los datos se envían por la parte de atrás y no son visibles en la URL
// Pero se debe tener cuidado ya que los datos enviados pueden visualizarse desde las herramientas del desarrollador en el navegador
// específicamente desde: Network > Payload
```

</details>

## Envío de imágenes

<details>

Para enviar archivos al servidor usando PHP tenemos la variable superglobal $_FILES.

**$_FILES**

Cualquier archivo subido y enviado al servidor es guardado en una carpeta temporal que se limpia cada cierto tiempo.

La variable superglobal $_FILES contiene información en forma de array acerca del archivo que estamos manipulando, incluyendo su ruta a la carpeta temporal.

$_FILES es una de las variables superglobales en PHP que se utiliza para acceder a la información relacionada con los archivos que se han cargado en el servidor a través de una solicitud HTTP POST. Esta variable es especialmente útil cuando estás trabajando con formularios HTML que permiten a los usuarios cargar archivos, como imágenes, documentos, videos, etc.

Cuando un usuario envía un archivo a través de un formulario HTML con el atributo enctype configurado como "multipart/form-data" y el método POST, los detalles del archivo cargado se almacenan en el arreglo $_FILES. El contenido de $_FILES se organiza en un formato que proporciona información sobre el archivo cargado, como el nombre del archivo, su tipo MIME, la ubicación temporal en el servidor y otros detalles relevantes.

Aquí hay un ejemplo básico de cómo utilizar $_FILES para manejar un archivo cargado:

Supongamos que tienes un formulario HTML en un archivo llamado formulario.html:

```htm,l
<form action="procesar.php" method="post" enctype="multipart/form-data">
    <input type="file" name="archivo">
    <input type="submit" value="Subir archivo">
</form>
```

Luego, en un archivo llamado procesar.php, puedes manejar el archivo cargado usando $_FILES:

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['archivo'])) {
        $nombreArchivo = $_FILES['archivo']['name'];
        $tipoArchivo = $_FILES['archivo']['type'];
        $rutaTemporal = $_FILES['archivo']['tmp_name'];

        // Mover el archivo temporal a una ubicación permanente
        $rutaDestino = 'carpeta_destino/' . $nombreArchivo;
        move_uploaded_file($rutaTemporal, $rutaDestino);

        echo "Archivo subido con éxito: $nombreArchivo";
    } else {
        echo "No se seleccionó ningún archivo.";
    }
} else {
    echo "Esta página solo acepta solicitudes POST.";
}
?>
```

En este ejemplo, estamos verificando si la solicitud es una solicitud POST y luego accediendo a los detalles del archivo cargado a través de $_FILES. Luego, movemos el archivo temporal a una ubicación permanente utilizando move_uploaded_file().

Recuerda que el manejo de archivos cargados también debe ser seguro. Debes validar y verificar el archivo para asegurarte de que es seguro antes de moverlo o procesarlo en tu servidor.

**Multipart Form Data**

Por defecto, al enviar formularios en HTML tenemos un tipo de encriptación “application/x-www-form-urlencoded”, sin embargo, cuando trabajamos con archivos debemos cambiar este tipo de encriptado a “multipart/form-data”.

Código desarrollado para la clase:

**Formulario en HTML**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario con envío de imágenes</title>
</head>
<body>
    <!-- Formulario -->
    <form action="server.php" method="post" enctype="multipart/form-data">
        <!-- Nombre -->
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" placeholder="Nombre"><br>
        <!-- Apellido -->
        <label for="apellido">Apellido:</label>
        <input type="text" name="apellido" id="apellido" placeholder="Apellido"><br>
        <!-- Edad -->
        <label for="edad">Edad:</label>
        <input type="number" name="edad" id="edad" placeholder="Edad"><br>
        <!-- Imagen -->
        <label for="edad">Imagen:</label>
        <input type="file" name="imagen" id="imagen"><br>
        <!-- Envio -->
        <input type="submit" value="Enviar">
    </form>
</body>
</html>
```

**Servidor PHP**

```php
<?php

// Truco para debugear y ver lo que llega por POST
echo "<pre>";

var_dump($_FILES); // Recupera la información que se envía por FILES

echo "</pre>";

// Recuperamos los datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$edad = $_POST['edad'];
$nombreImagen = $_FILES['imagen']['name']; // Recuperamos el nombre de la imagen

// Mostramos los datos
echo "Hola $nombre $apellido, tienes $edad años, tu imagen es $nombreImagen";
?>
```

</details>

## Guardando imágenes en el servidor

<details>

Para guardar imágenes en el servidor utilizando PHP, debes seguir estos pasos:

**Crear un formulario HTML para cargar la imagen**

Crea un formulario en HTML que permita a los usuarios seleccionar y cargar imágenes. Asegúrate de configurar el atributo enctype del formulario como "multipart/form-data" para permitir la carga de archivos.

```html
<form action="procesar.php" method="post" enctype="multipart/form-data">
    <input type="file" name="imagen">
    <input type="submit" value="Subir imagen">
</form>
```

**Procesar la imagen en PHP**

Crea un archivo PHP (por ejemplo, procesar.php) para manejar la imagen cargada. Utiliza la variable superglobal $_FILES para acceder a los detalles de la imagen y luego guárdala en el servidor.

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $nombreArchivo = $_FILES['imagen']['name'];
        $rutaTemporal = $_FILES['imagen']['tmp_name'];

        // Ruta donde se guardará la imagen en el servidor
        $rutaDestino = 'carpeta_destino/' . $nombreArchivo;

        // Mover la imagen temporal a la ubicación deseada en el servidor
        if (move_uploaded_file($rutaTemporal, $rutaDestino)) {
            echo "Imagen subida con éxito: $nombreArchivo";
        } else {
            echo "Error al subir la imagen.";
        }
    } else {
        echo "Ocurrió un error al cargar la imagen.";
    }
} else {
    echo "Esta página solo acepta solicitudes POST.";
}
?>
```

**Crear una carpeta para almacenar las imágenes**

Crea una carpeta en tu servidor donde deseas almacenar las imágenes. En el ejemplo anterior, se usa 'carpeta_destino/', asegúrate de ajustar esto según tus necesidades.

- Asegurarse de que el servidor tenga permisos de escritura
- Asegúrate de que la carpeta donde deseas guardar las imágenes tenga los permisos de escritura adecuados para que PHP pueda mover las imágenes cargadas a esa ubicación.

**Sanitizar y validar la imagen (opcional pero importante)**

Antes de guardar la imagen, asegúrate de que sea un archivo de imagen válido y que cumpla con tus criterios de seguridad. Esto puede incluir verificar el tipo MIME de la imagen, su tamaño, y realizar otras validaciones para prevenir posibles problemas de seguridad.

**Mostrar imágenes almacenadas**

Una vez que las imágenes están almacenadas en el servidor, puedes mostrarlas en tus páginas web utilizando la etiqueta <img> y proporcionando la ruta adecuada.

Recuerda siempre tomar medidas de seguridad adecuadas al manejar archivos cargados por usuarios para evitar problemas de seguridad como ataques de inyección de código o la ejecución de scripts maliciosos.

Formulario en HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario con envío de imágenes y guardado en el servidor</title>
</head>
<body>
    <!-- Formulario -->
    <form action="server.php" method="post" enctype="multipart/form-data">
        <!-- Nombre -->
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" placeholder="Nombre"><br>
        <!-- Apellido -->
        <label for="apellido">Apellido:</label>
        <input type="text" name="apellido" id="apellido" placeholder="Apellido"><br>
        <!-- Edad -->
        <label for="edad">Edad:</label>
        <input type="number" name="edad" id="edad" placeholder="Edad"><br>
        <!-- Imagen -->
        <label for="edad">Imagen:</label>
        <input type="file" name="imagen" id="imagen"><br>
        <!-- Envio -->
        <input type="submit" value="Enviar">
    </form>
</body>
</html>
```

**Servidor PHP**

```php
<?php

// Truco para debugear y ver lo que llega por POST
echo "<pre>";
var_dump($_FILES); // Recupera la información que se envía por FILES
echo "</pre>";

// Recuperamos los datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$edad = $_POST['edad'];

// Recuperamos los datos de la imagen
$nombreImagen = $_FILES['imagen']['name']; // Recuperamos el nombre de la imagen
$tipoArchivo = $_FILES['imagen']['type']; // Recuperamos el tipo de archivo
$tmpImagen = $_FILES['imagen']['tmp_name']; // Recuperamos el nombre temporal de la imagen

// Definir la ruta de almacenamiento de las imágenes
$rutaAlmacenamiento = "imagenes/$nombreImagen";

// Guardamos la imagen en el servidor cambiando su ubicacion temporal a la ruta de almacenamiento
move_uploaded_file($tmpImagen, $rutaAlmacenamiento);

// Mostramos los datos
echo "Hola $nombre $apellido, tienes $edad años, tu imagen es $nombreImagen";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guardado de imagen en servidor</title>
</head>
<body>
    <!-- Mostrar la imagen Guardada -->
    <h2>Imagen guardada en el servidor</h2>
    <img src="<?= $rutaAlmacenamiento ?>" alt="<?= $nombreImagen ?>">
</body>
</html>
```

</details>

## Tipos de inputs

<details>

**El atriburo name** identifica al campo en la solicitud. 

### Tipos de campos

- Input simple

```html
<input type="text" name="Nombre" />
```

- Arreglos

```html
<input type="text" name="Personas[]" />
<input type="text" name="Personas[]" />
<input type="text" name="Personas[]" />
```

Al servidor llegará un arreglo llamado personas.

- Arreglos asociativos

```html
<input type="text" name="Personas[nombre]" />
<input type="email" name="Personas[email]" />
<input type="text" name="Personas[telefono]" />
```

- Checkbox

```html
<input type="checkbox" name="list1" />
<input type="checkbox" name="list2" />
<input type="checkbox" name="list3" />
```

```html
<form action="procesar.php" method="POST">
    <label for="hobbies">Hobbies:</label>
    <input type="checkbox" id="hobby1" name="hobbies[]" value="futbol">
    <label for="hobby1">Fútbol</label>
    <input type="checkbox" id="hobby2" name="hobbies[]" value="musica">
    <label for="hobby2">Música</label>
    <input type="checkbox" id="hobby3" name="hobbies[]" value="lectura">
    <label for="hobby3">Lectura</label>
    <button type="submit">Enviar</button>
</form>
```

- Radio

```html
<input type="radio" name="pais" />
<input type="radio" name="pais" />
<input type="radio" name="pais" />
```

- Múltiples Archivos

```html
<input type="file" multiple name="fotos[]" />
```

### Ejemplo

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iJCode - Tipos de Inputs</title>
</head>
<body>
  <!-- Tipos de Inputs - Mandados al servidor -->
  <form action="./server.php" method="POST" enctype="multipart/form-data">
    <!-- Input normal -->
    <label for="name">Ingrese su nombre:</label>
    <input type="text" name="name" id="name"/>
    <br>
    <br>

    <!-- Input como 'array' -->    
    <label>Ingresa el nombre de las personas</label>
    <input type="text" name="person[]"/>
    <input type="text" name="person[]"/>
    <input type="text" name="person[]"/>
    <br>
    <br>

    <!-- Input como 'array asociativo' -->    
    <label for="name">Ingrese sus datos:</label>
    <br>
    <label for="nameUser">Nombre:</label>
    <input type="text" name="user[name]" id="nameUser"/>
    <br>
    <label for="ageUser">edad:</label>
    <input type="number" name="user[age]" id="ageUser"/>
    <br>
    <label for="teamUser">Equipo Favorito:</label>
    <input type="text" name="user[team]" id="teamUser"/>
    <br>

    <br>
    <button type="submit">Enviar Formulario</button>

  </form>
</body>
</html>
```

```php
// server.php

// Obteniendo los datos pasados por POST
echo("<p>¿Qué contiene POST?</p>");
echo("<pre>");
  print_r($_POST);
  /*
  Ejemplo de salida:
  Array
  (
    [name] => Joel
    [person] => Array
      (
        [0] => Joel2
        [1] => Julieta
        [2] => Pepe
      )
    [user] => Array
      (
        [name] => Pepito
        [age] => 23
        [team] => Pumas
      )
  )
  */
echo("</pre>");

// Obteniendo los valores de cada uno

// Input normal
echo("<p>¿Qué valor mando el input normal?</p>");
echo("<pre>");
  
  var_dump($_POST["name"]); // string(4) "Joel"

echo("</pre>");


// Input como 'array'
echo("<p>¿Qué valor mando el input de tipo array?</p>");
echo("<pre>");
  
  var_dump($_POST["person"]);
  /*
    Salida de ejemplo:
    array(3) {
      [0]=>
      string(5) "Joel2"
      [1]=>
      string(7) "Julieta"
      [2]=>
      string(4) "Pepe"
    }
  */

echo("</pre>");


// Input como 'array asociativo'
echo("<p>¿Qué valor mando el input de tipo array asociativo?</p>");
echo("<pre>");
  
  var_dump($_POST["user"]);
  /*
    Salida de ejemplo:
    array(3) {
      ["name"]=>
      string(6) "Pepito"
      ["age"]=>
      string(2) "23"
      ["team"]=>
      string(5) "Pumas"
    }
  */

echo("</pre>");
```
</details>

## Otros tipos de inputs

<details>

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iJCode - Tipos de Inputs</title>
</head>
<body>
  <!-- Tipos de Inputs - Mandados al servidor -->
  <form action="./server.php" method="POST" enctype="multipart/form-data">
    <!-- Input normal -->
    <label for="name">Ingrese su nombre:</label>
    <input type="text" name="name" id="name"/>
    <br>
    <br>

    <!-- Input como 'array' -->    
    <label>Ingresa el nombre de las personas</label>
    <input type="text" name="person[]"/>
    <input type="text" name="person[]"/>
    <input type="text" name="person[]"/>
    <br>
    <br>

    <!-- Input como 'array asociativo' -->    
    <label for="name">Ingrese sus datos:</label>
    <br>
    <label for="nameUser">Nombre:</label>
    <input type="text" name="user[name]" id="nameUser"/>
    <br>
    <label for="ageUser">edad:</label>
    <input type="number" name="user[age]" id="ageUser"/>
    <br>
    <label for="teamUser">Equipo Favorito:</label>
    <input type="text" name="user[team]" id="teamUser"/>
    <br>
    <br>

    <!-- Input de tipo checkbox -->
    <label>Selecciona las materias que llevas este semestre:</label>
    <label for="mate">Matematicas</label>
    <input type="checkbox" name="materia1" id="mate" value="Matematicas"/>
    <label for="progra">Programación Funcional</label>
    <input type="checkbox" name="materia2" id="progra" value="Programción funcional"/>
    <label for="movil">Desarrollo móvil</label>
    <input type="checkbox" name="materia3" id="movil" value="Desarrollo móvil"/>
    <br>
    <br>

    <!-- Input de tipo radio -->
    <label>Selecciona tu sexo:</label>
    <label for="h">Hombre</label>
    <input type="radio" name="sexo" id="h" value="hombre">
    <label for="m">Mujer</label>
    <input type="radio" name="sexo" id="m" value="mujer">
    <br>
    <br>

    <!-- Input de tipo 'file' multiple -->
    <label for="files">Carga tus archivos</label>
    <input type="file" multiple name="files[]" id="files"/>
    <br>
    <br>

    <button type="submit">Enviar Formulario</button>

  </form>
</body>
</html>
```

```php
<?php
// server.php

// Obteniendo los datos pasados por POST
echo("<p>¿Qué contiene POST?</p>");
echo("<pre>");
  print_r($_POST);
  /*
  Ejemplo de salida:
  Array
  (
    [name] => Joel
    [person] => Array
        (
            [0] => Joel2
            [1] => Julieta
            [2] => Pepito
        )
    [user] => Array
        (
            [name] => Pepe
            [age] => 36
            [team] => Pumas
        )
    [materia1] => Matematicas
    [materia2] => Programción funcional
    [sexo] => hombre
  )
  */
echo("</pre>");

// Obteniendo los valores de cada uno

// Input normal
echo("<p>¿Qué valor mando el input normal?</p>");
echo("<pre>");
  
  var_dump($_POST["name"]); // string(4) "Joel"

echo("</pre>");


// Input como 'array'
echo("<p>¿Qué valor mando el input de tipo array?</p>");
echo("<pre>");
  
  var_dump($_POST["person"]);
  /*
    Salida de ejemplo:
    array(3) {
      [0]=>
      string(5) "Joel2"
      [1]=>
      string(7) "Julieta"
      [2]=>
      string(6) "Pepito"
    }
  */

echo("</pre>");


// Input como 'array asociativo'
echo("<p>¿Qué valor mando el input de tipo array asociativo?</p>");
echo("<pre>");
  
  var_dump($_POST["user"]);
  /*
    Salida de ejemplo:
    array(3) {
      ["name"]=>
      string(4) "Pepe"
      ["age"]=>
      string(2) "36"
      ["team"]=>
      string(5) "Pumas"
    }
  */

echo("</pre>");


// Input de tipo 'checkbox'
echo("<p>¿Qué valores mandaron los input de tipo checkbox?</p>");
echo("<pre>");

var_dump($_POST['materia1']);
var_dump($_POST['materia2']);
var_dump($_POST['materia3']);
/*
  string(11) "Matematicas"
  string(22) "Programción funcional"
  Undefined index: materia3 in C:\xampp\htdocs\integracion-php-con-html\new\server.php on line 85 NULL
*/


echo("</pre>");


// Input de tipo 'radio'
echo("<p>¿Qué valor mando el input de tipo radio?</p>");
echo("<pre>");

var_dump($_POST['sexo']); // string(6) "hombre"

echo("</pre>");


// Input de tipo 'file' mutiple
echo("<p>¿Qué valor mando el input de tipo file?</p>");
echo("<pre>");

var_dump($_FILES['files']);
/*
    array(5) {
      ["name"]=>
      array(2) {
        [0]=>
        string(9) "firma.png"
        [1]=>
        string(9) "fondo.jpg"
      }
      ["type"]=>
      array(2) {
        [0]=>
        string(9) "image/png"
        [1]=>
        string(10) "image/jpeg"
      }
      ["tmp_name"]=>
      array(2) {
        [0]=>
        string(24) "C:\xampp\tmp\phpA37E.tmp"
        [1]=>
        string(24) "C:\xampp\tmp\phpA38F.tmp"
      }
      ["error"]=>
      array(2) {
        [0]=>
        int(0)
        [1]=>
        int(0)
      }
      ["size"]=>
      array(2) {
        [0]=>
        int(4671)
        [1]=>
        int(1426311)
      }
    }
*/

echo("</pre>");
```
</details>

## Valida si un formulario ha sido enviado

<details>

Puedes usar las <mark>funciones isset() y empty()</mark> en conjunto para validar si un formulario se ha enviado y si los campos están completos en PHP. isset() verifica si una variable está definida y empty() verifica si una variable está vacía. Aquí tienes un ejemplo de cómo hacerlo:

- Empty

En PHP, la función empty() se utiliza para verificar si una variable está vacía. Una variable se considera vacía si se cumple una o más de las siguientes condiciones:

- La variable no está definida.
- La variable tiene un valor que se evalúa como falso, como null, false, 0, una cadena vacía "" o un arreglo vacío.
- La sintaxis básica de la función empty() es la siguiente:

```php
bool empty ( mixed $variable )
```

Donde $variable es la variable que deseas verificar.

Aquí tienes algunos ejemplos de cómo se utiliza empty():

```php
$nombre = "Juan";
$edad = 0;
$correo = "";
$telefono = null;
$arreglo = array();

if (empty($nombre)) {
    echo "El nombre está vacío.";
} else {
    echo "El nombre no está vacío.";
}

if (empty($edad)) {
    echo "La edad está vacía.";
} else {
    echo "La edad no está vacía.";
}

if (empty($correo)) {
    echo "El correo está vacío.";
} else {
    echo "El correo no está vacío.";
}

if (empty($telefono)) {
    echo "El teléfono está vacío.";
} else {
    echo "El teléfono no está vacío.";
}

if (empty($arreglo)) {
    echo "El arreglo está vacío.";
} else {
    echo "El arreglo no está vacío.";
}
```

En estos ejemplos, la función empty() se utiliza para verificar si las variables tienen valores que se consideran como "vacíos". Como resultado, obtendrás diferentes mensajes dependiendo de si las variables cumplen las condiciones de estar vacías o no.

Recuerda que empty() solo verifica si una variable está vacía según las condiciones mencionadas. Si deseas verificar si una variable existe o está definida, debes usar isset().

- Isset

En PHP, la función isset() se utiliza para verificar si una variable está definida y tiene un valor asignado. La función devuelve true si la variable está definida y tiene un valor, y false si la variable no está definida o su valor es null.

La sintaxis básica de la función isset() es la siguiente:

```php
bool isset ( mixed $variable [, mixed $... ] )
```

Donde $variable es la variable que deseas verificar y $... indica que puedes proporcionar más variables para verificar en la misma llamada a la función.

Aquí tienes algunos ejemplos de cómo se utiliza isset():

```php
$nombre = "Juan";
$edad = null;
$correo = "";

if (isset($nombre)) {
    echo "La variable \\$nombre está definida.";
} else {
    echo "La variable \\$nombre no está definida.";
}

if (isset($edad)) {
    echo "La variable \\$edad está definida.";
} else {
    echo "La variable \\$edad no está definida.";
}

if (isset($correo)) {
    echo "La variable \\$correo está definida.";
} else {
    echo "La variable \\$correo no está definida.";
}
```

En estos ejemplos, la función isset() se utiliza para verificar si las variables están definidas. Las variables que tienen valores asignados, incluso si son null o cadenas vacías, se consideran definidas. Las variables que no han sido declaradas o definidas devolverán false en la función isset().

La función isset() es especialmente útil para evitar errores al intentar acceder a variables que podrían no existir. Antes de utilizar una variable, puedes usar isset() para verificar si está definida y, si es así, proceder a trabajar con su valor.

Recuerda que, dependiendo de tus necesidades, también puedes aplicar otras validaciones adicionales a los datos recibidos para garantizar que sean válidos y seguros antes de procesarlos.

**Ejemplo**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validando el envío de un formulario</title>
</head>
<body>
    <!-- Formulario -->
    <form action="server.php" method="post" enctype="multipart/form-data">

        <!-- Input simple -->
        <label><h4>Datos usuario</h4></label>
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" placeholder="Nombre"><br>
        <label for="apellido">Apellido:</label>
        <input type="text" name="apellido" id="apellido" placeholder="Apellido"><br>
        <label for="edad">Edad:</label>
        <input type="number" name="edad" id="edad" placeholder="Edad"><br>

        <!-- Reset -->
        <input type="reset" value="Limpiar">

        <!-- Envio -->
        <button name="enviar" type="submit">Enviar</button>
    </form>
</body>
</html>
```

```php
<?php

// // Truco para debugear y ver lo que llega por POST
// echo "<pre>";
// var_dump($_POST); // Recupera la información que se envía por POST
// var_dump($_FILES); // Recupera la información que se envía por FILES
// echo "</pre>";

if(isset($_POST["nombre"], $_POST["apellido"], $_POST["edad"]) && !empty($_POST["nombre"]) && !empty($_POST["apellido"]) && !empty($_POST["edad"])) {
    echo "Hola: " . $_POST["nombre"] . " " . $_POST["apellido"] . ", tu edad es " . $_POST["edad"]. "<br>";
} else {
    echo "No se ha enviado la totalidad de los datos <br>";
}

if(isset($_POST["enviar"])) {
    echo "Se ha enviado el formulario";
} else {
    echo "No se ha enviado ningun formulario";
}
?>
```
</details>

## Sanitizando datos de mi formulario

<details>

Hay varias maneras de sanitizar datos de formulario en PHP para evitar ataques de inyección de código y proteger la seguridad de la aplicación. A continuación, se presentan algunas opciones:

- Utilizar la función **htmlspecialchars()**: esta función convierte caracteres especiales en entidades HTML, evitando así que se interpreten como código. Por ejemplo: $name = htmlspecialchars($_POST['name']);

- Utilizar la función **strip_tags()**: esta función elimina todas las etiquetas HTML y PHP de una cadena, lo que impide que se ejecute código malicioso. Por ejemplo: $comment = strip_tags($_POST['comment']);

- Utilizar la función **intval()**: esta función convierte una variable en un entero y elimina cualquier valor no numérico. Por ejemplo: **$id = intval($_POST['id']); **

- Utilizar la función **filter_var()**: esta función permite filtrar una variable a través de diferentes tipos de filtros, como filtros de correo electrónico, URL o entero. Por ejemplo: $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

- Utilizar **expresiones regulares**: las expresiones regulares (regex) son una herramienta muy potente para validar y sanitizar datos de formulario. Por ejemplo, para permitir solo números y letras en un campo de texto, se puede utilizar la siguiente expresión regular: /^[a-zA-Z0-9]+$/

Es importante tener en cuenta que la sanitización de datos no es suficiente en sí misma para proteger la aplicación de ataques de inyección de código. También es necesario validar los datos de formulario para asegurarse de que cumplen con los requisitos de la aplicación y utilizar consultas preparadas y parámetros con marcadores para proteger las consultas a la base de datos.

La sanitización de datos en PHP es el proceso de limpiar y validar los datos de entrada para asegurarse de que sean seguros, confiables y adecuados para su procesamiento y almacenamiento. El objetivo principal de la sanitización es prevenir ataques y vulnerabilidades relacionados con la seguridad, como inyecciones de SQL, ataques de scripts entre sitios (XSS), entre otros.

La **sanitización** de datos implica aplicar diversas técnicas y filtros a los datos de entrada para asegurarse de que cumplan con ciertas reglas y estándares antes de ser utilizados en tu aplicación. Esto ayuda a evitar que los datos maliciosos o no válidos afecten la funcionalidad y seguridad de tu aplicación.

Algunas de las técnicas y métodos comunes de sanitización de datos en PHP son:

- Filtros de Validación y Sanitización: PHP proporciona una serie de filtros integrados para validar y sanitizar diferentes tipos de datos, como URL, correos electrónicos, números, etc. Estos filtros se pueden usar con las funciones filter_var() y filter_input().

- Funciones de Escape: Para prevenir inyecciones de SQL y ataques de scripts entre sitios (XSS), se deben escapar y codificar adecuadamente los datos antes de mostrarlos en el navegador o utilizarlos en consultas de bases de datos.

- Preparación de Consultas SQL: Al interactuar con bases de datos, es fundamental utilizar consultas preparadas y vinculación de parámetros para evitar la inyección de SQL.

- Uso de Frameworks y Bibliotecas Seguras: Utilizar frameworks y bibliotecas de PHP seguros puede ayudarte a manejar la sanitización de datos de manera efectiva, ya que a menudo incluyen funciones y métodos integrados para manejar problemas de seguridad comunes.

- Validación en el Lado del Cliente: Además de la sanitización en el lado del servidor, también es importante implementar validación en el lado del cliente utilizando JavaScript para brindar una experiencia de usuario más fluida y prevenir el envío de datos inválidos.

Recuerda que la sanitización de datos es una parte esencial del desarrollo seguro de aplicaciones web. Dependiendo de las características de tu aplicación y los datos que manejas, es posible que necesites implementar diversas técnicas de sanitización para garantizar que tus datos sean seguros y confiables.

**Escapar caracteres**

Escapar caracteres significa anteponer un carácter especial llamado "carácter de escape" a otro carácter o conjunto de caracteres dentro de una cadena de texto o en algún contexto específico en un lenguaje de programación. Este carácter de escape le indica al lenguaje que el carácter que sigue inmediatamente después debe ser tratado de manera literal y no en su función normal o especial.

La necesidad de escapar caracteres surge cuando quieres representar ciertos caracteres especiales o evitar que ciertos caracteres sean interpretados de manera incorrecta en un contexto específico. Algunos de los casos más comunes de escapar caracteres incluyen:

- Cadenas con comillas: En muchos lenguajes de programación, como PHP, JavaScript y otros, debes escapar comillas simples (') o comillas dobles (") dentro de una cadena si la cadena misma está delimitada por comillas del mismo tipo. Por ejemplo, en PHP:

```php
$cadena = "Esto es un ejemplo de \\"cadena escapada\\".";
```

Esto asegura que las comillas dobles dentro de la cadena se traten como caracteres literales y no como el delimitador de la cadena.

- Caracteres de control: Los caracteres de control, como saltos de línea (\n), retornos de carro (\r) o tabulaciones (\t), se pueden escapar para representarlos de manera explícita en una cadena en lugar de que sean interpretados como caracteres de formato.

- Caracteres de escape: Si deseas representar el propio carácter de escape en una cadena, debes escaparlo. En muchos lenguajes, se utiliza \\ para representar una barra invertida literal.

- Interpolación de variables: En algunos lenguajes, como PHP, para interpolar variables en una cadena delimitada por comillas dobles, debes escapar el signo de dólar ($) para evitar que se interprete como una variable. Por ejemplo:

```php
$nombre = "Juan";
$saludo = "Hola, \\$nombre";
```

Esto produce la cadena "Hola, $nombre" en lugar de "Hola, Juan".

- Evitar inyecciones de código: En contextos como la construcción de consultas SQL o la generación de HTML dinámico, es fundamental escapar caracteres especiales para prevenir ataques como la inyección de SQL o el cross-site scripting (XSS).

La escapada de caracteres es una práctica importante para garantizar la seguridad y la integridad de los datos, así como para controlar la interpretación de ciertos caracteres en diferentes contextos de programación.

Algunas formas de sanitizar datos:

**Htmlentities**

htmlentities() es una función en PHP que se utiliza para convertir caracteres especiales y etiquetas HTML en entidades HTML. Su función principal es evitar problemas de seguridad y mejorar la seguridad al mostrar contenido en una página web. También puede utilizarse para asegurarse de que el contenido se muestre correctamente en navegadores cuando contiene caracteres que normalmente serían interpretados como etiquetas o entidades HTML.

Aquí hay un ejemplo de cómo usar htmlentities():

```php
$texto = "<p>Este es un <strong>texto</strong> con caracteres especiales como & y <.</p>";
$texto_sanitizado = htmlentities($texto);

echo $texto_sanitizado;
```

En este ejemplo, la función htmlentities() se utiliza para convertir los caracteres especiales y las etiquetas HTML en entidades HTML. El resultado es que el contenido se mostrará como texto plano y no se interpretará como etiquetas HTML en el navegador. Esto es útil para evitar ataques de inyección de código y para garantizar que el contenido se muestre correctamente en la página web, especialmente cuando se trata de contenido generado por el usuario.

En resumen, htmlentities() se utiliza para convertir caracteres especiales y etiquetas HTML en entidades HTML, lo que mejora la seguridad y evita problemas de interpretación de contenido en páginas web.

**Addslashes**

addslashes() es una función en PHP que se utiliza para escapar caracteres especiales en una cadena de texto. Su propósito principal es preparar una cadena para su inserción segura en una consulta SQL o en algún otro contexto en el que se necesite evitar problemas de seguridad, como la inyección de SQL.

La función addslashes() agrega una barra invertida (\) delante de ciertos caracteres que pueden tener significados especiales en una consulta SQL. Estos caracteres incluyen comillas simples ('), comillas dobles ("), barras invertidas (\), entre otros.

La sintaxis básica de addslashes() es la siguiente:

```php
string addslashes ( string $string )
```

- $string: La cadena de texto que deseas escapar.

Aquí tienes un ejemplo de cómo se usa addslashes() para escapar una cadena antes de usarla en una consulta SQL:

```php
$usuario = "usuario";
$contrasena = "'; DROP TABLE usuarios; --";

$contrasenaEscapada = addslashes($contrasena);

$sql = "SELECT * FROM usuarios WHERE usuario='$usuario' AND contrasena='$contrasenaEscapada'";
```

En este ejemplo, $contrasena contiene una cadena potencialmente maliciosa que podría utilizarse para una inyección de SQL. Al usar addslashes(), se agrega una barra invertida antes de las comillas simples, convirtiendo la cadena en '\'; DROP TABLE usuarios; --'. Esto hace que la cadena sea segura para usar en una consulta SQL porque cualquier comilla simple dentro de la cadena se tratará como un carácter literal y no como el delimitador de la consulta.

Es importante destacar que, en aplicaciones modernas, se recomienda utilizar consultas preparadas y vinculación de parámetros en lugar de addslashes() para proteger contra la inyección de SQL, ya que es una técnica más segura y efectiva. Las consultas preparadas aseguran que los datos ingresados por el usuario no puedan alterar la estructura de la consulta SQL.

**Preg_replace**

preg_replace() es una función en PHP que se utiliza para realizar sustituciones de patrones regulares en cadenas de texto. Su nombre proviene de "preg" que es una abreviatura de "Perl-Compatible Regular Expression", lo que significa que es compatible con expresiones regulares similares a las que se utilizan en el lenguaje de programación Perl.

La función preg_replace() se utiliza comúnmente para buscar un patrón específico en una cadena de texto y reemplazar todas las ocurrencias de ese patrón con otro texto o con el resultado de una función.

Aquí hay un ejemplo de cómo se utiliza preg_replace() para reemplazar todas las ocurrencias de una palabra en una cadena de texto:

```php
$texto = "El perro marrón es un perro feliz. El dueño del perro también es feliz con su perro.";

$nuevoTexto = preg_replace('/perro/', 'gato', $texto);

echo $nuevoTexto;
```

En este ejemplo, preg_replace() busca todas las ocurrencias del patrón /perro/ (que es la palabra "perro") en la cadena $texto y las reemplaza por "gato". El resultado será:

```sh
El gato marrón es un gato feliz. El dueño del gato también es feliz con su gato.
```

preg_replace() es especialmente útil cuando se trabaja con cadenas de texto que siguen un patrón específico y se desea realizar modificaciones en esas cadenas de manera eficiente y flexible. Se utiliza en una variedad de casos, como la manipulación de contenido web, análisis de texto, procesamiento de datos y mucho más.

**Filter_var**

filter_var() es una función en PHP que se utiliza para validar y filtrar datos de entrada. Su principal propósito es ayudar a asegurar que los datos cumplan con ciertos criterios antes de ser utilizados en una aplicación. Esta función es especialmente útil para validar datos ingresados por usuarios y garantizar que se ajusten a formatos y tipos específicos, mejorando la seguridad y la integridad de la aplicación.

La función filter_var() se basa en el concepto de "filtros" que se aplican a los datos para verificar si cumplen con un conjunto de reglas específicas. Los filtros pueden validar datos como direcciones de correo electrónico, URLs, números enteros, direcciones IP, entre otros.

La sintaxis básica de filter_var() es la siguiente:

```php
mixed filter_var ( mixed $variable , int $filter [, mixed $options ] )
```

- $variable: La variable o valor que deseas validar.
- $filter: El filtro que se aplicará a los datos. Esto puede ser una de las constantes predefinidas que especifican el tipo de filtro a aplicar.
- $options (opcional): Un parámetro opcional que puede proporcionar opciones adicionales según el filtro seleccionado.

Algunos ejemplos de uso de filter_var() incluyen:

- Validación de direcciones de correo electrónico:

```php
$email = "usuario@example.com";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "La dirección de correo electrónico es válida.";
} else {
    echo "La dirección de correo electrónico no es válida.";
}
```

- Validación de números enteros:

```php
$numero = "123";
if (filter_var($numero, FILTER_VALIDATE_INT)) {
    echo "El número es un entero válido.";
} else {
    echo "El número no es un entero válido.";
}
```

- Filtrado de datos HTML no seguros:

```php
$input = "<script>alert('¡Hola!');</script>";
$filtro = filter_var($input, FILTER_SANITIZE_SPECIAL_CHARS);
echo $filtro; // Muestra el texto sin interpretar las etiquetas HTML.
```

- Validación de direcciones IP:

```php
$ip = "192.168.1.1";
if (filter_var($ip, FILTER_VALIDATE_IP)) {
    echo "La dirección IP es válida.";
} else {
    echo "La dirección IP no es válida.";
}
```

En resumen, filter_var() es una función en PHP que permite validar y filtrar datos de entrada de manera eficaz, lo que es esencial para garantizar la seguridad y la integridad de una aplicación web al procesar datos ingresados por usuarios o recibidos de otras fuentes.

**Ejemplo**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sanitizar datos de un formulario</title>
</head>
<body>
    <!-- Formulario -->
    <form action="server.php" method="post" enctype="multipart/form-data">

        <!-- Input simple -->
        <label><b>Datos usuario</b></label><br>
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" placeholder="Nombre"><br>
        <label for="apellido">Apellido:</label>
        <input type="text" name="apellido" id="apellido" placeholder="Apellido"><br>
        <label for="edad">Edad:</label>
        <input type="number" name="edad" id="edad" placeholder="Edad"><br>
        <label for="email">Email:</label>
        <input type="email" name="correo" id="correo" placeholder="Correo"><br>

        <!-- Reset -->
        <input type="reset" value="Limpiar">

        <!-- Envio -->
        <button name="enviar" type="submit">Enviar</button>
    </form>
</body>
</html>
```
```php
<?php

// // Truco para debugear y ver lo que llega por POST
// echo "<pre>";
// var_dump($_POST); // Recupera la información que se envía por POST
// var_dump($_FILES); // Recupera la información que se envía por FILES
// echo "</pre>";

// Recuperar datos del formulario
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$edad = $_POST["edad"];
$correo = $_POST["correo"];

// Algunas formas de sanitizar los datos del formulario
$nombre_sanitizado = htmlentities($nombre); // Esta función convierte caracteres especiales en entidades HTML, evitando así que se interpreten como código.
$apellido_sanitizado = addslashes($apellido); // Esta función agrega barras invertidas delante de los caracteres que necesitan ser escapados. Estos caracteres son la comilla simple ('), comilla doble ("), barra invertida (\) y NUL (el byte NULL).
$solo_palabras = preg_replace("/\d/", "", $nombre); // Esta función elimina los números del string.
$solo_numeros = preg_replace("/\D/", "", $nombre); // Esta función elimina las letras del string.
$correo_sanitizado = filter_var($correo, FILTER_SANITIZE_EMAIL); // Esta función filtra una variable con el filtro que se indique. En este caso, el filtro FILTER_SANITIZE_EMAIL elimina todos los caracteres excepto letras, dígitos y !#$%&'*+-/=?^_`{|}~@.[].
$int_sanitizado = filter_var($edad, FILTER_SANITIZE_NUMBER_INT); // Esta función filtra una variable con el filtro que se indique. En este caso, el filtro FILTER_SANITIZE_NUMBER_INT elimina todos los caracteres excepto dígitos y + -.
$float_sanitizado = filter_var($edad, FILTER_SANITIZE_NUMBER_FLOAT); // Esta función filtra una variable con el filtro que se indique. En este caso, el filtro FILTER_SANITIZE_NUMBER_FLOAT elimina todos los caracteres excepto dígitos, + - y los separadores decimales.

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos del usuario</title>
</head>
<body>
    <h2>Datos del usuario sin sanitizar</h2>
    <p>Nombre: <?php echo $nombre; ?></p>
    <p>Apellido: <?php echo $apellido; ?></p>
    <p>Edad: <?php echo $edad; ?></p>
    <p>Correo: <?php echo $correo; ?></p>

    <h2>Datos del usuario sanitizados</h2>
    <p>Nombre: <?php echo $nombre_sanitizado; ?></p>
    <p>Apellido: <?php echo $apellido_sanitizado; ?></p>
    <p>Edad: <?php echo $int_sanitizado; ?></p>
    <p>Correo: <?php echo $correo_sanitizado; ?></p>

    <h2>Datos del usuario sin números</h2>
    <p>Nombre: <?php echo $solo_palabras; ?></p>

    <h2>Datos del usuario sin letras</h2>
    <p>Nombre: <?php echo $solo_numeros; ?></p>

    <h2>Datos del usuario numeros</h2>
    <p>Edad: <?php echo $int_sanitizado; ?></p>
    <p>Edad: <?php echo $float_sanitizado; ?></p>
</body>
</html>
```
</details>

## Validando datos

<details>

La validación de datos es un proceso fundamental en la programación y el desarrollo de aplicaciones por varias razones importantes:

- Integridad de Datos: La validación de datos asegura que los datos sean precisos, coherentes y confiables. Esto es crucial para mantener la integridad de la información en una aplicación o sistema.

- Seguridad: La validación de datos ayuda a prevenir vulnerabilidades de seguridad como la inyección de SQL y los ataques de scripting entre sitios (XSS). Al validar los datos de entrada, se evita que los atacantes inyecten código malicioso en la aplicación.

- Cumplimiento de Normativas: En muchas industrias, existen regulaciones y normativas que requieren la validación de datos, especialmente cuando se trata de datos sensibles o privados, como información financiera o médica. Cumplir con estas normativas es esencial para evitar sanciones legales.

- Mejora de la Experiencia del Usuario: Validar datos también puede mejorar la experiencia del usuario al garantizar que los datos ingresados sean válidos y útiles. Por ejemplo, al validar formularios web, se pueden proporcionar mensajes de error claros y útiles en lugar de que los usuarios se enfrenten a errores inesperados.

- Evitar Errores y Comportamientos Inesperados: La validación de datos ayuda a evitar errores y comportamientos inesperados en una aplicación. Esto puede incluir problemas como divisiones por cero, valores nulos inesperados o resultados incorrectos debido a datos no válidos.

- Optimización de Rendimiento: Al garantizar que los datos sean válidos y útiles, se puede optimizar el rendimiento de la aplicación. Esto significa que la aplicación puede funcionar de manera más eficiente y rápida al evitar cálculos innecesarios o acciones basadas en datos incorrectos.

- Prevención de Ataques de Inyección: La validación adecuada de datos es esencial para prevenir ataques de inyección, como la inyección de SQL y la inyección de comandos en sistemas. Al validar y filtrar datos de entrada, se impide que los atacantes ejecuten código malicioso en la aplicación.

En resumen, la validación de datos es una práctica crítica en el desarrollo de software para garantizar la precisión, la seguridad y el rendimiento de una aplicación, al tiempo que se mejora la experiencia del usuario y se cumple con las normativas aplicables.

**Ejemplo**

```php
<?php

// // Truco para debugear y ver lo que llega por POST
// echo "<pre>";
// var_dump($_POST); // Recupera la información que se envía por POST
// var_dump($_FILES); // Recupera la información que se envía por FILES
// echo "</pre>";

// Formas de validar datos usando filter_var()
$dato1 = "Hola";
$dato2 = "Hola123";
$datoIP = "127.0.0.1";
$datoURL = "https://www.google.com";
$datoEmail = "Holaaaaaaaaaaaaaaa";

$es_float = filter_var($dato1, FILTER_VALIDATE_FLOAT, FILTER_FLAG_ALLOW_THOUSAND); // Filtro para validar floats. El flag FILTER_FLAG_ALLOW_THOUSAND permite que el float tenga separador de miles.
if ($es_float) {
    echo "Es un float <br>";
} else {
    echo "No es un float <br>";
}

$es_int = filter_var($dato2, FILTER_VALIDATE_INT); // Filtro para validar ints.
if ($es_int) {
    echo "Es un int <br>";
} else {
    echo "No es un int <br>";
}

$es_ip = filter_var($datoIP, FILTER_VALIDATE_IP); // Filtro para validar IPs.
if ($es_ip) {
    echo "Es una IP <br>";
} else {
    echo "No es una IP <br>";
}

$es_url = filter_var($datoURL, FILTER_VALIDATE_URL); // Filtro para validar URLs.
if ($es_url) {
    echo "Es una URL <br>";
} else {
    echo "No es una URL <br>";
}

$es_email = filter_var($datoEmail, FILTER_VALIDATE_EMAIL); // Filtro para validar emails.
if ($es_email) {
    echo "Es un email <br>";
} else {
    echo "No es un email <br>";
}
?>
```

</details>