
apiKey = "5035a2af9b4d99418e4b18491b01a7a6";
dayFormat = dayjs().format("M/D/YY");
previousSearchList = [];

function currentStatus(city) {
    queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`; 

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityWeatherResponse) {
        $("#weatherDisplay").css("display", "block");
        $("cityInfo").empty();

        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

        cityDisplay = $(`
        <h2 id="cityDisplay"> 
            ${cityWeatherResponse.name} ${dayFormat} <img src="${iconURL}" alt=${cityWeatherResponse.weather[0].description}" />
            </h2>
            <p> Temperature: ${cityWeatherResponse.main.temp} °F</p>
            <p> Humidity: ${cityWeatherResponse.main.humidity} \%</p>
            <p> Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p> 
        `);

        $("#cityInfo").append(cityDisplay);
    })
}

$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    city = $("#cityInput").val().trim();
    currentStatus(city);
    if (!previousSearchList.includes(city)) {
        previousSearchList.push(city);
            citySearch = $(`
            <li class="list-group-item">${city}</li>
            `)
        $("#previousSearch").append(citySearch);
    };

    localStorage.setItem("city", JSON.stringify(previousSearchList));
});

$(document).ready(function() {
    historyArr = JSON.parse(localStorage.getItem("city"));
    if (historyArr !== null) {
        lastSearchedIndex = historyArr.length - 1;
        lastSearchedCity = historyArr [lastSearchedIndex];
        currentStatus(lastSearchedCity);
    }
});