"use strict";

var numbers = [2, 4, 3, 6, 7, 9];
var evenNumbers = numbers.filter(function (num) {
  return num % 2 === 0;
});
console.log(evenNumbers);