import React, { useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { readString } from 'react-papaparse';

const colorMap = [
	'rgb(255, 99, 132)',
	'rgb(197, 213, 203)',
	'rgb(196, 184, 255)',
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
  legend: {
  	position: 'right'
  }
}


const StyledLineChart = ({ uploadedFile }) => {
	let uploadedData = [];
	if (!_.isEmpty(uploadedFile)) {
		uploadedData = _.map(uploadedFile, row => row.data);
	}

	const headers = _.keys(uploadedData[0]);

	const mapDataset = header => {
		return _.map(uploadedData, d => {
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
				borderWidth: .5
			};
		})
	};

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
	display: flex;
	flex: 1;
	padding: 20px;
`;