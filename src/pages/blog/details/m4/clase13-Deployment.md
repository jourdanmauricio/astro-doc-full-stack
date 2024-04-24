---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 4 - Clase 13 - Deployment
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/henry/m4/clase1/back.webp',
    alt: 'NestJS',
  }
icon: { src: '/astro-doc-full-stack/images/icon-general.png', alt: 'Logo' }
description: Deployment
draft: false
category: Backend Js Nest
---

## Proceso de Deployment

## Proceso y etapas del deployment

Hasta ahora, nuestros proyectos se han venido desarrollando y viviendo en un ambiente local. Las aplicaciones no existen por fuera de tu compu, ni nadie más tiene acceso a los recursos que ofrecen. La única solución para que puedan ser compartidas y las demás personas logren interactuar con ellas, es mediante el deployment de aplicaciones. Todas aquellas aplicaciones de terceros que usamos hoy en día, deben pasar por este proceso para poder llegar hasta nosotros.

El proceso de **deployment** (despliegue o implementación, en español) se refiere al cambio de una aplicación de un entorno de desarrollo a lo que se conoce como entorno de producción. Esto quiere decir, ponerse a disposición de usuarios reales para su uso. Dicho proceso implica varias etapas y consideraciones que aseguran que la aplicación mantenga un funcionamiento óptimo.

<mark>Etapas del proceso de deployment</mark>

- **Preparación del entorno de producción**: Este punto tiene por objetivo que la aplicación pueda ejecutar sus tareas en cualquier host. Entendamos el concepto de host como una máquina o servidor que proporciona recursos, servicios o alojamiento para aplicaciones, datos u otros elementos dentro de una red. Esta etapa comprende la configuración de variables de entorno para el servidor, la base de datos, servicios en la nube, etc.

**Empaquetado y distribución**: Aquí se encapsula el código de la aplicación en un formato que permita su distribución. Estos formatos pueden ser archivos binarios, bundles o contenedores de Docker, por ejemplo.

**Proceso de automatización**: Busca garantizar una implementación consistente y reproducible. Este proceso implica la ejecución automática de tareas por medio de herramientas como Jenkins, GitLab CI/CD, así como soluciones de contenedores con Docker Compose o Kubernetes.

**Plan de monitoreo**: Se realiza para validar la estabilidad y rendimiento de la aplicación, una vez se encuentra en entorno de producción.

Después del deployment inicial de una aplicación, es importante estar preparados para revertir o actualizar su versión en caso de ocurrir fallas o simplemente agregar nuevas funcionalidades. Esto puede ser un reto bastante grande que enfrentar.

> Sin embargo, existen múltiples estrategias que nos pueden ayudar a que este proceso sea lo más fluido posible.

### Estrategias avanzadas de implementación para garantizar la disponibilidad continua del servicio

Cuando lanzamos nuevas versiones de una aplicación o sumamos arreglos(fixes) para solucionar errores, es importante que el proceso se realice de forma controlada y segura. Al ser una aplicación en producción, no contamos con la facilidad de detener el servidor y realizar los ajustes necesarios, tal como lo hacemos en un entorno de desarrollo. Para asegurar que este proceso se realice de manera correcta, existen estrategias enfocadas en minimizar el impacto en los usuarios finales, así como los riesgos asociados a los cambios en la aplicación.

<mark>Algunas de las más comunes son</mark>:

- Estrategia Blue-Green(Azul-verde): En esta estrategia se mantienen dos entornos idénticos de producción: el **Azul** y el **Verde**. La idea general, es que uno de ellos (**entorno Azul**) se utilice para controlar el tráfico regular de la aplicación, mientras se implementan los cambios necesarios en el entorno de control (**entorno Verde**). Una vez se completan y validan los cambios, así como la estabilidad y eficiencia en el entorno de control, se redirige el tráfico de la aplicación al entorno con la nueva versión y se invierte la clasificación para repetir la estrategia en futuros cambios. El entorno verde se convierte ahora en el entorno azul y viceversa.

**Esta estrategia tiene muchas ventajas**:

- Permite actualizaciones sin tiempo de inactividad por parte de los usuarios, y en caso de existir algún problema, es sencillo revertir los cambios (rollback) redirigiendo el tráfico al entorno anterior (azul).

- Docker es una de las herramientas que incluyen funcionalidades para facilitar la gestión y automatización del proceso, siguiendo esta estrategia.

![Deployment](/astro-doc-full-stack/images/henry/m4/clase13/deployment.webp)

- Estrategia Canario

Esta estrategia consiste en lanzar la nueva versión de una aplicación disponible para un conjunto de usuarios de control **(canarios)**.

- Estos hacen uso de ella y evalúan su **rendimiento y estabilidad** antes de redirigir al resto de usuarios de forma gradual. Esto permite monitorear de manera controlada el funcionamiento de la implementación, pues se limita el tráfico y se minimizan los errores.

Gracias a esta estrategia podemos detectar y mitigar problemas de manera segmentada y, en caso de no ser posible resolverlos, se puede redirigir al pequeño porcentaje de “canarios” a la última versión estable antes de realizar los cambios necesarios. De igual manera, esta estrategia puede ser implementada a través de Docker.

![Deployment](/astro-doc-full-stack/images/henry/m4/clase13/deployment2.webp)

## CI/CD y su importancia en la implementación continua y automatizada

Existen dos prácticas combinadas que se utilizan para automatizar y simplificar el proceso de desarrollo e implementación de software. Hablamos de **Continuous Integration (CI)** y **Continuous Deployment (CD)** que permiten mejorar la eficiencia tanto en el entorno de desarrollo como de producción.

En términos generales, la **Integración Continua (CI)** hace referencia a la técnica en la que los desarrolladores integran su trabajo en un repositorio compartido, a medida que escriben código. Cada integración se verifica inmediatamente a través de pruebas automatizadas y otras herramientas, para garantizar que el código integrado funcione de manera adecuada.

- El objetivo de CI es detectar y corregir los problemas de integración rápidamente, reduciendo el tiempo y los costos asociados con la resolución de errores en etapas posteriores del ciclo de desarrollo.

- El propósito fundamental de la integración continua es proporcionar a los desarrolladores una retroalimentación rápida y efectiva sobre su trabajo en relación con el resto del código de la aplicación.

El proceso de **CI** comienza cuando un desarrollador intenta fusionar (merge) el código de su rama local a la rama principal de un repositorio. Esta gestión se realiza por medio de una herramienta de control de versiones como Git, en una plataforma de repositorios como GitHub o GitLab y mediante una solicitud de cambios conocida como **"pull request"**.

Cuando se recibe un pull request, se activa un flujo de Integración Continua (CI Pipeline), que consiste en un proceso automatizado de compilación y pruebas para validar que el código pueda integrarse sin problemas en la rama principal.

- **Si se detectan anomalías o conflictos, se devuelven al desarrollador para su corrección.**

Si no hay errores, el **CI pipeline** prepara un "artefacto", que es el resultado de la integración del código una vez que se completan las pruebas correspondientes.

- **Este artefacto es el producto que se utilizará para implementar (deploy) la aplicación.**

Por otro lado, la Implementación **Continua (CD)** es una extensión de **CI** que se centra en automatizar el proceso de implementación del artefacto en diferentes entornos, como desarrollo y producción.

Con esta práctica, cada cambio confirmado en el repositorio de código puede desplegarse automáticamente en un entorno de producción, siempre y cuando se cumplan las validaciones definidas permitiendo que el proceso sea más rápido y seguro.

El **CI/CD** puede ser implementado en proyectos de Docker para mejorar la automatización y eficiencia del ciclo de vida de una aplicación. Los contenedores pueden ser integrados y evaluados de forma continua mediante herramientas como Jenkins, Gitlab, GitHub, etc., que permiten el trabajo conjunto de un equipo de desarrollo en un entorno controlado.

> **Al final, los cambios pueden pasar a la etapa de implementación una vez se cumplan las condiciones requeridas.**

Ahora que entendemos mejor el proceso de **deployment** así como algunas de sus diferentes estrategias y técnicas, podemos encarar el concepto de forma práctica realizando la implementación de nuestro proyecto de **Docker**.

## Implementación de un proyecto

## CI/CD en la práctica

Para desplegar una aplicación de **Docker** que pueda adherirse al **modelo de trabajo CI/CD** existen muchas alternativas. En esta ocasión, realizaremos el deployment de la imagen por medio de Github Actions.

Este servicio de GitHub nos permite definir y controlar el flujo de trabajo dentro de un repositorio, al mismo tiempo que se publica el **artefacto** resultante en la plataforma de **Docker Hub**.

La idea general de este proceso es que cada desarrollador dentro de un equipo de trabajo, desarrolle código de forma local, y realice pull requests a un repositorio remoto de **GitHub**.

Una vez aprobados los cambios en el repositorio, resueltos los conflictos y realizado el merge, utilizaremos la herramienta Actions de Github para automatizar el proceso de construcción, prueba y despliegue de la aplicación en **Docker Hub**.

> **Este mismo flujo se repetirá de manera constante y automática cada vez se generen cambios en el repositorio.**

![Deployment](/astro-doc-full-stack/images/henry/m4/clase13/deployment3.webp)

## Creación de un repositorio de GitHub

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

  img[alt="Testing2"] {
  max-width:  600px;
  margin: 0 auto;
  display: block;
  }
</style>
