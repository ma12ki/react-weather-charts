import 'rxjs';
//import 'redux-observable';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/observable/dom/ajax';

// action types
const FETCH_WEATHER = 'FETCH_WEATHER';
const FETCH_WEATHER_FULFILLED = 'FETCH_WEATHER_FULFILLED';
const FETCH_CITIES = 'FETCH_CITIES';
const FETCH_CITIES_FULFILLED = 'FETCH_CITIES_FULFILLED';
const CHOOSE_CITY = 'CHOOSE_CITY';
const CHOOSE_SERIES = 'CHOOSE_SERIES';

// action creators
export const fetchWeather = param => ({ type: FETCH_WEATHER, payload: param });
export const fetchWeatherFulfilled = payload => ({ type: FETCH_WEATHER_FULFILLED, payload });
export const fetchCities = () => ({ type: FETCH_CITIES });
export const fetchCitiesFulfilled = payload => ({ type: FETCH_CITIES_FULFILLED, payload });
export const chooseCity = city => ({ type: CHOOSE_CITY, payload: city });
export const chooseSeries = series => ({ type: CHOOSE_SERIES, payload: series });

// epics
export const fetchWeatherEpic = (action$, store) =>
  action$.ofType(FETCH_WEATHER)
    .mergeMap(action => {
      const state = store.getState();

      return Observable.ajax.getJSON(`http://localhost:8099/rest/v1/weather?city=${state.city}&series=${state.series}`)
        .map(fetchWeatherFulfilled);
    });

export const fetchCitiesEpic = action$ =>
  action$.ofType(FETCH_CITIES)
    .mergeMap(action =>
      Observable.ajax.getJSON(`http://localhost:8099/rest/v1/cities`)
        .map(fetchCitiesFulfilled)
    );

const defaultState = {
  isFetching: false
};

// reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_WEATHER_FULFILLED:
      return {
        ...state,
        isFetching: false,
        weatherData: action.payload
      };
    case FETCH_CITIES_FULFILLED:
      return {
        ...state,
        cities: action.payload
      };
    case CHOOSE_CITY:
      return {
        ...state,
        city: action.payload
      };
    case CHOOSE_SERIES:
      return {
        ...state,
        series: action.payload
      };

    default:
      return state;
  }
};
