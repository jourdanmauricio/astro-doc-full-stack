const array = [1, 2, 3, 4, 5];

// Filtrar los números pares
const arrayPares = array.filter((numero) => numero % 2 === 0);
console.log(arrayPares); // [2, 4]

// Filtrar los números mayores a 3
const arrayMayores3 = array.filter((numero) => numero > 3);
console.log(arrayMayores3); // [4, 5]

const arrayMayores8 = array.filter((numero) => numero > 8);
console.log(arrayMayores8); // []
