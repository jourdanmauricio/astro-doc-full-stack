---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 7. React Intro & estilos
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase7/back.webp',
    alt: 'A picture of a coder',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m3/clase7/icon.png',
    alt: 'Logo express',
  }
description: React Intro & estilos
draft: false
category: React
---

## React

### ¿De dónde viene react?

**Documentacion**: Documentaciónhttps://react.dev/

Hasta el momento, hemos aprendido a crear vistas web para los usuarios utilizando HTML, JavaScript y CSS, lo cual fue el estándar durante muchos años.

Sin embargo, la industria del desarrollo web comenzaba a necesitar una mejor herramienta para poder generar contenido de forma más rápida y eficiente y así mantener el ritmo de la demanda y exigencias del mercado.

> En el año 2013, Meta desarrolló una **librería llamada React**, para crear páginas web de una manera más ágil. Tanto Facebook, como Instagram, como WhatsApp, y muchas otras aplicaciones, están desarrolladas en base a esta librería.

### ¿Qué es react?

- Librería desarrollada para la creación de interfaces de usuarios
- Componenetes -> pequeñas piezas independientes y reutilizables
- Los componentes dan forma a una aplicación web

<mark>React es una librería desarrollada específicamente para la creación de interfaces de usuario</mark> utilizando pequeñas piezas independientes y reutilizables conocidas como **componentes**, que en conjunto dan forma a una aplicación web en su totalidad.

En pocas palabras, un **componente** es un bloque visual que define la presentación de una parte específica de una aplicación web.

Fíjate en Youtube por ejemplo. El recuadro violeta es un componente. Mira como ese componente se repite una y otra vez a su lado. Lo que cambia es simplemente la información que lleva internamente.

### Principios y características de React

- React es una librería **declarativa**, no es imperativa
- Debemos indicar cómo queremos que luzca la interfaz
- No debemos precuparnos por los pasos para lograr el resultado
- No interactuamos directamente con el DOM
- Solo indicamos los cambios realizados en la aplicación y Reac utilizará el **DOM virtual**

- **Flujo unidireccional** -> la información fluye en una dirección, por lo general, desde un componente principal hacia los componentes secundarios
- **Basado en componentes**
  - un fragmento de código puede contener tanto la lógica como la interfaz de una sección específica de una aplicación
  - pueden ser reutilizados en diversas partes del código cumpliendo diferentes funciones

## React + vite

### Vite

- Entorno de desarrollo de código abierto
- Opera el proceso de carga de las aplicaciones
- Basadas en módulos
- Posee soporte para React y compatibilidad con TypeScript
- Permite desarrollar más rápido porque carga los módulos sobre la marcha
- Mejora el rendimiento y la experiencia de desarrollo

Para trabajar con **react** es necesario instalar la librería, y, aunque es posible realizar esto de forma manual con npm, la documentación nos alienta a utilizar alguna herramienta externa que nos permita construir una base optimizada de un proyecto con una pre-configuración.

Podemos trabajar con diferentes frameworks, como Gatsby o NextJS para hacer los cimientos de nuestro proyecto. Por el momento vamos a utilizar uno llamado **Vite**. En pocas palabras, esta herramienta nos facilitará el acceso y configuración de react.

#### ¿Por qué Vite?

Las páginas web se han vuelto cada vez más complejas debido a la cantidad de información que contienen y a la exigencia de las interfaces de usuario, lo cual conlleva a tener una mayor cantidad de módulos que deben ser unificados para poder trabajar en conjunto.

<mark>Este **proceso de unificación** llamado bundle-build consiste en consolidar y empaquetar varios archivos y recursos en un único paquete</mark>. Pero con el aumento en la complejidad de los proyectos fue perdiendo eficiencia en los tiempos de carga de las aplicaciones web.

<mark>Vite permite desarrollar más rápido, dado que carga módulos sobre la marcha. Básicamente, carga lo que necesitas cuando lo necesitas, lo cual mejora el rendimiento y la experiencia de desarrollo.</mark>

![bundle based dev server.](/astro-doc-full-stack/images/m3/clase7/bundle-based-dev-server.webp)

```bash
npm create vite@latest
> Project name: project-name
> Select a framework: React
> Select a variant: Javascript

cd project-name
npm install
npm run dev
# http://localhost:5173
```

Dentro del proyecto encontramos archivos <mark>.jsx -> JAVASCRIPT XML</mark>. Nos permite combinar etiquestas html con javascript. <mark>.tsx -> TYPESCRIPT XML</mark>

ReactDom -> Es el dom virtual

## Componentes

### Componente funcional

- Es una función de JavasScript que devuelve elementos que representan la **interfaz del usuario**. Son pequeños bloques de construcción que corresponden a las piezas fundamentales de nuestra aplicación

### Estructura de un componente

<mark>Un componente de react, también llamado componente funcional, **es una función de JavaScript** que devuelve elementos que representan la interfaz del usuario. Podemos entenderlos como pequeños bloques de construcción. </mark>

Los componentes son reutilizables, y cuando un coponente importa a otro decimos que es el padre. De la misma manera el componente importado será el hijo.

Los componentes React siempre retornan un solo elemento, una solo etiqueta. Si tenemos más elementos que retornar los podemos envolver en un div o un fragment.

- div -> utilizamos div cuando deseamos estilar la etiqueta. Es útil cuando tenemos que aplicar estilos al "contendor" que encierra al componente. Ej: flex.
- <> -> fragment cuando no deseamos que aparezca un nuevo div en el árbol y no debemos estilar la caja contenedora.

Existen los componentes funcionales y componentes de clase. Aunque los componentes de clase ya no se utilizan en nuevos proyectos.

Para crear un componente creamos un arcihivo que cuyo nombre comienza por mayúscula y posee extensión .jsx. Una buena práctica es llamar a la función de la misma manera que el archivo.

```jsx
// MyComponente.jsx

// function MyComponent() {
//   return <div>Soy un componente funcional</div>;
// }

const MyComponent = () => {
  return <div>Soy un componente funcional</div>;
};

export default MyComponent;
```

```jsx
// App.jsx
import './App.css'
import MyComponent from './MyComponent'

const function App = () => {
  return (
    <MyComponent></MyComponent>
  )
}
export default App;
```

### Renderizado

Pero entonces, ¿Cómo se muestran los componentes de una página web en la pantalla?

<mark>React se encarga de construir el DOM virtual utilizando los elementos que retorna cada componente y genera una versión del DOM real agregando los elementos definidos en nuestra app. </mark>

Por ejemplo, si das click derecho y presionas **inspeccionar**, encontrarás todo los recursos básicos de HTML y estilos con los que la página web moldea su contenido.

**Renderizado condicional**

- Operador AND
- Operador Ternario

```jsx
// Register
const function Register = () => {
  return (
    <div>
      <h2>Registro</h2>

      <form>
        <label>Nombre: </label>
        <input type="text"/>
        <label>Email: </label>
        <input type="text"/>
        <label>Contraseña: </label>
        <input type="text"/>
      </form>
    </div>
  )
}
export default Register;
```

```jsx
// Login
const function Login = () => {
  return (
      <div>
        <h2>Login</h2>

        <form>
          <label>Email: </label>
          <input type="text"/>
          <label>Contraseña: </label>
          <input type="text"/>
        </form>
    </div>
  )
}
export default Login;
```

```jsx
// App.jsx
import './App.css'
import Login from './Login'
import Register from './Register'

const function App = () => {
  const isRegistered = false;

  // if (isRegistered) {
  //   return <Login />
  // }

  // return (
  //   <Register />
  // )

  return ( <>
    {isRegistered && <Login />}  // Operador AND
    {!isRegistered && <Register />}  // Operador AND

    {isRegistered ? <Login /> : <Register />}  // Operador Ternario
  </>
  )
}
export default App;
```

Hasta ahora, hemos aprendido a **renderizar componentes**, así como a **condicionar** la forma en la que estos se visualizan en el navegador, aunque todo se ve bastante simple. Veamos ahora cómo darle estilos a nuestra página web.

## Estilos

### Técnicas de estilo

#### CSS Legacy

- Se gestionan los estilos de forma global
- Un solo archivo de CSS
- Gran cantidad de líneas de código
- Los estilos colisionan o se sobreescriben

Al trabajar con react existen diversas formas de agregar estilos a los componentes que dan forma a nuestra página. Comenzaremos mencionando una de ellas: <mark>**CSS Legacy**</mark>.

Son los estilos globales de la aplicación. Podemos incluirlos en index.css y serán visibles por todos los componentes de la aplicación.

<mark>className</mark>: para asiginar una clase a un elemento se utiliza className en lugar del atributo class de HTML

#### estilos en línea

```jsx
<div style={{ backgroundColor: 'red', padding: '10px' }}></div>
```

#### CSS Modules

- Crea archivos de estilo independientes para cada componente
- Modifica la extensión del archivo componente.module.css e importa los estilos como un objeto de JS llamado style
- Cada regla de estilo corresponderá a una propiedad de este objeto u la pasamos al atributo className del elemento al que deseamos dar estilo

Veamos ahora qué es y cómo trabaja <mark>**CSS Modules**</mark>. Esta es otra técnica que nos permitirá darle diseño y estilos a nuestra página.

Para utilizar css modules debemos crear un archivo con la extensión .module.css. Ej: App.module.css. Luego debemos importarlo en el componente donde deseemos utilizarlo.

```css
/* App.module.css */
.title {
  color: red;
}
```

```jsx
/* App.jsx */
import styles from './App.module.css';  //

const function App = () => {

  return (
    <h1 className={styles.title}>React styles modules</h1>
  )
}
export default App;
```

Observamos que styles es un objeto y cada clase será una propiedad del objeto.

React utiliza un mecanismo para nombrar las clases con un nombre único, lo que nos permite nombrar clases en distintos archivos con el mismo nombre y podemos estar seguros que no tendremos conflicto entre los estilos.

Por último, veremos una opción más para agregar estilos que, a pesar de ser un poco más compleja, es un buen ejemplo de cómo utilizar librerías externas para la incorporación de estilos. Hablemos de <mark>**Styled Components**</mark>.

#### Styled Components

- Es una biblioteca para React
- Permite escribir estilos de componentes utilizando **JavaScript** y **CSS-in-JS**
- Encapsula los estilos junto con la lógica del componente y facilita el desarrollo de interfaces de usuario más **modulares y mantenibles**

Crearemos componentes estilizados. El objeto styled contiene todas las etiquetas posibles de estilar.

- Instalación

```bash
npm i styled-components
```

```js
// CustomButton.js
import styled from 'styled-components';

export const CustomButton = styled.button`
  color: black;
  font-size: 1.5rem;

  &:hover {
    backgroun-color: red;
  }
`;
```

```jsx
// App.jsx
import './App.css'
import {CustomButton} from './CustomButton'

const function App = () => {

  return (
    <CustomButton>Enviar</CustomButton>
  )
}
export default App;
```

Desventaja -> styled-components no posee autocompletado de las propiedades css.

Las tres técnicas son muy utilizadas, sobre todo las últimas dos.

¡Excelente trabajo! tal vez en este momento no podamos ver la diferencia y el poder real de los styled components, pero es una herramienta que nos ayudará a generar estilos dinámicos muy interesantes en el futuro. Por el momento esta base es lo que necesitamos para empezar a darle forma a una página.

## Cierre

En esta clase introductoria de react exploramos los fundamentos de esta biblioteca de JavaScript. Hemos comprendido la importancia de los componentes como bloques de construcción modulares, que permiten organizar y reutilizar nuestro código.

También hemos explorado los componentes funcionales, una forma concisa de definir nuestros elementos que harán parte de la interfaz del usuario.

Además, hemos experimentado con técnicas de estilos, desde enfoques tradicionales como CSS legacy hasta soluciones más modernas y modulares como los CSS Modules y Styled Components, todo esto contenido en el entorno de desarrollo Vite.

![Mapa de conceptos.](/astro-doc-full-stack/images/m3/clase7/mapa.webp)

## Homework

<details>
<summary>Ver</summary>

### ACTIVIDAD 01

Inicializar en la carpeta front del repositorio un nuevo proyecto de react con Vite siguiendo los mismos pasos vistos en clase.

### ACTIVIDAD 02

Instalar las dependencias y ejecutar el proyecto para probar su funcionamiento.

### ACTIVIDAD 03

“Limpiar” el módulo App.jsx, eliminando el código innecesario que viene escrito dentro del componente App y eliminar los imports innecesarios.

### ACTIVIDAD 04

Dentro de la carpeta src del nuevo proyecto, crear las carpetas views y components.

### ACTIVIDAD 05

Dentro de la carpeta views crea el componente Home. Puedes mostrar en este componente un tag &lt;h1&gt; con el título “HOME”. Luego haremos más modificaciones.

### ACTIVIDAD 06

Exportar el componente Home, importarlo en el componente App y renderizarlo allí. En este punto, si no tienes errores, deberías poder ver tu componente Home al iniciar la aplicación.

### ACTIVIDAD 07

Siguiendo la misma lógica, crearemos en la carpeta components un componente Navbar. Exporta este nuevo componente para incluirlo en el componente Home. Ten en cuenta que a su vez el componente Navbar puede requerir de otros componentes más pequeños. Siéntete libre de crear todos los componentes que creas conveniente.

### ACTIVIDAD 08

Finalmente, aplica estilos a los componentes que has creado. Puedes utilizar cualquiera de los enfoques vistos en la clase para aplicar estos estilos.

**[REQUISITOS]**:

- Haber creado correctamente un nuevo proyecto de react con Vite el lugar correspondiente del repositorio del proyecto integrador.
- Haber implementado el componente Home en la carpeta views.
- Haber implementado el componente Navbar en la carpeta components.
- Mostrar correctamente el componente Navbar en el componente Home, y este a su vez en el componente App.

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
