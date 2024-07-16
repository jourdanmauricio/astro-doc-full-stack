---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Bases de Datos en AWS
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/cloud-computing/back.webp',
    alt: cloud-computing',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/cloud-computing/icon.png',
    alt: 'Logo aws',
  }
description: Bases de Datos en AWS
draft: false
category: Cloud
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

## Características de Relational Database Service (RDS)

- Amazon Aurora
- MySQL
- MariaDB
- PostgreSQL
- Oracle
-Microsoft SQL Server

**Caracteristicas**

- Backups automaticos: tiempo o periodo de retencion (historico) 1 a 32 dias --> DD:HH:MM:SS Por defecto 7 dias
- Backups Manuales: Creados en cualquier momento y al eliminar la BD por defecto crea uno. Por defecto antes de eliminar la DB este hace un backup
- Storage: General Purpose (SSD), Provisioned (SSD) Alto consuumo --> Uso intensivo Entrada/Salida Diferencia entre estos dos el rendimiento y la cantidad de IOS, generado en el General Purpose. El precio es mas elevado en Provisioned.
- Seguridad: Cifrado de datos en reposo, crear una llave de encriptacion podiendo administrar por roles. Podemos hacer despliegues de BD en VPS, en nivel de Red grupos de seguridad especificamos Reglas a nivel subred utilizando network access list para controlar trafico.
- Actualizacion: Actualizacion del motor de la DB, podemos espesificar las ventanas de tiempo. Es decir nos estamos quitando carga a nivel de backup, seguridad y actualizacion
- IAM: Usa tokens para conexion a la DB. 10 a 20 conexiones por segundo -> Utilizar para escenarios de pruba o escenarios de poca concurrencia a la DB. 
- Monitoreo: Enhanced monitoring -> Tiempo real. No disponible para instancias pequeñas. - - Precio: Tipo (almacenamiento) y tamaño de instancia. Monitoreo y Configuracion.

**Oracle** --> una BD por instancia. Tu puedes traer tu licencia. 
**SqlServer**-> 30 BD por instancia. 
**PostgreSQL** --> BD ilimitadas por instancia. Plugins adicional 
**MariaDB** --> BD ilimitadas por instancia. Optimizacion Queries. 
**MySQL** --> BD ilimitadas por instancia

## Desplegando nuestra primer base de datos

- Para bases de datos de producción AWS nos recomienda usar Aurora
- Para utilizar la capa gratuita debemos usar instancias pequeñas
- Es recomendable crear otras bases de datos en zonas de disponibilidad diferentes
- Podemos desplegar la base de datos en un VPC
- Es buena practica que la BD no sea accesible publicamente
- Si no la hacemos publica nos debemos conectar a ella por medio de un servidor de AWS, es decir una instancia
- El puerto por defecto que utiliza MySQL es 3306
- No se utiliza autenticación IAM para una BD a nivel productivo

- Despliegue A-z significa que tu bd se replica en otra zona.
- Las actualizaciones no dejarán fuera de juego tu bd sino que mientras una se actualiza, aws mantiene en servicio la bd de la otra zona.

## Conexión gráfica a nuestra base de datos

- Para poder entrar a nuestras bases de datos debemos configurar el grupo de seguridad
- El Endpoint es a donde vamos a apuntar la herramienta de conexión a la base de datos
- MySQL Workbench nos provee una vista grafica de nuestra base de datos
- El Hostname es nuestro Endpoint
- En el caso de MySQL podemos crear múltiples bases de datos
- Debe existir una relación entre la cantidad de bases de datos y el tamaño de la instancia para que funcione correctamente

- RDS tiene free tier.
- 750 horas de uso de instancias Single-AZ db.t2.micro de Amazon RDS que ejecuten MySQL, MariaDB, PostgreSQL, Oracle BYOL o SQL Server (con SQL Server Express Edition), horas suficientes para ejecutar de forma continua una instancia de base de datos cada mes.
- 20 GB de almacenamiento de bases de datos de uso general (SSD)
- 20 GB de almacenamiento de backups para los backups automatizados de bases de datos y para las instantáneas de base de datos realizadas por el usuario

## Creación de una tabla

- Dentro de Workbench puedo crear las tablas y definir sus columnas
- También podemos crear tablas y columnas con Querys

## Conexión por consola a nuestra base de datos

En esta clase vamos a conectarnos a nuestra base de datos por medio del bash de Linux. Para esto, debemos crear la instancia de un servidor de AWS con un grupo de seguridad que posteriormente vamos a configurar para que la base de datos y el servidor sean accesibles entre ellos.

Pude acceder a la base de datos sin tener que crear la instancia en EC2. En la terminal ingresé los datos: mysql -h (el endpoint aquí) -P 3306 -u platziuser -p (la contraseña) y listo... Para qué sirve crear la instancia en EC2? Disculpen si la pregunta está fuera de lugar, apenas me estoy iniciando en este mundo.

Habitualmente se tiene una capa de aplicación (Frontend) que es la que gestiona las consultas sobre la base de datos, o lo que ven los usuarios finales; idealmente deberían estar en la misma VPC, por temas de velocidad y latencia. Por otra parte es un buen ejemplo de como debemos manejar los grupos de seguridad.

- El grupo de seguridad es lo que nos permite conectarnos a las instancias
- En los grupos de seguridad permito que las bases de datos se accedida desde la instancia
- La instancia se conecta con la base de datos a traves del puerto 3306
- Existen grupos de seguridad para bases de datos y grupos de seguridad para instancias
- Importante verificar que las instancias tengan instaladas las dependencias que usaremos
- Podemos usar los servicios de RDS a nivel grafico o a nivel de consola

## Estrategias de backup

