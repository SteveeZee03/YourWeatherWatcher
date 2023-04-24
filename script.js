
apiKey = "5035a2af9b4d99418e4b18491b01a7a6";
dayFormat = dayFormat = dayjs().format("M/D/YY");
previousSearchList = [];


function currentStatus(city) {

    queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alert&appid=${apikey}`; 

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(futureResponse) {
        console.log(futureResponse);

        $("#weatherDisplay").css("display", "block");
        $("cityInfo").empty();

        var iconCode = futureResponse.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

        cityDisplay = $(`
        <h2 id="cityDisplay"> 
            ${futureResponse.name} ${dayFormat} <img src="${iconURL}" alt=${futureResponse.weather[0].description}" />
            </h2>
            <p> Temperature: ${futureResponse.main.temp} °F</p>
            <p> Humidity: ${futureResponse.main.humidity} \%</p>
            <p> Wind Speed: ${futureResponse.wind.speed} MPH</p> 
        `);
        $("#cityInfo").append(cityDisplay);       
    });
};

function weeklyStatus(lat, lon) {
    var weekForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

$.ajax({
    url: weekForecast,
    method: "GET"
}).then(function(futureResponse) {
    console.log(futureResponse);
    $("#weatherForecast").empty();
    
    for (let i = 1; i < 6; i++) {
        var cityDetail = {
            date: futureResponse.daily[i].dt,
            icon: futureResponse.daily[i].weather[0].icon,
            temp: futureResponse.daily[i].temp.day,
            humidity: futureResponse.daily[i].humidity
        };

        currDate = dayjs.unix(cityDetail.date).format("MM/DD/YYYY");
        iconURL = `https://openweathermap.org/img/w/${iconCode.icon}.png alt=${futureResponse.daily[i].weather[0].main}"/>`;
    
    futureCard = $(`
    <div class="pl-3>
    <div class "card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
    <div class="card-body">
    <h5> ${currDate}</h5>
    <p>${iconURL}</p>
    <p>Temp: ${cityInfo.temp} F</p>
    <p> Humidity: ${cityInfo.humidity}\%</p>
    </div>
    </div>
    </div>
    `);

    $("#weatherForecast").append(futureCard);
}
});
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
    console.log(previousSearchList);
});

$(document).on("click", ".list-group-item", function() {
    listCity =$(this).text();
    currentStatus(listCity);
});

$(document).ready(function() {
    historyArr = JSON.parse(localStorage.getItem("city"));
    if (historyArr !== null) {
        lastSearchedIndex = historyArr.length - 1;
        lastSearchedCity = historyArr [lastSearchedIndex];
        currentStatus(lastSearchedCity);
        console.log(`Your last searched city: ${lastSearchedCity}`);
    }
});

// changes on script are on previous commit