import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

import './App.css';

import { ReactComponent as PowinLogo } from './powin.svg';
import StyledLineChart from './components/StyledLineChart/StyledLineChart';
import Upload from './components/Upload/Upload';
import ChartForm from './components/ChartForm/ChartForm';
import Drawer from './components/Drawer/Drawer';

import { getFormattedHeaders, updateChartHeaders } from './utils/chartData.utils';

const App = () => {
  const [ uploadedData, setUploadedData ] = useState([]);
  const [ isUploading, setIsUploading ] = useState(false);
  const [ customParams, setCustomParams ] = useState({});
  const [ formIsOpen, setFormIsOpen ] = useState(false);
  const [ chartHeaders, setChartHeaders ] = useState([]);
  const [ chartRef, setChartRef ] = useState(null);
  const [ image, setImage ] = useState('');

  useEffect(() => {
    const formattedHeaders = getFormattedHeaders(uploadedData);
    setChartHeaders(formattedHeaders);
  }, [uploadedData]);

  useEffect(() => {
    if (chartRef !== null) {
      setImage(chartRef.current.chartInstance.toBase64Image());
    }
  }, [chartRef])

  const handleUpload = data => {
    const chartData = _.map(data, row => row.data);
    setUploadedData(chartData);
    const formattedHeaders = getFormattedHeaders(uploadedData);
    setChartHeaders(formattedHeaders);
  };

  const updateChart = data => {
    setCustomParams(data.options);
    setChartHeaders(data.labels);
    setFormIsOpen(false);
  };

  const saveCanvas = () => {
    const canvasSave = document.getElementById('chart');
     canvasSave.toBlob(function (blob) {
         saveAs(blob, "testing.png")
     })
  };

  return (
    <Container>
      <Left>
        <LogoContainer>
          <PowinLogo />
        </LogoContainer>
        <h2>Chart Formatting Tool</h2>
        <Description>
          This tool is intended to ensure quality and continuity of all Powin charts. To get started, upload a CSV file using the button below.
        </Description>
        <Upload handleUpload={ handleUpload } />
        { !_.isEmpty(uploadedData) &&
          <div>
            <Button onClick={ () => setFormIsOpen(true) }>
              Configure Chart
            </Button>
            <Button onClick={ saveCanvas }>
              Save Chart Image
            </Button>
          </div>
        }
      </Left>
      <Flex>
        { !_.isEmpty(uploadedData)
          ? <StyledLineChart
              uploadedData={ uploadedData }
              chartHeaders={ chartHeaders }
              customParams={ customParams }
              setChartRef={ setChartRef }
            />
          : <Default>Upload a CSV to visualize data</Default>
        }
      </Flex>

      <Drawer
        isOpen={ formIsOpen }
        handleClose={ () => setFormIsOpen(false) }
      >
        <ChartForm
          onSubmit={ updateChart }
          onCancel={ () => setFormIsOpen(false) }
          chartHeaders={ chartHeaders }
          data={ uploadedData }
        />
      </Drawer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;
const Left = styled.div`
  width: 250px;
`;
const LogoContainer = styled.div`
  margin-bottom: 25px;
`;
const Description = styled.p`
  margin-bottom: 15px;
`;
const Button = styled.button`
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .2);
  background-color: #fff;
  cursor: pointer;
  padding: 5px 10px;
  margin-top: 15px;
`;
const Flex = styled.div`
  flex: 1;
  display: flex;
  padding-left: 20px;
`;
const Default = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 15px;
`;
const FormContainer = styled.div`
  margin-top: 20px
`;