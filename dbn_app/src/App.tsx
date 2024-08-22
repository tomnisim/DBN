import { useState , useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import DBN_logo from './assets/DBN_logo.jpg'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FutureShiftsWindow from './Components/FutureShiftsWindow.tsx'
import ShiftWindow from './Components/ShiftWindow.tsx'
import Calendar from './Components/Calender.tsx'
import FillShiftSummary from './Components/FillShiftSummary.tsx'
import Input from './Components/Input.tsx'
import Navigation from './Components/Navigation.tsx'
import AppRouter from './Components/Router.tsx'
import { useUser } from './Components/AdminContext.tsx'



function App() {
  const { user, updateUser } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Router>
      {user.userId? <Header src={DBN_logo} alt="Logo Alt Text" /> : undefined}
      <div style={{ marginTop: '60px' }}>
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;

 