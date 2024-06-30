---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Introducción a Redes, Gobernanza y Machine Learning
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
description: Introducción a Redes, Gobernanza y Machine Learning
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

## Qué son las redes

Redes es la forma de como estamos conectados

El internet para que funcione como funcione hoy en día es necesario contar con direcciones Ip’s, enrutadores, DNS y seguridad

AWS nos proporciona servicios para que puedan suceder todas estas cosas adicionando servicios para la entrega de contenido permitiendo tener a los usuario los datos de manera rápida.

Dentro de los **servicios** que proporciona AWS tenemos:

- Amazon Virtual Private Cloud (Amazon VPC) Nos permite definir y aprovisionar un red aislada para nuestro recursos de aws
- Amazon Transit Gateway Nos permite conectar VPS y los recursos locales
- Amazon PrivateLink Nos permite proporcionar conectividad privada entre las VPS y las aplicaciones locales
- Amazon Route 53 Nos permite alojar nuestro propio DNS Administrado

**Redes a escala**

- Elastic Load Balancing Nos permite distribuir automáticamente el trafico de red a través de un grupo de recursos
- AWS Global Accelerator No permite dirigir el trafico a través de la red global de aws, para mejorar el rendimiento de las aplicaciones globales

**Entrega de contenido**

- Amazon CloudFront No permite entregar de forma segura, datos videos y aplicaciones a clientes de todo el mundo con baja latencia y altas velocidad de transferencia


## Qué es una VPC

<mark>Una **VPC** es una red virtual privada</mark>. Cada computadora que está conectada a otra computadora por medio de un cable, enrutador o antena de wifi, requiere de una interfaz de red para ser conectada. La interfaz de red es el puente entre nuestra computadora y la tecnología ya utilizada para conectarse a la otra computadora.

Una vez que conectamos las computadoras, debemos configurar la red, para lo cual necesitamos un rango de direcciones IP.

**Qué es el rango de direcciones IP**

El rango de direcciones IP es como una comunidad cerrada local, donde los equipos se podrán comunicar solo con otros equipos dentro de la misma red. A cada equipo se le asigna una dirección IPv4. Es decir, se le dan 4 números que varían del 0 al 255 separados por un punto. Para redes privadas ya se tienen especificados los rangos de IP:

- 10.0.0.1
- 172.16.0.1
- 192.168.0.1

**Para qué sirve Amazon VPC**

Amazon VPC permite crear una red virtual para poder conectarnos a todos los servicios de AWS que existan en un rango de direcciones IP locales (por ejemplo, 10.0.0.0/24, que representa del rango de IP entre 10.0.0.0 y 10.0.0.255). Esta red virtual será como una pequeña comunidad cerrada para nuestras máquinas virtuales y todos los servicios que tengamos dentro de AWS.

**Componentes de Amazon VPC**

Amazon VPC posee los siguientes componentes para controlar el tráfico interno y externo de nuestras VPC

- Nat Gateway: si deseamos que nuestras máquinas virtuales puedan acceder a internet, debemos utilizar este componente
- Internet Gateway: permite que Internet pueda acceder a nuestra instancia de EC2
- ACL Control List: controla el tráfico que vamos a permitir dentro y fuera de la VPC

## Escogiendo CloudFront

Antes de hablar de CloudFront, recordemos cómo funciona AWS ElastiCache. **ElastiCache** es un servicio que almacena en memoria caché las solicitudes a la base de datos, para evitar el consultar la base de datos cada vez que se necesite acceder a información. Este servicio se ubica entre el sitio web y la base de datos

CloudFront funciona de manera similar, solo que este es un servicio intermedio entre el navegador (o el cliente) y el sitio web. **El propósito de CloudFront es entregar datos, aplicaciones y sitios web en todos el mundo con baja latencia**. Para esto, AWS cuenta con **edge locations** (o ubicaciones de borde), es decir, múltiples ubicaciones en el mundo desde las cuales CloudFront puede servir contenido.

**Casos de uso de CloudFront**

Supongamos que un cliente accede a nuestro sitio web. En realidad, el cliente primero accede a CloudFront. Entonces CloudFront redirige automáticamente la solicitud de archivo desde el edge location más cercano. Los archivos se almacenan en la caché de la ubicación de borde primero, durante un periodo de tiempo limitado que nosotros necesitemos.

Si un cliente solicita el contenido que está almacenado en caché por más tiempo que el vencimiento especificado, CloudFront verifica en el servidor de origen para ver si hay una nueva versión del archivo disponible. Si el archivo ha sido modificado, se retorna la nueva versión del archivo. En caso contrario, se entrega la versión que estaba en caché.

Cualquier cambio que realicemos en los archivos se replicará en las ubicaciones de borde a medida que sus visitantes están entrando y solicitando el contenido. Esto es lo que mantiene a los sitios web rápidos sin importar la ubicación del usuario.

**Características de CloudFront**

- CloudFront es seguro: ofrece protección contra ataques DDOS, ya que los primeros servidores en recibir estos ataques serán los de CloudFront y no los tuyos. Además, CloudFront está protegido ante picos de tráfico.
- CloudFront también permite ejecutar funciones de AWS Lambda en las ubicaciones de borde.
- CloudFront ofrece múltiples métricas en tiempo real, y es rentable.

## Qué es Route 53

**DNS** es un sistema que asigna direcciones IP a nombres de dominio. Route 53 es un servicio de alojamiento de DNS, que cuesta tan solo $0.5 por nombre de dominio por mes. Route 53 cuenta con distintas opciones de política de enrutamiento.

**Políticas de enrutamiento**

Las políticas de enrutamiento nos permiten determinar a dónde se dirigirá un usuario cuando acceda a nuestro dominio. Estas políticas son:

- Ruteo simple: El ruteo simple utiliza el servicio de DNS estándar. Es decir, el tráfico en un dominio se enruta hacia un recurso muy específico.

- Política ponderada: La política ponderada (o weighted routing) te permite asociar múltiples recursos con un solo nombre de dominio, y ver qué tanto tráfico es dirigido a cada recurso. Esto se determina con un número del 0 al 255, donde el cero representa que el recurso no recibe ningún tráfico, y el 255 indica que el recurso recibe todo el tráfico.

Mediante la política ponderada podemos probar distintas versiones de nuestro sitio web con un número reducido de usuarios. Luego podemos realizar una transición lenta de nuestros usuarios hacia la nueva versión del sitio.

- Política de geolocalización: Usando la política de geolocalización podemos escoger qué recursos servir en función de la ubicación geográfica de nuestros usuarios. Esto permite servir contenido específico según la región, así como restringir la distribución del mismo solo a las regiones permitidas.

- Política de latencia: La política de latencia se trata de entregar los recursos desde la región de AWS que esté más cercana a la ubicación del usuario, a fin de reducir el tiempo de respuesta.

- Política de conmutación por error: La política de conmutación por error redirige el tráfico a un recurso cuando este está en buen estado, o a uno diferente cuando el primer recurso no está en buen estado.

- Política de respuesta de múltiples valores: La respuesta de múltiples valores permite devolver varios valores, como direcciones IP a los servidores web, en respuesta a las consultas de DNS. Se pueden especificar varios valores para casi cualquier registro, pero este direccionamiento también permite verificar el estado de cada recurso, por lo que Route 53 devuelve los valores únicamente para los recursos en buen estado.

Esta política no es sustituto de un balanceador de carga, pero la capacidad de devolver varias direcciones IP (cuyo estado sea comprobable) permite usar el DNS para mejorar la disponibilidad y el equilibrio de la carga.

**Conclusión**

**Route 53 es un servicio complejo, pero útil para mantener nuestros sitios web rápidos y altamente disponibles. Es rentable, seguro, escalable, y posee distintas opciones de enrutamiento para distintos casos.**

**¿Porqué 53?**

DNS utiliza un puerto conocido, en TCP y UDP ocupa el puerto “ 53” de ahí su nombre.

## Cómo crear el diagrama de una VPC

## Cómo crear la VPC y el internet gateway

## Administración y gobernanza con AWS

En el pasado, las organizaciones tenían que lograr un equilibrio enter innovar y mantener el control sobre los costos, la seguridad y el cumplimiento. **Los servicios de administración y gobernanza de AWS** tienen como objetivo simplificar el trabajo para lograr el equilibrio.  

En el contexto de Amazon Web Services (AWS), la gobernanza se refiere a las políticas, procesos y herramientas que se utilizan para administrar, controlar y asegurar el uso adecuado de los recursos de AWS dentro de una organización. La gobernanza en AWS tiene como objetivo establecer las mejores prácticas, garantizar la seguridad, optimizar los costos y mantener el cumplimiento de las políticas y regulaciones internas y externas.


Los servicios de administración y gobernanza de AWS tienen como objetivo reducir costos

Estos son algunos servicios para esto: 

<mark>ADMINISTRACIÓN DE CUENTAS</mark>

- **AWS Control Tower**: Fácil de configurar y gobernar en un entorno seguro de AWS de múltiples cuentas.
    
AWS Control Tower ofrece la manera más fácil de configurar y controlar un entorno de AWS nuevo, seguro y con varias cuentas, denominado zona de destino. 
    
Crea su zona de destino mediante AWS Organizations, lo que aporta administración y gobernanza continuas de la cuenta, así como prácticas recomendadas de implementación basadas en la experiencia de AWS mediante el trabajo con miles de clientes cuando se trasladan a la nube. 
    
Es gratuito para siempre con el nivel gratuito de AWS

- **AWS Organization**: Forma de administrar y gobernar de manera centralizada sus entornos en varias cuentas de AWS.
    
AWS Organizations lo ayuda a administrar y controlar de manera centralizada su entorno a medida que crece y escala sus recursos de AWS. 
    
Con AWS Organizations, puede crear de manera programática nuevas cuentas de AWS y asignar recursos, agrupar cuentas para organizar sus flujos de trabajo, aplicar políticas a cuentas o grupos para el control y simplificar la facturación mediante un único método de pago para todas sus cuentas.

- **AWS Budgets**: Mejorar nuestra planificación y control de costos.
    
AWS Budgets le permite definir presupuestos personalizados para hacer un seguimiento del costo y el uso, tanto en los casos de uso más simples como en los más complejos. Con AWS Budgets, puede elegir que le envíen notificaciones de alerta por correo electrónico o SNS cuando el costo o el uso real o previsto exceda el umbral del presupuesto, o cuando la cobertura o el uso de Savings Plans o las instancias reservadas disminuya por debajo del umbral definido. 
    
Con AWS Budget Actions, también puede configurar acciones de respuesta específicas relacionadas con el estado del costo y el uso de sus cuentas, de modo que si estas variables exceden, o se prevé que excedan, el umbral definido, se ejecuten acciones automáticamente, o con su aprobación, para reducir los gastos excesivos accidentales.

- **¿Cuándo usar AWS Control Tower?**

Si bien AWS Organizations le permite administrar su entorno en varias cuentas de forma centralizada, AWS Control Tower automatiza muchos de los pasos necesarios para crear su entorno y gobernar a escala.Simplifica muchos de los pasos de aprovisionamiento para otros servicios de AWS, lo que ahorra tiempo y esfuerzo al proporcionar un modelo de gobierno listo para la nube.

<mark>SERVICIOS DE APROVISIONAMIENTO</mark>

- **AWS CloudFormation**: Permitir modelar y aprovisionar todos sus recursos a través de código.
    
AWS CloudFormation es un servicio que lo ayuda a modelar y configurar sus recursos de AWS para que pueda dedicar menos tiempo a administrar esos recursos y más tiempo a concentrarse en sus aplicaciones que se ejecutan en AWS. 
    
Usted crea una plantilla que describe todos los recursos de AWS que desea (como instancias de Amazon EC2 o instancias de base de datos de Amazon RDS), y CloudFormation se encarga de aprovisionar y configurar esos recursos por usted. No necesita crear y configurar individualmente los recursos de AWS y descubrir qué depende de qué; CloudFormation se encarga de eso.

- **AWS OpsWorks**: automatizar las operaciones.
    
AWS OpsWorks es un servicio de administración de configuración que ofrece instancias administradas de Chef y Puppet. Chef y Puppet son plataformas de automatización que le permiten usar su código para automatizar la configuración de sus servidores. 

OpsWorks le permite usar Chef y Puppet para automatizar la manera en la que los servidores se configuran, implementan y administran en las instancias de [Amazon EC2](https://aws.amazon.com/es/ec2/) o en entornos informáticos en las instalaciones. 

OpsWorks ofrece tres versiones: [AWS Opsworks for Chef Automate](https://aws.amazon.com/es/opsworks/chefautomate/) , [AWS OpsWorks for Puppet Enterprise](https://aws.amazon.com/es/opsworks/puppetenterprise/) y [AWS OpsWorks Stacks](https://aws.amazon.com/es/opsworks/stacks/).


- **AWS Service Catalog**: Crear, organizar y gobernar un catálogo de productos de AWS.
    
AWS Service Catalog permite a las organizaciones crear y administrar catálogos de servicios de TI aprobados para su uso en AWS. En estos servicios de TI se incluye todo lo relacionado con imágenes de máquinas virtuales, servidores, software y bases de datos para completar las arquitecturas de aplicaciones multinivel. 

AWS Service Catalog le permite administrar servicios implementados de TI y sus aplicaciones, recursos y metadatos desde un único lugar. Esto le ayuda a lograr un control uniforme y a cumplir sus requisitos de conformidad, a la vez que permite a los usuarios implementar con rapidez solo los servicios aprobados de TI que necesitan.

- **AWS Marketplace**: Comprar e implementar software que se ejecuta en AWS.
    
AWS Marketplace es un catálogo digital seleccionado que los clientes pueden usar para buscar, comprar, implementar y administrar software, datos y servicios de terceros para crear soluciones y administrar sus negocios. 
    
AWS Marketplace incluye miles de listados de software de categorías populares, como seguridad, aplicaciones comerciales, aprendizaje automático y productos de datos en industrias específicas, como atención médica, servicios financieros y telecomunicaciones. 

Los clientes pueden lanzar rápidamente software preconfigurado y elegir soluciones de software en Amazon Machine Images (AMI), software como servicio (SaaS) y otros formatos.

<mark>SERVICIOS PARA OPERAR SU ENTORNO</mark>

- **Amazon Cloudwatch**: observar nuestros servicios a través de métricas y registros.
    
Es un servicio de monitoreo y observabilidad creado por desarrolladores, ingenieros de fiabilidad de sitios (SRE), administradores de TI, propietarios de productos e ingenieros de DevOps. CloudWatch proporciona datos e información procesable para que monitoree sus aplicaciones, responda a cambios de rendimiento que afecten a todo el sistema y optimice el uso de recursos. 
    
CloudWatch recopila datos operativos y de monitoreo en forma de registros, métricas y eventos. Se obtiene una vista unificada del estado operativo y una visibilidad completa de sus recursos, aplicaciones y servicios de AWS que se ejecutan en AWS y en las instalaciones. 
    
Puede usar CloudWatch para detectar comportamientos anómalos en sus entornos, establecer alarmas, comparar registros y métricas, realizar acciones automatizadas, resolver problemas y descubrir información para mantener el buen funcionamiento de sus aplicaciones.
    
Monitorear sus recursos y aplicaciones de AWS con Amazon CloudWatch es sencillo. Está integrado de manera nativa con más de 70 servicios de AWS, como Amazon EC2, Amazon DynamoDB, Amazon S3, Amazon ECS, Amazon EKS y AWS Lambda.
    
**10 alarmas y métricas personalizadas gratuitas** con la [capa gratuita de AWS](https://aws.amazon.com/es/cloudwatch/pricing/?loc=ft#Free_tier)
    
https://aws.amazon.com/es/cloudwatch/

- **Amazon Config** : Registrar y evaluar las configuraciones de nuestros diversos recursos de AWS.
    
AWS Config es un servicio que permite examinar, auditar y evaluar las configuraciones de sus recursos de AWS. Config monitorea y registra constantemente las configuraciones de sus recursos de AWS y le permite automatizar la evaluación de las configuraciones registradas con respecto a las configuraciones deseadas. 
    
Con Config, puede revisar los cambios en las configuraciones y las relaciones entre los recursos de AWS, profundizar en los historiales detallados de configuración de recursos y determinar la conformidad general con respecto a las configuraciones especificadas en sus pautas internas. Esto le permite simplificar las auditorías de conformidad, los análisis de seguridad, la administración de cambios y la resolución de problemas operativos.
    
https://aws.amazon.com/es/config/

- **AWS CloudTrail**: Rastrea toda la actividad del usuario en la cuenta de AWS. Extremadamente importante para las investigaciones de seguridad.
    
Es un servicio de AWS que lo ayuda a habilitar la gobernanza, el cumplimiento y la auditoría operativa y de riesgo de su cuenta de AWS. Las acciones realizadas por un usuario, una función o un servicio de AWS se registran como eventos en CloudTrail. Los eventos incluyen acciones realizadas en la consola de administración de AWS, la interfaz de línea de comandos de AWS y los SDK y las API de AWS.
    
CloudTrail está habilitado en su cuenta de AWS cuando lo crea. Cuando se produce actividad en su cuenta de AWS, esa actividad se registra en un evento de CloudTrail. Puede ver fácilmente los eventos recientes en la consola de CloudTrail yendo al Historial de eventos.
    
Puede utilizar CloudTrail para ver, buscar, descargar, archivar, analizar y responder a la actividad de la cuenta en su infraestructura de AWS. Puede identificar quién o qué realizó qué acción, sobre qué recursos se actuó, cuándo ocurrió el evento y otros detalles para ayudarlo a analizar y responder a la actividad en su cuenta de AWS.
    
https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html

- **Systems Manager**: Optimizar de rendimiento y la seguridad mientras administramos una gran cantidad de sistemas.
    
Le brinda visibilidad y control de su infraestructura en AWS. Systems Manager proporciona una interfaz de usuario unificada para que pueda ver los datos operativos de varios servicios de AWS y le permite automatizar las tareas operativas en sus recursos de AWS.
    
Con Systems Manager, puede agrupar recursos, como instancias de Amazon EC2, depósitos de Amazon S3 o instancias de Amazon RDS, por aplicación, ver datos operativos para monitorear y solucionar problemas, y tomar medidas en sus grupos de recursos.
    
Systems Manager simplifica la gestión de recursos y aplicaciones, acorta el tiempo para detectar y resolver problemas operativos y facilita el funcionamiento y la gestión de su infraestructura de forma segura a escala.

- **Amazon X-Ray**: Analizar y derivar aplicaciones de producción.
    
Ayuda a desarrolladores a analizar y depurar aplicaciones distribuidas de producción, como las creadas con una arquitectura de microservicios. Con X-Ray, puede saber cuál es el nivel de rendimiento de su aplicación y sus servicios subyacentes para identificar y resolver la causa raíz de los problemas y los errores de rendimiento. 
    
X-Ray proporciona una vista completa de las solicitudes a medida que avanzan por su aplicación y le muestra un mapa de los componentes subyacentes de la aplicación.
    
**100 000 rastreos registrados gratis** por mes con el [nivel gratuito de AWS](https://aws.amazon.com/es/xray/pricing/?loc=ft)   

https://aws.amazon.com/es/xray/

## Qué es CloudFormation y cuáles son sus beneficios

**CloudFormation** nos permite crear nuestra infraestructura, como una máquina virtual de EC2, una VPC o incluso entrega de contenido (CloudFront). Para esto se usan las CloudFormation Templates, que son plantillas en donde especificamos los recursos que queremos desplegar. Estas plantillas pueden estar en formato JSON o YAML, y en ellas se define un stack o pila de recursos a provisionar.

- Control de versiones: si podemos definir el código de la organizaicón en un archivo de texto podemos utilizar Git para mantener un historial de la estructura. Podemos volver a una versión anterior y nos permite que varias personas trabajen en la infraestructura al mismo tiempo.

- Anidamiento: CloudFormation permite tener una plantilla master que llama al resto de plantillas.

- Automatización: los usuarios pueden crear y aprovisionar recursos de AWS de manera automática y consistente, lo que reduce la posibilidad de errores humanos y aumenta la eficiencia.

- Escala: Si queremos trasladar infraesructura a otra región, o en varias cuentas, no debemos duplicar estructura manualmente.  

Amazon **CloudFormation** es un servicio que ayuda a los usuarios a modelar y configurar recursos de Amazon Web Services (AWS) de manera segura y eficiente. <mark>Permite a los usuarios utilizar archivos de texto, llamados plantillas, para describir y aprovisionar todos los recursos de AWS necesarios para sus aplicaciones</mark>. 

Los beneficios de usar CloudFormation incluyen:

- Gestión de infraestructura como código: CloudFormation permite a los usuarios describir y aprovisionar su infraestructura de AWS utilizando archivos de texto. Esto significa que pueden versionar, compartir y revisar su infraestructura de la misma manera que lo hacen con el código de software.

- Automatización del aprovisionamiento de recursos: Con CloudFormation, los usuarios pueden crear y aprovisionar recursos de AWS de manera automática y consistente, lo que reduce la posibilidad de errores humanos y aumenta la eficiencia.

- Consistencia y reproducibilidad: Las plantillas de CloudFormation permiten a los usuarios crear y configurar recursos de AWS de manera consistente y reproducible. Esto es especialmente útil en entornos de desarrollo, pruebas y producción.

- Gestión de dependencias: CloudFormation gestiona las dependencias entre los recursos para que los usuarios no tengan que preocuparse por el orden en el que se crean los recursos.

- Seguridad y conformidad: CloudFormation se integra con AWS Identity and Access Management (IAM), lo que permite a los usuarios establecer permisos detallados para cada recurso.

- Integración con otros servicios de AWS: CloudFormation se integra con otros servicios de AWS, lo que permite a los usuarios gestionar y orquestar todos sus recursos de AWS desde un solo lugar.

**Infraestructura como código, diferencias básicas entre CloudFormation y Terraform.**

<mark>Cloudformation</mark>

- CloudFormation es la solución oficial de Amazon Web Services (AWS) para manejar infraestructura como código.

- Soporta casi todos los tipos de recursos que define Amazon. Se escribe en JSON o YAML.

- Además de funcionar en Amazon Web Services funciona también en OpenStack, a través del servicio Heat, aunque con algunas limitaciones.

- Resulta muy sencillo de usar a la hora de romper infraestructuras monolíticas creando Substacks.

**Terraform**

- Terraform es la solución de HashiCorp para la infraestructura como código.

- Es una solución independiente del sistema de nube que queramos usar, se puede usar con AWS, con OpenStack y muchos otros proveedores.

- Cada proveedor puede ofrecer mayor o menor soporte a la nube que va a usar por detrás.

- Soporta el refresco de recursos desde la nube, es decir, si algún recurso se borra, podemos notificárselo a Terraform.

- Usa un lenguaje propio: HCL (HashiCorp Configuration Language).

**CloudFormation nos puede interesar si...**

- No necesitamos soporte para otros proveedores de nube.
- Solo estamos usando Amazon Web Services.
- Si necesitamos acceso a casi todos los tipos de recurso de AWS que CloudFormation puede proveer.
- Si queremos soporte oficial de AWS, ya que de lo contrario no nos lo podrán dar.
- En el caso de Terraform puede ser interesante si...
- Tenemos que soportar varios proveedores de nubes.
- Siempre que todos los recursos que necesitemos estén soportados por nuestro proveedor de Terraform.
- Si no estamos pagando soporte AWS, ya que podemos usar Terraform de forma gratuita o elegir tener soporte con HashiCorp.
- Por otro lado, HCL se considera normalmente un lenguaje algo más asequible que JSON o YAML.

Fuentes: CloudFormation o Terraform ¿Cual usar?

## Qué es Cloudwatch

Es una servicio de supervision y observabilidades de aws para aws

Esta diseñado para que podamos ver todo lo que sucede dentro de nuestra cuenta de aws, permitiendonos: 

- Recopilar metricas o datos de sus servicios
- Se integra con unos 80 servicios de AWS
- metricas predefinidad
- Recopila y despliega
- Configuracion de alarmas de acuerdo a los graficos que nos muestre cloudWaatch
- Permite enviar archivos de registro, buscar de forma interactiva datos de registros

Amazon **CloudWatch** se puede utilizar para configurar alarmas mediante las cuales, si esas métricas superan ciertos umbrales durante un período específico, puede generar una alarma en la que se pueden tomar medidas para remediar.

Las alarmas pueden estar en uno de tres estados:

- OK: Ocurre cuando una métrica está dentro del rango definido como aceptable.
- Alarma: se produce cuando una métrica supera un umbral durante un período.
- Datos insuficientes: Ocurre cuando faltan o están incompletos los datos necesarios para tomar la decisión.

**¿Qué es Amazon CloudWatch?**

Amazon CloudWatch es un servicio integral de monitoreo que te permite:

- Recopilar y rastrear métricas (como el uso de la CPU, la memoria y la latencia de red).
- Recoger y monitorear logs de aplicaciones y servicios.
- Configurar alarmas basadas en métricas específicas.
- Ver gráficos y tableros de monitoreo para visualizar el rendimiento de tus aplicaciones.
- Responder automáticamente a los cambios en tu entorno de AWS.
- Casos de uso de CloudWatch

**CloudWatch tiene una variedad de casos de uso, incluyendo**:

- Monitoreo de la salud de la aplicación: Los usuarios pueden configurar alarmas en CloudWatch para notificarles cuando la latencia de la aplicación excede un cierto umbral, permitiendo un monitoreo en tiempo real de la salud y el rendimiento de las aplicaciones.
- Resolución de problemas: CloudWatch recopila y almacena archivos de registro, lo que permite a los usuarios analizar los patrones de uso y los errores para resolver problemas rápidamente.
- Optimización de recursos: Al monitorear el uso de recursos, los usuarios pueden identificar los recursos subutilizados y hacer ajustes para optimizar los costos.
- Automatización de acciones: Los usuarios pueden configurar CloudWatch para que tome acciones automáticas basadas en las métricas y alarmas definidas. Por ejemplo, pueden configurar CloudWatch para que inicie nuevas instancias de EC2 cuando la carga de trabajo aumente.

## Cómo aplicar autoescalamiento

Nos permite escalar la capacidad de nuestra instacia automaticamente de acuerdo con nuetras condiciones definidad

Podemos aumentar la cantidad de instacia que tenemos en ejcucion durantes los picos de demanda y disminuirlos cuando no los necesitemos

**Para definir nuestro auto escalamiento**

- Definir un grupo automatico en donde asociaremos las instacias
- Especificar tamaño minimo
- Especificar capacidad deseada
- Escalar segun sea necesario

**Load Balancer** permite distribuir automaticamente las conexiones a medida que aparece y desaparecen estos servidores

**Nos permitirá**

- Alta desponibilidad
- Toleracia a fallas
- Mejora administracion de costos
- Podemos escalar EC2, DynamoDB, Aurora

## Laboratorio: empezando con CloudFormation

Esto es lo que vamos a realizar en este laboratorio .

![Laboratorio CloudFormation](/astro-doc-full-stack/images/cloud-computing/lab-clodformation.webp)

## Laboratorio: actualizando y eliminando la stack

- Se crean archivos UpdateStack.json para actualizar los Stacks
- Cuando subimos los archivos para actualizar los stacks, AWS me muestra los cambios que se van a realizar
- Una de las buenas practicas cuando usamos CloudFormation es que si iniciamos creando toda nuestra estructura con estos archivos, debemos siempre hacer los cambios con estos archivos y no manualmente dentro de los servicios
- No podemos cargar archivos Json con errores de tipografía
- Algunos servicios de AWS solo permite tener nombres únicos en sus componentes
- Los Stacks se pueden borrar fácilmente y junto con ellos todos los componentes que creamos
- Se borran los Stacks y se borra la estructura creada con ellos


Hay varios frameworks que nos permiten modelar los recursos en .yaml, .ts (typescript) entre otros que integrandolos con GitOps los CI de infraestructura se vuelve muy rápido :), ejemplos:

- Serverless Framework
- Pulumi
- Terraform

## Empezando con Machine Learning

El aprendizaje automatico es un tipo de inteligencia artificial donde podemos escribir programas que aprenden de los datos que se le proporcionan y tambien recuerda sus propios resultados de procesar estos datos

El programa aprende de ejecutarse una y otra ves

**Industrias**
- Automoviles automaticos
- Relojes Inteligentes
- Agricultura
- Perfil Financiero
- Correos electronicos

**Servicios IA**
- Amazon Kendra Brindara la busqueda inteligente de nuestros clientos
- Amazon Personalize Brindar recomendaciones personalisadas a nuestros clientes

**Servicios de analisis de metricas comerciales** 

- Amazon Lookout for metrics Es un servicio que detecta automaticamente cambios inesperados en aspecto como el rendimientos de los ingresos y la retencion de los clientes y NOS ayuda a identificar la causas
- Amazon Forecast Es un servicio que nos va a ayudar a crear modelos de pronosticos precisos
- Amazon Fraud Detector Es un servicio para identificar actividades en linea potencialmente fraudilentas

**Aprendizaje Automatico de la vista**

- Amazon Rekognition Permite analisar imagenes, videos y extraer el significado de estos

**Servicios de idiomas**
- Amazon Polly Nos ayuda a convertir el texto en un habla realista
- Amazon Transcribe Permite agregar traducciones de voz a texto de calidad de nuestras aplicaciones
- Amazon Lex Permite generar agentes conversacionales o voz de chat

## Qué es AWS Rekognition

Servicio que permite analizar videos e imágenes con aprendizaje automático.

**Casos de uso**

- Detecta todo lo que hay en una imagen
- Moderación de imágenes. Detecta contenido violento y así logra moderar el contenido para adultos

## Amazon Polly

Polly es un servicio de conversión de texto a voz (Text-to-Speech, TTS) que utiliza tecnologías avanzadas de aprendizaje profundo para generar voz natural a partir de texto escrito. Este servicio permite a los desarrolladores convertir texto en voz realista, lo que puede ser útil en una variedad de aplicaciones como lectores de pantalla, sistemas de respuesta de voz interactivos (IVR), narración de libros, asistentes virtuales y mucho más

## Amazon Transcribe

Transcribe es una herramienta poderosa que facilita la conversión de audio a texto, ofreciendo múltiples características para mejorar la precisión y utilidad de las transcripciones. Desde la identificación de hablantes hasta la redacción de información personal, Amazon Transcribe puede integrarse en una amplia variedad de aplicaciones para mejorar la accesibilidad, la eficiencia y la comprensión de los contenidos hablados.

