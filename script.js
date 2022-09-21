var weatherKey = "e365a56e35842cef898de05f21dfc4b8"
var cityForm = $("#search-city-form")
var cityInput = $("#city-input")

var getInfo = function (event) {
    event.preventDefault()
    var cityName = $(cityInput)
        .val()
        .trim()
    console.log(cityName)

    if (cityName) {
        getRepoData(cityName)
        $(cityInput).val("")
    }
    else {
        alert("Please enter a city name")
    }
}

var getRepoData = function (cityName) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + weatherKey

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentData(data)
                displayForecast(data)
            })
        }
        else {
            alert("Not a valid city, please try again")
            return
        }
    })
    .catch(function(error){
        console.log(error)
    })
}

var displayCurrentData = function(data) {
    var currentCity = $("#city-name")
    var currentDate = $("#current-date")
    var currentTemp = $("#current-temp")
    var currentWind = $("#current-wind")
    var currentHumidity = $("#current-humidity")
    var weatherIcon = data.list[0].weather[0].icon

    var imageContainer = document.querySelector("#image-container")
    var icon = document.createElement("img")
    icon.src = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"

    var city = data.city.name
    var date = moment().format("l")
    var temp = "Temp: " + data.list[0].main.temp + "°F"
    var wind = "Wind: " + data.list[0].wind.speed + " Mph"
    var humidity = "Humidity: " + data.list[0].main.humidity + "%"

    $(currentCity).empty().append(city)
    $(currentDate).empty().append(date)
    $(imageContainer).empty().append(icon)
    $(currentTemp).empty().append(temp)
    $(currentWind).empty().append(wind)
    $(currentHumidity).empty().append(humidity)
    
}

var displayForecast = function(data) {
    console.log(data)
    for(var i = 5; i < data.list.lenght;i+=8) {
        console.log("This is list" + i)
    }
}

$(cityForm).on("submit", getInfo)