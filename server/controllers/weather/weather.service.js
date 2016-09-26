import WeatherModel from '../../models/weather.model';

export default {
  get
};

async function get(queryParams) {
  console.log(queryParams);
  //let options = buildCategoryListOptions(queryParams);
  let weather = await WeatherModel.find(
    {},
    null,
    {limit: 10}
  ).sort({name: 1}).lean();

  return weather;
}
