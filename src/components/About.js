import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 50px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #555;
  font-size: 1.2em;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 30%;
`;

const TeamSection = styled.div`
  margin-top: 50px;
`;

const TeamMember = styled(Card)`
  margin: 10px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #343a40;
  color: white;
  margin-top: 50px;
`;

const About = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <Subtitle>
        Agung Dev presents a reliable Currency Converter and Data Storage solution.
      </Subtitle>

      <Section>
        <Card>
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide seamless currency conversion and efficient data storage solutions that empower users to manage their finances effortlessly.
          </p>
        </Card>
        <Card>
          <h2>Our Vision</h2>
          <p>
            We aim to become a leading provider of digital financial tools, simplifying currency management and data storage for individuals and businesses.
          </p>
        </Card>
      </Section>

      <TeamSection>
        <h2 className='text-center'>Meet the Creator</h2>
        <Section>
          <TeamMember>
            <h3>Agung</h3>
            <p>Founder & Developer</p>
            <p>Passionate about creating user-friendly applications that enhance financial literacy.</p>
          </TeamMember>
        </Section>
      </TeamSection>

      <Footer>
        <p>© 2024 Agung Dev. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default About;
