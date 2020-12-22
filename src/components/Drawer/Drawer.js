import React from 'react';
import styled from 'styled-components';

const Drawer = ({ children, isOpen, handleClose }) => {
	return (
		<Container isOpen={ isOpen }>
			<Panel>
				{ children }
			</Panel>
			<Background onClick={ handleClose } />
		</Container>
	);
};

export default Drawer;

const Container = styled.div`
	display: ${props => props.isOpen ? 'block' : 'none'};
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 100;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;
const Background = styled.div`
	position: absolute;
	z-index: 0;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, .5);
`;
const Panel = styled.div`
	position: absolute;
	background-color: #fff;
	box-shadow: 0 0 5px rgba(0, 0, 0, .2);
	width: 400px;
	height: 100%;
	z-index: 1;
	overflow: auto;
`;