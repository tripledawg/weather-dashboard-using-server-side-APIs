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

var searchHistory = [];
var apiRootUrl = 'https://api.openweathermap.org';
var apiKey = "c26d4f483a9680cf07042618df1ef271";

//DOM Variables
var dayCard = document.createElement("div");
var dayBody = document.createElement("div");
var dayHeader = document.createElement("h3");

var temp = document.createElement("p");
var humidity = document.createElement("p");
var windSpeed = document.createElement("p");
var icon = document.createElement("img");


var userSearchInput = "";
var citySearched = "";
var defaultCity = "Atlanta"

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCity + "&appid=" + apiKey;
var requestURLMelbourneFl = "https://api.openweathermap.org/data/2.5/onecall?lat=28.08&lon=80.60&exclude=hourly,minutely,alerts&appid=c26d4f483a9680cf07042618df1ef271";
var rootWeatherAPI = "https://api.openweathermap.org";

var searchInputBox = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getWeather);

//https://openweathermap.org/api/geocoding-api#direct// 
function generateLatLonFromCity() {

    return city;
};

function wrapRequest() {
    fetch(requestURLMelbourneFl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("fetch respnse \n----------");
            console.log(data);
        });
}

function getWeather(event) {
    event.preventDefault();
    var cityName = searchInputBox.value.trim();
    var latLon = getCityLatLon(cityName);
    var weatherDataCall = apiRootUrl + "/data/2.5/onecall?lat=" + latLon.lat + "&lon=" + latLon.lon + "&exclude=hourly,minutely,alerts&appid=" + apiKey;
    console.log(weatherDataCall);
    var weatherData = fetch(weatherDataCall)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    })
}

function getCityLatLon(cityName) {
    var geoAPICall = apiRootUrl + "/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;
    var latLon = fetch(geoAPICall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data[0];
        });
        console.log(latLon);
    return latLon; 
}