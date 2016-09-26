import CitiesService from './cities.service';

export default {
  get
};

async function get(req, res) {
  const queryParams = req.query || {};
  const cities = await CitiesService.get(queryParams);

  return res.send(cities);
}
