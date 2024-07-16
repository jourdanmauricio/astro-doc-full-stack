---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Angular 17
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/angular/back.png',
    alt: 'Angular 17',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/angular/icon.png',
    alt: 'Logo Angular',
  }
description: Angular 17
draft: false
category: Angular 17
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

## Creando tu primer proyecto en Angular

```bash
# Instalamos el cli de forma global
npm i @angular/cli -g
# Creamos el proyecto indicando que no deseamos las pruebas unitarias
bash --norc --noprofile
ng new todoapp --skip-tests
cd todoapp
ng serve
```

## Implementando estilos

```bash
ng g component pages/home
# CREATE src/app/pages/home/home.component.css (0 bytes)
# CREATE src/app/pages/home/home.component.html (19 bytes)
# CREATE src/app/pages/home/home.component.ts (226 bytes)
ng g component pages/labs
# CREATE src/app/pages/labs/labs.component.css (0 bytes)
# CREATE src/app/pages/labs/labs.component.html (19 bytes)
# CREATE src/app/pages/labs/labs.component.ts (226 bytes)
```


