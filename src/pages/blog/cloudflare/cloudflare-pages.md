---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Cloudflare
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
description: Cloudflare
draft: false
category: Cloudflare
---

## Páginas en Cloudflare

Cree aplicaciones de pila completa que se implementen instantáneamente en la red global de Cloudflare.

Implemente su proyecto de Pages conectándose a su proveedor de Git , cargando recursos prediseñados directamente en Pages con carga directa o usando C3 (CLI) desde la línea de comandos.

### Características

- Funciones de páginas: Utilice Pages Functions para implementar código del lado del servidor para habilitar la funcionalidad dinámica sin ejecutar un servidor dedicado.

- ​​Reversiones: Las reversiones le permiten revertir instantáneamente su proyecto a una implementación de producción anterior.

- Redirecciones: Configure redireccionamientos para su proyecto de páginas de Cloudflare.

## Comenzando

Elija un método de configuración para su proyecto de Pages:

- C3 : utilice C3 (create-cloudflareCLI) para configurar e implementar nuevas aplicaciones utilizando guías de configuración específicas del marco para garantizar que cada nueva aplicación siga las mejores prácticas de implementación de Cloudflare y de terceros.

- Carga directa : cargue sus activos prediseñados en Pages e impleméntelos a través de la CLI de Wrangler o el panel de Cloudflare.

- Integración de Git : conecte su proveedor de Git a Pages.

## C3 (create-cloudflare CLI)

C3 (crear-cloudflare-cli)es una herramienta de línea de comandos diseñada para ayudarlo a configurar e implementar nuevas aplicaciones en Cloudflare. Además de la velocidad, aprovecha las plantillas desarrolladas oficialmente para los trabajadores y las guías de configuración específicas del marco para garantizar que cada nueva aplicación que configure siga las mejores prácticas de Cloudflare y de terceros para la implementación en la red de Cloudflare.

### ​​Crear una nueva aplicación

Para comenzar, abra una ventana de terminal y ejecute:

```bash
npm create cloudflare@latest
```

Al ejecutarlo npm create cloudflare@latestse le pedirá que instale el package create-cloudflare y le guiará a través de un asistente de configuración. Después de haber ingresado al asistente de configuración, se le preguntará qué tipo de aplicación desea crear.

La lista de aplicaciones incluye una variedad de plantillas de Workers, así como una opción para seleccionar un marco web para crear un sitio web o una aplicación web.

**Frameworks Web**

Si elige crear un nuevo sitio web o aplicación utilizando un frameworks web, C3 le pedirá que elija uno de los siguientes frameworks compatibles:

- Angular
- Astro
- Docusaurus
- Gatsby
- Hono
- Next
- Nuxt
- Qwik
- React
- Remix
- Solid
- Svelte
- Vue

Seleccione un framework y se le pedirá que instale su paquete de creación, que lo guiará a través del asistente de configuración del framework.

### Deploy

Una vez que su proyecto haya sido configurado, se le preguntará si desea implementar el proyecto en Cloudflare. Esto es opcional.

Si decide no implementarlo, el proyecto se creará localmente y C3 mostrará algunos enlaces útiles para un mayor desarrollo. Vaya a la carpeta del proyecto recién creada para comenzar el desarrollo.

Si elige deployar, se le pedirá que se autentique (si aún no ha iniciado sesión) y su proyecto se implementará de inmediato. C3 mostrará la URL de su proyecto y algunos enlaces útiles.

> Integración con git -> La implementación inicial creada a través de C3 se conoce como carga directa. Para configurar una implementación a través de la integración de Git, elija No implementar con C3 y consulte la guía de integración de Git para completar la configuración.

## ​​Carga directa

La carga directa le permite cargar sus activos prediseñados en Pages e implementarlos en la red global de Cloudflare. Esta guía le indicará cómo cargar sus activos usando Wrangler o el método de arrastrar y soltar.

### Requisitos previos

Antes de implementar su proyecto con Carga directa, ejecute el comando de compilación apropiado para compilar su proyecto.

### Métodos de carga

Una vez que tenga listos sus recursos prediseñados, hay dos formas de comenzar a cargar:

- Wrangler
- Arrastrar y soltar

> Dentro de un proyecto de carga directa, puede alternar entre crear implementaciones con Wrangler o arrastrar y soltar. Sin embargo, no puede crear implementaciones con Carga directa en un proyecto que creó a través de la integración de Git en el panel. Solo los proyectos creados con Carga directa se pueden actualizar con Carga directa.

### Tipos de archivos admitidos

A continuación se muestran los tipos de archivos admitidos para cada opción de Carga directa:

- Wrangler: Una única carpeta de activos. (Los archivos zip no son compatibles).
- Arrastrar y soltar: un archivo zip o una única carpeta de activos.
  ​​

### Wrangler CLI

**Configurar Wrangler**

Para comenzar, instale npm. Luego instale Wrangler, la CLI de la plataforma para desarrolladores.

Wrangler es una herramienta de línea de comandos para crear con productos para desarrolladores de Cloudflare.

**Instalación**

Wrangler requiere una versión de Node 16.17.0o posterior.

Wrangler se instala localmente en cada uno de sus proyectos. Esto le permite a usted y a su equipo usar la misma versión de Wrangler, controlar las versiones de Wrangler para cada proyecto y retroceder a una versión anterior de Wrangler, si es necesario.

```bash
npm install wrangler --save-dev
```

Dado que Cloudflare recomienda instalar Wrangler localmente en su proyecto (en lugar de globalmente), la forma de ejecutar Wrangler dependerá de su configuración específica y de su administrador de paquetes. Consulte Cómo ejecutar comandos de Wrangler para obtener más información.

> Si Wrangler no está instalado, la ejecución npx wranglerutilizará la última versión de Wrangler.

**Cómo ejecutar comandos de Wrangler**

```bash
npx wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

Puede agregar comandos de Wrangler que usa con frecuencia como scripts en el package.jsonarchivo de su proyecto:

```json
{
  ...
  "scripts": {
    "deploy": "wrangler deploy",
    "dev": "wrangler dev"
  }
  ...
}
```

Luego puede ejecutarlos usando:

```bash
npm run deploy
```

### Comprueba tu versión Wrangler

Para verificar su versión de Wrangler, ejecute:

```bash
npx wrangler --version
npx wrangler version
npx wrangler -v
```

### Actualizar Wrangler

Para actualizar la versión de Wrangler utilizada en su proyecto, ejecute:

```bash
npm install wrangler@latest
```

### Crea tu proyecto

Inicie sesión en Wrangler con el wrangler comando login. Luego ejecute el pages project comando create:

**Login** Autorice a Wrangler con su cuenta de Cloudflare mediante OAuth. Wrangler intentará abrir automáticamente su navegador web para iniciar sesión con su cuenta de Cloudflare.

```bash
wrangler login
```

**Crear proyecto**

```bash
npx wrangler pages project create
```

Luego se le pedirá que especifique el nombre del proyecto. Su proyecto se publicará en <PROJECT_NAME>.pages.dev (o el nombre de su proyecto más algunos caracteres aleatorios si el nombre de su proyecto ya está en uso). También se le pedirá que especifique su rama de producción.

Las implementaciones posteriores reutilizarán ambos valores (guardados en su carpeta node_modules/.cache/wrangler).

### Deploy

Desde aquí, ha creado un proyecto vacío y ahora puede implementar sus activos para su primera implementación y para todas las implementaciones posteriores en su entorno de producción. Para hacer esto, ejecute el wrangler pages comando deploy:

```bash
npx wrangler pages deploy <BUILD_OUTPUT_DIRECTORY>
```

Busque el directorio de salida de compilación apropiado para su proyecto en Directorio de compilación en Ajustes preestablecidos del framework.

Su implementación de producción estará disponible en <PROJECT_NAME>.pages.dev.

Antes de usar el comando wrangler pages deploy, deberá asegurarse de estar dentro del proyecto. De lo contrario, también puede pasar la ruta del proyecto.

### Otros comandos útiles

Si desea utilizar Wrangler para obtener una lista de todos los proyectos disponibles para carga directa, utilice pages project list:

```bash
npx wrangler pages project list
```

Si desea utilizar Wrangler para obtener una lista de todas las URL de vista previa únicas para un proyecto en particular, utilice pages deployment list:

```bash
npx wrangler pages deployment list
```

Para obtener instrucciones paso a paso sobre cómo usar Wrangler y herramientas de integración continua como GitHub Actions, Circle CI y Travis CI juntas para una implementación continua, consulte Usar carga directa con integración continua.

## Arrastrar y soltar

Para implementar con arrastrar y soltar:

Inicie sesión en el panel de Cloudflare.

- En Account Home, seleccione your account > Workers & Pages.
- Seleccione reate application > Pages > Upload assets.
- Ingrese el nombre de su proyecto en el campo provisto y arrastre y suelte sus activos.
- Seleccione Deploy.

Su proyecto será atendido desde <PROJECT_NAME>.pages.dev. Luego arrastre y suelte el directorio de salida de su compilación en el marco de carga. Una vez que sus archivos se hayan cargado correctamente, seleccione Guardar e implementar y continúe con su proyecto recién implementado.

### Crear nuevo deployment

Una vez que haya creado su proyecto, seleccione Crear un nuevo deploy para comenzar una nueva versión de su sitio. A continuación, elija si su nueva implementación se realizará en su entorno de producción o de vista previa. Si elige la vista previa, puede crear una nueva rama de implementación o ingresar una existente.

### Límites

| Método de carga    | Límite de archivos | Tamaño del archivo |
| ------------------ | ------------------ | ------------------ |
| Wrangler           | 20.000 archivos    | 25 MB              |
| Arrastrar y soltar | 1.000 archivos     | 25 MB              |

​​Si utiliza el método de arrastrar y soltar, aparecerá un símbolo de advertencia rojo junto a un recurso si es demasiado grande y, por lo tanto, no se cargó correctamente. En este caso, puede optar por eliminar ese activo pero no podrá reemplazarlo. Para hacerlo, debes volver a cargar todo el proyecto.

## Funciones

Las implementaciones de arrastrar y soltar realizadas desde el panel de Cloudflare actualmente no admiten la compilación de una functionscarpeta de funciones de páginas . Para implementar una functionscarpeta, debe usar Wrangler. Al implementar un proyecto usando Wrangler, si functionsexiste una carpeta donde se ejecuta el comando, esa functionscarpeta se cargará con el proyecto.

Sin embargo, tenga en cuenta que un \_worker.jsarchivo es compatible tanto con Wrangler como con implementaciones de arrastrar y soltar realizadas desde el panel.

## guía de integración de git

En esta guía, comenzará con Cloudflare Pages e implementará su primer sitio web en la plataforma Pages a través de la integración de Git.

### Conecte su proveedor de Git a Pages

Pages ofrece soporte para GitHub y GitLab. Para crear su primer proyecto de Pages:

- Inicie sesión en el panel de Cloudflare y selecciona tu cuenta.
- En Inicio de cuenta, seleccione Workers & Pages.
- Seleccione Create application > Pages > Connect to Git.

Se le pedirá que inicie sesión con su proveedor de Git preferido. Esto permite a Cloudflare Pages implementar sus proyectos y actualizar sus PRs con implementaciones preliminares.

### Selecciona tu repositorio de GitHub

Puede seleccionar un proyecto de GitHub desde su cuenta personal o una organización a la que le haya dado acceso a Pages. Esto le permite elegir un repositorio de GitHub para implementar usando Pages. Se admiten repositorios públicos y privados.

### Configure su implementación

Una vez que haya seleccionado un repositorio Git, seleccione Install & Authorize y Begin setup. Luego puede personalizar su implementación en Set up builds and deployments.

El **nombre** de su proyecto se utilizará para generar el nombre de hostname de su proyecto. De forma predeterminada, esto coincide con el nombre de su proyecto Git.

La rama de producción indica la rama que Cloudflare Pages debe usar para implementar la versión de producción de su sitio. Para la mayoría de los proyectos, esta es la rama main o master.

### Configure sus ajustes de compilación

Dependiendo del framework, herramienta o proyecto que esté implementando en Cloudflare Pages, deberá especificar el comando de compilación del sitio y el directorio de salida de compilación para indicarle a Cloudflare Pages cómo implementar su sitio. El contenido de este directorio se carga en Cloudflare Pages como contenido de su sitio web.

El panel proporciona una serie de ajustes preestablecidos específicos del framework. Estos ajustes preestablecidos proporcionan el comando de compilación predeterminado y los valores del directorio de salida de compilación para el framework seleccionado. Si no está seguro de cuáles son los valores correctos para esta sección, consulte Configuración de compilación. Si no necesita un paso de compilación, deje el campo Comando de compilación en blanco.

Cloudflare Pages comienza trabajando desde el directorio raíz de su repositorio. Todo el proceso de construcción, incluidos los pasos de instalación, comenzará desde esta ubicación. Si desea cambiar esto, especifique una nueva ubicación del directorio raíz a través del campo Root directory (advanced) > Path field.

**Comprender la configuración de su compilación**

El comando de compilación lo proporciona su framework. Por ejemplo, el framework lo utiliza gatsby buildcomo comando de compilación. Cuando esté trabajando sin un framework, deje el campo Comando de compilación en blanco.

El directorio de salida de la compilación se genera a partir del comando de compilación. Cada framework tiene su propia convención de nomenclatura; por ejemplo, el directorio de salida de la compilación recibe el nombre /publicde muchos framework.

<mark>El directorio raíz es donde se encuentra el contenido de su sitio. Si no se especifica, Cloudflare asume que su repositorio Git vinculado es el directorio raíz. El directorio raíz debe especificarse en casos como monorepos, donde puede haber varios proyectos en un repositorio.</mark>

### Variables de entorno

Las variables de entorno son una forma común de proporcionar configuración a su flujo de trabajo de compilación. Mientras configura su proyecto, puede especificar una cantidad de pares clave-valor como variables de entorno. Estos se pueden personalizar aún más una vez que su proyecto haya terminado de construirse por primera vez.

Después de haber elegido su framework preestablecido o haber dejado este campo en blanco si está trabajando sin un framework, configurado el directorio raíz (avanzado) y personalizado sus variables de entorno (opcional) , estará listo para implementar.

### Tu primer despliegue

Una vez que haya terminado de establecer la configuración de compilación, seleccione Save and Deploy. Los registros de compilación de su proyecto se generarán a medida que Cloudflare Pages instale las dependencias de su proyecto, construya el proyecto y lo implemente en la red global de Cloudflare.

Cuando su proyecto haya terminado de implementarse, recibirá una URL única para ver su sitio implementado.

**errores de DNS** Si encuentra un error de DNS después de visitar su sitio después de su primera implementación, esto podría deberse a que el DNS no ha tenido tiempo de propagarse. Para resolver el error, espere a que se propague el DNS o pruebe con otro dispositivo o red para resolver el error.

### Administra tu sitio

Después de su primera implementación, seleccione Continue to project para ver la configuración de su proyecto en el panel de Cloudflare Pages. En esta página, puede ver el estado de implementación actual de su proyecto, la URL de producción y la confirmación asociada, y todas las implementaciones anteriores.

### Eliminar un proyecto

Para eliminar su proyecto de Pages:

- Regrese a la página de inicio de la cuenta o use el menú desplegable en la parte superior del panel.
- Seleccione Workers & Pages.
- Seleccione su Pages project > Settings > Delete project.

> Para proyectos con un dominio personalizado, primero debes eliminar el registro CNAME asociado con tu proyecto de Pages. De lo contrario, es posible que los registros DNS queden activos, lo que provocará que su dominio apunte a un proyecto de Pages que ya no existe. Consulte Eliminar un dominio personalizado para obtener instrucciones.

> Para proyectos sin un dominio personalizado (cualquier proyecto en un \*.pages.devsubdominio), su proyecto se puede eliminar en la configuración del proyecto.

### Configuración avanzada del proyecto

En la sección Configuración, puede configurar ajustes avanzados, como cambiar el nombre de su proyecto, actualizar su configuración de Git o actualizar su comando de compilación, directorio de compilación o variables de entorno.

## Ejemplo Deploy Proyecto React con vite

https://www.youtube.com/watch?v=7QS2_Y1H_D8&t=587s

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
