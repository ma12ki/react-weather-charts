import WeatherModel from '../../models/weather.model';

export default {
  get
};

async function get(queryParams) {
  let cityId = queryParams.city;
  let series = queryParams.series;

  let weather = await WeatherModel.find(
    {cityId}
  ).sort({date: 1}).lean();

  weather = mapWeatherToDto(weather, series);

  return weather;
}

function mapWeatherToDto(weather, series) {
  let ret = weather.map((row) => {
    return {
      x: row.date,
      y: row[series]
    };
  });

  return ret;
}
