"use strict";

let city = document.querySelector(" .city");
let now = new Date();
let date = document.querySelector(".data");
let temp = document.querySelector(".temp");
let havo = document.querySelector(".weater");
let polniy = document.querySelector(".polniy");

const Api = {
  key: "a0fa15435608ce63aca59464d4cc3fb1",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

let search = document.querySelector(".search-box");

search.addEventListener("keypress", getQuery);

function getQuery(e) {
  if (e.keyCode == 13) {
    getResults(search.value);
    console.log(search.value);
    search.value = "";
  }
}

function getResults(query) {
  fetch(`${Api.baseurl}weather?q=${query}&units=metric&APPID=${Api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
}

function displayResult(weather) {
  console.log(weather);
  city.innerHTML = `${weather.name}`;

  // html file ga datalarni qo'shamiz
  date.innerHTML = dataBuild(now);

  // temperaturani qo'shamiz
  temp.innerHTML = `${Math.round(weather.main.temp)}°C `;

  // ob havoni kiritamiz
  havo.innerHTML = `${weather.weather[0].main}`;

  // polniy kun davomidagini ko'ramiz
  polniy.innerHTML = `${Math.round(weather.main.temp_min)} °C / ${Math.round(
    weather.main.temp_max
  )} °C`;
}

function dataBuild(s) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
