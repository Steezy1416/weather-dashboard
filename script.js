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
                console.log(data)
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

$(cityForm).on("submit", getInfo)