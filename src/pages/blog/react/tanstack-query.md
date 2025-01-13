---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Tanstank Query
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/react/back.jpg',
    alt: 'Tanstank Query',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/react/icon.png',
    alt: 'Logo SWR',
  }
description: Tanstank Query
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

## Tanstank Query

Anteriormente llamado React-Query. Es una forma de manejar estados asíncronos que funciona en React, Solid, Svelte, etc. Existen otras alternativas commo SWR (react hooks for data fetching), Redux query, etc, que son muy simalares.  

Tanstank Query no solo permite realizar fetching de datos, permite manejar estados asíncronos. Generalmente, utilizamos estados asíncronos llamando a una API. 

DOC: https://tanstack.com/query/latest


<mark>**Tanstank Query** nos dá un estado global, persistencia, caché, reducción en la cantidad de llamadas asíncronas, etc. Nos permite hacer consultas a una API de manera sencilla y eficiente. Tanstank Query se encarga de cachear los datos que se obtienen de la API, de manera que si se vuelve a hacer la misma consulta, no se vuelve a hacer la petición a la API, sino que se obtienen los datos de la caché.</mark>

### Ejemplo, fetching de datos

<details>

Para ejemplificar el uso de Tanstank Query, vamos a hacer un fetching de datos de una API. Retomaremos un proyecto anterior que realiza el fetching de datos de una API de usuarios (https://randomuser.me). 

```bash
git clone https://github.com/jourdanmauricio/react-fetch-users-example react-query-example
cd react-query-example
npm install

npm install @tanstack/react-query
```

Tenemos que realizar una configuración en el archivo `src/index.js` para que Tanstank Query pueda funcionar. 

Tanstack Query nos simplificará el código para el fetching de datos. Utilzmos el hook `useQuery` que requiere como mínimo dos argumentos: el nombre de la key (array) y la función que realiza la consulta. 

La key es un array que identifica los datos almacenados en caché, en el estado global. Así podremos recuperar la información desde cualquier componente. 

useQuery nos retorna un objeto con varias propiedades, entre ellas `data`, `isLoading`, `isError`, `error`, `refetch`, etc. Entonces podemos eliminar los estados que estabamos utilizando (loading, error, users) y reemplazarlos por las propiedades que nos retorna useQuery. También podemos eliminar el useEffect que se encargaba de hacer la petición a la API, el useRef que se encargaba de almacenar la referencia a los usuarios obtenidos inicialmente.

Para realizar **la paginación** podemos utilizar la información sobre la página actual (en qué página estamos), si aún quedan resultados para mostrar, etc, que nos retorna la API. 

En el fetch a los usuarios, retornaremos un objeto. Utilizamos un objeto porque son super extensibles, podemos agregar más propiedades en el futuro. 

El objeto tendrá el listado de usuarios, y la página siguiente. 

```js
{
  users: data.results,
  nextCursor: data.info.page + 1,
}
```

Por otro lado, **el useQuery no está pensado para realizar paginación infinita**. Debemos utilizar otro hook llamado <mark>`useInfiniteQuery`</mark>. 

Finalmente, instalaremos las developer tools de Tanstack Query para poder visualizar el estado global, las consultas realizadas, etc. 

```bash
npm install @tanstack/react-query-devtools
```

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Creamos una instancia de QueryClient
// podríamos configurarla con opciones como el tiempo de cache, etc.
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Envolvemos la App en QueryClientProvider. 
    Le inyectamos un contexto a toda la App 
    para que todos los componentes pueda acceder a la instancia de QueryClient
    */}
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
```

```jsx
// src/App.tsx
import { useMemo, useState } from 'react';
import './App.css';
import { SortBy, User } from './types.d';
import UsersList from './components/UsersList';
import { useUsers } from './hooks/useUser';
import Results from './components/Results';

function App() {
  const { isError, isLoading, users, hasNextPage, refetch, fetchNextPage } = useUsers();

  console.log('hasNextPage', hasNextPage);
  console.log('Data', users);

  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

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
    return filterCountry !== null && filterCountry?.length > 0
      ? users.filter((user) =>
          user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  // const sortedUsers = sortByCountry
  //   ? // ? users.sort((a, b) => a.location.country.localeCompare(b.location.country))
  //     filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
  //   : users;

  const sortUsers = (users: User[]) => {
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
  };

  const sortedUsers = useMemo(() => sortUsers(filteredUsers), [filteredUsers, sorting]);

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const handleDelete = (loginUuid: string) => {
    console.log('Delete', loginUuid);
    // const filteredUsers = users.filter((user) => user.login.uuid !== loginUuid);
    // setUsers(filteredUsers);
  };

  const handleReset = () => {
    refetch();
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
        <Results />
        {/* <pre>{JSON.stringify(users[0], null, 2)}</pre> */}
        {users.length > 0 && (
          <UsersList
            users={sortedUsers}
            showColors={showColors}
            handleDelete={handleDelete}
            changeSorting={handleChangeSort}
          />
        )}
        {isLoading && <p>Cargando usuarios...</p>}
        {isError && <p>Ha ocurrido un error al cargar los usuarios</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && hasNextPage && (
          // reemplazar por custom hook useIntersectionObserver
          <button onClick={() => fetchNextPage()}>Cargar más resultados</button>
        )}

        {!isLoading && !isError && !hasNextPage && <p>No hay más resultados</p>}
      </main>
    </>
  );
}

export default App;
```
```tsx
// src/hooks/useUser.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/users';
import { User } from '../types';

export const useUsers = () => {
  const { isError, isLoading, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    nextCursor?: number;
    users: User[];
  }>({
    queryKey: ['users'],
    queryFn: ({ pageParam }) => fetchUsers(pageParam as number),
    initialPageParam: 1,
    // maxPages: 2,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60, // 1 minuto - tiempo que se considera que los datos están frescos
    refetchOnWindowFocus: false, // No refrescar al volver a la pestaña
    retry: 2, // Número de intentos en caso de error
  });

  return {
    isError,
    isLoading,
    // Aplanamos los usuarios de cada página en un único array de usuarios
    users: data?.pages.flatMap((page) => page.users) ?? [],
    hasNextPage,
    refetch,
    fetchNextPage,
  };
};
```
```tsx
// src/services/users.ts
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUsers = async (pageParam = 1) => {
  await delay(1000);
  return fetch(`https://randomuser.me/api/?results=10&seed=mauri&page=${pageParam}`)
    .then((response) => {
      if (!response.ok) throw new Error('Error cargando usuarios');
      return response.json();
    })
    .then((data) => {
      const currentPage = Number(data.info.page);
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1;
      return {
        users: data.results,
        nextCursor,
      };
    });
};
```
```tsx
// src/components/Results.tsx
import { useUsers } from '../hooks/useUser';

const Results = () => {
  const { users } = useUsers();
  return <h3>Resultados: {users.length}</h3>;
};
export default Results;
```

</details>