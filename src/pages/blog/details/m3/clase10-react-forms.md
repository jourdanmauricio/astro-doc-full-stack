---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 10. React Forms

date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase7/back.webp',
    alt: 'A picture of a coder',
  }
icon: { src: '/astro-doc-full-stack/images/m3/clase7/icon.png', alt: 'Logo' }
description: React Forms

draft: false
category: React
---

## Formularios

Los formularios son elementos muy importantes en las páginas web. Sirven como un puente entre un usuario y la base de datos. A través de los formularios podemos **proporcionar información para que la aplicación pueda trabajar con ella**.

¿Qué tipos de formularios se te ocurren? Aquí te dejamos algunos que se pueden encontrar con gran frecuencia.

- Formularios para registrarse o iniciar sesión.
- Creación de un nuevo producto en una página.
- Postulación a un puesto de trabajo.
- Publicación en una red social.

### Pongamonos técnicos... ¿Qué es un formulario?

<mark>Vamos a interpretar a los formularios como fragmentos de código que permiten a los **usuarios** enviar datos a un servidor para su procesamiento.</mark>

Está compuesto por una **serie de campos** (por ejemplo, de texto, desplegables, checkbox, entre muchas otras) los cuales sirven como data-points para la recopilación de información.

## Formularios controlados

<mark>El término **formulario controlado** se refiere a formularios donde los elementos de entrada (inputs, textarea, selectores, checkbox, etc) están **vinculados al estado del componente** y son gestionados (controlados) por este. Esto nos permite centralizar la información, realizar validaciones y manejar eventos de forma precisa.</mark>

Enlazamos (**bindeamos**) el estado de react con el valor del input a través del evento onChange. De esta manera, podremos hacer validaciones sobre el ingreso de datos del user. No dependemos de las validaciones de HTML.

## Validación de datos

La **validación de datos** nos permite garantizar que la información almacenada en una base de datos o utilizados en una aplicación sean precisos y consistentes, lo que evita errores en el funcionamiento del sistema.

Podemos pensar que las **validaciones** son una capa adicional de seguridad y así evitar que datos incorrectos o no válidos lleguen al servidor, ahorrando recursos y evitando procesamientos innecesarios. Existen diferentes formas de validar un formulario.

Podremos **validar** la información utilizando propiedades HTML, o también utilizando funciones intermedias (middlewares).

### Expresiones regulares

Las **expresiones regulares** (regex) son patrones de búsqueda que permiten encontrar y manipular cadenas de texto. Se utilizan para validar, buscar y manipular datos en texto de manera eficiente.

Para hacernos a una mejor idea de esto, supongamos que recibes una lista de contactos y deseas validar que todos los teléfonos realmente sean números y no texto. Con una expresión regular, puedes buscar un patrón específico.

Aplicando esta expresión regular a la lista, te mostrará los números de teléfono que sigan este patrón. Existen formas de crear patrones de manera manual, pero es más frecuente el uso de patrones previamente diseñados que pueden ser encontrados en diversas páginas de internet o haciendo uso de **inteligencia artificial**.

Ejemplo regex -> https://chat.openai.com/share/296b6200-2d6d-4eab-a3fc-abc1c55069d7

## Validación de errores

En el siguiente ejemplo vamos a construir una función de JavaScript en la que validaremos si lo que recibimos es realmente un correo electrónico.

Para esto utilizaremos un condicional y el método test nativo del lenguaje. En caso de no cumplirse la validación agregará "error" al objeto de errores con el mensaje "username is invalid".

Al escribir dentro del input de username veremos que la validación devuelve un objeto con error hasta el momento en que cumplimos con el patrón esperado.

> Mientras más casos de error contemples, más protegida estará tu aplicación.

```jsx
/src/helpers/validar.js
function validar(input) {
  const erros = {};

  const emailRegex = /^[^\s@]+@[^\s@]+]\.[^\s@]+$/;

  if (!emailRegex.test(input.username)) {
    errors.username = "username is invalid";
  }

  return errors;
}
```

Ahora solo resta controlar que, si hay errores, el usuario no pueda enviar la información del formulario (lógico, ¿verdad?). La forma más sencilla de hacerlo es generar una condición dentro de una función submitHandler() que evalúe el estado errores.

```jsx
function submitHandler(event) {
  event.preventDefault();

  if (Object.keys(errors).length) {
    return alert ("There are errors");
  }

  alert(`username: ${userData.username} password: ${userData.password}`):
}
```

En esta lección trabajamos un formulario con dos inputs, pero, ¿qué sucedería si tuviéramos, en su lugar, unos diez o más campos? Sería un poco difícil y extenso definir el código para controlarlos.

Para trabajar con formularios complejos lo más frecuente es la incorporación de librerías que, a pesar de trabajar con la misma lógica, simplifican mucho la creación de código.

## Formik

**Formik** es una librería de código abierto enfocada en la **creación de formularios** que trabaja de forma declarativa (al igual que react) simplificando el control de los valores y validación de inputs.

Para entender mejor la ventaja que nos trae **Formik**, vamos a transformar nuestro formulario de login a uno creado con esta librería.

Primero instalemos esta librería con el comando...

```bash
npm i formik --save
```

## React forms vs Formik

Una vez instalada la herramienta, tendremos acceso a las funciones, elementos y componentes disponibles en formik. Empecemos por crear un componente llamado FormikLogin e importemos las **dependencias** que utilizaremos...

- Formik | Form | Field | ErrorMessage.

Todos estos elementos son componentes de Formik que deberás importar, y que sustituyen a los tags de HTML que utilizamos para construir el formulario anterior.

```jsx
import {Formik, Field, Form, ErrorMessage} from 'formik';
// Función para validar inputs
import {validar} from './helpers';

// Este componente debe envolver al firmulario.
// Recibe 3 propiedades: initialvalues, Validate, OnSubmit
function FormikLogin() {
  return (
    <Formik
    initialValues={{username: '', password: ''}}
    validate={validar}
    onSubmit={(values) => {alert (`username: ${values.username} password: ${values.password}`)}}>

    <Form>
      <label>USERNAME</label>
      <Filed type="text" name="username" placeholder="example@mail.com" />
      <ErrorMessage name="username">

      <label>PASSWORD</label>
      <Filed type="password" name="password" placeholder="********" />
      <ErrorMessage name="password">

      <button type="submit">SUBMIT</button>
    </Form>
  </Formik>
  )
}
```

Documentación -> https://formik.org/docs/overview

## Cierre

En esta clase hemos comprendiendo cómo el manejo y validación mediante **formularios controlados** nos brinda un mayor control sobre la información ingresada por un usuario.

Al adoptar la **gestión del estado** del formulario a través de react, podemos crear aplicaciones que validen los campos de manera inmediata y avisen al usuario sobre posibles errores en la información suministrada.

Además, hemos mencionado a **Formik**, una herramienta que simplifica significativamente la creación y validación de formularios. También mejora la legibilidad y el mantenimiento, permitiéndonos enfocarnos más en la lógica de la aplicación que en la gestión del estado del formulario de manera manual.

![Mapa de conceptos.](/astro-doc-full-stack/images/m3/clase10/mapa.webp)

## Homework

<details>
<summary>Ver</summary>

#### ACTIVIDAD 01

Crear en la carpeta views los componentes Register.jsx y Login.jsx. Exportar ambos componentes e importarlos en App para poder mostrarlos.

#### ACTIVIDAD 02

Implementar en el componente Register un formulario controlado que se encargará del registro de usuario.

- Controlar el formulario de manera tal que se pueda validar que todos los datos necesarios para el registro están completos, al mismo tiempo que los datos de los inputs son reflejados en el estado local correspondiente y viceversa.

- Una vez completos y validados los datos, se debe poder presionar un botón que dispare un evento, el cual ejecutará una función que se encargue de realizar la petición de tipo POST correspondiente al servidor para el registro del usuario enviando como body el estado que se confeccionó a través del formulario.

- En caso de que el registro sea exitoso, informar al usuario. Del mismo modo, informar al usuario si ha ocurrido un error.

#### ACTIVIDAD 03

Implementar en el componente Login un formulario controlado que se encargará del login del usuario.

- Controlar el formulario de manera tal que se pueda validar que todos los datos necesarios para el login están completos, al mismo tiempo que los datos de los inputs son reflejados en el estado local correspondiente y viceversa.

- Una vez completos y validados los datos, se debe poder presionar un botón que dispare un evento, el cual ejecutará una función que se encargue de realizar la petición de tipo POST correspondiente al servidor para el login del usuario enviando como body el estado que se confeccionó a través del formulario.

- En caso de que el login sea exitoso, informar al usuario. Del mismo modo, informar al usuario si ha ocurrido un error.

**TIPS**

- Trabaja primero con el componente Register y LUEGO con el componente Login. De esta forma podemos luego intentar logearnos con el usuario nuevo que hemos registrado.
- Recuerda SIEMPRE notificar al usuario sobre el resultado de la operación que ha realizado.
- Como TIP te recomendamos deshabilitar el botón de registro o login hasta que todos los datos estén completos y validados. De esta forma puedes evitar envíos de peticiones incompletas.

**[REQUISITOS]**:

- Haber implementado el formulario correspondiente en el componente Register. El mismo debe estar controlado y validado.
- Haber realizado la petición correspondiente desde el formulario de Register para el registro de usuario. Informar al usuario sobre el resultado de la petición.
- Haber implementado el formulario correspondiente en el componente Logn. El mismo debe estar controlado y validado.
- Haber realizado la petición correspondiente desde el formulario de Login para el login de usuario. Informar al usuario sobre el resultado de la petición.

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
