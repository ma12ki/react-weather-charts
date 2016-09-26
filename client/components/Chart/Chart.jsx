import React, { PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';
import {connect} from 'react-redux';
import moment from 'moment';

//import config from './sample-config';

const baseConfig = {
    // title: {
    //     text: '',
    //     x: -20 //center
    // },
    // xAxis: {
    //     categories: getXAxis()
    // },
    yAxis: {
        // title: {
        //     text: 'Temperature (°C)'
        // },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    // tooltip: {
    //     valueSuffix: '°C'
    // },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    }
    // ,
    // series: [getDataSeries()]
};

class Chart extends React.PureComponent {
  getConfig() {
    return {
      ...baseConfig,
      xAxis: {
        categories: this.props.weatherData.map(item => moment(item.x).format('DD.MM.YYYY'))
      },
      series: [{
        data: this.props.weatherData.map(item => item.y)
      }]
    };
  }

  render() {
    let ret = null;

    if (this.props.weatherData) {
      const config = this.getConfig();

      ret = <ReactHighcharts config={config}></ReactHighcharts>;
    }

    return ret;
  }
}

const ChartContainer = connect(mapStateToProps)(Chart);

function mapStateToProps(state) {
  return {
    weatherData: state.weatherData
  };
}

export {
  Chart,
  ChartContainer
};
