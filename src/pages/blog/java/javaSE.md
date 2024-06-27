---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Java Standar Edition
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/java/java.webp',
    alt: 'javase-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/java/icon.webp', alt: 'Logo Typescript' }
description: Java Standar Edition
draft: false
category: Java
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
    text-align: center;
  }

  th, td {
    border: 1px solid #ddd; /* Borde de las celdas */
    padding: 8px; /* Relleno de las celdas */
    /* text-align: left;  */
  }

  th {
    background-color: #f2f2f2; /* Color de fondo del encabezado */
    font-weight: bold; /* Peso de la fuente del encabezado */
  }

  tr:nth-child(even) {
    background-color: #f9f9f9; /* Color de fondo de las filas pares */
  }  
</style>

## ¿Que es Java?

<details>

**Java** es un lenguaje de programación que nos ayuda a desarrollar aplicaciones para distintos dispositivos.

- Java SE (standar edition): fundamentos del lenguaje.
- Java es orientado a objetos POO.
- Java no es un lenguaje de programación funcional, pero si cuenta con algunas de sus características.
- Java es un lenguaje de programación multiplataforma creado en 1991 por James Gosling mientras trabajaba en Sun Microsystems.
- Fue comprada por ORACLE en 2009
- Java tiene dos categorías:
  - Java estándar edition.
  - Java enterprise edition.
- Filosofía de Java:
  - WORA = write once run anywhere.
- OpenJDK: es la version open-source de Java SE.

</details>


## Versiones de Java y SDK

<details>

El JDK (Kit de desarrollo de Java) Se compone de tres partes:

- **JRE(Java Runtime Environment)**: la máquina virtual de Java, es lo que ayuda a que sean programas multiplataforma (correr en diferentes plataformas).

- **Compilador de Java**: se encarga de traducir el código Java a un lenguaje (Bytecode) que pueda entender nuestra máquina virtual.

- **API de desarrollo**: Una base de código lista para ayudarnos a desarrollar.

</details>

## Las herramientas más usadas de Java

<details>

- Utilizaremos las versiones Java 8 (Muchas empresas poseen implementaciones) y Java 11.
- Utilizaremos Open JDK

Server

- MAVEN
- Gradle

Frameworks

- Spring: Es un framework para el desarrollo web
- Hibernate: ES un ORM para trabajar con base de datos.

Algunos IDES son:

- NETBEANS
- IntelliJ IDEA
- ECLIPSE y su versión para desarrollar en spring que es spring tool suite

</details>

## Creando un entorno de desarrollo en Java en Linux

<details>

```bash
sudo apt-get update
$ sudo apt-get upgrade
```

### Empecemos instalando OpenJDK 8

```bash
sudo apt-get install openjdk-8-jre
```

### Ahora pasemos a OpenJDK 11

```bash
sudo apt install openjdk-11-jdk
```

### Cambia la versión de Java que desees en ese momento

```bash
# Verifica la versión de Java que tienes instalada
java -version

# Para cambiarla escribe el siguiente comando
sudo update-alternatives --config java

```

Solo como confirmación vuelve a revisar la versión para verificar que se haya cambiado.

</details>

## Escribe tu primer Hola Mundo en Java

<details>

Abrimos el editor IntelliJ IDEA y creamos un nuevo proyecto llamado HolaMundo.
Dentro de la carpeta src, botón derecho, new Java Class y creamos la clase HolaMundo.

</details>

## Atajos:

<details>

- main -> genera la estrutura de la función main
- sout -> System.out.println();

```java
// HolaMundo.java
public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("Hola Mundo!!");
    }
}

// Hola Mundo!!
```

</details>


## Etapas de la programación en Java

<details>

<mark>Java es compilado (javac) e interpretado (JVM)</mark>

A diferencia de lenguajes que solo son interpretados como Javascript o PHP, Java es también compilado lo que nos garantiza que antes de ser interpretado no existirá ningun error de sitaxis.

- Creamos un HolaMundo.java (código fuente)
- Cuando ejecutamos Run, por detrás se ejecutó el compilador javac
  - Analizó el código
  - Traduce el código a un lenguaje llamado Byte Code
  - Serán archivos .class
- La JVM (Java virtual machine) ejecuta el Byte Code sobre nuestra plataforma

Java agrega una capa de seguridad ya que no expone el código fuente. Los que se expone es el ByteCode, aunque no es totalmente incorruptible, se puede realizar ingieniería inversa para obtener el código fuente.

</details>

## La JShell de Java

<details>

Sabías que Java tiene una herramienta interactiva en dónde puedes ir probando segmentos de código en vez de realizar todo el proceso de creación de un programa en Java. Escribir, compilar y correr.

Su nombre es jshell y está disponible desde la versión 9 de Java.

Abre tu consola de comandos o terminal, corre el siguiente comando:

```bash
java -version
```

### Ejercicio 1.

Investiga cómo cambiar la versión de Java desde tu consola de comandos o terminal y compártenos en la sección de discusiones los comandos que ejecutaste.

```bash
sudo update-alternatives --config java
```

### Ejercicio 2.

Asegurate de tener definida una versión superior a la 8.
Ahora desde tu terminal escribe el siguiente comando para abrir nuestra jshell

```bash
jshell
```

Ahora escribe la línea de código para imprimir un texto (no olvides poner ; y dar enter).

```java
System.out.println("Hola Mundo");
```

Para salir de la consola jshell

```java
/ex
```

</details>

## Variables en Java

<details>

**Variables**: Un espacio de memoria al que le asignamos un contenido. Puede ser numérico, texto o un dato complejo. A ese espacio en memoria le daremos un nombre, el nombre de la variable.

Las variables se componen de un nombre (único) y un valor.

Pueden existir variables (declaradas) pero que aún no poseen un dato. A medida que las utilicemos le asignaremos un valor, y de ahí su nombre "variable" (permite cambiar el valor).

En la demo, creamos una nueva clase llamada Variables. Le agregaremos un método main, aunque un programa Java solo debería tener un punto de entrada. En este caso, para ejecutarlo nos paramos sobre la clase y ejecutaremos (el compilador tomará el método main de esa clase).

```java
public class Variables {
    public static void main(String[] args) {
        // Declaramos la variable de tipo entero
        int speed;
        // Para imprimir una variable debe estar inicializada.
        // System.out.println(speed);
        // Asignamos un valor
        speed = 10;
        System.out.println(speed);

        // declamos e inicializamos a la vez
        int salary = 1000;
        System.out.println(salary);

        // Declaramos la variable de tipo string
        String employeeName = "Mauri";
        System.out.println(employeeName);
    }
}
```

</details>

## Actualizando variables

<details>

```java
public class UpdatingVariables {
  public static void main(String[] args) {
      int salary = 1000, bono = 200;
      // bono de 200
      // salary = salary + bono;
      salary += bono;
      System.out.println(salary);

      // pension: $50 (descuento)
      salary -= 50;
      System.out.println(salary);

      // 2 horas extra $30 c/u
      // Comida: $45
      salary = salary +(2*30) - 45;
      System.out.println(salary);

      String employeeName = "Mauricio";
      employeeName = employeeName + " Jourdan";
      System.out.println(employeeName);
    }
}
```

</details>

## Convención de Nombres en Java

<details>

- Los nombres de las variables deben ser únicos.
- Se definen por convención.
- Java es sensible a mayúsculas y minúsculas.
- comenzar con letra, $ o \_.

```java
public class NamingJava {
    public static void main(String[] args) {
        //Java es case sensitive, osea es sensible a minusculas y mayusculas,
        int celphone = 333377777;
        //celphone no es igual a celPhone son distintos por tener una diferencia, uno tiene solo minusculas y el otro contiene una mayuscula por ende son distintos
        int celPhone = 333377777;

        //Unicos
        String $countryName = "Chile";
        String _backgroundColor = "Green";
        //Unicos
        String currency$ = "MXM";
        String background_Color = "BLUE";
        //Con la palabra reserva de final nosotros creamos una constante en java para que el valor que tenga nunca pueda ser cambiado externamente, osea puedes modificarlo cuando le asignamos el valor
        final int POSITION = -5;
        int MAX_WIDTH = 9999;
        int MIN_WIDTH = 1;
    }
}
```

</details>

## Técnica de Naming: Camel Case

<details>

Es la convención de nombres más utilizada en Java y esta es la técnica mejor conocida como camello o Camel Case en inglés.

Básicamente tendremos dos formas de utilizar camel case

- Upper Camel Case.
- Lower Camel Case.

La diferencia será básicamente en la primera letra de la variable.

En el primer caso que es Upper Camel Case siempre vamos a comenzar la primera letra de esa variable con mayúscula y vamos a separar si esa variable se compone de más palabras vamos a estarlas separando consecutivamente con las iniciales en mayúscula.

Pero recordemos que Upper Camel Case siempre va a comenzar la primera letra con mayúscula.

Para el caso de Lower Camel Case vamos a utilizar la primera letra con minúscula esa va a ser la principal diferencia.

**¿EN QUÉ MOMENTO DEBERÍA UTILIZAR UPPER CAMEL CASE Y LOWER CAMEL CASE?** Bueno es bastante sencillo y para eso existe la convención de Java, utilizaremos **UPPER CAMEL CASE** cuando estemos nombrando **clases**. Todos los nombres de las clases van a empezar con mayúsculas y **LOWER CAMEL CASE** es el que más vamos a utilizar porque va a referirse a los **nombres de las variables**, cualquier nombre de variables siempre va a comenzar con Lowe camel case.

También incluso nombres de métodos, aquí también va a ser aplicado lower camel case. ( nombres de variables, métodos y clases es lower camel case).

</details>

## Tipos de datos numéricos

<details>

En Java, se pueden utilizar los siguientes tipos de datos numéricos para números enteros

- Byte: ocupa 1 byte de memoria.
- Short: ocupa 2 bytes de memoria.
- int: ocupa 4 bytes de memoria
- long: ocupa 8 bytes de memoria. Nota: Para diferenciar un int de un long es necesario poner una 'L' al final del número de tipo long. Ejemplo:

```java
long numLong = 1234L;
```

Para datos numéricos con punto decimal existen dos opciones: float y double.

- float: ocupa 4 bytes de memoria y no tiene tanta precisión como double.
- double: ocupa 8 bytes de memoria y tiene más precisión que float. Para hacer la distinción entre estos, es necesario poner una 'F' al final del número flotante. Ejemplo:

```java
float numf = 1234F;
```

```java
public class DataTypes {
    public static void main(String[] args) {
        //byte, short, int, long
        System.out.println("==========TIPOS DE DATOS ENTEROS==========");
        System.out.println();

        System.out.println("BYTE");
        System.out.println("Ocupa una capacidad de: " + Byte.SIZE + " bits ó " + Byte.BYTES + " byte");
        System.out.println("Comprende desde " + Byte.MIN_VALUE + " hasta " + Byte.MAX_VALUE);
        System.out.println();

        System.out.println("SHORT");
        System.out.println("Ocupa una capacidad de: " + Short.SIZE + " bits ó " + Short.BYTES + " byte");
        System.out.println("Comprende desde " + Short.MIN_VALUE + " hasta " + Short.MAX_VALUE);
        System.out.println();

        System.out.println("INTEGER");
        System.out.println("Ocupa una capacidad de: " + Integer.SIZE + " bits ó " + Integer.BYTES + " byte");
        System.out.println("Comprende desde " + Integer.MIN_VALUE + " hasta " + Integer.MAX_VALUE);
        System.out.println();

        System.out.println("LONG");
        System.out.println("Ocupa una capacidad de: " + Long.SIZE + " bits ó " + Long.BYTES + " byte");
        System.out.println("Comprende desde " + Long.MIN_VALUE + " hasta " + Long.MAX_VALUE);
        System.out.println();

        //float,double
        System.out.println("==========TIPOS DE DATOS DE PUNTO FLOTANTE==========");
        System.out.println();

        System.out.println("FLOAT");
        System.out.println("Ocupa una capacidad de: " + Float.SIZE + " bits ó " + Float.BYTES + " byte");
        System.out.println("Comprende desde " + Float.MIN_VALUE + " hasta " + Float.MAX_VALUE);
        System.out.println();

        System.out.println("DOUBLE");
        System.out.println("Ocupa una capacidad de: " + Double.SIZE + " bits ó " + Double.BYTES + " byte");
        System.out.println("Comprende desde " + Double.MIN_VALUE + " hasta " + Double.MAX_VALUE);
        System.out.println();
        System.out.println();

        //float,double
        System.out.println("EJEMPLOS====================");
        System.out.println();

        byte byteVar = 15;
        System.out.println("byteVar = " + byteVar);
        short shortVar = 100;
        System.out.println("shortVar = " + shortVar);
        int intVar = 500;
        System.out.println("intVar = " + intVar);
        long longVar = 1000;
        System.out.println("longVar = " + longVar);
        float floatVar = 1.618033f;
        System.out.println("floatVar = " + floatVar);
        double doubleVar = 3.141592654;
        System.out.println("doubleVar = " + doubleVar);

        var numero = 10;
        System.out.println("numero = " + numero);

    }
}
```

</details>

## Tipos de datos char y boolean

<details>

- **char**: Ocupa 2 bytes y solo puede almacenar 1 dígito, debemos usar comillas simples en vez de comillas dobles.

- **boolean**: Son un tipo de dato lógico, solo aceptan los valores true y false. También ocupa 2 bytes y almacena únicamente 1 dígito.

Existe una peculiaridad muy interesante sobre los tipos de datos respectivamente a partir de **Java 10**. Hasta el momento hemos visto que para declarar un dato anteponemos el tipo de dato al que me estoy refiriendo: double, float, char, boolean siempre se colocara el keyboard seguido del nombre de la variable.

Pero a partir de Java 10 podemos ignorar esa primera palabra, ese keyboard que indica el tipo de variable y sustituirlo por un dato mucho más genérico: **la palabra clave var**. Se puede poner var seguido de la variable = y asignarle un valor.

El compilador realizará una inferencia de datos.

```java
public class DataTypes {
    public static void main(String[] args) {
        var salario = 1000; //int
        var pension = salario * 0.03; //double
        var totalSalario = salario - pension; //double

        /*System.out.println(pension);
        System.out.println(totalSalario);*/

        var empleadoNombre = "Valeria Calcina";
        var area51 = "Desarrollo Tecnologico de la empresa";
        System.out.println(empleadoNombre + "\nNombre del empleado: " + empleadoNombre + "\nSalario: $" + totalSalario + "\nArea de trabajo: " + area51);

    }
}
```

</details>

## Operadores de Asignación, Incremento y Decremento

<details>

### Operadores de asignación

| Operador | Aplicación | Desglose   |
| -------- | ---------- | ---------- |
| +=       | a += b     | a = a + b  |
| -=       | a -= b     | a = a - b  |
| \*=      | a \*= b    | a = a \* b |
| /=       | a /= b     | a = a / b  |

**Operadores prefijo** Cuando se usan los operadores prefijos, se evalúa la expresión y después se utiliza. **++i**

**Operadores postfijo** Cuando se usan los operadores postfijos, se usa la expresión sin evaluar y después se evalúa. **i++**

| Operador | Nombre     | Ejemplo | Desglose  |
| -------- | ---------- | ------- | --------- |
| ++       | incremento | i++     | i = i + 1 |
| --       | decremento | i--     | i = i - 1 |

```java
public class IncrementDecrement {
  public static void main(String[] args) {
      int lives = 5;
      lives = lives - 1;
      System.out.println(lives); //4

      lives--; //Operador decremento
      System.out.println(lives); //3

      lives++; //Operador incremento
      System.out.println(lives); //4

      //Prefijo
      //Gana un regalo por ganar una vida
      int gift = 100 + ++lives; //Prefijo
      // int gift = 100 + lives++; //Postfijo
      System.out.println(gift);
      System.out.println(lives);
  }
}
```

</details>

## Operaciones matemáticas

<details>

```java
public class MathematicOperations {
    public static void main(String[] args) {
        //Valores enteros
        int a = 5;
        int b = 10;

        //Valores con decimales
        double i = 2.1;
        double j = 3.5;

        //Redondea hacia arriba
        System.out.println(Math.ceil(i));

        //Redondea hacia abajo
        System.out.println(Math.floor(j));

        //Devuelve el valor mayor
        System.out.println(Math.max(a,b));

        //Imprime un numero elevado a otro
        System.out.println(Math.pow(a,b));

        //Devuelve el valor absoluto de un argumento dado
        System.out.println(Math.abs(j));

        //Devuelve la suma de sus argumentos
        System.out.println(Math.addExact(a,b));

        //Devuelve la tangente del arco de un angulo (-pi/2 y pi/2)
        System.out.println(Math.atan(j));

        //Devuelve la raiz cubica de un valor double
        System.out.println(Math.cbrt(i));

        //Devuvleve el coseno hiperbolico de un valor double
        System.out.println(Math.cosh(j));

        //Devuelve el coseno trigonometrico de un angulo
        System.out.println(Math.cos(j));

        //Devuelve el numero elevado a la potencia de un valor double
        System.out.println(Math.exp(i));
    }
}
```

</details>

## Cast en variables: Estimación y Exactitud

<details>

- **Cast** casteo o casting de variable.
- En la programación hay situaciones donde se necesita **cambiar el tipo de dato**.
- Estimación: no nos importa la cantidad de decimales, queremos el dato estimado.
- Exactitud: en este caso nos convendría cambiar un tipo de datos entero a un tipo de dato que sea de tipo double.

**Overflow y Underflow** Algo muy importante a considerar al realizar un casting entre variables es que puede alterarse el valor de la misma si excede el máximo o mínimo soportado por el tipo de dato a convertir. Por ejemplo:

```java
short y = (short)1921222; //Almacena 20678
```

El valor 1921222 es demasiado grande para almacenarse como un short, por lo que se produce un desbordamiento (overflow) numérico y se convierte en 20678. El overflow es cuando un numero es tan grande que ya no cabe dentro del tipo de dato, por lo que Java lo ajusta al siguiente valor mas bajo y cuenta desde allí.

|         | boolean | byte | short | char | int  | long | float | double |
| ------- | ------- | ---- | ----- | ---- | ---- | ---- | ----- | ------ |
| boolean | X       | no   | no    | no   | no   | no   | no    | no     |
| byte    | no      | X    | si    | cast | si   | si   | si    | si     |
| short   | no      | cast | X     | cast | si   | si   | si    | si     |
| char    | no      | cast | cast  | X    | si   | si   | si    | si     |
| int     | no      | cast | cast  | cast | X    | si   | si\*  | si\*   |
| long    | no      | cast | cast  | cast | cast | X    | si\*  | si\*   |
| float   | no      | cast | cast  | cast | cast | cast | X     | si     |
| double  | no      | cast | cast  | cast | cast | cast | cast  | X      |

- no: no hay posibilidad de conversion
- si: el casting es implícito
- si\*: el casting es implícito pero se puede producir pérdida de precisión
- cast: indica que hay que hacer casting explícito

```java
public class Casting {
    public static void main(String[] args) {
        //En un año ubico 30 perritos, ¿Cuántos perritos al mes?

        double monthlyDogs = (30.0 / 12.0);
        System.out.println("El numero de perritos mensuales es: " + monthlyDogs);

        //Estimación
        int estimatedMonthlyDogs = (int) monthlyDogs;
        System.out.println("La estimancion de perritos rescatados mensualmente es: " + estimatedMonthlyDogs);

        //Exactitud
        int a = 30, b = 12;
        System.out.println("Exactitud de perritos mensuales: " + (double) a/b);
    }
}
```

</details>

## Archivos .JAR

<details>

- Los **archivos JAR ** es la abreviatura de Java ARchive.
- Son la extensión de nuestros archivos ejecutables de java, esto es lo que básicamente nuestra máquina virtual se va a encargar de leer.
- Los archivos JAR son un tipo de comprimido donde utilizan el formato Zip, ¿ Pero en realidad qué es lo que contienen dentro estos archivos? Bueno como ya sabemos nuestros archivos .class es el resultado de la compilación del código fuente, esos archivos .class es el resultado de la compilación del código fuente esos archivos .class es la capa de seguridad que añade Java para que el código fuente no este accesible a nuestros usuarios.
- Muchas veces creamos JAR por la necesidad de distribuir nuestro código.
- Los archivos JAR van a contener estos archivos, estos códigos compilados, estos archivos .class, van a estar ahí empaquetados y es de esta forma como la máquina virtual puede leerlos, puede entenderlos.

Los ficheros **Jar** (Java ARchives) permiten recopilar en un sólo fichero varios ficheros diferentes, almacenándolos en un formato comprimido para que ocupen menos espacio. Es por tanto, algo similar a un fichero **.zip** (de hecho están basados en ficheros .zip).

Entonces, ¿No se podrían usar directamente ficheros .zip? La particularidad de los ficheros **.jar** es que **no necesitan ser descomprimidos para ser usados**, es decir que el intérprete de Java es capaz de ejecutar los archivos comprimidos en un archivo jar directamente.

Por ejemplo, si hemos recopilado todos los ficheros necesarios para ejecutar una aplicación en un fichero "aplic.jar", podemos lanzar la aplicación desde una terminal de texto mediante:

```bash
java -jar aplic.jar
```

Para generar un archivo .jar debemos ir al menu File / Project Structure / Artifacts / + / JAR / From modules with dependencies...

Luego vamos a Build / Build Artifacts... / Build

</details>

## Sentencia if

<details>

- Condicionales: son la manera en la que una maquina toma decisiones a la hora de ejecutar el código.
- Funciona de modo “falso” o “verdadero”.

### Algunos operadores que se ocupan

- **&&** es el operador condicional “AND”
- **||** es el operador condicional “OR”
  **?:** es el operador ternario
  **Instanceof** es el operador instanceof

Articulo referente a distintos operadores: http://www.manualweb.net/java/operadores-condicionales-java/

```java
public class IfState {
    public static void main(String[] args) {
        boolean isBluetoodEnable= true;
        int fileSend=2;

        if(isBluetoodEnable==true){
            fileSend++;
            System.out.println("Archivo enviado");
        } else {
            System.out.println("Archivo no enviado");
        }
    }
}
```

</details>

## Alcance de las variables y Sentencia ELSE

<details>

**Alcance** El alcance permite delimitar el uso de la variable en un determinado bloque de código. Las variables deben ser declaradas antes de utilizarse.

El **scope** (alcance) se refiere a la visibilidad y accesibilidad de las variables, métodos y clases dentro de un programa. El alcance determina desde qué partes del programa se puede acceder a una variable o invocar un método y durante cuánto tiempo se mantendrá su valor.

**Java define varios niveles de alcance**, que incluyen:

- <mark>Alcance de clase (Class scope):</mark> Las variables y métodos declarados a nivel de clase están disponibles para todas las instancias de la clase. Estas variables se conocen como variables de instancia y pueden ser accedidas utilizando una instancia de la clase.

- <mark>Alcance de método (Method scope):</mark> Las variables declaradas dentro de un método solo son visibles y accesibles dentro de ese método. Estas variables se conocen como variables locales y se crean cuando se entra al método y se destruyen cuando se sale de él.

- <mark>Alcance de bloque (Block scope):</mark> Las variables declaradas dentro de un bloque de código delimitado por llaves ({}) solo son visibles y accesibles dentro de ese bloque. Esto incluye bloques de código dentro de métodos, bucles, condicionales y otros bloques anidados.

- <mark>Alcance de parámetro (Parameter scope):</mark> Los parámetros de un método tienen un alcance limitado al interior del método. Estos parámetros son variables locales que reciben valores cuando el método es llamado y cesan de existir una vez que el método se completa.

Es importante comprender y manejar correctamente el alcance en Java para evitar conflictos de nombres, proteger la integridad de los datos y promover una buena estructura de programación. Al delimitar adecuadamente el alcance de variables y métodos, se mejora la claridad, mantenibilidad y eficiencia del código.

```java
public class ifStatement {
    public static void main(String[] args) {
        boolean isBluetoothEnable = true;
        int fileSended = 0;

        if(isBluetoothEnable){
            //Send file
            fileSended++;
            System.out.println("Archivo enviado");
        }else{
            System.out.println("Enciende el Bluetooth!");
        }
        //Cantidad de archivos enviados
        System.out.println("Archivos enviados: " + fileSended);

    }
}
```

</details>

## Operadores Lógicos y Expresiones booleanas

<details>

Los condicionales en Java no se limitan solo a variables booleanas; también pueden evaluar el resultado de **operaciones booleanas**.

Los **operadores lógicos** permiten realizar comparaciones complejas y tomar decisiones basadas en múltiples condiciones.

### Operadores Lógicos

| Operador | Nombre | Ejemplo  |
| -------- | ------ | -------- |
| &&       | AND    | a && b   |
| \|\|     | OR     | a \|\| b |
| !        | NOT    | !a       |

### Tablas de verdad

**AND**

| a   | b   | a && b |
| --- | --- | ------ |
| f   | f   | f      |
| f   | v   | f      |
| v   | f   | f      |
| v   | v   | v      |

<br>

**OR**

| a   | b   | a \|\| b |
| --- | --- | -------- |
| f   | f   | f        |
| f   | v   | v        |
| v   | f   | v        |
| v   | v   | v        |

<br>

**NOT**

| a   | !a  |
| --- | --- |
| f   | v   |
| v   | f   |

### Operadores Relacionales

| Operador | Nombre            | Ejemplo |
| -------- | ----------------- | ------- |
| <        | Menor que         | a < b   |
| >        | Mayor que         | a > b   |
| <=       | Menor o igual que | a <= b  |
| >=       | Mayor o igual que | a > b   |

</details>

## Operadores de equidad

<details>

| Operador | Nombre      | Ejemplo |
| -------- | ----------- | ------- |
| ==       | Igualdad    | a == b  |
| !=       | Desigualdad | a != b  |

```java
public class LogicOperations {
    public static void main(String[] args) {
        int a = 8;
        int b = 5;

        //Operadores de asignación
        System.out.println("a es igual a b? -> " + (a == b));
        System.out.println("a es diferente a b? -> " + (a != b));

        //Operadores Relacionales
        System.out.println("a es mayor a b? -> " + (a > b));
        System.out.println("a es menor a b? -> " + (a < b));
        System.out.println("a es mayor o igual a b? -> " + (a >= b));
        System.out.println("a es menor o igual a b? -> " + (a <= b));

        if (a == b){
            System.out.println("a es igual a b");
        }else if((a != b) && (a > b)){
            System.out.println("a es diferente a b");
        }else if(a > b){
            System.out.println("a es mayor a b");
        }else if(a < b){
            System.out.println("a es menor a b");
        }else if(a >= b){
            System.out.println("a es mayor o igual a b");
        }else if(a <= b){
            System.out.println("a es menor o igual a b");
        }
    }
}
```

</details>

## Sentencia Switch

<details>

- Switch: similar al if para la toma de desiciones pero es más condensado y permite incluir más opciones. Evaluaremos un dato.
- Case: incluyen los distintos valores o posibilidades que puede resultar de evaluar la variable o expresión del switch.
- Default: es ejecutada si el valor de la expresión no coincide con cualquiera de los otros casos.

Nota: no admite datos de tipo Boolean, Long, Float, Double

```java

<public class SwitchStatement {
    public static void main(String[] args) {

        String colorModeSelected = "Dark";

        switch (colorModeSelected){
            case "Light":
                System.out.println("Seleccionaste Light Mode");
                break;
            case "Night"://Ambar
                System.out.println("Seleccionaste Night Mode");
                break;
            case "Blue Dark":
                System.out.println("Seleccionaste Blue Dark Mode");
                break;
            case "Dark":
                System.out.println("Seleccionaste Dark Mode");
                break;
            default:
                System.out.println("Selecciona una opcion correcta");
        }
    }
}

// Version 11 en adelante
public class Switch {
    public static void main(String[] args) {
        int day = 1;
        switch (day) {
            case 1 -> System.out.println("Monday");
            case 2 -> System.out.println("Tuesday");
            case 3 -> System.out.println("Wednesday");
            case 4 -> System.out.println("Thursday");
            case 5 -> System.out.println("Friday");
            case 6 -> System.out.println("Saturday");
            case 7 -> System.out.println("Sunday");
            default -> System.out.println("I don't know");
        }
    }
}
```

</details>

## ¿Para qué sirven las funciones?

<details>

Las **funciones** nos ayudan a ejecutar código y dependiendo de las opciones que le enviamos, puede transformar, generar y retornar un resultado.

Gracias las **funciones** podemos organizar, modularizar, reutilizar y evitar repetidos en nuestro código.

Imaginas las funciones como una caja, donde vamos a estar ingresando un dato y es probable que lo retonemos pero con distinto valor o procesado con diferentes características o incluso podamos devolver un dato totalmente diferente.

Las funciones generalmente poseen un input y un output. (una entrada y una salida).

- Organizar y modularizar el código.
- Reutilizar código.
- Evitar código repetido.

```java
// Firma de la función
public int suma(int a , int b) {
  // cuerpo de la función
  return a + b;
}

// Llamar a la función
int c = suma(5, 7);
```

- public: modificador de acceso. Profundizaremos en programación orientada a objetos
- int: especifica el tipo de valor a retornar (debe concordar con el tipo de la sentencia return). No siempre deben retornar un valor (void, no se incluye la sentencia return)
- Suma: nombre de la función
- a y b: parámetros de tipo int

</details>

## Implementa Funciones en Java

<details>

```java
public class Funciones {
    public static void main(String[] args) {
        double y = 3;
        //Area de un circulo
        //pi * r2

        circleArea(y);
        System.out.println(circleArea(y));

        //Area de una esfera
        //4*PI*r2
        sphereArea(y);
        System.out.println(sphereArea(y));

        //Volumen de una esfera
        //(4/3)*pi * r3
        sphereVolumen(y);
        System.out.println(sphereVolumen(y));

        System.out.println("Pesos a dolares: " + convertToDolar(1000, "COP"));
    }

    public static double circleArea(double r){
        return Math.PI * Math.pow(r,2);
    }

    public static double sphereArea(double r){
        return 4 * Math.PI * Math.pow(r,2);
    }

    public static double sphereVolumen(double r){
        return (4/3) * Math.PI * Math.pow(r,3);
    }

    public static double convertToDolar(double quantity, String currency){
        switch (currency){
            case "MXN":
                quantity = quantity * 0.049;
                break;
            case "COP":
                quantity = quantity * 0.00023;
                break;
        }

        return quantity;
    }
}
```

**static** nos permite el acceso a metodos, variables de clase sin necesidad de intanciar un objeto de la clase en cuestión.

</details>

## Java Docs

<details>

**Javadoc** es una utilidad de Oracle para la generación de documentación de APIs en formato HTML a partir de código fuente Java. Javadoc es el estándar de la industria para documentar clases y métodos de Java. La mayoría de los IDEs los generan automáticamente.

- Uso

Los comentarios de JAVADOC se generan desde el código fuente y, por lo tanto, hay que incluir en el mismo etiquetas especiales para poder interpretarlas en la generación.

La etiqueta que determina un comentario JAVADOC es /\*_.._/
Un comentario JAVADOC está compuesto de una definición seguida de un bloque de etiquetas relacionadas

```java
/**
* Comentario para generar Java Docs
* */

/**
* Frase corta descriptiva
* Descripción de la clase
* @author Nombre Apellido / Empresa
* @version 0.1, 2004/05/30
*/

```

</details>

## Javadoc en funciones

<details>

Los editores nos pueden brindar información sobre las funciones. En IntelliJ Idea debemos activar esta funcionalidad: Settings / Editor / General / Code Completion / Show the documentation popup

Los comentarios se pueden personalizar con etiquetas html.

```java
public class CurrencyConverter {
    public static void main(String[] args) {
        double usd = 0;

        usd = converToDolar(200, "MXN");
        System.out.println("Pesos MXN a USD: $" + usd);

        usd = converToDolar(20000, "ARS");
        System.out.println("Pesos ARS a USD: $" + usd);
    }
    /**
     * Descripción: Función que especificando su moneda convierte una cantidad de dinero a dólares.
     *
     * @param quantity Cantidad de dinero
     * @param currency Tipo de Moneda: solo acepta MXN, COP y ARS
     * @return quantity Devuelve la cantidad actualizada en USD
     * */
    public static double converToDolar(double quantity, String currency) {
        switch (currency) {
            case "MXN":
                quantity = quantity * 0.050 ;
                break;
            case "COP":
                quantity = quantity * 0.00023;
                break;
            case "ARS":
                quantity = quantity * 0.0071;
                break;
        }
        return quantity;
    }
}
```

![Tags Javadoc](/astro-doc-full-stack/images/java/Tags-javadoc.webp)

</details>

## Bucle do While

<details>

Control de flujo - Bucle: Una linea de codigo se va estar repitiendo tantas veces como nuestra condición indique.

Las llaves siempre definen el scoope en el codigo.

**While**

- Comienza con la sentencia While,
- después va la **condición** (a ser evaluada por la computadora),
- si el resultado es **true** entonces va ejecutar una serie de sentencias que van a estar definidas en el cuerpo, al finalizar el bloque se evalúa nuevamente la condición.
- En cuanto la condición no se cumple se sale del ciclo.

```java
while (condición) {
  // instrucciones
}
```

**Do While**

- Comienza con la palabra reservada do
- Luego se define el cuerpo (scope) del ciclo
- Finaliza con While y la condición que se debe cumplir para repetir el ciclo o continuar la ejecución del código.
- La condicion finaliza con ;

```java
do {
  // instrucciones
} while (condición);
```

La **diferencia** es que do while nos garantiza que el cuerpo del bucle se ejecutará al menos una vez, mistras que con while si no se cumple la condición puede que nunca ejecute el cóidigo del buble.

```java
public class DoWhileLoop {
    public static void main(String[] args) {
       int response = 0;

        do {
            System.out.println("Selecciona el número de la opción deseada: ");
            System.out.println("1. Películas");
            System.out.println("2. Series");
            System.out.println("0. Salir");

            // Capturamos el input del usuario por consola
            Scanner scanner = new Scanner(System.in);
            response = Integer.valueOf(scanner.nextLine());

            switch(response){
                case 0:
                    System.out.println("Gracias por visitarnos");
                    break;
                case 1:
                    System.out.println("Películas");
                    break;
                case 2:
                    System.out.println("Series");
                    break;
                default:
                    System.out.println("Selecciona una opción válida");
            }
        } while (response != 0);

        System.out.println("Se terminó el programa");
    }
}
```

</details>

## Operador Ternario y Bucle While

<details>

```java
public class WhileLoop {

    static boolean isTurnOnLight = false;

    public static void main(String[] args) {
      turnOnOffLight();

      byte i = 1;
      while (isTurnOnLight && i<=10){
        printSOS();
        i++;
      }
    }

    public static boolean turnOnOffLight(){
      //Operador ternario
      isTurnOnLight = (isTurnOnLight) ? false : true;
      return isTurnOnLight;
    }

    public static void printSOS(){
      System.out.println(". . . _ _ _ . . .");
    }
}
```

</details>

## Bucle For

<details>

El bucle for es útil cuando tienes una cantidad conocida de iteraciones. Por ejemplo, si quieres imprimir los números del 1 al 10, puedes usar un bucle for:

```java
for (inicializacion; condicion; incremento) {
    // instrucciones
}
// Ejemplo
for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}
```

A la estructura **While** se la suele llamar "bucle de condición", es decir, el programador no sabe cuantas veces se va a ejecutar el bucle y este simplemente continuará cuando acabe la condición impuesta en el bucle.

Por otro lado el **For** se trata de un bucle de control con el que el desarrollador repite el bucle un determinado número de veces en el que el desarrollador sabe cuantas veces se va a ejecutar.

```java
public class ForLoop {
    //Variable Global
    static boolean isTurnOnLight = false;

    public static void main(String[] args) {

        for (int i = 0; i < 10 ; i++) {

            if(turnOnOffLight()) {
                printSOS();
            }
        }
    }

    //Imprime el mensaje de SOS
    public static void printSOS(){
        System.out.println("...___... ");
    }
    //Cambia el estado
    public static boolean turnOnOffLight(){
        isTurnOnLight = !isTurnOnLight;
        return isTurnOnLight;
    }
}
```

</details>

## Break, Continue y Return

<details>

Antes de pasar a uno de nuestros temas más importantes del curso es importante que sepas todas las opciones que tienes para detener ciclos y así seguir controlando el flujo de tus programas.

### Break

En Java esta sentencia la verás en dos situaciones especificamente:

- **En un Switch**: en esta situación break hace que el flujo del switch no continúe ejecutándose a la siguiente comparación, esto con el objetivo de que solo se cumpla una sola condición:

```java
switch (colorModeSelected){
	case "Light":
                System.out.println("Seleccionaste Light Mode");
                break;
        case "Night": //Ambar
                System.out.println("Seleccionaste Night Mode");
                break;
        case "Blue Dark":
                System.out.println("Seleccionaste Blue Dark Mode");
                break;
}
```

- **Para salir de un bucle**: Como acabamos de ver un break es capaz de detener el flujo en el código, en este caso detendremos el ciclo como tal terminándolo y haciendo que saltemos a la siguiente instrucción después del ciclo.

### Continue

**Continue** en cierto modo también nos va a servir para detener un ciclo pero en lugar de terminarlo como en el caso de break, este volverá directo a la condición.

### Return

Aunque en algunos lenguajes esta sentencia sirve como un tipo goto, dónde se rompe el flujo del programa la mejor forma de usarlo en Java es en Funciones, cuando lo usamos aquí siempre viene acompañado de un valor, el cuál indica el dato que se estará devolviendo en la función.

</details>

## Arrays

<details>

Las variables que vimos hasta el momento solo nos permiten almacenar un dato. Pero, podemos generar una variable que almacene una colección de datos y manejarlos como una variable.

Los **arrays** son objetos en los que podemos guardar más de una variable. Poseen métodos que nos permiten gestionar los datos que contienen.

Si las variables son galletas, ¡los arreglos son cajas de galletas!

Los arreglos pueden ser de una dimensión (un elemento detrás de otro) o de más de una dimensión (cada elemento del arreglo es otro arreglo).

### Declaración

```java
// Declaración
TipoDato[] nombreVariable;
// o
TipoDato nombreVariable[];

// definir el tamaño del arreglo
nombreVariable = new TipoDato[capacidad];

```

</details>

## Declarando Arreglos

<details>

```java
public class Array {
    public static void main(String[] args) {
        String[] androidVersions = new String[17];
        String days[] = new String[7];

        /*
        * +------------------------------+
        * |  Country    |  City          |
        * --------------------------------
        * | México      | CDMX           |
        * | México      | Guadalajara    |
        * | Colombia    | Bogotá         |
        * | Colombia    | Medellín       |
        * +------------------------------+
        * */

        String[][] cities = new String[4][2]; // [filas][columnss] = 4*2=8 elementos
        int[][][] numbers = new int[2][2][2];
        int[][][][] numbers4 = new int[3][3][3][3];
    }
}
```

</details>

## Indices y búsqueda de elementos en Arrays

<details>

**Indice**: es la manera de indentificar una posició dl arreglo.

- El índice es una variable entera
- Comienza en 0
- La cantidad de elementos en un array será n-1

### Asignar valores

```bash
nombreVariable[indice] = valor;
```

```java
public class Arrays {
    public static void main(String[] args) {

        String[] androidVersions = new String[17];
        String days[] = new String[7];

        String[][] cities = new String[4][2];

        int[][][] numbers = new int[2][2][2];
        int[][][][] numbers4 = new int[2][2][2][2];

        androidVersions[0] = "Apple Pie";
        androidVersions[1] = "Banana Bread";
        androidVersions[2] = "Cupcake";
        androidVersions[3] = "Donut";

        System.out.println(androidVersions[0]);
        System.out.println(androidVersions[1]);
        System.out.println(androidVersions[2]);
        System.out.println(androidVersions[3]);

        System.out.println();
        System.out.println();

        cities[0][0] = "Colombia";
        cities[0][1] = "Medellín";
        cities[1][0] = "Colombia";
        cities[1][1] = "Bogotá";
        cities[2][0] = "México";
        cities[2][1] = "Guadalajara";
        cities[3][0] = "México";
        cities[3][1] = "CDMX";

        System.out.println(cities[0][0]);
        System.out.println(cities[0][1]);
        System.out.println(cities[1][0]);
        System.out.println(cities[1][1]);
        System.out.println(cities[2][0]);
        System.out.println(cities[2][1]);
        System.out.println(cities[3][0]);
        System.out.println(cities[3][1]);
    }

}
```

</details>

## Ciclos For anidados

<details>

```java
public class Arrays {
    public static void main(String[] args) {
        String[] androidVersions = new String[17];
        int days[] = new int[7];

        String[][] cities = new String[4][2];   //4 * 2 = 8

        int [][][] numbers = new int [2][2][2];
        int [][][][] numbers4 = new int [2][2][2][2];

        androidVersions[0] = "Apple Pie";
        androidVersions[1] = "Bannana Bread";
        androidVersions[2] = "Cupcake";
        androidVersions[3] = "Donut";

        for (int i = 0; i < androidVersions.length; i++) {
            System.out.println(androidVersions[i]);
        }

        for (String androidVersion : androidVersions) {
            System.out.println(androidVersion);
        }

        /*
        System.out.println(androidVersions[0]);
        System.out.println(androidVersions[1]);
        System.out.println(androidVersions[2]);
        System.out.println(androidVersions[3]);
        */
        /*
        for (int i = 0; i < days.length; i++) {
            System.out.println(days[i]);
        }
        */

        cities[0][0] = "Colombia";
        cities[0][1] = "Medellín";
        cities[1][0] = "Colombia";
        cities[1][1] = "Bogotá";
        cities[2][0] = "México";
        cities[2][1] = "Guadalajara";
        cities[3][0] = "México";
        cities[3][1] = "CDMX";

        //Bucle for i anidado
        /*for (int i = 0; i < cities.length; i++) {
            for (int j = 0; j < cities[i].length; j++) {
                System.out.println(cities[i][j]);
            }
        }*/

        //Bucle for each anidado
        for (String[] pair : cities) {
            for ( String name : pair) {
                System.out.println(name);
            }
        }

        /*
        System.out.println(cities[0][0]);
        System.out.println(cities[0][1]);
        System.out.println(cities[1][0]);
        System.out.println(cities[1][1]);
        System.out.println(cities[2][0]);
        System.out.println(cities[2][1]);
        System.out.println(cities[3][0]);
        System.out.println(cities[3][1]);
        */

        String[][][][] animals = new String[2][3][2][2];
        animals[1][0][0][1] = "Monkey";

        System.out.println();
        System.out.println();
        System.out.println(animals[1][0][0][1]);

        for (int i = 0; i <= 1 ; i++) {
            for (int j = 0; j <= 0 ; j++) {
                for (int k = 0; k <= 0 ; k++) {
                    for (int l = 0; l <= 1 ; l++) {
                        System.out.println(animals[1][0][0][1]);
                    }
                }
            }
        }
    }
}
```

</details>