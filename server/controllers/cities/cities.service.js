import CityModel from '../../models/city.model';

export default {
  get
};

async function get(queryParams) {
  //let options = buildCategoryListOptions(queryParams);
  let cities = await CityModel.find(
    {},
    null,
    {limit: 10}
  ).sort({name: 1}).lean();

  return cities;
}
