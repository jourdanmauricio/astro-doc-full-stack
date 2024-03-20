---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 12. React Redux

date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase7/back.webp',
    alt: 'A picture of a coder',
  }
icon: { src: '/astro-doc-full-stack/images/m3/clase7/icon.png', alt: 'Logo' }
description: React Redux

draft: false
category: React Redux
---

## Estados | Globales vs Locales

Hasta ahora hemos trabajado con **estados locales en los componentes** y compartiendo información por medio de props. Esta forma de manejar información es útil cuando una aplicación es sencilla y la información almacenada es usada solo por algunos **componentes**. Sin embargo, pensemos en una aplicación como una red social del nivel de Instagram.

Allí, la información del usuario o sus contactos, es utilizada en una gran cantidad de componentes diferentes, los cuales en ocasiones no están siquiera relacionados.

Por esto es importante tener una herramienta que nos permita facilitar la gestión de la información a un nivel global. De esta forma podremos acceder a la información desde cualquier parte de la aplicación.

![Estado Global.](/astro-doc-full-stack/images/m3/clase12/estado-global.webp)

### ¿Qué es redux?

<mark>Redux es una librería independiente de react que fue diseñada para manejar de manera sencilla el **estado global** de una aplicación.</mark>

- El objetivo general de redux es proporcionar un almacén centralizado para el estado de la aplicación.

- Facilita el manejo y sincronización de los datos entre las distintas partes que lo consumen.

> Pensémoslo con un ejemplo. Supongamos que compartes con tu roomie una lista de tareas compartidas de la casa. Redux sería como un tablero central donde tú y tu roomie apuntan y revisan las tareas, asegurando que ambos estén al tanto de lo que sucede, evitando confusiones y mejorando la coordinación.

## Los 3 principios de redux

En Redux, todo gira en torno a tres principios fundamentales:

- **Fuente única de la verdad**: todo lo que necesitas saber sobre la aplicación se encuentra en un solo lugar, denominado store, que facilita la gestión y comprensión del estado general.

- **El estado es de solo lectura**: solo puedes cambiar el estado emitiendo las llamadas actions (acciones), lo que hace que las modificaciones sean predecibles y rastreables. Los estados son considerados inmutables: no pueden ser modificados directamente después de ser creados.

- **Los cambios son realizados mediante funciones puras**: las transformaciones del estado son manejadas por funciones predecibles y sin efectos secundarios, conocidas como reducers.

## Flujo de información

En el siguiente diagrama podemos ver una representación gráfica del flujo que sigue la información del estado global dentro de una aplicación controlada por Redux.

- Paso 1 -> Cuando pedimos un cambio en un componente, como hacer clic en un botón, la información se usa para crear una **ACTION**.

- Paso 2 -> Esta **ACTION** luego se envía al **STORE**, para ser pasada junto con el estado global actual al **REDUCER**.

- Paso 3 -> En esencia, este último decidirá si el cambio solicitado puede realizarse o no.

- Paso 4 -> Si es así, modifica el estado global con la información de la **ACTION** y devuelve el nuevo estado que refleja los cambios en el componente.

![Flujo Reduc.](/astro-doc-full-stack/images/m3/clase12/flujo-redux.webp)

## Redux Core

El **Redux Core** corresponde a los conceptos y funciones fundamentales que componen la librería de redux. Estos son...

### ACTIONS && ACTIONS CREATORS

Veremos a una action como un objeto que contiene información sobre el cambio solicitado por un componente de la aplicación.

Este objeto comprende, a lo sumo, dos propiedades básicas:

- **Action type**: indica el tipo de acción a efectuarse. Actúa como una clave que será utilizada por el reducer para determinar qué cambio realizar.

- **Action payload**: contiene la información necesaria enviada por el componente para modificar el estado. esta información es opcional dependiendo de la acción a realizar.

### REDUCER

El **reducer** es una función pura que toma dos argumentos: el **estado**, (por defecto, el estado inicial de la aplicación) y la **action**.

Esta función analiza el **tipo de acción** mediante un switch statement y ejecuta la función correspondiente. Dentro de cada caso, realiza modificaciones al estado global según sea necesario utilizando la información del **action payload**.

El objeto devuelto, que mantiene el estado y solo modifica la propiedad correspondiente, asegura la **inmutabilidad** del estado.

Si no corresponde a ningún caso, el estado se devuelve sin cambios como caso por defecto.

### STORE

La **store** en Redux es un objeto centralizado **que almacena el estado global de la aplicación**.

Se encarga de ejecutar el **reducer** para modificar el estado y notificar a los componentes sobre los cambios.

## Estructura de elementos de Redux

En el proyecto dentro de src creamos una carpeta llamada Redux. Esta carpeta contendrá 3 archivos: actions.js, reducer.js y store.js

```bash
src
| ---
| Redux
|   |-> actions.js
|   |-> reducer.js
|   |-> store.js
| ...
```

```js
// actions.js

export const depositMoney = (count) => {
  // action creator
  return {
    // action
    type: 'ADD_TODO',
    payload: count, // Opcional
  };
};
```

```js
// reducer.js
const initialState = {};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // Lógica

      return state;
    default:
      return state;
  }
};
```

```js
// store.js
import { createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore(reducer);

export default store;
```

## Redux Toolkit

<mark>Esta es una librería oficial de redux que fue creada para incorporar la lógica de redux core de una manera simple y eficiente</mark>. Cuenta con métodos y configuraciones que nos ayudan a simplificar el manejo de las estructuras básicas.

Actualmente la integración de **toolkit** es la aproximación recomendada por redux para trabajar en proyectos reales. Veamos cómo integrar redux con toolkit en una aplicación.

Te invitamos a generar un proyecto de react con vite nuevo. Para utilizar redux en conjunto con redux toolkit, es necesario instalarlos mediante el comando...

Allí figuran dos librerías.

- **@reduxjs/toolkit**, para instalar los paquetes correspondientes a redux toolkit.

- **react-redux**, para integrar react con redux.

```bash
npm i @reduxjs/toolkit react-redux
```

Al utilizar toolkit ya no es necesario el archivo action. Y nuestro store se configura de la siguiente manera:

```js
// store.js
import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './reducer';

const store = configureStore({
  reducer: todoSlice.reducer,
});

export default store;
```

### CreateSlice

Toolkit reestructura por completo la creación y manejo de los **reducers**. Deja de tratarlos como funciones dependientes del switch statement para modificar el estado, para tomarlos como funciones independientes.

Imagina que el reducer (o estado global) es un pan para hacer sandwiches. Estos reducers estarán creados a partir de una función llamada **createSlice**.

Un **slice** (rebanada) es una colección de fragmentos de lógica correspondiente al reducer.

Cada una de estas porciones se encargará de manejar una sola pieza del estado. Esto conllevará a que sean manipulados de forma independiente reduciendo así posibles errores.

**CreateSlice** requiere un objeto con tres propiedades:

- **Name**: un nombre en string para identificar el slice creado.
- **InitialState**: el estado inicial.
- **Objeto reducers**: con una o más funciones reducer que definirán cómo actualizar el estado.

Supongamos que vamos a crear una **ToDoList**. Necesitaremos crear un **slice** que debe contener un estado inicial con la información de los **ToDo**. Agregaremos, también, un nombre y todas las funciones reducer que necesiten actualizar la lista de todos.

Como resultado, el método **createSlice** nos generará los reducers y también las actions y action creators correspondientes a cada uno de ellos, sin necesidad de definirlas de forma manual. Podremos exportar el reducer del slice y cada una de las acciones de forma independiente.

Nuestro archivo reducer será:

```js
// reducer.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  todos: [];
}

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log(state);
      console.log(action);
    },
    removeTodo: (state, action) => {}
  }
})

export const {addTodo, removeTodo} = todoSlice.actions;
```

## React-Redux

## Configuración

Nuestra app de **ToDoList** solo agregará y eliminará tareas. Por el momento, esta aplicación muestra algunas tarjetas definidas manualmente dentro de un estado local en App:

La idea aquí es consumir la información desde el **store**, que es donde se encuentra el estado global. Lo primero que debemos hacer es envolver a App dentro del componente **Provider**.

Este provee a todos sus componentes hijos con la información y funcionalidades de la store que recibe como atributo.

### useSelector

El proceso de **suscripción** consiste en hacer que un componente se mantenga al tanto de los cambios realizados en el estado global. Esto le permitirá **actualizar la información** que utiliza del estado sin importar en qué parte de la aplicación haya sido modificada.

Para poder suscribir a un componente, utilizamos el hook **useSelector** de react-redux. Este selector recibe una función callback que “selecciona” a qué propiedad del estado global deseamos suscribirnos.

```jsx
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from '.App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Reac.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Reac.StrictMode>
);
```

Para consultar información del store debemos suscribirnos a través del hook useSelector:

```jsx
import {useSelector} from 'react-redux';

function MyCoponent {
  const todos = useSelector((state) => state.todos);
  ...
}

export default MyComponent
```

## useDispatch

Vamos a hablar de un nuevo método de redux: **dispatch**. Este hace referencia a una función encargada de **enviar las acciones a los reducers** en respuesta a eventos específicos.

Puede ser utilizada con el hook **useDispatch** de react-redux, el cual toma como argumento la acción que deseamos despachar al reducer.

- CreateTodo

Para nuestro ejemplo, vayamos al componente CreateTodo que se encargará de recibir la información proporcionada por el usuario dentro de un formulario.

Esta información será el payload de una acción encargada de agregar una tarea a nuestro estado global.

- AddTodo

Por otro lado, restará manejar la lógica en el reducer addTodo. Tomaremos la propiedad todos del estado global y modificaremos su valor agregando la tarea que recibimos por **payload**.

- Se asignará también un **valor de id** incremental de acuerdo a la cantidad de elementos dentro del array.

Como mencionamos antes, aunque el estado en Redux es inmutable, **Redux Toolkit** utiliza la librería interna para permitirnos escribir código que parece mutar directamente el estado.

Esto es solo una **simplificación** sintáctica para mayor legibilidad.

Para modificar información del store utilizamos el hook useDispatch:

```jsx
import {useDispatch} from 'react-redux';
import {addTodo} from '../../redux/reducer';

function MyCoponent {
  const dispatch = useDispatch();
  ...
  dispatch(addTodo(newTodo));
  ...
}

export default MyComponent
```

## Cierre

En resumen, durante esta clase hemos profundizado en redux y su vinculación con react, así como en el flujo de trabajo que implica. Exploramos cómo redux facilita la gestión de un estado global de react.

A través de los conceptos de actions, reducers, store y el flujo de la información, hemos aprendido a estructurar nuestra lógica de estado de manera modular. La conexión entre react y redux ofrece una solución robusta para el manejo de estados.

![Mapa de conceptos.](/astro-doc-full-stack/images/m3/clase12/mapa.png)

## Homework

<details>
<summary>Ver</summary>

#### ACTIVIDAD 01

Esta será la última actividad de este proyecto integrador. Al tratarse de una actividad extensa, contarás con los días restantes hasta el momento de la entrega para poder finalizarla.

- Implementar el store de redux y conectarlo con tu aplicación de react.

#### ACTIVIDAD 02

Sugerimos partir de un estado inicial que posea las propiedades “user” y “userAppointments”. Puedes crear otros estados si lo encuentras conveniente.

#### ACTIVIDAD 03

Adaptar la lógica del login para que, si el login es exitoso, la información de usuario se guarde adecuadamente en el store global.

#### ACTIVIDAD 04

- Adaptar la lógica del montaje de MisTurnos, de manera tal que:

  - Al montarse el componente, si no hay un usuario logueado (guardado en el store) redirija a Home. Otra posibilidad adicional es que, en caso de no haber un usuario logueado, el botón de “Mis Turnos” en Navbar esté inhabilitado o directamente no se muestre.

  - Al montarse el componente, si hay un usuario logueado, pida a la aplicación de backend únicamente los turnos que corresponden a dicho usuario mediante la action correspondiente que guarde estos datos en el estado global.

  - Utilizar un selector que pida al store los datos de los turnos y los renderice si hay alguno. En caso de no haber turnos, renderizar algún componente que indique que aún no hay turnos agendados para este usuario.

#### ACTIVIDAD 05

- Si aún no lo has hecho, implementar la lógica de cancelación de turnos. Para ello ten en cuenta que:

  - Debes realizar la petición correspondiente a la aplicación de backend.

  - Al cambiar el estado del turnos deberás actualizar los datos de turnos en tu aplicación de frontend, de manera tal que el turno figure cancelado en la UI.

#### ACTIVIDAD 06

- Implementar el formulario de creación de turno.

  - Si no existe un usuario logueado, no debería poder acceder a la vista. Puedes utilizar la misma lógica que para la sección “Mis Turnos”.

  - Implementar y validar el formulario. El mismo debe realizar la solicitud correspondiente para la creación del turno, RECUERDA ENVIAR EN EL BODY EL ID DEL USUARIO QUE TIENES EN EL STORE.

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
