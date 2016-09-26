import React from 'react';
import {connect} from 'react-redux';

import {fetchWeather, fetchCities, chooseCity, chooseSeries} from '../../redux/modules/weather';
import Dropdown from '../Dropdown';
import Button from '../Button';

const seriesOptions = [
  {text: 'Average temp', value: 'tempDay'}
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

  onCityChange(event) {
    this.props.chooseCity(event.target.value);
  }

  onSeriesChange(event) {
    this.props.chooseSeries(event.target.value);
  }

  render() {
    const getDataBtnDisabled = !this.props.city || !this.props.series || this.props.isFetching;
    const btnLabel = this.props.isFetching ? 'Fetching...' : 'Get data';

    return (<div>
      // this would be an autocomplete
      <Dropdown items={this.props.cities} onChange={this.onCityChange} />
      <Dropdown items={seriesOptions} onChange={this.onSeriesChange} />
      <Button type="raised" disabled={getDataBtnDisabled} onClick={this.props.fetchWeather}>{btnLabel}</Button>
    </div>);
  }
};

const WeatherFilterContainer = connect(mapStateToProps, {fetchWeather, fetchCities, chooseCity, chooseSeries})(WeatherFilter);

function mapStateToProps(state) {
  const cities = state.cities ? mapCitiesToOptions(state.cities) : [];

  return {
    ...state,
    cities
  };
}

function mapCitiesToOptions(cities) {
  return cities.map((city) => {
    return {
      text: city.name,
      value: city._id
    };
  });
}

export {
  WeatherFilter,
  WeatherFilterContainer
};
