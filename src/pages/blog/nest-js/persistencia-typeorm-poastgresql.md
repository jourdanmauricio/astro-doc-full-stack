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
