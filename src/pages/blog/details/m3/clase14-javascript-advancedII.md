---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Módulo 3 - Clase 14. JavaScript Advanced II

date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/m3/clase13/back.jpg',
    alt: 'A picture of a coder',
  }
icon: { src: '/astro-doc-full-stack/images/m3/clase13/icon.webp', alt: 'Logo' }
description: JavaScript Advanced II

draft: false
category: JavaScript
---

## Time & space complexity

## Eficiencia en programación

Hay **dos factores** claves a la hora de analizar código: **funcionalidad** y **eficiencia**. Pensémoslo de la siguiente manera...

<mark>Cuando hablamos de código, podríamos decir que la diferencia entre un mal código y uno bueno, es que este último es el que funciona. La correcta funcionalidad de los códigos nos indica que elegiremos el que cumple con éxito el objetivo para el que fue desarrollado. Ahora, si comparamos dos buenos códigos, ¿Cuál sería la justificación para determinar el mejor de ellos? Aquí aparece el término de eficiencia.</mark>

Entonces, **¿Cómo identificamos código eficiente**? Las métricas para determinar esto se encuentran bien definidas y evalúan principalmente los siguientes recursos:

- **Complejidad temporal**: representa la cantidad de tiempo que requiere un programa para ejecutarse en función del tamaño de su entrada. Este se mide normalmente en unidades de tiempo como segundos, milisegundos, etc.

- **Complejidad espacial**: cantidad adicional de memoria que utiliza un programa mientras se ejecuta (incluyendo la memoria asignada para variables, estructuras de datos, pilas de llamadas, entre otros) en función del tamaño de la entrada.

## Algoritmos

Se entiende por algoritmo a una **secuencia ordenada y finita de pasos** que permiten realizar una actividad o tarea. Dichos pasos deben ser sucesivos y exactos.

<mark>Un algoritmo debe ser preciso, claro y no ambiguo, de manera que cualquier persona que siga los pasos correctamente pueda obtener el resultado deseado. No sirve de nada tener un algoritmo muy eficiente, pero que sea extremadamente complejo.</mark>

A partir de lo que vimos anteriormente podemos decir que la eficiencia de un algoritmo se mide mediante su complejidad algorítmica, evaluando el tiempo y espacio necesarios en función del tamaño de la entrada. Esta complejidad, a su vez, se expresa comúnmente con la **notación Big O**, que destaca la peor situación posible en relación con el tamaño de la entrada.

### Big O' Notation

La notación Big O se emplea en el análisis de algoritmos para comparar su rendimiento a medida que el tamaño de la entrada crece. Se expresa como "O(f(n))", donde "f(n)" describe la máxima cantidad de recursos necesarios en función del tamaño de la entrada "n". Esta función representa típicamente el **peor caso en términos de tiempo o espacio** del algoritmo.

Piensa en una receta que consiste en 8 pasos. Esta tendría una notación de “O(8)”. Entre más pasos tenga la receta, más tiempo tardará en completarse, igual que un algoritmo.

Los algoritmos suelen clasificarse según la notación Big'O que representa su complejidad algorítmica. Esta clasificación del algoritmo se refleja en la siguiente gráfica...

![big-o.](/astro-doc-full-stack/images/m3/clase14/big-o.png)

Cuanto menor sea la complejidad en términos de la notación Big O (zona morada y amarilla), más eficiente será el algoritmo en términos de tiempo y/o espacio. Para dimensionar la diferencia entre estas categorías veamos el siguiente recuadro donde comparamos la cantidad de datos que puede procesar una función en un tiempo determinado.

Es evidente que entre mayor sea la cantidad de datos de entrada, más tiempo tomará en completarse. Igualmente, entre mayor complejidad (más pronunciada es la gráfica), más tiempo tardará en terminar.

### Categorías

- O(1) - Constante -> Este tipo de complejidad significa que el tiempo de ejecución (o espacio en memoria) del algoritmo, no depende del tamaño de la entrada. Por ejemplo, el tiempo que tardas en encender una bombilla específica de tu casa es constante, independientemente de cuántas bombillas haya allí.

- O(log n) - Logarítmica -> A medida que el tamaño de la entrada aumenta, el tiempo (o espacio) necesario para completar la ejecución crece de manera proporcional al logaritmo del tamaño de la entrada.

Como ejemplo, podríamos pensar en buscar un contacto en una guía telefónica. A medida que la guía telefónica crece en tamaño, el tiempo necesario para encontrar un contacto aumenta, pero no de manera lineal. Cada vez que divides el directorio por la mitad y decides en qué mitad continuar tu búsqueda, estás siguiendo un patrón logarítmico. Al avanzar, el número de páginas que debes revisar disminuye a la mitad en cada paso.

- O(n log n) - Lineal logarítmica -> La complejidad crece en proporción al producto del tamaño de la entrada y el logaritmo del tamaño de la entrada.

Pensemos en ordenar una baraja de cartas. El tiempo necesario para ordenar la baraja de cartas, depende de la cantidad de símbolos en la baraja en relación a la cantidad de cartas por cada símbolo.

- O(n) - Lineal -> A medida que la entrada aumenta, el tiempo (o espacio) necesario para completar la ejecución también aumenta de manera proporcional.

Por ejemplo, contar el número de personas en una sala. A medida que el número de personas en la sala aumenta, el tiempo necesario para contarlas lo hará proporcionalmente también.

- O(2^n) - Exponencial -> A medida que la entrada aumenta, el tiempo (o espacio) necesario para completar la ejecución aumenta exponencialmente.

En este caso, un buen ejemplo sería encontrar todas las posibles combinaciones de un candado de combinación de n dígitos probando todas las combinaciones posibles. El número de combinaciones aumenta exponencialmente con la longitud de la clave.

- O(n^2) - Cuadática -> A medida que la entrada aumenta, el tiempo (o espacio) necesario para completar la ejecución aumenta al cuadrado del tamaño de la entrada.

Por ejemplo, limpiar una habitación cuadrada barriendo en patrones de ida y vuelta. A medida que aumenta el área de la habitación, el tiempo necesario para limpiarla aumenta cuadráticamente.

## Algoritmos en código

Los ejemplos mencionados ilustran cómo se aplican las diferentes categorías de complejidad en la notación Big'O utilizando analogías de la vida cotidiana. Veamos algunos ejemplos más enfocados ahora en código, exclusivamente, así como el tiempo que tardan en completarse.

Si pensamos en una función para imprimir en pantalla el primer elemento de un array, podríamos pensar en una complejidad constante O(1), ya que en este caso el tamaño de dicho array sería totalmente indiferente. Solo nos interesa el primero de sus elementos.

```js
const foods = ['A', 'B', 'C', 'D'];

function printFirsElement(array) {
  console.log(array[0]); // A
}

printFirsElement(foods);
```

Mientras que imprimir cada elemento de ese array podría ser considerado un algoritmo de complejidad lineal O(n), pues el tiempo es directamente proporcional a la cantidad de elementos del array.

```js
const foods = ['A', 'B', 'C', 'D'];

function printAllElements(foods) {
  foods.forEach((food) => {
    console.log(food); // A
  });
}

printAllElements(foods);
```

Al comparar ambas funciones, veremos que el tiempo de ejecución aumenta (tal vez no considerablemente), ya que en el segundo caso debe recorrer el array entero. La eficiencia se verá afectada por el tamaño del array tal como mencionamos anteriormente.

## Algoritmos de búsqueda y ordenamiento

## Algoritmos de búsqueda

Los algoritmos de búsqueda son métodos sistemáticos que se utilizan para localizar un elemento particular dentro de un conjunto de datos, como estructuras de datos. A pesar de que su eficiencia y complejidad pueden variar, los algoritmos de búsqueda son fundamentales en la resolución de problemas relacionados con la recuperación de información.

Pensemos en la búsqueda de un número en un array ordenado. Este algoritmo podría tener dos diferentes aproximaciones.

- Búsqueda lineal -> La primer aproximación se daría a partir de una búsqueda lineal.

Se recorrerá el array de principio a fin comparando cada elemento con el valor objetivo. En el peor de los casos, este valor coincide con el último elemento del array, haciendo que el tiempo de resolución sea proporcional al tamaño de dicho arreglo.

- Búsqueda binaria -> La segunda aproximación permite mejorar la eficiencia de esta tarea. Recibe el nombre de búsqueda binaria y posee una complejidad logarítmica (log n).

Este algoritmo consiste en encontrar el valor intermedio del array ordenado y compararlo con el valor objetivo. Si es igual, devolvemos el resultado y finalizamos el proceso. De lo contrario, tendremos dos casos posibles: que el valor objetivo sea mayor o menor al valor intermedio.

En ambos casos tendremos dos grupos de datos (mayores y menores al objetivo) y podremos desechar la mitad de los datos según corresponda. Repetiremos esta operación tomando el nuevo array de datos hasta encontrar el resultado.

De esta manera lograremos reducir el espacio de búsqueda por la mitad en cada iteración dividiendo el array en dos partes y seleccionando la mitad que podría contener el valor objetivo. Esto permite mantener una eficiencia constante sin importar la posición del número dentro del array.

Empezamos a entender un poco más cómo funciona y cómo podemos mejorar la eficiencia de nuestro código. Veamos algunos ejemplos más a través de algoritmos de ordenamiento de datos.

## Algoritmos de ordenamiento

El ordenamiento de datos es una práctica frecuente en la programación. Esta puede ser abordada de múltiples maneras por medio de algoritmos con diferentes niveles de eficiencia. A pesar de la amplia variedad de algoritmos de ordenamiento, nos centraremos en los más comúnmente empleados.

## Bubble sort

**Bubble Sort compara elementos de a pares y los ordena dentro de un array**. Este proceso se repetirá hasta que los datos estén ordenados y no se realice ningún cambio durante un recorrido completo del arreglo. Aunque su eficiencia varía según el orden inicial de los elementos en el array, tiende a tener una complejidad cuadrática debido a la cantidad de recorridos que pueda llegar a ejecutar.

> Es un algoritmo sencillo de implementar. Su problema es que, conforme aumenta la cantidad de elementos del array y se encuentran más desordenados, la cantidad de recorridos a realizar aumenta de forma cuadrática.

## Merge sort

La filosofía de este algoritmos gira en torno al concepto de **divide and conquer** (divide y vencerás). Esto significa que la mejor aproximación es segmentar un problema en problemas más pequeños que sean más fáciles de resolver de manera independiente. Consta de tres etapas.

- Divide: Divide el array desordenado en dos sublistas de tamaño aproximadamente igual.

- Ordena: Ordena recursivamente cada sublista. Este paso se repite hasta que cada sublista tenga un solo elemento, lo que se considera que está ordenado.

- Combina(merge): Combina las sublistas ordenadas para producir una lista única y ordenada.

Si planteamos este algoritmo en código, el primer paso será recibir un array y fragmentarlo utilizando una función a la que nombraremos dividir.

Este proceso se hará hasta obtener arrays cada uno con un solo elemento del conjunto original. Los arreglos serán unificados y ordenados de manera recursiva gracias a la función merge.

Debido a su enfoque recursivo y la división en sub-listas, merge sort tiene una complejidad temporal garantizada de O(n log n) en todos los casos. Es mucho más eficiente que el anterior para ordenar grandes conjuntos de datos. Sin embargo, su principal desventaja es que requiere espacio adicional para almacenar las sub-listas durante el proceso de fusión.

## Eficiencia de algoritmos con ChatGPT

## Empleo de IA

Supongamos que nos encontramos con el problema de determinar si existe alguna combinación de valores dentro de un conjunto de datos que nos permita obtener un valor específico y nos devuelva un booleano como indicador...

¿Y si mejor aprovechamos a la tecnología para esta tarea? Iniciemos una nueva conversación de ChatGPT y consultemos la eficiencia de nuestra función.

Conversación #1 (Revisemos la eficiencia de nuestra función) -> https://chat.openai.com/share/35310fa6-48ff-4492-8a5d-5eb97e69ef80

Y aquí veremos que una de las principales ventajas de consultar la eficiencia con ChatGPT, es que nos desglosa de manera detallada el código para determinar su eficiencia.

Finalmente, la función subSetSum es clasificada como un algoritmo de complejidad O(m\*2m) debido a que el arreglo de sumas se recorre una cantidad de veces proporcional a la longitud del array. Para no detenernos aquí, veamos si ChatGPT puede darnos una alternativa para llegar al mismo resultado con una mejor eficiencia.

Conversación #2 (Veamos ahora si hay alguna forma de mejorar la eficiencia de la función) -> https://chat.openai.com/share/c1e7de1d-d6fe-48fe-b56d-9b91585b570d

Cabe resaltar, que es muy importante que al hacer esto, entiendas perfectamente el código resultante. En muchas ocasiones chatGPT hace uso de algoritmos demasiado complejos que pueden llegar a ser problemáticos al momento de tratar de solucionar problemas en tu código.

## Cierre

En esta clase exploramos conceptos fundamentales de algoritmos, desde su significado formal hasta las consideraciones que debemos tener al implementarlos. Comprendimos la importancia de la complejidad temporal y espacial para determinar qué algoritmo puede considerarse mejor que otro en términos de recursos y eficiencia.

Analizamos algoritmos de búsqueda y ordenamiento donde visualizamos las distintas categorías según la complejidad algorítmica determinada por la notación Big O.

Finalmente, destacamos la eficiencia algorítmica como un criterio clave para evaluar y mejorar nuestros procesos. Además, logramos integrar a chatGPT como herramienta para determinar y mejorar la eficiencia de un algoritmo.

![Mapa de conceptos.](/astro-doc-full-stack/images/m3/clase14/mapa.png)

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
</style>
