import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd"; // Using Ant Design components for simplicity
import { useNavigate } from "react-router-dom";
import SignupWindow from "./SignUp.tsx";
import { signin, Response } from "../API/UserAPI.ts";
import { useUser } from "./AdminContext.tsx";
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
  max-width: 400px;
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

const LoginWindow: React.FC = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (): Promise<void> => {
    // Handle sign-in logic
    console.log("Sign In:", { username, password });
    const response: Response | null = await signin(username, password);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
      console.log(response);
      if (response.user) {
        updateUser({
          userId: response.user.user_id,
          sessionId: response.session.session_id,
        });
      }

      navigate("/home");
    } else {
      //TODO - show message on the screen
      alert(response.message);
    }
  };

  return (
    
    <Container>
    <p><img src={DBN_logo}/></p>
      <Form>
        <Title>Login</Title>
        <StyledInput
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <StyledInput.Password
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <ButtonGroup>
          <Button type="primary" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
          <Button type="default" onClick={handleSignIn}>
            Log In
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default LoginWindow;
