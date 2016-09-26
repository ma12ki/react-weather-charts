import Router from 'express/lib/router';
import WeatherController from '../controllers/weather/weather.controller';

let WeatherRouter = new Router();

WeatherRouter.get('/', WeatherController.get);

export default WeatherRouter;
