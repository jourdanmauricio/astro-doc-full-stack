---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Fundamentos de Docker
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/docker/back.jpg',
    alt: Logo cloudflare',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/docker/icon.webp',
    alt: 'Logo Nest js',
  }
description: Docker
draft: false
category: Docker
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


## Introducción

### Que es Docker?

Docker es una plataforma de código abierto que automatiza el despliegue de aplicaciones dentro de contenedores. Un contenedor es una unidad ligera y portátil que incluye todo lo necesario para ejecutar una aplicación, como el código, las bibliotecas y las dependencias. Docker facilita la creación, distribución y ejecución de aplicaciones en entornos consistentes y aislados. Esto mejora la eficiencia del desarrollo y la implementación, ya que las aplicaciones empacadas en contenedores pueden ejecutarse de manera consistente en cualquier entorno que admita Docker.

### ¿Qué es un contenedor?

Un contenedor es una unidad ligera y portátil que incluye todo lo necesario para ejecutar una aplicación, haciéndola consistente y fácil de mover entre diferentes entornos. Son eficientes en recursos y proporcionan aislamiento para evitar conflictos entre aplicaciones

### Conceptos 

Los siguientes conceptos son diferentes aunque en una aplicación real pueden usarse todos para desplegar tus aplicaciones:

- Microservicios: Son una forma de diseñar y construir aplicaciones que promueve la modularidad, la independencia, la escalabilidad y la flexibilidad

- Kubernetes: Es una herramienta poderosa para la gestión de contenedores y aplicaciones, que proporciona capacidades avanzadas de automatización, escalabilidad y gestión de recursos.

- Docker: Es una herramienta que te permite gestionar y publicar contenedores.

- Contenedores: Permiten que cualquier persona ejecute tu aplicación en su dispositivo sin importar el sistema operativo, el lenguaje de programación, etc.

### Por Qué Deberías Aprender Docker
1. **Portabilidad** Docker encapsula aplicaciones y sus dependencias en contenedores, haciendo que puedan ejecutarse de manera consistente en cualquier entorno, ya sea en desarrollo, pruebas o producción.

2. **Eficiencia de Recursos** Los contenedores de Docker comparten el mismo sistema operativo host, lo que resulta en un uso más eficiente de los recursos comparado con las máquinas virtuales tradicionales.

3. **Escalabilidad** Docker facilita la escalabilidad de aplicaciones al permitir la creación rápida y eficiente de múltiples instancias de contenedores, lo cual es esencial para aplicaciones modernas y microservicios.

4. **Integración Continua y Despliegue Continuo (CI/CD)** Docker se integra perfectamente con herramientas de CI/CD, permitiendo la automatización del proceso de construcción, prueba y despliegue de aplicaciones.

5. **Consistencia del Entorno de Desarrollo** Con Docker, puedes garantizar que el entorno de desarrollo sea idéntico al de producción, eliminando problemas relacionados con "funciona en mi máquina".

6. **Aislamiento** Cada contenedor opera de manera aislada, lo que mejora la seguridad y reduce los conflictos entre aplicaciones y sus dependencias.

7. **Facilidad de Gestión** Docker permite gestionar y orquestar contenedores de manera sencilla utilizando herramientas como Docker Compose para definir y ejecutar aplicaciones multi-contenedor.

8. **Amplia Adopción en la Industria** Docker se ha convertido en un estándar en la industria para la entrega y gestión de aplicaciones, lo que significa que su conocimiento es altamente valorado y demandado en el mercado laboral.

9. **Documentación y Comunidad** Docker cuenta con una extensa documentación y una comunidad activa que facilita el aprendizaje y la resolución de problemas.

10. **Compatibilidad con Tecnologías Modernas** Docker se integra bien con tecnologías modernas como Kubernetes para la orquestación de contenedores, facilitando la creación de entornos de nube nativa.

Aprender Docker te permitirá desarrollar, desplegar y gestionar aplicaciones de manera más eficiente, consistente y escalable, alineándote con las prácticas modernas de desarrollo y operaciones en la industria.

## Diferencia entre Máquinas Virtuales, Contenedores y Servicios

### Máquinas Virtuales (VM)

**Aislamiento**: Las VMs proporcionan un aislamiento completo, ya que ejecutan un sistema operativo completo independiente del host.

**Recurso Intensivo**: Las VMs pueden consumir más recursos, porque cada una tiene su propio sistema operativo y una cantidad significativa de recursos dedicados.
Arranque Más Lento: El arranque de una VM es más lento, puesto que implica iniciar un sistema operativo completo.

**Hypervisor**: Las VMs se ejecutan en un hipervisor, que gestiona y asigna recursos para cada máquina virtual.

### Contenedores

**Aislamiento Ligero**: Los contenedores comparten el mismo kernel del sistema operativo del host, lo que proporciona un aislamiento más ligero.

**Eficiencia de Recursos**: Los contenedores son más eficientes en términos de recursos, ya que comparten el mismo sistema operativo y solo incluyen las bibliotecas y dependencias necesarias.

**Arranque Rápido**: Los contenedores tienen un arranque rápido, por el hecho de que no requieren iniciar un sistema operativo completo.

**Docker, Containerd, etc.**: Docker es una de las tecnologías de contenedores más populares, y otras implementaciones incluyen containerd, rkt, etc.

## Conociendo Docker CLI

Docker posee pocos comandos, quizás 30. Pero cada comando tiene muchos parámetros.

### Comandos generales
```sh
# Version 
docker --version

# para ver toda la documentación de docker
docker --help

# Informacion sobre recursos
docker --info

# Eliminar las imágenes, los contenedores, los volúmenes y las redes sin utilizar o pendientes.
docker system prune

# Para eliminar adicionalmente los contenedores detenidos y todas las imágenes no utilizadas (no solo aquellas pendientes), añada el indicador -a al comando:
docker system prune -a
```

### Comandos para imagenes

```sh
# Listar imágenes locales
docker images

# Ayuda para el comando images
docker images --help

# Construir una imagen a partir de un archivo Dockerfile
docker build -t <nombre_de_imagen>

# Construir una imagen desde un archivo Dockerfile sin la caché
docker build -t <nombre_de_imagen> . -no-cache

# Eliminar una imagen
docker rmi <nombre_imagen>

# Eliminar todas las imágenes no utilizadas
docker image prune
```

### Comandos para contenedores

```sh
# Para listar los contenedores actualmente en ejecución:
docker ps

# Listar todos los contenedores docker (en ejecución y parados):
docker ps --all

# Crea y ejecuta un contenedor a partir de una imagen, con un nombre personalizado:
docker run --name <nombre_contenedor> <nombre_imagen>

# Ejecutar un contenedor con y publicar un puerto(s) del contenedor al host.
docker run -p <puerto_host>:<puerto_contenedor> <nombre_imagen>

# Ejecutar un contenedor en segundo plano
docker run -d <nombre_imagen>

# Iniciar o detener un contenedor existente:
docker start|stop <nombre_del_contenedor> (o <id_del_contenedor>)

# Eliminar un contenedor detenido:
docker rm <nombre_del_contenedor>

# Abrir un shell dentro de un contenedor en ejecución:
docker exec -it <nombre_del_contenedor> sh

# Obtener y seguir los logs de un contenedor:
docker logs -f <nombre_contenedor>

# Inspeccionar un contenedor en ejecución:
docker inspect <nombre_del_contenedor> (o <id_del_contenedor>)

# Ver las estadísticas de uso de recursos
docker container stats
```

## Mi primera imagen de Docker

### Flujo de trabajo para pasar de un archivo de docker a un contenedor

Aplicando el comando Build a un Dockerfile logramos una Docker Image que contiene todo compactado para poder desplegarlo. Para desplegarlo y generar un contendor se utiliza el comando Run.

```sh
                Build                         Run
Dockerfile --------------> Docker image --------------> Docker container
```

### Ejemplo

Desplegaremos un servidor Web buscando una imagen de nginx (basada en linux) en docker hub (https://hub.docker.com/). Creamos un directorio con un archivo html.

```html
<!-- /ejemplo_docker/sitio/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  Holas
</body>
</html>
```

```yaml
# /ejemplo_docker/Dockerfile 
FROM nginx:latest

# Path: /usr/share/nginx/html
COPY /sitio /usr/share/nginx/html  
```

## Creación de imágenes con Dockerfile

A partir del Dockerfile crearemos la imgen que luego podremos compartir.

```sh
docker build .
```
Docker realizará 2 pasos. Primero, si no tenemos la imagen de nginx en local, la descargará de Nginx desde Docker hub. Luego, realizará la copia de los archivos desde /sitio /usr/share/nginx/html.

Podemos ver la imagen generada a través del comando

```sh
docker images
#REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
#<none>       <none>    75598aa610c3   6 seconds ago   188MB
```
Como vemos en Repository y en tag nos aparece none, si muestra el ID la fecha de creación y el tamaño de la imagen.

Vamos a eliminar la imagen y generarla nuevamente pero con un nombre.

```sh
# Elinamos la imagen por su ID
docker rmi -f 75598aa610c3
# Deleted: sha256:75598aa610c3bed6cb04cc94550e5597ca088af89726d137cab94e377b9a3e39

# Creamos la imagen con un nombre (tag)
docker build -t sitioweb:latest .

docker images
# REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
# sitioweb     latest    75598aa610c3   5 minutes ago   188MB
```
Colocamos el tag latest para indicar que es la última versión pero podemos crear distintas imagenes del mismo sitio web.

## De mi imagen a un contenedor usando CLI

Ejecutando el comando Run lanzaremos el contedor.

```sh
docker run -it --rm -d -p 8080:80 --name web sitioweb

# -it: interactivo -> nos permitira ver los logs
# --rm: remove -> elimina cualquier versión del contenedor ejecutandose previamente
# -d: detach -> el contenedor se ejecutará en segundo plano
# -p: port -> define el puerto que utilizaremos para comunicarnos con el host. En este caso utilizaremos el 8080 para comunicarnos con el host y el host utilizar el 80 para comunicarse con la aplicación
# --name: name -> nombre que le daremos al contendor

docker ps
#CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS          PORTS                                   NAMES
#2da6ae2ea037   sitioweb   "/docker-entrypoint.…"   22 seconds ago   Up 21 seconds   0.0.0.0:8080->80/tcp, :::8080->80/tcp   web
```
Ahora podemos ver la app en el navegador http://localhost:8080

## Administrar mis imágenes de Docker

Para crear una imagen con un tag en particular ejecutamos

```sh
docker build -t sitioweb2:v1 .

docker images
# REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
# sitioweb2    v1        75598aa610c3   23 minutes ago   188MB
# sitioweb     latest    75598aa610c3   23 minutes ago   188MB
```

Así podemos discriminar imagenes a través de versiones, pero vemos que el Id es el mismo porque solo hemos utilizado la misma imagen (viene del mismo Dockerfile) con tags diferentes.

Cuando tenemos gran cantidad de images se hace complicado listarlas. 

```sh
docker images sitioweb
# REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
# sitioweb     latest    75598aa610c3   26 minutes ago   188MB

docker images --filter=reference='*:v1'
# REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
# sitioweb2    v1        75598aa610c3   28 minutes ago   188MB
```
Podemos actualizar el tag de alguna imagen previamente generada.

```sh
docker image tags sitioweb:latest admin/sitioweb:latest
```

## Administrar mis contenedores de Docker

```sh
# Creamos un contenedor
docker run -it --rm -d -p 8080:80 --name web sitioweb
# Para crear un segundo contenedor, modificamos puerto y nombre
docker run -it --rm -d -p 8081:80 --name web2 sitioweb

# Lista los contenedores
docker ps
# CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                                   NAMES
#82cda2c9bbd1   sitioweb   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   web2
#2da6ae2ea037   sitioweb   "/docker-entrypoint.…"   2 hours ago     Up 2 hours     0.0.0.0:8080->80/tcp, :::8080->80/tcp   web

docker ps --size
#CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                                   NAMES     SIZE
#82cda2c9bbd1   sitioweb   "/docker-entrypoint.…"   5 minutes ago   Up 5 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   web2      1.09kB (virtual 188MB)
#2da6ae2ea037   sitioweb   "/docker-entrypoint.…"   2 hours ago     Up 2 hours     0.0.0.0:8080->80/tcp, :::8080->80/tcp   web       1.09kB (virtual 188MB)
```

A diferencia de las imagenes cada instancia de un contenedor sin importar su origen es diferente. 

Para detener contenedores se utiliza docker stop

```bash
docker stop 2da6ae2ea037
# 2da6ae2ea037

docker ps
# CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                                   NAMES
# 82cda2c9bbd1   sitioweb   "/docker-entrypoint.…"   8 minutes ago   Up 8 minutes   0.0.0.0:8081->80/tcp, :::8081->80/tcp   web2
```

También podemos ver cuántos recursos está consumiendo un contenedor

```sh
docker stats
#CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                                   NAMES     SIZE
#CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT   MEM %     NET I/O       BLOCK I/O         PIDS
#82cda2c9bbd1   web2      0.00%     11MiB / 15.41GiB    0.07%     11.7kB / 0B   1.04MB / 12.3kB   13
```

## Mejorando mi Dockefile

Veamos un ejemplo de backend con python (Flask). Creamos un nuevo proyecto con 3 archivos:

```sh
# /back/requetiments.txt

Flask==3.0.0
waitress==2.0.0
```

```sh
# /back/Dockerfile

# Utilizamos la imagen base python:3.12
FROM python:3.12-alpine3.17

# Creamos un directorio de trabajo
WORKDIR /app

# Copiamos las dependecias
COPY requirements.txt requirements.txt
# Instalamos las dependencias
RUN pip install -r requirements.txt

# Copiamos el resto de archivos del proyecto
COPY . .

# Ejecutamos el proyecyto: python -m flask run --host=0.0.0.0
CMD [ "python", "-m", "flask", "run", "--host=0.0.0.0" ]
```

```py
# /back/app.py

import json
from flask import Flask
app = Flask(__name__)

@app.route('/getMyInfo')
def getMyInfo():
  value = {
      "name": "Amin",
      "lastname": "Espinoza",
      "socialMedia":
      [
          {"facebookUser": "aminespinoza10"},
          {"instagramUser": "aminespinoza10"},
          {"xUser": "aminespinoza"},
          {"linkedin": "amin-espinoza"},
          {"githubUser": "aminespinoza10"}
      ],
      "blog": "https://aminespinoza.com",
      "author": "Miranda Espinoza"
  }
  return json.dumps(value)
```

Como vemos solo posee un endpoint en la ruta /getMyInfo

## Configurar volúmenes básicos en Docker

Los volúmenes son el mecanismo preferido para la persistencia de los datos generados y utilizados por los contenedores Docker. se trata de una unidad de disco compartida, un puente de comunicación de datos entre el contenedor y el equipo local.

Ejemplos: 
- Podemos modificar el código de una app y que se refleje en el contenedor que se encuentra en ejecución
- Incorporar volúmenes de datos para el caso de análisis de datos

Para ejemplificar el uso de volumenes utilizaremos el contendor con la imagen de nginx. Creamos un directorio llamado assets dentro del directorio sitio y colocamos 2 imagenes.

Para levantar el contenedor ejecutamos el siguiente comando. Es idéntico al que ejecutamos anteriormente, pero configuramos el volumen indicando que el directorio local /sitio se vincule al directorio del contenedor /usr/share/nginx/html/sitio

```sh
docker run -it --rm -d -p 8080:80 -v ./sitio:/usr/share/nginx/html/sitio --name web nginx 

docker ps
# CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                   NAMES
# b883f61075d1   nginx     "/docker-entrypoint.…"   37 seconds ago   Up 36 seconds   0.0.0.0:8080->80/tcp, :::8080->80/tcp   web
```

Vemos el sitio en http://localhost:8080/sitio/

Ahora incorporamos una de las imágenes al html.

```html
<!-- /ejemplo_docker/sitio/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  Holas
  <img src="/sitio/assets/hermes5.jpg" alt="hermes" width="150px" height="150px" />
</body>
</html>
```

Esto muestra que desde el entorno local podemos actualizar el contenedor.

<mark>**Configuración:** en lugar de realizar la configuración del volumen al momento de lanzar el contenedor (docker run), podemos setearlo en el Dockerfile. La diferencia entre crear un volumen y copiar la información, es que la información quedará guardada en forma permanente en la imagen de docker. En el caso del volumen la información será susceptible a cambios</mark> Hay escenarios para las dos alternativas. Si deseamos generar nuevo contenido en la web utilizamos un volumen, en el caso de tener una App estática que no actualizamos utilizamos COPY. En este caso, si desemos modificar el proyecto debemos regenerar la imagen.

```sh
# /Dockerfile
FROM nginx:latest

COPY /sitio /usr/share/nginx/html  

VOLUME [ "/sitio", "/usr/share/nginx/html" ]
```

## Configurar redes básicas en Docker

Las redes en docker nos abren un sinfin de posibilidades. Para ver como utilizarlas continuamos con el ejemplo.

Lanzamos el contenedor con el siguiente comando:

```sh
docker run -it --rm -d -p 8080:80 --name web nginx 

# Realizamos un inspect del contenedor
docker inspect web

# [
#     {
#         "Id": "f62f154e8ab648f4f3323cad25f103b75a0bbb9762001f04853ff91e08d4e300",
#         "Created": "2024-06-27T07:40:28.827140287Z",
#         "Path": "/docker-entrypoint.sh",
#         "Args": [
#             "nginx",
#             "-g",
#             "daemon off;"
#         ],
#         "State": {
#             "Status": "running",
#             "Running": true,
#             "Paused": false,
#             "Restarting": false,
#             "OOMKilled": false,
#             "Dead": false,
#             "Pid": 441114,
#             "ExitCode": 0,
#             "Error": "",
#             "StartedAt": "2024-06-27T07:40:29.142374887Z",
#             "FinishedAt": "0001-01-01T00:00:00Z"
#         },
#         "Image": "sha256:e0c9858e10ed8be697dc2809db78c57357ffc82de88c69a3dee5d148354679ef",
#
#         ... 
#
#         "NetworkSettings": {
#             "Bridge": "",
#             "SandboxID": "9d79555f576f188e14c744fd0b16dc3dd1389d23649cad170bdf61d659a0b1b4",
#             "SandboxKey": "/var/run/docker/netns/9d79555f576f",
#             "Ports": {
#                 "80/tcp": [
#                     {
#                         "HostIp": "0.0.0.0",
#                         "HostPort": "8080"
#                     },
#                     {
#                         "HostIp": "::",
#                         "HostPort": "8080"
#                     }
#                 ]
#             },
#             "HairpinMode": false,
#             "LinkLocalIPv6Address": "",
#             "LinkLocalIPv6PrefixLen": 0,
#             "SecondaryIPAddresses": null,
#             "SecondaryIPv6Addresses": null,
#             "EndpointID": "72db166b99ab63031a629e54caf88f7c9547c4c73880f95f8e261957529ca50f",
#             "Gateway": "172.17.0.1",
#             "GlobalIPv6Address": "",
#             "GlobalIPv6PrefixLen": 0,
#             "IPAddress": "172.17.0.2",
#             "IPPrefixLen": 16,
#             "IPv6Gateway": "",
#             "MacAddress": "02:42:ac:11:00:02",
#             "Networks": {
#                 "bridge": {
#                     "IPAMConfig": null,
#                     "Links": null,
#                     "Aliases": null,
#                     "MacAddress": "02:42:ac:11:00:02",
#                     "NetworkID": "0759c1f9dd9802f654a2ae58e4cfffc929f6d6c2be9bba13361179aabe767d2e",
#                     "EndpointID": "72db166b99ab63031a629e54caf88f7c9547c4c73880f95f8e261957529ca50f",
#                     "Gateway": "172.17.0.1",
#                     "IPAddress": "172.17.0.2",
#                     "IPPrefixLen": 16,
#                     "IPv6Gateway": "",
#                     "GlobalIPv6Address": "",
#                     "GlobalIPv6PrefixLen": 0,
#                     "DriverOpts": null,
#                     "DNSNames": null
#                 }
#             }
#         }
#     }
# ]
```

Sobre el final vemos la configuración de **Networks**. Allí se encuentra la opción **bridge** (puente) que contiene la configuración de la red y de la IP del contenedor. También en **Ports** se encuentra al definición de puertos que realizamos.

Sabiendo como realizar el inspect de los contenedores podemos realizar cambios y ver cómo se reflejan.

Si deseamos asignar un IP específica al contenedor podemos ejecutarlo de la siguiente manera:


```sh
docker stop <ID>

docker run -it --rm -d -p 127.0.0.1:8080:80 --name web nginx 
docker inspect web

# [
#     {
#         "Id": "313af59f8e36678f254fdeb2ce7b26cd04d0e2d8a9d9805cf0545b54f5873278",
#         "Created": "2024-06-27T07:49:58.455464143Z",
#         "Path": "/docker-entrypoint.sh",
#         "Args": [
#             "nginx",
#             "-g",
#             "daemon off;"
#         ],
#         "State": {
#             "Status": "running",
#             "Running": true,
#             "Paused": false,
#             "Restarting": false,
#             "OOMKilled": false,
#             "Dead": false,
#             "Pid": 441849,
#             "ExitCode": 0,
#             "Error": "",
#             "StartedAt": "2024-06-27T07:49:58.77406223Z",
#             "FinishedAt": "0001-01-01T00:00:00Z"
#         },
#         "Image": "sha256:e0c9858e10ed8be697dc2809db78c57357ffc82de88c69a3dee5d148354679ef",
#         
#         ...
# 
#         "NetworkSettings": {
#             "Bridge": "",
#             "SandboxID": "8c8b13a5e5d3401f8e2f1fd31ab4fcf2c5697b9fd100de71bfb7c353140ee739",
#             "SandboxKey": "/var/run/docker/netns/8c8b13a5e5d3",
#             "Ports": {
#                 "80/tcp": [
#                     {
#                         "HostIp": "127.0.0.1",
#                         "HostPort": "8080"
#                     }
#                 ]
#             },
#             "HairpinMode": false,
#             "LinkLocalIPv6Address": "",
#             "LinkLocalIPv6PrefixLen": 0,
#             "SecondaryIPAddresses": null,
#             "SecondaryIPv6Addresses": null,
#             "EndpointID": "60aa6c92e1a0f855ecfd6e2bae5dc54cf86c3e09aee17c3471d1672115bc522f",
#             "Gateway": "172.17.0.1",
#             "GlobalIPv6Address": "",
#             "GlobalIPv6PrefixLen": 0,
#             "IPAddress": "172.17.0.2",
#             "IPPrefixLen": 16,
#             "IPv6Gateway": "",
#             "MacAddress": "02:42:ac:11:00:02",
#             "Networks": {
#                 "bridge": {
#                     "IPAMConfig": null,
#                     "Links": null,
#                     "Aliases": null,
#                     "MacAddress": "02:42:ac:11:00:02",
#                     "NetworkID": "0759c1f9dd9802f654a2ae58e4cfffc929f6d6c2be9bba13361179aabe767d2e",
#                     "EndpointID": "60aa6c92e1a0f855ecfd6e2bae5dc54cf86c3e09aee17c3471d1672115bc522f",
#                     "Gateway": "172.17.0.1",
#                     "IPAddress": "172.17.0.2",
#                     "IPPrefixLen": 16,
#                     "IPv6Gateway": "",
#                     "GlobalIPv6Address": "",
#                     "GlobalIPv6PrefixLen": 0,
#                     "DriverOpts": null,
#                     "DNSNames": null
#                 }
#             }
#         }
#     }
# ]

```

Como vemos en la sección Ports se vé reflejado la IP que asignamos.

Exploramos las redes docker.

```sh
docker network ls
# NETWORK ID     NAME      DRIVER    SCOPE
# 0759c1f9dd98   bridge    bridge    local
# c0ce8666688b   host      host      local
# 5f031384b0d2   none      null      local
```

- **Bridge**: que es la que se utiliza por defecto en los contenedores.
- **host**: nos permite establecer la comunicación entre dos contendores que no quieran tener comunicación con el resto de contendores.
- **none**: nos permite dejar el contenedor completamente aislado. No se comunicará por red.


```sh
# Creamos una red
#docker network create <nombre_de_red>
docker network create lumau

docker network ls
# NETWORK ID     NAME      DRIVER    SCOPE
# 0759c1f9dd98   bridge    bridge    local
# c0ce8666688b   host      host      local
# 7d16b0796212   lumau     bridge    local
# 5f031384b0d2   none      null      local
```

<mark>Ahora tenemos una nueva red personalizada donde colocar nuestros contenedores.</mak>

**Estos conceptos son clave, porque podemos configurar las redes y contendores para que cadacontendor acceda a los que estrictamente necesitan acceder e impedimos la comunicación al resto.**

## ¡Mi primera imagen en Docker Hub!

Docker Hub bos permite publicar imágenes para que otras personas puedan descargarlas y lanzarlas en contenedores.

1- Debemos tener una cuenta creada en Docker Hub.

2- Ejecutamos: 

```sh
docker login
# Log in with your Docker ID or email address to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com/ to create one.
# You can log in with your password or a Personal Access Token (PAT). Using a limited-scope PAT grants better security and is required for organizations using SSO. Learn more at https://docs.docker.com/go/access-tokens/
# 
# Username: jourdanmau
# Password: 
# WARNING! Your password will be stored unencrypted in /home/mauricio/.docker/config.json.
# Configure a credential helper to remove this warning. See
# https://docs.docker.com/engine/reference/commandline/login/#credentials-store
# 
# Login Succeeded
```
3- Preparando la imgagen. Para desplegar en Docker Hub debemos realizar el buils colocando nuestro nombre de usuario.

```sh
# docker build -t <nombre_user>/<nombre_imagen> .
docker build -t jourdanmau/ejemploweb:latest .

docker images
# REPOSITORY              TAG       IMAGE ID       CREATED          SIZE
# jourdanmau/ejemploweb   latest    42994243d9f6   52 minutes ago   188MB
# sitioweb                latest    42994243d9f6   52 minutes ago   188MB
# sitioweb2               v1        75598aa610c3   18 hours ago     188MB
# nginx                   latest    e0c9858e10ed   6 days ago       188MB
```

4- Pusheamos la imagen

```sh
docker push jourdanmau/ejemploweb:latest
```
5- Descargar la imagen

```sh
# Eliminamos las imagnes locales
# detemenos todos los contenedores
docker stop <id>
# Eliminamos las imagenes
docker rmi -f sitioweb sitioweb2 nginx jourdanmau/ejemploweb

# Ejecutamos docker run referenciando a la imagen de docker hub

docker run -it --rm -d -p 8080:80 --name ejemploweb jourdanmau/ejemploweb:latest
# Unable to find image 'jourdanmau/ejemploweb:latest' locally
# latest: Pulling from jourdanmau/ejemploweb
# 2cc3ae149d28: Already exists 
# 1018f2b8dba8: Already exists 
# b831e78d8e20: Already exists 
# 3ab22521e919: Already exists 
# 5112bf42775b: Already exists 
# cbdaf9e4ee2d: Already exists 
# a06b6fd631e8: Already exists 
# c508daf01ba1: Already exists 
# Digest: sha256:2c470ebef6565d395673863e86b08bbe94ead57d85b6c275220943f6eb8d9079
# Status: Downloaded newer image for jourdanmau/ejemploweb:latest
# e56558025a4a7a17e2d5c188fff1829977dc58a94eabb58342fc4bfac3a2485f
```
Docker buscará la imagen localmente y si no la encuentra la bajará de Docker Hub

Ya podemos ver la App en ejecución: http://localhost:8080/index.html

## Inspección y capas de un contenedor

```sh
# ejecutamos sin -d (detach) y abrimos una nueva terminal
docker run -it --rm -p 8080:80 --name ejemploweb jourdanmau/ejemploweb:latest
# /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
# /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
# /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
# 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
# 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
# /docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
# /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
# /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
# /docker-entrypoint.sh: Configuration complete; ready for start up
# 2024/06/27 08:40:40 [notice] 1#1: using the "epoll" event method
# 2024/06/27 08:40:40 [notice] 1#1: nginx/1.27.0
# 2024/06/27 08:40:40 [notice] 1#1: built by gcc 12.2.0 (Debian 12.2.0-14) 
# 2024/06/27 08:40:40 [notice] 1#1: OS: Linux 5.15.0-112-generic
# 2024/06/27 08:40:40 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
# 2024/06/27 08:40:40 [notice] 1#1: start worker processes
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 29
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 30
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 31
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 32
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 33
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 34
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 35
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 36
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 37
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 38
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 39
# 2024/06/27 08:40:40 [notice] 1#1: start worker process 40
# 2024/06/27 08:40:45 [notice] 1#1: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 35#35: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 38#38: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 39#39: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 33#33: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 34#34: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 40#40: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 32#32: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 1#1: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 36#36: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 31#31: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 30#30: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 37#37: signal 28 (SIGWINCH) received
# 2024/06/27 08:40:45 [notice] 29#29: signal 28 (SIGWINCH) received
```

Como vemos el proceso arranca ejecutando docker-entrypoint.sh. Ahora, al momento de levantar el contenedor, podemos indicar que inicie en la terminal

```sh
# quedaremos posicionados en la raiz del contenedor
docker run -it --rm -p 8080:80 --name ejemploweb jourdanmau/ejemploweb:latest /bin/bash
# root@7201f9134a8c:/# 
ls
# total 64
# drwxr-xr-x   2 root root 4096 Jan 28 21:20 home
# drwxr-xr-x   2 root root 4096 Jan 28 21:20 boot
# drwxr-xr-x   1 root root 4096 Jun 12 00:00 var
# drwxr-xr-x   1 root root 4096 Jun 12 00:00 usr
# drwxrwxrwt   2 root root 4096 Jun 12 00:00 tmp
# drwxr-xr-x   2 root root 4096 Jun 12 00:00 srv
# lrwxrwxrwx   1 root root    8 Jun 12 00:00 sbin -> usr/sbin
# drwxr-xr-x   3 root root 4096 Jun 12 00:00 run
# drwx------   2 root root 4096 Jun 12 00:00 root
# drwxr-xr-x   2 root root 4096 Jun 12 00:00 opt
# drwxr-xr-x   2 root root 4096 Jun 12 00:00 mnt
# drwxr-xr-x   2 root root 4096 Jun 12 00:00 media
# lrwxrwxrwx   1 root root    9 Jun 12 00:00 lib64 -> usr/lib64
# lrwxrwxrwx   1 root root    7 Jun 12 00:00 lib -> usr/lib
# lrwxrwxrwx   1 root root    7 Jun 12 00:00 bin -> usr/bin
# -rwxrwxrwx   1 root root 1620 Jun 21 19:53 docker-entrypoint.sh
# drwxr-xr-x   1 root root 4096 Jun 21 19:54 docker-entrypoint.d
# drwxr-xr-x   1 root root 4096 Jun 27 08:44 etc
# drwxr-xr-x   2 root root 4096 Jun 27 08:44 sitio
# dr-xr-xr-x  13 root root    0 Jun 27 08:44 sys
# dr-xr-xr-x 484 root root    0 Jun 27 08:44 proc
# drwxr-xr-x   5 root root  360 Jun 27 08:44 dev

exit
# exit
```

<mark>Con este comando lo que hacemos es sobre escribir el inicio por defecto del contenedor que es docker-entrypoint.sh por la terminal /bin/bash</mark>

## Guardar y recuperar imágenes de Docker

En ocasiones debemos compartir una imagen sin utilizar la Docker Hub, podemos guardarla en una memoria. Para ello comprimimos la imagen.

```sh
# Comprimir la imagen
docker save jourdanmau/ejemploweb:latest > ejemploweb.rar

# Podemos cargar la imagen
docker load --input ejemploweb.rar
```

## Introducción a Docker Compose

Gestionar muchos contenedores se hace realmente complejo.

**Compose** es una herramienta para definir y ejecutar aplicaciones Docker multicontenedor. Con Compose, utilizas un archivo YAML para configurar los servicios de tu aplicación. Luego, con un solo comando, creas e inicias todos los servicios a partir de tu configuración.

Compose funciona en todos los entornos; producción, staging, desarrollo, pruebas, así como flujos de trabajo CI. También dispone de comandos para gestionar todo el ciclo de vida de tu aplicación:

- Iniciar, detener y reconstruir servicios
- Ver el estado de los servicios en ejecución
- Transmitir la salida de registro de los servicios en ejecución
- Ejecutar un comando puntual en un servicio

Una vez que tengamos práctica con docker compose, tendremos la puerta de entrada hacia otras herramientas como **Docker Swarm** y **Kubernetes**, que gestionan los contenedores de forma más avanzada en entornos productivos.

Docker compose es capaz de condigurar:

- Gestion de servicios
- Configuración de redes
- Volúmenes
- Variables de entorno
- Secretos

## Despliega un conjunto de imágenes

Vamos a desplegar el front y el back a través de docker compose.

Creamos un nuevo proyecto. Utilizaremos un nombre como ejemplo_web. La estructura será:

```sh
/ejemplo_web
|
|-> /backend
|     |-> Dockerfile
|     |-> app.py
|     --> requirements.txt
|
|-> /frontend
|     |-> /sitio
|     |     |-> index.html
|     |     --> requests.js
|     --> Dockerfile
|
--> docker-compose.yml
```

```sh
#/backend/Dockerfile
FROM python:3.12-alpine3.17

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "-m", "flask", "run", "--host=0.0.0.0" ]
```

```py
# /backend/app.py
from flask import Flask,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/getMyInfo')
def getMyInfo():
    value = {
        "name": "Amin",
        "lastname": "Espinoza",
        "socialMedia":
        {
            "facebookUser": "aminespinoza10",
            "instagramUser": "aminespinoza10",
            "xUser": "aminespinoza",
            "linkedin": "amin-espinoza",
            "githubUser": "aminespinoza10"
        },
        "blog": "https://aminespinoza.com",
        "author": "Miranda Espinoza"
    }

    return jsonify(value)

if __name__ == '__main__':
    app.run(port=5000)
```

```sh
# /backend/requirements.txt
Flask==3.0.0
flask_cors==3.0.10
waitress==2.0.0
```

```sh
# /frontend/Dockerfile
FROM nginx:latest

# Path: /usr/share/nginx/html
COPY /sitio /usr/share/nginx/htmlFROM nginx:latest
```

```html
<!-- /frontend/sitio/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-pink.css">    
<title>Links website</title>
<script src="https://unpkg.com/feather-icons"></script>

<style>
body {
  background: url("https://www.w3schools.com/howto/img_link_tree_template2_bg.jpg"); /* The image used for background */
}

.container {
  width: 100%;
  height: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.links-container {
  display: flex;
  flex-direction: column;
  jusify-content: center;
  align-items: center;
}

.links-container a {
  width: 80%;
}

.w3-theme-l1:hover {
  background-color: #f279a1 !important;
}

.margin-top-2 {
  margin-top: 32px;
}

.bottom {
  width: 100%;
  text-align: center;
  width: auto;
  font-weight: bolder;
}

.bottom span {
  color: #ed4d82;
}

.bottom svg {
  stroke: #ed4d82;
  fill: #ed4d82;
}

@media (min-width: 768px) {
  .link {
    width: 100%;
  }
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
</style>
  </head>
  <body>
    <!-- Content container -->
    <div class="container">

      <!-- Image and name container. Change to your pictue here. -->
      <div style="text-align: center">
        <img src="https://avatars.githubusercontent.com/u/106186354?v=4" class="w3-margin" alt="image" width="150px" height="150px" style="border-radius: 50%;">
        <p ><span class="name w3-padding w3-pink w3-round" style="font-weight: bolder;" id="name">Hola, no funcionas</span></p>
        <p style="font-weight: bolder;">¡Mira mis enlaces!</p>
      </div>

      <!-- Links section 1. Replace the # inside of the "" with your links. -->
      <h4 class="margin-top-2" style="text-align: center;">MIS REDES SOCIALES</h4>
      <div class="links-container">
        <a id="facebookLink" href="#" class="w3-button w3-round-xlarge w3-theme-l1 w3-border link" target="_blank">Facebook</a>
        <br>
        <a id="instagramUser" href="#" class="w3-button w3-round-xlarge w3-theme-l1 w3-border link" target="_blank">Instagram</a>
        <br>
        <a id="xUser" href="#" class="w3-button w3-round-xlarge w3-theme-l1 w3-border link" target="_blank">X</a>
        <br>
        <a id="githubUser" href="#" class="w3-button w3-round-xlarge w3-theme-l1 w3-border link" target="_blank">Github</a>
      </div>

      <!-- Links section 2. Replace the # inside of the "" with your links. -->
      <h4 class="margin-top-2" style="text-align: center;">MI EXPERIENCIA</h4>
      <div class="links-container">
        <a id="linkedinUser" href="#" class="w3-button w3-round-xlarge w3-theme-l1 w3-border link" target="_blank">LinkedIn</a>
      </div>

      <!-- Links section 3. Replace the # inside of the "" with your links. -->
      <h4 class="margin-top-2" style="text-align: center;">MI BLOG</h4>
      <div class="links-container">
        <a id="website" href="#" class="w3-button w3-round-xlarge w3-theme-l1 w3-border link" target="_blank">Amin Espinoza</a>
      </div>

      <!-- Bottom section 3 -->
      <div class="bottom margin-top-2 w3-padding w3-round">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <span id="author" style="vertical-align: 7px;"> 2023 - Hecho por Miranda Espinoza</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </div>

    </div>
    <script>
      feather.replace()
    </script>
    <script type="text/javascript" src="requests.js"></script>
  </body>  
</html>
```

```js
// /frontend/sitio/request.js
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch('http://localhost:5000/getMyInfo', requestOptions)
  .then(res => {
    if (!res.ok) {
      alert("HTTP error! status:" + res.status);
    }
    return res.json();
  })
  .then(json => {
    document.getElementById("name").textContent = "Hola " + json.name + " " + json.lastname;
    document.getElementById("author").textContent = "2023 - Hecho por " + json.author;
	  document.getElementById("facebookLink").href = "https://www.facebook.com/" + json.socialMedia.facebookUser;
    document.getElementById("instagramUser").href = "https://www.instagram.com/" + json.socialMedia.instagramUser;
    document.getElementById("xUser").href = "https://www.x.com/" + json.socialMedia.xUser;
    document.getElementById("githubUser").href = "https://www.github.com/" + json.socialMedia.githubUser;
    document.getElementById("linkedinUser").href = "https://www.linkedin.com/" + json.socialMedia.linkedin;
    document.getElementById("website").href = json.blog;
  })
  .catch(error => alert("error: " + error));
```

```yml
# docker-compose.yml
version: '3.7'

services:
  backend:
    image: backend
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - 5000:5000
  frontend:
    image: frontend
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - 8080:80
    depends_on:
      - backend
```

Ejecutando la app

```sh
# Toma la lista de Dockerfiles y crea una imagen por cada uno de ellos
docker compose build

# Levantamos los contenedores
docker compose up
```

