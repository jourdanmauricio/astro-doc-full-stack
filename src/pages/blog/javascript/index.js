function Student(name, age, cursosAprobados) {
  // Atributos
  this.name = name;
  this.age = age;
  this.cursosAprobados = cursosAprobados;

  // Métodos
  // Esta es una forma de crear métodos, pero también podemos
  // realizarlo desde afuera de la función
  this.aprovarCurso = function (nuvoCurso) {
    this.cursosAprobados.push(nuvoCurso);
  };
}

// Creamos un método desde fuera de la función
Student.prototype.aprovarCurso2 = function (nuvoCurso) {
  this.cursosAprobados.push(nuvoCurso);
};

// Creamos una instancia para Juana
const juana = new Student('Juana', 15, [
  'Curso de introducción a Videojuegos',
  'Curso de creación de personajes',
]);

console.log(juana);

const natalia = {
  name: 'Natalia',
  age: 20,
  cursosAprobados: ['Curso de HTML y CSS', 'Curso práctico de HTML y CSS'],
  // aprovarCurso: function() {
  // }
  // También se puede escribir:
  aprovarCurso(nuevoCurso) {
    this.cursosAprobados.push(nuvoCurso);
  },
};

console.log(natalia);
