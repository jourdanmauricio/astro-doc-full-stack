---
layout: '../../layouts/BlogPostLayout.astro'
title: Github - llaves ssh
date: 2024-02-12
author: Mauricio Jourdán
image: { src: '/astro-doc-full-stack/images/git/back.webp', alt: Logo github' }
description: Github llaves ssh
draft: false
category: git
---

## Cómo funcionan las llaves públicas y privadas

Para entender como funcionan las **llaves públicas y privadas** vamos a suponer que dos personas en lugares opuestos del mundo desean enviarse mensajes encriptados. Que nadie los pueda leer ni modificar.

Si enviamos un mensaje por internet cualquier hacker podrá leerlo. Una solución es **cifrar el mensaje con una contraseña**.

Entonces, podría utilizar un contraseña para cifrar el mensaje y quien recibe el mensaje utilizaría la misma contraseña para descifrar el mensaje.

Ahora, el problema es ¿Cómo enviamos esa contraseña al receptor del mensaje? Si alguien intercepta la contraseña podrá descifrar el mensaje.

<mark>Para dar solución definitiva al problema se crearon las **llaves públicas y privadas**, también conocido como cifrado asimétrico de un solo camino.</mark>

Si deseamos que alguien nos envíe un mensaje secreto crearemos una llave pública y una llave privada.

- Las llaves se crean con un algoritmo
- Están vinculadas matemáticamente una con la otra
- Lo que cifremos con la llave pública solo lo descifraremos con la llave privada
- La llave privada nunca se compartirá
- Solo se comparte la llave pública

Ahora podemos enviar la llave pública a nuestro amigo, y no tiene importancia si un hacker obtiene esa llave pública.

Nuestro amigo cifrará el mensaje que desea enviarnos, generando un nuevo mensaje encriptado. Ese mensaje solo puede ser decifrado por la clave privada.

Entonces, si alguien captura la llave pública y el mensaje que nos envían no podrá descifralo. Este sistema es tan seguro que así funcionan las finanzas del mundo.

Y ¿cómo le envío mensajes cifrados a mi amigo? En ese caso, es la otra persona quien debe generar las llaves (públicas y privada), enviarme la llave pública y yo encriptaré el mensaje que deseo enviar su llave pública. Finalmente, le envío el mensaje que solo él podrá decifrar con su clave privada.

De esta forma, se establece una cominunicación segura entre dos partes.

## Configuración de llaves en nuestro equipo

Utilizamos usuario y contraseña como sistema de autenticación y las enviamos a través de https (debería ser seguro). Pero y ¿si nos roban la laptop? Alguién podría crakear las contraseñas.

Para evitar esto, github trabaja con llaves públicas y privadas. Otra ventaja, es que ya no debemos volver a colocar usuario y contraseña.

En nuestro equipo crearemos una par de llaves (pública y privada). La llave pública será enviada a github y a partir de este momento nos conectaremos a github a través del **protocomo SSH (secure shell)**. Ya no utlizaremos HTTPS.

SSH es el protocolo que se debe utilizar para conectarnos a servidores remotos.

Durante la primera conexión github detecta que enviamos una llave pública y nos enviara cifrado con nuestra llave pública su propia llave pública. Este proceso es automático.

Como tenemos la llave pública de github y github tiene nuestra llave pública estebleceremos una conexión de doble sentido 100% cifrada por SSH.

Como paso adicional a la llave privada que creamos le podemos agregar una contraseña para hacerla aún más fuerte.

Las llaves SSH no son por proyecto o repositorio, sino que son por persona.

La generación de contraseñas por conveción se realiza en nuestro home (linux) o directorio de usuario (windows), dentro de una carpeta oculta llamada .ssh.

> <mark>WARNING Nunca generar las llaves dentro de un repositorio porque corremos el riesgo de subir la llave privada a la nube.</mark>

```bash
cd ~
# Generamos las clave
ssh-keygen -t rsa -b 4096 -C "jourdanmauricio@gmail.com"
```

La llave se generará en /home/user/.ssh/id_rsa:

Nos permite cambiar el nombre pero la dejamos así. También se nos preguntará si deseamos agregar una contraseña a la llave privada.

Ahora, tenemos las dos llaves guardadas en el directio /home/user/.ssh, la privada (id_rsa) y la pública (id_rsa.pub).

Copiamos la el contenido de la llave pública (id_rsa.pub) y debemos pegarlo en github. Antes, de llevar la llave a github debemos asegurarnos que nusestro servidor de SSH se encuentra en ejecución.

```bash
eval $(ssh-agent -s)

# Si la respuesta es algo así significa que se encuentra en ejecución
Agent pid 408810
```

Agregamos la llave privada que acabamos de crear a nuestro servidor ssh.

```bash
ssh-add ~/.ssh/id_rsa
```

> <mark>TIP: si tenemos 3 computadores, lo ideal es tener 3 llaves. No es buena idea compartir las llaves entre computadoras.</mark>

En gihub accedemos a nuestro perfil / settings / SSH and GPG keys / New SSH key

**Title**: ingresamos el **nombre** con el que deseemos identificar el **equipo** que se conectará con esta llave

**Key**: Pegamos el **contenido de la llave pública**

Finalmente, pulsamos Añadir, nos pedirá el password. github ya se encuentra conectado por SSH.

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
