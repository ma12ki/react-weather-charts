import { combineEpics } from 'redux-observable';
import weather, { fetchWeatherEpic, fetchCitiesEpic } from './weather';

export const rootEpic = combineEpics(
  fetchWeatherEpic,
  fetchCitiesEpic
);

export const rootReducer = weather;
