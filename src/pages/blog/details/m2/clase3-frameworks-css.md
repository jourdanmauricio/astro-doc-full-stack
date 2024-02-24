---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 2 - Clase 3. Frameworks CSS
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m2/back/back-clase3.jpg',
    alt: 'Frameworks CSS background',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m2/icon/icon-bootstrap.png',
    alt: 'Logo for Bootstrap',
  }
description: Frameworks CSS
draft: false
category: Frameworks CSS
---

## Frameworks CSS

**CSS (Cascading Style Sheets)**

Es el lenguaje que define el aspecto y la presentación de las páginas. Funciona como un conjunto de reglas que indican cómo se deben estilizar los elementos HTML en un sitio web. Esto incluye desde el cambio de colores y fuentes hasta la disposición de los elementos en pantalla.

**Frameworks de CSS**

Ya hemos desarrollado anteriormente el concepto de framework. En términos generales, <mark>un framework es un conjunto de código que proporciona una estructura para facilitar el desarrollo de software.</mark>

Este conjunto favorece al desarrollo porque ofrece componentes reutilizables, estilos predefinidos y una serie de utilidades que agilizan el proceso de construcción de interfaces de usuario.

No es necesario que utilices siempre un framework de CSS para darle estilos a tu página web, pero es recomendable ya que serán una gran ayuda para hacerlo de forma rápida.

- Conjunto preestablecido de reglas
- Estilos que brindan un esquema y una base para el diseño de aplicaciones

**¿Por qué utilizar frameworks?**

1. **Componentes reutilizables** → Los frameworks de CSS suelen incluir una variedad de componentes predefinidos, como botones, barras de navegación, tarjetas, formularios y más. Los desarrolladores pueden utilizar estos componentes directamente en sus proyectos sin la necesidad de escribir todo el código desde cero

2. **Grid System** → Muchos frameworks incorporan diseños fluidos y responsivos. Estos sistemas dividen la interfaz en columnas y filas, proporcionando una estructura flexible que se adapta a diferentes tamaños de pantalla de los dispositivos

3. **Tipografía y estilos básicos** → Los frameworks a menudo definen estilos básicos para tipografía, colores, imágenes y otros elementos clave. Esto proporciona una apariencia estándar en todo el sitio y ahorra tiempo en la configuración manual de estos estilos

4. **Responsiveness** → Muchos frameworks están diseñados con la responsividad en mente, utilizando técnicas como clases específicas y medias queries. Estas últimas permiten cambiar los estilos en un HTML a partir del tamaño de la pantalla de un dispositivo

5. **Personalización** → Aunque los frameworks ofrecen estilos predeterminados, la mayoría permite la personalización de los mismos. Los desarrolladores pueden ajustar colores, tipografía y otros estilos para que se alineen con la identidad visual única del proyecto

## Ventajas de uso de los framworks

- Componentes reutilizables
- Grid System
- Tipografía y estilos básicos
- Responsive
- Personalización

## Frameworks más utilizados

**Bulma** → Es un framework de CSS basado en Flexbox que se centra en la simplicidad y la flexibilidad. Permite crear código más sencillo de entender y mantener a medida que crece, para facilitar la implementación de interfaces responsivas y componentes individuales. Bulma no depende de JavaScript y permite una personalización fácil y rápida mediante el uso de variables. Conoce la **[documentación**(opens in a new tab)](https://bulma.io/documentation/) \*\*\*\*de Bulma.

Ejemplo de **[página**(opens in a new tab)](https://mullvad.net/es) hecha con Bulma

**Foundation** → Es un framework de desarrollo web responsivo y avanzado que utiliza un sistema de rejilla flexible y componentes personalizables. Es modular y permite a los desarrolladores elegir solo los componentes que necesitan. También ofrece un conjunto de herramientas bastante amplio y está diseñado para adaptarse a una gran variedad de proyectos, desde pequeños sitios web hasta aplicaciones a nivel empresarial. Conoce más de Foundation y su documentación en el siguiente **[enlace**(opens in a new tab)](https://get.foundation/sites/docs/).

Ejemplo de **[página**(opens in a new tab)](https://www.vans.com/en-us) hecha con Foundation

**Materialize** → Es un framework de CSS diseñado por Google. Ofrece componentes y estilos enfocados en brindar una apariencia moderna y consistente. Materialize incluye una variedad de componentes, como barras de navegación, tarjetas, y modales, de la misma manera que proporciona funcionalidades adicionales como animaciones y efectos. Consulta más de este framework en el siguiente **[enlace**(opens in a new tab)](https://materializecss.com/).

Ejemplo de **[página**(opens in a new tab)](https://www.geeksforgeeks.org/) hecha con Materialize

**Tailwind css** → Adopta un enfoque diferente al proporcionar utilidades a nivel de código en lugar de componentes predefinidos. Hace uso de los estilos in-line aplicados directamente a los elementos HTML, permitiendo una gran flexibilidad y personalización. Tailwind es conocido por su enfoque orientado a clases (uso del atributo class en las etiquetas) y su capacidad para trabajar bien con estructuras de diseño más complejas y personalizadas. Échale un vistazo a su documentación en este **[enlace**(opens in a new tab)](https://v2.tailwindcss.com/docs).

Ejemplo de **[página**(opens in a new tab)](https://openai.com/) hecha con Tailwind

Como puedes ver, las opciones son muy variadas. Todas son igual de útiles y la elección dependerá de las habilidades del equipo de desarrollo. Dicho esto, vamos a introducir un último framework de desarrollo el cual destaca por su versatilidad, facilidad de uso y amplia adopción en la comunidad de desarrollo web... estamos hablando de **Bootstrap.**

## Bootstrap

**Bootstrap es un framework de código abierto y colaborativo para la creación de componentes responsivos** como botones, alertas, barras de navegación, banners, entre otros. Así, simplifica considerablemente el proceso de estilización de aplicaciones.

Fue desarrollado por **X (ex *twitter*)** y se convirtió rápidamente en uno de los frameworks de desarrollo frontend más populares. Actualmente, empresas grandes de la industria como LinkedIn o Spotify lo usan como base en sus aplicaciones y páginas web.

Documentación: https://getbootstrap.com/docs/5.3/getting-started/introduction/

### Ventajas de trabajar con Bootstrap

1. Diseño responsive → fue creado como un framework para diseño mobile, pero se adapta de forma automática al diseño de apps de escritorio
2. Interfaces → sus componentes y estilos predefinidos facilitan la creación de interfaces de usuario de manera rápida y eficiente
3. Compatibilidad con browsers → Bootstrap es soportado por la mayoría de los navegadores y sistemas operativos
4. Plugin Js → Existen componentes dinámicos que tienen integrada una funcionalidad desarrollada con JS (modales, carruseles, dropdowns), pero puede trabar con o sin ese lenguaje
5. Personalizable → Los componentes predefinidos pueden personalizarse con el procesador Saas que agrega nuevas características y funcionalidades

## Implementar Bootstrap en nuestros propios proyectos

### Configuración inicial

Existen diversas formas de incorporar Bootstrap a una aplicación, la más sencilla es por medio de un link tanto para CSS como para JS que deben ser añadidos al archivo HTML de mi aplicación.

En la documentación de bootstrap se encuentra la CDN (Content Delivery Network) para vincular bootstrap en nuestro proyecto

**CSS**: Copie y pegue la hoja de estilo <link> en su <head> antes que todas las demás hojas de estilo para cargar nuestro CSS.

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
  crossorigin="anonymous"
/>
```

**JS**: Muchos de nuestros componentes requieren el uso de JavaScript para funcionar. Específicamente, requieren nuestros propios complementos de JavaScript y [Popper](https://popper.js.org/). Coloque uno de los siguientes &lt;script&gt; cerca del final de sus páginas, justo antes de la etiqueta &lt;/body&gt; de cierre, para habilitarlas.

```html
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
  crossorigin="anonymous"
></script>
```

**Bundle:** Incluya todos los complementos y dependencias de JavaScript de Bootstrap con uno de nuestros dos paquetes. Tanto bootstrap.bundle.js como bootstrap.bundle.min.js incluyen Popper para nuestra información sobre herramientas y ventanas emergentes.

```html
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
  crossorigin="anonymous"
></script>
```

**Separate:** Si decide optar por la solución de scripts independientes, Popper debe ser lo primero (si utiliza información sobre herramientas o ventanas emergentes) y luego nuestros complementos de JavaScript.

```html
<script
  src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
  integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
  integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
  crossorigin="anonymous"
></script>
```

**Modules:** Si utiliza &lt;script type="module"&gt;, proporcionamos una versión de Bootstrap creada como ESM (bootstrap.esm.js y bootstrap.esm.min.js) que le permite utilizar Bootstrap como módulo en su navegador, si los navegadores de destino lo admiten.

```html
<script type="module">
  import { Toast } from 'bootstrap.esm.min.js';

  Array.from(document.querySelectorAll('.toast')).forEach(
    (toastNode) => new Toast(toastNode)
  );
</script>
```

Para probar la vinculación de la CDN podemos incluir en nuestro Html:

```html
<button
  type="button"
  class="btn btn-primary"
>
  Primary
</button>
<button
  type="button"
  class="btn btn-secondary"
>
  Secondary
</button>
<button
  type="button"
  class="btn btn-success"
>
  Success
</button>
<button
  type="button"
  class="btn btn-danger"
>
  Danger
</button>
<button
  type="button"
  class="btn btn-warning"
>
  Warning
</button>
<button
  type="button"
  class="btn btn-info"
>
  Info
</button>
<button
  type="button"
  class="btn btn-light"
>
  Light
</button>
<button
  type="button"
  class="btn btn-dark"
>
  Dark
</button>

<button
  type="button"
  class="btn btn-link"
>
  Link
</button>
```

Aunque esta es la forma más sencilla de incorporar Bootstrap (y la ideal para aplicaciones simples), tiene la desventaja de limitar la personalización de los componentes utilizados.

## Utilidades y componentes en **Broostrap**

Dentro de Bootstrap existen muchos tipos de componentes que pueden ser utilizados para definir la estructura y diseño de nuestra página.

### Contenedores y bordes

Uno de los componentes fundamentales de Bootstrap son los **contenedores**. Estos envuelven y alinean el contenido de la página web dependiendo del dispositivo donde se visualiza. Normalmente se usan en etiquetas &lt;main&gt; o &lt;div&gt;.

Para incorporar un contenedor podemos utilizar la clase **container** dentro de la etiqueta objetivo. Lo que ocurrirá será que los elementos dentro de este tag serán agrupados y alineados dentro del contenedor.

Luego de hacerlo, puedes intentar modificar el tamaño de la ventana con el cursor. Verás que el contenedor ya es responsive y adapta sus elementos al tamaño correspondiente. Asimismo, estos pueden ser anidados dentro de otros contenedores limitando el espacio de cada sección dentro del mismo.

Las clases de bordes nos permiten modificar el estilo, radio y color de los bordes de un elemento dentro de la página de forma sencilla y rápida. Agreguemos bordes a algunos elementos de la página empezando por el header dando únicamente un borde inferior de tipo primario. Este tipo primario será un color, ya preestablecido por Bootstrap, cargado y listo para usar.

Los contenedores son el elemento de diseño más básico en Bootstrap y son **necesarios cuando utilizamos nuestro sistema de cuadrícula predeterminado** . Los contenedores se utilizan para contener, rellenar y (a veces) centrar el contenido dentro de ellos. Si bien los contenedores *se pueden* anidar, la mayoría de los diseños no requieren un contenedor anidado.

Bootstrap viene con tres contenedores diferentes:

- `.containermax-width`, que establece un en cada punto de interrupción de respuesta
- `.container-{breakpoint}width: 100%`, que es hasta el punto de interrupción especificado
- `.container-fluidwidth: 100%`, que está en todos los puntos de interrupción

La siguiente tabla ilustra cómo se compara cada contenedor `max-width`con el original `.container`y `.container-fluid`en cada punto de interrupción.

Véalos en acción y compárelos en nuestro [ejemplo de Grid](https://getbootstrap.com/docs/5.3/examples/grid/#containers) .

| Extra Pequeño<576px | Pequeño≥576 píxeles | Medio≥768 píxeles | Grande≥992px | XL≥1200 píxeles | XXL≥1400px |
| ------------------- | ------------------- | ----------------- | ------------ | --------------- | ---------- |
| .container          | 100%                | 540px             | 720px        | 960px           | 1140px     |
| .container-sm       | 100%                | 540px             | 720px        | 960px           | 1140px     |
| .container-md       | 100%                | 100%              | 720px        | 960px           | 1140px     |
| .container-lg       | 100%                | 100%              | 100%         | 960px           | 1140px     |
| .container-xl       | 100%                | 100%              | 100%         | 100%            | 1140px     |
| .container-xxl      | 100%                | 100%              | 100%         | 100%            | 100%       |
| .container-fluid    | 100%                | 100%              | 100%         | 100%            | 100%       |

## Utilidades de texto

Las **utilidades de texto** son herramientas que nos permiten ajustar el tamaño de letra, la alineación, el ancho, estilo, etc.

### Listas

1. Dentro de las utilidades preconstruidas de Bootstrap, encontramos las **listas**.2. Son elementos flexibles que nos permiten generar listados responsivos, que pueden ser personalizados y, también, contener cualquier tipo de información.3. Para utilizarlas solo es necesario definir el tag de lista padre con la clase **list-group** y el resto de los elementos individuales de la lista son marcados como ítems utilizando **list-group-item**.

### Cards & Grids

Uno de los primeros obstáculos con los que se encuentran los desarrolladores al trabajar con estilos es la **creación de cuadrículas de contenido**. Es decir, la presentación de múltiples elementos dentro de un recuadro donde todos estos tienen la misma distribución en forma de tarjetas independientes.

Ya sabemos que cuando utilizamos CSS podemos lograr esto utilizando **flex** o **grid**. Pero, en el caso de Bootstrap, contamos con algunas opciones prediseñadas que simplifican el proceso de creación de estos elementos. Para ello solo es necesario buscar en la documentación el tipo de **grid** y **tarjeta** que mejor se acomoda a nuestro proyecto...

### Espaciado

¿Sabías que es posible retocar el espacio entre los elementos de una página? Bootstrap incluye algunas clases para agregar márgenes, padding o interlineado de forma sencilla. Sumemos algunas clases de espaciado en la página de ejemplo.

Usaremos las siglas correspondientes al espaciado que deseamos tener, junto con la cantidad de pixeles que buscamos. Para un margen top de 3 pixeles utilizaremos la clase mt-3; para un padding vertical de 4 pixeles utilizaremos la clase py-4...

Ejemplo de utilización en el siguiente repositorio: https://github.com/jourdanmauricio/henry-clase3-bootstrap

## Cierre

En esta clase hemos comprendido qué son los frameworks de CSS. Bootstrap, Bulma, Foundation, Materialize y Tailwind CSS, han demostrado ser indispensables para los desarrolladores, proporcionando soluciones elegantes y rápidas para los desafíos comunes del diseño web.

Hemos observado cómo cada framework tiene sus propias fortalezas y enfoques, permitiéndonos elegir la herramienta más adecuada según los requisitos del proyecto y nuestras preferencias personales.

Aprendimos que la implementación de un framework de CSS no sólo acelera el proceso de desarrollo, sino que además ofrece un conjunto coherente de reglas y estilos que garantizan la uniformidad visual en toda nuestra aplicación. La capacidad de crear interfaces responsive, usar componentes reutilizables y diseños atractivos con relativa facilidad.

- Configuración inicial
- Contenedores y bordes
- Utilidades de texto
- List groups
- Cards y grids
- Espaciado

## Homework

<details>
<summary>Actividades</summary>

**ACTIVIDAD 01**

Vincular el documento **index.html** (y las páginas estáticas necesarias) con el enlace CDN de Bootstrap. Para mayor comodidad, te lo dejamos en el botón debajo de estas instrucciones.

**ACTIVIDAD 02**

No tendrás instrucciones puntuales que seguir para el resto de esta tarea. ¡Deja volar tu creatividad! Se tratará de que adaptes tus elementos HTML (los que desees) con los estilos que puedes aprovechar de Bootstrap. Aprovecha este amplio set de herramientas para retocar estilos de tu página web y facilitarte el pulido del apartado visual.

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
