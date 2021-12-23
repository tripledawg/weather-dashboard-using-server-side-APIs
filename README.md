# weather-dashboard-using-server-side-APIs
 
**Screenshot**  
![](/weather-dashboard-screenshot800x800.png)

**URL of deployed web page**
https://tripledawg.github.io/weather-dashboard-using-server-side-APIs/

## Description

This is a weather dashboard that takes user city search data and calls the current temperature, humidity, windspeed and UV index.  It also produces and 5 day forecast with that same data, minus the UV index. The searched cities remain available to the user as a clickable button.

## HTML
I created placeholder boxes for the weather API data. The placeholders were programmatically populated with JS. 
## CSS
I used some bootstrap classes in the index file for layout and responsiveness, but I used css to create a custom color palate. 
## JS
After deciding on some global varaibles and elements, I added an event listener function to the search button. I used a function to create a search history and another to load any search history and display it as a button. I used a function to prevent default and then call the function to get the city latitude and longitude form the search input.

I used the getCityLatLon function to take user search data and adds it to local storage, calls the function to make each search a button, and also runs the API call using the geo locator part of the API.  I used the populateWeather function to take the daily weather API call and uses it call the functions to populate both the current day and the 5 day forecast.  I used the populateTodayWeather function to call the zero index of the array to pull various weather data for the current day. I used the populateForecast function to pull data starting at tomorrow by starting at the 1 index of the data array. 

I used several functions to handle turning the raw API data into usable user interface data.  I created a function to use moment.js to use the API timestamp data, one to turn the weather icon into a png image, and one to convert the Kelvin temperature into Fahrenheit. 


