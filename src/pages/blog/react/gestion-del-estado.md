---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Gestión del estado
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/redux/back.png',
    alt: 'Gestión del estado',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/redux/icon.png',
    alt: 'Logo react',
  }
description: Gestión del estado
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

## 

Agregen la siguiente configuración a su visual studio code, para que emmet les autocomplete HTML dentro de la sintaxis JSX


 "emmet.includeLanguages": {
      "javascript": "javascriptreact"
 },