---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Big Data en AWS
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
description: Big Data en AWS
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

## Introducción al manejo de datos en Cloud

Aspectos importante a tener en cuenta cuando comencemos un proyecto en BigData (son totalmente transparentes y aplican a cualquier Cloud Provider):

- **Cantidad**: Cuando trabajamos en la nube, podemos tener un crecimiento completamente escalable (MB -> GB -> TB -> PB-> EB), y una de las ventajas que nos dan los Cloud Providers es que nos soportan el procesamiento de estas grandes cantidades de datos.
- **Escalabilidad**: Crecimiento por demanda. El Cloud Provider nos permite tener escalabilidad en los servicios que tenemos en la nube. Con esto, a medida que nuestra aplicación crezca, el procesamiento de datos también crece de forma automática.
- **Automatización**: Nos permite entender y orquestar todos los servicios de forma que puedan ejecutarse automáticamente (con el fin de quitarnos carga administrativa como administradores de la nube).
- **Eficiencia**: En la nube tenemos al alcance diferentes servicios de BigData.
- **Ahorros**: En las arquitecturas más importantes lo que buscamos es que el costo de los servicios sea por demanda.
- **Flexibilidad**: Hay muchos Cloud Providers (GCP, AWS, Azure, etc.). Dentro de cada uno, hay una variedad de servicios para BigData; dentro de cada servicio, hay diferentes tipos de configuración. También se pueden hacer migraciones, o trabajos multi-cloud con estos Cloud Providers sin perder información, seguridad, etc.

## Datos en Cloud

En los diferentes Cloud Providers y en los diferentes servicios que tenemos a nuestra disposición para almacenar información, tenemos una variedad muy grande; por lo cual, debemos tener en cuenta:

**Almacenamiento**: Debemos seleccionar el mejor servicio que se ajuste a nuestro proyecto.
**Extracción**: Desde el Cloud Provider, nos conectarnos a las distintas fuentes de información y extraemos datos.
**Ingesta**: Podemos hacer que una fuente de datos alimente el Cloud, donde previamente debemos escoger servicios que reciban dicha información para posteriormente procesarla.
**Validación**: Esta es la validación de la información. Debemos proporcionar algunas características bien definidas y unas garantías para que esa información sea precisa y consistente (debemos garantizar la consistencia de la información).
**Verificación**: En esta fase debemos verificar los distintos tipos de datos; debemos enfocarnos en el tipo de dato, su exactitud y que no tenga inconsistencias.
**Tests**: Usualmente en este tipo de proyectos, en donde procesamos grandes masas (volúmenes gigantezcos) de información, siempre debemos hacer pruebas sobre un subset de toda la información, tomando un porcentaje de la información, en donde verificamos que nuestro sistema y arquitectura esté trabajando de la forma correcta: transformando bien, extrayendo bien la información, una visualización correcta, etc.

## ¿Qué nube debería utilizar en mi proyecto de Big Data?

Actualmente el mercado de Cloud Computing tiene varios actores compitiendo entre sí por atraer la mayor cantidad de clientes a sus nubes, encontramos Múltiples opciones como: Amazon Web Services, Azure, Alibaba Cloud, Google Cloud Platform, Oracle Cloud, Rackspace, Digital Ocean y Softlayer entre muchas otras.

Dentro de esta variedad de proveedores muchas veces es complejo tomar decisiones de cuál utilizar, el criterio para esta decisión puede estar dado por diferentes factores como:

1. Costo: Valor de los servicios que serán utilizados en el proyecto.
2. Tipo de pricing: Por demanda (por hora, minuto o segundo), subasta, reservado.
3. Servicios: Variedad de servicios provistos por el cloud provider. ¿Cuál servicio se ajusta mejor a mis necesidades?
4. Ubicación: Distribución de las regiones/zonas donde el cloud provider preste servicios por temas de latencia y experiencia usuario esto puede ser decisivo.
5. Niveles de Servicio: Consultar la documentación por servicio y los niveles ofrecidos de disponibilidad.
6. Soporte: Tipos de soporte, costo, tiempos de respuesta y nivel de soporte (basic, business, enterprise).
7. Estudios de mercado: Revisar los diferentes estudios de mercado, por ejemplo: el cuadrante mágico de Gartner, en los cuales se evalúan en diferentes aspectos los servicios provistos.
8. Documentación: Consultar la documentación de los cloud provider, muchas veces no es muy clara o está incompleta referente a sus servicios.

Después de revisar las diferentes opciones que proveen los cloud providers encontramos variedad en servicios de acuerdo a su funcionalidad, otras nubes como Azure, Softlayer, Alibaba también cuentan con servicios orientados al procesamiento de datos, sin embargo dentro de su ecosistema no es tan completo el set de servicios, por tal motivo siempre que pensemos en proyectos de BigData los mejores cloud provider serán AWS y GCP que estudiaras en este curso.

## Arquitecturas Lambda

La arquitectura Lambda es atribuida a Nathan Marz, diseñada para ser escalable, tolerante a fallos y de alto procesamiento de datos.

Tiene una gran robustez, puede procesar una alta cantidad de datos. Está compuesta por **tres capas**:

**Batch**: En esta capa vamos a procesar toda la información almacenada con anterioridad, desde el día anterior hasta meses.
**Serve**: Dentro de esta capa es posible visualizar la data procesada de la capa batch.
**Speed**: Conforme llega la data se va a ir procesando.

En esta arquitectura, podemos ver que se hace uso tanto de la capa Batch como de la capa Speed (las cuales están enfocadas al mismo objetivo general: alimentar otro servicio), y al tenerlas combinadas, se aumenta la complejidad en cuanto a cargas de administración. Sin embargo, esta arquitectura es bastante usada, y puede ser aprovechada manejando las capas Batch y Serve para datos que puedan ser tratados de manera histórica, y trabajar en la capa Speed información que requiera ser procesada y visualizada en tiempo real, todo en un mismo proyecto. Aunque muchas veces sólo es utilizada una o dos de las tres capas que tenemos disponibles en esta arquitectura.

## Arquitectura Kappa

Fue presentada por Jay Krepsen en el 2014 como una evolución de la arquitectura Lambda; consiste en eliminar la capa de batch y realizar todo el procesamiento en tiempo real (a través de la capa de streaming).

**Aspectos importantes**:

- Todo se maneja como un stream.
- La información origen no es modificada.
- Sólo hay un flujo de procesamiento.
- Es capaz de reprocesar información.
- Esta arquitectura se fundamenta en el tiempo real, por lo cual, debemos enfocarnos aquí en los servicios de procesamiento en tiempo real.

## Arquitectura Batch

Batch es una parte específica de la arquitectura Lambda. Es muy importante conocer de Batch para comprender en detalle qué pasa dentro de ella.

La arquitectura Batch se basa en una entrada de información, un procesamiento y una salida, todas estas tres tareas orquestadas por un sistema; también lleva consigo un sistema de almacenamiento, ya que maneja entrada y salida de información.

La arquitectura Batch se fundamenta en procesar información desde un momento específico hacia atrás; por ejemplo, la información recolectada el día de ayer es procesada hoy.

**Características**:

- Se puede procesar información histórica.
- Se puede re-procesar información histórica.
- Pueden ser alimentados diversos sistemas de visualización con la información procesada.

## Llevar tu información al cloud

Existen diversas **estrategias** para conectar nuestro sistema en la nube con la fuente de origen de datos.

**SDK**: Podemos establecer una comunicación con todos los servicios en la nube a través de las SDKs. Aquí entran en juego los lenguajes de programación.
**CLI**: Los Cloud Providers cuentan con interfaces de líneas de comandos a través de las cuales podemos interactuar con los servicios en la nube.
**Servicios**: Aquí nos referimos a servicios especializados para realizar estas tareas (recibir/extraer información desde diferentes fuentes).

Podemos también combinar estas estrategias entre sí.

## Demo - Creando nuestro IDE en la nube con Python - Boto3

