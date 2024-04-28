---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Java SE Programación Orientada a Objetos
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/java/java.webp',
    alt: 'javase-background',
  }
icon:
  { src: '/astro-doc-full-stack/images/java/icon.webp', alt: 'Logo Typescript' }
description: Java SE Programación Orientada a Objetos
draft: false
category: Java
---

**Paradigma** Teoría que suministra la base y modelo para resolver problemas. La Orientación a Objetos como tal es un paradigma, ya que nos ayuda a resolver problemas para plasmarlos en código.

**Orientación a Objetos** Se compone de cuatro elementos:

- Clases
- Propiedades
- Métodos
- Objetos

Se basa en estos pilares:

- Encapsulamiento
- Abstracción
- Herencia
- Polimorfismo

La Orientación a Objetos tiene mucho que ver con **UML (Unified Modeling Lenguage)**, que se traduce como Lenguaje de Modelado Unificado. Parte de la Orientación a Objetos es que primero se observa, después se grafica y finalmente se programa, el UML es lo que nos va a ayudar a graficar, aunque tiene muchas otras funciones.

**UML**

- Clases
- Casos de uso
- Objetos
- Actividades
- Iteración
- Estados
- Implementación

## ¿Qué es un Objeto?

Un **objeto** es cualquier cosa que tenga **propiedades** y **comportamientos**. Existen dos tipos de objetos:

- Físicos: Cualquier cosa que se puede tocar. Un usuario puede ser objeto físico.

- Conceptuales: Cosas que no se pueden tocar, como ideas. Un objeto conceptual puede ser la sesión de usuario.

Las **propiedades** son clave para identificar objetos. También pueden llamarse atributos, los nombres de las propiedades siempre serán sustantivos. Por ejemplo: nombre, tamaño, forma, etc.

Los **comportamientos** serán todas las operaciones/acciones que el objeto pueda hacer. Suelen ser verbos o sustantivo y verbo. Por ejemplo: login, logout, makeReport.

## Abstracción: ¿Qué es una Clase?

Una vez se hayan identificado los objetos claves del problema se necesita algo que permita crear muchos objetos con diferentes valores en sus propiedades. Para esto existen las clases.

**Clase**

Es el modelo sobre el cual se construirá nuestro objeto. Las clases permitirán generar más objetos. Son modelos sobre los cuales construiremos Objetos. Va de la mano con la abstracción.

**Abstracción**

Analizar objetos para crear clases. Para hacer una abstracción debemos analizar ese objeto, entender cuáles son sus propiedades y comportamientos y de que forma se puede hacer algo genérico que permita hacer más objetos que tengan las mismas propiedades y comportamientos.

El primer paso para la POO es el análisis para identificar los objetos y las clases para resolver el problema. El siguiente paso es graficar, es aquí donde entra UML. Cuando ya se tiene un modelo genérico para obtener mas objetos lo siguiente es graficarlo en un diagrama UML con la siguiente estructura:

El nombre de cada clase debe ser único.

El nombre de la clase es Person, name es un atributo y walk es un comportamiento de la clase.

## Modularidad

La Modularidad en Java se divide en dos niveles, en este curso se abarca el primer nivel, el más básico. El segundo nivel es mucho más avanzado para programas más grandes y complejos.

La **Modularidad** consiste en sub-dividir un sistema en varios elementos o componentes para formar el sistema por completo. La modularidad más avanzada se podría definir como un sistema formado por más sistemas pequeños.

La Modularidad viene del diseño, que se usa en el diseño industrial, arquitectura, etc.

Este es uno de los ejemplos más claros de Modularidad:

Ya que es un sillón al que se le pueden añadir más asientos, se le pueden añadir más módulos para que se adapte a las necesidades del usuario.

La modularidad nos va a permitir:

- Reutilizar: Permite reutilizar código.
- Evitar colapsos: Si algo deja de funcionar solo deja de funcionar el modulo donde sucedió el error.
- Mantenible: Se pueden añadir o quitar módulos sin necesidad de rehacer todo el sistema
- Legibilidad: Al estar separado en módulos es mucho más fácil de entender el código.
- Resolución rápida de problemas

Las clases van a ser un elemento clave para manejar Modularidad:

**Modularidad** Divide el programa en diferentes partes o módulos/clases. Separar las clases en archivos

## Creando nuestra primera Clase

```java
// Main
public class Main {

  public static void main(String[] args) {

    // Modularizamos
    // Instaciamos un objeto de la clase doctor
    Doctor myDoctor = new Doctor();
    myDoctor.name="Diego Lipa";
    myDoctor.showName();
  }
}
```

```java
// Doctor
public class Doctor {
  // Propiedades
  int id;
  String name;
  String speciality;

  // Comportamientos
  public void showName(){
    System.out.println(name);
  }
}
```

## Método constructor

Si el método constructor no se encuentra declarado explícitamente como en el ejemplo anterior, Java nos proporciona uno. Por este motivo, funcionó la línea <pre>Doctor myDoctor = new Doctor();</pre>.

**new Doctor()** invoca al método constructor.

**El método constructor**

- Crea nuevas **instancias** de una clase.
- Tiene el **mismo nombre** que la clase que inicializa.
- Usa la palabra reservada **new** para invocarlo.
- Usa **cero o mas argumentos** contenidos dentro de los paréntisis que siguen al nombre.
- **No regresa un valor.**

```java
// Doctor
public class Doctor {
  // Propiedades
  int id;
  String name;
  String speciality;

  Doctor() {
    System.out.println("Contruyendo el objeto Doctor");
  }

  Doctor(String name) {
    System.out.println("El nombre del doctor asignado es: " + name);
  }

  // Comportamientos
  public void showName(){
    System.out.println(name);
  }
}
```

```java
// Main
public class Main {

  public static void main(String[] args) {

    // Modularizamos
    // Instaciamos un objeto de la clase doctor
    Doctor myDoctor = new Doctor("Lilia Perez");
    myDoctor.name="Diego Mara";
    myDoctor.showName();
  }
}
```

## Static: Variables y Métodos Estáticos

En el ejemplo anterior utilizamos el operador new para crear un objeto y luego acceder a su propiedad name.

Pero también vimos cómo podemos acceder al método ramdom() de la clase Math.

```java
Math.random();
Math.sqrt(25);
Math.PI();
```

Pero en ese caso no instanciamos un objeto. Dentro de la clase se encuentran definidos como **static** lo que nos permite utilizarlos sin crear un objeto.

**Miembros y métodos static**

- Se puede usar en toda la clase.
- Está definido por la palabra reservada **static**.
- Puede ser **accesado indicando el nombre de la clase**, la notación punto y el nombre del método.
- Se invoca en una clase que no posee instancias de la clase.

```java
public class Calculadora {

  public static final double PI = 3.1415926;
  public static int valor = 0;

  public static int suma (int a, int b) {
    return a + b;
  }
}

Calculadora.suma(5, 2);
Calculadora.PI;
Calculadora.valor;
```

La variable estatica puede estar declarada en la clase C. La variable no fue alterada por la clase b, sino que fue alterada por la clase a, pero refleja su valor en b. La variable estatica mantiene su ciclo en todo el programa.

Se pueden declarar con la clave import con la palabra static.

```java
// importamos todo desde Calculadora
import static com.tigui.operaciones.Calculadora.*;

public class Main {

  public static void main(String[] args) {
    // No es necesario utilizar Calculadora.suma
    System.out.println(suma(3,5));
  }
}
```

## Creando elementos estáticos

Dentro de la clase doctor, el identificador debería ser autoincremental. Para ello la debemos declarar como static. Si no es estatic no podríamos realizar el autoincremento, ya que al colocar static el valor prevalace más allá de las instancias de los objetos.

```java
// Doctor
public class Doctor {
  // Propiedades
  static int id=0; // Autoincremental
  String name;
  String speciality;

  Doctor() {
    System.out.println("Contruyendo el objeto Doctor");
    id++;
  }

  Doctor(String name) {
    System.out.println("El nombre del doctor asignado es: " + name);
  }

  // Comportamientos
  public void showName(){
    System.out.println(name);
  }

  public void showId() {
    System.out.println("Id Doctor: " + id);
  }
}
```

```java
import static ui.UIMenu.*;

public class Main {

  public static void main(String[] args) {

    Doctor myDoctor = new Doctor("Lilia Perez");
    myDoctor.name="Diego Mara";
    myDoctor.showName();
    System.out.println(Doctor.id); // 1
    myDoctor.showId(); // ID Doctor: 1

    Doctor.id ++;

    Doctor MyDoctorMau = new Doctor();
    myDoctor.showId(); // ID Doctor: 3

    showMenu();
  }
}
```

Crearemos una clase con métodos estáticos para simular el menú de la app. Para poder utilizar el menú sin tener que declarar el nombre de la clase y el método podemos crear un package.

Dentro de src, en el menú contextual, vamos a New / Package y lo llamamos ui.

Adentro del package creamos la siguiente clase :

```java
// src/ui/UIMenu
package ui;

import java.util.Scanner;

public class UIMenu {

  public static void showMenu() {
    System.out.println("Welcome to My Appointments");
    System.out.println("Selecciona la opción deseada");

    int response = 0;
    do {
        System.out.println("1. Doctor");
        System.out.println("2. Patient");
        System.out.println("0. Salir");

        Scanner sc = new Scanner(System.in);
        response = Integer.valueOf(sc.nextLine());

        switch (response){
            case 1:
              System.out.println("Doctor");
              break;
            case 2:
              response = 0;
              showPatientMenu();
              break;
            case 0:
              System.out.println("Thank you for you visit");
              break;
            default:
              System.out.println("Please select a correct answer");
            }
    } while (response != 0);
  }

  public static void showPatientMenu(){
    int response = 0;
    do {
        System.out.println("\n\n");
        System.out.println("Patient");
        System.out.println("1. Book an appointment");
        System.out.println("2. My appointments");
        System.out.println("0. Return");

        Scanner sc = new Scanner(System.in);
        response = Integer.valueOf(sc.nextLine());

        switch (response){
            case 1:
                System.out.println("::Book an appointment");
                break;
            case 2:
                System.out.println("::My appointments");
                break;
            case 0:
                showMenu();
                break;
        }
    } while (response != 0);
  }
}
```

## Final: Variables Constantes

Para declarar una constante utilizamos la palabra reservada **final**. Si la variable es global irá acompañada de static.

- static hace el scope de la variable global
- **final** la define como constante. No se puede reasignar. Final solo se utiliza en constantes.

```java
public class Calculadora {
  public static final double PI = 3.141526
}
```

```java
public class Main {

  public static void main(String[] args) {

    showMenu();

  }
}
```

```java
// src/ui/UIMenu
package ui;

import java.util.Scanner;

public class UIMenu {

  public final static String[] MONTHS = {"Enero", "Febrero", "Marzo", "Abril", "Mayo",
  "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"};

  public static void showMenu() {
    System.out.println("Welcome to My Appointments");
    System.out.println("Selecciona la opción deseada");

    int response = 0;
    do {
        System.out.println("1. Doctor");
        System.out.println("2. Patient");
        System.out.println("0. Salir");

        Scanner sc = new Scanner(System.in);
        response = Integer.valueOf(sc.nextLine());

        switch (response){
            case 1:
              System.out.println("Doctor");
              break;
            case 2:
              response = 0;
              showPatientMenu();
              break;
            case 0:
              System.out.println("Thank you for you visit");
              break;
            default:
              System.out.println("Please select a correct answer");
            }
    } while (response != 0);
  }

  public static void showPatientMenu(){
    int response = 0;
    do {
        System.out.println("\n\n");
        System.out.println("Patient");
        System.out.println("1. Book an appointment");
        System.out.println("2. My appointments");
        System.out.println("0. Return");

        Scanner sc = new Scanner(System.in);
        response = Integer.valueOf(sc.nextLine());

        switch (response){
            case 1:
                System.out.println("::Book an appointment");
                for (int i = 1; i < 4; i++>) {
                  System.out.println(i + ". " + MONTHS[i]);
                }
                break;
            case 2:
                System.out.println("::My appointments");
                break;
            case 0:
                showMenu();
                break;
        }
    } while (response != 0);
  }
}
```

## Sobrecarga de métodos y constructores

A veces necesitamos que dos o más métodos **tengan el mismo nombre pero con diferentes argumentos.** Pueden variar en cantidad, tipo o puede variar el valor de retorno del método.

```java
public class Calculadora {

  public int suma(int a, int b) {
    return a + b;
  }

  public int suma(float a, float b) {
    return a + b;
  }

  public int suma(int a, float b) {
    return a + b;
  }
}
```

### Sobrecarga de constructores

La sobrecarga de constructores se usa para **inicializar objetos.**

```java
// Doctor
public class Doctor {
  // Propiedades
  static int id=0;
  String email;
  String name;
  String speciality;

  Doctor() {
    System.out.println("Contruyendo el objeto Doctor");
  }

  Doctor(String name, String speciality) {
    id++;
    System.out.println("El nombre del doctor asignado es: " + name);
    this.name = name;
    this.speciality = speciality;
  }

  // Comportamientos
  public void showName(){
    System.out.println(name);
  }

  public void showId() {
    System.out.println("Id Doctor: " + id);
  }
}
```

```java
public class Main {

  public static void main(String[] args) {

    // showMenu();

    Doctor myDoctor = new Doctor("Mauricio Jourdan", "Cirujano" );
    System.out.println(myDoctor.name);
    System.out.println(myDoctor.speciality);

  }
}
```

## ¡Reto!

Ahora estás listo para resolver tu primer reto que en realidad es muy sencillo de hacer.

Mira el siguiente diagrama y construye la clase Patient.

**Patient**

- name: String
- email:String
- address: String
- phoneNumber: String
- birthday: String
- weight: double
- height: double
- blood: String
- Patient(name: String, email: String)

```java
public class Patient {
    // Attributes
    int id
    String name;
    String email;
    String address;
    String phoneNumber;
    String birthday;
    double weight;
    double height;
    String blood;

    // Constructor
    Patient(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
```

## Encapsulamiento: Modificadores de acceso

```java
public class Main {

  public static void main(String[] args) {

    // showMenu();

    Doctor myDoctor = new Doctor("Mauricio Jourdan", "Cirujano" );
    System.out.println(myDoctor.name);
    System.out.println(myDoctor.speciality);

    Patient patient = new Patient("Alejandra Ramos", "ale@mail.com");
    System.out.println(patient.name);

    patient.weight = 60.5;
    patient.height = 1.65;

    System.out.println(patient.weight);
  }
}
```

Hasta ahora los valores de los objetos han sido modificados accediendo directamente a la variable y cambiándola, pero no es del todo correcto, ya que se pueden cambiar propiedades de objetos con valores ya determinados.

Otra inconsistencia es que en algunos datos como la altura y el peso ya debería venir indicada la unidad de medida de cada uno.

Para solucionar esto se utiliza el **encapsulamiento**, con este definimos el nivel de acceso que se tendrá sobre una variable con ayuda de los modificadores de acceso.

<mark>Los **modificadores de acceso** que existen son: **public, protected, default y private**.</mark>

<mark>Con ellos podemos definir si una variable puede ser o no accedida desde otra clase, otro paquete del programa, una subclase u otros lugares.</mark>

El modificador de acceso que necesitamos para que los valores de los objetos no puedan ser modificados desde otra clase es private, que es el más restrictivo.

Si añadimos el private a las variables de la clase Patient automáticamente saldrá un error donde se intente acceder al valor de las variables directamente.

### Modificadores de acceso

<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th colspan="2">Mismo paquete</th>
      <th colspan="2">Otro paquete</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
      <th>Subclase</th>
      <th>Otra</th>
      <th>Subclase</th>
      <th>Otra</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>-</td>
      <td>private</td>
      <td>no</td>
      <td>no</td>
      <td>no</td>
      <td>no</td>
    </tr>
    <tr>
      <td>#</td>
      <td>protected</td>
      <td>si</td>
      <td>si</td>
      <td>si</td>
      <td>no</td>
    </tr>
    <tr>
      <td>+</td>
      <td>public</td>
      <td>si</td>
      <td>si</td>
      <td>si</td>
      <td>si</td>
    </tr>
    <tr>
      <td>~</td>
      <td>package</td>
      <td>si</td>
      <td>si</td>
      <td>no</td>
      <td>no</td>
    </tr>
  </tbody>
</table>

No se prodrán modificar los atributos desde afuera de la clase.

```java
public class Patient {
    // Attributes
    int id
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private String birthday;
    private double weight;
    private double height;
    private String blood;

    // Constructor
    Patient(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
```

## Getters y Setters

**Leer/Escribir** específicamente los valores de las varaibles miembro.

- **Getter**: a través de este método podemos acceder al valor de la variable. Podemos leer su contenido
- **Setter**: este método nos permite setear, modificar el valor de la variable.
- Nombre de los métodos: Por convenvión se utiliza set / get + el nombre de la variable.
- Validaciones: los setters son útiles para incluir validaciones sobre los datos recibidos por parámetros.
- Tranformaciones: los getters son útiles para realizar alguna transformación que requiera la lógica de negocio, por ejemplo, retornar los datos en un formato particular.

```java
public class Patient {
    // Attributes
    int id
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private String birthday;
    private double weight;
    private double height;
    private String blood;

    // Constructor
    Patient(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getWeight() {
      return this.weight + " kg.";
    }

    public void setWeight(double weight) {
      this.weight = weight;
    }

    public String getHeight() {
      return height + " Mts.";
    }

    public void setHeight(double height) {
      this.height = height;
    }

    public int getId() {
      return id;
    }

    public void setId(int id) {
      this.id = id;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public String getAddress() {
      return address;
    }

    public void setAddress(String address) {
      this.address = address;
    }

    public String getPhoneNumber() {
      return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
      if (phoneNumber.length() > 8) {
        System.out.println("El número telefónico debe ser de 8 dígitos máximo");
      } else if (phoneNumber.length() == 8) {
        this.phoneNumber = phoneNumber;
      }
    }

    public String getBirthday() {
      return birthday;
    }

    public void setBirthday(String birthday) {
      this.birthday = birthday;
    }

    public String getBlood() {
      return blood;
    }

    public void setBlood(String blood) {
      this.blood = blood;
    }
}
```

```java
public class Main {

  public static void main(String[] args) {

    // showMenu();

    Doctor myDoctor = new Doctor("Mauricio Jourdan", "Cirujano" );
    System.out.println(myDoctor.name);
    System.out.println(myDoctor.speciality);

    Patient patient = new Patient("Alejandra Ramos", "ale@mail.com");
    System.out.println(patient.name);

    patient.setWeight(60.5);
    patient.setHeight(1.65);
    patient.setPhoneNumber("12345678");

    System.out.println(patient.weight);
  }
}
```

## Variable vs. Objeto

Las **Variables** son entidades elementales muy sencillas, pueden ser números, caracteres, booleanos, entre otras. Los **Objetos** son entidades complejas que pueden estar formadas por la agrupación de diferentes variables y métodos.

Los **Objetos Primitivos** o **Clases Wrapper** son variables primitivas que trabajan con algún tipo de dato y también tienen las características de los objetos.

Por ejemplo: Byte, Short, Integer, Long, Float, Double, Character, Boolean o String.

### Variables != Objetos

Las **variables** son entidades elementales (**muy sencillas**)

- Un número
- Un caracter
- Un valor verdadero o falso

Los **objetos** son entidades **complejas** que pueden estar formadas por la **agrupación de muchas variables y métodos**.

<mark>¡Los Arrays son Objetos!</mark>

### Strings

Si buscamos el equivalente de los Strings en tipo de datos primitivos, sería un array de chars (poseen solo un caracter).

```java
// name es un objeto
String name = "Mauricio";
```

### Clases Wrapper / Objeto primitivo

Las **Clases Wrapper** son equivalentes a algunos datos primitivos. Proveen mecanismos para envolver datos primitivos en un objeto, de esta manera los datos primitivos pueden tener comportamientos que son reservados solo para objetos y también proveen de funciones para realizar conversiones.

| Primitive Data Types | Wrapper Classes |
| -------------------- | --------------- |
| int                  | Integer         |
| short                | Short           |
| long                 | Long            |
| byte                 | Byte            |
| float                | Float           |
| double               | Double          |
| char                 | Char            |
| boolean              | Boolean         |

En lugar de declarar una variable como **int** podemos declararla como **Integer**, y de esta forma, disponer de métodos asociados a los objetos.

Una necesidad particular de utilizar los wrappers surge de los collections, que son tipos de datos diferentes a los arreglos.

- Los arreglos pueden almacenar tipos de datos primitivos y objetos.
- Las colecciones solo pueden almacenar colecciones de objetos.

Si necesitamos menejar una colección de datos de tipo entero, debemos convertir los datos de int a integer.

Además también tendremos disponibles otras operaciones como parsear datos (castings especiales), transformaciones de strings a enteros, etc.

También existen diferencias con respecto al almecenamiento en memoria.

La **clase String NO es wrapper**.

Las clases wrapper son clases utilitarias que "envuelven" a los primitivos, esto para darles funcionalidad de objeto por así decirlo.

Lo clase String no envuelve a ningún primitivo. Son colecciones INMUTABLES de caracteres. Se suele confundir con wrapper por que para crear instancias no se requiere usar la palabra reservada new, pero esto es por comodidad. No por que sea wrapper.

## Variable vs. Objeto: Un vistazo a la memoria

**Un objeto es una referencia a un espacio en memoria**. Cuando creamos objetos, Java los guarda en la memoria y nos devuelve coordenadas con las que podremos acceder a la información que almacenamos.

Existen dos tipos de memoria: **Stack** y **Heap**.

La memoria **Stack** es mucho más rápida y nos permite almacenar nuestra información de forma “ordenada”. Aquí se guardan las variables y sus valores de tipos de datos primitivos (booleanos, números, strings, entre otros).

Los objetos también usan la memoria Stack, pero no para guardar su información, sino para guardar las coordenadas a la verdadera ubicación del objeto en la memoria **Heap**, una memoria que nos permite guardar grandes cantidades de información, pero con un poco menos de velocidad.

```java

int i = 0;
Doctor myDoctor = new Doctor();
Doctor myDoctor2 = new Doctor();
```

![Java Memoria](/astro-doc-full-stack/images/java/java-memoria.webp)

Los tipos de datos primitivos almacenan su valor directamente en el stack.

En el caso de objetos, en el heap no almacenamos el contenido del objeto sino que almacenamos la dirección de memoria del lugar en el heap donde realmente se almacenan los datos del objeto.

El stack posee una estructura de pila, miestras que la del heap es de tipo árbol. En el heap los datos pueden crecer o decrecer, por ello es que es más lenta que la memoria stack.

Este también es el motivo por el que en **ocasiones cometemos errores al copiar objetos**. Supngamos que tenemos dos objetos Doctor. Si realizamos <pre>doctorB = doctorA</pre>, lo que hamos en realidad, es asignar a doctorB la misma dirección de memoria que doctorA, ahora los dos apuntan al mismo objeto del heap.

Por ello si cambiamos el valor de una propiedad en doctorA, también (indirectamente) modificará al doctorB.

<mark>Al momento de copiar un objeto debemos tener presente si solo queremos realizar una copia de la dirección donde se almacena o si realmente deseamos crear otro objeto (nuevo) con las mismas características que el objeto a copiar.</mark>

**Ejemplo**

```java
public class Main {

  public static void main(String[] args) {

    Patient patient = new Patient("Alejandra Ramos", "ale@mail.com");
    Patient patient2 = new Patient("Roxana Ramos", "roxy@mail.com");

    System.out.println(patient.getName());  // Alejandra Ramos
    System.out.println(patient2.getName()); // Roxana Ramos

    patient2 = patient;

    // ahora los dos objetos apuntan a la misma dirección de memoria heap
    System.out.println(patient.getName());  // Alejandra Ramos
    System.out.println(patient2.getName()); // Alejandra Ramos

    // Al modificar los valores en el heap de patient2 indirectamente
    // modificamos el valor de patient, porque también toma su contenido
    // de la misma dirección en memoria.
    patient2.setName("Maria Ramos");
    System.out.println(patient.getName());  // Maria Ramos
    System.out.println(patient2.getName()); // Maria Ramos
  }
}
```

## Clases Anidadas

Una clase puede "vivir" dentro de otra clase. La razón de ser de la clase interior depende totalmente de la clase exterior.

```java
class ClaseExterior {
  ...
  class ClaseAnidada {
    ...
  }
}
```

### Tipos de clases anidadas

![Tipos de Clases Anidadas ](/astro-doc-full-stack/images/java/java-clases-anidadas.webp)

Comencemos por las clases de tipo **estáticas anidadas** que son las más simples.

```java
class ClaseExterior {
  ...
  static class ClaseStaticaAnidada {
    ...
  }

  class ClaseInterna {
    ...
  }
}
```

- Deben tener la palabra clave **static**.
- No se necesita crear una instancia para llamarlas.
- **Solo se puede llamar a los métodos estáticos**.
- Las clases estáticas pueden llamar a cualquier tipo de elemento o método.
- Usualmente se utilizan como clases Helper, se agrupan por su lógica, también utilizan el criterio de encapsulación (niveles de acceso).

```java
public class Enclosing {
  private static int x = 1;

  public static class StaticNested {
    private void run() {
      // implementación
    }
  }
}

public class Main {
  public static void main(String[] args) {
    Enclosing.StaticNested nested = new Enclosing.StaticNested();
    nested.run();
  }
}
```

### Ejemplo sobre la demo

Si deseamos incorporar la disponibilidad de un doctor para recibir turnos, tendríamos que agregar algunas propiedades como fecha y hora. Pero estos datos se encuentran relacionados entre sí, entonces podemos colocar un id de turno disponible. Y por otro lado, deberíamos tener otra propiedad, un array con los turnos disponibles.

Esta solución ya no es escalable, comienza a complicarse su mantenimiento.

La mejor forma de resolver esta situación es crear una nueva clase "AvailableAppointment" que posea los atributos id, date y time. Pero esta clase se encuentra fuertemente visculada al doctor, es el único que podrá definir sus turnos libres. Por ello, crearemos una clase interna.

```java
// Doctor
import java.util.Date;

public class Doctor {
  // Propiedades
  static int id=0;
  private String email;
  private String name;
  private String speciality;

  Doctor() {
    System.out.println("Contruyendo el objeto Doctor");
  }

  Doctor(String name, String speciality) {
    id++;
    System.out.println("El nombre del doctor asignado es: " + name);
    this.name = name;
    this.speciality = speciality;
  }

  // Comportamientos
  public void showName(){
    System.out.println(name);
  }

  public void showId() {
    System.out.println("Id Doctor: " + id);
  }

  // Tenemos una coleccion de AvailableAppointment
  ArrayList<AvailableAppointment> availableAppointments = new ArrayList<>();

  // Crear un turno disponible
  public void addAvailableAppointment(Date date, String time) {
    availableAppointments.add(new Doctor.AvailableAppointment(date, time));
  }

  // Ver los turnos disponibles
  public ArrayList<AvailableAppointment> getAvailableAppointments () {
    return availableAppointments;
  }

  public static class AvailableAppointment{

    private int id;
    private Date date;
    private String time;

    public AvailableAppointment(Date date, String time) {
      this.date = date;
      this.time = time;
    }

    public void int getId() {
      return id;
    }

    public void setId(int id) {
      this.id = id;
    }

    public void int getDate() {
      return date;
    }

    public void setDate(Date date) {
      this.date = date;
    }

    public void int getTime() {
      return time;
    }

    public void setTime(String time) {
      this.time = time;
    }
  }
}
```

```java
import java.util.Date;

public class Main {

  public static void main(String[] args) {

    // ShowMenu();

    Doctor myDoctor = new Doctor("Mauricio Jourdan", "Cirujano");
    myDoctor.addAvailableAppointment(new Date(), "4pm");
    myDoctor.addAvailableAppointment(new Date(), "10am");
    myDoctor.addAvailableAppointment(new Date(), "1pm");

    for (Doctor.AvailableAppointment aA: myDoctor.getAvailableAppointments()) {
      System.out.println(aA.getDate() + " " + aA.getTime());
    }

    Patient patient = new Patient("Alejandra Ramos", "ale@mail.com");
    Patient patient2 = new Patient("Roxana Ramos", "roxy@mail.com");

    System.out.println(patient.getName());  // Alejandra Ramos
    System.out.println(patient2.getName()); // Roxana Ramos

    patient2 = patient;

    // ahora los dos objetos apuntan a la misma dirección de memoria heap
    System.out.println(patient.getName());  // Alejandra Ramos
    System.out.println(patient2.getName()); // Alejandra Ramos

    // Al modificar los valores en el heap de patient2 indirectamente
    // modificamos el valor de patient, porque también toma su contenido
    // de la misma dirección en memoria.
    patient2.setName("Maria Ramos");
    System.out.println(patient.getName());  // Maria Ramos
    System.out.println(patient2.getName()); // Maria Ramos
  }
}
```

Marterial Complentario: https://www.youtube.com/watch?v=zCygavxhnZE

## Clases Internas y Locales a un método

**Clases Internas**

- También llamadas Clases anidadas no estáticas. Al no ser una Clase estática, es necesario instanciarla. Ejemplo:

```java
// Declaración de la Clase Interna
public class Outer {
    public class Inner {

    }
}
```

```java
public class Main {
    public static void main(String[] args) {
      Outer outer = new Outer();
      Outer.Inner inner = outer.new Inner();
    }
}
```

Para declarar este tipo de Clases hay que instanciar 2 objetos, lo que consume más espacio en memoria, por lo tanto, hay que tener cuidado al usar este tipo de Clases, de hecho este tipo de Clases no son muy comunes.

**Clases Locales a un Método**

- Este tipo de Clases tienen un scope definido para el método al que pertenecen, en el ejemplo de abajo ese método sería el primer void run().

- Si se quiere tener acceso al método run de la Clase Local, hay que crear una instancia de dicha Clase.

- Ejemplo

```java
public class Enclosing {
    void run() {
        class Local {
            void run() {
                ...
            }
        }
        Local local = new Local();
        local.run();
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
    	Enclosing enclosing = new Enclosing();
        enclosing.run();
    }
}
```

Este tipo de Clases también consumen más espacio en memoria. Lo recomendable en estos casos es usar Clases estáticas anidadas para hacer un mejor uso de la memoria.

## Enumerations

Los **enumerations** son tipos de datos muy especiales porque es el único en su tipo que sirve para declarar una **colección de constantes**, al ser así estaremos obligados a escribirlos con mayúsculas.

<mark>Usaremos enum cada vez que necesitemos representar un conjunto fijo de constantes. Por ejemplo los días de la semana.</mark>

Así podemos declarar un enumeration usando la palabra reservada enum.

```java
public enum Day {
	SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
	THURSDAY, FRIDAY, SATURDAY
}
```

Pudemos crear referencias de enumerations de la siguiente forma:

```java
Day day;
switch (day) {
	case MONDAY:
		System.out.println(“Mondays are good.”);
		break;
	case FRIDAY:
		System.out.println(“Fridays are nice”);
		break;
	case SATURDAY: case: SUNDAY:
		System.out.println(“Weekends are the best”);
		break;
	default:
		System.out.println(“Midweek are so-so”);
		break;
}
```

Y podemos llamar un valor del enumeration así:

```java
Day.MONDAY;
Day.FRIDAY;
Day.SATURDAY
```

Los enumerations pueden tener atributos, métodos y constructores, como se muestra:

```java
public enum Day {
  MONDAY("Lunes");
  TUESDAY("Jueves");
  FRIDAY("Viernes");
  SATURDAY("Sábado");
  SUNDAY("Domingo");

  private String spanish;

  private Day(String s) {
    spanish = s;
  }

  private String getSpanish() {
    return spanish;
  }
}
```

Y para utilizarlo lo podemos hacer así:

```java
System.out.println(Day.MONDAY); // MONDAY
System.out.println(Day.MONDAY.getSpanish()); // Lunes
```

**Material Complementario**:

- https://www.youtube.com/watch?v=HMOcwq5yXfs
- https://www.youtube.com/watch?v=F8HSRnFGhYM

## ¿Qué es la Herencia? Don't repeat Yourself

En Programación Orientada a Objetos, **el principio DRY ( Don't Repeat Yourself - No te repitas)**, también conocido como "Una vez y solo una", es una filosofía que consiste en la definición de procesos promoviendo la reducción de la duplicación de código en programación.

Por tanto, todo elemento de información nunca debe duplicarse, porque incrementa la dificultad en los cambios y evolución posterior, perjudicando la claridad en el entendimiento de nuestro código, generando posibles inconsistencias.

<mark>La **herencia** es un mecanismo de programación que permite crear una nueva clase a partir de otra existente, compartiendo atributos y métodos</mark>. La clase que hereda se conoce como subclase o clase hija, mientras que la clase de la que se hereda se conoce como superclase o clase padre. La herencia permite la reutilización de código y la organización jerárquica de clases en un programa.

**DRY (Don't Repeat Yourself)** es un principio de diseño que busca evitar la duplicación de código en un programa. La herencia es una forma de cumplir con este principio, ya que permite compartir atributos y métodos entre clases, evitando tener que escribir el mismo código en múltiples clases.

- Promueve la reducción de duplicación en programación
- Las piezas nunca deben duplicarse
- Incrementa la dificultad en los cambios y evolución

## Super y This

En la demo podemos ver que entre la clase Doctor y Patient se **repiten** los atributos name, email, address y phoneNumber. Estos atributos son los que tendrá las **Superclase Usuario** y que luego heredará a la las otras Subclases.

<mark>Para hacer que una clase herede de otra se le agrega la palabra **extends** y el nombre de la clase de la que va a heredar</mark>, en este caso: Patient extends User.

Como la clase padre requiere el nombre y el email en el constructor, tenemos que darle estos parámetros desde la clase hijo, esto se lo mandamos mediante el método **super()** dentro del constructor de la clase hijo

**Super**: Indica que una variable o un método es de la clase Padre (superclase).

**This**: Permite especificar que la variable que está señalando (this.nombreVariable) es de la misma clase en la que se usa.

Una vez implementada la herencia se tienen que eliminar todos los getters y setters de los atributos que se tenían en la clase y que pasaron a la superclase, en la super clase estarán los getters, setters y validaciones de cada atributo.

```java
// User.java
public class User {
    private int id;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        if (phoneNumber.length() > 8){
            System.out.println("El número telefónico debe ser de 8 dígitos máximo");
        }else if(phoneNumber.length() == 8){
            this.phoneNumber = phoneNumber;
        }
    }
}
```

```java
// Doctor.java
import java.util.ArrayList;
import java.util.Date;

public class Doctor extends User {
    //Atributo
    private String speciality;

    Doctor(String name, String email){
        super(name,email);
        System.out.println("El nombre del Doctor asignado es: " + name);
        this.speciality = speciality;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }


    ArrayList<AvailableAppointment> availableAppointments = new ArrayList<>();
    public void addAvailableAppointment(Date date, String time){
        availableAppointments.add(new Doctor.AvailableAppointment(date,time));
    }

    public ArrayList<AvailableAppointment> getAvailableAppointments(){
        return availableAppointments;
    }

    public static class AvailableAppointment{
        private int id;
        private Date date;
        private String time;

        public AvailableAppointment(Date date, String time) {
            this.date = date;
            this.time = time;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public Date getDate() {
            return date;
        }

        public void setDate(Date date) {
            this.date = date;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }
    }
}
```

```java
// Patient.java
public class Patient extends User {
    //Atributos
    private String birthday;
    private double weight;
    private double height;
    private String blood;

    Patient(String name, String email){
        super(name,email);
    }

    // 54.5
    public void setWeight(double weight) {
        this.weight = weight;
    }

    // 54.5 Kg. String
    public String getWeight(){
        return this.weight + " Kg.";
    }


    public String getHeight() {
        return height + " Mts.";
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getBlood() {
        return blood;
    }

    public void setBlood(String blood) {
        this.blood = blood;
    }
}
```

```java
// Main.java
import java.util.Date;

import static ui.UIMenu.*;

public class Main {
    public static void main(String[] args) {

        //showMenu();

        Doctor myDoctor = new Doctor("Anahí Salgado", "Pediatria");
        myDoctor.addAvailableAppointment(new Date(), "4pm");
        myDoctor.addAvailableAppointment(new Date(), "10am");
        myDoctor.addAvailableAppointment(new Date(), "1pm");

        for (Doctor.AvailableAppointment aA: myDoctor.getAvailableAppointments()) {
            System.out.println(aA.getDate() + " " + aA.getTime());
        }

        System.out.println();
        System.out.println();
        Patient patient = new Patient("Alejandra", "alejandra@mail.com");
        Patient patient2 = new Patient("Anahi", "anahi@mail.com");

        System.out.println(patient.getName());
        System.out.println(patient2.getName());
        patient2 = patient;

        System.out.println(patient.getName());
        System.out.println(patient2.getName());

        patient2.setName("Manuel");
        System.out.println(patient.getName());
        System.out.println(patient2.getName());
    }
}
```

## Polimorfismo: Sobreescritura de Métodos

En Java, **todas las clases que creemos heredan de la clase Object**. De esta clase es de donde vienen los métodos que tienen las clases que no fueron creados por nosotros, como equals, hashCode, toString, etc.

En **Java no se permite la herencia múltiple**, es decir, una clase solo puede heredar de una sola clase.

<mark>El **Polimorfismo** es una característica de la programación orientada a objetos que consiste en sobrescribir algunos métodos de la clase de la cual heredan nuestras subclases para asignar comportamientos diferentes.</mark>

Además de los métodos de las superclases, también podemos redefinir el comportamiento de los métodos que “heredan” todos nuestros objetos, así como .toString, hashCode, finalize, notify, entre otros.

### Sobrescritura

Cuando una clase hereda de otra y en esta clase hija se redefine un método con una implementación distinta a la del padre.

**Los métodos marcados como final o static no se pueden sobrescribir.**

### Sobrescritura de constructores

Un constructor en una subclase usando los miembros heredados de la superclase con argumentos diferentes.

### Ejemplo sobreescritura del método toString

Si en alguna clase declaramos el método toString vemos que por encima aparece **@Override**, esto quiere decir que el método que estamos usando pertenece a la clase padre. En este caso toString pertenece a la clase Object, que es la clase padre de todas las clases que creemos.

La función del método toString es imprimir todos los atributos con sus valores del objeto desde el que se aplique. El comportamiento de este puede ser cambiado según se requiera.

```java
// User.java
@Override
public string toString() {
  return "User: " + name + ", Email: " + email +
    "\nAddress: " + address + ". Phone: " + phoneNumber;
}
```

```java
// Patient.java
@Override
public string toString() {
  return super.toString() + "\nAge: " + birthday + "\nWeight: " + getWeight() +
    "\nHeight: " + getHeight() + "\nBlood: " + blood;
}
```

## Polimorfismo: Sobreescribiendo el método toString

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
