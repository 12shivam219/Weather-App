let info_city = document.getElementById("search");
let inf = document.querySelector(".error");
let url, v;

WIcon = document.querySelector("ic-img")
info_city.addEventListener("search", () => {
  v = info_city.value;
  City(v);
  info_city.value = "";
  info_city.style.display = "none"
  document.getElementById('loader').style.display = "block"
})

function City(i) {
  url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + i;
  fetchData();
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '020f2179ccmsh47de42fef060feap1551e5jsn41553996a736',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

function fetchData() {

  fetch(url, options).then(function (response) {
    if (response.ok) {
      document.getElementsByTagName("header")[0].style.display = "none";
      document.getElementsByTagName("main")[0].style.display = "flex";
      return response.json();
    }
    else {
      inf.innerHTML = `${v} is'nt valid city name`;
      setTimeout(() => {
        inf.style.display="none"
      }, 2000);
      document.getElementsByTagName("header")[0].style.display = "flex";
      info_city.style.display = "inline-block"
      document.getElementById('loader').style.display = "none"
      document.getElementsByTagName("main")[0].style.display = "none";
      throw new Error("Something Wrong");
    }
  })
    .then(data => weatherDetails(data))
    .catch(function (err) {
      console.log(err);
    });

}



function weatherDetails(info) {

  const city = v;
  const temp = info.temp;
  const feels=info.feels_like;
  const hum=info.humidity;

  document.querySelector(".city").innerHTML=city;
  document.querySelector(".h1").innerHTML=`${temp}<sup> &#8451;</sup>`;
  document.querySelector(".numb1").innerHTML=`${feels}<sup> &#8451;</sup>`;
  document.querySelector(".numb2").innerHTML=`${hum}%`
}

let back = () => {
  document.getElementsByTagName("header")[0].style.display = "flex";
  document.getElementsByTagName("main")[0].style.display = "none";
  document.getElementById('loader').style.display = "none"
  info_city.style.display = "inline-block"
}