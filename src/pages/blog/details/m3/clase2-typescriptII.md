---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 2. TypeScript II
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase1/back.webp',
    alt: 'Background Code',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m3/clase1/icon.webp',
    alt: 'Logo Typescript',
  }
description: Typescript II
draft: false
category: TypeScript JavaScript
---

## Funciones y tipado

¿Recuerdas la clase anterior? Uno de los puntos que habíamos visto es la importancia de implementar **tipados estáticos** en nuestras variables. Esto nos permitía definir qué tipo de dato vamos a guardar en una variable. También exploramos el tipado en tipos de **datos primitivos** y de qué manera TypeScript nos proporciona una inferencia sobre estos.

Ahora vamos a explorar cómo darle un tipado a nuestras funciones, lo que permitirá conocer los posibles errores en el tiempo de compilación.

Cuando nos paramos con el puntero sobre una llamada a función VSCode nos muestra un mensaje con los parámetros y el valor de retorno junto a sus tipos de datos.

```typescript
const nombre: string = 'Mauricio';

// Recibe un string y retorna un string
const saludar = (nombre: string): string => {
  // return 10 // Error
  return `Hola ${nombre}`;
};

console.log(saludar(nombre));
console.log(saludar('Pedro'));
console.log(saludar(10)); // Error

const calcularTotal = (quantity: number, price: number) => {
  return quantity * price;
};

calcularTotal(10, 150);
calcularTotal(10, 'Hola'); // Error
```

## Interfaces y tipos personalizados

### ¿Qué es una interfaz?

Las interfaces **permiten definir la forma que debe tener los tipos de datos más complejos**.

En el caso de los objetos, por ejemplo, especifican qué propiedades deben contener, así como los tipos de datos asociados a sus valores.

No proporcionan una implementación real. Es decir, solo establece las reglas que deben seguir. Como una especie de "contrato", para que el objeto sea compatible con la interfaz.

```typescript
interface Usuario {
  nombre: string;
  edad: number;
}
```

### Ejemplo

Imagina que deseas construir algo con bloques y cada uno de estos es diferente a los demás. Algunos son cuadrados, otros rectangulares y otros circulares. También tienen propiedades como tamaño y color.

Una interfaz sería una especie de plantilla que define cómo deben ser los bloques de cada tipo. Por ejemplo, la interfaz “Cuadrado” podría tener una propiedad “lado” de tipo número, mientras la interfaz “Rectángulo” tendría propiedades “ancho” y “largo” ambas de tipo número

```typescript
interface Usuario {
  lado: number;
  alto: number;
  color: strong;
  tamaño: number;
}
```

> <mark>Las interfaces ayudan a garantizar la consistencia y facilitan la comunicación entre diferentes partes del programa.</mark>

```typescript
// Las interfaces no son clases
interface IAddress {
  street: string,
  city: string
}

// Por comvención llamamos a las interfaces con I mayúscula y la primer letra también en mayúscula
interface IUser {
  name: string,
  age: number,
  email: string,
  active: boolean,
  address: IAddress,
}

// Typescript nos marcará error hasta que completemos todas las propiedades
const usuario1: IUser = {
  name: "Mauricio Jourdan";
  age: 35;
  email: "jourdanmauricio@gmail.com";
  active: true,
  // otraProp: "Valor" // Error
  address: {
    street: "Calle Falsa 123",
    city: "La Plata"
  }
}
```

<mark>Las interfaces nos otorgan seguridad y coherencia</mark>

Ahora sabemos utilizar parámetros según el tipo de dato: strings, numbers o booleanos, e incluso cómo construir aquellos más complejos, como los objetos, a partir de las interfaces. Pero, ya que conocemos las interfaces, vamos a trabajar ahora con una nueva herramienta similar: tipos personalizados.

## Definición de tipos personalizados

Los tipos (**types**), similares a las interfaces, proporcionan reglas que nos permiten definir tipos de datos como objetos, arrays, funciones, etc.

```typescript
// un enum limita los valores que puede toma la propiedad
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// Podemos crear nuestros porpios tipos
// Por convención comienzan con U mayúcula, seguido de la primer letra en mayúscula
type TUser = {
  name: string,
  age: number,
  email: string,
  active: boolean,
  address: IAddress,
  role: UserRole   // "admin", "user", "guest"
}

// En cuanto tipeamos UserRole nos aparecen las 3 posibilidades,
// aseguramos que solo contendrá el valor admin, user o guest
// también evitamos typos al asignar valores
const user1 = {
  name: "Mauricio Jourdan";
  age: 35;
  email: "jourdanmauricio@gmail.com";
  active: true,
  address: {
    street: "Calle Falsa 123",
    city: "La Plata"
  },
  // role: "otro role"   // Error
  role: UserRole.ADMIN
}
```

### Interfaces | Casos de uso

Las interfaces y los types paracen iguales. En términos de sintaxis difiren por la palabra reservada y el operador '=', pero poseen diferencias.

<mark>Tanto las interfaces como los types permiten ser extendidos por otras interfaces o types. Esto quiere decir que pueden heredar información para usarla en sus propias estructuras. Sin embargo, lo más común es utilizar interfaces, debido a su legibilidad y mejor visualización de errores en compilación.</mark>

Veamos un ejemplo haciendo uso de la palabra clave **extends**. En este caso, la interfaz IEmpleado podrá utilizar las propiedades de ITrabajo para definir sus propios objetos.

```typescript
inteface ITrabajo {
  compania: string,
  posicion: string,
}

inteface IEmpleado {
  nombre: string,
  edad: number,
}

const empleado: IEmpleado = {
  compania: "Google",
  posicion: "Senior Engineer",
  nombre: "Pedro Perez",
  edad: 35
}
```

Otra característica particular es que cuando creamos dos interfaces con el mismo nombre en distintas partes del código, ambas se comportan como una sola con toda la información.

```typescript
interface IMascota {
  nombre: string;
}

interface IMascota {
  edad: number;
}

const miPerro: IMascota = {
  nombre: 'Bethoven',
  edad: 2,
};
```

Aquí vemos que, a pesar que la interfaz se reescribió dos veces y con el mismo nombre, se comporta al final como una única con la información de ambas.

### Tipos | Casos de uso

Hay dos características muy comunes a las que se les da uso en types: **union types** y **alias**.

- **UNION TYPES**: permiten describir valores que pueden ser uno de varios tipos posibles, ya sean primitivos o complejos.

Por ejemplo, podemos definir un tipo con las tallas de camisas para una tienda virtual, con las opciones "S", "M", "L" y “XL”, de manera que únicamente pueda tomar estos valores y valide, por ejemplo, si hay disponibles o no en stock. Para indicar que este será un nuevo tipo de dato debemos inicializarlo con el indicador type.

Al utilizar unión types se proporciona una forma clara y segura de manejar casos en los que una variable puede tener distintos valores.

```typescript
type tallaCamisa = 'S' | 'M' | 'L' | 'XL';
function validarTalla(talla: tallaCamisa): string {
  if (talla === 'XL' || talla === 'S') {
    return 'Agotado';
  }
  return 'Disponible';
}
console.log(validarTalla('L')); // Disponible
console.log(validarTalla('S')); // Agotado
```

- **ALIAS**: Los alias de tipos son una característica en TypeScript que permiten asignar un nombre personalizado a un tipo existente o complejo. Esto facilita la creación de tipos reutilizables.

En este caso, Coordenada es un alias para un array de dos números. Al utilizar este alias, estamos haciendo que el código sea más expresivo y fácil de entender.

```typescript
type Coordenada = [number, number];

function imprimirCoordenadas(coordenada: Coordenada) {
  console.log(`Latitud: ${coordenada[0]}, Longitud: ${coordenada[1]}`);
}

// Uso del alias de tipo
const ubicacion: Coordenada = [40.7182, -78.0062];
imprimirCoordenadas(ubicacion); // Latitud: 40.7182, Longitud: -78.0062
```

## Tipos vs Interfaces (en objetos)

Tanto las **interfaces** como los **tipos** son herramientas que nos permiten definir la estructura de los tipos de datos en el código. Pero, aunque su funcionamiento sea similar, <mark>¿Cuándo debemos utilizar uno u otro?</mark>

- No esta definido en piedra
- En muchos casos son intercambiables
- Siempre que tengamos que describir un objeto utilizaremos interface

```typescript
interface IUser {
  name: string;
  email: string;
  age: number;
}

// El tipo Date se escribe con mayúscula porque no es un tipo primitivo
// Al extender de usuario hereda las propiedades
interface IAdminUser extends User {
  // name: string;
  // email: string;
  // age: number;
  adminSince: Date;
}

// También se puede extender con types pero es más complejo, no es tan cómodo
interface IGuestUser extends User {
  // name: string;
  // email: string;
  // age: number;
  active: boolean;
}

const user1: IAdminUser = {
  name: 'Mauricio',
  email: 'jourdanmau@gmail.com',
  age: 35,
  adminSince: new Date(),
};
```

## Demo (integración)

Con todo lo que vimos en mente, vamos a trabajar en una demo que nos permita integrar todos estos conceptos. Vamos a crear interfaces, y cada una de ellas nos servirá como base para definir objetos con una estructura particular.

```typescript
interface ITrack {
  title: string;
}

interface ISong extends ITrack {
  // title: string,
  artist: string;
  duration: number;
}

interface IPodcast extends ITrack {
  // title: string,
  host: string;
  episodes: number;
}

interface IAudiobook extends ITrack {
  // title: string,
  author: string;
  duration: number;
}

// El operador | "o" nos permite definir que el contenido del array
// puede ser una canción, un podcast o un audiolibro
interface IPlayList {
  name: string;
  // playlist: (ISong | IPodcast | IAudioBook)[];
  playlist: ITrack[];
}

// Otro ejemplo de |
// const miArr = (number | string | boolean)[] = [1, 2, "Hola", 3, true];

const song1: ISong = {
  title: 'by the Way',
  artist: 'Red Hot Chili Pappers',
  duration: 100,
};

const podcast1: IPodcast = {
  title: 'by the Way',
  host: 'Una calavera',
  episodes: 100,
};

const audioBook1: IAudioBook = {
  title: 'El principito',
  artist: 'Antoine de Saint-Exupéry',
  duration: 100,
};

// Sin typescript tenemos grandes chances de cometer errores.
// Tenemos un objeto que contiene un array,
// que a su vez contiene 3 objetos diferentes
const myPlaylist: IPlaylist = {
  name: 'My Playlist',
  playlist: [song1, podcast1, audioBook1],
};
```

## Cierre

En esta clase conocimos conceptos más avanzados, como el **tipado de funciones** en, **interfaces** y el **tipado personalizado**. Comprendimos cómo tipificar funciones, tanto sus parámetros como el valor que retornan, a partir de tipos de datos primitivos y complejos. Si nuestras funciones no retornan valores, TypeScript podrá inferirlo sin necesidad de escribirlo manualmente.

Exploramos la creación y uso de **interfaces** y **tipos** para estructurar objetos. Vimos que, a pesar de que su comportamiento fuera similar, tenían casos de uso puntuales que los diferenciaba uno del otro, haciendo énfasis en la herencia, los unión types y los alias.

### Mapa de conceptos

![Resumen de Conceptos](/astro-doc-full-stack/images/m3/clase2/conceptos.webp)

## Homework

<details>
<summary>Ver</summary>

**ACTIVIDAD 01**

En esta actividad nos centraremos en configurar nuestro entorno de desarrollo con TypeScript. Para ello haremos lo siguiente:

1. Generar el archivo package.json con el comando correspondiente.

2. Instalar TypeScript . Recuerda que te sugerimos hacer esta instalación de forma global, y no únicamente dentro del proyecto.

3. Generar el archivo tsconfig.json con el comando correspondiente

4. Ajustar en tsconfig.json las configuraciones que hemos visto en la clase.

5. Configurar el comando build para que ejecute el compilador de TypeScript y el comando start para que ejecute dicho build.

6. Crear la carpeta src del proyecto y el módulo index.ts.

7. Realizar pruebas de variables, objetos, funciones y demás características de TypeScript vistas en clase dentro de este módulo index.ts.

_TIPS_

- Si bien esta actividad puede parecer sencilla, la configuración de TypeScript requiere de mucha atención y cuidado en cada una de las propiedades involucradas. Recrea paso a paso lo visto en las clases para que tu módulo index.ts se pueda “buildear” correctamente y luego ser ejecutado desde el build.

- Aprovechar el index.ts a modo de “sandbox”. Has todas las pruebas que quieras con las características de TypeScript para ir familiarizándote con ellas.

- No te preocupes por las importaciones y exportaciones de módulos. Si intentas trabajar con varios módulos probablemente te encuentres con algunos errores. No te apresures. En la próxima clase veremos cómo realizar este paso.

**[REQUISITOS]**:

- Haber creado correctamente el archivo package.json.
- Haber creado correctamente el archivo tsconfig.json.
- Haber creado correctamente la carpeta src y el módulo index.ts dentro de la carpeta.
- Haber configurado correctamente los comandos build y start para que funcionen de acuerdo a lo esperado en las consignas.

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
