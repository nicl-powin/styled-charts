import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const ChartForm = ({ data, chartHeaders, onSubmit, onCancel }) => {
	const [ hasTitle, setHasTitle ] = useState(false);
	const [ title, setTitle ] = useState('');
	console.log('data', data);

	const handleSubmit = () => {
		console.log('submit');
		onSubmit({
			title: {
				display: hasTitle,
				text: title
			}
		});
	};

	const renderHeaderList = headers => {
		const handleUpdateHeader = data => {

		};

		return _.map(headers, header => {
			return (
				<ListSection key={ header.value }>
					<Row>
						<SectionTitle>{ header.value }</SectionTitle>
						<InputContainer>
							<Row>
								<input
									type="checkbox"
									checked={ true }
									onChange={ () => console.log('Changed') }
								/>
								<Label>Display</Label>
							</Row>
						</InputContainer>
					</Row>
					<SectionContent>
						<InputContainer>
							<Row>
								<Label>Label</Label>
								<Input type="text" value={ header.label } />
							</Row>
						</InputContainer>
					</SectionContent>
				</ListSection>
			);
		});
	};

	return (
		<Container>
			<h2>Chart Customization</h2>
			<Section>
				<h4>Chart Title</h4>
				<InputContainer>
					<Row>
						<input
							type="checkbox"
							checked={ hasTitle }
							onChange={ () => setHasTitle(!hasTitle) }
						/>
						<Label>Display Chart Title</Label>
					</Row>
				</InputContainer>
				{ hasTitle &&
					<InputContainer>
						<Label>Chart Title</Label>
						<Input type="text" onChange={ e => setTitle(e.target.value) } />
					</InputContainer>
				}
			</Section>
			<Section>
				<h4>Data Headers</h4>
				{ renderHeaderList(chartHeaders) }
			</Section>
			<ButtonRow>
				<CancelButton onClick={ onCancel }>Cancel</CancelButton>
				<SubmitButton type="submit" onClick={ handleSubmit }>Submit</SubmitButton>
			</ButtonRow>
		</Container>
	);
};

export default ChartForm;

const Container = styled.div`
	padding: 10px;
`;
const Row = styled.div`
	display: flex;
	align-items: center;
`;
const Section = styled.div`
	margin: 15px 0;
	padding: 15px 0;
	border-bottom: 1px solid #d0d0d0;
`;
const SectionTitle = styled.div`
	font-size: 13px;
	font-weight: 600;
	flex: 1;
`;
const SectionContent = styled.div`
	padding: 10px;
`;
const InputContainer = styled.div`

`;
const Label = styled.div`
	font-size: 14px;
	color: #909090;
	margin: 0 5px 0 0;
`;
const Input = styled.input`
	border: 1px solid #ddd;
	padding: 5px 10px;
	width: 100%;
`;
const ListSection = styled.div`
	margin-bottom: 10px;
`;
const ButtonRow = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 15px;
`;
const CancelButton = styled.button`
	border: none;
	background-color: #d0d0d0;
	padding: 5px 10px;
	color: #333;
	cursor: pointer;
	margin-right: 5px;
`;
const SubmitButton = styled.button`
	border: none;
	box-shadow: 0 2px 2px rgba(0, 0, 0, .2);
	background-color: #00bf91;
	padding: 5px 10px;
	color: #fff;
	cursor: pointer;
`;