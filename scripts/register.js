"use strict";

//Khai báo các biến sẽ sử dụng
let userArr = JSON.parse(getFromStorage("userArr", "[]"));
//Khai báo các biến sử dụng DOM trên các phần tử html
const submitBtn = document.querySelector("#btn-submit");
const inputsubmitBtn = document.querySelector("#btn-submit");
const inputfirstName = document.querySelector("#input-firstname");
const inputlastname = document.querySelector("#input-lastname");
const inputusername = document.querySelector("#input-username");
const inputpassword = document.querySelector("#input-password");
const inputpasswordconfirm = document.querySelector("#input-password-confirm");
//Xây dựng function kiểm tra xem username đã tồn tại hay chưa
const usernamevalidate = function (data) {
  let usernameexis = false;
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username === data.username) {
      usernameexis = true;
      break;
    }
  }
  return usernameexis;
};
//Xây dựng function validate data khi tạo user
const validate = function (data) {
  if (
    data.firstName &&
    data.lastname &&
    data.username &&
    !usernamevalidate(data) &&
    data.password &&
    data.passwordconfirm &&
    data.password === data.passwordconfirm &&
    data.password.length >= 8
  ) {
    for (let value in data) {
      document.getElementById(`err${value}`).textContent = "";
      document.getElementById(`err${value}`).classList.remove("errorinput");
    }

    return data;
  } else {
    for (let value in data) {
      //Sử dụng dom travesing từ phần tử có id err ứng với từng value để lấy và chỉnh sửa nội dung hiển thị
      if (!data[value]) {
        let nameoffield = document.getElementById(`err${value}`).parentElement
          .previousSibling.previousSibling.textContent;
        document.getElementById(
          `err${value}`
        ).textContent = `Please input for this ${nameoffield}`;
        document.getElementById(`err${value}`).classList.add("errorinput");
      } else {
        document.getElementById(`err${value}`).textContent = "";
        document.getElementById(`err${value}`).classList.remove("errorinput");
        if (usernamevalidate(data)) {
          document.getElementById(`errusername`).textContent =
            "This username is existing, please choose the other!";
          document.getElementById(`errusername`).classList.add("errorinput");
        } else {
          document.getElementById(`errusername`).textContent = "";
          document.getElementById(`errusername`).classList.remove("errorinput");
        }
        if (data.password.length <= 8) {
          document.getElementById(`errpassword`).textContent =
            "The password should be more than 8 characters";
          document.getElementById(`errpassword`).classList.add("errorinput");
        } else {
          document.getElementById(`errpassword`).textContent = "";
          document.getElementById(`errpassword`).classList.remove("errorinput");
        }
        if (data.password !== data.passwordconfirm) {
          document.getElementById(`errpasswordconfirm`).textContent =
            "The confirm password should be the same to pass word";
          document
            .getElementById(`errpasswordconfirm`)
            .classList.add("errorinput");
        } else {
          document.getElementById(`errpasswordconfirm`).textContent = "";
          document
            .getElementById(`errpasswordconfirm`)
            .classList.remove("errorinput");
        }
      }
    }
  }
};

//Xây dựng sự kiện khi nhấn vào nút submit: valid data, khởi tạo user, thêm user vào mảng, chuyển đến màn hình login.
submitBtn.addEventListener("click", function () {
  const data = {
    firstName: inputfirstName.value,
    lastname: inputlastname.value,
    username: inputusername.value,
    password: inputpassword.value,
    passwordconfirm: inputpasswordconfirm.value,
  };
  const validatedata = validate(data);
  if (validatedata) {
    const userdata = new User(
      data.firstName,
      data.lastname,
      data.username,
      data.password
    );
    userArr.push(userdata);
    saveToStorage("userArr", JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  }
});
