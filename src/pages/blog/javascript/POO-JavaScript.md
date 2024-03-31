---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Programación Orientada a Objetos con JavasScript
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/metodos-javascript/back.webp',
    alt: Logo js',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/metodos-javascript/icon.png',
    alt: 'Logo js',
  }
description: Programación Orientada a Objetos con JavasScript
draft: false
category: js objetos
---

## Orientado a objetos, basado en prototipos

<details>
<summary>Detalle</summary>
El lenguaje JavaScript posee características particulares a la hora de trabajar con programación orientada a objetos.

### Diferencia entre lenguajes basados en clases y prototipos

**Lenguaje basado en clases** -> Se basan en el concepto de entidades o clases

- Clases: Define las propiedades que caracterizan un determinado conjunto de objetos. ++Una clase es una entidad abstracta++. Ejemplo: La clase empleado define a un conjunto de empleados.
- Instancias: Instanciación de una clase, de uno de sus miembros. Una instancia tiene exactamente las mismas propiedades de su clase padre, ni una más ni una menos. Ejemplo: Victoria es una instancia de la clase empleados.

**Lenguaje basado en prototipos** -> No hace las mismas distinciones que los lenguajes basados en clases, simplemente tiene objetos.

- Toma el concepto de objeto prototípico. Un objeto se usa como plantilla a partir del cual se obtiene un conjunto inicial de propiedades de un nuevo objeto.
- Cualquier objeto puede especificar sus propias propiedades.
- Cualquier objeto puede ser usado como prototípico de otro objeto.

### Objetos

En js podemos crear objetos de tres formas diferentes:

- con llaves
- con Object.create
- desde funciones (con la palabra reservada new o no)

Esto cambia completamente el resultado de nuestros objetos porque ya no estariamos creando objetos literales (llaves), sino instancias de prototipos. Y para crear instancias de prototipos, necesitamos crear prototipos. Y para crear prototipos podemos usar la sintaxis de prototipos o la sintaxis de clases.

Pero las clases en JS no son lo mismo que en otros lenguajes de programación. JS es un lenguaje orientado a objetos basado en prototipos (no en clases, como otros lenguajes de POO)

**"Por dentro todos nuestros objetos están construidos con Prototipos"**

</details>

## Qué es programación orientada a objetos

<details>

### Paradigmas

Cuando programamos un algoritmo existen diferentes formas de llegar a un mismo resultado.

Los paradigmas de programación formas, caminos, indicaciones o lineamientos que podemos seguir para programar nuestras aplicaciones. Existen muchos paradigmas entre los más llamativos son:

- Estructurado
- Orientado a objetos
- Funcional

Cada paradigma se creó para solucionar algunos problemas o dificultades que nos generaban los paradigmas que existían en el pasado.

Un paradigma recientemente creado no significa que es mejor que otro, depende del contexto de uso.

Existen lenguajes que te permiten utilizar más de un paradigma como otros que son exclusivos para un paradigma de programación.

### Programación Orientada a Objetos

**Orden** Uno de los primeros problemas a resolver fue el orden. Esto nos ayuda cuando todos los elementos de nuestra aplicación están conectados entre sí.

Los objetos nos permiten definir:

- Atributos son valores que serán propios de unos objetos
- Métodos son comportamientos para nuestros objetos

**Reutilización** Imagínate crear varias galletas las cuales deban de tener un mismo tamaño y grosor, este proceso será repetitivo.

Al tener un molde será más sencillo crear las mismas de una misma forma.

- Crear moldes toma un poco más de tiempo resulta un poco de más tiempo, pero a largo plazo para crear uno nos ahorra mucho más tiempo.

Las clases serán nuestros moldes las cuales podremos reutilizar declarando atributos y métodos.

</details>

## Qué es un objeto en JavaScript

<details>
<summary>Detalle</summary>
**Objeto literal** Los objetos literales se distinguen de los objetos de la POO porque no son instancias de un prototipo creado por el desarrollador.

Sin embargo los objetos literales son instancias del prototipo Object creado por defecto en JavaScript.

```js
const Natalia = {
  Name: 'Natalia',
  Age: 20,
  Rank: 2000,
};
```

**Prototipo** Un prototipo es una estructura de código a partir de la cual se crean objetos, ya que guarda los atributos y métodos que luego podrán ser heredados por sus instancias. Podemos pensarlo como un "molde" de objetos.

```js
function Student() {
  this.name = 'Nombre';
  this.age = '18';
  this.points = '750';
}

const Juana = new Student();
```

**Objeto** Los objetos son estructuras de datos formadas por métodos y atributos, los cuales hereda de su prototipo padre. De modo que los objetos son instancias de ese prototipo, particularmente cuando dicho prototipo fue creado por el desarrollador (en caso contrario se llaman objetos literales).

**Atributos** Dentro de los objetos se pueden guardar atributos para guardar en ellos la información la información que se les asocia. Así, toda la información del objeto se guarda en sí mismo.

**Métodos** Dentro de los objetos también pueden guardarse métodos, los cuales son funciones que, entre otras cosas, permiten actualizar la información guardada en los atributos de forma segura.

**Atributo --proto--** Es el nombre que se le da al atributo donde se guardan los métodos que las estructuras de datos tienen por defecto en JavaScript.

El atributo **--proto--** se hereda a partir de los prototipo por defecto de JavaScript para cada estructura de datos en particular, por ejemplo de los prototipos Object y Array.

El atributo **--proto--** también se hereda a los objetos, ya que éstos son a la vez instancias de algún prototipo creado por el desarrollador y del prototipo Object.

**Comparación entre un Objeto literal vs Objeto de una instancia**

La diferencia más marcada es que el objeto que es una instancia de un prototipo está etiquetado como instancia de Student

**Prototype**

Si expandimos --proto-- desde cualquier objeto literal, podemos ver que está repleto de métodos.

Podemos acceder a todos estos métodos desde nuestros objetos literales sin necesidad de entrar al atributo --proto--.

Por ejemplo si deseamos utilizar hasOwnProperty de un objeto literal, no es necesario escribir --proto-- aparte que nunca definimos hasOwnProperty.

```js
natalia.hasOwnProperty('name');
```

No solo pasa con los objetos sino que también con los arrays. Siempre que creamos un array tendremos --proto--.

**¿De dónde sale --proto--?**

Cuando creamos un objeto literal o array nos indica en la propiedad --proto-- que es una instancia tanto de Object o Array.

JavaScript por dentro tiene prototipos por defecto entre ellos se encuentran:

- Object
- Array
- String

Cuando escribimos [] o {}, js por debajo crea una nueva instancias de esos prototipos. Por eso es que el proto siempre indica que es una instancia de Object.

Nosotros también **podemos crear prototipos**, pero al crear instancias de un prototipo no solo recibimos sus métodos y atributos del mismo, sino que también **recibimos de Object**.

En sí al definir un objeto literal no es instancia de ningún prototipo que nosotros hayamos definido sino que es instancia de Object el cual viene por defecto.

</details>

## Objetos literales y prototipos en JavaScript

<details>
<summary>Detalle</summary>

```js
// Objeto literal
const natalia = {
  name: 'Natalia',
  age: 20,
  cursosAprobados: ['Curso de HTML y CSS', 'Curso práctico de HTML y CSS'],
  // aprobarCurso: function() {
  // }
  // También se puede escribir:
  aprobarCurso(nuevoCurso) {
    this.cursosAprobados.push(nuvoCurso);
  },
};

// Natalia aprueba otro curso.
// Acceso con notación de punto
natialia.cursosAprobados.push('Curso de Responsive Design');
natialia.cursosAprobados.push('Curso de Grid');
```

Si en la clase tenemos muchos alumnos debemos repetir el objeto literal anterior cambiando valores tantas veces como objetos deseemos.

Podemos crear un **prototipo**, un molde llamado Student.

```js
// Prototipo
function Student(name, age, cursosAprobados) {
  // Atributos
  this.name = name;
  this.age = age;
  this.cursosAprobados = cursosAprobados;

  // Métodos
  // Esta es una forma de crear métodos, pero también podemos
  // realizarlo desde afuera de la función
  this.aprobarCurso = function (nuvoCurso) {
    this.cursosAprobados.push(nuvoCurso);
  };
}

// Creamos un método desde fuera de la función
Student.prototype.aprobarCurso2 = function (nuvoCurso) {
  this.cursosAprobados.push(nuvoCurso);
};

// Creamos una instancia para Juana
const juana = new Student('Juana', 15, [
  'Curso de introducción a Videojuegos',
  'Curso de creación de personajes',
]);

// Si vemos el objeto juana en la consola del navegador
// vemos que el método aprobarCurso2 no se encuentra a simple vista
// se encuentra dentro de __proto__
// Sin embargo podemos ejecutar juana.aprobarCurso2("Curso de Unreal Engine") y funcionará.
// En __proto__ recibimos el método aprobarCurso2 desde el prototipo Student
```

</details>

## Clases en JavaScript

<details>
<summary>Detalle</summary>

Las clases en Js son una sintaxis más amigable para trabajar con prototipos, por debajo manipulan prototipos.

Las clases en JavaScript son una sintaxis muy parecida las clases que utilizaríamos en otros lenguajes.

Con prototipos recibíamos los parámetros en la función, en la sintaxis de clases los recibimos mediante el **método constructor**.

Los **métodos** se pueden crear dentro de contructor con this o fuera del constructor

```js
// Prototipos con sintaxis de clase
class Student2 {
  constructor(name, age, cursosAprobados) {
    this.name = name;
    this.age = age;
    this.cursosAprobados = cursosAprobados;
    this.aprobarCurso = function (nuvoCurso) {
      this.cursosAprobados.push(nuvoCurso);
    };
  }
  aprobarCurso2(nuvoCurso) {
    this.cursosAprobados.push(nuvoCurso);
  }
}

const miguel = new Student2('Miguel', 28, [
  'Curso de Análisis de Negocios para Ciencia de Datos',
  'Pincipios de Visualización de Datos para BI',
]);

miguel.aprobarCurso2('Curso de Tableau');
```

### PATRÓN "RORO"

El patrón se llama “RORO” porque proviene del Inglés “Receive an object, return an object” (Recibe un objeto, devuelve un objeto).

<mark>Nos ayuda cuando tenemos muchos parámetros en nuestro constructor, ya que al instanciar la clase debemos acordarnos del **orden de los parámetros** y, además, no podemos tener parámetros por defecto.</mark>

Este patrón señala, que en lugar de recibir múltiple parámetros, podemos recibir solo un objeto, y destructurarlo. También, al momento de instanciar un objeto debemos enviar los parámetros cómo un objeto, los que nos hace escribir un poco más pero nos ayuda mucho.

Ventajas:

- Ya no importa el orden de los parámetros
- Podemos asignar valores por defecto a los parámetros

En siguiente ejemplo, sino enviamos el array de cursos aprobados, por defecto se coloca un array vacio.

```js
// Prototipos con sintaxis de clase
class Student2 {
  constructor({ name, age, cursosAprobados = [], email }) {
    this.name = name;
    this.age = age;
    this.cursosAprobados = cursosAprobados;
    this.email = email;
  }
  aprobarCurso2(nuvoCurso) {
    this.cursosAprobados.push(nuvoCurso);
  }
}

const miguel2 = new Student2({
  age: 28,
  email: 'migue@mail.com',
  name: 'Miguel',
});

miguel2.aprobarCurso2('Curso de Tableau');
```

</details>

## Ventajas de la programación orientada a objetos

<details>
<summary>Detalle</summary>

Supongamos que definimos un objeto que poseen 30 propiedades, algunas propiedades son arrays u objetos y debemos crear 40 estudiantes. Si trabajamos con objetos literales el código se vuelve demasido repetitivo.

¿Y qué ocurre si debemos modificar un array que forma parte de todos los objetos? Deberíamos modificar todos los objetos a mano. Esto no es escalable, y resulta dificil de mantener.

**Ventajas de la programación orientada a objetos**

- Reusabilidad. Cuando hemos diseñado adecuadamente las clases, se pueden usar en distintas partes del programa y en numerosos proyectos.

- Mantenibilidad. Debido a las sencillez para abstraer el problema, los programas orientados a objetos son más sencillos de leer y comprender, pues nos permiten ocultar detalles de implementación dejando visibles sólo aquellos detalles más relevantes.

- Modificabilidad. La facilidad de añadir, suprimir o modificar nuevos objetos nos permite hacer modificaciones de una forma muy sencilla.

- Fiabilidad. Al dividir el problema en partes más pequeñas podemos probarlas de manera independiente y aislar mucho más fácilmente los posibles errores que puedan surgir.

La programación orientada a objetos presenta también algunas desventajas como pueden ser:

- Cambio en la forma de pensar de la programación tradicional a la orientada a objetos.

- La ejecución de programas orientados a objetos es más lenta.

- La necesidad de utilizar bibliotecas de clases obliga a su aprendizaje y entrenamiento.

```js
// cursos
class Courses {
  constructor({ name, teacher, ranking, level }) {
    (this.name = name), (this.teacher = teacher);
    this.ranking = ranking;
    this.level = level;
  }
}

const basicoJS = new Courses({
  name: 'Curso Practico de JavaScript',
  teacher: 'Juan David Castro',
  ranking: 4.7,
  level: 'medium',
});

const practicoJS = new Courses({
  name: 'Curso Basico de JavaScript',
  teacher: 'Diego De Granda',
  ranking: 4.6,
  level: 'medium',
});

const basicoPython = new Courses({
  name: 'Curso Basico de Python',
  teacher: 'Oscar Manuel',
  ranking: 3.7,
  level: 'beginer',
});

const avanzadoPython = new Courses({
  name: 'Curso Avanzado de Python',
  teacher: 'Freddy Vega',
  ranking: 4.1,
  level: 'advanced',
});

// learning paths
class LearningPaths {
  constructor({ name, courses }) {
    this.name = name;
    this.courses = courses;
  }
}

const escuelaJS = new LearningPaths({
  name: 'Escuela de JavaScript',
  courses: [basicoJS, practicoJS],
});

const escuelaDataScience = new LearningPaths({
  name: 'Escuela de Data Science',
  courses: [basicoPython, avanzadoPython],
});

// students
class Student {
  constructor({
    name,
    email,
    username,
    twitter = undefined,
    instagram = undefined,
    facebook = undefined,
    approvedCourses = [],
    learningPaths = [],
  }) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.socialMedia = {
      twitter,
      instagram,
      facebook,
    };
    this.approvedCourses = approvedCourses;
    this.learningPaths = learningPaths;
  }
}

const juan = new Student({
  name: 'JuanDC',
  username: 'juandc',
  email: 'juanito@juanito.com',
  twitter: 'fjuandc',
  learningPaths: [escuelaDataScience],
});

const miguel = new Student({
  name: 'Miguelito',
  username: 'miguelitoFeliz',
  email: 'miguelito@juanito.com',
  instagram: 'miguelito_Feliz',
  approvedCourses: [basicoJS, basicoPython],
  learningPaths: [escuelaJS, escuelaDataScience],
});
```

</details>

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
</style>
