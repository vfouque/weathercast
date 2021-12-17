//3836829199ef17ec06e2cd90cfdc17fc

//getCoord récupère les coordonnes de la ville choisie
function getCoord(inputTown) {
  return axios
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${inputTown}&key=33d030be1af64d88b0c764bfedf2985b`
    )
    .then((response) => {
      // let latCity = response.data.results[0].geometry.lat;
      // let lngCity = response.data.results[0].geometry.lng;
      return response.data.results[0].geometry;
    })
    .catch((err) => {
      console.log("Error: " + err.message);
    });
}

//getWeather fait une requete pour récupérer la méteo
function getWeather(latCity, lngCity, selectDay) {
  let meteo = document.querySelector(".meteo");
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latCity}&lon=${lngCity}&exclude=alerts&units=metric&lang=fr&appid=3836829199ef17ec06e2cd90cfdc17fc`
    )
    .then((response) => {
      let weatherDay = response.data.daily;
      let dataArr = [];
      for (let i = 0; i <= selectDay - 1; i++) {
        dataArr.push(weatherDay[i]);
      }
      meteo.innerHTML = "";

      getWeatherCategory(dataArr, meteo);
    })
    .catch((err) => {
      console.log("Error: " + err.message);
    });
}
//getWeatherCategory récupère les conditions meteo selon l'id récupéré de l'api
function getWeatherCategory(data, meteo) {
  let wId;
  let dayPlus4;
  let textContent;
  console.log(data);
  data.forEach((element) => {
    wId = element.weather[0].id;
    dayPlus4 = new Date(element.dt * 1000).toLocaleDateString("en-EN", {
      weekday: "long",
    });

    if (wId >= 803) {
      textContent = document.createElement("div");
      textContent.innerHTML = `  <span>${dayPlus4}</span>
      <img src="./assets/Clouds.svg" alt="" width="80px" height="auto">`;

      meteo.append(textContent);
    } else if (wId >= 801 && wId <= 802) {
      textContent = document.createElement("div");
      textContent.innerHTML = `  <span>${dayPlus4}</span>
      <img src="./assets/Cloudy.svg" alt="" width="80px" height="auto">`;

      meteo.append(textContent);
    } else if (wId == 800) {
      textContent = document.createElement("div");
      textContent.innerHTML = `  <span>${dayPlus4}</span>
      <img src="./assets/Clear.svg" alt="" width="80px" height="auto">`;

      meteo.append(textContent);
    } else if (wId >= 600 && wId <= 622) {
      textContent = document.createElement("div");
      textContent.innerHTML = `  <span>${dayPlus4}</span>
      <img src="./assets/Snow.svg" alt="" width="80px" height="auto">`;

      meteo.append(textContent);
    } else {
      textContent = document.createElement("div");
      textContent.innerHTML = `  <span>${dayPlus4}</span>
      <img src="./assets/Rain.svg" alt="" width="80px" height="auto">`;

      meteo.append(textContent);
    }
  });
}

//
document.getElementById("formWeather").addEventListener("submit", (event) => {
  event.preventDefault();

  //On récupère la valeur du champ input
  const inputTown = document.querySelector(".fieldTown").value;
  const selectDay = document.querySelector("#numberOfDays").value;

  let latCity;
  let lngCity;

  getCoord(inputTown).then((response) => {
    latCity = response.lat;
    lngCity = response.lng;

    getWeather(latCity, lngCity, selectDay);
  });
});
function createElem() {
  return (document.createElement("div").innerHTML = "");
}
