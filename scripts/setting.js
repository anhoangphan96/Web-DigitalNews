"use strict";
//Khai báo các biến DOM để sử dụng
const currentUser = JSON.parse(getFromStorage("currentUser", "[]"));
const userArr = JSON.parse(getFromStorage("userArr", "[]"));
const inputpagesize = document.querySelector("#input-page-size");
const inputcategory = document.querySelector("#input-category");
const btnSubmit = document.querySelector("#btn-submit");
let settingsArr = JSON.parse(getFromStorage("settingsArr", "[]"));
//Nếu người dùng chưa đăng nhập thì thông báo người dùng đăng nhập trước mới được xem và thực hiện todolist
if (currentUser.length === 0) {
  alert("Please kindly login first!");
  window.location.href = "../pages/login.html";
}
//Function validate data input của người dùng phải đúng số pageSize
const errpagesize = document.createElement("p");
function validate(data) {
  if (
    data.pageSize > 0 &&
    Number.isInteger(data.pageSize) &&
    data.pageSize <= 100 //trong API document có quy định pageSize chỉ được tối đa là 100
  ) {
    errpagesize.classList.remove("errorinput");
    errpagesize.textContent = "";
    return data;
  } else {
    inputpagesize.parentNode.appendChild(errpagesize);
    errpagesize.classList.add("errorinput");
    errpagesize.textContent =
      "Please input the positive integer and less than 100";
  }
}
//Function display user' setting khi user quay trở lại trang settings để kiểm tra thông tin mình đang cài đặt hiển thị
const displaySetting = function (settingsArr) {
  let settingcur = settingsArr.filter(
    (arr) => arr.username === currentUser[0].username
  );
  if (settingcur.length > 0) {
    inputpagesize.value = settingcur[0].pageSize;
    inputcategory.value = settingcur[0].category;
  }
};
displaySetting(settingsArr);
//Xây dựng sự kiện khi người dùng nhấn vào nút submit: validate dữ liệu người dùng nhập và tạo ra 1 mảng data với tên settingsArr
//Nếu như người dùng lần đầu chọn setting thì sẽ thêm data vừa tạo vào mảng, còn nếu người dũng chỉnh sửa thì sẽ tìm
//setting tướng ứng của người dùng để ghi đè lên setting cũ
btnSubmit.addEventListener("click", function () {
  const data = {
    username: currentUser[0].username,
    pageSize: Number(inputpagesize.value),
    category: inputcategory.value,
  };
  const validatedata = validate(data);
  if (validatedata) {
    if (
      settingsArr.filter((arr) => arr.username === currentUser[0].username)
        .length
    ) {
      const settingid = settingsArr.findIndex(
        (arr) => arr.username === currentUser[0].username
      );
      settingsArr.splice(settingid, 1, data);
    } else {
      settingsArr.push(data);
    }

    saveToStorage("settingsArr", JSON.stringify(settingsArr));
  }
});
