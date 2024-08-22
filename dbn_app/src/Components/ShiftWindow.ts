import styled from 'styled-components';

export const FullScreenCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 100vh;
  background-color: #e0e0e0; /* Changed to a light grey background */
  padding: 20px;
  box-sizing: border-box;
`;

export const Card = styled.div`
  background: #ffffff; /* Slightly off-white background */
  border: 1px solid #ccc; /* Light grey border */
  border-radius: 10px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Further increased box shadow */
  padding: 30px;
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.8em;
  margin-bottom: 15px;
`;

export const Info = styled.div`
  margin: 15px 0;
`;

export const InfoTitle = styled.strong`
  font-weight: bold;
`;

export const EmployeeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const EmployeeItem = styled.li`
  margin: 5px 0;
  width: 350px
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust the space between items */
`;
