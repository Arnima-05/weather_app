const apiKey = "1d2e681c5b7f058dd469784a1f73a657"; 
const weatherIconMap = {
    "Clear": "./images/sunny.png",
    "Clouds": "./images/cloudy.png",
    "Rain": "./images/rainy.png",
    "Snow": "./images/snow.png",
    "Thunderstorm": "./images/thunder.png",
    "Drizzle": "./images/drizzle.png",
    "Mist": "./images/mist.png",
    "Smoke": "./images/smoke.png",
    "Haze": "./images/haze.png",
    "Dust": "./images/dust.png",
    "Fog": "./images/fog.png"
};


function getWeather(city) {
    document.getElementById('loader').style.display = 'block'; 
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error("City not found"); 
            return response.json();
        })
        .then(data => {
            updateUI(data);  
        })
        .catch(error => {
            alert("Error: " + error.message);
        })
        .finally(() => {
            document.getElementById('loader').style.display = 'none'; 
        });
}


function updateUI(data) {
    const temp = data.main.temp;
    const city = data.name;
    const rawCondition = data.weather[0].main;
    const condition = rawCondition.toLowerCase();
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    document.querySelector(".degree h2").innerHTML = `${Math.round(temp)}&deg; C`;
    document.querySelector(".degree h2 + h2").textContent = city;
    
    document.getElementById("condition").textContent = rawCondition;
    
    document.querySelector(".stat-item:nth-child(1) p").textContent = `${humidity}%`;
    document.querySelector(".stat-item:nth-child(2) p").textContent = `${windSpeed} km/h`;

    const iconFile = weatherIconMap[condition] || "default.png";
    document.querySelector(".picContainer img").src = `./images/${iconFile}`;
}



function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById('loader').style.display = 'block'; 
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => updateUI(data)) 
                .catch(error => alert("Error: " + error.message))
                .finally(() => document.getElementById('loader').style.display = 'none'); 
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}



function getWeatherFromInput() {
    const city = document.getElementById("cityInput").value;
    if (city) {
        getWeather(city); 
    } else {
        alert("Please enter a city name.");
    }
}




function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById("dateTime").textContent = now.toLocaleString();
    }, 1000);
}


window.onload = () => {
    startClock();       
    getWeatherByLocation();  
};
