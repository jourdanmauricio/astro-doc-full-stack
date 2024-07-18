---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: HU - Historias de Usuario
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/scrum/back.png',
    alt: 'Historias de Usuario',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/scrum/icon.png',
    alt: 'Logo Scrum',
  }
description: Historias de Usuario
draft: false
category: Scrum
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

## ¿Qué es una Historia de Usuario (HU)?

Las **Historia de Usuario (HU)** es una descripción simple de una característica o funcionalidad de un software o sistema. Esta debe ser contada desde el usuario, quien va a utilizar la funcionalidad. 

El Product Owner es la voz del cliente, quieren representa las necesidades y requerimientos de este, pero no es el usuario final. Es quien deja claro en las HU para quien o qué hacemos lo que hacemos en el equipo.

**Características**:

- Se cuenta desde la perspectiva de la persona que va a utilizar esta funcionalidad.
- Esto es importante porque el software es de personas para personas
- No se nos debe olvidar que trabajamos para un usuario final.
- Muchas veces se confunde al cliente (persona que solicita la funcionalidad) con usuario final.
- SCRUM no tiene prácticas, es solo un contenedor de practicas.

**Origen**:

- Las HU se originaron en el marco de trabajo XP (Exteme Programming).
- En XP, las HU son unidades de funcionalidad visibles para el cliente.

**Aplicación**: 

- Construir funcionalidades pequeñas. Lo que disminuye la complejidad del proyecto. “Divide y vencerás”.
- XP nos dice que no solo es redactar, sino conversar al rededor de las historias.

## Estructura de las Historias de Usuarios

Como &lt;usuario&gt; lo que quiero es &lt;funcionalidad&gt; para &lt;beneficio&gt;: Quién, qué y para qué.

Cuando elaboramos una HU debemos considerar 4 elementos principales:

- Usuario: cuando habamos de usuario refeimos a quién. No quien solicita la funcionalidad, sino quién la utilizará.
- Funcionalidad: el qué. Qué es lo que especificamnete debemos realizar.
- Beneficio: responde a la pregunta, para qué?
- Criterios de aceptación: condiciones de calidad.

Ej: app - red social. Funcionalidad: publicar mi estado

HU -> Como usuario principal lo que quiero es publicar mi estado para mantenerme conectado y vigente con mi red.

Criterios de aceptación:
- Permitir textos de hasta 1000 caracteres.
- Permitir imgaes de hasta 5 MB.
- Permitir bajar resolución o automaticamente bajar la resolución de la imagen a 5 MB.

## ¿Por qué fracasan los esfuerzos de implementar Historias de Usuario?

- Porque falla la simplicidad. Tener en claro diferencia entre una épica y una historia de usuario.
- Porque subestimamos la simplicidad. Subestimamos la simplicidad del para quien y para qué. No subestimar para quién se está trabajando. Utilizar el Buyer persona es una excelente opción. Saber el para qué nos da el contexto para su funcionalidad.
- Porque no solo de historias vive scrum. 

## Estrategias para poder habilitar HUs de manera efectiva

Lo veremos desde dos perspectivas:

**Dimensionamiento**: Poder del contexto

- Entendimiento del problema: Entender el origen de lo que me están pidiendo.
- Establecer objetivos del negocio: Todos debemos conocer de que manera impactan los objetivos.
- Requerimientos técnicos: Lo que es necesario para entregar el producto.
- Requerimientos de Transición: Considerar que entre ambientes pasan eventualidades que pueden provocar fallos inesperados.

**Propiedades INVEST**: Estas propiedades estan relacionadas con las historias de usuario. Verificar que cada Historia de Usuario tenga estas propiedades.

- I : Independent. Cuidar que no sean Epicas.
- N: Negotiable. Poder de descartar historias no valiosas, negociar el orden y la priorización.
- V: Valuable. Toda historia de usuaria debe ser valiosa cuando queda claro el "para que".
- E: Estimable. El equipo de desarrollo, debe de calcular el tiempo y esfuerzo que le llevara cumplir con la HU.
- S: Small. Se da mas peso a la conversación que nos alimenten el contexto.
- T: Testeable. Valida que los criterios de aceptación, y especifica si la HU esta siendo "correcta" o "incorrecta".

## ¿Qué es un Backlog en Scrum?

“Es una lista emergente y ordenada de lo que se necesita para mejorar el producto”.

**Características**

- Backlog = Pila de producto = Lista Emergente
- SCRUM = Agilidad = Entornos de incertidumbre
- Priorizar a función de peso o valor
- Planear en que spring vamos hacer que historia
- Por lo general se usan herramientas digitales como tableros
- Recuerda que Scrum no tiene practicas propias
- Usa Etiquetas en tus herramientas para poder indentificar que parte del modulos estas trabajando

**Herramientas**

- Trello -> https://trello.com/
- Asana -> https://asana.com/
- Monday -> https://monday.com/
- Jira -> https://www.atlassian.com/
- ClickUP -> https://clickup.com/

## ¿Cómo se refinan los elementos de trabajo del Backlog?

“El refinamiento de backlog del producto es el acto de descomponer y definir aún más los elementos de trabajo pendiente del producto en artículos más pequeños y precisos. Esta es una actividad en curso para agregar detalles”.

- El refinamiento se realiza en el inicio del Sprint planning. Si surgiera algo durante el sprint se podrá refinar en caso de ser necesario.
- Mientras el equipo está desarrollando las historias en curso es momento de refinar las historias que vienen y tenerlas en el próximo sprint planning.
- La responsabilidad de refinar es del Product Owner, en conjunto con las personas con las que trabaje. El Product Owner es el responsable del “qué” y el equipo del “cómo”.

## ¿Cómo hacemos Historias de Usuario a partir listas de requerimientos?

A partir de requerimientos, solicitudes, deseos obtendremos información, que realizando un análisis transfromaremos en HU.

- Entender lo que los clientes nos piden y derivar ese esfuerzo en el derivado que es nuestro softwere pero es importante tener ademas uan dimension clara y no tener malos entendido.

- Categorizar y ordenar: nunca nos van a dar toda la informacion ordenada y darle el orden a ese que encontramos funcionalidades, asi consideraremos el valor y el tiempo que tenemos que agregar.

- Agregar el quien y para que: teniendo en cuenta tambien los criterios de aceptacion y ahora si tendriamos una dimension respetando la estructura del usuario.

- Importancia del contexto es ver las diferentes prespectivas: sumar requerimientos tecnicos si se derivan del mismo, identificar formulas.

Con estas recomendaciones no solo pasamos de una lista a una historia sino en crear una verdadera planificacion colaborativa.

**Pasos para convertir requerimientos en HUs**:

- Se descubren FUNCIONALIDADES en esos requerimientos
- Para cada una, se identifica el QUIEN (lo usaría)
- Para cada una se identifica el PARA QUÉ (Beneficio)
- A cada una se le establecen unos CRITERIOS DE ACEPTACIÓN
- Finalmente se identifica para cada una si existen REQUISITOS TÉCNICOS o FÓRMULAS que debamos tener en cuenta.

## Criterios de aceptación en las Historias de Usuario

Son condiciones para la calidad. La calidad tiene mucho que ver con la expectativa, mucho con los detalles.

**3 recomendaciones de expectativas para crear los criterios**:

- Preguntarse: ¿Qué es importante que probemos? Que es importante que nos enfoquemos, que podría salir mal y que es importante que cuidemos → Las respuestas se dan de manera colaborativa.
- Preguntar/se ¿Qué es lo que nos preocupa?: Ayuda a identificar riesgos o amenazas. Suele derivar en criterios de aceptación para agregar a nuestras historias.
- Preguntar: Qué más necesita saber el equipo? → En colaboración, conocer la experiencia de los colaboradores. Aquí también suele dar hincapié a hacer refinamiento.

## ¿Cómo se priorizan las Historias de Usuario?

Priorizar no es decir que todo urge, sino entender cada una de las partes de la solución y poder decir cual aporta más en este momento, cuál puede esperar y cual no estaría aportando. Es importante hacer la priorización de manera colaborativa.

**Categorizando al Valor que aporta**:

- Aportación al negocio: Categorizar en función a lo que aporta. Ej: Monetario, reducción de tiempo o costo, integración con algun otro tipo de tecnología.
- Aportación al usuario: Mejorar la interfaz, funcionalidad que premia al usuario.

Tener en cuenta también la Complejidad Técnica.

**En el tablero de Kanban se realiza la priorización por etiquetas o por el orden en el que están colocadas las historias, siendo las primeras en este caso las más primordiales.**

- Priorizar no es decir que todo urge
- Sino entender cada una de las partes de la solución y poder decir cual aporta más en este momento, cuál puede esperar y cual no estaría aportando.
- Es importante hacer la priorización de manera colaborativa.
- Recuerda que el eje principal de la agilidad es entrega frecuente de valor al usuario final
- Siempre tener prioridades de valor organizándolo en categorías
- La matriz nos ayuda a tener un tablero visual para priorizar

**Categorizando al Valor que aporta**:

- Aportación al negocio: Categorizar en función a lo que aporta. Ej: Monetario, reducción de tiempo o costo, integración con algún otro tipo de tecnología.
- Aportación al usuario: Mejorar la interfaz, funcionalidad que premia al usuario.
- Tener en cuenta también la Complejidad Técnica.

**Matriz**

- Debemos validar que aporte es valioso usando la herramienta de matriz parecido al análisis FODA
- Validar cual aporta mas y cual aporta menos
- Debemos ver técnicamente que tan complejo son las funcionalidades para que el equipo técnico pueda validar y decidir.
- Complejidad y factibilidad técnica

## Primeros pasos para habilitar Historias de Usuario

1- Identifica Barreras en tu Equipo/Empresa:
  - Resistencia al contexto en partes.
  - Costumbre de los Casos de Uso.
2- Identifica Barreras en ti:
  - Conocimiento: Identificar que otra cosa necesitamos saber o conocer para sentirnos mas seguro para proponer el cambio dentro del equipo.
  - Habilidades: La negociación y la comunicación. También la redacción.

**Recomendaciones generales**:

- Cambia la forma de conversar - Cambia la forma de gestionar: Incluir el VALOR, CALIDAD y FACTIBILIDAD(negocio y técnica).
- Escucha con más atención y pregunta más: Hacer escucha activa y atrevernos a preguntar.
- Trabaja por Timebox: Dedicar tiempo a la creación del primer backlog (Análisis).

