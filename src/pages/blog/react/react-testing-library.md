---
layout: '../../../layouts/SubBlogPostLayout.astro'
title: React Testing Library
date: 2024-02-12
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/react/react-testing-library/back.png',
    alt: 'React Testing Library',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/react/react-testing-library/icon.png',
    alt: 'Logo React Testing Library',
  }
description: React Testing Library
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

## Proyecto para testing en React 

<details>

Para realizar testing en React utilizaremos la librería [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Esta librería nos permite realizar pruebas de componentes de React de forma sencilla y eficiente.

El proyecto trata sobre la gestión de órdernes. Comenzamos por clonarlo:

```bash
git clone https://github.com/platzi/react-testing.git
```

Luego, instalamos las dependencias en desarrollo, no son necesarias en producción:

- Testing Library DOM: virtualiza un DOM y contiene utilidades para probar DOM. 
- Testing Library Jest DOM: contiene utilidades (matchers) para probar DOM con Jest.
- Testing Library React: contiene utilidades para probar componentes de React.
- JSDOM: utilidades que necesitamos para configurar los test.
- Vitest: es un test runner que nos permite correr los test.

```bash 
cd react-testing
npm install 
npm install @testing-library/dom @testing-library/jest-dom @testing-library/react jsdom vitest -D
```

Finalmente, creamos los archivos de configuración, y el script para correr los test:

```javascript
// /vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTest.ts'],
  },
});
```

```javascript
// /src/setupTest.ts
import '@testing-library/jest-dom';
```

```json
// package.json
...
{
  "scripts": {
    "test": "vitest"
  }
}
...
```
```bash
npm run test

# > react-testing@1.0.0 test
# > vitest

# DEV  v2.1.8 /home/mauricio/Platzi/react-testing

# include: **/*.{test,spec}.?(c|m)[jt]s?(x)
# exclude:  **/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*

# No test files found, exiting with code 1
```

El error se debe a que no tenemos archivos de test.

</details>

## Estructura de un test en React

<details>

```javascript
describe('Agrupación de los casos de prueba', () => {
  it('Casos de prueba', () => {
    const { getByText } = render(<Order />);
    expect('Asersion');
  });
});
```

Creamos un archivo de test en la carpeta `src`:

la estensión .test es importante para que vitest pueda encontrar los archivos de test.

```ts
// /src/ejemplo.test.tsx

import {describe, it, expect} from 'vitest';

describe('Ejemplo de test', () => {
  it('la suma de dos números', () => {
    const suma = (a: number, b: number) => a + b;
    const resultado = suma(2, 3);
    expect(resultado).toBe(5);
  });

  it('dos textos iguales', () => {
    const texto1 = 'hola';
    const texto2 = 'hola';
    expect(texto1).toBe(texto2);
  });
})
```
</details>

## Testing de componentes
<details>

DOC queries: https://testing-library.com/docs/queries/about/

El componente que probaremos es `Button.tsx`, que se encuentra en la carpeta `src/components`.

```tsx  
import React from 'react';
import classes from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button' }) => (
  <button className={classes.Button} onClick={onClick} type={type}>
    {label}
  </button>
);
```

Creamos el archivo de test en la carpeta `src/components/Button`:

```tsx
// /src/components/Button.test.tsx

import {describe, it, expect, vi} from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('<Button />', () => {
  it('debería renderizar el boton', () => {
    render(<Button label="Click me" />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('debería llamar a la función onClick', async () => {
    // Arrange (preparar)
    const handleClick = vi.fn();

    render(<Button label="Click me" onClick={handleClick} />);

    const button = screen.getByText('Click me');
    button.click();

    // Act (actuar)
    await act(() => {
      fireEvent.click(button);
    })

    // Assert (verificar)
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
```

En el segundo test, se utiliza async/await para manejar la ejecución asincrónica del código. Esto es importante porque el evento de clic que se genera en el test puede involucrar operaciones que no se completan instantáneamente, como cambios en el DOM. Al usar await act(), estamos esperando a que estas operaciones se procesen completamente antes de hacer afirmaciones sobre el estado del componente. Esto asegura que las pruebas se realicen de manera precisa y confiable.
</details>

## Table Driven Testing en React
<details>

Ls test repetitivos son un antipatrón en el desarrollo de software.

Los tests de **Table Driven Testing** son una técnica que nos permite definir una tabla con los casos de prueba y los resultados esperados. Esto nos permite escribir menos código y tener una visión más clara de los casos de prueba que estamos cubriendo. Cada fila de la tabla representa un caso de prueba con sus entradas y resultados esperados.

Beneficios:

- Mantenibilidad
- Legibilidad
- Eficiencia
- Cobertura

Para ejemplificar utilizamos un componente calculadora que es perfecto para table driven testing, porque recibe dos números y una operación para realizar, pero el flujo será el mismo para todos los casos.

```tsx
// /src/components/Calculator.tsx
type CalculatorProps = {
  a: number;
  b: number;
  operation: "add" | "subtract" | "multiply" | "divide" | string;
};

export const Calculator = ({ a, b, operation }: CalculatorProps) => {
  const calculate = () => {
    switch (operation) {
      case "add":
        return a + b;
      case "subtract":
        return a - b;
      case "multiply":
        return a * b;
      case "divide":
        return b !== 0 ? a / b : "Error";
      default:
        return "Invalid operation";
    }
  };

  return <section>Result: {calculate()}</section>;
};
```
```tsx
// /src/components/Calculator.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Calculator } from './Calculator';


describe('<Calculator />', () => {
  const useCasesTest = [
    { a: 2, b: 3, operation: 'add', expected: 5 },
    { a: 5, b: 2, operation: 'subtract', expected: 3 },
    { a: 3, b: 4, operation: 'multiply', expected: 12 },
    { a: 10, b: 2, operation: 'divide', expected: 5 },
    { a: 10, b: 0, operation: 'divide', expected: 'Error' },
    { a: 10, b: 0, operation: 'invalid', expected: 'Invalid operation' },
  ];

  it.each(useCasesTest)('debería retornar $expected cuando $a y $b son $operation', ({ a, b, operation, expected }) => {

    render(<Calculator a={a} b={b} operation={operation} />);
    const result = screen.getByText(`Result: ${expected}`);
    expect(result).toBeInTheDocument();
  }
)
});
```
</details>

## Desarrollo Guiado por Pruebas (TDD) en React
<details>

**<mark>Test Driven Development (TDD)</mark>** es una metodología que consiste en escribir primero las pruebas y luego el código necesario para que estas pruebas sean exitosos.

```tsx
// /src/components/Contador.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Contador from './Contador';

describe('<Contador />', () => {
  it('Debería mostrat el valor inicial', () => {
    render(<Contador />);
    const input = screen.getByText('Contador: 0');
    expect(input).toBeInTheDocument();

  });

  it('Debería implementar el contador', async () => {
    render(<Contador />);
    const button = screen.getByText('Incrementar');
    await act (() => {
      fireEvent.click(button);
    })
    const contador = screen.getByText('Contador: 1');
    expect(contador).toBeInTheDocument();

  });
});
```
```tsx
// /src/components/Contador.tsx
import {useState} from 'react';

const Contador = () => {
  const [contador, setContador] = useState(0);

  const handleAdd = () => { 
    setContador(contador + 1);
  }

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={handleAdd}>Incrementar</button>
    </div>
  );
}

export default Contador;
```
</details>

## Mocks en testing

<details>
Los mocks son simulaciones de objetos o funciones reales que se utilizan en pruebas unitarias para evitar depender de servicios externos y así asegurar la estabilidad de las pruebas. 

Los tipos de mocks incluyen:

- Mocks de constantes/variables: Datos simulados que fluyen en los tests.
- Mocks de funciones: Simulaciones de funciones para validar su invocación.
- Mocks de módulos: Reemplazo de módulos importados en el entorno de testing.
- Mocks de promesas: Simulación del comportamiento de promesas en JavaScript.

Cuando usar mocks:

- Dependencias externas
- Comportamientos no determinista
- Eficiencia

Beneficios:

- Test más rápidos
- Resultados consistentes
- Control total del ambiente
- Pruebas de casos extremos (edge cases)

Advertencias:

- Demasiados mocks == pruebas frágiles
- Mock incorrecto == falsa confianza
- Sobre-mockear == perder casos reales
</details>

## Testing a un Proceso de Autenticación 

<details>
Al igual que cuando vamos a renderizar un componente, también debemos especificar los proveedores que van a encapsular nuestra App, como react-roter-dom para utilizar los hooks como useNavigation.

En este caso en particular react-router-dom, ya hizo el trabajo por nosotros y nos ofrece una utilidad llamada MemoryRouter que nos permite encapsular nuestra App y simular la navegación.

Nuestra App, también utiliza un contexto llamado authContext, que nos permite saber si el usuario está autenticado o no. Para poder probar este contexto, vamos a utilizar un mock de este contexto. En este caso, el proveedor fue desarrollado por nosotros, así que utilizamos directamente. 

Nuestra App se encuentra encapsulada dentro de la siguiente manera:

```tsx
// /src/main.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SessionProvider } from './context/AuthContext';
import './styles.scss';

const root = createRoot(document.getElementById('root')!);
root.render(
  <SessionProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SessionProvider>
);
```

El componente que probaremos es `Login.tsx`, que se encuentra en la carpeta `src/pages`.

```tsx
// /src/containers/Login/Login.tsx
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../services/getAuth";
import { useSession } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import classes from "./Login.module.scss";

interface LoginFormData {
  username: string;
  password: string;
}

const mockSuperAdmin = {
  username: "superadmin@example.com",
  password: "superadmin123!",
};

const mockVisualuizer = {
  username: "visualizer1@example.com",
  password: "vis1pass456@",
};

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>(mockSuperAdmin);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useSession();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      const { username, password } = formData;
      const response = await getAuth(username, password);
      login(response);
      navigate("/orders");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  }, [formData, login, navigate]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("handleSubmit");
      handleLogin();
    },
    [handleLogin]
  );

  return (
    <div className={classes.Login}>
      <section className={classes.Login__container}>
        <h1 className={classes.Login__title}>Platzi order</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className={classes.Login__input}
        />
        <form onSubmit={handleSubmit}>
          <div className={classes.Login__passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={classes.Login__input}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={classes.Login__togglePassword}
            >
              {showPassword ? "hide" : "show"}
            </button>
          </div>
          {errorMessage && (
            <p className={classes.Login__errorMsg}>{errorMessage}</p>
          )}
          <Button label="Login" type="submit" />
        </form>
      </section>
    </div>
  );
};
```

Como vemos handleSubmit ejecuta handleLogin, que a su vez ejecuta getAuth, que es una función que hace una petición a un servidor para obtener un token de autenticación. Para evitar depender de un servidor externo, vamos a realizar dos mocks:

- módulo getAuth 
- función getAuth, para pasar por la parte negativa de la promesa.

Para evitar el código repetitivo en los tests (it), vamos a crear una función (dentro de describe) llamada handleLogin que retorne el encapsulamiento del componente.

```tsx
// /src/containers/Login/Login.test.tsx
import { describe, expect, it, vi, Mock } from 'vitest';
import { Login } from './Login';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SessionProvider } from '../../context/AuthContext';
import { getAuth } from '../../services/getAuth';
import { act } from 'react';

// Mockeamnos el Módiloi de getAuth
vi.mock('../../services/getAuth', ()=> ({
  getAuth: vi.fn()
}))

// Mockeamos el módulo de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockeNavigate
  }
 });

// Mockeamos la función getAuth
const mockGetAuth = getAuth as Mock;

// Mockeamos la función Navigate
const mockeNavigate = vi.fn();

describe('<Login />', () => { 

  const handleLogin = () => {
    return render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    );
  }
  it('debería mostrar un mensaje de error', async () => {
    mockGetAuth.mockRejectedValue(new Error('Invalid credentials'));
    handleLogin();
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const buttonLogin = screen.getByRole('button', { name: 'Login' });

    await act(() => { 
      fireEvent.change(usernameInput, { target: { value: 'wrongUser' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });
      fireEvent.click(buttonLogin);
    })

    const errorMessage = screen.getByText('Invalid credentials');
    expect(errorMessage).toBeInTheDocument();
  });

  it('debería redirigir a /orders', async () => {
    handleLogin();
    mockGetAuth.mockResolvedValue({success: true});

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const buttonLogin = screen.getByRole('button', { name: 'Login' });

    await act(() => { 
      fireEvent.change(usernameInput, { target: { value: 'validUser' } });
      fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
      fireEvent.click(buttonLogin);
    });

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledWith('validUser', 'validPassword');
      expect(mockeNavigate).toHaveBeenCalledWith('/orders');
    });
  });

  it('debería mostrar el', async () => {
    handleLogin();
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonTogglePassword = screen.getByRole("button", { name: "show" });

    await act(() => {
      fireEvent.click(buttonTogglePassword);
    });
    expect(passwordInput).toHaveAttribute("type", "text");
    await act(() => {
      fireEvent.click(buttonTogglePassword);
    });
    expect(passwordInput).toHaveAttribute("type", "password");
  } );
});
```
Otra forma de que se renderice el componente antes de que se corra cada test podria ser con beforeEach y no ahorramos tener que llamar la funcion en cada it.

```tsx 
describe('<Login />', () => {
  beforeEach(() => {
    render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    )
  })
}
```
</details>

## Testing de Gestión de Datos con Mocks

<details>
Vamos a probar la pantalla de orders. Que traiga los pedidos.

```tsx
// /src/containers/Orders/Orders.tsx
import React, { useState, useEffect, useCallback } from "react";
import { getOrders } from "../../services/getOrders";
import { Order } from "../../types/Orders";
import { OrderSummary } from "../../components/OrderSummary";
import { useSession } from "../../context/AuthContext";
import { handleValidateSuperAdmin } from "../../utils/validateRole";
import { OrderItem } from "../../components/OrderItem";
import { useNavigate } from "react-router-dom";
import classes from "./Orders.module.scss";

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(user) fetchOrders();
  }, [fetchOrders, user]);

  if (!user) {
    return null;
  }

  if (loading) {
    return <div className={classes.orders__loading}>Loading orders...</div>;
  }

  if (error) {
    return <div className={classes.orders__error}>{error}</div>;
  }

  const isSuperAdmin = handleValidateSuperAdmin(user.role);

  return (
    <section className={classes.orders}>
      <div className={classes.orders__container}>
        <h2 className={classes.orders__title}>Order History</h2>
        {isSuperAdmin && <OrderSummary orders={orders} />}
        <div className={classes.orders__list}>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  );
};
```
```tsx
// /src/components/OrderSummary/OrderSummary.tsx
import React, { useMemo } from "react";
import { Order } from "../../types/Orders";
import { StatusBadge } from "../StatusBadge";
import styles from "./OrderSummary.module.scss";
import { getSummaryOrders } from "../../utils/sumamry";

export const OrderSummary: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const summary = useMemo(() => getSummaryOrders(orders), [orders]);

  return (
    <div className={styles.OrdersSummary}>
      <h3 className={styles.OrdersSummary__title}>
        Orders Summary (Only admins)
      </h3>
      <div className={styles.OrdersSummary__grid}>
        <div className={styles.OrdersSummary__item}>
          <p className={styles.OrdersSummary__label}>Total Orders</p>
          <p className={styles.OrdersSummary__value} data-testid='totalOrders'>{summary.totalOrders}</p>
        </div>
        <div className={styles.OrdersSummary__item}>
          <p className={styles.OrdersSummary__label}>Total Value</p>
          <p className={styles.OrdersSummary__value}>
            ${summary.totalValue.toFixed(2)}
          </p>
        </div>
        <div className={styles.OrdersSummary__item}>
          <p className={styles.OrdersSummary__label}>Average Order Value</p>
          <p className={styles.OrdersSummary__value}>
            ${summary.averageOrderValue.toFixed(2)}
          </p>
        </div>
      </div>
      <div className={styles.OrdersSummary__statusSummary}>
        <h4 className={styles.OrdersSummary__statusSummaryTitle}>
          Orders by Status
        </h4>
        <ul className={styles.OrdersSummary__statusList}>
          {Object.entries(summary.ordersByStatus).map(([status, count]) => (
            <li key={status} className={styles.OrdersSummary__statusItem}>
              <StatusBadge status={status} />
              <span className={styles.OrdersSummary__statusCount}>{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
```
```tsx
// /src/components/OrderItem/OrderItem.tsx
import { StatusBadge } from "../../components/StatusBadge";
import { Order } from "../../types/Orders";
import classes from "./OrderItem.module.scss";

export const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={classes.OrderItem}>
      <div className={classes.OrderItem__header}>
        <h3 className={classes.OrderItem__id}>Order #{order.id.slice(0, 8)}</h3>
        <p className={classes.OrderItem__date}>{formatDate(order.orderDate)}</p>
        <StatusBadge status={order.status} />
      </div>
      <div className={classes.OrderItem__customer}>
        <p className={classes.OrderItem__customerName}>{order.customer.name}</p>
        <p className={classes.OrderItem__customerEmail}>
          {order.customer.email}
        </p>
      </div>
      <div className={classes.OrderItem__products}>
        <h4 className={classes.OrderItem__productsTitle}>Order Items:</h4>
        <ul className={classes.OrderItem__productsList}>
          {order.products.map((product) => (
            <li key={product.id} className={classes.OrderItem__productsItem}>
              <span>
                {product.name} x{product.quantity}
              </span>
              <span>${(product.price * product.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.OrderItem__footer}>
        <div className={classes.OrderItem__payment}>
          <p className={classes.OrderItem__paymentLabel}>Payment Method</p>
          <p className={classes.OrderItem__paymentMethod}>
            {order.paymentMethod.replace("_", " ")}
          </p>
        </div>
        <div className={classes.OrderItem__total}>
          <p className={classes.OrderItem__totalLabel}>Total Amount</p>
          <p className={classes.OrderItem__totalAmount}>
            ${order.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
```
```tsx
// /src/containers/Orders/Orders.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';
import { SessionProvider, useSession } from '../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { Orders } from './Orders';
import { getOrders } from '../../services/getOrders';
import { getSummaryOrders } from '../../utils/sumamry';

vi.mock('../../services/getOrders', () => ({ 
  getOrders: vi.fn()
}))

vi.mock('../../context/AuthContext', async () => {
  const actual = await vi.importActual('../../context/AuthContext');
  return {
    ...actual,
    useSession: vi.fn()
  }
});

const mockGetOrders = getOrders as Mock;

const mockOrders = [
  {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "customer": {
      "id": "60d07f61-99bf-4b90-955b-5d3a7c9bb3d4",
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "products": [
      {
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        "name": "Laptop",
        "price": 999.99,
        "quantity": 1
      },
      {
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        "name": "Mouse",
        "price": 29.99,
        "quantity": 1
      }
    ],
    "total": 1029.98,
    "status": "delivered",
    "orderDate": "2023-10-01T10:00:00Z",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zipCode": "12345",
      "country": "USA"
    },
    "paymentMethod": "credit_card"
  },
]

describe('<Orders />', () => { 
  const handleRenderOrders = (userRole: string) => {
    const mockUser = userRole ? { role: userRole }: null;
    (useSession as Mock).mockReturnValue({user: mockUser});
    render(
      <SessionProvider>
        <MemoryRouter>
          <Orders />
        </MemoryRouter>
      </SessionProvider>
    );
  };

  it('debería mostrar las órdenes', async () => {
    mockGetOrders.mockResolvedValue(mockOrders);
    handleRenderOrders('visualizer');

    await waitFor(() => { 
      const orders = screen.getAllByRole('heading', {level: 3});
      expect(orders).toHaveLength(mockOrders.length);
    });
  });

  it('dfebería mostrar sección para superadmin', async() => {
    mockGetOrders.mockResolvedValue(mockOrders);
    handleRenderOrders('superadmin');
    
    await waitFor(() => { 
      const {totalOrders} = getSummaryOrders(mockOrders);
      const totalOrdersElement = screen.getByTestId("totalOrders").textContent;
      expect(totalOrdersElement).toBe(totalOrders.toString());
    });

   })
})
```
</details>

## SOLID y Refactorización de Hooks

<details>

- S -> Responsabilidad Única (un chef solo cocina, no limpia ni cobra)
- O -> Extensibles, no modificables (podemos añadir apps al celular sin dañar las existentes)
- L -> Intercambiables (si pedimos un taxi cualquier conductor puede llevarnos)
- I -> Desacoplados (mejor un control de TV simple que uno universal confuso)
- D -> Delegar búsquda de dependencias (como una USB, se puede conectar en cualquier puerto compatible)

Vamos a estructurar el proyecto, refactorizando el componente orders en una capa de presentación y la lógica a través de un custom hook.

```tsx
// /src/containers/Orders/Orders.tsx
import React, { useState, useEffect, useCallback } from "react";
import { getOrders } from "../../services/getOrders";
import { Order } from "../../types/Orders";
import { OrderSummary } from "../../components/OrderSummary";
import { useSession } from "../../context/AuthContext";
import { handleValidateSuperAdmin } from "../../utils/validateRole";
import { OrderItem } from "../../components/OrderItem";
import { useNavigate } from "react-router-dom";
import classes from "./Orders.module.scss";

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(user) fetchOrders();
  }, [fetchOrders, user]);

  if (!user) {
    return null;
  }

  if (loading) {
    return <div className={classes.orders__loading}>Loading orders...</div>;
  }

  if (error) {
    return <div className={classes.orders__error}>{error}</div>;
  }

  const isSuperAdmin = handleValidateSuperAdmin(user.role);

  return (
    <section className={classes.orders}>
      <div className={classes.orders__container}>
        <h2 className={classes.orders__title}>Order History</h2>
        {isSuperAdmin && <OrderSummary orders={orders} />}
        <div className={classes.orders__list}>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  );
};
```
```tsx
// /src/hooks/useOrders.ts
import { useCallback, useEffect, useState } from 'react';
import { Order } from '../types/Orders';
import { useSession } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/getOrders';

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(user) fetchOrders();
  }, [fetchOrders, user]);
  return {user, loading, error, orders}
}
export default useOrders
```
```tsx
// /src/containers/Orders/Orders.tsx
import React from "react";
import { OrderSummary } from "../../components/OrderSummary";
import { handleValidateSuperAdmin } from "../../utils/validateRole";
import { OrderItem } from "../../components/OrderItem";
import classes from "./Orders.module.scss";
import useOrders from '../../hooks/useOrders';

export const Orders: React.FC = () => {
  const {user, loading, error, orders} = useOrders();

  if (!user) {
    return null;
  }

  if (loading) {
    return <div className={classes.orders__loading}>Loading orders...</div>;
  }

  if (error) {
    return <div className={classes.orders__error}>{error}</div>;
  }

  const isSuperAdmin = handleValidateSuperAdmin(user.role);

  return (
    <section className={classes.orders}>
      <div className={classes.orders__container}>
        <h2 className={classes.orders__title}>Order History</h2>
        {isSuperAdmin && <OrderSummary orders={orders} />}
        <div className={classes.orders__list}>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  );
};
```
</details>

## Testing de Hooks con Mocks

<details>

Vamos a probar el hook useOrders, que se encarga de manejar la lógica de la pantalla de orders. Hasta este momento, solo hemos testeado UI, ahora vamos a testear la lógica de la aplicación.

Testing Library nos ofrece otra librería llamada react-hooks-testing-library que nos ayudará a testear hooks. 

```bash
npm install @testing-library/react-hooks-testing-library --save-dev
```
```tsx
// /src/hooks/useOrders.test.ts
import { describe, expect, it, Mock, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { getOrders } from '../services/getOrders';
import { useSession } from '../context/AuthContext';
import useOrders from './useOrders';


vi.mock('../services/getOrders', () => ({
  getOrders: vi.fn()
}));

vi.mock('../context/AuthContext', () => ({
  useSession: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('useOrders', () => { 
  const mockNavigate = vi.fn();
  const mockGetOrders = getOrders as Mock;
  const mockUsesession = useSession as Mock;

  it('should return orders', async () => {

    const mockOrders = [
      {
        "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "customer": {
          "id": "60d07f61-99bf-4b90-955b-5d3a7c9bb3d4",
          "name": "John Doe",
          "email": "john.doe@example.com"
        },
        "products": [
          {
            "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
            "name": "Laptop",
            "price": 999.99,
            "quantity": 1
          },
          {
            "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
            "name": "Mouse",
            "price": 29.99,
            "quantity": 1
          }
        ],
        "total": 1029.98,
        "status": "delivered",
        "orderDate": "2023-10-01T10:00:00Z",
        "shippingAddress": {
          "street": "123 Main St",
          "city": "Anytown",
          "state": "CA",
          "zipCode": "12345",
          "country": "USA"
        },
        "paymentMethod": "credit_card"
      },
    ];

    mockGetOrders.mockResolvedValue(mockOrders);  
    mockUsesession.mockReturnValue({ user: { id: 1 } });

    // result contiene el valor que retorna el hook
    // waitForNextUpdate es una función que espera a que el hook cambie su estado
    const {result} = renderHook(() => useOrders());

    expect(result.current.loading).toBe(true);

    // Esperamos a que el hook cambie su estado
    // await waitForNextUpdate();
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);

    expect(result.current.orders).toEqual(mockOrders);
  })
} );
```
</details>

## Testing de Hooks con Spies

<details>

un Spy es una herramienta de testing que envuelve una función y nos permite saber si fue llamada, cuántas veces fue llamada, con qué argumentos fue llamada, y mantiene el comportamiento original (o lo modifica si es necesario).

Vamos a crear un nuevo archivo de test para el custon hook useOrders pero utilizando spies.

Spy solo se puede aplicar a archivos locales, no se puede aplicar a dependencias externas.


```tsx
// /src/hooks/useOrdersSpies.test.ts
import { describe, it, expect, vi, MockInstance, beforeEach, Mock, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import * as OrderService from '../services/getOrders';
import * as AuthContext from '../context/AuthContext';
import * as ReactRouter from 'react-router-dom';
import useOrders from './useOrders';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

describe('useOrdersSpies', () => {
  let useSessionSpy: MockInstance;
  let getOrdersSpy: MockInstance;

  const mockNavigate = vi.fn();
  
  beforeEach(() => { 
    useSessionSpy = vi.spyOn(AuthContext, 'useSession');
    getOrdersSpy = vi.spyOn(OrderService, 'getOrders');
    (ReactRouter.useNavigate as Mock).mockReturnValue(mockNavigate);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('debería mostrar un error', async () => {
    useSessionSpy.mockReturnValue({ user: {id: 1} });
    getOrdersSpy.mockRejectedValue(new Error('Api error'));
    const { result } = renderHook(() => useOrders());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.loading).toBe(false);

    expect(result.current.error).toBe('Failed to fetch orders. Please try again later.');
    expect(getOrdersSpy).toHaveBeenCalledTimes(1);
  })
})
```
</details>

## Mock Service Worker (MSW)

<details>

Las Api son impredecibles, un error puede causar que todo falle.

Mock Service Worker (MSW) es una librería de interceptación de red configura un service worker para que escuche las peticiones Http.

Un service worker es un script que se ejecuta en segundo plano en el navegador.

Características:

- Funciona en ambiente de pruebas y en ambiente de desarrollo
- Intercepta request a nivel de red
- Mantiene el código de producción intacto
- Soporta REST, GraphQL, y otros protocolos

Vamos a realizar la configuración de MSW en nuestro proyecto.

```bash
npm install msw --save-dev
```
```ts
// /setupTest.ts
import '@testing-library/jest-dom';
import {afterAll, afterEach, beforeAll} from 'vitest';
import {server} from './mocks/server'

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers()); 
afterAll(() => server.close());
```
```ts
// /mocks/handlers.ts
import {http, HttpResponse} from 'msw' ;

export const handlers = [
  http.get('http://localhost:3001/orders', () => {
    return HttpResponse.json([
      {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "customer": {
        "id": "60d07f61-99bf-4b90-955b-5d3a7c9bb3d4",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "products": [
        {
          "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
          "name": "Laptop",
          "price": 999.99,
          "quantity": 1
        },
        {
          "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
          "name": "Mouse",
          "price": 29.99,
          "quantity": 1
        }
      ],
      "total": 1029.98,
      "status": "delivered",
      "orderDate": "2023-10-01T10:00:00Z",
      "shippingAddress": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zipCode": "12345",
        "country": "USA"
      },
      "paymentMethod": "credit_card"
      },
    ])
  })
];
```
```ts
// /mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```
</details>

## Testing de APIs Externas con MSW

<details>

Vamos a probar el hook useOrders no con Mocks ni con Spies sino con MSW.


```tsx
// /src/hooks/useOrdersMsw.test.tsx
import {describe, it, expect, vi, beforeEach, Mock} from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import {SessionProvider, useSession} from '../context/AuthContext'; 
import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import useOrders from './useOrders';
import {http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

vi.mock('../context/AuthContext', async () => {
  const actual = await vi.importActual('../context/AuthContext');
  return {
    ...actual,
    useSession: vi.fn()
  }
});

describe('useOrders MSW', () => { 
  const mockUser = {id: '1', name: 'John Doe'};

  beforeEach(() => {
    (useSession as Mock).mockReturnValue({user: mockUser});
  });

  const wrapper = ({children}: {children: React.ReactNode}) => (
    <SessionProvider>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </SessionProvider>
  );

  it('debería obtener los datos' , async () => {
    const { result } = renderHook(() => useOrders(), {wrapper});
    const initialLoading = result.current.loading;

    expect(initialLoading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    
    const lengthOrders = result.current.orders.length;
    expect(lengthOrders).toBe(1);
  });

  it('debería mostrar un error', async () => {
    server.use(
      http.get('http://localhost:3001/orders', () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: 'Internal Server Error'
        });
      })
    );

    const { result } = renderHook(() => useOrders(), {wrapper});
    const initialLoading = result.current.loading;

    expect(initialLoading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.loading).toBe(false);
    
    expect(result.current.error).toBe('Failed to fetch orders. Please try again later.');
  });
});

```
</details>

## Innovación en Testing con IA

<details>

**<mark>Prompt:</mark>** Actúa como un desarrollador front-end con gran experiencia haciendo testing en aplicaciones react con react testing library, como testrunner usarás vitest de la mano de react testing library para ejecutar test en los componentes, te pasaré un componente en el que necesito que me ayudes a hacer los casos de prueba.

import { StatusBadge } from "../../components/StatusBadge";
import { Order } from "../../types/Orders";
import classes from "./OrderItem.module.scss";

export const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={classes.OrderItem}>
      <div className={classes.OrderItem__header}>
        <h3 className={classes.OrderItem__id}>Order #{order.id.slice(0, 8)}</h3>
        <p className={classes.OrderItem__date}>{formatDate(order.orderDate)}</p>
        <StatusBadge status={order.status} />
      </div>
      <div className={classes.OrderItem__customer}>
        <p className={classes.OrderItem__customerName}>{order.customer.name}</p>
        <p className={classes.OrderItem__customerEmail}>
          {order.customer.email}
        </p>
      </div>
      <div className={classes.OrderItem__products}>
        <h4 className={classes.OrderItem__productsTitle}>Order Items:</h4>
        <ul className={classes.OrderItem__productsList}>
          {order.products.map((product) => (
            <li key={product.id} className={classes.OrderItem__productsItem}>
              <span>
                {product.name} x{product.quantity}
              </span>
              <span>${(product.price * product.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.OrderItem__footer}>
        <div className={classes.OrderItem__payment}>
          <p className={classes.OrderItem__paymentLabel}>Payment Method</p>
          <p className={classes.OrderItem__paymentMethod}>
            {order.paymentMethod.replace("_", " ")}
          </p>
        </div>
        <div className={classes.OrderItem__total}>
          <p className={classes.OrderItem__totalLabel}>Total Amount</p>
          <p className={classes.OrderItem__totalAmount}>
            ${order.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

```tsx
// /src/components/OrderItem/OrderItem.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { OrderItem } from './OrderItem';

// Mock del componente StatusBadge
vi.mock("../../components/StatusBadge", () => ({
  StatusBadge: ({ status }: { status: string }) => <span>{status}</span>,
}));

const mockOrder = {
  id: "12345678abcdef",
  orderDate: "2025-01-01T12:34:56Z",
  status: "Pending",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  products: [
    { id: "1", name: "Product A", quantity: 2, price: 10.0 },
    { id: "2", name: "Product B", quantity: 1, price: 20.0 },
  ],
  paymentMethod: "CREDIT_CARD",
  total: 40.0,
};

describe("OrderItem Component", () => {
  it("renders the order ID correctly", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText(/Order #12345678/)).toBeInTheDocument();
  });

  it("renders the customer's name and email", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("renders the status badge with the correct status", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("renders the list of products with correct details", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText("Product A x2")).toBeInTheDocument();
  });

  it("renders the payment method correctly", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText("Payment Method")).toBeInTheDocument();
    expect(screen.getByText("CREDIT CARD")).toBeInTheDocument();
  });

  it("renders the total amount correctly", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText("Total Amount")).toBeInTheDocument();
    expect(screen.getByText("$40.00")).toBeInTheDocument();
  });
});
```

</details>

## Test Coverage en React

<details>

Existen varios tipos de cobertura de pruebas:

- **Statement Coverage:** Mide la cantidad de código que se ejecuta durante las pruebas.
- **Branch Coverage:** Mide la cantidad de ramas que se ejecutan durante las pruebas.
- **Function Coverage:** Mide la cantidad de funciones que se ejecutan durante las pruebas.
- **Line Coverage:** Mide la cantidad de líneas que se ejecutan durante las pruebas. Es similar al preimero pero mide a nivel de líneas.

Configuremos el test coverage en nuestro proyecto.

```bash
npm install --save-dev @vitest/coverage-v8
```

```json
// package.json
...
{
  ...
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
...
```
```bash
npm run coverage
```
```bash
-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------|---------|----------|---------|---------|-------------------
All files                    |    83.6 |    80.59 |   70.37 |    83.6 |                   
 src                         |       0 |        0 |       0 |       0 |                   
  App.tsx                    |       0 |        0 |       0 |       0 | 1-15              
  main.tsx                   |       0 |        0 |       0 |       0 | 1-14              
 src/components/Button       |     100 |      100 |     100 |     100 |                   
  Button.tsx                 |     100 |      100 |     100 |     100 |                   
  index.ts                   |     100 |      100 |     100 |     100 |                   
 src/components/Contador     |     100 |      100 |     100 |     100 |                   
  Contador.tsx               |     100 |      100 |     100 |     100 |                   
 src/components/OrderItem    |     100 |      100 |     100 |     100 |                   
  OrderItem.tsx              |     100 |      100 |     100 |     100 |                   
  index.ts                   |     100 |      100 |     100 |     100 |                   
 src/components/OrderSummary |     100 |      100 |     100 |     100 |                   
  OrderSummary.tsx           |     100 |      100 |     100 |     100 |                   
  index.ts                   |     100 |      100 |     100 |     100 |                   
 src/components/StatusBadge  |     100 |      100 |     100 |     100 |                   
  StatusBadge.tsx            |     100 |      100 |     100 |     100 |                   
  index.ts                   |     100 |      100 |     100 |     100 |                   
 src/components/experimental |     100 |      100 |     100 |     100 |                   
  Calculator.tsx             |     100 |      100 |     100 |     100 |                   
 src/containers/Login        |   98.79 |    86.66 |      50 |   98.79 |                   
  Login.tsx                  |     100 |    92.85 |     100 |     100 | 52                
  index.ts                   |       0 |        0 |       0 |       0 | 1                 
 src/containers/Orders       |   81.48 |     62.5 |      50 |   81.48 |                   
  Orders.tsx                 |   84.61 |    71.42 |     100 |   84.61 | 12-13,20-21       
  index.ts                   |       0 |        0 |       0 |       0 | 1                 
 src/context                 |   83.33 |       75 |      75 |   83.33 |                   
  AuthContext.tsx            |   83.33 |       75 |      75 |   83.33 | 26-27,39-40       
 src/hooks                   |   94.11 |    85.71 |     100 |   94.11 |                   
  useOrders.ts               |   94.11 |    85.71 |     100 |   94.11 | 16-17             
 src/mocks                   |     100 |      100 |     100 |     100 |                   
  handlers.ts                |     100 |      100 |     100 |     100 |                   
  server.ts                  |     100 |      100 |     100 |     100 |                   
 src/services                |   26.08 |    33.33 |      25 |   26.08 |                   
  callBooks.ts               |       0 |        0 |       0 |       0 | 1-5               
  contants.ts                |     100 |      100 |     100 |     100 |                   
  getAuth.ts                 |       0 |        0 |       0 |       0 | 1-17              
  getOrders.ts               |     100 |    66.66 |     100 |     100 | 10                
  getUsers.ts                |       0 |        0 |       0 |       0 | 1-21              
 src/types                   |       0 |        0 |       0 |       0 |                   
  Orders.ts                  |       0 |        0 |       0 |       0 |                   
 src/utils                   |     100 |      100 |     100 |     100 |                   
  sumamry.ts                 |     100 |      100 |     100 |     100 |                   
  validateRole.ts            |     100 |      100 |     100 |     100 |                   
-----------------------------|---------|----------|---------|---------|-------------------
```

Dentro del proyecto se generó la carpeta coverage con un archivo index.html que nos muestra la cobertura de las pruebas.

![alt text](/astro-doc-full-stack/images/react/react-testing-library/coverage.png)

Debemos agregar coverage al archivo .gitignore para que no se suba al repositorio.

Finalmente, podemos modificar el archivo vitest.config.ts para excluir archivos de la cobertura, e indicaremos que queremos un coberage del 85% en funciones.

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTest.ts'],
    coverage: {
      exclude: [
        '**/*.config.ts', 
        '**/*.config.js', 
        '**/*.type.ts',
        '**/*.d.ts',
        '**/types',
        '**/App.tsx',
        '**/main.tsx',
      ],
      thresholds: {
        functions: 85, 
      }
    }
  },
});
```
</details>

## Estrategias de Testing: Cuándo no debes hacer Testing

<details>

Cuando no es necesario hacer testing:

- Cuando se está en una fase experimental
- Cuando el proyecto es a muy corto plazo

</details>