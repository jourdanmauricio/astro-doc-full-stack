---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: SWR - Obtención de datos
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/react/back.jpg',
    alt: 'SWR - Obtención de datos',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/react/icon.png',
    alt: 'Logo SWR',
  }
description: SWR - Obtención de datos
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

## SWR - Obtención de datos

El nombre <mark>**SWR**</mark> es derivado de **stale-while-revalidate**, una estrategia de invalidación de caché. SWR es una estrategia para devolver primero los datos en caché (obsoletos), luego envíe la solicitud de recuperación (revalidación), y finalmente entrege los datos actualizados.

Con SWR, el componente obtendrá constante y automáticamente el último flujo de datos. Y la interfaz de usuario será siempre **rápida** y **reactiva**.

La estrategia consiste en retornar la información almacenada en caché, y al mismo tiempo, realizar una petición al servidor para obtener la información actualizada. Una vez que la petición al servidor ha sido resuelta, se actualiza la información en caché y se retorna al componente.

Mejora la experiencia del usuario, ya que la información almacenada en caché se muestra de forma inmediata.

### Ejemplo de uso

```jsx
import useSWR from 'swr'
 
function Profile() {
   const { data, error, isLoading } = useSWR('/api/user', fetcher)
 
   if (error) return <div>failed to load</div>
   if (isLoading) return <div>loading...</div>
   return <div>hello {data.name}!</div>
}
```

En este ejemplo, el **hook useSWR** acepta una key que es un cadena y una función fetcher. **key** es un indentificador único de los datos (normalmente la URL de la API) y pasará al fetcher. El **fetcher** puede ser cualquier función asíncrona que devuelve datos, puedes utilizar el fetch nativo o herramientas como Axios.

El hook devuelve 2 valores: data y error, basados en el estado de la solicitud.

```bash 
npm install swr 
```

Tradicionalmente, obtenemos los datos una vez utilizando useEffect en el componente de nivel superior, y pasarlo a los componentes hijos a través de props (fíjate que por ahora no manejamos el estado de error):

```jsx
// componente de la página
 
function Page() {
  const [user, setUser] = useState(null)
 
  // obtener datos
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [])
 
  // estado de carga global
  if (!user) return <Spinner />
 
  return (
    <div>
      <Navbar user={user} />
      <Content user={user} />
    </div>
  )
}
 
// componentes hijos
 
function Navbar({ user }) {
  return (
    <div>
      ...
      <Avatar user={user} />
    </div>
  )
}
 
function Content({ user }) {
  return <h1>Welcome back, {user.name}</h1>
}
 
function Avatar({ user }) {
  return <img src={user.avatar} alt={user.name} />
}
```

Aunque podamos evitar pasar props usando Context, sigue existiendo problema con el contenido dinámico: Los componentes dentro del contenido de la página pueden ser dinámicos, y componente de nivel superiror puede no saber qué datos necesitarán sus componentes hijos.

SWR resuelve el problema perfectamente, Con el hook useUser que acabamos de crear, el código puede ser refactorizado a:

```jsx
 
// componente de la página
 
function Page () {
  return <div>
    <Navbar />
    <Content />
  </div>
}
 
// componentes hijos
 
function Navbar() {
   return <div>
    ...
    <Avatar />
  </div>
}
 
function Content() {
  const { user, isLoading } = useUser()
  if (isLoading) return <Spinner />
  return <h1>Welcome back, {user.name}</h1>
}
 
function Avatar() {
  const { user, isLoading } = useUser()
  if(isLoading) return <Spinner />
  return <img src={user.avatar} alt={user.name} />
}
```

Los datos ahora están vinculados a los componentes que los necesitan, y todos los componentes son independientes entre sí. El componente padre no necesita saber nada sobre los datos o el paso del mismo. Sólo se renderizaran. El código es mucho más sencillo y fácil de mantener ahora.

La ventaja es que sólo se enviará 1 request a la API, porque utilizan la misma clave de SWR, se almacena en caché y se comparte automáticamente.

También, cuando el usuario se despierte de la suspensión o cambie de pestaña del navegador, los datos se actualizarán automáticamente.



