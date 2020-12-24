import _ from 'lodash';
import moment from 'moment';

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

export const chartOptions = {
	title: {
		display: false,
		text: '',
		fontSize: 15,
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
    	time: {
    		parser: 'YYYY/MM/DD HH:mm:ss'
    	}
    }]
  },
  legend: {
  		position: 'right'
  },
  animation: false,
  tooltips: {
  	enabled: false
  },
  elements: {
  	line: {
  		tension: 0
  	}
  }
};

export const getFormattedHeaders = chartData => {
	const headers = _.keys(chartData[0]);
	const formattedHeaders = _.map(headers, header => {
		return {
			value: header,
			label: header
		};
	});
	return formattedHeaders;
};

export const formatChartData = (chartHeaders, chartData) => {
	// const headers = getFormattedHeaders(chartData);

	const mapDataset = header => {
		return _.map(chartData, d => {
			const dataPoint = _.get(d, header.value);
			if (!_.isNull(dataPoint)) {
				return {
					x: moment(d['Timestamp']).format('YYYY/MM/DD HH:mm:ss'),
					y: dataPoint
				};
			}
			return;
		});
	};

	const formattedData = {
		datasets: _.map(chartHeaders, (header, index) => {
			return {
				id: header.value,
				label: header.label,
				data: mapDataset(header),
				xAxisId: "Timestamp",
				yAxisId: header,
				fill: false,
				borderColor: colorMap[index],
				borderWidth: .5,
				spanGaps: true,
				hidden: false
			};
		})
	};

	return formattedData;
};