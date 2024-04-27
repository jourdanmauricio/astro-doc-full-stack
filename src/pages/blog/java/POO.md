---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Java SE Programación Orientada a Objetos
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/java/java.webp',
    alt: 'javase-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/java/icon.webp', alt: 'Logo Typescript' }
description: Java SE Programación Orientada a Objetos
draft: false
category: Java
---

**Paradigma** Teoría que suministra la base y modelo para resolver problemas. La Orientación a Objetos como tal es un paradigma, ya que nos ayuda a resolver problemas para plasmarlos en código.

**Orientación a Objetos** Se compone de cuatro elementos:

- Clases
- Propiedades
- Métodos
- Objetos

Se basa en estos pilares:

- Encapsulamiento
- Abstracción
- Herencia
- Polimorfismo

La Orientación a Objetos tiene mucho que ver con **UML (Unified Modeling Lenguage)**, que se traduce como Lenguaje de Modelado Unificado. Parte de la Orientación a Objetos es que primero se observa, después se grafica y finalmente se programa, el UML es lo que nos va a ayudar a graficar, aunque tiene muchas otras funciones.

**UML**

- Clases
- Casos de uso
- Objetos
- Actividades
- Iteración
- Estados
- Implementación

## ¿Qué es un Objeto?

Un **objeto** es cualquier cosa que tenga **propiedades** y **comportamientos**. Existen dos tipos de objetos:

- Físicos: Cualquier cosa que se puede tocar. Un usuario puede ser objeto físico.

- Conceptuales: Cosas que no se pueden tocar, como ideas. Un objeto conceptual puede ser la sesión de usuario.

Las **propiedades** son clave para identificar objetos. También pueden llamarse atributos, los nombres de las propiedades siempre serán sustantivos. Por ejemplo: nombre, tamaño, forma, etc.

Los **comportamientos** serán todas las operaciones/acciones que el objeto pueda hacer. Suelen ser verbos o sustantivo y verbo. Por ejemplo: login, logout, makeReport.

## Abstracción: ¿Qué es una Clase?

Una vez se hayan identificado los objetos claves del problema se necesita algo que permita crear muchos objetos con diferentes valores en sus propiedades. Para esto existen las clases.

**Clase**

Es el modelo sobre el cual se construirá nuestro objeto. Las clases permitirán generar más objetos. Son modelos sobre los cuales construiremos Objetos. Va de la mano con la abstracción.

**Abstracción**

Analizar objetos para crear clases. Para hacer una abstracción debemos analizar ese objeto, entender cuáles son sus propiedades y comportamientos y de que forma se puede hacer algo genérico que permita hacer más objetos que tengan las mismas propiedades y comportamientos.

El primer paso para la POO es el análisis para identificar los objetos y las clases para resolver el problema. El siguiente paso es graficar, es aquí donde entra UML. Cuando ya se tiene un modelo genérico para obtener mas objetos lo siguiente es graficarlo en un diagrama UML con la siguiente estructura:

El nombre de cada clase debe ser único.

El nombre de la clase es Person, name es un atributo y walk es un comportamiento de la clase.

## Modularidad

La Modularidad en Java se divide en dos niveles, en este curso se abarca el primer nivel, el más básico. El segundo nivel es mucho más avanzado para programas más grandes y complejos.

La **Modularidad** consiste en sub-dividir un sistema en varios elementos o componentes para formar el sistema por completo. La modularidad más avanzada se podría definir como un sistema formado por más sistemas pequeños.

La Modularidad viene del diseño, que se usa en el diseño industrial, arquitectura, etc.

Este es uno de los ejemplos más claros de Modularidad:

Ya que es un sillón al que se le pueden añadir más asientos, se le pueden añadir más módulos para que se adapte a las necesidades del usuario.

La modularidad nos va a permitir:

- Reutilizar: Permite reutilizar código.
- Evitar colapsos: Si algo deja de funcionar solo deja de funcionar el modulo donde sucedió el error.
- Mantenible: Se pueden añadir o quitar módulos sin necesidad de rehacer todo el sistema
- Legibilidad: Al estar separado en módulos es mucho más fácil de entender el código.
- Resolución rápida de problemas

Las clases van a ser un elemento clave para manejar Modularidad:

**Modularidad** Divide el programa en diferentes partes o módulos/clases. Separar las clases en archivos

## Creando nuestra primera Clase

```java
// Main
public class Main {

  public static void main(String[] args) {

    //ESTAMOS USANDO MODULARIDAD
    Doctor myDoctor = new Doctor();  //instanciando la clase DOCTOR
    myDoctor.name="Diego Lipa";
    myDoctor.showName();
  }
}
```

```java
// Doctor
public class Doctor { //es es una Clase         -> la close es diferende a un objeto
    int id;
    String name;
    String speciality;

    //Comportamientos

    /* void = ningun valor de retorno*/
    public void showName(){
        System.out.println(name);
    }
}
```

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
    text-align: center;
  }

  th, td {
    border: 1px solid #ddd; /* Borde de las celdas */
    padding: 8px; /* Relleno de las celdas */
    /* text-align: left;  */
  }

  th {
    background-color: #f2f2f2; /* Color de fondo del encabezado */
    font-weight: bold; /* Peso de la fuente del encabezado */
  }

  tr:nth-child(even) {
    background-color: #f9f9f9; /* Color de fondo de las filas pares */
  }  
</style>
