
var weatherApi="/weather";
const weatherForm=document.querySelector("form")
const search=document.querySelector(".input-field")
const weatherIcon=document.querySelector(".weatherIcon i")
const weatherCondition=document.querySelector(".weatherCondition")
const weatherTemprature=document.querySelector(".temperature span")
const place=document.querySelector(".place")
const date=document.querySelector(".date")

const currentDate=new Date()
const options={month : "long"}
const monthName=currentDate.toLocaleString("en-Us",options)

date.innerText=currentDate.getDate() + ", " + monthName + ", " + currentDate.getFullYear()

if ("geolocation" in navigator) {
    place.textContent = "Loading...";
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.address && data.address.city) {
              const city = data.address.city;
  
              showData(city);
            } else {
              console.log("City not found in location data.");
            }
          })
          .catch((error) => {
            console.log("Error fetching location data:", error);
          });
      },
      function (error) {
        console.log("Error getting location:", error.message);
      }
    );
  } else {
    console.log("Geolocation is not available in this browser.");
  }

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    weatherIcon.className=""
    weatherTemprature.innertext=""
    place.innerText="Loading..."
    weatherCondition.innerText=""
    getData(search.value);
})

function getData(city){
    showWeatherData(city,(result)=>{
        console.log(result)
        if (result.cod == 200) {
            if (
              result.weather[0].description == "rain" ||
              result.weather[0].description == "fog"
            ) {
              weatherIcon.className = "wi wi-day-" + result.description;
            } else {
              weatherIcon.className = "wi wi-day-cloudy";
            }
            place.textContent = result?.name;
            weatherTemprature.textContent =
              (result?.main?.temp - 273.5).toFixed(2) + String.fromCharCode(176);
            weatherCondition.textContent =
              result?.weather[0]?.description?.toUpperCase();
          } else {
            place.textContent = "City not found.";
          }        
    });
}

function showWeatherData(city,callback){
    const locationApi=weatherApi + "?address=" + city;
    fetch(locationApi).then((response)=>{
        response.json().then((response)=>{
            callback(response)
        })
    })
}




