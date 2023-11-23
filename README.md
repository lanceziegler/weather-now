# WeatherNow Chrome Extension

## Description

WeatherNow is a simple Chrome extension that provides daily high/low weather information for your location. It is built using Vanilla HTML, CSS, and JavaScript, making it lightweight and easy to use.

## Features

- Powered by the [weather.gov API](https://api.weather.gov).
  - Current weather? No! Thanks to the weather.gov API, only highs and lows are available. Perhaps the extension would best be called "WeatherSometimeToday"
- Simple and intuitive interface
  - It's literally just the daily high or nightly low and a cute animated glyph (via https://darkskyapp.github.io/skycons/). What else could you need? Ok don't answer that question...
- Geolocation via http://www.geoplugin.net/json.gp, an IP address locator that I found in a Reddit thread.

## Installation

1. Clone the repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the extension directory.

## Usage

- Click on the WeatherNow icon in the Chrome toolbar.

## API Information

WeatherNow utilizes the [weather.gov API](https://api.weather.gov) to fetch accurate, albeit only bi-daily weather data.

## Contributing

If you'd like to contribute to WeatherNow, feel free to fork the repository and create a pull request. We welcome any improvements or additional features!
