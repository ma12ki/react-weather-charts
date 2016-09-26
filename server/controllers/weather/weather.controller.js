import WeatherService from './weather.service';

export default {
  get
};

async function get(req, res) {
  const queryParams = req.query || {};
  const weather = await WeatherService.get(queryParams);

  return res.send(weather);
}
