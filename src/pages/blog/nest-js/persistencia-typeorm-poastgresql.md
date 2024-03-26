---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Persistencia de Datos con TypeORM y PostgreSQL
date: 2024-02-12
author: Mauricio Jourdán
image:
  { src: '/astro-doc-full-stack/images/nest-js/back.webp', alt: Logo nest js' }
icon:
  { src: '/astro-doc-full-stack/images/nest-js/icon.png', alt: 'Logo Nest js' }
description: NestJS - Persistencia de Datos con TypeORM y PostgreSQL
draft: false
category: Nest js backend
---

- Documentación: https://nestjs.com/
- Repositorio del proyecto: https://github.com/jourdanmauricio/nest-ecommerce
- Branch Fundamentos: git clone -b persistencia-typeorm https://github.com/jourdanmauricio/nest-ecommerce

Para agregar persistencia a nuestro proyecto utilizaremos typeORM y PostgreSQL como base de datos. Aunque como utilizamos typeORM y docker para la base de datos será muy simple cambiar el gestor de base de datos por ejemplo a MySQL.

## Cómo instalar Docker

<details>
<summary>Detalle</summary>

### Instalación en Windows con WSL

Debes descargar el instalador desde la página de Docker for Windows.

Cuando ya tienes instalado Docker Desktop dentro de tus programas debes abrirlo y debes asegurarte que la opción “Use the WSL 2 based engine” está habilitada:

Luego en la sección “Resources > WSL Integration”, asegurarate que la opcion “Enable integration with my default WSL distro”, este habilitada:

Puedes ver más detalles de Docker con WLS en https://docs.docker.com/desktop/wsl/

### Instalación en Windows

Debes descargar el instalador desde la página de Docker for Windows -> https://docs.docker.com/desktop/install/windows-install/

Cuando ya tienes instalado Docker Desktop dentro de tus programas, una de las cosas que debes tener en cuenta en la instalación con Windows es que debes contar con Windows 10 de 64 Bits o superior y debes habilitar el Hyper-V de Windows.

Si quieres conocer los detalles, aquí te dejo el detalle como habilitar Hyper-V desde la Interfaz de Windows -> https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v

### Instalación en macOS

En Mac tienes dos opciones. Todo dependerá si tienes los nuevos chips M1 o Intel, ya que hay un instalable apropiado para ambas arquitecturas de chip. Puedes escoger el instalable desde https://docs.docker.com/desktop/install/mac-install/

Adicionalmente, si cuentas con los nuevos chips M1, debes ejecutar la siguiente instrucción en tu terminal softwareupdate --install-rosetta

Una vez descargues el instalador adecuado, solo debes seguir los pasos y pasar Docker Desktop a tus aplicaciones.

### Instalación en Ubuntu

Estos son los pasos para instalarlo dentro de Ubuntu, sin embargo, también puedes ver directamente en https://docs.docker.com/engine/install/ubuntu/

```bash
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo docker run hello-world
```

Para otras distribuciones de Linux:

- Install Docker Engine on CentOS
- Install Docker Engine on Debian
- Install Docker Engine on Fedora

</details>

## Configuración de PostgresSQL en Docker

<details>
<summary>Detalle</summary>

Utilizamos docker como contenedor para correr bases de datos, así no tendremos problemas de configuración, drivers, sistemas operativos, etc. No lidiamos con problemas de instalación.

Veamos cono levantar PostgreSQL en un contenedor.

> Instalar la extensión para VSCode YAML (Red Hat), ya que docker-compose utiliza YAML para su configuración.

Creamos un archivo llamado docker-compose.yml en la raiź del proyecto.

```yml
# docker-compose.yml
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=my_db
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=123456
    ports:
      - '5432:5432'
```

Levantamos el servicio:

```bash
docker-compose up -d postgres
```

Verificamos que el contenedor quedo en ejecución en segundo plano

```bash
docker-compose ps

          Name                        Command              State                    Ports
-----------------------------------------------------------------------------------------------------------
my-ecommmerce_postgres_1   docker-entrypoint.sh postgres   Up      0.0.0.0:5432->5432/tcp,:::5432->5432/tcp
```

```bash
# Baja el contenedor
docker-compose down
```

Por defecto docker no posee estado, es de tipo statless, no posee persistencia. Esto quiere decir, que si bajamos el contenedor perderemos los datos de la base de datos. Para generar persitencia debemos definir un volumen en nuestro archivo de configuración.

La siguiente configuración creará una carpeta ./postgres_data. Como forma parte del proyecto debemos incluir /postgres_data en el .gitignore .

```yml
# docker-compose.yml
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=my_db
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=123456
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

</details>

## Explorando postgres con interfaces gráficas y terminal

<details>
<summary>Detalle</summary>

Desde la terminal podemos ingresar al contenedor y directamente ejecutar comnados SQL.

```bash
# Vemos el log del container
docker-compose logs -f postgres

# Para ingresar al container
docker-compose exec postgres bash

# una vez dentro del container podemos ingresar a la BD
psql -h localhost -d my_db root

# Vemos las tablas de la bd, pero aún no hemos creado ninguna
\d
#Did not find any relations.

# Salimos de la BD
\q

# Salimos del contenedor
exit
```

También podemos utilizar una interfaz gráfica para conectarnos a la base de datos que se encuentra en ejecución dentro del contenedor. Para ello modificaremos el docker-compose configurando un nuevo servicio que llamaremos **pg-admin**.

```yml
# docker-compose.yml
version: '3.3'

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=my_db
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=123456
    ports:
      - '5432:5432'
    volumes:
      - ./postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=root@admin.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - '5050:80'
```

Levantamos el nuevo servicio y lo podemos ver en funcionamiento en http://localhost:5050. Nos logueamos con email: root@admin.com y password: root

```bash
docker-compose up -d pgadmin

docker-compose ps

         Name                        Command              State                       Ports
---------------------------------------------------------------------------------------------------------------
my-ecommerce_pgadmin_1    /entrypoint.sh                  Up      443/tcp, 0.0.0.0:5050->80/tcp,:::5050->80/tcp
my-ecommerce_postgres_1   docker-entrypoint.sh postgres   Up      0.0.0.0:5432->5432/tcp,:::5432->5432/tcp
```

![Pg admin login.](/astro-doc-full-stack/images/nest-js/pg-admin.webp)

Para conectarnos a la base de datos debemos crear un nuevo servidor.

Objeto / Register/ Servidor...

En la ventana emergente ingresamos:

Name: my_db

y en la pestaña connection:

Host: postgres
Port: 5432
Maintenance database: postgres
Username: root
Password: 123456

![Pg admin.](/astro-doc-full-stack/images/nest-js/pg-admin2.webp)

Para crear una tabla clickeamos en:
my_db / Bases de Datos / my_db / Esquemas / public y en la parte superior Herramienta de consulta, ingresamos el siguiente comando SQL y presionamos play.

```SQL
CREATE TABLE tasks (
  id serial PRIMARY KEY,
  title VARCHAR (255) NOT NULL,
  completed boolean DEFAULT false
);
```

Si le damos con el boton derecho a eschemas y actualizamos, ya nos debería aparecer **la tabla tasks**.

</details>

## Integración de node-postgres con NestJS

Para conectarnos desde nuestro servidor a la base de datos postgres debemos utilizar el driver oficial instalando la dependencia pg. También debemos instlar los tipos para la librería como dependencia de desarrollo.

```bash
npm i pg
npm i @types/pg -D
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
  img[alt="Nest Inyección de dependencias."] {
  max-width:  400px;
  margin: 0 auto;
  display: block;
  }
  pre {
    padding: 10px;
  }
</style>
