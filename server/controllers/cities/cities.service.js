import CityModel from '../../models/city.model';

export default {
  get
};

async function get(queryParams) {
  let conditions = buildConditions(queryParams);

  let cities = await CityModel.find(
    conditions,
    null,
    {limit: 10}
  ).sort({name: 1}).lean();

  return cities;
}

function buildConditions(params) {
  const conditions = {};

  if (params.cityId) {
    conditions._id = cityId;
  }

  return conditions;
}
