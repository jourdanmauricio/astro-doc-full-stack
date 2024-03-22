---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 11. React Routing

date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase7/back.webp',
    alt: 'A picture of a coder',
  }
icon: { src: '/astro-doc-full-stack/images/m3/clase7/icon.png', alt: 'Logo' }
description: React Routing

draft: false
category: React
---

## Routing

- Gestion de las diferentes vistas de una página web
- Permite al usuario moverse entre las distintas páginas de un sitio sin la necesidad de recargar la página por completo
- Los elementos serán renderizados en cada ruta de la SPA

<mark>El **routing** es la gestión de las diferentes vistas de una página web, permitiendo que un usuario pueda navegar entre ellas</mark>. El usuario se podrá mover entre las diferentes vistas sin la necesidad de recargar la página por completo. De esta forma, definimos qué elementos serán renderizados en cada ruta.

Por ejemplo, si entras a la página oficial de Henry (o a cualquier otra) y comienzas a presionar botones verás como puedes navegar en distintas vistas de la página.

De hecho, si miras la URL, verás como cambia a medida que cambias de vista.

<mark>El término **Single Page Application (SPA)** hace referencia a que, en el navegador, se carga solo una sola página HTML.</mark>

Su contenido se actualizará de forma dinámica mientras el usuario interactúa con la aplicación. Por ende, en lugar de recargar la página una y otra vez cuando se hace un cambio, lo que hace es alternar la aparición de distintos elementos llamados **Views** o **Pages**, que se renderizan según la ruta en la que esté el usuario.

Tomemos otro ejemplo. La página de LinkedIn (que pronto será tu mejor amiga😉) tiene una gran cantidad de vistas dinámicas.

Si presionamos los distintos botones podemos ver cómo cambia la URL. Sin embargo, la página no se recarga.

De esta manera, denominaremos al cambio de vistas como routing. La navegación entre vistas es más fluida y rápida que la forma tradicional entre páginas.

¿Cómo podemos implementar esto en nuestras aplicaciones de react? Para lograr esto existen multiples opciones. En nuestro caso vamos a enfocarnos en conocer una librería llamada **react-router-dom**.

## React router dom

- Librería de React
- Se enfoca en el manejo de rutas para aplicaciones del lado del cliente
- Esta herramienta gestiona el proceso de renderizado en una SPA, a partir de las rutas para los diferentes componentes de nuestra app

Esta es una librería enfocada en el manejo de rutas para aplicaciones del lado del cliente. Esta herramienta gestiona el proceso de renderizado en una **SPA**, a partir de las rutas definidas para los diferentes componentes de nuestra aplicación.

El **enrutamiento** puede ser representado, así como el DOM, como una especie de **árbol**. El componente App será el nodo root y los demás componentes junto a sus respectivas rutas, harán de nodos del árbol. Veremos esta analogía más adelante.

![DOM.](/astro-doc-full-stack/images/m3/clase11/dom.webp)

## Instalación y configuración

Haremos una pequeña práctica para aprender cómo definir rutas y renderizar componentes en ellas. Por lo que te pedimos que ejecutes los comandos que ya conoces para crear un template inicial de vite con react.

Una vez hecho lo anterior vamos a instalar la librería con el comando...

```bash
npm i react-router-dom
```

Documentación -> https://reactrouter.com/en/main/start/overview

El proyecto en el que vamos a trabajar tiene diferentes archivos. Estos estarán agrupados en dos carpetas principales.

- Carpeta **components**: tendrá a todos aquellos componentes que se van a renderizar dentro de nuestra página web.

- Carpeta **views**: estarán todos los componentes que sean piezas estructurales de la aplicación, pero no son renderizados individualmente al cambiar de ruta.

Por el momento renderizamos una página estática que muestra únicamente la vista principal en la cual hay una lista de contactos que provienen de una API al momento del montaje.

El componente **Navbar** está también en la ruta principal, pero no tenemos forma de acceder al resto de las vistas de la aplicación.

<mark>Para iniciar lo configuración tendremos que dar acceso al "enrutador global" **(BrowserRouter)**.</mark>

Este es el componente de la librería que nos proveerá de las funcionalidades para crear un enrutado.

<mark>Este debe ubicarse en el nivel más alto de nuestra aplicación. En nuestro caso, dentro del archivo **main.jsx** envolviendo al componente App.</mark>

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Reac.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Reac.StrictMode>
);
```

De esta manera, todos los componentes de la aplicación podrán acceder al enrutado.

## Configuración

## &lt;Routes&gt; y &lt;Route&gt;

La librería nos proveerá de dos componentes muy importantes: **Routes** y **Route**. Estos se utilizan para definir las rutas de nuestra aplicación. Veamos cómo utilizarlos...

```jsx
// App.jsx
import './App.css';
import {usestate, useEffect} from 'react';
import {CustomButton} from './CustomButton';
import HomePage from './views/HomePage';

import LoginPage from './views/LoginPage';
import AboutPage from './views/AboutPage';

import Navbar from './components/Navbar';

import {Routes, Route} from 'react-router-dom';

const function App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response) => response.json
    .then(data) => setContacts(data);
  });
  return (
    <div className="App">
      <Nabvar />  { /* Se renderiza en todas las rutas */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage contacts={contacts} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}
export default App;
```

```jsx
// Navbar
import { Link } from 'react-router-dom';
import style from './styles/Navbar.module.css';

function Navbar() {
  return (
    <div className={style.container}>
      {/* <a href="/home">Home</a> */}
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
}
```

Hasta ahora, hemos logrado definir rutas donde se renderizan componentes y enlaces que nos lleven a estas. Pero, ¿Qué sucede si una ruta contiene valores que pueden cambiar y exhibir información diferente cada vez?

Por ejemplo, piensa en la vista de "Perfil" que existe en Instagram como un solo componente. Si te fijas, todos los perfiles son idénticos. Lo único que cambia es la información e imágenes que lleva dentro. ¿Cómo podemos lograr esto?

## Rutas Dinámicas

<mark>Las **rutas dinámicas** permiten configurar las direcciones web de manera que puedan incluir segmentos variables</mark>. Esto conlleva a que una **misma ruta** maneje **diferentes valores** en ciertas partes de la URL.

El utilizar **parámetros** en las rutas, posibilita la creación de componentes reutilizables, facilitando así la construcción de aplicaciones más dinámicas y adaptables.

### useParams

- Permite ontener y acceder a los parámetros de una ruta dinámica
- Nos devuelve un objeto con los parámetros de la URL actual

```jsx
// /src/components/ContactList.jsx
import { Link } from 'react-router-dom';
import Contact from './Contact';

function ContactList() {
  return (
    <div>
      {contact.map((contact) => {
        <Link
          key={contact.id}
          to={`detail/${contact.id}`}
        ></Link>;
      })}
    </div>
  );
}

export default ContactList;
```

```jsx
// App.jsx
import './App.css';
import {usestate, useEffect} from 'react';
import {CustomButton} from './CustomButton';
import HomePage from './views/HomePage';

import LoginPage from './views/LoginPage';
import AboutPage from './views/AboutPage';
import DetailPage from './views/DetailPage';

import Navbar from './components/Navbar';

import {Routes, Route} from 'react-router-dom';

const function App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response) => response.json
    .then(data) => setContacts(data);
  });
  return (
    <div className="App">
      <Nabvar />  { /* Se renderiza en todas las rutas */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage contacts={contacts} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    </div>
  )
}
export default App;
```

```jsx
// /views/DetailPage.jsx
import { useEffect, usestate } from 'react';
import { useParams } from 'react-router-dom';

function DetailPage() {
  // Hook para acceder a los params
  const { id } = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setContact(data));

    // Limpiamos el estado del componente al desmontar
    return () => {
      setContact({});
    };
  }, [id]);

  return (
    <div>
      <h1>{contact.name}</h1>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <p>{contact.website}</p>
    </div>
  );
}

export default DetailPage;
```

## Redirección en eventos

## Nuevos hooks: useNavigate / useLocation

En muchos sitios web, la experiencia del usuario implica en ocasiones ser redirigido a rutas específicas para visualizar información. Conozcamos a continuación, dos nuevos hooks que nos permitirán implementar **redirecciones** dentro de nuestras aplicaciones.

- **useNavigate**: Se utiliza para crear una función que permite navegar a diferentes rutas dentro de la aplicación. Navegamos de forma programática. Permite navegar a diferentes rutas

- **useLocation**: Se utiliza para obtener información sobre la ruta actual. En este caso, se accede a la propiedad pathname del objeto location para mostrar la ruta actual en la página. Permite obtener información sobre la ruta actual.

```jsx
import { useNavigate, useLocation } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // Navegar a la ruta "/about"
    navigate('/about');
  };

  return (
    <div>
      <h1>Página principal</h1>
      <p>La ruta actual es: {location.pathname}</p>
      <button onClick={handleClick}>Ir a la página "Acerca de"</button>
    </div>
  );
}

export default App;
```

## Manejo de errores

## Componente Error

Existen diferentes **tipos de errores** y formas de manejarlos mediante el enrutamiento. Por ahora, nos enfocaremos únicamente en el **manejo de rutas inexistentes**.

Vamos a crear un componente Error que será el que se visualice cuando el usuario ingrese a una ruta que no exista.

```jsx
import { Link } from 'react-router-dom';
function ErrorPage() {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );

  export default ErrorPage;
}
```

Para mostrar este componente en cualquier ruta que no sea la existente tendremos que definirlo.

El **path** de esta ruta es **"\*"**, lo que significa que el componente se renderizará si no se ha accedido a ninguna de las rutas definidas anteriormente.

```jsx
// App.jsx
import './App.css';
import {usestate, useEffect} from 'react';
import {CustomButton} from './CustomButton';
import HomePage from './views/HomePage';

import LoginPage from './views/LoginPage';
import AboutPage from './views/AboutPage';
import DetailPage from './views/DetailPage';
import ErrorPage from './views/ErrorPage';

import Navbar from './components/Navbar';

import {Routes, Route} from 'react-router-dom';

const function App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response) => response.json
    .then(data) => setContacts(data);
  });
  return (
    <div className="App">
      <Nabvar />  { /* Se renderiza en todas las rutas */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage contacts={contacts} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}
export default App;
```

## Cierre

Hemos abordado el concepto de routing. Conocimos la librería **react-router-dom** que facilita la navegación y el enrutamiento. Aprendimos sus componentes principales, como el **BrowserRouter, Route, Routes y Link**.

Descubrimos que el enrutamiento puede estar sujeto a distintos parámetros que permiten visualizar diferente contenido mediante el uso del hook **useParams**. También vimos que la combinación de **useLocation, y useNavigate** añade flexibilidad y dinamismo a nuestras rutas, permitiendo renderizar condicionalmente dentro de cada ruta, así como la redirección.

![Mapa de conceptos.](/astro-doc-full-stack/images/m3/clase11/mapa.webp)

## Homework

<details>
<summary>Ver</summary>

#### ACTIVIDAD 01

Para esta actividad tendrás que implementar las rutas para poder navegar dentro de tu aplicación. Para ello vas a:

- Importar y utilizar el componente BrowserRouter correctamente en el módulo main.jsx.

#### ACTIVIDAD 02

Importar y utilizar el componente Routes correctamente en el módulo App.jsx.

#### ACTIVIDAD 03

Importar y utilizar para cada una de las rutas que deseas crear el componente Route.
Recuerda darle las props necesarias (path y element).

#### ACTIVIDAD 04

Te sugerimos dejar la barra de navegación por fuera del enrutado para que se muestre en todas las vistas de la navegación.

#### ACTIVIDAD 05

En el componente Navbar importar y utilizar correctamente el componente Link. Recuerda aplicarlo a todas las opciones de navegación.

**TIPS**

- En la vista MisTurnos seguiremos viendo los turnos de todos los usuarios y no únicamente del usuario logueado. No te preocupes. Arreglaremos esto en la próxima clase.

**[REQUISITOS]**:

- Haber implementado correctamente la navegación dentro de la SPA.
- Haber utilizado BrowserRouter para dar a la aplicación la capacidad de Navegación.
- Haber utilizados los componentes Routes y Route para enrutar correctamente la aplicación.
- Haber utilizado el componente Link en Navbar para poder navegar al clickear en las opciones correspondientes.

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
