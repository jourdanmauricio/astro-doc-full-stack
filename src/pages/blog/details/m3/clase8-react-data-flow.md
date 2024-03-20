---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 8. React Data Flow
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase7/back.webp',
    alt: 'A picture of a coder',
  }
icon: { src: '/astro-doc-full-stack/images/m3/clase7/icon.png', alt: 'Logo' }
description: React Data Flow

draft: false
category: React
---

## Flujo de datos

Vamos a retomar uno de los principios básicos de React que vimos en la clase pasada: el Flujo unidireccional. Al mismo tiempo, conoceremos qué son y cómo funcionan las propiedades comúnmente llamadas props de los componentes

### Direccionalidad

El manejo de la información como un flujo unidireccional es uno de los principios en los que se centra react. Se refiere a que los datos, dentro de una aplicación, siguen un único orden al momento de ser **transferidos entre componentes**.

Para aclarar mejor esta idea, definamos dos conceptos auxiliares: diremos que un componente es un **componente padre** si este contiene y engloba a otro componente. Es decir, lo retorna. Mientras que un **componente hijo** sería aquel que está contenido en un padre y es devuelto por él.

Antes de conocer de qué manera se lleva a cabo esta comunicación, veamos un concepto que será muy importante de aquí en adelante: el **estado** de un componente.

## Estado de un componente

Cuando hablamos del estado de un componente, nos referimos a **un objeto que permite almacenar y gestionar información**, así como cambiar su apariencia y comportamiento a partir de la interacción de un usuario.

Imagina que tu habitación es un componente y que el aire acondicionado es el estado...

Este estado te permite conocer la información de tu habitación: temperatura, humedad en el aire, entre otros.

👉 Si interactúas con el aire acondicionado y lo ajustas según tu necesidad, verás que el ambiente o comportamiento en tu habitación será diferente y estos datos representativos tendrán valores nuevos.

Los **estados** nos permiten determinar cuándo renderizar (o actualizar) los componentes de nuestra página. Esto quiere decir que, siempre que actualicemos el estado de un componente, el componente actualizará de forma inmediata su información.

Para que podamos crear nuestro primer estado deberemos entender antes otro concepto fundamental: **hooks**. Esta es la herramienta actual que se utiliza para la creación de estados.

### Hooks

Los **hooks** son funciones especiales que permiten que un componente utilice características de react. Estos son siempre y únicamente empleados dentro de un componente.

Los hooks predefinidos poseen una funcionalidad específica.

- useContext
- useReducer
- useRef
- useEffect
- useMemo
- useCallback
- useState

Por convención el nombre de los hoooks inicia con use. Los hooks son funciones.

<mark>Estos hooks se encuentran integrados a la librería de react, aunque también los podremos encontrar en otras librerías (que veremos más adelante) o incluso crear hooks personalizados nosotros mismos.</mark>

Los hooks son importantes porque veremos que nos permitirán **simplificar** distintas funciones específicas que vienen a solucionar un problema. Por ejemplo, los **estados**. Si nos ponemos a analizar, podríamos crear estados sin utilizar hooks, pero esto nos llevaría muchas líneas de código, lógica, y pérdida de eficiencia en nuestro proyecto.

## Casos de uso

Lo primero que debemos hacer antes de construir un estado, es importar el hook useState dentro del componente y en la parte superior del archivo.

Dentro del componente funcional, utilizamos el hook useState para declarar el estado. Este tomará un argumento (el valor inicial del estado) y devuelve un array con dos elementos: la variable de estado y una función para actualizar ese estado.

Podemos utilizar la variable de estado (miEstado) en cualquier parte del componente donde se necesite acceder o mostrar el valor actual del estado.

La función proporcionada por useState (setMiEstado) nos permitirá actualizar el valor del estado cuando sea necesario.

Esto generalmente se hace en respuesta a algún evento, como un clic de botón o un cambio en un formulario.

> Recuerda: NO hay otra manera de cambiar el valor del estado si no es a través de esta función.

```jsx
// MiComponente
import {useState} from "react";

const MiComponente = () => {
  const [miEstado, setMiEstado] = useState(valorInicial);

  const handleClick = () => {
    setMiEstado(nuevoValor);
  };

  return (
    <div>
      <p>Valor actual del estudio: {miEstado}</p>
      <button onClick={handleClick}>Actualizar estado</button>
  )
}
```

Algunos casos comunes en los que se utiliza este hook...

- Contador -> Ayuda a llevar la cuenta de un valor y actualizar el número.
- Entrada de usuario -> Usado para gestionar el valor de un campo de entrada de usuario.
- Control de visibilidad -> Permite cambiar la visibilidad de un elemento de la interfaz del usuario.
- Datos de un formulario -> Se utiliza para almacenar y actualizar la información proveniente de un formulario.

### Estados vs Variables

Cuando necesitamos reactividad en nuestro componente utilizaremos estados.React reacciona ante los cambios de estados y re-renderiza el componente, no así ante cambios en los valores de las variables.

## Props

La forma de transferir la información entre componentes es mediante el uso de **propiedades** (props). Estas propiedades son datos que guardaremos dentro de un objeto, y que lo pasaremos como un argumento al componente hijo.

¿Recuerdas que dijimos que los componentes son funciones? Si te fijas, estos pueden recibir **parámetros** y **devolver valores**. En el caso de react, los componentes devuelven un contenido que renderizaremos en la pantalla.

## Lifting state up

## Información vs eventos

Hemos mencionado a lo largo de la clase que el flujo de la información viaja de un **componente padre** a un **componente hijo**, y solo en esa dirección.

Sin embargo, cuando trabajamos con **eventos** en React (como por ejemplo, hacer clic sobre elementos, escribir contenido en un campo, submitear un formulario, presionar una tecla o mover el ratón, entre otros), estos se **propagan** en sentido inverso al flujo de la información.

Es decir, se originan en **componentes hijos** y son manejados por funciones pasadas como props desde **componentes padres**.

![bundle based dev server.](/astro-doc-full-stack/images/m3/clase8/flujo-inf-vs-eventos.webp)

## Ejemplo prácitco

En este momento te invitamos a tratar de aplicar los conocimientos adquiridos en esta clase resolviendo el siguiente ejercicio, el cual consiste en la **creación de una aplicación** para almacenar una lista de tareas (to-do list).

📌 El objetivo de esta aplicación será **recibir información** sobre una tarea (to-do) por parte del usuario en un campo de texto el cual será renderizado en una lista debajo de este input al hacer click en un botón de envío.

💪 Además agregaremos un **componente** que se encargará de llevar una cuenta del total de tareas en la lista que deberá ser **renderizado** justo antes de dicha lista. Para llegar al resultado final te sugerimos seguir los siguientes pasos:

### Paso 1

**Configuración inicial**

- Crea un nuevo proyecto de React/Vite.
- Crea los archivos App.jsx, AddToDo.jsx, ToDoCounter.jsx, ToDoList.js y App.css.

### Paso 2

**Implementación de AddToDo**

- Define un componente de función AddToDo.
- En el componente AddToDo, define una función handleSubmit que capture el valor del input y lo añada a la lista de tareas utilizando setTodos (Esta función setter será definida dentro de app junto con el estado).
- Crea un formulario con un input y un botón, y asocia la función handleSubmit al evento onSubmit del formulario.

### Paso 3

**Implementación de ToDoCounter**

- Define un componente de función ToDoCounter.
- En el componente ToDoCounter, renderiza el número total de tareas recibido por props.

### Paso 4

**Implementación de ToDoList**

- Define un componente de función ToDoList.
- En el componente ToDoList, itera sobre el array de tareas (todos) recibidas por props y muestra cada tarea como un elemento <li> en una lista <ul>.
- Asigna una key única a cada elemento <li> utilizando el índice de la tarea en el array.

### Paso 5

**Implementación de App**

- Define el estado todos utilizando useState y proporciona un array inicial de tareas.
- Renderiza los componentes AddToDo, ToDoCounter y ToDoList, pasando el estado todos y la función setTodos según sea necesario.

## Resolución

Consideremos una **app de tareas** que nos permita contar el número total de tareas totales, listar las tareas y agregar tareas a la lista.

Para ello haremos uso de tres componentes

- ToDoCounter
- ToDoList
- AddToDo, respectivamente.

**ToDoCounter** se encargará de renderizar simplemente la cantidad de tareas que hay en la lista, así que será un componente estático sin ninguna lógica específica.

## Definiciones

En React, **"lifting state up"** (levantar el estado) es una técnica fundamental para manejar el estado que se comparte entre múltiples componentes. Implica mover datos de estado desde un componente hijo al componente ancestro común más cercano que también necesita ese estado. Este componente ancestro entonces administra el estado y lo pasa como props a los componentes hijos que lo requieren.

### ¿Por qué levantar el estado?

Hay varias ventajas al levantar el estado:

- Mejora la reutilización: Al centralizar el estado en un ancestro común, los componentes se vuelven más reutilizables. Los componentes hijos no necesitan preocuparse por administrar su propio estado, lo que los hace más genéricos y fáciles de usar en diferentes contextos.

- Simplifica la gestión del estado: Cuando el estado está disperso por componentes hijos, mantenerlo consistente y sincronizado puede ser un desafío. Levantar el estado promueve una única "fuente de verdad" para los datos compartidos, lo que facilita su control y actualización.

- Mejora la comunicación: Levantar el estado puede agilizar la comunicación entre componentes. En lugar de usar el complejo "event bubbling" o el API de contexto para pasar actualizaciones entre componentes profundamente anidados, simplemente puede pasar el estado como props desde el ancestro común.

### Cuándo levantar el estado

Deberías considerar levantar el estado cuando:

- Múltiples componentes necesitan acceder y potencialmente modificar los mismos datos de estado.

- Un componente hijo necesita activar una actualización de estado que afecta a sus componentes padre o hermanos.

- Necesitas mantener la consistencia entre los componentes que dependen del mismo estado.

## Cierre

En esta clase hemos aprendido el concepto de flujo unidireccional de la información y cómo este define la estabilidad de una aplicación al momento de compartir datos entre componentes padres e hijos a través del objeto props.

🙌Además, aprendimos qué es y cómo generar un estado interno en un componente mediante el uso del hook useState, el cual nos concede el acceso a un objeto que podemos controlar para determinar cuándo react debe re-renderizar la información en pantalla.

📌Descubrimos, también, que aparte del flujo de información, está presente el flujo de eventos que ayuda a comunicar a los componentes hijos con sus padres a partir de la ocurrencia de eventos en la interfaz del usuario.

✨ Por último, introdujimos el concepto de levantamiento de estados, que exhibe la información interna de un componente a partir de su estado local y compartirla con los demás componentes que la necesiten a través de su componente padre, las props y los eventos.

![Mapa de conceptos.](/astro-doc-full-stack/images/m3/clase7/mapa.webp)

## Homework

<details>
<summary>Ver</summary>

#### ACTIVIDAD 01

En esta actividad crearemos la vista “Mis Turnos”. Para ello...

Crear dentro de la carpeta views el componente MisTurnos. Exportarlo y renderizar en App. (Recuerda que puedes agregar el tag <h1> de testigo antes de continuar con los demás elementos).

#### ACTIVIDAD 02

Crear dentro de src la carpeta helpers. Dentro de ella crear un módulo llamado myTurns.js. En este módulo crear un arreglo de turnos. Estos turnos nos servirán para trabajar en nuestras aplicación antes de realizar las peticiones al Backend. Ten en cuenta al momento de crear los objetos, que es MUY IMPORTANTE que tengan las mismas propiedades que envía tu aplicación de backend.

#### ACTIVIDAD 03

Dentro del módulo de MisTurnos.jsx importa el arreglo de turnos que acabas de crear. Crea dentro del componente un estado al que le asignes como valor dicho arreglo.

#### ACTIVIDAD 04

Crea dentro de la carpeta components un componente que se encargue de representar UN ÚNICO turno. Para ello ten en cuenta las props que debe recibir y en qué tags del componente quieres poner dicha información.

#### ACTIVIDAD 05

Importa en la vista MisTurnos el componente que has creado y mapea el estado que contiene el arreglo de turnos. Cada iteración del mapeo debe retornar un ejemplar del componente Turno pasando por props la información necesaria.

**[REQUISITOS]**:

- Haber creado un arreglo de turnos que simularán los datos de turnos de un usuario.
- Haber creado la vista MisTurnos e importado la misma en App.
- Haber creado un estado dentro del componente MisTurnos asignándole como valor el arreglo de turnos.
- Haber creado un componente para representar un único turno.
- Haber mapeado correctamente el estado de MisTurnos para mostrar un componente por cada turno que se encuentra en el estado.

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
