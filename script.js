var key = "81189d0dccaaaefb081d0cc325011ad6";

//event listener for the search bar
$("#searchButton").click(function () {
    var cityName = $("#locationSearch").val().trim();
    getWeatherData(cityName);
});

//function to save searches to local storage

//function to add saved searches to the dropdown

//function to clear searches from local storage

//function to fetch weather API and display results as cards

function getWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`;
    fetch(apiUrl).then(function (repsonse) {
        if (repsonse.ok) {
            repsonse.json().then(function (data) {
                callWeatherApi(data[0].lat, data[0].lon);
            });
        }
        else {
            alert("What happened?");
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function callWeatherApi(latitude, longitude) {
    debugger;
}

function renderWeatherData(weatherData) {

}