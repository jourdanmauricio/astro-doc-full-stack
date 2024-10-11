---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Bases de datos con PHP
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Bases de datos con PHP
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

## ¿Cómo conectarse a una base de datos con PHP?

<details>

Una base de datos es un conjunto de tablas que nos permiten almacenar datos de nuestra aplicación. Estas utilizan su propio lenguaje conocido como SQL y dependiendo del lenguaje que usemos en nuestro Back podemos interactuar con la base de datos dependiendo de las sentencias SQL que le inyectemos en nuestro código.

Tenemos 2 tipos de bases de datos

- Relacionales: Almacenan datos que pueden relacionarse en diferentes tablas.
- No relacionales: Guardan datos como objetos o colecciones en formato JSON

</details>

## Diagramando la base de datos

<details>

**Base de datos**: finanzas_personales 

- **withdrawals**

|PK | id BIGINT UNSIGNED NOT NULL AUTO INCREMENT |
| --- | --- | 
| | payment_method TINYINT(1) NOT NULL | 
| | type TINYINT(1) NOT NULL | 
| | date TIMESTAMPT NOT NULL | 
| | amount FLOAT NOT NULL | 
| | description TEXT NOT NULL | 

- **incomes**

|PK |id BIGINT UNSIGNED NOT NULL AUTO INCREMENT |
| --- |--- | 
| | payment_method TINYINT(1) NOT NULL | 
| | type TINYINT(1) NOT NULL | 
| | date TIMESTAMPT NOT NULL | 
| | amount FLOAT NOT NULL | 
| | description TEXT NOT NULL | 

 </details>

## Conexión a la Base de Datos

<details>

Existen dos formas (drivers) de conectar PHP a MySQL. 

- MySQLi
- PDO

### Conexión con MySQLi

Para realizar la conexión a la base de datos MySQL debemos tener en cuenta los siguientes parámetros:

- Servidor: puede ser localhost si la base de datos en la que estamos trabajando se encuentra en el mismo host de nuestra aplicación o una ip si es el caso de que la base se encuentre en otro servidor.
- Nombre de la base de datos
- Nombre del usuario de la base
- Nombre de la contraseña asignada al usuario

### Iniciamos un nuevo proyecto

```sh 
mauricio@mauricio-Aspire-A315-44P:~/sites/php-database$ composer init
                                            
  Welcome to the Composer config generator  
                                         
This command will guide you through creating your composer.json config.

Package name (<vendor>/<name>) [mauricio/php-database]: 
Description []: Proyecto del curso de conexión de php con BD
Author [mauricio <jourdanmauricio@gmail.com>, n to skip]: 
Minimum Stability []: 
Package Type (e.g. library, project, metapackage, composer-plugin) []: project
License []: MIT

Define your dependencies.

Would you like to define your dependencies (require) interactively [yes]? no
Would you like to define your dev dependencies (require-dev) interactively [yes]? no
Add PSR-4 autoload mapping? Maps namespace "Mauricio\PhpDatabase" to the entered relative path. [src/, n to skip]: n

{
    "name": "mauricio/php-database",
    "description": "Proyecto del curso de conexión de php con BD",
    "type": "project",
    "license": "MIT",
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

Agregamos el archivo .gitIgnore, colocando la capeta vendor (contiene las dependencias del proyecto).

```sh
# .gitIgnore
/vendor/
```

Para establecer la conexión tenemos 2 formas de hacerlo: **Forma procedural y forma orientada a objetos**

Creamos el archivo: /database/MySQLi/Connection.php

```php
# /database/MySQLi/Connection.php

<?php

// Estas variables deberían defirse en .dotenv
$server = "localhost";
$database ="finanzas_personales";  
$username = "root";
$password = "password";

//////////////////////
// Forma procedural //
//////////////////////
// $mysqli = mysqli_connect($server, $username, $password, $database);

// Comprobar conexión de manera procedural
// if (!$mysqli) {
//   die("Falló la conexion:" . mysqli_connect_errno());
// }

///////////////////////////////
// Forma orientada a objetos //
///////////////////////////////
$mysqli = new mysqli($server, $username, $password, $database);

// Comprobar la conexion de manera orientada a objetos
if ($mysqli->connect_errno) {
    die("Falló la conexion: " . $mysqli->connect_error);
}

// Establece en la base que se van a utilizar caracteres especiales en las consultas
$setnames = $mysqli->prepare("SET NAMES 'utf8'"); 

// Ejecutamos la consulta
$setnames->execute();

var_dump($setnames);

//  php database/MySQLi/Connection.php 

// object(mysqli_stmt)#2 (10) {
//   ["affected_rows"]=>
//   int(0)
//   ["insert_id"]=>
//   int(0)
//   ["num_rows"]=>
//   int(0)
//   ["param_count"]=>
//   int(0)
//   ["field_count"]=>
//   int(0)
//   ["errno"]=>
//   int(0)
//   ["error"]=>
//   string(0) ""
//   ["error_list"]=>
//   array(0) {
//   }
//   ["sqlstate"]=>
//   string(5) "00000"
//   ["id"]=>
//   int(1)
// }
```

### Conexión con PDO

El problema de la conexión con el driver MySQLi es que solo soporta MySQL, no soporta otros gestores de bases de datos. 

**PDO** es otro driver que soporta múltiples sistemas de bases de datos (MySQL, MariaDB, Postgresql, etc).

Creamos el archivo: /database/PDO/Connection.php

```php
# /database/PDO/Connection.php
<?php

// Estas variables deberían defirse en .dotenv
$server = "localhost";
$database ="finanzas_personales";  
$username = "root";
$password = "password";

$connenction = new PDO("mysql:host=$server;dbname=$database", $username, $password);

$setnames = $connenction->prepare("SET NAMES 'utf8'");

// Ejecutamos la consulta
$setnames->execute();

var_dump($setnames);

// php database/PDO^Connection.php

// object(PDOStatement)#2 (1) {
//   ["queryString"]=>
//   string(16) "SET NAMES 'utf8'"
// }
```
</details>

## Refactor de la conexión con clases

<details>

Si deseamos utilizar las conexiones anteriores en un proyecto debemos importarlos con require de forma manual e individual. Pero ya que utilizamos composer vamos a aprovechar la autocarga de archivos.

Para ello debemos definir los **namespaces** y los archivos deben ser **clases**.

Para poder utilizar la conexión de la base mediante la autocarga de composer debemos crear una clase que contenga la conexión siguiendo la convención de psr-4 que nos dice que el nombre del archivo debe ser igual que el de la clase.

Para crear la clase de la conexión usamos el patrón de diseño **Singleton**, el cual como ya hemos visto en clases anteriores, garantiza que tan solo exista un objeto de su tipo (la conexión en este caso solo se puede instanciar 1 vez) y proporciona un único punto de acceso a él para cualquier otro código.

En resumen, usamos ese patrón debido a que queremos y necesitamos que la conexión con la base se haga 1 sola vez y no se esten generando multiples conexiones.

```php
# /database/MySQLi/Connection.php

<?php
namespace Database\MySQLi;

class Connection {

  private static $instance;
  private $connection;
  
  private function __construct() {
   $this->make_connection();
  }

  public static function getInstance() {
    if (!self::$instance instanceof self)
      self::$instance = new self();
    return self::$instance;
  }

  public function get_database_instance() {
    return $this->connection;
  }

  private function make_connection() {
    $server = "localhost";
    $database = "finanzas_personales";
    $username = "root";
    $password = "password";
        
    // Esta es al forma orientada a objetos
    $mysqli = new \mysqli($server, $username, $password, $database);
        
    // Comprobar conexión de manera orientada a objetos
    if ($mysqli->connect_errno)
        die("Falló la conexión: {$mysqli->connect_error}");
        
    // Esto nos ayuda a poder usar cualquier caracter en nuestras consultas
    $setnames = $mysqli->prepare("SET NAMES 'utf8'");
    $setnames->execute();

    $this->connection = $mysqli;
  }
}
```
- Creamos un método static get_instance() para obtener una instancia de la clase dentro de si misma. Preguntamos si la variable $instance no contiene una instancia de la misma clase entonces se la asignamos. Esta función estática es invocada directamente y al ejecutarse llama al método constructor en el momento que se crea la instancia.
- El método constructor se define como private para asegurarnos de que no se pueda crear una instancia de la clase desde cualquier otra parte del código y dentro de este ejecutamos el método make_connection().
- Dentro del método make_connection() se escribe el código para crear la conexión con la base de datos, y al finalizar en lugar de retornar la variable que almacena nuestra conexión se la asignamos a otra variable definida al inicio de la clase
- Finalmente se crea un getter para obtener la variable resultante de todo el proceso antes mencionado que contiene la conexión con la BD

> Nota: En el código de conexión debemos colocar una barra invertida “new \mysqli” debido a que al definir el namespace como Database\MySQLi php asume que existe una clase mysqli dentro de este namespace, sin embargo esta clase ya esta definida en el namespace global por lo tanto se debe escapar con “\”

También pasaremos a clases la conexión con el driver PDO.

```php
# /database/MySQLi/Connection.php

<?php
namespace Database\PDO;

class Connection {

  private static $instance;
  private $connection;
  
  private function __construct() {
   $this->make_connection();
  }

  public static function getInstance() {
    if (!self::$instance instanceof self)
      self::$instance = new self();
    return self::$instance;
  }

  public function get_database_instance() {
    return $this->connection;
  }

  private function make_connection() {
    $server = "localhost";
    $database = "finanzas_personales";
    $username = "root";
    $password = "password";
        
    $conexion = new \PDO("mysql:host=$server;dbname=$database", $username, $password);
        
    $setnames = $conexion->prepare("SET NAMES 'utf8'");
    $setnames->execute();

    $this->connection = $conexion;
  }
}
```

Para que composer cargue la clase de forma automática debemos seguir el estandar de **PSR-4**. 

```json
// composer.json
{
  "name": "mauricio/php-database",
  "description": "Proyecto del curso de conexión de php con BD",
  "type": "project",
  "license": "MIT",
  "authors": [
      {
          "name": "mauricio",
          "email": "jourdanmauricio@gmail.com"
      }
  ],
  "autoload": {
      "psr-4": {
          "Database\\": "database/"
      }
  },
  "require": {}
}
```
</details>

## Creación de controladores para la aplicación

<details>

Ya tenemos las conexiones convertidas a clases. Ahora comenzaremos a utilizarlas desde los controladores.

Los **controladores** contienen la lógica de la aplicación. Generalmente, creamos un controlador por cada recurso que tengamos.

Un controlador suele tener **7 métodos**:

- index: muestra la lista de todos los recursos.
- create: muestra un formulario para ingresar un nuevo recurso. (luego manda a llamar al método store).
- store: registra dentro de la base de datos el nuevo recurso.
- show: muestra un recurso específico.
- edit: muestra un formulario para editar un recurso. (luego manda a llamar al método update).
- update: actualiza el recurso dentro de la base de datos.
- destroy: elimina un recurso.

</details>

## Creación de ENUMS para la aplicación

<details>

**Enumeraciones**, o "Enums", permiten a un desarrollador definir un tipo personalizado que se limita a uno de un número discreto de valores posibles. Esto puede ser especialmente útil al definir un modelo de dominio, ya que permite "hacer que los estados inválidos sean imposibles de representar".

Los Enums aparecen en muchos lenguajes con una variedad de características diferentes. En PHP, los Enums son un tipo especial de objeto. El Enum en sí es una clase, y sus posibles casos son todos objetos de instancia única de esa clase. Eso significa que los casos de Enum son objetos válidos y pueden ser utilizados en cualquier lugar donde un objeto pueda ser utilizado, incluyendo comprobaciones de tipo.


Algunas **ventajas** de usar ENUMs:

- Legibilidad del Código: Los ENUMs proporcionan nombres significativos para valores específicos, mejorando la legibilidad del código.
- Mantenimiento: Cambiar los valores de ENUM es más fácil, ya que solo necesitas actualizar un lugar centralizado en tu código.
- Evitar Errores de Escritura: Al utilizar ENUMs, reduces el riesgo de errores de escritura, ya que los valores válidos están predefinidos.
- Evitar Números Mágicos: Los ENUMs ayudan a evitar el uso de "números mágicos" en el código, que son valores literales no explicados y difíciles de entender.
- Validación: Puedes validar fácilmente que una variable contenga un valor de ENUM válido.

En la base de datos tenemos algunos campos definidos como tinyint(1). Desde la lógica de negocio el número 1 o 2 que podamos almacenar allí no nos dice nada. Debemos tener un mecanismo que nos permita saber qué significan ese 1 o 2. 

</details>

## Consultas con MySQLi 

<details>

Podemos utlizar el método query de la clase MySQLi para ejecutar consultas en la base de datos, sin embargo existen mejores formas de realizarlo.

```php
public function store($data) {
  $connection = Connection::getInstance()->get_database_instance();
  $connection->query("INSERT INTO incomes (payment_method, type, date, amount, description) VALUES 
    (
      {$data['payment_method']}, 
      {$data['type']}, 
      '{$data['date']}', 
      {$data['amount']}, 
      '{$data['description']}'
    )"
  );
}
```

```php
$incomes_controller = new IncomesController();

$incomes_controller->store([
  "payment_method" => PaymentMethodEnum::BanckAccount->value,
  "type" => IncomeTypeEnum::Salary->value,
  "date" => date("Y-m-d H:i:s"), // 2024-10-11 12:00:00 
  "amount" => 10000000,
  "description" => "Pago de salario, por trabajo en Consultoría"
]);
```
</details>

## Evitando SQL Injection con bindParam

<details>

Utilizando el método anterior para insertar datos corremos el riesgo de que nos realicen un **SQL Injection**. En un input del formulario de nuestra Web un usurio malicioso puede ingresar una consulta sql. Esto es un problema de seguidad. 

MySQLi nos provee algunos métodos para evitar el SQL Injection.

Em método **prepare** reemplaza los valores pero les pasa una serie de filtros para evitar el SQL Injection, pero para mayor seguridad deberíamos sanitizar los datos.

```php
public function store($data)
{
  $connection = Connection::getInstance()->get_database_instance();

  $payment_method = $data['payment_method'];
  $type = $data['type'];
  $date = $data['date'];
  $amount = $data['amount'];
  $description = $data['description'];

  $stmt = $connection->prepare("INSERT INTO incomes (payment_method, type, date, amount, description) VALUES 
    (?, ?, ?, ?, ?)");
  
  // debemos especifica el tipo de dato de cada campo
  // iiisd = integer, integer, integer, string, double
  $stmt->bind_param("iisds", $payment_method, $type, $date, $amount, $description);


  $stmt->execute();
  
  echo "Se han insertado {$stmt->affected_rows} registros";      
}
```
</details>

## Consultas con PDO

<details>

El driver PDO nos disponibiliza el método **exec** para ejecutar consultas en la base de datos. Es el equivalente del método query de de MySQLi.

```php
public function store($data)
{
  $connection = Connection::getInstance()->get_database_instance();
  $affected_rows = $connection->exec("INSERT INTO withdrawals (payment_method, type, date, amount, description) VALUES (
    {$data['payment_method']},
    {$data['type']},
    '{$data['date']}',
    {$data['amount']},
    '{$data['description']}'
    )
  ");
  echo "Se han insertado {$affected_rows} registros";
}
```
De la misma manera que con MySQLi corremos el riesgo de MySQL Injection.

</details>

## Evitando SQL Injection con consultas preparadas en PDO

<details>

```php
public function store($data)
{
  $connection = Connection::getInstance()->get_database_instance();
  $stmt = $connection->prepare("INSERT INTO withdrawals (payment_method, type, date, amount, description) VALUES ( :payment_method, :type, :date, :amount, :description)");
  
  $stmt->execute($data);
  echo "Se han insertado {$stmt->rowCount()} registros";
}
```

```php
$withdrawals_controller = new WithdrawalsController();

$withdrawals_controller->store([
  ":payment_method" => PaymentMethodEnum::CreditCard->value,
  ":type" => WithdrawalTypeEnum::Purchase->value,
  ":date" => date("Y-m-d H:i:s"), // 2024-10-11 12:00:00 
  ":amount" => 10000.00,
  ":description" => "Compra de estabilizador de tensión"
]);
```
</details>

## Ligando parámetros con bindParams

<details>

**bindParam** es un método en la clase PDO en PHP que se utiliza para vincular parámetros a una consulta preparada. La idea principal detrás de este método es evitar la inyección de SQL. En resumen, cuando se utiliza una consulta preparada en PHP/PDO, se separan los datos que se envían a la base de datos de los comandos que se envían.

Por ejemplo, si usted está escribiendo una consulta SQL que se ejecutará varias veces con diferentes datos de entrada, es buena práctica utilizar BindParam para hacer que la consulta se ejecute de manera más eficiente cada vez.

La forma en que funciona BindParam es que se define una variable para cada parámetro de entrada de la consulta y luego se vincula esa variable a la instrucción de la consulta preparada.

Cada vez que se ejecute la consulta, los valores de entrada se asignarán a las variables vinculadas y la consulta se ejecutará con esos valores agregados a la consulta.

En resumen, BindParam es una técnica de seguridad utilizada para prevenir la inyección de SQL que podría ser dañina para su base de datos.

```php
public function store($data)
{
  $connection = Connection::getInstance()->get_database_instance();
  $stmt = $connection->prepare("INSERT INTO withdrawals (payment_method, type, date, amount, description) VALUES ( :payment_method, :type, :date, :amount, :description)");
  
  $stmt->bindParam(':payment_method', $data['payment_method']);
  $stmt->bindParam(':type', $data['type']);
  $stmt->bindParam(':date', $data['date']);
  $stmt->bindParam(':amount', $data['amount']);
  $stmt->bindParam(':description', $data['description']);
  $stmt->execute();
  echo "Se han insertado {$stmt->rowCount()} registros";
}
```

```php
$withdrawals_controller = new WithdrawalsController();

$withdrawals_controller->store([
  "payment_method" => PaymentMethodEnum::CreditCard->value,
  "type" => WithdrawalTypeEnum::Purchase->value,
  "date" => date("Y-m-d H:i:s"), // 2024-10-11 12:00:00 
  "amount" => 10000.00,
  "description" => "Compra de estabilizador de tensión"
]);
```
</details>

## Ligando parámetros con bindValue

<details>

**bindValue** es otra forma muy similar de ligar parámetros. 

Diferencia entre bindParam() y bindValue(). Con bindParam podemos cambiar el valor de un parámetro antes de ejecutar el método execute y s insertará el valor modificado. En cambio con bindValue se insertará el valor original.

</details>

## Consultando datos con FetchAll

<details>

**FetchAll**: Retorna las filas resultantes de la consulta, las columnas de cada fila se presentan con valores duplicados, esto es porqué el nombre de la columna lo informa de forma numérica y también de forma asociativa (nombre de la columna en la tabla).

```php
public function index()
{
  $stmt = $this->connection->prepare("SELECT * FROM withdrawals");
  $stmt->execute();
  $results = $stmt->fetchAll();
  
  foreach ($results as $result) {
    echo "Gastaste " . $result["amount"] . " USD es: " . $result["description"] . "\n";
  }
  
  // Usando Fetch Column
  
  $stmt = $this->connection->prepare("SELECT amount, description FROM withdrawals");
  $stmt->execute();
  $results = $stmt->fetchAll(\PDO::FETCH_COLUMN, 0);
  foreach ($results as $result) {
      echo "Gastaste $result USD \n"; 
  }
}
```

```php
  $withdrawals_controller = new WithdrawalsController();
  $withdrawals_controller->index();
```

</details>

## Consultando datos con Fetch

<details>

El método **Fecth** nos permite recuperar una sola fila.

```php
public function show($id)
{
  $stmt = $this->connection->prepare("SELECT * FROM withdrawals WHERE id = :id");
  $stmt->execute([
    ":id" => $id
  ]);
  $result = $stmt->fetch();
  
  echo "Gastaste " . $result["amount"] . " USD en: " . $result["description"] . "\n";
}
```
```php
$withdrawals_controller = new WithdrawalsController();
$withdrawals_controller->show(1);
```
</details>

## Vinculando columnas con bindColumn

<details>

**bindColumn** permite asignar del resultado de la consulta el valor de la fila según el nombre de su columna a una variable, la cual no necesita definirse debido a que el propio método se encarga de hacerlo al asignarle el valor resultante de la consulta. 

```php
public function index() {
  $stmt = $this->connection->prepare("SELECT * FROM incomes");
  $stmt->execute();

  $stmt->bindColumn("amount", $amount);
  $stmt->bindColumn("description", $description);

  while($stmt->fetch())
    echo "Ganaste $amount USD en: $description \n";
}
```
</details>

## Transacciones: cómo revertir una consulta SQL con PHP

<details>

El uso de beginTransaction es importante, por ejemplo, en el caso de grabar una factura donde hay que actualizar las tablas de stock, cuentas corrientes, comisiones a vendedores, etc. y se produce un error durante la actualización en algunas de las tablas, algunas tablas quedarían actualizadas y otras no, esto haría que la base de datos no fuera confiable. Para solucionar este inconveniente se debe hacer un rollback, así la base de datos queda intacta aunque la facturación quedará pendiente.

```php
public function destroy($id)
{
  $this->connection->beginTransaction();
  $stmt = $this->connection->prepare("DELETE FROM incomes WHERE id = :id");
  
  $stmt->execute([
    ":id" => $id
  ]);

  $sure = readline("¿Estás seguro de eliminar este registro? (s/n): ");
  
  if ($sure === "s") {
    $this->connection->commit();
    echo "Se han eliminado {$stmt->rowCount()} registros";
  } else {
    $this->connection->rollBack();
    echo "No se eliminó ningún registro";
  }
}
```
```php
$incomes_controller = new IncomesController();
$incomes_controller->destroy(1);
```

> <mark>No utilizar **beginTransaction** con DROP_TABLE. No se respeta la sentencia y se realiza el drop.</mark>

El comportamiento de beginTransaction() con respecto a las operaciones DDL (Data Definition Language) como DROP TABLE puede variar dependiendo del sistema de gestión de bases de datos (DBMS) que estés utilizando.

**Comportamiento general**:

En la mayoría de los DBMS, las operaciones DDL como CREATE TABLE, ALTER TABLE, y DROP TABLE no se pueden deshacer (rollback) dentro de una transacción. Esto se debe a que estas operaciones suelen provocar un commit implícito.

</details>

## Creación de nuestro router

<details>

Antes de incorporar HTML debemos implementar un **router**.

Un router nos sirve para ligar las url con métodos de nuestros controladores. Y los métodos llamarán a las vistas.

Creamos una carpeta llamada public en la raíz. Aquí no debemos colocar nada que no deseamos que los usuarios vean. Adentro de la carpeta public creamos un archivo llamado index.php, que será nuestro FormController.

También necesitaremos realizar redirecciones de la url. Para ello, también creamos un archivo llamado .htaccess.

```sh
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule ^(.*)$ index.php?slug=$1 [L]
```

```php
<?php
require("../vendor/autoload.php");
<?php

require("../vendor/autoload.php");

// Obtener la url
$slug = $_GET["slug"] ?? "";
$slug = explode("/", $slug);

$resource = $slug[0] == "" ? "/" : $slug[0];
$id = $slug[1] ?? null;

switch ($resource) {

  case "/":
    echo "Estás en el home";
    break;

  case "incomes":
    echo "Estás en el incomes";
    break;

  case "withdrawals":
    echo "Estás en el withdrawals";
    break;

  default:
    echo "Ruta no encontrada";
    break;
}
```

### Configuración de Virtual Host Local para finanzas.test

```sh
# Crear directorio del sitio web:
sudo mkdir -p /var/www/finanzas.test

# Asignar propiedad:
sudo chown -R $USER:$USER /var/www/finanzas.test

# Establecer permisos:
sudo chmod -R 755 /var/www/finanzas.test

# Crear archivo de configuración:
sudo nano /etc/apache2/sites-available/finanzas.test.conf
# Contenido del archivo de configuración:
<VirtualHost *:80>
    ServerName finanzas.test
    ServerAlias www.finanzas.test
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/finanzas.test/public
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    <Directory /var/www/finanzas.test>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# Habilitar sitio:
sudo a2ensite finanzas.test.conf

# Recargar Apache:
sudo a2enmod rewrite
sudo systemctl reload apache2

# Editar archivo hosts:
sudo nano /etc/hosts

# Añadir:
127.0.0.1   finanzas.test www.finanzas.test

# Crear archivo de prueba:
echo "<html><body><h1>Bienvenido a finanzas.test</h1></body></html>" | sudo tee /var/www/finanzas.test/index.html
```
Accede a http://finanzas.test en tu navegador para verificar.

</details>

## Programando los métodos del router

<details>

```json
// composer.json

{
    "name": "mauricio/php-database",
    "description": "Proyecto del curso de conexión de php con BD",
    "type": "project",
    "license": "MIT",
    "authors": [
        {
            "name": "mauricio",
            "email": "jourdanmauricio@gmail.com"
        }
    ],
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "Database\\": "database/",
            "Router\\": "router/"
        }
    },
    "require": {}
}
```

```sh
# Levantamos las nuevas configuraciones
composer du
```
```php
// /public/index.php
<?php

require("../vendor/autoload.php");

use App\Controllers\IncomesController;
use App\Controllers\WithdrawalsController;
use Router\RouterHandler;

// Obtener la url
$slug = $_GET["slug"] ?? "";
$slug = explode("/", $slug);

$resource = $slug[0] == "" ? "/" : $slug[0];
$id = $slug[1] ?? null;

// Instacia del router
$router = new RouterHandler();

switch ($resource) {

  case "/":
    echo "Estás en el home";
    break;

  case "incomes":

    $method = $_POST["_method"] ?? "get";
    $router->set_method($method);
    $router->set_data($_POST);
    $router->route($id, IncomesController::class);

    break;

  case "withdrawals":
    $method = $_POST["_method"] ?? "get";
    $router->set_method($method);
    $router->set_data($_POST);
    $router->route($id, WithdrawalsController::class);
    break;

  default:
    echo "Ruta no encontrada";
    break;
}
```
- Creamos el archivo /router/RouterHandler.php

```php
// /router/RouterHandler.php
<?php

namespace Router;

class RouterHandler
{

  protected $method;
  protected $data;

  public function set_method($method)
  {
    $this->method = $method;
  }

  public function set_data($data)
  {
    $this->data = $data;
  }

  public function route($id, $controller)
  {
    $resource = new $controller();
    switch ($this->method) {
      case "get":
        if ($id && $id == "create") {
          $resource->create();
        } else if ($id) {
          $resource->show($id);
        } else {
          $resource->index();
        }
        break;
      case "post":
        $resource->store($this->data);
        break;
      case "delete":
        $resource->delete($id);
        break;
      default:
        echo "Método no permitido";
        break;
    }
  }
}
```
</details>


