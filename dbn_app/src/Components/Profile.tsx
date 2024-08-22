import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get_profile, post_edit_profile } from '../API/UserAPI';
import { Response } from '../API/UserAPI';
import { useUser } from './AdminContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import {logout} from '../API/UserAPI'
const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  // State for personal details
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  // const [id, setId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // State for work details
  const [totalKilometers, setTotalKilometers] = useState<number>(0);
  const [totalParkingPayment, setTotalParkingPayment] = useState<number>(0);
  const [totalFoodPayment, setTotalFoodPayment] = useState<number>(0);
  const [totalTransportPayment, setTotalTransportPayment] = useState<number>(0);
  // const [totalShifts, setTotalShifts] = useState<number>(0);

  const profile = async (): Promise<void> => {
    const response: Response | null = await get_profile(user.userId, user.sessionId);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
      console.log(response.message);
      console.log(response.data);

      // Assuming response.data contains all necessary fields for the profile
      const data = response.data;
      setFirstName(data.first_name);
      setLastName(data.last_name);
      // setId(data.id);
      setEmail(data.email);
      setPhoneNumber(data.cell_phone);
      setTotalKilometers(data.total_km);
      setTotalParkingPayment(data.total_parking);
      setTotalFoodPayment(data.total_food);
      setTotalTransportPayment(data.total_transport);
      // setTotalShifts(data.shifts.length);

    } else {
      // Show message on the screen
      alert(response.message);
    }
  };

  const HandleEditProfile = async (): Promise<void> => {
    if (!isEditing){
      console.log(`is editing is ${isEditing}`)
      toggleEdit()
      return;
    }
    console.log(`here`)
    toggleEdit();
    
    const response: Response | null = await post_edit_profile(user.userId, user.sessionId, firstName, lastName, email, phoneNumber);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
      console.log(response.message);
      console.log(response.data);

      // Assuming response.data contains all necessary fields for the profile
      const data = response.data;
      setFirstName(data.first_name);
      setLastName(data.last_name);
      // setId(data.id);
      setEmail(data.email);
      setPhoneNumber(data.cell_phone);
      setTotalKilometers(data.total_km);
      setTotalParkingPayment(data.total_parking);
      setTotalFoodPayment(data.total_food);
      setTotalTransportPayment(data.total_transport);
      // setTotalShifts(data.shifts.length);

    } else {
      // Show message on the screen
      alert(response.message);
    }
  };
  useEffect(() => {
    profile();
  }, []);

  // Toggle edit mode
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  

  const handleLogOut = async (): Promise<void> => {

    const response: Response | null = await logout(user.userId!);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
      console.log(response);
    } else {
      alert(response.message);
    }
      };

  return (
    <div style={profileStyle}>
      <div style={sectionStyle}>
        <h2>Personal Details</h2>
        <div style={formGroupStyle}>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            readOnly={!isEditing}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            readOnly={!isEditing}
            style={inputStyle}
          />
        </div>
        {/* <div style={formGroupStyle}>
          <label>ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            readOnly={!isEditing}
            style={inputStyle}
          />
        </div> */}
        <div style={formGroupStyle}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!isEditing}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            readOnly={!isEditing}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={sectionStyle}>
        <h2>Work Details</h2>
        <div style={formGroupStyle}>
          <label>Total Kilometers:</label>
          <input
            type="number"
            value={totalKilometers}
            onChange={(e) => setTotalKilometers(parseFloat(e.target.value))}
            readOnly={false}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label>Total Parking Payment:</label>
          <input
            type="number"
            value={totalParkingPayment}
            onChange={(e) => setTotalParkingPayment(parseFloat(e.target.value))}
            readOnly={false}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label>Total Food Payment:</label>
          <input
            type="number"
            value={totalFoodPayment}
            onChange={(e) => setTotalFoodPayment(parseFloat(e.target.value))}
            readOnly={false}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label>Total Transport Payment:</label>
          <input
            type="number"
            value={totalTransportPayment}
            onChange={(e) => setTotalTransportPayment(parseFloat(e.target.value))}
            readOnly={false}
            style={inputStyle}
          />
        </div>
        {/* <div style={formGroupStyle}>
          <label>Total Shifts:</label>
          <input
            type="number"
            value={totalShifts}
            onChange={(e) => setTotalShifts(parseFloat(e.target.value))}
            readOnly={!isEditing}
            style={inputStyle}
          />
        </div> */}
      </div>

      <button onClick={HandleEditProfile} style={buttonStyle}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      
      <div>{user ? <Button color='red' onClick={handleLogOut}>Log Out</Button> : undefined}</div>
    </div>
  );
};

const profileStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: 'auto',
  padding: '1rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '1rem',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '0.5rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: '16px',
};

export default Profile;
