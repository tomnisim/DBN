import React from 'react';
import { BrowserRouter as Router, Routes , Link, Route } from 'react-router-dom';
import Home from './Home';
import FillShiftSummary from './FillShiftSummary';
import Navigation from './Navigation';
import Profile from './Profile';
import ShiftWindow from './ShiftWindow.tsx';
import AddShift from './AddShift.tsx';
import AllCustomers from './AllCustomers';
import AllEmployees from './AllEmployees';
import Updates from './Updates';
import LoginWindow from './SignIn.tsx';
import SignupWindow from './SignUp.tsx';
const personalDetails = {
  firstName: 'John',
  lastName: 'Doe',
  id: '12345',
  email: 'john.doe@example.com',
  phoneNumber: '+1234567890',
};

const workDetails = {
  totalKilometers: 5000,
  totalParkingPayment: 150,
  totalFoodPayment: 200,
  totalTransportPayment: 300,
  totalShifts: 50,
};

const shiftData = {
  shiftId: 1,
  date: new Date('2023-07-23T09:00:00'),
  day: 'Sunday',
  shiftType: 'Morning',
  customer: 'ABC Corp',
  startTime: { hours: '09', minutes: '00' },
  location: '123 Main St',
  numEmployees: 5,
  employeesNames: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
};


type PersonalDetailsProps = {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  phoneNumber: string;
};

type WorkDetailsProps = {
  totalKilometers: number;
  totalParkingPayment: number;
  totalFoodPayment: number;
  totalTransportPayment: number;
  totalShifts: number;
};

// Define the type for shiftData
type ShiftDataProps = {
  shiftId: number;
  date: Date;
  day: string;
  shiftType: string;
  customer: string;
  startTime: {
    hours: string;
    minutes: string;
  };
  location: string;
  numEmployees: number;
  employeesNames: string[];
};

const AppRouter: React.FC = () => {
  return (

      <Routes>
        <Route path="/" element={<LoginWindow />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignupWindow />} />
        <Route path="/FillShiftSummary/:shift_id" element={<FillShiftSummary />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ShiftWindow/:shift_id" element={<ShiftWindow {...shiftData} />} />
        <Route path="/AddShift" element={<AddShift/>} />
        <Route path="/AllEmployees" element={<AllEmployees/>} />
        <Route path="/AllCustomers" element={<AllCustomers/>} />
        <Route path="/Updates" element={<Updates/>} />

        
      </Routes>
  );
};

export default AppRouter;