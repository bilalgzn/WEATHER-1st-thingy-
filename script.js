async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "2289489443dcb289613d60da5a6b3c39";
  
  // ✅ Empty input check
  if (city.trim() === "") {
    document.getElementById("weatherResult").innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  try {
    const response = await fetch(url);
    const data = await response.json();

    loading.style.display = "none";
    console.log(data); // debug

    if (data.cod === 200) {
      const icon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      const weatherInfo = `
        <p><strong>${data.name}</strong></p>
        <img src="${iconUrl}" alt="weather icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
      document.getElementById("weatherResult").innerHTML = weatherInfo;
    } else {
      document.getElementById("weatherResult").innerHTML = "City not found.";
    }
  } catch (error) {
    loading.style.display = "none";
    document.getElementById("weatherResult").innerHTML = "Error fetching data.";
    console.error(error);
  }
}

async function getWeatherByLocation() {
  const apiKey = "2289489443dcb289613d60da5a6b3c39";
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  if (!navigator.geolocation) {
    loading.style.display = "none";
    document.getElementById("weatherResult").innerHTML = "Geolocation not supported.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        loading.style.display = "none";

        if (data.cod === 200) {
          const icon = data.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          const weatherInfo = `
            <p><strong>${data.name}</strong></p>
            <img src="${iconUrl}" alt="weather icon">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
          `;
          document.getElementById("weatherResult").innerHTML = weatherInfo;
        } else {
          document.getElementById("weatherResult").innerHTML = "Location weather not found.";
        }
      } catch (error) {
        loading.style.display = "none";
        document.getElementById("weatherResult").innerHTML = "Error fetching location weather.";
        console.error(error);
      }
    },
    (error) => {
      loading.style.display = "none";   // Hide loading on error
      if (error.code === error.PERMISSION_DENIED) {
        document.getElementById("weatherResult").innerHTML = "Permission denied. Cannot access location.";
      } else {
        document.getElementById("weatherResult").innerHTML = "Error getting location.";
      }
    }
  );
}

function toggleMode() {
  document.body.classList.toggle("light");

  const btn = document.getElementById("modeToggle");
  if (document.body.classList.contains("light")) {
    btn.textContent = "☀️";
  } else {
    btn.textContent = "🌙";
  }
}
