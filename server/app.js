import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';

import config from './config';
import router from './routes';
import {connect} from './db-connect';

const app = express();
const {
  port,
  restBasePath
} = config;

connect();

app.use(logger('dev'));
app.use(cors());
app.use(restBasePath, router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
