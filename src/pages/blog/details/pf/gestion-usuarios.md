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

## Gestión de usuarios

Inicialmente la aplicación solo posee el user **_superadmin_** (coco+).

Los **_coworkings_** y **_empresas_** que desean trabajar con la app disponen de formularios de contacto en la landing page.

La landing page también posee la opción signin para usuarios que ya se encuentran registrados, y <mark>no existe la opción de realizar el signup desde la landing page.</mark>

![Landing Page](/astro-doc-full-stack/images/henry/pf/landing.webp)

### endpoints y entidades para solicitudes

- POST /requests/coworking
- POST /requests/company

### Entidad requests

| Campo                  | Descripción                       | Null | Observación    |
| ---------------------- | --------------------------------- | ---- | -------------- |
| id                     | UUID autigenerado                 |      |                |
| name                   |                                   |      |                |
| lastnane               |                                   |      |                |
| phone                  |                                   |      |                |
| email                  |                                   |      |                |
| identification         | número de documento               |      |                |
| role                   | cargo dentro de la empresa        |      |                |
| company_name           | nombre de la compañía o coworking |      |                |
| company_email          | email de la compañía o coworking  |      |                |
| company_phone          | phone de la compañía o coworking  |      |                |
| quantity_beneficiaries | Cant empleados con el beneficio   | null | solo empresa   |
| business_sector        |                                   | null | solo empresa   |
| size                   | Cant de empleados                 | null | solo empresa   |
| address                |                                   | null | solo coworking |
| website                |                                   | null | solo coworking |
| open                   | Horario de apertura               | null | solo coworking |
| close                  | Horario de cierre                 | null | solo coworking |
| capacity               | Cantidad de boxes                 | null | solo coworking |
| message                |                                   | null |                |
| status                 | pending / close                   |      |                |
| observation            | Nota que puede agregar Superadmin |      |                |
| type                   | company / coworking               |      |                |

El campo type se completará de acuerdo al origen de la solicitud, no llegará desde el front. Además contará con un campo status (pending, close), request_date y observación.

El campo status se utilizará para reflejar si el superadmin ya proceso la novedad (close) y si aún se encuentra en contacto (pending) y podrá agregar una observación.

## Incorporación de Coworkings y empresas

El **dashboard del superadmin** tendrá las opciones para trabajar sobre las solicitudes.

### enpoint

- GET /requests **Protegido (solo superadmin)**

![Dashboard Superadmin](/astro-doc-full-stack/images/henry/pf/dashboard-superadmin-1.webp)

### Coworkings

### enpoint

- PUT /requests/:id **Protegido (solo superadmin)**

En el momento en que el superadmin acepta una solicitud de coworking, utilizando la información de la solicitud, se creará un <mark>**usuario con role adminCoworking**</mark> y se insertará un registro en la entidad Coworkings con <mark>status pending</mark>.

- Creamos user (adminCoworking)
- Creamos el coworking (status pending)
- Establecemos la relación entre las entidades user y coworking.
- Enviamos el email al adminCoworking informando que puede iniciar sesión en la App con las credenciales (password generada aleatorimente).

### Entidad users

| Campo           | Descripción                                                    | Null | Observación |
| --------------- | -------------------------------------------------------------- | ---- | ----------- |
| id              | UUID autigenerado                                              |      |             |
| name            |                                                                |      |             |
| lastnane        |                                                                |      |             |
| phone           |                                                                |      |             |
| email           |                                                                |      |             |
| identification  | número de documento                                            |      |             |
| position        | cargo que ocupa dentro de la empresa                           |      |             |
| password        | realizamos hash del pass                                       |      |             |
| recovery_token  | Token temporal (forgot pass)                                   |      |             |
| activation_date | Fecha de pimer cambio de pass                                  | null |             |
| role            | superadmin / adminCompany / adminCompany /coworking / employee |      |             |
| status          | active / inactive / blocked                                    |      |             |

### Entidad coworkings

| Campo     | Descripción                     | Null  | Observación |
| --------- | ------------------------------- | ----- | ----------- |
| id        | UUID autigenerado               |       |             |
| name      | nombre del coworking            |       |             |
| phone     | teléfono del coworking          |       |             |
| email     | email del coworking             |       |             |
| address   | Dirección, abrir en mas campos? |       |             |
| open      | horario de apertura             |       |             |
| close     | horario de cierre               |       |             |
| lat       | latitud para google maps        | null? |             |
| long      | longitud para google maps       | null? |             |
| capacity  | cantidad de boxes               |       |             |
| status    | pending, active, inactive       |       |             |
| thumbnail | Imagen principal                | null  |             |

El estado pendiente (coworkings) se debe a que debe completar los datos del coworking (thumbnail, amenities, imágenes, etc) antes de pasar a active.

- Estados del coworking
  - Pending -> aún no se encuentra configurado
  - Active -> configurado y disponible para realizar reservas
  - Block -> <mark>el superadmin podrá suspender / rehabilitar un coworking?</mark>
  - Inactive -> baja del coworking

El estado de Active a Block y viceversa solo lo podrá realizar el superadmin.

<mark>**De pendiente a activo requiere aprobación del superadmin?**</mark>

Más adelante veremos la configuración del coworking y sus relaciones (amenities, images, etc)

### Entidad companies

En el momento en que el superadmin acepta una solicitud de empresa, utilizando la información de la solicitud, se creará un <mark>**usuario con role adminCompany**</mark>, se insertará un registro en la entidad **employee** y se insertará el registro en la entidad **company**.

| Campo                  | Descripción                     | Null | Observación |
| ---------------------- | ------------------------------- | ---- | ----------- |
| id                     | UUID autigenerado               |      |             |
| name                   |                                 |      |             |
| email                  | email de la compañía            |      |             |
| phone                  | phone de la compañía            |      |             |
| quantity_beneficiaries | Cant empleados con el beneficio |      |             |
| business_sector        |                                 |      |             |
| size                   | Cant de empleados               |      |             |
| status                 | active / inactive               |      |             |

### Entidad employees

| Campo            | Descripción                             | Null | Observación |
| ---------------- | --------------------------------------- | ---- | ----------- |
| id               | UUID autigenerado                       |      |             |
| passes           | cantidad de pases asignada mensualmente |      |             |
| available_passes | cantidad de pases disponibles           |      |             |
| company_id       |                                         |      |             |
| user_id          |                                         |      |             |

### Primer acceso de usuarios (login)

Dentro de la entidad **users** dejamos el campo <mark>**activation_date**</mark> para gestionar el cambio de contraseña en el primer inicio de sesión.

Cuando se crea el usuario se genera con un password aleatorio de 8 dígitos y activation_date en null. El password temporal se enviará al usurio por email.

Desde el front, cuando el usuario realce el primer inicio de sesión se verificará si el campo activation_date se encuentra en nulo para redigirlo a la pantalla de cambio de contraseña.

<img style="max-width: 400px; margin: 1rem auto; display: block;" src="/astro-doc-full-stack/images/henry/pf/change-password.webp" alt="Cambio de contraseña">

Al realizar el cambio de contraseña se completará el campo con la fecha actual. De esta manera, en posteriores inicios de sesión accederá directamnte a su dashboard.

## Validaciones

### Coworking:

```bash
Name:
Min 3 - Max 50 caracteres
string
Que no incluya caracteres especiales
Requerido

Lastname:
Min 3 - Max 50 caracteres
string
Que no incluya caracteres especiales
Requerido

Phone:
string
implementar librería https://intl-tel-input.com/
requerido

Email:
Requerido
Que sea un email (que cumpla con la estructura)
string

Identification
Max 15 caracteres
obligatorio
string

Position:
obligatorio
Min 3 - Max 50 caracteres
string

Company Name:
string
Obligatorio
Min 3 - Max 50 caracteres

Company Email:
Obligatorio
Que sea un email (que cumpla con la estructura)
string

Company Phone:
string
implementar librería https://intl-tel-input.com/
Obligatorio

Address:
String
Obligatorio
Min 5 - Max 255 caracteres

AGREGAR
 -> Pais (String, obligatorio, max 50 caracteres)
 -> Ciudad (String, obligatorio, max 50 caracteres)

Website:
String
Que cumpla con la estructura de un website

Open / Close
Implementar el array de horas cada 30 minutos
string
obligatorio

Capacity:
Validar numero negativos
Que sea un numero
Obligatorio

Mensaje:
String
Opcional
Max 255
```

### EMPRESA

```bash
Name:
Min 3 - Max 50 caracteres
string
Que no incluya caracteres especiales
Requerido

Lastname:
Min 3 - Max 50 caracteres
string
Que no incluya caracteres especiales
Requerido

Phone:
string
implementar librería https://intl-tel-input.com/
requerido

Email:
Requerido
Que sea un email (que cumpla con la estructura)
string

Identification
Max 15 caracteres
obligatorio
string

Position:
obligatorio
Min 3 - Max 50 caracteres
string

Company Name:
string
Obligatorio
Min 3 - Max 50 caracteres

Company Email:
Obligatorio
Que sea un email (que cumpla con la estructura)
string

Company Phone:
string
implementar librería https://intl-tel-input.com/
Obligatorio

AGREGAR
 -> Pais (String, obligatorio, max 50 caracteres)
 -> Ciudad (String, obligatorio, max 50 caracteres)

Cantidad de beneficiarios aproximado:
Validar numero negativos
Que sea un numero
Obligatorio

Bussiness Sector:
String
Obligatorio
Max 255 caracteres

Size:
Validar numero negativos
Que sea un numero
Obligatorio

Mensaje:
String
Opcional
Max 255
```

## Pendientes

- Cambios de estados en las distintas entidades
- Información adicional como cuenta bancaria del coworking donde realizar los pagos por parte de Coco+ por los servicios utilizados (mencionado en la reunión del 03/05)
