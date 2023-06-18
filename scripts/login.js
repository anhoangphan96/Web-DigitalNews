"use strict";
//Khai báo các biến sẽ sử dụng
let userArr = JSON.parse(getFromStorage("userArr", "[]"));
const loginbtn = document.querySelector("#btn-submit");
const inputusername = document.querySelector("#input-username");
const inputpassword = document.querySelector("#input-password");
//Xây dựng hàm kiểm tra username và password có tồn tại và đúng trên database chưa
const checkuser = function (data) {
  let usercorrect = false;
  for (let i = 0; i < userArr.length; i++) {
    if (
      data.username === userArr[i].username &&
      data.password === userArr[i].password
    ) {
      usercorrect = true;
      break;
    }
  }
  return usercorrect;
};

//Xây dựng hàm validate dữ liệu người dùng
const validate = function (data) {
  if (data.username && data.password && checkuser(data)) {
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
        //Check xem Username có tồn tại hay không, nếu có tồn tại thì do nhập password sai còn nếu không thì do username không tòn tại
        if (!checkuser(data)) {
          let usernameexis = false;
          for (let i = 0; i < userArr.length; i++) {
            if (data.username === userArr[i].username) {
              document.getElementById(`errpassword`).textContent =
                "Your password is incorrect";
              document
                .getElementById(`errpassword`)
                .classList.add("errorinput");
              usernameexis = true;
              break;
            }
          }
          if (!usernameexis) {
            document.getElementById(`errusername`).textContent =
              "Your username is not existing";
            document.getElementById(`errusername`).classList.add("errorinput");
          }
        }
      }
    }
  }
};
// Xây dựng sự kiện khi nhấn vào nút đăng nhập lấy dữ liệu input người dùng đi validate và tạo ra current User trong data base
loginbtn.addEventListener("click", function () {
  const data = {
    username: inputusername.value,
    password: inputpassword.value,
  };
  const validatedata = validate(data);
  if (validatedata) {
    let currentUser = [data];
    saveToStorage("currentUser", JSON.stringify(currentUser));
    window.location.href = "../index.html";
  }
});
