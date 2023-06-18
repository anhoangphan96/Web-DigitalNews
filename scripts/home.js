"use strict";
//Khai báo các biến sẽ sử dụng
let userArr = JSON.parse(getFromStorage("userArr", "[]"));
const currentUser = JSON.parse(getFromStorage("currentUser", "[]"));
const loginmodal = document.getElementById("login-modal");
const maincontent = document.getElementById("main-content");
const welcomemessage = document.getElementById("welcome-message");
const btnLogout = document.querySelector("#btn-logout");

//Xây dựng logic hiển thị trang home( đăng nhập thì hiện welcome còn chưa thì hiện nút đăng ký or đăng nhập)
if (currentUser.length !== 0) {
  loginmodal.classList.add("hidden");
  maincontent.classList.remove("hidden");
  const firstName = userArr.filter((user) => {
    return user.username === currentUser[0].username;
  })[0].firstName;
  welcomemessage.textContent = `Welcome ${firstName}`;
} else {
  loginmodal.classList.remove("hidden");
  maincontent.classList.add("hidden");
}

//Xây dựng sự kiện khi nhấn vào nút logout
btnLogout.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "./pages/login.html";
});
