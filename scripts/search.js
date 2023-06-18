"use strict";
const currentUser = JSON.parse(getFromStorage("currentUser", "[]"));
const userArr = JSON.parse(getFromStorage("userArr", "[]"));
let settingsArr = JSON.parse(getFromStorage("settingsArr", "[]"));
const btnprev = document.querySelector("#btn-prev");
const pagenum = document.querySelector("#page-num");
const btnnext = document.querySelector("#btn-next");
const newscontainer = document.querySelector("#news-container");
const inputquery = document.querySelector("#input-query");
const btnsubmit = document.querySelector("#btn-submit");
//Nếu người dùng chưa đăng nhập thì thông báo người dùng đăng nhập trước mới được xem và thực hiện todolist
if (currentUser.length === 0) {
  newscontainer.classList.add("hidden");
  alert("Please kindly login first!");
  window.location.href = "../pages/login.html";
}
let keyword = "";
let pagecurr = 1;
let totalre;
//Khi người dùng chưa chọn thông số pageSize ở setting thì cho giá trị mặc định là 3
let pageSize =
  settingsArr.filter((arr) => arr.username === currentUser[0].username).length >
  0
    ? settingsArr.filter((arr) => arr.username === currentUser[0].username)[0]
        .pageSize
    : 3;
const usercurarr = userArr.filter((user) => {
  return user.username === currentUser[0].username;
})[0];
// tạo một object user current từ class user và data của usercurrent từ local storage
const usercur = new User(
  usercurarr.firstName,
  usercurarr.lastName,
  usercurarr.username,
  usercurarr.password
);
//function check pagenum để hiển thị và ẩn previous, next button
const checkpagenum = function (pageSize, totalresult) {
  if (pagecurr === 1) {
    pagenum.textContent = pagecurr;
    btnprev.classList.add("hidden");
  } else if (pagecurr < Math.ceil(totalresult / pageSize) && pagecurr !== 1) {
    pagenum.textContent = pagecurr;
    btnprev.classList.remove("hidden");
    btnnext.classList.remove("hidden");
  } else if (pagecurr === Math.ceil(totalresult / pageSize)) {
    pagenum.textContent = Math.ceil(totalresult / pageSize);
    btnnext.classList.add("hidden");
  }
};
// Xây dựng hàm display tin tức bằng async await, gọi tới phương thức searchNews chứa promise xử lý data lấy từ api
async function displayNews(keyword, pageSize, page, apiKey) {
  try {
    const request = await usercur.searchNews(keyword, pageSize, page, apiKey);
    const dataNews = await request.json();
    totalre = dataNews.totalResults;
    checkpagenum(pageSize, totalre);
    //Nếu như status của dữ liệu get ra không phải ok mà là lỗi thì sẽ lấy message của dữ liệu lỗi tạo ra 1 lỗi bằng hàm tạo Error
    if (dataNews.status !== "ok") {
      throw new Error(dataNews.message);
    }
    newscontainer.innerHTML = "";
    for (let i = 0; i < pageSize; i++) {
      if (dataNews.articles[i]) {
        const htmlcode = ` <div class="card flex-row flex-wrap">
        <div class="card mb-3" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                src=${
                  dataNews.articles[i].urlToImage ??
                  "../picture/picture-not-available.jpg"
                }
                class="card-img"
                alt="${dataNews.articles[i].title}"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                  ${dataNews.articles[i].title}
                </h5>
                <p class="card-text">
                ${dataNews.articles[i].description}
                </p>
                <a
                  href=${dataNews.articles[i].url}
                  class="btn btn-primary"
                  >View</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>`;
        newscontainer.insertAdjacentHTML("beforeEnd", htmlcode);
      }
    }
  } catch (err) {
    alert(err.message);
  }
}
// check số trang khi vừa vào để hiển thị đang ở trang 1 sẽ ẩn nút previous và display news theo bộ tham số
checkpagenum();
// Xây dựng sự kiện khi người dùng nhấn vào nút search người dùng phải nhập từ khóa mới được search
btnsubmit.addEventListener("click", function () {
  if (inputquery.value) {
    keyword = inputquery.value;
    checkpagenum();
    displayNews(
      keyword,
      pageSize,
      pagecurr,
      "709d922c3d694a3cb63e5cd2b4984c6d"
    );
  } else {
    alert("Please input your keyword to search!");
  }
});
// Xây dựng sự kiện khi nhấn vào nút next
btnnext.addEventListener("click", function () {
  pagecurr++;
  if (pagecurr <= Math.ceil(totalre / pageSize)) {
    displayNews(
      keyword,
      pageSize,
      pagecurr,
      "709d922c3d694a3cb63e5cd2b4984c6d"
    );
  } else {
    pagecurr = Math.ceil(totalre / pageSize);
  }
});
// Xây dựng sự kiện khi nhấn vào nút previous
btnprev.addEventListener("click", function () {
  pagecurr--;
  if (pagecurr >= 1) {
    displayNews(
      keyword,
      pageSize,
      pagecurr,
      "709d922c3d694a3cb63e5cd2b4984c6d"
    );
  } else {
    pagecurr = 1;
  }
});
