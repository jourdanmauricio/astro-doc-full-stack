const isPalindrome = (x) => {
  const number = x.toString();
  let res = true;
  for (let i = 0; i < number.length; i++) {
    if (number[i] !== number[number.length - i - 1]) res = false;
  }
  return res;
};

const isPalindrome2 = (x) => {
  const cadena = x.toString();
  const array = cadena.split('');
  const reverse = array.reverse();
  return cadena === reverse.join('');
};

console.time('dos');
console.log(isPalindrome2(100000000000000000000001));
console.timeEnd('dos');

console.time('uno');
console.log(isPalindrome(100000000000000000000001));
console.timeEnd('uno');

/* 
Comencé a ejercitar sobre Leetcode. Empecé por el más simple: isPalidrome

Me propuse resolverlo sin ayuda con este resultado:

const isPalindrome = (x) => {
  const number = x.toString();
  let res = true;
  for (let i = 0; i < number.length; i++) {
    if (number[i] !== number[number.length - i - 1]) res = false;
  }
  return res;
};

Pero será optimo? Entiendo que se puede optimizar. Es necerio recorrer todo el array? Busqué otra solución y encontré:

const isPalindrome2 = (x) => {
  const cadena = x.toString();
  const array = cadena.split('');
  const reverse = array.reverse();
  return cadena === reverse.join('');
};

Cuál es más performante? Pensé, debería analizarlo con notación asintótica (https://www.youtube.com/watch?v=IZgOEC0NIbw).

Y Gemini que puede aportar?

////////
Cuál de las siguientes dos funciones es más óptima en cuanto a coste de procesamiento y memoria:
const isPalindrome = (x) => {
  const number = x.toString();
  let res = true;
  for (let i = 0; i < number.length; i++) {
    if (number[i] !== number[number.length - i - 1]) res = false;
  }
  return res;
};

const isPalindrome2 = (x) => {
  const cadena = x.toString();
  const array = cadena.split('');
  const reverse = array.reverse();
  return cadena === reverse.join('');
};
////////


Respuesta:

La función isPalindrome es más óptima en cuanto a coste de procesamiento y memoria que la función isPalindrome2.

Análisis de costes:

isPalindrome:

Procesamiento:
Conversión de número a cadena: O(1)
Bucle de comparación: O(n/2)
Total: O(n)
Memoria:
Cadena: O(n)
Variable booleana: O(1)
Total: O(n)
isPalindrome2:

Procesamiento:
Conversión de número a cadena: O(1)
Conversión de cadena a array: O(n)
Invertir array: O(n)
Conversión de array a cadena: O(n)
Comparación de cadenas: O(n)
Total: O(5n)
Memoria:
Cadena: O(n)
Array: O(n)
Variable booleana: O(1)
Total: O(2n)
Conclusión:

isPalindrome es 5 veces más rápida en cuanto a procesamiento.
isPalindrome requiere la mitad de memoria.
Explicación:

La función isPalindrome recorre la cadena de caracteres solo una vez, comparando cada caracter con su opuesto. En cambio, la función isPalindrome2 realiza varias conversiones y operaciones adicionales que aumentan el tiempo de procesamiento y la memoria utilizada.

Ejemplo:

Para una cadena de 100 caracteres:

isPalindrome:
Procesamiento: 100 comparaciones
Memoria: 100 caracteres + 1 booleano

isPalindrome2:
Procesamiento: 500 operaciones
Memoria: 100 caracteres + 100 elementos de array + 1 booleano

En resumen, la función isPalindrome es la mejor opción si se busca una solución eficiente en cuanto a tiempo y memoria.
*/
