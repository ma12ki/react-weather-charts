import React from 'react';
import {connect} from 'react-redux';

import {fetchWeather} from '../../redux/modules/weather';

class Container extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div> container lol {this.props.isFetching.toString()}
      <button onClick={this.props.fetchWeather}>get :3</button>
      <div><pre>{JSON.stringify(this.props.weatherData, null, 2) }</pre></div>
    </div>);
  }
};

const ContainerContainer = connect(mapStateToProps, {fetchWeather})(Container);

function mapStateToProps(state) {
  return {
    ...state
  };
}

export {
  Container,
  ContainerContainer
};
