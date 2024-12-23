---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Redux
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/redux/back.png',
    alt: 'Redux',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/redux/icon.png',
    alt: 'Logo Redux',
  }
description: Redux
draft: false
category: Redux
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
  }

  th, td {
    border: 1px solid #ddd; /* Borde de las celdas */
    padding: 8px; /* Relleno de las celdas */
    text-align: left; /* Alineación del texto */
  }

  th {
    background-color: #f2f2f2; /* Color de fondo del encabezado */
    font-weight: bold; /* Peso de la fuente del encabezado */
  }

  tr:nth-child(even) {
    background-color: #f9f9f9; /* Color de fondo de las filas pares */
  }  
</style>

## Conceptos

<details>
DOC: https://es.redux.js.org/

<mark>Resux</mark> es una librería que nos ayuda a manejar el estado de nuestra aplicación.

**Necesitamos 3 cosas**:

- Dónde almancenar la información
- Cómo acceder a ella
- Cómo actualizarla

**Redux está basado en 3 principios**:

- Hay solo una única fuente de verdad (store) => La diferencia entre State y Store es que State es un objeto de tipo 'clave: valor' (aunque puede ser de otros tipos). El Store contiene al State y a otras cosas.
- El estado es de solo lectura (solo se actualiza con actions). No debemos modificarlo directamente.
- Los cabmios deben realizarse a través de funciones puras (reducers).

**Funciones puras**:

- Valor retornado cambia si la entrada cambia.
- Misma entrada, misma salida.
- Sin efectos colaterales
- Entrada: x -> Función Pura: f -> Salida: F(x)

**Reducers**:

- Calcular el nuevo estado basado en los parámetros (state, action).
- No modificar el estado directamente.
- No tener lógica asíncrona.

</details>

## Ciclo de vida de Redux

<details>

1. La UI se renderiza a partir del estado
2. El usuario ejecuta un evento que dispara una acción
3. La acción se envía al reducer
4. El reducer sabe cómo actualizar el store
5. El store contiene al state
6. volvemos al paso 1

<img style='width:600px; heigth: 600px; margin: 0 auto; display: block ' src="/astro-doc-full-stack/images/redux/ciclo-de-vida.webp" alt="Redux">

- El estado describe la condición actual de la aplicación, este estado “vive” dentro del store.
- La vista o UI se renderiza basada en este estado y cuando un evento (como un click) pasa el estado se actualiza basado en lo que pasó. No se actualiza directamente, es “disparado” hacía el reducer que es el encargado de saber como se actualizará el estado. Luego de que el cambio pasa y el estado se actualiza la UI se re-renderiza basada en el estado.
- Redux es una libreria “agnostica”, es decir, puede ser usada con cualquier capa en la UI o framework.

</details>

## Diferencias entre Redux y Context

<details>

Cuando un sistema es opaco y no determinista, es dífícil reproducir errores o agregar nuevas características. 

En react, generalmente pasamos datos desde componentes padres a hijos a través de props. Pero cuando tenemos componentes anidados, esto se vuelve complicado. Podemos tener muchos niveles de anidamiento y pasar props a través de todos los componentes puede ser tedioso y dificil de mantener.

A este problema se le llama **'prop drilling'**. Para solucionar esto, podemos usar Context API o algún sistema de gestión del estado.

### Context API

- ¿Qué hace? -> Evita hacer 'prop drilling' y podemos pasar las props de componentes padres a hijos de f orma sencilla.
- ¿Cuándo usarlo? -> Cuando usemos datos que no cambien mucho en nuestra aplicación.
- Se puede usar desde la versión 16.3 de React

### Redux vs Context API

- Depuración -> Redux tiene un depurador que nos permite viajar en el tiempo. Context API es un poco más difícil.
- Bundle size -> Context API ya viene integrado en React, así que es más ligero.
- Middlewares -> Redux es muy sencillo con esto.
- Curva aprendizaje -> Context API es mucho más fácil de entender. Redux es un nuevo paradigma.
- Rendering -> Redux previene renders innecesarios.

|Caracteristica|Redux|Context API|
|---|---|---|
|Depuración|Tiene un depurador que nos permite viajar en el tiempo.|Todo está conectado al mismo provider y no tiene una descripción clara y estandar acerca de los datos que cambian, esto hace que sea más díficil de depurar.|
|Bundle size|Necesitas librerias adicionales.|Viene integrado con React.|
|Middlewares|Permite extender fácilmente la funcionalidad de los disparadores lo cual nos permite que podamos crear middlewares que reciban la data antes de modificar el estado.|No es tan sencillo el manejo de esta caracteristica.|
|Curva de aprendizaje|Requiere de mas tiempo de estudio ya que está basado en un nuevo paradigma.|Posee una curva de aprendizaje sencilla.
|Rendering|Evita el renderizado innecesario|Hace que se renderizen los componentes asi no hayan cambiando.|

</details>

## Proyecto Ejemplo Redux

<details>

Para ejemplificar el uso de Redux vamos a desarrollar una pequeña App que nos permita buscar pokemones.

**Utilizaremos la API**: 
- https://pokeapi.co/ (DOC)
- https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0

Existen varias formas de implementar Redux, 

- Método Connect 
- Hooks
- Toolkit (Recomendado por Redux)

### Comenzaremos con el método Connect.

En la carpeta /src crearemos 2 carpetas:

- actions: contendrá los **tipos de acciones** y **los action creators**. Los cambios que se pueden hacer en el estado.
  - index.js: Contiene los action creators. Un **action creator** es una función que retorna un action, retorna objeto con una propiedad type que describe la acción que se va a realizar.
  - types.js: exportamos los **tipos como constantes** para no utilizarlos como strings y evitar errores de tipeo.
- reducers: a teavés del estado inicial y las acciones, se actualiza el estado.
  - index.js: Contiene el reducer. Un **reducer** es una función que recibe el estado actual y una acción y retorna un nuevo estado.

<mark>Concexión de un componente a Redux</mark>:

En el App.js realizaremos la conexión de la App con Redux. Para ello utilizaremos la función **connect** de react-redux.

Para ello utilizamos 2 variables.

- **mapStateToProps**: es una función recibe nuestro estado y retorna un objeto cuyas propiedades van a ser enviadas a las props del componente que se está conectado a redux.
- **mapDispatchToProps**: es una función que recibe el dispatcher de redux y retorna un objeto que será mapedo a las propiedades con los action creatrors.
- **connect**: Es una función que conecta un componente de React a un store de Redux.

Finalmente, dentro de index.js crearemos el store y lo pasaremos a la aplicación a través del componente **Provider**.

- **Legacy_createStore**: Es una función que crea un store de Redux.
- **Provider**: Es un componente de React que provee el store a todos los componentes de la aplicación.

```bash
npm create vite@latest pokedux -- --template react
# npm create vite@latest pokedux -- --template react-ts
cd pokedux
npm install

npm install antd --save
npm install @ant-design/icons --save
npm install axios
npm install redux react-redux
```

```jsx
// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { pokemonsreducer } from './reducers/pokemons';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';

import './index.css';
import App from './App.jsx';

const store = createStore(pokemonsreducer);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

```jsx
// App.jsx

import 'antd/dist/reset.css';
import './App.css';

import { Col } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import logo from '../src/assets/logo.svg';
import InputSearch from './components/InputSearch';
import PokemonList from './components/PokemonList';
import { getPokemon } from './api';
import { setPokemons as setPokemonsActions } from './actions';

function App({ pokemons, setPokemons }) {
  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonRes = await getPokemon();
      console.log('pokemonRes', pokemonRes);
      setPokemons(pokemonRes);
    };
    fetchPokemons();
  }, []);

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <InputSearch />
      </Col>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

// mapStateToProps
// es una función recibe nuestro estado y retorna un objeto cuyas propiedades van a ser enviadas 
// a las props del componente que se está conectado a redux.
// mapDispatchToProps
// es una función que recibe el dispatcher de redux y retorna un objeto 
// que será mapedo a las propiedades con los action creatrors

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});

const mapDispatchToProps = (dispatch) => ({
  setPokemons: (value) => dispatch(setPokemonsActions(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

```js
// /src/api/index.js
import axios from 'axios';

export const getPokemon = async () => {
  try {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=152');
    return data.results;
  } catch (error) {
    console.log('error', error);
  }
  // return axios
  //   .get('https://pokeapi.co/api/v2/pokemon?limit=152')
  //   .then((response) => response.data.results)
  //   .catch((error) => console.log('error', error));
};
```

```jsx
// /src/components/InputSearch.jsx
import { Input } from 'antd';

const InputSearch = () => {
  return <Input.Search placeholder='Search Pokemon' />;
};
export default InputSearch;
```

```jsx
// /src/components/PokemonList.jsx
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ pokemons }) => {
  return (
    <div className='PokemonList'>
      {pokemons?.map((pokemon) => {
        return <PokemonCard name={pokemon.name} key={pokemon.name} />;
      })}
    </div>
  );
};
export default PokemonList;
```

```jsx
// /src/components/PokemonCard.jsx
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { StarOutlined } from '@ant-design/icons';

const PokemonCard = ({ name }) => {
  return (
    <Card
      title={name}
      cover={
        <img
          alt='Ditto'
          src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png'
        />
      }
      extra={<StarOutlined />}
    >
      <Meta description='fire, magic' />
    </Card>
  );
};
export default PokemonCard;
```

```js
// /src/actions/index.js
import { SET_POKEMONS } from './types';

export const setPokemons = (payload) => ({
  type: SET_POKEMONS,
  payload,
});
```

```js
// /src/actions/types.js
export const SET_POKEMONS = 'SET_POKEMONS';
```

```js
// /src/reducers/pokemons.js
import { SET_POKEMONS } from '../actions/types';

const initialState = {
  pokemons: [],
};

export const pokemonsreducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    default:
      return state;
  }
};
```

```css
/* /src/App.css */
#root {
    max-width: 1280px;
    margin: 0 auto;
    text-align: center;
}

.App {
    margin-top: 3rem;
}

.App img {
    margin-bottom: 3rem;
}
```

```css
/* /src/components/PokemonList.css */
.PokemonList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* grid-template-columns: repeat(4, 1fr); */
    gap: 2rem;
    margin-top: 3rem;
    padding: 0 3rem 3rem;
}
```

</details>

## Hooks vs. Connect

<details>

Redux nos proporciona una api con hooks listos para ser usados.

### useSelector vs Connect

- Bilerplate: useSelector es más limpio. No necesitamos definir mapStateToProps ni mapDispatchToProps para envolver nuestros componentes.
- Separación de responsabilidades: Connect tiene un punto a favor. El método connect crea un higth order component que es quien renderiza nuestro componente y le pasa el estado y las actions a través de props.
- Testing: de acuerdo a la separación de responsabilidades, es un poco más facil testear con connect, ya que al recibir el estado y dispatcher por props para testearlo solo enviamos props naturalmente. En cambio con los hooks necesitamos mockear el store y el dispatch o necesitamos conectar el compnente a Redux antes de poder testaerlo.

> <mark>**Nota**: Redux recomienda utilizar su hooks API.</mark>

Utilizar hooks API nos brinda mejor experiencia de desarrollo, es más sencillo de entender el ciclo de la información, es más compatible con TypeScritp.

Lectura: https://code.tutsplus.com/es/getting-started-with-redux-connecting-redux-with-react--cms-30352t

### Hooks API

De la API utilizaremos dos hooks:

- **useSelector**: Nos permite seleccionar (extraer) una parte del estado de Redux a través de una función selectora. Esta función **debe ser una función pura**. No debe depender de otras variables fuera de la función. Es equivalente a mapStateToProps. La diferencia es que useSelector guarda el valor en una variable y no se pasa por props.

El selector suscribe el componente al estado por lo que será llamado cada vez que se realice dispatch de una acción. Si el selector retorna el mismo valor que la última vez, el componente no se renderiza. Si el selector retorna un valor diferente, el componente se renderiza.

```jsx  
const pokemons = useSelector((state) => state.pokemons);
```
- **useDispatch**: Nos permite despachar acciones. Retorna una referencia a la función dispatch de Redux. Es equivalente a mapDispatchToProps. Lo utilizamos para disparar acciones.

```jsx
const dispatch = useDispatch();
dispatch(myAction());
```

En el ejemplo, vamos a reemplazar connect por hooks. Primero que nada ya no necesitaremos el método connect en el componente App, no utilizaremos props.

```jsx
// App.jsx

import 'antd/dist/reset.css';
import './App.css';

import { Col } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPokemon } from './api';
import { setPokemons } from './actions';
import logo from '../src/assets/logo.svg';
import InputSearch from './components/InputSearch';
import PokemonList from './components/PokemonList';

function App() {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonRes = await getPokemon();
      console.log('pokemonRes', pokemonRes);
      dispatch(setPokemons(pokemonRes));
    };
    fetchPokemons();
  }, []);

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <InputSearch />
      </Col>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default App;
```

</details>

## Redux DevTools

<details>

Es una herramienta que nos ayuda a evaluar y depurar el estado de nuestra aplicación. Nos permite ver el estado de nuestra aplicación en cada momento, ver las acciones que se han disparado y ver el estado de la aplicación en cada momento.

Es una extensión que instalamos en nuestro navegador. Nos permite ver el estado, que acciones se están disparando, el payload de las acciones, y poder viajar en el tiempo parta evitar que se ejecuten determinadas acciones analizando cómo se comporta la aplicación.

Repositorio de devTools: https://github.com/reduxjs/redux-devtools

La extensión se encuentra disponible para Chrome, Firefox y Edge. Siguiendo el link podremos instalar la extensión de acuerdo al navegador que estemos utilizando.

Para utilizar devTools debemos agregar una línea de código en la creación del store.

```jsx
// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { pokemonsreducer } from './reducers/pokemons';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';

import './index.css';
import App from './App.jsx';

const store = createStore(
  pokemonsreducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

Al ejecutar la aplicación, en el navegador podremos ver la extensión de Redux DevTools. Podremos ver el estado de la aplicación, las acciones que se están disparando y el payload de las acciones. realizando click sobre la extensión accdemos a la herramienta.

<img style='width:600px; heigth: 600px; margin: 0 auto; display: block ' src="/astro-doc-full-stack/images/redux/redux-devtools.png" alt="Redux">

Otra forma de acceder a la devTools es a través de la consola del navegador. En el inspector tendremos una nueva pestaña llamada Redux. 

</details>

## Middlewares

<details>

Un middleware es una pieza de código que entre que algo recibe un request y ese algo dá respuesta al request. Está técnica es muy utilizada en backend. 

En Redux, <mark>un middleware es una función que **se ejecuta entre el dispatch** de una acción **y la ejecución del reducer**</mark>.

De esta manera, podemos interceptar las acciones antes de que lleguen al reducer y realizar acciones como:

- Loggear las acciones
- Hacer peticiones HTTP
- Realizar acciones asíncronas
- Realizar acciones condicionales

### Repaso de terminología

- **Store creator (createStore)**: Es una función que crea un store de Redux.

- **enhancer (potenciador)**: Es una función de orden superior que envuelve el store de Redux para extender su funcionalidad. Toma un store creator y devuelve una versión potenciada del store creator. La línea que utilizamos para la devTools es un enhancer. Es un potenciador del estado, ya que extiende la funcionalidad del store. Algo similar ocurre con los middlewares.

- **compose**: Es una función que nos permite combinar funciones de derecha a izquierda. Lo utilizamos para tener múltiples potenciadores del store (enhancer).

Doc: https://es.redux.js.org/docs/api/compose.html
DOC: https://es.redux.js.org/docs/glosario.html


### Creando un middleware personalizado

Para crear un middleware personalizado, debemos crear una función que reciba el store y retorne una función que reciba el siguiente middleware y retorne una función que reciba la acción y retorne el resultado de la acción.

En el ejmplo vamos a crear un middleware que logee las acciones y otro que agregue un pokemon a la lista de pokemons.

El middleware es una Currying functions, recibe el store, y retorna una función que recibe el siguiente middleware, y retorna una función que recibe la acción que se va a disparar.

Next es una función que llamaremos cuando el middleware haya terminado su trabajo, y manda el action al reducer.

DOC Currying functions: https://es.javascript.info/currying-partials

Creamos una carpeta llamada middlewares y dentro de ella un archivo llamado index.js.

```js
// /src/middlewares/index.js
export const logger = (store) => (next) => (action) => {
  console.log('dispatching', action);
  const result = next(action);
  //console.log('next state', store.getState());
  return result;
};

export const featuring = (store) => (next) => (actionInfo) => {
  const featured = [{ name: 'eddie' }, ...actionInfo.action.payload];
  const updatedActionInfo = { ...actionInfo, action: { ...actionInfo.action, payload: featured } };
  next(updatedActionInfo);
};
```
```js
// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { pokemonsreducer } from './reducers/pokemons';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { featuring, logger } from './middlewares';

import './index.css';
import App from './App.jsx';

const composedEnhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger, featuring) // agrega los params que requiere el middleware
);

const store = createStore(pokemonsreducer, composedEnhancers);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

```

</details>

## Peticiones asíncronas

<details>

En el ejemplo anterior, utilizamos una petición asíncrona para obtener los pokemons pero a todos les colocamos la imágen de Ditto. Vamos a ver cómo podemos obtener la imágen de cada pokemon.

Para ello, vamos a crear una nueva petición de la imágen de cada pokemon. La url a la que debemos hacer la petición es la siguiente: https://pokeapi.co/api/v2/pokemon/{id}, que retorna mucho de detalle como habilidades, tipos, formas, etc. Puntaulmente nos interesan los srpites. 

```jsx
import 'antd/dist/reset.css';
import './App.css';

import { Col } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPokemon, getPokemonDetails } from './api';
import { setPokemons } from './actions';
import logo from '../src/assets/logo.svg';
import InputSearch from './components/InputSearch';
import PokemonList from './components/PokemonList';

function App() {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonRes = await getPokemon();
      // console.log('pokemonRes', pokemonRes);
      const pokemonsDetailed = await Promise.all(
        pokemonRes.map((pokemon) => getPokemonDetails(pokemon))
      );
      dispatch(setPokemons(pokemonsDetailed));
    };
    fetchPokemons();
  }, []);

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <InputSearch />
      </Col>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default App;

```

```js
// /src/api/index.js
import axios from 'axios';

export const getPokemon = async () => {
  try {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=152');
    return data.results;
  } catch (error) {
    console.log('error', error);
  }
  // return axios
  //   .get('https://pokeapi.co/api/v2/pokemon?limit=152')
  //   .then((response) => response.data.results)
  //   .catch((error) => console.log('error', error));
};

export const getPokemonDetails = async (pokemon) => {
  try {
    const { data } = await axios.get(pokemon.url);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
```

```jsx
// /src/components/PokemonList.jsx
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ pokemons }) => {
  return (
    <div className='PokemonList'>
      {pokemons?.map((pokemon) => {
        return (
          <PokemonCard
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            key={pokemon.name}
          />
        );
      })}
    </div>
  );
};
export default PokemonList;
```

```jsx
// /src/components/PokemonCard.jsx
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { StarOutlined } from '@ant-design/icons';

const PokemonCard = ({ name, image }) => {
  return (
    <Card title={name} cover={<img alt={name} src={image} />} extra={<StarOutlined />}>
      <Meta description='fire, magic' />
    </Card>
  );
};
export default PokemonCard;
```

</details>

## Redux Thunk

<details>

En el ejemplo anterior, utilizamos una petición asíncrona para obtener los pokemons y luego recorremos los pokemons para obtener la imágen de cada uno. Aquí no estamos separando correctamente las responsabilidades, es decir podemos mover esa lógica para no dejar esa responsabilidad al componente.

Podemos pasar la lógica a un action creator especial que no retorne solo el objeto plano de la accion, sin que retorne otra función que sea la que obtenga los datos de la API.

Con lo que vimos relacionado al store solo podemos trabajar con acciones sincrónicas, es decir, acciones que retornan un objeto plano. Para trabajar con acciones asíncronas, necesitamos una librería llamada **Redux Thunk**.

```bash
npm install redux-thunk
```

```jsx
// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';

import { pokemonsreducer } from './reducers/pokemons';
import { logger } from './middlewares';
import App from './App.jsx';
import './index.css';

const conposeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = conposeAlt(
  applyMiddleware(thunk, logger) // agrega los params que requiere el middleware
);

const store = createStore(pokemonsreducer, composedEnhancers);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

```jsx  
// App.jsx
import 'antd/dist/reset.css';
import './App.css';

import { Col } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPokemon } from './api';
import { getPokemonsWithDetails } from './actions';
import logo from '../src/assets/logo.svg';
import InputSearch from './components/InputSearch';
import PokemonList from './components/PokemonList';

function App() {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonRes));
    };
    fetchPokemons();
  }, []);

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <InputSearch />
      </Col>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default App;
```

```js
// /src/actions/index.js
import { getPokemonDetails } from '../api';
import { SET_POKEMONS } from './types';

export const setPokemons = (payload) => ({
  type: SET_POKEMONS,
  payload,
});

export const getPokemonsWithDetails =
  (pokemons = []) =>
  async (dispatch) => {
    const pokemonsDetailed = await Promise.all(
      pokemons.map((pokemon) => getPokemonDetails(pokemon))
    );

    dispatch(setPokemons(pokemonsDetailed));
  };
```

```js
// /src/api/index.js
import axios from 'axios';

export const getPokemon = async () => {
  try {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=152');
    return data.results;
  } catch (error) {
    console.log('error', error);
  }
  // return axios
  //   .get('https://pokeapi.co/api/v2/pokemon?limit=152')
  //   .then((response) => response.data.results)
  //   .catch((error) => console.log('error', error));
};

export const getPokemonDetails = async (pokemon) => {
  try {
    const { data } = await axios.get(pokemon.url);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
```

Thunk nos ayudo para agregar lógica asíncrona a nuestras acciones. Thunk es una función que nos permite retornar otra función.

Thumk no es la única librería externa que nos permite trabajar con acciones asíncronas. La librería redux-saga es otra opción muy utilizada.

</details>

## Middlewares alternativos: Redux Saga

<details>

No implementaremos Redux Saga, pero es una librería que nos permite trabajar con acciones asíncronas. 

Haremos una comparación entre Thunk y Saga.

|Redux-thunk|Redux-saga|
|---|---|
|Less borleiplate code|More boilerplate code|
|Easy to understand as compared to redux-saga|Difficult to understand as there are multiple concepts to learn like generator functions and redux-saga effects|
|My be diffcult to scale up|Easy to scale up compared to reduc-thunk|
|Actions creators may hold too much async logic|Actions creators stay pure|
|May get difficult to test|Comparatively easy to test as all your async logic remains together|

DOC: https://www.paradigmadigital.com/dev/sagas-vs-thunk/

</details>

## Agreguemos un loader

<details>

```jsx
// App.jsx
import 'antd/dist/reset.css';
import './App.css';

import { Col, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPokemon } from './api';
import { getPokemonsWithDetails, setLoading } from './actions';
import logo from '../src/assets/logo.svg';
import InputSearch from './components/InputSearch';
import PokemonList from './components/PokemonList';

function App() {
  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchPokemons = async () => {
      const pokemonRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonRes));
      dispatch(setLoading(false));
    };
    fetchPokemons();
  }, []);

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <InputSearch />
      </Col>
      {loading ? <Spin spinning size='large' /> : <PokemonList pokemons={pokemons} />}
    </div>
  );
}

export default App;
```

```js
// /src/actions/types.js
export const SET_POKEMONS = 'SET_POKEMONS';
export const SET_LOADING = 'SET_LOADING';
```

```js
// /src/actions/index.js
import { getPokemonDetails } from '../api';
import { SET_LOADING, SET_POKEMONS } from './types';

export const setPokemons = (payload) => ({
  type: SET_POKEMONS,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const getPokemonsWithDetails =
  (pokemons = []) =>
  async (dispatch) => {
    const pokemonsDetailed = await Promise.all(
      pokemons.map((pokemon) => getPokemonDetails(pokemon))
    );

    dispatch(setPokemons(pokemonsDetailed));
  };
```

```js
// /src/reducers/pokemons.js
import { SET_POKEMONS, SET_LOADING } from '../actions/types';

const initialState = {
  pokemons: [],
  loading: false,
};

export const pokemonsreducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
```

</details>

## Agreguemos favoritos

<details>

```jsx
// App.jsx
import 'antd/dist/reset.css';
import './App.css';

import { Col, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPokemon } from './api';
import { getPokemonsWithDetails, setLoading } from './actions';
import logo from '../src/assets/logo.svg';
import InputSearch from './components/InputSearch';
import PokemonList from './components/PokemonList';

function App() {
  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchPokemons = async () => {
      const pokemonRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonRes));
      dispatch(setLoading(false));
    };
    fetchPokemons();
  }, []);

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <InputSearch />
      </Col>
      {loading ? <Spin spinning size='large' /> : <PokemonList pokemons={pokemons} />}
    </div>
  );
}

export default App;
```

```jsx
// /src/components/PokemonList.jsx
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ pokemons }) => {
  return (
    <div className='PokemonList'>
      {pokemons?.map((pokemon) => {
        return (
          <PokemonCard
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            types={pokemon.types}
            id={pokemon.id}
            favorite={pokemon.favorite}
            key={pokemon.name}
          />
        );
      })}
    </div>
  );
};
export default PokemonList;
```

```jsx
// /src/components/PokemonCard.jsx
import { useDispatch } from 'react-redux';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';

import StarButton from './StarButton';
import { setFavorite } from '../actions';

const PokemonCard = ({ name, image, types, id, favorite }) => {
  const dispatch = useDispatch();
  const typesString = types.map((type) => type.type.name).join(', ');

  const handleOnCLick = () => {
    dispatch(setFavorite({ pokemonId: id }));
  };

  return (
    <Card
      title={name}
      cover={<img alt={name} src={image} />}
      extra={<StarButton isFavorite={favorite} onClick={handleOnCLick} />}
    >
      <Meta description={typesString} />
    </Card>
  );
};
export default PokemonCard;
```

```jsx
// /src/components/StarButton.jsx
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const StarButton = ({ isFavorite, onClick }) => {
  const Icon = isFavorite ? <StarFilled /> : <StarOutlined />;
  return <Button onClick={onClick} icon={Icon} />;
};
export default StarButton;
```

```js
// /src/actions/index.js
import { getPokemonDetails } from '../api';
import { SET_FAVORITE, SET_LOADING, SET_POKEMONS } from './types';

export const setPokemons = (payload) => ({
  type: SET_POKEMONS,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setFavorite = (payload) => ({
  type: SET_FAVORITE,
  payload,
});

export const getPokemonsWithDetails =
  (pokemons = []) =>
  async (dispatch) => {
    const pokemonsDetailed = await Promise.all(
      pokemons.map((pokemon) => getPokemonDetails(pokemon))
    );

    dispatch(setPokemons(pokemonsDetailed));
  };
```
```js
// /src/actions/types.js
export const SET_POKEMONS = 'SET_POKEMONS';
export const SET_LOADING = 'SET_LOADING';
export const SET_FAVORITE = 'SET_FAVORITE';
```

```js
// /src/reducers/pokemons.js
import { SET_POKEMONS, SET_LOADING, SET_FAVORITE } from '../actions/types';

const initialState = {
  pokemons: [],
  loading: false,
};

export const pokemonsreducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case SET_FAVORITE: {
      const newPokemonList = [...state.pokemons];
      const currentPokemonIndex = newPokemonList.findIndex(
        (pokemon) => pokemon.id === action.payload.pokemonId
      );

      if (currentPokemonIndex < 0) {
        return state;
      } else {
        newPokemonList[currentPokemonIndex].favorite =
          !newPokemonList[currentPokemonIndex].favorite;
        return { ...state, pokemons: newPokemonList };
      }
    }

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
```

</details>

## ¿Qué es inmutabilidad?

<details>

Inmutabilidad: algo que no puede ser cambiado luego de ser creado. 

Redux no indicará a la UI que debe renderizar nuevamente, **si su estado inicial y el estado retornado son exactamente iguales**.

### ¿Cómo trabajar la inmutabilidad con JavasScript?

Existen varias maneras de trabajar la inmutabilidad en JavaScript. Mencionaremos solo dos:

- Object.assign
- Spread operator

```jsx
const updateAge = (userInfo) => {
  // Mutable
  // userInfo.age = userInfo.age + 1;
  // return userInfo;

  // Al mutar el objeto userInfo, redux no será capaz de identificar el cambio entre el objeto inincial y el retornado,
  // no será capaz de detectar el cambio y no renderizará nuevamente la UI.

  // Inmutable Object.assign
  // return Object.assign({}, userInfo, {
  //   age: userInfo.age + 1,
  // });

  // Inmutable Spread operator
  return {
    ...userInfo,
    age: userInfo.age + 1,
  };
}

const userInfo = {
  name: 'Miguel',
  age: 23,
  email: 'miguel@platzi.com'
}

console.log('userInfo BEFORE: ', userInfo);

const updatedInfo = updateAge(userInfo);

console.log('userInfo AFTER: ', userInfo);
console.log('updatedInfo: ', updateAge(updatedInfo));
```

Pero la inmutabilidad también tiene desventajas:

- Generación constante de objetos -> Problema de performance si no conocemos el garbage collector, o no eliminamos los objetos de memoria.
- Propenso a errores humanos
- Menos trazabilidad

Para evitar estos problemas, podemos utilizar immutable Js.

</details>

## Agregando Inmutabilidad a nuestra Pokedux

<details>

```bash
npm install immutable
```

Immutable es una librería que nos permite trabajar con objetos inmutables. Utiliza estructuras de datos especiales como Set, Map, List

Recomiendo ampliamente el uso de la librería **"immer"** en ves de el uso de "immutable", puesto que es mucho más facil de utilizar y no necesitas de más complejidad que el código basico para el uso de redux, es decir, no necesitas metodos get o set u setIn, Es muy facil de utilizar ya que solo necesitamos usar su método produce para que realice la inmutabilidad por su cuenta. Documentación / guía paso a paso del uso de immer: https://immerjs.github.io/immer/

Para la siguiente clase y el uso de combineReducers, se necesita instalar "redux-immer". Ésta es su guía de implementación: https://github.com/salvoravida/redux-immer

</details>

## Cuándo usar reducers combinados

<details>

En nuestro estado tenemos dos propiedades que se encargan de dos cosas diferentes: pokemons y loading. En este caso, podríamos utilizar combineReducers (helper de Redux) para separar la lógica de los reducers.

No es obligatorio utilizar combineReducers, pero es una buena práctica cuando tenemos un estado con muchas propiedades y cada propiedad tiene su propio reducer.

```jsx
// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import { logger } from './middlewares';
import App from './App.jsx';
import './index.css';

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeAlt(
  applyMiddleware(thunk, logger) // agrega los params que requiere el middleware
);

const store = createStore(rootReducer, composedEnhancers);

console.log('store', store.getState());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

```jsx
// App.jsx
import 'antd/dist/reset.css';
import './App.css';

import { Col, Spin } from 'antd';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getPokemon } from './api';
import { getPokemonsWithDetails, setLoading } from './actions';
import logo from '../src/assets/logo.svg';
import InputSearch from './components/InputSearch';
import PokemonList from './components/PokemonList';

function App() {
  const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchPokemons = async () => {
      const pokemonRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonRes));
      dispatch(setLoading(false));
    };
    fetchPokemons();
  }, []);

  console.log('pokemons', pokemons);
  console.log('ui', loading);

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <InputSearch />
      </Col>
      {loading ? <Spin spinning size='large' /> : <PokemonList pokemons={pokemons} />}
    </div>
  );
}

export default App;
```
```js
// /src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import { pokemonsReducer } from './pokemons';
import { uiReducer } from './ui';

const rootReducer = combineReducers({
  data: pokemonsReducer,
  ui: uiReducer,
});

export default rootReducer;
```

```js
// /src/reducers/pokemons.js
import { SET_FAVORITE, SET_POKEMONS } from '../actions/types';

const initialState = {
  pokemons: [],
};

export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case SET_FAVORITE: {
      const newPokemonList = [...state.pokemons];
      const currentPokemonIndex = newPokemonList.findIndex(
        (pokemon) => pokemon.id === action.payload.pokemonId
      );

      if (currentPokemonIndex < 0) {
        return state;
      } else {
        newPokemonList[currentPokemonIndex].favorite =
          !newPokemonList[currentPokemonIndex].favorite;
        return { ...state, pokemons: newPokemonList };
      }
    }

    default:
      return state;
  }
};

```
```js
// /src/reducers/ui.js
import { SET_LOADING } from '../actions/types';

const initialState = {
  loading: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

```

Finalmente, debemos considerar el uso de **shallowEqual** en el useSelector para evitar renderizados innecesarios. shallowEqual es una función que compara dos objetos y retorna true si son iguales y false si son diferentes. 

Cuando utilizamos useSelector, por defecto, compara las referencias de los objetos (recordemos que utilizamos inmutabilidad, **siempre será una referencia distinta**). Si utilizamos shallowEqual, compara los valores de los objetos. 

En el useSelector de loading, no es necesario utilizar shallowEqual, ya que es un valor primitivo.

</details>

## Redux Toolkit: creando nuestro primer Slice

<details>

Hasta el momento para manejar el estado tenemos que utilizar los actions types, actions creators y reducers. Redux Toolkit nos permite simplificar la creación de estos elementos.

Redux Toolkit es una librería que nos permite trabajar con Redux de una manera más sencilla. Nos permite trabajar con slices, que son pequeñas porciones de nuestro estado. Llegó para resolver los siguientes problemas:

- Demmasiado boilerplate para obtener el resultado
- Dependencia de librerías como redux-thunk o redux-saga
- La curva de aprendizaje hast para la configuración de Redux es elevada

Por ejemplo, para la inmutabilidad utiliza immer, pero lo utiliza internamente, nos abstraemos de la utilización de librerías. 

Y, por otro lado, a través de los Slices, es mucho más fácil trabajar con Redux.

```bash
npm install @reduxjs/toolkit
```

```js
// /src/slices/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemons: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      // conveción de nombre
      // nombre del slice / nombre del action creator
      // 'data/setPokemons';
      state.data = action.payload;
      // parece que mutamos el estado,
      // pero Toolkit utiliza immer para hacerlo de forma inmutable
    },
    setFavorite: (state, action) => {
      const currentPokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.payload.pokemonId
      );

      if (currentPokemonIndex >= 0) {
        const isFavorite = state.pokemons[currentPokemonIndex].favorite;
        state.pokemons[currentPokemonIndex].favorite = !isFavorite;
      }
    },
  },
});

export const { setPokemons, setFavorite } = dataSlice.actions;
export default dataSlice.reducer;
```

```js
// /src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import dataReducer from '../slices/dataSlice';

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;
```

</details>

## Redux Toolkit: createAsyncThunk

<details>

DOC: https://redux-toolkit.js.org/introduction/getting-started

Veremos como podemos utilizar createAsyncThunk para manejar acciones asíncronas.

```js
// /src/slices/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemon, getPokemonDetails } from '../api';
import { setLoading } from './uiSlice';

const initialState = {
  pokemons: [],
};

export const fetchPokemonmsWithDetails = createAsyncThunk(
  // action
  'data/fetchPokemonmsWithDetails',
  // callback
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const pokemonsRes = await getPokemon();
    const pokemonsDetailed = await Promise.all(
      pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
    );
    console.log('pokemonsDetailed', pokemonsDetailed);
    dispatch(setPokemons(pokemonsDetailed));
    dispatch(setLoading(false));
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      // conveción de nombre
      // nombre del slice / nombre del action creator
      // 'data/setPokemons';
      state.pokemons = action.payload;
      // parece que mutamos el estado,
      // pero Toolkit utiliza immer para hacerlo de forma inmutable
    },
    setFavorite: (state, action) => {
      const currentPokemonIndex = state.pokemons.findIndex(
        (pokemon) => pokemon.id === action.payload.pokemonId
      );

      if (currentPokemonIndex >= 0) {
        const isFavorite = state.pokemons[currentPokemonIndex].favorite;
        state.pokemons[currentPokemonIndex].favorite = !isFavorite;
      }
    },
  },
});

export const { setPokemons, setFavorite } = dataSlice.actions;
export default dataSlice.reducer;
```

```js 
// /src/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;
```

```js
// /src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import dataReducer from '../slices/dataSlice';
import uiReducer from '../slices/uiSlice';

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
});

export default rootReducer;
```

```jsx
// /src/App.jsx
import 'antd/dist/reset.css';
import './App.css';

import { Col, Spin } from 'antd';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import logo from '../src/assets/logo.svg';
import InputSearch from './components/InputSearch';
import PokemonList from './components/PokemonList';
import { fetchPokemonmsWithDetails } from './slices/dataSlice';

function App() {
  const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonmsWithDetails());
  }, []);

  console.log('pokemons', pokemons);
  console.log('ui', loading);

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <InputSearch />
      </Col>
      {loading ? <Spin spinning size='large' /> : <PokemonList pokemons={pokemons} />}
    </div>
  );
}

export default App;
```

```jsx
// /src/components/PokemonCard.jsx
import { useDispatch } from 'react-redux';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';

import StarButton from './StarButton';
import { setFavorite } from '../slices/dataSlice';

const PokemonCard = ({ name, image, types, id, favorite }) => {
  const dispatch = useDispatch();
  const typesString = types.map((type) => type.type.name).join(', ');

  const handleOnCLick = () => {
    dispatch(setFavorite({ pokemonId: id }));
  };

  return (
    <Card
      title={name}
      cover={<img alt={name} src={image} />}
      extra={<StarButton isFavorite={favorite} onClick={handleOnCLick} />}
    >
      <Meta description={typesString} />
    </Card>
  );
};
export default PokemonCard;
```
</details>