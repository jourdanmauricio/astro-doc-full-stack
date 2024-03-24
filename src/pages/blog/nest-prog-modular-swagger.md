---
layout: '../../layouts/BlogPostLayout.astro'
title: NestJS - Programación Modular, Documentación con Swagger
date: 2024-02-12
author: Mauricio Jourdán
image:
  { src: '/astro-doc-full-stack/images/back-general.webp', alt: Logo nest js' }
description: NestJS - Programación Modular, Documentación con Swagger
draft: false
category: Nest js backend
---

# Programación Modular, Documentación con Swagger

Este post es continuación de [Fundamentos de Nest js](/astro-doc-full-stack/blog/nest). En alquel post construimos el backen para un e-commmerce poniendo foco en los controladores y validaciones de iniformación.

En este post veremos como aplicar progración orientada a módulos para escalar y organizar mejor el código. También veremos más a profundidad la inyección de dependencias.

El código base se encuentra en la rama fundamentos-nestjs del repositorio: https://github.com/jourdanmauricio/nest-ecommerce.git

```bash
git clone -b fundamentos-nestjs https://github.com/platzi/nest-ecommerce.git

cd nest-ecommerce
npm install

# Desviculamos el repositorio origen
git remote -v
git remote rm origin
git remote add origin <your-repo>

nmp run start:dev
```

## Módulos

La programación modular nos permite:

- Tener el código organizado
- Definir una estructura escalable para nuestra App

Es buena práctica encapsular la lógica de la aplicación en módulos, en dominios. Por el momento, toda la lógica se encuentra en el módulo App.module.ts

- El módulo users podría tener toda la lógica para el dominio de los usuarios: roles, órdenes de compra, los usuarios, laatenticación, etc.

- El módulo de productos se encargaría de gestionar todo lo relacionado a un producto: categorías, marcas, el producto, imágenes, etc.

Cada módulo se debe encargar de una parte específica agrupando ciertas características que nos permita escalar y saber donde encontrar la lógica de cada uno de ellos.

Los módulos funcionan como una isla, cada módulo posee sus propios controllers, sus servicios, y los expone hacia nuestra Rest API.

Para conectar dos módulos necesitamos sentencias especiales que veremos más adelante.

En Nest js un módulo posee el decorador **@Module** y posee cuatro atributos:

- imports -> importaciones
- controllers -> controladores
- providers -> servicios
- exports -> permite la interconexión de módulos

Crearemos los módulos users y productos.

```bash
nest g mo users
nest g mo products
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
</style>
