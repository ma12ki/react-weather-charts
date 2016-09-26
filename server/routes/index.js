import Router from 'express/lib/router';

import CitiesRouter from './cities.router';
import WeatherRouter from './weather.router';

let router = new Router();

// *** just for debug *** //
router.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

router.use('/cities', CitiesRouter);
router.use('/weather', WeatherRouter);

export default router;
