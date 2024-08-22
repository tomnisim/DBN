import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd'; // Using Ant Design components for simplicity
import { useNavigate } from 'react-router-dom';
import { useUser } from './AdminContext.tsx';
import { signup, Response } from '../API/UserAPI.ts';
import DBN_logo from '.././assets/DBN_logo.jpg'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 10vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const StyledInput = styled(Input)`
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SignupWindow: React.FC = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (): Promise<void> => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Handle sign-up logic
    console.log('Sign Up:', { username, firstName, lastName, idNumber, email, phoneNumber, password, confirmPassword });
    const response: Response | null = await signup(username, firstName, lastName, idNumber, email, phoneNumber, password, confirmPassword);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
        console.log(response.message)
        if (response.user){
          updateUser({
            userId: response.user.user_id,
            sessionId: response.session.session_id,
          });
        }
      navigate('/home');
    } else {
      // Show message on the screen
      alert(response.message);
    }
  };

  return (
    <Container>
      <p><img src={DBN_logo}/></p>
      <Form>
        <Title>Sign Up</Title>
        <StyledInput
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
        <StyledInput
          placeholder="First Name"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
        />
        <StyledInput
          placeholder="Last Name"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
        />
        <StyledInput
          placeholder="ID Number"
          value={idNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdNumber(e.target.value)}
        />
        <StyledInput
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <StyledInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
        />
        <StyledInput.Password
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <StyledInput.Password
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        />
        <ButtonGroup>
          <Button type="default" onClick={() => navigate('/')}>
            Back to Login
          </Button>
          <Button type="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default SignupWindow;
