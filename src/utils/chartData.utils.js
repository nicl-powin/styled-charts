import _ from 'lodash';

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

