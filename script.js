var key = "81189d0dccaaaefb081d0cc325011ad6";

//event listener for the search bar
$("#searchButton").click(function () {
    var cityName = $("#locationSearch").val().trim();
    localStorage.setItem("cityname"), JSON.stringify(cityName);
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

function renderWeatherData(weatherData) {
    var cards = $(".card");
    var index = 0;

    weatherData.list.forEach((data) => {
        var dateArray = data.dt_txt.split(' ');
        if (index === 0 || dateArray[1] === "12:00:00") {
            var cardBody= $(cards[index]).children(".card-body");
            $(cards[index]).children(".date").text(dateArray[0]);
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


}