---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Introducción a AWS
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
description: Introducción Aws
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


## Visión general de las TI tradicionales

**Las TI tradicionales** se refiere a las prácticas y tecnologías empleadas antes de la adopción masiva de la computación en la nube. Esto incluye la gestión de hardware físico, software y redes dentro de una organización.

**¿Cómo funciona un sitio web?**
Clientes tienen dirección IP —> Se conecta al network —> Llega la petición hacia un servidor que también tiene un IP

**¿De qué está compuesto un servidor?**
- Cómputo: CPU (Hace todas las operaciones para nuestra información)
- Memoria: RAM (cerebro que tiene la información)
- Almacenamiento: datos (archivos de texto plano)
- Bases de datos: información almacenada de forma estructurada
- Redes: routers, switch, servidor DNS

**Terminología de IT**
- Redes: cables, routers y servidores conectados unos a otros
- Router: dispositivo de red que reenvía paquetes de datos entre redes informáticas
- Switch: toma un paquete y lo envía al servidor/cliente correcto en la red

**Diseño de infraestructura tradicional**
- Casa o garages
- Oficinas
- Data centers

**Problemas del enfoque tradicional de IT**
- Renta
- Mantenimiento
- Reemplazar y agregar hardware
- Escalamiento limitado
- Contratar 24/7 a personas
- Desastres naturales

## Qué es la computacion en la nube

<mark>La computación en la nube</mark> es la **entrega bajo demanda de computación, almacenamiento de bases de datos, aplicaciones y otros recursos de TI** a través de una plataforma de servicios en la nube por medio de Internet con precios de pago por uso.

Suministras el tipo y tamaño exactamente correctos de los recursos informáticos que necesitas.
Puedes acceder al instante a todos los recursos que necesitas.
Una forma sencilla de acceder a servidores, almacenamiento, bases de datos y un conjunto de servicios de aplicaciones: poder de computo, almacenamiento y bases de datos.

**Servicios que ya has usado en la nube**

- Gmail Servicio de email en la nube. Pagas solo por tus emails almacenados (no infraestructura)
- Dropbox Servicio de almacenamiento en la nube. Originalmente se construyó en AWS
- Netflix Servicio de video en demanda. Construido en AWS.

**Tipos de modelos de computación en la nube**

- Nube Privada: 
  - Servicios de nube usados por una organización (no está expuesta al público).
  - Control total.
  - Seguridad para aplicaciones sensibles.
  - Satisface necesidades comerciales específicas.
- Nube Pública: 
  - Recursos propios en la nube y operados por proveedores de nube de terceros a través de internet.
  - Google Cloud Platform (GCP), Azure, AWS
- Nube Híbrida
  - Mantener algunos servidores en las instalaciones y extender otras capacidades en la nube.
  - Control sobre activos sensibles en tu infraestructura privada
  - Flexibilidad y rentabilidad de la nube pública.

**5 características de la computación en la nube**

- Autoservicio en demanda
- Amplio acceso a la red
- Múltiples inquilinos y agrupación de recursos
- Elasticidad y escalabilidad
- Servicio medido

**6 ventajas de la computación en la nube**

- Gastos de capital comercial (capex) sobre gastos operativos (opex)
- Economías de escala
- Dejar de adivinar la capacidad
- Incrementar la velocidad y la agilidad
- Dejar de gastar dinero en la ejecución
- Globalizar en minutos

**Problemas resueltos por la nube**

- Flexibilidad: cambia los tipos de recursos cuando sea necesario
- Rentabilidad: pagar sobre la marcha por lo que se usa
- Escalabilidad: acomodar cargas grandes al hacer que el hardware sea más fuerte o agregando nodos adicionales
- Elasticidad: capacidad de escalar cuando sea necesario
- Alta disponibilidad y tolerancia a fallos, crecer en todos los centros de datos
- Agilidad: desarrollar, probar y ejecutar rápidamente aplicaciones en la nube


## Los diferentes tipos de cómputo: IaaS vs. PaaS vs. SaaS

- **laaS**: Infraestructura como Servicio. Proporciona componentes básicos para las tecnologías de información en la nube: redes, computadores, espacio de almacenamiento de datos, con un máximo nivel de flexibilidad y fácil paralelo de las tecnologías de la información tradicional en las instalaciones
- **PaaS**: Plataforma como Servicio. Elimina la necesidad de que nuestra organización administre la infraestructura y nos vamos a centrar en la implementación y la gestión de las aplicaciones
- **SaaS**: Software como Servicio. Producto terminado y que es ejecutado y administrado por el proveedor del servicio.

![Tipos de computo](/astro-doc-full-stack/images/cloud-computing/tipos-computo.webp)

## Una pequeña historia de AWS

**Línea del tiempo de AWS**
- 2002: Internamente lanzado
- 2003: La infraestructura de Amazon es una de sus principales fortalezas idea para comercializar
- 2004: Se lanza al público SQS
- 2006: Se relanza al público SQS, S3 y EC2
- 2007: Se lanza en Europa
- 2009: Se lanza RDS
- 2010: Se lanza route 53
- 2012: Se lanza DynamoDBThe future… no lo sabemos

**AWS en números**
- AWS tuvo $35.02 mil millones en ingresos anuales en 2019.
- AWS representó el 47% del mercado en 2019 (Microsoft es 2º con 22%)
- Mas de 1.000.000 de usuarios activos

## Una visión global: regiones y zonas de disponibilidad

Una **zona de disponibilidad** es un data center
Un data center está lleno de **servidores**
Una **zona de disponibilidad** puede ser de varios data center.
Cada zona de disponibilidad es uno o mas centro de datos discretos con energía, redes y conectividad redundante, están separados entre sí y están conectados entre sí con un gran ancho de banda, redes de latencia ultrabaja

**Infraestructura**
- AWS Regiones
- AWS Zonas de disponibilidad
- AWS Centro de datos
- Ubicaciones de AWS Edge / puntos de presencia
- Infraestructura global

**Servicios Globales**
- IAM
- Route 53
- Cloudfront
- WAF
- Servicios Regionales
- EC2
- Beanstalk
- Lambda
- Rekognition
- Servicios regionales de AWS

### Diagrama del modelo de responsabilidad compartida

**AWS**:
- hardware y la infraestructura global
- Regiones (regions)
- Zonas de disponibilidad (availability zones)
- Ubicaciones de AWS Edge / puntos de presencia (Edge locations)
- software:
- computo (compute)
- almacenamiento (storage)
- bases de datos (database)
- redes (networking)

**Cliente**:
- Actualizaciones de S.O.
- Proteger los datos que se almacenan
- Aplicaciones
- Accesos
- Administración de usuarios y grupos

### ¿Cómo escoger una región en AWS?

**Región**: Verificar si la región cumple los requisitos legales para que nuestros datos sean procesados y almacenados allí, normalmente las reglas del negocio indican las normativas mínimas a cumplir para poder tratar, procesar y/o almacenar los datos de las personas u organizaciones que utilizan nuestros servicios.

**Proximidad**: Se refiere a la latencia (tiempo en que se demora una petición en ir hasta el servidor y regresar a nuestro PC, normalmente medida en milisegundos) se deben realizar pruebas de latencia con el fin de que se cumpla con tiempos de respuesta aceptable para el uso de nuestros servicios.

**Servicios Disponibles**: Si se desea utilizar un servicio particular y por lo tanto no se encuentre disponible en todas las regiones se debe tener en cuenta que solo se podrán utilizar las regiones que cuenten con esta funcionalidad o servicio especifico.

**Precios**: Cada región cuenta con precios diferentes para su uso, estos precios se encuentran disponibles en la página web de AWS para su consulta correspondiente.

## Seguridad e identidad

AWS ofrece una amplia variedad de servicios de seguridad para proteger tus aplicaciones y datos en la nube, lo que puede ahorrarte mucho dinero y dolores de cabeza a largo plazo. Invertir en la seguridad de tu plataforma puede tener un alto ROI, ya que te ayuda a evitar costosos ataques y brechas de seguridad que pueden dañar tu reputación y disuadir a los clientes. La idea es entender los servicios que ofrece para seleccionar los necesarios para cada circunstancia.

**Protección a Datos**
- Amazon Macie: para descubrir y proteger sus datos sensibles
- AWS Key Management Service: almacena y administra claves de cifrado
- AWS CloudHSM: almacenamiento de claves basado en hardware y el cumplimiento normativo
- AWS Certificate Manager, provisiona, administra e implementa certificados de seguridad TSL y TLS
- AWS Secrets Manager: rotar, gestionar y recuperar secretos como contraseñas

**Protección de la infraestructura**
- AWS Shield, para la protección de denegación de servicio
- AWS Web Aplication Firewall, (WAF) filtra el tráfico de sitios web maliciosos
- AWS Firewall Manager, administra las reglas del firewall de forma centralizada

**Detección de amenazas**
- Amazon GuarDuty, detecta amenazas automáticamente
- Amazon Inspector, ayuda a analizar la seguridad de la aplicación
- Amazon config, registra y evalúa configuraciones de nuestros recursos
- Amazon CloudTrail, rastrea la actividad del usuario y el uso de las API

**Gestión de identidades**
- AWS Identity and Access Management, (IAM) administra de forma segura el acceso a una cuenta, servicios y recursos
- AWS Inicio de sesión único: Implemente el acceso de sesión único (single sign on)
- AWS administra la identidad dentro de las aplicaciones, se puede hacer el inicio de sesiones moviles
- AWS Servicio de Directorio, implementa y administra un Active Directory Service
- AWS Organizaciones, para gobernar y administrar de forma centralizada en un mismo lugar

## IAM ilustrado

AWS Identity and Access Management (IAM) proporciona un control de acceso detallado en todo AWS. Con IAM, puede especificar quién puede acceder a qué servicios y recursos, y en qué condiciones. Con las políticas de IAM, administre los permisos de su personal y sus sistemas para garantizar los permisos de privilegios mínimos.

IAM es un servicio de AWS que se ofrece sin cargo adicional. Para comenzar a utilizar IAM, o si ya se ha registrado en AWS, vaya a la consola de IAM.

**IAM**
- Nos ayuda a administrar quién puede acceder a qué en los servicios y recursos de tu cuenta en AWS
- Puedes crear usuarios y grupos
- Establecer permisos permitir o denegar el acceso a los recursos de AWS mediante el uso de políticas

### Usuarios IAM

Dentro de usuarios IAM existen varios usuarios y roles

- El usuario raíz es la cuenta principal que tendrá acceso a todos los servicios de AWS
- El usuario raíz puede crear otros usuarios (developers, tester, sellers, etc)
- Podemos crear grupos para asignar permisos
- Es importante aprender a crear políticas en archivos .json
- Un servicio puede asumir un rol


Un **bucket** en Amazon S3 (Simple Storage Service) es un contenedor de objetos, donde los objetos son los archivos que almacenamos en la nube. Un bucket de S3 tiene un nombre globalmente único, lo que significa que no puede haber dos buckets con el mismo nombre en todo S3. Los objetos en un bucket de S3 pueden ser públicos o privados, y se puede configurar diferentes permisos de acceso a los objetos. Los buckets de S3 se pueden utilizar para almacenar y distribuir contenido estático como imágenes, videos, archivos de audio, páginas web, entre otros.

## Secrets Manager

**Secrets Manager** es un servicio de AWS que nos ayuda a proteger los datos secretos (contraseñas, claves y tokens) necesarios para acceder a nuestras aplicaciones, servicios y recursos.

También nos permite compartir automáticamente esta información cuando queramos. Además, este servicio evita que tengamos que copiar y pegar los secretos directamente en nuestro código.

Cabe mencionar que el precio por “secreto almacenado” es de 0,40 dolares al mes (Al menos a la fecha de hoy). Ademas de cobrar por cada 10 mil llamadas al API para obtener esos secretos.

Citando textualmente los precios en su sitio web:

Por dato confidencial al mes

0,40 USD por dato confidencial al mes. Una réplica de un dato confidencial se considera un dato confidencial distinto y también se facturará a 0,40 USD por réplica al mes. El precio se prorratea en el caso de los datos confidenciales que se almacenen durante menos de un mes (en función del número de horas).

Cada 10 000 llamadas a la API

0,05 USD cada 10 000 llamadas a la API.


AWS Secrets Manager le ayuda a proteger los datos confidenciales necesarios para acceder a sus aplicaciones, servicios y recursos de TI. El servicio le permite alternar, administrar y recuperar fácilmente credenciales de bases de datos, claves de API y otros datos confidenciales durante su ciclo de vida. Los usuarios y las aplicaciones recuperan datos confidenciales con una llamada a las API de Secrets Manager, lo que elimina la necesidad de codificar información confidencial en texto sin formato.

Secrets Manager ofrece la alternación de datos confidenciales con integración incorporada para Amazon RDS, Amazon Redshift y Amazon DocumentDB. Además, el servicio puede extenderse a otros tipos de datos confidenciales, incluidas las claves de API y los tokens de OAuth. Secrets Manager también le permite controlar el acceso a los datos confidenciales mediante permisos detallados y auditar la alternación de datos confidenciales de manera centralizada para recursos que se encuentren en la nube de AWS, en servicios de terceros o en las instalaciones.

## Demostración del servicio de directorio

AWS Directory Service es un servicio que permite configurar y ejecutar servicios de directorio en la nube de AWS. Este servicio facilita la gestión de usuarios, dispositivos y recursos de red

- Un directorio es una base de datos de personas que contiene toda la información de inicio de sesión de los usuarios en la red
- El servicios de AWS que funciona como un directorio activo administrado es AWS Directory Service

**Precios de AWS Directory Service**

En este caso AWS menciona que:

Con AWS Directory Service, solo pagará por el tipo y el tamaño de directorio administrado que use. No existe ningún compromiso inicial ni tarifa mínima. Puede eliminar el directorio administrado en cualquier momento.

PEROOOO

En caso de querer compartir el directorio con otros servicios como Microsoft Active Directory la cosa cambia porque se cobra por cada hora que usemos el servicio:

Cargo de AWS Directory Service para Microsoft Active Directory 0 USD

24 horas x 30 días = 720 horas por controlador de dominio 2 controladores de dominio por directorio administrado (el mínimo) 720 horas x 2 controladores de dominio en total = 1440 horas de controlador de dominio en total 1440 horas en total – 1500 horas de la prueba gratuita limitada = 0 horas de controlador de dominio facturables Al cabo de 30 días o 1500 horas de prueba gratuita (lo que suceda primero), AWS le facturará por directorio administrado de acuerdo con la tarifa por hora.

Resumen de los cargos tras los primeros 30 días

Su factura por los primeros 30 días de uso después de que se acabe la prueba gratuita es de 288,00 USD.

Cargo de AWS Directory Service para Microsoft Active Directory 288,00 USD

24 horas x 30 días = 720 horas por controlador de dominio 2 controladores de dominio por directorio administrado (el mínimo) 720 horas x 2 controladores de dominio en total = 1440 horas de controlador de dominio en total 1440 horas en total x 0,20 USD por hora de controlador de dominio = 288,00 USD

## Laboratorio: crea usuarios y grupos en AWS

- No es buena practica usar la cuenta raíz para gestionar los servicios de AWS, lo mejor es crear otra cuenta
- Podemos crear un grupo de administradores en donde este grupo tendrá todos los accesos a los servicios de AWS
- Los permisos también pueden ser llamados políticas
- A cada usuario debemos asignarle el grupo al que pertenece

En la actualidad AWS IAM se ve un poco distinto, si quieren seguir los mismos pasos, al momento de crear el IAM activen el checkbox Provide user access to AWS... luego activen el I want to create an IAM user y ya luego los pasos son los mismos que en la clase.

## Laboratorio: crea una alerta de facturación

- Es importante crear alertas de facturación
- Es mejor usar AWS en ingles
- Podemos crear alertas en diferentes marcos de tiempo
- Crear una alerta es fácil