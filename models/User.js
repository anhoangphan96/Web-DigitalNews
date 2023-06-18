"use strict";

//Tạo class User và các phương thức để kế thừa

class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
  getNews(country, category, pageSize, page, apiKey) {
    return fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
  }
  searchNews(keyword, pageSize, page, apiKey) {
    return fetch(
      `https://newsapi.org/v2/everything?pageSize=${pageSize}&page=${page}&apiKey=${apiKey}&q=${keyword}`
    );
  }
}
