---
layout: '../../layouts/BlogPostLayout.astro'
title: Git y Github
date: 2024-02-12
author: Mauricio Jourdán
image:
  { src: '/astro-doc-full-stack/images/back-general.webp', alt: Logo nest js' }
description: Comandos básicos de git y github
draft: false
category: git
---

# Git y Github

## Sistemas de control de versiones

**Git es un sistema de control de versiones distribuido** que te permite registrar los cambios que haces en tus archivos y volver a versiones anteriores si algo sale mal. Fue diseñado por Linus Torvalds para garantizar la eficiencia y confiabilidad del mantenimiento de versiones de aplicaciones que tienen un gran número de archivos de código fuente.

- Git está optimizado para guardar cambios de forma incremental.
- Permite contar con un historial, regresar a una versión anterior y agregar funcionalidades.
- Lleva un registro de los cambios que otras personas realicen en los archivos.

Git fue diseñado para operar en un entorno Linux. Actualmente, es multiplataforma, es decir, es compatible con Linux, MacOS y Windows. En la máquina local se encuentra Git, se utiliza bajo la terminal o línea de comandos y tiene comandos como merge, pull, add, commit y rebase, entre otros.

### Para qué proyectos sirve Git

Con Git se obtiene una mayor eficiencia usando archivos de texto plano, ya que con archivos binarios no puede guardar solo los cambios, sino que debe volver a grabar el archivo completo ante cada modificación, por mínima que sea, lo que hace que incremente demasiado el tamaño del repositorio.

Guardar archivos binarios en el repositorio de Git no es una buena práctica, únicamente deberían guardarse archivos pequeños (como logos) que no sufran casi modificaciones durante la vida del proyecto. Los binarios deben guardarse en un CDN.

### Características de Git

Git te ayuda a trabajar de manera más organizada y colaborativa en proyectos de desarrollo de software. Estas son algunas de sus principales características:

- Control de versiones: Git almacena la información como un conjunto de archivos. Te permite llevar un registro de los cambios que haces en tus archivos, lo que significa que siempre puedes volver a versiones anteriores si algo sale mal.

- Ramificación: Puedes crear ramas en tu proyecto, lo que te permite trabajar en diferentes características o aspectos del mismo sin afectar el trabajo de los demás.

- Colaboración: En Git, varias personas pueden trabajar en diferentes aspectos del proyecto al mismo tiempo.

- Seguridad: No existen cambios, corrupción en archivos o cualquier alteración sin que Git lo sepa. Git cuenta con 3 estados en los que es posible localizar archivos: Staged, Modified y Committed.

- Flexibilidad: Casi todo en Git es local. Es difícil que se necesiten recursos o información externos, basta con los recursos locales con los que cuenta.

- Comandos: Git tiene una sintaxis de comandos bastante sencilla y fácil de aprender, lo que lo hace accesible incluso para principiantes en programación.

### ¿Qué es un sistema de control de versiones?

El SCV o VCS (por sus siglas en inglés) es un sistema que registra los cambios realizados sobre un archivo o conjunto de archivos a lo largo del tiempo, de modo que puedas llevar el historial del ciclo de vida de un proyecto, comparar cambios a lo largo del tiempo, ver quién los realizó o revertir el proyecto entero a un estado anterior.

Cualquier tipo de archivo que se encuentre en un ordenador puede ponerse bajo control de versiones.

### ¿En qué se diferencia de Github?

Github es una plataforma de desarrollo colaborativo para alojar proyectos utilizando el sistema de control de versiones Git. Se emplea principalmente para la creación de código fuente de programas de computadora.

Puede considerarse a Github como la red social de código para los programadores y en muchos casos es visto como un curriculum vitae, pues aquí se guarda el portafolio de proyectos de programación.

### Características de Github

- GitHub permite alojar proyectos en repositorios de forma gratuita y pública, pero tiene una forma de pago para privados.

- Puedes compartir fácilmente tus proyectos.

- Permite colaborar para mejorar los proyectos de otros y a otros mejorar o aportar a los tuyos.

- Ayuda a reducir significativamente los errores humanos, a tener un mejor mantenimiento de distintos entornos y a detectar fallos de una forma más rápida y eficiente.

- Es la opción perfecta para poder trabajar en equipo en un mismo proyecto.

- Ofrece todas las ventajas del sistema de control de versiones Git, pero también tiene otras herramientas que ayudan a tener un mejor control de los proyectos.

### Comandos básicos de Git

<mark>git init</mark> -> comienza un nuevo repositorio en la carpeta actual

<mark>git add &lt;nombre_archivo&gt;</mark> -> Git comienza a "trackear", comienza a hacerle un seguimiento archivo en cuestión

<mark>git commit -m "Comentario"</mark> -> Envía los últimos cambios del archivo a la base de datos del sistema de control de versiones. Una buena práctica al usar este comando es añadir -m; al hacer esto, podemos escribir un mensaje que nos permita recordar los cambios que hicimos en ese momento.

<mark>git add .</mark> -> Es un comando que nos permite agregar al repositorio todos los archivos a los cuales se le haya hecho algún cambio.

<mark>git status</mark> -> Permite ver el estado de la base de datos. Por ejemplo, podemos ver si hay algunos cambios que no se han guardado en el repositorio, y si no hay nada nos dirá que todo esta bien.

<mark>git show</mark> -> Mostrara todos los cambios que hemos hecho, esto incluye las líneas que hemos cambiado, cuando y quien hizo dicho cambios.

<mark>git log &lt;nombre_archivo&gt;<mark> -> Muestra todo el historial del archivo.

<mark>git push</mark> -> Permite enviar los cambios realizados a un servidor remoto.

## Configuración de git

Para ver las opciones de configuración ejecutamos

```bash
# opciones de configuración
git config

# configuración por default de nuestro git
git config --list

# Para ver donde se encuentra guarda la configuración
git config --list --show-origin

# Configuramos el nombre de usuario
git config --global user.name "Mauricio Jourdán"
git config --global user.email "jourdanmauricio@gmail.com"
# Agregamos nano como editor default para commits
git config --global core.editor nano
```

## GIT - Crear repositorio y primer commit

Para comenzar a ejecutar comandos vamos a crear un proyecto, para ello podemos crear una carpeta que contendrá en proyecto o realizarlo a través de la terminal.

```bash
mkdir curso-git-github
cd curso-git-github
```

Una vez ubicados dentro de la carpeta raíz de nuestro proyecto inicializamos git.

```bash
git init
```

Parece que nada ocurrió pero si listamos los archivos ocultos vemos que se creó una **carpeta llamada .git**. Allí se encuentra la base de datos que contendrá los cambios que realicemos en nuestro proyecto.

```bash
ls -al

./
../
.git/
```

Creamos un arhivo llamado historia.txt y agregamos algo de contenido. Nuevamente podemos realizarlo desde un editor de texto o desde la terminal.

```bash
echo "Esta historia está por comenzar..." > historia.txt
```

Si ejecutamos git status obtendremos el estado del proyecto.

```bash
git status

Not commits yet
Untracked files:
  historia.txt
```

Para que git comience el seguimiento del archivo debemos indicarlo con el comando git add

```bash
git add historia.txt
```

Si repetimos git status

```bash
git status

Not commits yet
Changes to be commited:
  new file: historia.txt
```

Para indicar a git que deje de seguir el archivo utilizamos git rm --cached &lt;file&gt;

```bash
git rm --cached historia.txt
```

```bash
git status

Not commits yet
Untracked files:
  historia.txt
```

Volvimos al estado inicial. El archivo no tiene seguiento, no se encuentra en el staging area. Para continuar le volveremos a dar seguimiento y lo envaremos al repositorio con el comando git commit

```bash
git add historia.txt

git commit -m "First Commit"
```

Finalmente, podemos realizar agún cambio al archivo historia.txt simulando el proceso de desarrollo. Agregamos una línea con algo de texto.

```bash
echo "agregamos las segunda línea a esta historia" >> historia.txt

# verificamos el estado del proyecto
git status
# Vemos que tenemos el archivo en memoria,
# que aún no se encuentra en staging

changes not satged for commit
  modified: historia.txt

# Én este punto podemos realizar:
# - git add para agregar el arhivo al staging.
# Para enviar todos los archivos podemos utilizar git add .
# - git rm --cached para eliminarlo del tracking

git add .

# Ahora podemos confirmar los cambios en el repositorio
git commit -m "Modifiqué historia.txt agregando la segunda línea"
```

Si queremos ver qué ocurrión con el archivo podemos ejecutar:

```bash
git log historia.txt
```

Veremos que git nos muestra los commits que realizamos sobre el archivo comenzando desde el último. Nos muestra el id que asigno al commit, el user que realizó el commit, la fecha y el mensaje del commit.

## Analizar cambios en los archivos de tu proyecto con Git

A través del comando git show podemos ver los cambios (línea a línea) que se realizaron sobre el archivo.

```bash
git show historia.txt
```

Si queremos ver las difrencias del archivo entre dos commits podemos ejecutar diff con los id de cada commit. Vemos los ids de los commit en el log.

```bash
git log historia.txt
git diff <id1> <id2>
```

## ¿Qué es el staging?

Cuando ejecutamos **git init**:

- se crea un área en memoria ram llamada **staging**. Es un área desconectada y es donde inicialmente agregaremos lo cambios
- se crea el **repositorio** (carpeta **.git**), es donde quedarán todos los cambios al final del proyecto

Staging es un área de preparación, es un lugar temporal antes de enviar los cambios al repositorio.

A través del comando git add agregamos los cambios al staging area y con git commit pasan del staging al repositorio.

![Git Básicos](/astro-doc-full-stack/images/git/git.webp)

## ¿Qué es Branch (ramas)?

Cuando creamos un repositorio se crea una rama por defecto llamada **master**. Cada vez que realizamos un cambio y lo confirmamos con commit creamos una nueva versión.

Si queremos realizar algunas pruebas podemos crear la rama experimental. Copiamos una versión de la rama master y la nombreamos. En la nueva rama realizaremos los cambios confirmandolos con commit y solo se alterará la nueva rama, es independiente de la rama master.

Ahora supongamos que ocurre un bug en la rama master (en producción), tenemos que solucionarlo inmediatamente. Para ello creamos una nueva rama llamada hotfix, desde el último commit de la rama master, reparamos el bug y realizamos un merge nuevamente a master.

```bash
              commit     commit     commit      commit            commit
Master          v1 ------- v2 ------- v3 ------- ... --------- version actual
                                       |               |          |      |
                                       |               | merge    |      |
                                       |    commit  commit        |      |
Development                            x ---- v2 ---- v3          |      | merge
                                                                  |      |
                                                                  |      |
                                                                  |      |
HotFix                                                            x ---- v1
```

Podemos tener tantas ramas como necesitemos. Debemos tener en cuenta que pueden ocurrir conflictos al realizar los merge entre ramas, y veremos como se solucionan.

## Volver en el tiempo en nuestro repositorio utilizando reset y checkout

git reset nos permite volver a una versión anterior. Hay dos tipos de reset.

- reset hard -> todo vuelve al estado anterior. Es el más "peligroso" (perdemos los cambios), pero es el más utilizado.
- soft reset -> vuelve a la versión anterior pero lo que tengamos en staging continua en staging. Continúa esperando el git commit

```bash
git reset --hard <id>
git reset --soft <id>
```

### Variaciones de Git Reset

- git reset --soft: Borra el historial y los registros de Git de commits anteriores, pero guarda los cambios en Staging para aplicar las últimas actualizaciones a un nuevo commit.
- git reset --hard: Deshace todo, absolutamente todo. Toda la información de los commits y del área de staging se elimina del historial.
- git reset --mixed: Borra todo, exactamente todo. Toda la información de los commits y del área de staging se elimina del historial.
- git reset HEAD: El comando git reset saca archivos del área de staging sin borrarlos ni realizar otras acciones. Esto impide que los últimos cambios en estos archivos se envíen al último commit. Podemos incluirlos de nuevo en staging con git add si cambiamos de opinión.

git reset HEAD es un comando que te permite revertir los cambios que ya habías preparado para subir, y moverlos de vuelta a tu proyecto. Con este comando puedes cancelar los cambios que ya habías agregado, para que puedas revisarlos, modificarlos o deshacerlos antes de confirmarlos con un commit.

> Ten en cuenta que, si deshaces commits en un repositorio compartido en GitHub, estarás cambiando su historia y esto puede causar problemas de sincronización con otros colaboradores.

### Git rm

Por otro lado, git rm es un comando que nos ayuda a eliminar archivos de Git sin eliminar su historial del sistema de versiones. Para recuperar el archivo eliminado, necesitamos retroceder en la historia del proyecto, recuperar el último commit y obtener la última confirmación antes de la eliminación del archivo.

Es importante tener en cuenta que git rm no puede usarse sin evaluarlo antes. Debemos usar uno de los flags siguientes para indicarle a Git cómo eliminar los archivos que ya no necesitamos en la última versión del proyecto.

- git rm --cached: Elimina archivos del repositorio local y del área de staging, pero los mantiene en el disco duro. Deja de trackear el historial de cambios de estos archivos, por lo que quedan en estado untracked.
- git rm --force: Elimina los archivos de Git y del disco duro. Git guarda todo, por lo que podemos recuperar archivos eliminados si es necesario (empleando comandos avanzados).

> ¡Al usar git rm lo que haremos será eliminar este archivo completamente de git!

### ¿Cuál es la diferencia entre git rm y git reset Head?

La diferencia principal entre git rm y git reset HEAD radica en que git rm elimina archivos del repositorio y de la historia del proyecto, mientras que git reset saca los cambios del área de preparación y los mueve del espacio de trabajo, sin afectar la historia del repositorio.

![Git reset - rm](/astro-doc-full-stack/images/git/git2.webp)

- git checkout -> nos permite volver a una version anterior del archivo

```bash
 git checkout <id> nombre_archivo
```

Volvemos a la última versión

```bash
 git checkout master nombre_archivo
```

Esto es peligroso porque si realizamos un git checkout a una versión anterior, modificamos y commiteamos estamos pisando los cambios en la master.

## Flujo de trabajo básico con un repositorio remoto

Cuando trabajamos en un equipo se utiliza un servidor remoto como github para que los miembros del equipo puedan subir sus cambios y queden diponibles para el resto.

- El comando **git clone** permite traernos un repositorio desde el servidor remoto a nuestro equipo.

```bash
                                 git clone url
    -----------------------------------------------------------------------  Repositorio
    |                                                      |                   remoto
    |                                                      |
    v                                                      v
Directorio                Preparación o               Repositorio
de trabajo                  Staging                      local
```

- Podemos realizar el flujo de trabajo que vimos en local y cuando estemos listos realizamos el **git push** para subir los cambios al servidor

```bash
            git add                      git commit
    --------------------------   --------------------------                 Repositorio
    |                        |   |                        |                   remoto
    |                        |   |                        |                      ^
    |                        v   |                        v                      |
Directorio                Preparación o               Repositorio ----------------
de trabajo                  Staging                      local         git push
```

Pero ¿qué ocurre si alguién realizó un cambio en el repositorio remoto?, Podemos bajar los cambios a nuestro equipo mediante **git fetch**. Los aplica sobre el repositorio local pero no sobre nuestros archivos.

```bash
                                                                git fetch
                                                           ----------------  Repositorio
                                                           |                   remoto
                                                           |
                                                           v
Directorio                Preparación o               Repositorio
de trabajo                  Staging                      local
```

Para copiar los cambios a mis archivos tenemos que fusionar los cambios con **git merge**.

```bash
                                                                git fetch
                                                           ----------------  Repositorio
                       git merge                           |                   remoto
    ------------------------------------------------------ |
    |                                                      |
    v                                                      v
Directorio                Preparación o               Repositorio
de trabajo                  Staging                      local
```

Pero podemos realizar ambas acciones con el comnado **git pull**. De esta menra, siempre tenemos una copia actualizada de lo que pasó en el repositorio remoto.

```bash
                               git pull
                                                           ----------------  Repositorio
                                                           |                   remoto
    ------------------------------------------------------ |
    |                                                      |
    v                                                      v
Directorio                Preparación o               Repositorio
de trabajo                  Staging                      local
```

## Introducción a las ramas o branches de Git

Las ramas son formas en las que podemos hacer cambios sin afectar a la rama principal (master). Esto nos permite tener una copia de master, realizar cambios sin afectar a master y luego realizar un merge de nuestra rama a master para fusionarlas.

> **git branch** crea una nueva rama. La rama se crea desde el lugar en donde estamos parados.

```bash
# Creamos una rama
git branch nombre_de_rama
```

Para movernos a la nueva rama ocupamos **git checkout**

```bash
# Creamos una rama
git checkout nombre_de_rama
```

Para saber en qué rama estamos parados podemos ejecutar **git status**, o **git branch**. Para ver las ramas que existen en el repositorio remoto podemos ocupar **git branch -a**

Si realizamos cambios en los archivos de la nueva rama, no se reflejarán en la rama master. Lo verificamos pasandonos a la rama master: **git checkout master** y vemos que los cambios que hicimos no se encuentran. Volvemos a la nueva rama: **git checkout nombre_de_rama**

> <mark>**Warning**: si realizamos cambios en la nueva rama y volvemos a master perderemos los cambios realizados enla nueva rama. **Debemos realizar un git add . y git commit en la nueva rama antes de movernos a master**.</mark>

## Fusión de ramas con Git merge

Para fusionar las ramas debemos utilizar **git merge**. El merge se realiza desde la rama a donde queremos incorporar los cambios de la otra. En nuestro ejemplo deberíamos pararnos sobre master para incorporar los cambios de la nueva rama.

El merge creará un nuevo commit en la rama master que incluirá el último commit de master y el último de cabecera y los fusionará.

El merge, como es un commit nos solicitará un mensaje.

```bash
# Cambiamos a master
git checkout master

# Incorporamos los cambios de la nueva rama
git merge nueva_rama
```

## Resolución de conflictos al hacer un merge

En el ejemplo anterior no se realizamos cambios en la rama master mientras modificamos la nueva rama, lo que resultó en un merge sin problemas.

Consideremos que podríamos haber realizado cambios en master, mientras modificamos la nueva rama. Hacer commits en ambas ramas. Si las líneas modificadas son distintas no tendremos problemas.

Pero, ¿qué ocurre si modificamos una línea en la nueva rama y modificamos esa misma línea en la rama master con un contenido diferente? No podremos realizar el **merge** porque hay una línea en cada rama que difire. nos toca resolver el conflicto para poder ejecutar el merge.

Al ejecutar **git merge** el proceso que en un estado intermedio hasta que resolvamos el conflicto. VSCode nos mostrará el código ofreciendo continuar los cambios de master o descartar esa línea de master (accept incommig change). Cualquiera sea la opción que sigamos **debemos realizar un git add y un git commit para finalizar el merge**.

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
