---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: Introducción a React
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/redux/back.png',
    alt: 'Introducción a React',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/redux/icon.png',
    alt: 'Logo React',
  }
description: Introducción a React
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

## Creando un proyecto en React (Vite + Tailwind)

<mark>Proyecto</mark>: estructura de una aplicación de tareas por hacer (TODO) para ejemplificar el uso de React con:

- Hooks
- Tailwind CSS
- Eslint
- Prettier
- Vite
- React Icons
- useLocalStorage
- Skeletons
- Portal
- Modal

Repositorio: https://github.com/jourdanmauricio/react-todo

<details>

### Creando el proyecto

```bash
npm create vite@latest todoMachine -- --template react
# npm create vite@latest pokedux -- --template react-ts
cd todoMachine

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
// eslin.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
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
```js
// jsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```
### Estructura de carpetas

```bash
|-- src
|   |-- components
|   |   |-- App
|   |   |   |-- index.jsx
|   |   |   |-- AppUi.jsx
|   |   |   \-- App.css
|   |   |-- CreateTodoButton
|   |   |   \-- index.jsx
|   |   |-- InputEmptytodos
|   |   |   \-- index.jsx
|   |   |-- Modal
|   |   |   \-- index.jsx
|   |   |-- Todocounter
|   |   |   \-- index.jsx
|   |   |-- TodoForm
|   |   |   \-- index.jsx
|   |   |-- TodoItem
|   |   |   \-- index.jsx
|   |   |-- TodoList
|   |   |   \-- index.jsx
|   |   |-- TodoSearch
|   |   |   \-- index.jsx
|   |   \-- TodosSkeleton
|   |       \-- index.jsx
|   |--hooks
|   |   \-- useTodos
|   |        \-- useLocalStorage.js
|   |--shared
|   |   \-- list.js
|   |-- index.css
|   |-- main.jsx
\-- index.html
```

```html
<!-- index.html -->
<!doctype html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Todo Machine</title>
</head>

<body>
  <div id="root"></div>
  <div id="modal"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>
```
```jsx
// src/components/App/index.jsx
import { useState } from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import './App.css';
import AppUi from './AppUi';

function App() {
  const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('TODOS_V1', []);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );
  const completedTodos = todos.filter((todo) => !!todo.completed).length;

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const addTodo = (text) => {
    const newTodo = { text, completed: false };
    saveTodos([...todos, newTodo]);
  };

  return (
    <AppUi
      todos={todos}
      search={search}
      filteredTodos={filteredTodos}
      completedTodos={completedTodos}
      loading={loading}
      error={error}
      setSearch={setSearch}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
      openModal={openModal}
      handleOpenModal={() => setOpenModal(!openModal)}
      addTodo={addTodo}
    />
  );
}

export default App;
```

```jsx
// src/components/App/AppUi.jsx
import { TodoCounter } from '../TodoCounter';
import TodoSearch from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosSkeleton } from '../TodosSkeleton';
import CreateTodoButton from '../CreateTodoButton';
import { TodosError } from '../TodosError';
import { EmptyTodos } from '../EmptyTodos';
import { Modal } from '../Modal';
import TodoForm from '../TodoForm';

const AppUi = ({
  todos,
  loading,
  error,
  search,
  setSearch,
  completeTodo,
  deleteTodo,
  filteredTodos,
  completedTodos,
  openModal,
  handleOpenModal,
  addTodo,
}) => {
  return (
    <>
      <TodoCounter total={todos.length} completed={completedTodos} />
      <TodoSearch search={search} setSearch={setSearch} />

      <TodoList>
        {loading && <TodosSkeleton />}
        {error && <TodosError />}
        {!loading && !filteredTodos.length && <EmptyTodos />}

        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={completeTodo}
            onDelete={deleteTodo}
          />
        ))}
      </TodoList>

      <CreateTodoButton onOpenModal={handleOpenModal} />

      {openModal && (
        <Modal>
          <TodoForm handleOpenModal={handleOpenModal} addTodo={addTodo} />
        </Modal>
      )}
    </>
  );
};
export default AppUi;
```
```css
/* src/components/App/App.css */
#root {
  max-width: 750px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}
```
```jsx
// src/components/CreateTodoButton/index.jsx
const CreateTodoButton = ({ onOpenModal }) => {
  return (
    <button
      onClick={onOpenModal}
      className='bg-cyan-400 shadow-[0px_0px_4px_white] border-0 rounded-full cursor-pointer text-5xl fixed bottom-6 right-6 font-bold text-gray-100 flex justify-center items-center h-16 w-16 rotate-0 transition-transform ease-in-out delay-150 hover:rotate-[224deg] transform-origin-center z-10'
    >
      {' '}
      <span className='relative -top-[2px]'>+</span>
    </button>
  );
};
export default CreateTodoButton;
```
```jsx
// src/components/InputEmptytodos/index.jsx
const EmptyTodos = () => {
  return <p className='mt-8'>No hay datos para mostrar...</p>;
};
export { EmptyTodos };
```
```jsx
// src/components/Modal/index.jsx
import ReactDom from 'react-dom';

const Modal = ({ children }) => {
  return ReactDom.createPortal(
    <div className='flex backdrop-blur-md bg-black/50 justify-center items-center fixed top-0 left-0 bottom-0 right-0'>
      {children}
    </div>,
    document.getElementById('modal')
  );
};
export { Modal };
```
```jsx
// src/components/TodoCounter/index.jsx
const TodoCounter = ({ total, completed }) => {
  return (
    <h1 className='text-2xl text-center p-12 font-normal'>
      Has completado <span className='font-bold'>{completed}</span> de{' '}
      <span className='font-bold'>{total}</span> TODOS
    </h1>
  );
};
export { TodoCounter };
```
```jsx
// src/components/TodoForm/index.jsx
import { useState, useEffect } from 'react';

const TodoForm = ({ handleOpenModal, addTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleOpenModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // const formData = new FormData(event.target);
    // const data = Object.fromEntries(formData.entries());
    // const text = formData.get('todo');
    // addTodo(text);
    if (newTodo.trim() === '') {
      setError('El TODO no puede estar vacío');
      return;
    }
    addTodo(newTodo);
    handleOpenModal();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 min-w-[350px] max-w-[500px] bg-gray-950 justify-center items-center p-8 rounded'
    >
      <label htmlFor='todo' className='text-center text-2xl py-8 font-normal'>
        Escribe tu nuevo TODO
      </label>
      <div className='relative w-full'>
        <textarea
          id='todo'
          name='todo'
          className='p-4 w-full bg-gray-800 rounded'
          rows='3'
          placeholder='Cortar la cebolla para el almuerzo'
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        {error && <p className='text-red-500 absolute'>{error}</p>}
      </div>

      <div className='flex justify-between gap-8 mt-12'>
        <button
          onClick={handleOpenModal}
          type='button'
          className='p-2 w-[150px] hover:bg-gray-900 rounded'
        >
          Cancelar
        </button>
        <button
          type='submit'
          className='p-2 w-[150px] bg-cyan-500 hover:bg-cyan-600 font-bold rounded '
        >
          Crear TODO
        </button>
      </div>
    </form>
  );
};
export default TodoForm;
```
```jsx
// src/components/TodoItem/index.jsx
import { MdDeleteOutline } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';

const TodoItem = ({ text, completed, onComplete, onDelete }) => {
  return (
    <li className='flex justify-between gap-8 items-center mt-8 px-6 shadow-[0px_0px_4px_white] w-full'>
      <span
        onClick={() => onComplete(text)}
        className={`cursor-pointer hover:text-green-500 ${completed && 'text-green-500'}`}
      >
        <MdCheck className='w-8 h-8' />
      </span>
      <p className={`my-4 text-lg grow text-start ${completed && 'line-through'}`}>{text}</p>
      <span onClick={() => onDelete(text)} className='hover:text-red-500 cursor-pointer'>
        <MdDeleteOutline className='w-7 h-7' />
      </span>
    </li>
  );
};
export { TodoItem };
```
```jsx
// src/components/TodoList/index.jsx
const TodoList = (props) => {
  return <ul className='w-full'>{props.children}</ul>;
};
export { TodoList };
```
```jsx
// src/components/TodoSearch/index.jsx
const TodoSearch = ({ search, setSearch }) => {
  return (
    <input
      onChange={(event) => setSearch(event.target.value)}
      value={search}
      className='my-0 p-4 rounded w-full'
      placeholder='Cortar cebolla'
    />
  );
};
export default TodoSearch;
```
```jsx
// src/components/TodoError/index.jsx
const TodosError = () => {
  return <p className='mt-8'>Error</p>;
};
export { TodosError };
```
```jsx
// src/components/TodosSkeleton/index.jsx
import { MdOutlineClear } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';

const TodosSkeleton = () => {
  return (
    <ul className='w-full'>
      {[1, 2, 3].map((todo) => (
        <li
          key={todo}
          className='flex justify-between gap-8 items-center mt-8 px-6 py-4 shadow-sm rounded-lg bg-gray-800 w-full animate-pulse'
        >
          <span className='text-2xl font-bold text-gray-700'>
            <MdCheck className='w-8 h-8 text-gray-600' />
          </span>
          <p className='text-lg grow text-start bg-gray-700 rounded-md h-6'></p>
          <span className='text-2xl font-bold text-gray-700 relative -top-7'>
            <MdOutlineClear className='w-8 h-8 text-gray-600' />
          </span>
        </li>
      ))}
    </ul>
  );
};

export { TodosSkeleton };
```

</details>

## Context API

<mark>Proyecto</mark>: refactorización del proyecto TodoMachine para ejemplificar el uso de la Context API de React.

<details>

```jsx
// src/components/App/AppUi.jsx
import TodoSearch from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosSkeleton } from '../TodosSkeleton';
import CreateTodoButton from '../CreateTodoButton';
import { TodosError } from '../TodosError';
import { EmptyTodos } from '../EmptyTodos';
import { Modal } from '../Modal';
import TodoForm from '../TodoForm';

const AppUi = () => {
  const { error, loading, filteredTodos, completeTodo, deleteTodo, openModal } =
    useContext(TodoContext);

  return (
    <>
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {loading && <TodosSkeleton />}
        {error && <TodosError />}
        {!loading && !filteredTodos.length && <EmptyTodos />}

        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={completeTodo}
            onDelete={deleteTodo}
          />
        ))}
      </TodoList>

      <CreateTodoButton />

      {openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}
    </>
  );
};
export default AppUi;
```
```jsx
// src/components/App/index.jsx
import { TodoProvider } from '../../TodoContext';
import './App.css';
import AppUi from './AppUi';

function App() {
  return (
    <TodoProvider>
      <AppUi />
    </TodoProvider>
  );
}

export default App;
```
```jsx
// src/components/CreateTodoButton/index.jsx
import { useContext } from 'react';

import { TodoContext } from '../../TodoContext';

const CreateTodoButton = () => {
  const { handleOpenModal } = useContext(TodoContext);
  return (
    <button
      onClick={handleOpenModal}
      className='bg-cyan-400 shadow-[0px_0px_4px_white] border-0 rounded-full cursor-pointer text-5xl fixed bottom-6 right-6 font-bold text-gray-100 flex justify-center items-center h-16 w-16 rotate-0 transition-transform ease-in-out delay-150 hover:rotate-[224deg] transform-origin-center z-10'
    >
      {' '}
      <span className='relative -top-[2px]'>+</span>
    </button>
  );
};
export default CreateTodoButton;
```
```jsx
// src/components/todocounter/index.jsx
import { useContext } from 'react';

import { TodoContext } from '../../TodoContext';

const TodoCounter = () => {
  const { completedTodos, todos } = useContext(TodoContext);

  return (
    <h1 className='text-2xl text-center p-12 font-normal'>
      Has completado <span className='font-bold'>{completedTodos}</span> de{' '}
      <span className='font-bold'>{todos.length}</span> TODOS
    </h1>
  );
};
export { TodoCounter };
```
```jsx
// src/components/TodoForm/index.jsx
import { useState, useEffect } from 'react';

import { useContext } from 'react';

import { TodoContext } from '../../TodoContext';

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);

  const { handleOpenModal, addTodo } = useContext(TodoContext);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleOpenModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // const formData = new FormData(event.target);
    // const data = Object.fromEntries(formData.entries());
    // const text = formData.get('todo');
    // addTodo(text);
    if (newTodo.trim() === '') {
      setError('El TODO no puede estar vacío');
      return;
    }
    addTodo(newTodo);
    handleOpenModal();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 min-w-[350px] max-w-[500px] bg-gray-950 justify-center items-center p-8 rounded'
    >
      <label htmlFor='todo' className='text-center text-2xl py-8 font-normal'>
        Escribe tu nuevo TODO
      </label>
      <div className='relative w-full'>
        <textarea
          id='todo'
          name='todo'
          className='p-4 w-full bg-gray-800 rounded'
          rows='3'
          placeholder='Cortar la cebolla para el almuerzo'
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        {error && <p className='text-red-500 absolute'>{error}</p>}
      </div>

      <div className='flex justify-between gap-8 mt-12'>
        <button
          onClick={handleOpenModal}
          type='button'
          className='p-2 w-[150px] hover:bg-gray-900 rounded'
        >
          Cancelar
        </button>
        <button
          type='submit'
          className='p-2 w-[150px] bg-cyan-500 hover:bg-cyan-600 font-bold rounded '
        >
          Crear TODO
        </button>
      </div>
    </form>
  );
};
export default TodoForm;
```
```jsx
// src/components/TodoSearch/index.jsx
import { useContext } from 'react';

import { TodoContext } from '../../TodoContext';

const TodoSearch = () => {
  const { search, setSearch } = useContext(TodoContext);
  return (
    <input
      onChange={(event) => setSearch(event.target.value)}
      value={search}
      className='my-0 p-4 rounded w-full'
      placeholder='Cortar cebolla'
    />
  );
};
export default TodoSearch;
```
```jsx
// src/TodoContext/index.jsx
import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('TODOS_V1', []);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );
  const completedTodos = todos.filter((todo) => !!todo.completed).length;

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const addTodo = (text) => {
    const newTodo = { text, completed: false };
    saveTodos([...todos, newTodo]);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        completedTodos,
        loading,
        error,
        search,
        openModal,
        saveItem: saveTodos,
        completeTodo,
        deleteTodo,
        addTodo,
        setSearch,
        handleOpenModal: () => setOpenModal(!openModal),
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
```
</details>

## React router dom

<mark>Proyecto</mark>: estructura de blog para ejemplificar el uso de react-router-dom con:

- Rutas públicas
- Rutas privadas
- Rutas protegidas
- Rutas con dinámicas
- useAuth

Repositorio: https://github.com/jourdanmauricio/react-router-dom

<details>

### Creando el proyecto

```bash
npm create vite@latest react-router-dom -- --template react
# npm create vite@latest react-router-dom -- --template react-ts
cd react-router-dom

npm install -D tailwindcss postcss autoprefixer
npm install --save react-router-dom@v6.0.3
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
// eslin.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
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
```js
// jsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```
### Estructura de carpetas

```bash
|-- src
|   |-- components
|   |   |-- BlogPost
|   |   |   \-- index.jsx
|   |   |-- Menu
|   |   |   \-- index.jsx
|   |-- Pages
|   |   |-- BlogPage
|   |   |   \-- index.jsx
|   |   |-- BlogPostPage
|   |   |   \-- index.jsx
|   |   |-- HomePage
|   |   |   \-- index.jsx
|   |   |-- LoginPage
|   |   |   \-- index.jsx
|   |   |-- LogoutPage
|   |   |   \-- index.jsx
|   |   |-- NotFoundPage
|   |   |   \-- index.jsx
|   |   \-- ProfilePage
|   |       \-- index.jsx
|   |-- data
|   |   \-- blogData.js
|   |-- AuthContext
|   |   \-- index.jsx
|   |-- index.css
|   |-- App.jsx
|   \-- App.css
\-- index.html
```

```html
<!-- index.html -->
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
```jsx
// src/App.jsx
import { HashRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider, AuthRoute } from './AuthContext';
import { Menu } from './components/Menu';
import { HomePage } from './Pages/HomePage';
import { BlogPage } from './Pages/BlogPage';
import { ProfilePage } from './Pages/ProfilePage';
import { NotFoundPage } from './Pages/NotFoundPage';
// import { BlogPostPage } from './components/Pages/BlogPostPage';
import BlogPost from './components/BlogPost';
import './App.css';
import { LoginPage } from './Pages/LoginPage';
import { LogoutPage } from './Pages/LogoutPage';

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />
          <Routes>
            <Route path='/' element={<HomePage />} />

            {/* <Route path='/blog' element={<BlogPage />} />
          <Route path='/blog/:slug' element={<BlogPostPage />} /> */}

            {/* Nested Route */}
            <Route path='/blog' element={<BlogPage />}>
              <Route path=':slug' element={<BlogPost />} />
            </Route>

            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/logout'
              element={
                <AuthRoute>
                  <LogoutPage />{' '}
                </AuthRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <AuthRoute>
                  <ProfilePage />
                </AuthRoute>
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
```
```css
/* src/App.css */
#root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    /* text-align: center; */
}
```
```jsx
// src/AuthContext/index.jsx
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const adminList = ['mjourdan', 'admin'];

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || '/';

  const login = (username) => {
    const isAdmin = adminList.find((admin) => admin === username);
    setUser({ username, isAdmin });

    navigate(from, { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const auth = { user, login, logout };
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

const AuthRoute = (props) => {
  const auth = useAuth();

  const location = useLocation();

  if (!auth.user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return props.children;
};

// Utilizaremos un hook personalizado para acceder al contexto de autenticación (consumer).
// Este hook se llamará useAuth y devolverá el contexto de autenticación.
// Facilitará la importación.
function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

export {
  AuthProvider,
  // AuthContext
  useAuth,
  AuthRoute,
};
```
```jsx
// src/components/Menu/index.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const routes = [
  { id: 1, label: 'Home', url: '/', private: false, publicOnly: false },
  { id: 2, label: 'Blog', url: '/blog', private: false, publicOnly: false },
  { id: 3, label: 'Profile', url: '/profile', private: true, publicOnly: false },
  { id: 4, label: 'Login', url: '/login', private: false, publicOnly: true },
  { id: 5, label: 'Logout', url: '/logout', private: true, publicOnly: false },
];

const Menu = () => {
  const auth = useAuth();

  return (
    <nav>
      <ul className='flex space-x-4'>
        {routes.map((route) => {
          if (route.private && !auth.user) {
            return null;
          }

          if (route.publicOnly && auth.user) {
            return null;
          }

          return (
            <li key={route.id}>
              <NavLink
                to={route.url}
                className={({ isActive }) => (isActive ? 'text-red-500' : 'text-blue-500')}
              >
                {route.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export { Menu };
```
```jsx
// src/components/BlogPost/index.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { blogData } from '../../data/blogData';
import { useAuth } from '../../AuthContext';

const BlogPost = () => {
  const { slug } = useParams();

  const auth = useAuth();
  const navigate = useNavigate();

  const blogPost = blogData.find((post) => post.slug === slug);

  const canDelete = auth.user && (auth.user?.isAdmin || blogPost?.author === auth.user?.username);

  const returnToBlog = () => {
    // navigate(-1);
    navigate('/blog');
  };

  const commentPost = () => {
    if (!auth.user) {
      navigate('/login', { state: { from: `/blog/${slug}` } });
    } else {
      navigate(`/blog/${slug}/comment`);
    }
  };

  return (
    <>
      {blogPost && (
        <>
          <div className='relative my-8 '>
            <button className='absolute border rounded p-2' onClick={returnToBlog}>
              <span className='font-medium'>&lt; Ocultar</span>
            </button>
            <h3 className='text-2xl text-center font-bold'>{blogPost.title}</h3>
          </div>
          <p className='my-8'>{blogPost.content}</p>
          <p>{blogPost.author}</p>
          {canDelete && <button className='border rounded p-2 mt-8'>Eliminar post</button>}
          <button onClick={commentPost} className='border rounded p-2 mt-8'>
            Comentar post
          </button>
        </>
      )}
    </>
  );
};

export default BlogPost;
```js
// src/data/blogData.js
export const blogData = [
  {
    title: '¿Qué es React?',
    slug: 'que-es-react',
    id: 1,
    content: 'React es una librería de JavaScript para construir interfaces de usuario.',
    author: 'Mauricio Jourdan',
  },
  {
    title: '¿Qué es React Router?',
    slug: 'que-es-react-router',
    id: 2,
    content: 'React Router es una librería de React para manejar rutas en una aplicación.',
    author: 'Mauricio Jourdan',
  },
  {
    title: '¿Qué es JSX?',
    slug: 'que-es-jsx',
    id: 3,
    content:
      'JSX es una extensión de la sintaxis de JavaScript que permite escribir HTML en JavaScript.',
    author: 'Mauricio Jourdan',
  },
  {
    title: '¿Qué es ESLint?',
    slug: 'que-es-eslint',
    id: 6,
    content:
      'ESLint es una herramienta de análisis de código estático para identificar problemas en el código JavaScript.',
    author: 'Mauricio Jourdan',
  },
  {
    title: '¿Qué es Prettier?',
    slug: 'que-es-prettier',
    id: 7,
    content:
      'Prettier es una herramienta de formateo de código para mantener un estilo de código consistente.',
  },
  {
    title: '¿Qué es PostCSS?',
    slug: 'que-es-postcss',
    id: 9,
    content: 'PostCSS es una herramienta para transformar CSS con JavaScript.',
  },
  {
    title: '¿Qué es Jest?',
    slug: 'que-es-jest',
    id: 10,
    content: 'Jest es un framework de pruebas de JavaScript con un enfoque en simplicidad.',
  },
  {
    title: '¿Qué es React Testing Library?',
    slug: 'que-es-react-testing-library',
    id: 11,
    content:
      'React Testing Library es una librería para probar componentes de React de la forma en que los usuarios interactúan con ellos.',
  },
  {
    title: '¿Qué es Cypress?',
    slug: 'que-es-cypress',
    id: 12,
    content:
      'Cypress es una herramienta de pruebas de extremo a extremo para aplicaciones web modernas.',
  },
];
```
```jsx
// src/Pages/BlogPage/index.jsx
import { Link, Outlet } from 'react-router-dom';
import { blogData } from '../../data/blogData';

const BlogLink = ({ post }) => {
  return (
    <li className='my-2'>
      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
    </li>
  );
};

const BlogPage = () => {
  return (
    <>
      <h1 className='text-2xl my-8 font-bold text-center'>BlogPage</h1>

      <ul>
        {blogData.map((post) => (
          <BlogLink key={post.id} post={post} />
        ))}
      </ul>

      {/* Nested Routes */}
      <Outlet />
    </>
  );
};
export { BlogPage };
```
```jsx
// src/Pages/HomePage/index.jsx
const HomePage = () => {
  return <h1 className='text-2xl my-8 font-bold text-center'>Home</h1>;
};
export { HomePage };
```
```jsx
// src/Pages/BlogPostPage/index.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { blogData } from '../../data/blogData';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blogPost = blogData.find((post) => post.slug === slug);

  const returnToBlog = () => {
    // navigate(-1);
    navigate('/blog');
  };

  return (
    <>
      {blogPost && (
        <>
          <div className='relative my-8 '>
            <button className='absolute border rounded p-2' onClick={returnToBlog}>
              <span className='font-medium'>&lt; Volver atrás</span>
            </button>
            <h2 className='text-2xl text-center font-bold'>{blogPost.title}</h2>
          </div>
          <p className='my-8'>{blogPost.content}</p>
          <p>{blogPost.author}</p>
        </>
      )}
    </>
  );
};

export { BlogPostPage };
```
```jsx
// src/Pages/LoginPage/index.jsx
import { useState } from 'react';

import { useAuth } from '../../AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(username);
  };

  if (auth.user) {
    navigate(from, { replace: true });
  }

  return (
    <>
      <h1 className='text-2xl my-8 font-bold text-center'>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          className='block w-full p-2 border border-gray-300 rounded mt-1'
          id='username'
          name='username'
          type='text'
          placeholder=''
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className='border rounded p-2 mt-8' type='submit'>
          Login
        </button>
      </form>
    </>
  );
};

export { LoginPage };
```
```jsx
// src/Pages/LogoutPage/index.jsx
import { useState } from 'react';

import { useAuth } from '../../AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(username);
  };

  if (auth.user) {
    navigate(from, { replace: true });
  }

  return (
    <>
      <h1 className='text-2xl my-8 font-bold text-center'>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          className='block w-full p-2 border border-gray-300 rounded mt-1'
          id='username'
          name='username'
          type='text'
          placeholder=''
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className='border rounded p-2 mt-8' type='submit'>
          Login
        </button>
      </form>
    </>
  );
};

export { LoginPage };
```
```jsx
// src/Pages/ProfilePage/index.jsx
// import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const ProfilePage = () => {
  const auth = useAuth();

  // if (!auth.user) {
  //   return <Navigate to='/login' />;
  // }

  return (
    <>
      <h1 className='text-2xl my-8 font-bold text-center'>Perfil</h1>
      <p>Bienvenido, {auth.user.username} </p>
    </>
  );
};
export { ProfilePage };
```
```jsx
// src/Pages/NotFoundPage/index.jsx
const NotFoundPage = () => {
  return <h1 className='text-2xl my-8 font-bold text-center'>No encontrado</h1>;
};
export { NotFoundPage };
```

</details>

## React Query