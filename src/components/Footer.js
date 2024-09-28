import React from 'react';
import styled from 'styled-components';
import { Facebook } from 'styled-icons/boxicons-logos';
import { Twitter } from 'styled-icons/boxicons-logos';
import { Instagram } from 'styled-icons/boxicons-logos';
import { Globe } from 'styled-icons/boxicons-regular';
import { Mail } from 'styled-icons/material';

const FooterContainer = styled.footer`
  background-color: #0056b3; 
  color: white;
  padding: 40px 20px; /* Adjusted padding */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
`;

const FooterSection = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 30px; 
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 220px;
  margin: 15px;
  padding: 10px; 
  display: flex;
  flex-direction: column;
  align-items: center; /* Centering items */
`;

const FooterHeading = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 10px; 
  font-weight: bold; 
`;

const FooterButton = styled.a`
  background-color: transparent; /* Transparent background */
  color: white; /* White text color */
  border: 2px solid white; /* White border */
  padding: 10px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  margin: 5px 0; 
  transition: background-color 0.3s, transform 0.3s, color 0.3s; /* Transition effects */

  &:hover {
    background-color: rgba(255, 255, 255, 0.2); /* Light overlay on hover */
    color: #0056b3; /* Change text color on hover */
    transform: scale(1.05); 
  }

  svg {
    margin-right: 8px; 
  }
`;

const LogoContainer = styled.div`
  margin-top: 20px;
`;

const LogoImage = styled.img`
  width: 150px; 
  margin-top: 10px;
  opacity: 0.9; 

  &:hover {
    opacity: 1; 
    transition: opacity 0.3s; 
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterColumn>
          <FooterHeading>Contact Us</FooterHeading>
          <FooterButton href="mailto:contact@agungdev.com">
            <Mail size="20" /> Email Us
          </FooterButton>
        </FooterColumn>
        <FooterColumn>
          <FooterHeading>Our Website</FooterHeading>
          <FooterButton href="https://agungdev.com" target="_blank" rel="noopener noreferrer">
            <Globe size="20" /> Visit Website
          </FooterButton>
          <FooterButton href="https://drive.agungdev.com" target="_blank" rel="noopener noreferrer">
            <Globe size="20" /> Agung Drive
          </FooterButton>
          <FooterButton href="https://shortenpro.online" target="_blank" rel="noopener noreferrer">
            <Globe size="20" /> Shorten Pro
          </FooterButton>
        </FooterColumn>
        <FooterColumn>
          <FooterHeading>Social Media</FooterHeading>
          <FooterButton href="https://facebook.com/agungdev" target="_blank" rel="noopener noreferrer">
            <Facebook size="20" /> Facebook
          </FooterButton>
          <FooterButton href="https://twitter.com/agungdev" target="_blank" rel="noopener noreferrer">
            <Twitter size="20" /> Twitter
          </FooterButton>
          <FooterButton href="https://instagram.com/agungdev" target="_blank" rel="noopener noreferrer">
            <Instagram size="20" /> Instagram
          </FooterButton>
        </FooterColumn>
      </FooterSection>
      <LogoContainer>
        <LogoImage src="https://agungdev.com/static/images/Light%20Agung%20Dev.png" alt="Agung Dev Logo" />
      </LogoContainer>
    </FooterContainer>
  );
};

export default Footer;
