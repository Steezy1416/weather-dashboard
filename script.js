var weatherKey = "e365a56e35842cef898de05f21dfc4b8"
var cityForm = $("#search-city-form")
var cityInput = $("#city-input")
var historyContainer = $(".history-container")
var numberOfHistoryBoxes = -1
var clearStorage = $("#clear-btn")

var placeholder = $(".placeholder-form-container")
placeholder.classList.add("hide")
var mainInformation =$(".main-information")


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
                
                console.log(data)
            })
        }
        else {
            alert("Not a valid city, please try again")
            return
        }
    })
        .catch(function (error) {
            console.log(error)
        })
}

var displayCurrentData = function (data) {
    
    mainInformation.removeClass("hide")
    

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

    displayForecast(data)
    cityHistory(city)

}

var displayForecast = function (data) {
    var dayIncrement = 1
    for (var i = 5; i < data.list.length; i += 8) {

        var date = moment(moment()).add(dayIncrement, 'days').format('l')
        var weathericon = data.list[i].weather[0].icon
        var imageFor = document.querySelector("#image-container-for-" + i)
        var imgIcon = document.createElement("img")
        imgIcon.src = "http://openweathermap.org/img/wn/" + weathericon + ".png"

        dayIncrement++
        var temp = "Temp: " + data.list[i].main.temp + "°F"
        var wind = "Wind: " + data.list[i].wind.speed + " Mph"
        var humidity = "Humidity: " + data.list[i].main.humidity + "%"

        var dateFor = $("#date-for-" + i)
        var tempFor = $("#temp-for-" + i)
        var windFor = $("#wind-for-" + i)
        var humidityFor = $("#humidity-for-" + i)

        $(dateFor).empty().append(date)
        $(imageFor).empty().append(imgIcon)
        $(tempFor).empty().append(temp)
        $(windFor).empty().append(wind)
        $(humidityFor).empty().append(humidity)

    }
}

var cityHistory = function(city) {
    var historyRow = $(".history-row")
    var historyBox = document.createElement("div")
    historyBox.classList = "col-3 history-box"
    var historyBoxName = document.createElement("p")
    historyBoxName.className = "city-history"
    historyBoxName.textContent = city
    historyBox.append(historyBoxName)
    historyRow.append(historyBox)
    numberOfHistoryBoxes ++

    localStorage.setItem(numberOfHistoryBoxes, city)


    
}

$(cityForm).on("submit", getInfo)
$(historyContainer).on("click",".city-history", function(event) {
    var historyCity = event.target.innerText
    getRepoData(historyCity)
})
$(clearStorage).on("click", function(){
    localStorage.clear()
})


for (var i = 0; i < localStorage.length; i++) {
    var storedCity = (localStorage.getItem(i))
    cityHistory(storedCity)
}