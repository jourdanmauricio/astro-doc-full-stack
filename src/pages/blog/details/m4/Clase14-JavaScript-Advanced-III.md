---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 14 - JavaScript Advanced III
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'JavaScript Advanced III',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: Deployment
draft: false
category: Backend Js
---

## Conceptos avanzados

## JavaScript Avanzado

Comenzaremos esta primera lección mencionando qué son los closures, y cuáles son sus aplicaciones prácticas. Veremos cómo estas permiten acceder al alcance de una fundición exterior, incluso luego de que la función exterior haya terminado de ejecutarse. De la misma manera veremos de qué forma podemos trabajar con prototipos de manera más profesional.

Luego de esta breve introducción, ¡ahora sí! Comencemos con la última clase de este último módulo.

## Closures

En el desarrollo de software, muchas veces nos podremos encontrar en ciertas situaciones en las que queramos crear funciones que mantengan un acceso a variables privadas luego de que su contexto de ejecución original haya finalizado.

Mejor, antes de ponernos técnicos, entendamos qué es una closure. De hecho, es bastante sencillo.

Para definir una closure, debemos considerar una función (que llamaremos padre) que retorna a otra (a la que nos referiremos como función anidada o hija). Diremos entonces que una closure es la característica que tiene la función hija de acceder a las variables de su función padre, incluso si esta última ya se ha ejecutado por completo.

Esto es posible porque las funciones pueden crear un "alcance léxico" que mantiene vivas estas variables. Veamos un ejemplo de esto:

```js
function crearSaludo(saludo) {
  return function (nombre) {
    return `${saludo}, ${nombre}!`;
  };
}

const saludoHola = crearSaludo('Hola');
console.log('saludoHola("Pedro")'); // "Hola, Pedro!"
```

Aquí, crearSaludo es una función que recibe un string saludo y devuelve otra función. La función hija devuelta recordará el valor de saludo que estaba en su alcance cuando fue creada. Aunque crearSaludo haya terminado de ejecutarse y su contexto de ejecución ya no exista, la función retornada sigue teniendo acceso a saludo, por closure. Ten presente que, para tener acceso a esta última función, es necesario guardarla en una variable (saludoHola en este caso) y ejecutarla con los argumentos necesarios.

Veamos otro ejemplo para entender mejor este concepto. Comenzaremos definiendo una función llamada crearSecuencia que acepta dos parámetros: inicio y paso. Estos parámetros están pensados para inicializar un contador y definir su incremento, respectivamente.

```js
function crearSecuencia(inicio, paso) {
  let contador = inicio - paso;

  return function () {
    contador += paso;
    return contador;
  };
}
```

Dentro de la función crearSecuencia, se declara una variable local contador y se inicializa con el valor de inicio - paso. Esto se hace para que, cuando la función interna se invoque por primera vez, el valor del contador sea igual al valor inicial (inicio) después de incrementarlo por paso.

La función hija retornada por crearSecuencia, tiene acceso a las variables de su ámbito léxico, en especial, a contador y paso, incluso después de que la función padre haya terminado de ejecutarse.

```js
const secuenciaDeTres = crearSecuencia(0, 3);
console.log(secuenciaDeTres()); // 3
console.log(secuenciaDeTres()); // 6
console.log(secuenciaDeTres()); // 9

const secuenciaDeCinco = crearSecuencia(0, 5);
console.log(secuenciaDeTres()); // 5
console.log(secuenciaDeTres()); // 10
console.log(secuenciaDeTres()); // 15
```

De esta manera, cada vez que se invoca la función retornada, se incrementa el valor de contador según el paso y luego retorna el nuevo valor de contador.

Esto permite que la función mantenga el estado entre llamadas. ¿En qué otro tipo de situaciones nos podrían servir las closures? Por ejemplo, para cambiar la configuración de idioma de un sitio web:

```js
function hacerSaludo(lenguaje) {
  if (lenguaje === 'en') {
    return function () {
      console.log('Hi!');
    };
  }

  if (lenguaje === 'es') {
    return function () {
      console.log('Hola!');
    };
  }
}

var saludoIngles = hacerSaludo('en');
var saludoEspaniol = hacerSaludo('es');

saludoIngles();
saludoEspaniol();
```

Ahora que ya entendemos la naturaleza básica de las closures, veamos un nuevo ejemplo jugando ahora con las posibilidades que nos brinda JavaScript.

```js
var creaFuncion = () => {
  var arreglo = [];

  // for (var i = 0; i < 3; i++) {
  for (let i = 0; i < 3; i++) {
    arreglo.push(() => console.log(i));
  }

  return arreglo;
};

var arr = creaFuncion();

// Siempre retorna 3 porque declamos el for con var
arr[0](); // () => console.log(i) -> 3
arr[1](); // () => console.log(i) -> 3
arr[2](); // () => console.log(i) -> 3

arr[0](); // () => console.log(i) -> 0
arr[1](); // () => console.log(i) -> 1
arr[2](); // () => console.log(i) -> 2
```

### Aplicaciones prácticas

Retomando lo que hablábamos en un comienzo, ¿Cuándo nos interesaría lograr este comportamiento de closures? Esto nos puede ser de gran utilidad en la creación de funciones personalizadas que operan sobre datos sensibles o específicos sin exponerlos al ámbito global.

```js
const crearSistemaDeAutenticacion = () => {
  let usuarios = [
    {nombre: "Juan", pass: "12345" },
    {nombre: "Ana", pass: "abcde" }
  ]

  return {
    validarCredenciales: (nombre, pass) => {
      const usuario = usuarios.find((user) => user.nombre === nombre);
      return usuario && usuario.pass === pass;
    }

    cambiarPass: (nombre, pass, newPass) => {
      const usuario = usuarios.find((user) => user.nombre === nombre);
      if (usuario && usuario.pass === pass) {
        usuario.pass = newPass;
        return true;
      }
      return false;
    }
  }
}
```

Si dijéramos que las closures son una excelente alternativa para crear un sistema de autenticación estable y seguro para un servidor, cualquier desarrollador con un poco de experiencia diría…

Este ejemplo fue meramente ilustrativo para que podamos comprender el alcance que tiene este tipo de función. Nunca desarrollaremos un sistema de autenticación solo con esta idea. Sin embargo, para momentos de código en los que se deben trabajar cuestiones más puntuales (y no todo un sistema) encontraremos en las closures una gran solución.

Hasta este momento hemos hablado sobre closures. A continuación, profundizaremos en otro concepto que tiene JavaScript, y que se utiliza en la gran mayoría de los lenguajes: prototipos.

## Prototipos

JavaScript es un lenguaje basado en prototipos, por lo tanto, entender el objeto prototype es fundamental. Este objeto es el mecanismo a través del cual los objetos pueden heredar propiedades y métodos de otros objetos.

Piensa en los prototipos como una especie de plantilla que se usa para añadir características comunes a múltiples instancias de objeto. Esto permite ahorrar memoria y organizar mejor el código. Al modificar un prototipo, todas las instancias del objeto que heredan de este, se actualizan automáticamente, facilitando así el mantenimiento del código.

Todo esto nos es familiar, dado que ya lo hemos visto en las primeras clases del bootcamp. ¿Lo recuerdas? En esta lección, profundizaremos en algunos conceptos que tal vez aún no conozcas.

### **\_\_proto\_\_ vs prototype**

- **prototype**: es una propiedad de una función en JavaScript que apunta al objeto que será asignado como el prototipo de los objetos creados con dicha función constructora.

- **\_\_proto\_\_**: es una propiedad de cada objeto que apunta al prototipo del objeto del cual hereda propiedades y métodos.

La principal diferencia entre prototype y \_\_proto\_\_ radica en su uso y asignación. Prototype, es una propiedad específica de las funciones constructoras y se utiliza para establecer el prototipo de los objetos que serán creados por dicha función. Por otro lado, \_\_proto\_\_, es una propiedad de los objetos individuales que apunta al prototipo del cual el objeto hereda.

Bajemos a tierra estos conceptos abstractos. Imagina que tienes una plantilla estándar (prototipo) para hacer tarjetas de cumpleaños. Esta plantilla incluye el diseño general, como dónde poner el texto y las imágenes. Cada vez que necesitas hacer una nueva tarjeta de cumpleaños, usas esta plantilla como base para crear una nueva tarjeta con un diseño similar pero con contenido específico para la persona que cumple años.

Ahora imagina que has hecho varias tarjetas de cumpleaños usando esa plantilla. Cada tarjeta que has hecho tiene un estilo y diseño similar porque todas se basaron en la misma plantilla. El enlace entre cada tarjeta que has hecho y la plantilla original es como el enlace \_\_proto\_\_. Cada tarjeta hereda el diseño básico y las características de la plantilla a través de este enlace, pero cada una puede tener contenido diferente dependiendo de la persona y la ocasión.

En términos simples, prototype se utiliza para definir propiedades y métodos que estarán disponibles en los objetos creados por una función constructora, mientras que \_\_proto\_\_ establece una cadena de herencia directa para un objeto a su prototipo.

Veamos un ejemplo de esto para comprender mejor estos términos.

```js
function Persona(nombre) {
  this.nombre = nombre;
}

Persona.prototype.saludar = function () {
  console.log(`Hola, mi nombre es ${this.nombre}`);
};

const alice = new Persona('Alice');

alice.saludar(); // Hola, mi nombre es Alice

console.log(alice.__proto__ === Persona.prototype); // true
console.log(Persona.prototype.constructor === Persona); // true
```

En este ejemplo, **Persona** es una función constructora con una propiedad prototype que tiene un método **saludar**. Cuando creamos un nuevo objeto alice usando el constructor Persona, **alice** hereda el método saludar a través de su propiedad \_\_proto\_\_, que apunta al objeto Persona.prototype. Esto significa que alice.\_\_proto\_\_ es una referencia directa a Persona.prototype, permitiéndole a alice utilizar el método saludar. Aquí, prototype se utiliza para definir propiedades y métodos para los objetos creados por Persona, y \_\_proto\_\_ establece la conexión directa entre alice y su prototipo, Persona.prototype, formando la cadena de herencia.

Pasamos ahora a conocer otro paradigma de la programación orientada a objetos.

### Ocultamiento de propiedades

<mark>El ocultamiento de propiedades (también llamado **encapsulamiento**) es una técnica de programación orientada a objetos que restringe el acceso directo a las propiedades de una clase desde fuera de esta</mark>, permitiendo así un mejor control sobre la manipulación de los datos.

Para lograr esto, se utilizan principalmente las propiedades privadas, las cuales se declaran anteponiendo un numeral **(#)** al nombre de la propiedad dentro de la clase. Este mecanismo asegura que dichas propiedades solo puedan ser accedidas o modificadas mediante métodos específicos de la clase. Revisemos esto en un ejemplo.

```js

class CuentaBacaria() {
  #saldo;

  constructor(saldoIncial) {
    this.saldo = saldoIncial
  }

  obtenerSaldo() {
    return this.saldo;
  }

  depositar(monto) {
    if (monto > 0) {
      this.saldo += monto;
      console.log(`Se depositaron $${monto}. Saldo actual: $${this.#saldo}`);
    }
    else {
      console.log('No se puede depositar una cantidad negativa');
    }
  }
}

const miCuenta = new CuentaBancaria(1000);

miCuenta.obtenerSaldo();
miCuenta.depositar(500);

miCuenta.#saldo; // ERROR: Property '#saldo' is not acccesible outside class 'CuentaBancaria'
// because it has a private identifier. ts(18013)

```

En la siguiente lección trabajaremos con un nuevo concepto llamado programación funcional. Veamos de qué nos puede ser útil.

## Programación funcional

## Paradigmas de la programación

Los paradigmas de programación son un estilo o enfoque teórico utilizado para resolver problemas y estructurar el código en el desarrollo de software, marcando las pautas sobre cómo se organizan y realizan las tareas de programación.

JavaScript es un lenguaje multi-paradigma que soporta principalmente tres de ellos: imperativo, funcional y orientado a objetos, permitiendo a los desarrolladores elegir el enfoque más adecuado según el problema a resolver. En esta lección revisaremos en profundidad y trabajaremos con el paradigma funcional.

### Programación funcional

<mark>La programación funcional es un paradigma de programación que se basa en gran medida en el uso de funciones puras y aisladas.</mark>

<mark>Recordemos que una **función pura** en programación es una función que, dada la misma entrada, siempre produce la misma salida y no tiene efectos secundarios.</mark>

```js
let suma = 0;
function sumar(num) {
  suma += num;
  return suma;
}

console.log(sumar(5));
console.log(sumar(3));
```

En esta imagen, la función no es pura puesto que la misma entrada no produce la misma salida. Caso contrario sucede con la siguiente imagen:

```js
function sumarPuro(a, b) {
  return a + b;
}
console.log(sumarPuro(5, 3));
console.log(sumarPuro(5, 3));
```

Para complementar este concepto, repasemos cuáles son los tipos de funciones que existen.

- **Funciones de primera clase**: En JavaScript, todas las funciones son funciones de primera clase. Eso significa que pueden tratarse como cualquier otra variable. Pueden asignarse como valores a variables, devolverse desde otras funciones e incluso ser pasadas como argumentos a otras funciones:

```js
const saludar = () => {
  console.log('Hola'); // Hola
};

saludar();
```

- **Funciones callback**: Las funciones callback son funciones que se pasan a otras como argumentos. No podemos invocar funciones callback. Se invocan cuando se llama a la función principal a la que fueron pasadas.

En la imagen, valorDePrueba es una función que acepta un valor y una función callback, y que retorna "valor pasó la prueba" si el valor devuelto al ejecutar la callback con el valor es true. En caso contrario, devolverá “valor no pasó la prueba”.

```js
function valorDePrueba(valor, callback) {
  if (callback(valor)) return 'Valor pasó la prueba';
  else return 'Valor no pasó la prueba';
}

const esPositivo = (numero) => numero > 0;

console.log(valorDePrueba(10, esPositivo));
// Valor pasó la prueba
console.log(valorDePrueba(-5, esPositivo));
// Valor no pasó la prueba
```

- **Funciones de orden superior**: Las funciones de orden superior son funciones que reciben a otras como argumentos o que devuelven una función.

¡Si! Esto ya lo hemos visto (al inicio de clase). Las closures son funciones de orden superior.

- **Funciones asincronas**: Las funciones asíncronas permiten ejecutar tareas de manera no bloqueante, lo que significa que pueden continuar ejecutando otras tareas mientras esperan que ciertas operaciones, como solicitudes a servidores, se completen. Un ejemplo de una función asíncrona, puede ser:

```js
async function obtenerPublicacion() {
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!respuesta.ok) throw new Error(`HTTP error! status: ${respuesta.status}`)

    const publicacion = awaut respuesta.json();
  } catch (error) {
    console.error("Error al obtener la publicación: ", error);
  }
}
obtenerPublicacion(); // Llamada a la funcion asincrona
```

Ahora que ya conocemos qué es la programación funcional, y cuáles son los tipos de funciones que podemos encontrar en JS, veamos cuáles son los principios que debemos seguir si queremos desarrollar bajo este paradigma.

### Principios del funcionalismo

Una consideración importante a tener en cuenta, es que el mero uso de funciones no se traduce en programación funcional. Hay algunos principios que debemos comprender si queremos que nuestros programas califiquen para el estándar de programación funcional. Echemos un vistazo a estos.

- **Evitar efector secundarios y mutaciones**: una función no debería modificar nada, generalmente los cambios provocan errores. Si una función cambia, por ejemplo, una variable global puede generar problemas al resto del código que utilice esa variable.

En programación funcional a los cambios se los denomina **mutaciones** y los resultados se denominan **efectos secundarios**.

Una **función pura** no genera mutaciones y posee efectos secundarios. Cuando tenemos que utilizar una variable global debemos pasarla por parámetro sin hacer uso directo de esa variable.

```js
var edad = 13;

const verificarEdad = (edad) => {
  if (edad >= 18) {
    return 'Es mayor de edad';
  } else {
    return 'Es menor de edad';
  }
};

verificarEdad(17);
verificarEdad(edad);
// Pasando la edad como parametro mantenemos la función pura
```

- **Abstracción**: nos permite explicar un problema en un nivel superior sin necesidad de definir los detalles de implementación.

Podemos crear funciones para tareas que repitamos más de una vez, entonces podemos crear una abstracción de eso.

```js
const calcularAreaCirculo = (radio) => {
  return Math.PI * radio * radio;
};

const area = calcularCriculo(10);
```

- **Composición de funciones**: es el acto de crear una función compleja, al combinar funciones simples.

```js
const duplicar = (x) => x * 2;

const sumarCinco = (x) => x + 5;

const duplicarYSumarCinco = (x) => sumarCinco(duplicar(x));

duplicarYSumarCinco(5); // 15
```

- **Declaratividad sobre imperatividad**: el paradigma funcional siempre estará favoreciendo el enfoque declarativo en ligar del imperativo. El código va a tender a escribir el qué y no el cómo.

```js
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];

let resultadoImperativo = [];

for (let i = 0; i < numeros.length; i++) {
  resultadoImperativo.push(numeros[i] * 2 + 5);
}

const resultadoDeclarativo = numeros.map((x) => x * 2 + 5);
```

Ahora que ya entendemos mejor cómo se trabaja con funciones dentro de JavaScript, podemos pasar a otro tema que, si bien hemos visto a lo largo del bootcamp, tal vez no hemos profundizado mucho sobre esto de manera formal con este lenguaje.

## Manejo de errores

## Estructura de un error

Los errores en JavaScript conllevan ciertas propiedades estándar y personalizadas que ayudan a comprender la causa y los efectos del error.

Por defecto, estos errores contienen tres propiedades:

- **Mensaje**: un string que contiene una referencia textual sobre el error.

- **Nombre**: el tipo de error que se ha producido.

- **Fragmento**: el fragmento del código ejecutado cuando se produjo el error.

Además, los errores también pueden llevar propiedades como **columnNumber, lineNumber, fileName,** etc., para describir mejor el error. Sin embargo, estas propiedades no son estándar y pueden o no estar presentes en todos los objetos de error.

## Fragmento de error

Cuando ocurre un error dentro de una aplicación, es muy común ver que se muestra la lista de llamadas a métodos en la que se encontraba el programa cuando se produjo el error por una advertencia o una excepción. Por ejemplo:

```js
TypeError: Numeric argument is expected
  at Timeout.setTimeout [as _onTimeout] (/tmp/rwzN9kHDvt.js:5:10)
  at ontimeout (timers.js:436:11)
  at tryOnTimeout (timers.js:300:5)
  at listOnTimeout (timers.js:263:5)
  at Timer.process.Timers (timers.js:223:10)
```

Inicia mostrando el nombre y el mensaje del error, seguido de una lista de los métodos a los que se ha llamado. Cada llamada a un método indica la ubicación de su código fuente y la línea en la que fue invocado. Podemos utilizar estos datos para navegar por el código e identificar dónde está la causa del error.

La información muestra dónde se lanzó primero la excepción y cómo se propagó a través de las llamadas a métodos. Implementar una captura para la excepción no permitirá que se propague por la pila y que se bloquee tu programa. Sin embargo, es posible que quieras dejar sin atrapar los errores fatales para que el programa se bloquee en algunos escenarios de manera intencionada.

### ¿Qué es una excepción?

Muchos programadores consideran que los errores y las excepciones son lo mismo. Sin embargo, es importante tener en cuenta una ligera, pero fundamental diferencia entre ellos.

<mark>Una **excepción** es un <u>objeto de error</u> que se ha lanzado.</mark>

Dentro de JavaScript podemos crear muchísimos tipos distintos de errores a partir de las clases originales del lenguaje. Por supuesto, cada una de estas luego puede ser personalizada según las necesidades del desarrollo. Veamos cuáles son los tipos que este lenguaje nos permite utilizar.

- **Error**: La clase genérica para todos los errores de JavaScript. Otros tipos de errores están basados en esta clase.

```js
throw new Error('Esto es un error general.');
```

- **RangeError**: Ocurre cuando un valor no está dentro del conjunto o rango de valores permitidos.

```js
let array = new Array(-1);
```

- **ReferenceError**: Se lanza cuando se intenta referenciar una variable que no existe.

```js
console.log(variableInexistente);
```

- **syntaxError**: Se produce durante la fase de análisis de código, cuando este no está bien escrito.

```js
eval('var a = {');
```

- **TypeError**: Ocurre cuando una operación no puede ser realizada, generalmente cuando un valor no es del tipo esperado.

```js
var obj;
console.log(obj.propiedad);
```

- **URIError**: Se lanza cuando se utilizan funciones globales relacionadas con URIs con parámetros incorrectos.

```js
// la URI esta mal formada
decodeURIComponent('%');
```

- **EvalError**: Está relacionado con el uso de la función eval(), pero en la práctica actual rara vez se utiliza y no se lanza en los ambientes de JavaScript modernos.

```js
// EvalError es histórico y no se lanza en ambientes modernos,
// pero su uso sería así:
throw new EvalError('Error de eval');
```

Para comprender mejor esto, veamos cómo declarar un error en JavaScript. Supongamos que queremos crear un error de tipado. Para eso escribiremos:

```js
const TypeError = TypeError('Wrong type found');
```

Comprender estos errores nos ayuda como desarrolladores a depurar el código de manera más eficiente y a escribir programas más robustos y seguros, ya que cada uno de estos errores indica situaciones específicas que pueden ocurrir durante la ejecución del código.

Hasta aquí la clase de hoy. Esperamos que puedas poner en práctica estos nuevos conceptos avanzados para seguir creciendo como desarrollador.

## Cierre

En proyectos de software de gran escala, a menudo se enfrentan desafíos inesperados que requieren un profundo conocimiento del lenguaje de programación utilizado, en este caso, JavaScript. Esto es vital para desarrollar soluciones prácticas, especialmente cuando se trata de código escrito por otros.

En esta clase hemos visto closures y prototipos, la aplicación de principios de programación funcional, y estrategias para el manejo de errores y técnicas de depuración. Los closures son funciones que permiten acceso a variables de un ámbito externo incluso después de que la función externa haya concluido, ilustrando la capacidad de JavaScript para manejar ámbitos léxicos de manera efectiva. Los prototipos juegan también un papel fundamental, ya que permiten la herencia de propiedades y métodos entre objetos, optimizando el uso de memoria y facilitando el mantenimiento del código.

La programación funcional se destaca por el uso de funciones puras y aisladas, promoviendo un código más limpio y eficiente a través de principios como evitar efectos secundarios y favorecer la declaratividad sobre la imperatividad.

Finalmente, se subraya la importancia de comprender y manejar adecuadamente los errores en JavaScript, diferenciando entre tipos de errores y aplicando prácticas para su gestión efectiva, lo cual es esencial para el desarrollo robusto de aplicaciones.

## Homework

Consignas. En el siguiente botón podrás acceder a la homework de esta clase.

[Homework](https://docs.google.com/document/d/1oqnZUUmv1c7R-NiqrWTu4AP2KWsbUDfFZXiXErfRfh8/edit)

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

  img[alt="Testing2"] {
  max-width:  600px;
  margin: 0 auto;
  display: block;
  }
</style>
