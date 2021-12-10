//Global Variables

var apiRootUrl = 'https://api.openweathermap.org';
var apiKey = "c26d4f483a9680cf07042618df1ef271";
var apiImage = "/img/w/";

var userSearchHistory = [];
var citySearched = "";
var defaultCity = "Atlanta"

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCity + "&appid=" + apiKey;
var requestURLMelbourneFl = "https://api.openweathermap.org/data/2.5/onecall?lat=28.08&lon=80.60&exclude=hourly,minutely,alerts&appid=c26d4f483a9680cf07042618df1ef271";
var rootWeatherAPI = "https://api.openweathermap.org";

//DOM Variables
var dayCard = document.createElement("div");
var dayBody = document.createElement("div");
var dayHeader = document.createElement("h3");

var searchInputBox = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");

//Button
searchButton.addEventListener("click", getCityLatLon);

//Function to load search history from local storage if there is any

var storedUserSearchHistory = localStorage.getItem('user-search-history');
if (storedUserSearchHistory) {
    userSearchHistory = JSON.parse(storedUserSearchHistory);
}
createHistoryButtons();

//API call function uses concatenation to call the daily weather only and calls the function to populate it if API call worked; function also checks if call status is 200 and if not returns error
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

//This function takes user search data and adds it to local storage, calls the function to make each search a button, and also runs the API call using the geo locator part of the API
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
                getWeather(data[0]);
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

// This function takes the daily weather API call and uses it to call the functions to populate both the current day and the 5 day forecast

function populateWeather(weatherData) {
    populateTodayWeather(weatherData.current);
    populateForecast(weatherData.daily);
}

//This function receives the current day's weather and populates fields based on the contents

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
    temperatureDiv.textContent = "Temperature: " + convertTemp(currentWeather.temp) + "\u00B0F";
    conditionsImg.setAttribute("src", getIcon(icon));
    humidityDiv.textContent = "Humidity: " + currentWeather.humidity + "%";
    windSpeedDiv.textContent = "Wind Speed: " + currentWeather.wind_speed + "mph";
    uvIndexDiv.textContent = "UV index: " + currentWeather.uvi;
    //this color coding function for the UV index is not working
    // if (uvi < 3){
    //     uvIndexDiv.setAttribute(style="color ;green");
    // } else if (uvi <= 6) {
    //     uvIndexDiv.setAttribute(style="color: orange");
    // } else {
    //     uvIndexDiv.setAttribute(syle="color: red");
    // }
}

// This function sets page elements based on the daily forecast for the next 5 days

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

//This function returns a url to get the image file for the supplied icon ID. 
function getIcon(iconId) {
    return apiRootUrl + apiImage + iconId + ".png";
}
//This function takes the weather data and converts it from Kelvin to Fahrenheit. 
function convertTemp(tempKelvin) {
    return Math.trunc((tempKelvin - 273.15) * 9 / 5 + 32);
}

//This function uses moment.js to convert a unix timestamp to a /-separated date from the weather API. 

function getDate(timestamp) {
    return moment.unix(timestamp).format('l')
}

//This function uses DOM manipulation to create and append a button element to the useSearchHistory for each unique search history item.
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

//This function calls the getCityLatLon function when the search button is clicked.
function getSearchButtonWeather(e) {
    e.preventDefault();
    searchInputBox.value = this.textContent;
    getCityLatLon();
}