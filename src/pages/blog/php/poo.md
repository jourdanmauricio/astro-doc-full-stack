---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Programación orientada a objetos con PHP
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/php/php.png',
    alt: 'php-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/php/icon.png', alt: 'Logo php' }
description: Programación orientada a objetos con PHP
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

## POO 

<details>

La POO (programación orientada a objetos) es un paradigma compuesto por técnicas que nos ayudará a hacer menos líneas de código y que este sea más reutilizable.

Estos serían los pasos que debemos seguir para tener una POO:

- Crear la clase, esta se trata de un molde para crear objetos.
- Crear una instancia, el objeto es la instancia de la clase.

```php
<?php

class User {
    public $type;
}

class Admin {
    public function greet() {
        return "Hola admin";
    }
}

$user = new User;
$user->type = new Admin;
echo $user->type->greet();
```

</details>

## Deuda técnica

<details>

La deuda técnica es el coste y los intereses a pagar por hacer mal las cosas. Esto paso por que como programadores queremos programar algo rápido hoy y que funcione, pero a futuro cuando volvamos a nuestro código nos daremos cuenta que no es difícil de modificar.

Tenemos que programar bien.

**Cómo evitar la deuda técnica**
- Tenemos que programar con pruebas.
- Documentar a tiempo
- Refactorizar (mejorar) de inmediato nuestro código.


**Deuda técnica**

Es algo que en cualquier momento debemos pagar, y esto hace referencia al Re-trabajo. Generalmente es causado cuando queremos realizar las tareas muy rápido sin medir las consecuencias que se pueden dar a futuro, solo que importa en el momento es que las cosas funcionen, lo cual ocasiona una deuda que a futuro acumula muchos intereses y al momento de pagarla se lleva más del tiempo estimado y quizás impagable.

La recomendación es la siguiente:

- Comprender bien el concepto, para reducir el impacto.
- Programar muy bien completo con lo necesario para no dejar aquellas deudas técnicas.
- Debemos programar con pruebas.
- Documentar a tiempo y refactorizar.

</details>

## Code smell

<details>

Hace referencia al mal olor del código. Este concepto no se refiere a errores técnicos, sino a errores de orden y diseño. Esto sucede mucho cuando intentamos crear soluciones a partir de otras soluciones.

La solución a estos casos es crear una abstracción.

Cómo evitarlo
Para esto debemos hacer una programación más limpia, y reusable. Tenemos que evitar crear grandes métodos, o sea, programación estructura dentro de clases. También evitar crear grandes clases o superclases.

Y sin duda, nosotros debemos evitar a toda costa copiar y pegar código.

> Recuerda: el sistema va a funcionar pero a futuro va a ser horrible de mantener, hasta imposible.

</details>

## Código espagueti

<details>

Un código espagueti es código que está estructurado mediante if, while, for netamente, todo en un mismo archivo donde solamente buscamos resolver el problema. Cuando creamos código estructurado corremos peligro de crear código espagueti. La OOP nos ayuda evitarlo.

El dinero en esta profesión está en el mantenimiento del código.

**Cómo evitar el código espagueti**

- Resolver el problema
- Crea de forma lógica y coherente diferentes métodos que reemplacen tus estructuras de control.
- Crea una o varias clases dependiendo el caso.

</details>

## Inclusión de archivos

<details>

Vamos a ver un concepto técnico que hace referencia a la inclusión de archivos, este seria un paso previo a la programación orientada a objetos. Cuando hablamos de programación orientada a objetos entendemos este concepto como algo exageradamente complejo, sin embargo, vamos a ver este término que nos va a ayudar a entender con mucha claridad que queremos decir con crear clases, con crear objetos, etc. Sentencias:

Include: Nos permite incluir un archivo dentro de otro.

Require : De igual forma permite incluir un archivo, solo que esta función es mucho más exigente, básicamente sí aquí el archivo no existe el sistema se va a detener y lo va a exigir.

Require_once : Hace lo mismo que el anterior, pero que si por equivocación incluyes el archivo varias veces este sistema te va a permitir evaluar eso y evitar así un error.


```php
<?php
// greet.php
function greet($name, $message)
{
    return "$name, $message";
}
```

```php

<?php
// index.php
include 'greet.php';
// require 'greet.php';
// require_once 'greet.php';

echo greet('Italo', 'Cómo estás...');
```
</details>

## Introducción a clases y objetos

<details>

La clase es el molde con el cual crearemos nuestros objetos. Para crear una clase y después un objeto lo hacemos así:

```php
<?php

class User {
    public $type;
}

class Admin {
    public function greet() {
        return "Hola admin";
    }
}

$user = new User;
$user->type = new Admin;
echo $user->type->greet();
```

Y después partirlos en módulos:

```php
// index.php

<?php
require_once './user.php';
require_once './admin.php';

$usuario = new User;
$usuario->type = new Admin;
echo $usuario->type->greet();
```

```php
// Person.php

<?php

class Person {
    public function greet() {
        return "Hola $this->name";
    }
}
```

```php
// User.php
<?php

class User {
    public $type;
}
```

```php
// Admin.php

<?php
include_once('Person.php')

class Admin extends Person {
    public $name = 'Administrador';
}
```

Las clases son los moldes. A partir de ese molde creamos diferentes objetos. 

**CARACTERÍSTICAS**

- modularidad
- abstracción
- polimorfismo
- herencia

Son diferentes conceptos que van relacionados. Vamos a crear clases y a partir de ella vamos a crear objetos. 

Una clase requiere la palabra reservada **class**. Para crear un objeto a partir de esta clase utilizamos una palabra reservada que dice **new**.

**This**: Con this hacemos referencia a diferentes elementos que forman parte de la clase. La programación orienta a objetos permite crear código aislado realmente.

</details>

## Abstracción

<details>

Una clase abstracta es aquella en donde únicamente se definen o firman los atributos y/o métodos que otras clases deberán implementar al querer utilizar esta clase. En otras palabras, una clase abstracta es una clase que tiene métodos generales que definen que es lo que debe hacer pero no se sabe cómo va a realizar estas acciones y es tarea de las clases que implementan esta clase abstracta definir como van a realizar estas tareas.

Estas clases son conocidas como Super Clases o Clases Padre y tienen las siguientes características:

- Una clase abstracta se define como una clase padre o super clase
- Una clase abstracta únicamente define o firma los métodos y atributos a implementar
- Una clase abstracta no puede ser instancia directamente

Es básicamente lo que nos ayuda a abstraer, a pensar en el resultado final antes de que vayamos a la programación.

En este momento estamos declarando en la interfaz lo que queremos.

```php
// StoreInterface.php
<?php

interface StoreInterface {
    public function get(); // solo declaramos
}
```

Las interfaces serán contratos que indicarán que es lo que se debe de hacer sin proveer ninguna funcionalidad.

Se acostumbra que los archivos que contengan al final la palabra interface.

Para implementar una interfaz en una clase ponemos la palabra reservada implements después del nombre de la clase.

Cuando implementamos una interface estamos obligados a desarrollar los métodos declarados en la interface. Debemos respetar el contrato.

```php
// Database.php
<?php

require_once './store_interface';

class Database implements StoreInterface {
    public function get() {
        # code...
    }
}
```

Otro ejemplo. Creamos una clase abstracta llamada Base utilizando la palabra clave abstract. 

Una clase abstracta puede tener métodos abstractos, que no se definen solo se declaran (como con las interfaces).

```php
// Base.php
<?php

abstract class Base {
    public function get() {
        # code...
    }

    abstract public function store();
}
```

Y al momento de extender una clase abstracta debemos implementar los métodos abstractos.

```php
// Cached.php
<?php
require_once './base.php';

class Cached extends Base
{
    public function store() {
        # code...
    }
}
```

Abstraer es aislar, separar u organizar pensando siempre en el resultado final. Describe el resultado final.

Diferencia en entre clase abstracta e interfaz -> https://www.youtube.com/watch?v=riGDna9zme4

Ejemplo final. Creamos una clase para implementar la abstracción definiendo las propiedades y métodos que requiero para la autenticación.

```php
// Auth.php

class Auth {

  protected $email;
  protected $password;

  public function login() {
    //
  }

  public function validate() {
    //
  }
}
```

**CLASES ABSTRACTAS** 

- NO permite crear objetos a partir de una clase abstracta - Es decir permite crear Jerarquiar, pero no permite crear instancias
- Pueden tener estado (Atributos de las propiedades de los valores que se pueden guardar ) y comportamiento (Métodos o funciones)
- Inician Jerarquías de clases (clases generales y otras clases especializadas)

**INTERFACES** 
- Ayudan a crear jerarquías de clases.
- Nos ayudan a simular la HERENCIA múltiple (una clase puede heredar mas de una clase a la vez)

</details>

## Alcance o Encapsulamiento

<details>

El **alcance** hace referencia al **encapsulamiento o principio de ocultación**. Esto nos ayuda cuando estamos trabajando con herencia.

```php
<?php

class User {
    // public - Se puede acceder desde todo el sistema
    // protected - Solo se pueden acceder desde las clases que hereden de esta
    // private - Nadie puede acceder, ni siquiera los hijos.

    public const PAGINATE = 25;

    public $username;
    // protected $username;
    // private  $username;

    public function getUsername() {
        # code...
    }

    // Poner en mayúsculas nos ayuda crear rutas absolutas y no relativas var_dump(__DIR__);
}
```

Para esconder datos vamos a utilizar los modificadores de acceso (se pueden aplicar a constantes, propiedades y métodos):

- Public → Puede ser accedido por todos. Dentro de la clase, fuera de ella y también heredada.
- Protected → Podrá ser accedido a nivel de la clases, paquetes y Subclases (las clases hijas).
- Private → Solo puede ser accedido a nivel de clases, esto quiere decir, que solo puede ser accedido a nivel de la clase, o sea, por ella misma.

</details>

## Modularidad

<details>

Esta no es una técnica de programación, pero si es algo con lo que debemos cumplir para que a futuro se más fácil la mantenibilidad. Este concepto aplica views, models, controllers, helpers, etc.

Debemos pensar en módulos, no en un solo archivo con todo el código.

Este hace referencia a tener pequeños archivos que al unirlos forman el sistema en si.

</details>

## Polimorfismo

<details>

El polimorfismo significa varias formas. Esto quiere decir que si un mismo elemento si se comporta de diferentes maneras y otorga diferentes resultados quiere decir que aplica el término de polimorfismo.

```php
// index.php
<?php

abstract class Base {
    protected $name;

    private function getClassName() {
        return get_called_class();   // Método de php que muestra la clase que nos esta llamando
    }

    public function login() {
        return "<p>Mi nombre es $this->name desde la clase {$this->getClassName()} <br><p>";
    }
}

class Admin extends Base {
    public function __construct($name)    // constructor
    {
        $this->name = $name;
    }
}

class User extends Base {
    public function __construct($name) {
        $this->name = $name;
    }
}

class Guest extends Base {
    protected $name = 'invitado';
}

$guest = new Guest();
echo $guest->login();

$admin = new Admin('Helena');
echo $admin->login();

$user = new User('John Moore');
echo $user->login();
```

```sh
php -S localhost:8000
```
</details>

## Polimorfismo: interfaz

<details>

Una interfaz se puede usar para crear diferentes métodos que se comporten de maneras distintas, pero esta sirve como plantilla, y sin querer queriendo ya estamos trabajando usando polimorfismo.

```php
// index.php
<?php
require_once "./user.php";
require_once "./post.php";

$user = new User();
echo $user->all();

$post = new Post();
echo $post->all();
```

```php
// SearchInterface.php
<?php

interface Search {
  public function all();
}
```

```php
// User.php
<?php

require_once "./search_interface.php";

class User implements Search {
  public function all() {
    return "Obteniendo los Usuarios";
  }
}
```

```php
// Post.php
<?php

require_once "./search_interface.php";

class Post implements Search {
  public function all() {
    return "Obteniendo los Post";
  }
}
```

</details>

## Herencia

<details>

La herencia nos permitirá crear nuevas clases a partir de otras. O sea, vamos reutilizar código. Quiere decir, que vamos a hacer una abstracción para generar una súper clases general que después utilicemos para crear otras clases.

En la herencia también tendremos una jerarquía de padre e hijo.
En OOP, la clase padre siempre la encontraremos como la 'Súperclase' y los hijos como 'subclase'.
Y a través de encapsulamiento vamos a poder definir que puede heredar el hijo y que no.

El método constructor nos permite inicializar las variables del objeto.

```php
<?php

class User {
    public $name;

    public function __construct($name) {
        $this->name = $name;
    }
}
```

Y para crear una herencia utilizamos la palabra reservada extends seguido del nombre de la clases.

```php
<?php

class Admin extends User {
    // ...
}
```

Para evitar que se incumpla los principios SOLID 2 y 3, podemos utilizar la palabra reservada final al principio del método. También, podemos utilizar este la palabra reservado final en una clase, pero esto significa que no puede ser heredada.

```php
<?php

class User {
    public $name;

    final public function __construct($name) {
        $this->name = $name;
    }
}
```

**Herencia**

Nos permite heredar los métodos y propiedades de la clase padre o madre a las subclases hijas.

Con la palabra final no podemos sobreescribir los métodos de la clase padre o madre.

Cuando declaramos una clase con la palabra final nos indica que esa clase no se puede heredar, por lo que se presentara un error al momento de ejecutar el código. De esta forma se evitaría la herencia de la clase.

La clase abstracta no se puede instanciar, pero una final si se puede instanciar.

En conclusión una herencia es utilizar todo lo que la clase padre tiene definido, si esta clase padre tiene 5 métodos, estos los tendran las clases que se hereden a partir de allí.

</details>

## Interfaces

<details>

Una interfaz se desarrolla y se implementa en una clase, al implementarla nosotros estamos obligados a desarrollar todos los métodos que la interfaz define.

Esto quiere decir, que una interfaz no puede hacer nada por si sola, lo que significa que las clases hijas están encargadas de definir el comportamiento de todos los métodos abstractos de forma obligatoria.

En palabras más sencillas, las interfaces serán contratos que indicarán que es lo que se debe de hacer sin proveer ninguna funcionalidad.

```php
<?php

<?php

interface Person{
    public function getName();
}

class Admin implements Person{
  public $name;
  public function __construct($name){
    $this->name = $name;
  }
    public function getName(){
        return $this->name;
    }
}

$admin = new Admin('Lynda');
echo $admin->getName();

?>
```
</details>

## Resumen

<details>

La programación orientada a objetos es una forma de programar, un paradigma o una técnica. Los conceptos que aquí aprendiste te servirán en PHP y en otros lenguajes de programación. Recordemos que para programar de esta forma en realidad debemos crear objetos, y un objeto es una instancia de una clase y una clase es el molde. Ejemplo:

- Programación orientada a objetos: es la técnica.
- PHP: es el lenguaje de programación (donde implementamos la técnica).

Podemos resumir los diferentes conceptos de la siguiente manera:

1. Herencia: compartir métodos entre clases padres y clases hijas.
2. Abstracción: significa aislar, separar y sacar.
3. Polimorfismo: capacidad o virtud que tienen los métodos donde, por ejemplo, un mismo método puede tener diferentes comportamientos y dar diferentes resultados.
4. Modularidad: este principio básicamente nos ayuda a tener cada vez piezas de código más pequeñas y entendibles, donde cada pieza es un módulo y muchos módulos forman el sistema entero.
5. Encapsulamiento: un objeto debe estar aislado y ser un módulo natural. Esto se cumple aplicando la protección a las propiedades impidiendo su modificación y básicamente se refiere a controlar el acceso.

Al entender este estilo conseguimos organizar mucho mejor nuestro código agrupando tareas comunes para crear una sola solución y usarla las veces que sean necesarias en nuestro proyecto. Evitamos con esto repetir código y ganamos mucho al dar mantenimiento en el futuro.

1. Comienza con la palabra reservada class.
2. El código va entre llaves { }.
3. La información se guarda en propiedades que pueden ser públicas, privadas o protegidas.
4. Cada acción la colocamos en métodos que básicamente son funciones o bloques de código dentro de una clase.
5. $this es una variable reservada por el lenguaje que podemos usar para acceder a elementos propios, siempre y cuando estemos en la instancia de la clase.
6. new es la palabra clave usada para crear un objeto a partir de una clase.

En el mundo de la programación tenemos muchas técnicas y formas, podemos instanciar una clase dentro de otra y navegar por sus métodos sin restricción.

```php
<?php
  
class User 
{
  public $type;
}

class Admin 
{
  public function greet() 
  {
    echo "Hola Administrador";
  }
}

$user = new User;
$user->type = new Admin;
$user->type->greet();
```

```php
<?php
  
class Person 
{
  
    public function greet() 
    {
        echo "Hola $this->name";
    }

}

class User 
{
    public $type;
}

class Admin extends Person 
{
    public $name = 'Administrador';
}

$user = new User;
$user->type = new Admin;
$user->type->greet();
```

Son conceptos, métodos o formas que usamos a veces sin saber que estos conceptos existen. Revisa en detalle cada cosa y trata de hacer un ejercicio por concepto para que estos formen parte de ti.

</details>