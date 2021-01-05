import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import { chartOptions, formatChartData, updateChartHeaders } from '../../utils/chartData.utils';

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


const StyledLineChart = ({ uploadedData, customParams, chartHeaders, setChartRef }) => {
	const [chartData, setChartData ] = useState([]);
	const [ options, setOptions ] = useState(chartOptions);

	useEffect(() => {
		const data = formatChartData(chartHeaders, uploadedData);
		setChartData(data);
		setOptions(chartOptions);
		setChartRef(chartRef);
		
	}, []);

	useEffect(() => {
		const data = formatChartData(chartHeaders, uploadedData)
		setChartData(data);
		// chartRef.current.chartInstance.update();
	}, [chartHeaders]);

	useEffect(() => {
		setOptions({ ...options, title: {
			display: _.get(customParams.title, 'display', false),
			text: _.get(customParams.title, 'text', '')
		}});
		chartRef.current.chartInstance.update();
	}, [customParams]);
	const chartRef = useRef(null);

	return (
		<Container>
			<Line
				data={ chartData }
				options={ options }
				ref={ chartRef }
				id="chart"
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