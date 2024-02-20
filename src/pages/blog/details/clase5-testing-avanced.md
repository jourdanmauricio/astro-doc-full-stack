---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 5 - Testing Avanced
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase5.jpeg',
    alt: 'Background clase 5 - Testing Avanced',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-testing-avanced.jpg',
    alt: 'Logo for Testing Avanced',
  }
description: Testing Avanced
draft: false
category: Testing Avanced
---

## Jest

### Repaso de Testing

El testing es un área de la programación que se enfoca en evaluar el comportamiento del código de forma aislada y controlada, a partir de metodologías como el TDD (Test Driven Development).

> **[Recordemos]**
> El **TDD** consiste en el desarrollo de código a partir de tests, y no al revés. Es decir, primero diseño el testing de la aplicación y luego desarrollo el código.

De momento conocemos a Jasmine como una introducción al testing. Pero existen muchas otras tecnologías que podemos implementar con otras particularidades. Una de ellas es...

### 3 niveles de testing:

1. **Test unitarios**: testeamos funcionalidades concretas, una función, una clase, métodos, modelos, cosas muy puntuales.

2. **Test de integración**: testean multiples clases, bases de datos, servicios de terceros, integran viarias fucionalidades.

3. **UI - E2E - Funcionales**: estos test no son automáticos, los suelen realizar personas, evaluaciones a nivel de aplicación.

### TDD - Test Driven Development

1. Escribimos el test
2. Test fails
3. Write code
4. Test Passes
5. Refactor

### ¿Qué es Jest?

**Jest** es un framework de testing diseñado para brindar un conjunto de tests (a los que llamaremos suites) para proyectos de JavaScript. Puede pensarse como un kit de herramientas y reglas que permiten testear nuestro código de una manera simple y eficiente. Además, cuenta con funciones integradas llamadas mocks que permiten imitar la conducta de nuestro código de manera controlada y de las que hablaremos al final de la clase.

- Framework de testing, facil de usar y configurar
- Brinda un conjunto de pruebas
- Brinda funciones que permiten testear el código de manera simple y eficiente
- Cuenta con funciones integradas llamadas mocks

### Características

**Configuración** → simplicidad y facilidad de uso. Para comenzar a escribir pruebas sin mucha configuración adicional

**Rapidez** → es veloz y puede ejecutar pruebas de forma paralela, lo que lo hace eficiente en entornos de desarrollo grandes

**Mocks** → facilita la creación y el uso de funciones mock, que permiten simular comportamientos específicos durante las pruebas

**Snapshots** → captura y almacena los resultados de las pruebas. Guarda una instancia de la salida del test y luego la verifica con futuros test para detectar cambios inesperados

https://jestjs.io/

## Integración de Jest

### Similitudes con Jasmine

La forma de generar tests con Jest es muy similar a como lo trabajamos con Jasmine, ya que vamos a generar test unitario. Es decir, utilizando el conjunto de métodos que nos ofrece Jest, verificaremos que se cumplan las condiciones específicas del código con la **aserción expect** y comparando los resultados con matchers como toBe, toEqual o toContain, por ejemplo.

> **💡Sweet reminder** Entendemos como pruebas unitarias aquellas que evalúan pequeñas porciones de código de forma individual.

Instalamos Jest como dependencia de desarrollo

```bash
npm install -D jest
```

Agregamos un script al packege.json para correr los test

```json
"scripts": {
	"test": "jest"
}
```

Ejecutamos los test

```bash
npm test
```

### WatchAll

Antes de continuar te sugerimos que hagas uso de una opción disponible dentro de Jest llamada **watchAll** que nos va a permitir dejar la ejecución del testing corriendo de forma constante y que esté atento a los cambios. De esta manera, no tendremos la necesidad de ejecutar el comando npm test cada vez que realicemos modificaciones en el archivo de tests.

_¿Acaso no te recuerda a nodemon?_ 🤓

Sí, trabaja de la misma manera, pero en este caso para testing. Esta opción debe ser integrada dentro del script de test del archivo **package.json**. Donde esta el script "test" deberemos igualarlo de la siguiente manera...

```javascript
"scripts": {
	"test": "jest --watchAll"
}
```

### ¡A testear!

Ha llegado el momento de crear nuestros primeros tests. La estructura es sencilla y similar a lo que trabajamos con Jasmine, así nos resultará bastante familiar. Crearemos una función donde vamos a comparar un resultado con los valores esperados descritos dentro de la aserción **expect** utilizando **matchers**.

Lo primero será iniciar nuestro test unitario con el método **it** el cual tomará dos argumentos:

1. Un string con una descripción del resultado o lo que esperamos de esa prueba en particular.
2. Una función de callback donde se indica el test a realizar.

Dentro del proyecto:

- Creamos una carpeta llamada tests
- Adentro de la carpeta creamos un archivo llamado prueba.test.js o prueba prueba.spec.js

```javascript
describe('Una prueba de test que pasa siempre', () => {
  it('Este test debe pasar siempre', () => {
    expect(true).toBe(true);
  });
});
```

- Ejecutamos los tests

Como vemos Jest busca en todo el proyecto módulos que posean la palabra .spec o .test para ejecutarlos.

- Mínima configuración
- El formato de salida por consola es más amigable que el de Jasmine

Para realizar el test de nuestros módulos debemos exportar y requerir desde nuestros tests

```javascript
// sumar.js
function sumar() {
	...
}
module.exports = { sumar }

// nuestro.test.js
const {sumar} = requiere('./sumar');
```

## Mock Functions

**Mock** significa "imitación". Es una manera de simular ciertos comportamientos en nuestro código durante los tests. Por ejemplo, imitar el comportamiento de una función, clase o módulo. Imagina que un mock es un actor doble que suple al protagonista de una película de acción. Al momento de rodar una escena muy peligrosa, como director, decidirás enviar al doble antes que al protagonista

**Los mocks son útiles cuando estamos probando código y queremos asegurarnos de que ciertas partes funcionen correctamente sin ejecutar todo código completo**

### ¿Cómo funcionan?

Para realizar los test de funciones necesitamos aislarlas, que no dependan de otros resultados o generar una copia de la función que recrea el comportamiento de la función original y podemos obtener más información sobre los resultados. La idea es testear una función sin ejecutar la original

```javascript
const { sumar } = require('./sumar');
const mockSumar = jest.fn(suamr);

describe('La función sumar: ', () => {
  it('Debe retornar null si se ejecuta con argumentos no numéricos', () => {
    expect(mockSumar(1, true)).toBe(null);
    expect(mockSumar('Hola', 5)).toBe(null);
    console.log(mockSumar.mock);
    /* {
			"calls": [ [1, true], ["Hola", 5] ],
			"context": [ undefined, undefined ],
			"instances": [ undefined, undefined ],			
			"results": [
				{"type": "return","value": null},
				{"type": "return","value": null}
			],
			"lastCall": ["Hola", 5]
		} */
  });
});
```

mocksumar → aparte de la implementación de la función original, es un objeto que posee muchas propiedades como mock. Guarda información sobre la ejecución del test. Nos sirve para, por ejemplo, verificar los argumentos con los que se ejecutó la función utilizando el matcher “toHaveBeenCalledWidth”. Dentro de la documentación se encuentran en la sección Custom Matchers. Son matchers específicos para estas funciones mock

### Ejemplo basado en TDD

Con lo que ya sabemos hasta ahora vamos a construir algunos ejemplos de basándonos en TDD. Para esto, supongamos que trabajamos en administración y necesitamos construir una función para calcular el total de una factura.

Para ello, debemos crear una función que llamaremos calcularTotal(ítems) cuya tarea será recibir una lista de elementos correspondientes a una factura de nuestra base de datos y calcular el valor total de esa factura.

Cuando queremos controlar el comportamiento de las funciones dependientes durante las pruebas unitarias hacemos uso de los mocks. Debemos considerar también no utilizar mocks innecesariamente.

Es importante asegurarse que los mocks reflejen el correcto funcionamiento de lo que se testea. Debemos usar mocks cuando realmente sea necesario, preferiblemente probando el código en su contexto real siempre que sea posible.

## Cierre

Hemos visto que Jest nos ofrece un marco sólido para escribir tests unitarios y de integración. La capacidad de crear mocks nos permite simular el comportamiento de funciones y objetos dependientes, mejorando así la cobertura de nuestras pruebas. Esto asegura que las pruebas se centren en el código específico que estamos evaluando, sin depender del comportamiento de otras partes del sistema.

La capacidad de simular funciones y objetos reduce la necesidad de ejecutar pruebas en un entorno de ejecución completo. Esto puede acelerar significativamente el tiempo de ejecución de las pruebas, lo que es esencial en proyectos grandes.

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

Para esta actividad vamos a trabajar con la estrategia de TDD. No vamos a aplicar esta actividad directamente sobre algunas de las ramas de nuestro proyecto. ¡No te preocupes! Lo haremos más adelante cuando tengamos algunas funcionalidades más robustas y proyectos más complejos.

Aprovecharemos esta actividad también para practicar los conocimientos que tenemos hasta el momento de Node.

**ACTIVIDAD 02**

- En la raíz del proyecto debes crear una nueva carpeta a la que llamaremos “challenge-testing”. Es **MUY IMPORTANTE** que esta carpeta se encuentre en la raíz (al mismo nivel de las carpetas back y front) para que se suba junto con el resto de tu proyecto a tu repositorio de Github.
- Una vez creada la carpeta y parados dentro de ella en la terminal, ejecutar el comando **npm init** para generar un nuevo *package.json* en esta carpeta
- Instalar la dependencia jest utilizando el comando adecuado de NPM.
- Configurar el comando test del package.json para que ejecute las pruebas con jest.
- Crear una carpeta tests y un archivo index.js.

**ACTIVIDAD 03**

En este punto ya tenemos el mini-proyecto de testing listo para empezar a trabajar. Lo que haremos aquí será:

1. Partir de un enunciado.
2. Implementar los tests en un módulo dentro de la carpeta tests. (Recuerda que estos módulos deben tener la extensión “\*.test.js”.).
3. Luego, con los tests ya listos, trabajaremos en la implementación de la funcionalidad..

**ACTIVIDAD 04**

**El enunciado es el siguiente:**

Desarrolla una clase en JavaScript llamada **CarritoCompra** que represente un carrito de compras. La clase debe tener los siguientes métodos:

1. **constructor()**: Inicializa el carrito como un array vacío.
2. **agregarProducto(producto)**: Recibe un objeto representando un producto y lo agrega al carrito.
3. **calcularTotal()**: Calcula el total de la compra sumando los precios de todos los productos en el carrito.
4. **aplicarDescuento(porcentaje)**: Aplica un descuento al total de la compra según el porcentaje especificado.

Escribir pruebas unitarias utilizando Jest para asegurarte de que la clase CarritoCompra funciona correctamente en diferentes escenarios.

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
