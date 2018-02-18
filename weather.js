let updateWidget = function(data) {
  console.log("Got weather data: ", data)
}

let getWeather = function(event) {

  let latitude = event.coords.latitude;
  let longitude = event.coords.longitude;
  let apiKey = '2d044d02ff35f21681e17c744f821556'; // REPLACE THIS VALUE with your own key.

  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

        $.getJSON(weatherServiceURL, function(data) {
            let text = `It is ${data.main.temp.toFixed(0)} degrees outside.`
            let place = data.name
            $("h4.card-title").html(place)
            $("p.card-text").html(text)
            $("#weather").html(`<img class="card-img-top bg-primary img-fluid" img src="http://openweathermap.org/img/w/${data.weather["0"].icon}.png">`)
          })

    fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}

let handlePosition = function(event) {
  console.log("Starting handlePosition...")
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);
  console.log("Ending handlePosition...")
}

let link = jQuery("#get_forecast")
link.on("click", handlePosition);

////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
