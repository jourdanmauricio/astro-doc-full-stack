---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 13. Frontend Advanced

date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase13/back.jpg',
    alt: 'A picture of a coder',
  }
icon: { src: '/astro-doc-full-stack/images/m3/clase13/icon.webp', alt: 'Logo' }
description: Frontend Advanced

draft: false
category: Frontend Advanced
---

## Custom hooks

Hasta ahora, sabemos que los hooks son funciones que nos permiten desarrollar tareas específicas dentro del código. Sea que pertenezcan tanto a react como a otras librerías, nos sirven para manipular estados, realizar enrutamientos o gestionar efectos en los componentes.

<mark>Además de los hooks predefinidos (built in), podemos crear hooks personalizados. Estos custom hooks encapsulan la lógica de tareas específicas para facilitar su reutilización en diferentes partes del código.</mark>

Al igual que los hooks que conocemos, los custom hooks, por convención, se crean utilizando el prefijo “use” seguido de un nombre descriptivo que indique su funcionalidad.

Pero, ¿no basta con los ya conocidos? ¿En qué situaciones conviene crear un hook?

```jsx
function useMyCustomHook() {
  // Lógica
}

export default useMyCustomHook;
```

## Casos de uso

Los custom hooks tienen muchos tipos de implementaciones. Su objetivo simplemente es generar bloques de código reutilizables que nos permitan aumentar la eficiencia de la aplicación. Algunos ejemplos pueden ser...

- Realizar solicitudes HTTP.
- Verificar el status de una conexión de red.
- Autenticar usuarios.
- Gestionar formularios.
- Etc.

Para retulizar funciones podemos crear Hooks personalizados que guardaremos en la carpeta /src/hooks

Los custom hooks hacen uso de otros hooks de react, sino, no deberían ser hooks

```js
// /src/hooks/useToogle.js
import { useState } from 'react';

export const useToogle = (initialValue = false) => {
  const [value, setValue] = useState();

  const toogle = () => setValue(!value);

  return [value, toogle];
};
```

```jsx
import {useToogle} from './../hooks/useToogle';

function Mycomponent {
  const [isLogged, toogleHandler] = useToogle(false);

  return (
    <div>
      <button onclick={toogleHandler}>{isLogged ? 'Logout' : 'Login'}</button>
    </div>
  );
}
```

Ahora podemos crear un hook personalizado para las solicitudes fetch.

```js
// /src/hooks/useFetch.js
import { useState, useEffect } from 'react';

export const useFecth = (url) => {
  const [data, setData] = useState(null);
  const [error, SetError] = useState(null);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok)
          throw new Error(`Request fail with status code ${response.status}`);

        setData(data);
      } catch (err) {
        setError(err.message);
      }
      fetchData();
    };
  }, [url]);

  return {
    data,
    error,
  };
};
```

```jsx
// App.jsx
import useFetch from './hooks/useFetch';
import Navbar from './components/Navbar';
import "./styles/App.css";

const function App = () => {
  const {data, error} = useFecth('https://pladeholder.typicode.com/users');

  return (
    <div className="App">
      <Nabvar />
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {data.map((user) => {
            <li key={user.id}>{user.name}</li>
          })}
        </ul>
      )
      }
    </div>
  )
}
export default App;
```

Hemos visto cómo los custom hooks nos permiten encapsular lógica para facilitar su reutilización en distintos componentes.

Ahora, ya que estamos trabajando con la carga de componentes y recursos, aprovechemos para introducir dos nuevas características de react, que mejorarán significativamente el performance de nuestras aplicaciones: **Lazy Loading** y **Suspense**.

## Lazy loading & Suspense

## Características

**Lazy Loading** y **Suspense** son características introducidas en react para permitir la carga diferida (lazy loading) de componentes y la gestión de la espera (suspense) mientras se cargan los recursos asíncronos. El uso de ambos nos permite mejorar significativamente el rendimiento de la aplicación, así como la experiencia de usuario.

- **REACT.LAZY** -> Lazy Loading es una técnica que consiste en **cargar recursos solo cuando son necesarios**, en lugar de cargar todo al iniciar una aplicación. Esto ayuda considerablemente al rendimiento de nuestras aplicaciones. <mark>Carga el componente de forma diferida.</mark>

Se utiliza especialmente en proyectos grandes con muchos recursos, reduciendo el tiempo de carga de la página. En el contexto de react, **React.lazy** nos permite importar componentes de forma diferida. Esto significa que el componente se carga solo cuando se necesita, disminuyendo el tamaño del paquete inicial descargado por el navegador.

- **SUSPENSE** -> Suspense, por su parte, **maneja la carga asíncrona de recursos**.

Brinda indicadores visuales durante la obtención de datos para mejorar la experiencia del usuario. Además, proporciona retroalimentación visual sobre el progreso y reduce la sensación de espera.

Dentro de react, Suspense es un componente que envuelve a aquellos que se cargan de forma diferida y muestra un componente mientras se cargan los recursos asíncronos.

```jsx
// ...
<Suspense fallback={MyComponent}>// ...</Suspense>
```

Continuando con el ejemplo podemos crear un componente llamado LazyDataLoader.

```jsx
// src/components/LazyDataLoader.jsx
import useFetch from './hooks/useFetch';

const function LazyDataLoader = () => {
  const {data, error} = useFecth('https://pladeholder.typicode.com/users');

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {data.map((user) => {
            <li key={user.id}>{user.name}</li>
          })}
        </ul>
      )
      }
    </div>
  )
}
export default LazyDataLoader;
```

```jsx
// App.jsx
import React, {Suspense} from 'react'
import Navbar from './components/Navbar';
import "./styles/App.css";

const function App = () => {

  cpmst LazyDataLoader = React.lazzy(() => import("./components/LazyDataLoader"))

  return (
    <div className="App">
      <Nabvar />

      <Suspense fallback={<div>Loading...</div>}>
      <LazyDataLoader />
      </Suspense>
    </div>
  )
}
export default App;
```

Es probable que el componente de carga sea visible solo por una fracción muy pequeña de segundo, ya que esta solicitud se resuelve casi de manera inmediata. Cuando la información solicitada es, por ejemplo, imágenes de alta resolución, su duración en pantalla será más extensa.

Como último tema de esta clase, y para complementar las buenas prácticas de código, conozcamos qué son y para qué sirven los **servicios** en react.

## Implementación de servicios

La implementación de servicios se refiere al uso de módulos o clases para manejar la lógica relacionada a la comunicación con agentes externos, como APIs , bases de datos, servicios en la nube, etc. En otras palabras, todas las solicitudes realizadas desde nuestra app estarán centralizadas en archivos denominados servicios.

Definamos un servicio para nuestra aplicación.

En una nueva carpeta **services** dentro src, agregaremos un archivo llamado **apiService.js** en el que desarrollaremos la lógica de todas aquellas funciones que soliciten información a una API.

En esta ocasión, haremos uso de la librería **Axios**, en lugar de Fetch, para las solicitudes. No olvides instalarla utilizando el comando: npm install axios.

En nuestro ejemplo, no es un componente quien solicita la información sino el custom Hook **useFetch**. Para avanzar, haremos algunos cambios para que, en vez de realizar la solicitud, este hook invoque al servicio correspondiente y construya el estado de respuesta o error.

```bash
npm i axios
```

```js
// /src/services/spiService.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const apiService = axios.create({
  baseURL: API_URL,
});

export const getUsers = async () => {
  try {
    const response = await apiService.get('/users');
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getUser = async (id) => {
  try {
    const response = await apiService.get(`/users/${id}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const createUser = async (data) => {
  try {
    const response = await apiService.post('/users', data);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
```

```js
// /src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import { getUsers } from '../servicer/apiServices';

export const useFecth = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, SetError] = useState(null);

  useEffect(() => {
    const fecthData = async () => {
      try {
        if (endpoint === '/users') {
          const users = getUsers();
          setData(users);
        }
      } catch (err) {
        setError(err.message);
      }
      fetchData();
    };
  }, [endpoint]);

  return {
    data,
    error,
  };
};
```

```jsx
// src/components/LazyDataLoader.jsx
import useFetch from './hooks/useFetch';

const function LazyDataLoader = () => {
  const {data, error} = useFecth('users');

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {data.map((user) => {
            <li key={user.id}>{user.name}</li>
          })}
        </ul>
      )
      }
    </div>
  )
}
export default LazyDataLoader;
```

## Cierre

En esta clase hemos explorado conceptos avanzados que nos permiten mejorar la modularidad de nuestras aplicaciones. Gracias a los custom hooks, hemos aprendido a encapsular y reutilizar lógica compleja de manera sencilla, permitiéndonos separar preocupaciones.

Mediante el lazy loading y suspense, hemos descubierto cómo optimizar el rendimiento de nuestras aplicaciones al cargar componentes de forma diferida y mostrar indicadores de carga mientras llegan los recursos asíncronos.

Por último, mediante la implementación de servicios, hemos aprendido a abstraer la lógica de comunicación con servicios externos, promoviendo una mejor organización del código y facilitando su mantenimiento y modularización.

![Mapa de conceptos.](/astro-doc-full-stack/images/m3/clase13/mapa.png)

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
