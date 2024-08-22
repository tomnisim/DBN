import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useUser } from './AdminContext';
import Button from './Button';
import { signout } from '../API/UserAPI';
import { Response } from '../API/UserAPI';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const { user, updateUser } = useUser();
  const isAdmin = user.isAdmin;
  const navigate = useNavigate();

  const user_id =1;

  const  HandleSignOut = async () : Promise<void> =>{
    console.log('Sigout');
    const response: Response | null = await signout();
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
        console.log(response.message)
      navigate('/');
    } else {
      // Show message on the screen
      alert(response.message);
    }
  }
  return (
      <ul style={navigationStyle}>
        {isAdmin ? <li><Link to='/AllEmployees' style={linkStyle}>Employees Managment</Link></li> : undefined}
        {isAdmin ? <li><Link to='/AllCustomers' style={linkStyle}>Customers Managment</Link></li> : undefined}
        {isAdmin ? <li><Link to='/Updates' style={linkStyle}>Updates</Link></li>: undefined}
        <li><Button onClick={HandleSignOut}>Sign-out</Button></li>
      </ul>
  );
};

const navigationStyle: React.CSSProperties = {

  listStyleType: 'none',
  padding: '0',
  margin: '0',
};

export const linkStyle: React.CSSProperties = {
  color: 'red',
  textDecoration: 'none',
  display: 'block',
  padding: '0px',
  width: '150px',
  height: '50%',
  
};

export default Navigation;
