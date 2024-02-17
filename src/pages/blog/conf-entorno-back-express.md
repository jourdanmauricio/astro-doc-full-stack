---
layout: '../../layouts/BlogPostLayout.astro'
title: Configurando el entorno de desarrollo para Express js
date: 12-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/post-3.jpg',
    alt: 'A picture of a coder',
  }
description: Configurando el entorno de desarrollo para trabajar con node js - Express js
draft: false
category: Configuración Express Node
---

## Configurando el entorno

Antes de comenzar a desarrollar con Express js vamos a configurar nuestro entorno de desarrollo para trabajar con buenas prácticas.

Agregar gitignore, linters, una configuración adecuada para VSCcode y nodemon para utilizarlo como servidor de desarrollo.

## Creamos el proyecto

```bash
mkdir ejemplo
cd ejemplo

# Creamos un .gitignore
echo "node_modules" > .gitignore

# Node -> Iniciamos el proyecto. Creamos el package.json
npm init -y

# Iniciamos un repo de git
git init

# Instalamos dependencias
npm install nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
npm install express

code .
```

Si todos los desarrolladores del proyecto utilizamos el mismo arhcivo .editoconfig tendremos la misma configuración del editor. Adicionalmente, en VSCode debemos instalar la extensión EditorConfig for VS Code.

```javascript
// .editorconfig
// Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.js]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

Creamos el archivo .eslintrc.json donde incluiremos reglas para buenas prácticas

```javascript
// .eslintrc.json
{
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "extends": ["eslint:recommended", "prettier"],
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "no-console": "warn"
  }
}
```

Creamos el entry-point index.js

```javascript
// index.js
console.log('My app');
```

Por el momento creamos un .gitignore básico, solo contiene node_modules pero podemos ir a la página https://www.toptal.com/developers/gitignore y crear uno más completo. Podemos incluir Node, y los sistemas operativos Windows, Linux y MacOs.

## Modificando el package.json

Finalmente agregamos los scripts al package.json

```javascript
// package.json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js",
  "lint": "eslint"
}
```

<style>
  h1 { color: #2563eb; }
  h2 { color: orange; }
  h3 { color: #a855f7; }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
