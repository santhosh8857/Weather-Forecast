fetch('https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=c618af2d679d7198ff38c6a36ac6ca23')
   .then(resp => resp.json())
   .then(response => getData(response))
   
document.getElementById('btn').addEventListener('click', getDetails);

async function getDetails(e) {
   try {
      let cityName = document.getElementById('search').value;
      e.preventDefault();
      
      if(cityName) {
         const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c618af2d679d7198ff38c6a36ac6ca23`);
         const data = await resp.json();
         if(data.message === "city not found") throw alert(`${data.message}, kindly enter valid city name!`);
         getData(data);
      }
   } catch(e){
      console.log(e);
   }
}

function getData(data) {
   
   let bG = document.querySelector('#main-bg');
   let mainIcon = document.querySelector('#icon');
   let degree = document.querySelector('#degree');
   let weather = document.querySelector('#weather');
   let city = document.querySelector('#city');
   let sunrise = document.querySelector('#sunrise');
   let sunset = document.querySelector('#sunset');
   let wind = document.querySelector('#wind');
   let humidityPercent = document.querySelector('#humidity');
   let pressureData = document.querySelector('#pressure');
   let visibilityData = document.querySelector('#visibility');

   bG.classList.remove('rain','haze','strom','snow','drizzle','cloud');

   let icon = document.createElement('i');
   
   mainIcon.innerHTML = '';

   // Icons and bg
   if (data.weather[0].main === 'Rain') {
      icon.classList.add("fas", "fa-cloud-showers-heavy", "fa-6x", "text-light");
      bG.classList.add("rain");
   } else if (data.weather[0].main === 'Haze') {
      icon.classList.add("fas", "fa-smog", "fa-6x", "text-light");
      bG.classList.add('haze')
   } else if (data.weather[0].main === 'Thunderstorm') {
      icon.classList.add("fas", "fa-bolt", "fa-6x", "text-light");
      bG.classList.add('strom')
   } else if (data.weather[0].main === 'Snow') {
      icon.classList.add("fas", "fa-snowflake", "fa-6x", "text-light");
      bG.classList.add('snow')
   } else if (data.weather[0].main === 'Drizzle') {
      icon.classList.add("fas", "fa-cloud-rain", "fa-6x", "text-light");
      bG.classList.add('drizzle');
   } else {
      icon.classList.add("fas", "fa-cloud", "fa-6x", "text-light");
      bG.classList.add('cloud');
   }

   mainIcon.append(icon);

   // Degree
   degree.innerHTML = '';
   let deg = Math.round((data.main.temp) - 273.15);

   let innerP = document.createElement('p');
   innerP.innerHTML = `${deg}&#176C`;
   degree.appendChild(innerP);

   // Current weeather
   weather.innerText = `${data.weather[0].main}`;
   weather.classList.add('display-3');

   // city display
   city.innerText = `${data.name}, ${data.sys.country}`;

   // sunrise
   let sun = new Date((data.sys.sunrise)*1000);
   sunrise.innerHTML = `<i class="fas fa-cloud-sun"></i> ${sun.toLocaleTimeString()}`;

   // sunset 
   let moon = new Date((data.sys.sunset)*1000);
   sunset.innerHTML = `<i class="fas fa-cloud-moon"></i> ${moon.toLocaleTimeString()}`;

   // wind
   wind.classList.add('font-weight-bold');
   wind.innerText = `${data.wind.speed} m/sec`

   // Humidity
   humidityPercent.innerText = `${data.main.humidity} %`

   // Pressure
   pressureData.innerText = `${data.main.pressure} hPa`

   // Visibility
   visibilityData.innerText = `${(data.visibility)/1000} KM`

}

