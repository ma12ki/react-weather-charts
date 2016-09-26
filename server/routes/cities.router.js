import Router from 'express/lib/router';
import CitiesController from '../controllers/cities/cities.controller';

let CitiesRouter = new Router();

CitiesRouter.get('/', CitiesController.get);

export default CitiesRouter;
