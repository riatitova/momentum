const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  foc = document.getElementById("foc");

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
];
let arr_ = [...images].sort((_) => Math.random() * 2 - 1);
let i = 0;
let src = "img/";
const base = "img/";
const btn = document.querySelector(".btn");
const blockquote = document.querySelector("blockquote");
const figcaption = document.querySelector("figcaption");
const btnQuote = document.querySelector(".quote");

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    date = today.getDate();

  var options = { weekday: "long", month: "long", day: "numeric" };
  let day = new Intl.DateTimeFormat("en-GB", options).format(today);

  //output time
  time.innerHTML = `${day}<br>${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}
function getDayTime() {
  let today = new Date(),
    hour = today.getHours();

  if (hour >= 6 && hour < 12) {
    return "morning";
  } else if (hour < 18) {
    return "afternoon";
  } else if (hour < 24) {
    return "evening";
  } else {
    return "night";
  }
}
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour >= 6 && hour < 12) {
    //morning
    document.body.style.backgroundImage = "url(img/morning/1.jpg)";
    greeting.textContent = "Good morning, ";
  } else if (hour < 18 && hour >= 12) {
    //afternoon
    document.body.style.backgroundImage = "url(img/afternoon/1.jpg)";
    greeting.textContent = "Good afternoon, ";
  } else if (hour < 24 && hour >= 18) {
    //evening
    document.body.style.backgroundImage = "url(img/evening/1.jpg)";
    greeting.textContent = "Good evening, ";
    document.body.style.color = "white";
  } else {
    //night
    document.body.style.backgroundImage = "url(img/night/1.jpg)";
    greeting.textContent = "Good night, ";
    document.body.style.color = "white";
  }
}

function viewBgImage(data) {
  const body = document.querySelector("body");
  if (
    i == 0 &&
    !src.includes("morning") &&
    !src.includes("afternoon") &&
    !src.includes("evening") &&
    !src.includes("night")
  ) {
    src = base + "morning/" + data;
  }
  const img = document.createElement("img");
  img.src = src;
  console.log(src, i);

  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };

  src = src.replace(data, "");

  if (i == 10 && src.includes("morning")) {
    i = 0;
    src = base + "afternoon/";
  } else if (i == 10 && src.includes("afternoon")) {
    i = 0;
    src = base + "evening/";
  } else if (i == 10 && src.includes("evening")) {
    i = 0;
    src = base + "night/";
  } else if (src.includes("morning") && i !== 10 && i > 0) {
    src = base + "morning/";
  }

  if (src.includes("afternoon") && i !== 10 && i !== 0) {
    src = base + "afternoon/";
  }
  if (src.includes("evening") && i !== 10 && i !== 0) {
    src = base + "evening/";
  }
  if (src.includes("night") && i !== 10 && i !== 0) {
    src = base + "night/";
  }
  if (i == 11) {
    i = 0;
    src = "img/";
  }

  src += data;
}

function getImage() {
  const index = i % images.length;
  let imageSrc = images[index];
  viewBgImage(imageSrc);
  i++;
  btn.disabled = true;
  setTimeout(function () {
    btn.disabled = false;
  }, 1000);
}

btn.addEventListener("click", getImage);

function getName() {
  if (
    localStorage.getItem("name") === null ||
    localStorage.getItem("name") === ""
  ) {
    name.textContent = "[Enter name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function setName(e) {
  if (e.type === "focus") {
    name.textContent = "";
  }
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
  if (
    localStorage.getItem("name") === "" &&
    e.type !== "focus" &&
    e.type !== "keypress"
  ) {
    name.textContent = "[Enter name]";
  }
}

function getFoc() {
  if (
    localStorage.getItem("foc") === null ||
    localStorage.getItem("foc") === ""
  ) {
    foc.textContent = "[Enter focus]";
  } else {
    foc.textContent = localStorage.getItem("foc");
  }
}

function setFoc(e) {
  if (e.type === "focus") {
    foc.textContent = "";
  }
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("foc", e.target.innerText);
      foc.blur();
    }
  } else {
    localStorage.setItem("foc", e.target.innerText);
  }
  if (
    localStorage.getItem("foc") === "" &&
    e.type !== "focus" &&
    e.type !== "keypress"
  ) {
    foc.textContent = "[Enter focus]";
  }
}
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
name.addEventListener("focus", setName);
foc.addEventListener("keypress", setFoc);
foc.addEventListener("blur", setFoc);
foc.addEventListener("focus", setFoc);

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener("DOMContentLoaded", getQuote);
btnQuote.addEventListener("click", getQuote);

function setCity(event) {
  if (event.code === "Enter") {
    if (city.textContent != "") {
      localStorage.setItem("city", event.target.innerText);
      getWeather();
    } else {
      city.textContent = "Enter city";
    }

    city.blur();
  }
}

async function getWeather() {
  if (
    localStorage.getItem("city") === "" ||
    localStorage.getItem("city") === undefined
  ) {
    city.textContent = "[Enter city]";
  } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem(
      "city"
    )}&lang=en&appid=5ee1d8fbc64f743ff0e4d3a176a515c2&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
      city.textContent = "[Enter city]";
      alert("Enter another city");
    } else {
      city.textContent = localStorage.getItem("city");
      weatherIcon.className = "weather-icon owf";
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°C`;
      humidity.textContent = `humidity: ${data.main.humidity}%`;
      wind.textContent = `wind: ${data.wind.speed} m/sec`;
      weatherDescription.textContent = data.weather[0].description;
    }
  }
}
getWeather();
document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
//run
showTime();
setBgGreet();
getName();
getFoc();
