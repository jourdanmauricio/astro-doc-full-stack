---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Next Js Avanzado
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/react/next-js-avanzado/back.jpg',
    alt: 'Next Js Avanzado',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/react/next-js-avanzado/icon.jpeg',
    alt: 'Next Js Icon',
  }
description: Next Js Avanzado
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

## Next Js

<mark>Next js</mark> es un framework de React que ya se encuentra listo para producción, nos brinda:

- **Renderización híbrida**:  Podemos utilizar renderización del lado del servidor, del lado del cliente de forma estática, y tambien de forma incremental.
- **SEO**: Nos brinda una mejor optimización para páginas tanto server como de cliente.
- **Cero configuraciones**: No necesitamos configurar Babel, Webpack, Turbopack. Solo lo utilizamos aprovechando las optimizaciones, desde imágenes hasta páginas y fuentes en nuestras aplicaciones.

## Novedades de la Version 15

- **Turbopack**: Es una herramienta que nos permite transpilar React hacia JavaScript. Es el reemplazo de Webpack. Se incorpora de manera estable para desarrollo (dev), por el momento solo se recomienda su utilización en ambientes de desarrollo. Por defecto, cuando iniciamos un proyecto en desarrollo se encuentra habilitado Turbopack, en producción contnúa utilizando Webpack. Es un Blundler incremental optimazado para JavaScritp y TypeScript.

- **Hosting**: Desplegar en nuestro porpio server era complicado, en Vercel, o Cludflare era más sencillo. Ahora se simplifico el despliegue en nuestro propio servidor. 

- **Async Request**: El breaking change más importante se relaciona con los params o cookies (request, headers) de la página. Antes se consultaban de forma síncrona, ahora se consultan de forma asíncrona.

- **Chache**: No hay cahce por defecto. En versiones anteriores, era complicada la gestión de cache, el fetch y los server components traían cache por defecto. En esta versión se desactiva a pedido de la comunidad.

- **use-cache**: es una nueva directiva para controlar el caché. En versiones anteriores, había varias formas de hacerlo: revalidation, tambén podíamos acceder al objeto fetch para controlar el chaché. Ahora se simplifica con use-cache. Entonces tenemos directivas como use-server, use-client, y ahora use-cache.

## Migración de una APP a Next.js 15

Next Js nos brinda herramientas (codemods) para realizar las modificaciones de código necesarias para migrar nuestra aplicación a la versión 15.

Tenemos que tener en cuenta las librerías externas como las de css que también debemos actualizar.

## RSC: Refactorizando un componente cliente a servidor

<details>

Next Js trabaja con server components. Vamos a **rectarorizar un fetch clásico (useEffect) a un server component**. Clonaremos un proyecto configurado con React 19 y Next 15. Utilza Chakra UI, emotion, heroicons, Tanstack Query, Drizzle (ORM), Postgres, TypeScritp, Prettier y Tailwind.

```bash
git clone git@github.com:platzi/curso-next15.git
cd curso-next15
npm install
# npm install --force
npm run dev

git remote -v
git remote remove origin
```

Refactoricemos la paǵina Bookmarks. Nos damos cuenta que la página de bookmarks es una página que se renderiza del lado del cliente porque si observamos la red en la consola del navegador, vemos que el html posee el breadcrum, un título, un texto, pero no renderiza los li de los bookmarks (info de la Base de datos).

También vemos que el componenete comienza con `'use client'`, y utiliza `useEffect` y `useState` (hooks de React solo para cliente).

```tsx
// app/bookmarks/page.tsx
"use client"

import { useEffect, useState } from "react"

import { Heading, Text } from "@chakra-ui/react"

import { Bookmark } from "@/components/bookmark"
import { BookmarkType } from "./schema"

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])

  useEffect(() => {
    fetch("/bookmarks/api", {
      next: { tags: ["bookmarks"] },
    })
      .then((response) => response.json() as Promise<{ data: BookmarkType[] }>)
      .then(({ data }) => setBookmarks(data))
  }, [])

  return (
    <main className="mt-12">
      <header className="">
        <Heading size="lg" className="mb-1">
          Marcadores
        </Heading>
        <Text>
          Estrategías de consumo de datos desde el servidor y el cliente
        </Text>
      </header>

      <ul className="text-lg mt-10">
        {bookmarks?.map((bookmark) => (
          <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
            <Bookmark {...bookmark} />
            {/* <div className="my-1 text-gray-600 text-xs ml-7">
              Creado por {bookmark.author?.name || "Anónimo"}
            </div> */}
          </li>
        ))}
      </ul>
    </main>
  )
}
```

Gracias a React Server Components, podemos refactorizar este componente a un server component. 

```tsx
// app/bookmarks/page.tsx
// "use client"

// import { useEffect, useState } from "react"
import { Heading, Text } from "@chakra-ui/react"
import { Bookmark } from "@/components/bookmark"
import { BookmarkType } from "./schema"

// Transformamos el compoenente en asíncrono
// Los componentes cliente no pueden ser asíncronos
export default async function Bookmarks() {
  // const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])

  // useEffect(() => {
  //   fetch("/bookmarks/api", {
  //     next: { tags: ["bookmarks"] },
  //   })
  //     .then((response) => response.json() as Promise<{ data: BookmarkType[] }>)
  //     .then(({ data }) => setBookmarks(data))
  // }, [])

  // Cambiamos la url de relative a absoluta. 
  // En el servidor no existen las rutas relativas
  const bookmarksResponse = await fetch("http://localhost:3000/bookmarks/api")
  const bookmarks = (await bookmarksResponse.json()) as {
    data: BookmarkType[]
  }

  return (
    <main className="mt-12">
      <header className="">
        <Heading size="lg" className="mb-1">
          Marcadores
        </Heading>
        <Text>
          Estrategías de consumo de datos desde el servidor y el cliente
        </Text>
      </header>

      <ul className="text-lg mt-10">
        {bookmarks?.data.map((bookmark) => (
          <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
            <Bookmark {...bookmark} />
            {/* <div className="my-1 text-gray-600 text-xs ml-7">
              Creado por {bookmark.author?.name || "Anónimo"}
            </div> */}
          </li>
        ))}
      </ul>
    </main>
  )
}
```

Ahora, si revisamos la pestaña de red, vemos que se renderiza el contenido li desde el servidor. El html llega completo desde el servidor.

> <mark>Los React Server Components nos permiten renderizar contenido desde el servidor, son excelentes para la performance y el SEO</mark>

> <mark>Next Js también nos ofrece otras características para que mejoremos la forma de realizar el fetch y utilizar bases de datos en forma directa</mark>

</details>

## Cómo usar React Server Components con PostgreSQL sin un ORM

<details>

<mark>Los **React Server Components** nos ayudan a proteger el código de los navegadores</mark>. Debemos proteger los secrets, lo que ocurre en el servidor y enviar la menor cantidad de código posible al cliente, para que el navegador solo ejecuten lo que debe hacen.

En lugar de utilizar fetch podriamos conectarnos a la base de datos directamente, sin ninguna API. Lo podemos realizar de forma cruda y dejar que Nest Js seoare el código del lado cliente y servidor, y que solo envíe el resultado a los usuarios.

No utilizaremnos un ORM, realizaremos consultas sql a postgres. 

### ¿Qué ventajas ofrecen los React Server Components para proteger datos?

- **Protección del código del navegador**: React Server Components permiten que el código sensible permanezca en el servidor, enviando al cliente solo el HTML necesario.
- **Minimización de exposición**: Los navegadores no acceden directamente a las APIs o secretos del servidor, reduciendo riesgos de seguridad.
- **Separación de lógica cliente-servidor**: Next.js gestiona esta separación automáticamente, facilitando la implementación de buenas prácticas.

### ¿Cómo conectar PostgreSQL directamente desde un React Server Component?

- Configuración de la base de datos: Utiliza psql para crear la base de datos y tablas. En este ejemplo:

```sql
CREATE DATABASE "expense_tracker";
\c expense_tracker
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Verifica la estructura desde la línea de comandos o una GUI de PostgreSQL.

- **Conexión en Next.js**: Configura la conexión en un archivo dedicado. Usa librerías como pg:

```tsx
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
module.exports = pool;
```
- **Consultas directas a SQL**: Define funciones para leer y mutar datos:

```tsx
const getExpenses = async () => {
  const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
  return result.rows;
};

const addExpense = async (name, amount) => {
  await pool.query('INSERT INTO expenses (name, amount) VALUES ($1, $2)', [name, amount]);
};
```

### ¿Cómo integrar consultas con un React Server Component?

- **Uso de funciones asincrónicas**: Los componentes de servidor pueden llamar funciones SQL directamente sin intermediarios como ORMs.
- **Ejemplo de lectura y renderizado**:

```tsx
import { getExpenses } from './db';

export default async function ExpenseTracker() {
  const expenses = await getExpenses();
  return (
    
   {expenses.map(expense => (
      <div key={expense.id}>
        <h3>{expense.name}</h3>
        <p>{expense.amount}</p>
        <p>{expense.date}</p>
      </div>
      ))}
  );
}
```

### ¿Cómo manejar mutaciones desde el cliente?

- **Uso de formularios y acciones**:

```tsx
'use client';
const handleSubmit = async (formData) => {
  const name = formData.get('name');
  const amount = formData.get('amount');
  await fetch('/add-expense', { method: 'POST', body: JSON.stringify({ name, amount }) });
};
```

- **Revalidación de datos en Next.js**: Para actualizar automáticamente la UI tras una mutación: 

```tsx
import { revalidatePath } from 'next/cache';
await revalidatePath('/expense-tracker');
```

### ¿Por qué es más seguro trabajar de esta forma?

- **API oculta al cliente**: Next.js genera rutas dinámicas protegidas, dificultando el acceso malicioso.
- **Datos sensibles solo en el servidor**: La lógica permanece oculta al navegador.
- **Protección contra ataques automatizados**: Al evitar exponer rutas predecibles, se reducen las superficies de ataque.

### Ejemplo de uso de React Server Components con PostgreSQL

Crearemos en PostgreSQL:

- Una base de datos: `expense_tracker`
- Una tabla: `expenses`

1. Asegúrate que PostgreSQL esté instalado y corriendo e ingresa

   ```bash
   psql
   ```

2. Crea una nueva base de datos

   ```sql
   CREATE DATABASE expense_tracker;
   ```

   Sal del intérprete con `\q`.

3. Comprueba ingresando a la DB:

   ```bash
   psql -d expense_tracker
   ```

4. Crea el esquema de la tabla que usaremos

   ```sql
   CREATE TABLE expenses (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     amount DECIMAL(10, 2) NOT NULL,
     date DATE DEFAULT CURRENT_DATE
   );
   ```

  Sal del intérprete con `\q`.

Si prefieres usar una GUI, puedes probar [pgweb](http://sosedoff.github.io/pgweb/)

La URL PostreSQL de conexión debería verse como

```
postgresql://<username>:<password>@localhost:5432
```

> Si no has cambiado tu `password` nunca, será el mismo `username`.

Usa el valor de arriba para actualizar el valor de `POSTGRESQL_ENDPOINT` en tu `.env`

- Concexión a la base de datos:

```tsx
// /app/expense-tracker/db.ts
import postgres from "postgres"
import dotenv from "dotenv"

dotenv.config()

// Check .env
if (!process.env.POSTGRESQL_ENDPOINT) {
  throw new Error("POSTGRESQL_ENDPOINT env var is not set")
}

const DB_NAME = "expense_tracker"

export const sql = postgres(`${process.env.POSTGRESQL_ENDPOINT}/${DB_NAME}`)
```

- Page: react server component. 

```tsx
// /app/expense-tracker/page.tsx
import Form from "next/form"

import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react"
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline"

import {
  getExpenses,
  addExpense,
  deleteExpense,
  getMonthlyTotal,
} from "./actions"

export default async function ExpenseTracker() {
  const expenses = await getExpenses()
  const total = await getMonthlyTotal()

  return (
    <main className="my-16">
      <Heading size="lg" className="mb-1">
        Manejo de Gastos
      </Heading>
      <Heading as="h3" size="md">
        Monthly Total: ${total}
      </Heading>

      <Form
        action={addExpense}
        className="p-6 my-12 border-2 space-y-4 max-w-lg mx-auto"
      >
        <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input required name="name" />
        </FormControl>
        <FormControl>
          <FormLabel>Valor</FormLabel>
          <Input required type="number" name="amount" />
        </FormControl>

        <Button type="submit">Agregar</Button>
      </Form>

      <Heading as="h3" size="md">
        Gastos
      </Heading>

      <TableContainer className="mt-4">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Valor</Th>
              <Th>Fecha</Th>
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense) => (
              <Tr key={expense.id}>
                <Td>{expense.name}</Td>
                <Td>$ {expense.amount}</Td>
                <Td>{expense.date.toLocaleDateString()}</Td>
                <Td>
                  <form action={deleteExpense} style={{ display: "inline" }}>
                    <input type="hidden" value={expense.id} name="id" />
                    <IconButton
                      type="submit"
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Remove"
                      icon={<ArchiveBoxXMarkIcon className="size-5" />}
                    />
                  </form>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </main>
  )
}
```
getExpenses() y getMonthlyTotal() se importan desde las actions. En Next Js se aconstumbra a tener un archivo de acciones para las consultas a la base de datos dentro de la misma página (directorio) o pueden estar separadas. Generalmente se aconstumbra a tener un archivo de acciones por cada página.

```ts
// /app/expense-tracker/actions.ts
"use server"

import { revalidatePath } from "next/cache"
import { sql } from "./db"

type Expense = {
  id: string
  name: string
  amount: string
  date: Date
}

// Fetch all expenses
// No utilizamos un ORM
export async function getExpenses() {
  const result = await sql<Expense[]>`SELECT * FROM expenses ORDER BY date DESC`
  return result
}

// Add a new expense
export async function addExpense(data: FormData) {
  // Tomamos los datos del formulario
  const name = data.get("name") as string
  const amount = data.get("amount") as string

  console.log("Adding expense:", { name, amount })

  await sql`
    INSERT INTO expenses
      (name, amount)
    VALUES
      (${name.toString()}, ${amount})
    `

  // Revalidamos la página para que se releje el nuevo gasto en el cliente
  revalidatePath("/expense-tracker")
}

// Delete an expense
export async function deleteExpense(data: FormData) {
  const id = data.get("id") as string

  await sql`
    DELETE FROM expenses
    WHERE id = ${id}
  `

  revalidatePath("/expense-tracker")
}

// Get total expenses for the current month
export async function getMonthlyTotal() {
  const result = await sql<{ total: string }[]>`
    SELECT SUM(amount) AS total
    FROM expenses
    WHERE
      date_trunc('month', date) = date_trunc('month', CURRENT_DATE)
  `

  return result[0]?.total || 0
}
```

Si accedemos a http://localhost:3000/expense-tracker, veremos la página de manejo de gastos. Podemos agregar un gasto, se insertrá en la base de datos, pero en la tabla de gastos vemos que no se refleja el nuevo gasto. Si refrescamos la página veremos el nuevo gasto.

Para que se refleje el nuevo gasto, tenemos dos opciones:

- **Utilizar la API Web**: para realizar un reload.
- **Utilizar Next Js**: que posee una función <mark>`revalidatePath`</mark> que nos permite revalidar la página indicada.

> <mark>revalidatePath es mucho más rápido que realizar un window.relaod()</mark>

Nest Js no nos muestra en ningún momento la información a enviar, ni la API, ni una url. Tampoco se exponen los datos del backend en el cliente.

Esta característica no solo nos evita algunos pasos, sino que mejora significativamente la seguridad de nuestra aplicación.

Los hackers utilizan herramientas para encontrar de forma automática las rutas y endpoints, y si no los exponemos, no podrán encontrarlos.

</details>

## Consumiendo datos desde el servidor en Next.js 15

<details>

Por el momento, vimos commo comnunicarnos con la base de datos directamente desde el servidor sin pasar por una API. También vimos como realizar el consumo de datos a través de una API. 

Ahora veremos como realizar el consumo de datos a través de un **ORM**.

<mark>Un **ORM** es un manejador de datos relacionales que nos permite interactuar con la base de datos de forma más sencilla.</mark>

Utilizar queries SQL directamente es más rápido, pero también más complicado, y no es tan facil de mantener. Por eso, en la mayoría de los casos, se utiliza un ORM. Utilizaremos **Drizzle**, un ORM para PostgreSQL.

```tsx
// /app/bookmarks/page.tsx
// "use client"

// import { useEffect, useState } from "react"
import { Heading, Text } from "@chakra-ui/react"
import { Bookmark } from "@/components/bookmark"
// import { BookmarkType } from "./schema"
import { orm } from "./db"

// Transformamos el compoenente en asíncrono
// Los componentes cliente no pueden ser asíncronos
export default async function Bookmarks() {
  // Cambiamos la url de relative a absoluta.
  // En el servidor no existen las rutas relativas
  // Tener rutas absolutas puede generar problemas
  // Reemplacemos lo que hace http://localhost:3000/bookmarks/api indicándolo aquí
  // En lugar de llamar a la API directamente, utilizamos el service de ORM
  
  // const bookmarksResponse = await fetch("http://localhost:3000/bookmarks/api")
  // const bookmarks = (await bookmarksResponse.json()) as {
  //   data: BookmarkType[]
  // }

  const bookmarks = await orm.query.bookmarks.findMany({
    limit: 10,
    with: {
      author: true,
    },
  })

  return (
    <main className="mt-12">
      <header className="">
        <Heading size="lg" className="mb-1">
          Marcadores
        </Heading>
        <Text>
          Estrategías de consumo de datos desde el servidor y el cliente
        </Text>
      </header>

      <ul className="text-lg mt-10">
        {bookmarks?.map((bookmark) => (
          <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
            <Bookmark {...bookmark} />
            {/* <div className="my-1 text-gray-600 text-xs ml-7">
              Creado por {bookmark.author?.name || "Anónimo"}
            </div> */}
          </li>
        ))}
      </ul>
    </main>
  )
}
```
```tsx
// /app/bookmarks/api/route.ts
import { orm } from "../db"

export async function GET() {
  const res = await orm.query.bookmarks.findMany({
    limit: 10,
    with: {
      author: true,
    },
  })

  return Response.json({ data: res })
}
```
</details>

## Consumiendo datos desde el cliente con React Query en Next.js 15

<details>

En ocasiones debemos realizar consultas a la base de datos desde el lado del cliente. 

Veremos como consumir datos desde el cliente de dos formas: 

- Tradicional: utilizando fetch desde React
- React Query: utilizando React Query

Pasaremos el componente Bookmarks a un componente cliente nuevamente.

```tsx
// /app/bookmarks/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Heading, Text } from "@chakra-ui/react"
import { Bookmark } from "@/components/bookmark"
import { BookmarkType } from "./schema"
// import { orm } from "./db"

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle")

  useEffect(() => {
    setStatus("loading")
    fetch("/api/bookmarks")
      .then((response) => {
        return response.json()
      })
      .then(({ data }) => {
        setBookmarks(data)
        setStatus("success")
      })
      .catch((error) => {
        console.error("Error fetching bookmarks:", error)
        setStatus("error")
      })
  }, [])

  // const bookmarks = await orm.query.bookmarks.findMany({
  //   limit: 10,
  //   with: {
  //     author: true,
  //   },
  // })

  return (
    <main className="mt-12">
      <header className="">
        <Heading size="lg" className="mb-1">
          Marcadores
        </Heading>
        <Text>
          Estrategías de consumo de datos desde el servidor y el cliente
        </Text>
      </header>

      {status === "loading" && <div>Cargando...</div>}

      <ul className="text-lg mt-10">
        {bookmarks?.map((bookmark) => (
          <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
            <Bookmark {...bookmark} />
            {/* <div className="my-1 text-gray-600 text-xs ml-7">
              Creado por {bookmark.author?.name || "Anónimo"}
            </div> */}
          </li>
        ))}
      </ul>
    </main>
  )
}
```

Utilizar uno o varios estados react para gestionar el estado de la petición es una práctica común. Pero utilizaremos **React Query** para simplificar ese manejo de estados.

```tsx
// /app/bookmarks/page.tsx
"use client"

// import { useEffect, useState } from "react"
import { Heading, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"

import { Bookmark } from "@/components/bookmark"
import { BookmarkType } from "./schema"
// import { orm } from "./db"

export default function Bookmarks() {
  // const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  // const [status, setStatus] = useState<
  //   "idle" | "loading" | "error" | "success"
  // >("idle")

  const { data: bookmarks, status } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      return fetch("/api/bookmarks")
        .then((response) => {
          return response.json()
        })
        .then(({ data }) => {
          return data as BookmarkType[]
        })
    },
  })

  // useEffect(() => {
  //   setStatus("loading")
  //   fetch("/api/bookmarks")
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then(({ data }) => {
  //       setBookmarks(data)
  //       setStatus("success")
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching bookmarks:", error)
  //       setStatus("error")
  //     })
  // }, [])

  // const bookmarks = await orm.query.bookmarks.findMany({
  //   limit: 10,
  //   with: {
  //     author: true,
  //   },
  // })

  return (
    <main className="mt-12">
      <header className="">
        <Heading size="lg" className="mb-1">
          Marcadores
        </Heading>
        <Text>
          Estrategías de consumo de datos desde el servidor y el cliente
        </Text>
      </header>

      {status === "pending" && <div>Cargando...</div>}
      {status === "error" && <div>Error cargando los marcadores</div>}

      <ul className="text-lg mt-10">
        {bookmarks?.map((bookmark) => (
          <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
            <Bookmark {...bookmark} />
            {/* <div className="my-1 text-gray-600 text-xs ml-7">
              Creado por {bookmark.author?.name || "Anónimo"}
            </div> */}
          </li>
        ))}
      </ul>
    </main>
  )
}
```

Además de Rect Query, también podemos utilizar **SWR**, es una librería desarrollada por Vercel que nos permite realizar fetchs de forma sencilla. Es muy similar a React Query.

Si deseamos construir una app robusta podemos utilizar una librería de este tipo para manejar el asincronismo. No necesariamente debe ser para realizar fetchs a una API, también se puede utilizar para manejar estados de forma global, sin utilizar providers y realizar mutaciones de forma segura a través de React Query.

</details>

## Patrones de Diseño: paralelo, secuencial y preload en Next.js 15

<details>

Existen otros enfoques para realizar el consumo de datos:

- Paralelo
- Secuencial
- Preload

El siguiente trabaja en forma secuencial. Primero trae el autor y luego los marcadores. 

```tsx
// /app/bookmarks/[username]/page.tsx
import { Fragment } from "react"
import Image from "next/image"

import { Heading, Text } from "@chakra-ui/react"

import { Bookmark } from "@/components/bookmark"
import { orm } from "../db"
import { isInWhitelist } from "../utils/whitelist"

export default async function Author({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const author = await getAuthor(username)

  if (!author) {
    return null
  }

  preload(author.id)

  const isWhitelisted = await isInWhitelist(author)

  return (
    <main className="my-10">
      <header>
        <Heading size="lg" className="mb-4">
          Marcadores de:
        </Heading>
        <figure className="pl-4 pr-8 py-6 inline-flex items-center">
          <div className="rounded-full border inline-block mr-4">
            <Image
              src={author.avatarUrl!}
              alt={author.name!}
              width="60"
              height="60"
            />
          </div>
          <figcaption>
            <Heading size="lg" className="">
              {author.name}
            </Heading>
            <Heading as="p" size="md" className="" color="gray.500">
              {author.username}
            </Heading>
          </figcaption>
        </figure>
      </header>

      <Text className="mt-2">Patrones de consumo de datos usando promesas</Text>

      <Heading size="lg" className="mb-1 mt-14">
        Marcadores
      </Heading>

        {isWhitelisted && <AuthorBookmarksById authorId={author.id} />}
    </main>
  )
}

async function AuthorBookmarksById(props: { authorId: number }) {
  const bookmarks = await getBookmarksByAuthorId(props.authorId)

  return (
    <ul className="mt-8 text-lg">
      {bookmarks?.map((bookmark) => (
        <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
          <Bookmark {...bookmark} />
        </li>
      ))}
    </ul>
  )
}

async function getBookmarksByAuthorId(authorId: number) {
  return orm.query.bookmarks.findMany({
    where: (entry, { eq }) => eq(entry.authorId, authorId),
  })
}

async function getAuthor(username: string) {
  return orm.query.authors.findFirst({
    where: (entry, { eq }) => eq(entry.username, username),
  })
}

function preload(authorId: number) {
  void getBookmarksByAuthorId(authorId)
}
```

Siempre que podamos debemos evitar la secuencialidad. Hay varias formas de solucionarlo, veremos dos de ellas:

- Paralelismo
- Preload

### Utilizando paralelismo

Si tenemos acceso al backend, podemos utilizar la función getBookmarksByAuthorUserName. Creamos una nueva función, donde en lugar de utilizar el id del autor utilizamos el username.
  
Como getAutor también es una función asíncrona, podemos utiliza Promise.all para traer los marcadores y el autor en paralelo

```tsx
// /app/bookmarks/[username]/page.tsx

import { Fragment } from "react"
import Image from "next/image"

import { Heading, Text } from "@chakra-ui/react"

import { Bookmark } from "@/components/bookmark"
import { orm } from "../db"
import { isInWhitelist } from "../utils/whitelist"

export default async function Author({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  //const author = await getAuthor(username)

  const [author, bookmarks] = await Promise.all([
    getAuthor(username),
    getBookmarksByAuthorUserName(username),
  ])

  if (!author) {
    return null
  }

  preload(author.id)

  const isWhitelisted = await isInWhitelist(author)

  return (
    <main className="my-10">
      <header>
        <Heading size="lg" className="mb-4">
          Marcadores de:
        </Heading>
        <figure className="pl-4 pr-8 py-6 inline-flex items-center">
          <div className="rounded-full border inline-block mr-4">
            <Image
              src={author.avatarUrl!}
              alt={author.name!}
              width="60"
              height="60"
            />
          </div>
          <figcaption>
            <Heading size="lg" className="">
              {author.name}
            </Heading>
            <Heading as="p" size="md" className="" color="gray.500">
              {author.username}
            </Heading>
          </figcaption>
        </figure>
      </header>

      <Text className="mt-2">Patrones de consumo de datos usando promesas</Text>

      <Heading size="lg" className="mb-1 mt-14">
        Marcadores
      </Heading>

      {isWhitelisted && <AuthorBookmarksById authorId={author.id} />}
    </main>
  )
}

async function AuthorBookmarksById(props: { authorId: number }) {
  const bookmarks = await getBookmarksByAuthorId(props.authorId)

  return (
    <ul className="mt-8 text-lg">
      {bookmarks?.map((bookmark) => (
        <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
          <Bookmark {...bookmark} />
        </li>
      ))}
    </ul>
  )
}

async function getBookmarksByAuthorId(authorId: number) {
  return orm.query.bookmarks.findMany({
    where: (entry, { eq }) => eq(entry.authorId, authorId),
  })
}

async function getAuthor(username: string) {
  return orm.query.authors.findFirst({
    where: (entry, { eq }) => eq(entry.username, username),
  })
}

function preload(authorId: number) {
  void getBookmarksByAuthorId(authorId)
}
```
### Utilizando preload

Si no tenemos acceso al backend para crear la función `getBookmarksByAuthorUserName`, o es muy costoso traer todos los marcadores por username podemos utilizar el preloading.
  
Crearemos una función llamada isInWhitelist que nos permita saber si el autor está en la whitelist. Esta funcion agrega un delay de 2 segundos para simular un escenario real.

Para mejorar el performance podemos realizar un preload, tenemos el autor pero podemos realizar un preloading de los marcadores

```tsx
// /app/bookmarks/[username]/page.tsx
import { Fragment } from "react"
import Image from "next/image"

import { Heading, Text } from "@chakra-ui/react"

import { Bookmark } from "@/components/bookmark"
import { orm } from "../db"
import { isInWhitelist } from "../utils/whitelist"

export default async function Author({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const author = await getAuthor(username)

  if (!author) {
    return null
  }

  // La funcion preload ayuda a Next Js a traer información antes de que la ncesitemos
  preload(author.id)
  const check = await isInWhitelist(author)

  return (
    <main className="my-10">
      <header>
        <Heading size="lg" className="mb-4">
          Marcadores de:
        </Heading>
        <figure className="pl-4 pr-8 py-6 inline-flex items-center">
          <div className="rounded-full border inline-block mr-4">
            <Image
              src={author.avatarUrl!}
              alt={author.name!}
              width="60"
              height="60"
            />
          </div>
          <figcaption>
            <Heading size="lg" className="">
              {author.name}
            </Heading>
            <Heading as="p" size="md" className="" color="gray.500">
              {author.username}
            </Heading>
          </figcaption>
        </figure>
      </header>

      <Text className="mt-2">Patrones de consumo de datos usando promesas</Text>

      <Heading size="lg" className="mb-1 mt-14">
        Marcadores
      </Heading>
      
      {check && <AuthorBookmarksById authorId={author.id} />}
    </main>
  )
}

async function AuthorBookmarksById(props: { authorId: number }) {
  const bookmarks = await getBookmarksByAuthorId(props.authorId)

  return (
    <ul className="mt-8 text-lg">
      {bookmarks?.map((bookmark) => (
        <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
          <Bookmark {...bookmark} />
        </li>
      ))}
    </ul>
  )
}

async function getBookmarksByAuthorId(authorId: number) {
  return orm.query.bookmarks.findMany({
    where: (entry, { eq }) => eq(entry.authorId, authorId),
  })
}

async function getAuthor(username: string) {
  return orm.query.authors.findFirst({
    where: (entry, { eq }) => eq(entry.username, username),
  })
}

function preload(authorId: number) {
  // El void evalúa la función y siempre retorna undefined
  // No nos interesa que retorne algo,
  // sino que se evalúe de la forma más pronta posible
  // para que Next Js pueda pre-cargar la información
  void getBookmarksByAuthorId(authorId)
}

```

><mark>Siempre que podemos utilicemos la carga en paralelo, cuando no se pueda utilizaremos técnicas de preload.</mark>

</details>

## Uso avanzado de Suspense con Streaming rendering en Next.js 15

<details>

React Server Actions y React Server Components nos permiten cargar desde el servidor la información que necesitamos en nuestras páginas.

Entre más datos necesitemos cargar desde el servidor, más lento será el tiempo de carga de nuestra página. Para evitar esto, podemos utilizar **Suspense**, que nos ayudará para colocar sppiners o placeholders mientras se carga la información.

Hasta el momento, utilizando secuencilidad, paralelismo o preload, hemos cargado la información de forma completa, en un bloque. Pero, ¿qué pasa si tenemos una gran cantidad de datos? ¿Cómo podemos mostrar la información de forma progresiva? 

La forma clásica sería obtener el autor en un componente servidor, renderice la información en el cliente y obtener los marcadores en un componente cliente.

Sin embargo, veremos como implementar Streaming con la ayuda de Suspense (con la ventaja que no salimos del navegador).

```tsx
// /app/bookmarks/[username]/page.tsx
import { Suspense } from "react"
import Image from "next/image"

import { Heading, Text } from "@chakra-ui/react"

import { Bookmark } from "@/components/bookmark"
import { orm } from "../db"
import { isInWhitelist } from "../utils/whitelist"

export default async function Author({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const author = await getAuthor(username)

  if (!author) {
    return null
  }

  // La funcion preload ayuda a Next Js a traer información antes de que la ncesitemos
  preload(author.id)
  const check = await isInWhitelist(author)

  return (
    <main className="my-10">
      <header>
        <Heading size="lg" className="mb-4">
          Marcadores de:
        </Heading>
        <figure className="pl-4 pr-8 py-6 inline-flex items-center">
          <div className="rounded-full border inline-block mr-4">
            <Image
              src={author.avatarUrl!}
              alt={author.name!}
              width="60"
              height="60"
            />
          </div>
          <figcaption>
            <Heading size="lg" className="">
              {author.name}
            </Heading>
            <Heading as="p" size="md" className="" color="gray.500">
              {author.username}
            </Heading>
          </figcaption>
        </figure>
      </header>

      <Text className="mt-2">Patrones de consumo de datos usando promesas</Text>

      <Heading size="lg" className="mb-1 mt-14">
        Marcadores
      </Heading>
      <Suspense fallback={<Text>Cargando... </Text>}>
        {check && <AuthorBookmarksById authorId={author.id} />}
      </Suspense>
    </main>
  )
}

async function AuthorBookmarksById(props: { authorId: number }) {
  const bookmarks = await getBookmarksByAuthorId(props.authorId)

  return (
    <ul className="mt-8 text-lg">
      {bookmarks?.map((bookmark) => (
        <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
          <Bookmark {...bookmark} />
        </li>
      ))}
    </ul>
  )
}

async function getBookmarksByAuthorId(authorId: number) {
  return orm.query.bookmarks.findMany({
    where: (entry, { eq }) => eq(entry.authorId, authorId),
  })
}

async function getAuthor(username: string) {
  return orm.query.authors.findFirst({
    where: (entry, { eq }) => eq(entry.username, username),
  })
}

function preload(authorId: number) {
  // El void evalúa la función y siempre retorna undefined
  // No nos interesa que retorne algo,
  // sino que se evalúe de la forma más pronta posible
  // para que Next Js pueda pre-cargar la información
  void getBookmarksByAuthorId(authorId)
}
```

Tambien le podemos indicar a React a través de Next Js que realice un suspense de toda la página.

Debemos agregar un archivo llamado loading.tsx a la capeta donde se encuentra la página.

```tsx
// /app/bookmarks/[username]/loading.tsx

export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* h1 */}
      <div className="h-8 w-60 rounded bg-slate-200 animate-pulse mb-4" />
      {/* username badge */}
      <div className="h-28 w-72 rounded bg-slate-200 animate-pulse mb-4" />
      <div className="h-5 w-96 rounded bg-slate-200 animate-pulse mb-2" />
      {/* h2 */}
      <div className="h-8 w-56 rounded bg-slate-200 animate-pulse mt-14" />
      {/* List */}
      <ul className="mt-8">
        {[1, 2, 3, 4, 5].map((id) => (
          <li className="border-b-2 py-4 px-6 my-2" key={id}>
            <div className="h-7 w-full rounded bg-slate-200 animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  )
}
```

Dependiendo de cuán rápido obtengamos la información podemos utilizar suspense. No es necesario llenar todas la páginas de skeletons o sppiners.

</details>

## Internacionalización avanzada: rutas dinamicas y middlewares

<details>

Existen muchas librerías de terceros para Internacionalización, pero en este ejemplo lo realizaremos con JavaScript a través de rutas dinámicas y el middleware de Next Js. Habilitaremos páginas según el idioma del usuario.

Trabajaremos con ingles (en) y con español (es).

El middleware de Next Js es una capa especial, que se encuentra entre el cliente y el backend, y nos permite interceptar las peticiones y realizar acciones antes de que lleguen a la página.

Entonces a través del middleware podemos detectar el idioma del usuario y redirigirlo a la página correspondiente.

```ts
// /middleware.ts

import { NextRequest, NextResponse } from "next/server"

import { getLocale, hasPathnameLocale } from "@/utils/i18n"
import { cookies } from "next/headers"

import {
  isSessionValid,
  COOKIE_NAME as SESSION_COOKIE_NAME,
} from "@/utils/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Auth
  // -------------

  // 1. Ignore todo lo que no sea de nuestra ruta /auth
  if (pathname.startsWith("/auth") && pathname !== "/auth/login") {
    const allCookies = await cookies()

    // 2. Verificar si hay una cookie de sesión válida
    const hasSession = await isSessionValid(
      allCookies.get(SESSION_COOKIE_NAME)?.value,
    )

    // 3. Si la hay, puede continuar
    if (hasSession) {
      return
    }

    // 4. Si no, redireccionar a la página de inicio de sesión
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl))
  }

  // I18n
  // -------------

  // 1. Ignore todo lo que no sea de nuestra ruta /i18n
  // A modo práctico solo trabajaremos dentro de la ruta /i18n
  if (!pathname.startsWith("/i18n")) return

  // 2. Si el path ya contiene un local, ignorelo (ya esta ok), la ruta ya contiene el /es/ o / en/
  //    e.j.: /i18n/es
  const hasLocal = hasPathnameLocale(pathname)
  if (hasLocal) return

  // 3. Si no hay local, agregar el local a la URL
  // Detectamos la local de la petición y la agregamos a la URL
  // Accept-Language es una cabecera configura por el navegador del usuario
  // Indica al navegardor: "el usuario tiene configurado en navegador este idioma"
  //    e.j.: /i18n -> /i18n/es
  const locale = getLocale({
    "accept-language": request.headers.get("Accept-Language") || "",
  })

  // redireccionamos a la url con el local
  request.nextUrl.pathname = `${pathname}/${locale}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
}
```
```ts
// /utils/i18n.ts
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

export const supportedLocales = ["es", "en"]
export const defaultLocale = "es"

/**
 * This utility helps determining what locale to use given the user
 * language (request' headers), the app's supported locales and the app's default locale
 */
export function getLocale(headers: { "accept-language": string }): string {
  const languages = new Negotiator({ headers }).languages()

  return match(languages, supportedLocales, defaultLocale)
}

/**
 * Checks if the given pathname includes any of the supported locale
 */
export function hasPathnameLocale(pathname: string): boolean {
  return supportedLocales.some(
    (locale) =>
      pathname.includes(`/${locale}/`) || pathname.endsWith(`/${locale}`),
  )
}
```
</details>

## Internacionalización avanzada: diccionario de traducciones

<details>

El middleware nos redireccionará a la página según nuestro idioma. Ahora debemos traducir el contenido de la página.

Nos ocuparemos de páginas que renderizan desde el servidor.

```tsx
// /app/i18n/[lang]/page.tsx

import { Heading, Text } from "@chakra-ui/react"
import {
  CurrencyDollarIcon,
  ClockIcon,
  GlobeAltIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline"

import { getTranslations } from "../translations/translate"

export default async function I18nPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params // es o en
  const { t, f, d } = await getTranslations(lang)

  return (
    <main className="">
      <header className="my-10">
        <Heading as="h1" size="lg" className="">
          {/* Internacionalización */}
          {t("heading")}
        </Heading>
        <Text fontSize="md">{t("description")}</Text>
      </header>
      <ul className="grid grid-cols-2 gap-4 text-lg">
        <li className="border-2 p-8 flex items-center">
          <CurrencyDollarIcon className="h-8 w-8 mr-2 inline-block" />{" "}
          {t("balance")}: ${f(10_000.38)}
        </li>
        <li className="border-b-purple-500 border-b-4 border-2 p-8 space-y-4">
          <GlobeAltIcon className="h-8 w-8 mr-2" />
          <Text>{t("internationalization")}</Text>
        </li>
        <li className="border-b-purple-500 border-b-4 border-2 p-8 space-y-4">
          <GlobeAmericasIcon className="h-8 w-8 mr-2" />
          <Text>{t("locale")}</Text>
        </li>
        <li className="border-2 p-8 flex items-center">
          <ClockIcon className="h-8 w-8 mr-2 inline-block" /> {t("date")}:{" "}
          {d(new Date())}
        </li>
      </ul>
    </main>
  )
}
```

```tsx
// /app/i18n/translations/translate.ts
"server only"

const dictionaries: Record<string, () => Promise<Record<string, string>>> = {
  es: () => import("./es.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
}

export async function getTranslations(locale: string) {
  const dictionary = await dictionaries[locale]()

  const t = (key: string, defaultValue = ""): string => {
    return dictionary[key] || defaultValue
  }

  const numberFormatter = new Intl.NumberFormat(locale).format
  const f = (n: number): string => {
    return numberFormatter(n)
  }

  const dateFormatter = new Intl.DateTimeFormat(locale).format
  const d = (date: Date): string => {
    return dateFormatter(date)
  }

  return { t, f, d }
}
```

```json
// /app/i18n/translations/en.json
{
  "heading": "Internationalization",
  "description": "In this page you'll find information to make your application available in other languages.",
  "balance": "Balance",
  "date": "Date",
  "internationalization": "Internationalization: the process of designing and developing the app in a way that allows it to support multiple languages, regions, and cultural norms.",
  "locale": "Locale: a specific geographic, linguistic, or cultural region, defining the conventions and preferences used in software applications."
}
```
```json
// /app/i18n/translations/es.json
{
  "heading": "Internacionalización",
  "description": "En esta página encontrarás la información para hacer tu aplicación disponible en otros idiomas.",
  "balance": "Balance",
  "date": "Fecha",
  "internationalization": "Internacionalización: proceso de diseñar y desarrollar la aplicación de manera que pueda admitir múltiples idiomas, regiones y normas.",
  "locale": "Locale: región geográfica, lingüística o cultural específica, que define las convenciones y preferencias utilizadas en aplicaciones de software."
}
```

En aplicaciones que dependen únicamente del cliente hacer internacionalización es muy pesado porque los diccionarios se deben cargar en el navegador.
</details>

## Autenticación: Middleware en Next.js para validar sesiones

<details>

</details>