---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: IAM - Roles y Seguridad
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
description: IAM - Roles y Seguridad
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

## Introducción IAM: usuarios, grupos y políticas

<mark>**IAM** es un servicio global de AWS que nos permite administrar, controlar y otorgar permisos a todos nuestros usuarios y grupos dentro de la plataforma de AWS.</mark>

Toda cuenta, requiere un administrador, quien es aquel que posee los privilegios máximos. En AWS, es conocido como Root Account y, si tan solo poseemos un usuario en nuestra cuenta, será este por defecto.

Así mismo, toda organización requiere diferentes tipos de usuarios para desempeñar distintos roles y tener acceso a determinada información según su departamento o funciones. Para una mejor administración, podemos agrupar ciertos usuarios con requerimientos y limitaciones semejantes.

Esto último se hace mediante la **configuración de las políticas** (en formato JSON o YAML) de un **grupo** o **usuarios específicos**.

Finalmente, es importante **tener en cuenta el principio de los privilegios mínimos**, de esta forma disminuimos el riesgo de que usuarios no autorizados realicen tareas para las que originalmente no tenían permiso de la empresa.

**IAM** es un servicio para la gestión de acceso de identidad. Los conceptos básicos:

- **Root account**: Es la cuenta que se crea de manea predeterminada.

- **Usuarios**: Son personas que tienen acceso a servicios de la organización, se pueden agrupar y no tienen que pertenecer solo a un grupo.

- **Grupos**: Solo contienen usuarios y no otros grupos.

- **Políticas**: A los usuarios o grupos de les puede asignar políticas como documentos JSON. Estas políticas definen los permisos de los usuarios o grupos para cualquiera de los servicios dentro de AWS y para definirlas de aplica el principio de privilegios mínimos, es decir, no otorgar más privilegios de los que un usuario necesita.


## Práctica IAM Usuarios y Grupos

**Que es AWS IAM:**

- **Identity and Access Managment**, Servicio web para controlar de manera segura el acceso a servicios de AWS, puede administrar de forma centralizada a los usuarios, las credenciales de seguridad y los permisos que controlan a qué recursos y aplicaciones de AWS pueden obtener acceso.
- **Usuarios**: Es una entidad que se crea en AWS para representar a la persona o a la aplicación que se utiliza para interactuar con AWS.
- **Permiso**: Es la acción que se le otorga a una Persona, Rol o Grupo para que pueda realizar cierta acción específica sobre un recurso en AWS.
- **Rol**: Una identidad de IAM que se puede crear en una cuenta y que tiene permisos específicos. Un rol de IAM tiene algunas similitudes con un usuario de IAM. Los roles y los usuarios son identidades de AWS con políticas de permisos que determinan lo que la identidad puede y no puede hacer en AWS.
- **Grupos**: Es la forma simple de administrar a un conjunto de usuarios. Los grupos permiten especificar permisos para varios usuarios, lo que puede facilitar la administración de permisos.
- **Políticas**: Es un objeto de AWS que, cuando se asocia a una identidad o un recurso, define sus permisos. AWS evalúa estas políticas cuando una entidad principal de IAM (usuario o rol) realiza una solicitud. Los permisos en las políticas determinan si la solicitud se permite o se deniega.
- **ACL**: Access Control List, se utiliza para controlar qué entidades principales de otras cuentas pueden tener acceso al recurso al que la ACL está asociada. Las ACL son similares a las políticas basadas en recursos, aunque son el único tipo de política que no utiliza la estructura de los documentos de política JSON. Las ACL son políticas de permisos para varias cuentas que conceden permisos a la entidad principal especificada. Las ACL no pueden conceder permisos a entidades dentro de una misma cuenta.

**Paso 1**: Create user
Una buena práctica es crear un usuario administrador. Para ello, dentro de la consola vamos a crear usuario, le asignamos un nombre, le asignamos los permisos de **Access key** como de **Password**. 

Podemos dejar que AWS cree un password autogenerado o generar un password para ek usuario. También podemos obligar al usuario a cambiar el password al iniciar sesión.

**Paso 2**: Set Permissions

Aquí vamos a crear el primer grupo de administrador. Como nombre del grupo colocamos Administrators y le adjuntamos una política de seguridad, que existe dentro de AWS, llamada AdministratosAccess, la seleccionamos y creamos el grupo.

Hasta el momento, creamos un user, creamos un grupo y asignamos una política al grupo para que tengan acceso a todos los servicios de AWS.

**Paso 3**: Add Tags

Los Tags se utilizan para identificar rápidamente a dónde pertenecen los recursos que creamos en AWS. En este caso vamos a ingresar la Key "Department" con value "Engineering". Esto significa que el usuario que estamos creando pertence al departamento de Ingeniería. 

**Paso 4**: Review

Verificamos los datos y creamos el usuario.

**Paso 5**: Add User

Finalmente AWS nos permite enviar las instrucciones de login a un email. También podemos descargar las llaves, le damos a download .csv, Allow, y guardamos el access key y el secret key.

A medida que creamos el usuario, creamos recursos (como el grupo). Podremos acceder a los recursos creados en el sidebar. 

> <mark>**Nota**: Ingresando al menu Dashboard del sidebar, dentro de la sección AWS Account nos mostrarán un link para que le otorguemos a los usuarios y puedan acceder a los servicios de AWS</mark>. También podemos crear un alias para la cuenta. Podemos asignar un alias como "nombre-proyecto-v1". De esta manera modificamos el link para que sea más representativo.

Ahora podemos iniciar sesión con el nuevo usuario utilizando otro navegador o una pantalla de incógnito. 

Pegamos la url generada como alias anteriormente, y realizamos el login con las credenciales definidas.

Si nos dirigimos al perfil y billing vemos que no podemos acceder. Esto se debe a que el usuario root no le asignó todos los permisos.

## Politicas IAM

Son documentos en JSON que van a poder ser utilizados junto con los usuarios y los grupos.

**Herencia de Politicas de IAM** Los accesos de un grupo se heredan a los usuarios miembros del grupo.

Dado que los grupos contienen múltiples usuarios, AWS recomienda como buena práctica para la administración de permisos, que, si bien los usuarios también pueden obtener permisos sin pertenecer a grupos; siempre se otorguen estos privilegios a los grupos y que sea a través de la herencia que los usuarios obtengan determinados privilegios.

Es importante resaltar que un usuario puede pertenecer a múltiples grupos al tiempo siempre y cuando sus políticas sean compatibles. De lo contrario puede generar errores no deseados o interferencias.

**Estructura de las politicas** 

```json
{ 
  "Id": "Policy1658452573375", 
  "Version": "2012-10-17", 
  "Statement": [ 
    { 
      "Sid": "Stmt1658452566728", 
      "Action": [ "s3:GetObject", "s3:PutObject" ], 
      "Effect": "Allow", 
      "Resource": "arn:aws:s3:::my-bucket/*", 
      "Condition": { "AquiVaLaCondicion": { "EstoIgualA": "Esto" } }, 
      "Principal": { "AWS": "arn:aws:iam::123456789012:root" },
    } 
  ] 
}
```
En el ejemplo asignamos permisos al root para que pueda ver o poner objectos en S3. Dentro de las condiciones podemos agregar caracteríticas puntuales como el 2FA, si el user no lo configuró, no podrá acceder al recurso.

**Links útiles**:

Generador de políticas: https://awspolicygen.s3.amazonaws.com/policygen.html
Simulador: https://policysim.aws.amazon.com/home/index.jsp

## Prácticas politicas IAM

> Los grupos, roles y políticas no se cobran dentro de IAM. Podemos experimentar.

**Creación de política de seguridad desde AWS**.

- Dentro de la consola acceder al usuario
- Posteriormente acceder a permisos
- Presionar en "Add Inline Policy"
- Seleccionar el servicio que usaremos, en este caso IAM
- Seleccionar las acciones que queremos que tenga el usuario
- Seleccionar todos los resources o los requeridos
- Se le da un nombre y se crea la política

La recomendación es no crear políticas basadas en los usuarios sino por el contrario asignar políticas a grupos y agregar los usuarios a los grupos, por temas de facilidad en el control de los servicios cuando la cantidad de usuarios es significativa

Podemos adjuntar un usuario a varios grupos

**Prácticas recomendadas para la administración de cuentas en IAM**:

1- Principio de mínimo privilegio: Otorga solo los permisos necesarios para realizar una tarea específica. No des permisos administrativos completos a menos que sea absolutamente necesario.

2- Usa grupos o roles de IAM: En lugar de asignar permisos a usuarios individuales, asigna permisos a grupos o roles de IAM y luego agrega usuarios a esos grupos o roles.

3- No uses las credenciales de la cuenta raíz para el trabajo del día a día: Las credenciales de la cuenta raíz tienen acceso completo a todos los recursos en la cuenta y no se pueden revocar ni limitar. Es mejor usarlas lo menos posible y, en su lugar, usar usuarios de IAM.

4- Habilita la autenticación de dos factores (MFA): Esto agrega una capa adicional de seguridad a tus cuentas de usuario.

5- Rota regularmente las claves de seguridad: Al igual que las contraseñas, las claves de seguridad (como las claves de acceso de AWS) deben cambiarse regularmente.

6- Usa políticas de contraseñas para asegurar que los usuarios sigan las prácticas recomendadas de contraseñas: Esto incluye el uso de contraseñas complejas, el cambio de contraseñas regularmente y el no reutilizar contraseñas antiguas.

7- Revisa regularmente los permisos de IAM: Verifica regularmente quién tiene acceso a qué para asegurarte de que solo las personas correctas tienen acceso a los recursos apropiados.

8- Usa roles de IAM para aplicaciones y servicios que necesiten acceso a AWS: Esto incluye servicios de AWS como EC2 y Lambda, así como aplicaciones en tus servidores que necesiten acceso a recursos de AWS.

9- Registra y monitorea la actividad en tu cuenta: Utiliza AWS CloudTrail para registrar, auditar y monitorear la actividad en tu cuenta.

## Visión general IAM MFA

**Políticas de Contraseñas**

- Contraseñas seguras
- Longitud mínima de contraseña
- Tipos de caracteres especiales
- Los usuarios cambien sus propias contraseñas
- Caducidad de la contraseña
- Evitar reutilización de contraseñas

**Autenticador multifactor o MFA**

- Ayuda a proteger las cuentas y los usuarios

Cómo funciona? Es la suma de la contraseña conocida por el usuarios que además puede tener algunas de las políticas mencionadas anteriormente para mejorar la seguridad, pero, adicionalmente agrega un dispositivo de seguridad que es el que me permitirá acceder finalmente a la cuenta, luego de que la contraseña haya sido correcta

Beneficio Si la contraseña es robada o pirateada la cuenta NO se verá comprometida

**Dispositivos para MFA Virtuales**

- Google Authenticator
- Authy (tokens guardados en diferentes dispositivos (aplicación))

**Dispositivos**

- YubiKey (puede almacenar usuarios Root, IAM)
- Gemalto: dispositivo de llavero de hardware
- SurePassID: llavero inteligente para acceder a la nube

## Configuración IAM MFA

## AWS Access Keys, CLI y SDK

**AWS Management Console**

La Consola de administración de AWS es una aplicación web que comprende y hace referencia a una amplia colección de consolas de servicio para administrar los recursos de AWS.

**AWS Access Keys**

Las claves de acceso son las credenciales a largo plazo para un usuario de IAM o usuario raíz Cuenta de AWS. Puede utilizar las claves de acceso para firmar solicitudes mediante programación a la AWS CLI o a la API de AWS (directamente o mediante el SDK de AWS). Para obtener más información, consulte Firma de la solicitud de la API de AWS en la Referencia general de Amazon Web Services

- Access Key ID
- Secret Key ID
- NO compartir tus llaves de acceso

**AWS Command Line Interface (CLI)**

- La AWS Command Line Interface (AWS CLI) es una herramienta de código abierto que le permite interactuar con los servicios de AWS mediante el uso de comandos en el shell de la línea de comandos
- Herramienta que le permite interactuar con los servicios de AWS mediante los comandos en su shell de linea de comandos
- Acceso directo a las API publicas de los servicios de AWS
- Puede desarrollar scripts para administrar sus recursos
- Es de codigo abierto

**AWS Software Development Kits (SDK)**

AWS SDK for JavaScript proporciona una API de JavaScript para los servicios de AWS. Puede usar la API de JavaScript para crear bibliotecas o aplicaciones para Node.js o el navegador.

Podemos usar los lenguajes mas demandados para los servicios de AWS

**¿Qué son las Access Keys?**

Las Access Keys son credenciales de seguridad que se utilizan para firmar las solicitudes que haces a la API de AWS. Constan de dos partes:

- Access Key ID: Es un identificador público.
- Secret Access Key: Es un secreto asociado que solo debe ser conocido por ti y AWS.

**Creación de Access Keys**

- Acceder a IAM:
- Inicia sesión en la consola de administración de AWS.
- Navega a IAM.
- AWS CLI (Command Line Interface)

**¿Qué es la AWS CLI?**

La AWS CLI es una herramienta que permite interactuar con los servicios de AWS desde la línea de comandos. Es útil para la automatización de tareas y la gestión de recursos.

**Instalación de AWS CLI**

- Descargar el instalador:
- Visita la página de descarga de AWS CLI y descarga el instalador adecuado para tu sistema operativo.

**AWS SDK (Software Development Kit)**

¿Qué es el AWS SDK? El AWS SDK permite integrar y utilizar los servicios de AWS en tus aplicaciones mediante varios lenguajes de programación como Python, Java, JavaScript, y más. Los SDKs facilitan el acceso a los servicios de AWS proporcionando bibliotecas, ejemplos de código y documentación.

## Setup AWS CLI en Mac

## Setup AWS CLI en Windows

## Setup AWS CLI en Linux

```bash
$ sudo apt install awscli
```

Si quieren jugar un poco con AWS CLI , aquí van algunos comandos: Listar usuarios y grupos

```bash
# Version de AWS
aws --version

# Listar usuarios y grupos
aws iam list-users aws iam list-groups .

# Listar políticas asignadas a un grupo
aws iam list-attached-policies --group-name nombreGrupo .
```

Pueden hacer muchísimas cosas con AWS CLI, esto es simplemente un par de ejemplos como para empezar a entenderse con la terminal de comandos. Si les interesa, recomiendo buscar alguna cheat-sheet de AWS CLI donde encontrarán un montón de comandos útiles para administrar todos los servicios de Amazon desde la terminal.

```bash
$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" 
unzip awscliv2.zip 
sudo ./aws/install
```

## Configuración AWS CLI con Access Keys

- Conectarse con los usuarios administradores que no son el root
- Acceder en configuración al área de Security Credencial
- Create Access Key (verificar que tengo los permisos necesarios (grupo de admin))
- Copiar ambas Key's para llevarlas al CLI
  - Recordar descargar el .CSV con las access keys ya que luego no podré acceder a ellas

**Configuración rápida con aws configure**

Para el uso general, el comando aws configure es la forma más rápida de configurar la instalación de la AWS CLI. Al escribir este comando, la AWS CLI solicita cuatro datos:

- ID de clave de acceso
- Clave de acceso secreta
- Región de AWS
- Formato de salida

La AWS CLI almacena esta información en un perfil (una colección de opciones) con el nombre default en el archivo credentials. De forma predeterminada, la información de este perfil se utiliza cuando se ejecuta un comando de la AWS CLI que no especifica explícitamente un perfil que se va a utilizar. Para obtener más información sobre el archivo credentials, consulte Opciones de los archivos de configuración y credenciales

> Si por alguna razón ya tienen un perfil por defecto en su equipo y no quieren sobreescribir sus llaves o quieren crear otro perfil, añadan "--profile <EL NOMBRE DE TU PERFIL>" para crear un nuevo perfil con un nombre personalizado:
```bash
aws configure --profile juanpruebas
```

**Creación de un par de claves**

Las claves de acceso constan de un ID de clave de acceso y una clave de acceso secreta, que se utilizan para firmar las solicitudes de programación que se realizan a AWS. Si no tiene claves de acceso, puede crearlas desde la AWS Management Console. Como práctica recomendada, no utilice la clave de acceso del usuario raíz de la Cuenta de AWS para realizar cualquier tarea en la que no sea necesario. Por el contrario, crear un nuevo usuario de IAM administrador con claves de acceso para usted.

El único momento que puede ver o descargar la clave de acceso secreta es cuando crea las claves. No puede recuperarla más adelante. Sin embargo, puede crear nuevas claves de acceso en cualquier momento. Debe tener permisos para realizar las acciones IAM requeridas.

## AWS CloudShell

AWS **CloudShell** es un shell basado en navegador que facilita la administración, exploración e interacción seguras con sus recursos de AWS. CloudShell se autentica previamente con las credenciales de su consola. 

Es otra alternativa a utilizar el CLI en nuestra equipo local.

Las herramientas comunes de desarrollo y operaciones están preinstaladas, por lo que no se requiere instalación ni configuración local. Con CloudShell, puede ejecutar scripts rápidamente con la interfaz de línea de comandos de AWS (AWS CLI), experimentar con las API de servicios de AWS mediante los SDK de AWS o utilizar una variedad de otras herramientas para ser productivo. 

Puede usar CloudShell directamente desde su navegador y sin costo adicional.

**Beneficios de Usar AWS CloudShell**

- Accesibilidad: Acceso rápido a un entorno de CLI sin necesidad de configurar nada localmente.
- Conveniencia: Herramientas y SDKs preconfigurados para empezar a trabajar inmediatamente.
- Seguridad: Maneja las credenciales de AWS de forma segura, eliminando la necesidad de almacenarlas en tu máquina local.
- Portabilidad: Accede a tu entorno de CLI desde cualquier lugar con conexión a internet y un navegador.

AWS CloudShell es una herramienta poderosa y conveniente para gestionar y automatizar tus recursos en AWS desde una interfaz de línea de comandos en el navegador. 
Facilita el acceso a la AWS CLI y otras herramientas necesarias sin la complicación de la configuración local.

## Roles IAM para AWS

Para ejecutar ciertas acciones dentro de AWS es necesario asignar roles a los servicios para que puedan ejecutar las acciones requeridas.

Ejemplo Si queremos que una instancia EC2 envíe imágenes o archivos a un bucket de S3, deberemos crear el rol que le permita a la instancia realizar estas acciones con otros servicios, al rol se le deben agregar políticas que le den permisos (sólo los requeridos).

> Nota: Es una mala práctica tener Access Key dentro de las máquinas virtuales porque entonces si entran a la instancia podrían tener acceso a los servicios que tenga registrado con los access keys.

**Usos comunes**

- EC2
- Lambda
- CloudFormation

**¿Qué es un Role IAM?**

Un **Role IAM** es una entidad de IAM que define un conjunto de permisos para hacer solicitudes a los servicios de AWS. Los roles no están asociados con un usuario específico o un grupo, sino que pueden ser asumidos por cualquier entidad que necesite permisos temporales para ejecutar una tarea en particular.

**Componentes Clave de un Role IAM**

- Trust Policy (Política de Confianza): Define quién puede asumir el rol. Por ejemplo, puede ser un usuario, una aplicación o un servicio de AWS como EC2 o Lambda.

- Permissions Policy (Política de Permisos): Especifica qué acciones se pueden realizar y en qué recursos cuando el rol es asumido.

- Session Duration (Duración de la Sesión):Determina cuánto tiempo pueden durar las credenciales temporales otorgadas por el rol.

**Casos de Uso de Roles IAM**

- Roles para Servicios de AWS: Permiten que los servicios de AWS (como EC2, Lambda, etc.) realicen acciones en tu nombre. Por ejemplo, un rol puede permitir a una instancia de EC2 leer datos de un bucket S3.

- Roles para Usuarios: Permiten a los usuarios de IAM asumir temporalmente permisos adicionales necesarios para una tarea específica.

- Roles para Federated Users: Permiten a usuarios externos (como empleados de otra empresa) acceder a tu cuenta de AWS utilizando sus credenciales de inicio de sesión existentes.

## Práctica de roles en IAM

En esta práctica se creará un role que le permita a una instancia EC2 tener acceso completo a un bucket de S3

Pasos para crear el Rol: 
- Buscar IAM 
- Vamos a Roles / crear Rol 
- Seleccionamos el tipo de entidad (AWS Service) 
- El tipo de uso (EC2) y Next 
- Seleccionamos los permisos que se deban brindar a ese Rol (S3 full Access) y Next 
- Le damos un nombre y una descripción a este rol, y luego Create Rol 

Posteriormente le asignamos el rol de este servicio a otro servicio (por ejemplo para que una instancia de ec2 pueda acceder a una de s3 sin necesidad de Access Key): 

- En la consola de nuestro servicio ec2 Actions/Security/Modify IAM role 
- Seleccionamos el rol que necesitemos y Save

## Herramientas de seguridad en IAM

**Credentials Report**: Es un listado o reporte en CSV, que nos va a permitir revisar lo que está pasando con los usuarios; es decir, si tenemos credenciales actualizadas, cuando fue la última vez que las cambiaron, si tenemos el MFA habilitado entre otras cosas. El beneficio de este reporte es que nos permitirá tener un over-view general de cuantos usuarios tenemos en nuestra cuenta de AWS.

**Access Advisor**: Nos va a mostrar a nivel granular todos los permisos por servicios. Esto quiere decir que si los usuarios tienen accesos a todos los servicios de AWS, nos generará un reporte de que servicios están ocupando realmente.

Estos reportes nos ayudan mucho a establecer el principio del mínimo privilegio para implementar políticas más adecuadas y seguras en nuestra cuenta AWS, como también generar auditorias de nuestra cuenta de manera más efectiva.

## Práctica de las herramientas de seguridad

**Credential Report**

Puede generar y descargar un informe de credenciales que contenga una lista de todos los usuarios de su cuenta y el estado de sus credenciales, tales como contraseñas, claves de acceso y dispositivos MFA. Puede obtener un informe de credenciales de la AWS Management Console, los [SDK de AWS] y las [herramientas de línea de comandos] o la API de IAM.

Puede utilizar los informes de credenciales para fines de auditoría y conformidad. Puede utilizar el informe para auditar los efectos de los requisitos del ciclo de vida de las credenciales, como la rotación de contraseñas y claves de acceso. Puede proporcionar el informe a un auditor externo o conceder permisos a un auditor, para que pueda descargar el informe directamente.

Puede generar un informe de credenciales cada cuatro horas. Al solicitar un informe, IAM primero comprueba si se ha generado algún informe para la cuenta de AWS en las últimas cuatro horas. En caso afirmativo, se descarga el informe más reciente. Si el informe más reciente de la cuenta es de hace más de cuatro horas, o si no hay informes anteriores de la cuenta, IAM genera y descarga un nuevo informe.

**Access Advisor**

El asesor de acceso de AWS Identity and Access Management (IAM) utiliza análisis de datos para ayudarlo a definir con confianza barreras de protección para permisos mediante el suministro de la [última información de servicios a la que se obtuvo acceso]  en relación con sus cuentas, unidades organizativas (OU) y su organización administrada por AWS Organizations. Las barreras de protección para permisos lo ayudan a controlar a qué servicios podrán obtener acceso los desarrolladores y las aplicaciones. Analizar la última información a la que se obtuvo acceso le permite determinar qué servicios no fueron utilizados por los usuarios y roles de IAM. Puede implementar barreras de protección para permisos con políticas de control de servicios (SCP) que restrinjan el acceso a dichos servicios.

> Extra: Para modificar la politica de contraseñas, se debe ingresar a la opcion de "Account Settings" en el servicio de IAM, y se despliega el formulario para modificar la politica a nuestra necesidad.

## Mejores prácticas dentro de IAM

- El usuario root no se debe utilizar. Usarla únicamente para crear usuarios y asignarle permisos para poder operar.
- Se deben crear grupos, donde se metan usuarios.
- Crear políticas seguras para la creación de contraseñas.
- Utilizar el MFA, como 2do factor de autenticación.
- Los roles son poderosos, nos permiten ejecutar acciones a nuestro nombre.
- Utilizar servicios como: Access Key, Secret Key y utilizar y la CLI dentro de AWS.
- Utilizar los reportes que nos ofrece la auditoria de los servicios.
- No compartir usuarios.

## Modelo de responsabilidad compartida en IAM

El modelo de responsabilidad compartida se refiere a que AWS es reponsable DE la nube (Infraestructura física, la red de AWS, etc) Y nosotros somos responsables de lo que tengamos EN la nube (Usuarios, permisos, políticas, etc)

- El modelo de responsabilidad nos indica de que nosotros somos responsables dentro de IAM y de que es responsable AWS

- AWS es responsable de la seguridad de la infraestructura, análisis de configuración y validación del cumplimiento

- Dentro de AWS nosotros somos responsables de todo lo que creemos, el buen uso de MFA, rotar las llaves con frecuencia, aplicar los permisos correctos y analizar patrones de acceso



