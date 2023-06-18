"use strict";
//Khai báo các biến cần sử dụng
const userArr = JSON.parse(getFromStorage("userArr", "[]"));
const currentUser = JSON.parse(getFromStorage("currentUser", "[]"));
let todoArr = JSON.parse(getFromStorage("todoArr", "[]"));
const inputtask = document.getElementById("input-task");
const todoList = document.querySelector("#todo-list");
const btnAdd = document.getElementById("btn-add");
//Nếu người dùng chưa đăng nhập thì thông báo người dùng đăng nhập trước mới được xem và thực hiện todolist
if (currentUser.length === 0) {
  alert("Please kindly login first!");
  window.location.href = "../pages/login.html";
}
//Khai báo class Task
class TaskCl {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
// Xây dựng function hiển thị To do list theo từng username
function todolistrender() {
  todoList.innerHTML = "";
  let todoArrfil = todoArr.filter(
    (arr) => arr.owner === currentUser[0].username
  );
  todoArrfil.forEach((arr) => {
    const everyTask = document.createElement("li");
    everyTask.setAttribute(
      "onclick",
      `taskcomplete('${arr.task}','${arr.owner}')`
    );
    everyTask.innerHTML = `${arr.task}
    <span class="close" onclick=
    "deleteTask('${arr.task}','${arr.owner}')">×</span>
`;
    if (arr.isDone === true) {
      everyTask.classList.add("checked");
    } else {
      everyTask.classList.remove("checked");
    }
    todoList.appendChild(everyTask);
  });
}
//Xây dựng function hoàn thành và chưa hoàn thành toggle task
function taskcomplete(task, owner) {
  //Nếu như khi vị trí click xảy ra event không phải là nút close thì mới thực hiện đánh dấu complete và không complete
  if (!window.event.target.classList.contains("close")) {
    const linodelist = todoList.querySelectorAll("li");
    const indextask = todoArr
      .filter((arr) => arr.owner === currentUser[0].username)
      .findIndex((arr) => {
        return task === arr.task && owner === arr.owner;
      });
    //Vì list node of thẻ li hiển thị theo username nên phải filter list arr task của người dùng trước rồi mới tìm số index. thay đổi thông tin cũng dựa trên list task filter
    linodelist[indextask].classList.toggle("checked");
    if (linodelist[indextask].classList.contains("checked")) {
      todoArr.filter((arr) => arr.owner === currentUser[0].username)[
        indextask
      ].isDone = true;
    } else {
      todoArr.filter((arr) => arr.owner === currentUser[0].username)[
        indextask
      ].isDone = false;
    }
    saveToStorage("todoArr", JSON.stringify(todoArr));
    todolistrender();
  }
}
//Xây dựng function xóa task
function deleteTask(task, owner) {
  const indextask = todoArr.findIndex((arr) => {
    return task === arr.task && owner === arr.owner;
  });
  todoArr.splice(indextask, 1);

  saveToStorage("todoArr", JSON.stringify(todoArr));
  todolistrender();
}

todolistrender();

//Xây dựng sự kiện khi nhấn vào nút add một task mới
btnAdd.addEventListener("click", function () {
  if (inputtask.value) {
    const newTask = new TaskCl(inputtask.value, currentUser[0].username, false);
    todoArr.push(newTask);
    saveToStorage("todoArr", JSON.stringify(todoArr));
  } else {
    alert("Please input Title of your task first!");
  }
  todolistrender();
  inputtask.value = "";
});
