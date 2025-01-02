---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: React + TypeScript
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/react/react-typescript/back.png',
    alt: 'React + TypeScript',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/react/react-typescript/icon.svg',
    alt: 'Logo React',
  }
description: React + TypeScript
draft: false
category: front
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

## Creando un proyecto en React - TypeScritp (Vite + Tailwind)

<mark>Proyecto</mark>: Utilizaremos un ejemplo para realizar lazy loading de una imágenes. Solo se descargarán las que se encuentran dentro del viewport.

- Utilizaremos la página https://randomfox.ca/ para obtener imágenes de zorros aleatorias.
- APi: https://randomfox.ca/images/100.jpg



<details>

```bash
npm create vite@latest react-typescript -- --template react-ts
cd react-typescript

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
git init
```
```bash
npm run dev
```

### Configuración

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
```CSS
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
```js
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "jsxSingleQuote": true,
  "arrowParens": "always",
  "overrides": [
    {
      "files": "*.css",
      "options": {
        "singleQuote": false,
        "tabWidth": 4
      }
    }
  ]
}
```
</details>

## Formas de escribir un compoenente con TypeScript

<details>

```tsx
// Siempre que impotamos tipos desde Typescript utilizamos import type
// para que el compilador los elimine al momento de realizar el build
import type { FunctionComponent, FC } from 'react';

// Implicitamente RandomFox retorna un elemento jsx, un JSX.Element
// colocando el cursor sobre RandomFox se puede ver que es un JSX.Element
// Typescript infiere que es un componente de React, que retorna JSX
export const RandomFox = () => {
  return <img />;
};

// Indicamos explicitamente que RandomFox2 retorna un elemento jsx, un JSX.Element
export const RandomFox2 = (): JSX.Element => {
  return <img />;
};

// Utilizando los tipos que se incluyen en la librería de React
// FunctionComponent y JSX.Element son muy similares,
// la diferencia es que con JSX.Element tipamos lo que retorna la función
// y con FunctionComponent tipamos la constante que guarda la función
// no es exactamente lo mismo, pero el resultado es el mismo
export const RandomFox3: FunctionComponent = () => {
  return <img />;
};

// Utilizando el alias FC que es un alias de FunctionComponent
export const RandomFox4: FC = () => {
  return <img />;
};
```

Las 4 formas de definir un copoeneente son correctas, pero la más utilizada es la **segunda**.

</details>

## Tipado de Props y State

<details>

```tsx
// src/components/RandomFox.tsx

// Generate a random number
const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 123) + 1;
};

export const RandomFox = (): JSX.Element => {
  const image: string = `https://randomfox.ca/images/${getRandomNumber()}.jpg`;

  return <img width={320} height='auto' src={image} className='rounded ' />;
};
```

Modifiquemos el componente RandomFox para que sea más reutilizable.

```tsx
// src/components/App.tsx
import { useState } from 'react';
import './App.css';
import { RandomFox } from './components/RandomFox';

// Generate a random number
const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 123) + 1;
};

// Generate random id
const getRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

type ImageItem = {
  id: string;
  url: string;
};

function App() {
  // Podemos dejar que TypeScript infiera el tipo de datos
  // o podemos especificarlo a través del tipado genérico
  // const [images, setImages] = useState<Array<string>>([
  // const [images, setImages] = useState<string[]>([
  //   `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
  //   `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
  //   `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
  //   `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
  // ]);

  const [images, setImages] = useState<ImageItem[]>([
    {
      id: getRandomId(),
      url: `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
    },
    {
      id: getRandomId(),
      url: `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
    },
    {
      id: getRandomId(),
      url: `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
    },
    {
      id: getRandomId(),
      url: `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
    },
  ]);

  return (
    <>
      <h1>Hello</h1>

      {/* {images.map((image, index) => (
        <div className='p-4' key={index}>
          <RandomFox image={image} />
        </div>
      ))} */}
      {images.map((image) => (
        <div className='p-4' key={image.id}>
          <RandomFox image={image.url} />
        </div>
      ))}
    </>
  );
}

export default App;
```

```tsx
// src/components/RandomFox.tsx

// Tipado de las props
type RandomFoxProps = {
  image: string;
};

// export const RandomFox = (props: {image: string} ): JSX.Element => {
// export const RandomFox = (props: RandomFoxProps): JSX.Element => {
export const RandomFox = ({ image }: RandomFoxProps): JSX.Element => {
  // return <img width={320} height='auto' src={props.image} className='rounded ' />;
  return <img width={320} height='auto' src={image} className='rounded ' />;
};
```
</details>

## Tipado de eventos

<details>

```tsx  
// src/components/App.tsx
import { useState } from 'react';
import type { MouseEventHandler } from 'react';
import { RandomFox } from './components/RandomFox';
import './App.css';

// Generate a random number
const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 123) + 1;
};

// Generate random id
const getRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

type ImageItem = {
  id: string;
  url: string;
};

function App() {
  const [images, setImages] = useState<ImageItem[]>([]);

  // Para identificar el tipado de event podemos colocar el cursor sobre el onClick
  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const newImageItem: ImageItem = {
      id: getRandomId(),
      url: `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
    };
    setImages([...images, newImageItem]);
  };

  return (
    <>
      <h1>Hello</h1>

      <button onClick={addNewFox}>Agregar zorro</button>

      {images.map((image) => (
        <div className='p-4' key={image.id}>
          <RandomFox image={image.url} />
        </div>
      ))}
    </>
  );
}

export default App;
```
</details>

## Tipado de referencias
<details>

```tsx
import { useEffect, useRef, useState } from 'react';

type RandomFoxProps = {
  image: string;
};

export const RandomFox = ({ image }: RandomFoxProps): JSX.Element => {
  // Asignamos una imagen transparente en base 64 por defecto. Obtenida de next js. Es un rectangulo de 320x320.
  // Se utiliza base 64 para que sea super comprimida y no haya que descargar nada
  const [src, setSrc] = useState<string>(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
  );
  // const [src, setSrc] = useState<string>('');

  const node = useRef<HTMLImageElement>(null);
  //¿ Que es useRef ? Es un Hook que te permite crear una referencia mutable que persiste durante todo el ciclo de vida de tu componente, lo que significa que no pierde su valor entre renderizaciones.

  // Únicamente deberíamos cargar la imagen si el nodo es visible en la pantalla
  // cargar la imagen significa asignar la url de la imagen al atributo src del nodo
  // Utilizamos useEffect para cargar la imagen cuando el nodo es visible
  // Utilizamos useState para guardar el estado de la imagen,
  // si la imagen no está cargada, mostraremos un rectangulo gris
  // si la imagen ingresa al viewport, le damos el valor real al src
  // Por lo tanto, en ese momento se realiza el request de la imagen

  // El problema es que al scrollear, la imagen puede demorar en cargar,
  // por lo que se podemos ver un rectangulo gris en lugar de la imagen
  // Algo similar a la solución que aplica next.js con la propiedad loading='lazy'
  useEffect(() => {
    // Creamos un observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Si el elemento es visible
        if (entry.isIntersecting) {
          console.log('En pantalla');
          setSrc(image);
        }
      });
    });

    // Observamos el nodo
    if (node.current) observer.observe(node.current);

    // Limpiamos el observador
    return () => {
      observer.disconnect();
    };
  }, [image]);

  return (
    <img
      ref={node}
      width={320}
      height='auto'
      src={src}
      className='rounded bg-gray-300 w-[320px] h-auto'
    />
  );
};
```
</details>

## Componentes que extienden elementos DOM
<details>

Modificamos el componente RandomFox para hacerlo más reutilizable, más general. 

Agregaremos el evento onClick. Para ello, debemos tipar el evento en las props del componente de la imagen, y funciona. El evento se retransmite al componente padre. 

Pero, ¿qué pasa si queremos agregar otro evento (relacionado a img) al componente? ¿Debemos tipar cada evento que deseemos agregar?

Afortunadamente, no es necesario. TypeScript posee la linrería del DOM que contiene todos los eventos que se pueden agregar a un elemento HTML. Conoce las propiedades y métodos de cada elemento HTML. Lo que nos permite extender del tipo de elemento HTMLImageElement. 

Si paremos el cursor sobre el elemento img, podemos ver que es un ImgHTMLAttributes&lt;HTMLImageElement&gt;. 

```tsx  
// src/components/App.tsx
import { useState } from 'react';
import type { MouseEventHandler } from 'react';

import { LazyImage } from './components/RandomFox';
import './App.css';

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 123) + 1;
};

const getRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

type ImageItem = {
  id: string;
  url: string;
};

function App() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const newImageItem: ImageItem = {
      id: getRandomId(),
      url: `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
    };
    setImages([...images, newImageItem]);
  };

  return (
    <>
      <h1>Hello</h1>

      <button onClick={addNewFox}>Agregar zorro</button>

      {images.map((image) => (
        <div className='p-4' key={image.id}>
          <LazyImage
            // image={image.url}
            src={image.url}
            width={320}
            height='auto'
            title={`Random fox ${image.id}`}
            className='rounded bg-gray-300 w-[320px] h-auto'
            onClick={() => console.log('Click!!!')}
          />
        </div>
      ))}
    </>
  );
}

export default App;

```
```tsx
// src/components/RandomFox.tsx
import { useEffect, useRef, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

type LazyImageProps = {
  src: string;
};

type ImagesNativeTypes = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImagesNativeTypes;

// ...imgPros: indica que todas las props que lleguen al componente serán pasadas al elemento img
// utilizando la variable imgPros con el operador spread.
// De esta manera, no debemos especificar cada una de las props que queremos pasar al elemento img.
// No es necesario especificar el onClick en el elemento img
// De la misma manera, podemos utilizar otros atributos como alt, title, className, etc.
// Ejemplo, el width, el height y el classname no deberían estar en el elemento img,
// sino que se deberián pasar como props desde el componente padre.

// Tambien podemos reemplazar la prop image por src, para que sea más claro que es la url de la imagen.
// al utilizar src como prop, debemos cambiar el nombre de la prop en el componente padre.
// y el nombre del estado src para que no haya conflictos.
export const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {
  const [currentSrc, setCurrentSrc] = useState<string>(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
  );

  const node = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
        }
      });
    });

    if (node.current) observer.observe(node.current);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return <img ref={node} src={currentSrc} {...imgProps} />;
};
```
 
Entre más parecido sea el componente al elemento HTML que utilizamos, más fácil será para el resto del equipo utilizar el componente. No deben aprender nuevas props, o eventos, solo lo utilizarían como si fuera un elemento HTML nativo.
</details>

## Sigamos extendiendo el DOM

<details>
Otra funcionabilidad que podemos agregar al componente es la capacidad de identificar cuando la imagen se encuentre cargada para informar el padre. 

```tsx
// src/components/App.tsx
import { useState } from 'react';
import type { MouseEventHandler } from 'react';
import { LazyImage } from './components/RandomFox';
import './App.css';

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 123) + 1;
};

const getRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

type ImageItem = {
  id: string;
  url: string;
};

function App() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const newImageItem: ImageItem = {
      id: getRandomId(),
      url: `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
    };
    setImages([...images, newImageItem]);
  };

  return (
    <>
      <h1>Hello</h1>

      <button onClick={addNewFox}>Agregar zorro</button>

      {images.map((image) => (
        <div className='p-4' key={image.id}>
          <LazyImage
            // image={image.url}
            src={image.url}
            width={320}
            height='auto'
            title={`Random fox ${image.id}`}
            className='rounded bg-gray-300 w-[320px] h-auto'
            onClick={() => console.log('Click!!!')}
            onLazyLoad={(img) => console.log('Lazy load', img)}
          />
        </div>
      ))}
    </>
  );
}

export default App;
```
```tsx
// src/components/RandomFox.tsx
import { useEffect, useRef, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

type LazyImageProps = {
  src: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
};

type ImagesNativeTypes = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImagesNativeTypes;

export const LazyImage = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element => {
  const [currentSrc, setCurrentSrc] = useState<string>(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
  );
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);

  const node = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (isLazyLoaded) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }

        setCurrentSrc(src);
        observer.disconnect();
        setIsLazyLoaded(true);

        if (typeof onLazyLoad === 'function') {
          onLazyLoad(node.current);
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad]);

  return <img ref={node} src={currentSrc} {...imgProps} />;
};
```
</details>

## Creando tipos propios para la aplicación

<details>

TypeScript nos permite crear nuestros propios tipos de datos. Y que se encuentren disponibles en todos los archivos de nuestra aplicación.  
Estos tipos se conocen como globales. 

Los tipos globales se pueden definir en un archivo .d.ts. Estos archivos definen los tipos de datos que se pueden utilizar en toda la aplicación. 

En la raíz del proyecto podemos crear un archivo llamado app.d.ts. 

Los tipos globales suelen comenzar con una letra mayúscula I o T. 

**Tipos Globals**:

Es bueno pero también malo tener tipos globables. Analiza bien tu necesidad de negocio para saber qué sí debería ser global. No abuses de los tipos globales.

- Idealmente corresponden a entidades del contexto de la aplicación, ex: Usuario, Producto
- No Abusar de ellos. Podrían crecer sin control
- Empiezamos con tipos locales, y si identificamos que son globles porque se utilizan en muchas partes, lo consideraremos para volverlo global.

```tsx
// src/components/App.tsx
import { useState } from 'react';
import type { MouseEventHandler } from 'react';
import { LazyImage } from './components/RandomFox';
import './App.css';

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 123) + 1;
};

const getRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// type ImageItem = {
//   id: string;
//   url: string;
// };

function App() {
  const [images, setImages] = useState<IImageItem[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const newImageItem: IImageItem = {
      id: getRandomId(),
      url: `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
    };
    setImages([...images, newImageItem]);
  };

  return (
    <>
      <h1>Hello</h1>

      <button onClick={addNewFox}>Agregar zorro</button>

      {images.map((image) => (
        <div className='p-4' key={image.id}>
          <LazyImage
            // image={image.url}
            src={image.url}
            width={320}
            height='auto'
            title={`Random fox ${image.id}`}
            className='rounded bg-gray-300 w-[320px] h-auto'
            onClick={() => console.log('Click!!!')}
            onLazyLoad={(img) => console.log('Lazy load', img)}
          />
        </div>
      ))}
    </>
  );
}

export default App;
```
```tsx
// /app.d.ts
type IImageItem = {
  id: string;
  url: string;
};
```

También modificamos la configuración de tsconfig.json (en vite: tsconfig.app.json) para que TypeScript reconozca el archivo app.d.ts desde la raíz. 

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  /* Agregamos .d.ts y .tsx */
  "include": ["src", "**/*.d.ts", "**/*.tsx"]
}
```
</details>

## Trabajando con librerías no-tipadas

<details>

En ocasiones, trabajamos con librerías que no están tipadas.

```bash
npm install lodash
```

Como ejemplo podemos utilizar la librería de lodash (no se encuentra tipada) para generar el id de la imagen. Al momento de importarla TypeScript nos mostrará un error. 

```bash
No se encontró ningún archivo de declaración para el módulo 'lodash'. '/home/mauricio/Platzi/react-typescript/node_modules/lodash/lodash.js' tiene un tipo "any" de forma implícita.

Pruebe "npm i --save-dev @types/lodash" si existe o agregue un nuevo archivo de declaración (.d.ts) que incluya "declare module 'lodash';".
```

En este punto podemos crear un archivo (@types) de declaración para lodash, o instalar los tipos de lodash que ya desarrolló la comunidad.  

Comencemos por definir los tipos de lodash nosotros mismos. 

```ts
// /@types/lodash.d.ts

// indicamos a typescript que existe un módulo que se llama lodash (mismo nombre que utilizamos para importar)
declare module 'lodash' {
  export function random(lower: 1, upper: 123): number;
}
```

En muy raras ocasiones necesitaremos crear nuestros propios tipos. La comunidad de TypeScript es muy grande y es probable que alguien ya haya creado los tipos que necesitamos. Existe un repositorio de tipos de TypeScript llamado DefinitelyTyped, mantenido por la comunidad. 

```bash
npm i --save-dev @types/lodash
```
</details>

## Trabajando con librerías que extienden el objeto window

<details>

En ocasiones, trabajamos con librerías que extienden el objeto window. 

Tambien podemos extender el objeto windows por ejemplos cuando utilizamos librerias como Plausible que es similar a google analitycs. Esta libreria solo nos pide que agreguemos un script a nuestro HTML

```html
<!-- index.html -->
<script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
></script>
```

Pero si queremos hacer seguimiento a la interaccion de un botón para obtener analiticas, debemos llamar a la funcion plausible('add_fox'). El problema es que typescript no dabe que existe esta funcion dentro de windows. 

Entonces nosotros podemos crear un directorio con los tipos: @types dentro de este directorio colocaremos otro directorio con el nombre de la librería y en su interior un archivo index.d.ts

```ts
// /@types/plausible/index.d.ts
type Options = {
    callback?: () => void
    props: Record<string, string | number | undefined>
}

interface Window {
    plausible: (event:'add_fox' | 'remove_fox', options?: Options ) => void
}
```

Al definir una interface con el mismo nombre que un objeto que ya existe, typescript lo va a extender, y le va a agregar la propiedad plausible, la cual podemos tipar según lo que nos indique la librería que debería recibir.


</details>