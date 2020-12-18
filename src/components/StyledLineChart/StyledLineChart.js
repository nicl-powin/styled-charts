import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { readString } from 'react-papaparse';
import { tempData } from './data';

import dataCsv from './data.csv' ;

const colorMap = [
	'rgb(255, 99, 132)',
	'rgb(197, 213, 203)',
	'rgb(84, 52, 255)',
	'rgb(33, 220, 244)',
	'rgb(164, 255, 203)',
	'rgb(195, 107, 119)',
	'rgb(120, 212, 165)',
	'rgb(2, 87, 94)',
	'rgb(193, 148, 51)',
	'rgb(90, 118, 112)',
	'rgb(146, 40, 4)',
];

const options = {
  title: {
  	display: true,
  	text: 'Test Styled Chart'
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [{
    	type: 'time',
    	time: { parser: 'YYYY/MM/DD HH:mm:ss' }
    }]
  },
}


const StyledLineChart = () => {
	const parsedData = readString(tempData, { 
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		transformHeader: h => {
			if (_.isEmpty(h)) {
				return "Timestamp";
			}
			return h;
		}
	});

	const headers = _.keys(parsedData.data[0]);

	const mapDataset = header => {
		return _.map(parsedData.data, d => {
			const dataPoint = _.get(d, header);
			if (!_.isNull(dataPoint)) {
				return {
					x: moment(d['Timestamp']).format('YYYY/MM/DD HH:mm:ss'),
					y: dataPoint
				};
			}
			return;
		});
	};

	let data = {
		datasets: _.map(headers, (header, index) => {
			return {
				label: _.startCase(_.camelCase(header)),
				data: mapDataset(header),
				xAxisId: "Timestamp",
				yAxisId: header,
				fill: false,
				borderColor: colorMap[index],
				borderWidth: 1
			};
		})
	};

	console.log('data', data);

	return (
		<Container>
			<Line
				data={ data }
				options={ options }

			/>
		</Container>
	);
};

export default StyledLineChart;

const Container = styled.div`
	padding: 20px;
`;