import mongoose from 'mongoose';

import {connect, disconnect} from './db-connect';
import CityModel from './models/city.model';
import WeatherModel from './models/weather.model';
import data from './data/daily_16.json';

connect().then(async () => {
  await Promise.all(importData());
})
.catch(console.error)
.then(disconnect);

function importData() {
  return data.map(async (elem) => {
    let city = await importCity(elem.city);
    await Promise.all(importWeather(city._id, elem.data));
  });
}

async function importCity(city) {
  return CityModel.create(mapCityToModel(city));
}

function mapCityToModel(city) {
  return {
    id: city.id,
    name: city.name,
    country: city.country,
    coords: [
      city.coord.lon,
      city.coord.lat
    ]
  };
}

function importWeather(cityId, items) {
  return items.map(async (item) => {
    item.cityId = cityId;
    return WeatherModel.create(mapWeatherToModel(item));
  });
}

function mapWeatherToModel(weather) {
  return {
    cityId: weather.cityId,
    date: new Date(weather.dt * 1000),
    tempDay: kelvinToCelsius(weather.temp.day),
    tempMin: kelvinToCelsius(weather.temp.min),
    tempMax: kelvinToCelsius(weather.temp.max),
    tempNight: kelvinToCelsius(weather.temp.night),
    tempEve: kelvinToCelsius(weather.temp.eve),
    tempMorn: kelvinToCelsius(weather.temp.morn),
    pressure: weather.pressure,
    humidity: weather.humidity,
    speed: weather.speed,
    clouds: weather.clouds
  };
}

function kelvinToCelsius(k) {
  return +((k - 274.15).toFixed(2));
}
