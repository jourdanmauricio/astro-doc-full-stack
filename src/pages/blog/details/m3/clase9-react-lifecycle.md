---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 9. React Lifecycle

date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase7/back.webp',
    alt: 'A picture of a coder',
  }
icon: { src: '/astro-doc-full-stack/images/m3/clase7/icon.png', alt: 'Logo' }
description: React Lifecycle

draft: false
category: React
---

## Ciclo de vida

## Componentes y sus ciclos

<mark>El término **ciclo de vida** se refiere a las fases y métodos que ocurren desde que un **componente** comienza a renderizarse en pantalla hasta que desaparece.</mark> Estas fases permiten que los componentes realicen diferentes tareas.

Aunque actualmente el concepto del **ciclo de vida** ha cambiado ligeramente gracias a la introducción de los **hooks**, es importante conocer las cuáles son estas etapas en su forma original para entender mejor cómo controlarlos.

Por este motivo, ahora vamos a aprender una **nueva forma de crear** componentes.

> Aunque actualmente el concepto del ciclo de vida ha cambiado ligeramente gracias a la introducción de los **hooks**, es importante conocer las cuáles son estas etapas en su forma original para entender mejor cómo controlarlos. Por este motivo, ahora vamos a aprender una **nueva forma de crear componentes**.

### Componentes de clase

De momento sabemos crear componentes funcionales, que son con los que hemos trabajado hasta el momento. Pero antes de que se haya normalizado utilizar este tipo de componentes, existían de otro tipo: los **componentes de clase**.

Los veremos de forma breve para comprender cómo funciona el ciclo de vida. Un componente de clase luce de esta manera...

Como podemos ver, nuestro componente **Saludo** se extiende de una clase predefinida de react llamada Component.

Al ser una clase y **no** una función no podremos retornar ningún valor. Por lo que la forma de renderizar algo es utilizando el método render que también viene predefinido.

Dentro de este método si podremos retornar un valor que será el **contenido JSX** que queramos mostrar en pantalla.

```jsx
// Saludo
import React, { component } from 'react';

class Saludo extends Component {
  render() {
    return (
      <div>
        <h1>Componente de clase</h1>
      </div>
    );
  }
}
export default Saludo;
```

> Como podemos observar, la sintaxis es ligeramente distinta a la ya conocida
> de los componentes funcionales.

Los componentes de clase pueden recibir props de un componente padre, así como contener un estado interno para almacenar y gestionar información. Veamos un ejemplo sencillo de esto...

Este componente de clase recibe una prop llamada **nombre**. En el constructor se inicializa un objeto (al que llamamos state).

En este tipo de componentes no se utilizaban los **hooks** ya que no existían. Aunque, de todos modos, hoy tampoco se podría, ya que los hooks son exclusivos de los componentes funcionales.

A su vez, el constructor recibe la prop e inicializa el estado con un mensaje personalizado que incluye el nombre.

```jsx
// Saludo
import React, { component } from 'react';

class SaludoPersonalizado extends Component {
  constructor(props) {   // 1
    super(props):
    this.state = {mesaje: `Hola, ${this.props.nombre}!`};
  }

  componentDidMount() { // 3
    console.log("componentDidMount");
  }

  componentDidUpdate() { // 5 Ante el re-renderizado se ejecuta
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");  // 6 // Ej: limpiar info del estado
  }

  render() {
    console.log("render");  // 2 // 4
    return (
      <div>
        <h1>{this.state.mensaje}</h1>
      </div>
    );
  }
}
export default SaludoPersonalizado;
```

## Ciclos

![Ciclos de vida.](/astro-doc-full-stack/images/m3/clase9/ciclo-de-vida.webp)

Ahora que comprendemos el **ciclo de vida** de los **componentes**, conozcamos un nuevo hook: **useEffect**. Este nos permitirá definir un comportamiento similar al ciclo de videa de componente de clases, pero en los componentes funcionales.

## useEffect

El ciclo de vida en los componentes funcionales se trabaja de una manera muy distinta a cómo lo vimos en los componentes de clase. Aquí se incorpora el concepto de **efectos**. Estos hacen referencia a acciones secundarias que pueden llevarse a cabo más allá de la propia renderización. De esta forma, se puede controlar en qué momento del ciclo queremos que estas acciones ocurran.

Para gestionar estos efectos, react cuenta con un hook integrado llamado **useEffect()**, que se encarga de realizar efectos secundarios dentro de los componentes funcionales en las distintas etapas del ciclo de vida. En otras palabras...

<mark>El hook useEffect nos permitirá realizar acciones cuando un componente se monta, se actualiza o se desmonta.</mark>

### Estructura

- **Montaje** -> recibe un parametro callback. El código se ejecuta cuando el compoennte se monta. Ejemplos:

  - Solicitud de datos desde una API o base de datos.
  - Realizar suscripciones a eventos del navegador.
  - Inicializar recursos externos como, por ejemplo, un reproductor de video.

- **Dependencias** -> recibe un segundo parámetro: arreglo de dependencias. En el arreglo especificamos las variables, que cuando cambian, activan la ejecución del efecto. Al declarar el arreglo vacio, indicamos que useEffect solo se ejecute luego del montaje. Ejemplos:

  - Realizar acciones cada vez que una prop específica cambie.
  - Actualizar el título de la página cada vez que el estado del componente se modifique.
  - Gestionar acciones cada vez que una sección específica del estado cambia, por ejemplo, cuando un usuario inicia sesión.

- **Desmontaje** -> para ejecutar código cuando el componente se desmonta debemos retornar un callback que será el código a ejcutar. Ejemplos:

  - Limpiar suscripciones a eventos del navegador.
  - Limpiar el almacenamiento local del navegador.
  - Cancelar peticiones de red o APIs.

```jsx
import {useEffect} from 'react';

// Montaje
useEffectt(() => {
  // codigo
});

// Desmontaje
useEffectt(() => {
  return => { /* código */ }
});

// Dependencias
useEffectt(() => {
 // código
}, [/* Dependencias */]);
```

## Cierre

En conclusión, comprender el **ciclo de vida** de un componente y cómo utilizar el hook **useEffect** es fundamental para desarrollar aplicaciones efectivas y con un rendimiento óptimo. El **ciclo de vida** proporciona puntos clave en el proceso de renderizado desde el montaje hasta su desmontaje de la interfaz.

✨ Al emplear el ciclo de vida y el hook useEffect para los efectos, los desarrolladores tienen la capacidad de manejar situaciones diversas, como la inicialización de datos, la actualización dinámica en respuesta a cambios y la gestión adecuada de recursos para mantener una interfaz de usuario fluida y receptiva.

![Mapa de conceptos.](/astro-doc-full-stack/images/m3/clase9/mapa.webp)

## Homework

<details>
<summary>Ver</summary>

#### ACTIVIDAD 01

Para esta actividad tienes los pasos descritos en detalle en el video, pero haremos un resumen de cada uno de los pasos:

- Ejecutar AMBAS aplicaciones, frontend y backend, en consolas separadas. Asegurar que la aplicación de backend recibe correctamente las peticiones utilizando Postman, Insomnia, etc.

#### ACTIVIDAD 02

- Instalar en nuestra aplicación de backend cors y @types/cors.

#### ACTIVIDAD 03

Instalar axios en nuestra aplicación de frontend.

#### ACTIVIDAD 04

Configurar correctamente el middleware de cors en nuestra aplicación de backend.

#### ACTIVIDAD 05

En nuestra aplicación de frontend, en la vista MisTurnos, cambiar el valor inicial del estado de turnos para que sea un arreglo vacío.

#### ACTIVIDAD 06

Manejar el ciclo del vida del componente MisTurnos mediante el hook useEffect. Al montarse el componente, realizar con axios la petición HTTP a http://localhost:3000/turns(opens in a new tab).

#### ACTIVIDAD 07

Al resolverse la promesa, setear el valor del estado con el arreglo de turnos que recibimos desde el backend. (Ten en cuenta que aquí estamos utilizando TODOS los turnos, no los turnos por usuario. Esto será para más adelante).

#### ACTIVIDAD 08

Si completaste todos los pasos anteriores, deberás ver el listado de todos los turnos registrados en la Base de Datos. Si quieres, puedes agregar más turnos utilizando las rutas que tienes creadas desde Postman o Insomnia, para que la lista sea más larga y puedas visualizarla.

**[REQUISITOS]**:

- Haber instalados las dependencias axios, cors y @types/cors en los proyectos correspondientes.
- Haber manejado correctamente el ciclo de vida de MisTurnos a través del hook useEffect.
- Haber realizado con axios la petición correspondiente para obtener el arreglo de turnos desde el backend.
- Haber asignado el arreglo de respuesta como estado local del componente MisTurnos.
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
