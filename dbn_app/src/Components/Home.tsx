// src/components/Home.tsx
import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Calendar from './Calender';
import ToggleBar from './ToggleBar';
import Table from './ShiftTable';
import { useUser } from './AdminContext';
import { useNavigate } from 'react-router-dom';
import { Response } from '../API/UserAPI';
import { test_shift, get_all_shifts } from '../API/UserAPI';
import Button from './Button';
import { get_my_shifts, get_employees_shifts, get_profile } from '../API/UserAPI';
// const API_URL = 'https://hidden-river-74274-8a6ec79743ca.herokuapp.com/';  // Django API URL
const API_URL = 'http://127.0.0.1:8000/';  // Django API URL



// const tableData = [
//   {
//     date: '2023-07-01',
//     location: '123 Main St',
//     employees: ['Alice', 'Bob'],
//     details: 'Shift 1 details',
//   },
//   {
//     date: '2023-07-02',
//     location: '456 Elm St',
//     employees: ['Charlie', 'David'],
//     details: 'Shift 2 details',
//   },
//   {
//     date: '2023-07-03',
//     location: '789 Oak St',
//     employees: ['Eve', 'Frank'],
//     details: 'Shift 3 details',
//   },]


export type tableDataType = {
  date: string,
  location: string,
  employees: { current: number; needed: number },
  details: string,
  id:string
};
export type Shift = {
  id:string
  date: string;
  day: string;
  client: string;
  type_of_shift: string;
  beginning_time: string;
  num_of_employees: number;
  location: string;
  notes: string;
  employees: string[]; // Array of strings
};


const Home = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [allShifts, setAllShifts] = useState<Shift[]>([]);
  // const [tableData, setTableData] = useState<tableDataType[]>([]);
  // useEffect(()=>{
  //   create_table_data()
  // }, [allShifts])
  useEffect(()=>{
    test_get_all_shifts()
  }, [])
  const isAdmin = user.isAdmin;
  const userId = user.userId;
  const sessionId = user.sessionId;
  

  // const create_table_data = () =>{
  //   console.log("create table data")
  //   const tableData :tableDataType[]= allShifts.map((shift) => ({
  //     date: shift.date,
  //     location: shift.location,
  //     employees: {current:shift.employees.length, needed:shift.employees.length},
  //     details: `detailes for shift id: ${shift.id}`,
  //     id:shift.id
  //   }));

  //   setTableData(tableData);
  // }
  const test_get_all_shifts = async (): Promise<void> => {

    if (!(userId && sessionId)){
      console.log("Not Sign In")
    }
    const response: Response | null = await get_all_shifts(userId, sessionId);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
        console.log(response.message)
        console.log(response.data)
        setAllShifts(response.data)
    } else {
      // Show message on the screen
      alert(response.message);
    }
  };
  const test_my_shifts = async (): Promise<void> => {
    
    if (!(userId && sessionId)){
      console.log("Not Sign In")
      return
    }
    const response: Response | null = await get_my_shifts(userId, sessionId);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
        console.log(response.message)
        console.log(response.data)
        navigate('/');
    } else {
      // Show message on the screen
      alert(response.message);
    }
  };

  const employees_shifts = async (): Promise<void> => {
    const userId = user.userId;
    const sessionId = user.sessionId;
    if (!(userId && sessionId)){
      console.log("Not Sign In")
      return;
    }
    const response: Response | null = await get_employees_shifts(userId, sessionId);
    if (response === null) {
      alert("BAD ERROR");
      return;
    }
    if (response.success) {
        console.log(response.message)
        console.log(response.data)
        navigate('/');
    } else {
      // Show message on the screen
      alert(response.message);
    }
  };



  return <>
      <h2> Future Shifts</h2>
      {/* <Button onClick={test_get_all_shifts}>Test shift</Button> */}
      {/* <Button onClick={test_my_shifts}>Test my shifts</Button> */}
      {/* <Button onClick={employees_shifts}>employees shifts</Button> */}
      {/* <ToggleBar></ToggleBar> */}
      {allShifts.length > 0 ? <Table data={allShifts}></Table>: <p>loading..</p>}
      {/* <Calendar></Calendar> */}
  </>;
};

export default Home;
