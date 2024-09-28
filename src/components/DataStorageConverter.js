// src/components/DataStorageConverter.js
import React, { useState } from 'react';
import styled from 'styled-components';
import LoadingScreen from './LoadingScreen'; // Import the LoadingScreen component


const Container = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Product Sans', sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: 'Product Sans', sans-serif;
`;

const Input = styled.input`
  height: 40px;
  width: 90%; /* Change to 100% for responsiveness */
  max-width: 400px; /* Set a maximum width */
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 20px;
  font-family: 'Product Sans', sans-serif;

  @media (max-width: 600px) {
    font-size: 16px; /* Smaller font size on mobile */
    height: 36px; /* Slightly smaller height */
  }
`;

const Button = styled.button`
  position: relative;
  margin-top: 10px; /* Add margin on top for spacing */
  height: 61.2px;
  width: 100%; /* Change to 100% for responsiveness */
  max-width: 150px; /* Set a maximum width */
  padding: 11px 20px;
  border: none;
  background-color: #007bff;
  color: white;
    font-family: 'Product Sans', sans-serif;
  border-radius: 80px;
  font-size: 1.3rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    font-size: 16px; /* Smaller font size on mobile */
    height: 50px; /* Slightly smaller height */
  }
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 1.6rem;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%; /* Change to 100% for responsiveness */
  max-width: 90px; /* Set a maximum width */
  height: 60px;
  font-size: 1.2    rem;

  @media (max-width: 600px) {
    font-size: 1.2rem; /* Smaller font size on mobile */
    height: 50px; /* Slightly smaller height */
  }
`;

const Description = styled.div`
  margin-top: 20px;
  text-align: left;
  font-size: 1.3rem;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  background-color: #ffcc00;
  border: 1px solid #ffa500;
  border-radius: 5px;
  z-index: 1000;
`;

const DataStorageConverter = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [inputUnit, setInputUnit] = useState('GB');
  const [outputUnit, setOutputUnit] = useState('KB');
  const [conversionDesc, setConversionDesc] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false); // Pastikan ini ada

  const unitDescriptions = {
    B: {
      description: 'Byte (B) is the basic unit of digital information storage, often used to store one character of text.',
      history: 'Bytes were introduced with the early development of computers, representing the simplest unit of data.',
      currentUse: 'Bytes are commonly used in computer programming and data storage, representing small amounts of data.'
    },
    KB: {
      description: 'Kilobyte (KB) is equal to 1024 bytes and is commonly used to measure smaller files like text documents.',
      history: 'The kilobyte emerged with the early computing era, as file sizes started to exceed single bytes.',
      currentUse: 'Today, kilobytes are used to measure small text files and data transfer rates in computer networks.'
    },
    MB: {
      description: 'Megabyte (MB) equals 1024 kilobytes and is often used to measure files such as images or songs.',
      history: 'The megabyte became significant as file sizes increased with the introduction of graphics and audio.',
      currentUse: 'Megabytes are frequently used to denote file sizes for photos, songs, and small applications.'
    },
    GB: {
      description: 'Gigabyte (GB) is 1024 megabytes and is frequently used to measure larger files like videos or programs.',
      history: 'Gigabytes gained popularity with the advent of video and multimedia content, requiring more storage space.',
      currentUse: 'Today, gigabytes are commonly used in hard drives, flash drives, and memory cards.'
    },
    TB: {
      description: 'Terabyte (TB) equals 1024 gigabytes and is used for measuring vast amounts of data, like in storage systems.',
      history: 'Terabytes became common with the development of large-scale data centers and cloud storage services.',
      currentUse: 'Terabytes are used in enterprise storage solutions and personal hard drives for substantial data storage.'
    },
    PB: {
      description: 'Petabyte (PB) is 1024 terabytes and is often used in data centers and cloud storage.',
      history: 'Petabytes were introduced to accommodate the vast amounts of data generated in the digital age.',
      currentUse: 'Petabytes are commonly associated with large databases, web services, and research institutions.'
    },
    EB: {
      description: 'Exabyte (EB) equals 1024 petabytes, often used to measure global data storage or massive datasets.',
      history: 'Exabytes reflect the rapid growth of data in the 21st century, especially with the rise of the internet.',
      currentUse: 'Exabytes are relevant in discussions about big data, global internet traffic, and data storage capacities.'
    },
    ZB: {
      description: 'Zettabyte (ZB) is 1024 exabytes and is used for extremely large datasets like all global internet data.',
      history: 'Zettabytes became a term as global internet usage soared and data generation exploded.',
      currentUse: 'Zettabytes are used in industry reports and forecasts about data growth and internet usage.'
    },
    YB: {
      description: 'Yottabyte (YB) equals 1024 zettabytes and is used to measure the largest possible datasets.',
      history: 'Yottabytes were introduced as a theoretical limit for data storage, given the exponential growth of data.',
      currentUse: 'Yottabytes are more theoretical and are often mentioned in discussions about future data growth.'
    }
  };

  const convertDataStorage = () => {
    if (!amount || isNaN(amount)) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
      setResult(null); // Clear result when input is invalid
      return;
    }

    if (inputUnit === outputUnit) {
      setResult(amount);
      setConversionDesc(`Since both units are the same (${inputUnit}), no conversion is needed.`);
      return;
    }

    const amountFloat = parseFloat(amount);
    let convertedAmount;

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const inputIndex = units.indexOf(inputUnit);
    const outputIndex = units.indexOf(outputUnit);

    if (inputIndex !== -1 && outputIndex !== -1) {
      const factor = Math.pow(1024, inputIndex - outputIndex);
      convertedAmount = amountFloat * factor;
      setResult(Number.isInteger(convertedAmount) ? convertedAmount : convertedAmount.toFixed(6));

      // Set conversion description
      setConversionDesc(`To convert ${amountFloat} ${inputUnit} to ${outputUnit}, we multiply or divide by 1024 based on the data storage hierarchy.`);
    } else {
      setResult("Conversion error");
      setConversionDesc('');
    }
  };

  return (
    <Container>
        {loading && <LoadingScreen />}
      <Title>Data Storage Converter</Title>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <Select value={inputUnit} onChange={(e) => setInputUnit(e.target.value)}>
        {Object.keys(unitDescriptions).map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </Select>
      <Select value={outputUnit} onChange={(e) => setOutputUnit(e.target.value)}>
        {Object.keys(unitDescriptions).map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </Select>
      <Button onClick={convertDataStorage}>Convert</Button>
      {result && <Result>Converted Amount: {result} {outputUnit}</Result>}
      {inputUnit && outputUnit && (
        <Description>
          <h3>Description</h3>
          <p>{unitDescriptions[inputUnit].description}</p>
          <p><strong>History:</strong> {unitDescriptions[inputUnit].history}</p>
          <p><strong>Current Use:</strong> {unitDescriptions[inputUnit].currentUse}</p>
        </Description>
      )}
      {showNotification && (
        <Notification>Please enter a valid amount for conversion.</Notification>
      )}
    </Container>
  );
};

export default DataStorageConverter;
