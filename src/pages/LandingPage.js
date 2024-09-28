import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LandingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 15px;
  font-family: 'Product Sans', sans-serif;
  overflow-x: hidden; /* Prevent horizontal scrolling */
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  margin-bottom: 60px;
  overflow: hidden; /* Prevent overflow in this section */
  width: 100%; /* Ensure it takes the full width */
  margin-bottom: 50px;
  font-family: 'Product Sans', sans-serif;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #333;
  margin-bottom: 10px; /* Increased margin bottom for more space */
  font-weight: 800;
  max-width: 90%;
  margin: 0 auto; /* Center horizontally */
  word-break: break-word;
  font-family: 'Product Sans', sans-serif;

  @media (max-width: 768px) {
    font-size: 2.5rem; /* Smaller font size for mobile */
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 30px; /* Decreased margin bottom for more space */
  max-width: 800px; /* Added max width for subtitle */
  margin: 0 auto; /* Center align */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap; /* Allow buttons to wrap on small screens */
`;

const HeroButton = styled(Link)`
  padding: 15px 40px; /* Increased padding for buttons */
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
  font-family: 'Product Sans', sans-serif;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px) scale(1.05);
  }
`;

const Section = styled.section`
  margin: 60px 0; /* Increased margin for sections */
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem; /* Increased font size */
  color: #333;
  margin-bottom: 20px;
  font-weight: 700; /* Adjusted weight for section titles */
  font-family: 'Product Sans', sans-serif;
`;

const SectionText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.8; /* Improved line height for readability */
  font-family: 'Product Sans', sans-serif;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px; /* Increased gap for features */
  align-items: center; /* Center align feature items */
`;

const FeatureItem = styled.li`
  font-size: 1.1rem;
  color: #666;
  padding: 15px; /* Increased padding for feature items */
  background-color: #f9f9f9;
  border-radius: 10px;
  transition: transform 0.2s;
  text-align: center; /* Center align text in feature items */
  font-family: 'Product Sans', sans-serif;

  &:hover {
    transform: translateY(-4px);
  }
`;


const LandingPage = () => {
  return (
    <LandingContainer>
      <HeroSection>
        <HeroTitle>Welcome to the Conversion Tools</HeroTitle>
        <HeroSubtitle>
            Experience seamless conversions between currencies and data storage units with our intuitive tools. Whether you're traveling abroad or managing your digital assets, our platform offers real-time rates and accurate calculations, making your tasks simpler and faster.
        </HeroSubtitle>

        <ButtonWrapper>
          <HeroButton to="/currency-converter">Currency Converter</HeroButton>
          <HeroButton to="/data-storage-converter">Data Storage Converter</HeroButton>
        </ButtonWrapper>
      </HeroSection>

      <Section>
        <SectionTitle>About Us</SectionTitle>
        <SectionText>
          We provide a user-friendly platform that simplifies the process of converting currencies and data storage units. 
          Our tools are designed to save you time and effort, allowing you to focus on what really matters.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Features</SectionTitle>
        <FeatureList>
          <FeatureItem>Real-time currency exchange rates</FeatureItem>
          <FeatureItem>Data storage conversion between various units</FeatureItem>
          <FeatureItem>User-friendly interface with intuitive navigation</FeatureItem>
          <FeatureItem>Responsive design for all devices</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SectionTitle>How It Works</SectionTitle>
        <SectionText>
          Simply choose the tool you need, input your values, and click convert! 
          Our system will handle the calculations and provide you with accurate results in seconds.
        </SectionText>
      </Section>
    </LandingContainer>
  );
};

export default LandingPage;
