document.addEventListener('DOMContentLoaded', () => {
  let city = '';
  let latitude = '';
  let longitude = '';
  let cityDiv = document.querySelector('.city');
  let tempDiv = document.querySelector('.temperature');
  let iconDiv = document.querySelector('#icon1');
  const loadingScreen = document.getElementById('loadingScreen');
  const contentContainer = document.getElementById('contentContainer');
  let weather = '';
  let daytime;
  let shortForecast = '';
  let shortForecastCase;
  let loading = true;
  contentContainer.style.display = 'none';
  loadingScreen.style.display = 'block';
  let bg = document.querySelector('.bg');
  let pictures = [
    'images/day.jpg',
    'images/night.jpg',
    'images/cloudy.jpg',
    'images/cloudynight.jpg',
    'images/rain.jpg',
    'images/snow.jpg',
    'images/fog.jpg',
  ];

  let skycons = new Skycons({
    color: 'black',
  });

  // CLEAR_DAY CLEAR_NIGHT PARTLY_CLOUDY_DAY PARTLY_CLOUDY_NIGHT CLOUDY RAIN SLEET SNOW WIND FOG

  fetch('http://www.geoplugin.net/json.gp')
    .then((data) => data.json())
    .then((data) => {
      city = data.geoplugin_city;
      latitude = data.geoplugin_latitude;
      longitude = data.geoplugin_longitude;
      cityDiv.innerText = city;
      // console.log(data);
      console.log(city, latitude, longitude);

      fetch(
        // `https://api.weather.gov/gridpoints/{office}/${latitude},${longitude}/forecast`
        `https://api.weather.gov/points/${latitude},${longitude}`
      )
        .then((data2) => data2.json())
        .then((data2) => {
          // console.log(data2);
          console.log(data2.properties.forecast);
          // fetch(`${data2.}`)
          fetch(data2.properties.forecast)
            .then((data3) => data3.json())
            .then((data3) => {
              console.log(data3);
              weather = data3.properties.periods[0].temperature;
              daytime = data3.properties.periods[0].isDaytime;
              shortForecast =
                data3.properties.periods[0].shortForecast.toLowerCase();

              loading = false;

              if (shortForecast.length > 0) {
                if (
                  shortForecast.includes('clear') ||
                  shortForecast.includes('sun')
                ) {
                  //Clear Weather CASE
                  shortForecastCase = 1;
                }
                if (
                  shortForecast.includes('part') &&
                  shortForecast.includes('cloudy')
                ) {
                  //Partly cloudy CASE
                  shortForecastCase = 2;
                }
                if (shortForecast.includes('cloud')) {
                  //Cloudy CASE
                  shortForecastCase = 3;
                }
                if (
                  shortForecast.includes('rain') &&
                  shortForecast.includes('light')
                ) {
                  //Light Rain CASE
                  shortForecastCase = 4;
                }
                if (
                  (shortForecast.includes('rain') &&
                    shortForecast.includes('heavy')) ||
                  shortForecast.includes('showers')
                ) {
                  //Heavy Rain CASE (use sleet skycon... looks more like heavy rain anyways)
                  shortForecastCase = 5;
                }
                if (shortForecast.includes('wind')) {
                  //Heavy Rain CASE (use sleet skycon... looks more like heavy rain anyways)
                  shortForecastCase = 6;
                }
                if (shortForecast.includes('snow')) {
                  //Heavy Rain CASE (use sleet skycon... looks more like heavy rain anyways)
                  shortForecastCase = 7;
                }
                if (shortForecast.includes('fog')) {
                  //Fog CASE
                  shortForecastCase = 8;
                }
              }

              if (daytime != undefined) {
                if (daytime && shortForecastCase === 1) {
                  bg.src = `${pictures[0]}`;
                  console.log('day');
                  skycons.add(
                    document.getElementById('icon1'),
                    Skycons.CLEAR_DAY
                  );
                } else if (!daytime && shortForecastCase === 1) {
                  //! Issue with loadPic
                  bg.src = `${pictures[1]}`;
                  skycons.color = 'white';
                  iconDiv.style.border = '4px solid white';
                  cityDiv.style.color = 'white';
                  cityDiv.style.fontWeight = 100;
                  bg.style.opacity = 1;
                  tempDiv.style.textShadow = '0px 0px 3px black';
                  tempDiv.style.color = 'white';
                  console.log('night');
                  skycons.add(
                    document.getElementById('icon1'),
                    Skycons.CLEAR_NIGHT
                  );
                } else if ((daytime && shortForecastCase === 2) || 3) {
                  cityDiv.style.color = 'white';
                  cityDiv.style.textShadow = '0px 2px 4px black';
                  bg.src = `${pictures[2]}`;
                  console.log('partly cloudy day');
                  skycons.add(
                    document.getElementById('icon1'),
                    Skycons.PARTLY_CLOUDY_DAY
                  );
                } else if (!daytime && shortForecastCase === 2) {
                  bg.src = `${pictures[3]}`;
                  skycons.color = 'white';
                  iconDiv.style.border = '4px solid white';
                  cityDiv.style.color = 'white';
                  cityDiv.style.fontWeight = 100;
                  bg.style.opacity = 1;
                  tempDiv.style.textShadow = '0px 0px 3px black';
                  tempDiv.style.color = 'white';
                  console.log('partly cloudy night');
                  skycons.add(
                    document.getElementById('icon1'),
                    Skycons.PARTLY_CLOUDY_NIGHT
                  );
                } else if (shortForecastCase === 4) {
                  // Rain
                  bg.src = `${pictures[2]}`;
                  cityDiv.style.color = 'white';
                  cityDiv.style.textShadow = '0px 3px 5px black';
                  skycons.add(document.getElementById('icon1'), Skycons.RAIN);
                } else if (shortForecastCase === 5) {
                  // Heavy Rain
                  bg.style.opacity = 1;
                  skycons.color = 'white';
                  iconDiv.style.border = '4px solid white';
                  cityDiv.style.color = 'white';
                  cityDiv.style.fontWeight = 100;
                  tempDiv.style.textShadow = '0px 0px 3px black';
                  tempDiv.style.color = 'white';
                  bg.src = `${pictures[4]}`;
                  skycons.add(document.getElementById('icon1'), Skycons.SLEET);
                }
              }
              skycons.play();

              // } else if (skycons.list[0].loadPic === 6) {
              //   bg.src = `${pictures[5]}`;
              // } else if (skycons.list[0].loadPic === 7) {
              //   bg.src = `${pictures[5]}`;
              // } else if (skycons.list[0].loadPic === 8) {
              //   bg.src = `${pictures[0]}`;
              // } else if (skycons.list[0].loadPic === 9) {
              //   bg.src = `${pictures[6]}`;
              // }

              tempDiv.innerHTML = `${weather}&deg;`;
              // tempDiv.innerHTML = `${weather}&deg;<sup class="f">F</sup>`;
              console.log(weather);
              console.log(daytime);
              console.log(shortForecast);
              setTimeout(() => {
                loadingScreen.style.display = 'none';
                contentContainer.style.display = 'block';
              }, 200);
            });
        });
    });
});

// https://api.weather.gov/gridpoints/{office}/{grid X},{grid Y}/forecast
