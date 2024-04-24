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

Utilizando nuestra cuenta de Github creamos un repositorio. Lo llamaremos nest-demo, y vincularemos nuestro repositorio local con el de Github.

Le agregamos el .env.development al .gitignore que nos creó nest para no subir nuestras claves a Github.

```bash
# .gitignore

# Agregamos el .env.development
.env.development
```

```bash
git add .
git commit -m "First commit"
git remote add origin <repo-github>
git branch -M main
git push -u origin main
```

## Obtención de credenciales de Docker Hub

Vamos a dirigirnos a la página de **Docker Hub** (https://hub.docker.com/) donde tendremos que iniciar sesión o registrarnos si aún no lo hacemos. Una vez iniciada sesión, accedemos a nuestro perfil haciendo click en el botón de la esquina superior derecha, e ingresamos a **My Account**.

Aquí seleccionaremos la opción security y haremos click en el botón **New Access Token**.

Asignaremos un nombre o descripción a este **token**, preferiblemente relacionado a la aplicación, y haremos click en el botón **generate**.

Una vez definido el nombre veremos un **modal** con la información de nuestro token, tanto el usuario (el mismo que tu cuenta de Docker Hub) como el password.

> <mark>Este valor no puede ser visto nuevamente una vez que cerremos la ventana, así que lo ideal será guardarlo en algún lugar como el bloc de notas, por ejemplo.</mark>

## Configuración de variables secretas

Volvamos ahora al repositorio remoto de Github. Dentro de la página principal, hacemos click en la pestaña **Settings**. Dentro de la nueva ventana, nos dirigimos a la opción **Secrets and variables** y seleccionamos **Actions**.

Crearemos una variable llamada **DOCKERHUB_TOKEN** donde pegaremos el valor que acabamos de obtener de Docker Hub.

epetiremos este proceso para crear una segunda variable llamada **DOCKERHUB_USERNAME** que corresponderá ahora al usuario.

Esto es todo lo que necesitamos hacer por ahora. Nos centraremos ahora en ahondar un poco más en esta herramienta **Actions** y conocer el flujo de trabajo a implementar.

## Github Actions y creacion de un workflow

**GitHub Actions** es una característica que permite automatizar tareas dentro de un repositorio de GitHub. Con estas acciones, podemos crear flujos de trabajo personalizados que se activan automáticamente en respuesta a eventos específicos en los repositorios: confirmaciones de código, creación de pull requests, lanzamientos y más.

- Estos flujos de trabajo están definidos en archivos YAML dentro del repositorio, lo que permite definir versiones y gestionar el flujo de trabajo junto con el código de la aplicación.

> Cada flujo de trabajo puede contener una serie de pasos o tareas individuales que se ejecutan en un entorno específico, por ejemplo, un contenedor de Docker.

Ahora vamos a una Github Actions, que nos permitirá correr acciones automatizadas ante ciertos cambios en nuestro repositorio.

Dentro de nuestro repositorio nos dirigimos a Actions y seleccionamos **set up a workflow yourself**.

Este proceso creará el archivo /nest-demo/.github/workflows/main.yml. Aquí configuraremos las acciones a correr.

```yaml
name: deploy

on:
  push:
    branches:
      - 'main'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/pm4-ecommerce:latest
```

Presionamos Commit changes y al acceder nuevamente en Actions veremos que se está ejecutando la acción.

Ahora, en Dokerhub tendremos la imagen generada.

### Verificación de la imagen

Para probar nuestra imgagen podemos crear una carpeta en local que solo contendrá dos archivos: <code>docker-compose.yml</code> y <code>.env.development</code>

```bash
# Creamos el directorio
mkdir pm4-ecommerce-from-image
cd pm4-ecommerce-from-image

# Creamos los dos archivos
touch docker-compose.yml
touch .env.development

# Abrimos VSCode en el proyecto
code .
```

En lugar de compilar una imagen localmente con build: ./, llamaremos a la imagen que subimos a dokerhub (image: jourdanmau/nest-demo:latest).

```yaml
# docker-compose.yml
version: '3.8'

services:
  nestapp:
    image: jourdanmau/nest-demo:latest
    ports:
      - '3001:3000'
    env_file:
      - .env.development
    depends_on:
      - postgresdb

  postgresdb:
    image: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    env_file:
      - .env.development

  pgadmin:
    image: dpage/pgadmin4
    env_file:
      - .env.development
    ports:
      - '5050:80'

volumes:
  pgdata:
```

El archivo .env.devepment posee la mismas estructura que para la instalación local, con excepción de la **vasriable DB_HOST que debemos setearla en postgresdb**

Como vemos en el archivo docker-compose.yml, se crean tres contenedores:

- **nestapp**: contine la imagen de la aplicación alojada en dockerhub (jourdanmau/pm4-ecommerce:latest)

- **postgresdb**: imagen de la base de datos postgres

- **pgadmin**: imagen de pgadmin (interfaz gráfica para gestinar bases de datos)

```bash
# Listamos los contenedores existes
docker container ls -a
# Eliminamos los contenedores
docker rm --force <CONTAINER ID> ... <CONTAINER ID>
# Listamos las imágenes
docker images -a
# Eliminamos las imágenes
docker rmi <IMAGE ID> ... <IMAGE ID>
```

```bash
# Levantamos los contedores
docker compose up -d
```

De esta manera, podemos ver la base de datos a través de pgadmin en la url: http://localhost:5050

Para configurar el servidor debemos utilizar las siguientes variables de entorno:

- Nombre: App-Docker
- Nombre/Dirección del servidor: postgresdb
- Puerto: DB_PORT
- Base de datos de mantenimiento: DB_NAME
- Nombre de usuario: DB_USERNAME
- Contraseña: DB_PASSWORD

Ya podemos utilizar nuestra API en http://localhost:3001

Cabe resaltar, que estamos utilizando aún la imagen para inicializar una aplicación con compose dentro de nuestro entorno local. Pero, **¿cómo podemos cambiarla a un entorno de producción?** Finalicemos esta sesión hablando sobre el deploy de nuestra app.

## Despliegue de aplicaciones con Render

## Despliegue de base de datos

Existen muchas herramientas que nos permiten realizar el despliegue de aplicaciones para que estas puedan ser utilizadas de manera remota. Entre las más utilizadas encontramos AWS, Azure, Google Cloud, etc.

Estas plataformas están especialmente diseñadas para trabajar con tráfico de datos muy altos, así como algunas otras características que simplifican el mantenimiento y monitoreo de los entornos de producción de las aplicaciones.

Por desgracia, la mayoría de ellas son pagas o la versión gratuita solicita que el usuario cuente con una tarjeta de crédito registrada para acceder al servicio.

> <mark>Por suerte existen algunas plataformas gratuitas que pueden ser de mucha utilidad para trabajar con aplicaciones pequeñas. Una de ellas es Render.</mark>

Vamos a hacer el deployment de nuestra aplicación utilizando esta herramienta. Al crear una cuenta, Render nos dará acceso a un panel de control donde podemos elegir el tipo de aplicación que deseamos construir.

- Nuestro primer objetivo es crear una base de datos que se encuentre asociada al entorno de producción, ya que actualmente trabajamos con una DB de forma local cada vez que se construye el contenedor.

- Esto significa que si múltiples usuarios utilizan la aplicación actualmente haciendo uso de compose, cada uno trabajará con su propia base de datos independiente. .

- Por ende, es necesario contar con una base de datos pública que permita que todos los usuarios trabajen de manera centralizada.

Render nos permite crear y desplegar bases de datos que pueden ser asociadas a un entorno de producción. Vamos a dirigirnos al botón **New** dentro de nuestro dashboard donde seleccionaremos la opción **postgreSQL** para crear una base de datos.

En la ventana de creación asignaremos el nombre de esta instancia de **Postgres**, el usuario y el nombre de la base de datos (este último dato debe coincidir con el que usas en el proyecto) El resto de los campos podemos dejarlos con los valores por default.

Una vez seleccionado el plan gratuito haremos click en **Create Database**.

Esto nos dirigirá al panel de control de la base de datos. Allí dentro vamos a la sección **Access Control** donde haremos click en la opción **Add source**.

Elegimos utilizar nuestra dirección IP como punto de acceso y además dejaremos activo el acceso que se encuentra predefinido. Este admitirá la conexión a la DB desde cualquier ubicación.

Una vez hecho esto, vamos a habilitar la sección **Connections** donde encontraremos las credenciales de acceso a la base de datos.

Como debes imaginar, estos sustituyen algunos de los datos que tenemos configurados actualmente en el proyecto.

## Despliegue de aplicación

Ahora que tenemos configurada la base de datos, realicemos un pequeño cambio dentro del proyecto con el fin de utilizar los valores mencionados anteriormente.

Subiremos nuestra imagen a Render para que se conecte a esta base de datos.

Recordemos que creamos los archivos de configuración de acciones en Github por lo que antes de comenzar debemos realizar:

```bash
git pull
```

Dentro de render realizamos **New / Web Service**

Podemos contruir la app desde nuestro repo Github, pero lo construiremos desde Dockerhub.

"Deploy an existing image from a registry" <br>
"Pull a public image from any registry or a private image from docker Hub, or GitLab"

Configuramos:

- Image URL: jourdanmau/nest-demo:latest

- Next

- Name: dejamos el por defecto

- Seleccionamos la opción gratuita

**Debemos agregar las variables de entorno**

- Add from .env

- Pegamos el contenido de nuestro archivo **.env.development**

- Debemos modificar el DB_HOST, el DB_PASSWORD, DB_NAME y DB_USERNAME por el que nos brindó Render al momento de crear la base de datos

- Create Web Service

Ahora tenemos nuestra API desplega en la URL que nos entrega Render.

Ten en cuenta que algunos de los servicios no estarán disponibles para la aplicación y que el servicio se encuentra limitado a los alcances de la versión gratuita.

**<mark>¡Felicidades has logrado hacer el Deployment de una aplicación de backend con Render y Docker!</mark>**

## Cierre

Durante esta clase, hemos explorado el proceso de despliegue, abordando desde la creación de repositorios en GitHub hasta la obtención de credenciales en Docker Hub.

Hemos profundizado en estrategias avanzadas de implementación, comprendiendo la importancia de la Integración Continua y Despliegue Continuo (CI/CD) para lograr una implementación continua y automatizada sobre nuestros proyectos.

A través de la práctica, hemos adquirido habilidades para configurar variables secretas en nuestros repositorios, conocimos las principales funcionalidades de GitHub Actions para la creación de workflows automatizados y, finalmente, hemos llevado a cabo el despliegue integral, abarcando tanto la base de datos como la aplicación en sí.

Este recorrido completo nos ha proporcionado las herramientas y conocimientos necesarios para ejecutar despliegues eficientes y automatizados, optimizando así el ciclo de desarrollo de principio a fin.

## Homework

### ACTIVIDAD 01

Conectar el repositorio de github a una plataforma de deployment para que tanto la API como la DB sean accesibles desde cualquier ubicación.

### ACTIVIDAD 02

El deployment debe ser realizado desde una imagen de docker, puedes elegir cualquier plataforma de tu elección.

**TIPs ¡Bien hecho!**

- Te recomendamos utilizar Render ya que simplifica mucho el proceso y es una plataforma gratuita.

**[Requisitos]**

- Este es un hito extra credit.

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
