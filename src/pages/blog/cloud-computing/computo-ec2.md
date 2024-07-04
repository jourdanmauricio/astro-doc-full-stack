---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Cómputo con EC2
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
description: Cómputo con EC2
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

## Fundamentos de EC2

**EC2**: Elastic Compute Cloud = infraestructura como servicio. 

Consiste principalmente en la capacidad de computo:

- Alquilar maquinas virtuales
- Almacenamiento de datos EBS (Elastick Block Store)
- Escalar servicios utilizando un ASG (Auto Scaling Group)
- Distribucion de carga entre maquinas con ELB (Elastick Load Balancer)

**Opciones de configuracion:**

- Linux
- Windows
- MacOS (Proximamente)

**Opciones de tamaño:**

- Potencia de computo: nucleos de CPU
- Memoria RAM
- Espacio de almacenamiento
- Tarjeta de red, velocidad de transferencia
- Reglas de firewall, bloquear entradas y salidas
- Acciones de arranque, scrips con preconfiguraciones (carga inicial), actualizaciones, descarga de archivos, software, etc. Script de arranque que prepara tu maquina con todo lo necesario, unicamente se puede ejecutar como usuario root.

## Lab: Crear tu primera instancia EC2

Complementario: https://www.youtube.com/watch?v=7tjHTGZQ56E

Vamos a crear una instanciade EC2 y generar un script de carga inicial.

- Acceder al servicio EC2
- Acceder a Instance
- Crear Instance
- Seleccionar el OS, los gratuitos son de Linux
- Seleccionar la máquina, en este caso t2 micro
- En la parte inferior agregar el script de configuración 1.

```bash
#!/bin/bash
# Use this for your user data (script from top to buttom)
# install httpd (Linux Version)
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h2>Hello World from $(hostname -f)</h2>" > /var/www/html/index.html
```
- 1GB de RAM
- 8GB Disco SSD de propósito general
- Agregar un tag para identificar el departamento o etc.
- Configuración de grupo de seguridad *
- Mantener reglas por defecto
- Revisamos y lanzamos la instancia EC2
- Creación de llaves de seguridad para acceder posteriormente mediante el protocolo SSH
- Guardar la llave de seguridad en un lugar seguro
- Modificar las reglas de entrada para que cualquier persona pueda acceder (firewall)

* Debemos generar las llaves para conectarnos por ssh. Debemos guardarla en un lugar seguro. No compartilas. Colocamos un nombre a la llave. Ej: nombre-de-instancia-EC2

Para verificar que el servidor web se encuentre en ejecución copiamos la direción pública v4 y la pegamos en un navegador. No funcionará, esto se debe a que la instancia solo trae abierto el puerto 22 (ssh) por defecto. Debemos habilitar los puertos 80 (http) y 443 (https).

Dentro de la pestaña de seguridad, debemos agregar las reglas tanto para entrada como para salida. 

## Lab: Configura tu grupo de Seguridad

Necesitamos editar las reglas de seguridad en AWS para permitir el tráfico entrante en el puerto 80 porque es el puerto predeterminado para el tráfico HTTP. El puerto 80 es utilizado por servidores web para servir páginas web a clientes a través de Internet. Cuando un cliente solicita una página web desde un servidor web, normalmente envía una solicitud HTTP al servidor en el puerto 80.

Por defecto, las instancias de AWS tienen todo el tráfico entrante bloqueado, incluyendo el tráfico en el puerto 80. Por lo tanto, si desea ejecutar un servidor web o cualquier otro servicio que use el puerto 80 en una instancia de AWS, debe editar el grupo de seguridad asociado con la instancia para permitir el tráfico entrante en el puerto 80.

- Acceder a la instancia
- Dentro del security acceder a security groups
- Dentro de Inbound rules acceder a Edit Inbound Rules
- Agregar el protocolo HTTP (puerto 80) y ponerle la opción de que cualquier IP (IPv4 e IPv6) puedan conectarse
- Agregar una regla más para la salida Edit Outbound Rules poner All traffic
- Nota: Si detienes la instancia AWS deja de cobrar por ella y se cae el servidor web

## Tipos de instancias en EC2

https://aws.amazon.com/es/ec2/instance-types/

**General Purpose**: Para proyectos como paginas web o repositorios de código.

**Compute Optimized**:

- Carga de trabajo de procesamiento por lotes
- Transcodificación de medios
- Servidores web de alto rendimiento
- Informática de alto rendimiento (HPC)
- Modelado científico y Machine Learning
- Servidores de Juegos dedicados

**Memory Optimized**:

- Bases de datos
- Cache Distribuido
- Aplicaciones BI
- Aplicaciones para procesamiento en tiempo real

**Storage optimized**:

- Procesamiento de transacciones (OLTP)
- Bases de datos relaciones y NoSQL
- Redis (Cache DB en memoria)
- Almacenamiento de datos

## Grupos de seguridad y puertos clásicos

**Grupos de Seguridad**:

- Sirven para controlar todo el trafico dentro y fuera de las instancias.
- Se pueden adjuntar varias instancias a un mismo grupo de seguridad.
- Los grupos de seguridad son un componenete de las VPC.
- Actuan como un firewall.
- Pertenecen a una sola region y por ende solo se pueden adjuntar a instancias que viven en dicha region.
- Recomendable configurar un grupo de seguridad especificamente para el manejo del acceso SSH.
- Si tu applicacion te da errores de timeout muy seguramente se deba auna configuracion en tu grupo de seguridad.
- Puede hacerse referencias dentro de un grupo de seguridad a otro grupo de seguridad en la misma zona de disponibilidad.


**Puertos Clásicos**:

- 21 ftp
- 22 ssh
- 22 sftp
- 80 http
- 443 https
- 3389 RDP (maquinas con windows - escritorio remoto)

## Lab: Crea nuevos grupos de seguridad para tu instancia

- Cuando se crea una instancia se crea por defecto un grupo de seguridad
- El grupo de seguridad es el Firewall que podemos usar para comunicar las instancias hacia clientes u otras instancias
- El grupo de seguridad es donde se encuentran todas las reglas entrantes y salientes a la instancia
- Puedo definir en el grupo de seguridad que me permita entrar desde mi IP

- Acceder al servicio de instancias EC2
- Dentro de Network and Security acceder a Security Groups
- New Security Group
- Anadir un nombre y una descripción
- Añadir el protocolo para conectarse a la instancias o hacer peticiones a ella, tanto de entrada como de salida
- Luego de creado es necesario adjuntarlo a la instancia
- Acceder a actions
- Security
- Change security groups
- Seleccionar el security group y guardar

## ¿Qué es SSH?

Uno de los protocolos más usados para conectarnos a nuestras instancias de manera remota. Protocolo de administración remota que nos permite conectarnos a los usuarios y controlar remotamente los servidores no sólo en AWS.

**Requerimientos**:

- Llave Pública
- Llave Privada

Cuando las llaves hacen match me puedo conectar al servidor desde mi computadora personal de manera remota

**OS**

El servicio de AWS se llama Instance Connect

**Problemas comunes**
- Tiempos de espera de conexión (importante hace la configuración correcta de los grupos de seguridad)
- Pueden haber problemas con firewalls que tengamos configurados en nuestra red
- Hay conexión rechazada (depende de la instancia, puede crearse de nuevo y volver a asignar el grupo de seguridad)
- Permiso denegado (clave pública, gssapi-keyx, gassapi-with-mic) de los problemas más comunes debido a conexión con diferente llave a la adjuntada en la creación

**Características de SSH**

- Seguridad: SSH usa criptografía para proteger la conexión entre el cliente y el servidor, asegurando que los datos transmitidos estén encriptados.
- Autenticación: SSH soporta varios métodos de autenticación, incluyendo contraseñas y claves públicas.
- Integridad de Datos: SSH garantiza que los datos no se modifiquen durante la transmisión.
- Redirección de Puertos: SSH permite la redirección de puertos, lo que puede ser utilizado para crear túneles seguros para otros protocolos.
- Acceso Remoto: Permite a los usuarios iniciar sesión en una computadora remota y ejecutar comandos en ella.
- Transferencia Segura de Archivos: Utilizando protocolos como SCP (Secure Copy) y SFTP (SSH File Transfer Protocol).

**Componentes de SSH**

- Cliente SSH: La aplicación que se ejecuta en el equipo del usuario que quiere conectarse a otro equipo de forma segura. Ejemplos de clientes SSH incluyen ssh en sistemas Unix/Linux y programas como PuTTY en Windows.
- Servidor SSH: El software que se ejecuta en la máquina remota y escucha las conexiones entrantes del cliente SSH. OpenSSH es uno de los servidores SSH más comunes.

**Cómo Funciona SSH**

- El funcionamiento básico de SSH se puede dividir en los siguientes pasos:
- Iniciación de Conexión: El cliente SSH inicia una conexión con el servidor SSH en la máquina remota, generalmente a través del puerto 22.
- Intercambio de Claves: Se establece una conexión segura a través de un intercambio de claves. Ambas partes generan una clave compartida que se utilizará para encriptar la sesión.
- Autenticación del Cliente: El cliente se autentica en el servidor SSH utilizando métodos de autenticación como contraseñas o claves públicas.
- Inicio de Sesión: Una vez autenticado, el cliente puede ejecutar comandos de forma remota en el servidor.


