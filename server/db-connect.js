import mongoose from 'mongoose';

import config from './config';

mongoose.Promise = global.Promise;

function connect() {
  console.log(`Attempting to connect to database ${config.mongoUri}...`);

  return new Promise((resolve, reject) => {
    mongoose.connect(config.mongoUri, (err) => {
      if (err) {
        console.error(`Error connecting to database: ${err}`);
        reject(err);
      } else {
        console.log(`Connection successful`);
        resolve();
      }
    });
  });
}

function disconnect() {
  mongoose.disconnect();
}

export {
  connect,
  disconnect
};
