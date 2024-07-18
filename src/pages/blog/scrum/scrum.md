---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Scrum
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/scrum/back.png',
    alt: 'Scrum',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/scrum/icon.png',
    alt: 'Logo Angular',
  }
description: Scrum
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

## ¿Qué es una metodología ágil?

Scrum es parte de las metodolgías ágiles

**¿Qué es ágil?** Crear productos y responder al cambio Aceptar el cambio y entregar productos que respondan a las necesidades del cliente generando valor al usuario. Centrado en las personas: cliente, equipo.

**Mentalidad (Manifiesto ágil):** A través del tiempo ganamos experiencia y generamos mayor calidad.

**Marcos de trabajo**:

- Kanban
- XtremeProgramming
- Scrum

**Metodologías (se pueden utilizar con cualquier marco de trabajo):**

- Pair programming
- TDD (Test Driven Development)

**Diferencias entre desarrollo tradicional y ágil**:

1. Grupos de trabajo: 
  - Tradicional: grupos grandes de trabajo, puede generar dificultades como saber quién está trabajando en qué. 
  - Agil: equipos de trabajo más pequeños con un tiempo de desarrollo corto ejm: 2 semanas (1 iteración)

2. ¿Cómo se manejan los requerimientos? 
  - Tradicional: grandes listas de requerimientos. 
  - Agil: pequeñas listas de requerimientos que vamos a trabajar durante la iteración.

3. Generación de valor 
  - Tradicional: Trabajar toda la lista de requerimientos y al final mostrar al cliente con lo que creemos es el producto terminado. 
  - Agil: Entregar los pequeños avances al cliente cada iteración para que pueda ver los cambios en el producto poco a poco.

## 12 principios ágiles

**Manifiesto por Desarrollo Ágil de Software**

"Individuos e interacciones sobre procesos y herramientas, 
Software funcionando sobre documentación extensiva, 
Colaboración con el cliente sobre negociación contractual, 
Respuesta ante el cambio sobre seguir un plan"

**12 principios de Agile**

1. Satisfacción al cliente: Nuestra mayor prioridad es satisfacer al cliente mediante la entrega temprana y continua de software con valor.

2. Cambios: Aceptamos que los requisitos cambien, incluso en etapas tardías del desarrollo. Los procesos Ágiles aprovechan el cambio para proporcionar ventaja competitiva al cliente.

3. Software funcional: Entregamos software funcional frecuentemente, entre dos semanas y dos meses, con preferencia al periodo de tiempo más corto posible.

4. Colaboradores: Los responsables de negocio y los desarrolladores trabajamos juntos de forma cotidiana durante todo el proyecto.

5. Individuos motivados: Los proyectos se desarrollan en torno a individuos motivados. Hay que darles el entorno y el apoyo que necesitan, y confiarles la ejecución del trabajo.

6. Comunicación cara a cara: El método más eficiente y efectivo de comunicar información al equipo de desarrollo y entre sus miembros es la conversación cara a cara.

7. Progreso: El software funcionando es la medida principal de progreso.

8. Desarrollo sostenible: Los procesos Ágiles promueven el desarrollo sostenible. Los promotores, desarrolladores y usuarios debemos ser capaces de mantener un ritmo constante de forma indefinida.

9. Mejora continua: La atención continua a la excelencia técnica y al buen diseño mejora la Agilidad.

10. Simplicidad: La simplicidad, o el arte de maximizar la cantidad de trabajo no realizado, es esencial.

11. Auto-organización: Las mejores arquitecturas, requisitos y diseños emergen de equipos auto-organizados.

12. Auto- aprendizaje: A intervalos regulares el equipo reflexiona sobre cómo ser más efectivo para a continuación ajustar y perfeccionar su comportamiento en consecuencia.

## Qué es Scrum

Es cuando todo un equipo colabora para lograr un objetivo. Definición: Es un marco de trabajo por el cual las personas pueden abordar problemas complejos adaptativos, a la vez que entregan productos del máximo valor posible productiva y creativamente.

La esencia de Scrum es un es un equipo pequeño de personas. El equipo individual es altamente flexible y adaptativo.

**Teoría de Scrum**

Se basa en la teoría de control de procesos empírica o empirismo. El empirismo asegura que el conocimiento procede de la experiencia y de tomar decisiones basándose en lo que se conoce.

**Tres Pilares de Scrum**:

- Transparencia: Cualquier persona involucrada en el proyecto pueda saber el estado actual del proyecto.
- Inspección: Los artefactos son lo que conocemos como requerimientos. Cualquier persona puede observar estos artefactos y analizar si están bien definidos o no.
- Adaptación: La capacidad que tiene cualquier persona en el proceso de reconocer cambios y poderlos implementar lo más rápido.

**Los valores de Scrum**:

- Compromiso
- Coraje
- Enfoque
- Apertura
- Respeto

## Cuáles son los componentes de Scrum

**Componentes de Scrum**

1- Equipo de Scrum. El equipo de Scrum es auto organizado y multifuncional.

- Dueño del producto (Product Owner). Responsable de maximizar el valor del producto .
- Scrum Master. Responsable de promover y apoyar Scrum. 
- Equipo de desarrollo (Development Team). Profesionales que realizan el trabajo de entregar un incremento de producto “Terminado”.

2- Eventos de Scrum. En Scrum existen eventos predefinidos con el fin de crear regularidad y minimizar la necesidad de reuniones no definidas en Scrum.

- Sprint. Es el corazón de Scrum donde se crea un incremento del producto. 
- Planificación de Sprint (Sprint planning). Ceremonia para definir qué se hará durante el sprint. 
- Scrum Diario (Daily stan-up). Reunión diaria de todo el equipo de desarrollo. 
- Revisión de Sprint (Sprint review). Es donde se muestra el incremento desarrollado durante el sprint. 
- Retrospectiva de Sprint (Sprint retrospective). Oportunidad para aplicar mejora continua.

3- Artefactos de Scrum. Los artefactos de Scrum representan trabajo o valor en diversas formas que son útiles para proporcionar transparencia y oportunidad para la inspección y adaptación. Son aquellos elementos que definen que quiere el cliente, pero son visibles para todas las personas que trabajan en el proyecto.

- Lista del producto (Product Backlog). Es una lista ordenada de todo lo que se conoce que es necesario en el producto. 
- Lista de pendientes del Sprint (Sprint Backlog). Elementos de la lista de producto seleccionados para el sprint.

## El equipo de Scrum y sus roles

El modelo de equipo en Scrum está diseñado para optimizar la flexibilidad, la creatividad y la productividad. Se ha desarrollado esta metodología con el equipo para:

- Que se entregue los productos de forma iterativa.
- Que sea incremental.
- Que se maximice la interacción con el cliente.

El equipo debe evitar al máximo dependencias externas.

Para los procesos de desarrollo de software y en específico en Scrum tenemos un equipo con varios roles.

**Product owner**

- Dueño del producto. 
- Gestor de requisitos. 
- Atiende peticiones del cliente.

**Scrum master**

- Responsable de promover y apoyar Scrum.
- Implementa la metodología.
- Elimina impedimentos.

**Equipo de desarrollo**

- Realiza el trabajo a entregar.
- Autoorganizado y autogestionado.
- Genera el incremento del producto.

El modelo de equipo en Scrum está diseñado para optimizar la flexibilidad, la creatividad y la productividad.

Los equipos Scrum entregan productos de forma iterativa e incremental, maximizando las oportunidades de obtener retroalimentación.

El equipo debe de eliminar las dependencias externas, ya que lo ideal es organizar los equipos pensando en minimizar las dependencias con entes externos.

Por otro lado la organización del equipo puede ser basada en funcionales o componentes.

## Qué hace el Product Owner o Dueño del Producto

**Product Owner/dueño de producto**: El único encargado de la lista del producto, decide que se va a trabajar primero, encargado de despejar dudas al equipo de desarrollo de como el cliente desea el producto de forma detallada.

El Product Owner es el representante del cliente, responsable de **maximizar el valor del producto** gracias al trabajo del equipo, y es el único responsable de gestionar la lista de producto. Encargado de priorizar la lista de producto y entender qué es lo que quiere el cliente del proyecto que se está desarrollando.

**Responsabilidades**: 

- Expresar claramente los requerimientos.
- Priorizar elementos clave de la lista del producto (requerimientos).
- Optimizar el valor del trabajo del equipo de desarrollo a través de la priorización y claridad de los objetivos.
- Asegurarse que la lista del producto sea totalmente transparente.
- Asegurarse de que el equipo de desarrollo esté totalmente consciente de los objetivos de la lista de productos. El product owner es importante porque sus decisiones van a incidir directamente en la línea que tome el desarrollo del producto final, tiene que tener una autoridad bien definida para asegurarse de que sus decisiones sean cumplidas, ya que él es quien se encargará de gestionar lo necesario directamente con el cliente. Esto no quiere decir que dicha autoridad será impuesta, se debe buscar consenso siempre para tener un equipo funcional

## El rol del Scrum Master

El Scrum Master es el responsable de promover y apoyar scrum dentro del equipo, ayudando a todos a entender la teoría, práctica, reglas y valores de Scrum. Si hay algo que no se está haciendo bien debe decirnos “podemos mejorar”.

Es un líder que está al servicio del equipo scrum, y es el encargado de ayudar a entender a los externos al equipo scrum cuando deben interactuar con el equipo.

**¿Cómo ayuda el SM al PO?**

- Asegurar que los objetivos y el alcance sean entendidos por todo el equipo scrum, que todos entiendan en el planning qué se va a trabajar.
- Entender y practicar la agilidad.
- Facilitar los eventos de scrum según se requiera o necesite, planeación de lugar, fecha, hora, recursos, que cuando el equipo llegue a la sala esté todo lo que el equipo necesite.

**¿Cómo ayuda el SM al equipo de desarollo?**

- Guiar al equipo de desarrollo para que sea autoorganizado, darle liderezgo a alguien para que resuelvan cualquier duda o inconveniente.
- Ayudar al equipo de desarrollo a crear productos de alto valor, asegurándose que los objetivos durante el sprint sean entendidos.
- Eliminar impedimentos para el progreso del equipo de desarrollo.

**¿Cómo ayuda el SM a la organización?**

- Liderar y guiar a la organización a la adopción de Scrum.
- Trabajar en conjunto con otros SMs para incrementar la efectividad de la aplicación de Scrum en la organización.

## Equipo de desarrollo en Scrum

Consiste en un grupo de profesionales que realizan el trabajo de entregar un incremento de producto "Terminado" que potencialmente se pueda poner en producción al final de cada sprint.

La organización debe poder empoderar al Dev team para que estos se organicen y gestionen su propio trabajo. Deben darles la confianza al equipo.

**Características**:

- Autoorganizados.
- Multifuncionales
- No tienen títulos
- No hay subequipos
- Solo se pude modificar al terminar el sprint. (No se puede modificar al equipo de desarrollo hasta que acabe el sprint)

El equipo puede ser de 3 a 9 personas sin tomar en cuenta el product owner y al scrum master. Al menos que uno de esos dos hagan código o diseño y que este dentro de sus funciones diarias hacer esta actividades.

## Qué es el Backlog, las Épicas y las Historias de Usuario

**Las épicas y el backlog del producto**

Todo lo que se necesite que haga el producto debe estar en la Lista de Producto si no esta allí no e trabaja en ello. La lista del producto nunca esta completa, se desarrolla a medida del desarrollo.

Los elementos mas prioritarios deben estar super detallados, y estos elementos son los que están en el sprint actual y el próximo. Los sprint lejanos no es necesario tenerlos tan detallados por el momento.

La lista del producto es un artefacto vivo cosas pueden agregarse o eliminarse del producto.

Los elementos del producto los conocemos como Historias de Usuario.

Las Épicas son el conjunto de muchas historias de usuarios y nacen de la toma de notas de funcionalidades o módulos. Estas épicas requieren de más de un sprint para ser completadas.

## ¿Cómo crear Historias de Usuario?

Las historias de usuario son los elementos más específicos de la lista de producto, contienen la visión del usuario sobre la funcionalidad esperada del producto.

Historia de usuario ≠ Requerimientos

El usuario no siempre es la persona que va a estar detrás de la pantalla interactuando con el producto, el usuario también puede ser otra parte del sistema.

Los **componentes** de la historia de usuario son:

- Título. Define de manera rápida y sencilla de qué se trata la historia.
- Descripción. Define de forma más específica lo que se va implementar en esta tarea.
- Para la descripción es usual manejar una plantilla como la siguiente:
  - Como &lt;rol&gt; quiero &lt;acción&gt; para &lt;beneficio&gt;
  - Como estudiante quiero poder completar evaluaciones en la plataforma para poder ser evaluado y tener una calificación.
- Puntos. Es el esfuerzo que le tomará al equipo de desarrollo completar la historia.
- Criterio de aceptación. Son los requisitos que la historia de cumplir para poderla marcar como completa.

Se pueden usar sistemas digitales para manejar las historias de usuario como lo puede ser **Jira**.

¿Cómo podemos definir que una historia esta ya terminada? Para eso tenemos la definición de completo que son la lista de elementos requeridos para saber que una historia se completo. Ejemplo de una historia de desarrollo:

✅ Funcionalidad (criterios de aceptación)

✅ Código subido en git

✅ Pruebas creadas

✅ Documentación

Se debe de invertir tiempo en la planeación de las historias de usuario, tenemos una técnica llamada las tres C's por sus nombres en inglés.

- Cards. Son las tarjetas creadas con los componentes o información de cada historia.
- Conversation. Es la conversación del equipo acerca de esta historia y que todos entienden el proceso que tendrá.
- Confirmation. Todas las personas confirman que entienden la historia.

Se dice que inviertes en historias porque estas deben de ser:

I - Independiente 
N - Negociable 
V - Valiosa 
E - Estimable 
S - Small (pequeña) 
T - Testeable (Comprobable)

## Cómo estimar Historias de Usuario

Para poder estimar historias de usuario tenemos que tener en cuenta:

- La complejidad de la historia, funcionalidad de la actividad
- Cantidad de trabajo requerido, tamaño de la actividad
- Conocimientos necesarios, aprendizaje para realizar la actividad
- Incertidumbre, factores externos que no controlamos

El estimado lo vamos a tomar como puntos, los puntos no son horas de trabajo, no commits, etc es un estimado empírico en base a la experiencia del proyecto.

**Poker de planeación**, esta herramienta nos va a servir para estimar las historias de usuarios. 

Es una técnica en la que cada miembro del equipo tendrá unas cartas en las cuales cada miembro del equipo y da un número que cree que tiene de esfuerzo hacer la HU.

Podemos usar diferentes escalas, ejemplo:

- 1, 2, 3, 5, 8, 13 ... infinito e incertidumbre
- 1, 2, 4, 8, 16, 32 ...

La idea de no usar números consecutivos es para reducir las discusiones

Al final del sprint vamos a tener el valor total de puntos y eso nos va a dar el valor de velocidad del equipo.

La velocidad es el total de puntos completados por el equipo durante las historias de usuario.

**Velocidad del equipo:** total de puntos de las HU completadas por el equipo durante un sprint. 
**Capacidad**: Total de HU que se pueden completar en un sprint futuro.

La capacidad es el total de historias de usuario que se pueden completar en un sprint futuro.

Entonces básicamente el primer sprint sirve para medir la velocidad del equipo y en base a este se van a poder estimar mejor los siguientes sprints.

**Aplicación para hacer Planning Poker**: Scrum Poker Cards (Agile) en PlayStore.

## ¿Cómo empezar? Prioridades y Backlog del Sprint

- Es un subconjunto de la Lista de Producto (Product backlog) y contiene todos los elementos que serán desarrollados durante el Sprint.
- De estos elementos dependerá el incremento a desarrollar y los objetivos del Sprint.
- Debe tener detalle suficiente para que todo el equipo sea capaz de comprenderlo en los daily stand-ups (Scrum diario)
- Solo el equipo de desarrollo puede aceptar que se agreguen elementos al Sprint Backlog. El dueño del backlog del sprint es el equipo de desarrallo, el dueño del backlog del producto es el Product Owner. 
- Si un elemento se vuelve innecesario a mitad de un sprint se puede sacar de la lista de pendientes.

**Lista de pendientes del spring**

Existen varias maneras de gestionar los pendientes. Trello es una buena herramienta para darle seguimiento a las actividades.

Podemos utilizar las siguientes columnas:

- Historias de usuario
- Historias que hemos decidido trabajar
- Historias que están en progreso
- Historias que se van a empezar a probar
- Historias terminadas

**Definiendo prioridades** Se debe tomar en cuenta el siguiente orden para dar prioridad a las historias de usuarios:

- Lo que genera más valor para el cliente.
- Urgencia: Por ejemplo, si una historia tiene una fecha para que se pueda utilizar o integrar al sistema.
- Riesgo/Oportunidad: Si la historia afecta positiva o negativamente a otras historias, es decir, si puede retrasar o agilizar a otras historias.
- Esfuerzo: Cuánto esfuerzo le tomará al equipo de desarrollo en completar la historia de usuario.

## Cómo medir el avance de un proyecto Scrum

Lo medimos para que el equipo pueda ir analizando el progreso hecho y revisar si se puede cumplir el objetivo planeado al inicio de la iteración. Se puede realizar en  base a los puntos de la historia de usuario.

**Burn-Down chart**: Un gráfico de trabajo pendiente a lo largo del tiempo, muestra la velocidad a la que se estan completando los objetivos. Permite extrapolar si el equipo podrá completarel trabajo en el tiempo estimado. Usualmente el trabajo remanente (backlog) se muestra en el eje vertical y el tiempo en el eje horizontal. Muy util para realizar adaptaciones entre los sprints.

![Burn-Down](/astro-doc-full-stack/images/scrum/charts.webp)

**Burn-up chart**: Muestra el trabajo aportado por el equipo a un proyecto agíl. Util para gestionar el trabajo porque permite tomar decisiones realistas acerca del trabajo pendiente y las expectativas del mismo. Ayuda a encontrar el ritmo sostenible del equipo. Además cuando la velocidad de éste se estabiliza (normalmenteal cabo de 4-5 sprints), podemos hacer un cálculo de cúando podría acabarse el proyecto.

![Burn-up](/astro-doc-full-stack/images/scrum/charts1.webp)

**Diagrama de flujo acumulado**: Proporciona una visualizacion concisa de las metricas de flujo. Muestra que tan estable es tu flujo y te ayuda a entender dónde concentrarse para hacer que tu proceso sea más predecible.

![Flujo acumulado](/astro-doc-full-stack/images/scrum/charts2.webp)

## Qué es el Sprint en un proyecto Scrum

**El sprint es el corazón de Scrum**

El sprint es un periodo determinado en que se crea un incremento del producto, normalmente dura de 1 a 4 semanas y siempre sera el mismo periodo.

**El ritmo del sprint**:

- Planeación del sprint, que se va a trabajar.
- Scrum diario, reunión para discutir el progreso.
- Trabajo de desarrollo, que va ocurriendo todos los días.
- Revisión del sprint, aquí vemos si se cumplen o no los objetivos.
- Retrospectiva del sprint, que se puede mejorar.

Todos los sprints deben de tener un objetivo claro y el equipo de desarrollo lo debe saber porque lo esta haciendo

Si los objetivos quedan obsoletos el product owner puede cancelar el sprint y esto rara vez sucede

![Sprint](/astro-doc-full-stack/images/scrum/Sprint.png)

## Qué es el Sprint Planning

**¿Qué es el planning?** El sprint planning es la ceremonia donde definimos las HU que se van a desarrollar durante el srpint. Debe estar presente todo el equipo de Scrum: SM, PO y equipo de desarrollo.

**¿Qué duración debe tener el planning?** No debe durar más de 8 horas para sprints de 4 semanas. Normalmente esta ceremonia puede durar 1 hora para un sprint de 2 semanas. 

**Funciones del SM en el planning** El Scrum Master es el encargado de organizar esta ceremonia, debe ser en un lugar adecuado, un salón lo suficientemente grande para el equipo, puede haber pizarrón, si se necesita sala de videoconferencia para hablar con un cliente. El Scrum Master debe encargarse de que todo esté y que todo funcione.

Nadie puede responder correos, llamadas, ni mensajes, deben estar concentrados en el srpint planning, y todo el equipo debe estar concentrado en la misma actividad.

**Objetivos del planning** ¿Qué puede entregarse al final del sprint? Se toman las HU más prioritarias de la lista de producto. Se discute también el objetivo a lograr en el sprint. Saber la capacidad del equipo y la velocidad de la última iteración.

**¿Cómo se logrará hacer este trabajo?** Las HU pasan de la lista de producto al backlog del srpint. Se hacen las estimaciones de esfuerzo. El PO se encarga de aclarar cualquier duda con una HU. Pueden haber invitados que aporten valor (cliente, usuario final).

**Resumen**: el proceso consta de 4 pasos.

- **Elementos** de la lista de producto a trabajar
- **Estimación**
- Analizar la **Capacidad** de puntos del equipo
- Definir **Objetivos** del srpint

## Daily stand-up. Seguimiento de un proyecto Scrum

En **Daily stand up** es una reunión diaria de no más de 15 minutos, donde participa el equipo de desarrollo y debe ser en pie con la finalidad de no extenderse. Se utiliza para planear las próximas 24 hs de trabajo.

El **scrum master** es responsable de organizar la reunión, de preferencia a la misma hora para crear la costumbre. Otras personas pueden estar presentes pero no participar. Esta reunión se hace con la finalidad de optimizar la colaboración del proyecto.

Esta reunión ayuda a mejorar la colaboración entre los miembros del equipo y a medir el progreso del proyecto.

**Tres preguntas**:

Todos los miembros del equipo deben contestar las siguientes preguntas.

- Qué hice ayer?
- Qué haré hoy?
- Tengo algún impedimento?

Todo esto va enfocado al objetivo del sprint

El scrum master también es responsable de que no haya impedimentos para que el equipo de desarrollo cumpla su objetivo.

Si existen impedimentos, el SM es el encargado de ayudar a resolver ese impedimento. Normalmente estos impedimentos tienen que ver con equipos externos.

Si se necesitan más detalles se pueden realizar reuniones adicionales de ser necesarios para resolver alguna duda.

## Cómo refinar Historias de Usuario

Dentro de los procesos de Scrum es altamente deseado siempre tener funcionalidad en la lista de producto para que esté lista para la implementación (para el siguiente sprint).

Estas sesiones pueden ocurrir al menos una vez durante el sprint (generalmente al medio del sprint), donde todo el equipo de Scrum puede participar. 

El objetivo de la sesión de refinamiento son:

- Detectar cualquier duda o impedimento
- Si hay algún tipo de dependencia
- Que el QA o Dev, sepan que deben probar o programar.

## Sprint Review y Retrospectiva del Sprint

**Revisión del Sprint (Sprint Review)**

Esta ceremonia ocurre al final del sprint, osea el último día. se le muestra al cliente el software que se ha realizado. no necesariamente tiene que ser una reunión puede ser varias reuniones.

La transparencia es importante, en esta reunión se trabaja mucho la comunicación con el cliente. es abierta al dialogo y no es una reunión de seguimiento. El objetivo es ver el producto.

Lo organiza el scrum y no debe ser mas de 4 horas y al final de la reunión se tendrá una lista actualizada del producto desarrollado.

**Restrospectiva**

Es una reunión interna con el equipo de scrum, donde se pueden expresar libremente lo que piensan y dar feedback de la situación. esto se da en un ambiente más relajado. Debe ser productiva y positiva y no buscar culpables. no debe durar más de 15 a 30 min de un sprint de 2 semanas y menos de 4 para un sprint de un mes y esta reunión la organiza el scrum master.

**Elementos que se discuten**:

- Herramientas
- Relaciones
- Personas
- Procesos

**Preguntas a responder**:

- ¿Qué hicimos bien?
- ¿Qué no hicimos tan bien?
- ¿Qué podemos mejorar?

## Escalabilidad de equipos en Scrum

Escalabilidad de los equipos Scrum es capaz de funcionar con proyectos de 10 personas y de 100 personas. La forma en la que está ideado scrum le permite enfrentar proyectos de distintos niveles de complejidad.

**Scrum de scrum** Es un equipo distinto, nos ayudará a coordinar los elementos de trabajo entre todos los equipos. No es un equipo en sí, es una reunión de representantes de los equipos que coordina los esfuerzos de los equipos scrum.

## Qué son las comunidades de práctica

Las **comunidades de práctica** son grupos de personas que comparten un interés o una pasión por algo que hacen y aprenden a hacerlo mejor a medida van interactuando.

El objetivo es aprender y buscar mejorar:

- Dominio, que nos gusta
- Práctica, como lo compartimos
- Comunidad, A quién más le interesa

Las comunidades se pueden dividir en:

- Basada en roles, enfocado a la especialización
- Basada en tópicos, enfocado a crear una comunidad sin importar el rol