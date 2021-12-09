//var for current day formatted to 3/30/2021 look
//local storage for persistent data
//var for API call
//search button function, whatever city load temp, wind, humidity and UV index to jumbotron and 5 day to footer
//city button functions to  populate current temp wind humidity and UV index to the jumbotron and 5 day to the footer
//UV index color coded based on severity (favorable, moderate, severe)

//weather api key c26d4f483a9680cf07042618df1ef271

//current city name  --get from variable name assigned to lat lon??
//var city; 
//api call search city api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//eg api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=c26d4f483a9680cf07042618df1ef271
//eg api.openweathermap.org/data/2.5/find?q=Atlanta&appid={c26d4f483a9680cf07042618df1ef271
//eg api.openweathermap.org/data/2.5/find?q={city}&appid={apid}
//{current}dt for date  and use moment formatting??  current.dt
//{current}/[weather]/icon: value  for picture  current.weather.id.??val??
//{current}/temp current.temp 
//{current}/wind_speed  current.wind_speed
//{current}/humidity   current.humiditiy
//{current}/uvi w/color coded function  current.uvi.id

//{daily}/day of the week  use moment??  daily.dt
//{daily}/temp daily.temp
//{daily}/wind  daily.wind_speed
//{daily}/humidity  daily.humidity
//{daily}/[weather]/icon: value  for picture  daily.weather.id.??val??

//accept user input and store in city varaible

var apiRootUrl = 'https://api.openweathermap.org';
var apiKey = "c26d4f483a9680cf07042618df1ef271";
var apiImage = "/img/w/";

//DOM Variables
var dayCard = document.createElement("div");
var dayBody = document.createElement("div");
var dayHeader = document.createElement("h3");

var userSearchHistory = [];
var citySearched = "";
var defaultCity = "Atlanta"

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCity + "&appid=" + apiKey;
var requestURLMelbourneFl = "https://api.openweathermap.org/data/2.5/onecall?lat=28.08&lon=80.60&exclude=hourly,minutely,alerts&appid=c26d4f483a9680cf07042618df1ef271";
var rootWeatherAPI = "https://api.openweathermap.org";

var searchInputBox = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getCityLatLon);

var storedUserSearchHistory = localStorage.getItem('user-search-history');
if (storedUserSearchHistory) {
    userSearchHistory = JSON.parse(storedUserSearchHistory);
}
createHistoryButtons();

//https://openweathermap.org/api/geocoding-api#direct// 


function getWeather(cityCoordinates) {
    var weatherDataCall = apiRootUrl + "/data/2.5/onecall?lat=" + cityCoordinates.lat + "&lon=" + cityCoordinates.lon + "&exclude=hourly,minutely,alerts&appid=" + apiKey;
    fetch(weatherDataCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data.status === 200) {
                console.error("Invalid data returned!");
            } else {
                populateWeather(data);
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

function getCityLatLon() {
    citySearched = searchInputBox.value;
    if (!userSearchHistory.includes(citySearched)) {
        userSearchHistory.push(citySearched);
        localStorage.setItem('user-search-history', JSON.stringify(userSearchHistory));
        createHistoryButtons();
    }
    var geoAPICall = apiRootUrl + "/geo/1.0/direct?q=" + citySearched + "&limit=5&appid=" + apiKey;
    fetch(geoAPICall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data[0]) {
                console.error("Invalid data returned!")
            } else {
                // add item to search history
                getWeather(data[0]);
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

function populateWeather(weatherData) {
    populateTodayWeather(weatherData.current);
    populateForecast(weatherData.daily);
}

function populateTodayWeather(currentWeather) {
    var icon = currentWeather.weather[0].icon;

    var cityNameDiv = document.getElementById("name");
    var dateDiv = document.getElementById("date");
    var conditionsImg = document.getElementById("conditions");
    var temperatureDiv = document.getElementById("temp");
    var humidityDiv = document.getElementById("humidity");
    var windSpeedDiv = document.getElementById("windspeed");
    var uvIndexDiv = document.getElementById("uvIndex");

    cityNameDiv.textContent = citySearched;
    dateDiv.textContent = getDate(currentWeather.dt); // convert to date and time
    temperatureDiv.textContent = convertTemp(currentWeather.temp) + "\u00B0F";
    conditionsImg.setAttribute("src", getIcon(icon));
    humidityDiv.textContent = currentWeather.humidity + "%";
    windSpeedDiv.textContent = currentWeather.wind_speed + "mph";
    uvIndexDiv.textContent = "UV index: " + currentWeather.uvi;
}

function populateForecast(dailyWeather) {
    console.log(dailyWeather);
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        var cardHead = cards[i].getElementsByClassName("card-header");
        cardHead[0].textContent = getDate(dailyWeather[i + 1].dt);

        var cardText = cards[i].getElementsByClassName("card-text");
        var iconUrl = getIcon(dailyWeather[i + 1].weather[0].icon);
        cardText[0].setAttribute('src', iconUrl);
        cardText[1].textContent = "Temp: " + convertTemp(dailyWeather[i + 1].temp.day) + "\u00B0F";
        cardText[2].textContent = "Wind: " + dailyWeather[i + 1].wind_speed + "mph";
        cardText[3].textContent = "Humidity: " + dailyWeather[i + 1].humidity + "%";
    }
}

function getIcon(iconId) {
    return apiRootUrl + apiImage + iconId + ".png";
}

function convertTemp(tempKelvin) {
    return Math.trunc((tempKelvin - 273.15) * 9 / 5 + 32);
}

function getDate(timestamp) {
    return moment.unix(timestamp).format('l')
}

function createHistoryButtons() {
    var userSearchButtons = document.getElementById("user-search-buttons");
    userSearchButtons.innerHTML = '';
    for (var i = 0; i < userSearchHistory.length; i++) {
        var historyButton = document.createElement("button");
        historyButton.textContent = userSearchHistory[i];
        historyButton.addEventListener("click", getSearchButtonWeather);
        userSearchButtons.append(historyButton);
    }
}

function getSearchButtonWeather(e) {
    e.preventDefault();
    searchInputBox.value = this.textContent;
    getCityLatLon();
}