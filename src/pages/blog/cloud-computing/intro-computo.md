---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Introducción a Cómputo, Almacenamiento y Bases de Datos
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
description: Introducción Cómputo, Almacenamiento y Bases de Datos
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

## Cómputo en AWS

AWS describe su capacidad de cómputo como “cómputo para cualquier carga de trabajo”. Cómputo se refiere a usar una computadora para procesamiento, ya sea sumar dos números o alojar un sitio web. Entre los servicios de cómputo se encuentran:

**Instancias o máquinas virtuales**

<mark>Una máquina virtual es un software que simula un sistema operativo, y que puede ejecutar programas dentro de dicho sistema como si fuera una computadora real.</mark>

Los servicios de máquinas virtuales (o instancias) en AWS son:

- Amazon EC2: máquinas virtuales seguras y redimensionables.
- Amazon EC2 Spot: cargas de trabajo tolerante a fallas, por hasta el 90% del precio normal (nota: Amazon puede reclamar estas instancias en cualquier momento con solo dos minutos de anticipación).
- Amazon EC2 AutoScaling: agrega o elimina automáticamente la capacidad informática para satisfacer tus necesidades bajo demanda.
- Amazon EC2 LightSail: plataforma en la nube fácil de usar para crear una aplicación o un sitio web.

**Contenedores**

<mark>Un contenedor es una unidad de software que empaca un software en específico junto con sus dependencias. Se diferencian de las máquinas virtuales en que estas virtualizan el hardware, mientras que los contenedores virtualizan el sistema operativo.</mark>

Los servicios de contenedores de AWS son:

- Amazon Elastic Container Services (ECS): servicio para correr contenedores confiables y escalables.
- Amazon Elastic Container Registry (ECR): servicio para almacenar, administrar e implementar imágenes de contenedores.
- Amazon Elastic Kubernetes Service (EKS): servicio de Kubernetes administrado por AWS.

**Serverless**

<mark>La computación serverless se refiere a que la responsabilidad de administrar servidores o máquinas virtuales se le delega al proveedor de nube, por lo que sólo debemos precuparnos por el código de nuestras aplicaciones.</mark> 

Amazon Lambda nos permite ejecutar piezas de código sin servidores.

**Servicios de borde (Edge)**

<mark>El Edge Computing se refiere al cómputo y procesamiento de datos en una ubicación cercana a la necesaria para el negocio.</mark> 

Los servicios de borde o edge computing de AWS son:

- Amazon Outposts: permite ejecutar los servicios de AWS en nuestros propios servidores en lugar de Amazon.
- Amazon Snow Family: es una familia de dispositivos desde un disco duro portátil hasta un semi-remolque completo lleno de discos de almacenamiento. Estos dispositivos te permiten cargar archivos en ellos, para luego ser enviados a Amazon y cargados en sus servidores.
- AWS Wavelength: permite acceder a los servicios AWS desde dispositivos 5G sin pasar por Internet.
- VMWare AWS: permite migrar cargas de trabajo de VMWare a AWS.
- AWS Local Zones: permite ejecutar las aplicaciones más cerca de los usuarios finales, a una menor latencia.

## Conoce qué es Amazon EC2 (Elastic Compute Cloud)

<mark>**EC2** permite alquilar máquinas virtuales, llamadas instancias EC2.</mark> Puedes elegir diferentes tipos de EC2 con diferente CPU, RAM y almacenamiento. Hay instancias optimizadas para cómputo, memoria y almacenamiento, entre otras.

En EC2, el sistema de pago más común es por hora o por segundo, dependiendo el tipo de instancia. Por ejemplo, para una instancia que cueste $0.1 la hora, puedes pagar, ya sea una instancia por 24 horas o 24 instancias por una hora. En ambos casos pagas lo mismo (24 * 0.10 = $2.4).

**Opciones y precios bajo demanda**

Las instancias pueden redimiensionarse. Puedes empezar por una instancia de bajo costo, y si necesitas aumenta su capacidad, apagas la instancia y seleccionas un nuevo tipo de instancia. Cuando enciendas de nuevo la instancia, verás su capacidad aumentada. La siguiente tabla muestra algunos tipos de instancias.

| Nombre	| Especificaciones | Precio |
| --- | --- |--- | 
| t3.nano |	2 vCPU’s, 0.5 GiB RAM	| $0,0052/hora |
| t3.xlarge |	4 vCPU’s, 16 GiB RAM	| $0,1664/hora |
| c6g.8xlarge |	32 vCPU’s, 64 GiB RAM	| $1,088/hora |
| X1e.xlarge |	128 vCPU’s, 3904 GiB RAM, 2x 1920 GB SSD	| $26,688/hora

**Hosts dedicados**

<mark>Los **hosts dedicados** en Amazon Web Services (AWS) son infraestructuras de servidores físicos que ofrecen un nivel exclusivo de recursos computacionales para las cargas de trabajo de los clientes.</mark> En lugar de compartir estos servidores con otros usuarios, los hosts dedicados permiten a los clientes tener un control más granular sobre la ubicación y asignación de sus instancias de Amazon EC2. Esto puede ser beneficioso para aplicaciones que requieren una mayor seguridad, cumplimiento normativo o rendimiento constante.

Los hosts dedicados también brindan la flexibilidad de llevar licencias de software existentes a la nube sin incurrir en costos adicionales. Al utilizar hosts dedicados, los principiantes en AWS pueden garantizar una mayor aislación de recursos y una mayor predictibilidad en el rendimiento de sus aplicaciones, al tiempo que aprovechan la escala y la elasticidad de la nube de AWS.

**Resumen**

- Precios de Amazon EC2
Amazon EC2 ofrece diversas opciones de precios para distintos casos de uso. Por ejemplo, si tu caso de uso puede soportar interrupciones, puedes ahorrar con las instancias tipo spot. También puedes ahorrar si te comprometes de forma anticipada y bloqueas un nivel mínimo de uso con las instancias reservadas. .

- On Demand
Las instancias bajo demanda son ideales para cargas de trabajo irregulares a corto plazo que no se pueden interrumpir. No se aplican costos iniciales ni contratos mínimos. Las instancias se ejecutan de forma continua hasta que las detengas y ++solo pagas por el tiempo de cómputo que utilizas++. .

- Instancias Reservadas
Las instancias reservadas son un descuento de facturación que se aplica al uso de instancias bajo demanda en tu cuenta. Puedes adquirir instancias reservadas por un ++periodo de 1 o 3 años++ reduciendo así los costos comparado con las instancias on-demand. .

- Instancias Spot
Las instancias tipo spot son ++ideales para cargas de trabajo con horarios de inicio y finalización flexibles o que pueden soportar interrupciones++. Las instancias tipo spot utilizan capacidad de cómputo de Amazon EC2 no utilizada y ofrecen ahorros de costos con un descuento de hasta el 90 % de los precios bajo demanda. .

- Hosts Dedicados
Los hosts dedicados son servidores físicos con capacidad de instancias de Amazon EC2 totalmente dedicados al uso que desee. ++No son compartidos por otros clientes++.

## Contenedores de software

Un problema común que podemos tener es que cuando estemos desarrollando nuestro proyecto utilicemos librerías y dependencias que necesitemos en nuestra computadora, pero cuando este proyecto este corriendo en otra computadora es muy probable que las dependencias y librerías no estén correctamente actualizadas

Para solucionar este problema podemos usar **Docker**

El propósito de un **contenedor** es crear un paquete del proyecto donde estarán todas las librerías y dependencias que necesita junto con sus versiones para que pueda se ejecutado en cualquier computadora

Luego de crear un contenedor lo puedo implementar en cualquier lugar

<mark>**Amazon Elastic Container Service**: Es un servicio de contenedor de contenido donde puedo implementar la imagen del proyecto</mark>

Ventajas de Utilizar Contenedores de Software:

- Portabilidad: Los contenedores permiten que las aplicaciones se ejecuten de manera consistente en diferentes entornos, lo que facilita la implementación y migración.
- Aislamiento: Cada contenedor tiene su propio entorno aislado, lo que mejora la seguridad y evita conflictos entre aplicaciones.
- Eficiencia de Recursos: Al compartir recursos del sistema operativo host, los contenedores son más eficientes en términos de consumo de recursos que las máquinas virtuales.
- Desarrollo Ágil: Facilitan la entrega continua y la integración continua al proporcionar entornos de desarrollo consistentes y reproducibles.

## AWS Lambda

<mark>**AWS Lambda** es un servicio serverless que nos permite ejecutar código en respuesta a eventos, sin preocuparnos por servidores o infraestructura.</mark> Estos eventos pueden ser temporizadores, visitas a alguna sección de nuestra aplicación, solicitudes HTTP, entre otros.

Entre sus casos de uso encontramos el (pre)procesamiento de datos a escala, y la ejecución de backends web, móviles y de IoT interactivos. Lambda se puede combinar con otros servicios de AWS para crear experiencias en línea seguras, estables y escalables.

**¿Cómo se factura Lambda?**

Lambda se factura por milisegundos, y el precio depende del uso de RAM. Por ejemplo, 128MB RAM x 30 millones de eventos por mes resultan en un costo de $11.63 al mes.

Lambda ofrece 1 millón de solicitudes gratis al mes, con el nivel gratuito de AWS.

**AWS Lambda** es un servicio de cómputo sin servidor proporcionado por Amazon Web Services (AWS) que te permite ejecutar código en respuesta a eventos sin tener que administrar servidores. Es parte de la plataforma de cómputo sin servidor de AWS y ofrece una forma flexible y escalable de ejecutar código en la nube.

**Características clave de AWS Lambda:**

- Sin Servidores: No necesitas preocuparte por la administración de servidores, ya que AWS se encarga de todo el infraestructura subyacente. Solo te enfocas en escribir y subir tu código.
- Escalabilidad Automática: Lambda escala automáticamente la capacidad de cómputo en función de la carga de trabajo. Se asignan recursos según sea necesario para manejar las solicitudes entrantes.
- Pagos por Uso: Pagas solo por el tiempo de ejecución de tu código, sin tarifas fijas ni costos por tiempo de inactividad. Esto lo hace rentable para aplicaciones con cargas de trabajo variables.
- Integración con Servicios de AWS: Lambda se integra con muchos otros servicios de AWS, como Amazon S3, DynamoDB, API Gateway, SNS, entre otros, lo que te permite construir aplicaciones complejas y sin problemas.
- Event-Driven: Lambda se ejecuta en respuesta a eventos, como cambios en la base de datos, cargas de archivos en S3, mensajes en colas de mensajes, solicitudes HTTP, entre otros. Esto permite una arquitectura orientada a eventos.
- Soporte Multi-Lenguaje: Puedes escribir funciones Lambda en varios lenguajes de programación, incluyendo Node.js, Python, Java, Go, Ruby, y .NET Core.

## Almacenamiento de datos en AWS

El almacenamiento de datos en la nube consiste en subir tus datos a dicha red de servidores, donde se te proporcionan herramientas para que puedas acceder a ellos de diferentes maneras.

**Tipos de almacenamiento y sus servicios**

Podemos utilizar distintos tipos almacenamiento datos, y para estos hay servicios de AWS. Los tipos de almacenamiento son:

- Basado en archivos: el más conocido por todos. Archivos organizados por carpetas y subcarpetas (sistema de ficheros). En esta categoría encontramos a Amazon Elastic File System (EFS) y Amazon FSx for Windows File Server.
- Bloque: los archivos se almacenan en volúmenes por fragmentos de datos de igual tamaño, sin procesar. Este tipo de almacenamiento es utilizado como disco duro de nuestros servidores o máquinas virtuales. En esta categoría está Amazon Elastic Block Store (EBS).
- Objetos: la información almacenada se almacena como objetos, de manera que cada objeto recibe un identificador único y se almacena en un modelo de memoria plana. Un ejemplo de esto es Amazon Simple Storage Service (S3).

**Respaldo de datos**

Amazon Backup administra y automatiza de forma centralizada las copias de seguridad en los servicios de AWS.

**Servicios de transferencia de datos**

¿Qué pasa si necesitamos transferir datos de nuestros servidores hacia AWS (o viceversa)? AWS ofrece distintos servicios para la transferencia de datos.

- AWS Storage Gateway: un conjunto de servicios de almacenamiento en la nube híbrida que brinda acceso en las instalaciones al almacenamiento en la nube.
- AWS DataSync: acelera el traslado de datos desde y hacia AWS hasta diez veces más rápido de lo normal.
- AWS Transfer Family: escala de forma segura tus transferencias recurrentes de archivos de Amazon S3 y Amazon EFS con los protocolos FTP, SFTP y FTPS.

## S3 y S3 Glacier

**S3 almacenamiento de objetos**

- Garantía de no perdida del 99.999999999% (11 9's)

**Clases de almacenamiento**

- S3 Standard: ofrece almacenamiento de objetos de alta durabilidad, disponibilidad y rendimiento para datos a los que se obtiene acceso con frecuencia
- S3 Standard-IA: Acceso poco frecuente, se utiliza con datos a los que se obtiene acceso con menos frecuencia, pero que requieren un acceso rápido cuando es necesario
- S3 Zone-IA: Acceso poco frecuente se usa con datos a los que se obtiene acceso con menos frecuencia, pero que requieren un acceso rápido cuando es necesario. A diferencia de las demás clases de almacenamiento de S3, que almacenan datos en un mínimo de tres zonas de disponibilidad (AZ)
- S3 Glacier: clase de almacenamiento de archivos que ofrece el almacenamiento de menor costo para los datos de larga duración a los que rara vez se accede. Se tarde entre 12h y 48h para su recuperación. $1/TB/month
- S3 Glacier Deep Archive: es la clase de almacenamiento más económica de Amazon S3, y admite la retención a largo plazo y la conservación digital de datos a los que se accede una o dos veces al año
- S3 Intelligent-Tiering es un nuevo tipo de almacenamiento de Amazon S3 diseñado para los clientes que deseen optimizar los costos de almacenamiento automáticamente cuando los patrones de acceso a los datos cambian, sin afectar el rendimiento o la sobrecarga operativa 

## Explicando el Amazon Elastic File System (EFS)

<mark>**Amazon Elastic File System (EFS)** brinda un sistema de archivos elástico, sencillo, sin servidor y práctico basado en NFS para las máquinas virtuales de EC2.</mark>

**NFS** es un protocolo de archivos en red que permite acceder a archivos y directorios que no están en tu sistema. Esto permite que miles de máquinas puedan conectarse a EFS y procesar los datos que allí se encuentran.

**Características de EFS**

EFS es altamente disponible y duradero. Provee protección contra una interrupción de la zona de disponibilidad, replicando los archivos en múltiples zonas dentro de una región.

**Adicionalmente:**

- EFS brinda dos clases de almacenamiento: Standar y Standar IA (para acceso poco frecuente). 
- Puedes implementar políticas para que tus archivos se muevan de Standar a Standar IA después de cierto tiempo.
- Los datos están encriptados de manera automática.

## AWS Storage Gateway

<mark>**AWS Storage Gateway** nos brinda acceso a almacenamiento en la nube prácticamente ilimitado desde nuestra propia infraestructura.</mark>

Storage Gateway se compone de tres puertas de acceso diferentes:

- **File Gateway** provee interfaces SMB y NFS para amazon S3, tanto en Windows como en Linux. Gracias a File Gateway, en ambos sistemas operativos veremos un sistema de archivos tal cual como si fuera un disco montado en nuestros computadores, los cuales escriben archivos al sistema, y File Gateway se encarga de guardarlos en S3.

Gracias a esto podemos guardar archivos a S3 como si se tratara de guardar archivos locales. Los archivos S3 luego pueden ser usados por cualquier servicio de AWS.

**Tape Gateway** Supón que tienes copias de seguridad en cintas físicas. Tape Gateway te permite migrar copias de seguridad a una bibliteca de cintas virtuales en AWS. Tape Gateway es compatible con los principales software de respaldo.

Los contenidos de tus cintas se guardan en S3, lo que te permite implementar S3 Glacier y S3 Glacier Deep Archive para guardar tus copias de seguridad a largo plazo. Una vez que implementas Tape Gateway, puedes olvidarte de los costos relacionados a mantener las cintas físicas.

**Volume Gateway** otorga almacenamiento en bloque con protocolo iSCSI, respaldado en la nube. Almacena datos en S3 de acuerdo a dos modos:

- Modo caché: almacena los datos principales en S3, mientras que los datos de acceso frecuente se guardan localmente y en caché.
- Modo almacenado: todos los datos se guardan localmente, mientras que se hace una copia de seguridad de manera asíncrona en S3.

**Conclusión**

Vimos tres posibilidades de uso de Amazon Storage Gateway. Para cada caso de uso, hay una puerta de acceso adecuada, ya sea File, Tape o Volume Gateway.

## Laboratorio: crea tu primer bucket de S3 para guardar objetos

## Laboratorio: versionamiento

## Bases de datos en AWS

Las bases de datos son colecciones estructuradas de datos. Almacenan datos eletrónicamente, y se acceden a ellos desde un sistema informático. AWS cuenta con más de quince motores de bases de datos diferentes, seguros y altamente disponibles.

**Bases de datos relacionales**

Los servicios de bases de datos relacionales en AWS son:

- Amazon Aurora: base de datos relacional compatible con MySQL y PostgreSQL creada para la nube.

- Amazon Relational Database Service (Amazon RDS): servicio de bases de datos relacionales administrado para MySQL, PostgreSQL, MariaDB, Oracle BYOL o SQL Server. Facilita la configuración, el uso y el escalado de varios motores de bases de datos.

- Amazon Redshift: ideal para analítica. Usa SQL para analizar datos estructurados y semiestructurados en almacenamientos de datos, bases de datos operativas y lagos de datos, con hardware y machine learning diseñados por AWS para ofrecer rendimiento al mejor precio a cualquier escala.

**Bases de datos clave-valor**

- Amazon DynamoDB es una base de datos de documentos y valores clave que ofrece un rendimiento de milisegundos de un solo dígito a cualquier escala. Está dirigida a aplicaciones de web de alto tráfico, sistemas de comercio electrónico y aplicaciones de juego.

**Bases de datos en memoria**

- Amazon ElastiCache es un servicio de almacenamiento de caché en memoria completamente administrado que admite casos de uso flexibles y en tiempo real. Se usa para almacenar en caché administración de sesiones, tablas de clasificación de juegos y aplicaciones Geo-Espaciales. En ElastiCache encontramos ElastiCache para Memcached y ElastiCache para Redis.

**Bases de datos basadas en documentos**

- Amazon DocumentDB es un servicio de base de datos de larga duración, de alta disponibilidad, rápida, escalable y completamente administrado para operar cargas de trabajo de MongoDB esenciales. Entre sus casos de uso se encuentra la gestión de contenidos, catálogos y perfiles de usuario. Compatible con MongoDB.

## Ventajas de Amazon RDS

**RDS** Servicio de base de datos relacional, puedes crear ejecutar y escalar bd relacionales en la nube ¿Base de Datos Relacional? Datos almacenados estan relacionados entre si.

**Motores de base de datos en RDS**

- MySQL
- MariaDB
- Microsoft SQL Server
- PostgreSQL
- Oracle
- Amazon Aurora

**Amazon RDS**

Facilita la configuración de las base de datos: Unos pocos clics en la consola de AWS
- Servicio completamente administrado
- Altamente escalable: Se puede usar en todas las zonas de disponibilidad y algunas bases de datos permiten crear replicas de otras bases de datos de solo lectura y permite mejorar el rendimiento.
- Copias de seguridad automaticas: Permite crear instantaneas y crear una nueva base de datos a partir de la instantanea. Si alguna falla se reemplaza automaticamente (quiza ni lo notes).
- Realmente rentable: Solo pagas por lo que usas, un cargo mensual, puedes detener e iniciar las instancias hasta 7 dias despues.

## La base de datos DynamoDB

Es un poco diferente, se conoce como base de datos NoSQL, los datos se recuperan de una forma diferente a SQL.

- Base de datos de documentos de clave - valor.
- Rendimiento de milisegundos de un solo digito.
- Completamente administrado.
- Funciona en múltiples regiones.
- Seguridad, respaldo y restauración integrados.
- Admite picos de 20,000,000 de solicitudes por segundo.
- Realmente rentable

**Casos de uso**
- Publicidad
- Juegos
- eCommerce
- Bancos
- Redes sociales
- Media Entertainment
- El propio internet

## ¿Qué es ElastiCache?

<mark>**Amazon ElastiCache** es un servicio de almacenamiento en memoria 100% administrado que admite casos de uso flexibles y en tiempo real.</mark>

**Es una base de datos en memoria que almacena datos a los que se ha accedido previamente en memoria caché**, para mejorar la rapidez de acceso a estos datos. Consultar datos en caché siempre es más rápido que consultar directamente la base de datos.

Un ejemplo de uso es el de un sitio de noticias, al cual se accede miles de veces al día. Si los artículos se mantienen en una base de datos en memoria, se podrá acceder a estos mucho más rápido.

ElastiCache **posee dos motores, Redis y Memcached**. Ambos se monitorean a sí mismos continuamente, y pueden ser escalados hacia arriba o abajo en función de la demanda de la aplicación.

**Amazon ElastiCache** es un servicio de almacenamiento de caché en memoria completamente administrado que admite casos de uso flexibles y en tiempo real. Casos de uso:

Acelera el rendimiento de las aplicaciones: Accede a los datos con una latencia de microsegundos y un alto rendimiento para que las aplicaciones funcionen rápido.

Reduce la carga de la base de datos del backend: Almacena los datos en caché para reducir la exigencia sobre la base de datos del backend, lo que permite una mayor escalabilidad de la aplicación y reduce la carga operativa.

Cree almacenes de datos de baja latencia: Almacena conjuntos de datos no duraderos en la memoria y admite aplicaciones en tiempo real con una latencia de microsegundos.

**Almacenamiento Cache**: Es simplemente recordar las cosas a las que has accedido antes. Un "Almacén de datos en memoria" se refiere a almacenar cosas que has solicitado previamente desde tu base de datos en memoria o RAM.

Con el almacenamiento en cache accedes primero a ElastiCache en lugar de la base de datos. Configurada correctamente, una base de datos en memoria como ElastiCache puede responder con una latencia de menos de milisegundos.

**NOTA: **Leer datos desde una base de datos en un disco siempre sera mas lento que ubicar algo en memoria cache.

**Casos de uso**:

Sitio de noticias: Acelera la velocidad con la que se encuentran los articulos en la base de datos, en lugar de acceder a la base de datos cada vez que un visitante llegue a la pagina, los artículos ya están listos para ser enviados por la memoria cache.

**Motores**:

- ElastiCache para Redis.
- ElastiCache para Memcached.

Ambos proporcionan un rendimiento extremo, están completamente administrados, no se requiere aprovisionamiento de hardware, ni parcheo de software. ElastiCache se monitorea a si mismo constantemente para garantizar que todo este siempre en linea, y que sea escalable. Se puede escalar hacia arriba o hacia abajo, según sea necesario para satisfacer las necesidades fluctuantes de la aplicación.

Permiten mantener sitios web de alto trafico que requieran baja latencia con procesamiento a tiempo real.

**Algunas de las empresas mas conocidas que usan ElastiCache de AWS son**:

- Peloton
- AirBNB
- Duolingo



Amazon S3 -> Amazon Simple Storage Service
EC2 -> Elastic Compute Cloud


