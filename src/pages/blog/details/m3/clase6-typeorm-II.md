---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 6. TypeORM II
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase5/back.webp',
    alt: 'A picture of a coder',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/m3/clase5/icon.png',
    alt: 'Logo express',
  }
description: TypeORM II
draft: false
category: TypeORM SQL Bases de datos
---

## Transacciones

<mark>Las **transacciones** son secuencias de operaciones que se ejecutan como una unidad lógica y atómica</mark>. Esto quiere decir que todas las operaciones deben ser ejecutadas con éxito para que el resto se lleven a cabo.

Pensemos en un ejemplo teórico muy sencillo para entender este concepto. Supongamos que debemos realizar una transferencia bancaria de la cuenta A a la B. Los pasos serían los siguientes.

- Retiro de dinero de la cuenta A
- Actualizar saldo de la cuenta A
- Depósito de dinero en la cuenta B
- Actualizar saldo de la cuenta B

¿qué ocurriría si la cuenta A no tiene saldo suficiente o si el número de la cuenta B no existe? En cualquiera de los casos la transacción tendría que detenerse. Pues bien, las transacciones en las bases de datos funcionan de esta forma.

## Método transaction() del objeto AppDataSource.manager

Este método es **asíncrono**, por tanto debe llevar antepuesta la palabra await.

### Argumentos del método de transaction()

- Nivel de aislamiento -> El primero argumento será el nivel de aislamiento, que determina que tan esctrictas son las operaciones y si otras operaciones pueden acceder a sus datos. Mientras más alto el nivel más confiable es la transacción pero maś costosa en términos de rendimiento
  - READ UNCOMMITED
  - SERIALIZABLE
- Función asíncrona -> El segundo argumento recibe una función asíncrona que se encarga de realizar las consultas a la BD y recibe como argumento a **transaccionalEntityManager** que resolverá la promesa

## Inicio y confirmación de una transacción

Al realizar la solicitud **POST** podremos ver en nuestra terminal que efectivamente se inicia una transacción la cual, al ser realizada de forma exitosa, es confirmada por medio de **COMMIT**, indicando que se ha finalizado con éxito el registro y continúa con el resto de las transacciones.

Si agregamos un usuario, veremos que... el valor de inventario es **asociado con éxito** tanto para el primer como segundo registro. Pero, ¿qué sucede si la transacción no puede realizarse con éxito? Esto nos conllevaría a cometer errores en nuestras implementaciones.

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
