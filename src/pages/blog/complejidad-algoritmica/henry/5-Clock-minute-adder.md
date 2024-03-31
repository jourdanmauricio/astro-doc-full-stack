---
layout: '../../../../layouts/SubBlogPostLayout.astro'
title: Ejercicios Algoritmos Henry
date: 11-02-2024
author: Mauricio Jourdán
image:
  {
    src: '/astro-doc-full-stack/images/complejidad-algoritmica/back-henry.webp',
    alt: 'Henry - Algoritmos',
  }
icon:
  {
    src: '/astro-doc-full-stack/images/complejidad-algoritmica/henry-icon.jpeg',
    alt: 'Logo Henry',
  }
description: Ejercicios Algoritmos Henry.
draft: false
category: Algoritmos
---

https://www.soyhenry.com/

## 5. Clock minute adder

**Problem**: Dada una hora en string en formato HH:MM, y un número de minutos. Devolver la nueva hora pasados esos minutos.

**Examples**:

- clockMinuteAdder ('09:00', 20); ouput: '09:20'
- clockMinuteAdder ('01:30', 30); ouput: '02:00'
- clockMinuteAdder ('12:05', 100); ouput: '01:45'

**Constraints**

- El reloj es de 12 horas y tiene que devolverse en el formato HH:MM. Recuerda que no existen las 00hs.

**Solution**:

```js
function clockMinuteAdder(time, minutesToAdd) {
  const [hours, minutes] = time.split(':'); //* [ "09", "00" ]
  //* Total de horas y minutos
  const totalMinutes = Number(minutes) + minutesToAdd;
  const totalHours = Number(hours) + Math.floor(totalMinutes / 60);
  //* Calcular nueva hora y minutos
  const newMinutes = totalMinutes % 60;
  const newHours = ((totalHours - 1) % 12) + 1;
  //* Damos formato HH MM
  const formatMinutes = newMinutes < 10 ? `0${newMinutes}` : newMinutes;
  const formatHours = newHours < 10 ? `0${newHours}` : newHours;

  return `${formatHours}:${formatMinutes}`;
}

console.log(clockMinuteAdder('09:00', 20)); // ('09:20')
console.log(clockMinuteAdder('01:30', 30)); // ('02:00')
console.log(clockMinuteAdder('12:05', 100)); // ('01:45')
console.log(clockMinuteAdder('06:30', 90)); // ('08:00')
console.log(clockMinuteAdder('12:05', 1440)); // ('12:05')
```

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
