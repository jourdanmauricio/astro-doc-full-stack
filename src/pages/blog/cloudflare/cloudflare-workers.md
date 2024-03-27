---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Cloudflare Workers
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/cloudflare/back.webp',
    alt: Logo cloudflare',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/cloudflare/icon.png',
    alt: 'Logo Nest js',
  }
description: Cloudflare Workers
draft: false
category: Cloudflare
---

Cree aplicaciones sin servidor e impleméntelas instantáneamente en todo el mundo para obtener un rendimiento, confiabilidad y escala excepcionales.

Cloudflare Workers proporciona una solución sin servidor, un entorno de ejecución que le permite crear nuevas aplicaciones o aumentar las existentes sin configurar ni mantener la infraestructura.

Cloudflare Workers se ejecuta en la red global de Cloudflare en cientos de ciudades en todo el mundo, ofreciendo planes gratuitos y pagos .

## Características

​​

- Wrangler -> La interfaz de línea de comandos de Workers, Wrangler, le permite crear, probar e implementar sus proyectos de Workers.

- Bindings -> Los enlaces permiten a sus trabajadores interactuar con recursos en la plataforma de desarrollador de Cloudflare, incluidos R2 , KV , Durable Objects y D1 .

- Playground -> Playground es una zona de pruebas que le brinda una forma instantánea de obtener una vista previa y probar un trabajador directamente en el navegador en cualquier sitio. No se requiere configuración.

## Comenzando

Construye tu primer trabajador.

- Guía : configure e implemente su primer Worker con Wrangler, la CLI de la plataforma para desarrolladores de Cloudflare.

- Inicios rápidos : repositorios de GitHub que están diseñados para ser un punto de partida para crear un nuevo proyecto de Cloudflare Workers.

## Guía de introducción

Esta guía le indicará cómo configurar e implementar su primer worker.

> La forma más rápida de experimentar con Cloudflare Workers es en Playground. El Playground no requiere ninguna configuración. Es una forma instantánea de obtener una vista previa y probar un trabajador directamente en el navegador.

## Conceptos

**Cloudflare Workers** le permite crear funciones y aplicaciones web sin configurar ni mantener la infraestructura. Los trabajadores están desplegados globalmente en más de 300 centros de datos en todo el mundo en la red global de Cloudflare.

## Serverless computing

### ¿Qué es la informática sin servidor? | Definición de Sin servidor\*\*

La **informática sin servidor** es un método de proporcionar servicios de backend que se cobrán según su uso. Se siguen utilizando servidores, pero una empresa que obtenga servicios de backend de un proveedor sin servidor solo pagará por lo que use, y no por una cantidad fija de ancho de banda o por el número de servidores.

La informática sin servidor es un método para proporcionar servicios de backend a los usuarios. Un proveedor de arquitectura sin servidor permite a los usuarios escribir e implementar código sin que tengan que preocuparse por la infraestructura subyacente. Una empresa que contrate servicios de backend a un proveedor de arquitectura sin servidor tendrá que pagar en función de los servicios informáticos, y no tendrá que reservar y pagar por una cantidad fija de ancho de banda ni por el número de servidores, ya que el servicio escala de forma automática. Conviene tener en cuenta que, a pesar del nombre "sin servidor", se siguen utilizando servidores físicos, pero los desarrolladores no tienen que estar pendientes de ellos.

En los inicios de Internet, el que tuviera la intención de desarrollar una aplicación web, tenía que contar además con un complejo y caro hardware físico necesario para ejecutar un servidor.

Después nació la informática en la nube, en la que se podían alquilar en remoto números fijos de servidores o cantidades de espacio en servidores. Los desarrolladores y empresas que alquilan esas unidades fijas de espacio en servidores suelen acabar comprando más espacio del necesario para evitar que un pico de tráfico o actividad supere sus límites mensuales e interrumpa el funcionamiento de sus aplicaciones. El resultado es que gran parte del espacio en el servidor que se factura se desaprovecha. Los proveedores de soluciones en la nube han introducido modelos de ajuste de escala automática para abordar este problema, pero incluso así, un aumento no deseado en la actividad, como un ataque DDoS, podría salir muy caro.

La informática sin servidor permite a los desarrolladores comprar servicios de backend con un modelo de "pago por uso", por lo que los desarrolladores solo tienen que pagar por los servicios que utilizan. Esto es como cambiarse de un plan de datos de teléfono móvil con tarifa plana mensual a uno en el que solo tienes que pagar los datos que utilizas.

<mark>El término 'sin servidor' puede ser engañoso, ya que sigue habiendo servidores que brindan estos servicios de backend, pero en este caso es el proveedor el que se encarga de los problemas de espacio e infraestructura del servidor. Sin servidor quiere decir que los desarrolladores pueden hacer su trabajo sin necesidad de preocuparse por los servidores.</mark>

### ¿Qué tipo de servicios de backend ofrece la informática sin servidor?

La mayoría de proveedores de informática sin servidor ofrecen servicios de base de datos y almacenamiento a sus clientes, y muchos también cuentan con plataformas de función como servicio (FaaS), como Cloudflare Workers. FaaS permite a los desarrolladores ejecutar pequeños elementos de código en el perímetro de la red. Con FaaS, los desarrolladores pueden desarrollar una arquitectura modular consiguiendo una base de código más escalable sin tener que gastar recursos en el mantenimiento del backend subyacente

### ¿Cuáles son las ventajas de la informática sin servidor?

- **Costes inferiores** - La informática sin servidor tiende a ser muy rentable, ya que los proveedores de servicios en la nube tradicionales (asignación de servidor) suelen cobrar al usuario por el espacio no utilizado o por el tiempo de inactividad de la CPU.

- **Escalabilidad simplificada** - Los desarrolladores que usan arquitectura sin servidor no tienen que preocuparse de las políticas para escalar su código. El proveedor de informática sin servidor gestiona a la carta todo el escalado.

- **Código de backend simplificado** - Con FaaS, los desarrolladores pueden crear funciones simples que llevan a cabo un único propósito de forma independiente, como hacer una llamada API.

- **Respuesta más rápida** - La arquitectura sin servidor puede reducir de forma significativa el tiempo que una aplicación necesita para salir al mercado. En lugar de tener que usar un proceso de despliegue complicado para implementar correcciones de errores y nuevas funciones, los desarrolladores pueden añadir y modificar código de forma gradual.

### ¿Cómo se compara la informática sin servidor con otros modelos de backend en la nube?

Un par de tecnologías que a menudo se confunden con la informática sin servidor son backend como servicio y plataforma como servicio. Aunque comparten similitudes, estos modelos no cumplen necesariamente los requisitos de la informática sin servidor.

**Backend como servicio (BaaS)** es un modelo de servicio en el que un proveedor de soluciones en la nube ofrece servicios de backend, como el almacenamiento de datos, para que los desarrolladores puedan centrarse en escribir código de frontend. Sin embargo, mientras que las aplicaciones sin servidor se basan en eventos y se ejecutan en el perímetro, pueden que las aplicaciones BaaS no cumplan ninguno de estos requisitos.

**La plataforma como servicio (PaaS)** es un modelo en el que los desarrolladores alquilan básicamente todas las herramientas necesarias para desarrollar e implementar aplicaciones de un proveedor de la nube, incluidos, por ejemplo, sistemas operativos y middleware. Sin embargo, las aplicaciones PaaS no escalan tan fácilmente como las aplicaciones sin servidor. Las PaaS tampoco se ejecutan necesariamente en el perímetro y a menudo presentan un retardo de inicio notable que no se da en las aplicaciones sin servidor.

**La infraestructura como servicio (IaaS)** es un término que engloba a los proveedores de soluciones en la nube que alojan infraestructura en nombre de sus clientes. Los proveedores de IaaS pueden ofrecer funcionalidad sin servidor, pero los términos no son sinónimos.

### ¿Cuál es el futuro de la informática sin servidor?

La informática sin servidor sigue evolucionando a medida que los proveedores de este tipo de informática ofrecen soluciones para contrarrestar algunas desventajas. Una de ellas es el arranque en frío.

Normalmente, cuando no se ha usado una determinada función sin servidor durante un tiempo, el proveedor detiene la función para ahorrar energía y evitar el aprovisionamiento excesivo de recursos. La próxima vez que un usuario ejecute una aplicación que acceda a esa función, el proveedor sin servidor tendrá que arrancar de nuevo y comenzar a alojar esa función. Este tiempo de arranque añade una latencia significativa, lo que se conoce como "arranque en frío".

Una vez que la función esté en marcha, se ejecutará mucho más rápido en las siguientes solicitudes (arranques en caliente), pero si la función no se vuelve a solicitar durante un tiempo, volverá a quedar inactiva. Esto significa que el siguiente usuario que solicite esa función experimentará un arranque en frío. Hasta hace poco, los arranques en frío se consideraban una contrapartida necesaria del uso de funciones sin servidor.

Cloudflare Workers ha abordado este problema programando las funciones sin servidor por anticipado, durante el protocolo de enlace TLS. Dado que las funciones de Workers se activan en el perímetro en un tiempo muy corto, incluso inferior al tiempo necesario para completar el protocolo de enlace, el resultado es una plataforma FaaS sin arranques en frío. Para empezar a utilizar Cloudflare Workers, consulta nuestra documentación para desarrolladores.

A medida que se solucionan más desventajas de la informática sin servidor y aumenta la popularidad del proceso perimetral, cabe esperar un uso cada vez más generalizado de la arquitectura sin servidor.

## Informática sin servidor vs. contenedores | Cómo elegir

Los contenedores y la informática sin servidor son arquitecturas que reducen la sobrecarga de las aplicaciones web alojadas en la nube, pero difieren en varios aspectos importantes. Los contenedores son más ligeros que las máquinas virtuales, pero los despliegues sin servidor son todavía más ligeros y se escalan más fácilmente que las arquitecturas basadas en contenedores.

Tanto la informática sin servidor como los contenedores permiten a los desarrolladores desarrollar aplicaciones con mucha menos sobrecarga y más flexibilidad que las aplicaciones alojadas en servidores tradicionales o máquinas virtuales. El estilo de arquitectura que debe utilizar un desarrollador depende de las necesidades de la aplicación, pero las aplicaciones sin servidor son más escalables y tienden a ser más rentables.

### ¿Qué son los contenedores?

Un contenedor "contiene" tanto una aplicación como todos los elementos que la aplicación necesita para ejecutarse correctamente, incluyendo las bibliotecas del sistema, la configuración del sistema y otras dependencias. Como pasa con una mezcla para tortitas en la que "solo hay que añadir agua", los contenedores solo necesitan una cosa para llevar a cabo su función: ser alojados y ejecutados.

Cualquier tipo de aplicación puede ejecutarse en un contenedor. Una aplicación en contenedor se ejecutará de la misma manera, independientemente de dónde esté alojada. Los contenedores pueden trasladarse con facilidad y desplegarse allí donde sean necesarios, de forma muy parecida a los contenedores físicos de transporte, que tienen un tamaño estándar y, por tanto, pueden enviarse a cualquier lugar mediante diversos medios de transporte (barcos, camiones, trenes, etc.), independientemente de su contenido.

En términos técnicos, los contenedores son una forma de dividir una máquina, o servidor, en entornos de espacio de usuario separados, de forma que cada entorno solo ejecute una aplicación y no interactúe con ninguna otra sección dividida de la máquina. Cada contenedor comparte el núcleo de la máquina con otros contenedores (el núcleo es la base del sistema operativo, e interactúa con el hardware del ordenador), pero se ejecuta como si fuera el único sistema de la máquina.

### Contenedores vs. máquinas virtuales

Una máquina virtual es una pieza de software que imita un sistema informático completo. Está aislada del resto de la máquina que la aloja y se comporta como si fuera el único sistema operativo que hay en ella, incluso tiene su propio núcleo. Las máquinas virtuales son otro modo habitual de alojar varios entornos en un servidor, pero utilizan mucha más potencia de procesamiento que los contenedores.

### ¿Qué es la informática sin servidor?

Las aplicaciones sin servidor se dividen en funciones y son alojadas por un proveedor de terceros, que solo cobra al desarrollador de la aplicación por el tiempo en el que se ejecuta cada función.

### ¿Cuáles son las principales diferencias entre la informática sin servidor y los contenedores?

- Máquinas físicas -> Realmente la informática "sin servidor" se ejecuta en servidores, pero depende del proveedor de la informática sin servidor del aprovisionamiento del espacio del servidor según lo necesite la aplicación; no se asignan máquinas específicas para una función o aplicación determinada. Por otro lado, cada contenedor vive en una máquina a la vez y usa el sistema operativo de esa máquina, aunque pueden trasladarse fácilmente a otra máquina, si así se quiere.

- Escalabilidad -> En una arquitectura basada en contenedores, el número de contenedores desplegados lo determina, de antemano, el desarrollador. En cambio, en una arquitectura sin servidor, el backend se escala de forma inherente y automática para satisfacer la demanda.

Sigamos con la metáfora del contenedor marítimo; una empresa naviera podría intentar predecir un aumento de la demanda de un determinado producto y enviar más contenedores al destino para satisfacer dicha demanda, pero no podría chasquear los dedos y producir más contenedores llenos de mercancías si la demanda superara las expectativas.

La arquitectura sin servidor es una forma de hacer exactamente eso. En lo que respecta a la potencia informática, la informática sin servidor es como el suministro de agua en una casa moderna: al abrir el grifo, los consumidores pueden conseguir y utilizar el agua que necesitan en cualquier momento, y solo tienen que pagar por lo que usan. Esto es mucho más escalable que intentar comprar agua por cubo o contenedor.

- Coste -> Los contenedores se ejecutan constantemente y, por tanto, los proveedores en la nube tienen que cobrar por el espacio del servidor incluso si nadie está utilizando la aplicación en ese momento.

No existen los gastos continuos en una arquitectura sin servidor, porque el código de la aplicación no se ejecuta a menos que sea llamado. En cambio, a los desarrolladores solo se les cobra por la capacidad de servidor que su aplicación esté utilizando.

- Mantenimiento -> Los contenedores se alojan en la nube, pero los proveedores en la nube no los actualizan ni los mantienen. Los desarrolladores tienen que gestionar y actualizar cada contenedor que implementan.

Desde la perspectiva del desarrollador, una arquitectura sin servidor no tiene un backend que gestionar. El proveedor se encarga de toda la gestión y las actualizaciones de software de los servidores que ejecutan el código.

- Momento de implementación -> Los contenedores tardan más en configurarse inicialmente que las funciones sin servidor, porque es necesario configurar los ajustes del sistema, las bibliotecas, etc. Una vez configurados, los contenedores apenas tardan unos segundos en implementarse. Pero debido a que las funciones sin servidor son más pequeñas que los microservicios de los contenedores, y no vienen con dependencias del sistema, solo necesitan unos milisegundos en implementarse. Las aplicaciones sin servidor pueden estar activas en cuanto se carga el código.

- Pruebas -> Es difícil probar las aplicaciones web sin servidor, porque el entorno del backend es difícil de replicar en un entorno local. En cambio, los contenedores se ejecutan igual independientemente de dónde se implementen, lo cual hace relativamente sencillo probar una aplicación basada en contenedores antes de implementarla en producción.

Para Cloudflare Workers, que permite arquitecturas sin servidor, hemos creado un entorno de pruebas virtual para ayudar a mejorar el proceso de desarrollo.

### ¿En qué se parecen la informática sin servidor y los contenedores?

Ambas están basadas en la nube, y ambas reducen considerablemente la sobrecarga de las infraestructuras: la informática sin servidor todavía más que los contenedores. En ambos tipos de arquitectura, las aplicaciones se dividen y se implementan como componentes más pequeños. En una arquitectura basada en contenedores, cada contenedor ejecutará un microservicio.

### ¿Qué son los microservicios?

Los microservicios son segmentos de una aplicación. Cada microservicio lleva a cabo un servicio, y varios microservicios integrados se combinan para conformar la aplicación. Aunque el nombre parece implicar que los microservicios son pequeños, no tienen por qué serlo.

Una de las ventajas de desarrollar una aplicación como una colección de microservicios es que los desarrolladores pueden actualizar un microservicio a la vez en lugar de tener que actualizar toda la aplicación cuando necesitan hacer cambios. Desarrollar una aplicación como una colección de funciones, como en una arquitectura sin servidor, ofrece la misma ventaja pero a un nivel más granular.

### ¿Cómo deben elegir los desarrolladores entre la arquitectura sin servidor y los contenedores?

Los desarrolladores que eligen una arquitectura sin servidor podrán lanzar e iterar nuevas aplicaciones rápidamente, sin tener que preocuparse de si la aplicación se puede escalar o no. Además, si una aplicación no tiene un tráfico o uso constante, la informática sin servidor será más rentable que los contenedores, ya que el código no necesita estar ejecutándose constantemente.

Los contenedores ofrecen más control a los desarrolladores sobre el entorno en el que se ejecuta la aplicación (aunque esto también implica más mantenimiento), y los lenguajes y bibliotecas que se usan. Por esto, los contenedores son extremadamente útiles para migrar aplicaciones heredadas a la nube, ya que es posible replicar el entorno de ejecución original de la aplicación más estrechamente.

Y finalmente, es posible utilizar una arquitectura híbrida, con algunas funciones sin servidor y otras implementadas en contenedores. Por ejemplo, si una función de la aplicación requiere más memoria que la asignada por el proveedor de informática sin servidor, si una función es demasiado grande, o si algunas funciones, pero no otras, necesitan ser de larga duración, una arquitectura híbrida permite a los desarrolladores aprovechar las ventajas de la informática sin servidor, a la vez que siguen utilizando contenedores para las funciones que no son compatibles con la informática sin servidor.

### ¿Qué tipo de arquitectura permite Cloudflare?

Cloudflare ofrece a los desarrolladores la posibilidad de desarrollar aplicaciones sin servidor de alto rendimiento mediante Cloudflare Workers.

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
