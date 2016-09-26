import React from 'react';
import {connect} from 'react-redux';
import {IconButton, Menu, MenuItem} from 'react-mdl';

import {fetchWeather, fetchCities, chooseCity, chooseSeries} from '../../redux/modules/weather';
import Dropdown from '../Dropdown';
import Button from '../Button';
import s from './Weather.css';

const seriesOptions = [
  {text: 'Avg temp', value: 'tempDay'},
  {text: 'Min temp', value: 'tempMin'},
  {text: 'Max temp', value: 'tempMax'},
  {text: 'Night temp', value: 'tempNight'},
  {text: 'Eve temp', value: 'tempEve'},
  {text: 'Morn temp', value: 'tempMorn'},
  {text: 'Pressure', value: 'pressure'},
  {text: 'Humidity', value: 'humidity'},
  {text: 'Wind speed', value: 'speed'},
  {text: 'Clouds', value: 'clouds'}
];

class WeatherFilter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onCityChange = this.onCityChange.bind(this);
    this.onSeriesChange = this.onSeriesChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchCities();
  }

  onCityChange(city) {
    this.props.chooseCity(city);
  }

  onSeriesChange(series) {
    this.props.chooseSeries(series);
  }

  render() {
    const getDataBtnDisabled = !this.props.city || !this.props.series || this.props.isFetching;
    const btnLabel = this.props.isFetching ? 'Fetching...' : 'Get data';

    const citiesMenuItems = this.props.cities.map((option) => {
      return <MenuItem key={option._id} onClick={() => this.onCityChange(option)}>{option.name}</MenuItem>;
    });
    const selectedCity = this.props.city ? this.props.city.name : <i style={{color: 'gray'}}>City</i>;

    const seriesMenuItems = seriesOptions.map((option) => {
      return <MenuItem key={option.value} onClick={() => this.onSeriesChange(option)}>{option.text}</MenuItem>;
    });
    const selectedSeries = this.props.series ? this.props.series.text : <i style={{color: 'gray'}}>Series</i>;

    return (<div>
      <div className={s.menu}>
          <IconButton name="more_vert" id="menu-cities" />
          <Menu target="menu-cities">
              {citiesMenuItems}
          </Menu>
          {selectedCity}
      </div>

      <div className={s.menu}>
          <IconButton name="more_vert" id="menu-series" />
          <Menu target="menu-series">
              {seriesMenuItems}
          </Menu>
          {selectedSeries}
      </div>
      <Button type="raised" disabled={getDataBtnDisabled} onClick={this.props.fetchWeather}>{btnLabel}</Button>
    </div>);
  }
};

const WeatherFilterContainer = connect(mapStateToProps, {fetchWeather, fetchCities, chooseCity, chooseSeries})(WeatherFilter);

function mapStateToProps(state) {
  return {
    ...state,
    cities: state.cities || []
  };
}

export {
  WeatherFilter,
  WeatherFilterContainer
};
