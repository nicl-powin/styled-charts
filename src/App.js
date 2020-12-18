import React, { useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import './App.css';

import StyledLineChart from './components/StyledLineChart/StyledLineChart';
import Upload from './components/Upload/Upload';

const App = () => {
  const [ uploadedFile, setUploadedFile ] = useState([])
  return (
    <Container>
      <Upload handleUpload={ setUploadedFile } />
      <Flex>
        { !_.isEmpty(uploadedFile)
          ? <StyledLineChart uploadedFile={ uploadedFile } />
          : <Default>Upload a CSV to visualize data</Default>
        }
      </Flex>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;
const Flex = styled.div`
  flex: 1;
  display: flex;
  padding-top: 20px;
`;
const Default = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 15px;
`;