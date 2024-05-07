---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 6 - Proyecto final
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'Coco+',
  }
icon:
  { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo Coco+' }
description: Interviews
draft: false
category: Henry
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

## Creación de Coworkings y Compañías

Hasta este momento, un coworking o empreas decidió trabajar con la Aplicación, completo el formulario de la landing page y la novedad llegó hasta el dashboard del superadmin (coco+).

El superadmin dispondrá de vistas accesibles desde el sidebar de su dashboard donde podrá consultar las solicitudes y rechazarlas o aceptarlas.

### Endpoints para solicitudes

GET /requests?type=coworking&status=pending

El endpoint podrá recibir dos parámetros que actuarán como filtros. De esta manera, el superadmin no solo podrá consultar los coworkings

- type: coworking o company
- status: pending o close

Si no se ingresan parámetros se retornarán todas las solicitudes en estado pendiente.

### Coworkings

Si el superadmin decide aceptar una solicitud de tipo coworking debemos:

- Crear un usuario con role adminCoworking, inicialmente con los datos que disponemos en la tabla requests
- Crear el coworking asociando el usuario adminCoworking a la entidad.
- Modificar el estado de la solcitud (requests) de pending a close.
- Enviar el email al usuario adminCoworking con una contraseña generada aleatoriamente. Así permitiremos que realice su primer inicio de sesión y modifique la contraseña.

### Endpoint

**Protegido superadmin**

```bash
POST /coworkings/activate
{
"id": "36ef8203-6283-459f-ae40-704d2dd7ee68"
}
```

Al recibir la petición desde el front, debemos buscar la información en la tabla requests y realizar los inserts en users y coworkings. TypeORM también poblará la tabla pivot users_coworkings.

Estas operaciones deberán realizarse a través de una transación. O se completan todas las tareas o se informa el error al front para no dejar inconsitencias en la base de datos.

### Companies

En este caso, el proceso es similar al coworking con la diferencia que utilizamos una tabla adicional para registrar el empleado.

- Crear el usuario con role adminCompany.
- Crear la compañía.
- Crear el perfil de empleado asociando el usuario a la compañía,
- Modificar el estado de la solcitud (requests) de pending a close.
- Enviar el email al usuario adminCompany con una contraseña generada aleatoriamente. Así permitiremos que realice su primer inicio de sesión y modifique la contraseña.

### Endpoint

**Protegido superadmin**

```bash
POST /companies/activate
{
"id": "36ef8203-6283-459f-ae40-704d2dd7ee68"
}
```
