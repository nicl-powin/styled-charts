import React, { useState } from 'react'
import _ from 'lodash';
import styled from 'styled-components';
import { CSVReader } from 'react-papaparse';

const buttonRef = React.createRef()

const Upload = ({ handleUpload }) => {
  const [ uploadedFile, setUploadedFile ] = useState([]);

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnFileLoad = (data) => {
    console.log('onLoad');
    handleUpload(data);
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data) => {
    handleUpload([])
  }

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={ handleOnFileLoad }
      onError={ handleOnError }
      noClick
      noDrag
      config={{
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: h => {
          if (_.isEmpty(h)) {
            return "Timestamp";
          }
          return h;
        }
      }}
      onRemoveFile={ handleOnRemoveFile }
    >
      {({ file }) => (
          <Row>
            <Button
              type='button'
              onClick={ handleOpenDialog }
            >
              Browse files
            </Button>
            <FileContainer>
              <FileName>{ file && file.name }</FileName>
              { file &&
                <RemoveButton onClick={ handleRemoveFile }>X</RemoveButton>
              }
            </FileContainer>
          </Row>
      )}
    </CSVReader>
  );
}

export default Upload;

const Button = styled.button`
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .2);
  background-color: #fff;
  cursor: pointer;
  padding: 5px 10px;
`;
const RemoveButton = styled.button`
  background: #d0d0d0;
  border-radius: 50%;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Row = styled.div`
  display: flex;
`;
const FileContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  background-color: #f5f5f5;
  margin-left: 5px;
  padding: 2px 5px;
  border-radius: 4px;
`;
const FileName = styled.div`
  flex: 1;
  padding-right: 5px;
`;