var cityForm = $("#search-city-form")
var cityInput = $("#city-input")

var getInfo = function(event) {
    event.preventDefault()
    var cityName = $(cityInput)
    .val()
    .trim()
    console.log(cityName)

    if(cityName) {
        console.log("Succes" + cityName)
    }
    else {
        alert("Fail")
    }
    
}

$(cityForm).on("submit", getInfo)