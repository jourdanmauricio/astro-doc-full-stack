---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 1. TypeScript
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase1/back.webp',
    alt: 'javascript-avanzado',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m3/clase1/icon.webp',
    alt: 'Logo Typescript',
  }
description: Typescript
draft: false
category: TypeScript JavaScript
---

## TypeScript

<mark>TypeScript es un lenguaje de programación de código abierto fuertemente tipado que actúa como una extensión de JavaScript. En otras palabras, es JavaScript con esteroides.</mark>

### ¿Fuertemente tipado?

Pero, ¿Qué significa que sea un lenguaje "fuertemente tipado"? Recordemos que dentro de las características básicas de JavaScript, se menciona que es un lenguaje de programación "débilmente tipado". Esto significa que las variables declaradas en JavaScript pueden cambiar de tipo de dato durante la ejecución de un programa.

Por ejemplo, podríamos definir una variable x que sea inicializada con un valor numérico, y en algún otro lugar del código decidir cambiarla a un string.

```typescript
let x = 10;

x = 'Ahora serás un string';

console.log(typeof x); // string
```

En TypeScript esto no sería posible ya que el tipo de dato es estático, lo que significa que está asociado a la variable en el momento de su creación y no permite que sea modificado nunca más, y el tratar de modificarlo conllevará a un error.

```typescript
let x = 10;

x = 'Ahora serás un string'; //Type 'string' is not assignable to type 'number'
```

## ¿Por qué utilizar Typescript?

En realidad, TypeScript nos da las mismas funcionalidades de JavaScript, pero con una capa extra de seguridad gracias a su sistema de tipado. Por esto se dice que son lenguajes “primos”. Esto quiere decir que podemos trabajar código tal como lo haríamos con JavaScript, pero con la ventaja de que podemos supervisar la consistencia en los tipos de datos utilizados para prevenir comportamientos inesperados en el código o bugs.

Consideremos el siguiente caso. Imagina que dentro de un archivo index.js típico existe una función que utiliza como argumento un string para imprimir algo en consola. Al trabajar con JavaScript estamos asumiendo que efectivamente ese argumento recibido será siempre un string.

```typescript
const usuario = 'Mauricio';

function sayHello(user) {
  console.log(`Hello ${user.toUppercase()}`);
}
sayHello(usuario);
```

En el mejor escenario esto va a funcionar sin problemas pero, ¿qué ocurre si en lugar de recibir un string la función recibe un número, un array o un objeto?:

```typescript
const usuario = 'Mauricio';

function sayHello(user) {
  console.log(`Hello ${user.toUppercase()}`);
}
sayHello(usuario);
sayHello(1); // TypeError: user.toUpperCase is not a function
sayHello(true); // TypeError: user.toUpperCase is not a function
sayHello(['no', 'funca']); // TypeError: user.toUpperCase is not a function
```

En efecto, obtenemos un error dado que el método toUpperCase solo está definido para strings. Este tipo de errores son más frecuentes de lo que creemos.

> 👀 Ejemplo real
> <mark>Cuando recibimos información de una API asumimos que la información vendrá de determinada manera, pero muchas veces viene con otro formato. Estos errores serían detectados únicamente al momento de ejecutar el código. TypeScript nos permite ahorrarnos estos errores.</mark>

Este lenguaje hace una verificación en tiempo de compilación, ayudándonos a detectar errores **mientras escribimos el código** y no al ejecutarlo.

Continuando con el ejemplo anterior, vamos a hacer una prueba de esto. Primero cambiaremos la extensión del archivo de index.js a index.**ts**. Luego vamos a agregarle a la variable user el tipado (user: string). Al hacer esto nos daremos cuenta que inmediatamente podemos ver los errores en la función sayHello() con los distintos argumentos.

```typescript
const usuario = 'Mauricio';

function sayHello(user: string) {
  console.log(`Hello ${user.toUppercase()}`);
}
sayHello(usuario);
sayHello(1); // argument of type 'number' is not assignable to parameter of type 'string'
sayHello(true); // argument of type 'boolean' is not assignable to parameter of type 'string'
sayHello(['no', 'funca']); // argument of type 'string[]' is not assignable to parameter of type 'string'
```

Además de brindarnos información sobre los errores de forma rápida, TypeScript incluye una herramienta nativa de autocompletado de funciones en el editor de texto, lo que lo vuelve más preciso dando opciones compatibles con el tipo de dato asociado.

Es necesario hacer la observación de que los entornos de ejecución como node o los navegadores web **no tienen ni idea de qué es TypeScript** ni su sintaxis para tipar estáticamente, pues solo trabajan con JavaScript. Si intentamos ejecutar el archivo index.ts con node recibiremos errores.

Para poder ejecutar este script es necesario que sea **previamente compilado (traducido) a JavaScript**. Para esto debemos realizar algunas configuraciones en nuestro programa.

## Configuración inicial de entorno

Para poder utilizar TypeScript es necesario instalarlo dentro de nuestro proyecto o de forma global en nuestra computadora. Esto lo podemos hacer con estos comandos...

Con este comando podrás instalar TypeScript de forma global en tu computadora y utilizarlo sin problemas en cualquier proyecto.

```bash
npm install -g typescript
```

Este comando creará automáticamente un proyecto local de node con todas las dependencias de este lenguaje ya instaladas.

```bash
npm install --save-dev typescript ts-node
```

> Te recomendamos que NO instales TypeScript globalmente, ya que puede traer problemas de compatibilidad de versiones más adelante.

Una vez hecho esto, podremos compilar el código TS a JS utilizando el **comando npx tsc index.ts**.

Al hacerlo, nos daremos cuenta que dentro de nuestro proyecto se crea un archivo de .js. ¡Es un archivo de JavaScript básico!

### Inicio de proyecto

```bash
mkdir typescript
cd typescript
git init
npm init -y
npm install --save-dev typescript ts-node
code .
```

Creamos un archivo llamado index.ts (extensión .ts)

```typescript
const num = 5;
const num2 = 10;

const sumar = (a, b) => a + b;

console.log(sumar(num, num2));
```

Ejecutamos el programa con:

```bash
node index.ts
```

Por el momento, todo se ejecuta OK porque no hay sintaxis typescript en el módulo, pero si incorporamos los typos obtendremos un error. Node no entiende typescript solo puede ejecutar javascript.

```typescript
const num: Number = 5;
const num2: Number = 10;

const sumar = (a, b) => a + b;

console.log(sumar(num, num2));
```

Para ejecutar módulos typescript tenemos que ejcutar:

```bash
tsc index.tsc
```

Este comando transpilará el código a javascript (al js más puro posible) creando un archivo llamado index.js. Ahora podemos ejecutar:

```bash
node index.ts
```

Para no ejecutar tsc index.tsc por cada módulo que tengamos, podemos:

```bash
tsc --init
```

Este comando nos va a generar un archivo llamado tsconfig.json donde podremos configurar el comportamiento de typescript. Ahora ya podemos ejecutar solo con el comando **tsc**.

Pero podemos agregar un script al package.json:

```json
...
scripts: {
  "build": "tsc"
}
```

Para que typescript deje el resultado en la carpeta **/dist** (dist es una convención) modificamos la propiedad outdir de la configuración:

```json
// tsconfig.json
{
  "compilerOptions": {
  ...,
  "outdir": "./dist",
  }
}
```

Por otro lado, si creamos más módulos .ts serán transpilados a sus correspondientes archivos .js en la carpeta /dist. Pero, si no queremos este comportamiento, podemos modificar la configuracion:

```json
// tsconfig.json
{
  "compilerOptions": {
  ...,
  "outdir": "./dist",
  },
  "files": ["index.ts"]
}
```

## ESLint

Antes de empezar con las bases de TypeScript vamos a aprender a cómo configurar un "analizador de código". Por analizador de código nos referimos a una herramienta que permite al lenguaje detectar e informar los errores conforme se escriben líneas de código. Si bien el análisis proporcionado nos permite trabajar en la mayoría de casos, hay ocasiones en las que las necesidades del proyecto requieren opciones más personalizables y de mayor alcance. Para ello, haremos uso de **ESLint**.

<mark>ESLint es una herramienta para análisis de código de JavaScript, puede ser implementada con TypeScript mediante la adición de algunos plugins con características específicas</mark>. Para incorporarlo a nuestro proyecto, es necesario instalar dependencias que serán utilizadas durante el proceso de desarrollo, a través del comando…

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier --save-dev
```

De esta forma podemos utilizar a ESLint para analizar y darle formato al código, aunque debemos hacer algunas configuraciones. En primera instancia, hay que **crear un archivo de configuración llamado .eslintrc.js** (nótese el punto del inicio) entro del cual configuraremos los plugins necesarios.

```typescript
// eslint.rc
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'puglin:@typescript-eslint/recommended'],
  rules: {
    // reglas
  },
};
```

Por último, solo tendrás que asignar en el package.json un nuevo script llamado lint con el valor de la imagen.

```json
...
scripts: {
  "build": "tsc",
  "start": "node ./dist/index.js",
  "lint": "eslint . --ext .ts"
}
```

## Análisis de código estático

Es una característica de typescript que nos indica a medida que tipeamos los errores que cometemos.

```typescript
const num = 5;
const num2 = 10;

const sumar = (a, b) => a + b;

console.log(sumar(num, num2));
```

Typescript tiene una opción por defecto llamada **noImplicitAny**. Esta opción le indica a typescript que nos alerte cuando no definamos un tipo de dato. En nuestra función suma los parámetros a y b.

En la definición de las constantes no somos alertados porque typescript posee inferenciade datos, al igualar las variables a un número, typescript infiere el tipo Number.

```json
// tsconfig.json
{
  "compilerOptions": {
  ...,
  "outdir": "./dist",
  "noImplicitAny": true,
  },
  "files": ["index.ts"]
}
```

```typescript
const num = 5;
const num2 = 10;

const sumar = (a: number, b: number) => a + b;

console.log(sumar(num, num2));
```

Ahora si modificamos el dato num a string obtendremos un alerta por consola ya que la función suma espera dos números y estamos enviando un string y un número.

```typescript
const num = 'Holas';
const num2 = 10;

const sumar = (a: number, b: number) => a + b;

console.log(sumar(num, num2));
```

Si bien escribimos un poco más de código, typescript nos ayuda a anticipar errores.

## Tipos de datos básicos

Comenzaremos con los tipos de datos primitivos en TypeScript. El tipado para las variables que contienen estos datos, no necesariamente deben definirse de forma manual, puesto que este lenguaje puede inferir el tipo de forma automática.

<mark>Una de las características</mark> más importantes de typescript es que podemos configurarlo para nos exija indicar los tipos de datos a varibles, funciones, etc.

Javascript posee un tipado dinámico, podemos asignar un valor de un tipo y luego modificar el valor por otro que posee un tipo distinto. Typescript nos alerta sobre esta situación. No puede ser un number y luego un string. Typescript espera que el tipo de dato se mantenga a lo largo de la ejecución del programa.

```typescript
let num1 = 10;
num1 = 'Holas'; // Error
```

> Recordemos que typescript infiere los tipos de datos. Si declamos una variable y le asignamos una cadena de caracteres, inferirá que es un string. Aunque también podemos indicar explícitamente el tipo de dato que tendrá la variable.

<mark>Otra característica de typescritp</mark> es que nos muestra el listado de métodos que posee la variable. Por ejemplo: para una variable nos mostrará el método **toUpperCase()**, pero no lo mostrará para una variable de tipo number.

```typescript
const nombre: string = 'Mauricio';
const apellido: string = 'Jourdán';
const edad: number = 35;
const alive: boolean = true;

console.log(nombre.toUperCase()); // MAURICIO
console.log(edad.toUperCase()); // Error -> toUperCase is not a function

const numPares: number[] = [2, 4, 6, 8, 10]; // -> Array de números
const palabras: string[] = ['hola', 'chau', false]; // Error: false no es de tipo string

const numbers: number[] = [];
numbers.push(10);
numbers.push(5);
numbers.push('Hola'); // Error

let unaVariable: any = 'Hola';
unaVariable = 5;
// En este caso no arroja error porque indicamos que la variable es de tipo any(cualquiera).
// Perdemos los beneficios de typescript. No debemos hacerlo. Es la última opción. No es buena práctica.

const suma = (arr: number[]): number => {
  // indica que recibe un array de números y retorna un numero
  const total: number = 0;
  for (const num of arr) total += num;
  return total;
};
```

Este es un buen ejemplo de cuándo utilizar la asignación de tipos. En la práctica se hace una combinación de la asignación e inferencia de datos para generar código más legible y al mismo tiempo seguro.

## Cierre

En esta clase aprendimos un nuevo lenguaje: **TypeScript**. Vimos cuáles son las ventajas de hacer código utilizando el tipado estático y cómo configurar nuestro entorno de desarrollo para que nuestros proyectos puedan ser más seguros.

Descubrimos que TypeScript provee una especie de "asistente de desarrollo" que está al tanto de nuestros posibles errores al momento de escribir código, compilando nuestros scripts con extensión .ts en archivos .js tradicionales.

Finalmente, conocimos de qué manera hacer uso de los tipos de datos primitivos, así como a determinar en qué situaciones es beneficioso realizar el tipado estático manualmente y cuándo dejar que este sea inferido.

### Mapa de conceptos

![Resumen de Conceptos](/astro-doc-full-stack/images/m3/clase1/conceptos.webp)

## Homework

<details>
<summary>Ver</summary>

**ACTIVIDAD 01**

_PUNTOS A TENER EN CUENTA_

¡Bienvenidos al Proyecto Integrador del módulo 3!

Notarás que este proyecto será mucho más robusto y desafiante que los anteriores, por lo cual será clave más que nunca contar con una correcta PLANIFICACIÓN.

Para iniciar, pasamos en limpio lo que queremos lograr: <mark>una aplicación para la gestión de turnos. El usuario deberá poder, interactuando con el FrontEnd, agendar su turno en una fecha y hora determinados para asistir a ser atendido a un determinado lugar.</mark>

Para encarar este proyecto partiremos de algunas pautas y simplificaciones:

- Tú decides de qué lugar se trata: un banco, una peluquería, un restaurant, un consultorio médico, etc. Tendrás libertad para esta elección y luego la temática deberá verse reflejada en el diseño de tu aplicación de Frontend.

- Un usuario siempre debe estar autenticado para poder reservar un turno. No se agendará turnos a anónimos o invitados.

- Los turnos deberán ser agendados siempre dentro del horario de atención del establecimiento, el cual también estará en tus manos decidir cuál es. También deberás tener en cuenta los fines de semana como días no laborables.

- Asumimos que el establecimiento cuenta con “infinitos” recursos para atender a sus clientes. Es decir, si 10, 20, 50 o 100 usuarios agendaron un turno para las 10:00hs del día 11/12/24, asumimos que el lugar cuenta con capacidad para poder atenderlos a todos al mismo tiempo en este horario.

- Los turnos reservados por los usuarios pueden ser cancelados hasta el día anterior al día de la reserva. No implementaremos la función de reprogramar.

Asimismo, definiremos una serie de **EXTRA-CREDITS**, los cuales podrás incluir en tu proyecto en las cantidades y tiempos que estén dentro de tus posibilidades:

- Envío de confirmación vía email al usuario luego de reservar un turno o cancelarlo.

- Posibilidad de que el usuario “suba” una foto perfil a su cuenta a través de un archivo de imagen (.jpg, .png, etc).

**ACTIVIDAD 02**

Ahora que tenemos estas pautas sobre la mesa, pasemos a la actividad del día: ¡a planificar!

1. Redactar las “user stories” de tu proyecto. En el video que acompaña a esta consigna te explicamos qué son estos puntos y algunas estrategias para desarrollarlos.

2. Define un primer esquema de tu base de datos. Probablemente luego encuentres que hay cosas que modificar o mejorar, pero al menos establece un punto de partida: entidades involucradas, relación entre las entidades, atributos que queremos describir y, muy importante, los tipos de datos de cada atributo.

**¡Bien hecho!**

_TIPS_

- Notarás que en el proceso de desarrollo de este proyecto te tocará tomar muchas decisiones y planificar varias cosas. Debes tener en cuenta que en el desarrollo escribir código no lo es todo. Por eso este paso de planificación resultará vital.

- Los **extra credits** son desafíos que requerirán de investigación adicional para poder completarlos, por eso te recomendamos que intentes alcanzar al menos uno de ellos. Esta práctica será muy valiosa de cara a los proyectos que encaramos luego de este módulo.

**[REQUISITOS]**:

> - Haber redactado las historias de usuario para la aplicación de gestión de turnos que vamos a desarrollar.
> - Haber planteado la estructura de entidades y atributos para la aplicación. La misma debe contar con al menos las siguientes entidades: Usuarios, Turnos y Credenciales (usuario y contraseña de cada usuario).

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
