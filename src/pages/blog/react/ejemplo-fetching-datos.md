---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Ejemplo fetching de datos
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/react/back.jpg',
    alt: 'Ejemplo fetching de datos',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/react/icon.png',
    alt: 'Ejemplo fetching de datos',
  }
description: Ejemplo fetching de datos
draft: false
category: front
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

## Ejemplo fetching de datos

Utilizaremos la API https://randomuser.me para obtener datos de usuarios aleatorios, renderizarlos en una tabla con ordenamiento, eliminar usuario, restaurar datos iniciales, manejo de errores, filtros, etc.

Repositorio: https://github.com/jourdanmauricio/react-fetch-users-example

<details>


```bash
npm create vite@latest fetch-users -- --template react-ts
cd fetch-users

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
git init
```

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "jsxSingleQuote": true,
  "arrowParens": "always",
  "overrides": [
    {
      "files": "*.css",
      "options": {
        "singleQuote": false,
        "tabWidth": 4
      }
    }
  ]
}
```

```tsx
// src/App.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { SortBy, User } from './types.d';
import UsersList from './components/UsersList';

const fetchUsers = async (page: number) => {
  return fetch(`https://randomuser.me/api/?results=10&seed=mauri&page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error('Error cargando usuarios');
      return response.json();
    })
    .then((data) => {
      return data.results;
    });
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  // const [sortByCountry, setSortByCountry] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // const originalUsers = users;
  // No utlizamos un array para guardar los usuarios originales
  // porque podemos tenemos problemas
  // El useRef nos permite guardar un valor
  // que queremos que persista entre renderizados
  // pero que al cambia no provoque un nuevo renderizado
  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchUsers(currentPage)
      .then((data) => {
        setUsers([...users, ...data]);
        originalUsers.current = [...users, ...data];
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountries = () => {
    // setSortByCountry(!sortByCountry);
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  // Primero filtramos y luego ordenamos
  // para evitar re-renderizados
  const filteredUsers = useMemo(() => {
    console.log('Calculate filteredUsers', filterCountry);
    return filterCountry !== null && filterCountry?.length > 0
      ? users.filter((user) =>
          user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  // Debemos realizar una copia del array de usuarios para no mutar el original
  // toSorted -> método que genera una copia del array de usuarios y lo ordena
  // El problema de utilizar una constante en el "body" de la función es que
  // cada vez que se ejecute la función se creará una nueva constante,
  // lo podemos solucionar con useMemo, tiene sentido ejecutar el sort cuando cambien los usuarios
  // const sortedUsers = sortByCountry
  //   ? // ? users.sort((a, b) => a.location.country.localeCompare(b.location.country))
  //     filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
  //   : users;

  const sortUsers = (users: User[]) => {
    console.log('Calculate sortedUsers');

    if (sorting === SortBy.COUNTRY) {
      return users.toSorted((a, b) => a.location.country.localeCompare(b.location.country));
    }

    if (sorting === SortBy.NAME) {
      return users.toSorted((a, b) => a.name.first.localeCompare(b.name.first));
    }

    if (sorting === SortBy.LAST) {
      return users.toSorted((a, b) => a.name.last.localeCompare(b.name.last));
    }

    return users;
    //return sorting === SortBy.COUNTRY
    //  ? users.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    //  : users;
  };

  const sortedUsers = useMemo(() => sortUsers(filteredUsers), [filteredUsers, sorting]);

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const handleDelete = (loginUuid: string) => {
    console.log('Delete', loginUuid);
    const filteredUsers = users.filter((user) => user.login.uuid !== loginUuid);
    setUsers(filteredUsers);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  return (
    <>
      <h1>Fetching de usuarios</h1>

      <header className='flex items-center justify-center my-10 gap-8'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={toggleColors}
        >
          {showColors ? 'Ocultar colores' : 'Mostrar colores'}
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={toggleSortByCountries}
        >
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleReset}
        >
          Resetear estado
        </button>
        <input
          type='text'
          placeholder='Filtra por país'
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        {/* <pre>{JSON.stringify(users[0], null, 2)}</pre> */}
        {users.length > 0 && (
          <UsersList
            users={sortedUsers}
            showColors={showColors}
            handleDelete={handleDelete}
            changeSorting={handleChangeSort}
          />
        )}
        {loading && <p>Cargando usuarios...</p>}
        {error && <p>Ha ocurrido un error al cargar los usuarios</p>}
        {!error && users.length === 0 && <p>No hay usuarios</p>}

        {!loading && !error && (
          // reemplazar por custom hook useIntersectionObserver
          <button onClick={() => setCurrentPage(currentPage + 1)}>Cargar más resultados</button>
        )}
      </main>
    </>
  );
}

export default App;
```
```css
/* src/App.css */
#root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    width: 100%;
}
```
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
}
a:hover {
    color: #535bf2;
}

body {
    margin: 0;
    /* display: flex;
    place-items: center; */
    min-width: 320px;
    min-height: 100vh;
}

h1 {
    font-size: 3.2em;
    line-height: 1.1;
}

button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}
button:hover {
    border-color: #646cff;
}
button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
    :root {
        color: #213547;
        background-color: #ffffff;
    }
    a:hover {
        color: #747bff;
    }
    button {
        background-color: #f9f9f9;
    }
}
```
```tsx
// src/components/UsersList.tsx
import { SortBy, User } from '../types.d';

type UsersListProps = {
  users: User[];
  showColors: boolean;
  handleDelete: (loginUuid: string) => void;
  changeSorting: (sort: SortBy) => void;
};

const UsersList = ({ users, showColors, handleDelete, changeSorting }: UsersListProps) => {
  return (
    <table className='w-full mt-20'>
      <thead>
        <tr>
          <th>Foto</th>
          <th className='cursor-crosshair' onClick={() => changeSorting(SortBy.NAME)}>
            Nombre
          </th>
          <th className='cursor-crosshair' onClick={() => changeSorting(SortBy.LAST)}>
            Apellido
          </th>
          <th className='cursor-crosshair' onClick={() => changeSorting(SortBy.COUNTRY)}>
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User) => (
          <tr
            className={`${showColors ? 'odd:bg-gray-600 even:bg-gray-700' : ''}`}
            key={user.login.uuid}
          >
            <td className='flex items-center justify-center'>
              <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => handleDelete(user.login.uuid)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default UsersList;
```

</details>