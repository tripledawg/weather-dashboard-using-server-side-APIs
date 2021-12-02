//var for current day formatted to 3/30/2021 look
//local storage for persistent data
//var for API call
//var to store lat lon for other cities
//search button function, whatever city load temp, wind, humidity and UV index to jumbotron and 5 day to footer
//city button functions to  populate current temp wind humidity and UV index to the jumbotron and 5 day to the footer
//UV index color coded based on severity (favorable, moderate, severe)

//weather api key c26d4f483a9680cf07042618df1ef271

//current city name  --get from variable name assigned to lat lon??
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


var requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=28.08&lon=80.60&exclude=hourly,minutely,alerts&appid=c26d4f483a9680cf07042618df1ef271";

fetch (requestURL)
.then(function (response) {
    return response .json(); 
})
.then (function (data) {
    console.log("fetch response \n-----------");
    console.log(data);
});



