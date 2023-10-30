var key = "81189d0dccaaaefb081d0cc325011ad6";
var storedCityNames = localStorage.getItem("storedCityNames");
savedSearches();

//event listeners
$("#searchButton").click(searchWeather);

$("#locationSearch").keyup(function(event){
    if(event.keyCode === 13){
        searchWeather();
    }
});

//gets search text and saves to local data and calls getweatherdata
function searchWeather()
{
    var cityName = $("#locationSearch").val().trim();
    getWeatherData(cityName);

    if (storedCityNames === null) {
        storedCityNames = cityName;
    }
    else if (storedCityNames.includes(cityName) === false) {
        storedCityNames += "," + cityName;
    }
    localStorage.setItem("storedCityNames", storedCityNames);
    savedSearches();
}

//creates a dropdown item for each city in local history that can be clicked on to call getweatherdata
function savedSearches() {
    if (storedCityNames === null) {
        return;
    }
    $(".history").remove();
    storedCityNames.split(',').forEach((cityName) => {
        var dropdownItem = document.createElement('a');
        var dropdownMenu = document.getElementById("dropdown-menu");
        dropdownItem.innerHTML = cityName;
        dropdownItem.setAttribute("class", "dropdown-item history");
        dropdownMenu.appendChild(dropdownItem); 
    });
    $('.history').click(function () {
        getWeatherData(this.textContent);
    });
}


//clear local storage and search
$("#clearResults").click(function () {
    localStorage.clear();
    storedCityNames = null;
    $(".history").remove();

});

//gets lat and lon from API
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

//gets weather data from API
function callWeatherApi(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
    fetch(apiUrl).then(function (repsonse) {
        if (repsonse.ok) {
            repsonse.json().then(function (data) {
                renderWeatherData(data);
            });
        }
        else {
            alert("What happened?");
        }
    })
}

//renders weather data onto screen
function renderWeatherData(weatherData) {
    var cards = $(".card");
    var index = 0;

    weatherData.list.forEach((data) => {
        var dateArray = data.dt_txt.split(' ');
        var iconCode = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        $(cards).show();
        if (index === 0 || dateArray[1] === "12:00:00") {
            var cardBody = $(cards[index]).children(".card-body");
            $(cards[index]).children(".date").text(dateArray[0]);
            $(cardBody).children(".weather-icon").children("img").attr("src", iconUrl);
            // $(cardBody).children(".icon").text(iconUrl);
            $(cardBody).children(".temp").text("Temp: " + data.main.temp);
            $(cardBody).children(".wind").text("Wind: " + data.wind.speed);
            $(cardBody).children(".humidity").text("Humidity: " + data.main.humidity);
            index++;
        }
    });


    //$(cards[index]).children(".temp").val("data");

    //get a collection of the cards with jQuery
    //have a variable that tracks the index of the cards
    //loop through the list of weather data--put data into the cards at the current index
    //++variable and continue on with the list



    //find a way to delet all saved search items without refreshing using JQuery
    //this should happen both while building the dropdown list and when clearing history. 
}