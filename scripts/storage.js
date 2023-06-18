"use strict";
//function save data to storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
//function get data from storage
function getFromStorage(key, defa) {
  return localStorage.getItem(key) ?? defa;
}
