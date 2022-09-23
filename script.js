var weatherKey = "e365a56e35842cef898de05f21dfc4b8"
var cityForm = $("#search-city-form")
var cityInput = $("#city-input")
var historyContainer = $(".history-container")
var numberOfHistoryBoxes = -1
var clearStorage = $("#clear-btn")
var formContainer = $(".placeholder-form-container")
var mainInformation =$(".main-information")

var getInfo = function (event) {
    event.preventDefault()
    //saves users input to a city
    var cityName = $(cityInput)
        .val()
        .trim()
    console.log(cityName)

    //if there is input it gets the data from api else it tells you enter a city
    if (cityName) {
        getRepoData(cityName)
        $(cityInput).val("")
    }
    else {
        alert("Please enter a city name")
    }
}

var getRepoData = function (cityName) {

    //uses users input and it put in the api call to grab its data
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + weatherKey

    fetch(apiUrl).then(function (response) {
        //if the city is a valid or real city it will display the city's weather data
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
    formContainer.removeClass("placeholder-form-container")
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

    //saves the correct weather information into the variables
    var city = data.city.name
    var date = moment().format("l")
    var temp = "Temp: " + data.list[0].main.temp + "°F"
    var wind = "Wind: " + data.list[0].wind.speed + " Mph"
    var humidity = "Humidity: " + data.list[0].main.humidity + "%"

    //appends the data to the city info container
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
    //picked a specific time for the forecast so it loops trough the arrays at specific increments to get a specific time for each day
    for (var i = 5; i < data.list.length; i += 8) {

        //setting up the information to be based on the increment
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

        //appends all the elements
        $(dateFor).empty().append(date)
        $(imageFor).empty().append(imgIcon)
        $(tempFor).empty().append(temp)
        $(windFor).empty().append(wind)
        $(humidityFor).empty().append(humidity)

    }
}

var cityHistory = function(city) {
    //creates new elements to store the city title or city "history"
    var historyRow = $(".history-row")
    var historyBox = document.createElement("div")
    historyBox.classList = "col-3 history-box"
    var historyBoxName = document.createElement("p")
    historyBoxName.className = "city-history"
    historyBoxName.textContent = city
    historyBox.append(historyBoxName)
    historyRow.append(historyBox)
    numberOfHistoryBoxes ++

    //saves the city name and number of cities saved into local storage
    localStorage.setItem(numberOfHistoryBoxes, city)
    
}

$(cityForm).on("submit", getInfo)

//when you click on the history buttons it grabs the name of the city and runs it through the get repo data function to run the whole program again
$(historyContainer).on("click",".city-history", function(event) {
    var historyCity = event.target.innerText
    getRepoData(historyCity)
})
//if storage gets to crowded user can clear the local storage
$(clearStorage).on("click", function(){
    localStorage.clear()
})

//displays the history of cities based on the ammount of cities saved
for (var i = 0; i < localStorage.length; i++) {
    var storedCity = (localStorage.getItem(i))
    cityHistory(storedCity)
}